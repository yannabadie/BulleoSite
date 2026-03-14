# Refonte V2 — Plan 1 : Socle (CSS, JS, Legal, Accueil)

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Creer le nouveau socle CSS/JS, les pages legales, et la page d'accueil complete de "Bulleo — Institut Perinatal" avec la nouvelle identite visuelle.

**Architecture:** Site statique HTML avec Tailwind CSS CDN, vanilla JS. Nouveau fichier CSS (`assets/css/v2.css`) et JS (`assets/js/v2.js`) pour ne pas casser la V1 pendant le developpement. L'accueil est reecrit de zero. Les pages legales sont nouvelles.

**Tech Stack:** HTML5, Tailwind CSS (CDN), vanilla JS, Stripe Checkout, Calendly JS Widget, Formspree, Google Fonts (Playfair Display + Lato)

**Spec de reference :** `docs/superpowers/specs/2026-03-14-refonte-v2-design.md`

---

## File Structure

### Nouveaux fichiers
- `assets/css/v2.css` — styles V2 (palette terracotta/sauge, composants, animations, responsive, accessibilite)
- `assets/js/v2.js` — JS V2 (Calendly, modal cadeau, FAQ, menu mobile, header scroll, galerie)
- `mentions-legales.html` — page mentions legales
- `politique-confidentialite.html` — page RGPD
- `cgv.html` — conditions generales de vente

### Fichiers modifies
- `index.html` — reecrit completement (nouvelle structure accueil V2)
- `assets/favicon/site.webmanifest` — nom "Bulleo"

### Fichiers preserves (touches dans Plan 2+)
- `assets/js/main.js` — le JS V1 reste pour les pages services V1 pendant la transition
- `assets/css/styles.css` — le CSS V1 reste pour les pages services V1
- `services/*.html` — adaptes dans le Plan 2
- `success.html` — adapte dans le Plan 4

---

## Task 1: Nouveau CSS V2

**Files:**
- Create: `assets/css/v2.css`

- [ ] **Step 1: Creer le fichier CSS avec variables, reset, typographie**

```css
/* ============================================
   BULLEO V2 — Institut Perinatal
   Palette: Terracotta / Sauge / Cream
   Fonts: Playfair Display + Lato
   ============================================ */

:root {
    --primary: #C48A69;
    --primary-dark: #A87355;
    --secondary: #F9F7F2;
    --accent: #8A9A5B;
    --accent-dark: #6B7A45;
    --text: #2C2C2C;
    --gold: #D4AF37;
    --white: #FFFFFF;
    --gray-light: #F3F0EB;
    --gray-text: #6B7280;
    --gray-border: #E5E2DD;
}

/* Reset & Base */
* { -webkit-tap-highlight-color: transparent; }

html { scroll-behavior: smooth; }

body {
    font-family: 'Lato', sans-serif;
    background-color: var(--secondary);
    color: var(--text);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4 { font-family: 'Playfair Display', serif; }

/* Accessibility */
.skip-nav {
    position: absolute; width: 1px; height: 1px;
    padding: 0; margin: -1px; overflow: hidden;
    clip: rect(0,0,0,0); white-space: nowrap; border: 0;
}
.skip-nav:focus {
    position: fixed; top: 0; left: 0; width: auto; height: auto;
    padding: 12px 24px; margin: 0; overflow: visible; clip: auto;
    white-space: normal; background: var(--text); color: white;
    z-index: 100000; font-size: 1rem; font-weight: 600;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

body.menu-open, body.modal-open {
    overflow: hidden; position: fixed; width: 100%;
}

/* Focus states */
button:focus-visible, a:focus-visible,
input:focus-visible, select:focus-visible, textarea:focus-visible {
    outline: 2px solid var(--gold);
    outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}

/* Input zoom prevention iOS */
@media screen and (max-width: 768px) {
    input, select, textarea { font-size: 16px !important; }
}
```

- [ ] **Step 2: Ajouter les composants UI (nav, hero, buttons, cards, modals, footer)**

Ajouter a la suite dans `v2.css` :

