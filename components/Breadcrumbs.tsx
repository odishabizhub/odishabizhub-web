import Link from "next/link";
import { SITE_URL } from "@/lib/site-config";

export interface Crumb {
  label: string;
  href: string;
}

export default function Breadcrumbs({ items, dark = false }: { items: Crumb[]; dark?: boolean }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: `${SITE_URL}${item.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className={`text-xs ${dark ? "text-white/80" : "text-ink/50"}`}>
        <ol className="flex flex-wrap items-center gap-1">
          {items.map((item, i) => (
            <li key={item.href} className="flex items-center gap-1">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i === items.length - 1 ? (
                <span aria-current="page" className="font-medium">{item.label}</span>
              ) : (
                <Link href={item.href} className={dark ? "hover:text-white" : "hover:text-brand-700"}>
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
