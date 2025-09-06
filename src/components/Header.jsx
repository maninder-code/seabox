import Container from './Container.jsx'
import { scrollToId } from '../utils/scroll.js'
import { useI18n } from '../i18n/i18n.jsx'
import LanguageSwitcher from './LanguageSwitcher.jsx'

export default function Header(){
  const { t } = useI18n()
  return (
    <header className="site-header">
      <Container>
        <nav className="nav">
          <div className="brand">{t('brand.name')}</div>
          <div className="nav-links">
            <a href="#home" onClick={(e)=>{e.preventDefault();window.scrollTo({top:0,behavior:'smooth'})}}>{t('nav.home')}</a>
            <a href="#services" onClick={(e)=>{e.preventDefault();scrollToId('services')}}>{t('nav.services')}</a>
            <a href="#fleet" onClick={(e)=>{e.preventDefault();scrollToId('services')}}>{t('nav.fleet')}</a>
            <a href="#contact" onClick={(e)=>{e.preventDefault();scrollToId('contact')}}>{t('nav.contact')}</a>
            <LanguageSwitcher />
          </div>
        </nav>
      </Container>
    </header>
  )
}
