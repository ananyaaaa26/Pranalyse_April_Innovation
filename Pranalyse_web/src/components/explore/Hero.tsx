"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";

// Card configuration
const cards = [
  { src: "/explore/E1.png", left: "left-4", bottom: "bottom-30", delay: 0 },
  { src: "/explore/E6.png", left: "right-4", bottom: "bottom-30", delay: 0 },
  { src: "/explore/E2.png", left: "left-44", bottom: "bottom-90", delay: 1 },
  { src: "/explore/E5.png", left: "right-44", bottom: "bottom-90", delay: 1 },
  { src: "/explore/E3.png", left: "left-[27%]", bottom: "bottom-[65vh]", delay: 2 },
  { src: "/explore/E4.png", left: "left-1/2 -translate-x-1/2", bottom: "bottom-[65vh]", delay: 2.5 },
  { src: "/explore/E7.png", left: "right-[27%]", bottom: "bottom-[65vh]", delay: 2 },
];

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden flex justify-center items-center">
      
      {/* Creepers Top */}
      <div className="absolute top-0 left-0 w-full z-20">
        <Image
          src="/explore/creepers.png"
          alt="creepers"
          width={1920}
          height={200}
          className="w-full"
          priority
        />
      </div>

      {/* Cards */}
      {cards.map((card, idx) => (
        <motion.div
          key={idx}
          initial={{ y: -600, rotate: 0 }}
          animate={{ y: 0, rotate: [0, 4, -6, 3, 0] }}
          transition={{ delay: card.delay, duration: 2, ease: "easeOut" }}
          whileHover={{
            rotate: [0, 8, -10, 4, 0],
            transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{ transformOrigin: "top center" }}
          className={`absolute ${card.left} ${card.bottom} z-10`}
        >
          <Image src={card.src} alt={`Card ${idx}`} width={200} height={360} />
        </motion.div>
      ))}

      {/* Center Content */}
<div className="absolute bottom-[20vh] lg:bottom-[25vh] flex flex-col items-center gap-8 z-10">  
  <Image
          src="/explore/ExploreHeading.png"
          alt="explore"
          width={600}
          height={100}
        />
        <SearchBar />
      </div>
    </section>
  );
}