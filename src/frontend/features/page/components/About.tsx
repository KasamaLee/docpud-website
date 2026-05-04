import type { Locale } from '@/i18n/dictionaries'
import type { DoctorProfile } from '@/frontend/constants/static'

type Props = {
  locale: Locale
  doctor: DoctorProfile
}

export default function About({ locale, doctor }: Props) {
  return (
    <div className="bg-[var(--background)]">

      {/* 1. Bio + Portrait */}
      <section id="about" className="section-pad">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-14 lg:gap-20 items-start">

            {/* Left: text */}
            <div className="flex-[1.2] space-y-8">
              {/* Section label */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-px bg-[var(--brand-teal)]" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--brand-teal)]">
                  {locale === 'th' ? 'เกี่ยวกับแพทย์' : 'About the Doctor'}
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-balance">
                {doctor.hospital}
              </h2>

              <div className="space-y-5 text-[15px] leading-[1.8] text-slate-600">
                {doctor.bio.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Quote callout */}
              <blockquote className="relative mt-8 pl-6 border-l-4 border-[var(--brand-teal)]">
                <p className="text-[var(--brand-navy)] text-lg font-semibold leading-relaxed italic">
                  {doctor.quote}
                </p>
              </blockquote>
            </div>

            {/* Right: portrait */}
            <div className="flex-1 w-full lg:sticky lg:top-24">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[3/4] bg-slate-100">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat" />
                {/* Bottom gradient */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--brand-navy-dark)]/70 to-transparent" />
                {/* Name overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="text-white font-bold text-xl leading-tight">{doctor.name}</div>
                  <div className="text-[var(--brand-teal-light)] text-xs font-semibold tracking-widest uppercase mt-1">
                    {doctor.specialty}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Appointment CTA */}
      <section id="contact" className="py-16 bg-[var(--brand-navy)]">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-white text-3xl md:text-4xl font-extrabold mb-3">
              {locale === 'th' ? 'นัดหมายเข้ารับการตรวจ' : 'Book an Appointment'}
            </h2>
            <p className="text-slate-400 text-base">
              {locale === 'th'
                ? 'พร้อมให้คำปรึกษาและดูแลรักษาอย่างใส่ใจ'
                : 'Expert consultation with personalised care'}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {/* Phone */}
            <a
              href={`tel:${doctor.phone}`}
              className="group flex items-center gap-4 bg-white/8 hover:bg-white/15 border border-white/10 hover:border-[var(--brand-teal)]/40 rounded-2xl px-6 py-5 transition-all card-shadow-hover"
            >
              <div className="w-12 h-12 rounded-xl gradient-teal flex items-center justify-center flex-shrink-0 shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium mb-0.5">{locale === 'th' ? 'โทรศัพท์' : 'Phone'}</div>
                <div className="text-white font-bold text-lg group-hover:text-[var(--brand-teal-light)] transition-colors">{doctor.phone}</div>
              </div>
            </a>

            {/* LINE */}
            <div className="flex items-center gap-4 bg-white/8 border border-white/10 rounded-2xl px-6 py-5">
              <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-white font-extrabold text-xs tracking-tight">LINE</span>
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium mb-0.5">LINE ID</div>
                <div className="text-white font-bold text-lg">{doctor.lineId}</div>
              </div>
            </div>
          </div>

          {/* Hospital highlight */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 bg-[var(--brand-gold)]/10 border border-[var(--brand-gold)]/30 rounded-full px-5 py-2">
              <svg className="w-4 h-4 text-[var(--brand-gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-[var(--brand-gold)] text-sm font-semibold">{doctor.hospital}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Education & Meetings */}
      <section className="section-pad bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">

            {/* Education */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg gradient-navy flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[var(--brand-navy)]">
                  {locale === 'th' ? 'ประวัติการศึกษา' : 'Education'}
                </h3>
              </div>
              <ul className="space-y-4">
                {doctor.education.map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--brand-teal)]" />
                    <span className="text-sm text-slate-600 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Meetings */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-[var(--brand-teal)] flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[var(--brand-navy)]">
                  {locale === 'th' ? 'การประชุมวิชาการนานาชาติ' : 'International Meetings'}
                </h3>
              </div>
              <ul className="space-y-4">
                {doctor.meetings.map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--brand-gold)]" />
                    <span className="text-sm text-slate-600 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Map & Facebook */}
      <section className="section-pad bg-[var(--muted)]">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-10 h-px bg-[var(--brand-teal)]" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--brand-teal)]">
                {locale === 'th' ? 'ที่ตั้ง' : 'Location'}
              </span>
              <div className="w-10 h-px bg-[var(--brand-teal)]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold">
              {locale === 'th' ? 'ติดต่อและหาเรา' : 'Find Us'}
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Map */}
            <div className="flex-1 w-full rounded-2xl overflow-hidden shadow-lg bg-white">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.617196016335!2d100.5619!3d13.7367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29e8d35f47055%3A0x6b40abebdb6b6!2sBangkok%2C%20Thailand!5e0!3m2!1sen!2sth!4v1700000000000!5m2!1sen!2sth"
                width="100%"
                height="480"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Clinic Location"
              />
            </div>

            {/* Facebook */}
            <div className="w-full lg:w-[360px] rounded-2xl overflow-hidden shadow-lg bg-white flex justify-center">
              <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61553972920084&tabs=timeline&width=340&height=480&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                width="340"
                height="480"
                style={{ border: 'none', overflow: 'hidden', display: 'block' }}
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                title="Facebook Page"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
