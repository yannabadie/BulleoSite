# 🐛 BUGS DÉTECTÉS - 19 octobre 2025

## Problème rapporté par l'utilisateur
> "Quand je choisi 'Massage Prénatal' puis une formule (différente de celle du massage prénatal seul): le tarif affiché reste le même."

---

## 🔴 BUG #1 : Prix modal ne change pas lors de la sélection
**Localisation** : Ligne ~2612, event listener `variantSelect`

### Symptôme
Quand on sélectionne une formule différente dans le dropdown (ex: "🎄 Massage Prénatal + Massage Post Partum - 150€"), le prix affiché dans la modal (`<span id="servicePrice">`) **NE CHANGE PAS**.

### Cause
L'event listener met à jour :
- ✅ `document.getElementById('servicePrice').textContent`
- ✅ Le bouton de paiement avec le nouveau prix

**MAIS IL NE MET PAS À JOUR** :
- ❌ Le `selectedKey` dans un champ caché du formulaire
- ❌ La logique de `handlePayment()` ne sait pas quel variant a été sélectionné

### Solution à appliquer
1. Ajouter un champ caché `<input type="hidden" id="selectedVariantKey">`
2. Mettre à jour ce champ dans l'event listener
3. Utiliser ce champ dans `handlePayment()` pour récupérer le bon Price ID

---

## 🔴 BUG #2 : Fonction handlePayment() ne connait pas le variant sélectionné
**Localisation** : Ligne ~2647+, fonction `handlePayment()`

### Symptôme
Quand on clique sur "💳 Finaliser le paiement", Stripe ne sait **PAS QUEL Price ID** utiliser car la fonction ne récupère pas l'information du variant/offre sélectionné.

### Cause
`handlePayment()` utilise probablement :
```javascript
const serviceName = document.getElementById('selectedService').value;
const priceId = serviceToPriceId[serviceName]; // ❌ MAUVAIS - récupère l'objet entier
```

Au lieu de :
```javascript
const selectedKey = document.getElementById('selectedVariantKey').value;
const service = serviceToPriceId[serviceName];
const priceId = service.relatedOffers[selectedKey] || service.variants[selectedKey] || service;
```

### Solution à appliquer
Modifier `handlePayment()` pour :
1. Récupérer `selectedVariantKey`
2. Chercher dans `relatedOffers` puis `variants`
3. Fallback sur le service simple si aucun variant

---

## 🔴 BUG #3 : Vignettes affichent les anciens prix
**Localisation** : Lignes ~780-830 (vignette Massage Prénatal)

### Symptôme
Les prix affichés sur les vignettes de services sont obsolètes :
- Affichage actuel : "Massage de 1h : **70€**"
- Prix correct CSV : "Massage de 1h : **75€**"

### Cause
Les prix sont codés en dur dans le HTML des vignettes et n'ont **pas été mis à jour** avec le CSV.

### Services concernés (à vérifier)
- Massage Prénatal 1h : 70€ → **75€**
- Massage Prénatal 1h30 : 100€ → **110€**
- Massage Postnatal 1h : 70€ → **75€**
- Massage Postnatal 1h30 : 100€ → **110€**
- Bain Enveloppé : 60€ → **70€**
- Soin Rebozo : 80€ → **90€**
- Atelier Massage Bébé : 75€ → **80€**
- Massage bébé & enfant : 50€ → **55€**

### Solution à appliquer
Rechercher tous les prix codés en dur dans les vignettes (section `#prestations`) et les mettre à jour selon le CSV.

---

## 📋 Plan de correction

### Étape 1 : Ajouter le champ caché pour selectedVariantKey
- Localisation : Dans le formulaire modal, après `<input type="hidden" id="selectedService">`
- Code à ajouter :
```html
<input type="hidden" id="selectedVariantKey" name="selected_variant_key" value="">
```

### Étape 2 : Mettre à jour l'event listener variantSelect
- Localisation : Ligne ~2612
- Ajouter après `const selectedKey = this.value;` :
```javascript
// Stocker le variant sélectionné
document.getElementById('selectedVariantKey').value = selectedKey;
```

### Étape 3 : Corriger handlePayment()
- Localisation : Rechercher la fonction `handlePayment()`
- Modifier la logique de récupération du Price ID

### Étape 4 : Mettre à jour tous les prix des vignettes
- Localisation : Section `#prestations`, lignes ~780-1500
- Rechercher tous les prix codés en dur
- Les remplacer par les nouveaux prix du CSV

---

## ⚠️ Impact utilisateur
- **Critique** : Les paiements Stripe peuvent échouer ou utiliser le mauvais Price ID
- **Critique** : Les prix affichés sur le site sont incorrects (tromperie involontaire)
- **Urgent** : À corriger **AVANT** mise en production

---

**Date de détection** : 19 octobre 2025
**Priorité** : 🔴 CRITIQUE
