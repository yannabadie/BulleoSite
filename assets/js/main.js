/**
 * Bulleo Soins - Main JavaScript
 * Site de soins de bien-etre perinataux
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
    'Agenda: Ma premiere annee de maman': {
        name: 'Agenda: Ma premiere annee de maman',
        article: 'un',
        giftText: 'Offrir un bon cadeau Agenda Maman',
        bookText: 'Commander un Agenda Maman',
        price: '31,80 EUR',
        buyButtonId: 'buy_btn_1RqWYKCm8TYzw7cAWcMEeir5',
        requiresShipping: true
    },
    'Atelier Motricite & Eveil sensoriel': {
        name: 'Atelier Motricite & Eveil sensoriel',
        article: 'un',
        giftText: 'Offrir un bon cadeau Atelier Motricite',
        bookText: 'Reserver un Atelier Motricite',
        price: '16,00 EUR',
        buyButtonId: 'buy_btn_1RqWVWCm8TYzw7cAFHxH5XlR'
    }
};

// Mapping des services vers les Price IDs Stripe
const serviceToPriceId = {
    'Massage Prenatal': {
        default: 'price_1SIyPgCm8TYzw7cAgJTspWxo',
        relatedOffers: {
            '1h': 'price_1SIyPgCm8TYzw7cAgJTspWxo',
            '1h30': 'price_1SIyT1Cm8TYzw7cAo9urSwWp',
            'prenatal_bain': 'price_1SIyNOCm8TYzw7cAxuJCLweM'
        }
    },
    'Massage Postnatal': {
        default: 'price_1SIyQxCm8TYzw7cADEHgfZ75',
        relatedOffers: {
            '1h': 'price_1SIyQxCm8TYzw7cADEHgfZ75',
            '1h30': 'price_1SIyTWCm8TYzw7cASFpVxPvS',
            'postnatal_bain': 'price_1SIyNqCm8TYzw7cAcgbBwTpa',
            'postnatal_rebozo': 'price_1SIyXlCm8TYzw7cAzFfc2qyB'
        }
    },
    'Bain Enveloppe': {
        default: 'price_1SIyM2Cm8TYzw7cAVrkQJ2FH',
        relatedOffers: {
            'solo': 'price_1SIyM2Cm8TYzw7cAVrkQJ2FH',
            'bain_prenatal': 'price_1SIyNOCm8TYzw7cAxuJCLweM',
            'bain_postnatal': 'price_1SIyNqCm8TYzw7cAcgbBwTpa',
            'bain_rebozo': 'price_1SIyWNCm8TYzw7cAFlJgRQpZ'
        }
    },
    'Atelier Massage Bebe': 'price_1SIyYACm8TYzw7cAcgWKZUDU',
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
    'Agenda: Ma premiere annee de maman': 'price_1RqVTxCm8TYzw7cA6e88Upbg',
    'Atelier Motricite & Eveil sensoriel': 'price_1RzzLGCm8TYzw7cAFej7gEph'
};

// Stripe publishable key
const STRIPE_PUBLISHABLE_KEY = 'pk_live_51RngTlCm8TYzw7cAg4DHZDf8Ekwjip4lNtC4vd2xaNBxYa5ayMJJmXlSN90FQN1RsITW0OCftaRgy3fsIZ8zzWRr00lM3lDBnn';

// ============================================
// VARIABLES GLOBALES
// ============================================
let currentSelectedService = '';
let stripe = null;
let currentGalleryImages = [];
let currentGalleryIndex = 0;
let currentSlideshowImages = [];
let currentSlideshowIndex = 0;

// ============================================
// VALIDATION HELPERS
// ============================================
const VALIDATION_PATTERNS = {
    // Email standard
    email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    // Telephone FR: 0675430257, 06 75 43 02 57, +33675430257, +33 6 75 43 02 57
    phone: /^(?:(?:\+33|0033|0)\s*[1-9])(?:[\s.-]*[0-9]){8}$/
};

function showInlineError(element, message) {
    clearInlineError(element);

    element.classList.add('border-red-500', 'ring-2', 'ring-red-200');

    const errorDiv = document.createElement('div');
    errorDiv.className = 'inline-error text-red-500 text-xs mt-1 flex items-center';
    errorDiv.innerHTML = '<i class="fas fa-exclamation-circle mr-1"></i>' + message;
    element.parentNode.appendChild(errorDiv);

    element.addEventListener('input', function handler() {
        clearInlineError(element);
    }, { once: true });
}

function clearInlineError(element) {
    element.classList.remove('border-red-500', 'ring-2', 'ring-red-200');
    const existingError = element.parentNode.querySelector('.inline-error');
    if (existingError) existingError.remove();
}

function validateField(element, pattern, errorMessage) {
    const value = element.value.replace(/\s/g, '');
    if (!value || (pattern instanceof RegExp && !pattern.test(value))) {
        showInlineError(element, errorMessage);
        element.focus();
        return false;
    }
    clearInlineError(element);
    return true;
}

function validateMinLength(element, minLength, errorMessage) {
    if (!element.value || element.value.trim().length < minLength) {
        showInlineError(element, errorMessage);
        element.focus();
        return false;
    }
    clearInlineError(element);
    return true;
}

// ============================================
// GTM EVENTS TRACKING (Phase 2)
// ============================================
// GTM ID: GTM-MZT366F6 (verifie actif dans index.html)
function trackGTMEvent(eventName, eventParams) {
    try {
        if (typeof gtag === 'function') {
            gtag('event', eventName, eventParams);
        } else if (typeof dataLayer !== 'undefined') {
            dataLayer.push({
                'event': eventName,
                ...eventParams
            });
        }
    } catch (e) {
        // GTM tracking unavailable
    }
}

function trackCTAClick(serviceName, actionType) {
    trackGTMEvent('cta_click', {
        'service': serviceName,
        'action_type': actionType || 'booking',
        'page_location': window.location.pathname
    });
}

function trackVariantSelect(serviceName, variantKey, price) {
    trackGTMEvent('add_variant', {
        'service': serviceName,
        'variant': variantKey,
        'price': price,
        'currency': 'EUR'
    });
}

function trackFormSubmit(serviceName, actionType, price) {
    trackGTMEvent('form_submit', {
        'service': serviceName,
        'action_type': actionType,
        'value': parseFloat(price.replace(',', '.').replace(/[^0-9.]/g, '')) || 0,
        'currency': 'EUR'
    });
}

// ============================================
// LOADER
// ============================================
function hideLoader() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        loader.style.pointerEvents = 'none'; // Permet les clics immédiatement
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    } else {
        console.error('Element loader non trouve !');
    }
}

// ============================================
// NAVIGATION
// ============================================
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            document.body.dataset.scrollY = window.scrollY;
            document.body.style.top = `-${window.scrollY}px`;
            mobileMenu.classList.remove('translate-x-full');
            document.body.classList.add('mobile-menu-open');
        });
    }

    if (closeMobileMenu && mobileMenu) {
        closeMobileMenu.addEventListener('click', function() {
            mobileMenu.classList.add('translate-x-full');
            document.body.classList.remove('mobile-menu-open');
            const scrollY = document.body.dataset.scrollY;
            document.body.style.top = '';
            window.scrollTo(0, parseInt(scrollY || '0'));
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('#mobileMenu a').forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenu) {
                mobileMenu.classList.add('translate-x-full');
                document.body.classList.remove('mobile-menu-open');
                const scrollY = document.body.dataset.scrollY;
                document.body.style.top = '';
                window.scrollTo(0, parseInt(scrollY || '0'));
            }
        });
    });
}

function initHeaderScroll() {
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        const logo = document.getElementById('headerLogo');

        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('shadow-md', 'header-scrolled');
                if (logo) {
                    logo.classList.add('logo-small');
                    logo.classList.remove('logo-large');
                }
            } else {
                header.classList.remove('shadow-md', 'header-scrolled');
                if (logo) {
                    logo.classList.remove('logo-small');
                    logo.classList.add('logo-large');
                }
            }
        }
    }, { passive: true });

    // Initialize logo state on page load
    const logo = document.getElementById('headerLogo');
    if (logo) {
        if (window.scrollY > 50) {
            logo.classList.add('logo-small');
        } else {
            logo.classList.add('logo-large');
        }
    }
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// MODALS
// ============================================
function openContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        document.body.style.position = '';
    }
}

// Close modal when clicking outside
function initModalClose() {
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
            document.body.style.overflow = '';
            document.body.style.position = '';
        }
    });
}

// ============================================
// STRIPE
// ============================================
function initializeStripe() {
    return new Promise((resolve, reject) => {
        if (typeof Stripe !== 'undefined') {
            stripe = Stripe(STRIPE_PUBLISHABLE_KEY);
            resolve(stripe);
        } else {
            let stripeAttempts = 0;
            const checkStripe = setInterval(() => {
                stripeAttempts++;
                if (typeof Stripe !== 'undefined') {
                    clearInterval(checkStripe);
                    stripe = Stripe(STRIPE_PUBLISHABLE_KEY);
                    resolve(stripe);
                }
                if (stripeAttempts >= 100) {
                    clearInterval(checkStripe);
                    console.error('Stripe failed to load after 10 seconds');
                    reject(new Error('Stripe failed to load'));
                }
            }, 100);
        }
    });
}

async function handlePayment(type) {
    const form = document.getElementById('bookingForm');
    const actionType = document.getElementById('actionType').value;

    // Validation des champs requis selon le type d'action
    if (actionType === 'booking') {
        const bookingDate = document.getElementById('bookingDate');
        const bookingTime = document.getElementById('bookingTime');
        const phone = document.getElementById('bookingPhone');
        const name = document.getElementById('bookingName');
        const email = document.getElementById('bookingEmail');
        const currentService = document.getElementById('selectedService')?.value;
        const currentServiceData = serviceConfig[currentService];
        const needsShipping = currentServiceData && currentServiceData.requiresShipping;

        // Date et creneau requis SAUF pour les services avec livraison (Agenda)
        if (!needsShipping) {
            if (!bookingDate.value) {
                showInlineError(bookingDate, 'Veuillez selectionner une date');
                bookingDate.focus();
                return false;
            }

            if (!bookingTime.value) {
                showInlineError(bookingTime, 'Veuillez selectionner un creneau');
                bookingTime.focus();
                return false;
            }
        } else {
            // Pour les services avec livraison, valider l'adresse
            const shippingAddress = document.getElementById('shippingAddress');
            if (!shippingAddress || !shippingAddress.value.trim()) {
                showInlineError(shippingAddress, 'Veuillez indiquer une adresse de livraison');
                if (shippingAddress) shippingAddress.focus();
                return false;
            }
        }

        if (!validateMinLength(name, 2, 'Nom requis (min 2 caracteres)')) {
            return false;
        }

        if (!validateField(email, VALIDATION_PATTERNS.email, 'Email invalide (ex: nom@domaine.fr)')) {
            return false;
        }

        if (!validateField(phone, VALIDATION_PATTERNS.phone, 'Telephone invalide (ex: 06 75 43 02 57)')) {
            return false;
        }
    } else if (actionType === 'gift') {
        const recipientName = document.getElementById('recipientName');
        const name = document.getElementById('bookingName');
        const email = document.getElementById('bookingEmail');

        if (!validateMinLength(recipientName, 2, 'Nom du beneficiaire requis')) {
            return false;
        }

        if (!validateMinLength(name, 2, 'Votre nom requis (min 2 caracteres)')) {
            return false;
        }

        if (!validateField(email, VALIDATION_PATTERNS.email, 'Email invalide (ex: nom@domaine.fr)')) {
            return false;
        }
    }

    // Validate variant selection for services with related offers
    const serviceName = document.getElementById('selectedService')?.value;
    const serviceData = serviceConfig[serviceName];
    if (serviceData && serviceData.hasRelatedOffers) {
        const variantSelect = document.getElementById('variantSelect');
        if (!variantSelect || !variantSelect.value) {
            alert('Veuillez sélectionner une formule.');
            if (variantSelect) variantSelect.focus();
            return false;
        }
    }

    // Sauvegarder les donnees du formulaire
    window.bookingFormData = new FormData(form);
    window.formspreeActionType = actionType;

    const formDataObj = {};
    window.bookingFormData.forEach((value, key) => {
        formDataObj[key] = value;
    });

    try {
        localStorage.setItem('pendingFormData', JSON.stringify(formDataObj));
        localStorage.setItem('pendingActionType', actionType);
    } catch (e) {
        try {
            sessionStorage.setItem('pendingFormData', JSON.stringify(formDataObj));
            sessionStorage.setItem('pendingActionType', actionType);
        } catch (e2) {
            console.error('Impossible de sauvegarder les donnees localement', e2);
        }
    }

    const variant = document.getElementById('variantSelect')?.value;
    const servicePrice = document.getElementById('servicePrice')?.textContent || '0';

    // GTM Event: Form Submit (Phase 2) - avant redirect Stripe
    trackFormSubmit(serviceName, actionType, servicePrice);

    // Determiner le bon Price ID
    let priceId;
    const servicePriceConfig = serviceToPriceId[serviceName];

    if (typeof servicePriceConfig === 'object' && servicePriceConfig.relatedOffers) {
        priceId = servicePriceConfig.relatedOffers[variant] || servicePriceConfig.default;
    } else if (typeof servicePriceConfig === 'object' && servicePriceConfig.variants) {
        priceId = servicePriceConfig.variants[variant] || servicePriceConfig.default;
    } else {
        priceId = servicePriceConfig;
    }

    if (priceId) {
        if (typeof Stripe === 'undefined') {
            let attempts = 0;
            const waitForStripe = setInterval(() => {
                attempts++;
                if (typeof Stripe !== 'undefined') {
                    clearInterval(waitForStripe);
                    redirectToStripeCheckout(priceId);
                } else if (attempts > 50) {
                    clearInterval(waitForStripe);
                    console.error('Timeout: Stripe ne se charge pas');
                    alert('Erreur de chargement Stripe. Veuillez recharger la page.');
                }
            }, 100);
        } else {
            redirectToStripeCheckout(priceId);
        }
    } else {
        alert('Service non configure pour les paiements. Contactez le support.');
    }
}

async function redirectToStripeCheckout(priceId) {
    try {
        const stripe = Stripe(STRIPE_PUBLISHABLE_KEY);

        const actionType = window.formspreeActionType || document.getElementById('actionType').value;

        const result = await stripe.redirectToCheckout({
            lineItems: [{
                price: priceId,
                quantity: 1,
            }],
            mode: 'payment',
            successUrl: `${window.location.origin}/success.html?payment=success&action=${actionType}&session_id={CHECKOUT_SESSION_ID}`,
            cancelUrl: `${window.location.origin}${window.location.pathname}?payment=cancelled`,
        });

        if (result.error) {
            console.error('Erreur Stripe checkout:', result.error);
            alert('Erreur lors de l\'ouverture du paiement: ' + result.error.message);
        }
    } catch (error) {
        console.error('Erreur dans redirectToStripeCheckout:', error);
        alert('Erreur de connexion a Stripe: ' + error.message);
    }
}

// ============================================
// FORMSPREE
// ============================================
function sendFormspreeData() {
    if (window.bookingFormData) {
        try {
            const actionType = window.formspreeActionType || document.getElementById('actionType').value;
            const formspreeUrl = actionType === 'gift'
                ? 'https://formspree.io/f/meozaekb'
                : 'https://formspree.io/f/xdkdeazw';

            fetch(formspreeUrl, {
                method: 'POST',
                body: window.bookingFormData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    const actionText = actionType === 'gift' ? 'Commande de bon cadeau' : 'Reservation';
                    showMessage(`${actionText} confirmee ! Nous revenons vite vers vous.`);
                    document.getElementById('bookingModal').classList.remove('active');
                    document.getElementById('bookingForm').reset();
                } else {
                    showMessage('Paiement valide mais erreur d\'envoi du formulaire.', 'error');
                }
            }).catch(err => {
                console.error('Erreur lors de l\'envoi du formulaire:', err);
                showMessage('Paiement valide mais erreur d\'envoi du formulaire.', 'error');
            }).finally(() => {
                window.bookingFormData = null;
            });
        } catch (err) {
            console.error('Erreur lors de l\'envoi du formulaire:', err);
            showMessage('Paiement valide mais erreur d\'envoi du formulaire.', 'error');
        }
    }
}

// ============================================
// BOOKING MODAL
// ============================================
function openBookingModal(serviceName) {
    const service = serviceConfig[serviceName];
    if (!service) return;

    // GTM Event: CTA Click (Phase 2)
    trackCTAClick(serviceName, 'modal_open');

    currentSelectedService = serviceName;

    document.getElementById('bookingModalTitle').textContent = service.name;

    document.getElementById('giftOption').textContent = service.giftText;
    document.getElementById('giftOption').value = 'gift_' + serviceName;
    document.getElementById('bookOption').textContent = service.bookText;
    document.getElementById('bookOption').value = 'booking_' + serviceName;

    document.getElementById('selectedService').value = serviceName;

    const variantSection = document.getElementById('variantSection');
    const variantSelect = document.getElementById('variantSelect');
    const variantLabel = document.getElementById('variantLabel');

    if (service.hasRelatedOffers) {
        variantSelect.innerHTML = '<option value="">Selectionnez une option</option>';

        service.relatedOffers.forEach((offer, index) => {
            const option = document.createElement('option');
            option.value = offer.key;
            option.textContent = `${offer.name} - ${offer.price}`;
            if (index === 0) {
                option.selected = true;
            }
            variantSelect.appendChild(option);
        });

        variantLabel.textContent = 'Choisissez votre formule';

        document.getElementById('servicePrice').textContent = service.relatedOffers[0].price;
        document.getElementById('selectedVariantKey').value = service.relatedOffers[0].key;

        const newSelect = variantSelect.cloneNode(true);
        variantSelect.parentNode.replaceChild(newSelect, variantSelect);

        newSelect.addEventListener('change', function() {
            const selectedKey = this.value;
            if (!selectedKey) return;

            const selectedOffer = service.relatedOffers.find(offer => offer.key === selectedKey);
            if (selectedOffer) {
                document.getElementById('servicePrice').textContent = selectedOffer.price;
                document.getElementById('selectedVariantKey').value = selectedKey;

                // GTM Event: Variant Selection (Phase 2)
                trackVariantSelect(serviceName, selectedKey, selectedOffer.price);

                const stripeButtonPlaceholder = document.getElementById('stripeButtonPlaceholder');
                stripeButtonPlaceholder.innerHTML = `
                    <button type="button" class="btn-primary w-full" onclick="handlePayment('booking')">
                        Finaliser le paiement (${selectedOffer.price})
                    </button>
                `;

                const stripeButtonContainer = document.getElementById('stripeButtonContainer');
                const actionType = document.getElementById('actionType').value;
                if (actionType === 'booking' || actionType === 'gift') {
                    stripeButtonContainer.style.display = 'block';
                }
            }
        });

        variantSection.style.display = 'none';
    } else if (service.hasVariants) {
        variantSelect.innerHTML = '<option value="">Selectionnez la duree</option>';

        let firstVariantKey = null;
        Object.entries(service.variants).forEach(([key, variant], index) => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = `${variant.name} - ${variant.price}`;
            if (index === 0) {
                option.selected = true;
                firstVariantKey = key;
            }
            variantSelect.appendChild(option);
        });

        variantLabel.textContent = 'Choisissez la duree';

        const defaultVariant = Object.values(service.variants)[0];
        document.getElementById('servicePrice').textContent = defaultVariant.price;

        if (firstVariantKey) {
            document.getElementById('selectedVariantKey').value = firstVariantKey;
        }

        const newSelect = variantSelect.cloneNode(true);
        variantSelect.parentNode.replaceChild(newSelect, variantSelect);

        newSelect.addEventListener('change', function() {
            const selectedKey = this.value;
            if (!selectedKey) return;

            const selectedVariant = service.variants[selectedKey];
            if (selectedVariant) {
                document.getElementById('servicePrice').textContent = selectedVariant.price;
                document.getElementById('selectedVariantKey').value = selectedKey;

                const stripeButtonPlaceholder = document.getElementById('stripeButtonPlaceholder');
                stripeButtonPlaceholder.innerHTML = `
                    <button type="button" class="btn-primary w-full" onclick="handlePayment('booking')">
                        Finaliser le paiement (${selectedVariant.price})
                    </button>
                `;

                const stripeButtonContainer = document.getElementById('stripeButtonContainer');
                const actionType = document.getElementById('actionType').value;
                if (actionType === 'booking' || actionType === 'gift') {
                    stripeButtonContainer.style.display = 'block';
                }
            }
        });

        variantSection.style.display = 'none';
    } else {
        document.getElementById('servicePrice').textContent = service.price;
        variantSection.style.display = 'none';
    }

    const stripeButtonPlaceholder = document.getElementById('stripeButtonPlaceholder');
    stripeButtonPlaceholder.innerHTML = `
        <button type="button" class="btn-primary w-full" onclick="handlePayment('booking')">
            Finaliser le paiement
        </button>
    `;

    document.getElementById('bookingForm').reset();
    document.getElementById('selectedService').value = serviceName;
    document.getElementById('recipientSection').style.display = 'none';
    document.getElementById('recipientName').removeAttribute('required');
    document.getElementById('bookingDateSection').style.display = 'none';
    document.getElementById('bookingTimeSection').style.display = 'none';
    document.getElementById('stripeButtonContainer').style.display = 'none';
    document.getElementById('variantSection').style.display = 'none';
    document.getElementById('shippingAddressSection').style.display = 'none';
    document.getElementById('shippingAddress').removeAttribute('required');
    document.getElementById('bookingDate').removeAttribute('required');
    document.getElementById('bookingTime').removeAttribute('required');

    const subjectInput = document.getElementById('bookingForm').querySelector('input[name="_subject"]');
    subjectInput.value = 'Bulleo - Nouvelle demande';

    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.add('active');
    } else {
        console.error('Modal bookingModal non trouve!');
    }
}

function openServiceModalFromDescription() {
    if (currentSelectedService) {
        closeModal('serviceModal');
        setTimeout(() => {
            openBookingModal(currentSelectedService);
        }, 100);
    }
}

// Open service selector modal (for mobile footer)
function openServiceSelector() {
    const modal = document.getElementById('serviceSelectModal');
    if (modal) {
        modal.classList.add('active');
        document.body.classList.add('modal-open');
    }
}

// Select a service from the selector and open booking modal
function selectServiceAndBook(serviceName) {
    closeModal('serviceSelectModal');
    setTimeout(() => {
        openBookingModal(serviceName);
    }, 100);
}

// Open booking modal with a specific variant pre-selected
function openBookingModalWithVariant(serviceName, variantKey) {
    // First open the modal normally
    openBookingModal(serviceName);

    // Then pre-select the variant if it exists
    const service = serviceConfig[serviceName];
    if (!service) return;

    setTimeout(() => {
        const variantSelect = document.getElementById('variantSelect');
        const variantSection = document.getElementById('variantSection');

        if (service.hasRelatedOffers) {
            // Find the matching offer
            const offer = service.relatedOffers.find(o => o.key === variantKey);
            if (offer) {
                // Select the variant
                variantSelect.value = variantKey;

                // Update price display
                document.getElementById('servicePrice').textContent = offer.price;
                document.getElementById('selectedVariantKey').value = variantKey;

                // Update stripe button
                const stripeButtonPlaceholder = document.getElementById('stripeButtonPlaceholder');
                stripeButtonPlaceholder.innerHTML = `
                    <button type="button" class="btn-primary w-full" onclick="handlePayment('booking')">
                        Finaliser le paiement (${offer.price})
                    </button>
                `;
            }
        } else if (service.hasVariants && service.variants[variantKey]) {
            const variant = service.variants[variantKey];
            variantSelect.value = variantKey;

            document.getElementById('servicePrice').textContent = variant.price;
            document.getElementById('selectedVariantKey').value = variantKey;

            const stripeButtonPlaceholder = document.getElementById('stripeButtonPlaceholder');
            stripeButtonPlaceholder.innerHTML = `
                <button type="button" class="btn-primary w-full" onclick="handlePayment('booking')">
                    Finaliser le paiement (${variant.price})
                </button>
            `;
        }
    }, 100);
}

// ============================================
// MESSAGES
// ============================================
function showMessage(message, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `fixed top-4 right-4 p-4 rounded-lg z-50 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white max-w-md`;
    messageDiv.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    document.body.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// ============================================
// GALLERY
// ============================================
const galleryImages = [
    {
        src: 'https://lh3.googleusercontent.com/p/AF1QipON1YaVYMtmmux7BAzB4Pf_ejn4CafiYDdrqU7P=s680-w680-h510-rw',
        title: 'Salle de massage prenatal',
        description: 'Espace cocooning specialement amenage pour les futures mamans, avec tout le confort necessaire pour un moment de detente parfait.'
    },
    {
        src: 'https://lh3.googleusercontent.com/p/AF1QipN_PS5aIPp4tqyzWYwBOoU5gdq4WKORKY3-cPLC=s680-w680-h510-rw',
        title: 'Espace massage bebe',
        description: 'Un environnement doux et securisant pour les seances de massage bebe et les ateliers parent-enfant.'
    },
    {
        src: 'https://lh3.googleusercontent.com/p/AF1QipNNMqSLFGTiL92Wg1fhEak-1kwRffXi1x1HX1gg=s680-w680-h510-rw',
        title: 'Salle de soins Rebozo',
        description: 'Espace dedie aux rituels ancestraux Rebozo, dans une ambiance intimiste et apaisante.'
    },
    {
        src: 'https://lh3.googleusercontent.com/p/AF1QipOr9ZQKHhOKxcc0ra0mOPxcnpGowEXRWOElgKlm=s680-w680-h510-rw',
        title: 'Espace bain enveloppe',
        description: 'Zone specialement concue pour les bains enveloppes des nouveau-nes, alliant securite et douceur.'
    },
    {
        src: 'https://lh3.googleusercontent.com/p/AF1QipNv-gBYk0kUeumnZUiZ7NYiLeswfirH4NhWrwcJ=s680-w680-h510-rw',
        title: 'Salle de soins principale',
        description: 'Notre salle de soins polyvalente, amenagee pour accueillir differents types de massages et consultations.'
    },
    {
        src: 'https://lh3.googleusercontent.com/p/AF1QipMgtaPiB9CbJjmucLUrNlvXrmlZZ-zkTdvssp2Q=s680-w680-h510-rw',
        title: 'Espace detente',
        description: 'Coin repos pour prolonger le moment de bien-etre apres les soins, dans le calme et la serenite.'
    },
    {
        src: 'https://lh3.googleusercontent.com/p/AF1QipPF_FFe4dLlFocO7ekpVRGunY6p00sJMRUIeUj7=s680-w680-h510-rw',
        title: 'Cabinet consultation',
        description: 'Espace d\'echange privilegie pour les consultations en lactation et les entretiens personnalises.'
    },
    {
        src: 'https://lh3.googleusercontent.com/p/AF1QipP_sP-MzwYQoPyBFsaLCEHsTpQbwYkgnn3YZo0C=s680-w680-h510-rw',
        title: 'Ambiance institut',
        description: 'Vue d\'ensemble de nos espaces dedies au bien-etre et a la relaxation.'
    }
];

function openGalleryModal(index = 0) {
    currentGalleryIndex = index;
    updateGalleryModal();
    document.getElementById('galleryModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function updateGalleryModal() {
    const modal = document.getElementById('galleryModal');
    const image = document.getElementById('galleryModalImage');
    const title = document.getElementById('galleryModalTitle');
    const description = document.getElementById('galleryModalDescription');
    const counter = document.getElementById('galleryModalCounter');
    const thumbnailsContainer = document.getElementById('galleryThumbnails');

    const currentImage = galleryImages[currentGalleryIndex];

    image.classList.add('changing');
    title.classList.add('changing');
    description.classList.add('changing');
    counter.classList.add('changing');

    setTimeout(() => {
        image.src = currentImage.src.replace('s680-w680-h510-rw', 's1600-w1600-h1200-rw');
        image.alt = currentImage.title;

        title.textContent = currentImage.title;
        description.textContent = currentImage.description;
        counter.textContent = `${currentGalleryIndex + 1} / ${galleryImages.length}`;

        setTimeout(() => {
            image.classList.remove('changing');
            title.classList.remove('changing');
            description.classList.remove('changing');
            counter.classList.remove('changing');
        }, 50);
    }, 200);

    thumbnailsContainer.innerHTML = '';
    galleryImages.forEach((img, idx) => {
        const thumb = document.createElement('img');
        thumb.src = img.src.replace('s680-w680-h510-rw', 's200-w200-h150-rw');
        thumb.alt = img.title;
        thumb.className = `h-16 w-24 object-cover rounded cursor-pointer transition-all duration-300 ${
            idx === currentGalleryIndex
                ? 'ring-2 ring-[#c4b6a5] opacity-100 scale-105'
                : 'opacity-60 hover:opacity-100'
        }`;
        thumb.onclick = () => {
            currentGalleryIndex = idx;
            updateGalleryModal();
        };
        thumbnailsContainer.appendChild(thumb);
    });
}

function previousGalleryImage() {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
    updateGalleryModal();
}

function nextGalleryImage() {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
    updateGalleryModal();
}

function prevGalleryImage() {
    previousGalleryImage();
}

function toggleGalleryFullscreen() {
    const image = document.getElementById('galleryModalImage');
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        image.requestFullscreen().catch(() => {});
    }
}

function shareGalleryImage() {
    const currentImage = galleryImages[currentGalleryIndex];
    if (navigator.share) {
        navigator.share({
            title: `Bulleo Soins - ${currentImage.title}`,
            text: currentImage.description,
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(window.location.href).then(() => {
            showMessage('Lien copie dans le presse-papiers !', 'success');
        });
    }
}

function generateGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;

    galleryGrid.innerHTML = '';

    const photosToShow = Math.min(8, galleryImages.length);

    for (let i = 0; i < photosToShow; i++) {
        const image = galleryImages[i];
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item group cursor-pointer';
        galleryItem.onclick = () => openGalleryModal(i);

        galleryItem.innerHTML = `
            <div class="relative overflow-hidden rounded-xl shadow-lg">
                <img src="${image.src}" alt="${image.title}" class="w-full h-64 object-cover transform transition-all duration-500 group-hover:scale-110 group-hover:brightness-110">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div class="absolute bottom-4 left-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                    <h3 class="font-semibold text-lg">${image.title}</h3>
                    <p class="text-sm text-white/80">${image.description.substring(0, 50)}...</p>
                </div>
                <div class="absolute top-4 right-4 text-white transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                    <i class="fas fa-expand-alt text-xl"></i>
                </div>
            </div>
        `;

        galleryGrid.appendChild(galleryItem);
    }
}

// Keyboard navigation for gallery
function initGalleryKeyboard() {
    document.addEventListener('keydown', function(e) {
        const modal = document.getElementById('galleryModal');
        if (modal && modal.classList.contains('active')) {
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    previousGalleryImage();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    nextGalleryImage();
                    break;
                case 'Escape':
                    e.preventDefault();
                    closeModal('galleryModal');
                    document.body.style.overflow = '';
                    break;
            }
        }
    });

    // Touch swipe for gallery
    let galleryTouchStartX = 0;
    document.addEventListener('touchstart', function(e) {
        if (document.getElementById('galleryModal')?.classList.contains('active')) {
            galleryTouchStartX = e.changedTouches[0].screenX;
        }
    }, { passive: true });

    document.addEventListener('touchend', function(e) {
        if (document.getElementById('galleryModal')?.classList.contains('active')) {
            const diff = galleryTouchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) nextGalleryImage();
                else previousGalleryImage();
            }
        }
    }, { passive: true });
}

// ============================================
// SLIDESHOW
// ============================================
function openSlideshow(images, index = 0) {
    currentSlideshowImages = images;
    currentSlideshowIndex = index;
    updateSlideshow();
    document.getElementById('slideshowModal').classList.add('active');
}

function updateSlideshow() {
    const slideshowImage = document.getElementById('slideshowImage');
    slideshowImage.src = currentSlideshowImages[currentSlideshowIndex];
    slideshowImage.alt = `Image ${currentSlideshowIndex + 1}`;
}

function prevSlide() {
    currentSlideshowIndex = (currentSlideshowIndex - 1 + currentSlideshowImages.length) % currentSlideshowImages.length;
    updateSlideshow();
}

function nextSlide() {
    currentSlideshowIndex = (currentSlideshowIndex + 1) % currentSlideshowImages.length;
    updateSlideshow();
}

// ============================================
// SERVICE MODAL
// ============================================
const serviceIdToName = {
    'massage_prenatal': 'Massage Prenatal',
    'massage_postnatal': 'Massage Postnatal',
    'bain_enveloppe': 'Bain Enveloppe',
    'atelier_massage_bebe': 'Atelier Massage Bebe',
    'soin_rebozo': 'Soin Rebozo',
    'reflexologie': 'Reflexologie Plantaire Obstetrique',
    'reflexologie_pediatrique': 'Reflexologie plantaire Pediatrique',
    'massage_bebe_enfant': 'Massage bebe & enfant',
    'soin_postnatal_complet': 'Soin postnatal complet - Massage & Rebozo',
    'agenda_maman': 'Agenda: Ma premiere annee de maman',
    'atelier_motricite': 'Atelier Motricite & Eveil sensoriel'
};

function openServiceModal(serviceId) {
    currentSelectedService = serviceIdToName[serviceId] || '';

    const modal = document.getElementById('serviceModal');
    const serviceData = getServiceData(serviceId);

    document.getElementById('serviceModalTitle').textContent = serviceData.title;
    document.getElementById('serviceDescription').textContent = serviceData.description;

    const benefitsList = document.getElementById('serviceBenefits');
    benefitsList.innerHTML = '';
    serviceData.benefits.forEach(benefit => {
        const li = document.createElement('li');
        li.textContent = benefit;
        benefitsList.appendChild(li);
    });

    const detailsContainer = document.getElementById('serviceDetails');
    detailsContainer.innerHTML = serviceData.details;

    const imagesContainer = document.getElementById('serviceImages');
    imagesContainer.innerHTML = '';

    if (serviceData.images && serviceData.images.length > 0) {
        const mainImage = document.getElementById('serviceGalleryMainImage');
        mainImage.src = serviceData.images[0].includes('=s') || serviceData.images[0].includes('=w')
            ? serviceData.images[0].split('=')[0] + '=w1600'
            : serviceData.images[0];
        mainImage.alt = `${serviceData.title} - Photo 1`;
        setTimeout(() => mainImage.classList.add('active'), 100);

        const thumbnailsContainer = document.getElementById('serviceGalleryThumbnails');
        thumbnailsContainer.innerHTML = '';

        serviceData.images.forEach((imageUrl, index) => {
            const thumb = document.createElement('img');
            thumb.src = imageUrl.includes('=s') || imageUrl.includes('=w')
                ? imageUrl.split('=')[0] + '=w300'
                : imageUrl;
            thumb.alt = `Miniature ${index + 1}`;
            thumb.className = 'gallery-thumbnail' + (index === 0 ? ' active' : '');
            thumb.onclick = () => {
                document.querySelectorAll('.gallery-thumbnail').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
                mainImage.classList.remove('active');
                mainImage.src = imageUrl.includes('=s') || imageUrl.includes('=w')
                    ? imageUrl.split('=')[0] + '=w1600'
                    : imageUrl;
                mainImage.alt = `${serviceData.title} - Photo ${index + 1}`;
                setTimeout(() => mainImage.classList.add('active'), 50);
            };
            thumbnailsContainer.appendChild(thumb);
        });

        serviceData.images.forEach((imageUrl, index) => {
            const img = document.createElement('img');
            img.src = imageUrl.includes('=s') || imageUrl.includes('=w')
                ? imageUrl.split('=')[0] + '=w800'
                : imageUrl;
            img.alt = `${serviceData.title} - Photo ${index + 1}`;
            img.loading = 'lazy';
            img.style.transitionDelay = `${index * 0.1}s`;
            img.onclick = () => {
                document.querySelectorAll('.gallery-thumbnail').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.gallery-thumbnail')[index].classList.add('active');
                mainImage.classList.remove('active');
                mainImage.src = imageUrl.includes('=s') || imageUrl.includes('=w')
                    ? imageUrl.split('=')[0] + '=w1600'
                    : imageUrl;
                mainImage.alt = `${serviceData.title} - Photo ${index + 1}`;
                setTimeout(() => mainImage.classList.add('active'), 50);
            };
            imagesContainer.appendChild(img);
        });

        setTimeout(() => {
            imagesContainer.classList.add('active');
        }, 100);
    }

    modal.classList.add('active');
    switchTab('description');
}

function getServiceData(serviceId) {
    const services = {
        'massage_prenatal': {
            title: 'Massage Prenatal',
            description: 'Un instant de bien-etre pour la future maman, tout en douceur et en connexion.\n\nLa grossesse transforme profondement le corps et l\'esprit. Cette periode si precieuse peut aussi s\'accompagner de petits maux : douleurs ligamentaires, tensions dans le dos, sciatique, retention d\'eau, mauvaise circulation, fatigue, insomnies, essoufflement... sans oublier le stress ou la charge mentale.\n\nLe massage prenatal est un soin doux, enveloppant et totalement adapte a la femme enceinte. Il permet de soulager les inconforts physiques, d\'apaiser le mental, et d\'offrir un veritable moment de calme, de reconfort et de lien avec bebe.',
            benefits: [
                'Soulage les douleurs lombaires et sciatiques',
                'Reduit le stress et l\'anxiete',
                'Ameliore la qualite du sommeil',
                'Favorise une meilleure circulation sanguine',
                'Attenue les jambes lourdes',
                'Facilite la digestion',
                'Renforce le lien mere-enfant',
                'Prepare le corps a l\'accouchement'
            ],
            details: `
                <div class="flex items-center"><i class="fas fa-calendar-alt mr-2"></i><span>A partir de : 16 SA jusqu'a 41 SA</span></div>
                <div class="flex items-center"><i class="fas fa-clock mr-2"></i><span>Duree au choix :</span></div>
                <div class="flex items-center ml-4"><i class="fas fa-clock mr-2"></i><span>Massage de 1h : 75EUR</span></div>
                <div class="flex items-center ml-4"><i class="fas fa-clock mr-2"></i><span>Massage de 1h30 : 110EUR</span></div>
                <div class="flex items-center"><i class="fas fa-map-marker-alt mr-2"></i><span>Ou ? A l'institut Bulleo</span></div>
                <div class="flex items-center"><i class="fas fa-bed mr-2"></i><span>Position : Allongee sur le dos et le cote avec coussins de confort</span></div>
                <div class="flex items-center"><i class="fas fa-sync-alt mr-2"></i><span>Frequence : Aussi souvent que vous en ressentez le besoin</span></div>
                <div class="mt-4"><p>Ce soin est une belle idee cadeau pour une future maman !</p><p>Cartes cadeaux disponibles sur demande</p></div>
            `,
            images: [
                'https://lh3.googleusercontent.com/p/AF1QipON1YaVYMtmmux7BAzB4Pf_ejn4CafiYDdrqU7P=s680-w680-h510-rw',
                'https://lh3.googleusercontent.com/p/AF1QipNv-gBYk0kUeumnZUiZ7NYiLeswfirH4NhWrwcJ=s680-w680-h510-rw',
                'https://lh3.googleusercontent.com/p/AF1QipMgtaPiB9CbJjmucLUrNlvXrmlZZ-zkTdvssp2Q=s680-w680-h510-rw',
                'https://lh3.googleusercontent.com/p/AF1QipMC5Xxvnr09hfFCeRzZkRdUU7pulkm7130Q98dK=s680-w680-h510-rw',
                'https://lh3.googleusercontent.com/p/AF1QipNwzTxD09_4I6xscJpvqZYcnQN-JupuXsvzLYE8=s680-w680-h510-rw'
            ]
        },
        'massage_postnatal': {
            title: 'Massage Postnatal',
            description: 'Massage Postnatal\n\nSe retrouver, relacher les tensions, prendre soin de soi.\n\nL\'apres-naissance est une periode a la fois bouleversante et intense. Le corps, l\'esprit et le coeur traversent de nombreux changements. Entre fatigue, douleurs, emotions vives et adaptation au rythme de bebe, il est essentiel de s\'accorder un temps rien que pour soi.\n\nLe massage postnatal est un soin pense pour vous recentrer, relacher les tensions physiques liees a l\'accouchement, liberer les emotions accumulees et retrouver un bien-etre profond.',
            benefits: [
                'Soulage les tensions musculaires',
                'Aide a la recuperation post-accouchement',
                'Reduit le stress et l\'anxiete',
                'Ameliore la qualite du sommeil',
                'Favorise la circulation sanguine',
                'Aide a la regulation hormonale',
                'Offre un moment de detente profonde',
                'Renforce le sentiment de bien-etre'
            ],
            details: `
                <div class="flex items-center"><i class="fas fa-calendar-alt mr-2"></i><span>Quand ? Des que vous en ressentez le besoin</span></div>
                <div class="flex items-center"><i class="fas fa-clock mr-2"></i><span>Duree : 1h</span></div>
                <div class="flex items-center"><i class="fas fa-euro-sign mr-2"></i><span>Tarif : 75EUR</span></div>
                <div class="flex items-center"><i class="fas fa-map-marker-alt mr-2"></i><span>Ou ? A l'institut Bulleo</span></div>
                <div class="flex items-center"><i class="fas fa-sync-alt mr-2"></i><span>Frequence : Autant que vous en avez besoin</span></div>
                <div class="mt-4"><p>Ideal aussi en cadeau pour une jeune maman.</p><p>Cartes cadeaux disponibles sur demande</p></div>
            `,
            images: [
                'https://lh3.googleusercontent.com/p/AF1QipMbSqXiVeLFK2GMG5YTPFI4wGWb3mwtvvLnYfqh=s680-w680-h510-rw',
                'https://lh3.googleusercontent.com/p/AF1QipMAE_k5gETuyruvtSjc1RX7TNFNiRQrNakfmhG6=s680-w680-h510-rw',
                'https://lh3.googleusercontent.com/p/AF1QipNZU9aSheum1wsBKqrFEW7LqmCsIjjFsFvWoFU3=s680-w680-h510-rw',
                'https://lh3.googleusercontent.com/p/AF1QipNqr01eBp4ihJH45C0wF4yu_D_zOaXS2qAHd_Gg=s680-w680-h510-rw'
            ]
        },
        'bain_enveloppe': {
            title: 'Bain Enveloppe',
            description: 'Bain Enveloppe\n\nUn retour en douceur aux sensations rassurantes de la vie intra-uterine.\n\nLe bain enveloppe est un moment unique et emouvant pour accueillir bebe dans la douceur. Ce soin aide le nouveau-ne a retrouver ses reperes, a liberer les tensions liees a la naissance, et a se detendre profondement.\n\nEnveloppe dans un lange, bebe est berce dans l\'eau chaude, dans un cadre securisant et respectueux de son rythme. Ce soin favorise l\'attachement, le lacher-prise, et peut etre particulierement benefique en cas de naissance difficile, prematuree ou par cesarienne.',
            benefits: [
                'Aide bebe a retrouver ses reperes',
                'Libere les tensions liees a la naissance',
                'Favorise un profond relachement',
                'Cree un moment privilegie parent-enfant',
                'Aide a l\'attachement et au lacher-prise',
                'Particulierement benefique apres une naissance difficile',
                'Adapte aux prematures',
                'Cadre securisant et respectueux'
            ],
            details: `
                <div class="flex items-center"><i class="fas fa-calendar-alt mr-2"></i><span>Quand ? Dans les 21 premiers jours de vie (au-dela si prematurite)</span></div>
                <div class="flex items-center"><i class="fas fa-clock mr-2"></i><span>Duree : Environ 45min / 1h</span></div>
                <div class="flex items-center"><i class="fas fa-euro-sign mr-2"></i><span>Tarif : 70EUR</span></div>
                <div class="flex items-center"><i class="fas fa-map-marker-alt mr-2"></i><span>Ou ? A l'institut Bulleo</span></div>
                <div class="flex items-center"><i class="fas fa-tshirt mr-2"></i><span>A prevoir : 2 sorties de bains et une tenue de change pour bebe</span></div>
                <div class="mt-4"><p>Ideal comme cadeau de naissance</p></div>
            `,
            images: [
                'https://lh3.googleusercontent.com/p/AF1QipOr9ZQKHhOKxcc0ra0mOPxcnpGowEXRWOElgKlm=s680-w680-h510-rw',
                'https://lh3.googleusercontent.com/p/AF1QipN0OYROBi7x4KO5RmoGQa6O2K5L12WPgxHWYjHM=s680-w680-h510-rw',
                'https://lh3.googleusercontent.com/p/AF1QipPCWIok770oySU6ItPWrP8KStnIVL_Fs5CG_ofB=s680-w680-h510-rw',
                'https://lh3.googleusercontent.com/p/AF1QipOROuEkgyXvJDD95Vn-x-FdFqOUHDjUFJOFM6Iu=s680-w680-h510-rw',
                'https://lh3.googleusercontent.com/p/AF1QipOtcKAyapG9fapqztnK7JEXu1gMSbu9FFCpnb5L=s680-w680-h510-rw',
                'https://lh3.googleusercontent.com/p/AF1QipM1PFK2I9iDsVu0knNA9UVY6WhUs6JpzujIv_L2=s680-w680-h510-rw'
            ]
        },
        'soin_postnatal_complet': {
            title: 'Soin postnatal complet - Massage & Rebozo',
            description: 'Un rituel unique et profond, pense pour les femmes apres la naissance.\n\nUn moment pour refermer ce grand passage qu\'est l\'accouchement, se recentrer, se reconnecter a son corps, a ses emotions, a soi.\n\nCe soin combine massage et resserrage Rebozo dans un enchainement fluide et cocooning, pour vous accompagner avec douceur dans la transition du post-partum.',
            benefits: [
                'Ferme symboliquement le passage de la naissance',
                'Soulage les tensions physiques post-accouchement',
                'Aide a liberer les emotions accumulees',
                'Reequilibre le bassin et la posture',
                'Offre un moment de recentrage profond',
                'Favorise la recuperation physique et emotionnelle',
                'Cree un espace sacre pour la nouvelle mere',
                'Renforce le sentiment de feminite'
            ],
            details: `
                <div class="flex items-center"><i class="fas fa-clock mr-2"></i><span>Duree : 1h45 a 2h</span></div>
                <div class="flex items-center"><i class="fas fa-euro-sign mr-2"></i><span>Tarif : 160EUR</span></div>
                <div class="flex items-center"><i class="fas fa-map-marker-alt mr-2"></i><span>Ou ? A l'institut Bulleo</span></div>
                <div class="flex items-center"><i class="fas fa-calendar-alt mr-2"></i><span>Quand ? Des que vous vous sentez prete</span></div>
                <div class="mt-4"><p>A savoir : En cas de cesarienne, attendre 6 a 8 semaines</p><p>Ce soin est une belle idee cadeau pour une jeune maman !</p></div>
            `,
            images: [
                'https://lh3.googleusercontent.com/p/AF1QipNNMqSLFGTiL92Wg1fhEak-1kwRffXi1x1HX1gg=s680-w680-h510-rw',
                'https://lh3.googleusercontent.com/p/AF1QipMK0kdlW0gGo4US7J07_hBgQY-sEdrGkp9u7uNa=s680-w680-h510-rw',
                'https://lh3.googleusercontent.com/p/AF1QipNZU9aSheum1wsBKqrFEW7LqmCsIjjFsFvWoFU3=s680-w680-h510-rw',
                'https://lh3.googleusercontent.com/p/AF1QipON1YaVYMtmmux7BAzB4Pf_ejn4CafiYDdrqU7P=s680-w680-h510-rw'
            ]
        },
        'atelier_massage_bebe': {
            title: 'Atelier Massage Bebe',
            description: 'Atelier Massage Bebe\n\nUn moment de lien, d\'apprentissage et de bien-etre partage.\n\nLe massage bebe est un moment d\'echange, de connexion et d\'amour. Il aide bebe a se detendre, a mieux dormir, a soulager les petits maux (coliques, constipation...), et a renforcer le lien d\'attachement avec le(s) parent(s).\n\nAu cours de cet atelier, je vous accompagne pour apprendre des gestes simples, que vous pourrez reproduire en toute autonomie a la maison.',
            benefits: [
                'Favorise la detente et le sommeil de bebe',
                'Soulage les petits maux (coliques, constipation)',
                'Renforce le lien parent-enfant',
                'Ameliore la communication non verbale',
                'Aide a comprendre les signaux de bebe',
                'Cree un rituel apaisant pour le quotidien',
                'Donne confiance dans les competences parentales',
                'Offre un moment de complicite unique'
            ],
            details: `
                <div class="flex items-center"><i class="fas fa-calendar-alt mr-2"></i><span>Quand ? A partir d'1 mois</span></div>
                <div class="flex items-center"><i class="fas fa-clock mr-2"></i><span>Duree : Environ 1h</span></div>
                <div class="flex items-center"><i class="fas fa-euro-sign mr-2"></i><span>Tarif : 80EUR</span></div>
                <div class="flex items-center"><i class="fas fa-map-marker-alt mr-2"></i><span>Ou ? A l'institut Bulleo</span></div>
                <div class="flex items-center"><i class="fas fa-tshirt mr-2"></i><span>A prevoir : Une serviette pour bebe et son huile habituelle (si vous en avez une)</span></div>
                <div class="mt-4"><p>Atelier avec les deux parents (vivement recommande)</p></div>
            `,
            images: [
                'https://lh3.googleusercontent.com/p/AF1QipPuPP7Io5G9Wqxbqk-SmF5p81uVJljFahSUm4mk=s680-w680-h510-rw',
                'https://lh3.googleusercontent.com/p/AF1QipPF_FFe4dLlFocO7ekpVRGunY6p00sJMRUIeUj7=s680-w680-h510-rw',
                'https://lh3.googleusercontent.com/p/AF1QipNSZItzftpwp64YZqxBoat6pIccz4mAt7_ruDt-=s680-w680-h510-rw',
                'https://lh3.googleusercontent.com/p/AF1QipPUFgs8xp78WQ_ceTPzfl2lY5M4wHyqbD3DgtZL=s680-w680-h510-rw'
            ]
        },
        'soin_rebozo': {
            title: 'Soin Rebozo',
            description: 'Soin Rebozo\n\nUn rituel feminin pour refermer un chapitre et s\'ouvrir a un nouveau.\n\nLe soin Rebozo est un rituel ancestral mexicain, transmis de femme a femme, pour honorer les passages importants de la vie : naissance, fausse couche, deuil, separation, changement, transformation.\n\nIl offre un temps de recentrage, de retour a soi, et aide a reintegrer son corps apres des evenements marquants.',
            benefits: [
                'Honore les transitions importantes de la vie',
                'Aide a reintegrer son corps apres un evenement marquant',
                'Offre un temps de recentrage profond',
                'Cree un espace sacre pour la transformation',
                'Soutient emotionnellement lors des passages difficiles',
                'Aide a fermer symboliquement un chapitre',
                'Favorise l\'ouverture a un nouveau depart',
                'Rituel ancestral transmis de femme a femme'
            ],
            details: `
                <div class="flex items-center"><i class="fas fa-calendar-alt mr-2"></i><span>Quand ? A tout moment de la vie (6 a 8 semaines apres cesarienne)</span></div>
                <div class="flex items-center"><i class="fas fa-clock mr-2"></i><span>Duree : Environ 1h</span></div>
                <div class="flex items-center"><i class="fas fa-euro-sign mr-2"></i><span>Tarif : 90EUR</span></div>
                <div class="flex items-center"><i class="fas fa-map-marker-alt mr-2"></i><span>Ou ? A l'institut Bulleo</span></div>
                <div class="flex items-center"><i class="fas fa-tshirt mr-2"></i><span>A prevoir : Tenue souple et chaude</span></div>
            `,
            images: [
                'https://lh3.googleusercontent.com/p/AF1QipNNMqSLFGTiL92Wg1fhEak-1kwRffXi1x1HX1gg=s680-w680-h510-rw',
                'https://lh3.googleusercontent.com/p/AF1QipMEUa-O-RGbXH7FLCJfruyY3zAUt3oTi-6a1hFv=s680-w680-h510-rw',
                'https://lh3.googleusercontent.com/p/AF1QipPcLCOV3fgvqlFOnOvEQsctxKMDUW5Z5NHoBsrt=s680-w680-h510-rw',
                'https://lh3.googleusercontent.com/p/AF1QipP_sP-MzwYQoPyBFsaLCEHsTpQbwYkgnn3YZo0C=s680-w680-h510-rw',
                'https://lh3.googleusercontent.com/p/AF1QipM3KujVuEXT7bvG9mHLe5k0U-43R8XQYCoTpF4I=s680-w680-h510-rw',
                'https://lh3.googleusercontent.com/p/AF1QipPYVPlZi87NMUCB2ODEw8AH9vI5S0s2c-gzKHPH=s680-w680-h510-rw'
            ]
        },
        'reflexologie': {
            title: 'Reflexologie Plantaire Obstetrique',
            description: 'Reflexologie Plantaire Obstetrique\n\nUn soin naturel pour accompagner le corps dans chaque etape de la maternite.\n\nLa reflexologie plantaire est une methode douce qui stimule les zones reflexes du pied pour soutenir les differents organes et systemes du corps. En version obstetrique, elle permet d\'accompagner les femmes dans leur parcours de fertilite, leur grossesse, leur post-partum, et bien plus encore.',
            benefits: [
                'Accompagnement FIV / PMA',
                'Preparation a la conception',
                'Troubles hormonaux, libido',
                'Preparation a l\'accouchement',
                'Baby blues, fatigue, allaitement',
                'Cesarienne / accouchement difficile',
                'Troubles digestifs, regles douloureuses'
            ],
            details: `
                <div class="flex items-center"><i class="fas fa-calendar-alt mr-2"></i><span>Quand ? A tout moment</span></div>
                <div class="flex items-center"><i class="fas fa-clock mr-2"></i><span>Duree : Environ 45 min</span></div>
                <div class="flex items-center"><i class="fas fa-euro-sign mr-2"></i><span>Tarif : 50EUR</span></div>
                <div class="flex items-center"><i class="fas fa-map-marker-alt mr-2"></i><span>Ou ? A l'institut Bulleo</span></div>
                <div class="flex items-center"><i class="fas fa-info-circle mr-2"></i><span>A prevoir : Rien de particulier, venez comme vous etes</span></div>
            `,
            images: [
                'https://middleware.lecoledubiennaitre.com/storage/formations/rloN087qVb8EMElRaZZTJSWMXJhopiJeD1oYVsCD.png',
                'https://lh3.googleusercontent.com/p/AF1QipP_kuTpo4OTXyTOZr5ifKRtjBzrKVlipdXulaZQ=s680-w680-h510-rw',
                'https://lh3.googleusercontent.com/p/AF1QipOh2ynwhlDWwFHCdImIgG2A9ipfitAGJCA_q3yp=s680-w680-h510-rw',
                'https://lh3.googleusercontent.com/p/AF1QipMBuTMDzu8EdjS322P_hR3kPcV8HTM_kvauxYYh=s680-w680-h510-rw'
            ]
        },
        'massage_bebe_enfant': {
            title: 'Massage bebe & enfant',
            description: 'Un moment de tendresse, de calme et de connexion profonde.\n\nLe massage bebe et enfant est un soin tout en douceur, pense pour apporter detente, securite et bien-etre.\nIl favorise le lien parent-enfant, soutient le developpement corporel et emotionnel, et apaise les petits inconforts du quotidien (coliques, tensions, agitation...).',
            benefits: [
                'Soulage les coliques et troubles digestifs',
                'Favorise l\'endormissement et la detente',
                'Renforce le sentiment de securite',
                'Apaise l\'agitation et l\'anxiete',
                'Aide a la concentration',
                'Renforce la confiance en soi',
                'Cree un moment privilegie parent-enfant'
            ],
            details: `
                <div class="flex items-center"><i class="fas fa-calendar-alt mr-2"></i><span>Quand ? Des 1 mois jusqu'a 7-8 ans</span></div>
                <div class="flex items-center"><i class="fas fa-clock mr-2"></i><span>Duree : 30 min</span></div>
                <div class="flex items-center"><i class="fas fa-euro-sign mr-2"></i><span>Tarif : 55EUR</span></div>
                <div class="flex items-center"><i class="fas fa-map-marker-alt mr-2"></i><span>Ou ? A l'institut Bulleo</span></div>
                <div class="flex items-center"><i class="fas fa-child mr-2"></i><span>Participation du parent possible</span></div>
            `,
            images: [
                'https://lh3.googleusercontent.com/p/AF1QipNSZItzftpwp64YZqxBoat6pIccz4mAt7_ruDt-=s680-w680-h510-rw',
                'https://lh3.googleusercontent.com/p/AF1QipPuPP7Io5G9Wqxbqk-SmF5p81uVJljFahSUm4mk=s680-w680-h510-rw',
                'https://lh3.googleusercontent.com/p/AF1QipNqr01eBp4ihJH45C0wF4yu_D_zOaXS2qAHd_Gg=s680-w680-h510-rw',
                'https://lh3.googleusercontent.com/p/AF1QipPF_FFe4dLlFocO7ekpVRGunY6p00sJMRUIeUj7=s680-w680-h510-rw'
            ]
        },
        'reflexologie_pediatrique': {
            title: 'Reflexologie plantaire Pediatrique',
            description: 'Reflexologie plantaire Pediatrique\n\nApprenez a soulager les petits maux du quotidien, avec vos mains, en toute simplicite.\n\nLa reflexologie plantaire pediatrique est une methode douce, naturelle et efficace qui stimule des zones reflexes sous les pieds, en lien avec differents systemes du corps.\n\nLors de cet atelier, vous apprendrez des gestes simples pour soulager votre enfant a la maison, des les premiers signes d\'inconfort.',
            benefits: [
                'Soulage les coliques et troubles digestifs',
                'Apaise les reflux gastriques',
                'Soutient en cas d\'infections ORL',
                'Accompagne les poussees dentaires',
                'Aide a reguler le sommeil et le stress',
                'Soutien pour troubles cutanes et respiratoires',
                'Utile pour troubles alimentaires',
                'Donne des outils concrets aux parents'
            ],
            details: `
                <div class="flex items-center"><i class="fas fa-calendar-alt mr-2"></i><span>Quand ? Des la naissance et tout au long de l'enfance</span></div>
                <div class="flex items-center"><i class="fas fa-clock mr-2"></i><span>Duree : environ 45 min</span></div>
                <div class="flex items-center"><i class="fas fa-euro-sign mr-2"></i><span>Tarif : 50EUR</span></div>
                <div class="flex items-center"><i class="fas fa-map-marker-alt mr-2"></i><span>Ou ? A l'institut Bulleo</span></div>
                <div class="flex items-center"><i class="fas fa-child mr-2"></i><span>Participation de l'enfant possible selon age</span></div>
            `,
            images: [
                'https://lh3.googleusercontent.com/p/AF1QipPF_FFe4dLlFocO7ekpVRGunY6p00sJMRUIeUj7=s680-w680-h510-rw',
                'https://lh3.googleusercontent.com/p/AF1QipNSZItzftpwp64YZqxBoat6pIccz4mAt7_ruDt-=s680-w680-h510-rw'
            ]
        },
        'agenda_maman': {
            title: 'Agenda: Ma premiere annee de maman',
            description: '« Ma premiere annee de maman » est un agenda non date, pense avec tendresse pour accompagner les mamans dans cette aventure unique et bouleversante.\n\nIl vous aide a organiser vos journees, a suivre les grands moments de bebe, et surtout a garder precieusement tous ces petits instants de bonheur.',
            benefits: [
                'Conseils et etapes cles mois par mois',
                'Espace intime pour vos emotions et souvenirs',
                'Pages photos pour immortaliser les moments',
                'Planning et to-do lists organisees',
                'Format pratique a transporter',
                'Non date - a commencer quand vous voulez',
                'Cadeau parfait pour une nouvelle maman',
                'Tresor de souvenirs a conserver'
            ],
            details: `
                <div class="flex items-center"><i class="fas fa-book mr-2"></i><span>Format : Agenda papier non date</span></div>
                <div class="flex items-center"><i class="fas fa-euro-sign mr-2"></i><span>Prix : 31,80 EUR (frais d'envoi inclus)</span></div>
                <div class="flex items-center"><i class="fas fa-shipping-fast mr-2"></i><span>Livraison : Par courrier postal</span></div>
                <div class="flex items-center"><i class="fas fa-heart mr-2"></i><span>Ideal comme cadeau de naissance ou baby shower</span></div>
                <div class="flex items-center"><i class="fas fa-calendar-alt mr-2"></i><span>A commencer quand vous le souhaitez</span></div>
            `,
            images: [
                'https://lh3.googleusercontent.com/p/AF1QipPfb2mVZYLIUzvSjuzNjjqSBJ6E6mPbdIn4_3NN=s680-w680-h510-rw',
                'https://lh3.googleusercontent.com/p/AF1QipPF_FFe4dLlFocO7ekpVRGunY6p00sJMRUIeUj7=s680-w680-h510-rw'
            ]
        },
        'atelier_motricite': {
            title: 'Atelier de Motricite & Eveil sensoriel (3 mois - 3 ans)',
            description: 'Offrez a votre enfant un moment unique pour bouger, explorer et s\'epanouir a son rythme dans un cadre doux, securise et stimulant.\n\nNos ateliers de motricite sont concus pour accompagner les tout-petits dans leur developpement moteur et sensoriel. A travers des parcours adaptes, des jeux d\'eveil et des temps d\'observation, votre enfant developpe sa coordination, sa curiosite, son autonomie... tout en partageant un moment complice avec vous.',
            benefits: [
                'Developpement de la coordination motrice',
                'Stimulation sensorielle adaptee',
                'Developpement de la curiosite et autonomie',
                'Moment privilegie parent-enfant',
                'Parcours adaptes a chaque age',
                'Petit groupe pour suivi personnalise',
                'Cadre securise et stimulant',
                'Observation bienveillante du developpement'
            ],
            details: `
                <div class="flex items-center"><i class="fas fa-child mr-2"></i><span>Age : 3 mois a 3 ans (avec un parent)</span></div>
                <div class="flex items-center"><i class="fas fa-euro-sign mr-2"></i><span>Tarif : 16EUR la seance</span></div>
                <div class="flex items-center"><i class="fas fa-calendar-alt mr-2"></i><span>Frequence : 1er mercredi + 1 samedi par mois</span></div>
                <div class="flex items-center"><i class="fas fa-map-marker-alt mr-2"></i><span>Lieu : Borne 47, Horgues (5 bis rue du Pic du Midi)</span></div>
                <div class="flex items-center"><i class="fas fa-phone mr-2"></i><span>Reservation obligatoire</span></div>
                <div class="flex items-center"><i class="fas fa-users mr-2"></i><span>Petit groupe pour un suivi personnalise</span></div>
            `,
            images: [
                'https://lh3.googleusercontent.com/p/AF1QipPp2Fol0oA7_VSNVbSv4-_I4a2E0_e-nVFajitj=s680-w680-h510-rw',
                'https://lh3.googleusercontent.com/p/AF1QipMCReqFjtvvMLwti3MxWc-KViQz6Ii5UlerDND3=s680-w680-h510-rw'
            ]
        }
    };

    return services[serviceId] || services['massage_prenatal'];
}

// ============================================
// TABS
// ============================================
function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });

    document.getElementById(`${tabName}-tab`).classList.add('active');
    document.querySelector(`.tab[onclick="switchTab('${tabName}')"]`).classList.add('active');
}

// ============================================
// PARALLAX
// ============================================
function initParallax() {
    if (window.innerWidth <= 768 || 'ontouchstart' in window) return;
    window.addEventListener('scroll', function() {
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(element => {
            const scrollPosition = window.pageYOffset;
            element.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }, { passive: true });
}

// ============================================
// FORM HANDLING
// ============================================
function initActionSelect() {
    const actionSelect = document.getElementById('actionSelect');
    const recipientSection = document.getElementById('recipientSection');
    const recipientName = document.getElementById('recipientName');
    const bookingDateSection = document.getElementById('bookingDateSection');
    const bookingTimeSection = document.getElementById('bookingTimeSection');
    const variantSection = document.getElementById('variantSection');
    const variantSelect = document.getElementById('variantSelect');
    const bookingDate = document.getElementById('bookingDate');
    const bookingTime = document.getElementById('bookingTime');
    const shippingAddressSection = document.getElementById('shippingAddressSection');
    const shippingAddress = document.getElementById('shippingAddress');
    const actionType = document.getElementById('actionType');
    const bookingForm = document.getElementById('bookingForm');

    if (bookingDate) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        bookingDate.min = tomorrow.toISOString().split('T')[0];
    }

    if (actionSelect) {
        actionSelect.addEventListener('change', function() {
            const selectedValue = this.value;
            const subjectInput = bookingForm.querySelector('input[name="_subject"]');
            const stripeButtonContainer = document.getElementById('stripeButtonContainer');
            const paymentTitle = document.getElementById('paymentTitle');
            const paymentDescription = document.getElementById('paymentDescription');

            const serviceName = document.getElementById('selectedService').value;
            const hasVariants = ['Massage Prenatal', 'Massage Postnatal', 'Bain Enveloppe', 'Soin Rebozo'].includes(serviceName);
            const requiresShipping = serviceName === 'Agenda: Ma premiere annee de maman';

            if (selectedValue.startsWith('gift_')) {
                recipientSection.style.display = 'block';
                recipientName.setAttribute('required', 'required');

                if (requiresShipping) {
                    bookingDateSection.style.display = 'none';
                    bookingTimeSection.style.display = 'none';
                    shippingAddressSection.style.display = 'block';
                    shippingAddress.setAttribute('required', 'required');
                    bookingDate.removeAttribute('required');
                    bookingTime.removeAttribute('required');
                } else {
                    bookingDateSection.style.display = 'none';
                    bookingTimeSection.style.display = 'none';
                    shippingAddressSection.style.display = 'none';
                    shippingAddress.removeAttribute('required');
                    bookingDate.removeAttribute('required');
                    bookingTime.removeAttribute('required');
                }

                stripeButtonContainer.style.display = 'block';
                variantSection.style.display = hasVariants ? 'block' : 'none';
                if (hasVariants) variantSelect.setAttribute('required', 'required');
                actionType.value = 'gift';

                paymentTitle.textContent = 'Bon cadeau avec paiement en ligne';
                paymentDescription.innerHTML = 'Pour finaliser votre commande de bon cadeau, vous devrez effectuer le paiement securise via Stripe.<br><br><strong>Les cartes cadeaux vous seront envoyees par mail dans les 48 heures.</strong>';

                subjectInput.value = 'Bulleo - Nouvelle commande de bon cadeau';
            } else if (selectedValue.startsWith('booking_')) {
                recipientSection.style.display = 'none';
                recipientName.removeAttribute('required');

                if (requiresShipping) {
                    bookingDateSection.style.display = 'none';
                    bookingTimeSection.style.display = 'none';
                    shippingAddressSection.style.display = 'block';
                    shippingAddress.setAttribute('required', 'required');
                    bookingDate.removeAttribute('required');
                    bookingTime.removeAttribute('required');
                } else {
                    bookingDateSection.style.display = 'block';
                    bookingTimeSection.style.display = 'block';
                    shippingAddressSection.style.display = 'none';
                    shippingAddress.removeAttribute('required');
                    bookingDate.setAttribute('required', 'required');
                    bookingTime.setAttribute('required', 'required');
                }

                stripeButtonContainer.style.display = 'block';
                variantSection.style.display = hasVariants ? 'block' : 'none';
                if (hasVariants) variantSelect.setAttribute('required', 'required');
                actionType.value = 'booking';

                if (requiresShipping) {
                    paymentTitle.textContent = 'Commande avec paiement en ligne';
                    paymentDescription.textContent = 'Pour finaliser votre commande, vous devrez effectuer le paiement securise via Stripe.';
                    subjectInput.value = 'Bulleo - Nouvelle commande';
                } else {
                    paymentTitle.textContent = 'Reservation avec paiement en ligne';
                    paymentDescription.textContent = 'Pour finaliser votre reservation, vous devrez effectuer le paiement securise via Stripe.';
                    subjectInput.value = 'Bulleo - Nouvelle demande de rendez-vous';
                }
            } else {
                recipientSection.style.display = 'none';
                recipientName.removeAttribute('required');
                bookingDateSection.style.display = 'none';
                bookingTimeSection.style.display = 'none';
                shippingAddressSection.style.display = 'none';
                shippingAddress.removeAttribute('required');
                stripeButtonContainer.style.display = 'none';
                variantSection.style.display = 'none';
                variantSelect.removeAttribute('required');
                bookingDate.removeAttribute('required');
                bookingTime.removeAttribute('required');
                actionType.value = '';
                subjectInput.value = 'Bulleo - Nouvelle demande';
            }
        });
    }
}

function checkBookingParam() {
    const urlParams = new URLSearchParams(window.location.search);
    const bookService = urlParams.get('book');
    const giftService = urlParams.get('gift');

    if (bookService && typeof openBookingModal === 'function') {
        // Map URL param to service name
        const serviceMap = {
            'massage-prenatal': 'Massage Prenatal',
            'massage-postnatal': 'Massage Postnatal',
            'bain-enveloppe': 'Bain Enveloppe',
            'soin-rebozo': 'Soin Rebozo',
            'reflexologie': 'Reflexologie Plantaire Obstetrique',
            'atelier-massage-bebe': 'Atelier Massage Bebe',
            'atelier-motricite': 'Atelier Motricite & Eveil sensoriel',
            'massage-bebe-enfant': 'Massage bebe & enfant',
            'soin-postnatal-complet': 'Soin postnatal complet - Massage & Rebozo',
            'reflexologie-pediatrique': 'Reflexologie plantaire Pediatrique',
            'agenda': 'Agenda: Ma premiere annee de maman'
        };

        const serviceName = serviceMap[bookService] || bookService;
        setTimeout(() => openBookingModal(serviceName), 500);

        // Clean URL
        const cleanUrl = window.location.origin + window.location.pathname;
        history.replaceState({}, document.title, cleanUrl);
    }

    if (giftService && typeof openBookingModal === 'function') {
        const serviceMap = {
            'massage-prenatal': 'Massage Prenatal',
            'massage-postnatal': 'Massage Postnatal',
            'bain-enveloppe': 'Bain Enveloppe',
            'soin-rebozo': 'Soin Rebozo',
            'reflexologie': 'Reflexologie Plantaire Obstetrique',
            'atelier-massage-bebe': 'Atelier Massage Bebe',
            'atelier-motricite': 'Atelier Motricite & Eveil sensoriel',
            'massage-bebe-enfant': 'Massage bebe & enfant',
            'soin-postnatal-complet': 'Soin postnatal complet - Massage & Rebozo',
            'reflexologie-pediatrique': 'Reflexologie plantaire Pediatrique',
            'agenda': 'Agenda: Ma premiere annee de maman'
        };

        const serviceName = serviceMap[giftService] || giftService;
        setTimeout(() => {
            openBookingModal(serviceName);
            // Select gift option after modal opens
            setTimeout(() => {
                const actionSelect = document.getElementById('actionSelect');
                if (actionSelect) {
                    actionSelect.value = 'gift_' + serviceName;
                    actionSelect.dispatchEvent(new Event('change'));
                }
            }, 100);
        }, 500);

        const cleanUrl = window.location.origin + window.location.pathname;
        history.replaceState({}, document.title, cleanUrl);
    }
}

function checkStripeReturn() {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get('payment');
    const actionType = urlParams.get('action');

    if (paymentStatus === 'success' && actionType) {
        window.formspreeActionType = actionType;

        if (window.bookingFormData) {
            sendFormspreeData();
        }

        const cleanUrl = window.location.origin + window.location.pathname;
        history.replaceState({}, document.title, cleanUrl);

    } else if (paymentStatus === 'cancelled') {

        alert('Paiement annule. Vous pouvez reprendre votre reservation quand vous le souhaitez.');

        const cleanUrl = window.location.origin + window.location.pathname;
        history.replaceState({}, document.title, cleanUrl);
    }
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initMobileMenu();
    initHeaderScroll();
    initSmoothScroll();
    initModalClose();
    initParallax();
    initActionSelect();
    initGalleryKeyboard();
    generateGallery();

    // Initialize Stripe
    initializeStripe().then(() => {}).catch(error => {
        console.error('Erreur lors de l\'initialisation de Stripe:', error);
    });

    // Check Stripe return
    checkStripeReturn();

    // Check for booking/gift URL params
    checkBookingParam();

    // Auto-save form data
    const formInputs = document.querySelectorAll('#bookingForm input, #bookingForm select, #bookingForm textarea');
    formInputs.forEach(input => {
        input.addEventListener('change', function() {
            window.bookingFormData = new FormData(document.getElementById('bookingForm'));
        });
    });

    // Handle confirmation after Formspree submission
    const confirmationParam = new URLSearchParams(window.location.search).get('confirmation');
    if (confirmationParam === 'sent') {
        // Show confirmation message
        setTimeout(() => {
            const msg = document.createElement('div');
            msg.style.cssText = 'position:fixed;top:0;left:0;width:100%;background:linear-gradient(135deg,#5a4a42,#7a6a62);color:white;text-align:center;padding:20px;z-index:10000;font-family:Poppins,sans-serif;box-shadow:0 4px 15px rgba(0,0,0,0.3);';
            msg.innerHTML = '<div style="max-width:600px;margin:0 auto;"><p style="font-size:1.2rem;margin:0 0 5px;">\u2713 Votre demande a bien \u00e9t\u00e9 enregistr\u00e9e !</p><p style="font-size:0.9rem;margin:0;opacity:0.9;">Vous recevrez un email de confirmation sous peu.</p></div><button onclick="this.parentElement.remove()" style="position:absolute;top:10px;right:15px;background:none;border:none;color:white;font-size:1.5rem;cursor:pointer;">\u00d7</button>';
            document.body.prepend(msg);
            // Auto-dismiss after 8 seconds
            setTimeout(() => { if (msg.parentElement) msg.remove(); }, 8000);
        }, 500);
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Formspree confirmation message (legacy: referrer-based check)
    if (window.location.hash === '#contact' && document.referrer.includes('formspree.io')) {
        showMessage('Votre message a ete envoye avec succes ! Nous vous contacterons tres rapidement.', 'success');
    }
});

// Loader events
window.addEventListener('load', function() {
    setTimeout(hideLoader, 1500);
});

// Fallback for loader
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        const loader = document.querySelector('.loader');
        if (loader && loader.style.display !== 'none') {
            hideLoader();
        }
    }, 3000);
});

// ============================================
// FAQ TOGGLE
// ============================================
function toggleFAQ(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('i');

    content.classList.toggle('hidden');
    icon.classList.toggle('fa-chevron-down');
    icon.classList.toggle('fa-chevron-up');
}
