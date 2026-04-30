"use client";

import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="w-full mt-[-120px] flex flex-col">
      {/* Top left image */}
<div className="relative w-full max-w-[1200px] h-[800px] sm:h-[900px] md:h-[1000px] lg:h-[1100px] animate-float">
  <Image
    src="/home/about_us.png"
    alt="About PRANALYSE"
    fill
    className="object-contain"
    priority
  />
</div>

      {/* Bottom right image */}
<div className="relative w-full flex justify-end mt-[-420px] overflow-hidden">
  <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[450px] md:h-[450px] lg:w-[450px] lg:h-[450px] spin-quarter">
    <Image
      src="/home/brain_to_heart.png"
      alt="brain to heart"
      fill
      className="object-contain"
      priority
    />
  </div>
</div>
    </section>
  );
}