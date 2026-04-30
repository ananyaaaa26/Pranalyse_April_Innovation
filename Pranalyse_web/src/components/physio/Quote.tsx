"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Quote() {
  const quotes = [
    "Every movement counts.",
    "Small steps every day lead to big progress.",
    "Recovery is a journey, not a race.",
    "Rehab today, stronger tomorrow.",
    "Pain is temporary, progress is permanent.",
    "Strength is built one rep at a time."
  ];

  const [currentQuote, setCurrentQuote] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // start fade-out
      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % quotes.length);
        setFade(true); // fade-in new quote
      }, 500); // fade duration
    }, 5000); // every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-16 md:py-24 gap-8">

      {/* LEFT QUOTE BOX */}
      <div className="bg-[#B084FF] rounded-xl p-8 md:p-10 w-full md:w-[50%] min-h-[150px] flex items-center justify-center z-10">
        <p
          className={`text-white text-xl md:text-3xl font-bold text-center transition-opacity duration-500 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          {quotes[currentQuote]}
        </p>
      </div>

      {/* RIGHT WAVE IMAGE */}
      <div className="absolute right-0 w-auto -z-10">
        <div className="animate-wipe-right">
        <Image
          src="/global/rwave.png"
          alt="Wave"
          width={750}
          height={325}
          className="h-auto object-cover"
        />
        </div>
      </div>
    </section>
  );
}