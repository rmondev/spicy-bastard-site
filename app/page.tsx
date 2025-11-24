import Image from "next/image";
import Button from "@/app/components/Button";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <Image
        src="/brand_logo.png"
        alt="Spicy Bastard Co."
        width={400}
        height={400}
        className="
          w-3/4
          sm:w-3/4
          md:w-1/2
          lg:w-1/2
          xl:w-2/5
          h-auto
          mx-auto
        "
        priority
/>
      <p className="mt-3 xl:text-2xl lg:text-2xl md:text-xl sm:text-lg text-lg font-bold text-black text-center max-w-xl">
        Small-batch fermented hot sauce with attitude.
      </p>

      {/* BUTTON GROUP */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Button href="/feedback" variant="primary">
          Leave Feedback
        </Button>

        <Button href="/about" variant="outline">
          About
        </Button>

        <Button href="/contact" variant="outline">
          Contact
        </Button>
      </div>
    </main>
  );
}
