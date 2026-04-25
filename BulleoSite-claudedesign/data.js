// Bulleo data — services, testimonials, FAQ, gallery
// Sourced from srv branch (avril 2026) — tarifs et combinés Stripe

window.BulleoData = {
  services: [
    // ---- GROSSESSE ----
    { id: 'massage-prenatal', name: 'Massage Prénatal', tag: 'Grossesse', tagClass: 'tag-grossesse', cat: 'grossesse',
      duration: '1h ou 1h30 · dès 16 SA', price: 75, priceLabel: 'Dès 75€',
      img: 'assets/images/services/massage-prenatal.webp',
      desc: 'Position latérale sécurisée, huiles 100% bio. Soulage le dos, la sciatique et la lourdeur des jambes.',
      formulas: [
        { key: '1h', label: '1 heure', price: 75 },
        { key: '1h30', label: '1h30', price: 110 },
        { key: 'prenatal_bain', label: '+ Bain enveloppé', price: 140, badge: 'Combiné' },
        { key: 'prenatal_drainage', label: 'Rituel Douceur Bulleo (+ Drainage)', price: 115, badge: 'Signature' }
      ] },

    { id: 'reflexologie', name: 'Réflexologie Plantaire', tag: 'Grossesse', tagClass: 'tag-grossesse', cat: 'grossesse',
      duration: '45 min · obstétrique', price: 50, priceLabel: '50€',
      img: 'assets/images/services/reflexologie.webp',
      desc: 'Approche thérapeutique pour nausées, sommeil, dos. Adaptée à tous les trimestres.' },

    // ---- POST-PARTUM ----
    { id: 'massage-postnatal', name: 'Massage Postnatal', tag: 'Post-Partum', tagClass: 'tag-postpartum', cat: 'postpartum',
      duration: '1h ou 1h30 · à votre rythme', price: 75, priceLabel: 'Dès 75€',
      img: 'assets/images/services/massage-postnatal.webp',
      desc: "Drainage doux, soulage le dos sollicité par allaitement et portage. Une parenthèse pour soi.",
      formulas: [
        { key: '1h', label: '1 heure', price: 75 },
        { key: '1h30', label: '1h30', price: 110 },
        { key: 'postnatal_bain', label: '+ Bain enveloppé', price: 140, badge: 'Combiné' },
        { key: 'postnatal_rebozo', label: '+ Soin Rebozo (Soin complet)', price: 160, badge: 'Signature' },
        { key: 'postnatal_drainage', label: 'Rituel Douceur Bulleo (+ Drainage)', price: 115, badge: 'Combiné' }
      ] },

    { id: 'rebozo', name: 'Soin Rebozo', tag: 'Post-Partum', tagClass: 'tag-rituel', cat: 'postpartum',
      duration: '1h · post-accouchement', price: 90, priceLabel: 'Dès 90€',
      img: 'assets/images/services/soin-rebozo-alt.webp',
      desc: 'Rituel ancestral mexicain de fermeture du corps. Bercement, serrage du bassin, libération émotionnelle.',
      formulas: [
        { key: 'solo', label: 'Soin seul', price: 90 },
        { key: 'rebozo_bain', label: '+ Bain enveloppé', price: 155, badge: 'Combiné' },
        { key: 'rebozo_massage', label: '+ Massage postnatal (Soin complet)', price: 160, badge: 'Signature' }
      ] },

    { id: 'soin-complet', name: 'Soin Postnatal Complet', tag: 'Post-Partum', tagClass: 'tag-postpartum', cat: 'postpartum',
      duration: '2h · massage + Rebozo', price: 160, priceLabel: '160€',
      img: 'assets/images/services/soin-postnatal-complet.webp',
      desc: 'Le rituel complet : un massage postnatal suivi du soin Rebozo. Notre signature.' },

    // ---- DRAINAGE — NOUVEAU ----
    { id: 'drainage', name: 'Drainage Lymphatique Balinais', tag: 'Nouveau', tagClass: 'tag-nouveau', cat: 'soin', isNew: true,
      duration: '30 min · 45 min · 1h', price: 50, priceLabel: 'Dès 50€',
      img: 'assets/images/services/drainage-lymphatique.jpg',
      desc: 'Technique manuelle douce héritée de Bali. Stimule la circulation lymphatique, allège les jambes lourdes, détoxifie en profondeur.',
      formulas: [
        { key: '30min', label: '30 min · 1 zone', price: 50 },
        { key: '45min', label: '45 min · 2 zones', price: 65 },
        { key: '1h', label: '1h · corps entier', price: 80 },
        { key: 'drainage_massage', label: 'Rituel Douceur Bulleo (+ Massage 1h30)', price: 115, badge: 'Signature' }
      ] },

    { id: 'cure-drainage', name: 'Cure Drainage · 6 séances', tag: 'Cure', tagClass: 'tag-cure', cat: 'soin',
      duration: '5+1 offerte · au choix', price: 250, priceLabel: 'Dès 250€',
      img: 'assets/images/services/drainage-lymphatique-2.jpg',
      desc: 'Engagement minceur et bien-être : 6 séances dont la 6ᵉ offerte. Réservation séance par séance après achat de la cure.',
      formulas: [
        { key: 'cure_30min', label: '6 × 30 min', price: 250 },
        { key: 'cure_45min', label: '6 × 45 min', price: 325 },
        { key: 'cure_1h', label: '6 × 1h', price: 400 }
      ] },

    // ---- BÉBÉ ----
    { id: 'bain-enveloppe', name: 'Bain Enveloppé', tag: 'Bébé', tagClass: 'tag-bebe', cat: 'bebe',
      duration: '45 min - 1h · 0-21 jours', price: 70, priceLabel: 'Dès 70€',
      img: 'assets/images/services/bain-enveloppe-alt.webp',
      desc: 'Sensations in-utero retrouvées. Apaise les coliques, le sommeil agité et les pleurs intenses.',
      formulas: [
        { key: 'solo', label: 'Bain solo', price: 70 },
        { key: 'jumeaux', label: 'Bain jumeaux', price: 120 },
        { key: 'bain_prenatal', label: '+ Massage prénatal', price: 140, badge: 'Combiné' },
        { key: 'bain_postnatal', label: '+ Massage postnatal', price: 140, badge: 'Combiné' },
        { key: 'bain_rebozo', label: '+ Soin Rebozo', price: 155, badge: 'Combiné' }
      ] },

    { id: 'atelier-bebe', name: 'Atelier Massage Bébé', tag: 'Bébé', tagClass: 'tag-bebe', cat: 'bebe',
      duration: '1h · dès 1 mois', price: 80, priceLabel: '80€',
      img: 'assets/images/services/atelier-massage-bebe.webp',
      desc: "Apprenez à masser votre bébé. Coliques, sommeil, lien d'attachement." },

    { id: 'massage-bebe', name: 'Massage Bébé & Enfant', tag: 'Bébé', tagClass: 'tag-bebe', cat: 'bebe',
      duration: '45 min · individuel', price: 55, priceLabel: '55€',
      img: 'assets/images/services/bain-enveloppe.webp',
      desc: "Massage individuel adapté à l'âge pour le bien-être quotidien." },

    { id: 'reflexo-pedia', name: 'Réflexologie Pédiatrique', tag: 'Bébé', tagClass: 'tag-bebe', cat: 'bebe',
      duration: '30 min · nourrissons', price: 50, priceLabel: '50€',
      img: 'assets/images/services/reflexologie.webp',
      desc: 'Réflexologie adaptée aux nourrissons et jeunes enfants pour apaiser les petits maux.' },

    { id: 'atelier-motricite', name: 'Atelier Motricité & Éveil', tag: 'Bébé', tagClass: 'tag-bebe', cat: 'bebe', isNew: true,
      duration: '1h · éveil sensoriel', price: 16, priceLabel: '16€',
      img: 'assets/images/services/atelier-motricite.webp',
      desc: "Atelier de motricité libre et d'éveil sensoriel. Place de l'enfant, accompagné d'un parent." },

    // ---- BOUTIQUE ----
    { id: 'agenda', name: 'Agenda · Ma première année', tag: 'Boutique', tagClass: 'tag-boutique', cat: 'boutique',
      duration: 'Livraison incluse', price: 31.80, priceLabel: '31,80€',
      img: 'assets/images/services/agenda-maman.webp',
      desc: "Agenda souvenir « Ma première année de maman » — un beau livre pour ne rien oublier des premiers mois." }
  ],

  testimonials: [
    { name: 'Camille L.', meta: 'Maman de Léa · Tarbes', stars: 5, initials: 'CL',
      quote: "Le bain enveloppé a été un moment magique. Voir mon bébé si paisible, comme s'il retrouvait son cocon… J'en garde un souvenir inoubliable." },
    { name: 'Sarah M.', meta: 'Massage prénatal · 32 SA', stars: 5, initials: 'SM',
      quote: "Estelle a une douceur et une écoute rares. Mon dos me faisait vraiment souffrir, je suis ressortie comme neuve." },
    { name: 'Élise R.', meta: 'Soin Rebozo · post-partum', stars: 5, initials: 'ER',
      quote: "Le rebozo m'a permis de fermer un chapitre intense de ma vie. C'est un soin qui va bien au-delà du physique." }
  ],

  faqs: [
    { q: "À partir de quand un massage prénatal est-il possible ?",
      a: "Le massage prénatal peut être pratiqué dès 16 semaines d'aménorrhée (SA) et jusqu'à 41 SA, en position latérale sécurisée. Les techniques sont adaptées à chaque trimestre pour le confort de la maman et la sécurité du bébé." },
    { q: "Comment se déroule un bain enveloppé ?",
      a: "Dans une eau à 38°C, votre nouveau-né est délicatement emmailloté dans un lange et accompagné dans une posture fœtale. La séance dure 45 min à 1h, idéalement pendant les 21 premiers jours de vie." },
    { q: "Qu'est-ce que le drainage lymphatique balinais ?",
      a: "Une technique manuelle douce et rythmée, héritée des médecines traditionnelles balinaises. Elle stimule la circulation lymphatique pour réduire les gonflements, alléger les jambes lourdes et favoriser la détoxification. Disponible en séance unique ou en cure de 6 séances (la 6ᵉ offerte)." },
    { q: "Qu'est-ce que le Rituel Douceur Bulleo ?",
      a: "Notre signature : 1h30 combinant un massage (prénatal ou postnatal) et une séance de drainage lymphatique balinais. Un soin enveloppant complet à 115 € au lieu de 140 € pris séparément." },
    { q: "Qu'est-ce que le soin Rebozo ?",
      a: "Un rituel ancestral mexicain de « fermeture » du corps après l'accouchement. À l'aide de longs tissus, le corps est bercé puis serré au niveau du bassin, des hanches et des épaules — une libération à la fois physique et émotionnelle." },
    { q: "Comment fonctionne un bon cadeau ?",
      a: "Le paiement se fait en ligne de manière sécurisée via Stripe. Le bon cadeau personnalisé est envoyé par email instantanément. Validité : 6 mois." },
    { q: "Vous déplacez-vous ?",
      a: "Oui, dans un rayon de 30 km autour de Tarbes : Lourdes, Pau, Bagnères-de-Bigorre, Lannemezan et alentours. Contactez-nous pour vérifier la disponibilité." }
  ],

  gallery: [
    { src: 'assets/images/gallery/massage-ventre-prenatal.webp', alt: 'Massage prénatal du ventre' },
    { src: 'assets/images/gallery/bebe-bain-sourire.webp', alt: 'Bébé qui sourit dans son bain' },
    { src: 'assets/images/gallery/rebozo-rouge.webp', alt: 'Tissu rebozo rouge traditionnel' },
    { src: 'assets/images/gallery/espace-detente.webp', alt: 'Espace détente Bulleo' },
    { src: 'assets/images/gallery/atelier-poupees.webp', alt: 'Atelier avec poupées de démonstration' },
    { src: 'assets/images/gallery/rebozo-tissu.webp', alt: 'Détail tissu Rebozo' },
    { src: 'assets/images/gallery/femme-enceinte-agenda.webp', alt: 'Femme enceinte avec agenda' },
    { src: 'assets/images/portraits/estelle-rebozo.webp', alt: 'Estelle pratiquant un soin Rebozo' }
  ],

  tickerPhrases: [
    'Massage Prénatal', 'Drainage Lymphatique Balinais', 'Bain Enveloppé', 'Soin Rebozo',
    'Rituel Douceur Bulleo', 'Auxiliaire de Puériculture D.E.', 'Tarbes — 65', 'Atelier Motricité'
  ]
};
