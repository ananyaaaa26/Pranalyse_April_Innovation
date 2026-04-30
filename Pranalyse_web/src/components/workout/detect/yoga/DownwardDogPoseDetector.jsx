"use client";
import { useEffect, useRef, useState } from "react";

export const DownwardDogPoseDetector = ({
    setTotalTime,
    setSuggestions,
    setRepCount,
    setAccuracy: setPoseAccuracy,
    cameraInSmallBox,
}) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  // UI State
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [currentPose, setCurrentPose] = useState("Waiting...");

  // Configuration
  const CONFIG = {
    ACCURACY_THRESHOLD: 70,
    HOLD_TIME_FOR_REP: 5, // 5 seconds hold = 1 rep
  };

  // Logic Refs (to track state across frames without re-renders)
  const sessionRef = useRef({
    isHoldActive: false,
    holdStartTime: 0,
    lastFrameTime: performance.now(),
  });

  // ----- Math & Distance Helpers -----
  const calculateAngle = (p1, p2, p3) => {
    const radians = Math.atan2(p3.y - p2.y, p3.x - p2.x) - 
                    Math.atan2(p1.y - p2.y, p1.x - p2.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    if (angle > 180.0) angle = 360 - angle;
    return angle;
  };

  // ----- The Core Logic: Downward Dog Classification -----
  const classifyDownwardDog = (landmarks) => {
    if (!landmarks) return { pose: "Searching...", accuracy: 0, suggestions: [] };

    const get = (idx) => landmarks[idx];
    const lw = get(15), rw = get(16); // Wrists
    const ls = get(11), rs = get(12); // Shoulders
    const lh = get(23), rh = get(24); // Hips
    const lk = get(25), rk = get(26); // Knees
    const la = get(27), ra = get(28); // Ankles

    let scores = [];
    let currentSuggestions = [];

    // 1. HIP HEIGHT CHECK (The "V" Shape)
    const isVType = (lh.y < ls.y && lh.y < la.y) && (rh.y < rs.y && rh.y < ra.y);
    if (!isVType) {
      return { pose: "Adjusting...", accuracy: 10, suggestions: ["Lift your hips toward the ceiling"] };
    }

    // 2. ARM & BACK ALIGNMENT
    const leftArmBackAngle = calculateAngle(lw, ls, lh);
    const rightArmBackAngle = calculateAngle(rw, rs, rh);
    const avgArmBack = (leftArmBackAngle + rightArmBackAngle) / 2;
    const armBackScore = Math.max(0, 100 - Math.abs(180 - avgArmBack) * 2);
    scores.push(armBackScore);
    if (armBackScore < 70) currentSuggestions.push("Push your chest toward your thighs");

    // 3. HIP ANGLE
    const leftHipAngle = calculateAngle(ls, lh, lk);
    const rightHipAngle = calculateAngle(rs, rh, rk);
    const avgHipAngle = (leftHipAngle + rightHipAngle) / 2;
    const hipScore = avgHipAngle < 105 ? 100 : Math.max(0, 100 - (avgHipAngle - 105) * 5);
    scores.push(hipScore);
    if (avgHipAngle > 105) currentSuggestions.push("Walk your feet closer to your hands");

    // 4. KNEE STRAIGHTNESS
    const leftKneeAngle = calculateAngle(lh, lk, la);
    const rightKneeAngle = calculateAngle(rh, rk, ra);
    const avgKneeAngle = (leftKneeAngle + rightKneeAngle) / 2;
    const kneeScore = Math.max(0, 100 - Math.abs(180 - avgKneeAngle) * 2);
    scores.push(kneeScore);
    if (kneeScore < 80) currentSuggestions.push("Straighten your knees");

    const avgAccuracy = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

    return {
      pose: avgAccuracy > 50 ? "Downward-Facing Dog" : "Positioning...",
      accuracy: avgAccuracy,
      suggestions: avgAccuracy > 85 ? ["Perfect Alignment! Breathe."] : currentSuggestions
    };
  };

  // ----- Rep & Timer State Machine -----
  const updateMetrics = (accuracy) => {
    const now = performance.now() / 1000;
    const stats = sessionRef.current;
    
    const dt = now - stats.lastFrameTime;
    stats.lastFrameTime = now;

    if (accuracy >= CONFIG.ACCURACY_THRESHOLD) {
      setTotalTime(prev => prev + dt);
      
      if (!stats.isHoldActive) {
        stats.isHoldActive = true;
        stats.holdStartTime = now;
      } else {
        const currentHoldDuration = now - stats.holdStartTime;
        if (currentHoldDuration >= CONFIG.HOLD_TIME_FOR_REP) {
          setRepCount(prev => prev + 1);
          stats.holdStartTime = now; 
        }
      }
    } else {
      stats.isHoldActive = false;
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
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.7 
      });

      pose.onResults((results) => {
        if (!results.poseLandmarks) return;

        const analysis = classifyDownwardDog(results.poseLandmarks);
        setCurrentPose(analysis.pose);
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
          window.drawConnectors(ctx, results.poseLandmarks, window.POSE_CONNECTIONS, { color: '#00E676', lineWidth: 4 });
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