import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Services",
  description: "DPR, registration and subsidy advisory pricing.",
};

interface Row {
  service: string;
  fee: string;
  turnaround?: string;
  scope: string;
}

const CORE_DPR: Row[] = [
  { service: "Self-serve DPR — up to ₹25 lakh", fee: "₹2,500 – 4,000", turnaround: "Same day", scope: "Auto-generated DPR in PDF and Word, financial model, annexure checklist" },
  { service: "Assisted DPR — ₹25 lakh to ₹1 crore", fee: "₹8,000 – 15,000", turnaround: "3 working days", scope: "Reviewed and finished by a preparer, market data added, CMA data in bank format, subsidy note" },
  { service: "Full-service DPR — above ₹1 crore", fee: "₹25,000 – 75,000", turnaround: "7–15 days", scope: "Consultative, custom market study, PERT chart, three-scenario sensitivity, bank presentation" },
  { service: "DPR revision after bank query", fee: "₹1,500 – 5,000", turnaround: "2 days", scope: "Rework in response to a specific query letter" },
  { service: "CMA data standalone", fee: "₹3,000 – 8,000", turnaround: "2 days", scope: "Forms I–VI for an existing borrower" },
];

const REGISTRATION: Row[] = [
  { service: "Udyam registration", fee: "Free or nominal", scope: "Free on the government portal — offered as a lead magnet, never charged meaningfully" },
  { service: "Partnership firm registration", fee: "₹3,000 – 6,000 + stamp duty", scope: "Deed drafting, Form 1, Registrar of Firms filing" },
  { service: "LLP incorporation", fee: "₹8,000 – 12,000 + government fees", scope: "DSC, name reservation, FiLLiP, Form 3 within 30 days" },
  { service: "Private limited / OPC incorporation", fee: "₹10,000 – 15,000 + government fees", scope: "SPICe+" },
  { service: "GST registration", fee: "₹1,500 – 3,000", scope: "—" },
  { service: "Professional Tax, PF, ESIC registration", fee: "₹1,500 – 3,000 each", scope: "Trigger thresholds: EPFO at 20 employees, ESIC at 10 in a factory" },
  { service: "Trade licence, factory licence, fire NOC", fee: "Quote per case", scope: "Liaison work; priced by district" },
  { service: "FSSAI, BIS, pollution board consent", fee: "Quote per case", scope: "Sector-specific" },
  { service: "Annual compliance retainer", fee: "₹1,500 – 6,000 per month", scope: "GST returns, TDS, ROC filings, bookkeeping" },
];

const SUBSIDY: Row[] = [
  { service: "Subsidy eligibility opinion", fee: "₹2,000 – 5,000", scope: "Written note identifying every claimable head and the best policy route" },
  { service: "GO SWIFT / PEAL filing", fee: "₹5,000 – 15,000 + portal fee", scope: "Portal fee ₹1,000 below ₹3cr, ₹20,000 for ₹3–50cr" },
  { service: "Capital Investment Subsidy claim", fee: "Fixed fee", scope: "Post-commercial-production. Sanctioned by DLC up to ₹1cr P&M, SDLC for ₹1–10cr. Priced as a fixed professional fee, never contingent on sanction." },
  { service: "Interest subsidy and other claims", fee: "₹3,000 – 8,000 per head", scope: "Each head is a separate application with its own Annexure form" },
  { service: "Bank loan facilitation", fee: "Fixed fee", scope: "Documentation, submission, query handling, follow-up. Never a percentage of the loan amount." },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <Reveal>
        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">Services and pricing</h1>
        <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          Prices below are a starting structure, not researched market rates. They will be
          updated once benchmarked against what Bhubaneswar and Cuttack consultants currently
          charge. Fees are always for professional work, disclosed in writing before engagement,
          and never contingent on a sanction outcome.
        </div>
        <p className="mt-4 text-sm text-ink/60">
          Not sure which service you need?{" "}
          <Link href="/dic-approval" className="font-medium text-brand-700 underline">
            Read how DIC approval works
          </Link>{" "}
          or{" "}
          <Link href="/business-registration" className="font-medium text-brand-700 underline">
            compare business structures
          </Link>{" "}
          first.
        </p>
      </Reveal>

      <ServiceTable title="Core DPR services" rows={CORE_DPR} />
      <ServiceTable title="Registration and compliance" rows={REGISTRATION} />
      <ServiceTable title="Subsidy and finance advisory" rows={SUBSIDY} />
    </div>
  );
}

function ServiceTable({ title, rows }: { title: string; rows: Row[] }) {
  return (
    <Reveal>
      <section className="mt-12">
        <h2 className="font-display text-xl font-bold text-ink">{title}</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-brand-50 text-ink/70">
              <tr>
                <th className="px-4 py-3 font-semibold">Service</th>
                <th className="px-4 py-3 font-semibold">Indicative fee</th>
                {rows.some((r) => r.turnaround) && (
                  <th className="px-4 py-3 font-semibold">Turnaround</th>
                )}
                <th className="px-4 py-3 font-semibold">Scope</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.service} className="border-t border-brand-50 transition-colors hover:bg-brand-50/60">
                  <td className="px-4 py-3 font-medium text-ink">{row.service}</td>
                  <td className="px-4 py-3 text-ink/80">{row.fee}</td>
                  {rows.some((r) => r.turnaround) && (
                    <td className="px-4 py-3 text-ink/80">{row.turnaround ?? "—"}</td>
                  )}
                  <td className="px-4 py-3 text-ink/70">{row.scope}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Reveal>
  );
}
