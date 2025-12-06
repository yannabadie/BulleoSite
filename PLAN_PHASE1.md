# Plan d'Action Phase 1 - Bulleo Soins

**Branche**: `rebranding` → Nouvelle branche `phase1-tests`
**Date**: Decembre 2025 (J-19 avant Noel)
**Duree estimee**: Session unique

---

## 1. Introduction

### Objectifs Phase 1
1. **Revenus**: +15% conversion Noel via flux booking/gift valides sur pages services
2. **Qualite**: Validations formulaires robustes (regex email/tel, focus champ invalide)
3. **Visibilite**: Meta SEO enrichis pour "soins perinataux Tarbes 2025"

### Principes
- **Modularite preservee**: Pages services autonomes avec booking integre
- **Noel autonome**: `noel_2025.html` reste separee (expire 25/12/2025)
- **No regression**: Tous les 12 services + gifts doivent fonctionner via Stripe
- **Inspiration index_v2.html**: Toggle booking/gift fluide, validation focus()

### Risques identifies
| Risque | Impact | Mitigation |
|--------|--------|------------|
| Regex trop stricte casse flux | Haut | Tester tous formats FR avant deploy |
| Modification main.js casse existant | Haut | Tests end-to-end sur 5 pages cles |
| Meta mal formatees | Moyen | Valider Schema.org via Google Rich Results |

---

## 2. Actions Cles

### Action 1: Tests Flux Complet (5 pages services)

**Pages prioritaires** (bundles Noel):
1. `massage-prenatal.html` - Bundle 140EUR
2. `massage-postnatal.html` - Bundle 160EUR
3. `bain-enveloppe.html` - Bundle 155EUR
4. `soin-rebozo.html` - Bundle 155EUR/160EUR
5. `atelier-massage-bebe.html` - Cadeau populaire 80EUR

**Checklist par page**:
```
[ ] Clic carte prix → Modal s'ouvre avec variant pre-selectionne
[ ] Prix affiche correspond au variant
[ ] Toggle "Pour moi" / "Pour offrir" fonctionne
[ ] Champs requis valides
[ ] Bouton paiement → Redirect Stripe avec bon Price ID
[ ] Console: aucune erreur JS
```

### Action 2: Corriger Validations main.js

**Fichier**: `assets/js/main.js`
**Fonction cible**: `handlePayment()` (lignes ~380-520)

**Modifications**:

```javascript
// AVANT (validation basique)
if (!email.value) {
    alert('Veuillez saisir votre email');
    email.focus();
    return false;
}

// APRES (validation regex + feedback visuel)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
if (!email.value || !emailRegex.test(email.value)) {
    email.classList.add('border-red-500', 'ring-2', 'ring-red-200');
    email.focus();
    showInlineError(email, 'Email invalide (ex: nom@domaine.fr)');
    return false;
}

const telRegex = /^(?:(?:\+33|0033|0)[1-9])(?:[0-9]{8})$/;
if (!phone.value || !telRegex.test(phone.value.replace(/\s/g, ''))) {
    phone.classList.add('border-red-500', 'ring-2', 'ring-red-200');
    phone.focus();
    showInlineError(phone, 'Telephone invalide (ex: 06 75 43 02 57)');
    return false;
}
```

**Nouvelle fonction helper**:
```javascript
function showInlineError(element, message) {
    // Supprimer ancien message si existe
    const existingError = element.parentNode.querySelector('.inline-error');
    if (existingError) existingError.remove();

    // Creer nouveau message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'inline-error text-red-500 text-xs mt-1';
    errorDiv.textContent = message;
    element.parentNode.appendChild(errorDiv);

    // Supprimer apres correction
    element.addEventListener('input', function handler() {
        element.classList.remove('border-red-500', 'ring-2', 'ring-red-200');
        errorDiv.remove();
        element.removeEventListener('input', handler);
    }, { once: true });
}
```

**Points de validation (5 emplacements)**:
1. Ligne ~404-432: Validation booking (date, heure, nom, email, tel)
2. Ligne ~434-455: Validation gift (beneficiaire, nom, email)
3. Fonction `handlePayment()`: Avant redirect Stripe

### Action 3: Enrichir Meta SEO (3 pages prioritaires)

**Pages cibles** (volume recherche Tarbes):
1. `massage-prenatal.html`
2. `bain-enveloppe.html`
3. `soin-rebozo.html`

