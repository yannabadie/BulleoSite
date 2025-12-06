# Bulleo Soins - Site Web

Site vitrine pour Bulleo Soins, institut de soins perinataux a Tarbes (65000).

## Structure du Projet

```
BulleoSite/
├── index.html              # Page d'accueil principale
├── contact.html            # Page de contact
├── galerie.html            # Galerie photos
├── temoignages.html        # Temoignages clients
├── noel_2025.html          # Offres speciales Noel (jusqu'au 25/12/2025)
├── success.html            # Page de confirmation paiement Stripe
├── assets/
│   ├── css/styles.css      # Styles CSS externes
│   ├── js/main.js          # JavaScript principal
│   └── favicon/            # Favicons et icones PWA
├── services/               # Pages detaillees des services (voir services/README.md)
└── archives/               # Documentation technique historique
```

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
| Google Tag Manager | Analytics |
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

### noel_2025.html
- Page autonome avec offres de Noel
- Valide jusqu'au 25 decembre 2025
- Contient son propre CSS/JS inline

## Configuration

Voir `CLAUDE.md` pour :
- Protocole de mise a jour des prix
- Configuration serviceConfig et serviceToPriceId
- Gestion des offres combinees

## Developpement Local

```bash
# Serveur local
npx http-server -p 8080

# Puis ouvrir http://localhost:8080
```

Pas de build necessaire - site statique pur HTML/CSS/JS.
