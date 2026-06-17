# Garabaly Website — Deploy Checklist

Run this before finishing any task and before merging. This repo deploys to **production** (GitHub Pages → garabaly.com) on merge to `main`. Cloudflare sits in front (caching). Keep it short, run it every time.

## 1. Commit completeness (the #1 trap)
- [ ] **New files are committed, not just present.** Run `git status` — any new image/font/asset must be **tracked**, or it will 404 live even though the HTML references it.
- [ ] Add intended files **explicitly** (e.g. `git add assets/images/og-*.jpg`). **Never `git add .`** — stray `.md`/`.docx` instruction files live in the repo root and must not ship.
- [ ] For every new asset, open its live URL after deploy and confirm it returns the file (HTTP 200), **not the 404 page**.

## 2. All three locales
- [ ] Change applied to **`/`, `/fr/`, and `/ar/`** (content, tags, assets).
- [ ] Arabic still renders **RTL**; FR/AR copy is native, not English.

## 3. Brand standards (do-not-break)
- [ ] **Geo-neutral tagline** — no "West Africa's" / "en Afrique de l'Ouest" / "في غرب إفريقيا" in any hero or tagline. Explicit geography only in SEO meta/body. (Availability lists, diaspora cities, "Sahelian market" stay.)
- [ ] Verification badge described with **no colour** — "a badge", never "blue/green".
- [ ] **No PWA / web-app manifest** — there is no web-app version; "Get the App" → stores / Expo Go only.
- [ ] Payment lists include **Cash** (with "no escrow / limited protection" caveat) where buyer methods are enumerated.
- [ ] Stats unchanged; numbers + sources trace to the Verified Data Bank.

## 4. Performance & assets
- [ ] Photos are **WebP/AVIF** with `srcset` + `loading="lazy"` (hero eager); homepage stays **< 1.5 MB**.
- [ ] Fonts stay **self-hosted** (`assets/fonts/`, `font-display: swap`, system fallback). No `fonts.googleapis`/`gstatic` calls.

## 5. SEO / routing / a11y
- [ ] Canonical = clean root URL; `hreflang` intact (en/fr/ar + x-default→fr).
- [ ] `404.html` is **language-aware** (one root 404 serves all locales on GitHub Pages); no soft-404 of real routes.
- [ ] OG/Twitter tags per locale point at that locale's card; `summary_large_image`.
- [ ] Dark mode + gold text pass **WCAG AA** contrast in both themes.

## 6. Process
- [ ] Work on a branch, open a **PR — never push straight to `main`**.
- [ ] After merge/deploy, verify live: changed URLs load, OG re-scraped in the Meta Sharing Debugger, Lighthouse mobile ≥ 95 (Perf/A11y/Best-Practices) and SEO 100.
