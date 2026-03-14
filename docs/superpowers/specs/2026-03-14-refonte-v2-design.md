# Refonte Bulleo V2 — Spec de design

## Resume

Refonte complete du site bulleo-soins.com. Le site passe de "Bulleo Soins" (palette brown/cream, grille plate de 11 services) a "Bulleo — Institut Perinatal" (palette terracotta/sauge/cream, navigation par besoins, Calendly pour les RDV, formulaire maison pour les cadeaux).

## Decisions validees

| Decision | Choix |
|----------|-------|
| Marque | "Bulleo — Institut Perinatal" (nom court, sous-titre professionnel) |
| Palette | Terracotta `#C48A69`, Sauge `#8A9A5B`, Cream `#F9F7F2`, Anthracite `#2C2C2C`, Or `#D4AF37` |
| Typographie | Playfair Display (serif, headings) + Lato (sans, body) |
| RDV | Calendly inline (`https://calendly.com/contact-bulleo-soins`) |
| Cadeaux | Formulaire maison + Stripe (flux actuel preserve) |
| Structure | Hybride : accueil vitrine + pages services dediees |
| Galerie | 6-8 photos selectionnees + feed Instagram embed (@bulleo_) |
| Temoignages | 3-4 vrais avis Google + badge 5.0/5 |
| FAQ | Generales sur accueil + contextuelles par page service |
| Legal | Mentions legales, CGV, politique de confidentialite (SIRET 899 951 990 00014) |

## Contraintes techniques

- **Pas de build system** : HTML statique, Tailwind CSS CDN, vanilla JS
- **Hebergement** : Gandi LAMP, SFTP, Varnish cache
- **Paiement** : Stripe Checkout (cle live existante, Price IDs existants)
- **Formulaires cadeaux** : Formspree (endpoints existants : `meozaekb`, `xdkdeazw`)
- **Analytics** : Google Tag Manager (GTM-MZT366F6) preserve
- **Cookie consent** : TermsFeed preserve
- **SEO** : Conserver les URLs existantes (`/services/massage-prenatal.html` etc.)

---

## Architecture des pages

### 1. Page d'accueil (`index.html`)

Structure top-to-bottom :

```
[Nav fixe]          Logo | Grossesse | Post-Partum | Offrir | L'Institut | Reserver (CTA)
[Hero]              Tagline + 3 CTAs : "Je suis Enceinte" / "Pour mon Bebe & Moi" / "Offrir"
                    Badge : "5/5 sur Google • +90 familles accompagnees"
[3 Portes]          3 cards immersives full-image avec titre + lien ancre
                    (Grossesse / Post-Partum & Bebe / Cadeaux)
[Services Grossesse] Massage Prenatal (hero layout) + Reflexologie (card compacte)
                    CTA "Reserver" → page service avec Calendly
[Services Post-P]   Bain Enveloppe (hero layout, badge "Signature Bulleo")
                    + grille 3 cols : Rebozo, Massage Postnatal, Atelier Bebe
                    + Agenda Maman, Motricite
[Cadeaux]           3-4 cards bons cadeaux avec CTA "Offrir" → modal Stripe
[Temoignages]       3-4 vrais avis Google en carrousel + badge note globale
[Mini galerie]      6-8 photos selectionnees (grid) + lien Instagram
[Feed Instagram]    Widget embed @bulleo_ (derniers posts)
[FAQ]               3-4 questions transversales (accordion, FAQPage schema)
[Contact]           Carte avec adresse, tel, horaires, carte embed + formulaire contact
[L'Institut]        Section Estelle : photo, bio, credentials, badges diplomes
[Footer]            Infos, liens services, liens legaux, social, copyright 2026
[Sticky mobile]     Barre fixe : Appeler | Reserver un soin
```

### 2. Pages services (`services/*.html`) — 7 pages

Chaque page service suit ce template :

```
[Nav]               Identique a l'accueil
[Breadcrumb]        Accueil > Prestations > Massage Prenatal
[Hero service]      Image pleine largeur + titre + sous-titre
[Description]       Texte detaille, benefices, duree, indications
[Tarifs]            Cards de prix pour chaque formule/combo
                    CTA "Reserver" → Calendly inline en dessous
[Calendly inline]   Widget Calendly embed directement dans la page
                    Avec prefill du nom du service
[FAQ contextuelle]  2-3 questions specifiques au service (FAQPage schema)
[Autres services]   Cross-links vers les services complementaires
[Footer]            Identique
```

