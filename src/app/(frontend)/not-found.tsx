import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-28 max-w-2xl text-center">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-slate-600 mb-8">ไม่พบหน้าที่ค้นหา / Page not found</p>
      <Link
        href="/"
        className="inline-flex items-center bg-[var(--brand-teal)] hover:bg-[var(--brand-teal-light)] text-white font-medium px-6 py-3 rounded-full transition"
      >
        กลับหน้าแรก / Go home
      </Link>
    </div>
  )
}
