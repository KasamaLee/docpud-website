import {
  BoldFeature,
  BlockquoteFeature,
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  SubscriptFeature,
  SuperscriptFeature,
  UnderlineFeature,
  UnorderedListFeature,
  UploadFeature,
  lexicalEditor,
  type LinkFields,
} from '@payloadcms/richtext-lexical'
import type { Block, TextFieldSingleValidation } from 'payload'

const VideoEmbedBlock: Block = {
  slug: 'videoEmbed',
  labels: { singular: 'Video Embed', plural: 'Video Embeds' },
  fields: [
    {
      name: 'url',
      type: 'text',
      label: 'Video URL',
      required: true,
      admin: {
        placeholder: 'https://www.youtube.com/watch?v=... หรือ Facebook / Vimeo / TikTok',
        description: 'รองรับ YouTube, Facebook, Vimeo, TikTok — วาง URL ของวิดีโอที่ต้องการแทรก',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'คำบรรยาย (ไม่บังคับ)',
    },
  ],
}

export const defaultLexical = lexicalEditor({
  features: [
    ParagraphFeature(),
    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    BlockquoteFeature(),
    OrderedListFeature(),
    UnorderedListFeature(),
    SubscriptFeature(),
    SuperscriptFeature(),
    UnderlineFeature(),
    HorizontalRuleFeature(),
    UploadFeature({
      collections: {
        media: { fields: [{ name: 'caption', type: 'text', label: 'Caption' }] },
      },
    }),
    BlocksFeature({ blocks: [VideoEmbedBlock] }),
    LinkFeature({
      enabledCollections: ['posts'],
      fields: ({ defaultFields }) => {
        const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
          if ('name' in field && field.name === 'url') return false
          return true
        })
        return [
          ...defaultFieldsWithoutUrl,
          {
            name: 'url',
            type: 'text',
            admin: {
              condition: (_data, siblingData) => siblingData?.linkType !== 'internal',
            },
            label: ({ t }) => t('fields:enterURL'),
            required: true,
            validate: ((value, options) => {
              if ((options?.siblingData as LinkFields)?.linkType === 'internal') return true
              return value ? true : 'URL is required'
            }) as TextFieldSingleValidation,
          },
        ]
      },
    }),
    FixedToolbarFeature(),
    InlineToolbarFeature(),
  ],
})
