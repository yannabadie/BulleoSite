# 💰 Mise à jour : Soin postnatal complet – Massage & Rebozo

## 📊 Nouvelles informations

**Prix :** 145€ → **160€**  
**Price ID Stripe :** `price_1SIyXlCm8TYzw7cAzFfc2qyB`  
**Buy Button ID Stripe :** `buy_btn_1SJw4zCm8TYzw7cAgkiZH9Va`

---

## ✅ Modifications appliquées

### 1. **Vignette de service (ligne ~1114)**

**Avant :**
```html
<span class="text-gray-600">Tarif : 145€</span>
```

**Après :**
```html
<span class="text-gray-600">Tarif : 160€</span>
```

---

### 2. **Configuration serviceConfig (ligne ~2261-2268)**

**Avant :**
```javascript
'Soin postnatal complet – Massage & Rebozo': { 
    name: 'Soin postnatal complet – Massage & Rebozo', 
    article: 'un',
    giftText: 'Offrir un bon cadeau Soin postnatal complet',
    bookText: 'Réserver un Soin postnatal complet',
    price: '145,00 €',
    buyButtonId: 'buy_btn_1RqWYrCm8TYzw7cAfLyQ0neY'
},
```

**Après :**
```javascript
'Soin postnatal complet – Massage & Rebozo': { 
    name: 'Soin postnatal complet – Massage & Rebozo', 
    article: 'un',
    giftText: 'Offrir un bon cadeau Soin postnatal complet',
    bookText: 'Réserver un Soin postnatal complet',
    price: '160,00 €',
    buyButtonId: 'buy_btn_1SJw4zCm8TYzw7cAgkiZH9Va'
},
```

---

### 3. **Mapping Price ID (ligne ~2844)**

**Avant :**
```javascript
'Soin postnatal complet – Massage & Rebozo': 'price_1RqVNfCm8TYzw7cAxmCMDEPb',
```

**Après :**
```javascript
'Soin postnatal complet – Massage & Rebozo': 'price_1SIyXlCm8TYzw7cAzFfc2qyB',
```

---

### 4. **Modal de description détaillée (ligne ~3647)**

**Avant :**
```html
<div class="flex items-center">
    <i class="fas fa-euro-sign mr-2"></i>
    <span>Tarif : 145€</span>
</div>
```

**Après :**
```html
<div class="flex items-center">
    <i class="fas fa-euro-sign mr-2"></i>
    <span>Tarif : 160€</span>
</div>
```

---

## 🎯 Impact

### Prix affichés mis à jour (4 emplacements)
✅ Vignette du service → **160€**  
✅ Configuration serviceConfig → **160,00 €**  
✅ Modal de description → **160€**  
✅ Price ID Stripe → **price_1SIyXlCm8TYzw7cAzFfc2qyB**

### Bouton de paiement Stripe
✅ Buy Button ID → **buy_btn_1SJw4zCm8TYzw7cAgkiZH9Va**

---

## 📋 Points de contrôle

- [x] Prix sur vignette de service (page d'accueil)
- [x] Prix dans `serviceConfig` (système de réservation)
- [x] Price ID dans `serviceToPriceId` (système de paiement)
- [x] Buy Button ID dans `serviceConfig` (bouton Stripe)
- [x] Prix dans la description modale (fenêtre de détails)
- [x] Aucune erreur JavaScript détectée

---

## 🔗 Informations Stripe

**Nouvel identifiant de produit :**
- **Price ID :** `price_1SIyXlCm8TYzw7cAzFfc2qyB`
- **Buy Button ID :** `buy_btn_1SJw4zCm8TYzw7cAgkiZH9Va`
- **Publishable Key :** `pk_live_51RngTlCm8TYzw7cAg4DHZDf8Ekwjip4lNtC4vd2xaNBxYa5ayMJJmXlSN90FQN1RsITW0OCftaRgy3fsIZ8zzWRr00lM3lDBnn`

**Code Stripe fourni :**
```html
<script async src="https://js.stripe.com/v3/buy-button.js"></script>
<stripe-buy-button
  buy-button-id="buy_btn_1SJw4zCm8TYzw7cAgkiZH9Va"
  publishable-key="pk_live_51RngTlCm8TYzw7cAg4DHZDf8Ekwjip4lNtC4vd2xaNBxYa5ayMJJmXlSN90FQN1RsITW0OCftaRgy3fsIZ8zzWRr00lM3lDBnn"
>
</stripe-buy-button>
```

---

**Date :** 19 octobre 2025  
**Fichier modifié :** `index.html`  
**Statut :** ✅ Modifications appliquées avec succès
