# Analyse de la Codebase & Nouvelle Architecture (Maison Bulleo)

Ce rapport analyse l'architecture du nouveau prototype (`index_v2.html`) par rapport au site legacy (`index.html`) et aux bonnes pratiques web.

## 1. Comparatif Architecture

| Critère | Ancien Site (`index.html`) | Nouveau Site (`index_v2.html`) | Verdict |
| :--- | :--- | :--- | :--- |
| **Identité** | "Bulleo Soins" (Bleu/Doré) | "Maison Bulleo" (Terracotta/Sauge) | ✅ **Nouveau** (Plus expert & chaleureux) |
| **Navigation** | Classique (Menu complet) | Entonnoir "3 Portes" (Enceinte/Bébé/Cadeau) | ✅ **Nouveau** (Meilleure conversion) |
| **Technologie CSS** | CSS Custom (`styles.css`) + Tailwind CDN | Tailwind CDN (Config JS injéctée) | ⚠️ **Point Faible** (Lourd en performance) |
| **Images** | WebP (local) + URLs externes | WebP (local) + URLs externes | ⚠️ **À optimiser** (CLS & lazy-loading) |
| **Données** | JSON-LD basique | JSON-LD optimisé (LocalBusiness) | ✅ **Nouveau** (Meilleur SEO Local) |
| **Paiement** | Stripe `redirectToCheckout` (vieux code) | Stripe `redirectToCheckout` (unifié) | ✅ **Nouveau** (Code plus propre) |

## 2. Failles & Points d'Amélioration (SEO & IA)

Bien que l'UX soit nettement meilleure, l'architecture technique de `index_v2.html` présente des faiblesses qui peuvent pénaliser son classement Google :

### 🔴 Critique : Performance (Core Web Vitals)
Le site utilise le **CDN Tailwind** (`<script src="https://cdn.tailwindcss.com"></script>`).
*   **Impact :** Le navigateur doit télécharger et exécuter ce gros script *avant* de pouvoir afficher correctement la page. Cela ralentit le **FCP** (First Contentful Paint).
*   **Solution Recommandée :** Compiler le CSS. Si impossible (site statique sans build), utiliser un fichier CSS minifié contenant uniquement les classes utilisées.

### 🟠 Important : Stabilité Visuelle (CLS)
Les balises `<img>` manquent souvent d'attributs `width` et `height` explicites.
*   **Impact :** Le texte "saute" pendant le chargement des images. Google pénalise cela.
*   **Solution :** Ajouter `width="800" height="600"` (ou ratio) sur toutes les images.

### 🟡 Moyen : Structure Sémantique
*   La hiérarchie des titres (H1, H2, H3) doit être irréprochable pour que les IA (comme Google SGE ou ChatGPT Search) comprennent la structure de l'offre.
*   **H1 actuel :** "L'expertise périnatale, la douceur en plus..." (Bon).
*   **H2 :** "Quel est votre besoin aujourd'hui ?", "En Attendant Bébé". (Bon, orienté utilisateur).

## 3. Prompt pour Claude Code (Optimisation Finale)

Ce prompt est conçu pour transformer le prototype `index_v2.html` en un fichier de production ultra-performant.

```markdown
Tu es un Expert Web Performance & SEO.
Je te fournis le fichier `index_v2.html` qui est le nouveau site "Maison Bulleo".
Il fonctionne bien visuellement (Tailwind CDN) mais doit être optimisé pour la production.

TA MISSION : Optimiser le code pour le SEO Technique et la Vitesse (Core Web Vitals).

1. OPTIMISATION IMAGES & CLS
- Analyse toutes les balises `<img>`.
- Ajoute systématiquement `loading="lazy"` sur toutes les images SAUF celle du Hero (LCP).
- Ajoute les attributs `width` et `height` explicites (en respectant le ratio de l'image) pour éviter le Layout Shift.
- Assure-toi que les attributs `alt` sont descriptifs et contiennent des mots-clés locaux (ex: "Massage femme enceinte Tarbes").

2. ACCESSIBILITÉ (A11Y)
- Vérifie que tous les boutons (surtout les icônes et le menu mobile) ont un `aria-label`.
- Vérifie la structure des titres (H1-H6) pour qu'elle soit logique.

3. NETTOYAGE & PERFORMANCE
- Regroupe tout le JavaScript personnalisé (les fonctions `openBookingModal`, `handlePayment`, etc.) dans un bloc `<script>` unique juste avant la fermeture `</body>`, pour ne pas bloquer le rendu.
- Minifie (si possible) le CSS personnalisé dans `<style>`.

CONTRAINTES :
- NE TOUCHE PAS à la logique `serviceConfig` / `serviceToPriceId`.
- NE TOUCHE PAS aux clés Stripe.
- GARDE le CDN Tailwind (nous n'avons pas de step de build), mais assure-toi que le script est chargé de manière optimale.

LIVRABLE : Le code complet du fichier `index.html` optimisé.
```