import type { Locale } from '@/i18n/dictionaries'
import { dict } from '@/i18n/dictionaries'
import { localePath } from '@/i18n/getLocale'

export function getNavLinks(locale: Locale) {
  const t = dict[locale].nav
  return [
    { href: localePath(locale, '/'), label: t.home },
    { href: localePath(locale, '/#about'), label: t.about },
    { href: localePath(locale, '/#services'), label: t.services },
    { href: localePath(locale, '/blog'), label: t.blog },
    { href: localePath(locale, '/#contact'), label: t.contact },
  ]
}
