"use client";

import { useRouter } from "next/navigation"; // Import useRouter from Next.js
import Image from "next/image";
import DnaAnimation from "./DnaAnimation"; // Import the DnaAnimation component

export default function HeroSection() {
  const router = useRouter(); // Initialize useRouter

  // Function to handle the button click and navigate to /yoga
  const handleClick = () => {
    router.push("/yoga");
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center px-6 opacity-0 animate-fadeIn">
      
      {/* 1. TOP LEFT: Pills - Rotated and tucked into corner */}
      <div className="absolute top-[-2%] left-[-2%] md:top-10 md:left-10 opacity-90">
        <Image
          src="/home/violet_pills.png"
          alt="Violet Pills"
          width={240}
          height={240}
          className="object-contain -rotate-12"
        />
      </div>

      {/* DNA Animation (new component) */}
      <DnaAnimation /> 

      {/* 2. CENTER CONTENT: Logo, Motto, and Button */}
      <div className="z-10 flex flex-col items-center text-center max-w-4xl mt-[-10px] transform translate-y-2">
        {/* Logo Image with Blur Animation */}
        <div className="mb-10 -translate-x-40 animate-blurIn">
          <Image
            src="/home/Pranalyse.png"
            alt="Pranalyse"
            width={700}
            height={250}
            className="object-contain"
            priority
          />
        </div>

        {/* Motto with word-by-word slide animation */}
        <h2 className="text-2xl md:text-3xl font-serif italic text-[#2D2861] mb-8">
          <span className="inline-block opacity-0 animate-slideIn delay-1400">Feel</span>
          <span className="inline-block opacity-0 animate-slideIn delay-1500 ml-2">Better</span>
          <span className="inline-block opacity-0 animate-slideIn delay-1600 ml-2">in</span>
          <span className="inline-block opacity-0 animate-slideIn delay-1700 ml-2">Your</span>
          <span className="inline-block opacity-0 animate-slideIn delay-1800 ml-2">Body.</span>
          <span className="inline-block opacity-0 animate-slideIn delay-1900 ml-2">Live</span>
          <span className="inline-block opacity-0 animate-slideIn delay-2000 ml-2">Better</span>
          <span className="inline-block opacity-0 animate-slideIn delay-2100 ml-2">in</span>
          <span className="inline-block opacity-0 animate-slideIn delay-2200 ml-2">Your</span>
          <span className="inline-block opacity-0 animate-slideIn delay-2300 ml-2">Mind.</span>
        </h2>

        {/* Description */}
        <p className="text-sm md:text-md font-bold tracking-[0.2em] uppercase text-[#2D2861] mb-12 max-w-2xl leading-relaxed slide-up" style={{ animationDelay: "3s" }}>
          Smart, real-time guidance for movement,<br />
          posture, and overall wellbeing
        </p>

        {/* GET STARTED Button */}
        <div className="opacity-0 animate-fadeIn"
          style={{ animationDelay: "3.2s" }}>
        <button
          onClick={handleClick} // Button click handler for redirection
          className="px-16 py-3 text-white font-bold tracking-widest rounded-xl
            bg-gradient-to-r from-[#2C2881] to-[#4B3BC2]
            shadow-[0_10px_20px_rgba(44,40,129,0.3)]
            transition-transform duration-300 hover:scale-105 active:scale-95" 
        >
          GET STARTED
        </button>
        </div>
      </div>

      {/* 3. BOTTOM LEFT: Meditating Human */}
      <div className="absolute bottom-4 left-4 md:bottom-10 md:left-12 animate-softLuminosity">
        <Image
          src="/home/meditating_human.png"
          alt="Meditating Human"
          width={320}
          height={320}
          className="object-contain drop-shadow-2xl animate-float"
        />
      </div>

      {/* 4. BOTTOM RIGHT: Heart with Flowers */}
      <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20 animate-floatZoom">
        <Image
          src="/home/heart.png"
          alt="Heart"
          width={220}
          height={220}
          className="object-contain animate-saturateEffect"
        />
      </div>
    </section>
  );
}