import React from 'react'

// Added {children} to the props destructuring
function DietSection({ title, children }) {
  return (
    <div className="overflow-visible ">
        <div className="flex justify-between items-center">
            <h2 className="px-6 font-semibold text-white text-2xl drop-shadow-xl mt-8">
                Day {title}
            </h2>
        </div>

        <div className="overflow-visible mt-4 mb-6">
            {children} {/* This will now correctly render DietCardList */}
        </div>
    </div>
  )
}

export default DietSection;