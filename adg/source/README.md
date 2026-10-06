# Adriatic Distribution Group — corporate website

Design prototype built from the ADG kick-off and design brief.
React 19 · TypeScript · Tailwind CSS v4 · Motion. Languages: EN (base), HR, FR, 中文.

## Run

```bash
npm install
npm run dev            # http://localhost:5173
npm run build          # production build in dist/
npm run build:single   # one self-contained HTML (dist-single/index.html) for review
npm run build:pages    # same single HTML, written to ../index.html (live demo on GitHub Pages)
```

Run commands from `adg/source/`. The live demo at
https://fer-projekt.github.io/live-demos/adg/index.html is the built `adg/index.html`:
after changes run `npm run build:pages` and commit `adg/index.html` together with the source.

Copy `.env.example` to `.env` and set `VITE_GA4_ID` to enable Google Analytics 4.
GA4 is only loaded after the visitor accepts analytics cookies.

## Page order (brief §18, §23)

WORLD → CONNECTION → ADG → CAPABILITIES → PRODUCTS → PARTNERSHIP

| Section | File | Notes |
| --- | --- | --- |
| Hero | `sections/Hero.tsx` | Animated corridor map is the opening image; headline, Explore ADG, manufacturer / buyer shortcuts, four provable facts |
| Global network | `sections/Network.tsx` | Asia → Europe, Africa → Europe, Mediterranean → Adriatic → CEE; vessel → port → terminal → truck & rail → buyer |
| What we do | `sections/Services.tsx` | Six pillars from the brief |
| From source to market | `sections/Process.tsx` | Value chain + steps 01–06 |
| Industries & products | `sections/Industries.tsx` | Phase-1 B2B catalogue, no prices; "request information" preselects the inquiry |
| For manufacturers / buyers | `sections/Audiences.tsx` | Separate paths into the inquiry form |
| Global reach – local expertise | `sections/About.tsx` | About, Why Croatia / Zagreb, road-distance diagram, facts |
| Leadership | `sections/Team.tsx` | Placeholders until approved photos and names arrive |
| Business inquiry | `sections/Contact.tsx` | Manufacturer / Buyer / Partner segments with adapted fields |

Numbers on the home page are limited to facts that can be verified (EU since 2013, euro and Schengen since 2023,
Adriatic ports, Pan-European corridors, road distances). Add Countries Served, Strategic Partners,
Annual Volume etc. in `i18n/*.ts → hero.facts` once ADG has a track record.

## Extending without a redesign

- **Language**: add `src/i18n/xx.ts` typed as `Dict` and register it in `src/i18n/index.tsx`.
  The Chinese version is written for Chinese manufacturers ("your gateway to Europe"), not translated line by line.
- **Product category**: add an entry to `industries.categories` in each dictionary and an image in `data/site.ts → categoryImages`.
- **Market / corridor**: add a city and route in `scripts/mapgen/gen.mjs`, regenerate `src/data/map.json`,
  then add the corridor text to the dictionaries.
- **Team**: replace `team.members` in the dictionaries; swap the placeholder avatar for a photo in `Team.tsx`.
- **Future modules** (Markets, Partners, Projects, News & Insights, Careers, Supplier / Buyer Portal, RFQ, B2B shop):
  listed in the footer as "Coming next". The next step is adding a router (e.g. React Router or a move to Next.js)
  with locale-prefixed routes such as `/en/markets`, `/fr/marches`, `/zh/...`; sections are already self-contained components.
- **Legal pages**: `LegalDialog` in `components/layout/Overlays.tsx` holds placeholders for Privacy Policy,
  Terms of Use, Cookie Policy and GDPR. Final texts come from ADG's legal counsel.

## Before launch

- Replace Unsplash photography with ADG's own or licensed images (`CREDITS.md`).
- Final logo (the current mark is a placeholder).
- Real contact details, team, LinkedIn URLs, legal texts.
- Connect `Contact.tsx → submit()` to the CRM / email endpoint.
- Native-speaker review of FR and 中文 copy.
