# Analyse Architecturale & Optimisation - Maison Bulleo

Ce rapport fusionne l'analyse architecturale et l'audit de sécurité/visibilité pour la future version modulaire (`index_v2.html`), destiné à être utilisé comme référence pour l'optimisation finale par une IA spécialisée (Claude Code).

---

## 1. Comparatif Architecture : Legacy vs V2 (PoC)

| Critère | Site Actuel (`index.html`) | Futur Site (`index_v2.html`) | Verdict |
| :--- | :--- | :--- | :--- |
| **Identité** | "Bulleo Soins" (Bleu/Doré) | "Maison Bulleo" (Terracotta/Sauge) | ✅ **Nouveau** (Plus expert & chaleureux) |
| **Navigation** | Classique (Menu complet) | Entonnoir "3 Portes" (Enceinte/Bébé/Cadeau) | ✅ **Nouveau** (Meilleure conversion) |
| **Technologie CSS** | CSS Custom (`styles.css`) + Tailwind CDN | Tailwind CDN (Config JS injéctée) | ⚠️ **Point Faible** (Lourd en performance) |
| **Images** | WebP (local) + URLs externes | WebP (local) + URLs externes | ⚠️ **À optimiser** (CLS & lazy-loading) |
| **Données SEO** | JSON-LD basique | JSON-LD optimisé (LocalBusiness) | ✅ **Nouveau** (Meilleur SEO Local) |
| **Paiement** | Stripe `redirectToCheckout` (vieux code) | Stripe `redirectToCheckout` (unifié) | ✅ **Nouveau** (Code plus propre) |

---

## 2. Analyse des Failles & Risques (Architecture V2)

### A. Sécurité (Codebase & Flux)
L'architecture "statique + API tierces" est robuste, mais le flux "Bon Cadeau" présente une faille logique :
*   **🚨 Validation Paiement (Critique) :** Le système repose sur une redirection client (`success.html`) qui déclenche l'envoi du bon cadeau via Formspree. Un utilisateur malveillant peut théoriquement accéder directement à cette URL sans payer.
    *   *Atténuation actuelle :* Vérification manuelle dans le Dashboard Stripe avant prestation.
*   **Données Personnelles :** Le `localStorage` est utilisé pour passer les données du formulaire à la page de succès. Bien que `success.html` nettoie ces données, une session abandonnée pourrait laisser des traces sur un ordinateur public.
    *   *Recommandation :* Script de nettoyage au chargement de la page d'accueil.

### B. Performance & Core Web Vitals
*   **🔴 Tailwind CDN :** L'utilisation du script CDN (`cdn.tailwindcss.com`) oblige le navigateur à compiler le CSS à la volée (~300KB de JS). Cela retarde l'affichage (FCP).
*   **🟠 CLS (Cumulative Layout Shift) :** Les images manquent d'attributs `width` et `height` explicites. Cela provoque des sauts de contenu pendant le chargement.
*   **Performance Mobile :** Absence de `srcset` pour servir des images plus légères aux mobiles.

### C. Visibilité IA & Sémantique
*   **Schema.org :** Le balisage `HealthAndBeautyBusiness` est présent et correct.
*   **Manque :** Les services individuels (Massages, Ateliers) ne sont pas balisés avec `Schema.org/Service` ou `Schema.org/Product`. Les IA (ChatGPT, Gemini) comprennent moins bien la structure de l'offre et les prix.

---

## 3. Prompt Consolidé pour Claude Code (Optimisation Finale)

Ce prompt est conçu pour transformer le PoC `index_v2.html` en un fichier de production optimisé, sécurisé et visible.

```markdown
Tu es un Expert Senior en Web Performance, Sécurité et SEO Sémantique.
Je te fournis le fichier `index_v2.html` qui est le futur site "Maison Bulleo" (actuellement en PoC).
Il fonctionne bien visuellement (Tailwind CDN) mais doit être "Production Ready".

TA MISSION : Optimiser le code sur 3 axes critiques sans altérer le design ni la logique de paiement.

1. PERFORMANCE & CLS (Core Web Vitals)
- Images : Ajoute `loading="lazy"` sur toutes les images SAUF celle du Hero.
- Dimensions : Ajoute les attributs `width` et `height` explicites sur toutes les balises `<img>` pour figer l'espace (CLS).
- Mobile : Si possible, simule un attribut `srcset` ou assure-toi que le CSS contraint bien l'image.

2. VISIBILITÉ IA & SÉMANTIQUE (Schema.org)
- Enveloppe chaque carte de service dans une sémantique riche.
- Exemple : `<article itemscope itemtype="https://schema.org/Service">`
- Balise le nom du service (`itemprop="name"`), la description (`itemprop="description"`) et le prix (`itemprop="offers"`).
- Cela permettra aux IA de "lire" le catalogue de soins.

3. SÉCURITÉ & NETTOYAGE
- Ajoute un petit script au début du `<body>` qui vide le `localStorage` ('pendingFormData') pour éviter les fuites de données sur ordinateur public.
- Vérifie que tous les boutons interactifs ont un `aria-label` pour l'accessibilité.
- Regroupe tout le JS en fin de body.

CONTRAINTES :
- NE TOUCHE PAS à `serviceConfig` ni `serviceToPriceId`.
- NE TOUCHE PAS aux clés Stripe (`pk_live_...`).
- GARDE le CDN Tailwind (pas de build step disponible).

LIVRABLE : Le code complet du fichier `index_v2.html` optimisé.
```
