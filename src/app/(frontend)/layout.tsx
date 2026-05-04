import type { Metadata } from 'next'
import { Noto_Sans_Thai } from 'next/font/google'
import React from 'react'

import { Providers } from '@/frontend/components/providers'
import { mergeOpenGraph } from '@/payload/utils/mergeOpenGraph'
import { getServerSideURL } from '@/payload/utils/getURL'

import './globals.css'

const notoThai = Noto_Sans_Thai({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-noto-thai',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={notoThai.variable} suppressHydrationWarning>
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col bg-white text-slate-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: { default: 'นพ. — Doctor Personal Branding', template: '%s | นพ.' },
  description: 'แพทย์ผู้เชี่ยวชาญด้านศัลยกรรมกระดูกและข้อ',
  openGraph: mergeOpenGraph(),
  twitter: { card: 'summary_large_image' },
}
