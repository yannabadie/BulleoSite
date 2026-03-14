# Bulleo Soins

Site web de [Bulleo Soins](https://bulleo-soins.com/), cabinet d'accompagnement perinatal a Tarbes (65), France.

## Presentation

Bulleo Soins est le site professionnel d'Estelle, auxiliaire de puericulture, proposant des soins de bien-etre pour les femmes enceintes, jeunes mamans et bebes :

- Massage prenatal et postnatal (1h / 1h30)
- Bain enveloppe pour nouveau-nes
- Soin rebozo (technique mexicaine)
- Reflexologie plantaire (obstetrique et pediatrique)
- Atelier massage bebe
- Atelier motricite et eveil sensoriel
- Soin postnatal complet (massage + rebozo)

## Stack technique

| Composant | Technologie |
|-----------|-------------|
| Frontend | HTML statique, CSS, JavaScript vanilla |
| Styles | [Tailwind CSS](https://tailwindcss.com/) (CDN) + `assets/css/styles.css` |
| JavaScript | `assets/js/main.js` (modals, formulaires, galerie) |
| Paiement | [Stripe](https://stripe.com/) Checkout (cle live) |
| Formulaires | [Formspree](https://formspree.io/) (contact, reservation, cadeau) |
| Analytics | Google Tag Manager (GTM-MZT366F6) |
| Cookies | [TermsFeed](https://www.termsfeed.com/) Cookie Consent 4.2.0 |
| Icones | [Font Awesome](https://fontawesome.com/) 6.4.0 |
| Polices | Google Fonts (Playfair Display + Poppins) |
| Hebergement | LAMP (lamp0/vhosts/bulleo-soins.com) |

**Pas de build system** : aucun framework, aucun bundler, aucun `package.json`. Tout fonctionne via CDN et fichiers statiques.

## Structure du projet

```
bulleo-soins.com/
|-- index.html                  # Page principale (SPA, navigation par ancres)
|-- index_v2.html               # Redesign "Maison Bulleo" en cours
|-- contact.html                # Page contact
|-- galerie.html                # Page galerie
|-- temoignages.html            # Page temoignages
|-- success.html                # Page de confirmation apres paiement Stripe
|-- .htaccess                   # Securite (blocage WP) + headers + cache + GZIP
|-- robots.txt                  # Directives crawlers
|-- sitemap.xml                 # Plan du site pour les moteurs de recherche
|
|-- assets/
|   |-- css/styles.css          # Feuille de styles externe (838 lignes)
|   |-- js/main.js              # JavaScript principal (1900+ lignes)
|   |-- images/
|   |   |-- gallery/            # Photos galerie (WebP, variantes 400w)
|   |   |-- logos/              # Logo principal et mobile
|   |   |-- portraits/          # Photos d'Estelle
|   |   |-- services/           # Visuels des prestations (WebP, variantes 400w)
|   |   |-- misc/               # Carte cadeau, decoration
|   |   +-- og-image.jpg        # Image Open Graph pour le partage social
|   +-- favicon/                # Favicons + PWA manifest
|
|-- services/                   # Pages detaillees par prestation
|   |-- massage-prenatal.html
|   |-- massage-postnatal.html
|   |-- bain-enveloppe.html
|   |-- soin-rebozo.html
|   |-- reflexologie.html
|   |-- atelier-massage-bebe.html
|   +-- atelier-motricite.html
|
|-- includes/                   # Templates de reference (copier-coller, pas d'include dynamique)
|   |-- base-template.html
|   |-- header.html
|   +-- footer.html
|
|-- archives/                   # Historique des modifications et anciennes versions
+-- _old/                       # Versions precedentes (index_old.html, success_old.html)
```

## Services et tarifs (mars 2026)

| Service | Tarif |
|---------|-------|
| Massage prenatal / postnatal | 75 EUR (1h) / 110 EUR (1h30) |
| Bain enveloppe | 70 EUR |
| Soin rebozo | 90 EUR |
| Reflexologie plantaire | 50 EUR |
| Atelier massage bebe | 80 EUR |
| Massage bebe & enfant | 55 EUR |
| Soin postnatal complet | 160 EUR |
| Atelier motricite & eveil sensoriel | 16 EUR |
| Agenda : Ma premiere annee de maman | 31,80 EUR |

**Offres combinees** : massage + bain (140 EUR), massage + rebozo (160 EUR), bain + rebozo (155 EUR).

## Flux de paiement

1. L'utilisateur selectionne un service et choisit "Offrir" ou "Reserver"
2. Remplit le formulaire (nom, email, telephone, date/heure ou adresse)
3. Les donnees sont sauvegardees dans `localStorage`
4. Redirection vers Stripe Checkout avec le Price ID correspondant
5. Apres paiement, redirection vers `success.html`
6. `success.html` envoie automatiquement les donnees du formulaire via Formspree
7. L'utilisateur recoit un email de confirmation

## Deploiement

Site statique : copier les fichiers dans le repertoire `htdocs` du serveur via FTP/SSH.

```bash
# Chemin serveur
/lamp0/web/vhosts/bulleo-soins.com/htdocs/
```

**Important** : le serveur heberge aussi une installation WordPress desactivee (fichiers `wp-*`). Le `.htaccess` bloque l'acces a ces fichiers. Ne pas supprimer le `.htaccess`.

## Securite

- `.htaccess` bloque `wp-config.php`, `wp-login.php`, `xmlrpc.php`, `wp-admin/`
- Headers de securite (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection)
- GZIP active pour HTML, CSS, JS
- Cache navigateur configure pour les assets statiques
- `robots.txt` interdit l'indexation des fichiers WordPress et pages internes

## SEO

- Schema.org : `HealthAndBeautyBusiness` + `LocalBusiness` avec `AggregateRating`
- Open Graph et Twitter Cards sur les pages principales
- Metadonnees geographiques (Tarbes, 43.2339, 0.0761)
- `sitemap.xml` referençant toutes les pages actives

## Licence

[MIT](LICENSE)
