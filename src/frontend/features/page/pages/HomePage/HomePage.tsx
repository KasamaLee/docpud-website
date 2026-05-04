import type { Locale } from '@/i18n/dictionaries'
import { getStaticDoctor } from '@/frontend/constants/static'
import SiteShell from '@/frontend/components/layouts/SiteShell'
import Hero from '@/frontend/features/page/components/Hero'
import About from '@/frontend/features/page/components/About'
import LatestPosts from '@/frontend/features/blog/components/LatestPosts'

export default function HomePage({ locale }: { locale: Locale }) {
  const doctor = getStaticDoctor(locale)
  return (
    <SiteShell locale={locale}>
      <Hero locale={locale} doctor={doctor} />
      <About locale={locale} doctor={doctor} />
      <LatestPosts locale={locale} />
    </SiteShell>
  )
}
