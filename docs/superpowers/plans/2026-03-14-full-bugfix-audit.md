# Full Bugfix Audit — Bulleo Soins

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking. **All 9 tasks are independent and can run in parallel.**

**Goal:** Fix all 65 bugs found during the comprehensive audit of bulleo-soins.com production files.

**Architecture:** Static HTML site with external CSS (`assets/css/styles.css`) and JS (`assets/js/main.js`). 7 service sub-pages under `services/`. No build system, no test framework — verification is done by grepping for expected patterns. WordPress installation is disabled but files remain on server.

**Tech Stack:** HTML, Tailwind CSS (CDN), Vanilla JS, Stripe, Formspree, TermsFeed

**Server path:** `/lamp0/web/vhosts/bulleo-soins.com/htdocs/`

---

## Chunk 1: Security, Dates, Links, Sitemap (Tasks 1-4)

### Task 1: Security — .htaccess + robots.txt

**Files:**
- Create: `.htaccess`
- Modify: `robots.txt`

- [ ] **Step 1: Create `.htaccess` to block WordPress paths**

```apache
# Block access to WordPress files (installation disabled)
<FilesMatch "^wp-config\.php$">
    Require all denied
</FilesMatch>

<FilesMatch "^wp-config-sample\.php$">
    Require all denied
</FilesMatch>

<FilesMatch "^wp-login\.php$">
    Require all denied
</FilesMatch>

<FilesMatch "^xmlrpc\.php$">
    Require all denied
</FilesMatch>

<FilesMatch "^wp-activate\.php$">
    Require all denied
</FilesMatch>

<FilesMatch "^wp-signup\.php$">
    Require all denied
</FilesMatch>

<FilesMatch "^wp-trackback\.php$">
    Require all denied
</FilesMatch>

<FilesMatch "^wp-cron\.php$">
    Require all denied
</FilesMatch>

<FilesMatch "^wp-mail\.php$">
    Require all denied
</FilesMatch>

# Block WordPress directories
RedirectMatch 403 ^/wp-admin/.*$
RedirectMatch 403 ^/wp-includes/.*$
RedirectMatch 403 ^/wp-content/.*$

# Block sensitive files
<FilesMatch "\.(env|bak|backup|sql|log)$">
    Require all denied
</FilesMatch>

# Security headers
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Enable GZIP compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/webp "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType text/css "access plus 1 week"
    ExpiresByType application/javascript "access plus 1 week"
    ExpiresByType image/x-icon "access plus 1 year"
</IfModule>
```

- [ ] **Step 2: Update `robots.txt` — add WordPress blocks**

Add these lines after the existing `Disallow` entries (around line 15):

```
# WordPress (disabled installation)
Disallow: /wp-admin/
Disallow: /wp-includes/
Disallow: /wp-content/
Disallow: /wp-login.php
Disallow: /wp-config.php
Disallow: /xmlrpc.php
Disallow: /wp-cron.php
Disallow: /wp-mail.php
Disallow: /wp-activate.php
Disallow: /wp-signup.php
Disallow: /wp-trackback.php
Disallow: /wp-comments-post.php
Disallow: /wp-settings.php
Disallow: /wp-load.php
Disallow: /wp-blog-header.php
Disallow: /wp-links-opml.php

# Expired pages
Disallow: /noel_2025.html

# Internal pages
Disallow: /success.html
Disallow: /includes/
Disallow: /_old/
Disallow: /archives/
Disallow: /memory-bank/
```

- [ ] **Step 3: Verify**

Run: `grep -c "wp-admin" .htaccess robots.txt`
Expected: Both files contain wp-admin blocks.

- [ ] **Step 4: Commit**

```bash
git add .htaccess robots.txt
git commit -m "security: block WordPress paths via .htaccess and robots.txt"
```

---

### Task 2: Copyright 2025 → 2026 (all files)

**Files to modify (13 total):**
- `index.html:1794`
- `contact.html:307`
- `galerie.html:269`
- `temoignages.html:351`
- `services/massage-prenatal.html:461`
- `services/massage-postnatal.html:281`
- `services/bain-enveloppe.html:244`
- `services/soin-rebozo.html:240`
- `services/reflexologie.html:178`
- `services/atelier-massage-bebe.html:194`
- `services/atelier-motricite.html:177`
- `includes/footer.html:53`
- `includes/base-template.html:299`
- `index_v2.html:579`

