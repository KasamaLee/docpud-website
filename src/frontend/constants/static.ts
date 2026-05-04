import type { Locale } from '@/i18n/dictionaries'

/**
 * Static doctor profile data for the website.
 * Blog posts are managed through Payload CMS admin.
 * All other content uses this static data.
 */

export type DoctorProfile = {
  name: string
  specialty: string
  hospital: string
  phone: string
  lineId: string
  bio: string[]
  quote: string
  education: string[]
  meetings: string[]
}

const doctorData: Record<Locale, DoctorProfile> = {
  th: {
    name: 'นพ. John Doe',
    specialty: 'ศัลยแพทย์ออร์โธปิดิกส์',
    hospital: 'Doe Clinic',
    phone: '088-888-8888',
    lineId: '@dooclinic',
    bio: [
      'นพ. John Doe สำเร็จการศึกษาจากคณะแพทยศาสตร์ มหาวิทยาลัยสมมติ (Fictional University) และได้รับวุฒิบัตรแพทย์ผู้เชี่ยวชาญจากสถาบันการแพทย์ชั้นนำ',
      'มีความเชี่ยวชาญด้านการดูแลรักษาทั่วไปและการผ่าตัดกระดูกและข้อ มีประสบการณ์ในการเปิดคลินิกและดูแลคนไข้อย่างใกล้ชิดในคลินิกส่วนตัว "Doe Clinic"',
      'ท่านให้ความสำคัญกับการดูแลรักษาผู้ป่วยอย่างใส่ใจและเป็นกันเอง เพื่อให้ผู้ป่วยได้รับประสบการณ์การรักษาที่ดีที่สุด'
    ],
    quote: '"การดูแลสุขภาพของผู้ป่วยคือความสำคัญอันดับหนึ่งของเรา เราพร้อมให้บริการด้วยความใส่ใจและมาตรฐานการแพทย์สูงสุด"',
    education: [
      'แพทยศาสตรบัณฑิต (เกียรตินิยม) คณะแพทยศาสตร์ มหาวิทยาลัยสมมติ พ.ศ. 2555',
      'วุฒิบัตรผู้เชี่ยวชาญ สถาบันการแพทย์สมมติ พ.ศ. 2559'
    ],
    meetings: [
      'International Medical Conference, 2022 - Fictional City',
      'Global Health Summit, 2023 - Virtual Event'
    ]
  },
  en: {
    name: 'Dr. John Doe',
    specialty: 'Orthopaedic Surgeon',
    hospital: 'Doe Clinic',
    phone: '088-888-8888',
    lineId: '@doeclinic',
    bio: [
      'Dr. John Doe graduated from the Faculty of Medicine, Fictional University, and received his board certification from a leading medical institute.',
      'He specializes in general care and orthopaedic surgery, with extensive experience running his private practice, "Doe Clinic".',
      'He prioritizes attentive and friendly patient care to ensure the best possible treatment experience.'
    ],
    quote: '"Patient health is our number one priority. We are ready to serve with care and the highest medical standards."',
    education: [
      'M.D. (Honors), Faculty of Medicine, Fictional University, 2012',
      'Board Certification, Fictional Medical Institute, 2016'
    ],
    meetings: [
      'International Medical Conference, 2022 - Fictional City',
      'Global Health Summit, 2023 - Virtual Event'
    ]
  },
}

export function getStaticDoctor(locale: Locale): DoctorProfile {
  return doctorData[locale]
}
