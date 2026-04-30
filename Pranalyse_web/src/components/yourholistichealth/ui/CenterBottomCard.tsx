import React from 'react';

const CenterBottomCard = () => {
  return (
    <div className="relative bg-[#1a1a2e] rounded-[40px] p-8 pt-32 mt-[-60px] flex flex-col items-start min-h-[400px] w-full">
      {/* This mimics the cutout shape around the wheel */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-[#b8b8ff] rounded-b-full z-0 opacity-10"></div>
      
      <div className="relative z-10">
        <div className="mb-4">
           {/* Icon placeholder */}
           <div className="text-4xl mb-2">🧘‍♂️</div>
           <h2 className="text-3xl font-serif text-white">Lifestyle</h2>
        </div>
      </div>
    </div>
  );
};

export default CenterBottomCard;