"use client";

import { useState } from "react";

const SERVICES = [
  "DPR preparation",
  "DIC approval / GO SWIFT filing",
  "MSME subsidy claim",
  "Project finance / bank loan",
  "Business incorporation",
  "Compliance retainer",
  "Something else",
];

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceInterest, setServiceInterest] = useState(SERVICES[0]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, serviceInterest, message }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Request failed (${res.status})`);
      }
      setStatus("sent");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? `${err.message}. If you're running this locally, the Python API needs "vercel dev", not "next dev" — see README.`
          : "Something went wrong."
      );
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-black/5">
        <p className="text-2xl">✓</p>
        <p className="mt-2 font-display text-lg font-semibold text-ink">Message sent</p>
        <p className="mt-1 text-sm text-ink/70">
          Thanks — we&apos;ll get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-ink">Name</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-ink">Phone (optional)</span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink">What do you need?</span>
          <select
            value={serviceInterest}
            onChange={(e) => setServiceInterest(e.target.value)}
            className={inputClass}
          >
            {SERVICES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="block">
        <span className="text-sm font-medium text-ink">Message</span>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your project — sector, rough investment size, and district, if you have them."
          className={inputClass}
        />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-brand-600 px-6 py-3 text-base font-semibold text-white shadow-md shadow-brand-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-lg disabled:translate-y-0 disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {error && <p className="text-sm text-red-700">{error}</p>}
    </form>
  );
}

const inputClass =
  "mt-1 w-full rounded-md border border-brand-200 bg-white px-3 py-2 text-sm text-ink focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500";
