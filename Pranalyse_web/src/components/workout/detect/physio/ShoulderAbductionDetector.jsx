"use client";
import { useEffect, useRef, useState } from "react";

export const ShoulderAbductionDetector = ({
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
    ACCURACY_THRESHOLD: 75,
    MIN_HOLD_TIME: 3,       // Seconds to hold for a rep
    TARGET_ANGLE: 85,       // Target abduction angle
  };

  const LANDMARKS = {
    LEFT_SHOULDER: 11, RIGHT_SHOULDER: 12,
    LEFT_ELBOW: 13, RIGHT_ELBOW: 14,
    LEFT_WRIST: 15, RIGHT_WRIST: 16,
    LEFT_HIP: 23, RIGHT_HIP: 24
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

  // ----- The Core Logic: Shoulder Abduction Classification -----
  const classifyAbduction = (landmarks) => {
    if (!landmarks) return { pose: "Searching...", accuracy: 0, suggestions: [] };

    const get = (idx) => landmarks[idx];
    const ls = get(LANDMARKS.LEFT_SHOULDER), rs = get(LANDMARKS.RIGHT_SHOULDER);
    const le = get(LANDMARKS.LEFT_ELBOW), re = get(LANDMARKS.RIGHT_ELBOW);
    const lw = get(LANDMARKS.LEFT_WRIST), rw = get(LANDMARKS.RIGHT_WRIST);
    const lh = get(LANDMARKS.LEFT_HIP), rh = get(LANDMARKS.RIGHT_HIP);

    // 1. UPRIGHT CHECK
    const isUpright = ls.y < lh.y && rs.y < rh.y;
    const leftAngle = calculateAngle(lh, ls, le);
    const rightAngle = calculateAngle(rh, rs, re);

    // 2. STRICT IDLE CHECK
    if (!isUpright || (leftAngle < 35 && rightAngle < 35)) {
      return { 
        pose: "Idle", 
        accuracy: 0, 
        suggestions: ["Stand/Sit straight and raise both arms to the sides"] 
      };
    }

    let scores = [];
    let currentSuggestions = [];

    // 3. SCORE: Bilateral Height (The "Weakest Link" Logic)
    const minAngle = Math.min(leftAngle, rightAngle);
    const heightScore = minAngle >= CONFIG.TARGET_ANGLE ? 100 : (minAngle / CONFIG.TARGET_ANGLE) * 100;
    scores.push(heightScore);
    
    if (leftAngle < CONFIG.TARGET_ANGLE || rightAngle < CONFIG.TARGET_ANGLE) {
      currentSuggestions.push("Raise BOTH arms to shoulder level");
    }

    // 4. SCORE: Symmetry
    const diff = Math.abs(leftAngle - rightAngle);
    const symmetryScore = Math.max(0, 100 - (diff * 2)); 
    scores.push(symmetryScore);
    if (diff > 15) currentSuggestions.push("Level your arms—one is lower than the other");

    // 5. SCORE: Elbow Straightness
    const lElbow = calculateAngle(ls, le, lw);
    const rElbow = calculateAngle(rs, re, rw);
    const elbowScore = ((lElbow > 160 ? 100 : 50) + (rElbow > 160 ? 100 : 50)) / 2;
    scores.push(elbowScore);
    if (elbowScore < 90) currentSuggestions.push("Lock your elbows straight");

    const avgAccuracy = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

    return {
      pose: avgAccuracy > 40 ? "Holding Abduction" : "Stabilizing...",
      accuracy: avgAccuracy,
      suggestions: avgAccuracy > 85 ? ["Perfect alignment!"] : currentSuggestions
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
    } else {
      if (stats.isCurrentlyInPose) {
        const totalHoldDuration = now - stats.holdStartTime;
        if (totalHoldDuration >= CONFIG.MIN_HOLD_TIME) {
          setRepCount(prev => prev + 1);
        }
        stats.isCurrentlyInPose = false;
        stats.holdStartTime = 0;
      }
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
        minTrackingConfidence: 0.6 
      });

      pose.onResults((results) => {
        if (!results.poseLandmarks) return;

        const analysis = classifyAbduction(results.poseLandmarks);
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
          window.drawConnectors(ctx, results.poseLandmarks, window.POSE_CONNECTIONS, { color: '#00D2FF', lineWidth: 4 });
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