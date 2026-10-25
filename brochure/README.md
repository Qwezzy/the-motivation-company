# Team-building brochure

Source for the private PDF emailed by `/team-building` (`/api/team-building`).

- `brochure.html`: A4 layout (TMC navy #232A60 / gold #FFCB05, Inter). Content is only the client's
  "Motivational Team Building Brochure" (typos fixed) plus two client-approved quotes
  ("No one of us is better than all of us together" on page 2, "Together Everyone Achieves More" on page 5).
- `photos/`: client-supplied photos (WhatsApp, 23 Oct 2026), auto-oriented and auto-contrast only.
- Output: `private/brochure/TMC-Team-Building-Brochure.pdf` (NOT in `public/`; only sent by email).

## Rebuild
    npm run brochure      # needs Google Chrome/Chromium

## Swap or add photos
1. Put the new JPEG in `brochure/photos/` (at least ~1600px on the long edge for half-page use).
2. Point the matching `<img src="photos/...">` in `brochure.html` at it. Do not crop people misleadingly.
3. `npm run brochure`, then check every page of the PDF.
4. Web copies for the page live in `public/images/team-building/*.webp` (max 1200px).

## Going live (production guard)
On Vercel production the page 404s, the nav link is hidden and the API refuses to send unless
`BROCHURE_READY=true` AND `private/brochure/manifest.json` has `"placeholder": false`.
Also set `RESEND_API_KEY`, `MAIL_FROM` (verified Resend sender) and optionally `BOOKINGS_INBOX`.
See `.env.example`.
