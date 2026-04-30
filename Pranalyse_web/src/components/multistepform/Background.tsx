"use client";

import { useEffect, useRef, useState } from "react";

export default function Background() {
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgWidth, setImgWidth] = useState(0);

  useEffect(() => {
    if (imgRef.current) {
      setImgWidth(imgRef.current.naturalWidth);
    }
  }, []);

  return (
    <div className="overflow-hidden w-full h-screen relative -z-10 bg-black">
      {/* -z-10 ensures background is behind */}
      <div
        className="absolute left-0 bg-black"
        style={
          {
            top: "150px", // spacing from top
            width: imgWidth ? `${imgWidth}px` : "auto",
            animation: imgWidth
              ? "slideX 50s linear infinite alternate"
              : "none",
            ["--scroll-distance" as any]: imgWidth ? `${imgWidth}px` : "0px",
          } as React.CSSProperties
        }
      >
        <img
          ref={imgRef}
          src="/global/wavebg.png"
          alt="Moving Background"
          className="h-screen w-auto"
        />
      </div>
    </div>
  );
}