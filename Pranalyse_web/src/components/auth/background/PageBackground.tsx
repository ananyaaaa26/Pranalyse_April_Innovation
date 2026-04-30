"use client";

import { useState, useEffect } from "react";

type Circle = {
  id: number;
  size: number;
  top: number;
  left: number;
  duration: number;
  delay: number;
  opacity: number;
};

export default function PageBackground() {
  const totalCircles = 100;

  // Lazy initialization of circles
  const [circles, setCircles] = useState<Circle[]>(() =>
    Array.from({ length: totalCircles }).map((_, i) => ({
      id: i,
      size: Math.floor(Math.random() * 12) + 2, // 6-18px
      top: Math.random() * 70, 
      left: Math.random() * 100, // 0-100%
      duration: Math.random() * 5 + 3,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.6 + 0.4,
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCircles(prev =>
        prev.map(c => {
          // Small random offsets for natural drifting
          const deltaTop = (Math.random() - 0.5) * 5; // -2.5% to +2.5%
          const deltaLeft = (Math.random() - 0.5) * 5;
          return {
            ...c,
            top: Math.min(Math.max(c.top + deltaTop, 0), 65),
            left: Math.min(Math.max(c.left + deltaLeft, 0), 100),
          };
        })
      );
    }, 1000); // update every 1 second for smooth drift

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500" />

      {/* Twinkling Circles */}
      <div className="absolute top-0 w-full h-[65vh] overflow-hidden">
        {circles.map(circle => (
          <span
            key={circle.id}
            className="absolute rounded-full bg-white opacity-0 animate-twinkle"
            style={{
              width: `${circle.size}px`,
              height: `${circle.size}px`,
              top: `${circle.top}%`,
              left: `${circle.left}%`,
              animationDuration: `${circle.duration}s`,
              animationDelay: `${circle.delay}s`,
              opacity: circle.opacity,
              transition: "top 1s ease-in-out, left 1s ease-in-out", // smooth drifting
            }}
          />
        ))}
      </div>

      {/* Clouds Image */}
      <div className="absolute bottom-0 w-full">
        <img
          src="/auth/clouds.png"
          alt="Clouds"
          className="w-full object-cover"
        />
      </div>

      {/* Elegant Twinkle Animation */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.6); }
          50% { opacity: 1; transform: scale(1); }
        }
        .animate-twinkle {
          animation-name: twinkle;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }
      `}</style>
    </div>
  );
}