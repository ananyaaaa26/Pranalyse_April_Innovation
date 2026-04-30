"use client";
import { useEffect, useRef, useState } from "react";

export const TreePoseDetector = ({
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
//   const [poseAccuracy, setPoseAccuracy] = useState(0);
//   const [suggestions, setSuggestions] = useState([]);
//   const [repCount, setRepCount] = useState(0);
//   const [totalTime, setTotalTime] = useState(0);

  // Configuration
  const CONFIG = {
    MIN_ACCURACY_TO_START: 70, // Must hit this to start the hold
    EXIT_THRESHOLD: 30,       // Dropping below this ends the rep
    HOLD_TIME_REQUIRED: 3,    // Seconds to hold for a valid rep
  };

  // Logic Refs (to track state across frames without re-renders)
  const sessionRef = useRef({
    isHolding: false,
    startTime: 0,
    repReadyToCount: false,
    lastFrameTime: performance.now(),
  });

  const LANDMARKS = {
    LEFT_SHOULDER: 11, RIGHT_SHOULDER: 12,
    LEFT_ELBOW: 13, RIGHT_ELBOW: 14,
    LEFT_WRIST: 15, RIGHT_WRIST: 16,
    LEFT_HIP: 23, RIGHT_HIP: 24,
    LEFT_KNEE: 25, RIGHT_KNEE: 26,
    LEFT_ANKLE: 27, RIGHT_ANKLE: 28,
  };

  // ----- Math & Distance Helpers -----
  const calculateAngle = (A, B, C) => {
    const v1 = { x: A.x - B.x, y: A.y - B.y };
    const v2 = { x: C.x - B.x, y: C.y - B.y };
    const dot = v1.x * v2.x + v1.y * v2.y;
    const mag1 = Math.sqrt(v1.x ** 2 + v1.y ** 2);
    const mag2 = Math.sqrt(v2.x ** 2 + v2.y ** 2);
    const angle = Math.acos(Math.max(-1, Math.min(1, dot / (mag1 * mag2)))) * 180 / Math.PI;
    return angle;
  };

  const getDist = (p1, p2) => Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);

  // ----- The Core Logic: Tree Pose Classification -----
  const classifyTreePose = (landmarks) => {
    if (!landmarks) return { pose: "Searching...", accuracy: 0, suggestions: [] };

    const get = (i) => landmarks[i];
    const lw = get(LANDMARKS.LEFT_WRIST), rw = get(LANDMARKS.RIGHT_WRIST);
    const ls = get(LANDMARKS.LEFT_SHOULDER), rs = get(LANDMARKS.RIGHT_SHOULDER);
    const lk = get(LANDMARKS.LEFT_KNEE), rk = get(LANDMARKS.RIGHT_KNEE);
    const lh = get(LANDMARKS.LEFT_HIP), rh = get(LANDMARKS.RIGHT_HIP);
    const la = get(LANDMARKS.LEFT_ANKLE), ra = get(LANDMARKS.RIGHT_ANKLE);

    let currentSuggestions = [];
    let legScore = 0;
    let armScore = 0;

    // 1. ARM GATE: Are hands in Prayer or Overhead?
    const handDist = getDist(lw, rw);
    const handsInPrayer = handDist < 0.12 && lw.y < lh.y && lw.y > ls.y;
    const handsOverhead = lw.y < ls.y && rw.y < rs.y && handDist < 0.25;

    if (handsInPrayer || handsOverhead) {
      armScore = 100;
    } else {
      armScore = 20;
      currentSuggestions.push("Bring hands to heart center or reach up");
    }

    // 2. LEG GATE: Is one leg bent and the foot high?
    const leftKneeAngle = calculateAngle(lh, lk, la);
    const rightKneeAngle = calculateAngle(rh, rk, ra);

    // Standing leg should be straight (>160°), raised leg bent (<100°)
    const leftRaised = leftKneeAngle < 120;
    const rightRaised = rightKneeAngle < 120;

    if (leftRaised || rightRaised) {
      if (leftRaised) {
        legScore += (rightKneeAngle > 165) ? 50 : 10; // Standing leg straightness
        legScore += (la.y < rk.y) ? 50 : 20;          // Foot must be above standing knee
        if (rightKneeAngle <= 165) currentSuggestions.push("Straighten your standing leg");
        if (la.y >= rk.y) currentSuggestions.push("Lift your foot higher above the knee");
      } else {
        legScore += (leftKneeAngle > 165) ? 50 : 10;
        legScore += (ra.y < lk.y) ? 50 : 20;
        if (leftKneeAngle <= 165) currentSuggestions.push("Straighten your standing leg");
        if (ra.y >= lk.y) currentSuggestions.push("Lift your foot higher above the knee");
      }
    } else {
      legScore = 0;
      currentSuggestions.push("Lift one foot and place it on your inner thigh");
    }

    // IDLE CHECK: If everything is low, user is idle
    if (legScore < 30 && armScore < 30) {
      return { pose: "Idle", accuracy: 0, suggestions: ["Stand tall to begin"] };
    }

    // FINAL ACCURACY: If arms OR legs are missing, force accuracy down
    // This prevents "faking" the pose with just legs.
    let finalAccuracy = 0;
    if (armScore > 50 && legScore > 50) {
      finalAccuracy = Math.round((armScore + legScore) / 2);
    } else {
      finalAccuracy = 35; // "Incomplete" state
    }

    return {
      pose: finalAccuracy > 60 ? "Tree Pose" : "Adjusting Pose...",
      accuracy: finalAccuracy,
      suggestions: currentSuggestions
    };
  };

  // ----- Rep & Timer State Machine -----
  const updateMetrics = (accuracy) => {
    const now = performance.now();
    const dt = (now - sessionRef.current.lastFrameTime) / 1000;
    sessionRef.current.lastFrameTime = now;

    if (accuracy >= CONFIG.MIN_ACCURACY_TO_START) {
      setTotalTime(prev => prev + dt);
      
      if (!sessionRef.current.isHolding) {
        sessionRef.current.isHolding = true;
        sessionRef.current.startTime = now;
      } else {
        const holdDuration = (now - sessionRef.current.startTime) / 1000;
        if (holdDuration >= CONFIG.HOLD_TIME_REQUIRED) {
          sessionRef.current.repReadyToCount = true;
        }
      }
    } else {
      // If user drops the pose after a successful hold
      if (sessionRef.current.repReadyToCount && accuracy < CONFIG.EXIT_THRESHOLD) {
        setRepCount(prev => prev + 1);
        sessionRef.current.repReadyToCount = false;
      }
      sessionRef.current.isHolding = false;
    }
  };

  // ----- Initialization -----
  useEffect(() => {
    const init = async () => {
      const pose = new window.Pose({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
      });

      pose.setOptions({ modelComplexity: 1, smoothLandmarks: true, minDetectionConfidence: 0.6 });

      pose.onResults((results) => {
        if (!results.poseLandmarks) return;

        const analysis = classifyTreePose(results.poseLandmarks);
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
          window.drawConnectors(ctx, results.poseLandmarks, window.POSE_CONNECTIONS, { color: '#00FF00', lineWidth: 2 });
          window.drawLandmarks(ctx, results.poseLandmarks, { color: '#FF0000', lineWidth: 1, radius: 3 });
        }
        ctx.restore();
      });

      const camera = new window.Camera(videoRef.current, {
        onFrame: async () => { await pose.send({ image: videoRef.current }); },
        width: 640, height: 480
      });
      camera.start();
      setIsLoaded(true);
    };

    if (window.Pose) init();
    else setError("MediaPipe not loaded. Please check your internet connection.");
  }, []);

  return (
    <div >
      <video ref={videoRef} style={{ display: "none" }} />
      <canvas ref={canvasRef} 
        width={`${cameraInSmallBox?"150px":"640"}`} 
        height={`${cameraInSmallBox?"150px":"480"}`} 
        style={{ width: "100%", height: "100%", objectFit: "contain", transform: "scaleX(-1)" }} 
        />
    </div>
  );
};