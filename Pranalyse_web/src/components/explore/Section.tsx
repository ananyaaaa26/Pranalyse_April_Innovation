import React from "react";

interface SectionProps {
  title: string
  children: React.ReactNode
}

export default function Section({ title, children }: SectionProps) {
  return (
    <div className="overflow-visible ">
      <div className="flex justify-between items-center">
        <h2 className="px-6 font-semibold text-white text-2xl drop-shadow-xl mt-8">{title}</h2>
        <button className=" px-6 text-sm text-[#FFE600]">See more <>{"->"}</></button>
      </div>

<div className="overflow-visible mt-4 mb-6">
      {children}
      </div>
    </div>
  );
}