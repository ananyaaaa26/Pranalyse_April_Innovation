"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; 

function Card({ name, image, description, link }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(link); // navigate to the given link
  };

  return (
    <div
      className="group relative w-72 h-80 bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-4xl cursor-pointer"
      onClick={handleClick} // make whole card clickable
    >

      {/* Feature Name Label */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-[#4B3A70] text-white text-center px-6 py-2 rounded-xl z-10 w-[95%] max-w-[280px] break-words">
        <p className="font-semibold tracking-wide text-sm leading-snug">
          {name}
        </p>
      </div>

      {/* Image */}
      <div className="flex items-center justify-center h-full">
        <Image
          src={image}
          alt={name}
          width={360}
          height={360}
          className="object-contain transition-all duration-500 group-hover:blur-sm"
        />
      </div>

      {/* Hover Description */}
      <div className="absolute bottom-0 left-0 w-full bg-[#4B3A70] p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex flex-col gap-4 rounded-t-2xl">
        {/* Description text */}
        <p className="text-sm leading-snug text-white text-left">
          {description}
        </p>

        {/* Try Now at bottom-right */}
        <span className="text-white font-bold underline self-end">
          Try Now →
        </span>
      </div>
    </div>
  );
}

export default Card;