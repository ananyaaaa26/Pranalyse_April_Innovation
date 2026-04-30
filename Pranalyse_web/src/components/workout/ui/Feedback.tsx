"use client";

import React, { useEffect, useState } from "react";
import yoga from "../../../data/yoga.json"; // array of poses

interface FeedbackProps {
  isRunning: boolean;
  poseIndex?: number; // which yoga pose to show instructions
}

const Feedback: React.FC<FeedbackProps> = ({ isRunning, poseIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("Please click the start button to proceed.");
  const [fade, setFade] = useState(true);

  // Get instructions safely
  const instructions =
    isRunning && yoga[poseIndex]?.instructions
      ? yoga[poseIndex].instructions.split("\n").filter((line: string) => line.trim() !== "")
      : [];

  useEffect(() => {
    if (!isRunning) {
      setDisplayText("Please click the start button to proceed.");
      setCurrentIndex(0);
      setFade(true);
      return;
    }

    setCurrentIndex(0);
    setDisplayText(instructions[0] || "");
    setFade(true);

    const interval = setInterval(() => {
      setFade(false);

      const timeout = setTimeout(() => {
        setCurrentIndex((prev) => {
          const next = prev + 1;
          if (next < instructions.length) {
            setDisplayText(instructions[next]);
            setFade(true);
            return next;
          } else {
            clearInterval(interval);
            clearTimeout(timeout);
            return prev;
          }
        });
      }, 300); // fade out duration
    }, 3000); // 3s between instructions

    return () => clearInterval(interval);
  }, [isRunning, instructions]);

  return (
    <div
      className="w-full max-w-[400px] px-5 py-4 rounded-lg transition-all duration-500"
      style={{
        backgroundColor: "#3C3269",
        color: "white",
        minHeight: "50px",
      }}
    >
      <p
        className={`text-sm md:text-base font-bold leading-relaxed transition-opacity duration-300 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        {displayText}
      </p>
    </div>
  );
};

export default Feedback;