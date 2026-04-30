"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Book({ leftContent, rightContent, onCloseComplete, submitted }) {
  const [phase, setPhase] = useState("initial");

  // Open the book after mount
  useEffect(() => {
    const timer = setTimeout(() => setPhase("open"), 100); // short delay to trigger animation
    return () => clearTimeout(timer);
  }, []);

  useEffect(()=>{
    console.log("submitted",submitted);
    if(submitted==true) setPhase("closing")
  },[submitted])

  const handleClose = () => setPhase("closing");

  // Variants for Framer Motion
  const leftVariants = {
    initial: { rotateY: -90 },
    open: { rotateY: 0, transition: { duration: 4, ease: "easeInOut" } },
    closing: { rotateY: -90, transition: { duration: 4, ease: "easeInOut" } },
  };

  const rightVariants = {
    initial: { rotateY: 90 },
    open: { rotateY: 0, transition: { duration: 4, ease: "easeInOut" } },
    closing: { rotateY: 90, transition: { duration: 4, ease: "easeInOut" } },
  };

  return (
    <div className="relative [perspective:1500px] w-[800px] h-[500px] flex">
      <motion.div
        className="w-[55%] origin-right bg-white"
        animate={phase}
        variants={leftVariants}
        onAnimationComplete={() => phase === "closing" && onCloseComplete?.()}
      >
        {leftContent}
      </motion.div>

      <motion.div
        className="w-[45%] origin-left bg-white"
        animate={phase}
        variants={rightVariants}
      >
        {rightContent}
      </motion.div>

      {/* {phase !== "closing" && (
        <button
          onClick={handleClose}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white p-2 rounded"
        >
          Close Book
        </button>
      )} */}
    </div>
  );
}