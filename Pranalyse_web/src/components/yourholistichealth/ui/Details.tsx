import React from 'react';

const Details = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1a2e] border border-gray-700 w-full max-w-lg rounded-3xl p-8 text-white relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl">×</button>
        <h2 className="text-3xl mb-4 font-serif">Lifestyle Details</h2>
        <p className="text-gray-300">Detailed analytics and health insights would go here...</p>
      </div>
    </div>
  );
};

export default Details;