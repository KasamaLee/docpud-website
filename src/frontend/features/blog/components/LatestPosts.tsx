import Link from 'next/link'
import Image from 'next/image'
import type { Locale } from '@/i18n/dictionaries'
import { dict } from '@/i18n/dictionaries'
import { localePath } from '@/i18n/getLocale'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getMediaUrl } from '@/payload/utils/getMediaUrl'

export default async function LatestPosts({ locale }: { locale: Locale }) {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'posts',
    sort: '-publishedAt',
    limit: 3,
    depth: 1,
    locale,
  })

  const t = dict[locale]
  if (docs.length === 0) return null

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">{t.home.latestTitle}</h2>
            <div className="w-16 h-1 bg-[var(--brand-teal)]" />
          </div>
          <Link
            href={localePath(locale, '/blog')}
            className="text-[var(--brand-teal)] hover:underline text-sm font-medium hidden sm:inline"
          >
            {t.home.viewAll} →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {docs.map((post) => {
            const thumb = post.thumbnail && typeof post.thumbnail === 'object' ? post.thumbnail : null
            const url = thumb?.url ? getMediaUrl(thumb.url) : null
            const title = locale === 'en' && post.englishTitle ? post.englishTitle : post.title
            const dateStr = post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString(locale === 'th' ? 'th-TH' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : ''
            return (
              <Link
                key={post.id}
                href={localePath(locale, `/blog/${post.slug}`)}
                className="group rounded-2xl overflow-hidden bg-white border border-slate-100 hover:shadow-lg transition"
              >
                <div className="aspect-video relative bg-slate-100">
                  {url ? (
                    <Image
                      src={url}
                      alt={thumb?.alt || title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                  ) : null}
                </div>
                <div className="p-5">
                  <p className="text-xs text-slate-500 mb-2">{dateStr}</p>
                  <h3 className="font-semibold text-lg leading-snug mb-2 line-clamp-2">{title}</h3>
                  {post.excerpt && (
                    <p className="text-sm text-slate-600 line-clamp-2">{post.excerpt}</p>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
