# 📋 Analyse : Intégration des Offres Combinées de Noël

Date : 19 octobre 2025
Auteur : Claude (Assistant IA)

---

## 🎯 Objectif

Intégrer les **4 nouvelles offres combinées de Noël** dans les modales de réservation d'`index.html`, de manière à ce qu'elles apparaissent comme des choix supplémentaires dans les formulaires des services individuels.

### Exemple concret

Quand un utilisateur ouvre la modale **"Soin Rebozo"**, il doit pouvoir choisir entre :
- ✅ Soin Rebozo seul (80€)
- ✅ **Soin Rebozo + Bain enveloppé** (150€) ← NOUVELLE OFFRE
- ✅ **Soin Rebozo + Massage post partum** (155€) ← NOUVELLE OFFRE

---

## 📊 Les 4 offres combinées à intégrer

D'après `MaJ_10192025-NouveauxPrix-et-offredenoel.csv` :

| Offre combinée | Prix | Price ID Stripe | Buy Button ID |
|----------------|------|-----------------|---------------|
| Massage femme enceinte + massage post partum | 150€ | `price_1SJrfgCm8TYzw7cAVeBMPvXh` | `buy_btn_1SJt5ZCm8TYzw7cADMTcEboB` |
| Soin rebozo + massage post partum | 155€ | `price_1SJra0Cm8TYzw7cA8Z3Cncxf` | `buy_btn_1SJt92Cm8TYzw7cACUIPM8xk` |
| Bain + Soin rebozo | 150€ | `price_1SJrWmCm8TYzw7cAi7TedF1f` | `buy_btn_1SJtAiCm8TYzw7cAwDrCkznF` |
| Bain + massage femme enceinte ou post partum | 135€ | `price_1SJrVaCm8TYzw7cAz6BiJsSG` | `buy_btn_1SJtCdCm8TYzw7cAF6T2dKkp` |

---

## 🏗️ Architecture actuelle du système de modal

### 1. Le HTML de la modale (ligne ~1942)

```html
<div class="mb-4" id="variantSection" style="display: none;">
    <label class="block text-gray-700 mb-2" for="variantSelect">
        Choisissez la durée <span class="text-red-500">*</span>
    </label>
    <select id="variantSelect" name="service_variant" class="w-full px-4 py-2 border rounded-lg">
        <option value="">Sélectionnez la durée</option>
        <option value="1h">Massage de 1h - 70,00 €</option>
        <option value="1h30">Massage de 1h30 - 100,00 €</option>
    </select>
</div>
```

**Problème** : Ce menu est actuellement **codé en dur** pour le "Massage Prénatal" uniquement.

### 2. L'objet `serviceConfig` (ligne 2158)

Contrôle l'affichage et le comportement de la modale :

```javascript
const serviceConfig = {
    'Massage Prénatal': { 
        name: 'Massage Prénatal',
        hasVariants: true,  // ← Active le menu déroulant
        variants: {
            '1h': {
                name: 'Massage de 1h',
                price: '70,00 €',
                buyButtonId: 'buy_btn_1RqWcuCm8TYzw7cAa5NUeoqR'
            },
            '1h30': {
                name: 'Massage de 1h30',
                price: '100,00 €',
                buyButtonId: 'buy_btn_1RqYLNCm8TYzw7cAdzTmdW7i'
            }
        }
    },
    'Soin Rebozo': {
        name: 'Soin Rebozo',
        price: '80,00 €',
        buyButtonId: 'buy_btn_1RqWa1Cm8TYzw7cAEeTFSYgH'
        // Pas de hasVariants ni de variants
    }
}
```

### 3. L'objet `serviceToPriceId` (ligne 2658)

Mappe les services vers les Price IDs Stripe pour le paiement :

```javascript
const serviceToPriceId = {
    'Massage Prénatal': {
        default: 'price_1SIyT1Cm8TYzw7cAo9urSwWp',
        variants: {
            '1h': 'price_1SIyPgCm8TYzw7cAgJTspWxo',
            '1h30': 'price_1SIyT1Cm8TYzw7cAo9urSwWp'
        }
    },
    'Soin Rebozo': 'price_1SIyVlCm8TYzw7cAPEPWMeLr'
}
```

### 4. La fonction `openBookingModal()` (ligne 2154)

Génère dynamiquement le contenu de la modale en fonction du service sélectionné.

