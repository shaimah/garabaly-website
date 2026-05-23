#!/usr/bin/env python3
"""Apply CURSOR_INSTRUCTIONS_Website_Update_May2026.md changes."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MD_FR = Path(
    "/Users/moctarkane/Documents/BUSINESSES/Garabaly/FINANCE/Wallet Policy/conditions-portefeuille-garabaly.md"
)
INSTRUCTIONS = ROOT / "CURSOR_INSTRUCTIONS_Website_Update_May2026.md"


def extract_md_html_block(marker: str) -> str:
    text = INSTRUCTIONS.read_text(encoding="utf-8")
    start = text.find(marker)
    if start < 0:
        raise ValueError(f"Marker not found: {marker}")
    start = text.find("```html", start) + len("```html")
    end = text.find("```", start)
    return text[start:end].strip()


def md_inline(s: str) -> str:
    s = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", s)
    return s.strip()


def french_md_to_policy_content(md: str) -> str:
    """Convert FR wallet markdown (articles) to policy-block HTML."""
    lines = md.splitlines()
    blocks: list[str] = []
    i = 0
    # skip title block until Préambule
    while i < len(lines) and not lines[i].startswith("## Préambule"):
        i += 1

    def flush_block(title: str | None, paras: list[str], lists: list[list[str]]):
        if not title and not paras and not lists:
            return
        parts = ['      <div class="policy-block">']
        if title:
            parts.append(f"        <h3>{md_inline(title)}</h3>")
        for p in paras:
            parts.append(f"        <p>{md_inline(p)}</p>")
        for ul_items in lists:
            parts.append("        <ul>")
            for item in ul_items:
                parts.append(f"          <li>{md_inline(item)}</li>")
            parts.append("        </ul>")
        parts.append("      </div>")
        blocks.append("\n".join(parts))

    current_title: str | None = None
    current_paras: list[str] = []
    current_lists: list[list[str]] = []
    current_ul: list[str] | None = None

    def end_block():
        nonlocal current_title, current_paras, current_lists, current_ul
        flush_block(current_title, current_paras, current_lists)
        current_title = None
        current_paras = []
        current_lists = []
        current_ul = None

    while i < len(lines):
        line = lines[i].rstrip()
        i += 1
        if line.startswith("# Conditions") or line.startswith("**Garabaly") or line.startswith("**Version"):
            continue
        if line.strip() == "*En cas de divergence entre les versions linguistiques des présentes Conditions, la version française fait foi.*":
            blocks.insert(
                0,
                '      <div class="policy-block">\n        <p><em>En cas de divergence entre les versions linguistiques des présentes Conditions, la version française fait foi.</em></p>\n      </div>',
            )
            continue
        if line == "---":
            if current_title and current_title != "Contact":
                end_block()
            continue
        if line.startswith("## "):
            end_block()
            current_title = line[3:].strip()
            continue
        if line.startswith("- "):
            if current_ul is None:
                current_ul = []
                current_lists.append(current_ul)
            current_ul.append(line[2:].strip())
            continue
        if current_ul is not None and line.strip() == "":
            current_ul = None
            continue
        if line.startswith("**") and line.endswith("**") and ":" not in line[2:-2]:
            # standalone bold paragraph like **2.1**
            if current_ul is not None:
                current_ul = None
            current_paras.append(line)
            continue
        if line.strip().startswith("**") and "**" in line[1:]:
            if current_ul is not None:
                current_ul = None
            current_paras.append(line.strip())
            continue
        if line.strip() and not line.startswith("*Garabaly") and not line.startswith("*Pour toute"):
            if current_ul is not None:
                current_ul = None
            current_paras.append(line.strip())
        elif line.strip().startswith("*Pour toute question"):
            end_block()
            blocks.append(
                '      <div class="policy-block">\n        <h3>Contact</h3>\n        <p>Pour toute question relative aux présentes Conditions : <strong>support@garabaly.com</strong></p>\n        <p><em>Garabaly — Bamako, République du Mali</em></p>\n      </div>'
            )
            break

    end_block()
    return "\n\n".join(blocks)


def wallet_section_fr() -> str:
    content = french_md_to_policy_content(MD_FR.read_text(encoding="utf-8"))
    return f"""
<!-- ============================================================ -->
<!-- ===== WALLET & TRANSFER POLICY ===== -->
<!-- ============================================================ -->
<section class="section section--alt" id="wallet">
  <div class="container">
    <div class="section-header reveal">
      <span class="section-eyebrow">Portefeuille & Transferts</span>
      <h2 class="section-title">Conditions d'utilisation du portefeuille et des transferts entre utilisateurs</h2>
      <p class="section-subtitle">Version 2.0.0 — En vigueur à compter du 23 mai 2026</p>
    </div>

    <div class="policy-content reveal">

