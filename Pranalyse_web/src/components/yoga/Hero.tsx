"use client";

import Image from "next/image";
import { Poller_One, Nothing_You_Could_Do } from "next/font/google";
import TreeWithOptions from "./TreeWithOptions";

const poller = Poller_One({
  weight: "400",
  subsets: ["latin"],
});

const nothing = Nothing_You_Could_Do({
  weight: "400",
  subsets: ["latin"],
});

export default function Hero() {
  return (
    <>
      <section className="relative h-screen w-full flex flex-col justify-center overflow-visible">

        {/* TEXT */}
        <div className="text-left max-w-xl ml-100 leading-tight">
  
  {/* YOGA: letter by letter */}
<h1 className={`${poller.className} text-9xl text-black`}>
  {"YOGA".split("").map((letter, index) => (
    <span
      key={index}
      className="reveal-letter"
      style={{ animationDelay: `${index * 0.5}s` }}
    >
      {letter}
    </span>
  ))}
</h1>

  {/* FLOW WITH */}
  <h2
    className="flow-with text-4xl mt-20 ml-45"
    style={{
      fontFamily: "Poetsen One, sans-serif",
      color: "black",
      WebkitTextStroke: "0.3px black",
      animationDelay: "1s", // start after YOGA letters finish
    }}
  >
    Flow With
  </h2>

  {/* EASE */}
  <h3
    className={`${nothing.className} ease-text text-6xl mt-4 ml-75`}
    style={{
      color: "#7C5AEB",
      WebkitTextStroke: "1.5px #7C5AEB",
      animationDelay: "1.8s", // start after Flow With
    }}
  >
    Ease
  </h3>

</div>

        {/* LEFT IMAGES */}
        <div className="absolute left-10 top-33 flex flex-col gap-0 overflow-visible">
          {/* Green Brain */}
          <div className="animate-brainAppear">
            <Image
              src="/yoga/greenbrain.png"
              alt="Green Brain"
              width={220}
              height={220}
              className="animate-softLuminosity"
            />
          </div>

          {/* Wave Image */}
          <div className="relative overflow-visible animate-diagonalWipe">
            <Image
              src="/yoga/leaves_wave.png"
              alt="Wave"
              width={600}
              height={600}
              className="ml-36 animate-softLuminosity" 
            />
          </div>
        </div>

      </section>

      {/* TREE IMAGE */}
      <TreeWithOptions />
    </>
  );
}