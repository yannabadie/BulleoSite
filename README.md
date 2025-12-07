# Bulleo Soins - Site Web

Site vitrine pour Bulleo Soins, institut de soins perinataux a Tarbes (65000).

## Structure du Projet

```
BulleoSite/
├── index.html              # Page d'accueil principale (~123 KB)
├── contact.html            # Page de contact
├── galerie.html            # Galerie photos
├── temoignages.html        # Temoignages clients + integration Google Business
├── noel_2025.html          # Offres speciales Noel (jusqu'au 25/12/2025)
├── success.html            # Page de confirmation paiement Stripe
│
├── assets/
│   ├── css/
│   │   └── styles.css      # Styles CSS externes
│   ├── js/
│   │   ├── main.js         # JavaScript principal (~1900 lignes)
│   │   └── README.md       # Documentation JS
│   ├── favicon/            # Favicons et icones PWA
│   └── images/             # Images hebergees localement (27 fichiers)
│       ├── logos/          # logo-main.webp, logo-mobile.webp
│       ├── services/       # 11 images des services
│       ├── portraits/      # 6 portraits d'Estelle
│       ├── gallery/        # 7 images de la galerie
│       └── misc/           # 1 image (decoration-murale)
│
├── services/               # Pages detaillees des services (7 pages)
│   ├── massage-prenatal.html
│   ├── massage-postnatal.html
│   ├── bain-enveloppe.html
│   ├── soin-rebozo.html
│   ├── reflexologie.html
│   ├── atelier-massage-bebe.html
│   ├── atelier-motricite.html
│   └── README.md
│
├── includes/               # Composants HTML reutilisables
│   ├── header.html         # Header et navigation
│   ├── footer.html         # Footer
│   └── base-template.html  # Template de base
│
├── archives/               # Documentation technique historique
│   ├── index_original.html # Backup de l'index original
│   └── *.md                # Rapports et documentation
│
└── memory-bank/            # Templates documentation (Cursor/AI)
```

## Services Proposes (11 services)

| Service | Page | Variantes |
|---------|------|-----------|
| Massage Prenatal | massage-prenatal.html | 1h, 1h30, prenatal_bain |
| Massage Postnatal | massage-postnatal.html | 1h, 1h30, postnatal_bain, postnatal_rebozo |
| Bain Enveloppe | bain-enveloppe.html | solo, bain_prenatal, bain_postnatal, bain_rebozo |
| Soin Rebozo | soin-rebozo.html | solo, rebozo_bain, rebozo_massage |
| Reflexologie Plantaire | reflexologie.html | - |
| Atelier Massage Bebe | atelier-massage-bebe.html | - |
| Atelier Motricite | atelier-motricite.html | - |
| Massage bebe & enfant | - | - |
| Soin postnatal complet | - | - |
| Reflexologie Pediatrique | - | - |
| Agenda: Ma premiere annee | - | - |

## Flux Utilisateur

### Parcours Reservation
```
index.html ──► services/*.html ──► Clic tarif/bouton
                                         │
                                         ▼
                                  Modal Reservation
                                         │
                     ┌───────────────────┴───────────────────┐
                     ▼                                       ▼
              "Offrir un cadeau"                       "Reserver"
                     │                                       │
                     ▼                                       ▼
             Formulaire cadeau                      Formulaire reservation
             + Nom beneficiaire                     + Date/Heure souhaitee
                     │                                       │
                     └───────────────────┬───────────────────┘
                                         ▼
                                  Bouton Stripe
                                         │
                                         ▼
                             Paiement securise Stripe
                                         │
                             ┌───────────┴───────────┐
                             ▼                       ▼
                     success.html              Annulation
                          │
                          ▼
                  Envoi Formspree (email)
```

## Dependances Externes (CDN)

| Service | Usage |
|---------|-------|
| Tailwind CSS | Framework CSS utilitaire |
| Font Awesome | Icones |
| Google Fonts | Polices Playfair Display + Poppins |
| Stripe | Paiement en ligne |
| EmailJS | Envoi emails (formulaire contact) |
| Formspree | Reception formulaires reservation |
| Google Tag Manager | Analytics (GTM-MZT366F6) |
| TermsFeed | Bandeau cookies RGPD |

## Pages Principales

### index.html
- Page d'accueil avec sections: Hero, A propos, Prestations, Galerie, FAQ, Contact
- Contient le modal de reservation principal
- Charge `assets/js/main.js` et `assets/css/styles.css`
- Gere les parametres URL `?book=service` et `?gift=service`

### services/*.html
- Pages detaillees pour chaque service
- Contiennent leur propre modal de reservation
- Cartes de prix cliquables pour ouvrir le modal avec formule pre-selectionnee
- Voir `services/README.md` pour details

### temoignages.html
- Temoignages clients
- Integration Google Business (badge note 5.0/5, lien avis)
- Schema.org LocalBusiness pour SEO

### noel_2025.html
- Page autonome avec offres de Noel
- Valide jusqu'au 25 decembre 2025
- Contient son propre CSS/JS inline

## Images

Toutes les images sont hebergees localement dans `assets/images/` (27 fichiers .webp):

- **logos/** (2) : Logo principal et mobile
- **services/** (11) : Images des services
- **portraits/** (6) : Photos d'Estelle
- **gallery/** (7) : Galerie photos
- **misc/** (1) : Decoration

Sources des images : Google Photos (proprietaire) + Pexels (reflexologie, libre de droits)

## Configuration

Voir `CLAUDE.md` pour :
- Protocole de mise a jour des prix
- Configuration serviceConfig et serviceToPriceId
- Gestion des offres combinees
- Convention de nommage (pas d'accents dans les noms de services JavaScript)

## Developpement Local

```bash
# Serveur local
npx http-server -p 8080

# Puis ouvrir http://localhost:8080
```

Pas de build necessaire - site statique pur HTML/CSS/JS.

## Conventions Importantes

### Noms de Services (JavaScript)
Les noms de services dans `serviceConfig` et les attributs `onclick` **ne doivent PAS contenir d'accents** :
- Correct : `'Massage Prenatal'`, `'Bain Enveloppe'`, `'Atelier Massage Bebe'`
- Incorrect : `'Massage Prénatal'`, `'Bain Enveloppé'`, `'Atelier Massage Bébé'`

### Chemins d'Images
- Dans `index.html` : `src="assets/images/..."`
- Dans `services/*.html` : `src="../assets/images/..."`

## Derniere Mise a Jour

- **Decembre 2025** : Migration images vers hebergement local, correction reflexologie, integration Google Business
- **Octobre 2025** : Mise a jour prix, suppression offres Noel de index.html, correction bugs modals
