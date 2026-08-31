// Central place for site-wide constants used by metadata, sitemap, robots and JSON-LD.
// SITE_URL falls back to the intended production domain so metadata resolves correctly
// even before NEXT_PUBLIC_SITE_URL is set in the deploy environment.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://odishabizhub.com";
export const SITE_NAME = "Odisha Biz Hub";
export const SITE_DESCRIPTION =
  "Odisha's DPR, DIC approval, MSME subsidy, project finance and business incorporation consultancy. Bankable Detailed Project Reports and an independent guide to Odisha's MSME incentive stack.";

// Filled in once accounts exist — see project memory "pending external inputs."
// Keep hrefs as "#" (not omitted) so the footer can render a consistent, styled
// placeholder row rather than conditionally hiding icons.
export const SOCIAL_LINKS: Array<{ label: string; href: string }> = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "WhatsApp", href: "#" },
];

// Placeholder until the user sends a real address — see About page's [TO CONFIRM] pattern.
export const CONTACT = {
  email: "",
  phone: "",
  whatsapp: "",
};
