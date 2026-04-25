// Bulleo — modals (Réserver, Offrir, Lightbox)
const { useState: useStateM, useEffect: useEffectM } = React;

function ReserveModal({ open, onClose, service, services }) {
  const [step, setStep] = useStateM(1);
  const [picked, setPicked] = useStateM(service || null);
  const [formulaIdx, setFormulaIdx] = useStateM(0);
  const [date, setDate] = useStateM(null);
  const [slot, setSlot] = useStateM(null);
  const [info, setInfo] = useStateM({ name: '', email: '', phone: '', notes: '' });

  useEffectM(() => {
    if (service) {
      setPicked(service);
      setStep(2);
      // Honor defaultFormula (used by Rituel banner)
      if (service.formulas && service.defaultFormula) {
        const idx = service.formulas.findIndex(f => f.key === service.defaultFormula);
        setFormulaIdx(idx >= 0 ? idx : 0);
      } else {
        setFormulaIdx(0);
      }
    } else {
      setPicked(null);
      setStep(1);
      setFormulaIdx(0);
    }
    setDate(null);
    setSlot(null);
  }, [service, open]);

  if (!open) return null;

  const days = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date(); d.setDate(d.getDate() + i + 1);
    return d;
  });
  const slots = ['09:00', '10:30', '14:00', '15:30'];

  const totalPrice = picked ? (picked.formulas ? picked.formulas[formulaIdx].price : picked.price) : 0;
  const formulaLabel = picked && picked.formulas ? picked.formulas[formulaIdx].label : null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>{window.BulleoIcon.close}</button>
        <div className="modal-stepper">
          {['Soin', 'Créneau', 'Infos', 'Paiement'].map((label, i) => (
            <div key={i} className={`modal-step ${step >= i+1 ? 'active' : ''} ${step > i+1 ? 'done' : ''}`}>
              <span className="num">{step > i+1 ? '✓' : i+1}</span>{label}
            </div>
          ))}
        </div>
        <div className="modal-body">
          {step === 1 && (
            <>
              <h3 className="modal-title">Quel soin souhaitez-vous réserver ?</h3>
              <div className="service-list">
                {services.map(s => (
                  <button key={s.id} className={`service-row ${picked?.id===s.id?'selected':''}`} onClick={() => setPicked(s)}>
                    <img src={s.img} alt="" />
                    <div className="info">
                      <div className="name">{s.name}</div>
                      <div className="meta">{s.duration}</div>
                    </div>
                    <div className="price">{s.priceLabel}</div>
                  </button>
                ))}
              </div>
            </>
          )}
          {step === 2 && picked && (
            <>
              <h3 className="modal-title">Choisissez votre créneau</h3>
              {picked.formulas && (
                <div style={{ marginBottom: 24 }}>
                  <div className="modal-label">Formule</div>
                  <div className="formula-list">
                    {picked.formulas.map((f, i) => (
                      <button key={i} className={`formula-row ${formulaIdx===i?'selected':''}`} onClick={() => setFormulaIdx(i)}>
                        <span className="formula-radio"></span>
                        <span className="formula-label">
                          {f.label}
                          {f.badge && <span className={`formula-badge formula-badge-${f.badge.toLowerCase()}`}>{f.badge}</span>}
                        </span>
                        <span className="formula-price">{f.price} €</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="modal-label">Date</div>
              <div className="cal-grid">
                {days.map((d, i) => (
                  <button key={i} className={`cal-day ${date?.toDateString()===d.toDateString()?'active':''}`} onClick={() => setDate(d)}>
                    <span className="dow">{['dim','lun','mar','mer','jeu','ven','sam'][d.getDay()]}</span>
                    <span className="dn">{d.getDate()}</span>
                  </button>
                ))}
              </div>
              {date && (
                <>
                  <div className="modal-label" style={{ marginTop: 24 }}>Heure</div>
                  <div className="chips">
                    {slots.map(s => (
                      <button key={s} className={`chip ${slot===s?'active':''}`} onClick={() => setSlot(s)}>{s}</button>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
          {step === 3 && (
            <>
              <h3 className="modal-title">Vos coordonnées</h3>
              <div className="form-grid">
                <div className="form-field"><label>Prénom et nom</label><input value={info.name} onChange={e => setInfo({...info, name: e.target.value})} placeholder="Marie Dupont" /></div>
                <div className="form-field"><label>Email</label><input type="email" value={info.email} onChange={e => setInfo({...info, email: e.target.value})} placeholder="marie@email.com" /></div>
                <div className="form-field"><label>Téléphone</label><input value={info.phone} onChange={e => setInfo({...info, phone: e.target.value})} placeholder="06 12 34 56 78" /></div>
                <div className="form-field full"><label>Notes (terme de grossesse, allergies, etc.)</label><textarea rows="3" value={info.notes} onChange={e => setInfo({...info, notes: e.target.value})}></textarea></div>
              </div>
            </>
          )}
          {step === 4 && (
            <>
              <h3 className="modal-title">Récapitulatif</h3>
              <div className="recap">
                <div className="recap-row"><span>Soin</span><strong>{picked?.name}</strong></div>
                {formulaLabel && <div className="recap-row"><span>Formule</span><strong>{formulaLabel}</strong></div>}
                <div className="recap-row"><span>Date</span><strong>{date?.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })} · {slot}</strong></div>
                <div className="recap-row"><span>Pour</span><strong>{info.name || '—'}</strong></div>
                <div className="recap-total"><span>Total à régler</span><strong>{totalPrice} €</strong></div>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-soft)', marginTop: 18 }}>Acompte de 30% à la réservation. Paiement sécurisé Stripe. Annulation gratuite jusqu'à 48h avant.</p>
            </>
          )}
        </div>
        <div className="modal-foot">
          <span style={{ fontSize: 13, color: 'var(--text-soft)' }}>{picked && step < 4 ? `${picked.name} · ${totalPrice} €` : ''}</span>
          <div style={{ display: 'flex', gap: 10 }}>
            {step > 1 && <button className="btn btn-ghost" onClick={() => setStep(step - 1)}>Retour</button>}
            {step < 4 && <button className="btn btn-dark" disabled={(step===1 && !picked) || (step===2 && (!date || !slot))} onClick={() => setStep(step + 1)}>Continuer {window.BulleoIcon.arrow}</button>}
            {step === 4 && <button className="btn btn-primary" onClick={onClose}>Payer {totalPrice}€ {window.BulleoIcon.arrow}</button>}
          </div>
        </div>
      </div>
    </div>
  );
}

function GiftModal({ open, onClose, service }) {
  const [amount, setAmount] = useStateM(service ? service.price : 75);
  const [from, setFrom] = useStateM('');
  const [to, setTo] = useStateM('');
  const [email, setEmail] = useStateM('');
  const [msg, setMsg] = useStateM('');

  useEffectM(() => { if (service) setAmount(service.price); }, [service]);

  if (!open) return null;
  const presets = [50, 75, 90, 110, 160];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>{window.BulleoIcon.close}</button>
        <div className="modal-body">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <span className="eyebrow">Bon cadeau</span>
          </div>
          <h3 className="modal-title">Offrez un moment de douceur</h3>
          <div className="gift-card">
            <div className="gift-card-inner">
              <div className="gift-card-brand">
                <img src="assets/images/logos/logo-main.webp" alt="" />
                <span>Bulleo</span>
              </div>
              <div className="gift-amount">{amount} €</div>
              <div className="gift-meta">
                <div>De <strong>{from || '...'}</strong></div>
                <div>Pour <strong>{to || '...'}</strong></div>
              </div>
              {msg && <div className="gift-msg">"{msg}"</div>}
            </div>
          </div>
          <div className="modal-label" style={{ marginTop: 24 }}>Montant</div>
          <div className="chips">
            {presets.map(p => (
              <button key={p} className={`chip ${amount===p?'active':''}`} onClick={() => setAmount(p)}>{p} €</button>
            ))}
            <input type="number" className="chip" style={{ width: 100, padding: '0 14px' }} value={amount} onChange={e => setAmount(parseInt(e.target.value)||0)} />
          </div>
          <div className="form-grid" style={{ marginTop: 24 }}>
            <div className="form-field"><label>De la part de</label><input value={from} onChange={e => setFrom(e.target.value)} placeholder="Votre prénom" /></div>
            <div className="form-field"><label>Pour</label><input value={to} onChange={e => setTo(e.target.value)} placeholder="Prénom du / de la destinataire" /></div>
            <div className="form-field full"><label>Email du / de la destinataire</label><input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="email@exemple.com" /></div>
            <div className="form-field full"><label>Message personnalisé (optionnel)</label><textarea rows="2" value={msg} onChange={e => setMsg(e.target.value)} placeholder="Un mot doux..."></textarea></div>
          </div>
        </div>
        <div className="modal-foot">
          <span style={{ fontSize: 13, color: 'var(--text-soft)' }}>Bon valable 6 mois · envoyé par email</span>
          <button className="btn btn-primary" onClick={onClose}>Offrir {amount}€ {window.BulleoIcon.arrow}</button>
        </div>
      </div>
    </div>
  );
}

function Lightbox({ open, idx, onClose, items }) {
  if (!open || idx === null) return null;
  const img = items[idx];
  return (
    <div className="modal-backdrop" onClick={onClose} style={{ background: 'rgba(20,16,12,.92)' }}>
      <div onClick={e => e.stopPropagation()} style={{ maxWidth: '90vw', maxHeight: '88vh' }}>
        <img src={img.src} alt={img.alt} style={{ maxWidth: '100%', maxHeight: '88vh', borderRadius: 8, boxShadow: '0 30px 80px rgba(0,0,0,.5)' }} />
      </div>
      <button className="modal-close" style={{ top: 24, right: 24, background: 'rgba(255,255,255,.1)', color: 'white', borderColor: 'rgba(255,255,255,.2)' }} onClick={onClose}>{window.BulleoIcon.close}</button>
    </div>
  );
}

Object.assign(window, { ReserveModal, GiftModal, Lightbox });
