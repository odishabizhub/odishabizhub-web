import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Resources",
  description: "Checklists and guides for preparing a bankable DPR — coming soon.",
};

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <Reveal>
        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">Resources</h1>
        <p className="mt-4 text-ink/80">
          Downloadable checklists, an annexure list, and a guide to why DPRs get rejected are
          planned for this page. They&apos;ll be published here as they&apos;re written.
        </p>
        <p className="mt-4 text-ink/80">
          In the meantime, the{" "}
          <Link href="/eligibility-checker" className="font-medium text-brand-700 underline">
            eligibility checker
          </Link>{" "}
          and the{" "}
          <Link href="/schemes" className="font-medium text-brand-700 underline">
            scheme pages
          </Link>{" "}
          cover the most commonly asked questions.
        </p>
      </Reveal>
    </div>
  );
}
