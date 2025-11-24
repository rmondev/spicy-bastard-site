"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-1">
        <Link href="/" className="flex items-center gap-2">
        <div className="flex flex-row items-center justify-between">
         
        
          <div className="mt-2">
          <Image
            src="/logo.png"
            alt="Spicy Bastard Co."
            width={70}
            height={50}
            className="h-auto"
          />
          </div>

           <Image
            src="/brand.png"
            alt="Spicy Bastard Co."
            width={70}
            height={50}
            className="h-auto"
          />
          </div>
          
          
        </Link>

        <div className="flex gap-6 text-lg">
          <Link href="/about" className="hover:text-bastard-orange">
            About
          </Link>
          <Link href="/contact" className="hover:text-bastard-orange">
            Contact
          </Link>
          <Link href="/feedback" className="hover:text-bastard-orange">
            Feedback
          </Link>
        </div>
      </div>
    </nav>
  );
}
