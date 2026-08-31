import type { MetadataRoute } from "next";
import { SECTORS, SCHEMES } from "@/lib/subsidy-data";
import { SITE_URL } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/sectors",
    "/schemes",
    "/dic-approval",
    "/business-registration",
    "/eligibility-checker",
    "/services",
    "/resources",
    "/about",
    "/contact",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const sectorRoutes = SECTORS.map((s) => ({
    url: `${SITE_URL}/sectors/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const schemeRoutes = SCHEMES.map((s) => ({
    url: `${SITE_URL}/schemes/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...sectorRoutes, ...schemeRoutes];
}
