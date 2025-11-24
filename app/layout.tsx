import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spicy Bastard Co.",
  description: "Small-batch fermented hot sauce with attitude.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
