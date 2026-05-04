import type { Locale } from '@/i18n/dictionaries'
import { getStaticDoctor } from '@/frontend/constants/static'
import Header from './Header'
import Footer from './Footer'

export default function SiteShell({
  locale,
  children,
}: {
  locale: Locale
  children: React.ReactNode
}) {
  const doctor = getStaticDoctor(locale)
  return (
    <>
      <Header locale={locale} doctorName={doctor.name} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} doctor={doctor} />
    </>
  )
}
