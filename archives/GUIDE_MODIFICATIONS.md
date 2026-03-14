# 🔧 Guide de modifications restantes - Index.html

Ce document contient les **3 modifications restantes** à effectuer dans `index.html`.
Chaque modification est détaillée avec le code AVANT et APRÈS.

---

## ✅ Modifications déjà appliquées

1. ✅ `serviceConfig` - Ajout des `relatedOffers` pour 4 services
2. ✅ `serviceToPriceId` - Synchronisation avec les nouveaux Price IDs

---

## 🔄 Modification #1 : Fonction `openBookingModal()` - Génération dynamique des menus

### 📍 Localisation
- **Ligne approximative** : ~2355-2390
- **Fonction** : `openBookingModal(serviceName)`
- **Section** : Gestion de l'affichage du menu des variantes

### 🔍 Code ACTUEL à chercher

```javascript
            // Gérer l'affichage du menu des variantes
            const variantSection = document.getElementById('variantSection');
            if (service.hasVariants) {
                // Service avec variantes - afficher le prix par défaut de la première variante
                const defaultVariant = Object.values(service.variants)[0];
                document.getElementById('servicePrice').textContent = defaultVariant.price;
                variantSection.style.display = 'none'; // Masqué par défaut, affiché selon l'action
            } else {
                // Service simple - prix fixe
                document.getElementById('servicePrice').textContent = service.price;
                variantSection.style.display = 'none';
            }
```

### ✨ Code NOUVEAU à mettre

```javascript
            // Gérer l'affichage du menu des variantes ou des offres combinées
            const variantSection = document.getElementById('variantSection');
            const variantSelect = document.getElementById('variantSelect');
            const variantLabel = document.getElementById('variantLabel');
            
            if (service.hasRelatedOffers) {
                // Nouveau système : offres combinées
                // Vider et reconstruire les options
                variantSelect.innerHTML = '<option value="">Sélectionnez une option</option>';
                
                service.relatedOffers.forEach(offer => {
                    const option = document.createElement('option');
                    option.value = offer.key;
                    option.textContent = `${offer.name} - ${offer.price}`;
                    variantSelect.appendChild(option);
                });
                
                // Mettre à jour le label
                variantLabel.textContent = 'Choisissez votre formule';
                
                // Afficher le prix de la première offre par défaut
                document.getElementById('servicePrice').textContent = service.relatedOffers[0].price;
                variantSection.style.display = 'none'; // Masqué par défaut, affiché selon l'action
            } else if (service.hasVariants) {
                // Ancien système : variantes de durée (pour compatibilité)
                variantSelect.innerHTML = '<option value="">Sélectionnez la durée</option>';
                
                Object.entries(service.variants).forEach(([key, variant]) => {
                    const option = document.createElement('option');
                    option.value = key;
                    option.textContent = `${variant.name} - ${variant.price}`;
                    variantSelect.appendChild(option);
                });
                
                variantLabel.textContent = 'Choisissez la durée';
                
                // Afficher le prix de la première variante par défaut
                const defaultVariant = Object.values(service.variants)[0];
                document.getElementById('servicePrice').textContent = defaultVariant.price;
                variantSection.style.display = 'none'; // Masqué par défaut, affiché selon l'action
            } else {
                // Service simple - prix fixe
                document.getElementById('servicePrice').textContent = service.price;
                variantSection.style.display = 'none';
            }
```

### 📝 Explication
- **Détection** : Vérifie si `hasRelatedOffers` existe (nouveau système)
- **Génération dynamique** : Crée les `<option>` à partir des données `relatedOffers`
- **Compatibilité** : Garde la gestion de `hasVariants` pour l'ancien système
- **Label dynamique** : Change le texte selon le contexte

---

## 🔄 Modification #2 : HTML de la modal - Ajout du label dynamique

### 📍 Localisation
- **Ligne approximative** : ~1942-1950
- **Section** : HTML de la section des variantes dans la modal de réservation

### 🔍 Code ACTUEL à chercher

```html
                    <!-- Menu déroulant pour les variantes (Massage Prénatal uniquement) -->
                    <div class="mb-4" id="variantSection" style="display: none;">
                        <label class="block text-gray-700 mb-2" for="variantSelect">Choisissez la durée <span class="text-red-500">*</span></label>
                        <select id="variantSelect" name="service_variant" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400">
                            <option value="">Sélectionnez la durée</option>
                            <option value="1h">Massage de 1h - 70,00 €</option>
                            <option value="1h30">Massage de 1h30 - 100,00 €</option>
                        </select>
                    </div>
```

### ✨ Code NOUVEAU à mettre

```html
                    <!-- Menu déroulant pour les variantes ou offres combinées -->
                    <div class="mb-4" id="variantSection" style="display: none;">
                        <label class="block text-gray-700 mb-2" for="variantSelect">
                            <span id="variantLabel">Choisissez une option</span> 
                            <span class="text-red-500">*</span>
                        </label>
                        <select id="variantSelect" name="service_variant" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400">
                            <option value="">Sélectionnez une option</option>
                            <!-- Les options seront générées dynamiquement par JavaScript -->
                        </select>
                    </div>
```

### 📝 Explication
- **`<span id="variantLabel">`** : Permet de changer le texte dynamiquement
- **Options supprimées** : Elles seront créées par JavaScript dans `openBookingModal()`
- **Texte générique** : "Choisissez une option" par défaut

---

## 🔄 Modification #3 : Listener `variantSelect` - Gestion des offres combinées

