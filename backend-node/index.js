const express = require('express');
const dotenv = require("dotenv");
const connectDB = require('./db.js');
const userRoutes = require('./userRoutes.js'); // Import the router file
const { User, Log } = require('./models/models.js');
const cors = require('cors'); 

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());

// 1. Critical Middleware for reading JSON bodies
app.use(express.json());

// 2. Connect Database
connectDB();

// 3. Register your routes
app.use('/users', userRoutes); 
// Note: This makes your full URLs like: http://localhost:3000/users/signup

app.get('/ping', (req, res) => {
    res.json({msg:'Pong! Express is alive.'});
});

app.get('/analytics/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const targetDate = req.query.date ? new Date(req.query.date) : new Date();

    // Calculate Date Ranges
    const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

    const startOfWeek = new Date(startOfDay);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

    const startOfMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);

    // 1. Fetch Daily Stats (Water and Steps)
    const dailyLog = await Log.findOne({
      _id: { $in: (await User.findById(userId)).logs },
      date: { $gte: startOfDay, $lte: endOfDay }
    });

    // 2. Aggregate Weekly/Monthly Stats
    const stats = await Log.aggregate([
      {
        $match: {
          _id: { $in: (await User.findById(userId)).logs },
          date: { $gte: startOfMonth } // Get at least a month of data
        }
      },
      {
        $group: {
          _id: null,
          totalYogaSessions: { 
            $sum: { $cond: [{ $gte: ["$date", startOfWeek] }, { $size: "$yoga" }, 0] } 
          },
          totalPhysioSessions: { 
            $sum: { $cond: [{ $gte: ["$date", startOfWeek] }, { $size: "$physio" }, 0] } 
          },
          avgSleepWeek: { 
            $avg: { $cond: [{ $gte: ["$date", startOfWeek] }, "$sleep", null] } 
          },
          avgWeightMonth: { $avg: "$weight" }
        }
      }
    ]);

    const result = stats[0] || {};

    res.status(200).json({
      date: startOfDay.toISOString().split('T')[0],
      daily: {
        waterIntake: dailyLog?.waterIntake || 0,
        steps: dailyLog?.steps || 0
      },
      weekly: {
        yogaSessions: result.totalYogaSessions || 0,
        physioSessions: result.totalPhysioSessions || 0,
        averageSleep: result.avgSleepWeek?.toFixed(1) || 0
      },
      monthly: {
        averageWeight: result.avgWeightMonth?.toFixed(2) || 0
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.put('/daily-log/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { steps, waterIntake, sleep, weight } = req.body;

    // Define the boundaries of "today"
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Find if a log already exists for today among the user's logs
    let log = await Log.findOne({
      _id: { $in: user.logs },
      date: { $gte: startOfDay, $lte: endOfDay }
    });

    if (log) {
      // Update existing log
      if (steps !== undefined) log.steps = steps;
      if (waterIntake !== undefined) log.waterIntake = waterIntake;
      if (sleep !== undefined) log.sleep = sleep;
      if (weight !== undefined) log.weight = weight;
      await log.save();
    } else {
      // Create new log for today
      log = new Log({
        date: new Date(),
        steps: steps || 0,
        waterIntake: waterIntake || 0,
        sleep: sleep || 0,
        weight: weight || user.weight // Fallback to profile weight
      });
      await log.save();

      // Push the new log ID to the user's logs array
      user.logs.push(log._id);
      await user.save();
    }

    res.status(200).json({ message: "Log updated successfully", log });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
    console.log("App listening on port:", port);
});

module.exports= app