- [ ] **Step 1: Replace `&copy; 2025` with `&copy; 2026` in ALL files**

In each file listed above, find:
```
&copy; 2025
```
Replace with:
```
&copy; 2026
```

- [ ] **Step 2: Fix SEO keywords "2025" → "2026"**

Files:
- `services/massage-prenatal.html:17` — change `"soin prenatal tarbes 2025"` to `"soin prenatal tarbes 2026"`
- `services/bain-enveloppe.html:9` — change `"cadeau naissance tarbes 2025"` to `"cadeau naissance tarbes 2026"`
- `services/soin-rebozo.html:9` — change `"cadeau jeune maman tarbes 2025"` to `"cadeau jeune maman tarbes 2026"`

- [ ] **Step 3: Verify**

Run: `grep -rn "2025" --include="*.html" | grep -v "archives/" | grep -v "_old/" | grep -v "noel_2025"`
Expected: No copyright or keyword hits remaining (noel_2025.html is expected to still have 2025 content).

- [ ] **Step 4: Commit**

```bash
git add index.html contact.html galerie.html temoignages.html services/*.html includes/*.html index_v2.html
git commit -m "fix: update copyright and SEO keywords from 2025 to 2026"
```

---

### Task 3: Remove expired Noel 2025 links + add noindex

**Files to modify:**
- `contact.html:70,98`
- `galerie.html:73,101`
- `temoignages.html:105,133`
- `includes/header.html:39,76`
- `includes/base-template.html:178,212`
- `services/massage-prenatal.html:154` (desktop nav, possibly mobile too)
- `services/massage-postnatal.html:96`
- `services/bain-enveloppe.html:105`
- `services/soin-rebozo.html` (check for noel link)
- `services/reflexologie.html` (check for noel link)
- `services/atelier-massage-bebe.html:57`
- `services/atelier-motricite.html:57`
- `noel_2025.html` (add noindex)
- `sitemap.xml` (remove noel entry and success entry)

- [ ] **Step 1: Remove noel nav links from all files**

In every file listed above, find the `<li>` or `<a>` containing `noel_2025.html` and DELETE the entire `<li>...</li>` element. There are two per file (desktop nav + mobile nav).

Pattern to find: `<li><a href="noel_2025.html"` or `<li><a href="../noel_2025.html"`

Remove the entire `<li>` element including closing `</li>`.

- [ ] **Step 2: Add noindex to noel_2025.html**

In `noel_2025.html`, find line 36:
```html
<meta name="robots" content="index, follow">
```
Replace with:
```html
<meta name="robots" content="noindex, nofollow">
```

- [ ] **Step 3: Clean sitemap.xml**

Remove the `<url>` block for `noel_2025.html` (around line 99-105):
```xml
<url>
    <loc>https://bulleo-soins.com/noel_2025.html</loc>
    ...
</url>
```

Remove the `<url>` block for `success.html` (around line 131-137):
```xml
<url>
    <loc>https://bulleo-soins.com/success.html</loc>
    ...
</url>
```

- [ ] **Step 4: Verify**

Run: `grep -rn "noel_2025" --include="*.html" | grep -v "noel_2025.html" | grep -v "archives/" | grep -v "_old/"`
Expected: Zero results (no more links to noel page from any other page).

Run: `grep "noel_2025\|success.html" sitemap.xml`
Expected: Zero results.

- [ ] **Step 5: Commit**

```bash
git add contact.html galerie.html temoignages.html includes/*.html services/*.html noel_2025.html sitemap.xml
git commit -m "fix: remove expired Noel 2025 links, add noindex, clean sitemap"
```

---

### Task 4: Fix index.html structural issues

**Files:**
- Modify: `index.html:634,1625,1767,2079,2082`

- [ ] **Step 1: Close `<main>` tag before footer**

Find the footer opening (around line 1745-1767). Insert `</main>` before `<footer`:

