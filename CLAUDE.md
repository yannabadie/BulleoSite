# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bulleo Soins is a French-language website for a perinatal care business in Tarbes, France. The site promotes wellness services for pregnant women and new mothers, including prenatal massage, wrapped baths for newborns, rebozo care, and baby workshops.

## Architecture

### Technology Stack
- **Frontend**: Pure HTML with inline CSS and JavaScript
- **Styling**: Tailwind CSS (CDN)
- **Forms**: EmailJS for contact form handling, Formspree for reservations
- **Payments**: Stripe integration for payment processing
- **Analytics**: Google Tag Manager (GTM-MZT366F6)
- **Images**: Hosted locally in `assets/images/` (migrated from Google Photos Dec 2025)

### File Structure
- `index.html` - Main page (~123 KB)
- `contact.html`, `galerie.html`, `temoignages.html` - Secondary pages
- `noel_2025.html` - Dedicated Christmas offers page (valid until December 25, 2025)
- `success.html` - Payment success page
- `services/` - Individual service pages (7 pages)
- `assets/js/main.js` - Main JavaScript file (~1900 lines)
- `assets/css/styles.css` - External CSS styles
- `assets/images/` - All images hosted locally (27 .webp files)
- `assets/favicon/` - Favicon and PWA assets
- `includes/` - Reusable HTML components (header, footer)
- `archives/` - Historical documentation and backups

## Development Notes

### Critical Considerations
- **No build system**: This is a static HTML site with no build process, package.json, or dependency management
- **Modular JS/CSS**: Main logic is in `assets/js/main.js` and `assets/css/styles.css`
- **CDN dependencies**: Uses CDN links for Tailwind CSS, EmailJS, Stripe, and Font Awesome
- **Local images**: All images in `assets/images/` (logos, services, portraits, gallery, misc)

### Service Name Convention (CRITICAL)

**Service names in JavaScript must NOT contain accents.** This is because:
1. `onclick` attributes in HTML use these names
2. `serviceConfig` keys in `main.js` use these names
3. Mismatched names cause booking buttons to fail silently

| Correct (in code) | Incorrect |
|-------------------|-----------|
| `'Massage Prenatal'` | `'Massage Prénatal'` |
| `'Massage Postnatal'` | `'Massage Post-natal'` |
| `'Bain Enveloppe'` | `'Bain Enveloppé'` |
| `'Soin Rebozo'` | `'Soin Rébozo'` |
| `'Reflexologie Plantaire Obstetrique'` | `'Réflexologie Plantaire Obstétrique'` |
| `'Atelier Massage Bebe'` | `'Atelier Massage Bébé'` |

**Example onclick usage:**
```html
<!-- CORRECT -->
<button onclick="openBookingModal('Massage Prenatal')">Reserver</button>

<!-- WRONG - Will fail silently -->
<button onclick="openBookingModal('Massage Prénatal')">Reserver</button>
```

### SEO & Schema
The site includes comprehensive SEO metadata:
- Open Graph tags for social sharing
- Schema.org structured data for local business
- Google Business integration
- Geo-location metadata for Tarbes, France

### External Services
- **EmailJS**: Form submissions
- **Stripe**: Payment processing with buy buttons
- **Google Tag Manager**: Analytics tracking
- **Cookie Consent**: TermsFeed integration

## Price Update Protocol (Updated: 19 October 2025)

### Overview
This site uses a dual configuration system for pricing and payment processing. **BOTH systems must be updated in sync** for proper functionality.

### Critical Components

#### 1. `serviceConfig` Object (Lines ~2100-2280)
**Purpose**: Controls UI display - prices shown to users, dropdown options, modal text.

**Location**: JavaScript object defining all services and their variants/offers.

**Structure**:
```javascript
'Service Name': {
    name: 'Service Name',
    article: 'un/une',
    giftText: 'Gift button text',
    bookText: 'Booking button text',
    price: 'XX,00 €',              // Simple service price
    buyButtonId: 'buy_btn_xxx',    // Stripe Buy Button ID
    
    // OR for services with multiple options:
    hasRelatedOffers: true,
    relatedOffers: [
        {
            key: 'unique_key',
            name: 'Display name',
            price: 'XX,00 €',
            priceId: 'price_xxx',
            buyButtonId: 'buy_btn_xxx'
        }
    ]
}
```

#### 2. `serviceToPriceId` Object (Lines ~2805-2855)
**Purpose**: Maps service selections to Stripe Price IDs for payment routing.

**Location**: Inside `handlePayment()` function.

