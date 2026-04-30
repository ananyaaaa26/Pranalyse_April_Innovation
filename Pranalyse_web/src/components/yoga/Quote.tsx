"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Quote() {
  const quotes = [
    "Inhale the future, exhale the past.",
    "Yoga is the journey of the self, through the self, to the self.",
    "Inhale peace, exhale stress.",
    "Mindful body, mindful life.",
    "The body benefits from movement, and the mind benefits from stillness.",
    "The rhythm of the body, the melody of the mind & the harmony of the soul create the symphony of life.",
    "Balance is not something you find, it’s something you create."
  ];

  const [currentQuote, setCurrentQuote] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % quotes.length);
        setFade(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-16 md:py-28 gap-8 overflow-hidden">

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

      {/* RIGHT WAVE IMAGE WITH WIPE */}
      <div className="absolute right-0 w-auto -z-10 overflow-hidden">
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