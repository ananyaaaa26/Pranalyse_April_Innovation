"use client";

import Image from "next/image";
import Link from "next/link";

export default function HolisticPlanSection() {
  return (
    <div className="w-full relative -mt-32">
      {/* Image */}
      <Image
        src="/home/HolisticInvite.png"
        alt="Holistic Plan"
        width={2400}
        height={1200}
        className="w-full h-auto object-cover"
      />

      {/* Button */}
      <div className="absolute top-[82%] left-[75%] -translate-x-1/2 -translate-y-1/2">
        <Link href="/comingsoon">
<button
  className="px-6 py-3 text-white font-semibold rounded-lg 
             bg-[radial-gradient(circle,_#7C5AEB_0%,_#2C2881_100%)] 
             hover:border-2 hover:border-white 
             hover:shadow-[0_0_15px_rgba(255,255,255,0.8),0_0_30px_rgba(255,255,255,0.6),0_0_50px_rgba(255,255,255,0.4)] 
             transition-all whitespace-nowrap"
>
  Get Holistic Plan
</button>
        </Link>
      </div>
    </div>
  );
}