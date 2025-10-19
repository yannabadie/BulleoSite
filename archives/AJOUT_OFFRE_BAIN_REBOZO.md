# ➕ Ajout d'offre : Bain Enveloppé + Soin Rebozo

## 📋 Nouvelle offre ajoutée

**Service :** Bain Enveloppé  
**Nouvelle formule :** Bain + Soin Rebozo  
**Prix :** 155€  
**Key :** `bain_rebozo`

---

## ✅ Modifications appliquées

### 1. **Configuration serviceConfig (ligne ~2175-2200)**

**Avant :** 3 offres pour "Bain Enveloppé"
- Bain Enveloppé seul (70€)
- Bain + Massage Prénatal (140€)
- Bain + Massage Postnatal (140€)

**Après :** 4 offres pour "Bain Enveloppé"
- Bain Enveloppé seul (70€)
- Bain + Massage Prénatal (140€)
- Bain + Massage Postnatal (140€)
- **Bain + Soin Rebozo (155€)** ✨

```javascript
{
    key: 'bain_rebozo',
    name: 'Bain + Soin Rebozo',
    price: '155,00 €',
    priceId: 'price_1SIyWNCm8TYzw7cAFlJgRQpZ',
    buyButtonId: 'buy_btn_1SJtK5Cm8TYzw7cAx8WYvhKq'
}
```

---

### 2. **Mapping serviceToPriceId (ligne ~2831-2838)**

**Avant :**
```javascript
'Bain Enveloppé': {
    default: 'price_1SIyM2Cm8TYzw7cAVrkQJ2FH',
    relatedOffers: {
        'solo': 'price_1SIyM2Cm8TYzw7cAVrkQJ2FH',
        'bain_prenatal': 'price_1SIyNOCm8TYzw7cAxuJCLweM',
        'bain_postnatal': 'price_1SIyNqCm8TYzw7cAcgbBwTpa'
    }
},
```

**Après :**
```javascript
'Bain Enveloppé': {
    default: 'price_1SIyM2Cm8TYzw7cAVrkQJ2FH',
    relatedOffers: {
        'solo': 'price_1SIyM2Cm8TYzw7cAVrkQJ2FH',
        'bain_prenatal': 'price_1SIyNOCm8TYzw7cAxuJCLweM',
        'bain_postnatal': 'price_1SIyNqCm8TYzw7cAcgbBwTpa',
        'bain_rebozo': 'price_1SIyWNCm8TYzw7cAFlJgRQpZ'
    }
},
```

---

## 🔗 Informations Stripe

**Price ID :** `price_1SIyWNCm8TYzw7cAFlJgRQpZ`  
**Buy Button ID :** `buy_btn_1SJtK5Cm8TYzw7cAx8WYvhKq`

> **Note :** Cette combinaison utilise le même Price ID que "Soin Rebozo + Bain enveloppé" car c'est la même prestation (réciproque).

---

## 🎯 Résultat

Le service **"Bain Enveloppé"** dispose maintenant de **4 formules** au choix dans le menu déroulant :

1. Bain Enveloppé seul → 70€
2. Bain + Massage Prénatal → 140€
3. Bain + Massage Postnatal → 140€
4. **Bain + Soin Rebozo → 155€** ✨

---

## 🔄 Cohérence avec "Soin Rebozo"

Cette offre est cohérente avec le service **"Soin Rebozo"** qui propose également :
- Soin Rebozo + Bain enveloppé → 155€ (même Price ID)

Les deux services proposent maintenant cette combinaison, offrant plus de flexibilité aux utilisateurs.

---

## 📝 Fichiers modifiés

- **index.html** : 
  - `serviceConfig.['Bain Enveloppé'].relatedOffers` (ajout d'une 4ème offre)
  - `serviceToPriceId.['Bain Enveloppé'].relatedOffers` (ajout du mapping)

---

## 🧪 Validation

✅ **Aucune erreur JavaScript détectée**  
✅ **Configuration serviceConfig synchronisée**  
✅ **Mapping serviceToPriceId mis à jour**  
✅ **Prix et identifiants Stripe corrects**

---

**Date :** 19 octobre 2025  
**Statut :** ✅ Offre ajoutée avec succès
