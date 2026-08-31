"use client";

import { useState } from "react";
import { ALL_ODISHA_DISTRICTS, SECTORS } from "@/lib/subsidy-data";

const CATEGORY_OPTIONS = [
  { value: "general", label: "General", reserved: false },
  { value: "sc", label: "SC", reserved: true },
  { value: "st", label: "ST", reserved: true },
  { value: "woman", label: "Woman", reserved: true },
  { value: "pwd", label: "PwD", reserved: true },
  { value: "technical", label: "Technical (Degree / Diploma holder)", reserved: true },
  { value: "obc", label: "OBC", reserved: false },
  { value: "ex-serviceman", label: "Ex-serviceman", reserved: false },
  { value: "transgender", label: "Transgender", reserved: false },
] as const;

const ENTITY_TYPES = ["Proprietorship", "Partnership", "LLP", "Private Limited", "OPC"];

// Editable defaults per sector — the spec's own design rule: pre-fill, then let the client adjust.
const SECTOR_DEFAULTS: Record<
  string,
  { isFoodProcessing: boolean; iprSectorStatus: "none" | "priority" | "thrust"; focusSectorTopup: boolean }
> = {
  "agro-and-food-processing": { isFoodProcessing: true, iprSectorStatus: "priority", focusSectorTopup: false },
  "handicrafts-and-handloom": { isFoodProcessing: false, iprSectorStatus: "priority", focusSectorTopup: false },
  "engineering-and-fabrication": { isFoodProcessing: false, iprSectorStatus: "none", focusSectorTopup: false },
  "cold-chain": { isFoodProcessing: false, iprSectorStatus: "priority", focusSectorTopup: false },
  "plastics-and-polymers": { isFoodProcessing: false, iprSectorStatus: "none", focusSectorTopup: true },
  "fishery-and-marine": { isFoodProcessing: true, iprSectorStatus: "none", focusSectorTopup: false },
  "textiles-and-apparel": { isFoodProcessing: false, iprSectorStatus: "thrust", focusSectorTopup: true },
  "tourism-and-hospitality": { isFoodProcessing: false, iprSectorStatus: "priority", focusSectorTopup: false },
};

interface RouteResult {
  policy: string;
  baseRate: number | null;
  baseSubsidy: number;
  topUps: number;
  total: number;
  note: string | null;
}

interface EligibilityResult {
  negativeList: { blocked: boolean; matched: string | null; note: string | null };
  routes: RouteResult[];
  recommended: RouteResult | null;
  caveats: string[];
  districtFlags: Record<string, boolean>;
  disclaimer: string;
}

function formatRupees(value: number) {
  if (!value) return "₹0";
  return "₹" + Math.round(value).toLocaleString("en-IN");
}

