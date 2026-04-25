/**
 * Bulleo V2 — Institut Perinatal
 * JavaScript principal — Calendly, modal cadeau, Stripe, UI interactions
 */

// ============================================
// CONFIGURATION DES SERVICES
// ============================================
const serviceConfig = {
    'Massage Prenatal': {
        name: 'Massage Prenatal',
        article: 'un',
        giftText: 'Offrir un bon cadeau Massage Prenatal',
        bookText: 'Reserver un Massage Prenatal',
        hasRelatedOffers: true,
        relatedOffers: [
            {
                key: '1h',
                name: 'Massage Prenatal 1h seul',
                price: '75,00 EUR',
                priceId: 'price_1SIyPgCm8TYzw7cAgJTspWxo',
                buyButtonId: 'buy_btn_1SJteVCm8TYzw7cAtmL056bN'
            },
            {
                key: '1h30',
                name: 'Massage Prenatal 1h30 seul',
                price: '110,00 EUR',
                priceId: 'price_1SIyT1Cm8TYzw7cAo9urSwWp',
                buyButtonId: 'buy_btn_1SJtbSCm8TYzw7cAEDslgN2B'
            },
            {
                key: 'prenatal_bain',
                name: 'Massage Prenatal + Bain enveloppe',
                price: '140,00 EUR',
                priceId: 'price_1SIyNOCm8TYzw7cAxuJCLweM',
                buyButtonId: 'buy_btn_1SJthmCm8TYzw7cAEtki54MD'
            },
            {
                key: 'prenatal_drainage',
                name: 'Rituel Douceur Bulleo (Massage + Drainage Lymphatique 1h30)',
                price: '115,00 EUR',
                priceId: 'price_1TQ0oNCm8TYzw7cAtExvvnpm',
                buyButtonId: ''
            }
        ]
    },
    'Massage Postnatal': {
        name: 'Massage Postnatal',
        article: 'un',
        giftText: 'Offrir un bon cadeau Massage Postnatal',
        bookText: 'Reserver un Massage Postnatal',
        hasRelatedOffers: true,
        relatedOffers: [
            {
                key: '1h',
                name: 'Massage Postnatal 1h seul',
                price: '75,00 EUR',
                priceId: 'price_1SIyQxCm8TYzw7cADEHgfZ75',
                buyButtonId: 'buy_btn_1SJtciCm8TYzw7cAi4BDm4De'
            },
            {
                key: '1h30',
                name: 'Massage Postnatal 1h30 seul',
                price: '110,00 EUR',
                priceId: 'price_1SIyTWCm8TYzw7cASFpVxPvS',
                buyButtonId: 'buy_btn_1SJtP0Cm8TYzw7cAr1XEfiq9'
            },
            {
                key: 'postnatal_bain',
                name: 'Massage Postnatal + Bain enveloppe',
                price: '140,00 EUR',
                priceId: 'price_1SIyNqCm8TYzw7cAcgbBwTpa',
                buyButtonId: 'buy_btn_1SJtgFCm8TYzw7cAdEGzcY5m'
            },
            {
                key: 'postnatal_rebozo',
                name: 'Massage Postnatal + Soin Rebozo',
                price: '160,00 EUR',
                priceId: 'price_1SIyXlCm8TYzw7cAzFfc2qyB',
                buyButtonId: 'buy_btn_1SJtHpCm8TYzw7cAcOxQmRrL'
            },
            {
                key: 'postnatal_drainage',
                name: 'Rituel Douceur Bulleo (Massage + Drainage Lymphatique 1h30)',
                price: '115,00 EUR',
                priceId: 'price_1TQ0oNCm8TYzw7cAtExvvnpm',
                buyButtonId: ''
            }
        ]
    },
    'Bain Enveloppe': {
        name: 'Bain Enveloppe',
        article: 'un',
        giftText: 'Offrir un bon cadeau Bain Enveloppe',
        bookText: 'Reserver un Bain Enveloppe',
        hasRelatedOffers: true,
        relatedOffers: [
            {
                key: 'solo',
                name: 'Bain Enveloppe seul',
                price: '70,00 EUR',
                priceId: 'price_1SIyM2Cm8TYzw7cAVrkQJ2FH',
                buyButtonId: 'buy_btn_1SJtjxCm8TYzw7cAiapizAVM'
            },
            {
                key: 'bain_prenatal',
                name: 'Bain + Massage Prenatal',
                price: '140,00 EUR',
                priceId: 'price_1SIyNOCm8TYzw7cAxuJCLweM',
                buyButtonId: 'buy_btn_1SJthmCm8TYzw7cAEtki54MD'
            },
            {
                key: 'bain_postnatal',
                name: 'Bain + Massage Postnatal',
                price: '140,00 EUR',
                priceId: 'price_1SIyNqCm8TYzw7cAcgbBwTpa',
                buyButtonId: 'buy_btn_1SJtgFCm8TYzw7cAdEGzcY5m'
            },
            {
                key: 'bain_rebozo',
                name: 'Bain + Soin Rebozo',
                price: '155,00 EUR',
                priceId: 'price_1SIyWNCm8TYzw7cAFlJgRQpZ',
                buyButtonId: 'buy_btn_1SJtK5Cm8TYzw7cAx8WYvhKq'
            },
            {
                key: 'bain_jumeaux',
                name: 'Bain Enveloppe Jumeaux',
                price: '120,00 EUR',
                priceId: 'price_1TLKf3Cm8TYzw7cAe1I5TdYN',
                buyButtonId: ''
            }
        ]
    },
    'Atelier Massage Bebe': {
        name: 'Atelier Massage Bebe',
        article: 'un',
        giftText: 'Offrir un bon cadeau Atelier Massage Bebe',
        bookText: 'Reserver un Atelier Massage Bebe',
        price: '80,00 EUR',
        buyButtonId: 'buy_btn_1SJtGGCm8TYzw7cADMJv955k'
    },
    'Bain Enveloppe Jumeaux': {
        name: 'Bain Enveloppe Jumeaux',
        article: 'un',
        giftText: 'Offrir un bon cadeau Bain Enveloppe Jumeaux',
        bookText: 'Reserver un Bain Enveloppe Jumeaux',
        price: '120,00 EUR',
        buyButtonId: ''
    },
    'Soin Rebozo': {
        name: 'Soin Rebozo',
        article: 'un',
        giftText: 'Offrir un bon cadeau Soin Rebozo',
        bookText: 'Reserver un Soin Rebozo',
        hasRelatedOffers: true,
        relatedOffers: [
            {
                key: 'solo',
                name: 'Soin Rebozo seul',
                price: '90,00 EUR',
                priceId: 'price_1SIyVlCm8TYzw7cAPEPWMeLr',
                buyButtonId: 'buy_btn_1SJtNJCm8TYzw7cApeGQMlvs'
            },
            {
                key: 'rebozo_bain',
                name: 'Soin Rebozo + Bain enveloppe',
                price: '155,00 EUR',
                priceId: 'price_1SIyWNCm8TYzw7cAFlJgRQpZ',
                buyButtonId: 'buy_btn_1SJtK5Cm8TYzw7cAx8WYvhKq'
            },
            {
                key: 'rebozo_massage',
                name: 'Soin Rebozo + Massage Postnatal',
                price: '160,00 EUR',
                priceId: 'price_1SIyXlCm8TYzw7cAzFfc2qyB',
                buyButtonId: 'buy_btn_1SJtHpCm8TYzw7cAcOxQmRrL'
            }
        ]
    },
    'Reflexologie Plantaire Obstetrique': {
        name: 'Reflexologie Plantaire Obstetrique',
        article: 'une',
        giftText: 'Offrir un bon cadeau Reflexologie Plantaire Obstetrique',
        bookText: 'Reserver une Reflexologie Plantaire Obstetrique',
        price: '50,00 EUR',
        buyButtonId: 'buy_btn_1RqXXCCm8TYzw7cAgP6BEyUQ'
    },
    'Reflexologie plantaire Pediatrique': {
        name: 'Reflexologie plantaire Pediatrique',
        article: 'une',
        giftText: 'Offrir un bon cadeau Reflexologie plantaire Pediatrique',
        bookText: 'Reserver une Reflexologie plantaire Pediatrique',
        price: '50,00 EUR',
        buyButtonId: 'buy_btn_1RqXW4Cm8TYzw7cAlsHfLT4B'
    },
    'Massage bebe & enfant': {
        name: 'Massage bebe & enfant',
        article: 'un',
        giftText: 'Offrir un bon cadeau Massage bebe & enfant',
        bookText: 'Reserver un Massage bebe & enfant',
        price: '55,00 EUR',
        buyButtonId: 'buy_btn_1SJtExCm8TYzw7cAeMS6sTrU'
    },
    'Soin postnatal complet - Massage & Rebozo': {
        name: 'Soin postnatal complet - Massage & Rebozo',
        article: 'un',
        giftText: 'Offrir un bon cadeau Soin postnatal complet',
        bookText: 'Reserver un Soin postnatal complet',
        price: '160,00 EUR',
        buyButtonId: 'buy_btn_1SJw4zCm8TYzw7cAgkiZH9Va'
    },
    'Rituel Douceur Bulleo': {
        name: 'Rituel Douceur Bulleo',
        article: 'un',
        giftText: 'Offrir un Rituel Douceur Bulleo',
        bookText: 'Reserver un Rituel Douceur Bulleo',
        price: '115,00 EUR',
        buyButtonId: ''
    },
    'Drainage Lymphatique Balinais': {
        name: 'Drainage Lymphatique Balinais',
        article: 'un',
        giftText: 'Offrir un Drainage Lymphatique Balinais',
        bookText: 'Reserver un Drainage Lymphatique Balinais',
        hasRelatedOffers: true,
        relatedOffers: [
            {
                key: '30min',
                name: 'Seance 30 min — 1 zone',
                price: '50,00 EUR',
                priceId: 'price_1TQ0izCm8TYzw7cA3hGP3iXI',
                buyButtonId: ''
            },
            {
                key: '45min',
                name: 'Seance 45 min — 2 zones',
                price: '65,00 EUR',
                priceId: 'price_1TQ0jdCm8TYzw7cAV0bmg1yw',
                buyButtonId: ''
            },
            {
                key: '1h',
                name: 'Seance 1 h — corps entier',
                price: '80,00 EUR',
                priceId: 'price_1TQ0jtCm8TYzw7cApl7OXG7i',
                buyButtonId: ''
            },
            {
                key: 'cure_30min',
                name: 'Cure 30 min — 6 seances (5 payantes + 1 offerte)',
                price: '250,00 EUR',
                priceId: 'price_1TQ0lCCm8TYzw7cAEzLfY2pG',
                buyButtonId: ''
            },
            {
                key: 'cure_45min',
                name: 'Cure 45 min — 6 seances (5 payantes + 1 offerte)',
                price: '325,00 EUR',
                priceId: 'price_1TQ0moCm8TYzw7cAZTLZ9tep',
                buyButtonId: ''
            },
            {
                key: 'cure_1h',
                name: 'Cure 1 h — 6 seances (5 payantes + 1 offerte)',
                price: '400,00 EUR',
                priceId: 'price_1TQ0n9Cm8TYzw7cA7CUWDXfT',
                buyButtonId: ''
            },
            {
                key: 'drainage_massage',
                name: 'Rituel Douceur Bulleo (Massage + Drainage 1h30)',
                price: '115,00 EUR',
                priceId: 'price_1TQ0oNCm8TYzw7cAtExvvnpm',
                buyButtonId: ''
            }
        ]
    },
    'Agenda: Ma premiere annee de maman': {
        name: 'Agenda: Ma premiere annee de maman',
        article: 'un',
        giftText: 'Offrir un bon cadeau Agenda Maman',
        bookText: 'Commander un Agenda Maman',
        price: '31,80 EUR',
        buyButtonId: 'buy_btn_1RqWYKCm8TYzw7cAWcMEeir5',
        requiresShipping: true
    }
};

