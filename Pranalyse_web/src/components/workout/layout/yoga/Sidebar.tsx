"use client";

import React, { useEffect } from "react";
import FlipCard from "../../ui/FlipCard/FlipCard";
import { Pose } from "../../ui/SelectPose";

type SidebarProps = {
  selectedPose: Pose | null;
  cameraInSmallBox: boolean;
  onSwap: () => void;
  cameraRef: React.RefObject<HTMLVideoElement>;
  accuracy: any
  suggestions: any
  totalTime: any
  reps:any
};

export default function Sidebar({ selectedPose, cameraInSmallBox, onSwap, cameraRef, totalTime, suggestions, reps, accuracy }: SidebarProps) {
  
  return (
    <div className="flex flex-col items-center">
      {selectedPose && (
        <FlipCard
          pose={selectedPose}
          cameraInSmallBox={cameraInSmallBox}
          onSwap={onSwap}
          cameraRef={cameraRef}
          accuracy={accuracy}
          suggestions={suggestions}
          totalTime={totalTime}
          reps={reps}
        />
      )}
    </div>
  );
}