import Link from 'next/link'
import type { Locale } from '@/i18n/dictionaries'
import { dict } from '@/i18n/dictionaries'
import { localePath } from '@/i18n/getLocale'

type Props = {
  locale: Locale
  doctor: {
    name: string
    specialty: string
    hospital: string
  }
}

const features = [
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
    th: 'ผ่าตัดส่องกล้องข้อเข่าและข้อไหล่',
    en: 'Knee & Shoulder Arthroscopy',
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
    th: 'เวชศาสตร์การกีฬาและการบาดเจ็บ',
    en: 'Sports Medicine & Injury Care',
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
    th: 'ดูแลผู้ป่วยอย่างใส่ใจและเป็นกันเอง',
    en: 'Patient-centred Compassionate Care',
  },
]

export default function Hero({ locale, doctor }: Props) {
  const t = dict[locale]

  return (
    <section className="relative min-h-[90vh] flex flex-col md:flex-row overflow-hidden">
      {/* Left — content */}
      <div className="flex-1 gradient-navy flex flex-col justify-center px-8 md:px-14 lg:px-20 py-20 z-10">
        <div className="max-w-lg">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-px bg-[var(--brand-teal-light)]" />
            <span className="text-[var(--brand-teal-light)] text-xs font-bold tracking-[0.2em] uppercase">
              {doctor.specialty}
            </span>
          </div>

          {/* Name */}
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.08] mb-4 text-balance drop-shadow-sm">
            {doctor.name}
          </h1>

          {/* Hospital */}
          <p className="text-slate-300 text-base md:text-lg mb-10 flex items-center gap-2">
            <svg className="w-4 h-4 text-[var(--brand-teal-light)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {doctor.hospital}
          </p>

          {/* Features */}
          <ul className="space-y-3 mb-12">
            {features.map((f, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-200 text-sm">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--brand-teal)]/20 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-[var(--brand-teal-light)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {f.icon}
                  </svg>
                </span>
                {locale === 'th' ? f.th : f.en}
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link
              href={localePath(locale, '/#contact')}
              className="inline-flex items-center gap-2 bg-[var(--brand-gold)] hover:bg-[var(--brand-gold-light)] text-slate-900 font-bold px-7 py-3.5 rounded-full transition-all hover:scale-105 shadow-lg shadow-amber-500/25 text-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {t.cta.book}
            </Link>
            <Link
              href={localePath(locale, '/blog')}
              className="inline-flex items-center gap-2 border border-white/25 hover:border-white/60 hover:bg-white/8 text-white font-semibold px-7 py-3.5 rounded-full transition-all text-sm"
            >
              {t.nav.blog}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

        </div>
      </div>

      {/* Right — image */}
      <div className="flex-1 relative min-h-[50vh] md:min-h-full">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat" />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-navy-dark)] via-[var(--brand-navy)]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-navy-dark)]/60 via-transparent to-transparent" />

        {/* Specialty badge — bottom right */}
        <div className="absolute bottom-10 right-8 z-10 text-right hidden lg:block">
          <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4">
            <div className="text-white text-2xl font-extrabold tracking-tight leading-tight">ORTHOPAEDICS</div>
            <div className="text-[var(--brand-teal-light)] text-xs tracking-widest font-medium mt-1">Shoulder · Knee · Sports</div>
          </div>
        </div>
      </div>
    </section>
  )
}