// Mapping des services vers les Price IDs Stripe
const serviceToPriceId = {
    'Massage Prenatal': {
        default: 'price_1SIyPgCm8TYzw7cAgJTspWxo',
        relatedOffers: {
            '1h': 'price_1SIyPgCm8TYzw7cAgJTspWxo',
            '1h30': 'price_1SIyT1Cm8TYzw7cAo9urSwWp',
            'prenatal_bain': 'price_1SIyNOCm8TYzw7cAxuJCLweM',
            'prenatal_drainage': 'price_1TQ0oNCm8TYzw7cAtExvvnpm'
        }
    },
    'Massage Postnatal': {
        default: 'price_1SIyQxCm8TYzw7cADEHgfZ75',
        relatedOffers: {
            '1h': 'price_1SIyQxCm8TYzw7cADEHgfZ75',
            '1h30': 'price_1SIyTWCm8TYzw7cASFpVxPvS',
            'postnatal_bain': 'price_1SIyNqCm8TYzw7cAcgbBwTpa',
            'postnatal_rebozo': 'price_1SIyXlCm8TYzw7cAzFfc2qyB',
            'postnatal_drainage': 'price_1TQ0oNCm8TYzw7cAtExvvnpm'
        }
    },
    'Bain Enveloppe': {
        default: 'price_1SIyM2Cm8TYzw7cAVrkQJ2FH',
        relatedOffers: {
            'solo': 'price_1SIyM2Cm8TYzw7cAVrkQJ2FH',
            'bain_prenatal': 'price_1SIyNOCm8TYzw7cAxuJCLweM',
            'bain_postnatal': 'price_1SIyNqCm8TYzw7cAcgbBwTpa',
            'bain_rebozo': 'price_1SIyWNCm8TYzw7cAFlJgRQpZ',
            'bain_jumeaux': 'price_1TLKf3Cm8TYzw7cAe1I5TdYN'
        }
    },
    'Atelier Massage Bebe': 'price_1SIyYACm8TYzw7cAcgWKZUDU',
    'Bain Enveloppe Jumeaux': 'price_1TLKf3Cm8TYzw7cAe1I5TdYN',
    'Soin Rebozo': {
        default: 'price_1SIyVlCm8TYzw7cAPEPWMeLr',
        relatedOffers: {
            'solo': 'price_1SIyVlCm8TYzw7cAPEPWMeLr',
            'rebozo_bain': 'price_1SIyWNCm8TYzw7cAFlJgRQpZ',
            'rebozo_massage': 'price_1SIyXlCm8TYzw7cAzFfc2qyB'
        }
    },
    'Reflexologie Plantaire Obstetrique': 'price_1RqWkwCm8TYzw7cAc1RYwLxa',
    'Reflexologie plantaire Pediatrique': 'price_1RqWlgCm8TYzw7cANnCeRBdq',
    'Massage bebe & enfant': 'price_1SIyYXCm8TYzw7cA3eAcDt0z',
    'Soin postnatal complet - Massage & Rebozo': 'price_1SIyXlCm8TYzw7cAzFfc2qyB',
    'Rituel Douceur Bulleo': 'price_1TQ0oNCm8TYzw7cAtExvvnpm',
    'Drainage Lymphatique Balinais': {
        default: 'price_1TQ0izCm8TYzw7cA3hGP3iXI',
        relatedOffers: {
            '30min': 'price_1TQ0izCm8TYzw7cA3hGP3iXI',
            '45min': 'price_1TQ0jdCm8TYzw7cAV0bmg1yw',
            '1h': 'price_1TQ0jtCm8TYzw7cApl7OXG7i',
            'cure_30min': 'price_1TQ0lCCm8TYzw7cAEzLfY2pG',
            'cure_45min': 'price_1TQ0moCm8TYzw7cAZTLZ9tep',
            'cure_1h': 'price_1TQ0n9Cm8TYzw7cA7CUWDXfT',
            'drainage_massage': 'price_1TQ0oNCm8TYzw7cAtExvvnpm'
        }
    },
    'Agenda: Ma premiere annee de maman': 'price_1RqVTxCm8TYzw7cA6e88Upbg'
};

