/** Visual-only presentation data for the sector grid — kept separate from
 * subsidy-data.ts, which mirrors the source spreadsheet and should stay
 * presentation-free. Illustrations live in /public/images/sectors. */
export interface SectorTheme {
  bgTint: string; // pastel card background
  ring: string; // border/ring accent
  accentText: string; // accent text colour (link, badge)
  accentBg: string; // solid accent for small badges/icons
  image: string;
}

export const SECTOR_TILE_COLOR: Record<string, SectorTheme> = {
  "agro-and-food-processing": {
    bgTint: "bg-emerald-50",
    ring: "ring-emerald-200",
    accentText: "text-emerald-700",
    accentBg: "bg-emerald-500",
    image: "/images/sectors/agro-and-food-processing.webp",
  },
  "handicrafts-and-handloom": {
    bgTint: "bg-orange-50",
    ring: "ring-orange-200",
    accentText: "text-orange-700",
    accentBg: "bg-orange-500",
    image: "/images/sectors/handicrafts-and-handloom.webp",
  },
  "engineering-and-fabrication": {
    bgTint: "bg-indigo-50",
    ring: "ring-indigo-200",
    accentText: "text-indigo-700",
    accentBg: "bg-indigo-500",
    image: "/images/sectors/engineering-and-fabrication.webp",
  },
  "cold-chain": {
    bgTint: "bg-cyan-50",
    ring: "ring-cyan-200",
    accentText: "text-cyan-700",
    accentBg: "bg-cyan-500",
    image: "/images/sectors/cold-chain.webp",
  },
  "plastics-and-polymers": {
    bgTint: "bg-slate-50",
    ring: "ring-slate-200",
    accentText: "text-slate-700",
    accentBg: "bg-slate-500",
    image: "/images/sectors/plastics-and-polymers.webp",
  },
  "fishery-and-marine": {
    bgTint: "bg-blue-50",
    ring: "ring-blue-200",
    accentText: "text-blue-700",
    accentBg: "bg-blue-500",
    image: "/images/sectors/fishery-and-marine.webp",
  },
  "textiles-and-apparel": {
    bgTint: "bg-rose-50",
    ring: "ring-rose-200",
    accentText: "text-rose-700",
    accentBg: "bg-rose-500",
    image: "/images/sectors/textiles-and-apparel.webp",
  },
  "tourism-and-hospitality": {
    bgTint: "bg-amber-50",
    ring: "ring-amber-200",
    accentText: "text-amber-700",
    accentBg: "bg-amber-500",
    image: "/images/sectors/tourism-and-hospitality.webp",
  },
};
