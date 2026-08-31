# odishabizhub.com — Phase 1

Marketing site plus a free eligibility checker, for Odisha Biz Hub LLP's DPR, DIC approval,
MSME subsidy, project finance and business incorporation advisory practice. This is
**Phase 1 of 6** in the build order set out in
[`../Plan/Portal_Spec_and_Service_Catalogue.docx`](../Plan/Portal_Spec_and_Service_Catalogue.docx)
§6.2 — marketing site + eligibility checker only. No intake form, no payments, no auto-generated
DPRs, no client dashboard or admin console yet. The founder's positioning is that no one else
offers these services online, specifically in Odisha — see the sector-by-sector build notes
below for where content is being deepened first.

## Stack (free tier only — only the domain costs money)

- **Frontend**: Next.js 14 (App Router, TypeScript, Tailwind) → deploy on **Vercel** (Hobby/free
  tier).
- **Backend**: Python serverless functions in `api/*.py`, on Vercel's Python runtime — same free
  deployment, no separate host.
- **Database**: **Neon** (serverless Postgres, free tier) — `leads` (eligibility checker) and
  `contact_messages` (Contact page) tables.
- **Payments**: **Razorpay** — chosen (2026-08-31), not yet wired. There's no priced product on
  the site yet (Phase 2's intake form isn't built), so wiring a checkout would have nothing to
  attach to. Env var placeholders are in `.env.example` for when that changes.

## Data provenance

Every policy figure, cap, district list and negative-list entry in `lib/subsidy-data.ts` and
`api/_shared_data.py` is transcribed from
[`../Plan/Odisha_MSME_Subsidy_Matrix.xlsx`](../Plan/Odisha_MSME_Subsidy_Matrix.xlsx). Nothing is
invented. **The two data files must be kept in sync by hand** — if you change a rate or cap in
one, change it in the other.

The workbook's own "Verify Before Filing" tab lists 14 open points where its compilers couldn't
confirm a figure. Several of the highest-priority ones have since been cross-checked against
primary sources (official policy PDFs, IPICOL's portal, CGTMSE's scheme document) and the
caveats in both data files now say what's confirmed, with a citation, versus what's still open:

- **Resolved, confirmed**: MSME Policy 2022's Capital Investment Subsidy is capped at ₹10cr
  P&M (not available ₹10–50cr, bar a narrow EV-component exception) — confirmed from the policy
  PDF itself. IPR 2022's CIS is confirmed uncapped, from IPICOL's official portal. CGTMSE's
  ₹10cr ceiling and full category-based cover table are confirmed from its scheme document.
- **Still genuinely unresolved — flagged, not guessed**: Stand-Up India's current status is a
  live conflict between financial-press reports (scheme concluded March 2025, a "revamped"
  version announced but not confirmed live) and its own portal (shows no change at all). The
  scheme page states this conflict explicitly rather than picking a side.

Where a figure is still unconfirmed, the caveat says so plainly — don't resolve one without a
citable primary source.

## Visual assets

Illustrations, the logo mark, and the hero image live in `public/images/` — sourced from
`../Assets/`, resized and converted to WebP (25MB → ~1.6MB) for load performance. Each PNG in
`../Assets/` already carries real alpha transparency at its vignette edges, which is why they
drop cleanly onto the pastel sector-tile backgrounds without visible corners; if new
illustrations are added later, keep that transparency when exporting them.

## Local development

```bash
npm install
npm run dev          # Next.js frontend only — http://localhost:3000
```

The Python API routes (`/api/eligibility`, `/api/lead`) do **not** run under plain `next dev`.
To exercise them locally, install the Vercel CLI (free) and run:

```bash
npm i -g vercel
vercel dev            # runs both the Next.js app and the Python functions together
```

`vercel dev` needs `DATABASE_URL` set (copy `.env.example` to `.env.local` and fill in a Neon
connection string) for `/api/lead` to work. `/api/eligibility` has no dependency and works
without it.

## Deploying (free)

1. Push this folder to its own GitHub repo.
2. Create a free [Neon](https://neon.tech) project, run `migrations/001_init.sql` against it,
   and copy the connection string.
3. Import the repo into [Vercel](https://vercel.com) (free Hobby plan). Add `DATABASE_URL` as an
   environment variable in the Vercel project settings.
4. Point the purchased `odishabizhub.com` domain at the Vercel project (Vercel's domain settings
   give the exact DNS records to add at the registrar).

## What's deliberately not built yet

Per the spec's phased build order (and the Business Plan's own risk mitigation — "do not
commission Phases 3 and 4 until fifty reports have been delivered by hand"):

- Phase 2 — the full 5-step intake questionnaire, payment, admin order queue (still manual
  fulfilment)
- Phase 3 — the financial engine (porting `../Plan/DPR_Financial_Model.xlsx`) and the
  bankability validation layer
- Phase 4 — auto-generation of the DPR document itself, first sector modules
- Phase 5 — remaining sector modules, client dashboard, e-signature, subsidy-claim tracking

## Known placeholders

The `/about` page and the site footer carry `[TO CONFIRM]` markers for the LLP's LLPIN,
registered address, and partner names — incorporation is still in progress (see
`../Draft And Info/`). Fill these in once the FiLLiP filing is through. Prices on `/services`
are the spec's own starting structure, explicitly not yet benchmarked against actual
Bhubaneswar/Cuttack market rates (Business Plan §2.2) — update before relying on them commercially.

The `/contact` page's email/phone/WhatsApp fields (`lib/site-config.ts` → `CONTACT`) are empty
until the founder sends a real address. The footer's social icons (`SOCIAL_LINKS` in the same
file) point to `#` until real profile URLs exist — they render as visibly disabled ("coming
soon") rather than as broken live links.

## SEO

Treated as an ongoing priority, not a one-off task (per the founder — 2026-08-31):

- `app/sitemap.ts` and `app/robots.ts` generate `sitemap.xml`/`robots.txt` from the same
  `SECTORS`/`SCHEMES` data that drives the pages — a new sector or scheme page is automatically
  in the sitemap.
- Every page sets its own `title`/`description`; sector and scheme detail pages also set an
  explicit `alternates.canonical`.
- Site-wide Open Graph/Twitter card defaults and an Organization JSON-LD block live in
  `app/layout.tsx`; sector/scheme detail pages add `BreadcrumbList` JSON-LD via
  `components/Breadcrumbs.tsx`.
- `NEXT_PUBLIC_SITE_URL` (see `.env.example`) drives all of the above — set it in the Vercel
  project once the domain is live, or metadata will resolve against the `odishabizhub.com`
  fallback in `lib/site-config.ts`.

## Sector-by-sector content build order

Per the founder's instruction, sector pages are being deepened **one at a time**, not all at
once — see the `workflow-one-sector-at-a-time` memory for the up-to-date status of which sector
is "done" versus still at Phase-1 depth. Cross-cutting changes (theme, SEO infra, new top-level
pages) apply to all pages in one pass; sector-specific content depth does not.
