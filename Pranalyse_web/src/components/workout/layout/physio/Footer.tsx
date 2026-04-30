"use client";

import EndButton from "../../ui/EndButton";

type FooterProps = {
  children: React.ReactNode;
};

export default function Footer({ children }: FooterProps) {
  return (
    <footer className="fixed bottom-0 left-6 w-[66%] flex flex-col items-start space-y-0">
      
      {/* Translucent rectangle for controls */}
      <div
        className="w-full bg-white/40 backdrop-blur-sm rounded-t-xl p-4 flex justify-center"
        style={{ borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
      >
        {children}
      </div>

      {/* Optional EndButton below */}
      <EndButton />
    </footer>
  );
}