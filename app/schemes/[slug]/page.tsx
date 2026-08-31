import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SCHEMES } from "@/lib/subsidy-data";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";

export function generateStaticParams() {
  return SCHEMES.map((scheme) => ({ slug: scheme.slug }));
}

function getScheme(slug: string) {
  return SCHEMES.find((scheme) => scheme.slug === slug);
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const scheme = getScheme(params.slug);
  if (!scheme) return {};
  return {
    title: scheme.name,
    description: scheme.benefit,
    alternates: { canonical: `/schemes/${scheme.slug}` },
  };
}

const FIELDS: Array<{ key: keyof (typeof SCHEMES)[number]; label: string }> = [
  { key: "benefit", label: "Benefit" },
  { key: "ceiling", label: "Ceiling" },
  { key: "eligibility", label: "Eligibility" },
  { key: "route", label: "Route" },
];

export default function SchemePage({ params }: { params: { slug: string } }) {
  const scheme = getScheme(params.slug);
  if (!scheme) notFound();
  const isState = scheme.category === "state-policy";

  return (
    <div className={`${isState ? "bg-brand-50/60" : "bg-orange-50/50"}`}>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Reveal>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Schemes", href: "/schemes" },
              { label: scheme.name, href: `/schemes/${scheme.slug}` },
            ]}
          />
          <p className="mt-4 inline-block rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700 shadow-sm ring-1 ring-brand-100">
            {isState ? "Odisha state policy" : "Central scheme"}
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">{scheme.name}</h1>
          <p className="mt-2 text-ink/60">{scheme.body}</p>
        </Reveal>

        <dl className="mt-8 space-y-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          {FIELDS.map((field, i) => (
            <Reveal key={field.key} delay={i * 60}>
              <div>
                <dt className="font-display text-sm font-semibold text-ink">{field.label}</dt>
                <dd className="mt-1 text-ink/80">{scheme[field.key]}</dd>
              </div>
            </Reveal>
          ))}
        </dl>

        <Reveal delay={200}>
          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <p className="font-display text-sm font-semibold text-ink">Watch out for</p>
            <p className="mt-1 text-sm text-ink/80">{scheme.watchOutFor}</p>
          </div>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-10 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <p className="text-ink/80">
              See what this scheme could be worth for your specific project, checked against
              the negative list and district classification.
            </p>
            <Link
              href="/eligibility-checker"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-md"
            >
              Check eligibility <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
