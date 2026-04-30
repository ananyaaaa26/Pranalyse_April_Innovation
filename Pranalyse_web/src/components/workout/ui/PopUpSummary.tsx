"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface PopUpSummaryProps {
  workoutDone: boolean;
}

export default function PopUpSummary({ workoutDone, accuracy, totalTime, reps, selectedPose }: any) {
  const router = useRouter();

  console.log(selectedPose, totalTime, reps)

  const handleOkay = () => {
    router.push("/yoga");
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"></div>

      {/* Popup */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-[#3C3269] rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.9)] 
px-10 py-8 w-[90%] max-w-[900px] min-h-[500px] flex flex-col gap-6">

          {/* Top Row */}
          <div className="flex items-center justify-between">
            <h2 className="text-white text-2xl font-semibold">
              Today’s Workout Summary
            </h2>

            <button
              onClick={handleOkay}
              className="flex items-center gap-2 px-5 py-2 rounded-md
                         text-white font-semibold
                         bg-gradient-to-r from-green-400 to-green-600
                         transition-all duration-300
                         hover:shadow-[0_0_18px_rgba(255,255,255,0.9)]
                         hover:brightness-90"
            >
              ✓ Okay
            </button>
          </div>

          {/* Content */}
          <div className="flex justify-center items-center text-white h-full">

            {workoutDone ? (
              <div className="text-center space-y-2">
                <p className="text-lg font-semibold">
                  Great job! 🎉
                </p>
                <p className="text-sm text-gray-200">
                  You completed today's yoga session.
                </p>
              </div>
            ) : (
              // <Image
              //     src="/workout/noworkout.png"
              //     alt="No workout"
              //     width={800}
              //     height={800}
              //     className="opacity-90 w-96"
              //   />
              <div className="flex flex-col items-center justify-between h-full space-y-10">
                <Image
                  src="/workout/noworkout.png"
                  alt="No workout"
                  width={800}
                  height={800}
                  className="opacity-90 w-96"
                />
                <div className="w-full flex flex-col space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Pose:</span>
                    <span>{selectedPose && selectedPose["eng-name"]!=undefined && selectedPose["eng-name"]}</span>
                    <span>{selectedPose && selectedPose["title"]!=undefined && selectedPose["title"]}</span>
                    {/* <span>{selectedPose}</span> */}
                  </div>
                  <hr />
                  <div className="flex items-center justify-between">
                    <span>Reps:</span>
                    <span>{reps}</span>
                  </div>
                  <hr />
                  {/* <div className="flex items-center justify-between">
                    <span>Accuracy:</span>
                    <span>{accuracy}</span>
                  </div>
                  <hr /> */}
                  <div className="flex items-center justify-between">
                    <span>Time:</span>
                    <span>{totalTime}</span>
                  </div>
                  <hr />
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}