// Stripe publishable key
const STRIPE_PUBLISHABLE_KEY = 'pk_live_51RngTlCm8TYzw7cAg4DHZDf8Ekwjip4lNtC4vd2xaNBxYa5ayMJJmXlSN90FQN1RsITW0OCftaRgy3fsIZ8zzWRr00lM3lDBnn';

// ============================================
// VALIDATION
// ============================================
const VALIDATION_PATTERNS = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    phone: /^(?:(?:\+33|0033|0)\s*[1-9])(?:[\s.-]*[0-9]){8}$/
};

function showFieldError(element, message) {
    clearFieldError(element);
    element.classList.add('border-red-500', 'ring-2', 'ring-red-200');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error text-red-500 text-xs mt-1 flex items-center';
    errorDiv.innerHTML = '<i class="fas fa-exclamation-circle mr-1"></i>' + message;
    element.parentNode.appendChild(errorDiv);
    element.addEventListener('input', function handler() {
        clearFieldError(element);
    }, { once: true });
}

function clearFieldError(element) {
    element.classList.remove('border-red-500', 'ring-2', 'ring-red-200');
    const existing = element.parentNode.querySelector('.field-error');
    if (existing) existing.remove();
}

function validateField(element, pattern, errorMessage) {
    const value = element.value.replace(/\s/g, '');
    if (!value || (pattern instanceof RegExp && !pattern.test(value))) {
        showFieldError(element, errorMessage);
        element.focus();
        return false;
    }
    clearFieldError(element);
    return true;
}

