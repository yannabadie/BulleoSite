# -*- coding: utf-8 -*-
"""
Fix accessibility issues - add aria-labels to icon-only links
"""

import os
import re

def fix_social_links(filepath):
    """Add aria-labels to social media links"""

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Fix Instagram links without aria-label
    content = re.sub(
        r'(<a[^>]*href="https://www\.instagram\.com/bulleo_"[^>]*)(?!.*aria-label)([^>]*>)\s*(<i class="fab fa-instagram[^"]*")',
        r'\1 aria-label="Instagram Bulleo Soins"\2\3 aria-hidden="true"',
        content
    )

    # Fix Facebook links without aria-label
    content = re.sub(
        r'(<a[^>]*href="https://www\.facebook\.com/[^"]*"[^>]*)(?!.*aria-label)([^>]*>)\s*(<i class="fab fa-facebook[^"]*")',
        r'\1 aria-label="Facebook Bulleo Soins"\2\3 aria-hidden="true"',
        content
    )

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    pages = [
        'services/massage-prenatal.html',
        'services/massage-postnatal.html',
        'services/bain-enveloppe.html',
        'services/soin-rebozo.html',
        'services/atelier-massage-bebe.html',
        'services/atelier-motricite.html',
        'services/reflexologie.html',
        'contact.html',
        'galerie.html',
        'temoignages.html',
        'noel_2025.html',
    ]

    updated = 0
    for page in pages:
        if os.path.exists(page):
            if fix_social_links(page):
                print(f"Updated: {page}")
                updated += 1
            else:
                print(f"No change: {page}")
        else:
            print(f"Not found: {page}")

    print(f"\nTotal updated: {updated}")

if __name__ == '__main__':
    main()
