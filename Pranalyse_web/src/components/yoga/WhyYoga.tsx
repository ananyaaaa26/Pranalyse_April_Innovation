"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const points = [
  {
    img: "/global/points/yellow.png",
    title: "Improves Flexibility, Strength & Balance",
    desc: "Yoga stretches and strengthens your muscles, improves posture, and enhances balance, helping prevent injuries and supporting overall physical stability.",
  },
  {
    img: "/global/points/orange.png",
    title: "Mental Focus & Clarity",
    desc: "Yoga trains your mind to stay present, improving concentration, memory, and cognitive function.",
  },
  {
    img: "/global/points/violet.png",
    title: "Stress Reduction & Emotional Well-being",
    desc: "Through mindfulness, meditation, and breathing techniques, yoga reduces stress, anxiety, and depression while boosting mood and resilience.",
  },
  {
    img: "/global/points/blue.png",
    title: "Heart & Respiratory Health",
    desc: "Yoga supports cardiovascular health, improves circulation, and enhances lung capacity through controlled breathing exercises.",
  },
];

export default function WhyYoga() {
  return (
    <section className="w-full flex flex-col py-10 space-y-10 overflow-x-hidden">
      
      {/* Heading */}
      <h2 className="text-4xl font-bold text-white px-16">
        Why Yoga?
      </h2>

      {points.map((point, index) => (
        <div
          key={index}
          className="w-full flex flex-col md:flex-row items-center"
        >
          
          {/* LEFT IMAGE (flush to left edge) */}
<motion.div
  initial={{ x: "-30%", opacity: 0 }}
  whileInView={{ x: 0, opacity: 1 }}
  transition={{ duration: 1.5 }}
  viewport={{ once: false, amount: 0.3 }}
  className="flex-shrink-0"
>
<Image
  src={point.img}
  alt={point.title}
  width={0}
  height={0}
  sizes="100vw"
  className="w-auto h-auto object-contain"
/>
          </motion.div>

          {/* RIGHT TEXT */}
<motion.div
  initial={{ x: "20%", opacity: 0 }}
  whileInView={{ x: 0, opacity: 1 }}
  transition={{ duration: 1, delay: 0.75 }}
  viewport={{ once: false, amount: 0.5 }}
  className="text-white pl-6 md:pl-16 pr-6 md:pr-20 w-full max-w-[100vw]"
>
            <h3 className="text-2xl md:text-3xl font-semibold mb-4">
              {point.title}
            </h3>
            <p className="text-base md:text-lg opacity-80">
              {point.desc}
            </p>
          </motion.div>
        </div>
      ))}
    </section>
  );
}