import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Business Registration in Odisha — LLP, Pvt Ltd, Partnership, Udyam",
  description:
    "How LLP, Private Limited, Partnership and Udyam/MSME registration actually work in Odisha in 2026 — process, typical timelines, and the recent Udyam threshold change.",
  alternates: { canonical: "/business-registration" },
};

const STRUCTURES = [
  {
    name: "LLP (via FiLLiP)",
    detail:
      "MCA V3's FiLLiP form bundles DIN allotment, name reservation and incorporation into one filing, with PAN and TAN issued automatically alongside the Certificate of Incorporation. Government fee is slab-based on capital contribution (roughly ₹500 up to ₹5,000 across slabs), plus DSC and stamp duty on the LLP Agreement. Typical timeline: 10–15 working days with clean documents.",
    goodFor: "Two or more partners who want liability protection without company-level compliance.",
  },
  {
    name: "Private Limited (via SPICe+)",
    detail:
      "SPICe+ is the only incorporation route on MCA V3 — Part A reserves the name (valid 20 days), Part B does the incorporation, and linked forms bundle DIN, PAN, TAN, GSTIN, EPFO, ESIC registration and bank account opening into one filing. Typical Certificate of Incorporation timeline: 7–10 working days.",
    goodFor: "Ventures planning to raise external capital or bring in investors later.",
  },
  {
    name: "Partnership firm",
    detail:
      "Registered with the Registrar of Firms (RoF), Odisha, under the Revenue & Disaster Management Department, via Form 1 under the Odisha Partnership (Registration of Firms) Rules, 1989. Minimum two partners. Timelines genuinely vary by district registrar — sources we checked ranged from 7 to 20 working days, and we found no single official SLA, so treat that as a range rather than a promise.",
    goodFor: "The simplest, lowest-cost structure — no liability protection, so weigh that against the savings.",
  },
];

export default function BusinessRegistrationPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Reveal>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Business Registration", href: "/business-registration" }]} />
        <p className="mt-4 inline-block rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700 shadow-sm ring-1 ring-brand-100">
          Getting started
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
          Business registration in Odisha
        </h1>
        <p className="mt-4 text-ink/70">
          Before a DPR, a DIC filing or a subsidy claim can happen, the entity has to exist.
          Here&apos;s how the four routes actually compare in 2026 — LLP, Private Limited,
          Partnership, and the free Udyam/MSME registration every one of them eventually needs.
        </p>
      </Reveal>

      <div className="mt-10 space-y-6">
        {STRUCTURES.map((s, i) => (
          <Reveal key={s.name} delay={i * 80}>
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h2 className="font-display text-lg font-semibold text-ink">{s.name}</h2>
              <p className="mt-2 text-ink/80">{s.detail}</p>
              <p className="mt-3 text-sm font-medium text-brand-700">Good for: {s.goodFor}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={300}>
        <section className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <h2 className="font-display text-lg font-bold text-ink">
            Udyam registration — the 2025 threshold change most pages haven&apos;t caught up on
          </h2>
          <p className="mt-3 text-ink/80">
            Udyam registration (udyamregistration.gov.in) is free, lifetime-valid, and fully
            online — it&apos;s what makes a business officially an MSME for subsidy and
            priority-sector-lending purposes. What&apos;s changed: effective 1 April 2025, the
            classification thresholds went up substantially — Micro now means investment up to
            ₹2.5 crore <em>and</em> turnover up to ₹10 crore (both conditions apply); Small goes
            up to ₹25 crore / ₹100 crore; Medium up to ₹125 crore / ₹500 crore. That&apos;s
            roughly 2.5× the old investment limit and 2× the old turnover limit. Classification
            re-checks automatically each financial year against your ITR and GST data, and can
            move you up or down a tier.
          </p>
          <p className="mt-3 text-sm text-ink/60">
            A lot of older articles and competitor pages still quote the pre-April-2025
            thresholds — worth double-checking any figure you read elsewhere against this date.
          </p>
        </section>
      </Reveal>

      <Reveal delay={360}>
        <div className="mt-12 rounded-2xl bg-brand-50 p-6 ring-1 ring-brand-100">
          <p className="text-ink/80">
            Not sure which structure fits your project? Tell us what you&apos;re building and
            we&apos;ll tell you plainly which one we&apos;d register, and why.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-md"
            >
              Ask us <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50"
            >
              See registration pricing
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
