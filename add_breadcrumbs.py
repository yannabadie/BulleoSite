# -*- coding: utf-8 -*-
"""
Add breadcrumbs to service pages
Phase 3 - Structure & Precision
"""

import os
import re

# Service pages with their breadcrumb structure
SERVICES = {
    'services/massage-prenatal.html': {
        'category': 'Grossesse',
        'category_anchor': '#grossesse',
        'name': 'Massage Prenatal'
    },
    'services/massage-postnatal.html': {
        'category': 'Post-Partum',
        'category_anchor': '#postpartum',
        'name': 'Massage Postnatal'
    },
    'services/bain-enveloppe.html': {
        'category': 'Bebe',
        'category_anchor': '#bebe',
        'name': 'Bain Enveloppe'
    },
    'services/soin-rebozo.html': {
        'category': 'Post-Partum',
        'category_anchor': '#postpartum',
        'name': 'Soin Rebozo'
    },
    'services/atelier-massage-bebe.html': {
        'category': 'Bebe',
        'category_anchor': '#bebe',
        'name': 'Atelier Massage Bebe'
    },
    'services/atelier-motricite.html': {
        'category': 'Bebe',
        'category_anchor': '#bebe',
        'name': 'Atelier Motricite'
    },
    'services/reflexologie.html': {
        'category': 'Grossesse',
        'category_anchor': '#grossesse',
        'name': 'Reflexologie Plantaire'
    },
}

def create_breadcrumb_html(service_info):
    """Create breadcrumb HTML with Schema.org"""
    return f'''
        <!-- Breadcrumb (Phase 3) -->
        <nav class="breadcrumb container mx-auto px-4 pt-24 pb-4" aria-label="Fil d'Ariane">
            <ol class="flex items-center space-x-2 text-sm" itemscope itemtype="https://schema.org/BreadcrumbList">
                <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                    <a href="../index.html" itemprop="item" class="text-white/70 hover:text-white">
                        <span itemprop="name">Accueil</span>
                    </a>
                    <meta itemprop="position" content="1" />
                </li>
                <li class="text-white/50"><i class="fas fa-chevron-right text-xs"></i></li>
                <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                    <a href="../index.html#prestations" itemprop="item" class="text-white/70 hover:text-white">
                        <span itemprop="name">{service_info['category']}</span>
                    </a>
                    <meta itemprop="position" content="2" />
                </li>
                <li class="text-white/50"><i class="fas fa-chevron-right text-xs"></i></li>
                <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                    <span itemprop="name" class="text-white font-medium">{service_info['name']}</span>
                    <meta itemprop="position" content="3" />
                </li>
            </ol>
        </nav>
'''

def add_breadcrumb(filepath, service_info):
    """Add breadcrumb after header in service page"""

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if already has breadcrumb
    if 'aria-label="Fil d\'Ariane"' in content or 'BreadcrumbList' in content:
        print(f"Skipped: {filepath} (already has breadcrumb)")
        return False

    # Find the end of header section and insert breadcrumb
    # Look for the closing </header> tag
    if '</header>' in content:
        breadcrumb = create_breadcrumb_html(service_info)
        new_content = content.replace('</header>', '</header>' + breadcrumb, 1)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)

        print(f"Updated: {filepath}")
        return True
    else:
        print(f"Warning: {filepath} - no </header> found")
        return False

def main():
    updated = 0
    for filepath, info in SERVICES.items():
        if os.path.exists(filepath):
            if add_breadcrumb(filepath, info):
                updated += 1
        else:
            print(f"Not found: {filepath}")

    print(f"\nTotal updated: {updated}/{len(SERVICES)} pages")

if __name__ == '__main__':
    main()