**Structure**:
```javascript
const serviceToPriceId = {
    'Service Name': 'price_xxx',  // Simple service
    
    // OR for services with variants:
    'Service Name': {
        default: 'price_xxx',
        relatedOffers: {
            'unique_key': 'price_xxx'
        }
    }
};
```

### 🔴 CRITICAL: Both Systems Must Match

**Keys in `serviceConfig.relatedOffers` MUST match keys in `serviceToPriceId.relatedOffers`**

Example - If serviceConfig has:
```javascript
relatedOffers: [{ key: 'bain_rebozo', ... }]
```

Then serviceToPriceId MUST have:
```javascript
relatedOffers: { 'bain_rebozo': 'price_xxx' }
```

### Step-by-Step Price Update Protocol

#### For Simple Services (Single Price)

**Services**: Réflexologie Plantaire, Massage bébé & enfant, Atelier Massage Bébé, Agenda

**Steps**:
1. **Update vignette price** (Lines ~800-1150)
   - Find: `<span class="text-gray-600">Tarif : XX€</span>`
   - Update the displayed price

2. **Update serviceConfig** (Lines ~2100-2280)
   - Find service entry
   - Update `price: 'XX,00 €'`
   - Update `buyButtonId` if changed

3. **Update serviceToPriceId** (Lines ~2805-2855)
   - Find service entry
   - Update Price ID: `'Service Name': 'price_xxx'`

4. **Update modal description** (Lines ~3200-3700)
   - Search for service in `serviceDetails` object
   - Find: `<span>Tarif : XX€</span>` in `details` property
   - Update the price

#### For Services with Combined Offers

**Services**: Massage Prénatal, Massage Postnatal, Bain Enveloppé, Soin Rebozo

**Steps**:
1. **Update vignette price** (if applicable)
   - Usually shows "À partir de" (from) price
   - Update base price if changed

2. **Update serviceConfig.relatedOffers** (Lines ~2100-2280)
   ```javascript
   relatedOffers: [
       {
           key: 'unique_key',        // ⚠️ Must match serviceToPriceId
           name: 'Display Name',
           price: 'XX,00 €',         // ✅ Update this
           priceId: 'price_xxx',     // ✅ Update this
           buyButtonId: 'buy_btn_xxx' // ✅ Update this
       }
   ]
   ```

3. **Update serviceToPriceId.relatedOffers** (Lines ~2805-2855)
   ```javascript
   'Service Name': {
       default: 'price_xxx',
       relatedOffers: {
           'unique_key': 'price_xxx'  // ✅ Must match key above
       }
   }
   ```

4. **Update modal description** (Lines ~3200-3700)
   - Update prices in `details` property

### Adding a New Combined Offer

**Example**: Adding "Bain + Soin Rebozo" to "Bain Enveloppé"

1. **Choose a unique key**: `bain_rebozo`

2. **Add to serviceConfig.relatedOffers**:
   ```javascript
   'Bain Enveloppé': {
       hasRelatedOffers: true,
       relatedOffers: [
           // ... existing offers
           {
               key: 'bain_rebozo',
               name: 'Bain + Soin Rebozo',
               price: '155,00 €',
               priceId: 'price_1SIyWNCm8TYzw7cAFlJgRQpZ',
               buyButtonId: 'buy_btn_1SJtK5Cm8TYzw7cAx8WYvhKq'
           }
       ]
   }
   ```

3. **Add to serviceToPriceId.relatedOffers**:
   ```javascript
   'Bain Enveloppé': {
       default: 'price_1SIyM2Cm8TYzw7cAVrkQJ2FH',
       relatedOffers: {
           // ... existing keys
           'bain_rebozo': 'price_1SIyWNCm8TYzw7cAFlJgRQpZ'
       }
   }
   ```

### Christmas Offers Management

**Dedicated Christmas Page**: `noel_2025.html`
- Separate page for seasonal promotions
- **Validity Period**: Until December 25th, 2025 (NOT December 31st)
- Contains special Christmas-themed offers with 🎄 emoji

**Identifying Christmas Offers**:
- Have `isChristmasOffer: true` flag
- Have 🎄 emoji in name
- Should ONLY exist in `noel_2025.html`, NOT in `index.html`

**Steps**:
1. Find offers with `isChristmasOffer: true` in serviceConfig
2. Remove entire offer object from `relatedOffers` array
3. Remove corresponding key from `serviceToPriceId.relatedOffers`
4. Keep regular combined offers intact

