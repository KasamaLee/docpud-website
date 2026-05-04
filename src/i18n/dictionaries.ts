export type Locale = 'th' | 'en'

export const locales: Locale[] = ['th', 'en']
export const defaultLocale: Locale = 'th'

export const dict = {
  th: {
    nav: { home: 'หน้าแรก', about: 'เกี่ยวกับ', services: 'บริการ', blog: 'บทความ', contact: 'ติดต่อ' },
    cta: { book: 'นัดหมายแพทย์' },
    home: {
      aboutTitle: 'เกี่ยวกับแพทย์',
      servicesTitle: 'บริการของเรา',
      latestTitle: 'บทความล่าสุด',
      contactTitle: 'ติดต่อเรา',
      readMore: 'อ่านเพิ่มเติม',
      viewAll: 'ดูทั้งหมด',
    },
    blog: {
      title: 'บทความ',
      empty: 'ยังไม่มีบทความ',
      back: '← กลับไปหน้าบทความ',
      published: 'เผยแพร่เมื่อ',
    },
    contact: {
      phone: 'โทรศัพท์',
      line: 'ไลน์ไอดี',
      hospital: 'โรงพยาบาล',
    },
    services: [
      { title: 'เวชศาสตร์การกีฬา', desc: 'ดูแลรักษาอาการบาดเจ็บจากการเล่นกีฬาและฟื้นฟูสมรรถภาพ' },
      { title: 'ศัลยกรรมข้อเข่า', desc: 'ผ่าตัดส่องกล้องและเปลี่ยนข้อเข่าเทียม' },
      { title: 'ศัลยกรรมข้อไหล่', desc: 'รักษาเอ็นข้อไหล่ฉีกขาดและข้อไหล่หลุด' },
    ],
  },
  en: {
    nav: { home: 'Home', about: 'About', services: 'Services', blog: 'Articles', contact: 'Contact' },
    cta: { book: 'Book Appointment' },
    home: {
      aboutTitle: 'About the Doctor',
      servicesTitle: 'Our Services',
      latestTitle: 'Latest Articles',
      contactTitle: 'Contact Us',
      readMore: 'Read more',
      viewAll: 'View all',
    },
    blog: {
      title: 'Articles',
      empty: 'No articles yet.',
      back: '← Back to articles',
      published: 'Published',
    },
    contact: {
      phone: 'Phone',
      line: 'Line ID',
      hospital: 'Hospital',
    },
    services: [
      { title: 'Sports Medicine', desc: 'Treatment for sports injuries and rehabilitation.' },
      { title: 'Knee Surgery', desc: 'Arthroscopic and total knee replacement surgery.' },
      { title: 'Shoulder Surgery', desc: 'Rotator cuff repair and shoulder dislocation treatment.' },
    ],
  },
} as const

export const t = (locale: Locale) => dict[locale]