**Problème actuel** : Elle ne génère pas dynamiquement le contenu du `<select>` des variantes.

---

## 🎨 Solution proposée : Système de "Related Offers"

### Concept

Au lieu d'utiliser le système actuel de "variants" (qui est limité à une seule option de durée), nous allons créer un nouveau concept : **`relatedOffers`** (offres associées).

### Mapping des offres combinées aux services individuels

| Service de base | Offres combinées à afficher |
|----------------|----------------------------|
| **Massage Prénatal** | • Massage seul (70€ ou 110€)<br>• **+ Massage post partum (150€)**<br>• **+ Bain enveloppé (135€)** |
| **Massage Postnatal** | • Massage seul (75€)<br>• **+ Massage femme enceinte (150€)**<br>• **+ Bain enveloppé (140€)**<br>• **+ Soin Rebozo (160€)** |
| **Bain Enveloppé** | • Bain seul (70€)<br>• **+ Massage femme enceinte/post partum (135€)**<br>• **+ Soin Rebozo (150€)** |
| **Soin Rebozo** | • Soin seul (90€)<br>• **+ Bain enveloppé (155€)**<br>• **+ Massage post partum (160€)** |

---

## ✅ Plan d'implémentation (étape par étape)

### Étape 1 : Modifier `serviceConfig`

Ajouter un nouveau champ `relatedOffers` pour chaque service concerné :

```javascript
'Soin Rebozo': { 
    name: 'Soin Rebozo', 
    article: 'un',
    giftText: 'Offrir un bon cadeau Soin Rebozo',
    bookText: 'Réserver un Soin Rebozo',
    price: '90,00 €',
    buyButtonId: 'buy_btn_1SJtNJCm8TYzw7cApeGQMlvs',
    
    // ✨ NOUVEAU : Offres combinées
    hasRelatedOffers: true,
    relatedOffers: [
        {
            key: 'solo',
            name: 'Soin Rebozo seul',
            price: '90,00 €',
            priceId: 'price_1SIyVlCm8TYzw7cAPEPWMeLr',
            buyButtonId: 'buy_btn_1SJtNJCm8TYzw7cApeGQMlvs'
        },
        {
            key: 'rebozo_bain',
            name: 'Soin Rebozo + Bain enveloppé',
            price: '155,00 €',
            priceId: 'price_1SIyWNCm8TYzw7cAFlJgRQpZ',
            buyButtonId: 'buy_btn_1SJtK5Cm8TYzw7cAx8WYvhKq',
            isChristmasOffer: true
        },
        {
            key: 'rebozo_massage',
            name: 'Soin Rebozo + Massage post partum',
            price: '160,00 €',
            priceId: 'price_1SIyXlCm8TYzw7cAzFfc2qyB',
            buyButtonId: 'buy_btn_1SJtHpCm8TYzw7cAcOxQmRrL',
            isChristmasOffer: true
        }
    ]
}
```

### Étape 2 : Synchroniser `serviceToPriceId`

Mettre à jour pour gérer les `relatedOffers` :

```javascript
'Soin Rebozo': {
    default: 'price_1SIyVlCm8TYzw7cAPEPWMeLr',
    relatedOffers: {
        'solo': 'price_1SIyVlCm8TYzw7cAPEPWMeLr',
        'rebozo_bain': 'price_1SIyWNCm8TYzw7cAFlJgRQpZ',
        'rebozo_massage': 'price_1SIyXlCm8TYzw7cAzFfc2qyB'
    }
}
```

### Étape 3 : Modifier le HTML de la modale

Rendre le `<select>` plus générique :

```html
<div class="mb-4" id="variantSection" style="display: none;">
    <label class="block text-gray-700 mb-2" for="variantSelect">
        <span id="variantLabel">Choisissez une option</span> 
        <span class="text-red-500">*</span>
    </label>
    <select id="variantSelect" name="service_variant" class="w-full px-4 py-2 border rounded-lg">
        <option value="">Sélectionnez une option</option>
        <!-- Les options seront générées dynamiquement par JavaScript -->
    </select>
</div>
```

### Étape 4 : Adapter `openBookingModal()`

Générer dynamiquement les options du menu déroulant :

