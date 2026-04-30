"use client";

import Background from "@/src/components/multistepform/Background";
import Heading from "@/src/components/multistepform/Heading";

export default function YourDetails() {
  return (
    <div className="w-screen h-screen relative overflow-hidden">
      {/* 1️⃣ Background layer */}
      <Background />

      {/* 2️⃣ Content layer */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4">
        <Heading />
        {/* You can add more components here (forms, buttons, etc.) */}
      </div>
    </div>
  );
}