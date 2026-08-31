import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { CONTACT } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Reach Odisha Biz Hub for DPR preparation, DIC approval, MSME subsidy, project finance and business incorporation queries.",
};

const METHODS = [
  {
    label: "Email",
    value: CONTACT.email,
    href: CONTACT.email ? `mailto:${CONTACT.email}` : undefined,
    icon: "✉️",
    hint: "Best for detailed queries with documents attached.",
  },
  {
    label: "Phone",
    value: CONTACT.phone,
    href: CONTACT.phone ? `tel:${CONTACT.phone}` : undefined,
    icon: "📞",
    hint: "Weekdays, 10am–6pm IST.",
  },
  {
    label: "WhatsApp",
    value: CONTACT.whatsapp,
    href: CONTACT.whatsapp ? `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}` : undefined,
    icon: "💬",
    hint: "Fastest for a quick question.",
  },
];

export default function ContactPage() {
  return (
    <div className="bg-gradient-to-b from-brand-50/60 to-paper">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <Reveal>
          <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">Get in touch</h1>
          <p className="mt-3 max-w-2xl text-ink/70">
            Tell us about your project and which of these you need — a DPR, DIC approval, an
            MSME subsidy claim, project finance, or business incorporation — and we&apos;ll get
            back to you.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <Reveal delay={80}>
            <div className="space-y-4">
              {METHODS.map((m) => (
                <div key={m.label} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-lg">
                      {m.icon}
                    </span>
                    <div>
                      <p className="font-display text-sm font-semibold text-ink">{m.label}</p>
                      {m.value && m.href ? (
                        <a href={m.href} className="text-sm text-brand-700 underline">
                          {m.value}
                        </a>
                      ) : m.value ? (
                        <p className="text-sm text-ink/70">{m.value}</p>
                      ) : (
                        <p className="text-sm text-ink/40">Publishing shortly</p>
                      )}
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-ink/50">{m.hint}</p>
                </div>
              ))}
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
                Registered office address and LLPIN will appear here once incorporation is
                complete — see the{" "}
                <a href="/about" className="underline">About page</a>.
              </div>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
