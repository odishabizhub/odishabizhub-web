/**
 * Transcribed from Plan/Odisha_MSME_Subsidy_Matrix.xlsx (compiled August 2026),
 * then cross-checked against primary sources where the workbook flagged an
 * open question — see each `caveat` for what's now confirmed vs still open,
 * with a citation. Do not add or "clean up" a number without a source.
 */

export type PolicyKey = "msme2022" | "foodProcessing2022" | "ipr2022";

export interface PolicyRates {
  key: PolicyKey;
  name: string;
  baseRateGeneral: number; // fraction, e.g. 0.25
  baseRateReserved: number;
  capGeneral: number; // rupees
  capReserved: number; // rupees
  locationTopUpRate: number;
  locationTopUpCap: number;
  environmentalTopUpRate?: number; // MSME policy only
  environmentalTopUpCap?: number;
  disbursement: string;
  caveat?: string;
}

export const POLICIES: Record<PolicyKey, PolicyRates> = {
  msme2022: {
    key: "msme2022",
    name: "Odisha MSME Development Policy 2022",
    baseRateGeneral: 0.25,
    baseRateReserved: 0.3,
    capGeneral: 2_00_00_000,
    capReserved: 2_50_00_000,
    locationTopUpRate: 0.05,
    locationTopUpCap: 20_00_000,
    environmentalTopUpRate: 0.05,
    environmentalTopUpCap: 25_00_000,
    disbursement: "One-time, on sanction following commercial production.",
    caveat:
      "Confirmed against the policy text: Capital Investment Subsidy under this policy is capped at ₹10cr of plant & machinery (clause 7.3.1) — it is not available for the ₹10cr–₹50cr band, with one narrow exception for new E-Vehicle component/charging-infrastructure manufacturers (30%, capped at ₹3cr, up to ₹50cr — not modelled in this calculator). Source: Odisha MSME Development Policy 2022, msme.odisha.gov.in (consolidated to 31.12.2023). Whether the location and environmental top-ups can be claimed together is still unconfirmed.",
  },
  foodProcessing2022: {
    key: "foodProcessing2022",
    name: "Odisha Food Processing Policy 2022",
    baseRateGeneral: 0.3,
    baseRateReserved: 0.35,
    capGeneral: 3_50_00_000,
    capReserved: 4_00_00_000,
    locationTopUpRate: 0.05,
    locationTopUpCap: 50_00_000,
    disbursement: "One-time, on sanction following commercial production.",
    caveat:
      "For any food-processing unit, this policy beats the MSME Policy at every investment level. There is no scenario where a food-processing unit should be routed to the MSME Policy for Capital Investment Subsidy.",
  },
  ipr2022: {
    key: "ipr2022",
    name: "Odisha IPR 2022 (Priority / Thrust sector)",
    baseRateGeneral: 0.2, // Priority
    baseRateReserved: 0.3, // Thrust (not a reserved-category distinction — see note below)
    capGeneral: Number.POSITIVE_INFINITY,
    capReserved: Number.POSITIVE_INFINITY,
    locationTopUpRate: 0,
    locationTopUpCap: 0,
    disbursement: "Disbursed 4% p.a. (Priority) or 6% p.a. (Thrust) over 5 years from commercial production — not a lump sum. Model as an annual inflow, not day-one funding.",
    caveat:
      "Confirmed uncapped: IPICOL's official policy portal states this subsidy applies \"without any upper limit,\" and the full IPR 2022 policy text contains no capping language anywhere in this clause (unlike the MSME Policy, which caps its equivalent subsidy explicitly). Source: investodisha.gov.in, Industrial Policy Resolution 2022. The one residual gap: the operational guideline (og_cis_ipr_2022.pdf) is a scanned, un-OCR'd document that could theoretically add an implementation-level cap not present in the headline policy — worth a manual check before a large claim. Note: unlike the other two policies, the 20%/30% split here is Priority-vs-Thrust sector status, not general-vs-reserved category.",
  },
};

/** IPR 2022 rate depends on Priority vs Thrust sector status, not reserved category. */
export type IprSectorStatus = "none" | "priority" | "thrust";

// --- District classification -----------------------------------------
// The three policies use three different backward-district lists. Using the
// wrong one is, per the source workbook, "a standard rejection ground."

export const BACKWARD_MSME_FOODPROC = [
  "Bolangir",
  "Gajapati",
  "Kalahandi",
  "Kandhamal",
  "Koraput",
  "Malkangiri",
  "Mayurbhanj",
  "Nabarangpur",
  "Nuapada",
  "Rayagada",
  "Subarnapur",
] as const;

export const BACKWARD_IPR = [
  ...BACKWARD_MSME_FOODPROC,
  "Boudh",
  "Nayagarh",
  "Deogarh",
  "Kendrapada",
] as const;

export const BIJU_ECONOMIC_CORRIDOR = [
  "Bolangir",
  "Kalahandi",
  "Koraput",
  "Malkangiri",
  "Nabarangpur",
  "Nuapada",
  "Sundergarh",
  "Jharsuguda",
  "Sambalpur",
  "Bargarh",
] as const;

export const ALL_ODISHA_DISTRICTS = [
  "Angul",
  "Balasore",
  "Bargarh",
  "Bhadrak",
  "Bolangir",
  "Boudh",
  "Cuttack",
  "Deogarh",
  "Dhenkanal",
  "Gajapati",
  "Ganjam",
  "Jagatsinghpur",
  "Jajpur",
  "Jharsuguda",
  "Kalahandi",
  "Kandhamal",
  "Kendrapada",
  "Kendujhar (Keonjhar)",
  "Khordha",
  "Koraput",
  "Malkangiri",
  "Mayurbhanj",
  "Nabarangpur",
  "Nayagarh",
  "Nuapada",
  "Puri",
  "Rayagada",
  "Sambalpur",
  "Subarnapur (Sonepur)",
  "Sundergarh",
] as const;

