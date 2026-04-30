"use client";

import { useState } from "react";
import { Ibarra_Real_Nova, Inder } from "next/font/google";
import Image from "next/image";
import Details from "./Details";

const ibarra = Ibarra_Real_Nova({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const inder = Inder({
  subsets: ["latin"],
  weight: "400",
});

type CardProps = {
  id: number;
  title: string;
  summary: string;
  icon: {
    src: string;
  };
  hoverColor: string;
  index?: number;
};

export default function Card({
  id,
  title,
  summary,
  icon,
  hoverColor,
  index,
}: CardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [bgColor, setBgColor] = useState("#1C1C39");
  const [titleColor, setTitleColor] = useState("white");

  // Only for 5th card
  const isFifthCard = index === 4;

  return (
    <>
      {/* Card */}
      <div
        onClick={() => setIsOpen(true)} // ✅ entire card clickable
        onMouseEnter={() => {
          setBgColor(hoverColor);
          setTitleColor("white");
        }}
        onMouseLeave={() => {
          setBgColor("#1C1C39");
          setTitleColor("white");
        }}
        className="w-[300px] h-[400px] rounded-2xl shadow-xl p-8 cursor-pointer 
                   transition-all duration-300 flex flex-col justify-between 
                   hover:scale-[1.02]"
        style={{ backgroundColor: bgColor }}
      >
        {/* Top */}
        <div>
          <div
            className={`flex justify-between items-center ${
              isFifthCard ? "flex-row-reverse" : ""
            }`}
          >
            <h2
              className={`${ibarra.className} text-4xl transition-colors duration-300 ${
                isFifthCard ? "text-right" : ""
              }`}
              style={{ color: titleColor }}
            >
              {title}
            </h2>

            {icon?.src && (
              <Image
                src={`/${icon.src}`}
                alt={title} 
                width={84}
                height={84}
              />
            )}
          </div>

          {/* Summary */}
          <p
            className={`${inder.className} text-white mt-4 text-sm leading-relaxed`}
          >
            {summary}
          </p>
        </div>

        {/* Bottom */}
        <div className="flex justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation(); // ✅ prevent double trigger
              setIsOpen(true);
            }}
            className={`${inder.className} text-white text-sm underline transition-colors duration-500`}
          >
            View in detail →
          </button>
        </div>
      </div>

      {/* Details Modal */}
      <Details isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}