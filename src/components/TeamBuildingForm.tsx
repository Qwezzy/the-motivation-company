"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import {
  consentLabel,
  lengths,
  normalise,
  privacyNotice,
  styles,
  teamNeeds,
  teamSizes,
  validate,
  type FieldErrors,
} from "@/lib/teamBuilding";

/** Empty on Vercel (same origin). Set for the static Xneelo export so the form posts to the Vercel API. */
const API_BASE = (process.env.NEXT_PUBLIC_API_BASE || "").replace(/\/$/, "");

type Status = "idle" | "sending" | "sent" | "error";

const inputCls =
  "mt-1 block w-full rounded-xl border border-navy/20 bg-white px-4 py-3 text-base text-navy shadow-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/60";
const labelCls = "block text-sm font-semibold text-navy";

function Err({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p id={id} className="mt-1 text-sm font-medium text-red-700" role="alert">
      {msg}
    </p>
  );
}

function Choice({
  name,
  type,
  value,
  checked,
  onChange,
}: {
  name: string;
  type: "radio" | "checkbox";
  value: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition ${
        checked ? "border-gold bg-gold/15 text-navy" : "border-navy/15 bg-white text-navy/80 hover:border-gold/60"
      }`}
    >
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-[#232A60]"
      />
      <span>{value}</span>
    </label>
  );
}

export default function TeamBuildingForm() {
  const [f, setF] = useState({
    name: "",
    organisation: "",
    email: "",
    phone: "",
    teamSize: "",
    needs: [] as string[],
    length: "",
    style: "",
    when: "",
    area: "",
    notes: "",
    consent: false,
    website: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const set = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) =>
    setF((p) => ({ ...p, [k]: v }));
  const toggleNeed = (n: string) =>
    set("needs", f.needs.includes(n) ? f.needs.filter((x) => x !== n) : [...f.needs, n]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(normalise(f));
    setErrors(errs);
    if (Object.keys(errs).length) {
      setStatus("idle");
      const first = Object.keys(errs)[0];
      document.getElementById(`tb-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(`${API_BASE}/api/team-building`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(f),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        sent?: boolean;
        error?: string;
        errors?: FieldErrors;
        downloadUrl?: string;
      };
      if (res.ok && data.ok && data.sent && data.downloadUrl) {
        setDownloadUrl(
          /^https?:\/\//.test(data.downloadUrl) ? data.downloadUrl : `${API_BASE}${data.downloadUrl}`,
        );
        setStatus("sent");
        return;
      }
      if (data.errors) setErrors(data.errors);
      setErrorMsg(
        res.status === 429
          ? "Too many attempts from your connection. Please wait a few minutes and try again."
          : res.status === 422
            ? "Please check the highlighted answers."
            : "We could not submit your answers just now.",
      );
      setStatus("error");
    } catch {
      setErrorMsg("We could not submit your answers just now.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        className="mx-auto max-w-3xl rounded-2xl border border-gold/40 bg-navy p-8 text-white shadow-lg"
        role="status"
        data-testid="tb-success"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Thank you</p>
        <h2 className="mt-3 text-2xl font-semibold">Your brochure is ready</h2>
        <p className="mt-3 text-sm leading-relaxed text-white/80">
          We have received your answers and our team will reply to your enquiry. Download the
          Motivational Team Building brochure below. The link works for 24 hours.
        </p>
        <a href={downloadUrl} className="btn-primary mt-6" data-testid="tb-download">
          Download the brochure
        </a>
      </div>
    );
  }

  const describedBy = (k: string) => (errors[k as keyof FieldErrors] ? `tb-${k}-err` : undefined);

  return (
    <form
      noValidate
      onSubmit={submit}
      className="mx-auto max-w-3xl rounded-2xl border border-navy/10 bg-slate-50 p-5 sm:p-8"
      aria-labelledby="tb-heading"
    >
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
        Questionnaire
      </span>
      <h2 id="tb-heading" className="mt-2 text-2xl font-semibold text-navy">
        Tell us about your team
      </h2>
      <p className="mt-2 text-sm text-navy/60">Fields marked * are required.</p>

      {/* Honeypot: hidden from people, bots tend to fill it */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={f.website} onChange={(e) => set("website", e.target.value)} name="website" />
        </label>
      </div>

      <fieldset className="mt-6 grid gap-5 sm:grid-cols-2">
        <legend className="sr-only">Your details</legend>
        {(
          [
            ["name", "Name *", "text", "name"],
            ["organisation", "Organisation *", "text", "organization"],
            ["email", "Work email *", "email", "email"],
            ["phone", "Phone (optional)", "tel", "tel"],
          ] as const
        ).map(([k, label, type, ac]) => (
          <div key={k}>
            <label htmlFor={`tb-${k}`} className={labelCls}>{label}</label>
            <input
              id={`tb-${k}`}
              type={type}
              autoComplete={ac}
              inputMode={type === "tel" ? "tel" : type === "email" ? "email" : undefined}
              value={f[k]}
              onChange={(e) => set(k, e.target.value)}
              aria-invalid={!!errors[k]}
              aria-describedby={describedBy(k)}
              className={inputCls}
            />
            <Err id={`tb-${k}-err`} msg={errors[k]} />
          </div>
        ))}
      </fieldset>

      <fieldset className="mt-8" aria-describedby={describedBy("teamSize")}>
        <legend className={labelCls}>Team size *</legend>
        <div id="tb-teamSize" tabIndex={-1} className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-5">
          {teamSizes.map((v) => (
            <Choice key={v} name="teamSize" type="radio" value={v} checked={f.teamSize === v} onChange={() => set("teamSize", v)} />
          ))}
        </div>
        <Err id="tb-teamSize-err" msg={errors.teamSize} />
      </fieldset>

      <fieldset className="mt-8" aria-describedby={describedBy("needs")}>
        <legend className={labelCls}>What does your team need most? * <span className="font-normal text-navy/60">(choose any)</span></legend>
        <div id="tb-needs" tabIndex={-1} className="mt-2 grid gap-2 sm:grid-cols-2">
          {teamNeeds.map((v) => (
            <Choice key={v} name="needs" type="checkbox" value={v} checked={f.needs.includes(v)} onChange={() => toggleNeed(v)} />
          ))}
        </div>
        <Err id="tb-needs-err" msg={errors.needs} />
      </fieldset>

      <fieldset className="mt-8" aria-describedby={describedBy("length")}>
        <legend className={labelCls}>Preferred length *</legend>
        <div id="tb-length" tabIndex={-1} className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {lengths.map((v) => (
            <Choice key={v} name="length" type="radio" value={v} checked={f.length === v} onChange={() => set("length", v)} />
          ))}
        </div>
        <Err id="tb-length-err" msg={errors.length} />
      </fieldset>

      <fieldset className="mt-8" aria-describedby={describedBy("style")}>
        <legend className={labelCls}>Preferred style *</legend>
        <div id="tb-style" tabIndex={-1} className="mt-2 grid gap-2 sm:grid-cols-3">
          {styles.map((v) => (
            <Choice key={v} name="style" type="radio" value={v} checked={f.style === v} onChange={() => set("style", v)} />
          ))}
        </div>
        <Err id="tb-style-err" msg={errors.style} />
      </fieldset>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {(
          [
            ["when", "Rough month or date *", "e.g. March 2027"],
            ["area", "Province or venue area *", "e.g. Gauteng, Pretoria East"],
          ] as const
        ).map(([k, label, ph]) => (
          <div key={k}>
            <label htmlFor={`tb-${k}`} className={labelCls}>{label}</label>
            <input
              id={`tb-${k}`}
              type="text"
              placeholder={ph}
              value={f[k]}
              onChange={(e) => set(k, e.target.value)}
              aria-invalid={!!errors[k]}
              aria-describedby={describedBy(k)}
              className={inputCls}
            />
            <Err id={`tb-${k}-err`} msg={errors[k]} />
          </div>
        ))}
      </div>

      <div className="mt-5">
        <label htmlFor="tb-notes" className={labelCls}>Anything else we should know? <span className="font-normal text-navy/60">(optional)</span></label>
        <textarea
          id="tb-notes"
          rows={4}
          value={f.notes}
          onChange={(e) => set("notes", e.target.value)}
          aria-invalid={!!errors.notes}
          aria-describedby={describedBy("notes")}
          className={inputCls}
        />
        <Err id="tb-notes-err" msg={errors.notes} />
      </div>

      <div className="mt-8 rounded-xl border border-navy/10 bg-white p-4">
        <p className="text-xs leading-relaxed text-navy/70">{privacyNotice}</p>
        <label className="mt-3 flex cursor-pointer items-start gap-3 text-sm font-medium text-navy">
          <input
            id="tb-consent"
            type="checkbox"
            checked={f.consent}
            onChange={(e) => set("consent", e.target.checked)}
            aria-invalid={!!errors.consent}
            aria-describedby={describedBy("consent")}
            className="mt-0.5 h-5 w-5 shrink-0 accent-[#232A60]"
          />
          <span>{consentLabel} *</span>
        </label>
        <Err id="tb-consent-err" msg={errors.consent} />
      </div>

      {status === "error" ? (
        <div className="mt-6 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800" role="alert" data-testid="tb-error">
          <p className="font-semibold">{errorMsg}</p>
          <p className="mt-1">
            Your answers were not received, so the brochure is not available yet. Please try again, or contact us on{" "}
            <a href={site.phoneHref} className="font-semibold underline">{site.phone}</a> or{" "}
            <a href={site.emailHref} className="break-all font-semibold underline">{site.email}</a>.
          </p>
        </div>
      ) : null}

      <div className="mt-6">
        <button type="submit" className="btn-primary w-full sm:w-auto" disabled={status === "sending"}>
          {status === "sending" ? "Submitting..." : "Submit and get the brochure"}
        </button>
      </div>
    </form>
  );
}
