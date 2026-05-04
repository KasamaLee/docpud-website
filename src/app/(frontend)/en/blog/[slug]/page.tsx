import SiteShell from '@/frontend/components/layouts/SiteShell'
import PostDetail from '@/frontend/features/blog/components/PostDetail'
import { generatePostMetadata } from '@/frontend/utils/metadata'
import type { Metadata } from 'next'

type Params = { slug: string }

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  return generatePostMetadata('en', slug)
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  return (
    <SiteShell locale="en">
      <PostDetail locale="en" slug={slug} />
    </SiteShell>
  )
}
