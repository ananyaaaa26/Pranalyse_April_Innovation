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

export default function Options() {
  const { setMode } = useMode();

  return (
    <>
        <div className="absolute -bottom-42 left-1/2 -translate-x-1/2">
          <Image src="/physio/p6.png" alt="P6" width={500} height={500} className="animate-particleAssemble" style={{ animationDelay: "2.5s" }}/>
        </div>

      <section className="flex flex-col md:flex-row justify-center items-center gap-30 p-8 mt-14">
        {/* Card 1 */}
        <div className="bg-white/20 border-4 border-[#4BA5D5] rounded-xl p-10 w-130 text-center transition duration-300 hover:bg-white hover:shadow-[0_0_30px_#4BA5D5]">
          <h2 className={`${inknut.className} text-3xl text-black mb-4`}>
            Exercise Selection
          </h2>
          <p className="text-black text-lg mb-6">
            Pick what suits you! Choose one exercise to get started quickly, or
            select several to create your own full workout. You’re in control of
            your routine.
          </p>

          <Link href="/physioworkout">
          <button onClick={() => setMode("start")} className="rounded-md px-6 py-2 text-white text-lg bg-[radial-gradient(circle_at_top_left,_#7C5AEB,_#2C2881)] transition duration-300 hover:bg-[radial-gradient(circle_at_top_left,_#6B4ED4,_#1F1B64)]">
            Start Exercise
          </button>
          </Link>
        </div>

        {/* Card 2 */}
        <div className="bg-white/20 border-4 border-[#4BA5D5] rounded-xl p-10 w-130 text-center transition duration-300 hover:bg-white hover:shadow-[0_0_30px_#4BA5D5]">
          <h2 className={`${inknut.className} text-3xl text-black mb-4`}>
            Auto Detect Exercise
          </h2>
          <p className="text-black text-lg mb-6">
            Watches your movements in real time and automatically detects the pose you're doing, turning every move into measurable progress.
          </p>

          <Link href="/physioworkout">
          <button onClick={() => setMode("auto")} className="rounded-md px-6 py-2 text-white text-lg bg-[radial-gradient(circle_at_top_left,_#7C5AEB,_#2C2881)] transition duration-300 hover:bg-[radial-gradient(circle_at_top_left,_#6B4ED4,_#1F1B64)]">
            Start Exercise Detection
          </button>
          </Link>
        </div>
      </section>
    </>
  );
}