"use client";

import React from "react";
import "@fontsource/im-fell-french-canon-sc";

function Descrip2() {
  return (
    <div className="relative flex items-center justify-center min-h-screen px-0 -mt-10">
      <div className="relative w-full">
        {/* Image */}
        <img
          src="/about/descrip2.png"
          alt="Wellness"
          className="absolute right-0 transform -translate-y-1/2 w-[800px] md:w-[1370px] mx-auto animate-float" // Centered vertically and aligned to the right
        />
      </div>
    </div>
  );
}

export default Descrip2;