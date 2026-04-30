"use client";
import { useState } from "react";

interface CustomDropdownProps {
  options: string[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function CustomDropdown({
  options,
  value,
  onChange,
  placeholder = "Select",
}: CustomDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      {/* Trigger */}
      <div
        onClick={() => setOpen(!open)}
        className="border border-gray-300 rounded p-2 cursor-pointer bg-white flex justify-between items-center"
      >
        <span className={value ? "text-gray-800" : "text-gray-400"}>
          {value || placeholder}
        </span>
        <span className="text-sm"> ▼ </span>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-0 w-full rounded-b-lg shadow-lg bg-gradient-to-br from-[#7C5AEB] to-[#2C2881] text-white z-10 overflow-hidden">
          {options.map((opt, i) => (
            <div
              key={i}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className="px-3 py-2 cursor-pointer hover:bg-white/50 transition"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}