# 📋 Plan de mise à jour des prix - 19 octobre 2025

## 🎯 Étape 1 : Restauration de la base saine

**Action** : Copier `index copy.html` → `index.html`

---

## 💰 Étape 2 : Mise à jour des prix d'après le CSV

### 🎄 Nouvelles offres de Noël (à ajouter)

| Produit | Prix | Price ID | Buy Button ID |
|---------|------|----------|---------------|
| Offre de Noël : Massage femme enceinte + massage post partum | 150,00 € | `price_1SJrfgCm8TYzw7cAVeBMPvXh` | `buy_btn_1SJt5ZCm8TYzw7cADMTcEboB` |
| Offre de Noël: Soin rebozo + massage post partum | 155,00 € | `price_1SJra0Cm8TYzw7cA8Z3Cncxf` | `buy_btn_1SJt92Cm8TYzw7cACUIPM8xk` |
| Offre de Noël : Bain + Soin rebozo | 150,00 € | `price_1SJrWmCm8TYzw7cAi7TedF1f` | `buy_btn_1SJtAiCm8TYzw7cAwDrCkznF` |
| Offre de Noël: Bain + massage femme enceinte ou post partum | 135,00 € | `price_1SJrVaCm8TYzw7cAz6BiJsSG` | `buy_btn_1SJtCdCm8TYzw7cAF6T2dKkp` |

### 📊 Services existants à mettre à jour

| Service actuel (index copy.html) | Ancien Prix | Nouveau Prix | Nouveau Price ID | Nouveau Buy Button ID |
|----------------------------------|-------------|--------------|------------------|----------------------|
| **Massage bébé & enfant** | 50,00 € | **55,00 €** | `price_1SIyYXCm8TYzw7cA3eAcDt0z` | `buy_btn_1SJtExCm8TYzw7cAeMS6sTrU` |
| **Atelier Massage Bébé** | 75,00 € | **80,00 €** | `price_1SIyYACm8TYzw7cAcgWKZUDU` | `buy_btn_1SJtGGCm8TYzw7cADMJv955k` |
| **Soin Rebozo** | 80,00 € | **90,00 €** | `price_1SIyVlCm8TYzw7cAPEPWMeLr` | `buy_btn_1SJtNJCm8TYzw7cApeGQMlvs` |
| **Bain Enveloppé** | 60,00 € | **70,00 €** | `price_1SIyM2Cm8TYzw7cAVrkQJ2FH` | `buy_btn_1SJtjxCm8TYzw7cAiapizAVM` |
| **Massage Postnatal (1h)** | 70,00 € | **75,00 €** | `price_1SIyQxCm8TYzw7cADEHgfZ75` | `buy_btn_1SJtciCm8TYzw7cAi4BDm4De` |
| **Massage Prénatal (1h)** | 70,00 € | **75,00 €** | `price_1SIyPgCm8TYzw7cAgJTspWxo` | `buy_btn_1SJteVCm8TYzw7cAtmL056bN` |
| **Massage Postnatal 1h30** | 100,00 € | **110,00 €** | `price_1SIyTWCm8TYzw7cASFpVxPvS` | `buy_btn_1SJtP0Cm8TYzw7cAr1XEfiq9` |
| **Massage Prénatal 1h30** | 100,00 € | **110,00 €** | `price_1SIyT1Cm8TYzw7cAo9urSwWp` | `buy_btn_1SJtbSCm8TYzw7cAEDslgN2B` |

### 📦 Offres combinées existantes à mettre à jour

| Service | Ancien Prix | Nouveau Prix | Nouveau Price ID | Nouveau Buy Button ID |
|---------|-------------|--------------|------------------|----------------------|
| **Massage post accouchement + soin Rebozo** | 145,00 € (?) | **160,00 €** | `price_1SIyXlCm8TYzw7cAzFfc2qyB` | `buy_btn_1SJtHpCm8TYzw7cAcOxQmRrL` |
| **Soin Rebozo + bain enveloppé** | ? | **155,00 €** | `price_1SIyWNCm8TYzw7cAFlJgRQpZ` | `buy_btn_1SJtK5Cm8TYzw7cAx8WYvhKq` |
| **Massage post accouchement + bain enveloppé** | ? | **140,00 €** | `price_1SIyNqCm8TYzw7cAcgbBwTpa` | `buy_btn_1SJtgFCm8TYzw7cAdEGzcY5m` |
| **Massage femme enceinte + bain enveloppé** | ? | **140,00 €** | `price_1SIyNOCm8TYzw7cAxuJCLweM` | `buy_btn_1SJthmCm8TYzw7cAEtki54MD` |

---

## 🎯 Étape 3 : Architecture des offres combinées

### Stratégie d'intégration

Les offres combinées apparaîtront comme des **choix dans le menu déroulant** des services individuels :

#### 🔹 Massage Prénatal
Menu déroulant proposera :
- Massage Prénatal 1h seul - 75,00 €
- Massage Prénatal 1h30 seul - 110,00 €
- 🎄 Massage Prénatal + Massage Post Partum - 150,00 € (Offre Noël)
- 🎄 Massage Prénatal + Bain enveloppé - 140,00 €

#### 🔹 Massage Postnatal
Menu déroulant proposera :
- Massage Postnatal 1h seul - 75,00 €
- Massage Postnatal 1h30 seul - 110,00 €
- 🎄 Massage Postnatal + Massage Prénatal - 150,00 € (Offre Noël)
- Massage Postnatal + Bain enveloppé - 140,00 €
- Massage Postnatal + Soin Rebozo - 160,00 €

#### 🔹 Bain Enveloppé
Menu déroulant proposera :
- Bain Enveloppé seul - 70,00 €
- 🎄 Bain + Massage femme enceinte ou post partum - 135,00 € (Offre Noël)
- Bain + Massage femme enceinte - 140,00 €
- Bain + Massage post accouchement - 140,00 €
- 🎄 Bain + Soin Rebozo - 150,00 € (Offre Noël)

#### 🔹 Soin Rebozo
Menu déroulant proposera :
- Soin Rebozo seul - 90,00 €
- 🎄 Soin Rebozo + Bain enveloppé - 155,00 €
- 🎄 Soin Rebozo + Massage post partum - 155,00 € (Offre Noël)
- Soin Rebozo + Massage post accouchement - 160,00 €

---

## ✅ Actions à effectuer

1. ✅ Backup `index.html` actuel → `index_failed_gemini.html`
2. ✅ Copier `index copy.html` → `index.html`
3. ✅ Mettre à jour les prix des services existants dans `serviceConfig`
4. ✅ Mettre à jour les Price IDs dans `serviceToPriceId`
5. ✅ Ajouter le système `relatedOffers` pour les 4 services concernés
6. ✅ Modifier le HTML du modal pour supporter les menus déroulants dynamiques
7. ✅ Adapter les fonctions JavaScript pour gérer les offres combinées
8. ✅ Tester chaque modal et chaque option de paiement

---

**Prêt à commencer !** 🚀
