"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useMode } from "@/context/ModeContext";
import { Inknut_Antiqua } from "next/font/google";

const inknut = Inknut_Antiqua({
  weight: "400",
  subsets: ["latin"],
});

export default function TreeWithOptions() {
  
  const { setMode } = useMode();

  return (
    <div className="relative w-full">

      {/* TREE IMAGE */}
      <div className="absolute right-0 -top-190 z-0">
        <Image
          src="/yoga/tree.png"
          alt="FAQ bg"
          width={1200}
          height={600}
          className="w-[600px] md:w-[900px] lg:w-[1200px] h-auto"
        />
      </div>

      {/* CARDS */}
      <section className="relative z-10 flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20 lg:gap-30 px-4 md:px-8 mt-20 md:mt-40">

        {/* Card 1 */}
        <div className="bg-white/20 border-4 border-[#673715] rounded-xl p-6 md:p-8 lg:p-10 w-[90%] md:w-[420px] lg:w-[520px] text-center transition duration-300 hover:bg-white hover:shadow-[0_0_30px_#94603C]">
          <h2 className={`${inknut.className} text-2xl md:text-3xl text-black mb-4`}>
            Yoga Pose Selection
          </h2>

          <p className="text-black text-base md:text-lg mb-6">
            Pick what suits you! Choose one exercise to get started quickly, or
            select several to create your own full workout. You’re in control of
            your routine.
          </p>

          <Link href="/yogaworkout">
  <button onClick={() => setMode("start")} className="rounded-md px-6 py-2 text-white text-base md:text-lg bg-[radial-gradient(circle_at_top_left,_#7C5AEB,_#2C2881)] transition duration-300 hover:bg-[radial-gradient(circle_at_top_left,_#6B4ED4,_#1F1B64)]">
    Start Yoga
  </button>
</Link>
        </div>

        {/* Card 2 */}
        <div className="bg-white/20 border-4 border-[#673715] rounded-xl p-6 md:p-8 lg:p-10 w-[90%] md:w-[420px] lg:w-[520px] text-center transition duration-300 hover:bg-white hover:shadow-[0_0_30px_#94603C]">
          <h2 className={`${inknut.className} text-2xl md:text-3xl text-black mb-4`}>
            Auto Detect Pose
          </h2>

          <p className="text-black text-base md:text-lg mb-6">
            Watches your movements in real time and automatically detects the
            pose you're doing, turning every move into measurable progress.
          </p>

          <Link href="/yogaworkout">
  <button onClick={() => setMode("auto")} className="rounded-md px-6 py-2 text-white text-base md:text-lg bg-[radial-gradient(circle_at_top_left,_#7C5AEB,_#2C2881)] transition duration-300 hover:bg-[radial-gradient(circle_at_top_left,_#6B4ED4,_#1F1B64)]">
    Start Pose Detection
  </button>
</Link>
        </div>

      </section>
    </div>
  );
}