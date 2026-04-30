'use client'
import { motion, useAnimation } from 'framer-motion';
import { useState } from 'react';

const segments = [
  { label: 'Strength', icon: '🏋️', color: '#60A5FA', value: 80 },
  { label: 'Nutrition', icon: '🥗', color: '#FB923C', value: 70 },
  { label: 'Sleep', icon: '🌙', color: '#818CF8', value: 75 },
  { label: 'Lifestyle', icon: '❤️', color: '#FACC15', value: 65 },
  { label: 'Stress', icon: '🧠', color: '#2DD4BF', value: 60 },
  { label: 'Mobility', icon: '🧘', color: '#4ADE80', value: 85 },
];

export const Wheel = () => {
  const controls = useAnimation();
  const [activeSegment, setActiveSegment] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleHoverStart = () => {
    setIsHovered(true);
    controls.start({
      rotate: 360,
      transition: { repeat: Infinity, ease: 'linear', duration: 5 },
    });
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    controls.stop();
  };

  return (
    <div className="relative w-[90vw] max-w-[450px] h-[90vw] max-h-[450px] flex items-center justify-center">
      {/* Soft Outer Glow */}
      <div className="absolute inset-0 bg-white/20 blur-[80px] rounded-full" />

      {/* Rotating Wheel */}
      <motion.div
        className="relative w-full h-full rounded-full bg-white/30 backdrop-blur-sm p-6 shadow-2xl border border-white/40 overflow-hidden"
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
        animate={controls}
        style={{ transformOrigin: '50% 50%' }}
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full -rotate-[90deg]">
          <defs>
            {segments.map((seg, i) => (
              <linearGradient id={`grad${i}`} key={i} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={seg.color} stopOpacity="0.7" />
                <stop offset="100%" stopColor={seg.color} stopOpacity="0.4" />
              </linearGradient>
            ))}
          </defs>

          {segments.map((seg, i) => (
            <motion.path
              key={i}
              d="M50 50 L50 0 A50 50 0 0 1 93.3 25 Z"
              fill={`url(#grad${i})`}
              stroke="white"
              strokeWidth="0.5"
              transform={`rotate(${i * 60}, 50, 50)`}
              whileHover={{ scale: 1.05, opacity: 1 }}
            />
          ))}
        </svg>

        {/* Labels & Icons */}
        {segments.map((seg, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-full h-full"
            style={{ transform: `translate(-50%, -50%) rotate(${i * 60}deg)` }}
            onMouseEnter={() => setActiveSegment(i)}
            onMouseLeave={() => setActiveSegment(null)}
          >
            <motion.div
              className="flex flex-col items-center mt-12"
              animate={{ rotate: isHovered ? -360 : 0 }}
              transition={{ repeat: Infinity, ease: 'linear', duration: 5 }}
            >
              <span className="text-2xl mb-1 drop-shadow-lg">{seg.icon}</span>
              <span className="text-[10px] font-bold uppercase text-slate-700 tracking-tighter">
                {seg.label}
              </span>
            </motion.div>
          </div>
        ))}
      </motion.div>

      {/* Center Score Card */}
      <div className="absolute z-10 w-48 h-48 bg-white rounded-full shadow-xl flex flex-col items-center justify-center text-center border-[10px] border-gray-100">
        <p className="text-[24px] text-gray-400 font-bold uppercase tracking-widest leading-snug mb-1">
          Holistic Health
        </p>
      </div>

      {/* Optional Hover Tooltip */}
      {activeSegment !== null && (
        <div className="absolute bottom-4 bg-white/90 px-3 py-1 rounded shadow text-sm text-gray-700">
          {segments[activeSegment].label}: {segments[activeSegment].value}%
        </div>
      )}
    </div>
  );
};