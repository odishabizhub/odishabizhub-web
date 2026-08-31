import Link from "next/link";
import Image from "next/image";
import { SECTORS, SCHEMES } from "@/lib/subsidy-data";
import { SECTOR_TILE_COLOR } from "@/lib/sector-theme";
import SectorIcon from "@/components/SectorIcon";
import HeroSearch from "@/components/HeroSearch";
import Reveal from "@/components/Reveal";

const TIERS = [
  {
    name: "Self-serve",
    projectSize: "Up to ₹25 lakh",
    price: "₹2,500 – 4,000",
    turnaround: "Same day",
    description: "Fill the form, pay, download your DPR the same day.",
    included: ["DPR PDF and editable Word", "Financial model", "Annexure checklist"],
  },
  {
    name: "Assisted",
    projectSize: "₹25 lakh – ₹1 crore",
    price: "₹8,000 – 15,000",
    turnaround: "3 working days",
    description: "Auto-drafted, then reviewed and finished by a preparer.",
    included: ["Everything in Self-serve", "Bank-format CMA data", "Subsidy eligibility note"],
    featured: true,
  },
  {
    name: "Full service",
    projectSize: "Above ₹1 crore, or any DIC-sanction file",
    price: "₹25,000 – 75,000",
    turnaround: "7–15 days",
    description: "Consultative: site visit or call, custom market study, end-to-end filing.",
    included: ["Everything in Assisted", "Registration, GO SWIFT filing, subsidy claim", "Bank liaison"],
  },
];

const TRUST_BADGES = [
  { label: "Bankable DPRs", color: "bg-blue-500", icon: "📄" },
  { label: "Published-policy numbers", color: "bg-emerald-500", icon: "📖" },
  { label: "Free eligibility check", color: "bg-orange-500", icon: "⚡" },
];

const PILLARS = [
  {
    title: "Detailed Project Reports",
    description: "Bankable DPRs banks and DICs actually accept — for loans from ₹10 lakh to ₹10 crore.",
    href: "/services",
    icon: "📄",
    tint: "bg-blue-50 ring-blue-100 text-blue-700",
  },
  {
    title: "DIC approval & GO SWIFT",
    description: "The single-window clearance process, the DLC/SDLC distinction, and what to actually expect.",
    href: "/dic-approval",
    icon: "🏛️",
    tint: "bg-emerald-50 ring-emerald-100 text-emerald-700",
  },
  {
    title: "MSME subsidy",
    description: "Three overlapping Odisha policies plus central schemes — routed to whichever pays most.",
    href: "/schemes",
    icon: "💰",
    tint: "bg-orange-50 ring-orange-100 text-orange-700",
  },
  {
    title: "Project finance",
    description: "Bank loan documentation, submission and follow-up — never a percentage-of-loan fee.",
    href: "/services",
    icon: "🏦",
    tint: "bg-indigo-50 ring-indigo-100 text-indigo-700",
  },
  {
    title: "Business registration",
    description: "LLP, Private Limited, Partnership and Udyam — the entity has to exist before anything else can.",
    href: "/business-registration",
    icon: "📝",
    tint: "bg-rose-50 ring-rose-100 text-rose-700",
  },
];

// Per Portal Spec §4.3's own sequencing rationale (expected enquiry volume in Odisha) —
// not a claim of measured site traffic, since none exists yet.
const HIGH_VOLUME_SECTOR_SLUGS = ["agro-and-food-processing", "engineering-and-fabrication", "cold-chain"];
const HIGHLIGHT_SCHEME_SLUGS = ["pmegp", "cgtmse", "ipr-2022"];

