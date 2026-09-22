# The Motivation Company

Soft-landing company site for **The Motivation Company** (TMC) — legal, ops, and trust face at [themotivationcompany.co.za](https://www.themotivationcompany.co.za).

This is **not** a second brochure competing with Hector Mathabe’s personal brand.  

| Site | Role |
|------|------|
| **This site (TMC)** | Company face — registration, contact, soft landing, clear Book path |
| **Hector Mathabe** (`hectormathabe.com`) | Booking & marketing face — talks, MC, facilitation, About |

Company masthead: **The Motivation Company**.  
We deliver / present **Hector Mathabe** (also known as Hector Motivator).

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS  
- Same navy / gold tokens as the Hector Mathabe MVP (`#232A60` / `#FFCB05`)  
- Vercel-ready

## Environment

| Variable | Default | Purpose |
|----------|---------|---------|
| `NEXT_PUBLIC_MATHABE_SITE_URL` | `https://hectormathabe.com` | Base URL for Book / Speak / Host / Facilitate CTAs |

Copy `.env.example` to `.env.local` if you need to override:

```bash
NEXT_PUBLIC_MATHABE_SITE_URL=https://hectormathabe.com
```

Default deep links (when env is unset):

- Book → `https://hectormathabe.com/book`
- Speak / Facilitate → `https://hectormathabe.com/services`
- Host → `https://hectormathabe.com/mc`
- Hector About → `https://hectormathabe.com/about`

## Local development

```bash
npm install
npm run dev
```

```bash
npm run build
npm start
```

## Routes

| Path | Purpose |
|------|---------|
| `/` | Company positioning + principal + Speak / Host / Facilitate cards |
| `/about` | Short company page + link to Hector About |
| `/contact` | Book CTA + mailto + phone |
| `/services` | Stub cards deep-linking to Mathabe offers |

## Phone note

- **Live / show:** `082 060 9888` only  
- **Legacy TBD:** `011 234 9000` — do **not** publish on the site until confirmed. Keep one number in the UI.

## Footer legal

- Company reg **2013/049231/07**  
- `bookings@themotivationcompany.co.za`

## Pointing themotivationcompany.co.za to Vercel (high-level)

1. Deploy this repo to Vercel (Import Git Repository → `Qwezzy/the-motivation-company`).  
2. In the Vercel project, add domain `themotivationcompany.co.za` (and optionally `www`).  
3. At your DNS host, set the records Vercel shows (typically an **A** record for apex and/or **CNAME** for `www` to `cname.vercel-dns.com`).  
4. Wait for DNS propagation; Vercel issues HTTPS automatically.  
5. Set `NEXT_PUBLIC_MATHABE_SITE_URL` in Vercel env if the Mathabe production URL differs from the default.

## Brand

- Navy `#232A60` · Gold `#FFCB05`  
- Inter (Gill Sans–like system stack)  
- No Flatela / Khemo branding

## License

Private client work for FLATELA / Khwezi — all rights reserved by The Motivation Company.
