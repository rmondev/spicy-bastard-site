// app/components/FeedbackCarousel.tsx
"use client";

import { useState } from "react";
import Image from 'next/image';
import emailjs from '@emailjs/browser';

type SauceChoice = "tropical-menace" | "none" | "";

interface FormState {
  sauce: SauceChoice;

  // Tropical Menace path
  experience: string;
  heatLevel: string;
  flavorRating: number;
  texture: string;
  smokiness: string;
  tangy: number;
  sweet: number;
  bitter: number;
  salty: number;
  savoury: number;
  overallThoughts: string;
  changeOneThing: string;
  purchaseIntent: string;

  // No sauce yet path
  curiosity: string;
  futureLikelihood: string;
  usualSauces: string;
}

export default function FeedbackCarousel() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>({
    sauce: "",
    experience: "",
    heatLevel: "",
    flavorRating: 5,
    texture: "",
    smokiness: "",
    tangy: 5,
    sweet: 5,
    bitter: 0,
    salty: 5,
    savoury: 5,
    overallThoughts: "",
    changeOneThing: "",
    purchaseIntent: "",
    curiosity: "",
    futureLikelihood: "",
    usualSauces: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  

  const isTropical = form.sauce === "tropical-menace";
  const isNone = form.sauce === "none";

  const totalSteps = isTropical ? 10 : isNone ? 4 : 1;




  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function canGoNext(): boolean {
    if (step === 0) return form.sauce !== "";

    if (isTropical) {
      switch (step) {
        case 1:
          return form.experience !== "";
        case 2:
          return form.heatLevel !== "";
        case 3:
          return true; // flavor slider always has value
        case 4:
          return form.texture !== "";
        case 5:
          return form.smokiness !== "";
        case 6:
          return true; // sliders
        case 7:
          return form.overallThoughts.trim().length > 0;
        case 8:
          return true; // optional
        case 9:
          return form.purchaseIntent !== "";
        default:
          return true;
      }
    }

    if (isNone) {
      switch (step) {
        case 1:
          return form.curiosity.trim().length > 0;
        case 2:
          return form.futureLikelihood !== "";
        case 3:
          return form.usualSauces.trim().length > 0;
        default:
          return true;
      }
    }

    return false;
  }

  function next() {
    if (!canGoNext()) return;
    setStep((s) => Math.min(s + 1, totalSteps - 1));
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit() {
    if (!canGoNext()) return;
    setSubmitting(true);

  try {
    const message = JSON.stringify(form, null, 2);

    

    const response = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_FEEDBACK_TEMPLATE_ID!,
      { message },
      process.env.NEXT_PUBLIC_EMAILJS_P_KEY!
    );

    console.log("EmailJS response:", message);

    if (response.status === 200) {
      setSubmitted(true);
    } else {
      throw new Error("EmailJS did not return OK");
    }
  } catch (err) {
    console.error("EmailJS error:", err);
    alert("Something went wrong sending your feedback.");
  } finally {
    setSubmitting(false);
  }
}

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-2 text-center">
          Thanks for the feedback. 🌶️
        </h2>
        <Image
          src="/logo.png"
          alt="Spicy Bastard Co."
          width={70}
          height={50}
          className="h-auto"
        />
        <p className="text-sm text-zinc-600 text-center">
          Your answers help fine-tune Tropical Menace and future sauces.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      {/* Top bar */}
      <div className="mb-4 flex justify-between text-xs text-zinc-500">
        <span>
          Step {step + 1} of {totalSteps}
        </span>
        <span>
          {isTropical
            ? "Tropical Menace feedback"
            : isNone
            ? "Pre-sauce feedback"
            : "Choose sauce"}
        </span>
      </div>

      {/* Content */}
      <div className="min-h-[220px]">
        <div key={step} className="sb-fade-in">
          {renderStep(step, form, { isTropical, isNone, update })}
        </div>
      </div>


      {/* Controls */}
      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className={`px-4 py-2 rounded-full text-sm border ${
            step === 0
              ? "border-zinc-200 text-zinc-300 cursor-not-allowed"
              : "border-zinc-300 text-zinc-600 hover:bg-zinc-50"
          }`}
        >
          Back
        </button>

        {step < totalSteps - 1 ? (
          <button
            type="button"
            onClick={next}
            disabled={!canGoNext()}
            className={`px-6 py-2 rounded-full text-sm font-semibold ${
              canGoNext()
                ? "bg-bastard-orange text-black hover:bg-bastard-red transition"
                : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canGoNext() || submitting}
            className={`px-6 py-2 rounded-full text-sm font-semibold ${
              canGoNext()
                ? "bg-bastard-orange text-black hover:bg-bastard-red transition"
                : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
            }`}
          >
            {submitting ? "Submitting..." : "Submit Feedback"}
          </button>
        )}
      </div>
    </div>
  );
}

function renderStep(
  step: number,
  form: FormState,
  helpers: {
    isTropical: boolean;
    isNone: boolean;
    update: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  }
) {
  const { isTropical, isNone, update } = helpers;

  // Step 0: sauce selection
  if (step === 0) {
    return (
      <div>
        <h2 className="text-lg font-semibold mb-3">
          Which sauce are you giving feedback on?
        </h2>
        <div className="space-y-3 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="sauce"
              value="tropical-menace"
              checked={form.sauce === "tropical-menace"}
              onChange={() => update("sauce", "tropical-menace")}
            />
            <span>Tropical Menace</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="sauce"
              value="none"
              checked={form.sauce === "none"}
              onChange={() => update("sauce", "none")}
            />
            <span>I haven&apos;t tried any sauce yet</span>
          </label>
        </div>
      </div>
    );
  }

  // Tropical Menace path
  if (isTropical) {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-lg font-semibold mb-3">
              How many times have you tried Tropical Menace?
            </h2>
            <div className="space-y-3 text-sm">
              {["Just once", "A few times", "I put it on everything"].map(
                (opt) => (
                  <label key={opt} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="experience"
                      value={opt}
                      checked={form.experience === opt}
                      onChange={() => update("experience", opt)}
                    />
                    <span>{opt}</span>
                  </label>
                )
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h2 className="text-lg font-semibold mb-3">
              How was the heat level for you?
            </h2>
            <div className="space-y-3 text-sm">
              {["Too mild", "Just right", "Too hot"].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="heatLevel"
                    value={opt}
                    checked={form.heatLevel === opt}
                    onChange={() => update("heatLevel", opt)}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h2 className="text-lg font-semibold mb-3">
              Overall flavor rating (0–10)
            </h2>
            <p className="text-xs text-zinc-500 mb-2">
              0 = terrible, 10 = outstanding
            </p>
            <SliderField
              value={form.flavorRating}
              onChange={(v) => update("flavorRating", v)}
            />
          </div>
        );

      case 4:
        return (
          <div>
            <h2 className="text-lg font-semibold mb-3">
              How did the texture feel?
            </h2>
            <div className="space-y-3 text-sm">
              {["Too smooth", "Just right", "Too chunky"].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="texture"
                    value={opt}
                    checked={form.texture === opt}
                    onChange={() => update("texture", opt)}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div>
            <h2 className="text-lg font-semibold mb-3">
              How was the smokiness?
            </h2>
            <div className="space-y-3 text-sm">
              {[
                "Needs more smoke",
                "Just right",
                "Too smoky",
                "What smoke?",
              ].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="smokiness"
                    value={opt}
                    checked={form.smokiness === opt}
                    onChange={() => update("smokiness", opt)}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Flavor balance (0–10 each)
            </h2>

            <LabeledSlider
              label="Tangy"
              description="0 = not tangy, 10 = extremely tangy"
              value={form.tangy}
              onChange={(v) => update("tangy", v)}
            />

            <div className="h-4" />

            <LabeledSlider
              label="Sweet"
              description="0 = not sweet, 10 = very sweet"
              value={form.sweet}
              onChange={(v) => update("sweet", v)}
            />

            <div className="h-4" />

            <LabeledSlider
              label="Bitter"
              description="0 = no bitterness, 10 = very bitter"
              value={form.bitter}
              onChange={(v) => update("bitter", v)}
            />

            <div className="h-4" />

            <LabeledSlider
              label="Salty"
              description="0 = no saltiness, 10 = very salty"
              value={form.salty}
              onChange={(v) => update("salty", v)}
            />

            <div className="h-4" />

            <LabeledSlider
              label="Savoury (umami)"
              description="0 = not savoury, 10 = very savoury"
              value={form.savoury}
              onChange={(v) => update("savoury", v)}
            />
          </div>
        );

      case 7:
        return (
          <div>
            <h2 className="text-lg font-semibold mb-3">
              What did you think of Tropical Menace overall?
            </h2>
            <textarea
              value={form.overallThoughts}
              onChange={(e) => update("overallThoughts", e.target.value)}
              rows={5}
              className="w-full border rounded-md px-3 py-2 text-sm"
              placeholder="Be as honest as you want – this helps the most."
            />
          </div>
        );

      case 8:
        return (
          <div>
            <h2 className="text-lg font-semibold mb-3">
              If you could change one thing about Tropical Menace, what would it
              be? (optional)
            </h2>
            <textarea
              value={form.changeOneThing}
              onChange={(e) => update("changeOneThing", e.target.value)}
              rows={4}
              className="w-full border rounded-md px-3 py-2 text-sm"
              placeholder="More heat? Less tang? Different texture? Something else?"
            />
          </div>
        );

      case 9:
        return (
          <div>
            <h2 className="text-lg font-semibold mb-3">
              Would you buy Tropical Menace if it were for sale?
            </h2>
            <div className="space-y-3 text-sm">
              {["Definitely", "Maybe", "Probably not"].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="purchaseIntent"
                    value={opt}
                    checked={form.purchaseIntent === opt}
                    onChange={() => update("purchaseIntent", opt)}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  }

  // Haven't tried any sauce yet path
  if (isNone) {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-lg font-semibold mb-3">
              What made you curious about Spicy Bastard Co.?
            </h2>
            <textarea
              value={form.curiosity}
              onChange={(e) => update("curiosity", e.target.value)}
              rows={4}
              className="w-full border rounded-md px-3 py-2 text-sm"
              placeholder="Tell me what caught your attention."
            />
          </div>
        );

      case 2:
        return (
          <div>
            <h2 className="text-lg font-semibold mb-3">
              How likely are you to try one of our sauces in the future?
            </h2>
            <div className="space-y-3 text-sm">
              {["Very likely", "Maybe", "Not sure"].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="futureLikelihood"
                    value={opt}
                    checked={form.futureLikelihood === opt}
                    onChange={() => update("futureLikelihood", opt)}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h2 className="text-lg font-semibold mb-3">
              What type of hot sauces do you normally enjoy?
            </h2>
            <textarea
              value={form.usualSauces}
              onChange={(e) => update("usualSauces", e.target.value)}
              rows={4}
              className="w-full border rounded-md px-3 py-2 text-sm"
              placeholder="Fruity, smoky, very hot, mild with flavor, garlic-forward, etc."
            />
          </div>
        );

      default:
        return null;
    }
  }

  return null;
}

function SliderField({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-4">
      <input
        aria-label="selector"
        type="range"
        min={0}
        max={10}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-bastard-orange"
      />
      <span className="text-sm font-semibold w-6 text-right">{value}</span>
    </div>
  );
}

function LabeledSlider({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-semibold">{label}</h3>
        <span className="text-xs text-zinc-500">{description}</span>
      </div>
      <SliderField value={value} onChange={onChange} />
    </div>
  );
}
