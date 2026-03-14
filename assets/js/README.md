# JavaScript - main.js

Fichier JavaScript principal contenant toute la logique du site (~1900 lignes).

## Structure du Fichier

```
main.js
├── CONFIGURATION DES SERVICES (lignes 1-200)
│   ├── serviceConfig          # Config UI des services (noms, prix, variantes)
│   └── serviceToPriceId       # Mapping Stripe Price IDs
│
├── STRIPE (lignes 200-600)
│   ├── initializeStripe()     # Initialisation Stripe
│   ├── handlePayment()        # Gestion paiement
│   ├── sendFormspreeData()    # Envoi donnees Formspree
│   └── checkStripeReturn()    # Retour apres paiement
│
├── BOOKING MODAL (lignes 600-820)
│   ├── openBookingModal()     # Ouvre modal reservation
│   ├── openBookingModalWithVariant()  # Ouvre avec variante pre-selectionnee
│   └── openServiceModalFromDescription()
│
├── MESSAGES (lignes 820-850)
│   └── showMessage()          # Affiche notifications
│
├── LOADER (lignes 850-880)
│   └── hideLoader()           # Cache le loader
│
├── NAVIGATION (lignes 880-960)
│   ├── initMobileMenu()       # Menu hamburger mobile
│   ├── initHeaderScroll()     # Header sticky au scroll
│   └── initSmoothScroll()     # Scroll fluide ancres
│
├── MODALS (lignes 960-1020)
│   ├── closeModal()           # Ferme un modal
│   └── initModalClose()       # Init fermeture modals
│
├── SLIDESHOW (lignes 1020-1060)
│   ├── openSlideshow()
│   ├── updateSlideshow()
│   ├── prevSlide()
│   └── nextSlide()
│
├── SERVICE MODAL (lignes 1060-1450)
│   ├── serviceIdToName        # Mapping ID → Nom
│   ├── openServiceModal()     # Modal description service
│   ├── getServiceData()       # Donnees services (descriptions)
│   └── switchTab()            # Onglets modal
│
├── PARALLAX (lignes 1450-1500)
│   └── initParallax()
│
├── FORM HANDLING (lignes 1500-1670)
│   └── initActionSelect()     # Gestion select Offrir/Reserver
│
├── URL PARAMS (lignes 1670-1710)
│   ├── checkStripeReturn()
│   └── checkBookingParam()    # Gere ?book= et ?gift=
│
├── INITIALIZATION (lignes 1710-1770)
│   └── DOMContentLoaded       # Init au chargement
│
└── FAQ (lignes 1770-1790)
    └── toggleFAQ()            # Accordeon FAQ
```

## Services Configures (11 services)

### Services avec Variantes (hasRelatedOffers: true)

| Service | Cles Variantes |
|---------|----------------|
| Massage Prenatal | `1h`, `1h30`, `prenatal_bain` |
| Massage Postnatal | `1h`, `1h30`, `postnatal_bain`, `postnatal_rebozo` |
| Bain Enveloppe | `solo`, `bain_prenatal`, `bain_postnatal`, `bain_rebozo` |
| Soin Rebozo | `solo`, `rebozo_bain`, `rebozo_massage` |

### Services Simples (prix unique)

- Reflexologie Plantaire Obstetrique
- Reflexologie plantaire Pediatrique
- Massage bebe & enfant
- Atelier Massage Bebe
- Soin postnatal complet - Massage & Rebozo
- Agenda: Ma premiere annee de maman
- Atelier Motricite & Eveil sensoriel

## Convention de Nommage (CRITIQUE)

**Les noms de services ne doivent PAS contenir d'accents.**

```javascript
// CORRECT
'Massage Prenatal': { ... }
'Bain Enveloppe': { ... }
'Atelier Massage Bebe': { ... }

// INCORRECT - Provoquera des erreurs
'Massage Prénatal': { ... }
'Bain Enveloppé': { ... }
'Atelier Massage Bébé': { ... }
```

## Fonctions Principales

### openBookingModal(serviceName)