```css
/* ============================================
   NAVIGATION
   ============================================ */
.nav-v2 {
    background: rgba(249, 247, 242, 0.95);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    transition: all 0.3s ease;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.nav-v2.scrolled {
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.nav-link-v2 {
    color: var(--text);
    font-weight: 500;
    position: relative;
    transition: color 0.3s;
}

.nav-link-v2::after {
    content: '';
    position: absolute; bottom: -4px; left: 0;
    width: 0; height: 2px;
    background: var(--primary);
    transition: width 0.3s;
}

.nav-link-v2:hover { color: var(--primary); }
.nav-link-v2:hover::after { width: 100%; }

/* ============================================
   HERO
   ============================================ */
.hero-v2 {
    height: 100vh;
    height: 100dvh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.hero-v2-bg {
    position: absolute; inset: 0;
    background: center/cover no-repeat;
    z-index: 0;
}

.hero-v2-bg::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.05));
}

.hero-v2-content {
    position: relative; z-index: 1;
    background: rgba(249, 247, 242, 0.92);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-radius: 16px;
    border: 1px solid rgba(212, 175, 55, 0.15);
    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.15);
    padding: 2rem;
    max-width: 48rem;
    text-align: center;
}

@media (min-width: 768px) {
    .hero-v2-content { padding: 3rem 4rem; }
}

/* ============================================
   BUTTONS
   ============================================ */
.btn-v2 {
    display: inline-flex; align-items: center; justify-content: center;
    padding: 0.75rem 2rem;
    border-radius: 9999px;
    font-weight: 700;
    font-family: 'Lato', sans-serif;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer; border: none;
    min-height: 44px; min-width: 44px;
}

.btn-v2:hover { transform: translateY(-2px); }
.btn-v2:active { transform: translateY(0); }

.btn-primary-v2 {
    background: var(--primary); color: white;
    box-shadow: 0 4px 15px rgba(196, 138, 105, 0.3);
}
.btn-primary-v2:hover {
    box-shadow: 0 8px 25px rgba(196, 138, 105, 0.4);
    background: var(--primary-dark);
}

.btn-secondary-v2 {
    background: transparent; color: var(--primary);
    border: 2px solid var(--primary);
}
.btn-secondary-v2:hover {
    background: var(--primary); color: white;
}

.btn-gold-v2 {
    background: var(--gold); color: white;
    box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
}
.btn-gold-v2:hover {
    box-shadow: 0 8px 25px rgba(212, 175, 55, 0.4);
}

/* ============================================
   CARDS
   ============================================ */
.card-v2 {
    background: var(--white);
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-v2:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
}

/* 3 Portes — cards immersives */
.porte-card {
    position: relative;
    aspect-ratio: 3/4;
    border-radius: 1rem;
    overflow: hidden;
    cursor: pointer;
}

.porte-card img {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

.porte-card:hover img { transform: scale(1.05); }

.porte-card-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(transparent 40%, rgba(0,0,0,0.7) 100%);
    z-index: 1;
    transition: background 0.3s;
}

.porte-card:hover .porte-card-overlay {
    background: linear-gradient(transparent 30%, rgba(0,0,0,0.5) 100%);
}

.porte-card-content {
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: 2rem; z-index: 2;
}

/* ============================================
   MODALS
   ============================================ */
.modal-v2 {
    display: none;
    position: fixed; inset: 0;
    background: rgba(44, 44, 44, 0.6);
    backdrop-filter: blur(4px);
    z-index: 1000;
    align-items: center; justify-content: center;
    opacity: 0;
    transition: opacity 0.3s;
}

.modal-v2.active {
    display: flex;
    opacity: 1;
}

.modal-v2-content {
    background: var(--secondary);
    padding: 2rem;
    border-radius: 1rem;
    width: 90%; max-width: 560px;
    max-height: 90vh; max-height: 90dvh;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    position: relative;
    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
}

.modal-v2-close {
    position: absolute; top: 1rem; right: 1rem;
    width: 44px; height: 44px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--text);
    background: none; border: none;
    font-size: 1.5rem;
    transition: color 0.3s;
}

.modal-v2-close:hover { color: var(--primary); }

/* ============================================
   FAQ ACCORDION
   ============================================ */
.faq-item { border-bottom: 1px solid var(--gray-border); }

.faq-toggle {
    width: 100%;
    padding: 1.25rem 0;
    display: flex; justify-content: space-between; align-items: center;
    background: none; border: none;
    font-family: 'Lato', sans-serif;
    font-size: 1rem; font-weight: 700;
    color: var(--text);
    cursor: pointer; text-align: left;
    min-height: 44px;
}

.faq-toggle i { transition: transform 0.3s; color: var(--primary); }
.faq-toggle[aria-expanded="true"] i { transform: rotate(180deg); }

.faq-answer {
    max-height: 0; overflow: hidden;
    transition: max-height 0.4s ease, padding 0.3s ease;
    padding: 0 0;
}

.faq-answer.open {
    max-height: 500px;
    padding: 0 0 1.25rem 0;
}

/* ============================================
   FOOTER
   ============================================ */
.footer-v2 {
    background: var(--text);
    color: white;
}

.footer-v2 a {
    color: rgba(255,255,255,0.6);
    transition: color 0.3s;
}

.footer-v2 a:hover { color: var(--primary); }

/* ============================================
   STICKY MOBILE FOOTER
   ============================================ */
.sticky-footer-v2 {
    position: fixed; bottom: 0; left: 0; width: 100%;
    background: white;
    border-top: 1px solid var(--gray-border);
    z-index: 50;
    box-shadow: 0 -4px 6px -1px rgba(0,0,0,0.05);
    padding-bottom: env(safe-area-inset-bottom, 0px);
}

@media (max-width: 767px) {
    body { padding-bottom: calc(70px + env(safe-area-inset-bottom, 0px)); }
}

/* ============================================
   SECTION PATTERNS
   ============================================ */
.section-title-v2 {
    font-family: 'Playfair Display', serif;
    font-size: 1.875rem;
    color: var(--text);
    margin-bottom: 1rem;
}

@media (min-width: 768px) {
    .section-title-v2 { font-size: 2.25rem; }
}

.section-divider {
    width: 4rem; height: 3px;
    background: var(--gold);
    border-radius: 9999px;
}

.badge-v2 {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-radius: 9999px;
}

.badge-accent { background: rgba(138,154,91,0.1); color: var(--accent); }
.badge-gold { background: rgba(212,175,55,0.1); color: var(--gold); }
.badge-primary { background: rgba(196,138,105,0.1); color: var(--primary); }

/* ============================================
   MOBILE MENU
   ============================================ */
.mobile-menu-v2 {
    position: fixed; top: 0; right: 0;
    width: 85%; max-width: 360px;
    height: 100vh; height: 100dvh;
    background: var(--secondary);
    z-index: 100;
    transform: translateX(100%);
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: -10px 0 30px rgba(0,0,0,0.1);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
}

.mobile-menu-v2.open { transform: translateX(0); }

.mobile-menu-overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.4);
    z-index: 99;
    opacity: 0; visibility: hidden;
    transition: opacity 0.3s, visibility 0.3s;
}

.mobile-menu-overlay.open { opacity: 1; visibility: visible; }

/* ============================================
   ANIMATIONS
   ============================================ */
@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.animate-on-scroll {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.animate-on-scroll.visible {
    opacity: 1;
    transform: translateY(0);
}

/* Hover: none for touch devices */
@media (hover: none) {
    .porte-card img { transform: none !important; }
    .card-v2:hover { transform: none; }
}
```

