import Link from "next/link";
import Image from "next/image";
import SocialIcons from "./SocialIcons";

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-brand-100 bg-gradient-to-b from-white to-brand-50/40">
      <div className="mx-auto max-w-6xl px-4 py-12 text-sm text-ink/70 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Image src="/images/logo-mark.webp" alt="" width={28} height={28} className="h-7 w-7" />
            <span className="font-display font-semibold text-ink">Odisha Biz Hub</span>
          </div>
          <SocialIcons />
        </div>

        <p className="mt-5 max-w-3xl">
          Odisha Biz Hub is an independent private consultancy. We are not a government
          office, we hold no role in and no influence over any approval, sanction or
          disbursement decision, and no design element on this site is intended to imply
          otherwise. LLPIN and registered address will appear here once incorporation is
          complete —{" "}
          <Link href="/about" className="font-medium text-brand-700 underline">
            see About
          </Link>
          .
        </p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/sectors" className="hover:text-brand-700">Sectors</Link>
          <Link href="/schemes" className="hover:text-brand-700">Schemes</Link>
          <Link href="/dic-approval" className="hover:text-brand-700">DIC Approval</Link>
          <Link href="/business-registration" className="hover:text-brand-700">Business Registration</Link>
          <Link href="/eligibility-checker" className="hover:text-brand-700">Eligibility Checker</Link>
          <Link href="/services" className="hover:text-brand-700">Services</Link>
          <Link href="/resources" className="hover:text-brand-700">Resources</Link>
          <Link href="/about" className="hover:text-brand-700">About</Link>
          <Link href="/contact" className="hover:text-brand-700">Contact</Link>
        </div>
        <p className="mt-6 text-xs text-ink/50">
          © {new Date().getFullYear()} Odisha Biz Hub LLP (proposed). Figures on this site are
          indicative, drawn from published policy documents, and are not a guarantee of
          eligibility, sanction or subsidy amount.
        </p>
      </div>
    </footer>
  );
}
