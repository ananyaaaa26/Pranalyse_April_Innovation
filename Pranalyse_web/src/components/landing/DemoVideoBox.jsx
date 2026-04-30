import { useRef, useState } from "react";
import { FiPause, FiPlay, FiMaximize, FiMinimize } from "react-icons/fi";

export default function DemoVideoBox() {
  const videoRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPaused(false);
    } else {
      videoRef.current.pause();
      setIsPaused(true);
    }
  };

  const toggleZoom = () => setIsZoomed((prev) => !prev);

  return (
    <div className="w-full md:w-1/2 flex flex-col">
      {/* Title */}
      <h2 className="text-white text-2xl md:text-3xl font-semibold mb-8">
        Demo
      </h2>

      {/* Video Container */}
      <div
        className={`relative border-2 border-black rounded-xl overflow-hidden flex justify-center items-center transition-all duration-500 ${
          isZoomed ? "w-full h-[600px]" : "w-full h-[340px] md:h-[360px] lg:h-[400px]"
        }`}
      >
        <video
          ref={videoRef}
          src="/videos/sample_video.mp4"
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        />

        {/* Controls Overlay */}
        <div className="absolute top-2 right-2 flex gap-2">
          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            className="bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition"
          >
            {isPaused ? <FiPlay size={20} /> : <FiPause size={20} />}
          </button>

          {/* Zoom */}
          <button
            onClick={toggleZoom}
            className="bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition"
          >
            {isZoomed ? <FiMinimize size={20} /> : <FiMaximize size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}