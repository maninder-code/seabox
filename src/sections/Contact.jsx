import Container from '../components/Container.jsx'
import HoursList from '../components/HoursList.jsx'
import { useState, useEffect } from 'react'
import { useI18n } from '../i18n/i18n.jsx'

const HOURS = [
  ['Monday', '6:00am — 8:00pm'],
  ['Tuesday', '6:00am — 8:00pm'],
  ['Wednesday', '6:00am — 8:00pm'],
  ['Thursday', '6:00am — 8:00pm'],
  ['Friday', '6:00am — 8:00pm'],
  ['Saturday', '8:00am — 4:00pm'],
  ['Sunday', 'Closed']
]

export default function Contact() {
  const { locale, t } = useI18n()
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', consent: false })
  const [status, setStatus] = useState({ sending: false, error: null, ok: false })

  // popup (modal) state
  const [popup, setPopup] = useState({ open: false, type: 'success', message: '' })

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const closePopup = () => setPopup({ open: false, type: 'success', message: '' })

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closePopup() }
    if (popup.open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [popup.open])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ sending: true, error: null, ok: false })
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, locale })
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error('Due to some technical issue, your message could not be sent. Please try contacting us via phone at 0220337285 or email us at sales@seabox.co.nz.')
      }

      // success: reset form, show popup
      setStatus({ sending: false, error: null, ok: true })
      setForm({ name: '', email: '', phone: '', message: '', consent: false })
      setPopup({
        open: true,
        type: 'success',
        message: 'Your message has been sent to our dispatch. They will contact you ASAP.'
      })
    } catch (err) {
      setStatus({ sending: false, error: err.message || 'Failed to send', ok: false })
      setPopup({
        open: true,
        type: 'error',
        message: err.message || 'Something went wrong. Please try again.'
      })
    }
  }

  return (
    <section id="contact" className="contact">
      <Container>
        <div className="contact-grid">
          <div>
            <div className="eyebrow">{t('contact.eyebrow')}</div>
            <h3 style={{ fontFamily: 'Seabox Sans, serif', fontSize: 28, margin: '0 0 8px' }}>
              {t('contact.title')}
            </h3>
            <p style={{ color: '#2c2e2fff' }}>{t('contact.p')}</p>

            <form className="form" onSubmit={handleSubmit}>
              <div className="field">
                <label className="label" htmlFor="name">{t('contact.form.name')}</label>
                <input className="input" id="name" name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="field">
                <label className="label" htmlFor="email">{t('contact.form.email')}</label>
                <input className="input" id="email" type="email" name="email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="field">
                <label className="label" htmlFor="phone">{t('contact.form.phone')}</label>
                <input className="input" id="phone" name="phone" value={form.phone} onChange={handleChange} required />
              </div>
              <div className="field">
                <label className="label" htmlFor="message">{t('contact.form.message')}</label>
                <textarea className="textarea" id="message" name="message" value={form.message} onChange={handleChange} placeholder={t('contact.form.message.placeholder')} />
              </div>
              <div className="disclaimer">
                <input type="checkbox" id="consent" name="consent" checked={form.consent} onChange={handleChange} />
                <label htmlFor="consent">{t('contact.form.consent')}</label>
              </div>
              <button className="btn" type="submit" disabled={status.sending}>
                {status.sending ? 'Sending…' : t('contact.form.submit')}
              </button>
            </form>
          </div>

          <aside className="aside">
            <h4>{t('aside.title')}</h4>
            <div className="item">📍 {t('aside.address')}</div>
            <div className="item">✉️ {t('aside.email')}</div>
            <div className="item">☎️ {t('aside.phone')}</div>
            <div className="hours">
              <strong>{t('hours.label')}</strong>
              <HoursList hours={HOURS} />
            </div>
          </aside>
        </div>
      </Container>

      {/* Popup / Modal */}
      {popup.open && (
        <div className="modal-backdrop" onClick={closePopup} role="presentation">
          <div
            className={`modal ${popup.type === 'error' ? 'modal-error' : 'modal-success'}`}
            role="dialog"
            aria-modal="true"
            aria-label={popup.type === 'error' ? 'Error' : 'Success'}
            onClick={(e)=>e.stopPropagation()}
          >
            <div className="modal-body">
              {popup.message}
            </div>
            <button className="modal-close" onClick={closePopup} autoFocus>OK</button>
          </div>
        </div>
      )}
    </section>
  )
}