function validateMinLength(element, minLength, errorMessage) {
    if (!element.value || element.value.trim().length < minLength) {
        showFieldError(element, errorMessage);
        element.focus();
        return false;
    }
    clearFieldError(element);
    return true;
}

// ============================================
// GIFT MODAL
// ============================================
let currentGiftService = '';
let currentGiftVariantKey = '';

function openGiftModal(serviceName, preselectVariantKey) {
    const modal = document.getElementById('giftModal');
    if (!modal) return;

    const service = serviceConfig[serviceName];
    if (!service) return;

    currentGiftService = serviceName;
    currentGiftVariantKey = '';

    // Pre-load Stripe script when modal opens (user will likely pay)
    loadStripeScript();

    // Set modal title
    const titleEl = modal.querySelector('[data-gift-title]');
    if (titleEl) {
        titleEl.textContent = 'Offrir ' + service.article + ' ' + service.name;
    }

    // Populate service dropdown
    const serviceSelect = modal.querySelector('[data-gift-service]');
    if (serviceSelect) {
        serviceSelect.innerHTML = '';
        Object.keys(serviceConfig).forEach(function(key) {
            const opt = document.createElement('option');
            opt.value = key;
            opt.textContent = serviceConfig[key].name;
            if (key === serviceName) opt.selected = true;
            serviceSelect.appendChild(opt);
        });

        // Clone to remove old listeners
        const newSelect = serviceSelect.cloneNode(true);
        serviceSelect.parentNode.replaceChild(newSelect, serviceSelect);
        newSelect.addEventListener('change', function() {
            updateGiftService(this.value);
        });
    }

    // Update variant and price display (with optional pre-selection)
    updateGiftService(serviceName, preselectVariantKey);

    // Show modal
    modal.classList.add('active');
    document.body.classList.add('modal-open');
    document.body.dataset.scrollY = window.scrollY;
    document.body.style.top = '-' + window.scrollY + 'px';

    // Trap focus — focus first input
    const firstInput = modal.querySelector('input:not([type="hidden"]), select');
    if (firstInput) {
        setTimeout(function() { firstInput.focus(); }, 100);
    }

    // Close on backdrop click
    modal.addEventListener('click', function handler(e) {
        if (e.target === modal) {
            closeGiftModal();
            modal.removeEventListener('click', handler);
        }
    });

    // Close on Escape
    document.addEventListener('keydown', function handler(e) {
        if (e.key === 'Escape') {
            closeGiftModal();
            document.removeEventListener('keydown', handler);
        }
    });
}