**Example Removed** (19 Oct 2025):
- `prenatal_postnatal` (Massage Prénatal + Massage Post Partum - 150€)
- `postnatal_prenatal` (Massage Postnatal + Massage Prénatal - 150€)
- `bain_massage` (Bain + Massage femme enceinte ou post partum - 135€)
- `bain_rebozo` (Bain + Soin Rebozo - 150€) - **Note**: Different from regular offer at 155€
- `rebozo_postnatal` (Soin Rebozo + Massage Post Partum - 155€)

### Validation Checklist

After any price update, verify:

- [ ] Vignette price updated (if applicable)
- [ ] `serviceConfig.price` OR `relatedOffers[].price` updated
- [ ] `serviceConfig.buyButtonId` OR `relatedOffers[].buyButtonId` updated
- [ ] `serviceToPriceId` Price ID matches
- [ ] Keys in both objects are identical (for combined offers)
- [ ] Modal description price updated
- [ ] No JavaScript errors in browser console (`get_errors` tool)
- [ ] Dropdown displays correct options
- [ ] Price changes when selecting different options
- [ ] Payment uses correct Stripe Price ID

### Common Mistakes to Avoid

❌ **WRONG**: Updating only `serviceConfig` without `serviceToPriceId`
- **Result**: Price displays correctly but payment uses wrong Price ID

❌ **WRONG**: Mismatched keys between `serviceConfig` and `serviceToPriceId`
- **Example**: `'bain_rebozo'` in serviceConfig but `'rebozo_bain'` in serviceToPriceId
- **Result**: Payment routing fails, undefined Price ID error

❌ **WRONG**: Updating vignette price but forgetting modal description
- **Result**: Inconsistent prices displayed across the site

❌ **WRONG**: Removing Christmas offers from `serviceToPriceId` but leaving in `serviceConfig`
- **Result**: Offers display but payment fails

✅ **CORRECT**: Update ALL 4 locations in sync
1. Vignette display price
2. serviceConfig (price, priceId, buyButtonId)
3. serviceToPriceId (Price ID mapping)
4. Modal description price

### Event Listener System (Fixed 19 Oct 2025)

**Problem Solved**: Dropdown selection wasn't updating displayed prices.

**Root Cause**: Global event listener attached in `DOMContentLoaded` before dropdown options were dynamically created.

**Solution**: Move event listener creation inside `openBookingModal()` function using `cloneNode()` technique:

```javascript
// Inside openBookingModal(), after creating options:
const newSelect = variantSelect.cloneNode(true);
variantSelect.parentNode.replaceChild(newSelect, variantSelect);

newSelect.addEventListener('change', function() {
    const selectedOffer = service.relatedOffers.find(offer => offer.key === this.value);
    document.getElementById('servicePrice').textContent = selectedOffer.price;
    document.getElementById('selectedVariantKey').value = this.value;
    // Update button and display
});
```

**Why cloneNode()?**: Removes all old event listeners and creates fresh ones specific to each modal open.

### Services Requiring Form Dropdown (Updated 19 Oct 2025)

**Services with `hasRelatedOffers: true`**:
- Massage Prénatal (3 offers)
- Massage Postnatal (4 offers)
- Bain Enveloppé (4 offers)
- Soin Rebozo (3 offers)

**Validation Fix Applied**:
Changed from checking only `'Massage Prénatal'` to:
```javascript
const servicesWithVariants = ['Massage Prénatal', 'Massage Postnatal', 'Bain Enveloppé', 'Soin Rebozo'];
if (servicesWithVariants.includes(serviceName) && !variantSelect.value) {
    alert('Veuillez sélectionner une formule.');
    variantSelect.focus();
    return false;
}
```

Applied in 5 locations:
1. Line ~2542: Dropdown display logic
2. Line ~4080: Booking form validation
3. Line ~4123: Gift form validation
4. Line ~4380: Payment validation (gift mode)
5. Line ~4502: Payment validation (booking mode)

## Recent Updates Log

### 19 October 2025

#### Bug Fixes
1. **Modal Price Update Issue** ✅
   - Fixed: Prices not changing when selecting different formulas
   - Solution: Moved event listeners to `openBookingModal()` with `cloneNode()`
   - Affected: All 4 services with combined offers

2. **Missing Form Dropdown** ✅
   - Fixed: Massage Postnatal, Bain Enveloppé, Soin Rebozo missing formula selection
   - Solution: Extended `hasVariants` check to include all 4 services
   - Updated: 5 validation points

#### Price Updates
1. **Massage Prénatal**: 70€ → 75€ (1h), 100€ → 110€ (1h30)
2. **Massage Postnatal**: 70€ → 75€ (1h), 100€ → 110€ (1h30)
3. **Bain Enveloppé**: 60€ → 70€
4. **Atelier Massage Bébé**: 75€ → 80€
5. **Soin Rebozo**: 80€ → 90€
6. **Massage bébé & enfant**: 50€ → 55€
7. **Soin postnatal complet**: 145€ → 160€

