# Services - Pages Detaillees

Pages individuelles pour chaque service avec SEO optimise et reservation integree.

## Structure des Pages

Chaque page service suit la meme structure :

```
┌─────────────────────────────────────────┐
│  Header (navigation + logo)             │
│  Menu mobile (hamburger)                │
├─────────────────────────────────────────┤
│  Breadcrumb (Accueil > Prestations > X) │
├─────────────────────────────────────────┤
│  Hero Section                           │
│  - Badge categorie                      │
│  - Titre H1                             │
│  - Description courte                   │
│  - Cartes tarifs CLIQUABLES            │
│  - Boutons Reserver/Offrir              │
│  - Image principale                     │
├─────────────────────────────────────────┤
│  Description detaillee                  │
│  - Texte explicatif                     │
│  - Liste des bienfaits                  │
│  - Informations pratiques               │
├─────────────────────────────────────────┤
│  CTA Section (call-to-action)           │
├─────────────────────────────────────────┤
│  Autres services (liens croises)        │
├─────────────────────────────────────────┤
│  Footer                                 │
├─────────────────────────────────────────┤
│  Modal de Reservation (cache)           │
└─────────────────────────────────────────┘
```

## Fichiers

| Fichier | Service | Cles Variantes |
|---------|---------|----------------|
| massage-prenatal.html | Massage Prenatal | `1h`, `1h30`, `prenatal_bain` |
| massage-postnatal.html | Massage Postnatal | `1h`, `1h30`, `postnatal_bain`, `postnatal_rebozo` |
| bain-enveloppe.html | Bain Enveloppe | `solo`, `bain_prenatal`, `bain_postnatal`, `bain_rebozo` |
| soin-rebozo.html | Soin Rebozo | `solo`, `rebozo_bain`, `rebozo_massage` |
| reflexologie.html | Reflexologie Plantaire | (pas de variantes) |
| atelier-massage-bebe.html | Atelier Massage Bebe | (pas de variantes) |
| atelier-motricite.html | Atelier Motricite | (pas de variantes) |

## Interactions JavaScript

### Cartes de Prix Cliquables

```html
<div class="price-card" onclick="openBookingModalWithVariant('Massage Prenatal', '1h')">
    <p class="text-sm">1 heure</p>
    <p class="text-3xl font-bold">75 EUR</p>
</div>
```

**Comportement :**
1. Clic sur carte → `openBookingModalWithVariant(serviceName, variantKey)`
2. Ouvre le modal de reservation
3. Pre-selectionne la formule correspondante dans le dropdown
4. Met a jour le prix affiche

### Boutons Reserver/Offrir

```html
<button onclick="openBookingModal('Massage Prenatal')">Reserver ce soin</button>
<button onclick="openBookingModal('Massage Prenatal', true)">Offrir ce soin</button>
```

**Note :** Le second parametre `true` est prevu pour le mode cadeau (pas encore implemente).

## Modal de Reservation

Chaque page inclut un modal identique a celui de `index.html` avec :

- `#bookingModal` - Conteneur principal
- `#actionSelect` - Choix Offrir/Reserver
- `#variantSection` - Selection formule (si applicable)
- `#recipientSection` - Nom beneficiaire (mode cadeau)
- `#shippingAddressSection` - Adresse (pour Agenda uniquement)
- `#bookingDateSection` - Date souhaitee
- `#bookingTimeSection` - Heure souhaitee
- `#stripeButtonContainer` - Bouton paiement Stripe

## SEO

Chaque page inclut :
- Balises meta description et keywords
- Open Graph pour partage social
- Twitter Cards
- Schema.org (Service + LocalBusiness)
- Balise canonical
- Geo-targeting (Tarbes, 65000)

## Liens avec index.html

Les pages services sont accessibles depuis :
1. Section "Prestations" de index.html → bouton "Voir les details"
2. Navigation principale
3. Liens croises en bas de chaque page service

## Dependances

- `../assets/js/main.js` - Toute la logique JavaScript
- `../assets/css/styles.css` - Styles CSS
- Tailwind CSS (CDN)
- Font Awesome (CDN)
- Stripe (CDN)