{content}

    </div>
  </div>
</section>
"""


def insert_wallet_policy(path: Path, nav_btn: str, section_html: str) -> None:
    text = path.read_text(encoding="utf-8")
    if 'id="wallet"' in text:
        print(f"skip wallet insert (exists): {path}")
        return
    if 'href="#wallet"' not in text:
        text = text.replace(
            '<a href="#escrow" class="btn btn--outline btn--sm">',
            f'<a href="#escrow" class="btn btn--outline btn--sm">',
            1,
        )
        # insert nav after escrow button line
        text = re.sub(
            r'(<a href="#escrow" class="btn btn--outline btn--sm">[^<]+</a>\n)',
            r"\1        " + nav_btn + "\n",
            text,
            count=1,
        )
    marker = "\n\n  <!-- ===== FOOTER ===== -->"
    if marker not in text:
        raise ValueError(f"Footer marker missing in {path}")
    text = text.replace(marker, "\n" + section_html + marker, 1)
    path.write_text(text, encoding="utf-8")
    print(f"wallet policy: {path}")


def replace_all_in_html_files(replacements: list[tuple[str, str]], glob: str = "**/*.html") -> None:
    for path in sorted(ROOT.glob(glob)):
        if path.name.startswith("_") or "google" in path.name:
            continue
        text = path.read_text(encoding="utf-8")
        original = text
        for old, new in replacements:
            text = text.replace(old, new)
        if text != original:
            path.write_text(text, encoding="utf-8")
            print(f"updated: {path.relative_to(ROOT)}")


def replace_info_in_policies_faq() -> None:
    """support@ in escrow/faq support contexts; keep verify-message info@."""
    patterns = [
        (r"policies\.html", r"faq\.html"),
        (r"fr/policies\.html", r"fr/faq\.html"),
        (r"ar/policies\.html", r"ar/faq\.html"),
    ]
    for rel in [
        "policies.html",
        "fr/policies.html",
        "ar/policies.html",
        "faq.html",
        "fr/faq.html",
        "ar/faq.html",
    ]:
        path = ROOT / rel
        text = path.read_text(encoding="utf-8")
        original = text

        # policies: escrow dispute + contact
        if "policies" in rel:
            text = text.replace("info@garabaly.com", "support@garabaly.com")

        if "faq" in rel:
            # selective: replace except verify-message FAQ
            parts = re.split(
                r'(<div class="faq-item"[^>]*id="faq-verify[^"]*"[^>]*>.*?</div>\s*</div>)',
                text,
                flags=re.DOTALL,
            )
            if len(parts) == 1:
                # fallback: replace lines that are NOT verify FAQ
                lines = text.splitlines()
                out = []
                in_verify = False
                for line in lines:
                    if 'id="faq-verify' in line or "faq-verify-message" in line:
                        in_verify = True
                    if in_verify and "</div>" in line and "faq-item" not in line:
                        pass
                    if "Official email:" in line or "Email officiel:" in line or "البريد الرسمي" in line:
                        in_verify = True
                    if 'id="faq-' in line and "verify" not in line.lower():
                        in_verify = False
                    if "info@garabaly.com" in line and (
                        "Official email" in line
                        or "Email officiel" in line
                        or "البريد الرسمي" in line
                    ):
                        out.append(line)
                        continue
                    if "info@garabaly.com" in line and not in_verify:
                        line = line.replace("info@garabaly.com", "support@garabaly.com")
                    out.append(line)
                text = "\n".join(out)
            else:
                rebuilt = []
                for idx, part in enumerate(parts):
                    if idx % 2 == 1:
                        rebuilt.append(part)
                    else:
                        rebuilt.append(part.replace("info@garabaly.com", "support@garabaly.com"))
                text = "".join(rebuilt)

        if text != original:
            path.write_text(text, encoding="utf-8")
            print(f"email: {rel}")


def fix_faq_emails() -> None:
    for rel in ["faq.html", "fr/faq.html", "ar/faq.html"]:
        path = ROOT / rel
        text = path.read_text(encoding="utf-8")
        # Split by verify FAQ id
        verify_ids = ["faq-verify-message", "faq-verifier-message", "faq-verify"]
        verify_id = None
        for vid in verify_ids:
            if f'id="{vid}"' in text:
                verify_id = vid
                break
        if not verify_id:
            m = re.search(r'id="(faq-[^"]*verif[^"]*)"', text)
            verify_id = m.group(1) if m else None

        if verify_id:
            pattern = rf'(<div class="faq-item"[^>]*id="{re.escape(verify_id)}"[\s\S]*?</div>\s*</div>)'
            chunks = re.split(pattern, text)
            new_text = ""
            for i, chunk in enumerate(chunks):
                if i % 2 == 1:
                    new_text += chunk
                else:
                    new_text += chunk.replace("info@garabaly.com", "support@garabaly.com")
            text = new_text
        else:
            text = text.replace("info@garabaly.com", "support@garabaly.com")

        path.write_text(text, encoding="utf-8")
        print(f"faq emails: {rel}")


def grep_faq_verify_id(path: Path) -> str | None:
    m = re.search(r'id="(faq-[^"]*)"[^>]*>[\s\S]*?verify', path.read_text(encoding="utf-8"), re.I)
    return m.group(1) if m else None


def main() -> None:
    en_section = extract_md_html_block("**New section to insert**")
    ar_section = extract_md_html_block("**Arabic translation** of the wallet policy")
    fr_section = wallet_section_fr()

    insert_wallet_policy(
        ROOT / "policies.html",
        '<a href="#wallet" class="btn btn--outline btn--sm">Wallet & Transfer Policy</a>',
        en_section,
    )
    insert_wallet_policy(
        ROOT / "fr/policies.html",
        '<a href="#wallet" class="btn btn--outline btn--sm">Portefeuille & Transferts</a>',
        fr_section,
    )
    insert_wallet_policy(
        ROOT / "ar/policies.html",
        '<a href="#wallet" class="btn btn--outline btn--sm">المحفظة والتحويلات</a>',
        ar_section,
    )

    # Meta descriptions
    (ROOT / "policies.html").write_text(
        (ROOT / "policies.html")
        .read_text(encoding="utf-8")
        .replace(
            'content="Garabaly\'s Privacy Policy, Terms of Service, and Escrow Policy. Understand how we protect your data, govern platform usage, and safeguard your transactions."',
            'content="Garabaly\'s Privacy Policy, Terms of Service, Escrow Policy, and Wallet & Transfer Policy. Understand how we protect your data, govern platform usage, safeguard your transactions, and manage wallet transfers."',
        ),
        encoding="utf-8",
    )
    (ROOT / "fr/policies.html").write_text(
        (ROOT / "fr/policies.html")
        .read_text(encoding="utf-8")
        .replace(
            "Politique de confidentialité, Conditions d'utilisation et Politique de séquestre de Garabaly.",
            "Politique de confidentialité, Conditions d'utilisation, Politique de séquestre et Conditions portefeuille & transferts de Garabaly.",
        ),
        encoding="utf-8",
    )
    (ROOT / "ar/policies.html").write_text(
        (ROOT / "ar/policies.html")
        .read_text(encoding="utf-8")
        .replace(
            "سياسة الخصوصية وشروط الخدمة وسياسة الضمان لغرابالي.",
            "سياسة الخصوصية وشروط الخدمة وسياسة الضمان وشروط المحفظة والتحويلات لغرابالي.",
        ),
        encoding="utf-8",
    )

    bank_replacements = [
        ("Bank transfers are coming soon.", "Bank withdrawal is also available."),
        ("Bank transfer coming soon.", "Bank withdrawal is also available."),
        ("Bank transfer is coming soon.", "Bank withdrawal is also available."),
        ("• Bank Transfer: Coming soon.", "• Bank Withdrawal: Available."),
        ("Virements bancaires bientôt disponibles.", "Le retrait bancaire est également disponible."),
        ("Virement bancaire bientôt.", "Le retrait bancaire est également disponible."),
        ("Le virement bancaire arrive bientôt.", "Le retrait bancaire est également disponible."),
        ("Virement bancaire bientôt disponible.", "Le retrait bancaire est également disponible."),
        ("• Virement bancaire : bientôt.", "• Retrait bancaire : disponible."),
        ("التحويلات البنكية قريبة.", "السحب البنكي متاح أيضاً."),
        ("التحويل البنكي قريباً.", "السحب البنكي متاح أيضاً."),
        ("التحويل البنكي قادم قريباً.", "السحب البنكي متاح أيضاً."),
        ("• التحويل البنكي: قريباً.", "• السحب البنكي: متاح."),
        ("Bank transfer coming soon", "Bank withdrawal is also available"),
        ("Virement bancaire bientot", "Retrait bancaire disponible"),
        ("Virement bancaire bientôt", "Le retrait bancaire est également disponible"),
    ]
    replace_all_in_html_files(bank_replacements)

    # policies escrow emails
    for rel in ["policies.html", "fr/policies.html", "ar/policies.html"]:
        p = ROOT / rel
        p.write_text(p.read_text(encoding="utf-8").replace("info@garabaly.com", "support@garabaly.com"), encoding="utf-8")

    # faq emails with verify exception
    for rel in ["faq.html", "fr/faq.html", "ar/faq.html"]:
        path = ROOT / rel
        text = path.read_text(encoding="utf-8")
        verify_markers = [
            'id="faq-verify-garabaly-message"',
            'id="faq-verify-message"',
            "Comment vérifier qu'un message provient bien de Garabaly",
            "How do I verify that a message really comes from Garabaly",
            "كيف أتحقق من أن رسالة",
        ]
        verify_start = -1
        verify_end = -1
        for marker in verify_markers:
            if marker in text:
                verify_start = text.find(marker)
                break
        if verify_start >= 0:
            # find enclosing faq-item end after verify_start
            sub = text[verify_start:]
            end_match = re.search(r'</div>\s*</div>\s*(?=<div class="faq-item"|<!-- =====)', sub)
            if end_match:
                verify_end = verify_start + end_match.end()
        if verify_start >= 0 and verify_end > verify_start:
            before = text[:verify_start].replace("info@garabaly.com", "support@garabaly.com")
            middle = text[verify_start:verify_end]
            after = text[verify_end:].replace("info@garabaly.com", "support@garabaly.com")
            text = before + middle + after
        else:
            text = text.replace("info@garabaly.com", "support@garabaly.com")
        path.write_text(text, encoding="utf-8")
        print(f"faq email fix: {rel}")

    footer_support_en = (
        '<a href="policies.html#escrow">Escrow Policy</a>',
        '<a href="policies.html#escrow">Escrow Policy</a>\n          <a href="policies.html#wallet">Wallet & Transfer Policy</a>',
    )
    footer_support_fr = (
        '<a href="policies.html#escrow">Séquestre</a>',
        '<a href="policies.html#escrow">Séquestre</a>\n          <a href="policies.html#wallet">Portefeuille & Transferts</a>',
    )
    footer_support_fr2 = (
        '<a href="policies.html#escrow">Politique de séquestre</a>',
        '<a href="policies.html#escrow">Politique de séquestre</a>\n          <a href="policies.html#wallet">Portefeuille & Transferts</a>',
    )
    footer_support_ar = (
        '<a href="policies.html#escrow">سياسة الضمان</a>',
        '<a href="policies.html#escrow">سياسة الضمان</a><a href="policies.html#wallet">المحفظة والتحويلات</a>',
    )
    footer_bottom_en = (
        '<a href="policies.html#escrow">Escrow</a>',
        '<a href="policies.html#escrow">Escrow</a>\n          <a href="policies.html#wallet">Wallet</a>',
    )
    footer_bottom_fr = (
        '<a href="policies.html#escrow">Séquestre</a>',
        '<a href="policies.html#escrow">Séquestre</a>\n          <a href="policies.html#wallet">Portefeuille</a>',
    )
    footer_bottom_ar = (
        '<a href="policies.html#escrow">الضمان</a>',
        '<a href="policies.html#escrow">الضمان</a><a href="policies.html#wallet">المحفظة</a>',
    )

    for path in ROOT.rglob("*.html"):
        if "google" in path.name:
            continue
        text = path.read_text(encoding="utf-8")
        orig = text
        rel = str(path.relative_to(ROOT))
        if rel.startswith("fr/"):
            if footer_support_fr[0] in text and "policies.html#wallet" not in text:
                text = text.replace(footer_support_fr[0], footer_support_fr[1])
                text = text.replace(footer_support_fr2[0], footer_support_fr2[1])
            text = text.replace(footer_bottom_fr[0], footer_bottom_fr[1])
        elif rel.startswith("ar/"):
            if footer_support_ar[0] in text and "policies.html#wallet" not in text:
                text = text.replace(footer_support_ar[0], footer_support_ar[1])
            text = text.replace(footer_bottom_ar[0], footer_bottom_ar[1])
        else:
            if "Escrow Policy</a>" in text and "policies.html#wallet" not in text:
                text = text.replace(footer_support_en[0], footer_support_en[1])
            if '>Escrow</a>' in text and '#wallet' not in text:
                text = text.replace(footer_bottom_en[0], footer_bottom_en[1])
        if text != orig:
            path.write_text(text, encoding="utf-8")
            print(f"footer: {rel}")

    print("Done.")


if __name__ == "__main__":
    main()
