"use client";

import Image from "next/image";
import WorkingSteps from "./WorkingSteps";

export default function Working() {
  return (
    <section className="w-full min-h-screen flex flex-col items-center relative mt-24 px-16">

      {/* SECTION HEADING */}
      <h2 className="text-4xl text-white font-bold mb-8 self-start">
        How it works?
      </h2>

      {/* CONTENT ROW */}
      <div className="w-full flex items-center justify-between relative">

        {/* LEFT SIDE */}
        <div className="relative w-1/2 h-[600px]">

          {/* Main Girl Image */}
          <div className="absolute top-0 animate-float" style={{ left: "10rem" }}>
            <Image
              src="/common/ques_girl.png"
              alt="Girl"
              width={350}
              height={500}
            />
          </div>

          {/* Extra Image 1 */}
          <div className="absolute top-20" style={{ left: "26rem" }}>
            <Image
              src="/common/randomicons.png"
              alt="Random Icons"
              width={150}
              height={150}
              className="animate-floatZoom"
            />
          </div>

          {/* Extra Image 2 */}
          <div className="absolute top-10" style={{ left: "5rem" }}>
            <Image
              src="/common/quesmark.png"
              alt="Question Mark"
              width={150}
              height={150}
              className="animate-zoomRotate"
            />
          </div>

        </div>

{/* RIGHT SIDE */}
<div className="relative w-1/2 flex justify-center">
  <div className="relative overflow-visible">
    
    {/* Phone */}
    <Image
      src="/common/phone.png"
      alt="Phone"
      width={320}
      height={600}
      className="relative z-10"
    />

    {/* Carousel inside phone */}
    <div className="absolute top-[14%] left-[16.5%] w-[65%] h-[75%] flex items-center justify-center z-20 overflow-visible">
      <WorkingSteps />
    </div>

  </div>
</div>

      </div>
    </section>
  );
}