import Container from '../components/Container.jsx'
import Button from '../components/Button.jsx'
import { scrollToId } from '../utils/scroll.js'
import { useI18n } from '../i18n/i18n.jsx'

export default function Hero(){
  const { t } = useI18n()
  return (
    <section className="hero">
      <Container>
        <div className="hero-inner">
          <div className="hero-card">
            <div className="eyebrow">{t('hero.eyebrow')}</div>
            <h1>{t('hero.title')}</h1>
            <p className="lead">{t('hero.lead')}</p>
            <Button href="#contact" onClick={(e)=>{e.preventDefault();scrollToId('contact')}}>{t('hero.cta')}</Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
