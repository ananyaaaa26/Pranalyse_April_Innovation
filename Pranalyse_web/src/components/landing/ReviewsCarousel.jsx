"use client";

import { useEffect, useRef, useState } from "react";
import reviewsData from "../../data/reviews.json";

export default function ReviewsCarousel() {
  const [reviews, setReviews] = useState([...reviewsData]);
  const containerRef = useRef(null);
  const [offset, setOffset] = useState(0);

  const cardHeight = 160; 
  const gap = 32; 
  const intervalTime = 3000;
  const transitionTime = 700;

  const extendedReviews = [...reviews, ...reviews];

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % reviews.length);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [reviews.length]);

  const getCardStyle = (index) => {
    const pos = index - offset;
    let scale = 0.8;
    let opacity = 0.7;
    let zIndex = 0;

    if (pos === 0) {
      scale = 1;
      opacity = 1;
      zIndex = 10;
    } else if (pos === 1 || pos === -1) {
      scale = 0.9;
      opacity = 0.85;
      zIndex = 5;
    }

    return {
      transform: `translateY(${pos * (cardHeight + gap)}px) scale(${scale})`,
      zIndex,
      opacity,
      transition: `transform ${transitionTime}ms ease-in-out, opacity ${transitionTime}ms ease-in-out`,
    };
  };

  return (
    <div className="w-full md:w-1/2 flex flex-col translate-x-[50px]">
      <h2 className="text-white text-2xl md:text-3xl font-semibold mb-8">
        Reviews
      </h2>

      <div
        ref={containerRef}
        className="relative flex flex-col items-center justify-center h-[400px] overflow-hidden"
      >
        {/* Gradient Fades */}
        <div className="pointer-events-none absolute top-0 left-0 w-full h-16 bg-gradient-to-b z-10" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t z-10" />

        {/* Cards */}
        {extendedReviews.map((review, index) => {
          const isCenter = index % reviews.length === offset % reviews.length;

          return (
            <div
              key={`${review.id}-${index}`}
              className={`absolute left-1/2 -translate-x-1/2 rounded-2xl shadow-xl p-10 flex flex-col justify-center text-white w-[520px] h-[160px] ${
                isCenter ? "bg-[#886AC9]" : "bg-[#212531]"
              }`}
              style={getCardStyle(index)}
            >
              {/* Double Quote Image */}
              <img
                src={
                  isCenter
                    ? "/home/coloured_double_quotes.png"
                    : "/home/uncoloured_double_quotes.png"
                }
                alt="Quote"
                className={`absolute -top-6 -left-6 ${
                  isCenter
                    ? "w-16 h-16 md:w-20 md:h-20"
                    : "w-8 h-8 md:w-14 md:h-14"
                }`}
              />

              <p className="text-base md:text-md leading-snug pl-2">{review.content}</p>
              <p className="mt-1 text-right text-md font-semibold opacity-90">
                - {review.author}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}