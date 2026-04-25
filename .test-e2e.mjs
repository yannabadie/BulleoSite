import { chromium } from 'playwright';

const URL = 'https://bulleo-soins.com/?_=' + Date.now();
const findings = [];
const log = (level, msg) => { findings.push({ level, msg }); console.log(`[${level}] ${msg}`); };

async function run() {
  const browser = await chromium.launch({ headless: true });
  const consoleErrors = [];

  // ============= DESKTOP =============
  console.log('\n=== DESKTOP 1280x800 ===\n');
  const ctxDesk = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctxDesk.newPage();
  // Filtre les erreurs : on ignore les blocages cross-origin de tiers (Calendly, Stripe, GTM, fonts)
  const isOurError = (msg) => {
    const ignored = ['ERR_BLOCKED_BY_RESPONSE', 'NotSameOrigin', 'calendly', 'stripe', 'googletagmanager', 'gstatic', 'fonts.googleapis', 'cdnjs.cloudflare', 'termsfeed', 'fbcdn'];
    return !ignored.some(s => msg.toLowerCase().includes(s.toLowerCase()));
  };
  page.on('pageerror', e => { if (isOurError(e.message)) consoleErrors.push('pageerror: ' + e.message); });
  page.on('console', m => { if (m.type() === 'error' && isOurError(m.text())) consoleErrors.push('console.error: ' + m.text()); });

  await page.goto(URL, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(800);

  // Dismiss TermsFeed cookie consent (intercepts clicks)
  const cookieReject = page.locator('button.cc-nb-reject');
  if (await cookieReject.count() > 0) {
    try { await cookieReject.click({ timeout: 3000 }); await page.waitForTimeout(400); log('OK', 'Cookie consent fermé'); }
    catch { log('WARN', 'Cookie consent non fermable'); }
  }

  // 1. Hero stat "1002"
  const stat1002 = await page.locator('.hero-asym-stats .num').filter({ hasText: '1002' }).count();
  if (stat1002 === 1) log('OK', 'Hero stat "1002" présent');
  else log('FAIL', 'Hero stat "1002" absent (count=' + stat1002 + ')');

  // 2. CTA "Offrir un soin" → href="#cadeaux"
  const offrirCta = page.locator('a.btn-gold-v2', { hasText: 'Offrir un soin' });
  const offrirHref = await offrirCta.getAttribute('href');
  if (offrirHref === '#cadeaux') log('OK', 'CTA "Offrir un soin" → href=' + offrirHref);
  else log('FAIL', 'CTA "Offrir un soin" mauvais href: ' + offrirHref);

  // 3. Click CTA → scroll vers #cadeaux (vérifie que la section entre dans le viewport)
  const initialScrollY = await page.evaluate(() => window.scrollY);
  await offrirCta.click();
  await page.waitForTimeout(1200);
  const scrollData = await page.evaluate(() => {
    const s = document.getElementById('cadeaux');
    return { top: s ? s.getBoundingClientRect().top : null, scrollY: window.scrollY, vh: window.innerHeight };
  });
  // Le scroll a-t-il avancé ? Et la section est-elle dans la viewport ?
  const sectionInView = scrollData.top !== null && scrollData.top < scrollData.vh && scrollData.top > -200;
  if (scrollData.scrollY > initialScrollY && sectionInView) {
    log('OK', 'Scroll vers #cadeaux: scrollY ' + initialScrollY + '→' + scrollData.scrollY + ', section top=' + scrollData.top.toFixed(0) + 'px (visible)');
  } else {
    log('FAIL', 'Scroll vers #cadeaux échoué (scrollY=' + scrollData.scrollY + ', top=' + scrollData.top + ', vh=' + scrollData.vh + ')');
  }

  // 4. Click sur "Massage Prénatal" Offrir card → modal s'ouvre
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  // Trouver une carte de gift section
  const massageCard = page.locator('#cadeaux div.card-v2').filter({ hasText: 'Massage Prénatal' }).first();
  await massageCard.scrollIntoViewIfNeeded();
  await massageCard.click();
  await page.waitForTimeout(600);
  const modalActive = await page.locator('#giftModal.active').count();
  if (modalActive === 1) log('OK', 'Modal Offrir s\'ouvre au clic carte Massage Prénatal');
  else log('FAIL', 'Modal Offrir ne s\'ouvre pas');

  // 5. Vérifier titre modal
  const modalTitle = await page.locator('[data-gift-title]').textContent();
  if (modalTitle && modalTitle.includes('Massage Prenatal')) log('OK', 'Titre modal: "' + modalTitle.trim() + '"');
  else log('FAIL', 'Titre modal incorrect: ' + modalTitle);

  // 6. Vérifier chips présentes (4 formules pour Massage Prénatal)
  const chipsCount = await page.locator('[data-gift-variants] .gift-chip').count();
  if (chipsCount >= 3) log('OK', chipsCount + ' chips formules rendues');
  else log('FAIL', 'Chips formules manquantes (count=' + chipsCount + ')');

  // 7. Vérifier qu'une chip est active par défaut
  const activeChip = await page.locator('[data-gift-variants] .gift-chip.active').count();
  if (activeChip === 1) log('OK', 'Une chip active par défaut');
  else log('FAIL', 'Pas de chip active par défaut (count=' + activeChip + ')');

  // 8. Prix initial affiché
  const initialAmount = await page.locator('[data-gift-amount]').first().textContent();
  log('INFO', 'Montant initial affiché: "' + initialAmount + '"');

  // 9. Cliquer sur la 2ème chip → prix change
  const chips = page.locator('[data-gift-variants] .gift-chip');
  const chip2Count = await chips.count();
  if (chip2Count >= 2) {
    await chips.nth(1).click();
    await page.waitForTimeout(200);
    const newAmount = await page.locator('[data-gift-amount]').first().textContent();
    if (newAmount !== initialAmount) log('OK', 'Prix mis à jour au clic chip: "' + initialAmount + '" → "' + newAmount + '"');
    else log('FAIL', 'Prix inchangé après clic chip 2 (toujours "' + newAmount + '")');
  }

  // 10. Toggle "Pour moi" → champ destinataire caché
  await page.locator('[data-gift-type-self]').click();
  await page.waitForTimeout(200);
  const recipientHidden = await page.evaluate(() => {
    const card = document.querySelector('.gift-modal-v3');
    return card && card.classList.contains('gift-mode-self');
  });
  const toDisplay = await page.locator('[data-gift-to-display]').textContent();
  if (recipientHidden && toDisplay.includes('pour vous')) log('OK', 'Toggle "Pour moi" cache destinataire + reset visuel ("' + toDisplay.trim() + '")');
  else log('FAIL', 'Toggle "Pour moi" mal configuré (hidden=' + recipientHidden + ', display="' + toDisplay + '")');

  // 11. Toggle "Pour offrir" back
  await page.locator('[data-gift-type-gift]').click();
  await page.waitForTimeout(200);
  const recipientShown = await page.evaluate(() => {
    const card = document.querySelector('.gift-modal-v3');
    return card && !card.classList.contains('gift-mode-self');
  });
  if (recipientShown) log('OK', 'Toggle "Pour offrir" remontre destinataire');
  else log('FAIL', 'Toggle "Pour offrir" ne remontre pas destinataire');

  // 12. Validation : tenter submit avec champs vides → erreur inline sur le 1er champ
  const submitBtn = page.locator('.gift-cta-btn');
  await submitBtn.click();
  await page.waitForTimeout(500);
  const fieldErrors = await page.locator('#giftModal .field-error').count();
  const firstErrorText = fieldErrors > 0 ? await page.locator('#giftModal .field-error').first().textContent() : '';
  if (fieldErrors > 0) {
    log('OK', 'Validation inline déclenchée (' + fieldErrors + ' erreur, 1ère: "' + firstErrorText.trim() + '")');
  } else {
    log('FAIL', 'Aucune erreur inline sur submit avec champs vides');
  }

  // 13a. Happy path: remplir le formulaire et vérifier que handleGiftPayment ne return pas false
  await page.locator('[data-gift-name]').fill('Marie Dupont');
  await page.locator('[data-gift-email]').fill('marie@example.com');
  await page.locator('[data-gift-phone]').fill('0612345678');
  await page.locator('[data-gift-recipient]').fill('Sophie Martin');
  // Stub redirectToStripeCheckout pour intercepter le Price ID
  const interceptedPriceId = await page.evaluate(() => {
    return new Promise((resolve) => {
      window.__lastPriceId = null;
      const original = window.redirectToStripeCheckout;
      window.redirectToStripeCheckout = function(priceId) { window.__lastPriceId = priceId; resolve(priceId); };
      const result = window.handleGiftPayment();
      setTimeout(() => resolve(window.__lastPriceId), 800);
    });
  });
  if (interceptedPriceId && interceptedPriceId.startsWith('price_')) {
    log('OK', 'Happy path: handleGiftPayment → Stripe Price ID = ' + interceptedPriceId);
  } else {
    log('FAIL', 'Happy path: aucun Price ID intercepté (got=' + interceptedPriceId + ')');
  }

  // 13b. Fermer modal via Escape
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);
  const modalAfterEsc = await page.locator('#giftModal.active').count();
  if (modalAfterEsc === 0) log('OK', 'Escape ferme le modal');
  else log('FAIL', 'Escape ne ferme pas le modal');

  // 13c. Bouton "Réserver" hero → openCalendlyPopup avec URL /soin-massage-drainage ou base
  // (on intercepte window.open et Calendly.initPopupWidget pour vérifier l'URL)
  const calendlyUrl = await page.evaluate(() => {
    return new Promise((resolve) => {
      let url = null;
      const origOpen = window.open;
      window.open = function(u) { url = u; resolve(u); return null; };
      window.Calendly = { initPopupWidget: function(opts) { url = opts.url; resolve(opts.url); } };
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Réserver un soin') && b.classList.contains('btn-dark-v2'));
      if (btn) btn.click();
      setTimeout(() => resolve(url), 600);
    });
  });
  if (calendlyUrl && calendlyUrl.includes('calendly.com')) {
    log('OK', 'Bouton "Réserver un soin" → ' + calendlyUrl);
  } else {
    log('FAIL', 'Bouton Réserver hero: pas d\'URL Calendly détectée (' + calendlyUrl + ')');
  }

  // 14. Filtre "Drainage" via chip
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  const drainageNavLink = page.locator('a.nav-link-v2', { hasText: 'Drainage' }).first();
  await drainageNavLink.click();
  await page.waitForTimeout(900);
  const activeFilter = await page.locator('.chips-row .chip.active').textContent();
  if (activeFilter && activeFilter.toLowerCase().includes('drainage')) {
    log('OK', 'Clic nav "Drainage" → filtre actif: "' + activeFilter.trim() + '"');
  } else {
    log('FAIL', 'Filtre "Drainage" pas activé après clic nav (chip active="' + activeFilter + '")');
  }
  // Vérifier qu'on a bien filtré (card-count visible)
  const visibleCards = await page.locator('.service-card:not(.hidden-by-filter)').count();
  log('INFO', 'Cartes visibles avec filtre Drainage: ' + visibleCards);

  // 14b. Test #grossesse — clic nav → filtre + scroll
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  const grossesseNav = page.locator('a.nav-link-v2', { hasText: 'Grossesse' }).first();
  await grossesseNav.click();
  await page.waitForTimeout(900);
  const grossesseFilter = await page.locator('.chips-row .chip.active').textContent();
  if (grossesseFilter && grossesseFilter.toLowerCase().includes('grossesse')) {
    log('OK', 'Clic nav "Grossesse" → filtre actif: "' + grossesseFilter.trim() + '"');
  } else {
    log('FAIL', 'Filtre Grossesse pas activé (chip="' + grossesseFilter + '")');
  }

  // 14c. Test #post-partum — clic nav → filtre
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  const ppNav = page.locator('a.nav-link-v2', { hasText: 'Post-partum' }).first();
  await ppNav.click();
  await page.waitForTimeout(900);
  const ppFilter = await page.locator('.chips-row .chip.active').textContent();
  if (ppFilter && ppFilter.toLowerCase().includes('post')) {
    log('OK', 'Clic nav "Post-partum" → filtre actif: "' + ppFilter.trim() + '"');
  } else {
    log('FAIL', 'Filtre Post-partum pas activé (chip="' + ppFilter + '")');
  }

  // 14d. Test #bebe — clic nav → filtre
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  const bebeNav = page.locator('a.nav-link-v2', { hasText: 'Bébé' }).first();
  await bebeNav.click();
  await page.waitForTimeout(900);
  const bebeFilter = await page.locator('.chips-row .chip.active').textContent();
  if (bebeFilter && bebeFilter.toLowerCase().includes('bébé')) {
    log('OK', 'Clic nav "Bébé" → filtre actif: "' + bebeFilter.trim() + '"');
  } else {
    log('FAIL', 'Filtre Bébé pas activé (chip="' + bebeFilter + '")');
  }

  // 14e. Test bouton "Réserver" sur carte Massage Prénatal → URL Calendly avec slug
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  const reserveCardUrl = await page.evaluate(() => {
    return new Promise((resolve) => {
      let url = null;
      window.open = function(u) { url = u; resolve(u); return null; };
      window.Calendly = { initPopupWidget: function(opts) { url = opts.url; resolve(opts.url); } };
      // Appel direct avec le bon nom de service (cf. service-card data)
      window.openCalendlyPopup('Massage Prenatal');
      setTimeout(() => resolve(url), 500);
    });
  });
  if (reserveCardUrl && reserveCardUrl.includes('massage-pre-post-natal')) {
    log('OK', 'Réserver Massage Prénatal → ' + reserveCardUrl);
  } else {
    log('FAIL', 'Réserver Massage Prénatal: URL incorrecte (' + reserveCardUrl + ')');
  }

  // 14f. Test bouton "Réserver" Drainage 1h
  const reserveDrainage1h = await page.evaluate(() => {
    return new Promise((resolve) => {
      let url = null;
      window.open = function(u) { url = u; resolve(u); return null; };
      window.Calendly = { initPopupWidget: function(opts) { url = opts.url; resolve(opts.url); } };
      window.openCalendlyPopup('Drainage Lymphatique Balinais 1h');
      setTimeout(() => resolve(url), 500);
    });
  });
  if (reserveDrainage1h && reserveDrainage1h.includes('drainage-lymphatique-balinais-2')) {
    log('OK', 'Réserver Drainage 1h → ' + reserveDrainage1h);
  } else {
    log('FAIL', 'Réserver Drainage 1h: URL incorrecte (' + reserveDrainage1h + ')');
  }

  // 14g. Test gift modal Agenda (centimes 31,80€)
  const agendaPriceTest = await page.evaluate(() => {
    return new Promise((resolve) => {
      window.openGiftModal('Agenda: Ma premiere annee de maman');
      setTimeout(() => {
        const amt = document.querySelector('[data-gift-amount]');
        const cta = document.querySelector('[data-gift-cta-amount]');
        resolve({ amount: amt?.textContent, cta: cta?.textContent });
        window.closeGiftModal();
      }, 600);
    });
  });
  if (agendaPriceTest.amount === '31,80' && agendaPriceTest.cta === '31,80') {
    log('OK', 'Agenda 31,80€ : centimes affichés correctement (amount="' + agendaPriceTest.amount + '")');
  } else {
    log('FAIL', 'Agenda centimes incorrects: amount="' + agendaPriceTest.amount + '" cta="' + agendaPriceTest.cta + '"');
  }
  await page.waitForTimeout(400);

  // 15. "En savoir plus" Drainage Lymphatique → page détail
  const drainageCardLink = page.locator('.service-card[data-cat="soin"] a.card-link', { hasText: 'En savoir plus' }).first();
  const drainageLinkHref = await drainageCardLink.getAttribute('href');
  if (drainageLinkHref && drainageLinkHref.includes('drainage-lymphatique')) {
    log('OK', '"En savoir plus" Drainage → ' + drainageLinkHref);
  } else {
    log('FAIL', '"En savoir plus" Drainage mauvais href: ' + drainageLinkHref);
  }

  // Erreurs JS pendant le parcours desktop ?
  if (consoleErrors.length === 0) log('OK', 'Aucune erreur JS sur desktop');
  else { consoleErrors.slice(0, 10).forEach(e => log('FAIL', 'JS error desktop: ' + e)); }

  await ctxDesk.close();

  // ============= MOBILE =============
  console.log('\n=== MOBILE 375x667 (iPhone SE) ===\n');
  const consoleErrorsM = [];
  const ctxMob = await browser.newContext({
    viewport: { width: 375, height: 667 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    isMobile: true,
    hasTouch: true,
  });
  const pm = await ctxMob.newPage();
  const isOurErrorM = (msg) => {
    const ignored = ['ERR_BLOCKED_BY_RESPONSE', 'NotSameOrigin', 'calendly', 'stripe', 'googletagmanager', 'gstatic', 'fonts.googleapis', 'cdnjs.cloudflare', 'termsfeed', 'fbcdn'];
    return !ignored.some(s => msg.toLowerCase().includes(s.toLowerCase()));
  };
  pm.on('pageerror', e => { if (isOurErrorM(e.message)) consoleErrorsM.push('pageerror: ' + e.message); });
  pm.on('console', m => { if (m.type() === 'error' && isOurErrorM(m.text())) consoleErrorsM.push('console.error: ' + m.text()); });
  await pm.goto(URL, { waitUntil: 'domcontentloaded' });
  await pm.waitForTimeout(800);

  const cookieRejectM = pm.locator('button.cc-nb-reject');
  if (await cookieRejectM.count() > 0) {
    try { await cookieRejectM.click({ timeout: 3000 }); await pm.waitForTimeout(400); }
    catch {}
  }

  // 1. Hamburger menu
  const burgerBtn = pm.locator('button[aria-label="Ouvrir le menu"]');
  await burgerBtn.click();
  await pm.waitForTimeout(500);
  const menuOpen = await pm.locator('#mobileMenu').evaluate(el => el.classList.contains('open') || getComputedStyle(el).transform.includes('matrix(1, 0, 0, 1, 0, 0)'));
  if (menuOpen) log('OK', 'Menu mobile s\'ouvre');
  else log('FAIL', 'Menu mobile ne s\'ouvre pas');

  // Fermer menu
  await pm.locator('button[aria-label="Fermer le menu"]').click();
  await pm.waitForTimeout(400);

  // 2. Open gift modal
  await pm.evaluate(() => {
    const c = document.getElementById('cadeaux');
    if (c) c.scrollIntoView();
  });
  await pm.waitForTimeout(400);
  const massCardM = pm.locator('#cadeaux div.card-v2').filter({ hasText: 'Massage Prénatal' }).first();
  await massCardM.click();
  await pm.waitForTimeout(700);
  const modalActiveM = await pm.locator('#giftModal.active').count();
  if (modalActiveM === 1) log('OK', 'Modal Offrir s\'ouvre sur mobile');
  else log('FAIL', 'Modal Offrir ne s\'ouvre pas sur mobile');

  // 3. CRITICAL: vérifier que le modal est SCROLLABLE (le bug iOS)
  const modalContent = pm.locator('#giftModal .gift-modal-v3');
  const scrollInfo = await modalContent.evaluate(el => ({
    scrollHeight: el.scrollHeight,
    clientHeight: el.clientHeight,
    overflowY: getComputedStyle(el).overflowY,
    overflowX: getComputedStyle(el).overflowX,
    canScroll: el.scrollHeight > el.clientHeight,
  }));
  log('INFO', 'Modal scroll info: ' + JSON.stringify(scrollInfo));
  if (scrollInfo.overflowY === 'auto' || scrollInfo.overflowY === 'scroll') {
    log('OK', 'Modal a overflow-y: ' + scrollInfo.overflowY + ' (scrollable)');
  } else {
    log('FAIL', 'Modal a overflow-y: ' + scrollInfo.overflowY + ' (PAS scrollable !)');
  }

  // 4. Tenter de scroller dans le modal jusqu'au CTA
  await modalContent.evaluate(el => { el.scrollTop = el.scrollHeight; });
  await pm.waitForTimeout(300);
  const ctaVisible = await pm.locator('.gift-cta-btn').isVisible();
  const ctaInView = await pm.locator('.gift-cta-btn').evaluate(el => {
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight && r.bottom > 0;
  });
  if (ctaVisible && ctaInView) log('OK', 'CTA "Offrir XX€" atteignable après scroll mobile');
  else log('FAIL', 'CTA pas atteignable après scroll (visible=' + ctaVisible + ', inView=' + ctaInView + ')');

  // 5. Take screenshot for visual verification
  await pm.screenshot({ path: '.test-modal-mobile.png', fullPage: false });
  log('INFO', 'Screenshot modal mobile sauvegardé: .test-modal-mobile.png');

  if (consoleErrorsM.length === 0) log('OK', 'Aucune erreur JS sur mobile');
  else { consoleErrorsM.slice(0, 10).forEach(e => log('FAIL', 'JS error mobile: ' + e)); }

  await ctxMob.close();
  await browser.close();

  // ===== Summary =====
  console.log('\n=== SUMMARY ===');
  const counts = findings.reduce((a, f) => { a[f.level] = (a[f.level] || 0) + 1; return a; }, {});
  console.log(JSON.stringify(counts));
  const fails = findings.filter(f => f.level === 'FAIL');
  if (fails.length) {
    console.log('\nFAILURES:');
    fails.forEach(f => console.log('  - ' + f.msg));
    process.exit(1);
  }
  process.exit(0);
}

run().catch(e => { console.error('Test runner crashed:', e); process.exit(2); });
