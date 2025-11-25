// app/about/page.tsx

export default function AboutPage() {
  return (
    <main className="min-h-screen px-4 py-16 flex justify-center">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          About Spicy Bastard Co.
        </h1>

        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 text-center mb-8">
          Flavour first. Heat second.
        </p>

        <div className="bg-white/80 border border-zinc-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-4 text-sm md:text-base leading-relaxed text-zinc-800">
          <p>
            Spicy Bastard Co. wasn’t born from a trend — it came from a chef
            with twenty years on the line, chasing flavour long before chasing
            heat.
          </p>

          <p>
            I’ve spent years playing with fermentation and pickling, experimenting
            with how time, salt, and living cultures can transform simple
            ingredients into something deeper. But everything changed the year I
            decided to grow my first chocolate habanero plants.
          </p>

          <p>
            The moment I smelled them — earthy, fruity, hot in a way that wasn’t
            aggressive but inviting — I knew I had to turn them into a sauce.
            Not a gimmick. Not a burn-your-face-off dare. Something honest.
            Something crafted. Something where <strong>flavour comes first, heat
            comes second</strong>, every single time.
          </p>

          <p>
            That’s the philosophy behind Spicy Bastard Co. Every sauce starts
            with ingredients that matter and techniques I’ve honed over years in
            kitchens: balanced acidity, clean fermentation, layered aromatics,
            and natural heat that supports the flavour instead of drowning it.
          </p>

          <p>
            <em>Tropical Menace</em> was the first creation born from that
            approach — a bright, fermented habanero sauce with mango, lime, and
            smoke, built to hit every corner of your tongue without overpowering
            the meal.
          </p>

          <p>
            I’m not here to make the hottest sauce on the shelf. I’m here to make
            the <strong>most delicious</strong> one.
          </p>

          <p>
            Crafted with skill. Fermented with patience. Built with flavour.
            Where the heat follows the flavour — not the other way around.
          </p>
        </div>
      </div>
    </main>
  );
}
