// HolisticButton.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface HolisticButtonProps {
  mformFilled?: boolean; // has the multi-form been filled
  planExist?: boolean; // does a holistic plan already exist
}

export const HolisticButton: React.FC<HolisticButtonProps> = ({
  mformFilled = true,
  planExist = true,
}) => {
  const router = useRouter();
  const [localPlanExist, setLocalPlanExist] = useState(planExist);
  const [localMFormFilled, setLocalMFormFilled] = useState(mformFilled);
  const [isWaiting, setIsWaiting] = useState(false);

  // Determine current label dynamically
  const buttonLabel = localPlanExist
    ? "View my Holistic Health Plan"
    : "Get your Holistic Health Plan";

  const handleClick = () => {
    if (localPlanExist) {
      // If plan exists, redirect immediately to /yourholistichealth
      router.push('/yourholistichealth');
      return;
    }

    if (!localPlanExist && !localMFormFilled) {
      // If nothing exists, redirect to /multiform
      router.push('/yourdetails');
      return;
    }

    if (!localPlanExist && localMFormFilled) {
      // Wait 5 seconds and then update
      setIsWaiting(true);
      setTimeout(() => {
        setLocalPlanExist(true); // plan now exists
        setIsWaiting(false);
      }, 5000);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isWaiting}
      className={`px-12 py-4 rounded-xl text-lg font-bold border border-white text-white transition-all shadow-none hover:shadow-lg hover:brightness-90 active:scale-95
        ${isWaiting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-[#2C2881] to-[#7C5AEB]'}
      `}
    >
      {isWaiting ? "Preparing your plan..." : buttonLabel}
    </button>
  );
};