// --- Negative list ------------------------------------------------------

export interface NegativeListEntry {
  activity: string;
  status: string;
  thresholdOrException: string;
  /** Minimum investment (rupees) at which the activity becomes eligible, if any. */
  eligibleAboveRupees?: number;
}

export const NEGATIVE_LIST: NegativeListEntry[] = [
  { activity: "Rice hullers and rice mills", status: "Excluded below ₹10cr", thresholdOrException: "Eligible only at ₹10cr investment and above", eligibleAboveRupees: 10_00_00_000 },
  { activity: "Flour mills / besan mills", status: "Excluded below ₹1cr", thresholdOrException: "Eligible at ₹1cr and above", eligibleAboveRupees: 1_00_00_000 },
  { activity: "Confectionery and bakeries", status: "Excluded below threshold", thresholdOrException: "Threshold varies by region; non-mechanised bakeries excluded under the Food Processing Policy" },
  { activity: "Edible and non-edible oil mills", status: "Excluded", thresholdOrException: "No exception stated" },
  { activity: "Mixture / bhujia units", status: "Excluded", thresholdOrException: "—" },
  { activity: "Ice candy units", status: "Excluded", thresholdOrException: "—" },
  { activity: "Betel nut processing", status: "Excluded", thresholdOrException: "—" },
  { activity: "Hatcheries, piggeries, broiler and rabbit farming", status: "Excluded", thresholdOrException: "—" },
  { activity: "Standalone sponge iron", status: "Excluded", thresholdOrException: "—" },
  { activity: "Iron/steel coiling, de-coiling, scrap processing, integrated rolling", status: "Excluded", thresholdOrException: "—" },
  { activity: "Stone crushing", status: "Excluded", thresholdOrException: "—" },
  { activity: "Coal screening, washing, briquetting", status: "Excluded", thresholdOrException: "—" },
  { activity: "Firewood and charcoal", status: "Excluded", thresholdOrException: "—" },
  { activity: "Crackers", status: "Excluded", thresholdOrException: "—" },
  { activity: "Tyre retreading", status: "Excluded", thresholdOrException: "—" },
  { activity: "Painting and spray painting", status: "Excluded", thresholdOrException: "—" },
  { activity: "Physical mixing of fertilisers", status: "Excluded", thresholdOrException: "—" },
  { activity: "Brick making", status: "Excluded", thresholdOrException: "Exception: refractory bricks, and fly-ash / red-mud composite bricks with ≥25% content" },
  { activity: "Tarpaulin", status: "Excluded below ₹20 lakh", thresholdOrException: "Eligible at ₹20 lakh and above", eligibleAboveRupees: 20_00_000 },
  { activity: "Saw mills", status: "Excluded", thresholdOrException: "—" },
  { activity: "Carpentry and wooden furniture", status: "Excluded below ₹1cr", thresholdOrException: "Eligible at ₹1cr and above", eligibleAboveRupees: 1_00_00_000 },
  { activity: "Drilling rigs and bore-wells", status: "Excluded", thresholdOrException: "—" },
  { activity: "Tea blending and packaging", status: "Excluded", thresholdOrException: "—" },
  { activity: "Raw tobacco cutting / gudakhu", status: "Excluded", thresholdOrException: "—" },
  { activity: "Book binding and rubber stamps", status: "Excluded below ₹50 lakh", thresholdOrException: "Eligible at ₹50 lakh and above", eligibleAboveRupees: 50_00_000 },
  { activity: "Distilled water", status: "Excluded", thresholdOrException: "—" },
  { activity: "Tailoring", status: "Excluded", thresholdOrException: "Exception: readymade garment manufacture is eligible" },
  { activity: "Re-packaging units", status: "Excluded", thresholdOrException: "—" },
  { activity: "Oil-seed pre-processing", status: "Excluded", thresholdOrException: "—" },
  { activity: "Liquor and IMFL bottling", status: "Excluded", thresholdOrException: "—" },
  { activity: "Size-reduction grinding / mixing", status: "Excluded below ₹10cr", thresholdOrException: "Exception: cement clinker grinding", eligibleAboveRupees: 10_00_00_000 },
  { activity: "Single-use plastic under 120 microns; plastic recycling", status: "Excluded", thresholdOrException: "—" },
  { activity: "Woven sack stitching and printing", status: "Excluded", thresholdOrException: "—" },
  { activity: "Packaged drinking / mineral water", status: "Excluded", thresholdOrException: "—" },
  { activity: "Soft drinks and carbonated beverages", status: "Excluded", thresholdOrException: "Exception: fruit pulp units at ₹1cr and above" },
  { activity: "Asbestos-based products", status: "Excluded", thresholdOrException: "—" },
  { activity: "General repair workshops (powered)", status: "Eligible at ₹50 lakh+", thresholdOrException: "Service-sector exception", eligibleAboveRupees: 50_00_000 },
  { activity: "Registered Vehicle Scrapping Facilities", status: "Eligible", thresholdOrException: "Service-sector exception" },
  { activity: "Cold storage / seafood freezing", status: "Eligible at ₹25 lakh+", thresholdOrException: "Service-sector exception", eligibleAboveRupees: 25_00_000 },
  { activity: "Electronics repair, software and IT services", status: "Eligible at ₹25 lakh+", thresholdOrException: "Service-sector exception", eligibleAboveRupees: 25_00_000 },
  { activity: "Technology labs and R&D", status: "Eligible at ₹25 lakh+", thresholdOrException: "Service-sector exception", eligibleAboveRupees: 25_00_000 },
  { activity: "Printing press", status: "Eligible at ₹50 lakh+", thresholdOrException: "Service-sector exception", eligibleAboveRupees: 50_00_000 },
  { activity: "Laundry and dry cleaning", status: "Eligible at ₹25 lakh+", thresholdOrException: "Service-sector exception", eligibleAboveRupees: 25_00_000 },
  { activity: "Medical oxygen refilling", status: "Eligible", thresholdOrException: "Service-sector exception" },
];

