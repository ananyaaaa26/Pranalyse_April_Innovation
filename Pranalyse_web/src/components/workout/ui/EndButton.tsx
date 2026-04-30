"use client";

import { useState } from "react";
import PopUpSummary from "./PopUpSummary"; // Replace with your actual popup import
import { motion } from "framer-motion";

export default function EndButton({accuracy, totalTime, reps, selectedPose}:any) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      {/* End Workout Button */}
      <motion.button
        onClick={() => setShowPopup(true)}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 20px 5px rgba(255, 255, 255, 0.7)",
        }}
        className="fixed px-40 py-3 rounded-lg
          border border-white
          text-white font-bold
          bg-[radial-gradient(circle_at_center,_#7C5AEB,_#2C2881)]
          transition-all duration-300
          hover:bg-[radial-gradient(circle_at_center,_#6b4fd0,_#1f1c5f)]
        "
      >
        End Workout
      </motion.button>

      {/* Popup */}
      {showPopup && (
        <PopUpSummary 
          onClose={() => setShowPopup(false)}  
          accuracy={accuracy} 
          totalTime={totalTime}
          reps={reps} 
          selectedPose={selectedPose}
        />
      )}
    </>
  );
}