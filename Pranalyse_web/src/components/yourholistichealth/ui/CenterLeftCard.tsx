//not in use currently

import React from 'react';

const CenterLeftCard = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#C5BEEF] p-6">
      <div 
        className="relative w-full max-w-[400px] h-[600px] bg-[#1A1C31] rounded-[40px] overflow-hidden shadow-2xl"
        style={{
          // This creates the organic "dipping" curve on the top right
          clipPath: 'path("M 0 40 C 0 17.9 17.9 0 40 0 L 160 0 C 180 0 200 20 220 60 C 240 100 280 120 360 120 L 360 120 C 382.1 120 400 137.9 400 160 L 400 560 C 400 582.1 382.1 600 360 600 L 40 600 C 17.9 600 0 582.1 0 560 Z")'
        }}
      >
        <div className="p-10 pt-12">
          {/* Icon Placeholder - Adjust size as needed */}
          <div className="mb-8 w-24 h-24">
             <img 
               src="/path-to-your-lifestyle-icon.png" 
               alt="Lifestyle Icon" 
               className="w-full h-full object-contain"
             />
          </div>

          {/* Heading */}
          <h2 className="text-white text-6xl font-serif font-light tracking-tight">
            Lifestyle
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CenterLeftCard;