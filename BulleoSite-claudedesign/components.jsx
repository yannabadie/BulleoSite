// Bulleo — main React app (Babel JSX)
const { useState, useEffect, useRef, useMemo } = React;

const SERVICES = window.BulleoData.services;
const TESTIMONIALS = window.BulleoData.testimonials;
const FAQS = window.BulleoData.faqs;
const GALLERY = window.BulleoData.gallery;
const TICKER = window.BulleoData.tickerPhrases;

// ---- Icons (small inline SVGs) ----
const Icon = {
  arrow: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>,
  arrowUp: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M7 7h10v10"/></svg>,
  check: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12l5 5L20 7"/></svg>,
  gift: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="8" width="18" height="13" rx="1"/><path d="M3 13h18M12 8v13M8 8a2.5 2.5 0 010-5c1.5 0 4 5 4 5s-2.5 0-4 0zM16 8a2.5 2.5 0 000-5c-1.5 0-4 5-4 5s2.5 0 4 0z"/></svg>,
  cal: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>,
  close: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M6 18L18 6"/></svg>,
  burger: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h10"/></svg>,
  pin: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-7 8-13a8 8 0 10-16 0c0 6 8 13 8 13z"/><circle cx="12" cy="9" r="2.5"/></svg>,
  phone: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.35 1.85.59 2.81.72a2 2 0 011.72 2z"/></svg>,
  mail: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>,
  insta: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor"/></svg>,
  fb: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>,
  star: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7 7 .7-5.3 4.7 1.6 7.1L12 17.8 5.7 21.5l1.6-7.1L2 9.7 9 9z"/></svg>,
  spark: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.6 5.6l4.2 4.2M14.2 14.2l4.2 4.2M18.4 5.6l-4.2 4.2M9.8 14.2l-4.2 4.2"/></svg>,
};

// ---- Reveal on scroll ----
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ---- Nav ----
function Nav({ onBook, onMenu, onOpenGift }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onS = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onS); onS();
    return () => window.removeEventListener('scroll', onS);
  }, []);
  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#top" className="nav-logo">
          <img src="assets/images/logos/logo-main.webp" alt="Bulleo" />
          <span>Bulleo</span>
        </a>
        <div className="nav-links">
          <a href="#grossesse" className="nav-link">Grossesse</a>
          <a href="#postpartum" className="nav-link">Post-partum</a>
          <a href="#drainage" className="nav-link">Drainage <span style={{ color: 'var(--accent)', fontSize: 8, marginLeft: 2 }}>●</span></a>
          <a href="#bebe" className="nav-link">Bébé</a>
          <a href="#apropos" className="nav-link">L'institut</a>
          <a href="#contact" className="nav-link">Contact</a>
          <button className="nav-cta" onClick={onBook}>Réserver {Icon.arrow}</button>
        </div>
        <button className="nav-burger" onClick={onMenu} aria-label="Menu">{Icon.burger}</button>
      </div>
    </nav>
  );
}

// ---- Mobile menu ----
function MobileMenu({ open, onClose, onBook }) {
  return (
    <div className={`mobile-menu ${open ? 'open' : ''}`}>
      <div className="mobile-menu-head">
        <a href="#top" onClick={onClose} className="nav-logo">
          <img src="assets/images/logos/logo-main.webp" alt="Bulleo" />
          <span>Bulleo</span>
        </a>
        <button className="modal-close" onClick={onClose}>{Icon.close}</button>
      </div>
      <div className="mobile-menu-links">
        <a href="#grossesse" onClick={onClose}>Grossesse</a>
        <a href="#postpartum" onClick={onClose}>Post-partum</a>
        <a href="#drainage" onClick={onClose}>Drainage <span style={{ color: 'var(--accent)', fontSize: 12 }}>● nouveau</span></a>
        <a href="#bebe" onClick={onClose}>Bébé</a>
        <a href="#apropos" onClick={onClose}>L'institut</a>
        <a href="#galerie" onClick={onClose}>Galerie</a>
        <a href="#contact" onClick={onClose}>Contact</a>
      </div>
      <div className="mobile-menu-foot">
        <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => { onClose(); onBook(); }}>Réserver un soin</button>
      </div>
    </div>
  );
}

