import { seoPlugin } from '@payloadcms/plugin-seo'
import { s3Storage } from '@payloadcms/storage-s3'
import { Plugin } from 'payload'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'

import { Post } from '@/payload-types'
import { getServerSideURL } from '@/payload/utils/getURL'

const generateTitle: GenerateTitle<Post> = ({ doc }) => {
  return doc?.title ? `${doc.title} | นพ. — Doctor Personal Branding` : 'นพ. — Doctor Personal Branding'
}

const generateURL: GenerateURL<Post> = ({ doc }) => {
  const url = getServerSideURL()
  return doc?.slug ? `${url}/blog/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  s3Storage({
    collections: {
      media: true,
    },
    bucket: process.env.R2_BUCKET as string,
    config: {
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
      },
      region: 'auto',
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    },
  }),
]