Before the line that starts with `<footer`, add:
```html
</main>
```

- [ ] **Step 2: Fix newsletter form placeholder**

At line 1625, find:
```html
action="https://formspree.io/f/YOUR_NEWSLETTER_FORM_ID"
```

Replace with a comment disabling the form (since no real ID exists yet):
```html
action="#" onsubmit="alert('Newsletter bientôt disponible !'); return false;"
```

- [ ] **Step 3: Fix mobile service selector — wrong service names**

At line 2079, find:
```
selectServiceAndBook('Soin postnatal complet')
```
Replace with:
```
selectServiceAndBook('Soin postnatal complet – Massage &amp; Rebozo')
```

At line 2082, find:
```
selectServiceAndBook('Massage bebe enfant')
```
Replace with:
```
selectServiceAndBook('Massage bébé &amp; enfant')
```

**NOTE:** Check exact service name in `main.js` serviceConfig to match precisely. The key must match exactly.

- [ ] **Step 4: Add 3 missing services to mobile selector**

After the last `<button>` in the serviceSelectModal (around line 2085), add:
```html
<button onclick="selectServiceAndBook('Réflexologie plantaire Pédiatrique')" class="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors">
    <span class="font-medium text-gray-800">Réflexologie Pédiatrique</span>
    <span class="text-sm text-gray-500 block">50,00 €</span>
</button>
<button onclick="selectServiceAndBook('Agenda: Ma première année de maman')" class="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors">
    <span class="font-medium text-gray-800">Agenda: Ma première année de maman</span>
    <span class="text-sm text-gray-500 block">31,80 €</span>
</button>
<button onclick="selectServiceAndBook('Atelier Motricité &amp; Éveil sensoriel')" class="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors">
    <span class="font-medium text-gray-800">Atelier Motricité & Éveil sensoriel</span>
    <span class="text-sm text-gray-500 block">16,00 €</span>
</button>
```

**NOTE:** Verify exact service names against `main.js` serviceConfig keys before inserting.

- [ ] **Step 5: Remove duplicate inline CSS**

Delete the entire inline `<style>` block from line 123 to line 605 in index.html. The external `assets/css/styles.css` already contains all these rules.

**IMPORTANT:** Before deleting, verify that every CSS rule in the inline block exists in `styles.css`. If any rule is ONLY in the inline block, move it to `styles.css` first.

- [ ] **Step 6: Verify**

Run: `grep -n "</main>" index.html` — should find exactly 1 result.
Run: `grep "YOUR_NEWSLETTER" index.html` — should find 0 results.
Run: `grep "Soin postnatal complet'" index.html` — should find 0 results (fixed version has longer name).

- [ ] **Step 7: Commit**

```bash
git add index.html
git commit -m "fix: close main tag, fix newsletter, fix mobile selector, remove duplicate CSS"
```

---

## Chunk 2: Service Pages + main.js + success.html (Tasks 5-7)

### Task 5: Fix all 7 service pages

**Files:**
- Modify: `services/reflexologie.html:109-110,178,311`
- Modify: `services/atelier-massage-bebe.html:109-110,194,327`
- Modify: `services/atelier-motricite.html:109,177,310`
- Modify: `services/massage-postnatal.html:96,281,414`
- Modify: `services/massage-prenatal.html:461,597`
- Modify: `services/bain-enveloppe.html:105,244,377`
- Modify: `services/soin-rebozo.html:240,373`

- [ ] **Step 1: Fix escaped quotes in onclick (3 files)**

In `services/reflexologie.html`, lines 109-110, find ALL occurrences of:
```
onclick="openBookingModal(\'
```
Replace with:
```
onclick="openBookingModal('
```
And find ALL occurrences of:
```
\')"
```
Replace with:
```
')"
```

Do the same in `services/atelier-massage-bebe.html` lines 109-110 and `services/atelier-motricite.html` line 109.

- [ ] **Step 2: Fix Pediatrique card in reflexologie.html**

