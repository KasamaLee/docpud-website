'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import type { Locale } from '@/i18n/dictionaries'
import { dict } from '@/i18n/dictionaries'
import { altLocale, localePath } from '@/i18n/getLocale'
import { getNavLinks } from '@/frontend/constants/navigation'

type Props = { locale: Locale; doctorName: string }

export default function Header({ locale, doctorName }: Props) {
  const pathname = usePathname() || '/'
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const t = dict[locale].nav

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const stripped = locale === 'en' ? pathname.replace(/^\/en/, '') || '/' : pathname
  const switchTo = altLocale(locale)
  const switchHref = localePath(switchTo, stripped)

  const links = getNavLinks(locale)

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/98 backdrop-blur-md shadow-sm border-b border-slate-100'
          : 'bg-white/95 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href={localePath(locale, '/')} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl gradient-navy text-white flex items-center justify-center font-bold text-sm shadow-md group-hover:shadow-lg transition-shadow">
              นพ
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-[var(--brand-navy)] text-base leading-tight">{doctorName}</div>
              <div className="text-[10px] text-[var(--brand-teal)] font-semibold tracking-widest uppercase">Orthopaedics</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 text-sm">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-4 py-2 rounded-lg text-slate-600 hover:text-[var(--brand-navy)] hover:bg-slate-50 font-medium transition-all"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {/* Lang toggle */}
            <Link
              href={switchHref}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 hover:border-[var(--brand-teal)] hover:text-[var(--brand-teal)] transition-all"
              aria-label={`Switch to ${switchTo.toUpperCase()}`}
            >
              <span className={locale === 'th' ? 'text-[var(--brand-navy)] font-bold' : 'opacity-50'}>TH</span>
              <span className="text-slate-300">|</span>
              <span className={locale === 'en' ? 'text-[var(--brand-navy)] font-bold' : 'opacity-50'}>EN</span>
            </Link>

            {/* CTA */}
            <Link
              href={localePath(locale, '/#contact')}
              className="px-5 py-2 rounded-full gradient-navy text-white text-xs font-semibold shadow hover:shadow-md transition-all hover:scale-105"
            >
              {dict[locale].cta.book}
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition"
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-slate-100 py-4 flex flex-col gap-1 animate-in slide-in-from-top-2 duration-150">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-3 py-3 rounded-lg text-slate-700 hover:text-[var(--brand-navy)] hover:bg-slate-50 font-medium transition"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 mt-2 pt-3 border-t border-slate-100 px-3">
              <Link
                href={switchHref}
                className="text-sm text-slate-500 hover:text-[var(--brand-teal)]"
                onClick={() => setOpen(false)}
              >
                {locale === 'th' ? '🇬🇧 Switch to English' : '🇹🇭 เปลี่ยนเป็นภาษาไทย'}
              </Link>
              <Link
                href={localePath(locale, '/#contact')}
                className="ml-auto px-4 py-2 rounded-full gradient-navy text-white text-xs font-semibold"
                onClick={() => setOpen(false)}
              >
                {dict[locale].cta.book}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