```javascript
function openBookingModal(serviceName) {
    const service = serviceConfig[serviceName];
    if (!service) return;
    
    // ... code existant ...
    
    const variantSection = document.getElementById('variantSection');
    const variantSelect = document.getElementById('variantSelect');
    const variantLabel = document.getElementById('variantLabel');
    
    if (service.hasRelatedOffers) {
        // Générer les options dynamiquement
        variantSelect.innerHTML = '<option value="">Sélectionnez une option</option>';
        
        service.relatedOffers.forEach(offer => {
            const option = document.createElement('option');
            option.value = offer.key;
            option.textContent = `${offer.name} - ${offer.price}`;
            if (offer.isChristmasOffer) {
                option.textContent += ' 🎄';
            }
            variantSelect.appendChild(option);
        });
        
        variantLabel.textContent = 'Choisissez votre formule';
        variantSection.style.display = 'none'; // Affiché selon l'action
    } else if (service.hasVariants) {
        // Ancien système pour Massage Prénatal
        // ... code existant ...
    }
}
```

### Étape 5 : Modifier le listener `variantSelect.addEventListener('change')`

Gérer à la fois les variants (durée) et les relatedOffers (offres combinées) :

```javascript
variantSelect.addEventListener('change', function() {
    const selectedKey = this.value;
    const serviceName = document.getElementById('selectedService').value;
    const service = serviceConfig[serviceName];
    
    if (service.hasRelatedOffers) {
        // Nouveau système : offres combinées
        const selectedOffer = service.relatedOffers.find(o => o.key === selectedKey);
        if (selectedOffer) {
            document.getElementById('servicePrice').textContent = selectedOffer.price;
            // Mettre à jour le bouton de paiement
            updatePaymentButton(selectedOffer);
        }
    } else if (service.hasVariants) {
        // Ancien système : variantes de durée
        // ... code existant ...
    }
});
```

### Étape 6 : Adapter `handlePayment()`

Gérer les clés des `relatedOffers` :

```javascript
function handlePayment(actionTypeValue) {
    const serviceName = document.getElementById('selectedService').value;
    const variant = document.getElementById('variantSelect')?.value;
    const service = serviceConfig[serviceName];
    
    let priceId;
    
    if (service.hasRelatedOffers && variant) {
        // Nouveau système : chercher dans relatedOffers
        const serviceMapping = serviceToPriceId[serviceName];
        priceId = serviceMapping.relatedOffers[variant] || serviceMapping.default;
    } else if (service.hasVariants && variant) {
        // Ancien système : variants
        const serviceMapping = serviceToPriceId[serviceName];
        priceId = serviceMapping.variants[variant] || serviceMapping.default;
    } else {
        // Service simple sans variantes
        priceId = serviceToPriceId[serviceName];
    }
    
    // ... reste du code de paiement ...
}
```

---

## 🎯 Services à modifier

### Services nécessitant des offres combinées

1. ✅ **Massage Prénatal** (garde ses variants de durée + nouvelles offres combinées)
2. ✅ **Massage Postnatal**
3. ✅ **Bain Enveloppé**
4. ✅ **Soin Rebozo**

### Services inchangés

- Atelier Massage Bébé
- Réflexologie Plantaire Obstétrique
- Réflexologie plantaire Pédiatrique
- Massage bébé & enfant
- Agenda: Ma première année de maman
- Atelier Motricité & Éveil sensoriel

---

## ⚠️ Points critiques à vérifier

### 1. Synchronisation des données
- ✅ `serviceConfig` et `serviceToPriceId` doivent être parfaitement synchronisés
- ✅ Tous les Price IDs doivent correspondre au CSV

### 2. Gestion des cas spéciaux
- **Massage Prénatal** : Aura à la fois `hasVariants` (durée) ET `hasRelatedOffers` (offres combinées)
  - Solution : Priorité à `hasRelatedOffers`, intégrer les durées comme des offres

### 3. Tests à effectuer
- [ ] Ouverture de chaque modale
- [ ] Sélection de chaque offre combinée
- [ ] Mise à jour du prix affiché
- [ ] Paiement Stripe fonctionnel
- [ ] Envoi du formulaire Formspree avec les bonnes données

---

## 📝 Conclusion

Cette approche permet de :
1. ✅ Réutiliser le système existant de variantes
2. ✅ Ajouter les offres combinées de façon élégante
3. ✅ Maintenir la compatibilité avec le code existant
4. ✅ Faciliter l'ajout de futures offres

**Prêt à implémenter ?** 🚀
