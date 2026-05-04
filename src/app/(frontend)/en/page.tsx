import HomePage from '@/frontend/features/page/pages/HomePage'
import { generateHomeMetadata } from '@/frontend/utils/metadata'
import type { Metadata } from 'next'

export const generateMetadata = (): Promise<Metadata> => generateHomeMetadata('en')

export default function Page() {
  return <HomePage locale="en" />
}
