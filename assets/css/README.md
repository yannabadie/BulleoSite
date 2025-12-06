# CSS - styles.css

Styles CSS personnalises complementant Tailwind CSS.

## Structure du Fichier

```
styles.css (~600 lignes)
├── VARIABLES CSS (lignes 1-20)
│   └── Couleurs, polices
│
├── BASE (lignes 20-35)
│   └── html, body
│
├── LAYOUT (lignes 35-50)
│   └── .section, .hero
│
├── NAVIGATION (lignes 50-120)
│   ├── #header
│   ├── .nav-link
│   └── .mobile-menu-open
│
├── BUTTONS (lignes 120-200)
│   ├── .btn-primary
│   ├── .btn-secondary
│   └── Variantes hover/focus
│
├── CARDS (lignes 200-280)
│   ├── .service-card
│   ├── .price-card
│   └── .feature-card
│
├── MODALS (lignes 280-400)
│   ├── .modal
│   ├── .modal.active
│   ├── .modal-content
│   └── Scrollbar personnalisee
│
├── FORMS (lignes 400-450)
│   ├── input, select, textarea
│   └── Focus states
│
├── LOADER (lignes 450-520)
│   ├── .loader
│   ├── .loader-logo
│   └── Animation pulse
│
├── GALLERY (lignes 520-560)
│   ├── .gallery-item
│   └── .gallery-thumbnail
│
├── TABS (lignes 560-590)
│   ├── .tab-container
│   ├── .tab
│   └── .tab-content
│
└── ANIMATIONS (lignes 590-620)
    ├── @keyframes fadeIn
    ├── @keyframes slideUp
    └── @keyframes pulse
```

## Variables CSS

```css
:root {
    --primary: #5a4a42;      /* Brun principal */
    --secondary: #c4b6a5;    /* Beige */
    --accent: #facc15;       /* Jaune (yellow-400) */
    --background: #f8f4e9;   /* Fond creme */
    --dark: #1a1a1a;         /* Texte fonce */
}
```

## Classes Principales

### .modal

```css
.modal {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 100;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.modal.active {
    display: flex;
    opacity: 1;
}
```

**Usage :** Ajouter/retirer classe `active` via JavaScript.

### .modal-content

```css
.modal-content {
    background: white;
    border-radius: 20px;
    max-width: 600px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    transform: translateY(20px);
    transition: transform 0.3s ease;
}

.modal.active .modal-content {
    transform: translateY(0);
}
```

### .loader

```css
.loader {
    position: fixed;
    inset: 0;
    background: var(--background);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    transition: opacity 0.5s ease;
}
```

**Masquage :** `hideLoader()` dans main.js met `opacity: 0` puis `display: none`.

### .btn-primary

```css
.btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    background: var(--primary);
    color: white;
    border-radius: 9999px;
    font-weight: 600;
    transition: all 0.3s ease;
}

.btn-primary:hover {
    background: #4a3a32;
    transform: translateY(-2px);
}
```

### .price-card

```css
.price-card {
    background: white;
    border-radius: 1rem;
    padding: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.price-card:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}
```

**Note :** Le hover est ajoute via Tailwind inline sur les pages services.

## Responsive

Le site utilise principalement Tailwind pour le responsive :
- `md:` → 768px+
- `lg:` → 1024px+

Quelques ajustements CSS purs pour les modals et la navigation mobile.

## Compatibilite

### Proprietes avec prefixes necessaires

```css
/* Safari */
-webkit-backdrop-filter: blur(10px);
backdrop-filter: blur(10px);

-webkit-user-select: none;
user-select: none;
```

### Scrollbar personnalisee

```css
/* Firefox */
scrollbar-width: thin;
scrollbar-color: rgba(196, 182, 165, 0.5) transparent;

/* Chrome/Safari */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-thumb { background-color: rgba(196, 182, 165, 0.5); }
```

## Integration avec Tailwind

Le fichier styles.css est charge APRES Tailwind CSS :

```html
<script src="https://cdn.tailwindcss.com"></script>
<link rel="stylesheet" href="assets/css/styles.css">
```

Cela permet de :
1. Utiliser les classes Tailwind dans le HTML
2. Surcharger avec des styles personnalises si necessaire
3. Definir des composants CSS reutilisables