### 📍 Localisation
- **Ligne approximative** : ~2514-2550
- **Section** : Gestion du changement de variante pour Massage Prénatal

### 🔍 Code ACTUEL à chercher

```javascript
            // Gestion du changement de variante pour Massage Prénatal - VERSION SIMPLE
            if (variantSelect) {
                variantSelect.addEventListener('change', function() {
                    const selectedVariant = this.value;
                    const serviceName = document.getElementById('selectedService').value;
                    
                    if (serviceName === 'Massage Prénatal' && selectedVariant) {
                        let price, stripePriceId;
                        
                        if (selectedVariant === '1h') {
                            price = '70,00 €';
                            stripePriceId = 'price_temp_prenatal_1h';
                        } else if (selectedVariant === '1h30') {
                            price = '100,00 €';
                            stripePriceId = 'price_temp_prenatal_1h30';
                        }
                        
                        if (price && stripePriceId) {
                            // Mettre à jour le prix affiché
                            document.getElementById('servicePrice').textContent = price;
                            
                            // Mettre à jour le bouton Stripe simple
                            const stripeButtonPlaceholder = document.getElementById('stripeButtonPlaceholder');
                            stripeButtonPlaceholder.innerHTML = `
                                <button type="button" class="btn-primary w-full" onclick="handlePayment('booking')">
                                    💳 Finaliser le paiement (${price})
                                </button>
                            `;
                            
                            // Afficher le conteneur Stripe dès qu'une variante est sélectionnée
                            const stripeButtonContainer = document.getElementById('stripeButtonContainer');
                            const actionType = document.getElementById('actionType').value;
                            
                            if (actionType === 'booking') {
                                stripeButtonContainer.style.display = 'block';
                            }
                        }
                    }
                });
            }
```

### ✨ Code NOUVEAU à mettre

```javascript
            // Gestion du changement de variante ou d'offre combinée
            if (variantSelect) {
                variantSelect.addEventListener('change', function() {
                    const selectedKey = this.value;
                    const serviceName = document.getElementById('selectedService').value;
                    const service = serviceConfig[serviceName];
                    
                    if (!selectedKey || !service) return;
                    
                    let selectedOffer = null;
                    
                    // Chercher dans relatedOffers (nouveau système)
                    if (service.hasRelatedOffers) {
                        selectedOffer = service.relatedOffers.find(offer => offer.key === selectedKey);
                    } 
                    // Chercher dans variants (ancien système - compatibilité)
                    else if (service.hasVariants && service.variants[selectedKey]) {
                        selectedOffer = service.variants[selectedKey];
                    }
                    
                    if (selectedOffer) {
                        // Mettre à jour le prix affiché
                        document.getElementById('servicePrice').textContent = selectedOffer.price;
                        
                        // Mettre à jour le bouton Stripe simple
                        const stripeButtonPlaceholder = document.getElementById('stripeButtonPlaceholder');
                        stripeButtonPlaceholder.innerHTML = `
                            <button type="button" class="btn-primary w-full" onclick="handlePayment('booking')">
                                💳 Finaliser le paiement (${selectedOffer.price})
                            </button>
                        `;
                        
                        // Afficher le conteneur Stripe dès qu'une option est sélectionnée
                        const stripeButtonContainer = document.getElementById('stripeButtonContainer');
                        const actionType = document.getElementById('actionType').value;
                        
                        if (actionType === 'booking' || actionType === 'gift') {
                            stripeButtonContainer.style.display = 'block';
                        }
                    }
                });
            }
```

### 📝 Explication
- **Système unifié** : Gère à la fois `relatedOffers` et `variants`
- **Recherche dynamique** : Trouve l'offre sélectionnée dans la bonne structure
- **Mise à jour du prix** : Change le prix affiché selon la sélection
- **Compatibilité** : Fonctionne avec l'ancien et le nouveau système

---

## ✅ Checklist de vérification avant application

Avant d'appliquer ces modifications, vérifier :

- [ ] Le fichier `index.html` actuel fait bien 4809 lignes
- [ ] Les modifications #1 et #2 (`serviceConfig` et `serviceToPriceId`) sont déjà appliquées
- [ ] Un backup existe : `index_failed_gemini.html`
- [ ] Le CSV est bien compris et les Prix/IDs sont corrects

---

## 🚀 Application des modifications

**Ordre recommandé** :
1. Modification #2 (HTML) - Plus simple, moins de risque
2. Modification #1 (`openBookingModal`) - Génération des menus
3. Modification #3 (listener) - Interactivité

**Commande pour vérifier** :
```powershell
(Get-Content "index.html").Count
```

---

## 🧪 Tests après application

Une fois toutes les modifications appliquées, tester :

1. **Ouvrir chaque modal** :
   - ✅ Massage Prénatal
   - ✅ Massage Postnatal
   - ✅ Bain Enveloppé
   - ✅ Soin Rebozo

2. **Vérifier les menus déroulants** :
   - ✅ Les options s'affichent correctement
   - ✅ Les prix sont corrects
   - ✅ Les émojis 🎄 apparaissent sur les offres de Noël

3. **Tester la sélection** :
   - ✅ Le prix change quand on sélectionne une option
   - ✅ Le bouton de paiement s'affiche
   - ✅ Le texte du bouton contient le bon prix

4. **Console du navigateur** :
   - ✅ Pas d'erreur JavaScript
   - ✅ Les `console.log` affichent les bonnes valeurs

---

**Prêt à appliquer les modifications ?** 🎯

Dites-moi quand je peux procéder !
