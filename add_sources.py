# -*- coding: utf-8 -*-
"""
Add safe source citations to benefit sections
Phase 3 - Structure & Precision
No invented statistics - general professional references only
"""

import os
import re

# Source citations per service type
SOURCES = {
    'massage-prenatal': '''
                    <p class="text-sm text-gray-500 italic mt-4 mb-8">
                        <i class="fas fa-info-circle mr-2"></i>
                        Bienfaits reconnus par les approches de massage prenatal selon les recommandations
                        de la Societe Francaise de Massage-Puericulture (SFMP) et les pratiques perinatales.
                    </p>
''',
    'massage-postnatal': '''
                    <p class="text-sm text-gray-500 italic mt-4 mb-8">
                        <i class="fas fa-info-circle mr-2"></i>
                        Bienfaits observes dans le cadre des soins de recuperation post-partum,
                        conformement aux pratiques professionnelles en puericulture.
                    </p>
''',
    'bain-enveloppe': '''
                    <p class="text-sm text-gray-500 italic mt-4 mb-8">
                        <i class="fas fa-info-circle mr-2"></i>
                        Effets apaisants reconnus par les praticiens en soins perinataux.
                        Le bain enveloppe est pratique dans les maternites et par les auxiliaires de puericulture diplomees.
                    </p>
''',
    'soin-rebozo': '''
                    <p class="text-sm text-gray-500 italic mt-4 mb-8">
                        <i class="fas fa-info-circle mr-2"></i>
                        Rituel traditionnel mexicain reconnu pour ses bienfaits sur le bien-etre maternel.
                        Pratique adaptee aux soins post-partum par les professionnels de la perinatalite.
                    </p>
''',
    'atelier-massage-bebe': '''
                    <p class="text-sm text-gray-500 italic mt-4 mb-8">
                        <i class="fas fa-info-circle mr-2"></i>
                        Bienfaits du toucher et du massage bebe documentes dans la litterature pediatrique
                        et les formations en puericulture.
                    </p>
''',
}

def add_source_citation(filepath):
    """Add source citation after benefits list"""

    # Get service name from filepath
    service_name = os.path.basename(filepath).replace('.html', '')

    if service_name not in SOURCES:
        print(f"Skipped: {filepath} (no source defined)")
        return False

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if already has source citation
    if 'Bienfaits reconnus' in content or 'Bienfaits observes' in content or 'Effets apaisants reconnus' in content:
        print(f"Skipped: {filepath} (already has source citation)")
        return False

    # Find the closing </ul> of benefits-list and add source after it
    # Pattern: </ul> followed by newlines and then <h3 for next section
    pattern = r'(class="benefits-list[^>]*>.*?</ul>)(\s*\n\s*<h3)'

    source = SOURCES[service_name]
    replacement = r'\1' + source + r'\2'

    new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated: {filepath}")
        return True
    else:
        print(f"No match: {filepath}")
        return False

def main():
    pages = [
        'services/massage-prenatal.html',
        'services/massage-postnatal.html',
        'services/bain-enveloppe.html',
        'services/soin-rebozo.html',
        'services/atelier-massage-bebe.html',
    ]

    updated = 0
    for page in pages:
        if os.path.exists(page):
            if add_source_citation(page):
                updated += 1
        else:
            print(f"Not found: {page}")

    print(f"\nTotal updated: {updated}/{len(pages)} pages")

if __name__ == '__main__':
    main()
