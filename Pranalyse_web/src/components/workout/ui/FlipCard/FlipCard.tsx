"use client";

import React, { useState } from "react";
import CardFront from "./CardFront";
import CardBack from "./CardBack";
import { Pose } from "../SelectPose";

interface FlipCardProps {
  pose: Pose;
  cameraInSmallBox: boolean;
  onSwap: () => void;
  cameraRef: React.RefObject<HTMLVideoElement>;
  accuracy: any;
  suggestions: any;
  totalTime: any;
  reps: any;
}

const FlipCard: React.FC<FlipCardProps> = ({
  pose,
  cameraInSmallBox,
  onSwap,
  cameraRef,
  totalTime,
  suggestions,
  reps,
  accuracy,
}) => {
  const [flipped, setFlipped] = useState(false);

  const handleCardClick = () => {
    setFlipped((prev) => !prev);
  };

  return (
    <div
      className="relative w-[420px] h-[540px] perspective cursor-pointer"
      onClick={handleCardClick}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden">
          <CardFront
            pose={pose}
            cameraInSmallBox={cameraInSmallBox}
            cameraRef={cameraRef}
            onSwap={onSwap}
            accuracy={accuracy}
            suggestions={suggestions}
            totalTime={totalTime}
            reps={reps}
            isRunning={true} // Added missing prop requirement
          />
        </div>

        {/* Back */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <CardBack pose={pose} />
        </div>
      </div>
    </div>
  );
};

export default FlipCard;