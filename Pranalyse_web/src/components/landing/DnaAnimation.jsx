"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function DnaAnimation() {
  const [dnaVisible, setDnaVisible] = useState(false);
  const [imageTransition, setImageTransition] = useState(false);

  useEffect(() => {
    // Trigger the DNA visibility after 1s delay
    setTimeout(() => setDnaVisible(true), 1000);

    // Trigger the image morphing after 5s
    const interval = setInterval(() => {
      setImageTransition((prev) => !prev); // Toggle the image every 7 seconds
    }, 7000); // Change the image every 7 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div className="absolute w-[650px] h-[350px] top-0 right-0 overflow-hidden">
      {/* DNA Image - Slide in and morph */}
      <div
        className={`absolute top-4 right-0 transition-all duration-4000 ease-out ${
          dnaVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
        style={{
          width: "100%", // Ensure full width
          height: "100%", // Ensure full height
        }}
      >
        {/* Image 1 (initial DNA image) */}
        <div
          className={`absolute top-0 right-0 w-full h-full transition-opacity duration-3000 ease-in-out ${
            imageTransition ? "opacity-0" : "opacity-100"
          } z-10`} // Low z-index for the first image
        >
          <Image
            src="/home/DNA.png" // Ensure the path is correct
            alt="First DNA Image"
            width={700} // Set width
            height={400} // Set height
            style={{ objectFit: "cover" }} // Ensure the image covers the area
          />
        </div>

        {/* Image 2 (second DNA image) */}
        <div
          className={`absolute top-0 right-0 w-full h-full transition-opacity duration-3000 ease-in-out ${
            imageTransition ? "opacity-100" : "opacity-0"
          } z-20`} // Higher z-index for the second image
        >
          <Image
            src="/home/DNA3.png" // Ensure the path is correct
            alt="Second DNA Image"
            width={700} // Set width
            height={400} // Set height
            style={{ objectFit: "cover" }} // Ensure the image covers the area
          />
        </div>
      </div>
    </div>
  );
}