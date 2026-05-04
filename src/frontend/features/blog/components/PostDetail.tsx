import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Locale } from '@/i18n/dictionaries'
import { dict } from '@/i18n/dictionaries'
import { localePath } from '@/i18n/getLocale'
import { getMediaUrl } from '@/payload/utils/getMediaUrl'
import RichText from '@/frontend/components/ui/RichText'

export default async function PostDetail({ locale, slug }: { locale: Locale; slug: string }) {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
    locale,
  })
  const post = docs[0]
  if (!post) return notFound()

  const t = dict[locale]
  const title = locale === 'en' && post.englishTitle ? post.englishTitle : post.title
  const body = locale === 'en' && post.englishContent ? post.englishContent : post.content
  const thumb = post.thumbnail && typeof post.thumbnail === 'object' ? post.thumbnail : null
  const thumbUrl = thumb?.url ? getMediaUrl(thumb.url) : null
  const dateStr = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(locale === 'th' ? 'th-TH' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''
  const cat = post.category && typeof post.category === 'object' ? post.category : null

  return (
    <article className="py-10 md:py-16">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        {/* Back link */}
        <Link
          href={localePath(locale, '/blog')}
          className="inline-flex items-center gap-1.5 text-[var(--brand-teal)] hover:text-[var(--brand-navy)] text-sm font-medium mb-8 transition-colors"
        >
          {t.blog.back}
        </Link>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 text-sm text-slate-500 mb-4">
            {cat && (
              <span className="inline-flex px-3 py-1 rounded-full bg-[var(--brand-teal)]/10 text-[var(--brand-teal)] font-semibold text-xs">
                {cat.name}
              </span>
            )}
            {dateStr && (
              <span>
                {t.blog.published} {dateStr}
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-[var(--brand-navy)]">
            {title}
          </h1>
        </header>

        {/* Thumbnail */}
        {thumbUrl && (
          <div className="aspect-video relative w-full rounded-2xl overflow-hidden mb-10 bg-slate-100 shadow-md">
            <Image
              src={thumbUrl}
              alt={thumb?.alt || title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Body — RichText handles paragraphs, headings, images, YouTube blocks, links */}
        {body && <RichText data={body as any} />}

        {/* Back link bottom */}
        <div className="mt-12 pt-8 border-t border-slate-100">
          <Link
            href={localePath(locale, '/blog')}
            className="inline-flex items-center gap-1.5 text-[var(--brand-teal)] hover:text-[var(--brand-navy)] text-sm font-medium transition-colors"
          >
            {t.blog.back}
          </Link>
        </div>
      </div>
    </article>
  )
}