function setGiftType(type) {
    const modal = document.getElementById('giftModal');
    if (!modal) return;

    const btnSelf = modal.querySelector('[data-gift-type-self]');
    const btnGift = modal.querySelector('[data-gift-type-gift]');
    const recipientSection = modal.querySelector('[data-gift-recipient-section]');
    const recipientInput = modal.querySelector('[data-gift-recipient]');

    if (type === 'gift') {
        // Activate gift button
        if (btnGift) { btnGift.classList.add('bg-white', 'shadow-sm', 'text-primary'); btnGift.classList.remove('text-gray-500'); }
        if (btnSelf) { btnSelf.classList.remove('bg-white', 'shadow-sm', 'text-primary'); btnSelf.classList.add('text-gray-500'); }
        // Show recipient
        if (recipientSection) recipientSection.style.display = '';
        if (recipientInput) recipientInput.setAttribute('required', 'required');
    } else {
        // Activate self button
        if (btnSelf) { btnSelf.classList.add('bg-white', 'shadow-sm', 'text-primary'); btnSelf.classList.remove('text-gray-500'); }
        if (btnGift) { btnGift.classList.remove('bg-white', 'shadow-sm', 'text-primary'); btnGift.classList.add('text-gray-500'); }
        // Hide recipient
        if (recipientSection) recipientSection.style.display = 'none';
        if (recipientInput) recipientInput.removeAttribute('required');
    }
}

function closeGiftModal() {
    const modal = document.getElementById('giftModal');
    if (!modal) return;

    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
    const scrollY = document.body.dataset.scrollY;
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0'));

    // Reset form
    const form = modal.querySelector('form');
    if (form) form.reset();

    currentGiftService = '';
    currentGiftVariantKey = '';
}

function updateGiftService(serviceName, preselectVariantKey) {
    const modal = document.getElementById('giftModal');
    if (!modal) return;

    const service = serviceConfig[serviceName];
    if (!service) return;

    currentGiftService = serviceName;
    currentGiftVariantKey = '';

    // Update title
    const titleEl = modal.querySelector('[data-gift-title]');
    if (titleEl) {
        titleEl.textContent = 'Offrir ' + service.article + ' ' + service.name;
    }

    // Handle variant selector
    const variantSection = modal.querySelector('[data-gift-variant-section]');
    const variantSelect = modal.querySelector('[data-gift-variant]');
    const priceEl = modal.querySelector('[data-gift-price]');

    if (service.hasRelatedOffers && service.relatedOffers.length > 0) {
        // Show variant selector
        if (variantSection) { variantSection.classList.remove('hidden'); variantSection.style.display = ''; }

        // Resolve which offer to pre-select (preselected key, fallback to first)
        const preselectIndex = preselectVariantKey
            ? service.relatedOffers.findIndex(function(o) { return o.key === preselectVariantKey; })
            : -1;
        const selectedIndex = preselectIndex >= 0 ? preselectIndex : 0;
        const selectedOffer = service.relatedOffers[selectedIndex];

        if (variantSelect) {
            variantSelect.innerHTML = '';
            service.relatedOffers.forEach(function(offer, index) {
                const opt = document.createElement('option');
                opt.value = offer.key;
                opt.textContent = offer.name + ' — ' + offer.price;
                if (index === selectedIndex) opt.selected = true;
                variantSelect.appendChild(opt);
            });
            currentGiftVariantKey = selectedOffer.key;

            // Clone to remove old listeners
            const newVariantSelect = variantSelect.cloneNode(true);
            variantSelect.parentNode.replaceChild(newVariantSelect, variantSelect);
            newVariantSelect.addEventListener('change', function() {
                const offer = service.relatedOffers.find(function(o) {
                    return o.key === newVariantSelect.value;
                });
                if (offer && priceEl) {
                    priceEl.textContent = offer.price;
                    currentGiftVariantKey = offer.key;
                } else if (priceEl) {
                    priceEl.textContent = '--';
                    currentGiftVariantKey = '';
                }
            });
        }

        // Set price display to the pre-selected offer
        if (priceEl) {
            priceEl.textContent = selectedOffer.price;
        }
    } else {
        // Hide variant selector
        if (variantSection) { variantSection.classList.add('hidden'); variantSection.style.display = 'none'; }
        if (priceEl) priceEl.textContent = service.price || '--';
    }
}

