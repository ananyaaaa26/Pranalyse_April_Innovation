"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import healthData from "../../data/HolisticHealthTrial.json";
import 'react-calendar/dist/Calendar.css';
import {
  FaDumbbell,
  FaAppleAlt,
  FaHeartbeat,
  FaTint,
  FaBed,
  FaBrain,
} from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Footer from "@/src/components/global/Footer";
import Navbar from "@/src/components/global/Navbar";
import { signOut } from "next-auth/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ProfileDashboard = () => {
  const [date, setDate] = useState(new Date());

  // Sample chart data
  const weightData = {
    labels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    datasets: [
      {
        label: "Weight (kg)",
        data: [57, 57, 57.8, 57.5, 56, 55],
        borderColor: "#19008A",
        backgroundColor: "rgba(52,211,153,0.2)",
        tension: 0.4,
      },
    ],
  };

  // Water intake percentage (for circular ring)
  const waterGoal = 3; // liters
  const waterIntake = 2.3; // liters
  const waterPercent = Math.min((waterIntake / waterGoal) * 100, 100);

  return (
    <>
    <Navbar/>
    <div className="min-h-screen p-12 mt-20 mb-10">
      {/* 1. My Details / Avatar */}
<div className="bg-white shadow-lg rounded-xl p-6 relative flex flex-col lg:flex-row items-center lg:items-start space-y-4 lg:space-y-0 lg:space-x-6 mb-6">
  {/* Avatar */}
  <img
    src="/global/avatar.png"
    alt="Avatar"
    className="w-28 h-28 rounded-full border-4 border-[#7C5AEB] shadow-lg object-cover"
  />

  {/* Profile Info */}
  <div className="flex-1">
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Ananya V A</h1>
        <p className="text-gray-500 mt-1">User ID: #ananya990</p>
      </div>

      {/* Login Today's Stats Button */}
      <div className="flex flex-col space-y-2">
        <button className="bg-[#7C5AEB] text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition">
          Log Today's Stats
        </button>
        <button 
          onClick={async ()=>{
            await signOut({callbackUrl:"/", redirect: true})
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition">
          Sign Out
        </button>
      </div>
    </div>

    {/* Achievements / Level */}
    <div className="mt-4 flex items-center space-x-4">
      {/* Level Badge */}
      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold text-sm">
        Beginner
      </div>

      {/* Progress Bar */}
      <div className="w-40 bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className="bg-[#7C5AEB] h-4 rounded-full"
          style={{ width: "15%" }} // Example progress % towards next level
        ></div>
      </div>

      {/* Achievements */}
      <div className="flex space-x-2">
        <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold">
          5 Workouts Completed
        </span>
        <span className="bg-pink-200 text-pink-800 px-2 py-1 rounded-full text-xs font-semibold">
          3 Yoga Sessions
        </span>
      </div>
    </div>
  </div>
</div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  {/* 1. Health Metrics Card */}
  <div className="bg-white shadow-lg rounded-xl p-6">
    <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
      <FaHeartbeat className="text-red-500" /> Health Metrics
    </h2>

    <div className="space-y-2">
      <p className="flex justify-between">
        <span className="font-semibold">Height:</span>
        <span>168 cm</span>
      </p>
      <p className="flex justify-between">
        <span className="font-semibold">Weight:</span>
        <span>55 kg</span>
      </p>
      <p className="flex justify-between">
        <span className="font-semibold">BMI:</span>
        <span>19.5 (Healthy)</span>
      </p>
      <p className="flex justify-between">
        <span className="font-semibold">Heart Rate:</span>
        <span>72 bpm</span>
      </p>
      <p className="flex justify-between">
        <span className="font-semibold">Sleep Avg:</span>
        <span>7 hrs/night</span>
      </p>
    </div>

      <p className="text-sm font-medium text-gray-700 mt-4 mb-1">BMI Target</p>
      <div className="w-full bg-gray-200 h-3 rounded-full">
        <div className="bg-blue-400 h-3 rounded-full" style={{ width: "75%" }}></div>
      </div>
    </div>


  {/* 2. Workout Card */}
  <div className="bg-white shadow-lg rounded-xl p-6">
    <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
      <FaDumbbell className="text-green-500" /> Workout
    </h2>

    <div className="space-y-2">
      <p className="flex justify-between">
        <span>Yoga:</span>
        <span>5 sessions/week</span>
      </p>
      <p className="flex justify-between">
        <span>Physiotherapy:</span>
        <span>3 sessions/week</span>
      </p>
      <p className="flex justify-between">
        <span>Home Workouts:</span>
        <span>8 sessions/week</span>
      </p>
    </div>

    {/* Mini progress bars */}
    <div className="mt-4 space-y-2">
      <p className="text-sm font-medium text-gray-700 mb-1">Weekly Workout Completion</p>
      <div className="w-full bg-gray-200 h-3 rounded-full">
        <div className="bg-green-500 h-3 rounded-full" style={{ width: "90%" }}></div>
      </div>
    </div>
  </div>

  {/* 3. Goals Card */}
  <div className="bg-white shadow-lg rounded-xl p-6">
    <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
      <FaAppleAlt className="text-red-500" /> Goals
    </h2>

    <div className="space-y-3">
      <p className="flex justify-between">
        <span className="font-semibold">Primary Goal:</span>
        <span>Weight Loss</span>
      </p>
      <p className="flex justify-between">
        <span>Secondary Goal:</span>
        <span>Flexibility</span>
      </p>
      <p className="flex justify-between">
        <span>Target Weight:</span>
        <span>54 kg</span>
      </p>
      <p className="flex justify-between">
        <span>Goal Duration:</span>
        <span>3 Months</span>
      </p>
      <p className="flex justify-between">
        <span>Progress:</span>
        <span>35%</span>
      </p>
    </div>

    {/* Progress Bar */}
    <div className="mt-4">
      <div className="w-full bg-gray-200 h-3 rounded-full">
        <div className="bg-[#7C5AEB] h-3 rounded-full" style={{ width: "45%" }}></div>
      </div>
    </div>
  </div>

  {/* 1. Nutrition Card */}
  <div className="bg-white shadow-lg rounded-xl p-6">
    <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
      <FaAppleAlt className="text-[#2F7B31]" /> Nutrition
    </h2>

    <div className="space-y-2">
      <p className="flex justify-between"><span className="font-semibold">Calories:</span> 900 kcal/day</p>
      <p className="flex justify-between"><span className="font-semibold">Protein:</span> 45 g</p>
      <p className="flex justify-between"><span className="font-semibold">Carbs:</span> 220 g</p>
      <p className="flex justify-between"><span className="font-semibold">Fats:</span> 50 g</p>
      <p className="flex justify-between"><span className="font-semibold">Fiber:</span> 28 g</p>
      <p className="flex justify-between"><span className="font-semibold">Diet Type:</span> Vegetarian</p>
      <p className="flex justify-between"><span className="font-semibold">Meals/Day:</span> 2</p>
    </div>

    <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg">
      💡 Tip: Need to increase calories intake and include fiber-rich foods like oats, lentils, and leafy vegetables to improve digestion.
    </div>
  </div>

  {/* 2. Steps Card */}
  <div className="bg-white shadow-lg rounded-xl p-6">
    <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
      <FaHeartbeat className="text-[#C07D4C]" /> Steps
    </h2>

    <div className="mb-4">
      {/* Steps progress bar */}
      <p className="text-sm font-medium text-gray-700 mb-1">Daily Steps: 5000 / 10000</p>
      <div className="w-full bg-gray-200 h-3 rounded-full">
        <div className="bg-[#C07D4C] h-3 rounded-full" style={{ width: "85%" }}></div>
      </div>
    </div>

    {/* Weekly steps chart */}
    <div className="mb-2">
      <Line
        data={{
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              label: "Steps",
              data: [7000, 7500, 6000, 8000, 5000],
              borderColor: "#C07D4C",
              backgroundColor: "rgba(236,72,153,0.2)",
              tension: 0.4,
            },
          ],
        }}
      />
    </div>
  </div>

  {/* 3. Water Intake Card */}
  <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center">
    <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
      <FaTint className="text-blue-400" /> Water Intake
    </h2>

    {/* Circular Progress */}
    <div className="relative w-32 h-32 mb-4">
      <svg className="w-32 h-32 transform -rotate-90">
        <circle
          className="text-gray-200"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r="48"
          cx="64"
          cy="64"
        />
        <circle
          className="text-blue-400"
          strokeWidth="8"
          stroke="currentColor"
          strokeDasharray={2 * Math.PI * 48} // circumference
          strokeDashoffset={2 * Math.PI * 48 * 0.95} // 70% progress
          strokeLinecap="round"
          fill="transparent"
          r="48"
          cx="64"
          cy="64"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-lg font-semibold text-gray-700">Water</p>
        <p className="text-xl font-bold text-blue-400">0.2L / 3L</p>
      </div>
    </div>

    <div className="p-3 bg-blue-100 text-blue-800 rounded-lg text-center">
      💡 Tip: Start your day by drinking a glass of water right after you wake up, it kickstarts your metabolism and hydrates your body.
    </div>
  </div>

        {/* 9. Weight */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaBed className="mr-2 text-[#19008A]" /> Weight
          </h2>
          <div className="mb-4">
            <Line data={weightData} />
          </div>
          <p>Current Weight: 55 kg</p>
          <p>Target Weight: 54 kg</p>
        </div>

{/* 10. Enhanced Sleep Card */}
<div className="bg-white shadow-lg rounded-xl p-6">
  <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
    <FaBed className="text-indigo-500" /> Sleep
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
    {/* Sleep Trend Chart */}
    <div>
      <Line
        data={{
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              label: "Sleep (hrs)",
              data: [7, 6.5, 8, 7, 7.5, 6, 7],
              borderColor: "#6366F1",
              backgroundColor: "rgba(99,102,241,0.2)",
              tension: 0.4,
            },
          ],
        }}
      />
    </div>

    {/* Sleep Stages & Metrics */}
    <div className="space-y-2">
      <p className="flex justify-between"><span className="font-semibold">Average Sleep:</span> 7 hrs/night</p>
      <p className="flex justify-between"><span className="font-semibold">Sleep Quality:</span> Average</p>
      <p className="flex justify-between"><span className="font-semibold">Bedtime:</span> 03:00 AM</p>
      <p className="flex justify-between"><span className="font-semibold">Wakeup:</span> 10:00 AM</p>
      <p className="flex justify-between"><span className="font-semibold">Sleep Score:</span> 55/100</p>
      <div className="flex justify-between space-x-2 mt-2">
        <div className="flex-1 text-center">
          <p className="text-sm">Deep</p>
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 font-bold">2h</div>
        </div>
        <div className="flex-1 text-center">
          <p className="text-sm">Light</p>
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 font-bold">4h</div>
        </div>
        <div className="flex-1 text-center">
          <p className="text-sm">REM</p>
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 font-bold">1h</div>
        </div>
      </div>
    </div>
  </div>

  <div className="mt-4 p-3 bg-indigo-100 text-indigo-700 rounded-lg">
💡 Tip: Try gradually shifting your bedtime earlier, start by going to bed 15–30 minutes earlier each night and limit screens 30–60 minutes before sleep to improve rest and energy.  
</div>
</div>

{/* 11. Enhanced Mental Health Card */}
<div className="bg-white shadow-lg rounded-xl p-6">
  <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
    <FaBrain className="text-purple-500" /> Mental Health
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
    {/* Mood Trend Chart */}
    <div>
      <Line
        data={{
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              label: "Mood Score (1-10)",
              data: [7, 6, 8, 7, 7, 6, 7],
              borderColor: "#A855F7",
              backgroundColor: "rgba(168,85,247,0.2)",
              tension: 0.4,
            },
          ],
        }}
      />
    </div>

    {/* Metrics & Indicators */}
    <div className="space-y-2">
      <p className="flex justify-between"><span className="font-semibold">Current Mood:</span> Feeling Good 🙂</p>
      <p className="flex justify-between"><span className="font-semibold">Stress Level:</span> Moderate</p>
      <p className="flex justify-between"><span className="font-semibold">Energy Level:</span> Medium</p>
      <p className="flex justify-between"><span className="font-semibold">Focus Score:</span> 7/10</p>

      <div className="mt-2">
        <p className="text-sm font-semibold mb-1">Stress Progress:</p>
        <div className="w-full bg-gray-200 h-3 rounded-full">
          <div className="bg-purple-500 h-3 rounded-full" style={{ width: "60%" }}></div>
        </div>
      </div>
    </div>
  </div>

  <div className="mt-4 p-3 bg-purple-100 text-purple-700 rounded-lg">
    💡 Tip: Take 5-10 minutes today to meditate or practice deep breathing to reduce stress.
  </div>
