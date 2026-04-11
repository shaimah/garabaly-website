# Garabaly Website — Motto Integration Instructions

**For: Cursor Agent / Developer**  
**Last updated: March 30, 2026**  
**Priority: HIGH — Brand consistency**  
**Implementation status: COMPLETE in repository** (HTML + `css/styles.css`; verify after each deploy)

---

## SITE CONTEXT (read before editing)

- **Canonical base URL for all public links and meta:** `https://www.garabaly.com/` (with `www`). All `rel="canonical"`, `hreflang`, `og:url`, and `Organization` JSON-LD use this host.
- **Root files (no motto in these):** `sitemap.xml`, `robots.txt`, `googleccba587c0d43c22e.html` (Search Console verification). Do not add marketing copy to legal or verification files.
- **Policies pages** (`policies.html`, `fr/policies.html`, `ar/policies.html`): unchanged — legal copy only.

---

## THE MOTTO

```
Votre bétail. Votre argent. Votre confiance.
```

| Locale | Text |
|--------|------|
| **FR** | Votre bétail. Votre argent. Votre confiance. |
| **EN** | Your livestock. Your money. Your trust. |
| **AR** | ماشيتك. أموالك. ثقتك. |

This is Garabaly’s official brand motto. It complements (does not replace) the “100 years” headline and the “Trust isn’t built with a checkout button” line.

---

## BRAND LINE HIERARCHY (for reference)

| Role | Text (FR) | Text (EN) | Where it lives |
|------|-----------|-----------|----------------|
| **Motto** | Votre bétail. Votre argent. Votre confiance. | Your livestock. Your money. Your trust. | Hero, footer, key sections — see below |
| **Descriptor** | Le commerce du bétail en confiance | Livestock trade, built on trust | Under logo in nav, formal contexts |
| **Manifesto line** | La confiance ne se construit pas avec un bouton d'achat | Trust isn't built with a checkout button | About, hero subtitle, footers |
| **Campaign line** | Construit ici, pour ici | Built here, for here | X campaign, builder voice only |

---

## CSS (implemented in `css/styles.css`)

Classes are defined in the stylesheet (no reliance on long inline `style=""` for motto):

- **`.hero__motto`** — gold (`var(--secondary)`), between `h1.hero__title` and `p.hero__subtitle` on homepages only.
- **`.footer__motto`** — gold, first brand line in `footer .footer__brand` (and in the homepage CTA block before the download button; class name `footer__motto` reused per original spec).
- **`.section-motto`** — terracotta (`var(--primary)`), Vision (About), Escrow (How it works), Get the App page header.

Optional tweak: **`.cta-section .footer__motto`** — slightly larger in the CTA band.

**Rule:** Gold on dark (hero, footer, CTA); terracotta on light content sections.

---

## WHERE THE MOTTO APPEARS (by file)

### Home — `index.html`, `fr/index.html`, `ar/index.html`

1. **Hero:** `<p class="hero__motto">` immediately after `<h1 class="hero__title">`, before `hero__subtitle`.
2. **CTA (`#download`):** `<p class="footer__motto">` after the short “Join the revolution…” line, **before** the primary button (button label may be “Get the App” / localized equivalent).
3. **Footer:** `<p class="footer__motto">` immediately before the existing manifesto paragraph in `footer__brand`.
4. **Meta (home only):** `meta name="description"`, `og:description`, `twitter:description` include the motto in EN / FR / AR as specified in the “META DESCRIPTIONS” section below.

### About — `about.html`, `fr/about.html`, `ar/about.html`

- **Vision block:** `<p class="section-motto">` after the Vision `<h2 class="section-title">`, before the first `section-subtitle` paragraph.
- **Footer:** same `footer__motto` pattern as homepage.

