import type { Metadata } from "next";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description: "Who we are, and what we do not claim to influence.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Reveal>
        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">About Odisha Biz Hub</h1>

        <p className="mt-6 text-ink/80">
          Odisha Biz Hub is a specialist consultancy preparing Detailed Project Reports for
          Odisha MSMEs, delivered through this portal for smaller projects and through a
          conventional advisory practice for larger ones. Our core service is bankable DPRs
          for projects between ₹10 lakh and ₹10 crore; around that we handle entity
          registration, statutory registrations, subsidy claims and bank loan facilitation.
        </p>
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-8 rounded-2xl border border-brand-200 bg-brand-50 p-5 text-sm text-ink/80">
          <p className="font-display font-semibold text-ink">[TO CONFIRM once incorporation is complete]</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>LLPIN and registered office address</li>
            <li>Designated partner names, qualifications and photographs</li>
            <li>Date of incorporation</li>
          </ul>
          <p className="mt-2">
            The LLP name has been reserved (RUN-LLP approval on file); incorporation filing is
            in progress.
          </p>
        </div>
      </Reveal>

      <Reveal delay={160}>
        <h2 className="mt-12 font-display text-xl font-bold text-ink">A statement of independence</h2>
        <p className="mt-3 text-ink/80">
          Odisha Biz Hub is a private consultancy. We are not a government office, we hold no
          role in, and no influence over, any approval, sanction or disbursement decision made
          by a bank, a District Industries Centre, IPICOL, IDCO or any other authority. We make
          no representation, express or implied, that we can secure or influence an approval.
          No serving government officer, or immediate family member of one, holds any interest
          in this firm — direct, beneficial or nominee — and we pay no fee, commission or gift
          to any official connected with our work.
        </p>
        <p className="mt-3 text-ink/80">
          Every fee we charge is for professional work, disclosed in writing before engagement,
          and never contingent on a sanction outcome. Every DPR we issue states the assumptions
          it rests on and carries a signed preparer declaration.
        </p>
      </Reveal>

      <Reveal delay={220}>
        <h2 className="mt-12 font-display text-xl font-bold text-ink">What we bring</h2>
        <p className="mt-3 text-ink/80">
          Odisha&apos;s incentive framework is unusually generous and unusually complicated —
          three overlapping state policies, each with different rates, caps and
          backward-district lists, plus eight or more central schemes. Most DPRs we see route
          a client to the wrong policy and leave money on the table, or fail on the same small
          set of repeatable, mechanical reasons banks reject files for. Our work is to get both
          of those right, every time.
        </p>
      </Reveal>
    </div>
  );
}
