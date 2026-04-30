"use client";
import { useEffect, useRef, useState } from "react";

export const TadasanaDetector = ({
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
  const [currentPose, setCurrentPose] = useState("Waiting...");

  // Configuration
  const CONFIG = {
    ACCURACY_THRESHOLD: 60,
    HOLD_TIME_FOR_REP: 3, // 3 seconds hold = 1 rep
  };

  const LANDMARKS = {
    NOSE: 0, LEFT_SHOULDER: 11, RIGHT_SHOULDER: 12,
    LEFT_WRIST: 15, RIGHT_WRIST: 16,
    LEFT_HIP: 23, RIGHT_HIP: 24, 
    LEFT_KNEE: 25, RIGHT_KNEE: 26,
    LEFT_ANKLE: 27, RIGHT_ANKLE: 28,
    LEFT_HEEL: 29, RIGHT_HEEL: 30,
    LEFT_FOOT_INDEX: 31, RIGHT_FOOT_INDEX: 32
  };

  // Logic Refs
  const sessionRef = useRef({
    isHoldActive: false,
    holdStartTime: 0,
    lastFrameTime: performance.now() / 1000,
  });

  // ----- The Core Logic: Tadasana Stretch Classification -----
  const classifyTadasanaStretch = (landmarks) => {
    if (!landmarks) return { pose: "Searching...", accuracy: 0, suggestions: [] };

    const get = (idx) => landmarks[idx];
    const ls = get(LANDMARKS.LEFT_SHOULDER), rs = get(LANDMARKS.RIGHT_SHOULDER);
    const lw = get(LANDMARKS.LEFT_WRIST), rw = get(LANDMARKS.RIGHT_WRIST);
    const lh = get(LANDMARKS.LEFT_HIP), rh = get(LANDMARKS.RIGHT_HIP);
    const lk = get(LANDMARKS.LEFT_KNEE), rk = get(LANDMARKS.RIGHT_KNEE);
    const la = get(LANDMARKS.LEFT_ANKLE), ra = get(LANDMARKS.RIGHT_ANKLE);
    const lh_heel = get(LANDMARKS.LEFT_HEEL), rh_heel = get(LANDMARKS.RIGHT_HEEL);
    const lf = get(LANDMARKS.LEFT_FOOT_INDEX), rf = get(LANDMARKS.RIGHT_FOOT_INDEX);

    // 1. STRICT IDLE/SITTING CHECK
    const hipToAnkleDist = Math.abs(lh.y - la.y);
    const isStanding = lh.y < lk.y && lk.y < la.y && ls.y < lh.y;
    
    if (!isStanding || hipToAnkleDist < 0.3) {
      return { pose: "Idle / Sitting", accuracy: 0, suggestions: ["Stand up to begin"] };
    }

    let scores = [];
    let currentSuggestions = [];

    // 2. ARMS UPWARD CHECK
    const armsUpScore = ((ls.y > lw.y ? 100 : 0) + (rs.y > rw.y ? 100 : 0)) / 2;
    scores.push(armsUpScore);
    if (armsUpScore < 100) currentSuggestions.push("Stretch your arms high above your head");

    // 3. ON TOES CHECK
    const leftHeelLift = lf.y - lh_heel.y; 
    const rightHeelLift = rf.y - rh_heel.y;
    const toeScore = ((leftHeelLift > 0.02 ? 100 : 0) + (rightHeelLift > 0.02 ? 100 : 0)) / 2;
    scores.push(toeScore);
    if (toeScore < 50) currentSuggestions.push("Lift your heels and balance on your toes");

    // 4. BODY ALIGNMENT
    const alignmentDev = Math.abs(ls.x - lh.x) + Math.abs(rs.x - rh.x);
    const alignmentScore = Math.max(0, 100 - alignmentDev * 400);
    scores.push(alignmentScore);

    const avgAccuracy = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

    return {
      pose: avgAccuracy > 30 ? "Full Tadasana Stretch" : "Detecting...",
      accuracy: avgAccuracy,
      suggestions: avgAccuracy > 85 ? ["Great Stretch! Hold it."] : currentSuggestions
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
        minDetectionConfidence: 0.6,
        minTrackingConfidence: 0.6,
      });

      pose.onResults((results) => {
        if (!results.poseLandmarks) return;

        const analysis = classifyTadasanaStretch(results.poseLandmarks);
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
          window.drawConnectors(ctx, results.poseLandmarks, window.POSE_CONNECTIONS, { color: '#00FF00', lineWidth: 3 });
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