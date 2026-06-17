---
published: false
---

# AGENTS.md — Garabaly website (read this first)

This file is the standing brief for any AI agent (Claude Code, Cursor) working in this repo.

## Always do this
1. **Before finishing any task and before merging, run [`DEPLOY_CHECKLIST.md`](./DEPLOY_CHECKLIST.md) in full.** It is mandatory, not optional.
2. This repo deploys to **production** (GitHub Pages → garabaly.com, Cloudflare in front) on merge to `main`. **Work on a branch, open a PR — never push to `main` directly.**
3. **Commit new assets explicitly** (`git add <path>`). Never `git add .` — stray `.md`/`.docx` instruction files in the repo root must not ship. A file that is referenced in HTML but not committed will 404 live (this has happened — the OG cards).
4. Apply every change to all three locales: `/`, `/fr/`, `/ar/` (RTL for Arabic).

## Brand do-not-break (see DEPLOY_CHECKLIST §3 for detail)
- Geo-neutral hero/tagline (no "West Africa's" etc.); geography only in SEO meta/body.
- Verification badge = "a badge", no colour.
- No PWA/web-app manifest; "Get the App" → stores / Expo Go only.
- Self-hosted fonts (Inter + Cairo), no Google Fonts calls. Homepage < 1.5 MB, WebP/AVIF + lazy-load.
- Numbers/sources trace to the Verified Data Bank; do not invent stats.

## Where the brief lives
Detailed instructions for each work package are in `BRANDING & MARKETING/Website/Cursor Instructions/` (dated packs). The brand owner is the MD / Director of Brand & Marketing.
