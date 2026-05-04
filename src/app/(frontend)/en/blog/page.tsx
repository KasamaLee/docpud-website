import SiteShell from '@/frontend/components/layouts/SiteShell'
import BlogList from '@/frontend/features/blog/components/BlogList'
import { generateBlogListMetadata } from '@/frontend/utils/metadata'
import type { Metadata } from 'next'

export const generateMetadata = (): Promise<Metadata> => generateBlogListMetadata('en')

export default function Page() {
  return (
    <SiteShell locale="en">
      <BlogList locale="en" />
    </SiteShell>
  )
}
