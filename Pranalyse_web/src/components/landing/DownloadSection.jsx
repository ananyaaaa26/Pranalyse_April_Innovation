"use client";

import Image from "next/image";
import { Holtwood_One_SC } from "next/font/google";

const holtwood = Holtwood_One_SC({
  subsets: ["latin"],
  weight: "400",
});

export default function DownloadSection() {
  return (
    <section className="w-full flex flex-col md:flex-row items-center px-4 md:px-20 -mt-28">
      
      {/* LEFT 60% */}
      <div className="w-full md:w-3/5 flex flex-col justify-center items-center text-center">
        
        {/* Heading */}
        <h2 className={`${holtwood.className} text-white text-3xl md:text-5xl mb-8`}>
          Download our app version
        </h2>

        {/* Image + Button Row */}
        <div className="flex items-center gap-36">
          
          {/* Image */}
          <div className="w-[520px] h-[520px] relative animate-float">
            <Image
              src="/home/peacefulperson.png"
              alt="App Preview"
              fill
              className="object-contain"
            />
          </div>

          {/* Button */}
          <button className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 hover:scale-105 transition -ml-16">
            Download Now
          </button>
        </div>
      </div>

      {/* RIGHT 40% */}
<div className="w-full md:w-2/5 flex justify-end mt-10 md:mt-0">
  <div className="w-[700px] h-[800px] relative ml-auto translate-x-20">

    {/* Phone Image */}
    <Image
      src="/home/phone.png"
      alt="Phone Mockup"
      fill
      className="object-contain pointer-events-none"
    />

    {/* Video Overlay (screen area) */}
    <div className="absolute top-[14%] left-[4%] w-[54%] h-[70%] rounded-[20px] overflow-hidden">
      <video
        src="/home/LauncingSoon.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    </div>

  </div>
</div>
    </section>
  );
}