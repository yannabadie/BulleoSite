# -*- coding: utf-8 -*-
"""
Test complet Bulleo Soins - Tous profils utilisateurs
"""

import os
import re
import json
from datetime import datetime

# Configuration
BASE_URL = "http://127.0.0.1:8080"
PAGES = {
    'index': 'index.html',
    'noel': 'noel_2025.html',
    'contact': 'contact.html',
    'galerie': 'galerie.html',
    'temoignages': 'temoignages.html',
    'success': 'success.html',
    'massage_prenatal': 'services/massage-prenatal.html',
    'massage_postnatal': 'services/massage-postnatal.html',
    'bain_enveloppe': 'services/bain-enveloppe.html',
    'soin_rebozo': 'services/soin-rebozo.html',
    'atelier_massage_bebe': 'services/atelier-massage-bebe.html',
    'atelier_motricite': 'services/atelier-motricite.html',
    'reflexologie': 'services/reflexologie.html',
}

REPORT = {
    'timestamp': datetime.now().isoformat(),
    'tests': [],
    'errors': [],
    'warnings': [],
    'passed': 0,
    'failed': 0
}

def log_test(name, status, details=""):
    result = {'name': name, 'status': status, 'details': details}
    REPORT['tests'].append(result)
    if status == 'PASS':
        REPORT['passed'] += 1
        print(f"  [PASS] {name}")
    elif status == 'FAIL':
        REPORT['failed'] += 1
        REPORT['errors'].append(f"{name}: {details}")
        print(f"  [FAIL] {name} - {details}")
    elif status == 'WARN':
        REPORT['warnings'].append(f"{name}: {details}")
        print(f"  [WARN] {name} - {details}")

def check_file_exists(filepath):
    """Verify file exists"""
    return os.path.exists(filepath)

def check_html_structure(filepath):
    """Check basic HTML structure"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    tests = []

    # DOCTYPE
    if '<!DOCTYPE html>' in content or '<!doctype html>' in content:
        tests.append(('DOCTYPE present', True, ''))
    else:
        tests.append(('DOCTYPE present', False, 'Missing DOCTYPE'))

    # Charset meta first in head
    head_match = re.search(r'<head[^>]*>(.*?)</head>', content, re.DOTALL | re.IGNORECASE)
    if head_match:
        head_content = head_match.group(1)
        # Check if charset is early in head
        charset_pos = head_content.find('charset')
        if charset_pos != -1 and charset_pos < 500:
            tests.append(('Charset meta position', True, ''))
        else:
            tests.append(('Charset meta position', False, 'Charset should be first in head'))

    # Title tag
    if '<title>' in content and '</title>' in content:
        tests.append(('Title tag present', True, ''))
    else:
        tests.append(('Title tag present', False, 'Missing title tag'))

    # Meta description
    if 'meta name="description"' in content.lower():
        tests.append(('Meta description present', True, ''))
    else:
        tests.append(('Meta description present', False, 'Missing meta description'))

    # Canonical link
    if 'rel="canonical"' in content:
        tests.append(('Canonical link present', True, ''))
    else:
        tests.append(('Canonical link present', False, 'Missing canonical link'))

    return tests

def check_duplicate_ids(filepath):
    """Check for duplicate IDs in HTML"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find all IDs
    ids = re.findall(r'id=["\']([^"\']+)["\']', content)
    seen = {}
    duplicates = []

    for id_val in ids:
        if id_val in seen:
            seen[id_val] += 1
            if seen[id_val] == 2:  # Only report first duplicate
                duplicates.append(id_val)
        else:
            seen[id_val] = 1

    return duplicates

def check_links(filepath, base_dir):
    """Check for broken internal links"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find all href links
    hrefs = re.findall(r'href=["\']([^"\'#][^"\']*)["\']', content)
    broken = []

    file_dir = os.path.dirname(filepath)

    for href in hrefs:
        # Skip external links, javascript, mailto, tel
        if href.startswith(('http://', 'https://', 'javascript:', 'mailto:', 'tel:', '//')):
            continue

        # Resolve relative path
        if href.startswith('../'):
            target = os.path.normpath(os.path.join(file_dir, href))
        elif href.startswith('./'):
            target = os.path.normpath(os.path.join(file_dir, href[2:]))
        else:
            target = os.path.normpath(os.path.join(file_dir, href))

        # Remove anchor
        target = target.split('#')[0]

        if target and not os.path.exists(target):
            broken.append(href)

    return broken

def check_images(filepath, base_dir):
    """Check for broken image sources"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find all img src
    srcs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', content)
    broken = []
    missing_alt = 0
    missing_lazy = 0

    file_dir = os.path.dirname(filepath)

    for src in srcs:
        # Skip external images
        if src.startswith(('http://', 'https://', 'data:')):
            continue

        # Resolve relative path
        if src.startswith('../'):
            target = os.path.normpath(os.path.join(file_dir, src))
        elif src.startswith('./'):
            target = os.path.normpath(os.path.join(file_dir, src[2:]))
        else:
            target = os.path.normpath(os.path.join(file_dir, src))

        if not os.path.exists(target):
            broken.append(src)

    # Check for alt attributes
    imgs_without_alt = re.findall(r'<img(?![^>]*alt=)[^>]*>', content)
    missing_alt = len(imgs_without_alt)

    # Check for lazy loading
    imgs_without_lazy = re.findall(r'<img(?![^>]*loading=)[^>]*>', content)
    missing_lazy = len(imgs_without_lazy)

    return broken, missing_alt, missing_lazy