**Template meta enrichi**:
```html
<!-- Description optimisee 150-160 caracteres -->
<meta name="description" content="Massage prenatal a Tarbes des 75EUR. Soulage dos, sciatique, jambes lourdes. RDV rapide avec Estelle, auxiliaire puericulture DE. Bulleo Soins 65000.">

<!-- Keywords locaux 2025 -->
<meta name="keywords" content="massage prenatal tarbes, massage femme enceinte 65000, massage grossesse hautes-pyrenees, soin prenatal tarbes 2025, cadeau naissance tarbes">

<!-- Open Graph enrichi -->
<meta property="og:title" content="Massage Prenatal Tarbes | Des 75EUR - Bulleo Soins">
<meta property="og:description" content="Offrez ou reservez un massage prenatal a Tarbes. Soulagement garanti des 16 SA. Institut specialise puericulture.">
<meta property="og:image" content="https://lh3.googleusercontent.com/p/AF1QipMTHqppWPEn4LChmGYjuby9-tirIGWFufd8A9IP=s680-w680-h510-rw">
<meta property="og:image:width" content="680">
<meta property="og:image:height" content="510">
<meta property="og:locale" content="fr_FR">

<!-- Schema.org Service enrichi -->
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Massage Prenatal",
    "description": "Massage prenatal adapte aux femmes enceintes des 16 SA...",
    "provider": {
        "@type": "HealthAndBeautyBusiness",
        "name": "Bulleo Soins",
        "priceRange": "EUR EUR EUR",
        "image": "https://lh3.googleusercontent.com/...",
        "telephone": "+33675430257",
        "address": { ... }
    },
    "offers": [
        { "@type": "Offer", "name": "1h", "price": "75", "priceCurrency": "EUR" },
        { "@type": "Offer", "name": "1h30", "price": "110", "priceCurrency": "EUR" },
        { "@type": "Offer", "name": "Massage + Bain", "price": "140", "priceCurrency": "EUR" }
    ],
    "areaServed": {
        "@type": "City",
        "name": "Tarbes",
        "postalCode": "65000"
    }
}
</script>
```

---

## 3. Checklist Tests

### Matrice de Tests E2E

| # | Page | Action | Variante | Mode | Resultat Attendu | Status |
|---|------|--------|----------|------|------------------|--------|
| 1 | massage-prenatal | Clic 75EUR | 1h | booking | Modal + prix 75EUR + Stripe redirect | [ ] |
| 2 | massage-prenatal | Clic 140EUR | prenatal_bain | gift | Modal + recipient + Stripe redirect | [ ] |
| 3 | massage-postnatal | Clic 160EUR | postnatal_rebozo | booking | Modal + prix 160EUR | [ ] |
| 4 | bain-enveloppe | Clic 155EUR | bain_rebozo | gift | Modal + recipient | [ ] |
| 5 | soin-rebozo | Clic 90EUR | solo | booking | Modal + prix 90EUR | [ ] |
| 6 | atelier-massage-bebe | Bouton CTA | - | gift | Modal + prix 80EUR | [ ] |
| 7 | Validation email | - | - | - | "test" rejete, focus + message rouge | [ ] |
| 8 | Validation tel | - | - | - | "123" rejete, "0675430257" accepte | [ ] |
| 9 | Mobile (375px) | massage-prenatal | 1h | booking | Modal responsive, scroll OK | [ ] |
| 10 | Console | Toutes pages | - | - | Zero erreur JS | [ ] |

### Outils de Test
- **Desktop**: Chrome DevTools (Console + Network pour Price ID)
- **Mobile**: Chrome DevTools Device Mode (iPhone SE, Galaxy S8)
- **SEO**: Google Rich Results Test, Lighthouse
- **Perf**: PageSpeed Insights (cible >85 mobile)

---

## 4. Code Minimal a Generer

### 4.1 Patch Validation main.js

**Fichier**: `assets/js/main.js`
**Insertions**:

```javascript
// ============================================
// VALIDATION HELPERS (ajouter apres ligne ~200)
// ============================================
const VALIDATION_PATTERNS = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    // Accepte: 0675430257, 06 75 43 02 57, +33675430257, +33 6 75 43 02 57
    phone: /^(?:(?:\+33|0033|0)\s*[1-9])(?:[\s.-]*[0-9]){8}$/
};

function showInlineError(element, message) {
    clearInlineError(element);

    element.classList.add('border-red-500', 'ring-2', 'ring-red-200');

    const errorDiv = document.createElement('div');
    errorDiv.className = 'inline-error text-red-500 text-xs mt-1 flex items-center';
    errorDiv.innerHTML = '<i class="fas fa-exclamation-circle mr-1"></i>' + message;
    element.parentNode.appendChild(errorDiv);

    element.addEventListener('input', function handler() {
        clearInlineError(element);
    }, { once: true });
}

function clearInlineError(element) {
    element.classList.remove('border-red-500', 'ring-2', 'ring-red-200');
    const existingError = element.parentNode.querySelector('.inline-error');
    if (existingError) existingError.remove();
}

function validateField(element, pattern, errorMessage) {
    const value = element.value.replace(/\s/g, '');
    if (!value || !pattern.test(value)) {
        showInlineError(element, errorMessage);
        element.focus();
        return false;
    }
    clearInlineError(element);
    return true;
}
```

**Modifications handlePayment()** (remplacer validations existantes):

