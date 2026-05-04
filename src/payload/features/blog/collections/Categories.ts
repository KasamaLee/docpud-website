import type { CollectionConfig } from 'payload'

import { anyone } from '@/payload/access/anyone'
import { authenticated } from '@/payload/access/authenticated'
import { slugField } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug'],
  },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    slugField({ useAsSlug: 'name' }),
  ],
}
