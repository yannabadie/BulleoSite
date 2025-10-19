# 📝 Progression des modifications - Index.html

## ✅ Étapes complétées

1. ✅ **Sauvegarde**
   - `index.html` → `index_failed_gemini.html`
   - `index copy.html` → `index.html` (restauration base saine)

2. ✅ **Mise à jour `serviceConfig`** (ligne ~2098)
   - ✅ Massage Prénatal → hasRelatedOffers avec 4 options
   - ✅ Massage Postnatal → hasRelatedOffers avec 5 options
   - ✅ Bain Enveloppé → hasRelatedOffers avec 5 options
   - ✅ Soin Rebozo → hasRelatedOffers avec 4 options
   - ✅ Atelier Massage Bébé → Prix mis à jour (80€)
   - ✅ Massage bébé & enfant → Prix mis à jour (55€)

3. ✅ **Mise à jour `serviceToPriceId`** (ligne ~2722)
   - ✅ Mapping des relatedOffers pour les 4 services concernés
   - ✅ Mise à jour des Price IDs selon le CSV
   - ✅ Gestion de la logique relatedOffers vs variants

## 🔄 Étapes en cours

4. **Modification de `openBookingModal()`** (ligne ~2325)
   - ⏳ Gérer `hasRelatedOffers` (au lieu de seulement `hasVariants`)
   - ⏳ Générer dynamiquement les `<option>` du menu déroulant
   - ⏳ Mettre à jour le label du select ("Choisissez votre formule")

## ⏸️ Étapes restantes

5. **Modification du HTML de la modal** (ligne ~1940)
   - Ajouter un `<span id="variantLabel">` pour le label dynamique
   - S'assurer que le `<select>` est vide au départ (rempli par JS)

6. **Modification du listener `variantSelect.change`** (ligne ~2514)
   - Gérer les relatedOffers en plus des variants
   - Mettre à jour le prix affiché
   - Mettre à jour le bouton de paiement

7. **Vérification finale**
   - Tester l'ouverture de chaque modal
   - Vérifier les menus déroulants
   - Vérifier les prix affichés
   - Tester un paiement (mode test Stripe)

---

**Fichier actuel : 4809 lignes**
**Modifications appliquées : 3/7**
