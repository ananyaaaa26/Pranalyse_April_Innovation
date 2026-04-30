"use client";

import React, { useEffect } from "react";
import { Pose } from "../SelectPose";
import PoseGuide from "../../video/PoseGuide";
import CameraFeed from "../../video/CameraFeed";

const CardFront= ({
  pose,
  cameraInSmallBox,
  onSwap,
  cameraRef,
  isRunning,
  totalTime,
  suggestions,
  reps,
  accuracy,
}) => {
  useEffect(() => {
    console.log(totalTime, suggestions, reps, accuracy);
  }, []);

  // Handler to stop the click from flipping the card when swapping
  const handleSwapClick = (e) => {
    e.stopPropagation();
    onSwap();
  };


  useEffect(()=>{
    console.log("physio: ", pose)
  },[])

  return (
    <div className="w-[420px] h-[540px] bg-white rounded-2xl shadow-2xl p-6 flex flex-col border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-4 mb-5">
        <div className="flex-shrink-0" onClick={handleSwapClick}>
          {cameraInSmallBox ? (
            <CameraFeed
              videoRef={cameraRef}
              width="150px"
              height="150px"
              className="cursor-pointer"
              cameraInSmallBox={cameraInSmallBox}
              // FIX: Pass the pose and required setters
              selectedPose={pose}
              setTotalTime={() => {}} 
              setSuggestions={() => {}}
              setRepCount={() => {}}
              setAccuracy={() => {}}
            />
          ) : (
            <PoseGuide
              pose={pose}
              onSwap={onSwap} // PoseGuide internal button should also stopPropagation if possible
              width="150px"
              height="150px"
              videoSrc={pose.videoUrl}
            />
          )}
        </div>

        {/* Pose Names */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-semibold text-[#8b75eb] leading-tight">
            {pose["eng-name"] || pose["title"]}
          </h2>
          <p className="text-lg text-[#000000] font-bold mt-2">
            {pose["hindi-name"]}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-[1px] bg-gray-200 mb-5" />

      {/* Stats/Feedback Area */}
      <div className="flex-3 overflow-y-auto mt-2 space-y-4">
        <p className="text-black text-[15px] leading-relaxed">
          Accuracy: {accuracy} %
        </p>
        <p className="text-black text-[15px] leading-relaxed">
          Reps: {reps || 0}
        </p>

        <div className="flex flex-col border-l-4 border-indigo-500 bg-white p-3 shadow-md">
  <span className="font-bold text-indigo-900 mb-1">Suggestions:</span>
  
  {suggestions.length > 0 && (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((s, i) => (
        <div 
          key={i} 
          className="inline-block px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-medium border border-indigo-100"
        >
          {s}
        </div>
      ))}
    </div>
  )}
</div>
      </div>
    </div>
  );
};

export default CardFront;