import Container from '../components/Container.jsx'
import Button from '../components/Button.jsx'
import { scrollToId } from '../utils/scroll.js'
import { useI18n } from '../i18n/i18n.jsx'
import aboutImg from '../data/images/banner.webp'

export default function About() {
    const { t } = useI18n()

    return (
        <section id="about" className="about">
            <Container>
                <div className="about-grid">
                    <div className="about-card">
                        <div className="eyebrow">{t('about.eyebrow')}</div>
                        <h2 className="about-title">{t('about.title')}</h2>
                        <p className="lead">{t('about.lead')}</p>

                        <ul className="feature-list">
                            <li>{t('about.feature.modern')}</li>
                            <li>{t('about.feature.drivers')}</li>
                            <li>{t('about.feature.flexible')}</li>
                            <li>{t('about.feature.coverage')}</li>
                        </ul>

                        <div className="about-ctas">
                            <Button href="#contact" onClick={(e) => { e.preventDefault(); scrollToId('contact') }}>
                                {t('about.cta.contact')}
                            </Button>
                            <Button href="#services" onClick={(e) => { e.preventDefault(); scrollToId('services') }}>
                                {t('about.cta.services')}
                            </Button>
                        </div>
                    </div>

                    <div className="about-media" aria-hidden="true">
                        <img
                            src={aboutImg}
                            alt={t('brand.name')}
                        />
                    </div>
                </div>

                <div className="about-stats">
                    <div className="stat">
                        <div className="stat-num">100%</div>
                        <div className="stat-label">{t('about.stats.satisfaction')}</div>
                    </div>
                    <div className="stat">
                        <div className="stat-num">99%</div>
                        <div className="stat-label">{t('about.stats.ontime')}</div>
                    </div>
                    <div className="stat">
                        <div className="stat-num">24/7</div>
                        <div className="stat-label">{t('about.stats.support')}</div>
                    </div>
                </div>
            </Container>
        </section>
    )
}
