import Container from '../components/Container.jsx'
import HoursList from '../components/HoursList.jsx'
import { useState } from 'react'
import { useI18n } from '../i18n/i18n.jsx'

const HOURS = [
  ['Monday','6:00am — 8:00pm'],
  ['Tuesday','6:00am — 8:00pm'],
  ['Wednesday','6:00am — 8:00pm'],
  ['Thursday','6:00am — 8:00pm'],
  ['Friday','6:00am — 8:00pm'],
  ['Saturday','8:00am — 4:00pm'],
  ['Sunday','Closed']
]

export default function Contact(){
  const { t } = useI18n()
  const [form, setForm] = useState({ name:'', email:'', phone:'', message:'', consent:false })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e)=>{
    const {name, type, checked, value} = e.target
    setForm(prev => ({...prev, [name]: type==='checkbox'?checked:value}))
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    setSubmitted(true)
    setTimeout(()=>setSubmitted(false), 2500)
    setForm({ name:'', email:'', phone:'', message:'', consent:false })
  }

  return (
    <section id="contact" className="contact">
      <Container>
        <div className="contact-grid">
          <div>
            <div className="eyebrow">{t('contact.eyebrow')}</div>
            <h3 style={{fontFamily:'Playfair Display, serif', fontSize:28, margin:'0 0 8px'}}>{t('contact.title')}</h3>
            <p style={{color:'#cfe2d7'}}>{t('contact.p')}</p>

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
              <button className="btn" type="submit">{submitted? t('contact.form.sent') : t('contact.form.submit')}</button>
            </form>
          </div>

          <aside className="aside">
            <h4>{t('aside.title')}</h4>
            <div className="item">📍  {t('aside.address')}</div>
            <div className="item">✉️  {t('aside.email')}</div>
            <div className="item">☎️  {t('aside.phone')}</div>
            <div className="hours">
              <strong>{t('hours.label')}</strong>
              <HoursList hours={HOURS} />
            </div>
          </aside>
        </div>
      </Container>
    </section>
  )
}