At line 110 in `services/reflexologie.html`, the Pediatrique price card calls the wrong service. Find:
```
openBookingModal('Reflexologie Plantaire Obstetrique')
```
on the SECOND price card (the one labeled "Pediatrique") and replace with:
```
openBookingModal('Réflexologie plantaire Pédiatrique')
```

**NOTE:** Verify exact key name in main.js serviceConfig.

- [ ] **Step 3: Fix sticky footer on 6 pages (all except massage-prenatal)**

Each service page has a sticky mobile footer button that hardcodes `'Massage Prenatal'`. Fix each:

| File | Line | Replace with |
|------|------|-------------|
| `services/massage-postnatal.html` | 414 | `openBookingModal('Massage Postnatal')` |
| `services/bain-enveloppe.html` | 377 | `openBookingModal('Bain Enveloppé')` |
| `services/soin-rebozo.html` | 373 | `openBookingModal('Soin Rebozo')` |
| `services/reflexologie.html` | 311 | `openBookingModal('Réflexologie Plantaire Obstétrique')` |
| `services/atelier-massage-bebe.html` | 327 | `openBookingModal('Atelier Massage Bébé')` |
| `services/atelier-motricite.html` | 310 | `openBookingModal('Atelier Motricité & Éveil sensoriel')` |

**CRITICAL:** Verify each service name matches EXACTLY the key in main.js `serviceConfig` object (lines 9-201).

- [ ] **Step 4: Fix wrong service on atelier-massage-bebe.html 55EUR card**

In `services/atelier-massage-bebe.html` line 110, the "Massage bebe/enfant 55EUR" card calls the wrong service:
Find: `openBookingModal('Atelier Massage Bebe')` (on the 55EUR card)
Replace with: `openBookingModal('Massage bébé & enfant')`

**NOTE:** Verify exact key in main.js serviceConfig.

- [ ] **Step 5: Add Stripe JS to 6 service pages**

In each of these 6 files, add the Stripe scripts in the `<head>` section (before the closing `</head>`):

```html
<script async src="https://js.stripe.com/v3/"></script>
<script async src="https://js.stripe.com/v3/buy-button.js"></script>
```

Files: `massage-postnatal.html`, `bain-enveloppe.html`, `soin-rebozo.html`, `reflexologie.html`, `atelier-massage-bebe.html`, `atelier-motricite.html`.

`massage-prenatal.html` already has them at lines 101-102.

- [ ] **Step 6: Add cookie consent to all service pages + subpages**

Add the TermsFeed cookie consent script block from `index.html` (lines 607-625) to each service page just before `</body>`:

```html
<script type="text/javascript" src="https://www.termsfeed.com/public/cookie-consent/4.2.0/cookie-consent.js" charset="UTF-8"></script>
<script type="text/javascript" charset="UTF-8">
document.addEventListener('DOMContentLoaded', function () {
    cookieconsent.run({
        "notice_banner_type": "simple",
        "consent_type": "implied",
        "palette": "light",
        "language": "fr",
        "page_load_consent_levels": ["strictly-necessary", "functionality", "tracking", "targeting"],
        "notice_banner_reject_button_hide": false,
        "preferences_center_close_button_hide": false,
        "page_refresh_confirmation_buttons": false
    });
});
</script>
```

Files: all 7 service pages + `contact.html`, `galerie.html`, `temoignages.html`.

- [ ] **Step 7: Verify**

Run: `grep -rn "\\\\'" services/` — should find 0 escaped quotes.
Run: `grep -rn "Massage Prenatal" services/ | grep "sticky\|footer\|fixed"` — only massage-prenatal.html should match.
Run: `grep -c "stripe.com/v3" services/*.html` — all 7 should show at least 1.
Run: `grep -c "termsfeed" services/*.html contact.html galerie.html temoignages.html` — all should show at least 1.

- [ ] **Step 8: Commit**

```bash
git add services/*.html contact.html galerie.html temoignages.html
git commit -m "fix: service pages — onclick, sticky footer, Stripe JS, cookie consent"
```

---

### Task 6: Fix main.js bugs

**Files:**
- Modify: `assets/js/main.js`

- [ ] **Step 1: Fix `payment=cancel` → `payment=cancelled` mismatch**

