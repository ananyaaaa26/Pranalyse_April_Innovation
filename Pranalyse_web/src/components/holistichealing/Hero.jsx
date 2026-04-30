'use client'

import { useState } from 'react';
import { Wheel } from './Wheel';
import { SemiCircle } from './SemiCircle';
import { HolisticButton } from './HolisticButtton';
import { useEffect } from 'react';

export default function Hero() {
  // State variables for button logic
  const [mformFilled, setMFormFilled] = useState(true);
  const [planExist, setPlanExist] = useState(false);

  // Dynamically inject Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Itim&family=Hind+Vadodara:wght@500;700&family=Italianno&family=Instrument+Serif:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const headingText = "Your Personalized Health & Fitness Plan";

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center px-16 overflow-hidden font-sans animate-fadeIn">
      {/* Top Left Header */}
      <div className="absolute top-12 left-16 z-20">
        <h1
          className="text-5xl font-bold text-white mb-8 drop-shadow-lg"
          style={{ fontFamily: 'Itim, sans-serif' }}
        >
          {headingText.split("").map((char, index) => {
            if (char === " ") return " ";
            return (
              <span
                key={index}
                className="reveal-letter"
                style={{ "--delay": `${index * 0.05}s` }}
              >
                {char}
              </span>
            );
          })}
        </h1>

        <p
          className="text-xl text-black font-semibold ml-40 drop-shadow-md slide-up"
          style={{ fontFamily: 'Hind Vadodara, sans-serif', animationDelay: "1.5s" }}
        >
          Find your center. Heal your whole self.
        </p>
      </div>

      <div className="grid grid-cols-12 items-center w-full mt-18">
        <div className="col-span-4 relative h-[480px]">
          <img 
            src="/holistichealing/FreePerson.png" 
            alt="Person" 
            className="absolute left-10 bottom-0 h-full w-auto object-contain animate-softLuminosity" 
          />
        </div>

        <div className="col-span-4 flex flex-col items-center text-center space-y-12">
          <div className="relative">
            <h3 
              className="text-3xl font-bold text-black flow-with " 
              style={{ fontFamily: 'serif', animationDelay: "1s" }}
            >
              Made just for
            </h3>
            <div className='animate-softLuminosity'>
              <h2 
                className="text-[120px] font-bold italic leading-none mt-2 drop-shadow-sm text-[#B092F1] ease-text" 
                style={{ fontFamily: 'Italianno, serif', animationDelay: "1.8s" }}
              >
                You
              </h2>
            </div>
          </div>
          
          <div className="space-y-8 flex flex-col items-center">
            <p 
              className="text-2xl text-gray-900 font-medium max-w-[500px] leading-tight slide-up" 
              style={{ fontFamily: 'Instrument Serif, serif', animationDelay: "3.5s" }}
            >
              Get a holistic, science-backed plan for <br /> exercise, diet, and lifestyle <span className="font-bold">NOW</span>
            </p>

            {/* Use the new HolisticButton component */}
            <HolisticButton mformFilled={mformFilled} planExist={planExist} />
          </div>
        </div>

        <div className="col-span-4 flex justify-end -mt-88 pr-10 translate-x-12">
          <Wheel />
        </div>
      </div>

      <div className="absolute -bottom-20 -right-14">
        <SemiCircle />
      </div>
    </section>
  );
}