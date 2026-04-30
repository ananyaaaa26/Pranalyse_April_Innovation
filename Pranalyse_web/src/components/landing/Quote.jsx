"use client";

import Image from "next/image";

export default function Quote() {
  return (
    <section className="w-full flex flex-col md:flex-row items-center justify-center -mt-10 md:-mt-18 relative overflow-hidden">
      
      {/* Left: Image with wipe animation */}
      <div className="w-full md:w-[55%] relative h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden">
        <div className="absolute inset-0 animate-wipe">
          <Image
            src="/home/Wave.png"
            alt="Wave"
            fill
            className="object-contain rounded-lg"
            priority
          />
        </div>
      </div>

      {/* Right: Text with slide + fade animation */}
      <div className="w-full md:w-[50%] flex items-center justify-start -ml-6 md:-ml-6 z-10 pt-6 md:pt-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center md:text-left animate-text-slide-fade">
          Your wellness journey, always with you
        </h2>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes wipe {
          0% {
            clip-path: inset(0 100% 0 0);
          }
          40% {
            clip-path: inset(0 0 0 0);
          }
          60% {
            clip-path: inset(0 0 0 0);
          }
          100% {
            clip-path: inset(0 100% 0 0);
          }
        }

        .animate-wipe {
          animation: wipe 15s ease-in-out infinite;
        }

        /* Text Slide + Fade Animation */
        @keyframes textSlideFade {
          0% {
            opacity: 0;
            transform: translateX(80px); /* slow start from right */
          }
          20% {
            opacity: 1;
            transform: translateX(0); /* fully visible at 20% */
          }
          70% {
            opacity: 1;
            transform: translateX(0); /* stay for 50% (5 seconds) */
          }
          100% {
            opacity: 0;
            transform: translateX(50px); /* fast exit to right */
          }
        }

        .animate-text-slide-fade {
          animation: textSlideFade 16s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
      `}</style>
    </section>
  );
}