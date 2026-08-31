import Link from "next/link";
import type { Metadata } from "next";
import { SCHEMES } from "@/lib/subsidy-data";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Schemes",
  description:
    "Odisha state policies and central schemes for MSMEs — quantum, eligibility and application route.",
};

export default function SchemesIndexPage() {
  const statePolicies = SCHEMES.filter((s) => s.category === "state-policy");
  const centralSchemes = SCHEMES.filter((s) => s.category === "central-scheme");

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Reveal>
        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">Schemes</h1>
        <p className="mt-3 max-w-2xl text-ink/70">
          Odisha&apos;s incentive framework is three overlapping state policies plus a handful
          of central schemes, each with its own quantum, cap and eligibility condition.
          Choosing the right one per incentive head is most of the advisory value in a DPR.
        </p>
      </Reveal>

      <Reveal>
        <h2 className="mt-14 font-display text-xl font-bold text-ink">Odisha state policies</h2>
      </Reveal>
      <SchemeGrid schemes={statePolicies} accent="bg-brand-50 ring-brand-100" />

      <Reveal>
        <h2 className="mt-14 font-display text-xl font-bold text-ink">Central schemes</h2>
      </Reveal>
      <SchemeGrid schemes={centralSchemes} accent="bg-orange-50 ring-orange-100" />
    </div>
  );
}

function SchemeGrid({ schemes, accent }: { schemes: typeof SCHEMES; accent: string }) {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      {schemes.map((scheme, i) => (
        <Reveal key={scheme.slug} delay={i * 60}>
          <Link
            href={`/schemes/${scheme.slug}`}
            className={`group block h-full rounded-2xl ${accent} p-6 ring-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
          >
            <h3 className="font-display font-semibold text-ink">{scheme.name}</h3>
            <p className="mt-1 text-xs text-ink/50">{scheme.body}</p>
            <p className="mt-3 text-sm text-ink/70 line-clamp-3">{scheme.benefit}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 transition-all group-hover:gap-2">
              Read more <span aria-hidden="true">→</span>
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