#### Offers Management
1. **Removed Christmas Offers** (5 total):
   - prenatal_postnatal (150€)
   - postnatal_prenatal (150€)
   - bain_massage (135€)
   - bain_rebozo Christmas (150€)
   - rebozo_postnatal (155€)

2. **Added New Offer**:
   - Bain Enveloppé: "Bain + Soin Rebozo" (155€)
   - Key: `bain_rebozo`
   - Complements existing "Soin Rebozo + Bain" offer

### Documentation Created
- `BUGS_CORRIGES.md` - Bug fixes documentation
- `CORRECTION_EVENT_LISTENER.md` - Event listener fix details
- `CORRECTION_FORMULAIRE_OFFRES.md` - Form dropdown fix
- `MAJ_SOIN_POSTNATAL_COMPLET.md` - Price update for complete postnatal care
- `AJOUT_OFFRE_BAIN_REBOZO.md` - New combined offer addition

## Key Learnings for AI Assistants

### What Works
✅ **Use `replace_string_in_file` with sufficient context** (3-5 lines before/after)
✅ **Update all 4 price locations systematically**
✅ **Keep keys synchronized between serviceConfig and serviceToPriceId**
✅ **Use `grep_search` to find all price occurrences before updating**
✅ **Validate with `get_errors` after each modification**
✅ **Document changes in markdown files for tracking**

### What Doesn't Work
❌ **Assuming serviceConfig alone controls everything** - Payment routing is separate
❌ **Using global event listeners for dynamically created elements** - Attach locally instead
❌ **Partial updates** - All related prices must be updated together
❌ **Hardcoding service names in validations** - Use arrays for scalability
❌ **Forgetting modal descriptions** - Users see prices in multiple places

### Debugging Approach
1. **Check browser console** for JavaScript errors
2. **Inspect dropdown options** to verify they're created correctly
3. **Test price changes** by selecting different options
4. **Verify Stripe Price ID** in network tab during payment
5. **Compare keys** between serviceConfig and serviceToPriceId objects

### December 2025

#### Image Migration to Local Hosting
**Problem**: All images were hosted on Google Photos (lh3.googleusercontent.com), causing:
- Slow loading times
- Dependency on external service
- Potential broken links

**Solution**: Downloaded all 27 images and organized locally:
```
assets/images/
├── logos/          # 2 files: logo-main.webp, logo-mobile.webp
├── services/       # 11 files: massage-prenatal.webp, reflexologie.webp, etc.
├── portraits/      # 6 files: estelle-*.webp
├── gallery/        # 7 files: various gallery images
└── misc/           # 1 file: decoration-murale.webp
```

**Path Convention**:
- In root HTML files: `src="assets/images/..."`
- In services/*.html: `src="../assets/images/..."` (relative path up one level)

#### Reflexologie Image Fix
**Problem**: No suitable foot reflexology image existed in the site.
**Solution**: Downloaded royalty-free image from Pexels (photo 6628700 by KoolShooters).

#### Button onclick Names Fix
**Problem**: 9 booking buttons on index.html were broken.
**Root Cause**: Buttons used accented characters but `serviceConfig` keys don't have accents.

**Fixed buttons**:
- `'Massage Prénatal'` → `'Massage Prenatal'`
- `'Massage Post-natal'` → `'Massage Postnatal'`
- `'Bain Enveloppé'` → `'Bain Enveloppe'`
- `'Atelier Massage Bébé'` → `'Atelier Massage Bebe'`
- `'Réflexologie Plantaire Obstétrique'` → `'Reflexologie Plantaire Obstetrique'`

#### Google Business Integration (temoignages.html)
**Added**:
- Schema.org LocalBusiness structured data with aggregateRating
- Clickable Google rating badge (5.0/5, 90+ reviews)
- "Laisser un avis sur Google" button
- Updated meta tags for SEO

**Google Business URL**: `https://www.google.com/search?kgmid=/g/11nx6f3pjw`

## Image Sources

| Directory | Source | License |
|-----------|--------|---------|
| logos/ | Proprietary (Bulleo) | All rights reserved |
| services/ | Google Photos + Pexels | Mixed (reflexologie.webp is CC0) |
| portraits/ | Google Photos (Bulleo) | All rights reserved |
| gallery/ | Google Photos (Bulleo) | All rights reserved |
| misc/ | Google Photos (Bulleo) | All rights reserved |

**Pexels Credit**: `reflexologie.webp` - Photo by KoolShooters (Pexels ID: 6628700)
