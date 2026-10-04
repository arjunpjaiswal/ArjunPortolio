# Arjun Pankaj Jaiswal — Portfolio

React + Vite, React Router. Terminal/editor-themed, with two live embedded
project demos (SQL QueryBuilder sandbox, GSearch backend simulation).

## Develop

```
npm install
npm run dev
```

## Build for real deployment (Vercel / Netlify / GitHub Pages / any static host)

```
npm run build
```

Outputs to `dist/`. `vercel.json` and `public/_redirects` are already set up
so client-side routes (e.g. `/projects/gsearch/architecture`) don't 404 on
a hard refresh — Vercel and Netlify both pick these up automatically.

## Build a single standalone HTML file (no server needed)

```
npm run build:standalone
```

Outputs one self-contained file to `dist-standalone/index.html` — CSS, JS,
the profile photo, and both demo HTML files are all inlined. Useful for a
quick local preview or sharing a single file, but for real hosting use the
regular `npm run build` above (it code-splits properly and plays nicely
with the router).

## Structure

```
src/
  pages/Home.jsx                        — hero, project cards, experience, skills, achievements, contact
  pages/projects/QueryBuilderArchitecture.jsx
  pages/projects/QueryBuilderMethodology.jsx  — includes the interactive sandbox
  pages/projects/GSearchArchitecture.jsx
  pages/projects/GSearchSimulation.jsx        — includes the interactive simulation
  pages/achievements/SmartEdTech.jsx          — Tech Sprint 2026 hackathon case study
  pages/achievements/Patent.jsx               — Smart Water Bottle design patent case study
  demos/                                — raw source of the two embedded HTML demos
  components/TabBar.jsx, Footer.jsx, Breadcrumb.jsx
  styles/global.css                     — all design tokens + component styles, shared across pages
```

## Updating a demo

Replace the file in `src/demos/` and rebuild — it's imported as a raw string
(`?raw`) and rendered via `<iframe srcDoc={...}>`, so no other code needs to change.
