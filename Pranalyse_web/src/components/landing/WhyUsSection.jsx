"use client";

import React from "react";
import Image from "next/image";

export default function WhyUsSection() {
  return (
    <section className="w-full flex flex-col items-start justify-center px-4 md:px-16 -mt-32">
      {/* Heading aligned to left */}
      <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold text-white mb-16">
        Why Us?
      </h2>

      {/* Image scales naturally */}
      <div className="w-full max-w-[1400px]">
        <Image
          src="/home/whyus.png"
          alt="Why Us?"
          width={1400}       // natural width
          height={800}       // natural height
          className="w-full h-auto object-contain"
          priority
        />
      </div>
    </section>
  );
}