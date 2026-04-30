// components/CenterCard.tsx
import Image from 'next/image';

const CenterCard = () => {
  return (
    <div
      className="w-[650px] h-[400px] rounded-xl shadow-lg 
                 bg-gradient-to-b from-[#683FD2] to-[#CFBDFF] 
                 flex flex-col items-center p-6 gap-8.5"
    >
      {/* Logo */}
      <Image 
        src="/holistichealth/WhiteLogo.png" 
        alt="Logo" 
        width={200} 
        height={200} 
        className="object-contain"
      />

      {/* Text with Hubballi font, bold */}
<h2
  className="text-white text-6xl text-center font-bold"
  style={{ fontFamily: "'Hubballi', cursive" }}
>
  {"Your Holistic Health".split("").map((char, i) => (
    <span
      key={i}
      className="reveal-letter"
      style={{ "--delay": `${i * 0.1}s` } as React.CSSProperties}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ))}
</h2>
    </div>
  );
};

export default CenterCard;