Ouvre le modal de reservation pour un service.

```javascript
openBookingModal('Massage Prenatal');
```

**Actions :**
1. Recupere config du service dans `serviceConfig`
2. Met a jour titre du modal
3. Configure options Offrir/Reserver
4. Si service a des variantes → genere dropdown
5. Configure event listener pour changement de variante
6. Affiche le modal

### openBookingModalWithVariant(serviceName, variantKey)

Ouvre le modal avec une variante pre-selectionnee.

```javascript
openBookingModalWithVariant('Massage Prenatal', '1h');
```

**Actions :**
1. Appelle `openBookingModal(serviceName)`
2. Apres 100ms, selectionne la variante dans le dropdown
3. Met a jour le prix affiche

### handlePayment(actionType)

Gere le processus de paiement Stripe.

```javascript
handlePayment('booking'); // ou 'gift'
```

**Actions :**
1. Valide le formulaire
2. Sauvegarde les donnees du formulaire
3. Recupere le Price ID Stripe correspondant
4. Redirige vers Stripe Checkout

### checkBookingParam()

Verifie les parametres URL au chargement.

**Parametres supportes :**
- `?book=massage-prenatal` → Ouvre modal reservation
- `?gift=massage-prenatal` → Ouvre modal cadeau

**Mapping URL → Service :**
```javascript
const serviceMap = {
    'massage-prenatal': 'Massage Prenatal',
    'massage-postnatal': 'Massage Postnatal',
    'bain-enveloppe': 'Bain Enveloppe',
    'soin-rebozo': 'Soin Rebozo',
    'reflexologie': 'Reflexologie Plantaire Obstetrique',
    'atelier-massage-bebe': 'Atelier Massage Bebe',
    'atelier-motricite': 'Atelier Motricite & Eveil sensoriel'
};
```

## Configuration des Services

### serviceConfig

Object contenant la configuration UI de chaque service :

```javascript
'Massage Prenatal': {
    name: 'Massage Prenatal',
    article: 'un',
    giftText: 'Offrir un bon cadeau Massage Prenatal',
    bookText: 'Reserver un Massage Prenatal',
    hasRelatedOffers: true,  // Service avec variantes
    relatedOffers: [
        {
            key: '1h',               // Cle unique
            name: 'Massage Prenatal 1h seul',
            price: '75,00 EUR',
            priceId: 'price_xxx',    // Stripe Price ID
            buyButtonId: 'buy_btn_xxx'
        },
        // ...
    ]
}
```

### serviceToPriceId

Mapping pour le paiement Stripe :

```javascript
'Massage Prenatal': {
    default: 'price_xxx',
    relatedOffers: {
        '1h': 'price_xxx',
        '1h30': 'price_yyy',
        'prenatal_bain': 'price_zzz'
    }
}
```

**IMPORTANT**: Les cles dans `relatedOffers` doivent etre identiques entre `serviceConfig` et `serviceToPriceId`.

## Events

### DOMContentLoaded

Initialise tous les modules :
- `initMobileMenu()`
- `initHeaderScroll()`
- `initSmoothScroll()`
- `initModalClose()`
- `initParallax()`
- `initActionSelect()`
- `initGalleryKeyboard()`
- `generateGallery()`
- `initializeStripe()`
- `checkStripeReturn()`
- `checkBookingParam()`

### window.load

- Cache le loader apres 1.5s
- Fallback: cache apres 3s si toujours visible

## Variables Globales

- `currentSelectedService` - Service actuellement selectionne
- `currentSlideshowImages` - Images du slideshow
- `currentSlideshowIndex` - Index image courante
- `window.bookingFormData` - Donnees formulaire sauvegardees

## Debug

```javascript
// Forcer envoi Formspree (console)
window.forceSendFormspree();
```

## Mise a Jour des Prix

Pour mettre a jour les prix, modifier:
1. `serviceConfig` - prix affiches et buyButtonId
2. `serviceToPriceId` - mapping Price IDs Stripe

Voir `CLAUDE.md` pour le protocole complet.