def check_buttons_type(filepath):
    """Check if buttons have type attribute"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find buttons without type
    buttons_no_type = re.findall(r'<button(?![^>]*type=)[^>]*>', content)
    return len(buttons_no_type)

def check_accessibility(filepath):
    """Check accessibility issues"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    issues = []

    # Links without text
    empty_links = re.findall(r'<a[^>]*>(\s*<[^/][^>]*>\s*)*</a>', content)
    if empty_links:
        issues.append(f"{len(empty_links)} links without discernible text")

    # Form inputs without labels
    inputs = re.findall(r'<input[^>]+id=["\']([^"\']+)["\']', content)
    for input_id in inputs:
        if f'for="{input_id}"' not in content and f"for='{input_id}'" not in content:
            # Check if wrapped in label
            if f'id="{input_id}"' not in re.findall(r'<label[^>]*>.*?</label>', content, re.DOTALL):
                pass  # Could be implicit label

    # Missing lang attribute
    if '<html' in content and 'lang=' not in content[:500]:
        issues.append("Missing lang attribute on html tag")

    return issues

def check_javascript_syntax(filepath):
    """Basic JavaScript syntax check"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    issues = []

    # Find script blocks
    scripts = re.findall(r'<script[^>]*>(.*?)</script>', content, re.DOTALL)

    for i, script in enumerate(scripts):
        # Skip external scripts
        if not script.strip():
            continue

        # Check for common issues
        if script.count('{') != script.count('}'):
            issues.append(f"Script {i+1}: Unbalanced braces")

        if script.count('(') != script.count(')'):
            issues.append(f"Script {i+1}: Unbalanced parentheses")

        if script.count('[') != script.count(']'):
            issues.append(f"Script {i+1}: Unbalanced brackets")

        # Check for undefined references (basic)
        if 'undefined' in script and 'typeof' not in script:
            pass  # Could be intentional

    return issues

def check_service_config(filepath):
    """Check serviceConfig and serviceToPriceId consistency"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    issues = []

    # Find serviceConfig
    config_match = re.search(r'const\s+serviceConfig\s*=\s*\{(.*?)\n\s*\};', content, re.DOTALL)
    if not config_match:
        return ["serviceConfig not found"]

    # Find serviceToPriceId
    price_match = re.search(r'const\s+serviceToPriceId\s*=\s*\{(.*?)\n\s*\};', content, re.DOTALL)
    if not price_match:
        return ["serviceToPriceId not found"]

    # Extract service names from serviceConfig
    config_services = re.findall(r"'([^']+)':\s*\{", config_match.group(1))

    # Extract service names from serviceToPriceId
    price_services = re.findall(r"'([^']+)':\s*['{]", price_match.group(1))

    # Compare
    config_set = set(config_services)
    price_set = set(price_services)

    missing_in_price = config_set - price_set
    missing_in_config = price_set - config_set

    if missing_in_price:
        issues.append(f"Services in serviceConfig but not in serviceToPriceId: {missing_in_price}")

    if missing_in_config:
        issues.append(f"Services in serviceToPriceId but not in serviceConfig: {missing_in_config}")

    # Check relatedOffers keys consistency
    related_offers = re.findall(r"key:\s*'([^']+)'", config_match.group(1))
    price_related = re.findall(r"relatedOffers:\s*\{([^}]+)\}", price_match.group(1))

    if price_related:
        price_keys = re.findall(r"'([^']+)':", price_related[0])
        offer_set = set(related_offers)
        price_key_set = set(price_keys)

        if offer_set != price_key_set:
            issues.append(f"Mismatched relatedOffers keys")

    return issues