At line 1831, find:
```javascript
if (paymentStatus === 'cancel')
```
Replace with:
```javascript
if (paymentStatus === 'cancelled')
```

- [ ] **Step 2: Fix `gift_other` URL param handler**

At line 1800, find:
```javascript
actionSelect.value = 'gift_other';
```

Replace with logic that sets the correct gift option value:
```javascript
actionSelect.value = 'gift_' + serviceName;
```

Where `serviceName` is the resolved service name from the URL param. Check the surrounding code (lines 1795-1805) to ensure `serviceName` variable is available in scope.

- [ ] **Step 3: Add timeout to `initializeStripe()` polling**

At lines 498-505, the `setInterval` has no timeout. Add a counter:

Find:
```javascript
const checkStripe = setInterval(() => {
    if (typeof Stripe !== 'undefined') {
        clearInterval(checkStripe);
```

Replace with:
```javascript
let stripeAttempts = 0;
const checkStripe = setInterval(() => {
    stripeAttempts++;
    if (typeof Stripe !== 'undefined') {
        clearInterval(checkStripe);
```

And after the `resolve(stripe);` line, add:
```javascript
    if (stripeAttempts >= 100) {
        clearInterval(checkStripe);
        console.warn('Stripe failed to load after 10 seconds');
        reject(new Error('Stripe failed to load'));
    }
```

- [ ] **Step 4: Remove all console.log/warn statements**

Remove ALL `console.log(` and `console.warn(` statements from production code. There are ~49 of them throughout the file.

Lines to clean (non-exhaustive, search for all): 321, 327, 366, 371, 495, 502, 511, 577, 592, 593, 610, 614, 620, 629, 639, 644, 671, 672, 679, 688, 717, 845, 869, 871, 874, 908, 1098, 1817, 1822, 1825, 1832, 1845, 1859, 1861, 1886, 1892, 1896, 1904.

**Keep** `console.error(` statements as those indicate real failures.

- [ ] **Step 5: Remove `window.forceSendFormspree` debug utility**

At lines 1903-1910, find and delete the entire `window.forceSendFormspree = function() { ... }` block.

- [ ] **Step 6: Fix `checkBookingParam` incomplete service maps**

At lines 1764-1772 (booking serviceMap) and 1783-1791 (gift serviceMap), add missing entries:

```javascript
'massage-bebe-enfant': 'Massage bébé & enfant',
'soin-postnatal-complet': 'Soin postnatal complet – Massage & Rebozo',
'reflexologie-pediatrique': 'Réflexologie plantaire Pédiatrique',
'agenda': 'Agenda: Ma première année de maman',
```

Add these to BOTH serviceMaps (booking and gift).

- [ ] **Step 7: Verify**

Run: `grep -c "console.log" assets/js/main.js` — should be 0 (or very low).
Run: `grep "forceSendFormspree" assets/js/main.js` — should be 0.
Run: `grep "gift_other" assets/js/main.js` — should be 0.
Run: `grep "'cancel'" assets/js/main.js` — should find `'cancelled'` not `'cancel'`.

- [ ] **Step 8: Commit**

```bash
git add assets/js/main.js
git commit -m "fix: main.js — Stripe timeout, cancel detection, console cleanup, URL params"
```

---

### Task 7: Fix success.html

**Files:**
- Modify: `success.html`

- [ ] **Step 1: Fix race condition — prevent double submission**

Add a guard variable and clear the auto-submit timer on manual click. Find the `submitToFormspree` function and add a guard:

At the top of the function, add:
```javascript
if (window._formspreeSubmitted) return;
window._formspreeSubmitted = true;
```

Find the auto-submit setTimeout (around line 160):
```javascript
setTimeout(() => {
    submitToFormspree();
}, 3000);
```

Store the timer ID and clear it on manual click:
```javascript
const autoSubmitTimer = setTimeout(() => {
    submitToFormspree();
}, 3000);
```

In the button's onclick, add: `clearTimeout(autoSubmitTimer);` before calling `submitToFormspree()`.

- [ ] **Step 2: Fix countdown off-by-one**

The countdown starts at 3 but the form submits at 3s while countdown shows "1s". Fix by aligning the interval with the timeout, or by having the interval trigger the submission when it reaches 0.

