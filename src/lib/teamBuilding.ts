/**
 * Team-building questionnaire: shared options + validation (client and server).
 * Options come from the TMC Motivational Team Building Brochure and the
 * existing Services copy (half day to 3 days). Do not add options that are
 * not in the source material.
 */

export const teamSizes = ["1-10", "11-25", "26-50", "51-100", "100+"] as const;

export const teamNeeds = [
  "Communication",
  "Trust",
  "Handling conflict",
  "Appreciating diversity",
  "Motivation",
  "Focus on team goals",
  "Team support",
  "Fun",
] as const;

export const lengths = ["Half day", "1 day", "2 days", "3 days"] as const;

export const styles = [
  "Workshop",
  "Adventure-based activities",
  "A mix",
] as const;

export const privacyNotice =
  "We use your details only to email you this brochure and to reply to your team-building enquiry. Your answers are sent to our bookings inbox and are not shared with anyone else or added to a mailing list. To have your details removed, email bookings@themotivationcompany.co.za.";

export const consentLabel =
  "I agree to these details being used to send the brochure and respond to my enquiry.";

export type TeamBuildingAnswers = {
  name: string;
  organisation: string;
  email: string;
  phone: string;
  teamSize: string;
  needs: string[];
  length: string;
  style: string;
  when: string;
  area: string;
  notes: string;
  consent: boolean;
};

export type FieldErrors = Partial<Record<keyof TeamBuildingAnswers, string>>;

const LIMITS = {
  name: 100,
  organisation: 150,
  email: 200,
  phone: 30,
  when: 100,
  area: 150,
  notes: 2000,
} as const;

const emailRe = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;
const phoneRe = /^[+()\d\s-]{7,30}$/;

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

/** Normalise untrusted input into answers (unknown fields dropped). */
export function normalise(input: Record<string, unknown>): TeamBuildingAnswers {
  const rawNeeds = Array.isArray(input.needs) ? input.needs : [];
  return {
    name: str(input.name),
    organisation: str(input.organisation),
    email: str(input.email).toLowerCase(),
    phone: str(input.phone),
    teamSize: str(input.teamSize),
    needs: rawNeeds
      .filter((n): n is string => typeof n === "string")
      .map((n) => n.trim()),
    length: str(input.length),
    style: str(input.style),
    when: str(input.when),
    area: str(input.area),
    notes: str(input.notes),
    consent: input.consent === true,
  };
}

export function validate(a: TeamBuildingAnswers): FieldErrors {
  const e: FieldErrors = {};
  if (!a.name) e.name = "Please enter your name.";
  if (!a.organisation) e.organisation = "Please enter your organisation.";
  if (!a.email) e.email = "Please enter your work email.";
  else if (!emailRe.test(a.email))
    e.email = "Please enter a valid email address, like name@company.co.za.";
  if (a.phone && !phoneRe.test(a.phone))
    e.phone = "Please enter a valid phone number, or leave it blank.";
  if (!(teamSizes as readonly string[]).includes(a.teamSize))
    e.teamSize = "Please choose your team size.";
  if (a.needs.length === 0) e.needs = "Please choose at least one.";
  else if (a.needs.some((n) => !(teamNeeds as readonly string[]).includes(n)))
    e.needs = "Please choose from the listed options.";
  if (!(lengths as readonly string[]).includes(a.length))
    e.length = "Please choose a preferred length.";
  if (!(styles as readonly string[]).includes(a.style))
    e.style = "Please choose a preferred style.";
  if (!a.when) e.when = "Please give a rough month or date.";
  if (!a.area) e.area = "Please give a province or venue area.";
  if (!a.consent) e.consent = "Please tick the box so we can send the brochure.";

  (Object.keys(LIMITS) as (keyof typeof LIMITS)[]).forEach((k) => {
    if (!e[k] && a[k].length > LIMITS[k])
      e[k] = `Please keep this under ${LIMITS[k]} characters.`;
  });
  return e;
}

/** Plain-text summary used in both emails. */
export function summaryLines(a: TeamBuildingAnswers): [string, string][] {
  return [
    ["Name", a.name],
    ["Organisation", a.organisation],
    ["Email", a.email],
    ["Phone", a.phone || "Not given"],
    ["Team size", a.teamSize],
    ["What the team needs most", a.needs.join(", ")],
    ["Preferred length", a.length],
    ["Preferred style", a.style],
    ["Rough month or date", a.when],
    ["Province or venue area", a.area],
    ["Anything else", a.notes || "Nothing added"],
  ];
}
