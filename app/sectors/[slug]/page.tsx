import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SECTORS } from "@/lib/subsidy-data";
import { SECTOR_TILE_COLOR } from "@/lib/sector-theme";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";

export function generateStaticParams() {
  return SECTORS.map((sector) => ({ slug: sector.slug }));
}

function getSector(slug: string) {
  return SECTORS.find((sector) => sector.slug === slug);
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const sector = getSector(params.slug);
  if (!sector) return {};
  return {
    title: `${sector.name} DPR & Subsidy Guide`,
    description: sector.deepDive?.intro ?? `${sector.applicableSubsidy} Project cost typically ${sector.projectCostBand}.`,
    alternates: { canonical: `/sectors/${sector.slug}` },
  };
}

export default function SectorPage({ params }: { params: { slug: string } }) {
  const sector = getSector(params.slug);
  if (!sector) notFound();
  const theme = SECTOR_TILE_COLOR[sector.slug];
  const deep = sector.deepDive;

  const faqJsonLd = deep
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: deep.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

  return (
    <div>
      {faqJsonLd && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <div className={`relative h-56 w-full overflow-hidden sm:h-72 ${theme.bgTint}`}>
        <Image
          src={theme.image}
          alt={sector.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-4xl px-4 pb-6 sm:px-6">
          <Breadcrumbs
            dark
            items={[
              { label: "Home", href: "/" },
              { label: "Sectors", href: "/sectors" },
              { label: sector.name, href: `/sectors/${sector.slug}` },
            ]}
          />
          <h1 className="mt-2 font-display text-3xl font-bold text-white drop-shadow-sm sm:text-4xl">
            {sector.name}
          </h1>
          <p className="mt-1 font-medium text-white/90">{sector.projectCostBand}</p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        {deep && (
          <Reveal>
            <p className="text-lg text-ink/80">{deep.intro}</p>
          </Reveal>
        )}

        <div className="mt-6 space-y-6">
          <Reveal>
            <section>
              <h2 className="font-display text-lg font-semibold text-ink">Applicable subsidy route</h2>
              <p className="mt-2 text-ink/80">{sector.applicableSubsidy}</p>
            </section>
          </Reveal>
          <Reveal delay={100}>
            <section className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <h2 className="font-display text-lg font-semibold text-ink">Negative-list position</h2>
              <p className="mt-2 text-ink/80">{sector.negativeListPosition}</p>
            </section>
          </Reveal>
        </div>

        {deep && (
          <>
            <Reveal delay={140}>
              <section className="mt-12">
                <h2 className="font-display text-xl font-bold text-ink">What counts as {sector.name.toLowerCase()}</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {deep.subActivities.map((a) => (
                    <div key={a.name} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5">
                      <p className="font-display text-sm font-semibold text-ink">{a.name}</p>
                      <p className="mt-1 text-sm text-ink/70">{a.note}</p>
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>

            <Reveal delay={180}>
              <section className="mt-12">
                <h2 className="font-display text-xl font-bold text-ink">Licenses and registrations you&apos;ll need</h2>
                <div className="mt-4 space-y-3">
                  {deep.licenses.map((l) => (
                    <div key={l.name} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5">
                      <p className="font-display text-sm font-semibold text-ink">{l.name}</p>
                      <p className="mt-1 text-sm text-ink/70">{l.detail}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-sm text-ink/60">
                  Entity not registered yet? See{" "}
                  <Link href="/business-registration" className="font-medium text-brand-700 underline">
                    business registration
                  </Link>{" "}
                  and{" "}
                  <Link href="/dic-approval" className="font-medium text-brand-700 underline">
                    how DIC approval works
                  </Link>
                  .
                </p>
              </section>
            </Reveal>

            <Reveal delay={220}>
              <section className="mt-12">
                <h2 className="font-display text-xl font-bold text-ink">Typical machinery and investment</h2>
                <p className="mt-2 text-sm text-ink/60">
                  Rough, indicative ranges for a small-to-medium unit — every project&apos;s actual cost depends on
                  capacity, automation level and supplier quotations.
                </p>
                <div className="mt-4 overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
                  <table className="w-full min-w-[560px] text-left text-sm">
                    <thead className="bg-brand-50 text-ink/70">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Activity</th>
                        <th className="px-4 py-3 font-semibold">Investment range</th>
                        <th className="px-4 py-3 font-semibold">Key machinery</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deep.machinery.map((m) => (
                        <tr key={m.activity} className="border-t border-brand-50">
                          <td className="px-4 py-3 font-medium text-ink">{m.activity}</td>
                          <td className="px-4 py-3 text-ink/80">{m.investmentRange}</td>
                          <td className="px-4 py-3 text-ink/70">{m.keyMachinery}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </Reveal>

            <Reveal delay={260}>
              <section className={`mt-12 rounded-2xl ${theme.bgTint} p-6 ring-1 ${theme.ring}`}>
                <h2 className="font-display text-xl font-bold text-ink">{deep.subsidyWorkedExample.title}</h2>
                <p className="mt-3 text-ink/80">{deep.subsidyWorkedExample.body}</p>
              </section>
            </Reveal>

            <Reveal delay={300}>
              <section className="mt-12">
                <h2 className="font-display text-xl font-bold text-ink">Frequently asked questions</h2>
                <div className="mt-4 space-y-3">
                  {deep.faqs.map((f) => (
                    <details key={f.question} className="group rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5">
                      <summary className="cursor-pointer list-none font-display text-sm font-semibold text-ink marker:content-none">
                        <span className="flex items-center justify-between gap-4">
                          {f.question}
                          <span className="shrink-0 text-brand-600 transition-transform group-open:rotate-45">+</span>
                        </span>
                      </summary>
                      <p className="mt-3 text-sm text-ink/70">{f.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            </Reveal>

            <Reveal delay={340}>
              <p className="mt-10 text-xs text-ink/40">
                Sources: {deep.sources.join(" · ")}
              </p>
            </Reveal>
          </>
        )}

        <Reveal delay={380}>
          <div className={`mt-10 rounded-2xl ${theme.bgTint} p-6 ring-1 ${theme.ring}`}>
            <p className="text-ink/80">
              Get an indicative subsidy figure for a project in this sector, checked against the
              negative list and Odisha&apos;s district classification.
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
