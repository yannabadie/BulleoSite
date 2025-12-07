# Analyse de la Sécurité & Visibilité (Maison Bulleo V2)

Ce rapport se concentre spécifiquement sur les **failles de sécurité potentielles** et les **optimisations pour l'IA/Navigateurs** de la nouvelle architecture modulaire (`index_v2.html`), indépendamment du design.

---

## 1. Analyse de Sécurité (Codebase & Flux)

L'architecture "statique + API tierces" est par nature assez sécurisée car il n'y a pas de base de données ou de serveur à pirater. Cependant, des risques spécifiques existent.

### 🚨 Faille Critique Identifiée : Validation du Paiement
**Le problème :** Le flux actuel repose sur la redirection client.
1.  Utilisateur paie sur Stripe.
2.  Stripe redirige vers `success.html`.
3.  `success.html` lit les données du `localStorage` (nom, email du bénéficiaire) et envoie un email via Formspree.

**Le Risque :** Un utilisateur malveillant peut :
*   Accéder directement à `success.html` sans payer.
*   Simuler un payload `localStorage` pour déclencher l'envoi d'un bon cadeau valide par Formspree sans avoir versé un centime.
*   Bien que Stripe sécurise la transaction bancaire, **la délivrance du service (le bon cadeau) n'est pas cryptographiquement liée à la preuve de paiement.**

**Correction Recommandée (Complexe) :** Utiliser un webhook Stripe (nécessite un serveur) pour déclencher l'email uniquement sur confirmation serveur.
**Correction Recommandée (Simple/Actuelle) :** Vérifier manuellement dans le Dashboard Stripe chaque commande avant d'honorer le rendez-vous. Ajoutez une mention légale : *"Le bon cadeau n'est valide qu'après validation effective du paiement par nos services."*

### 🟠 Risque Modéré : Données Personnelles (GDPR)
*   Le formulaire stocke temporairement des données de santé (grossesse) dans `localStorage`.
*   **Risque :** Si l'utilisateur est sur un ordinateur public et ne ferme pas sa session, ces données restent accessibles.
*   **Correction :** Ajouter un script qui vide le `localStorage` (`removeItem`) dès que le formulaire est soumis ou après une courte période (ex: 1h). (J'ai noté que `success.html` le fait, mais qu'en est-il si l'utilisateur abandonne avant ?)

### 🟢 Faible : Exposition Clé API
*   La clé publique Stripe (`pk_live_...`) est visible dans le code source.
*   **C'est normal.** Elle est conçue pour être publique. Assurez-vous simplement que votre clé **privée** (`sk_live_...`) n'est JAMAIS dans le code HTML/JS. (Vérification faite : elle n'y est pas).

---

## 2. Visibilité Navigateurs & Moteurs IA

Pour que "Maison Bulleo" soit compris par Google, ChatGPT Search et les assistants vocaux, la sémantique est la clé.

### A. Structure Sémantique (Optimisation IA)
Les LLM (Large Language Models) lisent le HTML pour "comprendre" le contenu.
*   **Actuel :** La structure est bonne (`<header>`, `<nav>`, `<section>`).
*   **Amélioration :** Utiliser des balises plus spécifiques pour les services.
    *   Au lieu de `div class="service-card"`, utiliser `<article class="service-card" itemscope itemtype="https://schema.org/Service">`.
    *   Cela indique explicitement à l'IA : "Ceci est un service vendable", avec un prix et une description.

### B. Métadonnées Sociales (Open Graph)
Quand on partage le site sur WhatsApp ou iMessage, l'aperçu est crucial.
*   **Actuel :** Les balises `og:image` pointent vers `assets/images/logos/logo-main.webp`. C'est un logo sur fond transparent, qui risque d'apparaître noir sur noir ou mal cadré.
*   **Conseil :** Créer une image spécifique `og-image.jpg` (1200x630px) avec une photo chaleureuse + le logo incrusté, et l'utiliser dans les balises `<meta property="og:image">`.

### C. Performance Mobile (Core Web Vitals)
Google indexe désormais en "Mobile First".
*   **Problème :** Le chargement des images `assets/images/...` n'est pas optimisé pour différentes tailles d'écran (`srcset` manquant). Un mobile charge la même image 4K que le desktop.
*   **Action :** Implémenter l'attribut `srcset` sur les images clés pour servir des versions plus légères aux mobiles.

---

## 3. Plan d'Action "Visibilité & Robustesse"

Voici les 3 actions prioritaires à ajouter au prompt de Claude Code (ou à faire) pour blinder cette architecture :

1.  **Sécurisation Données :** Ajouter un nettoyage automatique du `localStorage` sur la page d'accueil au chargement (pour effacer les données d'une session précédente abandonnée).
2.  **Balisage IA :** Envelopper chaque carte de service dans un micro-format `Schema.org/Service` directement dans le HTML.
3.  **Images Responsives :** Générer des attributs `srcset` pour les images lourdes.

```html
<!-- Exemple de correction sémantique pour une carte service -->
<article class="service-card" itemscope itemtype="https://schema.org/Service">
    <meta itemprop="serviceType" content="Massage Prénatal" />
    <div class="relative h-48..." ...>
        <img itemprop="image" src="..." alt="..." loading="lazy" />
    </div>
    <div class="p-6">
        <h3 itemprop="name" class="...">Massage Prénatal</h3>
        <p itemprop="description" class="...">...</p>
        <div itemprop="offers" itemscope itemtype="https://schema.org/Offer">
            <span itemprop="price" content="75.00">75,00 €</span>
            <meta itemprop="priceCurrency" content="EUR" />
        </div>
        ...
    </div>
</article>
```
