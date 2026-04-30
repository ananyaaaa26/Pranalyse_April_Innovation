import Image from "next/image";

export default function Header() {
  return (
    <>
    <div className="absolute top-22 ">
              <Image src="/contact/messages.png" alt="P2" width={1600} height={1600} />
            </div>
    <div className="flex flex-col items-center justify-center text-center py-10">
      
      {/* Top Image */}
      <Image
        src="/contact/contactus.png"
        alt="Message Banner"
        width={300}
        height={200}
        className="mb-4 animate-fadeIn"
      />

      {/* Text Below */}
      <h2 className="text-2xl font-semibold">
        {"Message us.....we’re listening!!!".split("").map((char, index) => (
          <span
            key={index}
            className="reveal-letter"
            style={{ "--delay": `${1 + index * 0.1}s` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h2>

    </div>
    </>
  );
}