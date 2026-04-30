"use client";
import { useEffect, useRef, useState } from "react";

export const BalancedLungeDetector = ({
    setTotalTime,
    setSuggestions,
    setRepCount,
    setAccuracy: setPoseAccuracy,
    cameraInSmallBox
}) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
  
  // UI State
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  // Configuration
  const CONFIG = {
    ACCURACY_THRESHOLD: 70, 
    MIN_HOLD_TIME: 2.0,      
    ACTIVE_MOVEMENT_GATE: 145, 
  };

  // Logic Refs (Shared Pattern)
  const sessionRef = useRef({
    isCurrentlyInPose: false,
    holdStartTime: 0,
    lastFrameTime: performance.now() / 1000,
  });

  // ----- Math Helpers -----
  const calculateAngle = (A, B, C) => {
    const angle = Math.abs(
      (Math.atan2(C.y - B.y, C.x - B.x) - Math.atan2(A.y - B.y, A.x - B.x)) * 180 / Math.PI
    );
    return angle > 180 ? 360 - angle : angle;
  };

  // ----- The Core Logic: Lunge Classification -----
  const classifyLunge = (landmarks) => {
    if (!landmarks) return { pose: "Idle", accuracy: 0, suggestions: [] };
    
    const get = (idx) => landmarks[idx];
    const lh = get(23), rh = get(24);
    const lk = get(25), rk = get(26);
    const la = get(27), ra = get(28);

    const leftKneeAngle = calculateAngle(lh, lk, la);
    const rightKneeAngle = calculateAngle(rh, rk, ra);
    const activeKneeAngle = Math.min(leftKneeAngle, rightKneeAngle);

    // 1. IDLE CHECK
    if (activeKneeAngle > CONFIG.ACTIVE_MOVEMENT_GATE) {
      return { pose: "Idle", accuracy: 0, suggestions: ["Drop your hips to begin"] };
    }

    // 2. ACCURACY CALCULATION (Same logic: 85-105 is perfect)
    let accuracy = 0;
    if (activeKneeAngle <= 105 && activeKneeAngle >= 85) {
      accuracy = 100;
    } else if (activeKneeAngle > 105) {
      accuracy = Math.max(0, 100 - (activeKneeAngle - 105) * 2.5);
    } else {
      accuracy = Math.max(0, 100 - (85 - activeKneeAngle) * 2.5);
    }

    const roundedAccuracy = Math.round(accuracy);
    let suggestions = [];
    if (roundedAccuracy < 100 && activeKneeAngle > 105) suggestions.push("Go lower");
    if (roundedAccuracy < 100 && activeKneeAngle < 85) suggestions.push("Come up slightly");

    return {
      pose: roundedAccuracy >= CONFIG.ACCURACY_THRESHOLD ? "Lunge" : "Adjusting...",
      accuracy: roundedAccuracy,
      suggestions: suggestions.length > 0 ? suggestions : ["Maintain form!"]
    };
  };

  // ----- Rep & Timer State Machine -----
  const updateMetrics = (accuracy) => {
    const now = performance.now() / 1000;
    const stats = sessionRef.current;

    const deltaTime = now - stats.lastFrameTime;
    stats.lastFrameTime = now;

    if (accuracy >= CONFIG.ACCURACY_THRESHOLD) {
      setTotalTime(prev => prev + deltaTime);
      
      if (!stats.isCurrentlyInPose) {
        stats.isCurrentlyInPose = true;
        stats.holdStartTime = now;
      }

      const holdDuration = now - stats.holdStartTime;
      if (holdDuration >= CONFIG.MIN_HOLD_TIME) {
        setRepCount(prev => prev + 1);
        stats.holdStartTime = now; // Reset hold for next consecutive rep
      }
    } else {
      stats.isCurrentlyInPose = false;
    }
  };

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

        const analysis = classifyLunge(results.poseLandmarks);
        
        // Broadcast data to parent via setters
        setPoseAccuracy(analysis.accuracy);
        setSuggestions(analysis.suggestions);
        updateMetrics(analysis.accuracy);

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