"""
Transcribed from Plan/Odisha_MSME_Subsidy_Matrix.xlsx (compiled August 2026),
then cross-checked against primary sources — see each caveat for citations.
Kept in sync by hand with lib/subsidy-data.ts — the two must agree because the
TypeScript file drives the scheme/sector pages and this file drives the
eligibility calculator. If you change a figure here, change it there too.
"""

POLICIES = {
    "msme2022": {
        "name": "Odisha MSME Development Policy 2022",
        "base_rate_general": 0.25,
        "base_rate_reserved": 0.30,
        "cap_general": 2_00_00_000,
        "cap_reserved": 2_50_00_000,
        "location_topup_rate": 0.05,
        "location_topup_cap": 20_00_000,
        "environmental_topup_rate": 0.05,
        "environmental_topup_cap": 25_00_000,
        # Confirmed against the policy text (clause 7.3.1): CIS stops at ₹10cr P&M.
        "cis_available_above_pm": 10_00_00_000,
        "caveat": (
            "Confirmed against the policy text: Capital Investment Subsidy under "
            "this policy is capped at ₹10cr of plant & machinery (clause 7.3.1) — "
            "not available for the ₹10cr–₹50cr band, with one narrow exception for "
            "new E-Vehicle component/charging-infrastructure manufacturers (30%, "
            "capped at ₹3cr, up to ₹50cr — not modelled here). Source: Odisha MSME "
            "Development Policy 2022, msme.odisha.gov.in (consolidated to "
            "31.12.2023). Whether the location and environmental top-ups can be "
            "claimed together is still unconfirmed."
        ),
    },
    "foodProcessing2022": {
        "name": "Odisha Food Processing Policy 2022",
        "base_rate_general": 0.30,
        "base_rate_reserved": 0.35,
        "cap_general": 3_50_00_000,
        "cap_reserved": 4_00_00_000,
        "location_topup_rate": 0.05,
        "location_topup_cap": 50_00_000,
        "cis_available_above_pm": 50_00_00_000,
        "caveat": (
            "For any food-processing unit, this policy beats the MSME Policy at "
            "every investment level. There is no scenario where a food-processing "
            "unit should be routed to the MSME Policy for Capital Investment "
            "Subsidy."
        ),
    },
    "ipr2022": {
        "name": "Odisha IPR 2022 (Priority / Thrust sector)",
        "priority_rate": 0.20,
        "thrust_rate": 0.30,
        "cap_general": None,  # no cap stated in the policy text — unverified
        "cis_available_above_pm": None,
        "caveat": (
            "Confirmed uncapped: IPICOL's official policy portal states this "
            "subsidy applies 'without any upper limit,' and the full IPR 2022 "
            "policy text contains no capping language in this clause. Source: "
            "investodisha.gov.in, Industrial Policy Resolution 2022. One residual "
            "gap: the operational guideline (og_cis_ipr_2022.pdf) is a scanned, "
            "un-OCR'd document that could add an implementation-level cap not in "
            "the headline policy — worth a manual check before a large claim. "
            "Disbursed 4% p.a. (Priority) or 6% p.a. (Thrust) over 5 years from "
            "commercial production, not as a lump sum — model as an annual "
            "inflow, not day-one funding."
        ),
    },
}

BACKWARD_MSME_FOODPROC = {
    "Bolangir", "Gajapati", "Kalahandi", "Kandhamal", "Koraput",
    "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nuapada", "Rayagada",
    "Subarnapur",
}

BACKWARD_IPR = BACKWARD_MSME_FOODPROC | {"Boudh", "Nayagarh", "Deogarh", "Kendrapada"}

BIJU_ECONOMIC_CORRIDOR = {
    "Bolangir", "Kalahandi", "Koraput", "Malkangiri", "Nabarangpur",
    "Nuapada", "Sundergarh", "Jharsuguda", "Sambalpur", "Bargarh",
}

