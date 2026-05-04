import type { Metadata } from 'next'
import type { Locale } from '@/i18n/dictionaries'
import { getStaticDoctor } from '@/frontend/constants/static'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function generateHomeMetadata(locale: Locale): Promise<Metadata> {
  const doctor = getStaticDoctor(locale)
  const title = `${doctor.name} — ${doctor.specialty}`
  const description = doctor.bio
  return {
    title,
    description,
    alternates: {
      languages: {
        th: '/',
        en: '/en',
      },
    },
  }
}

export async function generateBlogListMetadata(locale: Locale): Promise<Metadata> {
  const title = locale === 'th' ? 'บทความ' : 'Articles'
  return {
    title,
    alternates: {
      languages: { th: '/blog', en: '/en/blog' },
    },
  }
}

export async function generatePostMetadata(locale: Locale, slug: string): Promise<Metadata> {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
    locale,
  })
  const post = docs[0]
  if (!post) return { title: 'Not Found' }
  const title = locale === 'en' && post.englishTitle ? post.englishTitle : post.title
  return {
    title,
    description: post.excerpt || undefined,
    alternates: {
      languages: {
        th: `/blog/${post.slug}`,
        en: `/en/blog/${post.slug}`,
      },
    },
  }
}
