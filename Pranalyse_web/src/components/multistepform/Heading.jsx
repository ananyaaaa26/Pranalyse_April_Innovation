"use client";

import { useState } from "react";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import multiform from "../../data/multiform.json";
import { useSession } from "next-auth/react";

export default function Heading() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const {data: session}= useSession()
  
  // 🚀 LIFTED STATE
  const [answers, setAnswers] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    const body= JSON.stringify({userEmail: session?.user?.email, ...answers})// Now sending camelCase keys!
    console.log(body);
    try {
      const response = await fetch(`http://localhost:3010/users/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: body
      });

      const data = await response.json();

      if (response.ok) {
        alert("Profile updated and plans generated successfully!");
        console.log(data);
      } else {
        alert(`Error: ${data.message || "Failed to update"}`);
      }
    } catch (error) {
      console.error("Save Error:", error);
      alert("Failed to reach server.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="bg-white/30 backdrop-blur-xl rounded-4xl shadow-lg mx-auto p-8"
      style={{ width: "1000px", height: "600px" }}
    >
      <h1 className="text-3xl font-bold mb-4 text-center">
        Help Us Understand Your Health Better
      </h1>
      <p className="text-gray-800 mb-6 text-center text-md">
        Please fill in as many details as you can so we can better understand your health...
      </p>

      <div className="flex h-[calc(100%-96px)] gap-8 mt-[-14px]">
        {/* LeftSection with Save handler */}
        <LeftSection
          sections={multiform}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
          onSave={handleSave}
          isSaving={isSaving}
          className="w-1/3 h-full"
        />

        {/* RightSection with controlled state */}
        <RightSection
          questions={multiform[selectedIndex].questions}
          answers={answers}
          setAnswers={setAnswers}
          className="w-2/3 h-full"
        />
      </div>
    </div>
  );
}