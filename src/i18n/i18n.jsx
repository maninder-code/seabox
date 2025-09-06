import React, {createContext, useContext, useEffect, useMemo, useState} from 'react'
import { parseProperties, interpolate } from './properties.js'

const loaders = {
  en: () => import('./locales/en.properties?raw'),
  es: () => import('./locales/es.properties?raw'),
  de: () => import('./locales/de.properties?raw'),
}

const I18nCtx = createContext({ t:(k)=>k, locale:'en', setLocale:()=>{} })

export function I18nProvider({children}){
  const [locale, setLocale] = useState(() => localStorage.getItem('locale') || 'en')
  const [dict, setDict] = useState({})

  useEffect(() => {
    localStorage.setItem('locale', locale)
    const loader = loaders[locale] || loaders.en
    loader().then(mod => {
      const obj = parseProperties(mod.default)
      setDict(obj)
      if (obj['meta.title']) document.title = obj['meta.title']
    })
  }, [locale])

  const t = useMemo(() => (key, vars) => {
    const raw = dict[key] || key
    return interpolate(raw, vars)
  }, [dict])

  const value = useMemo(() => ({ t, locale, setLocale }), [t, locale])
  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>
}

export function useI18n(){ return useContext(I18nCtx) }
