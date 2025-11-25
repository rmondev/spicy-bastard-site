"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-2 pr-6 py-1">

        {/* LEFT: Logo */}
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <div className="flex flex-row items-center">
            <div className="mt-4">
              <Image
                src="/logo.png"
                alt="Spicy Bastard Co."
                width={70}
                height={50}
                className="h-auto"
              />
            </div>
          </div>
        </Link>

        {/* CENTER: Brand Icon */}
        <Link href="/" onClick={() => setOpen(false)}>
          <Image
            src="/brand.png"
            alt="Spicy Bastard Co."
            width={70}
            height={50}
            className="h-auto"
          />
        </Link>

        {/* RIGHT: DESKTOP LINKS */}
        <div className="hidden md:flex gap-6 text-lg">
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          <NavLink href="/feedback">Feedback</NavLink>
        </div>

        {/* MOBILE HAMBURGER */}
        <button
            className="md:hidden p-2 border rounded relative w-9 h-9 flex items-center justify-center"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            >
            {/* Top bar */}
            <span
                className={`
                block absolute h-0.5 w-5 bg-black transition-all duration-200
                ${open ? "rotate-45 translate-y-0" : "-translate-y-1.5 "}
                    `}
                />

                {/* Middle bar */}
                <span
                    className={`
                    block absolute h-0.5 w-5 bg-black transition-all duration-200
                    ${open ? "opacity-0" : "opacity-100"}
                    `}
                />

                {/* Bottom bar */}
                <span
                    className={`
                    block absolute h-0.5 w-5 bg-black transition-all duration-200
                    ${open ? "-rotate-45 translate-y-0" : "translate-y-1.5"}
                    `}
                />
        </button>


      </div>

      {/* MOBILE MENU */}
        <div
            className={`
                md:hidden border-t bg-white overflow-hidden transition-all duration-200
                ${open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
            `}
            >
            <div className="flex flex-col text-center gap-4 px-4 py-4 text-lg">
                <NavLink href="/about" onClick={() => setOpen(false)}>About</NavLink>
                <NavLink href="/contact" onClick={() => setOpen(false)}>Contact</NavLink>
                <NavLink href="/feedback" onClick={() => setOpen(false)}>Feedback</NavLink>
            </div>
            </div>

        </nav>
    );
}

function NavLink({
  href,
  children,
  onClick,
  active,
  isOpen,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  isOpen?: boolean;
}) {
  const base = "transition-colors";

  // MOBILE (only when menu is open)
  if (isOpen) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={`${base} ${
          active ? "text-bastard-red font-semibold" : "hover:text-bastard-orange"
        }`}
      >
        {children}
      </Link>
    );
  }

  // DESKTOP
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${base} ${
        active ? "text-bastard-orange font-semibold" : "hover:text-bastard-orange"
      }`}
    >
      {children}
    </Link>
  );
}