// --- Sectors (Portal Spec §2 and §4.3) ----------------------------------

export interface SectorDeepDive {
  intro: string;
  subActivities: { name: string; note: string }[];
  licenses: { name: string; detail: string }[];
  machinery: { activity: string; investmentRange: string; keyMachinery: string }[];
  subsidyWorkedExample: { title: string; body: string };
  faqs: { question: string; answer: string }[];
  sources: string[];
}

export interface SectorInfo {
  slug: string;
  name: string;
  projectCostBand: string;
  applicableSubsidy: string;
  negativeListPosition: string;
  /** Populated one sector at a time — see workflow-one-sector-at-a-time memory.
   * When present, the sector page renders these extra sections; when absent,
   * the page falls back to the standard (Phase 1) depth. */
  deepDive?: SectorDeepDive;
}

export const SECTORS: SectorInfo[] = [
  {
    slug: "agro-and-food-processing",
    name: "Agro and Food Processing",
    projectCostBand: "₹15 lakh – ₹2 crore (typical)",
    applicableSubsidy:
      "Route to the Food Processing Policy 2022 (30–35% Capital Investment Subsidy, cap ₹3.5cr/₹4cr) rather than the MSME Policy — it pays more at every level for a genuine food-processing activity. PMFME adds a 35% credit-linked subsidy up to ₹10 lakh for individual micro units.",
    negativeListPosition:
      "Highest-scrutiny sector on the negative list — rice/flour/oil milling, confectionery, betel-nut and several other food activities carry specific thresholds or exclusions. Screen the exact activity before quoting.",
    deepDive: {
      intro:
        "Food processing is the highest-volume DPR sector in Odisha, and the numbers behind that are real: India's food processing market reached roughly ₹30.5 lakh crore in 2024, growing at 6.55% a year — faster than manufacturing overall — and it's India's largest employer within organised manufacturing. In Odisha specifically, 240 micro food-processing units have been sanctioned credit-linked subsidy under PMFME's district-product programme alone. The activities below are what we actually see coming through the door.",
      subActivities: [
        {
          name: "Cashew kernel processing",
          note: "Odisha is one of India's major cashew-growing states. Not on the negative list — a straightforward Food Processing Policy 2022 claim.",
        },
        {
          name: "Dairy processing",
          note: "From small pasteurising/chilling units to full market-milk plants. Seven Odisha districts (including Cuttack, Puri, Bolangir) are PMFME milk-ODOP districts.",
        },
        {
          name: "Fruit & vegetable processing",
          note: "Canned pulp, pickle, jam and jelly. Strong fit for mango (Angul, Subarnapur), pineapple (Gajapati) and other ODOP districts.",
        },
        {
          name: "Spice processing & grinding",
          note: "Turmeric, chilli, ginger — five Odisha districts are PMFME spice-ODOP districts. Sits in the lighter Green pollution category regardless of scale.",
        },
        {
          name: "Millet processing",
          note: "Aligned with the Odisha Millets Mission and PMFME's Malkangiri/Nuapada millet-ODOP designation. No formal NABARD model project exists yet for this activity — costing is more indicative than the others below.",
        },
        {
          name: "Rice, flour & edible oil milling",
          note: "Heavily restricted — see the negative-list note above. Rice mills need ₹10cr+ investment, flour mills ₹1cr+, and oil mills are excluded outright with no threshold that cures it.",
        },
      ],
      licenses: [
        {
          name: "FSSAI registration or license",
          detail:
            "Thresholds changed materially in 2026: Basic Registration now covers turnover up to ₹1.5 crore (raised from the old ₹12 lakh, effective 1 April 2026), State License covers ₹1.5cr–₹50cr, and Central License applies above ₹50cr (or for importers/exporters). Registrations are now perpetually valid subject to risk-based inspection, replacing the old 1–5 year renewal cycle. Older capacity-based triggers (e.g. dairy above 50,000 litres/day needing a Central License regardless of turnover) may still apply alongside the new turnover rule — unconfirmed post-2026, check with FoSCoS or your local FSSAI office.",
        },
        {
          name: "Pollution control consent (OSPCB)",
          detail:
            "Most processing activities — cashew, dairy, bakery/confectionery above 1 tonne/day, fish processing, vegetable oil — sit in the Orange category, needing Consent to Establish before construction and Consent to Operate before running. Dal mills, rice hullers, spice grinding (any scale) and flour mills sit in the lighter Green category. Note: Odisha's published list may not yet reflect CPCB's January 2025 national move to a five-category system (adding 'Blue') — confirm your activity's current category with OSPCB directly.",
        },
        {
          name: "Udyam / MSME registration",
          detail: "Free, lifetime-valid, and the basis for every subsidy and priority-sector-lending claim that follows.",
        },
      ],
      machinery: [
        {
          activity: "Cashew kernel processing (500 MT/year)",
          investmentRange: "₹1.59 crore (NABARD model)",
          keyMachinery: "Steam boiler, semi-automated peeling machine, colour sorting machine, hot-oven dryer",
        },
        {
          activity: "Dairy processing (10,000 litres/day)",
          investmentRange: "₹2.58 crore (NABARD model)",
          keyMachinery: "Cream separator, chiller, pasteuriser, ghee boiler, CIP unit, pouch packing line",
        },
        {
          activity: "Fruit & vegetable processing (300 MT/year)",
          investmentRange: "₹74.78 lakh (NABARD model)",
          keyMachinery: "Washing machine, sorting conveyor, twin pulper, steam-jacketed kettles, canning line",
        },
        {
          activity: "Spice processing & grinding",
          investmentRange: "₹12 lakh – ₹1.1 crore (indicative, by scale)",
          keyMachinery: "Cleaning/grading unit, pulveriser, disintegrator, sieving unit, pouch filler-sealer",
        },
        {
          activity: "Millet processing",
          investmentRange: "₹2 lakh – ₹70 lakh (indicative, by scale)",
          keyMachinery: "Destoner, grader/aspirator, dehuller, pulveriser, flaking/pop machine",
        },
      ],
      subsidyWorkedExample: {
        title: "A worked example: fruit & vegetable processing",
        body:
          "NABARD's own model for a 300 MT/year canned-pulp, pickle and jam unit costs about ₹74.78 lakh all-in, of which ₹40.23 lakh is plant & machinery. Routed correctly to the Food Processing Policy 2022 rather than the MSME Policy, that P&M figure earns a Capital Investment Subsidy of ₹12.07 lakh at the general rate (30%) or ₹14.08 lakh at the reserved-category rate (35%) — before any backward-district top-up or PMFME layering. Use our eligibility checker with your own numbers for a project-specific figure.",
      },
      faqs: [
        {
          question: "What FSSAI license does a food processing unit in Odisha need?",
          answer:
            "It depends on turnover, since 2026 rules: Basic Registration up to ₹1.5 crore turnover, a State License from ₹1.5cr to ₹50cr, and a Central License above ₹50cr. Some capacity-based triggers from the older rules (large dairy or meat units, for instance) may still apply on top of the turnover test — confirm with FoSCoS or your local FSSAI office for edge cases.",
        },
        {
          question: "Is a cashew processing project eligible for Capital Investment Subsidy in Odisha?",
          answer:
            "Yes — cashew kernel processing is not on Odisha's negative list, and as a food-processing activity it should be routed to the Food Processing Policy 2022 (30–35% CIS) rather than the general MSME Policy, which pays less at every investment level for this activity.",
        },
        {
          question: "What is PMFME's ODOP and which product is my district assigned?",
          answer:
            "One District One Product (ODOP) is PMFME's way of clustering support around each district's dominant food product — for example milk in Cuttack and Puri, mango in Angul and Subarnapur, turmeric in Kandhamal, millet in Malkangiri and Nuapada. Note that Odisha separately runs its own, different ODOP scheme for handicrafts and other exports (run by the Directorate of Export Promotion & Marketing) — don't confuse the two; a district's handicraft ODOP and its PMFME food ODOP are often different products entirely.",
        },
        {
          question: "Do I need pollution control clearance for a food processing unit?",
          answer:
            "Usually yes. Cashew processing, dairy, bakery/confectionery above 1 tonne/day, fish processing and vegetable oil units fall in the Orange category and need Consent to Establish before construction and Consent to Operate before running. Dal mills, rice hullers, spice grinding and flour mills sit in the lighter Green category. Confirm your specific activity's current category with the Odisha State Pollution Control Board.",
        },
        {
          question: "Where is Odisha's Mega Food Park?",
          answer:
            "MITS Mega Food Park is in Rayagada district, not Khordha — a common mix-up, likely because the park's network includes a Primary Processing Centre located in Khordha alongside others at Kashipur, Padampur, Umerkote, Koraput and Digapahandi. The main park itself, with its Central Processing Centre, rice processing complex and cold storage, is in Rayagada.",
        },
        {
          question: "How much does a small food processing unit actually cost to set up?",
          answer:
            "Based on NABARD's own model project reports: a 300 MT/year fruit & vegetable processing unit runs about ₹75 lakh, a 500 MT/year cashew processing unit about ₹1.6 crore, and a 10,000 litre/day dairy plant about ₹2.6 crore. Spice grinding and millet processing scale down much further — from roughly ₹2–12 lakh for the smallest setups.",
        },
      ],
      sources: [
        "FSSAI Reforms press release, fssai.gov.in (13 Mar 2026)",
        "MoFPI ODOP list for 713 districts, mofpi.gov.in",
        "PIB — MITS Mega Food Park, Rayagada",
        "NABARD Model Project Reports (cashew, dairy, fruit & vegetable), agritech.tnau.ac.in",
        "Odisha State Pollution Control Board category lists, ospcboard.odisha.gov.in",
        "IBEF Food Processing Industry Report; PIB PMFME statistics",
      ],
    },
  },
  {
    slug: "handicrafts-and-handloom",
    name: "Handicrafts and Handloom",
    projectCostBand: "₹5 lakh – ₹50 lakh (typical)",
    applicableSubsidy:
      "Priority sector under IPR 2022. PM Vishwakarma covers the individual-artisan tier (certificate, toolkit incentive, concessional credit) for 18 notified trades — check that the client hasn't already availed PMEGP, PM SVANidhi or Mudra, which disqualifies PM Vishwakarma.",
    negativeListPosition:
      "Not on the negative list as a class. Odisha-specific handloom/handicraft/sericulture schemes exist beyond this matrix (13 separate guideline documents) — flagged as an area to research further before advising in depth.",
  },
  {
    slug: "engineering-and-fabrication",
    name: "Engineering and Fabrication",
    projectCostBand: "₹25 lakh – ₹1 crore (typical)",
    applicableSubsidy:
      "Standard MSME Policy 2022 route — 25% general / 30% reserved-category Capital Investment Subsidy, plus the usual top-ups for backward district, IDCO estate or environmental measures.",
    negativeListPosition:
      "Certain heads are excluded — iron/steel coiling and de-coiling, scrap processing and integrated rolling, and standalone sponge iron are all on the negative list. Confirm the specific fabrication activity first.",
    deepDive: {
      intro:
        "Engineering and fabrication is a steady-demand sector in Odisha for a specific reason: the state's anchor heavy industries need local vendors. SAIL's Rourkela Steel Plant, NALCO's Angul Aluminium Park and Tata Steel's Kalinganagar complex all run active vendor-development programmes for ancillary MSMEs — real, dated activity, not just a general \"steel hub\" claim. Nationally, engineering exports hit a record ₹10.2 lakh crore (US$122.4 billion) in FY 2025-26, now close to 28% of India's total merchandise exports, and Capital Goods manufacturing output has roughly doubled since 2015.",
      subActivities: [
        {
          name: "General & light fabrication",
          note: "Structural steel, gates, grills, industrial sheds. Dry-process units with no heat treatment, plating or painting typically sit in the lighter White pollution category.",
        },
        {
          name: "Sheet metal & CNC job-work",
          note: "Cutting, bending and punching job work. Adding an in-house powder-coating or painting line usually moves the unit into the Orange pollution category.",
        },
        {
          name: "Precision machining",
          note: "Lathe and CNC job work — machine components, turned parts. No formal NABARD/MSME-DI project profile found for this scale in Odisha; costed as indicative below.",
        },
        {
          name: "Welded assemblies",
          note: "Welding job-work and fabricated assemblies. The most capital-light entry point in this sector.",
        },
        {
          name: "Auto components & ancillary units",
          note: "DC-MSME lists several relevant project profiles (auto chain, pistons, silencers, control cables) — worth requesting directly, as their cost data wasn't independently verified for this page.",
        },
        {
          name: "Steel coiling, scrap processing & rolling",
          note: "Excluded outright — see the negative-list note above. This is a hard line, not a threshold.",
        },
      ],
      licenses: [
        {
          name: "Factory licence (Factories Act 1948)",
          detail:
            "Required once a unit has 10+ workers using power, or 20+ workers without power. In Odisha this is administered by the Directorate of Factories & Boilers under the Orissa Factories Rules, 1950 — apply on Form 2, licence issued on Form 4, valid to 31 December of the grant year. Via the GO SWIFT single-window portal the stated processing target is 30 working days, and units with 50+ workers or hazardous processes need a Safety & Health Policy on file.",
        },
        {
          name: "Pollution control consent (OSPCB)",
          detail:
            "OSPCB's 2023 classification revision draws the same line this page does: engineering/fabrication units with heat treatment, metal surface finishing or painting fall in the Orange category (Consent to Establish + Consent to Operate required); dry-process units without those steps fall in the lighter White category. This finding rests on a secondary regulatory-tracking summary of the OSPCB order, not a directly-read primary PDF — confirm your specific activity's category with OSPCB before relying on it.",
        },
        {
          name: "BIS / IS standards",
          detail:
            "BIS product certification (e.g. IS 2062 for structural steel) generally applies to the steel producer, not the fabricator buying and welding certified steel — a plain fabrication unit typically doesn't need its own BIS licence unless it manufactures a specific BIS-scheduled product itself. Design/execution compliance with IS 800 and use of BIS-marked input steel is what public-works tenders usually check. Confirm with BIS or the specific tender authority for your product — this synthesis wasn't found stated explicitly in one authoritative source.",
        },
        {
          name: "Udyam / MSME registration",
          detail: "Free, lifetime-valid, and the basis for every subsidy and priority-sector-lending claim that follows.",
        },
      ],
      machinery: [
        {
          activity: "General/light fabrication",
          investmentRange: "₹25 lakh – ₹1 crore (indicative — no current Odisha-specific model found)",
          keyMachinery: "Welding sets (arc/MIG/TIG), cutting/shearing machine, bending machine, drilling machine, bench grinder",
        },
        {
          activity: "Sheet metal / CNC job-work",
          investmentRange: "₹30 lakh – ₹1 crore+ (2018 reference prices for individual machines)",
          keyMachinery: "CNC turret punch (~₹80L), CNC press brake (~₹12–15L), shearing & bending machines",
        },
        {
          activity: "Precision machining",
          investmentRange: "₹15 lakh – ₹60 lakh (indicative)",
          keyMachinery: "Lathe, milling machine, drilling machine, surface grinder",
        },
        {
          activity: "Welded assemblies / job-work",
          investmentRange: "₹10 lakh – ₹40 lakh (indicative)",
          keyMachinery: "Welding transformers, cutting sets, power hacksaw, hand tools",
        },
      ],
      subsidyWorkedExample: {
        title: "A worked example: sheet metal fabrication unit",
        body:
          "A ₹40 lakh plant & machinery investment — cutting, bending and welding equipment, the entry point for a small sheet-metal or structural fabrication unit — earns a Capital Investment Subsidy of ₹10 lakh at the general rate (25%) or ₹12 lakh at the reserved-category rate (30%) under the MSME Development Policy 2022, before any top-up. Units inside an IDCO industrial estate — common in this sector, given proximity to anchor industries like SAIL Rourkela or Tata Steel Kalinganagar — qualify for a further +5% location top-up, capped at ₹20 lakh. Use our eligibility checker with your own numbers for a project-specific figure.",
      },
      faqs: [
        {
          question: "Do I need a factory licence for a fabrication unit in Odisha?",
          answer:
            "Only once you cross 10 workers using power (or 20 without power). Below that, a factory licence from the Directorate of Factories & Boilers isn't required — though Udyam registration and other standard registrations still are.",
        },
        {
          question: "What pollution category does an engineering or fabrication unit fall into?",
          answer:
            "It depends on your process. A dry unit — cutting, bending, welding, assembly, with no heat treatment, plating or painting — typically falls in the lighter White category. Add an in-house powder-coating or painting line and you likely move to Orange, which needs Consent to Establish before construction and Consent to Operate before running. Confirm your specific activity with OSPCB.",
        },
        {
          question: "Do I need BIS certification to run a fabrication unit?",
          answer:
            "Usually not for the fabrication work itself — BIS product standards like IS 2062 apply to the steel producer, not the unit buying and welding that steel. What matters for tenders is usually design compliance with IS 800 and sourcing BIS-marked input material, not a BIS licence on your own unit — though this depends on exactly what you manufacture, so confirm with BIS for your specific product.",
        },
        {
          question: "Is there shared infrastructure I can use instead of buying expensive CNC machinery myself?",
          answer:
            "Yes — the Central Tool Room and Training Centre (CTTC) in Bhubaneswar, a Ministry of MSME Technology Centre built with roughly ₹52 crore of investment, gives smaller units consultancy access to precision tooling, CNC machining and CAD/CAM design without each unit having to buy that equipment outright.",
        },
        {
          question: "Why is engineering & fabrication steady-demand in Odisha specifically?",
          answer:
            "Because the state's anchor heavy industries actively recruit local vendors: SAIL's Rourkela Steel Plant, NALCO's Angul Aluminium Park and Tata Steel's Kalinganagar complex all run vendor-development programmes for ancillary MSME suppliers, and Kalinganagar has a dedicated Downstream Park for steel-based units with a planned ₹1,200 crore of shared infrastructure.",
        },
        {
          question: "Is a scrap processing or steel rolling unit eligible for subsidy?",
          answer:
            "No — iron/steel coiling and de-coiling, scrap processing, integrated rolling and standalone sponge iron units are all excluded outright on Odisha's negative list, with no investment threshold that cures it. This is a different exclusion from rice or flour milling, which do have thresholds.",
        },
      ],
      sources: [
        "Directorate of Factories & Boilers, Odisha — dfb.odisha.gov.in; Invest Odisha GO SWIFT service page",
        "OSPCB classification revision (Feb 2023), via secondary regulatory summary — confirm against OSPCB's own published list",
        "CPCB Pollution Index classification framework",
        "SISI Rayagada / DC-MSME project profile: Aluminium Fabrications (2003) — dated, structural reference only",
        "Sirsa Sheet Metal Fabrication Cluster DPR, Govt of Haryana (2018) — machinery cost reference, not Odisha-specific",
        "Central Tool Room and Training Centre (CTTC), Bhubaneswar — cttc.gov.in; PIB",
        "EEPC India, IBEF — engineering export and Capital Goods sector statistics",
        "Vendor-development coverage: SAIL Rourkela (Aug 2026), NALCO Angul Aluminium Park (Sep 2025), Tata Steel Kalinganagar",
      ],
    },
  },
  {
    slug: "cold-chain",
    name: "Cold Storage and Cold Chain",
    projectCostBand: "₹50 lakh – ₹5 crore (typical)",
    applicableSubsidy:
      "Priority sector under IPR 2022. Cold storage / seafood freezing is also one of the specific service-sector exceptions on the negative list, eligible from ₹25 lakh.",
    negativeListPosition:
      "Eligible as a named service-sector exception at ₹25 lakh and above — below that threshold it falls into the general service-sector exclusion.",
  },
  {
    slug: "plastics-and-polymers",
    name: "Plastics and Polymers",
    projectCostBand: "₹50 lakh + (typical)",
    applicableSubsidy:
      "A focus sector under the MSME Policy 2022, which means it independently qualifies for the +5% location-style top-up (cap +₹20 lakh) regardless of district.",
    negativeListPosition:
      "Single-use plastic under 120 microns and plastic recycling are both excluded outright — no investment threshold cures either exclusion. Screen this first; it is a common reason a plastics enquiry turns out to be ineligible.",
  },
  {
    slug: "fishery-and-marine",
    name: "Fishery and Marine Processing",
    projectCostBand: "₹25 lakh – ₹2 crore (typical)",
    applicableSubsidy:
      "Seafood freezing/processing is a service-sector exception eligible from ₹25 lakh, and is usually better routed through the Food Processing Policy 2022 than through PMMSY for a processing (as opposed to farming) unit.",
    negativeListPosition:
      "Processing activities generally clear the negative list at the ₹25 lakh threshold; farming/hatchery activities (piggeries, hatcheries, broiler and rabbit farming) are excluded outright — confirm which side of that line the client's activity falls on.",
  },
  {
    slug: "textiles-and-apparel",
    name: "Textiles and Apparel",
    projectCostBand: "₹50 lakh + (typical)",
    applicableSubsidy:
      "Both an MSME Policy focus sector and an IPR 2022 Thrust sector — one of the few activities where the uncapped (but unverified) IPR 2022 route may be materially better above roughly ₹8.3cr of plant & machinery, where the MSME Policy's rupee cap starts to bind.",
    negativeListPosition:
      "Plain tailoring is excluded, but readymade garment manufacture is a named exception — the distinction matters and should be confirmed with the client's actual activity description.",
  },
  {
    slug: "tourism-and-hospitality",
    name: "Tourism and Hospitality",
    projectCostBand: "₹50 lakh + (typical)",
    applicableSubsidy:
      "Priority sector under IPR 2022 (20% Capital Investment Subsidy, disbursed over 5 years, uncapped per the policy text though unverified).",
    negativeListPosition:
      "Falls under the general service-sector exclusion unless it matches one of the specific named exceptions — confirm the exact activity (e.g. a standalone restaurant is different from a resort) before advising.",
  },
];

