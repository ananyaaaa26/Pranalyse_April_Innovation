"use client";
import { useEffect, useRef, useState } from "react";

export const Warrior1PoseDetector = ({
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

  // ----- Configuration -----
  const CONFIG = {
    TEMPORAL_SMOOTHING_FRAMES: 5,
    WARRIOR1_THRESHOLD: 55,     // accuracy threshold for Warrior 1
    MIN_REP_HOLD_SECONDS: 1,    // minimum hold time to count a rep
  };

  // ----- Logic Refs (Shared Pattern) -----
  const sessionRef = useRef({
    isHoldActive: false,
    holdStartTime: 0,
    lastFrameTime: performance.now(),
    poseHistory: [],
    lastStablePose: { pose: "No Pose Detected", accuracy: 0, suggestions: [] }
  });

  const LANDMARKS = {
    NOSE: 0, LEFT_SHOULDER: 11, RIGHT_SHOULDER: 12,
    LEFT_ELBOW: 13, RIGHT_ELBOW: 14, LEFT_WRIST: 15, RIGHT_WRIST: 16,
    LEFT_HIP: 23, RIGHT_HIP: 24, LEFT_KNEE: 25, RIGHT_KNEE: 26,
    LEFT_ANKLE: 27, RIGHT_ANKLE: 28,
  };

  // ----- Math & Distance Helpers (Unchanged) -----
  const calculateAngle = (A, B, C) => {
    const v1 = { x: A.x - B.x, y: A.y - B.y, z: A.z - B.z };
    const v2 = { x: C.x - B.x, y: C.y - B.y, z: C.z - B.z };
    const dot = v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    const mag1 = Math.sqrt(v1.x ** 2 + v1.y ** 2 + v1.z ** 2);
    const mag2 = Math.sqrt(v2.x ** 2 + v2.y ** 2 + v2.z ** 2);
    return Math.acos(Math.max(-1, Math.min(1, dot / (mag1 * mag2)))) * 180 / Math.PI;
  };

  const scoreAngle = (angle, ideal, tolerance) => {
    const diff = Math.abs(angle - ideal);
    if (diff <= tolerance) return 100;
    if (diff >= tolerance * 2) return 0;
    return 100 * (1 - (diff - tolerance) / tolerance);
  };

  // ----- The Core Logic: Warrior 1 Classification -----
  const classifyWarrior1 = (landmarks) => {
    if (!landmarks) return { pose: "No Pose Detected", accuracy: 0, suggestions: [] };
    const get = (idx) => landmarks[idx];

    // Determine front leg using facing direction and Z-depth
    const hipCenter = { x: (get(23).x + get(24).x) / 2, z: (get(23).z + get(24).z) / 2 };
    const facingCamera = get(0).z > hipCenter.z;
    
    let leftAnkleZ = get(27).z, rightAnkleZ = get(28).z;
    if (!facingCamera) { leftAnkleZ = -get(27).z; rightAnkleZ = -get(28).z; }
    const leftFront = leftAnkleZ > rightAnkleZ;

    const f = leftFront ? { h: get(23), k: get(25), a: get(27), w: get(15), e: get(13), s: get(11) } 
                        : { h: get(24), k: get(26), a: get(28), w: get(16), e: get(14), s: get(12) };
    const b = leftFront ? { h: get(24), k: get(26), a: get(28), w: get(16), e: get(14), s: get(12) } 
                        : { h: get(23), k: get(25), a: get(27), w: get(15), e: get(13), s: get(11) };

    const scores = {
      frontKnee: scoreAngle(calculateAngle(f.h, f.k, f.a), 90, 30),
      backKnee: scoreAngle(calculateAngle(b.h, b.k, b.a), 175, 30),
      torso: scoreAngle(calculateAngle({x: (get(23).x+get(24).x)/2, y: -1, z: 0}, {x: (get(23).x+get(24).x)/2, y: (get(23).y+get(24).y)/2, z: 0}, get(0)), 0, 20),
      arms: (scoreAngle(calculateAngle(f.s, f.e, f.w), 170, 20) + (f.w.y < f.s.y ? 100 : 0)) / 2
    };

    const accuracy = Math.round(scores.frontKnee * 0.3 + scores.backKnee * 0.3 + scores.torso * 0.2 + scores.arms * 0.2);
    
    const sug = [];
    if (scores.frontKnee < 70) sug.push("Bend front knee to 90°");
    if (scores.backKnee < 70) sug.push("Straighten back leg");
    if (scores.arms < 70) sug.push("Reach arms high");

    return { pose: "Warrior 1", accuracy, suggestions: sug };
  };

  // ----- Temporal Smoothing -----
  const smoothPose = (newPose) => {
    const stats = sessionRef.current;
    stats.poseHistory.push(newPose);
    if (stats.poseHistory.length > CONFIG.TEMPORAL_SMOOTHING_FRAMES) stats.poseHistory.shift();

    const counts = {};
    stats.poseHistory.forEach(p => { counts[p.pose] = (counts[p.pose] || 0) + 1; });

    let mostFrequentPose = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    if (counts[mostFrequentPose] >= Math.ceil(CONFIG.TEMPORAL_SMOOTHING_FRAMES / 2)) {
      const latest = [...stats.poseHistory].reverse().find(p => p.pose === mostFrequentPose);
      if (latest) stats.lastStablePose = latest;
    }
    return stats.lastStablePose;
  };

  // ----- Rep & Timer State Machine -----
  const updateMetrics = (accuracy) => {
    const now = performance.now();
    const stats = sessionRef.current;
    const dt = (now - stats.lastFrameTime) / 1000;
    stats.lastFrameTime = now;

    if (accuracy >= CONFIG.WARRIOR1_THRESHOLD) {
      setTotalTime(prev => prev + dt);
      if (!stats.isHoldActive) {
        stats.isHoldActive = true;
        stats.holdStartTime = now;
      }
    } else {
      if (stats.isHoldActive) {
        const holdDuration = (now - stats.holdStartTime) / 1000;
        if (holdDuration >= CONFIG.MIN_REP_HOLD_SECONDS) {
          setRepCount(prev => prev + 1);
        }
      }
      stats.isHoldActive = false;
    }
  };

  // ----- Initialization -----
  useEffect(() => {
    const init = async () => {
      const pose = new window.Pose({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
      });

      pose.setOptions({ modelComplexity: 1, smoothLandmarks: true, minDetectionConfidence: 0.5, minTrackingConfidence: 0.5 });

      pose.onResults((results) => {
        if (!results.poseWorldLandmarks) return;

        const raw = classifyWarrior1(results.poseWorldLandmarks);
        const stable = smoothPose(raw);
        
        setCurrentPose(stable.pose);
        setPoseAccuracy(stable.accuracy);
        setSuggestions(stable.suggestions);
        updateMetrics(stable.accuracy);

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