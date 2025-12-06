# Cartographie des Offres et Configurations Stripe/Formspree

Ce document recense l'état actuel des configurations de paiement au 06/12/2025.

## 1. Clés API Stripe (Problème Critique)

Il existe un conflit de clés dans `index.html`.

*   **Clé Active (JS)** : `pk_live_51RngTlCm8TYzw7cAg4DHZDf8Ekwjip4lNtC4vd2xaNBxYa5ayMJJmXlSN90FQN1RsITW0OCftaRgy3fsIZ8zzWRr00lM3lDBnn`
    *   Utilisée dans `index.html` (fonction `redirectToStripeCheckout`)
    *   Utilisée dans `noel_2025.html` (variable `STRIPE_PUBLISHABLE_KEY`)
*   **Clé Obsolète/Erronée (HTML)** : `pk_live_51QGJOQCm8TYzw7cAluwFD2h4d9XPCRCRGBNaO9cJoSWdEz27B8POpF2kv10fKHGqrnOhgtFKOB5QGlJBxP9aUJjq00TJe0r7P5`
    *   Présente dans l'attribut `publishable-key` de la balise `<stripe-buy-button>` (ligne 2078 de `index.html`).

## 2. Page Principale (`index.html`)

La logique repose sur deux objets qui **DOIVENT** être synchronisés :
1.  `serviceConfig` (Affichage, Prix, UI)
2.  `serviceToPriceId` (Paiement réel)

### Mapping des Services

| Service | Variante / Clé | Prix (UI) | ID Stripe (Paiement) |
| :--- | :--- | :--- | :--- |
| **Massage Prénatal** | 1h (`1h`) | 75,00 € | `price_1SIyPgCm8TYzw7cAgJTspWxo` |
| | 1h30 (`1h30`) | 110,00 € | `price_1SIyT1Cm8TYzw7cAo9urSwWp` |
| | + Bain (`prenatal_bain`) | 140,00 € | `price_1SIyNOCm8TYzw7cAxuJCLweM` |
| **Massage Postnatal** | 1h (`1h`) | 75,00 € | `price_1SIyQxCm8TYzw7cADEHgfZ75` |
| | 1h30 (`1h30`) | 110,00 € | `price_1SIyTWCm8TYzw7cASFpVxPvS` |
| | + Bain (`postnatal_bain`) | 140,00 € | `price_1SIyNqCm8TYzw7cAcgbBwTpa` |
| | + Rebozo (`postnatal_rebozo`) | 160,00 € | `price_1SIyXlCm8TYzw7cAzFfc2qyB` |
| **Bain Enveloppé** | Solo (`solo`) | 70,00 € | `price_1SIyM2Cm8TYzw7cAVrkQJ2FH` |
| | + Prénatal (`bain_prenatal`) | 140,00 € | `price_1SIyNOCm8TYzw7cAxuJCLweM` |
| | + Postnatal (`bain_postnatal`) | 140,00 € | `price_1SIyNqCm8TYzw7cAcgbBwTpa` |
| | + Rebozo (`bain_rebozo`) | 155,00 € | `price_1SIyWNCm8TYzw7cAFlJgRQpZ` |
| **Soin Rebozo** | Solo (`solo`) | 90,00 € | `price_1SIyVlCm8TYzw7cAPEPWMeLr` |
| | + Bain (`rebozo_bain`) | 155,00 € | `price_1SIyWNCm8TYzw7cAFlJgRQpZ` |
| | + Massage (`rebozo_massage`) | 160,00 € | `price_1SIyXlCm8TYzw7cAzFfc2qyB` |
| **Atelier Massage Bébé** | N/A | 80,00 € | `price_1SIyYACm8TYzw7cAcgWKZUDU` |
| **Réflexologie Obstétrique** | N/A | 50,00 € | `price_1RqWkwCm8TYzw7cAc1RYwLxa` |
| **Réflexologie Pédiatrique** | N/A | 50,00 € | `price_1RqWlgCm8TYzw7cANnCeRBdq` |
| **Massage bébé & enfant** | N/A | 55,00 € | `price_1SIyYXCm8TYzw7cA3eAcDt0z` |
| **Soin postnatal complet** | N/A | 160,00 € | `price_1SIyXlCm8TYzw7cAzFfc2qyB` |
| **Agenda** | N/A | 31,80 € | `price_1RqVTxCm8TYzw7cA6e88Upbg` |
| **Atelier Motricité** | N/A | 16,00 € | `price_1RzzLGCm8TYzw7cAFej7gEph` |

### Formspree (Endpoints)

Ces endpoints sont définis dans `success.html` (via `submitToFormspree`) :
*   **Bons Cadeaux** : `https://formspree.io/f/meozaekb`
*   **Réservations** : `https://formspree.io/f/xdkdeazw`

---

## 3. Page Noël 2025 (`noel_2025.html`)

Logique indépendante utilisant l'objet `christmasProducts`.

| Clé Produit | Nom | Prix | ID Stripe |
| :--- | :--- | :--- | :--- |
| `photo_1` | 1 Photo Père Noël | 1,00 € | `price_1S7KgOCm8TYzw7cA085etQjZ` |
| `photo_3` | 3 Photos Père Noël | 1,00 € | `price_1S7Kh0Cm8TYzw7cAPZaxU9Gl` |
| `bain_massage` | Bain + Massage | 135,00 € | `price_1SJrVaCm8TYzw7cAz6BiJsSG` |
| `bain_rebozo` | Bain + Rebozo | 150,00 € | `price_1SJrWmCm8TYzw7cAi7TedF1f` |
| `rebozo_massage` | Rebozo + Massage | 155,00 € | `price_1SJra0Cm8TYzw7cA8Z3Cncxf` |
| `bain_enveloppe_noel` | Bain Enveloppé (Offre) | 65,00 € | `price_1SQVdMCm8TYzw7cAmKOGZiCa` |
| `massage_solo` | Massage Solo (Offre) | 70,00 € | `price_1SQuLiCm8TYzw7cAx5AbRGPw` |

⚠️ **Attention** : Ce flux ne capture **aucune** donnée client (Nom, Email destinataire) avant le paiement.