function handleGiftPayment() {
    const modal = document.getElementById('giftModal');
    if (!modal) return false;

    const service = serviceConfig[currentGiftService];
    if (!service) {
        alert('Veuillez selectionner un service.');
        return false;
    }

    // Validate variant selection for services with related offers
    if (service.hasRelatedOffers) {
        const variantSelect = modal.querySelector('[data-gift-variant]');
        if (!variantSelect || !variantSelect.value) {
            alert('Veuillez selectionner une formule.');
            if (variantSelect) variantSelect.focus();
            return false;
        }
        currentGiftVariantKey = variantSelect.value;
    }

    // Validate required fields
    const nameEl = modal.querySelector('[data-gift-name]');
    const emailEl = modal.querySelector('[data-gift-email]');
    const phoneEl = modal.querySelector('[data-gift-phone]');
    const recipientEl = modal.querySelector('[data-gift-recipient]');

    if (nameEl && !validateMinLength(nameEl, 2, 'Votre nom est requis (min 2 caracteres)')) {
        return false;
    }

    if (emailEl && !validateField(emailEl, VALIDATION_PATTERNS.email, 'Email invalide (ex: nom@domaine.fr)')) {
        return false;
    }

    if (phoneEl && !validateField(phoneEl, VALIDATION_PATTERNS.phone, 'Telephone invalide (ex: 06 75 43 02 57)')) {
        return false;
    }

    // Only validate recipient if visible (gift mode)
    const recipientSection = modal.querySelector('[data-gift-recipient-section]');
    if (recipientEl && recipientSection && recipientSection.style.display !== 'none') {
        if (!validateMinLength(recipientEl, 2, 'Le nom du beneficiaire est requis')) {
            return false;
        }
    }

    // Save form data to localStorage
    const formData = {
        service: currentGiftService,
        variant: currentGiftVariantKey || '',
        name: nameEl ? nameEl.value : '',
        email: emailEl ? emailEl.value : '',
        phone: phoneEl ? phoneEl.value : '',
        recipient: recipientEl ? recipientEl.value : '',
        actionType: 'gift',
        timestamp: Date.now()
    };

    try {
        localStorage.setItem('pendingFormData', JSON.stringify(formData));
        localStorage.setItem('pendingActionType', 'gift');
    } catch (e) {
        try {
            sessionStorage.setItem('pendingFormData', JSON.stringify(formData));
            sessionStorage.setItem('pendingActionType', 'gift');
        } catch (e2) {
            // Storage unavailable — proceed anyway
        }
    }

    // Resolve price ID
    let priceId;
    const priceConfig = serviceToPriceId[currentGiftService];

    if (service.hasRelatedOffers && currentGiftVariantKey) {
        if (typeof priceConfig === 'object' && priceConfig.relatedOffers) {
            priceId = priceConfig.relatedOffers[currentGiftVariantKey] || priceConfig.default;
        } else {
            priceId = typeof priceConfig === 'string' ? priceConfig : null;
        }
    } else {
        if (typeof priceConfig === 'object') {
            priceId = priceConfig.default;
        } else {
            priceId = priceConfig;
        }
    }

    if (!priceId) {
        alert('Service non configure pour les paiements. Veuillez nous contacter.');
        return false;
    }

    // Show loading state on payment button
    const payBtn = modal.querySelector('[onclick="handleGiftPayment()"]');
    if (payBtn) {
        payBtn.disabled = true;
        payBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Redirection vers le paiement...';
    }

    // Redirect to Stripe
    redirectToStripeCheckout(priceId);
    return false;
}

// ============================================
// STRIPE (lazy load — charge uniquement au premier paiement)
// ============================================
let stripeScriptLoaded = false;

function loadStripeScript() {
    if (stripeScriptLoaded) return;
    stripeScriptLoaded = true;
    const s = document.createElement('script');
    s.src = 'https://js.stripe.com/v3/';
    s.async = true;
    document.head.appendChild(s);
}

async function redirectToStripeCheckout(priceId) {
    try {
        loadStripeScript();
        if (typeof Stripe === 'undefined') {
            let attempts = 0;
            const waitForStripe = setInterval(function() {
                attempts++;
                if (typeof Stripe !== 'undefined') {
                    clearInterval(waitForStripe);
                    performStripeRedirect(priceId);
                } else if (attempts > 100) {
                    clearInterval(waitForStripe);
                    alert('Erreur de chargement du systeme de paiement. Veuillez recharger la page.');
                }
            }, 100);
        } else {
            performStripeRedirect(priceId);
        }
    } catch (error) {
        alert('Erreur de connexion au systeme de paiement. Veuillez reessayer.');
    }
}

