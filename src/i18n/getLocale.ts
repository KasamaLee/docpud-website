import type { Locale } from './dictionaries'

export const altLocale = (l: Locale): Locale => (l === 'th' ? 'en' : 'th')

export const localePath = (locale: Locale, path: string): string => {
  const clean = path.startsWith('/') ? path : `/${path}`
  if (locale === 'th') return clean === '/' ? '/' : clean
  return clean === '/' ? '/en' : `/en${clean}`
}
