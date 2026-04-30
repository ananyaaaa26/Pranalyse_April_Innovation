'use client'
import { motion } from "framer-motion";
import { Wheel } from "../../holistichealing/Wheel";

const Circle = () => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="w-[320px] h-[320px] bg-black rounded-full 
                   flex items-center justify-center overflow-visible"
      >
        {/* Wheel wrapper */}
        <motion.div
          initial={{ scale: 0.65 }} // smaller initially (gap visible)
          whileHover={{ scale: 0.95 }} // grows beyond circle
          transition={{ type: "spring", stiffness: 50, damping: 10 }}
          className="flex items-center justify-center"
        >
          <Wheel />
        </motion.div>
      </div>
    </div>
  );
};

export default Circle;