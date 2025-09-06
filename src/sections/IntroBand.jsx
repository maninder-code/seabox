import Container from '../components/Container.jsx'
import { useI18n } from '../i18n/i18n.jsx'

export default function IntroBand(){
  const { t } = useI18n()
  return (
    <section className="band">
      <Container>
        <div className="band-grid">
          <div className="panel">
            <div className="eyebrow">{t('band.why.eyebrow')}</div>
            <h2>{t('band.why.title')}</h2>
            <p>{t('band.why.p1')}</p>
          </div>
          <div className="panel">
            <h2>{t('band.safety.title')}</h2>
            <p>{t('band.safety.p1')}</p>
            <a className="cta-minor" href="#contact">{t('band.safety.cta')}</a>
          </div>
        </div>
      </Container>
    </section>
  )
}
