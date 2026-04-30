"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Header from "@/src/components/workout/layout/yoga/Header";
import Footer from "@/src/components/workout/layout/yoga/Footer";
import Sidebar from "@/src/components/workout/layout/yoga/Sidebar";
import CameraFeed from "@/src/components/workout/video/CameraFeed";
import PoseGuide from "@/src/components/workout/video/PoseGuide";
import EndButton from "@/src/components/workout/ui/EndButton";
import TimerControls from "@/src/components/workout/timer/TimerControls";
import physioData from "@/src/data/physio.json";
import { useNativeVoice } from "@/src/hooks/useNativeVoice";

export default function YWorkout() {
  const [selectedPose, setSelectedPose] = useState(physioData[0] || null);
  const [cameraInSmallBox, setCameraInSmallBox] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [repCount, setRepCount] = useState(0);
  const [suggestions, setSuggestions] = useState([]); // Typed as string array
  const [totalTime, setTotalTime] = useState(0);
  const cameraRef = useRef(null);
  
  const { speak } = useNativeVoice(); 
  const lastSpokenRef = useRef("");
  const cooldownRef = useRef(false);
  
  useEffect(() => {
    if (suggestions.length > 0) {
      const latestSuggestion = suggestions[suggestions.length - 1];

      // Logic: Speak only if it's new AND we aren't in a 3-second cooldown
      if (latestSuggestion !== lastSpokenRef.current && !cooldownRef.current) {
        speak(latestSuggestion);
        lastSpokenRef.current = latestSuggestion;

        // Set cooldown to prevent voice "chatter" during fast movement updates
        cooldownRef.current = true;
        setTimeout(() => {
          cooldownRef.current = false;
        }, 3000); 
      }
    }
  }, [suggestions, speak]);

  const [poseData, setPoseData] = useState({
    accuracy: 0,
    reps: 0,
    suggestions: [],
    currentPoseName: "Waiting...",
    totalTime: 0
  });

  useEffect(() => {
    setTotalTime(0);
    setRepCount(0);
    setAccuracy(0);
    setSuggestions([]);
    lastSpokenRef.current = ""; // Reset voice tracker on pose change
  }, [selectedPose]);

  const handleSwap = () => setCameraInSmallBox((prev) => !prev);

  return (
    <div
      className="relative h-screen w-full bg-[#3C3269] overflow-hidden flex flex-col">
      <div className="relative z-20">
        <Header 
          selectedPose={selectedPose} 
          setSelectedPose={setSelectedPose} 
          seconds={Math.floor(totalTime)} 
          page={"physio"}
        />
      </div>

      <div className="absolute top-[80px] left-0 w-[66%] h-[calc(100vh-80px)] z-0 overflow-hidden">
        {cameraInSmallBox ? (
          <PoseGuide pose={selectedPose} onSwap={handleSwap} width="100%" height="100%" videoSrc={selectedPose.videoUrl} />
        ) : (
          <CameraFeed
            videoRef={cameraRef}
            onPoseUpdate={setPoseData}
            width="100%"
            height="100%"
            onClick={handleSwap}
            setTotalTime={setTotalTime}
            setSuggestions={setSuggestions}
            setRepCount={setRepCount}
            setAccuracy={setAccuracy}
            selectedPose={selectedPose}
          />
        )}
      </div>

      <div className="relative z-10 flex flex-1 w-full pointer-events-none">
        <div className="w-[66%]" />
        <div className="w-[34%] flex flex-col items-center justify-center gap-8 pointer-events-auto pr-8">
          <Sidebar
            selectedPose={selectedPose}
            cameraInSmallBox={cameraInSmallBox}
            onSwap={handleSwap}
            cameraRef={cameraRef}
            accuracy={accuracy}
            suggestions={suggestions}
            totalTime={totalTime}
            reps={repCount}
          />
          <div className="w-[420px]">
            <EndButton 
              accuracy={accuracy} 
              totalTime={totalTime}
              reps={repCount} 
              selectedPose={selectedPose}
            />
          </div>
        </div>
      </div>

      <Footer>
        <TimerControls onStart={() => {}} onPause={() => {}} />
      </Footer>
    </div>
  );
}