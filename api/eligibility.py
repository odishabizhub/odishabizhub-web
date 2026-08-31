"""
POST /api/eligibility

Mirrors Plan/Odisha_MSME_Subsidy_Matrix.xlsx's "Eligibility Calculator" sheet:
computes Capital Investment Subsidy under the three competing Odisha policies,
names the best route, and screens the activity against the negative list.
Returns an indicative figure only — never a promise of sanction or amount.
"""

import json
from http.server import BaseHTTPRequestHandler

from _shared_data import (
    POLICIES,
    BACKWARD_MSME_FOODPROC,
    BACKWARD_IPR,
    BIJU_ECONOMIC_CORRIDOR,
    NEGATIVE_LIST,
    SERVICE_SECTOR_EXCEPTIONS,
)


def format_inr(amount):
    """Indian digit grouping (1,00,00,000), matching the frontend's en-IN formatting."""
    amount = int(round(amount))
    s = str(abs(amount))
    if len(s) <= 3:
        grouped = s
    else:
        head, tail = s[:-3], s[-3:]
        parts = []
        while len(head) > 2:
            parts.insert(0, head[-2:])
            head = head[:-2]
        if head:
            parts.insert(0, head)
        grouped = ",".join(parts) + "," + tail
    return ("-₹" if amount < 0 else "₹") + grouped


def check_negative_list(activity_text, investment):
    activity_lower = (activity_text or "").lower()

    for entry in NEGATIVE_LIST:
        if any(kw in activity_lower for kw in entry["keywords"]):
            eligible_above = entry["eligible_above"]
            if eligible_above is not None and investment >= eligible_above:
                return {
                    "blocked": False,
                    "matched": entry["activity"],
                    "note": f"Matches the negative list ({entry['activity']}), but your investment clears the "
                            f"{format_inr(eligible_above)} threshold that makes it eligible.",
                }
            note = entry.get("exception_note", "")
            return {
                "blocked": True,
                "matched": entry["activity"],
                "note": (
                    f"'{entry['activity']}' is on Odisha's negative list for MSME incentives. "
                    + (f"{note}. " if note else "")
                    + (
                        f"Eligible only above {format_inr(eligible_above)} investment — yours is below that."
                        if eligible_above is not None
                        else "No investment threshold cures this exclusion."
                    )
                ),
            }

    # Service-sector activities are excluded as a class unless specifically named.
    for entry in SERVICE_SECTOR_EXCEPTIONS:
        if any(kw in activity_lower for kw in entry["keywords"]):
            if investment >= entry["eligible_above"]:
                return {"blocked": False, "matched": entry["activity"], "note": None}
            return {
                "blocked": True,
                "matched": entry["activity"],
                "note": f"'{entry['activity']}' is a service-sector exception eligible only above "
                        f"{format_inr(entry['eligible_above'])} — yours is below that.",
            }

    return {"blocked": False, "matched": None, "note": None}


def compute_msme_2022(pm_investment, civil_works, reserved, backward_or_idco_or_biju, environmental):
    p = POLICIES["msme2022"]
    if pm_investment > p["cis_available_above_pm"]:
        return {
            "policy": p["name"],
            "baseRate": None,
            "baseSubsidy": 0,
            "topUps": 0,
            "total": 0,
            "note": "P&M investment exceeds ₹10cr — confirmed nil under this policy above that level "
                    "(clause 7.3.1 caps CIS at ₹10cr; see caveat). Check the IPR 2022 route instead.",
        }
    rate = p["base_rate_reserved"] if reserved else p["base_rate_general"]
    cap = p["cap_reserved"] if reserved else p["cap_general"]
    base_subsidy = min(pm_investment * rate, cap)

    topups = 0
    topup_notes = []
    if backward_or_idco_or_biju:
        topups += min(pm_investment * p["location_topup_rate"], p["location_topup_cap"])
        topup_notes.append("+5% location top-up (backward district / IDCO estate / Biju corridor)")
    if environmental:
        topups += min((pm_investment + civil_works) * p["environmental_topup_rate"], p["environmental_topup_cap"])
        topup_notes.append("+5% environmental-measures top-up")

    return {
        "policy": p["name"],
        "baseRate": rate,
        "baseSubsidy": round(base_subsidy),
        "topUps": round(topups),
        "total": round(base_subsidy + topups),
        "note": "; ".join(topup_notes) if topup_notes else None,
    }


