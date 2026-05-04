import type { CollectionConfig } from 'payload'

import { authenticated } from '@/payload/access/authenticated'
import { authenticatedOrPublished } from '@/payload/access/authenticatedOrPublished'
import { generatePreviewPath } from '@/payload/utils/generatePreviewPath'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from 'payload'
import { revalidateDelete, revalidatePost } from './hooks/revalidatePost'

export const Posts: CollectionConfig<'posts'> = {
  slug: 'posts',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    excerpt: true,
    thumbnail: true,
    category: true,
    publishedAt: true,
  },
  admin: {
    defaultColumns: ['title', 'category', 'publishedAt', '_status'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({ slug: data?.slug, collection: 'posts', req }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({ slug: data?.slug as string, collection: 'posts', req }),
    useAsTitle: 'title',
    description: 'เขียนบทความ แทรกรูปภาพและวิดีโอ YouTube ได้เลยในช่อง Content',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'ชื่อบทความ (ไทย)',
    },
    {
      name: 'englishTitle',
      type: 'text',
      label: 'ชื่อบทความ (อังกฤษ)',
      admin: { description: 'ถ้าไม่กรอก จะใช้ชื่อภาษาไทยแทน' },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: '📝 เนื้อหา',
          fields: [
            {
              name: 'thumbnail',
              type: 'upload',
              relationTo: 'media',
              label: 'รูปหน้าปก',
              admin: { description: 'รูปที่แสดงในรายการบทความ (แนะนำ 16:9)' },
            },
            {
              name: 'excerpt',
              type: 'textarea',
              label: 'สรุปย่อ',
              admin: { description: 'ข้อความสั้นๆ แสดงในรายการบทความ (ไม่เกิน 2-3 บรรทัด)' },
            },
            {
              name: 'content',
              type: 'richText',
              label: 'เนื้อหาบทความ (ไทย)',
              required: true,
              admin: {
                description: 'พิมพ์เนื้อหา · แทรกรูปด้วย "/" → Image · แทรก YouTube ด้วย "/" → YouTube Video',
              },
            },
            {
              name: 'englishContent',
              type: 'richText',
              label: 'เนื้อหาบทความ (อังกฤษ)',
              admin: { description: 'ถ้าไม่กรอก จะใช้เนื้อหาภาษาไทยแทน' },
            },
          ],
        },
        {
          label: '🔍 SEO',
          name: 'meta',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({ hasGenerateFn: true }),
            MetaImageField({ relationTo: 'media' }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      label: 'หมวดหมู่',
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'วันที่เผยแพร่',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePost],
    afterDelete: [revalidateDelete],
  },
  versions: false,
}
