"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "../../components/global/Navbar";

function ComingSoon() {
  const [videoError, setVideoError] = useState(false);

  // Function to split text into individual letters and spaces
  const revealText = (text) => {
    return text.split("").map((letter, index) => {
      // Check if the letter is a space, and if so, add a span with no animation
      if (letter === " ") {
        return <span key={index}>&nbsp;</span>; // non-breaking space to maintain space
      }
      return (
        <span
          key={index}
          className="reveal-letter"
          style={{ animationDelay: `${index * 0.1}s` }} // Stagger animation for each letter
        >
          {letter}
        </span>
      );
    });
  };

  return (
    <>
      <Navbar />
      <div
        className="text-center mb-4 mt-25 z-20 py-4" // Added py-4 for padding to give height
        style={{
          position: "relative", // Ensure it has a stacking context
          zIndex: 20, // Higher than video to stay in front
        }}
      >
        <h1 className="text-6xl font-bold text-white">
          {revealText("New Healthcare Tools Are On The Way...")}
        </h1>
      </div>

      <div
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
          zIndex: 1, // Video should stay behind the text
        }}
      >
        {!videoError ? (
          <video
            autoPlay
            muted
            playsInline
            onError={() => setVideoError(true)}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          >
            <source src="/global/comingsoon.mp4" type="video/mp4" />
          </video>
        ) : (
          <Image
            src="/global/ComingSoon.png"
            alt="Feature Coming Soon"
            width={1200}
            height={600}
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        )}
      </div>
    </>
  );
}

export default ComingSoon;