"use client";

import React from "react";
import Image from "next/image";
import Wave from "../global/Wave";

function Header() {
  return (
    <div className="relative w-full flex justify-center pt-2">

      {/* Wave Background */}
      <div className="absolute top-0 left-0 w-full z-0">
        <Wave />
      </div>

      {/* Header Image */}
      <div className="relative z-10 animate-fadeIn">
        <Image
          src="/features/OurFeaturesHeading.png"
          alt="Header Image"
          width={500}
          height={250}
          className="object-contain"
        />
      </div>

    </div>
  );
}

export default Header;