```javascript
// Dans handlePayment(), section booking (lignes ~404-432)
if (actionType === 'booking') {
    // ... validations date/heure existantes ...

    if (!validateField(name, /.{2,}/, 'Nom requis (min 2 caracteres)')) return false;
    if (!validateField(email, VALIDATION_PATTERNS.email, 'Email invalide (ex: nom@domaine.fr)')) return false;
    if (!validateField(phone, VALIDATION_PATTERNS.phone, 'Telephone invalide (ex: 06 75 43 02 57)')) return false;
}

// Dans handlePayment(), section gift (lignes ~433-455)
else if (actionType === 'gift') {
    if (!validateField(recipientName, /.{2,}/, 'Nom du beneficiaire requis')) return false;
    if (!validateField(name, /.{2,}/, 'Votre nom requis')) return false;
    if (!validateField(email, VALIDATION_PATTERNS.email, 'Email invalide')) return false;
}
```

### 4.2 Meta Enrichis (exemple massage-prenatal.html)

**Remplacer lignes 16-38** par:

```html
<meta name="description" content="Massage prenatal a Tarbes des 75EUR. Soulage dos, sciatique, jambes lourdes des 16 SA. RDV rapide avec Estelle, auxiliaire puericulture DE. Bulleo Soins.">
<meta name="keywords" content="massage prenatal tarbes, massage femme enceinte 65, massage grossesse hautes-pyrenees, soin prenatal tarbes 2025, cadeau future maman tarbes">
<meta name="robots" content="index, follow, max-image-preview:large">

<!-- Open Graph optimise -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://bulleo-soins.com/services/massage-prenatal.html">
<meta property="og:title" content="Massage Prenatal Tarbes | Des 75EUR - Bulleo Soins">
<meta property="og:description" content="Offrez ou reservez un massage prenatal a Tarbes. Soulagement garanti dos, jambes, sciatique des 16 SA.">
<meta property="og:image" content="https://lh3.googleusercontent.com/p/AF1QipMTHqppWPEn4LChmGYjuby9-tirIGWFufd8A9IP=s680-w680-h510-rw">
<meta property="og:image:width" content="680">
<meta property="og:image:height" content="510">
<meta property="og:locale" content="fr_FR">
<meta property="og:site_name" content="Bulleo Soins">

<!-- Twitter optimise -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Massage Prenatal Tarbes | Des 75EUR">
<meta name="twitter:description" content="Massage prenatal par auxiliaire puericulture DE. Tarbes 65000.">
<meta name="twitter:image" content="https://lh3.googleusercontent.com/p/AF1QipMTHqppWPEn4LChmGYjuby9-tirIGWFufd8A9IP=s680-w680-h510-rw">
```

---

## 5. Instructions Deploiement

### Etape 1: Creer branche
```bash
git checkout rebranding
git pull origin rebranding
git checkout -b phase1-tests
```

### Etape 2: Appliquer modifications
1. Editer `assets/js/main.js` avec patch validation
2. Editer meta sur 3 pages services
3. Verifier syntaxe: `node --check assets/js/main.js`

### Etape 3: Tests locaux
```bash
npx http-server -p 8080
# Ouvrir http://localhost:8080/services/massage-prenatal.html
# Executer checklist tests (section 3)
```

### Etape 4: Commit et merge
```bash
git add .
git commit -m "Phase 1: Validations regex + Meta SEO enrichis"
git push origin phase1-tests
# Creer PR vers rebranding
```

---

## 6. Metriques & Next Steps

### KPIs Phase 1
| Metrique | Avant | Cible | Mesure |
|----------|-------|-------|--------|
| Drop-off formulaire | ~30% | <20% | Formspree stats |
| Erreurs console | 2-3/page | 0 | DevTools |
| PageSpeed mobile | ~75 | >85 | PSI |
| Rich Results | Partiel | Valid | Google Tool |

### Transition Phase 2 (Post-Noel)
1. **Archiver** `noel_2025.html` le 26/12/2025
2. **GTM Events**: Ajouter tracking clic boutons booking/gift
3. **A/B Test**: Toggle booking/gift inspire de index_v2.html
4. **Consolidation**: Evaluer si index_v2.html remplace index.html

---

## Annexe: Mapping Variants → Price IDs

Reference rapide pour debug:

| Service | Variant Key | Price ID |
|---------|-------------|----------|
| Massage Prenatal | 1h | price_1SIyPgCm8TYzw7cAgJTspWxo |
| Massage Prenatal | 1h30 | price_1SIyT1Cm8TYzw7cAo9urSwWp |
| Massage Prenatal | prenatal_bain | price_1SIyNOCm8TYzw7cAxuJCLweM |
| Massage Postnatal | 1h | price_1SIyQxCm8TYzw7cADEHgfZ75 |
| Massage Postnatal | postnatal_rebozo | price_1SIyXlCm8TYzw7cAzFfc2qyB |
| Bain Enveloppe | solo | price_1SIyM2Cm8TYzw7cAVrkQJ2FH |
| Bain Enveloppe | bain_rebozo | price_1SIyWNCm8TYzw7cAFlJgRQpZ |
| Soin Rebozo | solo | price_1SIyVlCm8TYzw7cAPEPWMeLr |
| Atelier Massage Bebe | - | price_1SIyYACm8TYzw7cAcgWKZUDU |
