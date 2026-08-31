"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const LINKS = [
  { href: "/sectors", label: "Sectors" },
  { href: "/schemes", label: "Schemes" },
  { href: "/eligibility-checker", label: "Eligibility Checker" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-white/90 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "border-brand-100 shadow-sm" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <Image
            src="/images/logo-mark.webp"
            alt="Odisha Biz Hub"
            width={40}
            height={40}
            className="h-9 w-9 shrink-0 transition-transform duration-500 group-hover:rotate-[20deg]"
            priority
          />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg font-bold tracking-tight">
              <span className="text-ink">Odisha</span>{" "}
              <span className="text-brand-600">Biz Hub</span>
            </span>
            <span className="hidden text-[11px] font-medium text-ink/50 sm:inline">
              DPR &amp; MSME subsidy advisory
            </span>
          </span>
        </Link>
        <nav className="hidden gap-6 text-sm font-medium text-ink/80 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative py-1 transition-colors hover:text-brand-700 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-brand-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/eligibility-checker"
          className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-md active:translate-y-0"
        >
          Start your DPR
        </Link>
      </div>
      <nav className="flex gap-4 overflow-x-auto px-4 pb-3 text-sm font-medium text-ink/80 md:hidden">
        {LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="whitespace-nowrap hover:text-brand-700">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