Pages existantes conservees :
- `services/massage-prenatal.html`
- `services/massage-postnatal.html`
- `services/bain-enveloppe.html`
- `services/soin-rebozo.html`
- `services/reflexologie.html`
- `services/atelier-massage-bebe.html`
- `services/atelier-motricite.html`

### 3. Pages legales (nouvelles)

- `mentions-legales.html`
- `politique-confidentialite.html`
- `cgv.html`

### 4. Pages existantes conservees

- `success.html` — confirmation post-paiement Stripe (flux cadeau)
- `contact.html` — page contact dediee (optionnelle si contact integre a l'accueil)

---

## Identite visuelle

### Palette de couleurs

```css
:root {
    --primary: #C48A69;      /* Terracotta Doux — CTAs, accents */
    --secondary: #F9F7F2;    /* Cream / Beige Sable — fond */
    --accent: #8A9A5B;       /* Vert Sauge — badges, section bebe */
    --text: #2C2C2C;         /* Anthracite — texte body */
    --gold: #D4AF37;         /* Or Mat — cadeaux, highlights */
    --white: #FFFFFF;        /* Blanc pur — cards */
    --gray-light: #F3F0EB;   /* Gris chaud — fonds alternes */
    --gray-text: #6B7280;    /* Gris — texte secondaire */
}
```

### Typographie

| Usage | Font | Poids | Taille |
|-------|------|-------|--------|
| H1 hero | Playfair Display | 700 | 3rem / 4rem (md) |
| H2 sections | Playfair Display | 600 | 1.875rem / 2.25rem (md) |
| H3 cards | Playfair Display | 600 | 1.25rem / 1.5rem (md) |
| Body | Lato | 400 | 1rem (16px) |
| Badges/labels | Lato | 700 | 0.75rem, uppercase, tracking-wide |
| Prix | Playfair Display | 700 | 1.5rem |

### Composants UI

**Boutons primaires** : `bg-primary text-white rounded-full px-8 py-3 font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all`

**Boutons secondaires** : `border-2 border-primary text-primary rounded-full px-8 py-3 font-bold hover:bg-primary hover:text-white transition-all`

**Boutons cadeau** : `bg-gold text-white rounded-full` (meme structure)

**Cards service** : `bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden`

**Badges** : `inline-block px-3 py-1 bg-accent/10 text-accent text-sm font-bold rounded-full`

---

## Integration Calendly

### Embed inline sur les pages services

```html
<!-- Section Calendly -->
<section id="calendly" class="py-16 bg-gray-light">
    <div class="max-w-3xl mx-auto px-4">
        <h2 class="font-serif text-2xl text-center mb-8">Choisir un creneau</h2>
        <div class="calendly-inline-widget"
             data-auto-load="false"
             style="min-width:320px;height:630px;">
        </div>
    </div>
</section>

<script src="https://assets.calendly.com/assets/external/widget.js"></script>
<script>
    Calendly.initInlineWidget({
        url: 'https://calendly.com/contact-bulleo-soins',
        parentElement: document.querySelector('.calendly-inline-widget'),
        prefill: { customAnswers: { a1: 'Massage Prenatal' } }
    });
</script>
```

### Popup depuis l'accueil

Sur la page d'accueil, le bouton "Reserver" ouvre Calendly en popup :

```javascript
Calendly.initPopupWidget({
    url: 'https://calendly.com/contact-bulleo-soins'
});
```

### Flux cadeau (Stripe, inchange)

Le bouton "Offrir" ouvre le modal maison existant → formulaire (nom, email, tel, destinataire) → paiement Stripe → success.html → Formspree. Ce flux ne change pas.

---

## Integration Instagram

Embed du feed via la methode oEmbed ou un widget tiers leger :

```html
<section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 text-center">
        <h2 class="font-serif text-2xl mb-2">Suivez-nous</h2>
        <a href="https://www.instagram.com/bulleo_" target="_blank"
           class="text-primary font-bold">@bulleo_</a>
        <div class="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <!-- 4-8 derniers posts Instagram embeds ou screenshots statiques -->
        </div>
    </div>
</section>
```

Note : l'API Instagram oEmbed necessite un token Facebook. Alternative simple : screenshots statiques des posts mis a jour periodiquement, ou widget tiers (SnapWidget, Elfsight gratuit).

---

## Schema.org / SEO

### Page d'accueil — JSON-LD

3 blocs JSON-LD :
1. **HealthAndBeautyBusiness** avec `@id`, adresse, geo, horaires, aggregateRating (90 avis), hasOfferCatalog
2. **FAQPage** avec les questions transversales
3. **Person** pour Estelle (jobTitle, hasCredential, worksFor)

### Pages services — JSON-LD

Chaque page a :
1. **Service** avec offers, provider (ref @id business), areaServed
2. **FAQPage** avec les questions contextuelles
3. **BreadcrumbList**

### Toutes les pages

- `<title>` unique, < 60 chars, avec prix et localisation
- `<meta description>` unique, < 160 chars
- OG tags complets avec URLs absolues
- Twitter Cards (name, pas property)
- Canonical URL
- `viewport-fit=cover`
- `lang="fr"`
- `llms.txt` a jour

---

## Mentions legales

### Informations collectees

| Champ | Valeur |
|-------|--------|
| Raison sociale | Madame Estelle Cazajous |
| SIRET | 899 951 990 00014 |
| Code APE | 9604Z — Entretien corporel |
| N° TVA | FR80899951990 |
| Siege social | 12 Rue Aristide Berges, 65000 Tarbes |
| Cabinet | 108-6 Rue du Magasin aux Tabacs, 65000 Tarbes |
| Tel | 06 75 43 02 57 |
| Email | contact@bulleo-soins.com |
| Hebergeur | Gandi SAS, 63-65 Boulevard Massena, 75013 Paris |
| Directrice publication | Estelle Cazajous |

### Pages a generer

1. **mentions-legales.html** : editeur, hebergeur, propriete intellectuelle, responsabilite
2. **politique-confidentialite.html** : donnees collectees (Formspree, Stripe, Calendly, GTM), droits RGPD, cookies, duree conservation
3. **cgv.html** : objet, tarifs, modalites reservation (Calendly), paiement (Stripe), bons cadeaux, annulation, droit de retractation

---

## Performance

### Objectifs Core Web Vitals

| Metrique | Cible |
|----------|-------|
| LCP | < 2.5s |
| FID/INP | < 100ms |
| CLS | < 0.1 |

### Optimisations prevues

- Images locales WebP avec `srcset` et `loading="lazy"`
- Tailwind CSS CDN (contrainte — pas de build system disponible)
- Scripts Stripe et Calendly en `async`
- Google Fonts avec `preconnect` et `display=swap`
- Font Awesome en `defer` ou subset
- `<link rel="preload">` pour hero image et logo
- GZIP via .htaccess (mod_deflate)
- Cache via .htaccess (mod_expires)

---

## Accessibilite

- Skip navigation (`sr-only focus:not-sr-only`)
- `aria-expanded` sur FAQ accordions
- `role="dialog"` et `aria-modal="true"` sur modals
- Focus trapping dans les modals
- Touch targets min 44x44px
- `prefers-reduced-motion` respecte
- Contrastes WCAG AA sur tous les textes
- `lang="fr"` sur `<html>`
- Input font-size >= 16px sur mobile (anti zoom iOS)
- `viewport-fit=cover` + safe-area-insets

---

## Mobile

- Mobile-first : design 320px comme base
- Sticky footer : Appeler (30%) + Reserver (70%) avec safe-area-insets
- Menu hamburger slide-in avec sauvegarde scroll position
- Hero `100dvh`
- Parallax desactive sur touch devices
- Swipe sur carrousels/galerie
- Passive scroll listeners

---

## Fichiers a creer/modifier

### Nouveaux fichiers
- `mentions-legales.html`
- `politique-confidentialite.html`
- `cgv.html`

### Fichiers a reecrire completement
- `index.html` (refonte totale)
- `assets/css/styles.css` (nouvelle palette, nouveaux composants)
- `assets/js/main.js` (Calendly, nouveau modal cadeau, Instagram)

### Fichiers a adapter (template + contenu existant)
- `services/massage-prenatal.html`
- `services/massage-postnatal.html`
- `services/bain-enveloppe.html`
- `services/soin-rebozo.html`
- `services/reflexologie.html`
- `services/atelier-massage-bebe.html`
- `services/atelier-motricite.html`
- `success.html` (adapter le style)

### Fichiers a mettre a jour
- `sitemap.xml` (ajouter pages legales)
- `robots.txt` (autoriser pages legales)
- `llms.txt` (mettre a jour nom "Bulleo — Institut Perinatal")
- `.htaccess` (inchange)
- `assets/favicon/site.webmanifest` (nom "Bulleo")

### Fichier a supprimer
- `index_v2.html` (remplace par le nouveau index.html)
- `contact.html`, `galerie.html`, `temoignages.html` (integres dans l'accueil ou supprimes)