export default function EligibilityForm() {
  const [district, setDistrict] = useState<string>(ALL_ODISHA_DISTRICTS[0]);
  const [sectorSlug, setSectorSlug] = useState(SECTORS[0].slug);
  const [activity, setActivity] = useState("");
  const [pmInvestment, setPmInvestment] = useState("2500000");
  const [civilWorks, setCivilWorks] = useState("500000");
  const [category, setCategory] = useState<(typeof CATEGORY_OPTIONS)[number]["value"]>("general");
  const [stakePct, setStakePct] = useState("51");
  const [idcoEstate, setIdcoEstate] = useState(false);
  const [environmentalMeasures, setEnvironmentalMeasures] = useState(false);
  const [entityType, setEntityType] = useState(ENTITY_TYPES[0]);
  const [isNewUnit, setIsNewUnit] = useState(true);

  const defaults = SECTOR_DEFAULTS[sectorSlug];
  const [isFoodProcessing, setIsFoodProcessing] = useState(defaults.isFoodProcessing);
  const [iprSectorStatus, setIprSectorStatus] = useState(defaults.iprSectorStatus);
  const [focusSectorTopup, setFocusSectorTopup] = useState(defaults.focusSectorTopup);

  const [result, setResult] = useState<EligibilityResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [leadStatus, setLeadStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const categoryInfo = CATEGORY_OPTIONS.find((c) => c.value === category)!;

  function onSectorChange(slug: string) {
    setSectorSlug(slug);
    const d = SECTOR_DEFAULTS[slug];
    setIsFoodProcessing(d.isFoodProcessing);
    setIprSectorStatus(d.iprSectorStatus);
    setFocusSectorTopup(d.focusSectorTopup);
  }

  const answers = {
    district,
    sectorSlug,
    activity,
    pmInvestment: Number(pmInvestment) || 0,
    civilWorks: Number(civilWorks) || 0,
    category,
    stakePct: Number(stakePct) || 0,
    idcoEstate,
    environmentalMeasures,
    isFoodProcessing,
    iprSectorStatus,
    focusSectorTopup,
    entityType,
    isNewUnit,
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/eligibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pmInvestment: answers.pmInvestment,
          civilWorks: answers.civilWorks,
          district: answers.district,
          idcoEstate: answers.idcoEstate || answers.focusSectorTopup,
          reservedCategory: categoryInfo.reserved,
          stakePct: answers.stakePct,
          environmentalMeasures: answers.environmentalMeasures,
          isFoodProcessing: answers.isFoodProcessing,
          iprSectorStatus: answers.iprSectorStatus,
          activity: answers.activity || sectorSlug,
        }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const data: EligibilityResult = await res.json();
      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? `${err.message}. If you're running this locally, the Python API needs "vercel dev", not "next dev" — see README.`
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleLeadSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLeadStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "eligibility-checker", answers, result }),
      });
      if (!res.ok) throw new Error();
      setLeadStatus("sent");
    } catch {
      setLeadStatus("error");
    }
  }

  return (
    <div className="mt-10">
      <form onSubmit={handleSubmit} className="space-y-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
        <fieldset className="space-y-4">
          <legend className="font-display text-lg font-semibold text-ink">1. Project and location</legend>
          <Field label="District">
            <select value={district} onChange={(e) => setDistrict(e.target.value)} className={selectClass}>
              {ALL_ODISHA_DISTRICTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </Field>
          <Field label="Sector">
            <select value={sectorSlug} onChange={(e) => onSectorChange(e.target.value)} className={selectClass}>
              {SECTORS.map((s) => (
                <option key={s.slug} value={s.slug}>{s.name}</option>
              ))}
            </select>
          </Field>
          <Field label="Specific product or activity" hint="e.g. cashew kernel processing, readymade garments, rice mill — used to screen the negative list">
            <input
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              placeholder="e.g. cashew kernel processing"
              className={inputClass}
            />
          </Field>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="font-display text-lg font-semibold text-ink">2. Investment</legend>
          <Field label="Investment in plant &amp; machinery (₹)">
            <input type="number" min={0} value={pmInvestment} onChange={(e) => setPmInvestment(e.target.value)} className={inputClass} />
          </Field>
          <Field label="Investment in eligible civil works (₹)">
            <input type="number" min={0} value={civilWorks} onChange={(e) => setCivilWorks(e.target.value)} className={inputClass} />
          </Field>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="font-display text-lg font-semibold text-ink">3. Promoter category</legend>
          <Field label="Category of promoter">
            <select value={category} onChange={(e) => setCategory(e.target.value as typeof category)} className={selectClass}>
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </Field>
          {categoryInfo.reserved && (
            <Field label="Stake held by that category (%)" hint="Below 51% the enhanced rate does not apply">
              <input type="number" min={0} max={100} value={stakePct} onChange={(e) => setStakePct(e.target.value)} className={inputClass} />
            </Field>
          )}
          {!categoryInfo.reserved && category !== "general" && (
            <p className="prose-note">
              {categoryInfo.label} does not carry the higher reserved-category Capital Investment
              Subsidy rate under the Odisha MSME or Food Processing Policies (only SC / ST / Woman /
              PwD / Technical do) — though it may open other routes, such as PMEGP&apos;s special
              category. See the{" "}
              <a href="/schemes/pmegp" className="underline">PMEGP page</a>.
            </p>
          )}
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="font-display text-lg font-semibold text-ink">4. A few more details, for an accurate figure</legend>
          <p className="text-sm text-ink/60">
            Pre-filled from your sector — check and adjust if your project is different.
          </p>
          <Toggle label="Located in an IDCO industrial estate?" checked={idcoEstate} onChange={setIdcoEstate} />
          <Toggle label="Environmental / non-polluting measures installed?" checked={environmentalMeasures} onChange={setEnvironmentalMeasures} />
          <Toggle label="Is this a food-processing activity?" checked={isFoodProcessing} onChange={setIsFoodProcessing} />
          <Toggle label="Qualifies as an MSME Policy 'focus sector'?" checked={focusSectorTopup} onChange={setFocusSectorTopup} />
          <Field label="IPR 2022 sector status">
            <select value={iprSectorStatus} onChange={(e) => setIprSectorStatus(e.target.value as typeof iprSectorStatus)} className={selectClass}>
              <option value="none">None</option>
              <option value="priority">Priority sector</option>
              <option value="thrust">Thrust sector</option>
            </select>
          </Field>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="font-display text-lg font-semibold text-ink">5. A little about the venture</legend>
          <Field label="Constitution">
            <select value={entityType} onChange={(e) => setEntityType(e.target.value)} className={selectClass}>
              {ENTITY_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </Field>
          <Toggle label="New unit (unchecked = expansion of an existing business)" checked={isNewUnit} onChange={setIsNewUnit} />
        </fieldset>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-brand-600 px-6 py-3 text-base font-semibold text-white shadow-md shadow-brand-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-lg disabled:translate-y-0 disabled:opacity-60"
        >
          {loading ? "Calculating…" : "Check eligibility"}
        </button>
        {error && <p className="text-sm text-red-700">{error}</p>}
      </form>

      {result && <ResultPanel result={result} />}

      {result && (
        <form onSubmit={handleLeadSubmit} className="mt-6 rounded-xl border border-brand-200 bg-brand-50 p-6">
          <p className="font-medium text-ink">Want this sent to you, with next steps for your project?</p>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${inputClass} sm:flex-1`}
            />
            <button
              type="submit"
              disabled={leadStatus === "sending"}
              className="rounded-md bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-ink/90 disabled:opacity-60"
            >
              {leadStatus === "sending" ? "Sending…" : "Email me this"}
            </button>
          </div>
          {leadStatus === "sent" && (
            <p className="mt-2 text-sm text-brand-700">Thanks — we&apos;ll be in touch.</p>
          )}
          {leadStatus === "error" && (
            <p className="mt-2 text-sm text-red-700">
              Couldn&apos;t save that just now. If you&apos;re running this locally, check
              DATABASE_URL is set (see README).
            </p>
          )}
        </form>
      )}
    </div>
  );
}

function ResultPanel({ result }: { result: EligibilityResult }) {
  if (result.negativeList.blocked) {
    return (
      <div className="mt-8 rounded-xl border border-red-300 bg-red-50 p-6">
        <p className="font-semibold text-red-900">This activity does not currently qualify</p>
        <p className="mt-2 text-red-900/80">{result.negativeList.note}</p>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-xl border border-brand-200 bg-white p-6">
      <p className="font-semibold text-ink">Indicative result</p>
      {result.negativeList.matched && (
        <p className="prose-note mt-3">{result.negativeList.note}</p>
      )}

      {result.recommended && (
        <div className="mt-4 rounded-lg bg-brand-50 p-5">
          <p className="text-sm font-medium text-brand-700">Recommended route</p>
          <p className="mt-1 text-xl font-semibold text-ink">{result.recommended.policy}</p>
          <p className="mt-1 text-3xl font-bold text-brand-700">{formatRupees(result.recommended.total)}</p>
          {result.recommended.note && (
            <p className="mt-2 text-sm text-ink/70">{result.recommended.note}</p>
          )}
        </div>
      )}

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead className="text-ink/60">
            <tr>
              <th className="py-2 pr-4 font-medium">Policy route</th>
              <th className="py-2 pr-4 font-medium">Base rate</th>
              <th className="py-2 pr-4 font-medium">Base subsidy</th>
              <th className="py-2 pr-4 font-medium">Top-ups</th>
              <th className="py-2 font-medium">Total claimable</th>
            </tr>
          </thead>
          <tbody>
            {result.routes.map((route) => (
              <tr key={route.policy} className="border-t border-brand-50">
                <td className="py-2 pr-4 text-ink">{route.policy}</td>
                <td className="py-2 pr-4 text-ink/70">{route.baseRate ? `${Math.round(route.baseRate * 100)}%` : "—"}</td>
                <td className="py-2 pr-4 text-ink/70">{formatRupees(route.baseSubsidy)}</td>
                <td className="py-2 pr-4 text-ink/70">{formatRupees(route.topUps)}</td>
                <td className="py-2 font-medium text-ink">{formatRupees(route.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <details className="mt-6">
        <summary className="cursor-pointer text-sm font-medium text-brand-700">
          What this figure doesn&apos;t account for yet
        </summary>
        <ul className="mt-3 space-y-2 text-sm text-ink/70">
          {result.caveats.map((c) => (
            <li key={c} className="prose-note">{c}</li>
          ))}
        </ul>
      </details>

      <p className="mt-6 text-xs text-ink/50">{result.disclaimer}</p>
    </div>
  );
}

const inputClass =
  "w-full rounded-md border border-brand-200 bg-white px-3 py-2 text-sm text-ink focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500";
const selectClass = inputClass;

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      {hint && <span className="mt-0.5 block text-xs text-ink/50">{hint}</span>}
      <div className="mt-1">{children}</div>
    </label>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3 text-sm text-ink">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-brand-300 text-brand-600 focus:ring-brand-500"
      />
      {label}
    </label>
  );
}