# activity keyword (lowercase, matched as substring) -> negative list entry
NEGATIVE_LIST = [
    {"keywords": ["rice hull", "rice mill"], "activity": "Rice hullers and rice mills", "eligible_above": 10_00_00_000},
    {"keywords": ["flour mill", "besan mill"], "activity": "Flour mills / besan mills", "eligible_above": 1_00_00_000},
    {"keywords": ["oil mill", "edible oil", "non-edible oil"], "activity": "Edible and non-edible oil mills", "eligible_above": None},
    {"keywords": ["mixture", "bhujia"], "activity": "Mixture / bhujia units", "eligible_above": None},
    {"keywords": ["ice candy"], "activity": "Ice candy units", "eligible_above": None},
    {"keywords": ["betel nut", "betel-nut"], "activity": "Betel nut processing", "eligible_above": None},
    {"keywords": ["hatchery", "piggery", "broiler", "rabbit farm"], "activity": "Hatcheries, piggeries, broiler and rabbit farming", "eligible_above": None},
    {"keywords": ["sponge iron"], "activity": "Standalone sponge iron", "eligible_above": None},
    {"keywords": ["scrap process", "de-coiling", "coiling", "rolling mill"], "activity": "Iron/steel coiling, de-coiling, scrap processing, integrated rolling", "eligible_above": None},
    {"keywords": ["stone crush"], "activity": "Stone crushing", "eligible_above": None},
    {"keywords": ["coal screening", "coal washing", "briquett"], "activity": "Coal screening, washing, briquetting", "eligible_above": None},
    {"keywords": ["firewood", "charcoal"], "activity": "Firewood and charcoal", "eligible_above": None},
    {"keywords": ["cracker"], "activity": "Crackers", "eligible_above": None},
    {"keywords": ["tyre retread"], "activity": "Tyre retreading", "eligible_above": None},
    {"keywords": ["spray paint", "painting"], "activity": "Painting and spray painting", "eligible_above": None},
    {"keywords": ["fertiliser mixing", "fertilizer mixing"], "activity": "Physical mixing of fertilisers", "eligible_above": None},
    {"keywords": ["brick"], "activity": "Brick making", "eligible_above": None, "exception_note": "Exception: refractory bricks, and fly-ash / red-mud composite bricks with ≥25% content"},
    {"keywords": ["tarpaulin"], "activity": "Tarpaulin", "eligible_above": 20_00_000},
    {"keywords": ["saw mill", "sawmill"], "activity": "Saw mills", "eligible_above": None},
    {"keywords": ["carpentry", "wooden furniture"], "activity": "Carpentry and wooden furniture", "eligible_above": 1_00_00_000},
    {"keywords": ["drilling rig", "bore-well", "borewell"], "activity": "Drilling rigs and bore-wells", "eligible_above": None},
    {"keywords": ["tea blending", "tea packaging"], "activity": "Tea blending and packaging", "eligible_above": None},
    {"keywords": ["gudakhu", "tobacco cutting"], "activity": "Raw tobacco cutting / gudakhu", "eligible_above": None},
    {"keywords": ["book binding", "rubber stamp"], "activity": "Book binding and rubber stamps", "eligible_above": 50_00_000},
    {"keywords": ["distilled water"], "activity": "Distilled water", "eligible_above": None},
    {"keywords": ["tailoring"], "activity": "Tailoring", "eligible_above": None, "exception_note": "Exception: readymade garment manufacture is eligible"},
    {"keywords": ["re-packaging", "repackaging"], "activity": "Re-packaging units", "eligible_above": None},
    {"keywords": ["oil-seed pre-process", "oilseed pre-process"], "activity": "Oil-seed pre-processing", "eligible_above": None},
    {"keywords": ["liquor", "imfl", "bottling"], "activity": "Liquor and IMFL bottling", "eligible_above": None},
    {"keywords": ["grinding", "size-reduction"], "activity": "Size-reduction grinding / mixing", "eligible_above": 10_00_00_000, "exception_note": "Exception: cement clinker grinding"},
    {"keywords": ["single-use plastic", "plastic recycl"], "activity": "Single-use plastic under 120 microns; plastic recycling", "eligible_above": None},
    {"keywords": ["woven sack"], "activity": "Woven sack stitching and printing", "eligible_above": None},
    {"keywords": ["packaged drinking water", "mineral water"], "activity": "Packaged drinking / mineral water", "eligible_above": None},
    {"keywords": ["soft drink", "carbonated"], "activity": "Soft drinks and carbonated beverages", "eligible_above": None, "exception_note": "Exception: fruit pulp units at ₹1cr and above"},
    {"keywords": ["asbestos"], "activity": "Asbestos-based products", "eligible_above": None},
]

SERVICE_SECTOR_EXCEPTIONS = [
    {"keywords": ["repair workshop"], "activity": "General repair workshops (powered)", "eligible_above": 50_00_000},
    {"keywords": ["vehicle scrapping"], "activity": "Registered Vehicle Scrapping Facilities", "eligible_above": 0},
    {"keywords": ["cold storage", "seafood freez", "cold chain"], "activity": "Cold storage / seafood freezing", "eligible_above": 25_00_000},
    {"keywords": ["electronics repair", "software", "it service"], "activity": "Electronics repair, software and IT services", "eligible_above": 25_00_000},
    {"keywords": ["technology lab", "r&d", "research"], "activity": "Technology labs and R&D", "eligible_above": 25_00_000},
    {"keywords": ["printing press", "printing"], "activity": "Printing press", "eligible_above": 50_00_000},
    {"keywords": ["laundry", "dry clean"], "activity": "Laundry and dry cleaning", "eligible_above": 25_00_000},
    {"keywords": ["medical oxygen"], "activity": "Medical oxygen refilling", "eligible_above": 0},
]