**Note:** Eyebrow text may differ (e.g. “Looking Ahead” / “L'avenir” / “المستقبل”); do not remove it.

### How it works — `how-it-works.html`, `fr/how-it-works.html`, `ar/how-it-works.html`

- **Escrow section:** after the escrow `<h2 class="section-title">` (EN: “Per-Party Staged / Escrow Lifecycle”; FR: “Séquestre par étapes / avec allocation par partie”; AR: localized title), add `<p class="section-motto">` before the first body paragraph.
- **Footer:** `footer__motto` as above.

### Get the app — `get-the-app.html`, `fr/get-the-app.html`, `ar/get-the-app.html`

- **Page header:** `<p class="section-motto">` below the intro paragraph under `<h1>` (Expo Go preview copy stays).
- **Footer:** `footer__motto` as above.

### Contact — `contact.html`, `fr/contact.html`, `ar/contact.html`

- **Footer only** (`footer__motto`). No motto in the main form area.

### FAQ — `faq.html`, `fr/faq.html`, `ar/faq.html`

- **Footer only** (`footer__motto`).

### Policies — all languages

- **No motto** (legal pages stay clean).

---

## META DESCRIPTIONS (homepages only)

### English (`index.html`)

```text
Garabaly: Your livestock. Your money. Your trust. Secure marketplace for West Africa — escrow protection, mobile money, voice-first, offline-ready. Cattle, sheep, goats, camels, poultry.
```

### French (`fr/index.html`)

```text
Garabaly : Votre bétail. Votre argent. Votre confiance. Marché sécurisé — séquestre, mobile money (Orange, Wave, Moov), messagerie vocale. Mali, Sénégal, Burkina Faso, Côte d'Ivoire.
```

### Arabic (`ar/index.html`)

Motto **ماشيتك. أموالك. ثقتك.** leads the meta description; `og:description` and `twitter:description` include the motto.

---

## SUMMARY: FILES TOUCHED BY MOTTO WORK

| File | Changes |
|------|---------|
| `index.html`, `fr/index.html`, `ar/index.html` | Hero motto, CTA motto, footer motto, meta + social descriptions |
| `about.html`, `fr/about.html`, `ar/about.html` | Vision `section-motto`, footer motto |
| `how-it-works.html`, `fr/how-it-works.html`, `ar/how-it-works.html` | Escrow `section-motto`, footer motto |
| `get-the-app.html`, `fr/get-the-app.html`, `ar/get-the-app.html` | Header `section-motto`, footer motto |
| `contact.html`, `fr/contact.html`, `ar/contact.html` | Footer motto only |
| `faq.html`, `fr/faq.html`, `ar/faq.html` | Footer motto only |
| `css/styles.css` | `.hero__motto`, `.footer__motto`, `.section-motto`, `.cta-section .footer__motto`, `.page-header .section-motto` |

**Total: 19 HTML files + 1 stylesheet** (policies excluded).

---

## IMPORTANT RULES

1. **Do not remove** the “100 years” headline or the manifesto / checkout-button line; the motto **adds** to them.
2. **Do not add the motto** to policies pages.
3. **Gold** (`--secondary`, #E8B854) for hero, footer, and CTA motto lines; **terracotta** (`--primary`, #C87941) for `section-motto` on light sections.
4. **Italic + bold** via CSS (`.hero__motto`, etc.).
5. **Do not paraphrase** the motto.
6. After deploy, **smoke-test** light and dark theme: motto must stay readable on hero, CTA, and footer.

---

## VERIFICATION CHECKLIST (run before commit / after deploy)

1. **Grep:** Each of the 19 pages above contains the correct motto string for its language (EN / FR / AR) in the expected block (hero, section, or footer).
2. **Policies:** `policies*.html` contain **no** `hero__motto`, `footer__motto`, or `section-motto`.
3. **Home meta:** `index.html`, `fr/index.html`, `ar/index.html` — `description`, `og:description`, `twitter:description` include the motto.
4. **Stylesheet:** `css/styles.css` includes the motto block; pages load CSS via existing `<link rel="stylesheet" href=".../css/styles.css">` (path varies in `fr/` and `ar/`).
5. **Optional:** Open home + one inner page in the browser, toggle **dark mode**, confirm contrast.
6. **Live URL:** After hosting deploy, spot-check `https://www.garabaly.com/index.html` and one FR/AR page.

---

## REGRESSION GUARD

- Changing **URL strategy** (e.g. dropping `www`): update **all** canonical/hreflang/sitemap docs in the same change, not only this file.
- **Contact phone / WhatsApp** live in `contact.html` (and `fr` / `ar`); they are unrelated to motto — edit only when business details change.
