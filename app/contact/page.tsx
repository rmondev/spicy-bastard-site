'use client'
import { useState } from 'react';
import emailjs from '@emailjs/browser';


export default function ContactPage() {

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    setSending(true);
    try {
      const templateParams = { subject, message };

      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_CONTACT_US_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_P_KEY! // keep consistent
      );

      console.log("EmailJS response:", response);

      if (response.status === 200) {
        console.log("Message Sent!");
        setSent(true);
        setSubject("");
        setMessage("");

        setTimeout(() => {
          setSent(false)
        }, 5000);
        
      } else {
        throw new Error("EmailJS did not return OK");
      }
    } catch (err) {
      console.error("EmailJS error:", err);
      alert("Something went wrong sending your message.");
    } finally {
      setSending(false);
    }
  }


  return (
  <main className="min-h-screen px-4 py-16 flex justify-center">
    <div className="w-full max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
        Contact
      </h1>

      <p className="text-center text-sm text-zinc-600 mb-8">
        Got questions, ideas, or collab requests? Hit me up.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Contact info card */}
        <section className="bg-white/80 border border-zinc-200 rounded-2xl p-6 shadow-sm text-sm md:text-base">
          <h2 className="text-lg font-semibold mb-3">Reach out</h2>
          <p className="text-zinc-700 mb-4">
            Best way to reach me is by email. I try to respond as soon as I can.
          </p>

          <div className="space-y-2">
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-zinc-500">
                Email
              </p>
              <a
                href="mailto:spicybastardco@gmail.com"
                className="text-bastard-orange font-semibold hover:underline break-all"
              >
                spicybastardco@gmail.com
              </a>
            </div>

             {/* TODO: Add socials */}

              {/* <div className="mt-4">
                <p className="text-xs uppercase tracking-[0.15em] text-zinc-500">
                  Instagram
                </p>
                <span className="text-zinc-800 font-semibold">
                  @spicybastardco
                </span>
              </div> */}

          </div>
        </section>

        {/* Message form */}
        <section className="bg-white/80 border border-zinc-200 rounded-2xl p-6 shadow-sm text-sm md:text-base">
          <h2 className="text-lg font-semibold mb-3">Quick message</h2>
          <p className="text-zinc-700 mb-4">
            Prefer writing something out? Drop a message here.
          </p>

          <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-medium text-zinc-600 mb-1">
                Subject
              </label>
              <input
                type="text"
                className="w-full border border-zinc-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-bastard-orange"
                placeholder="What’s this about?"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-600 mb-1">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full border border-zinc-300 rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-bastard-orange"
                placeholder="Tell me what’s on your mind…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={sending || !subject.trim() || !message.trim()}
              className="inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-semibold bg-bastard-orange text-black hover:bg-bastard-red transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? "Sending..." : "Send"}
            </button>
            {sent && <p className="text-sm text-green-600">Message sent ✅</p>}
          </form>
        </section>
      </div>
    </div>
  </main>
  );
}
