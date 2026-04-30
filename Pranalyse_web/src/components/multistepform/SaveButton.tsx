"use client";

import { useRouter } from "next/navigation";

interface SaveButtonProps {
  onClick?: () => void;
  className?: string;
}

export default function SaveButton({ onClick, className }: SaveButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) onClick(); // optional external logic
    router.push("/aboutus");  
  };

  return (
    <button
      onClick={handleClick}
      className={`
        w-full px-8 py-2 mt-5 rounded-lg text-white font-semibold shadow-lg
        transition-all duration-300 ease-in-out
        relative overflow-hidden group
        ${className || ""}
      `}
      style={{
        background: "radial-gradient(circle at center, #7C5AEB 0%, #2C2881 100%)",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      }}
    >
      Save

      {/* Hover border */}
      <span
        className="absolute inset-0 rounded-lg border-1 border-transparent transition-all duration-300 pointer-events-none group-hover:border-white"
      />
    </button>
  );
}