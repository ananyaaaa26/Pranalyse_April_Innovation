"use client";
import { useEffect, useRef, useState } from "react";

export const ProSquatDetector = ({
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
    ACCURACY_THRESHOLD: 80, // High bar for "Pro" detection
    MIN_HOLD_TIME: 2,       // Seconds to hold at depth
    MAX_KNEE_ANGLE: 105,    // Depth threshold
  };

  const LANDMARKS = {
    LEFT_SHOULDER: 11, RIGHT_SHOULDER: 12,
    LEFT_HIP: 23, RIGHT_HIP: 24,
    LEFT_KNEE: 25, RIGHT_KNEE: 26,
    LEFT_ANKLE: 27, RIGHT_ANKLE: 28
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

  // ----- The Core Logic: Pro Squat Classification -----
  const classifySquat = (landmarks) => {
    if (!landmarks) return { pose: "Searching...", accuracy: 0, suggestions: [] };

    const get = (idx) => landmarks[idx];
    const ls = get(LANDMARKS.LEFT_SHOULDER), rs = get(LANDMARKS.RIGHT_SHOULDER);
    const lh = get(LANDMARKS.LEFT_HIP), rh = get(LANDMARKS.RIGHT_HIP);
    const lk = get(LANDMARKS.LEFT_KNEE), rk = get(LANDMARKS.RIGHT_KNEE);
    const la = get(LANDMARKS.LEFT_ANKLE), ra = get(LANDMARKS.RIGHT_ANKLE);

    // 1. VERTICAL STACK CHECK (Sitting Filter)
    const leftHAlignment = Math.abs(lh.x - la.x);
    const rightHAlignment = Math.abs(rh.x - ra.x);
    const isSitting = leftHAlignment > 0.2 || rightHAlignment > 0.2;

    // 2. DEPTH CHECKS
    const lKneeAngle = calculateAngle(lh, lk, la);
    const rKneeAngle = calculateAngle(rh, rk, ra);
    const avgKnee = (lKneeAngle + rKneeAngle) / 2;

    // 3. IDLE GATE
    if (avgKnee > 155 || isSitting) {
      const msg = isSitting ? "Don't lean back! Stand clear of chairs." : "Lower your hips to start";
      return { pose: "Idle", accuracy: 0, suggestions: [msg] };
    }

    let scores = [];
    let currentSuggestions = [];

    // 4. SCORE: Depth
    const depthScore = avgKnee <= CONFIG.MAX_KNEE_ANGLE ? 100 : 
                       Math.max(0, 100 - (avgKnee - CONFIG.MAX_KNEE_ANGLE) * 4);
    scores.push(depthScore);
    if (avgKnee > CONFIG.MAX_KNEE_ANGLE) currentSuggestions.push("Drop your hips lower (parallel to floor)");

    // 5. SCORE: Torso Angle
    const lTorso = calculateAngle(ls, lh, lk);
    const rTorso = calculateAngle(rs, rh, rk);
    const torsoScore = Math.min(100, ((lTorso + rTorso) / 2) * 1.2);
    scores.push(torsoScore);
    if (torsoScore < 70) currentSuggestions.push("Keep your chest up");

    // 6. SCORE: Knee Stability
    const kneeWidth = Math.abs(lk.x - rk.x);
    const hipWidth = Math.abs(lh.x - rh.x);
    const stabilityScore = kneeWidth >= hipWidth ? 100 : 60;
    scores.push(stabilityScore);
    if (stabilityScore < 100) currentSuggestions.push("Push your knees outward");

    const avgAccuracy = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

    return {
      pose: avgAccuracy > 60 ? "Active Squat" : "Check Form",
      accuracy: avgAccuracy,
      suggestions: avgAccuracy > 85 ? ["Perfect Form! Hold it."] : currentSuggestions
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
        minDetectionConfidence: 0.7, 
        minTrackingConfidence: 0.7 
      });

      pose.onResults((results) => {
        if (!results.poseLandmarks) return;

        const analysis = classifySquat(results.poseLandmarks);
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
          window.drawConnectors(ctx, results.poseLandmarks, window.POSE_CONNECTIONS, { color: '#00FF00', lineWidth: 4 });
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