import Link from 'next/link'
import Image from 'next/image'
import type { Locale } from '@/i18n/dictionaries'
import { dict } from '@/i18n/dictionaries'
import { localePath } from '@/i18n/getLocale'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getMediaUrl } from '@/payload/utils/getMediaUrl'

export default async function BlogList({ locale }: { locale: Locale }) {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'posts',
    sort: '-publishedAt',
    limit: 24,
    depth: 1,
    locale,
  })

  const t = dict[locale]

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="mb-10 md:mb-14 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{t.blog.title}</h1>
          <div className="w-16 h-1 bg-[var(--brand-teal)] mx-auto" />
        </div>

        {docs.length === 0 ? (
          <p className="text-center text-slate-500">{t.blog.empty}</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {docs.map((post) => {
              const thumb = post.thumbnail && typeof post.thumbnail === 'object' ? post.thumbnail : null
              const url = thumb?.url ? getMediaUrl(thumb.url) : null
              const title = locale === 'en' && post.englishTitle ? post.englishTitle : post.title
              const cat = post.category && typeof post.category === 'object' ? post.category : null
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
                  className="group rounded-2xl overflow-hidden bg-white border border-slate-100 hover:shadow-lg transition flex flex-col"
                >
                  <div className="aspect-video relative bg-slate-100">
                    {url ? (
                      <Image
                        src={url}
                        alt={thumb?.alt || title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition duration-500"
                      />
                    ) : null}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                      {cat && (
                        <span className="inline-flex px-2 py-1 rounded-full bg-[var(--brand-teal)]/10 text-[var(--brand-teal)] font-medium">
                          {cat.name}
                        </span>
                      )}
                      <span>{dateStr}</span>
                    </div>
                    <h2 className="font-semibold text-lg leading-snug mb-2 line-clamp-2">{title}</h2>
                    {post.excerpt && (
                      <p className="text-sm text-slate-600 line-clamp-3 flex-1">{post.excerpt}</p>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
