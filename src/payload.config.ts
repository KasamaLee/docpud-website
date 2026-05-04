import { mongooseAdapter } from '@payloadcms/db-mongodb'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from '@/payload/features/blog/collections/Categories'
import { Media } from '@/payload/features/blog/collections/Media'
import { Posts } from '@/payload/features/blog/collections/Posts'
import { Users } from '@/payload/features/user/collections/Users'
import { plugins } from '@/payload/plugins'
import { defaultLexical } from '@/payload/fields/defaultLexical'
import { getServerSideURL } from '@/payload/utils/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || process.env.DATABASE_URL || '',
  }),
  collections: [Posts, Media, Categories, Users],
  localization: {
    locales: [
      { label: 'ภาษาไทย', code: 'th' },
      { label: 'English', code: 'en' },
    ],
    defaultLocale: 'th',
    fallback: true,
  },
  cors: [getServerSideURL()].filter(Boolean),
  plugins,
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true
        const secret = process.env.CRON_SECRET
        if (!secret) return false
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
