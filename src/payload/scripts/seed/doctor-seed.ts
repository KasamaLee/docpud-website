import type { Payload } from 'payload'

const para = (text: string) => ({
  type: 'paragraph',
  format: '',
  indent: 0,
  version: 1,
  direction: 'ltr',
  textFormat: 0,
  textStyle: '',
  children: [
    { type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 },
  ],
})

const heading = (text: string, tag: 'h2' | 'h3' = 'h2') => ({
  type: 'heading',
  tag,
  format: '',
  indent: 0,
  version: 1,
  direction: 'ltr',
  children: [
    { type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 },
  ],
})

const richText = (...nodes: any[]) => ({
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: nodes,
  },
})

export async function seed({ payload }: { payload: Payload }) {
  payload.logger.info('🌱 Seeding blog posts...')

  payload.logger.info('— Deleting existing posts...')
  const existingPosts = await payload.find({ collection: 'posts', limit: 100 })
  for (const post of existingPosts.docs) {
    await payload.delete({ collection: 'posts', id: post.id })
  }

  payload.logger.info('— Deleting existing categories...')
  const existingCategories = await payload.find({ collection: 'categories', limit: 100 })
  for (const cat of existingCategories.docs) {
    await payload.delete({ collection: 'categories', id: cat.id })
  }

  // 1) Categories — TH default, EN translation via locale update
  const categoriesData = [
    { th: 'เวชศาสตร์การกีฬา', en: 'Sports Medicine', slug: 'sports-medicine' },
    { th: 'ข้อเข่า', en: 'Knee', slug: 'knee' },
    { th: 'ข้อไหล่', en: 'Shoulder', slug: 'shoulder' },
  ]

  const categoryIds: Record<string, string> = {}
  for (const c of categoriesData) {
    const created = await payload.create({
      collection: 'categories',
      locale: 'th',
      data: { name: c.th, slug: c.slug } as any,
    })
    categoryIds[c.th] = created.id as string
    await payload.update({
      collection: 'categories',
      id: created.id,
      locale: 'en',
      data: { name: c.en },
    })
  }

  // 2) Blog Posts (3 posts — Thai content with optional English title/content)
  const posts = [
    {
      title: 'เอ็นไขว้หน้าฉีกขาด สาเหตุและแนวทางการรักษา',
      englishTitle: 'ACL Tear: Causes and Treatment Options',
      slug: 'blog-1',
      category: categoryIds['เวชศาสตร์การกีฬา'],
      excerpt: 'เอ็นไขว้หน้า (ACL) เป็นเอ็นที่อยู่บริเวณข้อเข่า ทำหน้าที่ช่วยให้ข้อเข่ามีความมั่นคง การฉีกขาดของเอ็นนี้พบบ่อยในนักกีฬา',
      content: richText(
        para('เอ็นไขว้หน้า (Anterior Cruciate Ligament หรือ ACL) เป็นเอ็นสำคัญภายในข้อเข่า ทำหน้าที่ป้องกันไม่ให้กระดูกหน้าแข้งเลื่อนไปข้างหน้าเมื่อเทียบกับกระดูกต้นขา การฉีกขาดของเอ็นนี้มักเกิดจากการเปลี่ยนทิศทางอย่างกะทันหัน หยุดเร็ว ๆ หรือการกระโดดลงผิดท่า'),
        heading('อาการที่พบบ่อย'),
        para('ผู้ป่วยมักได้ยินเสียง "ป๊อก" ขณะเกิดอาการบาดเจ็บ ตามด้วยอาการปวดเฉียบพลัน ข้อเข่าบวม และรู้สึกข้อเข่าไม่มั่นคงเมื่อพยายามลงน้ำหนัก'),
        heading('แนวทางการรักษา'),
        para('การรักษาขึ้นอยู่กับระดับความเสียหายและกิจกรรมที่ผู้ป่วยต้องการกลับไปทำ การผ่าตัดส่องกล้องสร้างเอ็นใหม่เป็นวิธีมาตรฐานสำหรับผู้ป่วยที่ต้องการกลับไปเล่นกีฬา ร่วมกับการทำกายภาพบำบัดอย่างต่อเนื่อง 6-9 เดือน'),
      ),
    },
    {
      title: 'ข้อเข่าเสื่อม รู้ทันก่อนสาย',
      englishTitle: 'Knee Osteoarthritis: Early Recognition and Care',
      slug: 'blog-2',
      category: categoryIds['ข้อเข่า'],
      excerpt: 'ข้อเข่าเสื่อมเป็นโรคที่พบบ่อยในผู้สูงอายุ การวินิจฉัยและรักษาตั้งแต่ระยะแรกช่วยชะลอความรุนแรงของโรคได้',
      content: richText(
        para('ข้อเข่าเสื่อม (Knee Osteoarthritis) คือภาวะที่กระดูกอ่อนผิวข้อเข่าค่อย ๆ สึกหรอลง ส่งผลให้เกิดอาการปวด ข้อฝืด และเดินได้ลำบาก พบบ่อยในผู้ที่อายุมากกว่า 50 ปี และผู้ที่มีน้ำหนักเกิน'),
        heading('สัญญาณเตือน'),
        para('อาการปวดเข่าหลังเดินนาน ๆ หรือลุกขึ้นยืนหลังนั่งนาน ข้อเข่าฝืดในตอนเช้า มีเสียงกรอบแกรบเวลาขยับข้อเข่า'),
        heading('การดูแลรักษา'),
        para('ลดน้ำหนัก ออกกำลังกายเสริมสร้างกล้ามเนื้อต้นขา ทำกายภาพบำบัด ใช้ยาแก้ปวดและยาต้านการอักเสบตามแพทย์สั่ง ในรายที่มีอาการรุนแรงอาจพิจารณาการผ่าตัดเปลี่ยนข้อเข่าเทียม'),
      ),
    },
    {
      title: 'ข้อไหล่ติด: รักษาอย่างไรให้กลับมาใช้งานได้',
      englishTitle: 'Frozen Shoulder: Restoring Range of Motion',
      slug: 'blog-3',
      category: categoryIds['ข้อไหล่'],
      excerpt: 'ข้อไหล่ติด หรือ Frozen Shoulder เป็นภาวะที่ข้อไหล่เคลื่อนไหวได้น้อยลง พร้อมอาการปวด การรักษาที่ถูกต้องช่วยให้ฟื้นตัวได้',
      content: richText(
        para('ข้อไหล่ติด (Frozen Shoulder หรือ Adhesive Capsulitis) คือภาวะที่เยื่อหุ้มข้อไหล่อักเสบและหนาตัวขึ้น ทำให้ข้อไหล่เคลื่อนไหวได้น้อยลงและเกิดอาการปวด พบบ่อยในผู้ที่มีอายุ 40-60 ปี และผู้ป่วยเบาหวาน'),
        heading('ระยะของโรค'),
        para('โรคนี้แบ่งออกเป็น 3 ระยะ: ระยะปวด (Freezing) ระยะข้อติด (Frozen) และระยะฟื้นตัว (Thawing) ใช้เวลารวมกันประมาณ 1-3 ปี'),
        heading('การรักษา'),
        para('ใช้ยาแก้ปวดและยาต้านการอักเสบ ทำกายภาพบำบัดยืดเหยียดข้อไหล่อย่างสม่ำเสมอ ในรายที่ไม่ดีขึ้นอาจพิจารณาฉีดยาเข้าข้อไหล่ หรือผ่าตัดส่องกล้องเพื่อคลายเยื่อหุ้มข้อ'),
      ),
    },
  ]

  for (const p of posts) {
    const created = await payload.create({
      collection: 'posts',
      data: {
        title: p.title,
        englishTitle: p.englishTitle,
        slug: p.slug,
        excerpt: p.excerpt,
        content: p.content as any,
        category: p.category,
        publishedAt: new Date().toISOString(),
        _status: 'published',
      },
    })
    payload.logger.info(`Created post: ${created.title}`)
  }

  payload.logger.info('✅ Seed complete — 3 blog posts created')
}
