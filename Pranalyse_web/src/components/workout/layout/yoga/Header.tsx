"use client";

import { Hind_Vadodara } from "next/font/google";
import ModeToggle from "../../ui/ModeToggle";
import SelectPose, { Pose } from "../../ui/SelectPose";
import TimerDisplay from "../../timer/TimerDisplay";
import yogaData from "@/src/data/yoga.json";
import physioData from "@/src/data/physio.json";

const hind = Hind_Vadodara({
  weight: "700",
  subsets: ["latin"],
});

type HeaderProps = {
  selectedPose: Pose | null;
  setSelectedPose: (pose: Pose) => void;
  seconds: number; // ✅ add this
  page: String
};

export default function Header({
  selectedPose,
  setSelectedPose,
  seconds,
  page
}: HeaderProps) {
  return (
    <header className="w-full">
      <div className="w-full bg-white/40 rounded-b-3xl px-8 py-2 flex items-center space-x-4">
        
        <h1 className={`${hind.className} text-black text-2xl md:text-4xl`}>
          {page=="yoga"?<>YOGA</>:<>PHYSIO</>}
        </h1>

        <div className="flex-1">
          <SelectPose
            poses={page=="yoga"?yogaData:physioData}
            selectedPose={selectedPose}
            onChange={setSelectedPose}
          />
        </div>

        <ModeToggle />

        <TimerDisplay seconds={seconds} />

      </div>
    </header>
  );
}