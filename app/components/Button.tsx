import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline";
}

export default function Button({ href, children, variant = "primary" }: ButtonProps) {
  const base =
    "px-6 py-2 rounded-full font-semibold transition-all duration-200 text-center";

  const styles =
    variant === "primary"
      ? "bg-bastard-orange text-white hover:bg-bastard-red"
    : "border-2 border-bastard-orange text-bastard-orange hover:border-bastard-red hover:text-bastard-red py-[6px]";

  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}