- [ ] **Step 3: Verifier la syntaxe CSS**

Run: `cat assets/css/v2.css | wc -l`
Expected: ~300+ lines, no syntax errors visible.

- [ ] **Step 4: Commit**

```bash
git add assets/css/v2.css
git commit -m "feat(v2): nouveau CSS socle — palette terracotta/sauge, composants UI"
```

---

## Task 2: Nouveau JS V2

**Files:**
- Create: `assets/js/v2.js`

- [ ] **Step 1: Creer le JS avec configuration services et Stripe**

Le fichier `assets/js/v2.js` doit contenir :

1. **serviceConfig** — copie exacte de `main.js` lignes 9-201 (tous les services, prix, priceIds, buyButtonIds)
2. **serviceToPriceId** — copie exacte de `main.js` lignes 204-246
3. **STRIPE_PUBLISHABLE_KEY** — copie de `main.js` ligne 249

Ces donnees sont identiques a la V1. Les copier tel quel.

- [ ] **Step 2: Ajouter les fonctions modal cadeau**

Le modal cadeau reprend le flux V1 : formulaire maison (nom, email, tel, destinataire) → Stripe Checkout → success.html → Formspree.

Fonctions a implementer :
- `openGiftModal(serviceName)` — ouvre le modal cadeau avec le service pre-selectionne
- `closeGiftModal()` — ferme le modal
- `handleGiftPayment()` — valide, sauvegarde localStorage, redirige vers Stripe

