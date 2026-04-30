import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { useState } from "react";

export default function VoiceControl() {
  const [volume, setVolume] = useState(50);
  const [showControls, setShowControls] = useState(false);

  const isMuted = volume === 0;

  return (
    <div className="relative flex flex-col items-center">
      
      {/* Voice button */}
      <button
        onClick={() => setShowControls(!showControls)}
        className="bg-purple-500 hover:bg-purple-600 flex items-center gap-2 px-5 py-3 rounded-lg text-white font-semibold shadow-md"
      >
        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        Voice
      </button>

      {showControls && (
        <div className="absolute bottom-full mb-2 flex flex-col items-center gap-2">
          {/* Vertical Slider */}
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className="h-36 w-2 appearance-none bg-purple-200 rounded-lg accent-purple-600 cursor-pointer"
            style={{ writingMode: "bt-lr" }} 
          />

        </div>
      )}
    </div>
  );
}