// --- Central schemes (Portal Spec §2 Schemes IA, matches Central Schemes sheet) ---

export interface SchemeInfo {
  slug: string;
  name: string;
  category: "state-policy" | "central-scheme";
  body: string;
  benefit: string;
  ceiling: string;
  eligibility: string;
  route: string;
  watchOutFor: string;
}

export const SCHEMES: SchemeInfo[] = [
  {
    slug: "msme-development-policy-2022",
    name: "Odisha MSME Development Policy 2022",
    category: "state-policy",
    body: "Directorate of MSME, Government of Odisha",
    benefit:
      "Capital Investment Subsidy 25% general / 30% reserved category (51%+ stake) on plant & machinery, plus interest subsidy, electricity duty exemption, SGST reimbursement, and a long list of smaller incentives (quality certification, ZED, patent/trademark, technology purchase).",
    ceiling: "CIS capped at ₹2.00cr general / ₹2.50cr reserved, and capped at ₹10cr of plant & machinery (clause 7.3.1) — confirmed not available for the ₹10–50cr band, bar a narrow 30%/₹3cr-cap exception for new E-Vehicle component and charging-infrastructure manufacturers. Other incentives under this policy (stamp duty, SGST, interest subsidy) do extend to the full ₹50cr project-cost ceiling.",
    eligibility: "New enterprise or Expansion/Modernisation/Diversification; production within 3 years of first fixed capital investment.",
    route: "GO SWIFT / DIC. Sanctioned by DLC up to ₹1cr P&M, SDLC above ₹1cr.",
    watchOutFor: "Above ₹10cr of plant & machinery, look to IPR 2022 (Thrust sector, uncapped) instead of this policy for Capital Investment Subsidy — this policy's CIS simply stops at ₹10cr. The two +5% top-ups (location and environmental) may or may not stack together — still unconfirmed. Source: Odisha MSME Development Policy 2022, msme.odisha.gov.in.",
  },
  {
    slug: "food-processing-policy-2022",
    name: "Odisha Food Processing Policy 2022",
    category: "state-policy",
    body: "Directorate of MSME, Government of Odisha",
    benefit: "Capital Investment Subsidy 30% general / 35% reserved category, plus a location top-up, a captive solar top-up, and a reefer-vehicle subsidy.",
    ceiling: "CIS capped at ₹3.50cr general / ₹4.00cr reserved. Ceiling of ₹50cr P&M, with a State Level Committee for the ₹10–50cr band.",
    eligibility: "Food-processing activity, plant & machinery up to ₹50cr, production within 3 years.",
    route: "DLC up to ₹1cr, SDC for ₹1–10cr, SLC for ₹10–50cr.",
    watchOutFor: "Always beats the MSME Policy for a genuine food-processing unit — there is no scenario where a food unit should be routed to the MSME Policy for CIS instead.",
  },
  {
    slug: "ipr-2022",
    name: "Odisha Industrial Policy Resolution (IPR) 2022",
    category: "state-policy",
    body: "IPICOL / Industries Department, Government of Odisha",
    benefit: "Capital Investment Subsidy 20% (Priority sector) or 30% (Thrust sector) of plant & machinery, disbursed as 4%/6% per annum over 5 years from commercial production — plus SGST reimbursement, electricity duty exemption, and power tariff reimbursement.",
    ceiling: "Confirmed uncapped — IPICOL's official portal states this subsidy applies \"without any upper limit,\" and the policy text carries no capping language for this clause (unlike the MSME Policy's explicit ₹10cr cap). The one residual gap: the operational guideline PDF is scanned and un-OCR'd, so an implementation-level cap can't be fully ruled out — worth a manual check before a large claim.",
    eligibility: "Unit's activity must fall in one of the 13 Priority or 13 Thrust sectors named in the policy.",
    route: "IPICOL / SLSWCA; DLSWCA if project cost is under ₹50cr.",
    watchOutFor: "Disbursed over 5 years, not as a lump sum — model it as an annual cash inflow in the DPR, not as day-one means of finance. This is the single most common IPR modelling error. Source: investodisha.gov.in.",
  },
  {
    slug: "pmegp",
    name: "Prime Minister's Employment Generation Programme (PMEGP)",
    category: "central-scheme",
    body: "KVIC / KVIB / DIC",
    benefit: "Margin money subsidy — General category: 25% rural / 15% urban (10% own contribution). Special category: 35% rural / 25% urban (5% own contribution).",
    ceiling: "₹50 lakh manufacturing / ₹20 lakh service. Second-loan upgradation up to ₹1cr / ₹25 lakh.",
    eligibility: "Individuals 18+ (Class VIII pass required only above ₹10 lakh manufacturing / ₹5 lakh service project cost); also SHGs, trusts, societies, production co-operatives. New units only. EDP training mandatory.",
    route: "kviconline.gov.in → DLTFC screening → bank appraisal → EDP → disbursement.",
    watchOutFor: "Land cost is excluded from project cost. Margin money is held as a TDR with a 3-year lock-in, and working-capital financing capitalised into project cost is capped at 40% manufacturing / 60% service. Several government mirror sites still publish superseded, lower caps (₹25 lakh / ₹10 lakh) — the ₹50 lakh / ₹20 lakh figures above are corroborated across multiple current sources, but kviconline.gov.in itself was unreachable when last checked — confirm there directly before a large claim.",
  },
  {
    slug: "cgtmse",
    name: "Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE)",
    category: "central-scheme",
    body: "SIDBI + Ministry of MSME",
    benefit: "Credit guarantee on collateral-free lending to micro and small enterprises. Confirmed cover (effective for guarantees approved on/after 1 April 2025): Micro enterprises 85% up to ₹5 lakh, 75% from ₹5 lakh–₹10cr; a flat 90% for women entrepreneurs and MSEs promoted by Agniveers; a flat 85% for SC/ST, PwD, aspirational-district, ZED-certified and transgender-owned units; 80% flat for NER/J&K/Ladakh; 75% flat for all other borrowers. A further +5% applies in RBI-identified credit-deficient districts.",
    ceiling: "₹10 crore (raised from ₹5cr, effective for guarantees approved on/after 18 March 2025).",
    eligibility: "Micro and small enterprises in manufacturing and services; retail trade within limits. Not medium/large enterprises, not consumption loans.",
    route: "Through the lending bank (Member Lending Institution).",
    watchOutFor: "Annual Guarantee Fee scales from 0.37% to 1.20% depending on loan size, with concessions for women, SC/ST, PwD and other categories. 18-month lock-in applies. Source: CGTMSE Scheme Document CGS-I (updated 1 April 2025) and Circular No. 250/2024-25, cgtmse.in — confirmed directly from the primary documents.",
  },
  {
    slug: "mudra",
    name: "PM Mudra Yojana",
    category: "central-scheme",
    body: "MUDRA Ltd (SIDBI) — refinancer, does not lend directly",
    benefit: "Four tiers: Shishu up to ₹50,000, Kishore ₹50,000–5 lakh, Tarun ₹5–10 lakh, Tarun Plus ₹10–20 lakh.",
    ceiling: "₹20 lakh (Tarun Plus).",
    eligibility: "Non-corporate, non-farm micro/small enterprise. Tarun Plus additionally requires a previously availed and successfully repaid Tarun loan.",
    route: "Any bank, RRB, Small Finance Bank, NBFC or MFI, or via udyamimitra.in / Jan Samarth.",
    watchOutFor: "Collateral-free, guaranteed under CGFMU. Tarun Plus is a relatively recent addition (effective 24 October 2024) — confirm live terms.",
  },
  {
    slug: "pm-vishwakarma",
    name: "PM Vishwakarma",
    category: "central-scheme",
    body: "Ministry of MSME + MSDE + DFS",
    benefit: "Certificate and ID card, skill training with a ₹500/day stipend, a ₹15,000 toolkit incentive, and concessional credit — ₹1 lakh for 18 months then ₹2 lakh for 30 months at a fixed 5% rate.",
    ceiling: "₹3 lakh credit across two tranches.",
    eligibility: "Indian resident artisan/craftsperson aged 18+ in one of 18 notified trades. Must not have already availed PMEGP, PM SVANidhi or Mudra.",
    route: "pmvishwakarma.gov.in via a Common Service Centre → Gram Panchayat/ULB → District Implementation Committee → Screening Committee.",
    watchOutFor: "The exact lookback window on the prior-scheme exclusion, the one-member-per-family rule, and the government-employee bar could not be confirmed from an official source at time of writing — verify before advising a client on eligibility.",
  },
  {
    slug: "stand-up-india",
    name: "Stand-Up India",
    category: "central-scheme",
    body: "Department of Financial Services",
    benefit: "Composite term loan plus working capital. Margin 15%, of which the borrower must bring a minimum 10% of project cost. Repayment up to 7 years with a moratorium of up to 18 months. ⚠ Status genuinely unclear at time of writing — see Watch out for.",
    ceiling: "₹10 lakh to ₹100 lakh under the scheme as currently live on its own portal. Financial-press reports describe a government announcement (March 2026) of a \"revamped\" version reportedly doubling the ceiling to ₹2 crore for women/SC/ST entrepreneurs — but no confirmed guideline for that revamp was found.",
    eligibility: "SC/ST and/or woman entrepreneur aged 18+. For non-individual entities, 51%+ shareholding and controlling stake held by an eligible category. Greenfield ventures only.",
    route: "Any Scheduled Commercial Bank branch, or standupmitra.in.",
    watchOutFor: "Do not present this scheme to a client as simply \"active and unchanged.\" Financial press (citing government statements) reported the original scheme concluded 31 March 2025 and that a revamped version was being prepared — yet standupmitra.in, the scheme's own official portal, still operates as if nothing changed, with no notice of expiry or relaunch. This is a live conflict between the official portal and press reporting, not yet resolved by a DFS circular either way — confirm current status with the bank branch before quoting terms to a client. Every bank branch is mandated to fund at least one SC/ST and one woman borrower under the scheme as it has run to date. Security is via CGFSIL.",
  },
  {
    slug: "pmfme",
    name: "PM Formalisation of Micro Food Processing Enterprises (PMFME)",
    category: "central-scheme",
    body: "Ministry of Food Processing Industries, 60:40 Centre:State, DIC at district level",
    benefit: "Credit-linked subsidy of 35% of eligible project cost for individual micro food enterprises. SHG seed capital ₹40,000 per member, group support up to ₹4 lakh.",
    ceiling: "₹10 lakh per individual unit.",
    eligibility: "Micro food-processing enterprises — new units or upgradation of an existing one.",
    route: "District DIC.",
    watchOutFor: "Runs alongside the state Food Processing Policy — check the differential-claim rule (no double-claiming the same head) before advising a client to claim both.",
  },
];
