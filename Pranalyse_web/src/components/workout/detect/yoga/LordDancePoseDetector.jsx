"use client";
import { useEffect, useRef, useState } from "react";

export const LordDancePoseDetector = ({
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
    ACCURACY_THRESHOLD: 65,
    MINIMUM_HOLD_TIME: 5, // Hold for 5s to count a rep
  };

  // Logic Refs
  const sessionRef = useRef({
    isHoldActive: false,
    holdStartTime: 0,
    hasReachedMinimumHold: false,
    lastFrameTime: performance.now() / 1000,
    smoothAccuracy: 0 
  });

  // ----- Math Helpers -----
  const calculateAngle = (p1, p2, p3) => {
    const radians = Math.atan2(p3.y - p2.y, p3.x - p2.x) - 
                    Math.atan2(p1.y - p2.y, p1.x - p2.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    if (angle > 180.0) angle = 360 - angle;
    return angle;
  };

  // ----- The Core Logic: Lord of the Dance Classification -----
  const classifyLordDance = (landmarks) => {
    if (!landmarks) return { pose: "Searching...", accuracy: 0, suggestions: [] };

    const get = (idx) => landmarks[idx];
    const ls = get(11), rs = get(12); // Shoulders
    const lh = get(23), rh = get(24); // Hips
    const lk = get(25), rk = get(26); // Knees
    const la = get(27), ra = get(28); // Ankles
    const lw = get(15), rw = get(16); // Wrists

    // 1. STABILITY CHECK
    const torsoSize = Math.abs(lh.y - ls.y);
    const legSize = Math.abs(la.y - lh.y);
    if (legSize < torsoSize * 0.7 || ls.y > lh.y) {
      return { pose: "Idle", accuracy: 0, suggestions: ["Stand up straight"] };
    }

    // 2. SIDE DETECTION (Which leg is the standing leg?)
    const isLeftStanding = la.y > ra.y;
    const sAnk = isLeftStanding ? la : ra;
    const sKnee = isLeftStanding ? lk : rk;
    const sHip = isLeftStanding ? lh : rh;
    const lAnk = isLeftStanding ? ra : la;
    const lKnee = isLeftStanding ? rk : lk;
    const lHip = isLeftStanding ? rh : lh;
    const fWrist = isLeftStanding ? lw : rw;
    const gWrist = isLeftStanding ? rw : lw;

    let scores = [];
    let currentSuggestions = [];

    // Angle 1: Standing leg verticality (~180°)
    const stAngle = calculateAngle(sHip, sKnee, sAnk);
    scores.push(Math.max(0, 100 - Math.abs(180 - stAngle) * 5));

    // Angle 2: Lifted leg extension (The "Dance" arch)
    const shRef = isLeftStanding ? ls : rs;
    const archAngle = calculateAngle(shRef, lHip, lKnee);
    scores.push(archAngle > 125 ? 100 : (archAngle / 125) * 100);

    // Connection: Hand to Foot distance
    const dist = Math.sqrt(Math.pow(gWrist.x - lAnk.x, 2) + Math.pow(gWrist.y - lAnk.y, 2));
    scores.push(dist < 0.2 ? 100 : Math.max(0, 100 - (dist - 0.2) * 400));

    // Balance: Forward arm horizontal alignment
    scores.push(Math.max(0, 100 - Math.abs(fWrist.y - shRef.y) * 350));

    const rawAccuracy = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    
    // Smoothing
    sessionRef.current.smoothAccuracy = (sessionRef.current.smoothAccuracy * 0.8) + (rawAccuracy * 0.2);
    const finalAccuracy = Math.round(sessionRef.current.smoothAccuracy);

    if (dist > 0.3) currentSuggestions.push("Reach back for your foot");
    if (stAngle < 165) currentSuggestions.push("Lock your standing knee");

    return {
      pose: finalAccuracy > 50 ? "Lord of the Dance" : "Standing",
      accuracy: finalAccuracy,
      suggestions: currentSuggestions.length > 0 ? currentSuggestions : ["Perfect form! Hold steady."]
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
      }
      
      if (now - stats.holdStartTime >= CONFIG.MINIMUM_HOLD_TIME) {
        stats.hasReachedMinimumHold = true;
      }
    } else {
      // Logic for counting a rep only after a successful hold was broken/finished
      if (stats.hasReachedMinimumHold) {
        setRepCount(prev => prev + 1);
        stats.hasReachedMinimumHold = false;
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

      pose.setOptions({ 
        modelComplexity: 1, 
        smoothLandmarks: true, 
        minDetectionConfidence: 0.6 
      });

      pose.onResults((results) => {
        if (!results.poseLandmarks) return;

        const analysis = classifyLordDance(results.poseLandmarks);
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
          const color = sessionRef.current.hasReachedMinimumHold ? '#22c55e' : '#ec4899';
          window.drawConnectors(ctx, results.poseLandmarks, window.POSE_CONNECTIONS, { color, lineWidth: 4 });
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