"use client";

import { useMode } from "@/context/ModeContext";

export default function ModeToggle() {

  const { mode, setMode } = useMode();

  const autoDetect = mode === "auto";

  return (
    <div className="flex flex-col items-center">

      <h2 className="text-md font-bold">Auto Detect</h2>

      <div className="flex bg-gray-500 rounded-full p-2 w-38">

        <button
          onClick={() => setMode("auto")}
          className={`flex-1 rounded-full transition-all duration-300 font-semibold
          ${autoDetect ? "bg-green-500 text-white" : "bg-white text-black"}`}
        >
          On
        </button>

        <button
          onClick={() => setMode("start")}
          className={`flex-1 rounded-full transition-all duration-300 font-semibold
          ${!autoDetect ? "bg-green-500 text-white" : "bg-white text-black"}`}
        >
          Off
        </button>

      </div>
    </div>
  );
}