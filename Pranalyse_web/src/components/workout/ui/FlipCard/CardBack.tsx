"use client";

import React from "react";
import { Pose } from "../SelectPose";

interface CardBackProps {
  pose: Pose;
}

const CardBack: React.FC<CardBackProps> = ({ pose }) => {
  return (
    <div
      className="w-[420px] h-[540px] rounded-2xl shadow-2xl border-6 border-[#8b75eb] overflow-hidden flex flex-col bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white"
      style={{
        backgroundImage: "url('/global/black-scales-bg.png')",
      }}
    >
      {/* Scrollable content */}
      <div className="p-6 flex-1 overflow-y-auto space-y-5">
        
        {/* Pose Name */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#FFFFFF]">{pose["eng-name"] || pose["title"]}</h2>
          <h3 className="text-xl font-bold text-indigo-200 mt-1">
            {
              pose["hindi-name"] && <>({pose["hindi-name"]})</>
            }
          </h3>
        </div>

        {/* Description */}
        <div>
          <h4 className="font-semibold text-[#FFFFFF] mb-1">Description:</h4>
          <p className="text-gray-200 text-sm leading-relaxed">{pose.description}</p>
        </div>

        {/* Symbolism & Energetics */}
        {pose.symbolismAndEnergetics && (
          <div>
            <h4 className="font-semibold text-[#FFFFFF] mb-1">Symbolism & Energetics:</h4>
            <p className="text-gray-200 text-sm leading-relaxed">{pose.symbolismAndEnergetics}</p>
          </div>
        )}

        {/* Category & Difficulty */}
        <div className="flex flex-wrap gap-32">
          <div>
            <h4 className="font-semibold text-[#FFFFFF] mb-1">Category:</h4>
            <p className="text-gray-200 capitalize text-sm">{pose.category}</p>
          </div>
          <div>
            <h4 className="font-semibold text-[#FFFFFF] mb-1">Difficulty:</h4>
            <p className="text-gray-200 capitalize text-sm">{pose.difficulty}</p>
          </div>
        </div>

        {/* Instructions */}
        {pose.instructions && (
          <div>
            <h4 className="font-semibold text-[#FFFFFF] mb-1">Instructions:</h4>
            <p className="text-gray-200 text-sm whitespace-pre-line leading-relaxed">{pose.instructions}</p>
          </div>
        )}

        {/* Muscles */}
        {pose.muscles && pose.muscles.length > 0 && (
          <div>
            <h4 className="font-semibold text-[#FFFFFF] mb-1">Muscles:</h4>
            <p className="text-gray-200 text-sm">{pose.muscles.join(", ")}</p>
          </div>
        )}

        {/* Chakra Focus */}
        {pose.chakraFocus && (
          <div>
            <h4 className="font-semibold text-[#FFFFFF] mb-1">Chakra Focus:</h4>
            <p className="text-gray-200 text-sm">{pose.chakraFocus}</p>
          </div>
        )}

        {/* Contraindications */}
        {pose.contraindications && (
          <div>
            <h4 className="font-semibold text-[#FFFFFF] mb-1">Contraindications:</h4>
            <p className="text-gray-200 text-sm">{pose.contraindications}</p>
          </div>
        )}

        {/* Benefits */}
        {pose.benefits && pose.benefits.length > 0 && (
          <div>
            <h4 className="font-semibold text-[#FFFFFF] mb-1">Benefits:</h4>
            <ul className="list-disc list-inside text-gray-200 text-sm space-y-1">
              {pose.benefits.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Precautions */}
        {pose.precautions && pose.precautions.length > 0 && (
          <div>
            <h4 className="font-semibold text-[#FFFFFF] mb-1">Precautions:</h4>
            <ul className="list-disc list-inside text-gray-200 text-sm space-y-1">
              {pose.precautions.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Tips */}
        {pose.tips && pose.tips.length > 0 && (
          <div>
            <h4 className="font-semibold text-[#FFFFFF] mb-1">Tips:</h4>
            <ul className="list-disc list-inside text-gray-200 text-sm space-y-1">
              {pose.tips.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
};

export default CardBack;