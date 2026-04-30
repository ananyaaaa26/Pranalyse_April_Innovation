"use client";

import Image from "next/image";
import Link from "next/link";

export default function WorkoutPlanCTA() {
  return (
    <section className="w-full relative -mt-8">

      {/* IMAGE */}
      <Image
        src="/common/WorkoutGeneratorCTA.png"
        alt="Workout Generator"
        width={1920}
        height={700}
        className="w-full h-auto object-cover"
      />

      {/* BUTTON */}
        <Link
        href="/comingsoon"
        className="
        absolute left-6 bottom-6 md:left-44 md:bottom-40
        px-5 py-2 md:px-7 md:py-3 lg:px-9 lg:py-4
        text-sm md:text-lg lg:text-2xl font-bold
        text-white rounded-lg
        bg-[radial-gradient(circle_at_center,_#7C5AEB,_#2C2881)]
        transition-all duration-300
        hover:shadow-[0_0_30px_#886AC9]
        hover:border-2 hover:border-white
        "
        >
        Generate Workout Plan
        </Link>

    </section>
  );
}