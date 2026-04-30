'use client'
import { motion, useMotionValue, animate } from 'framer-motion';
import { useRef } from 'react';

const segments = [
  { label: 'Strength', icon: '/holistichealth/icons/StrengthIcon.png', color: '#FF3B30', value: 80 },
  { label: 'Nutrition', icon: '/holistichealth/icons/NutritionIcon.png', color: '#00C853', value: 70 },
  { label: 'Sleep', icon: '/holistichealth/icons/SleepIcon.png', color: '#818CF8', value: 75 },
  { label: 'Lifestyle', icon: '/holistichealth/icons/LifestyleIcon.png', color: '#FF7A00', value: 65 },
  { label: 'Mental Wellness', icon: '/holistichealth/icons/MentalWellnessIcon.png', color: '#00B8D9', value: 60 },
  { label: 'Mobility', icon: '/holistichealth/icons/MobilityIcon.png', color: '#0096FF', value: 85 },
];

export const Wheel = () => {
  const rotation = useMotionValue(0);
  const animationRef = useRef<any>(null);

  const handleHoverStart = () => {
    animationRef.current = animate(rotation, rotation.get() + 360, {
      duration: 6,
      ease: 'linear',
      repeat: Infinity,
    });
  };

  const handleHoverEnd = () => {
    if (animationRef.current) {
      animationRef.current.stop(); // ⛔ stops exactly where it is
    }
  };

  return (
    <div className="relative w-[420px] h-[420px] flex items-center justify-center">

      {/* Glow */}
      <div className="absolute w-full h-full rounded-full bg-gradient-to-tr from-white/20 to-transparent blur-[100px]" />

      {/* Outer Ring */}
      <div className="absolute inset-0 rounded-full border border-white/30 shadow-[inset_0_0_30px_rgba(255,255,255,0.2)]" />

      {/* Wheel */}
      <motion.div
        style={{ rotate: rotation }}
        className="relative w-full h-full rounded-full backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl overflow-hidden"
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full -rotate-90">
          <defs>
            {segments.map((seg, i) => (
              <radialGradient id={`grad${i}`} key={i}>
                <stop offset="0%" stopColor={seg.color} stopOpacity="0.9" />
                <stop offset="100%" stopColor={seg.color} stopOpacity="0.3" />
              </radialGradient>
            ))}
          </defs>

          {segments.map((seg, i) => (
            <motion.path
              key={i}
              d="M50 50 L50 5 A45 45 0 0 1 85 25 Z"
              fill={`url(#grad${i})`}
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="0.8"
              transform={`rotate(${i * 60}, 50, 50)`}
              whileHover={{
                scale: 1.08,
                filter: 'brightness(1.2)',
              }}
            />
          ))}
        </svg>

        {/* Icons + Labels */}
        {segments.map((seg, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-full h-full"
            style={{ transform: `translate(-50%, -50%) rotate(${i * 60}deg)` }}
          >
            <motion.div
              className="flex flex-col items-center mt-12"
              whileHover={{ scale: 1.15 }}
            >
              {/* PNG icon */}
              <div className="w-8 h-8 drop-shadow-xl">
                <img src={seg.icon} alt={seg.label} className="w-full h-full object-contain" />
              </div>

              {/* Label */}
              <span className="text-sm font-semibold text-white tracking-normal leading-[1] mt-1 drop-shadow-md text-center">
                {seg.label === "Mental Wellness" ? (
                  <>
                    Mental<br />Wellness
                  </>
                ) : (
                  seg.label
                )}
              </span>
            </motion.div>
          </div>
        ))}
      </motion.div>

      {/* Center */}
      <motion.div
        className="absolute z-10 w-44 h-44 rounded-full bg-gradient-to-br from-white to-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.2)] flex flex-col items-center justify-center border border-white/40"
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ repeat: Infinity, duration: 4 }}
      >
        <p className="text-gray-400 text-md tracking-widest uppercase">
          Holistic
        </p>

        <p className="text-[#886AC9] text-3xl font-bold">
          Health
        </p>
      </motion.div>
    </div>
  );
};