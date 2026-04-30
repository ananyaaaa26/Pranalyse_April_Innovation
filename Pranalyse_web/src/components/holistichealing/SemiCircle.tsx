'use client'
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const images = [
  '/holistichealing/1.png',
  '/holistichealing/2.png',
  '/holistichealing/3.png',
  '/holistichealing/4.png',
  '/holistichealing/5.png',
  '/holistichealing/6.png',
  '/holistichealing/7.png',
  '/holistichealing/8.png',
  '/holistichealing/9.png'
];

export const SemiCircle = () => {
  const [index, setIndex] = useState(0);
  const [triggerNext, setTriggerNext] = useState(false);

  // Timer for switching images
  useEffect(() => {
    const timer = setInterval(() => {
      setTriggerNext(true);
    }, 5200); // 4s pause + 1.2s move
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (triggerNext) {
      setIndex((prev) => (prev + 1) % images.length);
      setTriggerNext(false);
    }
  }, [triggerNext]);

  // Semi-circle path (bottom-right) from 0° to 90° (using a smooth quadratic Bezier)
  const pathData = "M 350,500 Q 400,200 200,200"; 

  return (
    <div className="absolute right-0 bottom-0 w-[500px] h-[500px]">
      <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 400 400">
        <path 
          d={pathData}
          fill="none" 
          stroke="white" 
          strokeWidth="4" 
          strokeLinecap="round"
          className="opacity-60"
        />
      </svg>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute w-44 h-44 animate-saturateEffect"
          initial={{ offsetDistance: "0%", opacity: 0, scale: 0.6 }}
          animate={{ 
            offsetDistance: "100%",
            opacity: 1,
            scale: 1
          }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ 
            offsetDistance: {
              duration: 2, // smooth movement duration
              ease: [0.22, 1, 0.36, 1] // smooth cubic-bezier easing
            },
            opacity: { duration: 0.4 },
            scale: { duration: 0.6 }
          }}
          style={{
            offsetPath: `path('${pathData}')`,
            offsetRotate: "0deg",
            willChange: "transform"
          }}
        >
          <img src={images[index]} alt={`Status ${index}`} className="w-full h-full object-contain" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};