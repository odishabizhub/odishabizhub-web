import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { SECTORS } from "@/lib/subsidy-data";
import { SECTOR_TILE_COLOR } from "@/lib/sector-theme";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Sectors",
  description: "DPR and subsidy guidance by sector, for Odisha MSMEs.",
};

export default function SectorsIndexPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Reveal>
        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">Sectors</h1>
        <p className="mt-3 max-w-2xl text-ink/70">
          Each sector carries its typical project-cost band, the subsidy route that usually
          applies, and its position on Odisha&apos;s negative list — the activities the state
          will not subsidise, or will only subsidise above a threshold.
        </p>
      </Reveal>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SECTORS.map((sector, i) => {
          const theme = SECTOR_TILE_COLOR[sector.slug];
          return (
            <Reveal key={sector.slug} delay={i * 60}>
              <Link
                href={`/sectors/${sector.slug}`}
                className={`group flex h-full flex-col overflow-hidden rounded-2xl ${theme.bgTint} shadow-sm ring-1 ${theme.ring} transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl`}
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={theme.image}
                    alt={sector.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-display text-lg font-semibold text-ink">{sector.name}</h2>
                  <p className={`mt-1 text-sm font-medium ${theme.accentText}`}>{sector.projectCostBand}</p>
                  <p className="mt-3 text-sm text-ink/70 line-clamp-3">{sector.applicableSubsidy}</p>
                  <span
                    className={`mt-4 inline-flex items-center gap-1 text-sm font-semibold ${theme.accentText} transition-all group-hover:gap-2`}
                  >
                    Explore sector <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
