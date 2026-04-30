"use client";

import { useRef, useEffect } from "react";
import { useAnimation, useInView, motion } from "framer-motion";
import { Accordion } from "../global/accordion";
import Faq from "./Faq";
import faqsData from "../../data/faqs.json";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

export default function FAQsSection() {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { threshold: 0.5, rootMargin: "-200px 0px -200px 0px" });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
    <motion.section
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className="relative w-full flex justify-start overflow-hidden py-7 md:py-14"
    >
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <img
          src="/home/neurons.png"
          alt="FAQ Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* FAQ Content */}
      <div className="relative flex flex-col items-start space-y-5 md:space-y-10 w-full px-6 md:px-20 z-10">
        {/* Heading */}
        <motion.h2
          className="text-white font-bold text-xl sm:text-xl md:text-2xl lg:text-3xl text-left"
          variants={itemVariants}
        >
          Frequently Asked Questions
        </motion.h2>

        {/* Accordion */}
        <Accordion type="single" collapsible className="w-full lg:space-y-5 space-y-2">
          {faqsData.map((faq, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Faq faq={faq} index={index} />
            </motion.div>
          ))}
        </Accordion>
      </div>
    </motion.section>
  );
}