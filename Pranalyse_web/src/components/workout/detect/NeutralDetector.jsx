"use client";
import { useEffect, useRef, useState } from "react";

export const NeutralDetector = ({
    // setTotalTime,
    // setSuggestions,
    // setRepCount,
    // setAccuracy: setPoseAccuracy
    cameraInSmallBox
}) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
  
  // UI State
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  // ----- Initialization -----
  useEffect(() => {
    const init = async () => {
      const pose = new window.Pose({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
      });

      pose.setOptions({ 
        modelComplexity: 1, 
        smoothLandmarks: true, 
        minDetectionConfidence: 0.5, 
        minTrackingConfidence: 0.5 
      });

      pose.onResults((results) => {
        if (!results.poseLandmarks) return;

        // Drawing Logic
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
        
        if (window.drawConnectors) {
          window.drawConnectors(ctx, results.poseLandmarks, window.POSE_CONNECTIONS, { color: '#4F46E5', lineWidth: 4 });
        }
        ctx.restore();
      });

      const camera = new window.Camera(videoRef.current, {
        onFrame: async () => { await pose.send({ image: videoRef.current }); },
        width: 640, height: 480
      });
      camera.start().then(() => setIsLoaded(true));
    };

    if (window.Pose) init();
    else setError("MediaPipe not loaded.");
  }, []);

  return (
    <div>
      <video ref={videoRef} style={{ display: "none" }} />
      <canvas ref={canvasRef} 
        width={`${cameraInSmallBox?"150px":"640"}`} 
        height={`${cameraInSmallBox?"150px":"480"}`} 
        style={{ width: "100%", height: "100%", objectFit: "contain", transform: "scaleX(-1)" }} 
        />
    </div>
  );
};