def check_safari_compatibility(filepath):
    """Check for Safari CSS compatibility"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    issues = []

    # Check for user-select without -webkit-
    if 'user-select:' in content and '-webkit-user-select' not in content:
        issues.append("user-select without -webkit-user-select (Safari)")

    # Check for backdrop-filter without -webkit-
    if 'backdrop-filter:' in content and '-webkit-backdrop-filter' not in content:
        issues.append("backdrop-filter without -webkit-backdrop-filter (Safari)")

    return issues

def run_tests():
    """Run all tests"""
    print("\n" + "="*60)
    print("BULLEO SOINS - RAPPORT DE TESTS COMPLET")
    print("="*60)
    print(f"Date: {REPORT['timestamp']}\n")

    base_dir = os.path.dirname(os.path.abspath(__file__))

    # Test each page
    for page_name, page_path in PAGES.items():
        full_path = os.path.join(base_dir, page_path)
        print(f"\n{'='*40}")
        print(f"PAGE: {page_path}")
        print('='*40)

        # File exists
        if not check_file_exists(full_path):
            log_test(f"{page_name}: File exists", 'FAIL', 'File not found')
            continue
        else:
            log_test(f"{page_name}: File exists", 'PASS')

        # HTML Structure
        html_tests = check_html_structure(full_path)
        for test_name, passed, details in html_tests:
            status = 'PASS' if passed else 'WARN'
            log_test(f"{page_name}: {test_name}", status, details)

        # Duplicate IDs
        duplicates = check_duplicate_ids(full_path)
        if duplicates:
            log_test(f"{page_name}: Unique IDs", 'FAIL', f"Duplicates: {duplicates}")
        else:
            log_test(f"{page_name}: Unique IDs", 'PASS')

        # Broken links
        broken_links = check_links(full_path, base_dir)
        if broken_links:
            log_test(f"{page_name}: Internal links", 'WARN', f"Broken: {broken_links[:3]}...")
        else:
            log_test(f"{page_name}: Internal links", 'PASS')

        # Images
        broken_imgs, missing_alt, missing_lazy = check_images(full_path, base_dir)
        if broken_imgs:
            log_test(f"{page_name}: Image sources", 'FAIL', f"Broken: {broken_imgs}")
        else:
            log_test(f"{page_name}: Image sources", 'PASS')

        if missing_alt > 0:
            log_test(f"{page_name}: Image alt attributes", 'WARN', f"{missing_alt} images without alt")

        # Buttons type
        buttons_no_type = check_buttons_type(full_path)
        if buttons_no_type > 0:
            log_test(f"{page_name}: Button type attributes", 'WARN', f"{buttons_no_type} buttons without type")
        else:
            log_test(f"{page_name}: Button type attributes", 'PASS')

        # Accessibility
        a11y_issues = check_accessibility(full_path)
        if a11y_issues:
            for issue in a11y_issues:
                log_test(f"{page_name}: Accessibility", 'WARN', issue)
        else:
            log_test(f"{page_name}: Accessibility", 'PASS')

        # Safari compatibility
        safari_issues = check_safari_compatibility(full_path)
        if safari_issues:
            for issue in safari_issues:
                log_test(f"{page_name}: Safari CSS", 'WARN', issue)

        # JavaScript syntax (for main pages)
        if page_name in ['index', 'noel']:
            js_issues = check_javascript_syntax(full_path)
            if js_issues:
                for issue in js_issues:
                    log_test(f"{page_name}: JavaScript", 'WARN', issue)
            else:
                log_test(f"{page_name}: JavaScript syntax", 'PASS')

            # Service config (only index.html)
            if page_name == 'index':
                config_issues = check_service_config(full_path)
                if config_issues:
                    for issue in config_issues:
                        log_test(f"{page_name}: Service config", 'FAIL', issue)
                else:
                    log_test(f"{page_name}: Service config sync", 'PASS')

    # Summary
    print("\n" + "="*60)
    print("RESUME")
    print("="*60)
    print(f"Tests passes: {REPORT['passed']}")
    print(f"Tests echoues: {REPORT['failed']}")
    print(f"Avertissements: {len(REPORT['warnings'])}")

    if REPORT['errors']:
        print("\n ERREURS CRITIQUES:")
        for err in REPORT['errors']:
            print(f"  - {err}")

    if REPORT['warnings']:
        print("\n AVERTISSEMENTS:")
        for warn in REPORT['warnings'][:10]:
            print(f"  - {warn}")
        if len(REPORT['warnings']) > 10:
            print(f"  ... et {len(REPORT['warnings']) - 10} autres")

    # Save report
    with open('TEST_REPORT.json', 'w', encoding='utf-8') as f:
        json.dump(REPORT, f, indent=2, ensure_ascii=False)

    print(f"\nRapport sauvegarde: TEST_REPORT.json")

    return REPORT

if __name__ == '__main__':
    run_tests()
