import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "DIC Approval & GO SWIFT Process, Odisha",
  description:
    "How District Industries Centre (DIC) approval and Odisha's GO SWIFT single-window portal actually work — the process, the legal backdrop, and what's still unconfirmed.",
  alternates: { canonical: "/dic-approval" },
};

export default function DicApprovalPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Reveal>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "DIC Approval", href: "/dic-approval" }]} />
        <p className="mt-4 inline-block rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700 shadow-sm ring-1 ring-brand-100">
          Approvals &amp; clearances
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
          DIC approval and GO SWIFT, explained
        </h1>
        <p className="mt-4 text-ink/70">
          Every Odisha MSME project that needs a government clearance, land allotment or
          subsidy sanction eventually passes through the District Industries Centre (DIC) and
          the state&apos;s single-window portal, GO SWIFT. Here&apos;s how the process actually
          works — including the parts that are genuinely unclear even in the official
          documentation.
        </p>
      </Reveal>

      <Reveal delay={80}>
        <section className="mt-10">
          <h2 className="font-display text-xl font-bold text-ink">What GO SWIFT is</h2>
          <p className="mt-3 text-ink/80">
            GO SWIFT — Government of Odisha Single Window for Investor Facilitation &amp;
            Tracking — is the state&apos;s integrated digital portal for industrial approvals.
            Launched in 2017, it lets an investor submit one Combined Application Form (CAF)
            covering 32 government-to-business services across 15 state departments, pay fees
            online, track status on a dashboard, and download digitally signed clearances. The
            Department for Promotion of Industry and Internal Trade (DPIIT) has cited it as a
            best-practice model for other states.
          </p>
          <p className="mt-3 text-ink/80">
            In practice, the flow is: register on the portal (industrial users get access to
            the full set of services; non-industrial users can only raise grievances) → apply
            for the specific services the project needs, including PEAL (Project Evaluation
            &amp; Allotment of Land) if IDCO land is involved → pay online → track the
            application on the investor dashboard → download the digitally signed certificate
            once approved.
          </p>
        </section>
      </Reveal>

      <Reveal delay={140}>
        <section className="mt-10">
          <h2 className="font-display text-xl font-bold text-ink">Where DIC fits in</h2>
          <p className="mt-3 text-ink/80">
            The District Industries Centre is the local face of all this. Each DIC runs a
            District Level Facilitation Cell (DLFC), chaired by the General Manager (DIC), with
            representatives from the relevant line departments and industry. This is where an
            entrepreneur gets hands-on help — model project report guidance, bank and finance
            referrals, and a local point of contact — rather than navigating the state portal
            alone.
          </p>
        </section>
      </Reveal>

      <Reveal delay={200}>
        <section className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="font-display text-lg font-bold text-ink">
            Two different committees, easy to confuse
          </h2>
          <p className="mt-3 text-ink/80">
            Odisha actually runs two separate clearance systems that both get called
            &quot;DIC approval&quot; in casual conversation — worth keeping straight:
          </p>
          <div className="mt-4 space-y-4">
            <div>
              <p className="font-semibold text-ink">1. General project clearance (by project size)</p>
              <p className="mt-1 text-ink/80">
                District Level Single Window Clearance Authority (DLSWCA) handles projects at
                district level. Projects above ₹50 crore of investment go to the State Level
                Single Window Clearance Authority (SLSWCA), chaired by the Chief Secretary, with
                IPICOL as the technical secretariat. Projects above ₹1,000 crore go to a
                Chief-Minister-headed High Level Clearance Authority.
              </p>
            </div>
            <div>
              <p className="font-semibold text-ink">2. MSME subsidy sanctioning (Capital Investment Subsidy)</p>
              <p className="mt-1 text-ink/80">
                This is a separate track: a District Level Committee (DLC) — the Collector can
                co-opt technical experts onto it — sanctions Capital Investment Subsidy claims
                and verifies land records. After a DLC meeting, the RIC/DIC must communicate the
                decision to the enterprise, the bank and the Director of Industries within 7
                days; the DIC General Manager then verifies the unit is actually operational
                within 3 working days of the sanction letter, before any money is disbursed.
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm text-ink/60">
            We could not confirm, from a source that would parse cleanly, the exact investment
            threshold that moves a Capital Investment Subsidy case from the DLC to a
            state-level committee specifically (as distinct from the general ₹50cr
            DLSWCA/SLSWCA project-clearance split above, which is confirmed). Treat any specific
            crore-figure you hear for this as something to confirm with the DIC directly.
          </p>
        </section>
      </Reveal>

      <Reveal delay={260}>
        <section className="mt-10">
          <h2 className="font-display text-xl font-bold text-ink">The legal backing — and what &quot;deemed approval&quot; means</h2>
          <p className="mt-3 text-ink/80">
            The whole system runs on the Odisha Industries (Facilitation) Act, 2004 and the
            Odisha Industries Facilitation Rules, 2015. Departments have to clear applications
            within specified time limits; if a department misses its deadline, the clearance is
            <strong> deemed granted</strong> — the nodal agency is required to communicate that
            in writing so the entrepreneur can proceed without waiting indefinitely. The
            portal&apos;s own grievance-redressal process is capped at 45 days.
          </p>
          <p className="mt-3 text-sm text-ink/60">
            The exact day-count for each of the 32 individual services is set out in a schedule
            in the 2015 Rules that we were not able to extract cleanly — worth a direct read of
            the official schedule, or a question to your DIC, before you rely on a specific
            number of days for your particular clearance.
          </p>
        </section>
      </Reveal>

      <Reveal delay={320}>
        <section className="mt-10">
          <h2 className="font-display text-xl font-bold text-ink">What&apos;s changing</h2>
          <p className="mt-3 text-ink/80">
            News coverage from June 2026 describes a &quot;Go East&quot; initiative announced by
            the Chief Minister — a Special Task Force and a new &quot;Go East Cell&quot; inside
            IPICOL, reportedly alongside plans for an upgraded GO SWIFT digital-monitoring
            module and a proposal to add several backward districts to Thrust Sector status
            under IPR 2022. We found this only in press coverage, not yet in a primary
            government release, so we&apos;re not presenting it as settled fact — but it&apos;s
            worth knowing that the process may be actively changing.
          </p>
        </section>
      </Reveal>

      <Reveal delay={380}>
        <div className="mt-12 rounded-2xl bg-brand-50 p-6 ring-1 ring-brand-100">
          <p className="text-ink/80">
            Navigating which clearance applies to your project — and which committee actually
            decides it — is exactly the kind of thing that&apos;s cheaper to get right from a
            local advisor than to learn by having a file bounced back.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-md"
            >
              Ask us about your project <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/eligibility-checker"
              className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50"
            >
              Check subsidy eligibility
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