Reprendre la logique de `handlePayment()` de main.js (lignes 511-650) en la simplifiant : pas de mode booking (Calendly gere ca), seulement le mode gift.

- [ ] **Step 3: Ajouter les fonctions Calendly**

```javascript
// Calendly popup
function openCalendlyPopup(serviceName) {
    if (typeof Calendly === 'undefined') {
        window.open('https://calendly.com/contact-bulleo-soins', '_blank');
        return;
    }
    Calendly.initPopupWidget({
        url: 'https://calendly.com/contact-bulleo-soins',
        prefill: {
            customAnswers: { a1: serviceName || '' }
        }
    });
}

// Calendly inline (pour pages services — Plan 2)
function initCalendlyInline(containerId, serviceName) {
    if (typeof Calendly === 'undefined') return;
    Calendly.initInlineWidget({
        url: 'https://calendly.com/contact-bulleo-soins',
        parentElement: document.getElementById(containerId),
        prefill: {
            customAnswers: { a1: serviceName || '' }
        }
    });
}
```

- [ ] **Step 4: Ajouter les fonctions UI (menu mobile, header scroll, FAQ, scroll animations)**

```javascript
// Mobile menu with scroll position save/restore
function openMobileMenu() { ... }
function closeMobileMenu() { ... }

// Header scroll effect
function initHeaderScroll() { ... }  // passive listener

// FAQ accordion with aria-expanded
function toggleFAQ(button) { ... }

// Scroll animations with IntersectionObserver
function initScrollAnimations() { ... }

// Smooth scroll for anchor links
function initSmoothScroll() { ... }
```

Reprendre les patterns de main.js mais en plus propre : passive listeners, save/restore scroll, aria-expanded sur FAQ.

- [ ] **Step 5: Ajouter DOMContentLoaded init + checkStripeReturn**

```javascript
document.addEventListener('DOMContentLoaded', function() {
    initHeaderScroll();
    initScrollAnimations();
    initSmoothScroll();
    checkStripeReturn();
    checkConfirmation();
});
```

- [ ] **Step 6: Verifier la syntaxe JS**

Run: `node -c assets/js/v2.js`
Expected: No output (= valid syntax)

- [ ] **Step 7: Commit**

```bash
git add assets/js/v2.js
git commit -m "feat(v2): nouveau JS — Calendly, modal cadeau, Stripe, UI interactions"
```

---

## Task 3: Pages legales

**Files:**
- Create: `mentions-legales.html`
- Create: `politique-confidentialite.html`
- Create: `cgv.html`

- [ ] **Step 1: Creer mentions-legales.html**

Page complete avec : head (meta, CSS V2, fonts), nav V2, contenu legal, footer V2.

Contenu :
- Editeur du site : Estelle Cazajous, EI, SIRET 899 951 990 00014, APE 9604Z
- Adresse siege : 12 Rue Aristide Berges, 65000 Tarbes
- Adresse cabinet : 108-6 Rue du Magasin aux Tabacs, 65000 Tarbes
- Tel, email, TVA
- Directrice de publication : Estelle Cazajous
- Hebergeur : Gandi SAS, 63-65 Boulevard Massena, 75013 Paris
- Propriete intellectuelle, responsabilite, droit applicable

SEO : title unique, meta description, canonical, noindex (pages legales n'ont pas besoin d'etre indexees).

- [ ] **Step 2: Creer politique-confidentialite.html**

Contenu RGPD :
- Responsable du traitement : Estelle Cazajous
- Donnees collectees : Formspree (nom, email, tel), Stripe (paiement), Calendly (RDV), GTM/GA (analytics), TermsFeed (cookies)
- Finalites, base legale, duree de conservation
- Droits : acces, rectification, suppression, portabilite
- Contact DPO : contact@bulleo-soins.com
- Cookies : description des cookies utilises

- [ ] **Step 3: Creer cgv.html**

