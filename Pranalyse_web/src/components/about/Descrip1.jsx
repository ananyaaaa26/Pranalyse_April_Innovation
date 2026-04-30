"use client";

import React from "react";
import { Imprima } from "next/font/google";

const imprima = Imprima({
  weight: "400",
  subsets: ["latin"],
});

function Descrip1() {
  return (
    <div className="flex justify-center -mt-2 px-6">
  <div className="max-w-7xl bg-white/50 backdrop-blur-md rounded-2xl p-12 shadow-lg">
    <p
      className={`${imprima.className} text-black text-xl text-center leading-[2.3] tracking-[0.16em]`}
    >
      Our platform helps you understand your body and mind in real time. By
      analyzing movement, posture, and daily patterns, it provides gentle
      guidance that supports both physical health and mental wellbeing. With
      greater awareness of how you move and feel, you can make small,
      meaningful adjustments that reduce strain, improve focus, and build
      healthier habits so wellness becomes a natural part of everyday life.
    </p>
  </div>
</div>
  );
}

export default Descrip1;