"use client";
import SaveButton from "./SaveButton";


export default function LeftSection({ sections, selectedIndex, onSelect, onSave, isSaving }) {
  return (
    <div className="w-1/3 h-full p-6 flex flex-col">
      <h2 className="text-lg font-semibold mb-4 flex-shrink-0">Sections</h2>
      <div className="h-[1px] bg-white/30 mb-4" />

      <ul className="space-y-2 overflow-y-auto flex-1 pb-6">
        {sections.map((sec, idx) => (
          <li
            key={idx}
            className={`cursor-pointer p-3 rounded-lg transition-all duration-200 ${
                selectedIndex === idx ? "bg-indigo-100 font-semibold text-indigo-800 shadow-sm" : "hover:bg-gray-100"
            }`}
            onClick={() => onSelect(idx)}
          >
            {idx + 1}. {sec.title}{" "}
            {sec.required && <span className="text-red-500">*</span>}
          </li>
        ))}
      </ul>

      {/* Attach save trigger here */}
      <div className="mt-auto w-full mb-[-24px]">
        <SaveButton 
          className="w-full" 
          onClick={onSave} 
          disabled={isSaving}
        />
      </div>
    </div>
  );
}