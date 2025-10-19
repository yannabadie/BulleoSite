
# Analyse du Projet BulleoSite par Gemini

Ce document synthétise ma compréhension du projet BulleoSite, de son architecture et de ses flux de travail. Il servira de référence pour toutes les modifications futures.

## 1. Architecture Générale

- **Type de Projet** : Site web statique, monolithique.
- **Fichiers Clés** : `index.html` (page principale), `noel_2025.html` (page promotionnelle), `success.html` (page de confirmation de paiement).
- **Technologie** : HTML, CSS, JavaScript pur.
- **Dépendances** : Chargées via CDN, aucun système de build (npm, webpack, etc.).
- **Styling** : Tailwind CSS via CDN, complété par une large section de CSS personnalisé dans les balises `<style>`.

## 2. Services Externes et Flux de Données

### Stripe : Gestion des Paiements

Le projet utilise **deux implémentations différentes de Stripe** :

1.  **`noel_2025.html` (Méthode Simple)** :
    -   Utilise le composant web `<stripe-buy-button>`.
    -   La logique est simple : un objet JS `christmasProducts` mappe une clé produit à un `buy-button-id`.
    -   La mise à jour se fait en changeant le `buy-button-id` dans cet objet.

2.  **`index.html` (Méthode Avancée)** :
    -   Utilise un appel direct à l'API Stripe.js via la fonction `stripe.redirectToCheckout()`.
    -   Ce système est plus complexe et repose sur deux objets JavaScript distincts :
        -   `serviceConfig` : Utilisé pour l'affichage (nom des services, variantes, textes).
        -   `serviceToPriceId` : Utilisé pour le paiement. Il mappe un nom de service à un `price_...` ID Stripe.
    -   **Flux** : `openBookingModal` utilise `serviceConfig` pour construire la modale. `handlePayment` utilise la sélection de l'utilisateur pour trouver le bon `price_...` ID dans `serviceToPriceId` et initier le paiement.

### Formspree : Gestion des Formulaires

-   **Objectif** : Envoyer par email les données des formulaires de contact et de réservation sans nécessiter de backend.
-   **Endpoints Multiples** : Chaque formulaire (`contact`, `newsletter`, `booking`) pointe vers une URL Formspree différente.
-   **Orchestration avec Stripe** : Pour les réservations payantes, le flux est le suivant :
    1.  **`index.html`** : Les données du formulaire sont sauvegardées dans le `localStorage` du navigateur.
    2.  **Redirection** : L'utilisateur est envoyé vers Stripe pour le paiement.
    3.  **`success.html`** : Un script sur cette page récupère les données du `localStorage` et les soumet silencieusement à Formspree.
    -   **Raison** : Garantir que l'email de confirmation n'est envoyé **que si le paiement a réussi**.

## 3. Analyse des Échecs Précédents

Mes tentatives de refactorisation sur `index.html` ont échoué car :
1.  J'ai correctement modifié `serviceConfig` pour y inclure les nouvelles offres combinées.
2.  Cependant, je n'ai pas adapté la fonction `handlePayment` et l'objet `serviceToPriceId` pour qu'ils puissent "comprendre" ces nouvelles options et leur associer le bon `price_...` ID.
3.  Cela a créé une désynchronisation entre l'affichage (qui montrait les nouvelles offres) et la logique de paiement (qui ne savait pas comment les tarifer).

## 4. Stratégie Corrigée pour les Modifications Futures

Toute modification des services dans `index.html` doit respecter cette séparation des logiques :

1.  **Modification de l'Affichage** : Mettre à jour l'objet `serviceConfig` pour tout ce qui concerne le nom, les variantes, et les nouvelles offres combinées (`relatedOffers`).
2.  **Modification du Paiement** : Mettre à jour l'objet `serviceToPriceId` pour s'assurer que chaque service, y compris chaque nouvelle offre combinée, a un `price_...` ID correspondant.
3.  **Modification de la Logique** : Adapter les fonctions (`openBookingModal`, `handlePayment`, et les `event listeners`) pour qu'elles gèrent correctement la lecture et la communication entre ces deux objets de configuration.

Cette approche garantit que l'affichage et le paiement restent synchronisés.