export default function HomePage() {
  const highlightSectors = SECTORS.filter((s) => HIGH_VOLUME_SECTOR_SLUGS.includes(s.slug));
  const highlightSchemes = SCHEMES.filter((s) => HIGHLIGHT_SCHEME_SLUGS.includes(s.slug));

  return (
    <div className="overflow-x-clip">
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-sky-50 to-paper">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-200/50 blur-3xl animate-float-slow"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/3 top-1/2 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl animate-float"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-emerald-200/40 blur-3xl animate-float-slow"
        />

        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
            <div className="animate-fade-up">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700 shadow-sm ring-1 ring-brand-100">
                Odisha · DPR &amp; MSME subsidy advisory
              </p>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
                <span className="text-ink">Build your business</span>
                <br />
                <span className="bg-gradient-to-r from-brand-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  in Odisha.
                </span>
              </h1>
              <p className="mt-5 max-w-lg text-lg text-ink/75">
                A Detailed Project Report your bank will take seriously, and a claim under
                whichever of Odisha&apos;s three overlapping incentive policies actually pays
                the most — checked against the negative list before you spend a rupee on
                preparation.
              </p>

              <div className="mt-7 max-w-xl">
                <HeroSearch />
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/eligibility-checker"
                  className="group inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-base font-semibold text-white shadow-md shadow-brand-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-lg active:translate-y-0"
                >
                  Check your subsidy eligibility
                  <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                </Link>
                <Link
                  href="/services"
                  className="rounded-full border border-brand-200 bg-white px-6 py-3 text-base font-semibold text-brand-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-50 hover:shadow-md active:translate-y-0"
                >
                  See pricing
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                {TRUST_BADGES.map((badge) => (
                  <div key={badge.label} className="flex items-center gap-2">
                    <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${badge.color} text-white shadow-sm`}>
                      {badge.icon}
                    </span>
                    <span className="text-sm font-medium text-ink/75">{badge.label}</span>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-xs text-ink/50">
                Independent private consultancy. No government affiliation, no influence over
                any approval decision.
              </p>
            </div>

            <div className="relative animate-fade-up [animation-delay:150ms]">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-brand-900/10 ring-1 ring-white/60">
                <Image
                  src="/images/hero-illustration.webp"
                  alt="Odisha's coastline, the Konark temple, agriculture and industry side by side"
                  width={1200}
                  height={675}
                  priority
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="absolute -bottom-6 -left-6 hidden w-52 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-brand-100 sm:block animate-float">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-ink/50">
                  Where enquiries run highest
                </p>
                <ul className="mt-2 space-y-1.5">
                  {highlightSectors.slice(0, 3).map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/sectors/${s.slug}`}
                        className="flex items-center gap-1.5 text-xs font-medium text-ink hover:text-brand-700"
                      >
                        <SectorIcon slug={s.slug} className="h-3.5 w-3.5 shrink-0 text-brand-600" />
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="absolute -right-4 -top-4 hidden rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-brand-100 sm:block animate-float-slow">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-ink/50">
                  Commonly asked about
                </p>
                <ul className="mt-1.5 space-y-1">
                  {highlightSchemes.slice(0, 2).map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/schemes/${s.slug}`}
                        className="flex items-center gap-1.5 text-xs font-medium text-ink hover:text-brand-700"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-saffron" />
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal>
          <h2 className="font-display text-3xl font-bold text-ink">One place, start to finish</h2>
          <p className="mt-2 max-w-2xl text-ink/70">
            From the entity that doesn&apos;t exist yet, to the report that gets a loan
            sanctioned. As far as we&apos;ve found, no one else in Odisha combines all five of
            these online in one place — most consultancies do one or two, or work through
            paperwork rather than a portal.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 60}>
              <Link
                href={pillar.href}
                className={`group flex h-full flex-col rounded-2xl ${pillar.tint} p-5 ring-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
              >
                <span className="text-2xl">{pillar.icon}</span>
                <p className="mt-3 font-display font-semibold text-ink">{pillar.title}</p>
                <p className="mt-1 text-sm text-ink/70">{pillar.description}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold transition-all group-hover:gap-2">
                  Learn more <span aria-hidden="true">→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal>
          <h2 className="font-display text-3xl font-bold text-ink">Sectors we cover</h2>
          <p className="mt-2 max-w-2xl text-ink/70">
            Each sector page carries its typical project-cost band, the subsidy route that
            usually applies, and its position on Odisha&apos;s negative list.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SECTORS.map((sector, i) => {
            const theme = SECTOR_TILE_COLOR[sector.slug];
            return (
              <Reveal key={sector.slug} delay={i * 60}>
                <Link
                  href={`/sectors/${sector.slug}`}
                  className={`group flex h-full flex-col overflow-hidden rounded-2xl ${theme.bgTint} shadow-sm ring-1 ${theme.ring} transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl`}
                >
                  <div className="relative h-36 w-full overflow-hidden">
                    <Image
                      src={theme.image}
                      alt={sector.name}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="font-display font-semibold text-ink">{sector.name}</p>
                    <p className={`mt-1 text-xs font-medium ${theme.accentText}`}>{sector.projectCostBand}</p>
                    <span
                      className={`mt-4 inline-flex items-center gap-1 text-sm font-semibold ${theme.accentText} transition-all group-hover:gap-2`}
                    >
                      Explore sector <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="border-y border-brand-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Reveal>
            <h2 className="font-display text-3xl font-bold text-ink">Three ways to get your DPR</h2>
            <p className="mt-2 max-w-2xl text-ink/70">
              Priced by project size, not by how long the file takes to read. Prices below are
              an indicative starting structure and will be updated once benchmarked against
              current Bhubaneswar and Cuttack market rates.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {TIERS.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 100}>
                <div
                  className={`h-full rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    tier.featured
                      ? "border-brand-300 bg-gradient-to-b from-brand-50 to-white shadow-lg ring-1 ring-brand-200"
                      : "border-brand-100 bg-white shadow-sm"
                  }`}
                >
                  {tier.featured && (
                    <span className="inline-block rounded-full bg-brand-600 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                      Most common
                    </span>
                  )}
                  <h3 className="mt-3 font-display text-lg font-semibold text-ink">{tier.name}</h3>
                  <p className="mt-1 text-sm text-brand-700">{tier.projectSize}</p>
                  <p className="mt-4 text-2xl font-bold text-ink">{tier.price}</p>
                  <p className="text-sm text-ink/60">{tier.turnaround} turnaround</p>
                  <p className="mt-4 text-sm text-ink/70">{tier.description}</p>
                  <ul className="mt-4 space-y-2 text-sm text-ink/80">
                    {tier.included.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-brand-600">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal>
          <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-8">
            <h2 className="font-display text-xl font-bold text-ink">Why trust a private consultancy?</h2>
            <p className="mt-3 max-w-3xl text-ink/80">
              We publish the actual policy citations behind every figure, we name who prepared
              your report, and we say plainly what we cannot influence. Team names, LLPIN and
              registered address will appear on the{" "}
              <Link href="/about" className="font-medium text-brand-700 underline">
                About page
              </Link>{" "}
              as soon as incorporation is complete.
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
