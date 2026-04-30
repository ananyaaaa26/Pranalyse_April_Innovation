"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Subscribed for the newsletter!");
    setEmail("");
  };

  return (
    <motion.div
      className="relative w-full flex justify-end overflow-hidden"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
    >
      {/* Newsletter Image */}
      <div className="w-[90%] md:w-[95%] relative mt-22 mb-16">
        <Image
          src="/home/newsletter.png"
          alt="Newsletter"
          width={1000}
          height={600}
          className="w-full h-auto object-cover"
        />

        {/* Form Overlay */}
        <form
          onSubmit={handleSubscribe}
          className="absolute top-[45%] right-253 transform translate-x-[10%] -translate-y-1/2 flex bg-white rounded-md overflow-hidden shadow-lg"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-2 w-[clamp(120px,20vw,250px)] text-sm border-none outline-none"
          />
          <button
            type="submit"
            className="bg-[#6143A1] text-white font-bold px-6 py-2 whitespace-nowrap hover:bg-[#7C5AEB] transition-all"
          >
            JOIN NOW
          </button>
        </form>
      </div>
    </motion.div>
  );
}