def compute_food_processing_2022(pm_investment, reserved, backward, is_food_processing):
    p = POLICIES["foodProcessing2022"]
    if not is_food_processing:
        return {"policy": p["name"], "baseRate": None, "baseSubsidy": 0, "topUps": 0, "total": 0,
                "note": "Not applicable — activity was not marked as food processing."}
    if pm_investment > p["cis_available_above_pm"]:
        return {"policy": p["name"], "baseRate": None, "baseSubsidy": 0, "topUps": 0, "total": 0,
                "note": "P&M investment exceeds the ₹50cr ceiling for this policy."}

    rate = p["base_rate_reserved"] if reserved else p["base_rate_general"]
    cap = p["cap_reserved"] if reserved else p["cap_general"]
    base_subsidy = min(pm_investment * rate, cap)

    topups = 0
    note = None
    if backward:
        topups = min(pm_investment * p["location_topup_rate"], p["location_topup_cap"])
        note = "+5% location top-up (backward district / designated industrial area)"

    return {
        "policy": p["name"],
        "baseRate": rate,
        "baseSubsidy": round(base_subsidy),
        "topUps": round(topups),
        "total": round(base_subsidy + topups),
        "note": note,
    }


def compute_ipr_2022(pm_investment, ipr_sector_status):
    p = POLICIES["ipr2022"]
    if ipr_sector_status not in ("priority", "thrust"):
        return {"policy": p["name"], "baseRate": None, "baseSubsidy": 0, "topUps": 0, "total": 0,
                "note": "Not applicable — activity is not in a notified IPR 2022 Priority or Thrust sector."}
    rate = p["thrust_rate"] if ipr_sector_status == "thrust" else p["priority_rate"]
    total = pm_investment * rate
    return {
        "policy": p["name"],
        "baseRate": rate,
        "baseSubsidy": round(total),
        "topUps": 0,
        "total": round(total),
        "note": "Uncapped per the policy text (unverified). Disbursed over 5 years, not as a lump sum.",
    }


def handle_calculation(body):
    pm_investment = float(body.get("pmInvestment") or 0)
    civil_works = float(body.get("civilWorks") or 0)
    district = body.get("district") or ""
    idco_estate = bool(body.get("idcoEstate"))
    reserved = bool(body.get("reservedCategory"))
    stake_pct = float(body.get("stakePct") or 0)
    environmental = bool(body.get("environmentalMeasures"))
    is_food_processing = bool(body.get("isFoodProcessing"))
    ipr_sector_status = body.get("iprSectorStatus") or "none"
    activity = body.get("activity") or ""

    # Reserved-category rate requires 51%+ stake per the source workbook.
    reserved_effective = reserved and stake_pct >= 51

    negative_list_result = check_negative_list(activity, pm_investment)

    backward_msme = district in BACKWARD_MSME_FOODPROC
    backward_biju = district in BIJU_ECONOMIC_CORRIDOR
    backward_ipr = district in BACKWARD_IPR

    msme_route = compute_msme_2022(
        pm_investment, civil_works, reserved_effective,
        backward_msme or idco_estate or backward_biju, environmental,
    )
    food_route = compute_food_processing_2022(pm_investment, reserved_effective, backward_msme, is_food_processing)
    ipr_route = compute_ipr_2022(pm_investment, ipr_sector_status)

    routes = [msme_route, food_route, ipr_route]
    recommended = max(routes, key=lambda r: r["total"])

    caveats = [POLICIES["msme2022"]["caveat"], POLICIES["foodProcessing2022"]["caveat"], POLICIES["ipr2022"]["caveat"]]

    return {
        "negativeList": negative_list_result,
        "routes": routes,
        "recommended": None if negative_list_result["blocked"] else recommended,
        "caveats": caveats,
        "districtFlags": {
            "backwardMsmeFoodProc": backward_msme,
            "backwardIpr": backward_ipr,
            "bijuEconomicCorridor": backward_biju,
        },
        "disclaimer": (
            "This is an indicative figure only, based on published Odisha policy documents. "
            "It is not a guarantee of eligibility, sanction, or subsidy amount, and does not "
            "constitute an approval opinion. Several figures in the underlying policy matrix "
            "are themselves flagged unverified — see caveats."
        ),
    }


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            length = int(self.headers.get("Content-Length", 0))
            raw = self.rfile.read(length) if length else b"{}"
            body = json.loads(raw or b"{}")
            result = handle_calculation(body)
            self._send(200, result)
        except Exception as exc:  # noqa: BLE001
            self._send(400, {"error": str(exc)})

    def do_OPTIONS(self):
        self.send_response(204)
        self._cors_headers()
        self.end_headers()

    def _send(self, status, payload):
        self.send_response(status)
        self._cors_headers()
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(payload).encode("utf-8"))

    def _cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
