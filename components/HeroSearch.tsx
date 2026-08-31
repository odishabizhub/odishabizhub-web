"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SECTORS, SCHEMES } from "@/lib/subsidy-data";

interface SearchItem {
  label: string;
  href: string;
  kind: "Sector" | "Scheme";
}

const ITEMS: SearchItem[] = [
  ...SECTORS.map((s) => ({ label: s.name, href: `/sectors/${s.slug}`, kind: "Sector" as const })),
  ...SCHEMES.map((s) => ({ label: s.name, href: `/schemes/${s.slug}`, kind: "Scheme" as const })),
];

export default function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return ITEMS.filter((item) => item.label.toLowerCase().includes(q)).slice(0, 6);
  }, [query]);

  function go(item: SearchItem) {
    setOpen(false);
    setQuery("");
    router.push(item.href);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (matches[0]) {
      go(matches[0]);
    } else if (query.trim()) {
      router.push(`/eligibility-checker`);
    }
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="Search a sector or scheme — e.g. Food Processing, PMEGP"
          className="w-full rounded-md border border-brand-200 bg-white px-4 py-3 text-sm text-ink shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
        <button
          type="submit"
          className="whitespace-nowrap rounded-md bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
        >
          Search
        </button>
      </form>
      {open && matches.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full overflow-hidden rounded-md border border-brand-100 bg-white shadow-lg sm:w-[calc(100%-108px)]">
          {matches.map((item) => (
            <li key={item.href}>
              <button
                type="button"
                onMouseDown={() => go(item)}
                className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm hover:bg-brand-50"
              >
                <span className="text-ink">{item.label}</span>
                <span className="text-xs uppercase tracking-wide text-ink/40">{item.kind}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
