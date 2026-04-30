"use client";

import { useEffect, useState } from "react";

const steps = [
  { id: 1, title: "Open the App", desc: "Launch the app on your device.", img: "/physio/steps/pS1.png" },
  { id: 2, title: "Start Physiotherapy", desc: "Tap “Start Exercise” to begin your session.", img: "/physio/steps/pS2.png" },
  { id: 3, title: "Choose an Exercise", desc: "Select a specific exercise or let the app auto-detect the exercise for you.", img: "/physio/steps/pS3.png" },
  { id: 4, title: "Get Ready", desc: "Stand or sit in front of your device so your whole body is visible on the screen.", img: "/global/steps/C4.png" },
  { id: 5, title: "Follow AI Guidance", desc: "Your AI companion will give real-time instructions, suggestions and corrections if your exercise is incorrect.", img: "/global/steps/C5.png" },
  { id: 6, title: "Track Accuracy & Reps", desc: "The app will automatically count your repetitions and track how accurately you’re performing each pose.", img: "/global/steps/C6.png" },
  { id: 7, title: "Customize Your Session", desc: "Add background music, select your preferred language, or adjust other settings to make your session comfortable.", img: "/global/steps/C7.png" },
  { id: 8, title: "Complete the Session", desc: "Finish your poses, review your performance, and improve with AI tips for next time.", img: "/physio/steps/pS8.png" },
];

export default function WorkingSteps() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % steps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const visibleSteps = [
    steps[index % steps.length],
    steps[(index + 1) % steps.length],
    steps[(index + 2) % steps.length],
    steps[(index + 3) % steps.length],
  ];

  return (
    <div className="relative flex flex-col items-center gap-8 overflow-visible">
      {visibleSteps.map((step, i) => {
        const isMain = i === 1;
        const scaleMap = [0.85, 1.25, 0.85, 0.85];
        const translateYMap = [-20, 0, 20, 40];

        return (
          <div
            key={step.id}
            className={`
              flex items-center rounded-xl px-8 py-3 text-white
              ${isMain
                ? "bg-[#886AC9] h-34 w-[440px] z-20 -ml-2 shadow-4xl gap-8"
                : "bg-[#212531] h-14 w-[220px] opacity-70 gap-4"
              }
            `}
            style={{
              transform: `scale(${scaleMap[i]}) translateY(${translateYMap[i]}px)`,
              transition: "transform 1s ease-in-out, opacity 1s ease-in-out",
              willChange: "transform, opacity",
            }}
          >
            {/* Left Image */}
            <img
              src={step.img}
              alt={step.title}
              className={`${isMain ? "w-20 h-20" : "w-8 h-8"}`}
            />

            {/* Text */}
<div>
  <p className={`${isMain ? "text-xs opacity-90" : "text-[9px] opacity-70"}`}>
    Step {step.id}
  </p>
  <p className={`${isMain ? "text-lg font-bold" : "text-[10px]"}`}>
    {step.title}
  </p>
  {isMain && (
    <p className="text-sm opacity-80 mt-1 leading-4">{step.desc}</p>
  )}
</div>
          </div>
        );
      })}
    </div>
  );
}