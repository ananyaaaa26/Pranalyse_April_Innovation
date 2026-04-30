"use client";

import Image from "next/image";

export default function AuthLeftPanel() {
  return (
    <div
      className="relative flex items-center justify-center p-8 h-[500px] bg-[url('/auth/left_bg.png')] bg-cover bg-center"
    >

      {/* Content */}
      <div className="relative text-center text-white max-w-[280px]">
        <h1 className="text-3xl font-bold mb-8 mt-4">Welcome to</h1>

        <div className="mb-8 flex justify-center">
          <Image src="/auth/logo.png" alt="Logo" width={160} height={80} />
        </div>

        <p className="text-xs leading-tight">
          Analyse your prana with PRANALYSE!! Your intelligent companion for smarter movement and holistic wellness. Get real-time posture correction, personalized guidance, and adaptive AI coaching that understands your body, habits, and goals. Whether you aim to improve fitness, recover safely, or build better posture, PRANALYSE helps you move right, progress faster and live healthier every day.
        </p>
      </div>
    </div>
  );
}