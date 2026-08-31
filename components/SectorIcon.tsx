const ICONS: Record<string, string> = {
  "agro-and-food-processing":
    "M12 3c-3 3-3 7-1 10 2-3 5-4 8-3-1 4-4 7-8 7-5 0-8-4-8-8 0-3 2-6 5-6h4zM12 13v8",
  "handicrafts-and-handloom":
    "M4 6h16M4 6v3a4 4 0 004 4h1v7M4 6l2-3h12l2 3M16 13a4 4 0 004-4V6M9 13h2v7H9zM13 20h2",
  "engineering-and-fabrication":
    "M14.7 6.3a3 3 0 11-4.24 4.24 3 3 0 014.24-4.24zM10.46 10.54L4 17v3h3l6.46-6.46M15 5l1.5-1.5L18 5l-1.5 1.5zM18.5 8.5L20 7l1.5 1.5L20 10z",
  "cold-chain":
    "M12 2v20M4.5 6.5l15 11M19.5 6.5l-15 11M7 4l5 3 5-3M7 20l5-3 5 3M4 12h1M19 12h1",
  "plastics-and-polymers":
    "M12 2l3 5-3 5-3-5 3-5zM4 17l3-5 3 5-3 5-3-5zM17 17l3-5 3 5-3 5-3-5zM9 12h6",
  "fishery-and-marine":
    "M3 15c4-4 14-4 18 0-4 4-14 4-18 0zM16 12l4-3v6l-4-3zM9 15a1 1 0 100-2 1 1 0 000 2z",
  "textiles-and-apparel":
    "M8 4l4 3 4-3 3 4-3 2v11H8V10L5 8l3-4z",
  "tourism-and-hospitality":
    "M4 20l4-9 4 9M13 20l4-11 3 11M9 13l2-5 2 5",
};

export default function SectorIcon({ slug, className = "h-6 w-6" }: { slug: string; className?: string }) {
  const d = ICONS[slug];
  if (!d) return null;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d={d} />
    </svg>
  );
}
