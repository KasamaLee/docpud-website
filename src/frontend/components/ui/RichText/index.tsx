import {
  type DefaultNodeTypes,
  type DefaultTypedEditorState,
  type SerializedBlockNode,
} from '@payloadcms/richtext-lexical'
import {
  type JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import { cn } from '@/payload/utils/ui'

const internalDocToHref = ({ linkNode }: { linkNode: { fields: { doc?: { value: any; relationTo: string } } } }) => {
  const doc = linkNode.fields.doc
  if (!doc || typeof doc.value !== 'object') return '#'
  const slug = doc.value.slug
  return doc.relationTo === 'posts' ? `/blog/${slug}` : `/${slug}`
}

type VideoEmbedFields = { url: string; caption?: string }

type EmbedResult =
  | { type: 'youtube'; src: string }
  | { type: 'vimeo'; src: string }
  | { type: 'facebook'; src: string }
  | { type: 'tiktok'; src: string }
  | { type: 'iframe'; src: string }

function resolveEmbed(rawUrl: string): EmbedResult | null {
  let url: URL
  try { url = new URL(rawUrl) } catch { return null }

  const host = url.hostname.replace('www.', '')

  // YouTube
  if (host === 'youtube.com' || host === 'm.youtube.com') {
    const id = url.searchParams.get('v')
    if (id) return { type: 'youtube', src: `https://www.youtube.com/embed/${id}` }
  }
  if (host === 'youtu.be') {
    const id = url.pathname.slice(1)
    if (id) return { type: 'youtube', src: `https://www.youtube.com/embed/${id}` }
  }

  // Vimeo
  if (host === 'vimeo.com' || host === 'player.vimeo.com') {
    const id = url.pathname.split('/').filter(Boolean).pop()
    if (id) return { type: 'vimeo', src: `https://player.vimeo.com/video/${id}` }
  }

  // Facebook video
  if (host === 'facebook.com' || host === 'fb.watch') {
    const encoded = encodeURIComponent(rawUrl)
    return {
      type: 'facebook',
      src: `https://www.facebook.com/plugins/video.php?href=${encoded}&show_text=false&width=560`,
    }
  }

  // TikTok
  if (host === 'tiktok.com' || host === 'vm.tiktok.com') {
    const videoId = url.pathname.split('/video/')[1]?.split('?')[0]
    if (videoId) return { type: 'tiktok', src: `https://www.tiktok.com/embed/v2/${videoId}` }
  }

  // Fallback — render as generic iframe
  return { type: 'iframe', src: rawUrl }
}

const jsxConverters: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref: internalDocToHref as any }),
  upload: ({ node }: { node: any }) => {
    const { value } = node
    if (!value?.url) return null
    const mimeType: string = value.mimeType || ''
    const url: string = value.url
    const alt: string = value.alt || ''

    if (mimeType.startsWith('video/')) {
      return (
        <figure className="my-8 not-prose">
          <video
            src={url}
            controls
            className="w-full rounded-2xl shadow-lg bg-black"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-slate-500">{value.caption}</figcaption>
          )}
        </figure>
      )
    }

    return defaultConverters.upload?.({ node } as any) ?? null
  },
  blocks: {
    videoEmbed: ({ node }: { node: SerializedBlockNode<VideoEmbedFields> }) => {
      const { url, caption } = node.fields
      const embed = resolveEmbed(url)
      if (!embed) return null

      const allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'

      const isTikTok = embed.type === 'tiktok'

      return (
        <figure className="my-8 not-prose flex flex-col items-center">
          {isTikTok ? (
            <iframe
              src={embed.src}
              title={caption || 'Video'}
              allow={allow}
              allowFullScreen
              width={325}
              height={738}
              className="rounded-2xl shadow-lg"
            />
          ) : (
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg bg-black">
              <iframe
                src={embed.src}
                title={caption || 'Video'}
                allow={allow}
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          )}
          {caption && (
            <figcaption className="mt-2 text-center text-sm text-slate-500">{caption}</figcaption>
          )}
        </figure>
      )
    },
  },
})

type Props = {
  data: DefaultTypedEditorState
  className?: string
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText({ className, enableProse = true, data, ...rest }: Props) {
  return (
    <ConvertRichText
      data={data}
      converters={jsxConverters}
      className={cn('payload-richtext', enableProse && 'prose md:prose-lg max-w-none', className)}
      {...rest}
    />
  )
}
