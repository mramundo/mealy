# Mealy

**[mramundo.github.io/mealy](https://mramundo.github.io/mealy/)**

A small PWA that turns a weekly meal plan into something you can actually use on a
phone: seven days, five slots a day, tick each meal off as you eat it.

No calendar, no accounts, no backend — the week simply repeats, and what you tick is
kept in the browser.

## Features

- **A day at a time, in order** — the five slots are laid out as a timeline:
  breakfast, morning snack, lunch, afternoon snack, dinner. Slots the plan
  leaves empty stay on the timeline, marked as such.
- **Day switcher where your thumb is** — a bottom dock on phones, a sticky rail
  beside the plan on wide screens. Each day carries its own progress ring.
- **Choices are choices** — wherever the plan offers a swap, it is a radio group
  you actually pick from, weights included. Whole-meal alternatives sit in their
  own group, and picking one dims the base list.
- **Tick meals off** — progress per day, stored in `localStorage` along with the
  options you picked.
- **Automatic language** — Italian when the browser looks like it is in Italy
  (time zone first, then an explicit `-IT` region), English everywhere else.
  A manual IT/EN switch overrides the guess and is remembered.
- **Installable and offline** — a real PWA: manifest, icons, service worker,
  precached assets.
- **Accessible** — tab/tabpanel semantics for the day switcher, arrow-key
  navigation, native radios for the options, switch roles on the check controls,
  visible focus, reduced-motion support.

## Stack

React 19 · TypeScript · Vite · vite-plugin-pwa (Workbox) · plain CSS with custom properties.

No UI framework and no CSS framework: white ground, one accent colour per meal slot,
all of it a handful of design tokens in [`src/styles/tokens.css`](src/styles/tokens.css).

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173/mealy/
```

| Script              | What it does                      |
| ------------------- | --------------------------------- |
| `npm run dev`       | Dev server with HMR               |
| `npm run build`     | Type check, then build to `dist/` |
| `npm run preview`   | Serve the production build        |
| `npm run lint`      | ESLint                            |
| `npm run typecheck` | `tsc --noEmit`                    |
| `npm run format`    | Prettier                          |

## Editing the plan

Everything lives in [`src/data/plan.ts`](src/data/plan.ts) — one entry per day, one
entry per slot. Each food item carries its weight, an optional practical hint
("2 slices") and any `alternatives`; a meal can also carry `swaps` (whole-meal
alternatives) and `tips` (one short sentence each). Strings are pairs:
`t('italiano', 'english')`.

The colours, labels and icons of the five slots are in
[`src/data/taxonomy.ts`](src/data/taxonomy.ts),
[`src/styles/tokens.css`](src/styles/tokens.css) and
[`src/components/icons.tsx`](src/components/icons.tsx).

## Deploying

`vite.config.ts` sets `base` to `/mealy/` for GitHub Pages. Serving from a domain root
instead:

```bash
BASE_PATH=/ npm run build
```

The workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and
publishes `dist/` to GitHub Pages.

## Licence

MIT — see [LICENSE](LICENSE).
