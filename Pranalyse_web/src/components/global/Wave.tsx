"use client";

import React from "react";
import Image from "next/image";

function Wave() {

  return (
    <div className="relative w-full h-24">
      {/* Left Wave (Wipes from Left to Right) */}
      <div
        className={`absolute left-0 top-4 h-20 w-1/2 animate-waveLeftToRight z-10`}
      >
        <Image
          src="/global/lwave.png"
          alt="Left Wave"
          fill
          style={{ objectFit: "contain", objectPosition: "left" }}
        />
      </div>

      {/* Right Wave (Wipes from Right to Left) */}
      <div
        className={`absolute right-0 -mt-20 h-20 w-1/2 animate-waveRightToLeft z-0`}
      >
        <Image
          src="/global/rwave.png"
          alt="Right Wave"
          fill
          style={{ objectFit: "contain", objectPosition: "right" }}
        />
      </div>
    </div>
  );
}

export default Wave;