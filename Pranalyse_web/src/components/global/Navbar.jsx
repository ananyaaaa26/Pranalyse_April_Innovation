"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const {data:session}= useSession();

  return (
    <nav className="fixed top-0 left-0 z-[9999] w-full backdrop-blur-md bg-white/40 border-b border-white/20">
      <div className="flex items-center justify-between w-full px-10 py-3">

        {/* Logo - clickable */}
        <Link href="/">
          <Image
            src="/global/navbarlogo.png"
            alt="Logo"
            width={140}
            height={45}
            className="object-contain cursor-pointer"
          />
        </Link>

        {/* Navigation - pushed right */}
        <div className="flex items-center gap-8 text-black font-semibold">
          <Link href="/aboutus" className="hover:font-bold hover:text-[#4B3A70] transition">
            About Us
          </Link>
          <Link href="/features" className="hover:font-bold hover:text-[#4B3A70] transition">
            Features
          </Link>
          <Link href="/explore" className="hover:font-bold hover:text-[#4B3A70] transition">
            Explore
          </Link>
          {
            session?.user?.email && 
            <>
              <Link href="/yoga" className="hover:font-bold hover:text-[#4B3A70] transition">
                Yoga
              </Link>
              <Link href="/physiotherapy" className="hover:font-bold hover:text-[#4B3A70] transition">
                Physiotherapy
              </Link>
              <Link href="/diet" className="hover:font-bold hover:text-[#4B3A70] transition">
                Diet
              </Link>
            </>
          }
          <Link href="/comingsoon" className="hover:font-bold hover:text-[#4B3A70] transition">
            Pricing
          </Link>
          <Link href="/contact" className="hover:font-bold hover:text-[#4B3A70] transition">
            Contact
          </Link>

          {session?.user?.email ? (
            <>
              <Link href="/holistichealing" className="hover:font-bold transition">
                Holistic Healing
              </Link>
              <Link href="/profile" className="hover:font-bold transition">
                Profile
              </Link>
            </>
          ) : (
<Link
  href="/auth/login"
  className="px-6 py-2 text-white font-semibold rounded-lg 
             bg-[radial-gradient(circle_at_center,_#7C5AEB_0%,_#2C2881_100%)]
             hover:opacity-90 transition"
>
  Login
</Link>
          )}
        </div>
      </div>
    </nav>
  );
}