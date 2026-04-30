"use client";

import { ChangeEvent } from "react";
import yogaData from "../../../data/yoga.json";
import { Hind_Vadodara } from "next/font/google";

const hind = Hind_Vadodara({ weight: "600", subsets: ["latin"] });

// Pose type based on yoga.json
export type Pose = typeof yogaData[0];

type SelectPoseProps = {
  poses?: any; // optional in case nothing passed
  selectedPose: Pose | null;
  onChange: (pose: Pose) => void;
};

export default function SelectPose({
  poses = [], // default empty array
  selectedPose,
  onChange,
}: SelectPoseProps) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value)
    const pose = poses.find((p:any) => p.title === e.target.value);
    if (pose) onChange(pose);
  };

  return (
    <div className="w-full md:w-1/2 relative bg-[#2D2243] rounded-lg">
      <select
        value={selectedPose?.title || ""} // safe for null
        onChange={handleChange}
        className={`${hind.className} w-full bg-transparent text-white appearance-none px-4 py-3 rounded-lg focus:outline-none`}
      >
        <option value="" disabled>
          Select a pose
        </option>
        {poses.length > 0 &&
          poses.map((pose:any) => (
            <option key={pose.title} value={pose.title}>
              {pose["title"]}
            </option>
          ))}
      </select>

      {/* Downward triangle icon */}
      <div className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-white">
        ▼
      </div>
    </div>
  );
}