async function performStripeRedirect(priceId) {
    try {
        const stripeInstance = Stripe(STRIPE_PUBLISHABLE_KEY);

        const result = await stripeInstance.redirectToCheckout({
            lineItems: [{
                price: priceId,
                quantity: 1
            }],
            mode: 'payment',
            successUrl: window.location.origin + '/success.html?payment=success&action=gift&session_id={CHECKOUT_SESSION_ID}',
            cancelUrl: window.location.origin + window.location.pathname + '?payment=cancelled'
        });

        if (result.error) {
            alert('Erreur lors de l\'ouverture du paiement: ' + result.error.message);
        }
    } catch (error) {
        alert('Erreur de connexion a Stripe: ' + error.message);
    }
}

// ============================================
// CALENDLY
// ============================================
// Calendly URL base et mapping des slugs par service
const CALENDLY_BASE = 'https://calendly.com/contact-bulleo-soins';
// Slugs verifies sur Calendly le 14/03/2026
const CALENDLY_SLUGS = {
    'Massage Prenatal': 'massage-pre-post-natal',
    'Massage Postnatal': 'massage-pre-post-natal',
    'Bain Enveloppe': '30min',
    'Soin Rebozo': 'soin-rebozo',
    'Reflexologie Plantaire Obstetrique': 'reflexologie-obstetrique',
    'Reflexologie plantaire Pediatrique': 'reflexologie-pediatrique',
    'Atelier Massage Bebe': 'apprendre-a-masser-son-bebe',
    'Massage bebe & enfant': 'massage-bebe',
    'Soin postnatal complet - Massage & Rebozo': 'soin-postnatal-complet',
    'Bain Enveloppe Jumeaux': 'bain-jumeaux',
    'Drainage Lymphatique Balinais': 'drainage-lymphatique-balinais',
    'Drainage Lymphatique Balinais 30min': 'drainage-lymphatique-balinais',
    'Drainage Lymphatique Balinais 45min': 'drainage-lymphatique-balinais-1',
    'Drainage Lymphatique Balinais 1h': 'drainage-lymphatique-balinais-2',
    'Rituel Douceur Bulleo': 'soin-massage-drainage',
    'Agenda: Ma premiere annee de maman': null
};

// Slugs pour le mode "J'ai une carte cadeau"
const CALENDLY_GIFT_SLUGS = {
    'Massage Prenatal': 'j-ai-une-carte-cadeau-massage-pre-ou-post-natal',
    'Massage Postnatal': 'j-ai-une-carte-cadeau-massage-pre-ou-post-natal',
    'Bain Enveloppe': 'j-ai-un-carte-cadeau-bain-enveloppe',
    'Soin Rebozo': 'j-ai-une-carte-cadeau-soin-rebozo',
    'Reflexologie Plantaire Obstetrique': null,
    'Reflexologie plantaire Pediatrique': 'j-ai-une-carte-cadeau-reflexologie-pediatrique',
    'Atelier Massage Bebe': 'j-ai-une-carte-cadeau-apprendre-a-masser-bebe',
    'Massage bebe & enfant': 'j-ai-une-carte-cadeau-massage-bebe',
    'Soin postnatal complet - Massage & Rebozo': null,
    'Bain Enveloppe Jumeaux': 'j-ai-une-carte-cadeau-bain-jumeaux',
    'Drainage Lymphatique Balinais': 'j-ai-une-carte-cadeau-massage-drainage',
    'Rituel Douceur Bulleo': 'j-ai-une-carte-cadeau-massage-drainage',
    'Agenda: Ma premiere annee de maman': null
};

function getCalendlyUrl(serviceName, isGiftRedemption) {
    if (isGiftRedemption) {
        const giftSlug = CALENDLY_GIFT_SLUGS[serviceName];
        if (giftSlug) return CALENDLY_BASE + '/' + giftSlug;
    }
    const slug = CALENDLY_SLUGS[serviceName];
    return slug ? CALENDLY_BASE + '/' + slug : CALENDLY_BASE;
}

function openCalendlyPopup(serviceName) {
    const url = getCalendlyUrl(serviceName);

    if (typeof Calendly === 'undefined') {
        window.open(url, '_blank');
        return;
    }

    Calendly.initPopupWidget({
        url: url,
        prefill: {
            customAnswers: {
                a1: serviceName || '',
                a2: serviceConfig[serviceName] ? serviceConfig[serviceName].price || '' : ''
            }
        },
        utm: {
            utmSource: 'website',
            utmMedium: 'bouton_reserver',
            utmContent: serviceName || 'general'
        }
    });
}

function initCalendlyInline(containerId, serviceName) {
    if (typeof Calendly === 'undefined') return;
    const container = document.getElementById(containerId);
    if (!container) return;

    const url = getCalendlyUrl(serviceName);

    Calendly.initInlineWidget({
        url: url,
        parentElement: container,
        prefill: {
            customAnswers: {
                a1: serviceName || '',
                a2: serviceConfig[serviceName] ? serviceConfig[serviceName].price || '' : ''
            }
        },
        utm: {
            utmSource: 'website',
            utmMedium: 'page_service',
            utmContent: serviceName || 'general'
        }
    });
}

// ============================================
// MOBILE MENU
// ============================================
let savedScrollPosition = 0;

function openMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileMenuOverlay');
    if (!menu) return;

    savedScrollPosition = window.scrollY;
    document.body.dataset.scrollY = savedScrollPosition;
    document.body.style.top = '-' + savedScrollPosition + 'px';
    document.body.classList.add('menu-open');

    menu.classList.add('open');
    if (overlay) overlay.classList.add('open');

    // Close when clicking a menu link
    menu.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
            closeMobileMenu();
        }, { once: true });
    });
}

function closeMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileMenuOverlay');
    if (!menu) return;

    menu.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.classList.remove('menu-open');

    const scrollY = document.body.dataset.scrollY || savedScrollPosition;
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0'));
}

// ============================================
// HEADER SCROLL
// ============================================
function initHeaderScroll() {
    const nav = document.querySelector('.nav-v2');
    if (!nav) return;

    function updateHeader() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
}

// ============================================
// FAQ ACCORDION
// ============================================
function toggleFAQ(button) {
    if (!button) return;

    const answer = button.nextElementSibling;
    if (!answer) return;

    const isExpanded = button.getAttribute('aria-expanded') === 'true';

    // Close all other FAQ items in the same container
    const container = button.closest('[data-faq-container]') || button.parentNode.parentNode;
    if (container) {
        container.querySelectorAll('.faq-toggle').forEach(function(otherButton) {
            if (otherButton !== button) {
                otherButton.setAttribute('aria-expanded', 'false');
                const otherAnswer = otherButton.nextElementSibling;
                if (otherAnswer) {
                    otherAnswer.classList.remove('open');
                    otherAnswer.style.maxHeight = '0';
                }
            }
        });
    }

    if (isExpanded) {
        button.setAttribute('aria-expanded', 'false');
        answer.classList.remove('open');
        answer.style.maxHeight = '0';
    } else {
        button.setAttribute('aria-expanded', 'true');
        answer.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
    }
}

// ============================================
// SCROLL ANIMATIONS (IntersectionObserver)
// ============================================
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    if (elements.length === 0) return;

    if (!('IntersectionObserver' in window)) {
        // Fallback: show all elements immediately
        elements.forEach(function(el) {
            el.classList.add('visible');
        });
        return;
    }

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(function(el) {
        observer.observe(el);
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = document.querySelector('.nav-v2')
                    ? document.querySelector('.nav-v2').offsetHeight
                    : 0;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// POST-PAYMENT HANDLERS
// ============================================
function checkStripeReturn() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment') === 'cancelled') {
        alert('Paiement annule. Vous pouvez reessayer quand vous le souhaitez.');
        cleanUrl();
    }
}

function checkConfirmation() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('confirmation') === 'sent') {
        showSuccessBanner('Votre demande a bien ete envoyee. Nous vous recontactons rapidement !');
        cleanUrl();
    }
}

function cleanUrl() {
    const url = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, url);
}

function showSuccessBanner(message) {
    const banner = document.createElement('div');
    banner.className = 'fixed top-0 left-0 right-0 z-[9999] bg-green-600 text-white text-center py-3 px-4 text-sm font-medium';
    banner.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
    banner.textContent = message;
    document.body.appendChild(banner);

    setTimeout(function() {
        banner.style.opacity = '0';
        banner.style.transform = 'translateY(-100%)';
        setTimeout(function() {
            banner.remove();
        }, 400);
    }, 5000);
}

// ============================================
// FILTRE GRILLE DES SOINS
// ============================================
function filterServices(category, btn) {
    // Update active chip
    document.querySelectorAll('.chips-row .chip').forEach(function(c) {
        c.classList.remove('active');
        c.setAttribute('aria-selected', 'false');
    });
    if (btn) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
    } else {
        // Programmatic call: activate matching chip by data-filter
        var chip = document.querySelector('.chips-row .chip[data-filter="' + category + '"]');
        if (chip) {
            chip.classList.add('active');
            chip.setAttribute('aria-selected', 'true');
        }
    }
    // Filter cards
    document.querySelectorAll('.service-card').forEach(function(card) {
        var match = category === 'all' || card.dataset.cat === category;
        card.classList.toggle('hidden-by-filter', !match);
    });
    // GTM event
    trackGTMEvent('filter_services', { category: category });
}

// Mappe les anciennes ancres aux catégories du filtre
const HASH_FILTER_MAP = {
    '#grossesse': 'grossesse',
    '#drainage': 'soin',
    '#bebe': 'bebe'
};

function applyHashFilter() {
    var hash = window.location.hash;
    var filter = HASH_FILTER_MAP[hash];
    if (filter) {
        filterServices(filter, null);
        var grid = document.getElementById('prestations');
        if (grid) {
            setTimeout(function() {
                var top = grid.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }, 60);
        }
    }
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initHeaderScroll();
    initScrollAnimations();
    initSmoothScroll();
    checkStripeReturn();
    checkConfirmation();
    applyHashFilter();
    window.addEventListener('hashchange', applyHashFilter);
});