Contenu :
- Objet, champ d'application
- Services proposes et tarifs (renvoyer a la page prestations)
- Modalites de reservation (via Calendly)
- Paiement (Stripe, carte bancaire)
- Bons cadeaux : validite, conditions, non-remboursable
- Annulation et report (politique d'Estelle)
- Droit de retractation (14 jours, sauf services executes)
- Responsabilite, litiges, droit applicable

- [ ] **Step 4: Verifier que les 3 pages sont valides**

Run: `wc -l mentions-legales.html politique-confidentialite.html cgv.html`
Expected: Each file 100-300 lines.

- [ ] **Step 5: Commit**

```bash
git add mentions-legales.html politique-confidentialite.html cgv.html
git commit -m "feat(v2): pages legales — mentions, RGPD, CGV avec SIRET reel"
```

---

## Task 4: Page d'accueil V2

**Files:**
- Rewrite: `index.html`

C'est la tache la plus importante. La page d'accueil est reecrite de zero avec la nouvelle identite.

- [ ] **Step 1: Ecrire le head (meta, SEO, scripts, fonts)**

Reprendre les meta tags SEO existants (title, description, canonical, OG, Twitter, Schema.org JSON-LD) en les adaptant au nouveau nom "Bulleo — Institut Perinatal". Garder le meme GTM ID, les memes favicon links. Charger :
- Google Fonts (Playfair Display + Lato)
- Font Awesome 6.4.0
- Tailwind CSS CDN avec config terracotta/sauge
- Stripe JS (async)
- Calendly widget JS (async)
- `assets/css/v2.css`
- TermsFeed cookie consent

Schema.org JSON-LD : HealthAndBeautyBusiness + FAQPage + Person (reprendre les blocs existants).

- [ ] **Step 2: Ecrire le header (nav + hero)**

Navigation fixe :
- Logo a gauche
- Liens : Grossesse | Post-Partum | Offrir | L'Institut
- CTA : "Reserver" (btn-primary-v2) → `openCalendlyPopup()`
- Hamburger mobile

Hero :
- Background image (`assets/images/services/massage-prenatal.webp`)
- Card glassmorphism centree
- Badge "5/5 sur Google • +90 familles accompagnees"
- H1 : "L'expertise perinatale, la douceur en plus."
- Sous-titre avec credentials
- 3 CTAs : "Je suis Enceinte" → #grossesse | "Pour mon Bebe & Moi" → #post-partum | "Offrir" → #cadeaux

- [ ] **Step 3: Ecrire la section "3 Portes"**

3 cards immersives (`.porte-card`) :
1. Grossesse — image `massage-prenatal.webp`, lien `#grossesse`
2. Post-Partum & Bebe — image `bain-enveloppe-alt.webp`, lien `#post-partum`
3. Cadeaux — image `carte-cadeau.webp`, lien `#cadeaux`, badge "Bestseller"

- [ ] **Step 4: Ecrire la section Services Grossesse**

Layout inspire de index_v2.html :
- Massage Prenatal en hero layout (image + texte + CTAs)
  - CTA "Reserver" → `openCalendlyPopup('Massage Prenatal')`
  - CTA "Offrir" → `openGiftModal('Massage Prenatal')`
  - Lien "En savoir plus" → `services/massage-prenatal.html`
- Reflexologie en card compacte (image + texte + CTA)

- [ ] **Step 5: Ecrire la section Services Post-Partum**

- Bain Enveloppe en hero layout (badge "Signature Bulleo")
- Grille 3 cols : Rebozo, Massage Postnatal, Atelier Bebe
- Cards supplementaires : Agenda Maman, Motricite, Soin postnatal complet, Massage bebe/enfant, Reflexologie Pediatrique

Chaque card a : image, titre, description courte, prix, CTA "Reserver" → Calendly, CTA "Offrir" → modal.

- [ ] **Step 6: Ecrire la section Cadeaux**

3-4 cards bons cadeaux (reprendre le design de index_v2.html section cadeaux) :
- Massage Prenatal, Bain Enveloppe, Atelier Massage, Agenda
- Chaque card : image, titre, prix, CTA "Offrir" → `openGiftModal(serviceName)`

- [ ] **Step 7: Ecrire la section Temoignages**

3-4 vrais avis Google (a chercher sur la page Google Business de Bulleo Soins).
Format : nom + etoiles + texte + date.
Badge global : "5.0/5 — 90 avis Google" avec lien vers la page Google.

- [ ] **Step 8: Ecrire la section Mini galerie + Instagram**

6-8 photos selectionnees depuis `assets/images/gallery/` en grid responsive.
Lien Instagram `@bulleo_` avec icone.
Placeholder pour le feed Instagram embed (widget tiers ou captures statiques).

- [ ] **Step 9: Ecrire la section FAQ**

3-4 questions transversales en accordion :
1. A partir de quand peut-on faire un massage prenatal ?
2. Les soins sont-ils rembourses par la mutuelle ?
3. Comment se deroule le bain enveloppe ?
4. Comment fonctionnent les bons cadeaux ?

Avec `aria-expanded`, FAQPage schema JSON-LD.

- [ ] **Step 10: Ecrire la section Contact + L'Institut**

Contact : adresse, tel (click-to-call), email, horaires, acces (3e etage, ascenseur).
L'Institut : photo Estelle, bio, credentials (AP DE, experience maternite), badges diplomes.

- [ ] **Step 11: Ecrire le footer**

3 colonnes :
1. Marque + description courte
2. Infos : adresse, tel, horaires, email
3. Liens utiles : Mentions legales, Politique de confidentialite, CGV + social icons

Copyright 2026.

- [ ] **Step 12: Ecrire le modal cadeau**

Modal avec formulaire : service (pre-selectionne), formule (si relatedOffers), nom, email, tel, destinataire, prix affiche, bouton Stripe.
Toggle "Pour moi" / "Offrir" comme dans index_v2.html.

- [ ] **Step 13: Ecrire le sticky mobile footer**

Barre fixe `md:hidden` : Appeler (30%) + Reserver (70%) avec safe-area-insets.

- [ ] **Step 14: Charger v2.js en bas de page**

`<script src="assets/js/v2.js"></script>` avant `</body>`.

- [ ] **Step 15: Verifier la syntaxe**

Run: `node -c assets/js/v2.js && wc -l index.html`
Expected: JS valid, index.html ~800-1200 lines.

- [ ] **Step 16: Commit**

```bash
git add index.html
git commit -m "feat(v2): nouvelle page d'accueil Bulleo — Institut Perinatal"
```

---

## Task 5: Mise a jour fichiers support

**Files:**
- Modify: `assets/favicon/site.webmanifest`
- Modify: `.gitignore`

- [ ] **Step 1: Mettre a jour le webmanifest**

Changer `"name": "Bulleo Soins"` en `"name": "Bulleo"` et `"description"` en coherence.

- [ ] **Step 2: Ajouter .superpowers/ au .gitignore**

Verifier que `.superpowers/` est dans `.gitignore`. Si non, l'ajouter.

- [ ] **Step 3: Commit**

```bash
git add assets/favicon/site.webmanifest .gitignore
git commit -m "chore(v2): mettre a jour webmanifest et gitignore"
```

---

## Task 6: Test d'integration

- [ ] **Step 1: Verifier que la page charge sans erreur JS**

Run: `node -c assets/js/v2.js && echo "JS OK"`
Expected: "JS OK"

- [ ] **Step 2: Verifier les liens internes**

Run: `grep -o 'href="[^"]*"' index.html | grep -v "http\|#\|mailto\|tel\|javascript" | sort -u`
Verifier que tous les fichiers locaux references existent.

- [ ] **Step 3: Verifier le SEO**

Run: `grep -c "application/ld+json" index.html`
Expected: 3 (HealthAndBeautyBusiness + FAQPage + Person)

Run: `grep "og:image" index.html | grep "https://"`
Expected: URL absolue

- [ ] **Step 4: Deploy sur le serveur**

Upload via SFTP : `index.html`, `assets/css/v2.css`, `assets/js/v2.js`, `mentions-legales.html`, `politique-confidentialite.html`, `cgv.html`, `assets/favicon/site.webmanifest`.

- [ ] **Step 5: Verification live**

Run: `curl -s -o /dev/null -w "%{http_code}" https://bulleo-soins.com/`
Expected: 200

Run: `curl -s -o /dev/null -w "%{http_code}" https://bulleo-soins.com/mentions-legales.html`
Expected: 200

- [ ] **Step 6: Commit final**

```bash
git add -A
git commit -m "feat(v2): Plan 1 complet — socle CSS/JS, accueil, pages legales"
git push
```
