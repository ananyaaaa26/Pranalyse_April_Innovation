"use client";
import { useEffect, useRef, useState } from "react";

export const Warrior2PoseDetector = ({
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
    GOOD_POSE_THRESHOLD: 70,
    MIN_HOLD_FOR_REP: 2.0, // Seconds
  };

  // Logic Refs
  const sessionRef = useRef({
    isHolding: false,
    holdStartTime: 0,
    lastFrameTime: performance.now(),
  });

  // ----- Math Helpers -----
  const calcAngle = (p1, p2, p3) => {
    const angle = Math.atan2(p3.y - p2.y, p3.x - p2.x) - Math.atan2(p1.y - p2.y, p1.x - p2.x);
    let result = Math.abs((angle * 180) / Math.PI);
    if (result > 180) result = 360 - result;
    return result;
  };

  // ----- The Core Logic: Warrior 2 Classification -----
  const analyzeWarrior2 = (lm) => {
    const visibilityThreshold = 0.5;
    
    // 1. Visibility Check
    if (lm[23].visibility < visibilityThreshold || lm[25].visibility < visibilityThreshold || lm[27].visibility < visibilityThreshold) {
      return { pose: "Full Body Not Visible", accuracy: 0, suggestions: ["Please step back until your feet are visible."] };
    }

    // 2. Side Detection
    const leftKneeAngle = calcAngle(lm[23], lm[25], lm[27]);
    const rightKneeAngle = calcAngle(lm[24], lm[26], lm[28]);
    
    const isLeftForward = leftKneeAngle < 120;
    const frontKnee = isLeftForward ? leftKneeAngle : rightKneeAngle;
    const backKnee = isLeftForward ? rightKneeAngle : leftKneeAngle;

    const currentSuggestions = [];
    let scoreComponents = 0;
    const totalMaxScore = 4;

    // A. Front Knee (Goal: 90-110°)
    if (frontKnee >= 80 && frontKnee <= 110) {
      scoreComponents += 1;
    } else if (frontKnee < 80) {
      currentSuggestions.push("Lift your hips slightly; front knee is too deep.");
    } else {
      currentSuggestions.push("Bend your front knee more toward a 90° angle.");
    }

    // B. Back Knee (Goal: Straight > 170°)
    if (backKnee > 170) {
      scoreComponents += 1;
    } else if (backKnee > 160) {
      currentSuggestions.push("Keep your back leg as straight as possible.");
    } else {
      currentSuggestions.push("Fully straighten your back leg.");
    }

    // C. Arm Levelness
    const armLevelTolerance = 0.08;
    // Left Arm
    const leftArmOffset = lm[15].y - lm[11].y;
    if (Math.abs(leftArmOffset) < armLevelTolerance) scoreComponents += 1;
    else currentSuggestions.push(leftArmOffset > 0 ? "Raise your left arm to shoulder level." : "Lower your left arm to shoulder level.");

    // Right Arm
    const rightArmOffset = lm[16].y - lm[12].y;
    if (Math.abs(rightArmOffset) < armLevelTolerance) scoreComponents += 1;
    else currentSuggestions.push(rightArmOffset > 0 ? "Raise your right arm to shoulder level." : "Lower your right arm to shoulder level.");

    // D. Torso Centering (Bonus Check)
    const torsoTolerance = 0.05;
    const noseHipCenterOffset = lm[0].x - (lm[23].x + lm[24].x) / 2;
    if (Math.abs(noseHipCenterOffset) > torsoTolerance) {
      currentSuggestions.push(noseHipCenterOffset > 0 ? "Shift your torso slightly left to stay centered." : "Shift your torso slightly right to stay centered.");
    }

    const totalAcc = Math.round((scoreComponents / totalMaxScore) * 100);
    let finalPoseName = "Strike a Warrior 2 Pose";
    if (frontKnee < 130 && backKnee > 150) {
      finalPoseName = totalAcc >= 70 ? "Warrior 2 (Excellent!)" : "Warrior 2 (Adjusting...)";
    }

    return { pose: finalPoseName, accuracy: totalAcc, suggestions: currentSuggestions };
  };

  // ----- Rep & Timer State Machine -----
  const updateMetrics = (accuracy) => {
    const now = performance.now();
    const stats = sessionRef.current;
    const dt = (now - stats.lastFrameTime) / 1000;
    stats.lastFrameTime = now;

    if (accuracy >= CONFIG.GOOD_POSE_THRESHOLD) {
      setTotalTime(prev => prev + dt);
      if (!stats.isHolding) {
        stats.isHolding = true;
        stats.holdStartTime = now;
      }
    } else {
      // Logic: If they held for enough time and then released/failed, count as a rep
      if (stats.isHolding) {
        const duration = (now - stats.holdStartTime) / 1000;
        if (duration >= CONFIG.MIN_HOLD_FOR_REP) {
          setRepCount(prev => prev + 1);
        }
        stats.isHolding = false;
      }
    }
  };

  // ----- Initialization -----
  useEffect(() => {
    const init = async () => {
      const pose = new window.Pose({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
      });

      pose.setOptions({ modelComplexity: 1, smoothLandmarks: true, minDetectionConfidence: 0.6, minTrackingConfidence: 0.6 });

      pose.onResults((results) => {
        if (!results.poseLandmarks) return;

        const analysis = analyzeWarrior2(results.poseLandmarks);
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