// ---- Hero ----
function Hero({ onBook, onScrollGrossesse }) {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div className="reveal">
          <div className="hero-eyebrow-row">
            <span className="divider"></span>
            <span className="eyebrow">Institut Périnatal · Tarbes</span>
          </div>
          <h1>L'expertise<br/>périnatale,<br/><em>la douceur en plus.</em></h1>
          <p className="hero-lede">
            Un cocon à Tarbes pour la grossesse et le post-partum.
            Massage prénatal, bain enveloppé, soin Rebozo et ateliers bébé,
            par une auxiliaire de puériculture diplômée d'État.
          </p>
          <div className="hero-ctas">
            <button className="btn btn-dark" onClick={onBook}>Réserver un soin {Icon.arrow}</button>
            <button className="btn btn-ghost" onClick={onScrollGrossesse}>Découvrir l'institut</button>
          </div>
          <div className="hero-meta">
            <div className="hero-meta-item">
              <div className="num">5,0<span style={{ fontSize: 16, color: 'var(--gold)', marginLeft: 6 }}>★</span></div>
              <div className="label">90 avis Google</div>
            </div>
            <div className="hero-meta-item">
              <div className="num">+90</div>
              <div className="label">Familles accompagnées</div>
            </div>
            <div className="hero-meta-item">
              <div className="num">D.E.</div>
              <div className="label">Diplôme d'État</div>
            </div>
          </div>
        </div>
        <div className="reveal" style={{ position: 'relative' }}>
          <div className="hero-visual">
            <img src="assets/images/portraits/estelle-portrait.webp" alt="Estelle, fondatrice de Bulleo" />
            <div className="hero-visual-stamp">
              <div>
                <div className="name">Estelle Cazajous</div>
                <div className="credential">Auxiliaire de puériculture D.E.</div>
              </div>
            </div>
          </div>
          <div className="hero-quote">
            <p>Le corps se détend, l'esprit respire, le cœur s'apaise.<span className="author">— philosophie Bulleo</span></p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Ticker ----
function Ticker() {
  const items = [...TICKER, ...TICKER];
  return (
    <div className="ticker">
      <div className="ticker-track">
        {items.map((t, i) => <span className="ticker-item" key={i}>{t}</span>)}
      </div>
    </div>
  );
}

// ---- 3 Portes ----
function Portes() {
  return (
    <section className="section" style={{ paddingTop: 80 }}>
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Quel est votre besoin aujourd'hui ?</span>
          <h2>Quatre portes,<br/><em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>un même cocon.</em></h2>
        </div>
        <div className="portes-grid portes-grid-4">
          <a href="#grossesse" className="porte reveal">
            <img src="assets/images/services/massage-prenatal.webp" alt="Soins grossesse" />
            <div className="porte-content">
              <div>
                <h3>Je suis enceinte</h3>
                <p>Massage prénatal · réflexologie</p>
              </div>
              <span className="porte-arrow">{Icon.arrow}</span>
            </div>
          </a>
          <a href="#postpartum" className="porte reveal">
            <img src="assets/images/services/soin-rebozo-alt.webp" alt="Soins post-partum" />
            <div className="porte-content">
              <div>
                <h3>Je viens d'accoucher</h3>
                <p>Rebozo · massage postnatal</p>
              </div>
              <span className="porte-arrow">{Icon.arrow}</span>
            </div>
          </a>
          <a href="#drainage" className="porte reveal">
            <span className="porte-badge porte-badge-new">Nouveau</span>
            <img src="assets/images/services/drainage-lymphatique.jpg" alt="Drainage lymphatique" />
            <div className="porte-content">
              <div>
                <h3>Bien-être & circulation</h3>
                <p>Drainage balinais · cures</p>
              </div>
              <span className="porte-arrow">{Icon.arrow}</span>
            </div>
          </a>
          <a href="#bebe" className="porte reveal">
            <span className="porte-badge">Signature</span>
            <img src="assets/images/services/bain-enveloppe-alt.webp" alt="Soins bébé" />
            <div className="porte-content">
              <div>
                <h3>Pour mon bébé</h3>
                <p>Bain enveloppé · ateliers</p>
              </div>
              <span className="porte-arrow">{Icon.arrow}</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

// ---- Service Card ----
function ServiceCard({ s, onBook, onGift }) {
  return (
    <div className="card">
      <div className="card-media">
        <span className={`card-tag ${s.tagClass}`}>{s.tag}</span>
        {s.isNew && <span className="card-tag card-tag-new">Nouveau</span>}
        <img src={s.img} alt={s.name} loading="lazy" />
      </div>
      <div className="card-body">
        <h3>{s.name}</h3>
        <div className="duration">{s.duration}</div>
        <p className="desc">{s.desc}</p>
        {s.formulas && s.formulas.length > 1 && (
          <div className="card-formulas">
            <span className="dot"></span>
            {s.formulas.length} formules disponibles
          </div>
        )}
        <div className="card-foot">
          <div className="price">
            {s.priceLabel}
            <small>{s.cat === 'boutique' ? 'TTC' : 'par séance'}</small>
          </div>
          <div className="card-actions">
            <button title="Offrir" className="gift" onClick={() => onGift(s)}>{Icon.gift}</button>
            <button title="Réserver" onClick={() => onBook(s)}>{Icon.cal}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- Prestations section with filters ----
function Prestations({ onBook, onGift }) {
  const [filter, setFilter] = useState('all');
  const filtered = useMemo(() => filter === 'all' ? SERVICES : SERVICES.filter(s => s.cat === filter), [filter]);
  return (
    <section className="section" id="prestations" style={{ background: 'var(--paper)' }}>
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Nos soins</span>
          <h2>Un soin pour chaque <em style={{ fontStyle:'italic', color:'var(--primary)'}}>moment.</em></h2>
          <p>Du quatrième mois de grossesse jusqu'aux premiers mois de votre bébé, nous accompagnons chaque étape avec des protocoles pensés pour votre confort et votre sécurité.</p>
        </div>
        <div className="chips reveal">
          {[
            { id: 'all', label: 'Tous les soins' },
            { id: 'grossesse', label: 'Grossesse' },
            { id: 'postpartum', label: 'Post-partum' },
            { id: 'soin', label: 'Drainage', isNew: true },
            { id: 'bebe', label: 'Bébé' },
            { id: 'boutique', label: 'Boutique' }
          ].map(c => (
            <button key={c.id} className={`chip ${filter===c.id?'active':''}`} onClick={() => setFilter(c.id)}>
              {c.label}{c.isNew && <span className="chip-new">●</span>}
            </button>
          ))}
        </div>
        <div className="prestations-grid">
          {filtered.map(s => (
            <div key={s.id} className="reveal"><ServiceCard s={s} onBook={onBook} onGift={onGift} /></div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Feature: Bain enveloppé ----
function FeatureBain({ onBook, onGift }) {
  const bain = SERVICES.find(s => s.id === 'bain-enveloppe');
  return (
    <section className="section feature" id="bebe">
      <div className="container feature-grid">
        <div className="feature-visual reveal">
          <img src="assets/images/services/bain-enveloppe-alt.webp" alt="Bain enveloppé" />
          <div className="feature-visual-num">01</div>
        </div>
        <div className="reveal">
          <span className="eyebrow">Notre signature historique</span>
          <h2 style={{ marginTop: 14 }}>Le bain<br/><em>enveloppé.</em></h2>
          <p className="desc">Bien plus qu'un bain : une renaissance émotionnelle. Votre bébé retrouve les sensations in-utero — chaleur, bercement, contention rassurante. Un soin qui apaise profondément le système nerveux du nouveau-né et libère les tensions de la naissance.</p>
          <ul className="feature-list">
            <li>{Icon.check}<span><strong>Idéal dans les 21 premiers jours.</strong> Possible jusqu'à 3 mois selon le bébé.</span></li>
            <li>{Icon.check}<span><strong>Apaise coliques, pleurs intenses, sommeil agité.</strong></span></li>
            <li>{Icon.check}<span><strong>Moment de lien parent-bébé</strong> intense et marquant.</span></li>
          </ul>
          <div className="feature-row">
            <span className="price-tag">70 €</span>
            <button className="btn btn-primary" onClick={() => onBook(bain)}>Réserver {Icon.arrow}</button>
            <button className="btn btn-ghost" onClick={() => onGift(bain)}>{Icon.gift} Offrir</button>
          </div>
          <p style={{ marginTop: 16, fontSize: 13, color: 'var(--text-soft)' }}>
            <strong>Bain jumeaux disponible</strong> · 120 € — <strong>Combinés massage + bain</strong> · 140 €
          </p>
        </div>
      </div>
    </section>
  );
}

// ---- Feature: Drainage Lymphatique (NEW) ----
function FeatureDrainage({ onBook, onGift }) {
  const drainage = SERVICES.find(s => s.id === 'drainage');
  const cure = SERVICES.find(s => s.id === 'cure-drainage');
  return (
    <section className="section feature feature-drainage" id="drainage">
      <div className="container feature-grid feature-grid-reverse">
        <div className="reveal">
          <span className="eyebrow eyebrow-new">
            <span className="new-dot"></span> Nouveau · printemps 2026
          </span>
          <h2 style={{ marginTop: 14 }}>Drainage lymphatique<br/><em>balinais.</em></h2>
          <p className="desc">Une technique manuelle douce et rythmée, héritée des médecines traditionnelles balinaises. Stimule la circulation lymphatique, allège les jambes lourdes, détoxifie en profondeur — un soin minceur et bien-être à la fois.</p>
          <ul className="feature-list">
            <li>{Icon.check}<span><strong>3 durées au choix</strong> — 30 min (1 zone) · 45 min (2 zones) · 1h (corps entier)</span></li>
            <li>{Icon.check}<span><strong>Cure de 6 séances</strong> avec la 6<sup>e</sup> offerte (à partir de 250 €)</span></li>
            <li>{Icon.check}<span><strong>Rituel Douceur Bulleo</strong> — combiné massage + drainage 1h30 à 115 €</span></li>
          </ul>
          <div className="feature-row">
            <span className="price-tag">Dès 50 €</span>
            <button className="btn btn-primary" onClick={() => onBook(drainage)}>Réserver une séance {Icon.arrow}</button>
            <button className="btn btn-ghost" onClick={() => onBook(cure)}>Découvrir les cures</button>
          </div>
        </div>
        <div className="feature-visual reveal">
          <img src="assets/images/services/drainage-lymphatique.jpg" alt="Drainage lymphatique balinais" />
          <div className="feature-visual-num">02</div>
        </div>
      </div>
    </section>
  );
}

// ---- Rituel Douceur Bulleo banner ----
function RitualBanner({ onBook }) {
  const drainage = SERVICES.find(s => s.id === 'drainage');
  return (
    <section className="ritual-banner">
      <div className="container">
        <div className="ritual-banner-inner reveal">
          <div className="ritual-mark">✦</div>
          <div className="ritual-text">
            <span className="eyebrow" style={{ color: 'var(--gold)' }}>Notre signature</span>
            <h3>Rituel Douceur Bulleo</h3>
            <p>1h30 enveloppante : un massage prénatal ou postnatal suivi d'une séance de drainage lymphatique balinais.</p>
          </div>
          <div className="ritual-price">
            <div className="amount">115 €</div>
            <div className="strike">au lieu de 140 €</div>
          </div>
          <button className="btn btn-primary" onClick={() => onBook({ ...drainage, defaultFormula: 'drainage_massage' })}>
            Réserver le rituel {Icon.arrow}
          </button>
        </div>
      </div>
    </section>
  );
}

// ---- About ----
function About() {
  return (
    <section className="section" id="apropos" style={{ background: 'var(--paper)' }}>
      <div className="container about-grid">
        <div className="about-visual reveal">
          <div className="about-img-main">
            <img src="assets/images/portraits/estelle-close.webp" alt="Estelle Cazajous" />
          </div>
          <div className="about-img-secondary">
            <img src="assets/images/portraits/estelle-bain.webp" alt="Estelle au travail" />
          </div>
        </div>
        <div className="about-content reveal">
          <span className="eyebrow">À propos</span>
          <h2 style={{ marginTop: 14 }}>Estelle,<br/><em>auxiliaire de puériculture D.E.</em></h2>
          <p>Diplômée depuis 2018, j'ai accompagné de nombreuses naissances en structure hospitalière. Être présente au premier cri d'un bébé, soutenir les premiers instants d'une nouvelle vie — ce sont des moments précieux que je n'oublie pas.</p>
          <p>Mais une question me suivait : <em>et avant la naissance ? Et après ?</em> Les émotions, les doutes, les besoins ne commencent pas à la maternité, et ne s'arrêtent pas à la sortie. Bulleo est né de ce désir d'un accompagnement plus global, doux et respectueux du rythme de chacun.</p>
          <div className="about-credentials">
            <div className="item">
              <div className="num">2018</div>
              <div className="label">Diplôme<br/>d'État</div>
            </div>
            <div className="item">
              <div className="num">7+</div>
              <div className="label">Années<br/>d'expérience</div>
            </div>
            <div className="item">
              <div className="num">90+</div>
              <div className="label">Familles<br/>accompagnées</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Gallery ----
function Gallery({ onOpen }) {
  return (
    <section className="section" id="galerie" style={{ background: 'var(--paper)' }}>
      <div className="container">
        <div className="section-head reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', maxWidth: '100%', marginBottom: 32 }}>
          <div>
            <span className="eyebrow">Galerie</span>
            <h2 style={{ marginTop: 14 }}>L'institut<br/><em style={{ fontStyle:'italic', color:'var(--primary)'}}>en images.</em></h2>
          </div>
          <a href="https://www.instagram.com/bulleo_" target="_blank" rel="noopener" className="btn-text">Suivez-nous sur Instagram {Icon.arrowUp}</a>
        </div>
        <div className="gallery">
          {GALLERY.map((g, i) => (
            <div className="gallery-item reveal" key={i} onClick={() => onOpen(i)}>
              <img src={g.src} alt={g.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Testimonials ----
function Testimonials() {
  return (
    <section className="section testimonials" id="temoignages">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Témoignages</span>
          <h2>Ce qu'elles<br/><em style={{ fontStyle:'italic', color:'var(--primary)'}}>en disent.</em></h2>
        </div>
        <div className="testimonial-row">
          {TESTIMONIALS.map((t, i) => (
            <div className="testimonial reveal" key={i}>
              <div className="stars">{Array.from({length:t.stars}).map((_,j)=><span key={j}>★</span>)}</div>
              <p className="testimonial-quote">"{t.quote}"</p>
              <div className="testimonial-author">
                <div className="testimonial-author-pic">{t.initials}</div>
                <div>
                  <div className="name">{t.name}</div>
                  <div className="meta">{t.meta}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- FAQ ----
function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section" id="faq" style={{ background: 'var(--paper)' }}>
      <div className="container">
        <div className="section-head reveal" style={{ textAlign: 'center', margin: '0 auto 56px' }}>
          <span className="eyebrow">Questions fréquentes</span>
          <h2 style={{ marginTop: 14 }}>On répond à<br/><em style={{ fontStyle:'italic', color:'var(--primary)'}}>vos questions.</em></h2>
        </div>
        <div className="faq-list">
          {FAQS.map((f, i) => (
            <div key={i} className={`faq-item reveal ${open===i?'open':''}`}>
              <button className="faq-q" onClick={() => setOpen(open===i?-1:i)}>
                <span>{f.q}</span>
                <span className="icon">+</span>
              </button>
              <div className="faq-a"><div style={{ paddingRight: 56 }}>{f.a}</div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- CTA Final / Contact ----
function CTAFinal({ onBook }) {
  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="cta-final reveal">
          <div className="cta-final-grid">
            <div className="cta-final-text">
              <span className="eyebrow" style={{ color: 'var(--gold)' }}>Prendre rendez-vous</span>
              <h2 style={{ marginTop: 14 }}>Votre cocon<br/><em>vous attend.</em></h2>
              <p>Une question, un soin à offrir, ou simplement envie d'en savoir plus ? Estelle vous répond sous 24h.</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button className="btn btn-primary" onClick={onBook}>Réserver un créneau {Icon.arrow}</button>
                <a className="btn btn-ghost" href="tel:+33675430257">{Icon.phone} 06 75 43 02 57</a>
              </div>
            </div>
            <div className="cta-final-aside">
              <div className="row">
                <span className="icon">{Icon.pin}</span>
                <div>
                  <div className="label">Adresse</div>
                  <div className="value">108-6 rue du Magasin aux Tabacs<br/>65000 Tarbes</div>
                </div>
              </div>
              <div className="row">
                <span className="icon">{Icon.cal}</span>
                <div>
                  <div className="label">Horaires</div>
                  <div className="value">Lundi — Vendredi<br/>9h00 — 17h00</div>
                </div>
              </div>
              <div className="row">
                <span className="icon">{Icon.mail}</span>
                <div>
                  <div className="label">Email</div>
                  <div className="value">contact@bulleo-soins.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Footer ----
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="nav-logo" style={{ marginBottom: 14 }}>
              <img src="assets/images/logos/logo-main.webp" alt="Bulleo" style={{ height: 32 }} />
              <span>Bulleo</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-soft)', maxWidth: 280 }}>Institut périnatal à Tarbes. Massage prénatal, bain enveloppé, soin Rebozo et ateliers bébé par une auxiliaire de puériculture D.E.</p>
            <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
              <a href="https://www.instagram.com/bulleo_" target="_blank" rel="noopener" aria-label="Instagram" style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid var(--line)', display: 'inline-flex', alignItems:'center', justifyContent:'center' }}>{Icon.insta}</a>
              <a href="#" aria-label="Facebook" style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid var(--line)', display: 'inline-flex', alignItems:'center', justifyContent:'center' }}>{Icon.fb}</a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Soins</h4>
            <a href="#grossesse">Massage prénatal</a>
            <a href="#postpartum">Massage postnatal</a>
            <a href="#drainage">Drainage lymphatique <span style={{ color: 'var(--accent)' }}>●</span></a>
            <a href="#bebe">Bain enveloppé</a>
            <a href="#postpartum">Soin Rebozo</a>
            <a href="#bebe">Atelier massage bébé</a>
            <a href="#bebe">Atelier motricité</a>
          </div>
          <div className="footer-col">
            <h4>L'institut</h4>
            <a href="#apropos">À propos d'Estelle</a>
            <a href="#galerie">Galerie</a>
            <a href="#temoignages">Témoignages</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="footer-col">
            <h4>Légal</h4>
            <a href="#">Mentions légales</a>
            <a href="#">CGV</a>
            <a href="#">Politique de confidentialité</a>
            <a href="#">Cookies</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Bulleo — Institut périnatal · Tarbes</span>
          <span>Site original — design original</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Nav, MobileMenu, Hero, Ticker, Portes, Prestations, FeatureBain, FeatureDrainage, RitualBanner, About, Gallery, Testimonials, FAQ, CTAFinal, Footer, useReveal, BulleoIcon: Icon, BULLEO_SERVICES: SERVICES });
