const express = require('express');
const router = express.Router();
const { User, DietRecommendation, WorkoutRecommendation } = require('./models/models.js'); 
const { GoogleGenAI } = require('@google/genai'); 

// Initialize the Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// ==========================================
// 1. SIGNUP ENDPOINT
// ==========================================
router.post('/signup', async (req, res) => {
  try {
    const { email, method } = req.body;
    console.log("signing up...")

    if (!email || !method) {
      return res.status(400).json({ message: 'Email and method are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const newUser = new User({ email, method });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// 2. LOGIN ENDPOINT
// ==========================================
router.post('/login', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required to login' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User record not present for the provided email' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// 3. GET USER ENDPOINT
// ==========================================
router.post('/plan', async (req, res) => {
  try {
    const email= req.body.userEmail;

    console.log(email);
    
    const user = await User.findOne({email: email})
      .populate('dietRecommendation')
      .populate('workoutRecommendation');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// 4. UPDATE USER (WITH AI GENERATION)
// ==========================================
router.put('/', async (req, res) => {
  try {
    const userEmail = req.body.userEmail;
    const updates = req.body; 

    const user = await User.findOne({email: userEmail});
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const plansExist = user.dietRecommendation && user.workoutRecommendation;

    // A. UPDATED CONDITIONAL MANDATORY CHECK
    // For Pranalyse, we now require core physical and goal data to generate a safe plan
    if (!plansExist) {
      const requiredFields = ['Age', 'Weight', 'Height', 'Gender', 'Diet type'];
      const missingFields = requiredFields.filter(field => 
        updates[field] === undefined && user[field] === undefined
      );

      if (missingFields.length > 0) {
        return res.status(400).json({ 
          message: `Required for plan generation: ${missingFields.join(', ')}` 
        });
      }
    }

    // B. AUTO-CALCULATE BMI & HEALTHY RANGE
    const finalWeight = updates.weight !== undefined ? updates.weight : user.weight;
    const finalHeight = updates.height !== undefined ? updates.height : user.height;

    if (updates.weight !== undefined || updates.height !== undefined) {
      if (finalWeight && finalHeight) {
        const heightInMeters = finalHeight / 100;
        const bmiValue = (finalWeight / (heightInMeters * heightInMeters)).toFixed(2);
        updates.bmi = bmiValue;

        // Calculate healthy range (BMI 18.5 to 24.9)
        const minWeight = (18.5 * (heightInMeters * heightInMeters)).toFixed(1);
        const maxWeight = (24.9 * (heightInMeters * heightInMeters)).toFixed(1);
        updates.healthyWeightRange = `${minWeight}kg - ${maxWeight}kg`;
      }
    }

    // Apply updates
    Object.assign(user, updates);

    // C. EXPANDED CHANGE DETECTION
    // We check if any "plan-altering" field has changed
    const planAlteringFields = [
      'age', 'weight', 'height', 'primaryGoal', 'dietType', 'dailyActivityLevel', 
      'medicalConditions', 'physicalInjuries', 'exerciseExperience', 'timeAvailable'
    ];
    
    const profileChanged = planAlteringFields.some(field => user.isModified(field));

    // D. ENHANCED AI PROMPT
    if (!plansExist || profileChanged) {
      
      const prompt = `
        You are a world-class AI Nutritionist, Yoga Therapist, and Physiotherapist.
        Generate a strictly personalized 7-day plan for:
        
        BASIC: ${user.gender}, ${user.age}yrs, ${user.weight}kg, ${user.height}cm (BMI: ${user.bmi})
        GOALS: Primary: ${user.primaryGoal}, Secondary: ${user.secondaryGoal}, Target: ${user.targetWeight}kg
        LIFESTYLE: Occupation: ${user.occupationType}, Activity: ${user.dailyActivityLevel}, Sleep: ${user.sleepDuration}
        DIET: Type: ${user.dietType}, Allergies: ${user.allergies?.join(', ') || 'None'}, Cravings: ${user.cravings?.join(', ') || 'None'}
        HEALTH: Conditions: ${user.medicalConditions?.join(', ') || 'None'}, Injuries/Pain: ${user.physicalInjuries?.join(', ') || 'None'}
        EXPERIENCE: Yoga: ${user.yogaExperience}, Exercise: ${user.exerciseExperience}, Time: ${user.timeAvailable}

        CRITICAL SAFETY: 
        - If physical injuries exist, prioritize Physiotherapy movements over intense Yoga.
        - If medical conditions (like Diabetes/PCOS) exist, adjust the Indian Diet plan accordingly.

        Requirements:
        1. Calculate BMR and daily calorie needs based on ${user.dailyActivityLevel}.
        2. Generate a 7-day Indian Diet Plan (Strictly ${user.dietType}).
        3. Generate a 7-day Yoga/Physio Routine (Focus on ${user.primaryGoal}).
        4. Provide daily water intake and macro targets.

        Output ONLY strict JSON:
        {
          "diet": { "sevenDayDietPlan": [...] },
          "workout": { "sevenDayWorkoutPlan": [...] }
        }
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });

      const plansData = JSON.parse(response.text);

      // Upsert Diet Recommendation
      if (user.dietRecommendation) {
        await DietRecommendation.findByIdAndUpdate(user.dietRecommendation, { 
            sevenDayDietPlan: plansData.diet.sevenDayDietPlan 
        });
      } else {
        const dietDoc = new DietRecommendation({ sevenDayDietPlan: plansData.diet.sevenDayDietPlan });
        await dietDoc.save();
        user.dietRecommendation = dietDoc._id;
      }

      // Upsert Workout Recommendation
      if (user.workoutRecommendation) {
        await WorkoutRecommendation.findByIdAndUpdate(user.workoutRecommendation, { 
            sevenDayWorkoutPlan: plansData.workout.sevenDayWorkoutPlan 
        });
      } else {
        const workoutDoc = new WorkoutRecommendation({ sevenDayWorkoutPlan: plansData.workout.sevenDayWorkoutPlan });
        await workoutDoc.save();
        user.workoutRecommendation = workoutDoc._id;
      }

      user.profileComplete = true;
    }

    await user.save();

    res.status(200).json({
      message: (!plansExist || profileChanged) ? 'Plans updated successfully.' : 'Profile updated.',
      user: await User.findOne({email:userEmail}).populate('dietRecommendation').populate('workoutRecommendation')
    });

  } catch (error) {
    console.error("PUT Error:", error);
    res.status(500).json({ error: 'Server error during update.' });
  }
});


module.exports = router;