Replace the dual timeout+interval approach with a single interval:
```javascript
let countdown = 3;
const timer = setInterval(() => {
    countdown--;
    if (countdown <= 0) {
        clearInterval(timer);
        submitToFormspree();
    } else {
        submitButton.textContent = `Envoi automatique dans ${countdown}s...`;
    }
}, 1000);
```

Remove the separate `setTimeout`.

- [ ] **Step 3: Add fallback for empty localStorage**

Before the form submission, check if formData is empty and warn:
```javascript
if (!savedFormData || Object.keys(formData).length === 0) {
    console.error('Aucune donnee client trouvee - soumission avec donnees minimales');
    // Still submit with session_id so the business knows a payment occurred
}
```

- [ ] **Step 4: Verify**

Run: `grep "setTimeout" success.html` — should find only the timer reference, not a separate auto-submit.
Run: `grep "_formspreeSubmitted" success.html` — should find the guard variable.

- [ ] **Step 5: Commit**

```bash
git add success.html
git commit -m "fix: success.html — prevent double submission, fix countdown, handle empty storage"
```

---

## Chunk 3: CSS/Accessibility + SEO + Subpages (Tasks 8-9)

### Task 8: Fix styles.css — accessibility + cleanup

**Files:**
- Modify: `assets/css/styles.css`

- [ ] **Step 1: Add `:focus-visible` states**

Add after the existing `:hover` rules for interactive elements. Add this block at the end of the file (before closing):

```css
/* Accessibility: Focus states */
.btn-primary:focus-visible,
.btn-secondary:focus-visible,
.nav-link:focus-visible,
.tab:focus-visible,
.gallery-thumbnail:focus-visible,
.social-icon:focus-visible,
.footer-btn:focus-visible,
button:focus-visible,
a:focus-visible,
select:focus-visible,
input:focus-visible,
textarea:focus-visible {
    outline: 2px solid var(--gold);
    outline-offset: 2px;
}

/* Accessibility: Reduced motion */
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}

/* Skip navigation link */
.skip-nav {
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--dark);
    color: white;
    padding: 8px 16px;
    z-index: 10000;
    transition: top 0.3s;
}
.skip-nav:focus {
    top: 0;
}
```

- [ ] **Step 2: Fix `scroll-behavior` on correct element**

Find line 21:
```css
scroll-behavior: smooth;
```
This is on `body`. Move it to `html` instead. Find the `html` selector (if it exists) or add:
```css
html {
    scroll-behavior: smooth;
}
```
Remove `scroll-behavior: smooth;` from the `body` rule.

- [ ] **Step 3: Fix parallax for mobile**

Add to the mobile media query section:
```css
@media (max-width: 768px) {
    .parallax {
        background-attachment: scroll;
    }
}
```

- [ ] **Step 4: Fix duplicate scrollbar styles**

Remove the duplicate `#galleryThumbnails` scrollbar block (lines 359-381) since `.gallery-thumbnails` (lines 317-339) already covers it. Keep only the class-based selector.

- [ ] **Step 5: Verify**

Run: `grep "focus-visible" assets/css/styles.css` — should find multiple rules.
Run: `grep "prefers-reduced-motion" assets/css/styles.css` — should find 1 block.
Run: `grep "skip-nav" assets/css/styles.css` — should find 2 rules.

- [ ] **Step 6: Commit**

```bash
git add assets/css/styles.css
git commit -m "fix: accessibility — focus states, reduced motion, skip nav, parallax mobile"
```

---

### Task 9: Fix subpages SEO + broken content

**Files:**
- Modify: `contact.html`
- Modify: `galerie.html`
- Modify: `temoignages.html`

- [ ] **Step 1: Fix fake Google Maps URLs in temoignages.html**

At line 152, find the Google rating badge with fake place ID `0x1234567890abcdef`. Either:
- Replace with the real Google Place ID for Bulleo Soins
- Or remove the badge entirely if the real ID is unknown

