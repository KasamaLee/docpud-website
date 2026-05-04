import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'
import { seed } from '@/payload/scripts/seed/doctor-seed'

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return new NextResponse('Disabled in production', { status: 403 })
  }
  const payload = await getPayload({ config })
  try {
    await seed({ payload })
    return NextResponse.json({ ok: true })
  } catch (e) {
    payload.logger.error({ err: e }, 'Seed failed')
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 })
  }
}
