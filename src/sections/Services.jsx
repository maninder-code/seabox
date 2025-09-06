import Container from '../components/Container.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import { services } from '../data/services.js'
import { useI18n } from '../i18n/i18n.jsx'

export default function Services() {
  const { t } = useI18n()
  const cards = [
    { id: 'ftl', img: services.find(s => s.id === 'ftl').img, title: t('services.ftl.title'), blurb: t('services.ftl.blurb') },
    { id: 'ltl', img: services.find(s => s.id === 'ltl').img, title: t('services.ltl.title'), blurb: t('services.ltl.blurb') },
    { id: 'flatbed', img: services.find(s => s.id === 'flatbed').img, title: t('services.flatbed.title'), blurb: t('services.flatbed.blurb') },
  ]

  return (
    <section id="services" className="section">
      <Container>
        <div className="eyebrow">{t('services.eyebrow')}</div>
        <h3>{t('services.title')}</h3>
        <div className="cards">
          {cards.map(s => (<ServiceCard key={s.id} img={s.img} title={s.title} blurb={s.blurb} />))}
        </div>
      </Container>
    </section>
  )
}
