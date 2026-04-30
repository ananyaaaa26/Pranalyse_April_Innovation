"use client";

type FooterProps = {
  children: React.ReactNode;
};

export default function Footer({ children }: FooterProps) {
  return (
    // Footer remains fixed to the camera width (66%)
    <footer className="fixed bottom-0 left-0 w-[66%] flex flex-col items-center pb-10">
      <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 flex justify-center border border-white/20 shadow-xl">
        {children}
      </div>
    </footer>
  );
}