import Container from './Container.jsx'
import { useI18n } from '../i18n/i18n.jsx'

export default function Footer(){
  const { t } = useI18n()
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <Container>
        <div style={{display:'flex',justifyContent:'space-between',gap:12,flexWrap:'wrap'}}>
          <span>{t('footer.copyright',{year})}</span>
          <span>
            <a href="#">{t('footer.privacy')}</a> · <a href="#">{t('footer.terms')}</a>
          </span>
        </div>
      </Container>
    </footer>
  )
}
