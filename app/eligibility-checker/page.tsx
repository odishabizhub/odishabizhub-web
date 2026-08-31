import type { Metadata } from "next";
import EligibilityForm from "@/components/EligibilityForm";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Eligibility Checker",
  description:
    "Free tool: an indicative Odisha MSME subsidy figure, checked against the negative list and district classification.",
};

export default function EligibilityCheckerPage() {
  return (
    <div className="bg-gradient-to-b from-brand-50/60 to-paper">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Reveal>
          <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">Eligibility checker</h1>
          <p className="mt-3 text-ink/70">
            Answer a few questions about your project and we&apos;ll compute an indicative
            Capital Investment Subsidy figure under Odisha&apos;s three overlapping policies,
            screen your activity against the negative list, and tell you which route is likely
            best.
          </p>
          <p className="mt-2 text-sm text-ink/50">
            This is an indicative estimate only — not a guarantee of eligibility, sanction, or
            amount.
          </p>
        </Reveal>
        <EligibilityForm />
      </div>
    </div>
  );
}
