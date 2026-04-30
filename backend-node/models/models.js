const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ==========================================
// 1. Diet Recommendation Schema
// ==========================================
const dietRecommendationSchema = new Schema({
    sevenDayDietPlan: {
        type: [Schema.Types.Mixed], 
        default: []
    }
}, { timestamps: true });

// ==========================================
// 2. Workout Recommendation Schema
// ==========================================
const workoutRecommendationSchema = new Schema({
    sevenDayWorkoutPlan: {
        type: [Schema.Types.Mixed],
        default: []
    }
}, { timestamps: true });

// ==========================================
// 3. User Schema
// ==========================================
const userSchema = new mongoose.Schema({
  // AUTH & SYSTEM
  email: { type: String, required: true, unique: true },
  method: { type: String, required: true },
  profileComplete: { type: Boolean, default: false },

  // 1. BASIC PROFILE
  gender: { type: String, enum: ["Male", "Female"] },
  age: { type: Number },
  height: { type: Number }, // Store in cm for consistent calculation
  weight: { type: Number }, // Store in kg
  bmi: { type: Number },
  healthyWeightRange: { type: String },
  bodyType: { type: String, enum: ["Ectomorph", "Mesomorph", "Endomorph", "Not sure"] },

  // 2. LIFESTYLE & DAILY ROUTINE
  occupationType: { type: String, enum: ["Desk job", "Standing job", "Physically active job", "Student", "Homemaker"] },
  dailyActivityLevel: { type: String, enum: ["Sedentary (little to no exercise)", "Lightly active (1–3 days/week)", "Moderately active (3–5 days/week)", "Very active (6–7 days/week)"] },
  sleepDuration: { type: String, enum: ["<5 hours", "5–6 hours", "6–7 hours", "7–8 hours", "8+ hours"] },
  sleepQuality: { type: String, enum: ["Poor", "Average", "Good"] },
  stressLevel: { type: String, enum: ["Low", "Moderate", "High"] },
  workSchedule: { type: String, enum: ["Fixed", "Rotational", "Night shift"] },
  dailyStepGoal: { type: Number, enum: [1000, 3000, 5000, 7000, 10000] },
  breakFrequency: { type: String, enum: ["Rarely", "Sometimes", "Often"] },
  energyLevels: { type: String, enum: ["Low", "Medium", "High"] },

  // 3. FOOD PREFERENCES & DIET
  dietType: { type: String, enum: ["Vegetarian", "Eggetarian", "Non-vegetarian", "Vegan"] },
  allergies: [{ type: String }], // Array for multi-select
  mealsPerDay: { type: String, enum: ["2", "3", "4+", "Irregular"] },
  cravings: [{ type: String }],
  waterIntakeGoal: { type: String, enum: ["<1 L", "1–2 L", "2–3 L", "3+ L"] },
  mealTiming: { type: String, enum: ["Early", "Normal", "Late"] },
  eatingPattern: { type: String, enum: ["Home-cooked", "Mixed", "Mostly outside food"] },
  sugarFrequency: { type: String, enum: ["Daily", "Few times/week", "Rare"] },
  proteinAwareness: { type: String, enum: ["Low", "Moderate", "High", "Not sure"] },
  snackingHabit: { type: String, enum: ["Frequent", "Occasional", "Rare"] },

  // 4. MEDICAL & PHYSICAL HEALTH
  medicalConditions: [{ type: String }],
  physicalInjuries: [{ type: String }],
  currentMedications: { type: String },
  pastSurgeries: { type: String },
  doctorRestrictions: { type: String },
  mobilityLimitations: { type: String, enum: ["None", "Mild", "Moderate", "Severe"] },
  painIntensity: { type: Number, min: 1, max: 10 },
  pregnancyStatus: { type: String, enum: ["Yes", "No", "Not applicable"] },

  // 5. FITNESS & YOGA EXPERIENCE
  exerciseExperience: { type: String, enum: ["Beginner (never exercised)", "Intermediate", "Advanced"] },
  yogaExperience: { type: String, enum: ["None", "Beginner", "Regular practitioner"] },
  workoutPreference: { type: String, enum: ["Home workout", "Gym", "Outdoor"] },
  timeAvailable: { type: String, enum: ["10–15 mins", "20–30 mins", "45–60 mins"] },
  currentFrequency: { type: String, enum: ["0", "1–2", "3–4", "5+"] },
  pastWorkoutTypes: [{ type: String }],
  hasWorkoutInjuryHistory: { type: Boolean },

  // 6. GOALS & MOTIVATION
  primaryGoal: { type: String, enum: ["Weight loss", "Weight gain", "Muscle toning", "Pain relief", "Flexibility", "Overall fitness"] },
  goalDuration: { type: String, enum: ["1 month", "3 months", "6 months"] },
  targetWeight: { type: Number },
  biggestChallenge: { type: String, enum: ["Lack of time", "Low motivation", "Inconsistent routine", "Poor diet control", "Pain/injury"] },
  secondaryGoal: { type: String },
  otherGoals: { type: String },
  motivationReason: { type: String, enum: ["Health", "Appearance", "Medical", "Lifestyle"] },
  goalPriority: { type: String, enum: ["Quick results", "Sustainable progress"] },
  pastAttempts: { type: String, enum: ["Never tried", "Tried but failed", "Successful before"] },

  // 7. HABITS & BEHAVIOR
  smoking: { type: String, enum: ["No", "Occasionally", "Regularly"] },
  alcohol: { type: String, enum: ["No", "Occasionally", "Weekly", "Frequently"] },
  screenTime: { type: String, enum: ["<2 hours", "2–4 hours", "4–6 hours", "6+ hours"] },
  readinessToChange: { type: String, enum: ["Very ready", "Somewhat ready", "Not sure"] },
  consistencyLevel: { type: String, enum: ["Very inconsistent", "Sometimes consistent", "Very consistent"] },
  procrastination: { type: String, enum: ["Low", "Medium", "High"] },
  stressEating: { type: String, enum: ["Yes", "Sometimes", "No"] },
  holidayLifestyle: { type: String, enum: ["Active", "Relaxed", "Party-heavy"] },

  // 8. PREFERENCES & REMINDERS
  preferredWorkoutTime: { type: String, enum: ["Morning", "Afternoon", "Evening"] },
  reminderPreference: { type: String, enum: ["Push notification", "WhatsApp", "Email", "None"] },
  motivationStyle: { type: String, enum: ["Gentle encouragement", "Strict & disciplined", "Educational tips"] },
  workoutDurationStyle: { type: String, enum: ["Short & intense", "Long & relaxed"] },
  musicPreference: { type: Boolean },
  language: { type: String },
  contentFormat: { type: String, enum: ["Video", "Text", "Guided audio"] },
  reminderFrequency: { type: String, enum: ["Daily", "Few times/week", "Custom"] },

  // 9. PROGRESS TRACKING
  checkInFrequency: { type: String, enum: ["Daily", "Weekly", "Bi-weekly", "Monthly"] },
  trackingMetrics: [{ type: String }],
  willingnessToLog: { type: String, enum: ["Yes", "Sometimes", "No"] },
  photoTracking: { type: Boolean },

  // RELATIONSHIPS
  logs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Log' }],
  dietRecommendation: { type: mongoose.Schema.Types.ObjectId, ref: 'DietRecommendation' },
  workoutRecommendation: { type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutRecommendation' }
  
}, { timestamps: true });


const logSchema = new mongoose.Schema({
    date: { 
        type: Date, 
        default: Date.now 
    },
    yoga: [{
        name: { type: String, required: true },
        totalTime: { type: Number, required: true }, // in minutes
        activeTime: { type: Number, required: true }, // in minutes
        caloriesBurnt: { type: Number, required: true }
    }],
    physio: [{
        name: { type: String, required: true },
        totalTime: { type: Number, required: true },
        activeTime: { type: Number, required: true },
        caloriesBurnt: { type: Number, required: true }
    }],
    waterIntake: { type: Number, default: 0 }, // e.g., in ml or glasses
    steps: { type: Number, default: 0 },
    weight: { type: Number }, // Daily weight tracking
    sleep: { type: Number } // e.g., hours of sleep
}, { timestamps: true });

// Creating models
const User = mongoose.model('User', userSchema);
const DietRecommendation = mongoose.model('DietRecommendation', dietRecommendationSchema);
const WorkoutRecommendation = mongoose.model('WorkoutRecommendation', workoutRecommendationSchema);
const Log = mongoose.model('Log', logSchema);

// Exporting models
module.exports = { User, DietRecommendation, WorkoutRecommendation, Log };