"use client";
import CustomDropdown from "./CustomDropdown";

interface Question {
  ques: string;
  key?: string; // 🚀 Added key
  answertype: string;
  options?: string[];
}

interface RightSectionProps {
  questions: Question[];
  answers: Record<string, any>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  className?: string;
}

export default function RightSection({ questions, answers, setAnswers, className }: RightSectionProps) {
  
  const handleChange = (key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className={`w-2/3 p-6 h-full overflow-y-auto ${className || ""}`}>
      <h2 className="text-lg font-semibold mb-4">Details</h2>
      <div className="space-y-6">
        {questions.map((q, idx) => {
          const fieldKey = q.key || q.ques; // Fallback to question if no key mapped
          
          return (
            <div key={idx} className="flex flex-col">
              <label className="font-medium mb-1">{q.ques}</label>
              {q.answertype === "dropdown" && q.options ? (
                <CustomDropdown
                  options={q.options}
                  value={answers[fieldKey] || ""}
                  onChange={(val) => handleChange(fieldKey, val)}
                />
              ) : (
                <input
                  type="text"
                  value={answers[fieldKey] || ""}
                  onChange={(e) => handleChange(fieldKey, e.target.value)}
                  placeholder={`Enter ${q.ques}`}
                  className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}