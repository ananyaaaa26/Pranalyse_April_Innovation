"use client";

import Image from "next/image";
import { Poller_One, Podkova } from "next/font/google";
import Options from "./Options";
import localFont from 'next/font/local';

export const poetsen = localFont({
  src: [
    {
      path: '../../../public/fonts/PoetsenOne-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-poetsen',
});

const poller = Poller_One({
  weight: "400",
  subsets: ["latin"],
});

const podkova = Podkova({
  weight: "400",
  subsets: ["latin"],
});

export default function Hero() {
  return (
    <>
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">

      {/* TEXT */}
      <div className="text-center z-10 mt-16">
        {/* Main Heading */}
<h1 className={`${poller.className} text-8xl text-black`}>
  {"PHYSIOTHERAPY".split("").map((letter, index) => (
    <span
      key={index}
      className="reveal-letter"
      style={{
        "--delay": `${index * 0.15}s`,
      } as React.CSSProperties}
    >
      {letter}
    </span>
  ))}
</h1>

        {/* Subtext */}
<p
  className={`${podkova.className} text-3xl mt-0 text-black slide-up`}
  style={{ animationDelay: "1.5s" }} // adjust based on your heading timing
>
  (Therapeutic Exercise)
</p>

        {/* Highlighted Text Lines */}
<div className={`mt-10 space-y-4 ${poetsen.className} text-5xl`}>

  <p
    className="text-left ml-30 slide-loop"
    style={{ animationDelay: "2.8s" }}
  >
    <span className="text-black">Your </span>
    <span className="text-[#FE933B] animate-softLuminosity">Recovery</span>
  </p>

  <p
    className="text-center slide-loop"
    style={{ animationDelay: "3.9s" }}
  >
    <span className="text-black">Your </span>
    <span className="text-[#55A5EB] animate-softLuminosity">Space</span>
  </p>

  <p
    className="text-right mr-56 slide-loop"
    style={{ animationDelay: "5s" }}
  >
    <span className="text-black">Your </span>
    <span className="text-[#886AC9] animate-softLuminosity">Pace</span>
  </p>

</div>
      </div>

      {/* IMAGE POSITIONS */}
      <div className="absolute w-full h-full">
        {/* P1 - top left */}
        <div className="absolute top-10 left-4">
          <Image src="/physio/p1.png" alt="P1" width={220} height={220} className="animate-particleAssemble" style={{ animationDelay: "0.5s" }} />
        </div>

        {/* P2 - top center */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2">
          <Image src="/physio/p2.png" alt="P2" width={400} height={400} className="animate-particleAssemble" style={{ animationDelay: "1s" }}/>
        </div>

        {/* P3 - top right */}
        <div className="absolute top-10 right-0">
          <Image src="/physio/p3.png" alt="P3" width={240} height={240} className="animate-particleAssemble" style={{ animationDelay: "1.5s" }}/>
        </div>

        {/* P4 - bottom right */}
        <div className="absolute bottom-36 right-36">
          <Image src="/physio/p4.png" alt="P4" width={280} height={280} className="animate-particleAssemble" style={{ animationDelay: "0.5s" }}/>
        </div>

        {/* P5 - bottom left */}
        <div className="absolute bottom-36 left-40">
          <Image src="/physio/p5.png" alt="P5" width={240} height={240} className="animate-particleAssemble" style={{ animationDelay: "1s" }}/>
        </div>

        {/* P6 - bottom center */}
        {/* <div className="absolute -bottom-22 left-1/2 -translate-x-1/2">
          <Image src="/physio/p6.png" alt="P6" width={500} height={500} />
        </div> */}
      </div>
    </section>
    <Options/>
    </>
  );
}