</div>

<div className="bg-white shadow-xl rounded-2xl p-8 lg:col-span-3">
  <h2 className="text-2xl font-bold mb-8 flex items-center space-x-3 text-pink-600">
    <span role="img" aria-label="drop">🩸</span> <span>Period Health</span>
  </h2>

  {/* Top Section: Ring & Info (Center) and Calendar (Far Right) */}
  <div className="flex flex-col lg:flex-row justify-between items-start mb-12 gap-8">
    
    {/* Left/Center Column: Increased Ring, Symptoms, and Tips */}
    <div className="flex flex-col items-center text-center gap-8 flex-grow">
      {/* Increased Circular Progress Size to w-48 h-48 */}
      <div className="relative w-48 h-48">
<svg className="w-48 h-48 transform -rotate-90">
  {/* Background Circle */}
  <circle
    cx="50%"
    cy="50%"
    r="45%"
    stroke="#FDEBF7"
    strokeWidth="16"
    fill="none"
  />

  {/* Progress Circle */}
  <circle
    cx="50%"
    cy="50%"
    r="45%"
    stroke="#EC4899"
    strokeWidth="16"
    strokeDasharray={2 * Math.PI * 45} // circumference = 2πr
    strokeDashoffset={(2 * Math.PI * 45) * (1 - 5 / 28)} // progress = 5/28
    strokeLinecap="round"
    fill="none"
  />
</svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-bold text-pink-600">4/28</span>
          <span className="text-base text-gray-500 font-medium">Day of Cycle</span>
        </div>
      </div>

      {/* Common Symptoms - Centered */}
      <div className="w-full max-w-sm">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Common Symptoms</h3>
        <div className="flex flex-wrap justify-center gap-3">
          <span className="bg-pink-100 text-pink-700 rounded-full px-4 py-1.5 text-sm font-medium">Severe Cramps</span>
          <span className="bg-pink-100 text-pink-700 rounded-full px-4 py-1.5 text-sm font-medium">Fatigue</span>
          <span className="bg-pink-100 text-pink-700 rounded-full px-4 py-1.5 text-sm font-medium">Moody</span>
        </div>
      </div>

      {/* AI Tips - Centered */}
<div className="p-5 bg-pink-50 rounded-2xl shadow-sm border border-pink-100 flex items-start gap-4 max-w-2xl w-full">
  <div className="text-pink-600 text-3xl">💡</div>
  <p className="text-pink-800 font-medium text-sm text-left leading-relaxed">
    Stay hydrated and do light yoga or stretching to relieve cramps. Include iron-rich foods like spinach and lentils during your period.
  </p>
</div>
    </div>

    {/* Right Column: Calendar remains at the far right */}
    <div className="w-full lg:w-auto flex justify-end">
      <div className="shadow-inner p-4 rounded-xl bg-pink-200 border border-gray-100 -translate-x-24">
        <Calendar
          onChange={setDate}
          value={date}
          tileClassName={({ date }) => {
            const day = date.getDate();
            if ([24, 25, 26, 27, 28].includes(day)) return "bg-pink-200 rounded-full";
            return "";
          }}
          className="react-calendar border-none !bg-transparent"
        />
      </div>
    </div>
  </div>

  {/* Bottom Section: Stats spanning full width */}
  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
    <div className="bg-pink-50 rounded-xl p-4 text-center border border-pink-100">
      <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Last Cycle Length</p>
      <p className="font-bold text-lg text-pink-600">28 days</p>
    </div>
    <div className="bg-pink-50 rounded-xl p-4 text-center border border-pink-100">
      <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Period Length</p>
      <p className="font-bold text-lg text-pink-600">6 days</p>
    </div>
    <div className="bg-pink-50 rounded-xl p-4 text-center border border-pink-100">
      <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Next Period</p>
      <p className="font-bold text-lg text-pink-600">22 April 2026</p>
    </div>
    <div className="bg-yellow-50 rounded-xl p-4 text-center border border-yellow-100">
      <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Fertile Window</p>
      <p className="font-bold text-lg text-yellow-600">12–16 March</p>
    </div>
    <div className="bg-green-50 rounded-xl p-4 text-center border border-green-100">
      <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Ovulation Day</p>
      <p className="font-bold text-lg text-green-600">14 March</p>
    </div>
  </div>
</div>

        {/* 13. AI Insights / Tips */}
{/* 13. AI Insights / Tips */}
<div className="bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg rounded-lg p-6 lg:col-span-3">
  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
    🤖 AI Insights
  </h2>
  <ul className="space-y-4">
    {healthData.map((item) => (
      <li
        key={item.id}
        className={`
          flex items-start space-x-4 p-4 rounded-lg cursor-pointer
          transition-transform duration-300 transform
          hover:scale-105 hover:shadow-xl
          bg-white/20
          hover:bg-white/30
        `}
      >
        <div
          className="w-18 h-18 flex items-center justify-center rounded-full shadow-md flex-shrink-0"
          style={{ backgroundColor: item.hoverColor }}
        >
          <img src={item.icon.src} alt={item.title} className="w-14 h-14" />
        </div>
        <div>
          <p className="font-semibold text-black text-lg">{item.title}</p>
          <p className="text-black text-sm mt-1">{item.summary}</p>
        </div>
      </li>
    ))}
  </ul>
</div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ProfileDashboard;