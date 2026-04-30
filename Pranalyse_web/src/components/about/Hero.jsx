"use client";

import React from "react";
import Image from "next/image";

function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden ">

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-[88%] object-cover filter blur-[3px]"
      >
        <source src="/about/hero-vid-bg.mp4" type="video/mp4" />
      </video>

      {/* Center Image */}
      <div className="absolute top-[44%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[35vw] md:w-[45vw] h-auto">
        <Image
          src="/about/aboutus.png"
          alt="About Us"
          width={1000} 
          height={500} 
          className="object-contain opacity-100 animate-fadeIn"
        />
      </div>

    </div>
  );
}

export default Hero;