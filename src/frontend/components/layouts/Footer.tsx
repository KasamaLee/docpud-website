import Link from 'next/link'
import type { Locale } from '@/i18n/dictionaries'
import { dict } from '@/i18n/dictionaries'
import { localePath } from '@/i18n/getLocale'
import { getNavLinks } from '@/frontend/constants/navigation'

type Props = {
  locale: Locale
  doctor: {
    name: string
    specialty: string
    hospital: string
    phone: string
    lineId?: string | null
  }
}

export default function Footer({ locale, doctor }: Props) {
  const t = dict[locale].contact
  const nav = dict[locale].nav

  const links = getNavLinks(locale)

  return (
    <footer className="mt-auto gradient-navy text-slate-100">
      {/* Top bar accent */}
      <div className="h-1 w-full gradient-teal" />

      <div className="container mx-auto px-4 lg:px-8 max-w-6xl py-14">
        <div className="grid gap-10 md:grid-cols-3 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center font-bold text-sm">
                นพ
              </div>
              <div>
                <div className="font-bold text-white text-base leading-tight">{doctor.name}</div>
                <div className="text-[10px] text-[var(--brand-teal-light)] font-semibold tracking-widest uppercase">Orthopaedics</div>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              {doctor.specialty} · {doctor.hospital}
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              {['fb', 'ig', 'yt'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[var(--brand-teal)] flex items-center justify-center transition-colors"
                  aria-label={s}
                >
                  <span className="text-xs font-bold text-white uppercase">{s[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
              {locale === 'th' ? 'เมนู' : 'Navigation'}
            </div>
            {links.map((l) => (
              <div key={l.href}>
                <Link href={l.href} className="text-sm text-slate-300 hover:text-white transition-colors">
                  {l.label}
                </Link>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
              {dict[locale].home.contactTitle}
            </div>
            <a
              href={`tel:${doctor.phone}`}
              className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors group"
            >
              <span className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-[var(--brand-teal)] flex items-center justify-center transition-colors flex-shrink-0">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </span>
              {doctor.phone}
            </a>
            {doctor.lineId && (
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-bold text-green-400">LINE</span>
                </span>
                {doctor.lineId}
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              {doctor.hospital}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} {doctor.name}. All rights reserved.</span>
          <span className="text-slate-600">Orthopaedic Surgeon · Thailand</span>
        </div>
      </div>
    </footer>
  )
}