At line 304, find the "Laisser un avis" link with `placeid=ChIJ_____Bulleo`. Either:
- Replace with the real Google Maps review URL
- Or change to a generic Google Maps search: `https://www.google.com/maps/search/Bulleo+Soins+Tarbes`

- [ ] **Step 2: Fix `og:image` relative path in galerie.html**

At line 21, find:
```html
<meta property="og:image" content="assets/images/og-image.jpg">
```
Replace with:
```html
<meta property="og:image" content="https://bulleo-soins.com/assets/images/og-image.jpg">
```

- [ ] **Step 3: Add skip navigation link to index.html**

At the very beginning of `<body>` in index.html (after the GTM noscript, around line 633), add:
```html
<a href="#prestations" class="skip-nav">Aller au contenu principal</a>
```

- [ ] **Step 4: Fix `priceRange` in Schema.org**

In `services/bain-enveloppe.html` line 44 and `services/soin-rebozo.html` line 44, find:
```json
"priceRange": "EUR EUR"
```
Replace with appropriate values:
- bain-enveloppe: `"priceRange": "70-155 EUR"`
- soin-rebozo: `"priceRange": "90-160 EUR"`

In `includes/base-template.html` line 81, fix similarly:
```json
"priceRange": "16-160 EUR"
```

- [ ] **Step 5: Add `rel="noopener noreferrer"` to external links**

In `contact.html`, `galerie.html`, `temoignages.html`: find all `target="_blank"` that are missing `rel="noopener noreferrer"` and add it.

Search pattern: `target="_blank"` without `rel=` on the same element.

- [ ] **Step 6: Verify**

Run: `grep -n "0x1234\|ChIJ_____" temoignages.html` — should be 0.
Run: `grep "og:image.*assets/" galerie.html` — should show absolute URL.
Run: `grep "EUR EUR" services/*.html includes/*.html` — should be 0.

- [ ] **Step 7: Commit**

```bash
git add contact.html galerie.html temoignages.html index.html services/bain-enveloppe.html services/soin-rebozo.html includes/base-template.html
git commit -m "fix: SEO — og:image, priceRange, skip nav, noopener, fake URLs"
```

---

## Execution Notes

### Parallelization Map

All 9 tasks are **fully independent** and can run simultaneously:

```
Task 1 (security)     ─┐
Task 2 (copyright)    ─┤
Task 3 (noel links)   ─┤
Task 4 (index.html)   ─┼─► All parallel, no dependencies
Task 5 (service pages) ─┤
Task 6 (main.js)      ─┤
Task 7 (success.html)  ─┤
Task 8 (styles.css)   ─┤
Task 9 (subpages SEO)  ─┘
```

**Conflict warning:** Tasks 2, 3, and 5 all modify service page files. If running in parallel with agents that share the working directory, merge conflicts may occur on `services/*.html`. To avoid this:
- Option A: Run tasks 2, 3, 5 sequentially (they're fast)
- Option B: Use git worktrees for isolation
- Option C: Merge carefully after all complete

**Safest parallel grouping (4 agents max):**
- Agent A: Tasks 1 + 2 + 3 (security + dates + noel — sequential, all small changes across many files)
- Agent B: Tasks 4 (index.html structural fixes)
- Agent C: Tasks 5 + 9 (service pages + subpages — related file sets, sequential)
- Agent D: Tasks 6 + 7 + 8 (main.js + success.html + styles.css — all different files, sequential)

### Critical verification before deployment

After all tasks complete:
1. `grep -rn "2025" --include="*.html" | grep -v "archives\|_old\|noel_2025"` — should be 0
2. `grep -rn "noel_2025" --include="*.html" | grep -v "noel_2025.html\|archives\|_old"` — should be 0
3. `grep -rn "YOUR_NEWSLETTER" --include="*.html"` — should be 0
4. `grep -c "console.log" assets/js/main.js` — should be 0
5. `grep -rn "\\\\'" services/` — should be 0
6. Open each service page in browser → click price card → verify correct modal opens
7. Open each service page on mobile → click sticky footer button → verify correct service
8. Visit `https://bulleo-soins.com/wp-config.php` → should return 403 Forbidden
9. Visit `https://bulleo-soins.com/wp-login.php` → should return 403 Forbidden
