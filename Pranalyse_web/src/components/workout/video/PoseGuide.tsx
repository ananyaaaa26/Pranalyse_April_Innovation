"use client";

import React, { useState } from "react";
import { Pose } from "../ui/SelectPose";
import { FaExpand } from "react-icons/fa";

interface PoseGuideProps {
  pose: Pose;
  onSwap: () => void;
  width?: string | number;
  height?: string | number;
  videoSrc?: string; // optional video URL
}

const PoseGuide: React.FC<PoseGuideProps> = ({
  pose,
  onSwap,
  width = "6rem",
  height = "6rem",
  videoSrc,
}) => {
  const [videoError, setVideoError] = useState(false);

  const imagePath = pose.link
    ? `/yoga/poses/${pose.link}`
    : "/yoga/poses/char.png";

  return (
    <div
      className="relative cursor-pointer"
      style={{ width, height }}
      onClick={(e) => {
        e.stopPropagation();
        onSwap();
      }}
    >
      {videoSrc && !videoError ? (
        <video
          src={videoSrc}
          autoPlay
          muted
          loop
          className="w-full h-full object-cover rounded-xl border border-gray-200 shadow-sm"
          onError={() => setVideoError(true)} // fallback to image on error
        />
      ) : (
        <img
          src={imagePath}
          alt={pose["eng-name"]}
          className="w-full h-full object-cover rounded-xl border border-gray-200 shadow-sm"
        />
      )}

      <div className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow-md">
        <FaExpand className="w-3 h-3 text-gray-800" />
      </div>
    </div>
  );
};

export default PoseGuide;