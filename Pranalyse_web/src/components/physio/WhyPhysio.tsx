"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const points = [
  {
    img: "/global/points/yellow.png",
    title: "Therapeutic Physiotherapy",
    desc: "We provide only therapeutic physiotherapy that helps your body recover from injuries, surgeries, and chronic conditions in a safe and effective way.",
  },
  {
    img: "/global/points/orange.png",
    title: "Pain Relief & Safe Recovery",
    desc: "Our platform helps reduce pain, relieve discomfort & support a smooth recovery, helping you heal without putting extra strain on your body.",
  },
  {
    img: "/global/points/violet.png",
    title: "Neurological & Functional Rehabilitation",
    desc: "For patients recovering from stroke, spinal injuries, or other neurological conditions, physiotherapy helps retrain movement, improve coordination, and regain independence in daily life.",
  },
  {
    img: "/global/points/blue.png",
    title: "Restores Mobility & Strength",
    desc: "Physiotherapy helps improve joint movement, flexibility, and muscle strength, making it easier to do everyday activities and regain normal physical function.",
  },
    {
    img: "/global/points/cyan.png",
    title: "Balance, Coordination & Injury Prevention",
    desc: "We work on improving your balance, posture, and coordination, which lowers the risk of falls and prevents future injuries.",
  },
  {
    img: "/global/points/green.png",
    title: "Improves Quality of Life",
    desc: "By reducing pain, restoring mobility, and supporting overall recovery, physiotherapy helps you live comfortably, move confidently, and enjoy a better quality of life.",
  },
];

export default function WhyPhysio() {
  return (
    <section className="w-full flex flex-col py-10 space-y-10 overflow-x-hidden">
      
      {/* Heading */}
      <h2 className="text-4xl font-bold text-white px-16">
        Conditions we support
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