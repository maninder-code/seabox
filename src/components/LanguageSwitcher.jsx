import { useI18n } from '../i18n/i18n.jsx'
export default function LanguageSwitcher(){const {locale,setLocale,t}=useI18n();return(<label className='lang'><span>🌐</span><select value={locale} onChange={e=>setLocale(e.target.value)} aria-label={t('nav.language')||'Language'}><option value='en'>English</option><option value='es'>Español</option><option value='de'>Deutsch</option></select></label>)}
