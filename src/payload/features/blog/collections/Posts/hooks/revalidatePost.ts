import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Post } from '@/payload-types'

const paths = (slug?: string | null): string[] =>
  slug ? [`/blog/${slug}`, `/en/blog/${slug}`, '/blog', '/en/blog', '/', '/en'] : []

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (context.disableRevalidate) return doc

  if (doc._status === 'published') {
    for (const path of paths(doc.slug)) {
      payload.logger.info(`Revalidating ${path}`)
      revalidatePath(path)
    }
    revalidateTag('posts-sitemap', 'max')
  }

  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    for (const path of paths(previousDoc.slug)) {
      revalidatePath(path)
    }
    revalidateTag('posts-sitemap', 'max')
  }

  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({ doc, req: { context } }) => {
  if (context.disableRevalidate) return doc

  for (const path of paths(doc?.slug)) {
    revalidatePath(path)
  }
  revalidateTag('posts-sitemap', 'max')

  return doc
}
