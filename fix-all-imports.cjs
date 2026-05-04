const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
    });
}

const replacements = [
    [/@\/utilities\/ui/g, '@/payload/utils/ui'],
    [/@\/utilities\/getMediaUrl/g, '@/payload/utils/getMediaUrl'],
    [/@\/utilities\/mergeOpenGraph/g, '@/payload/utils/mergeOpenGraph'],
    [/@\/utilities\/getURL/g, '@/payload/utils/getURL'],
    [/@\/utilities\/formatDateTime/g, '@/payload/utils/formatDateTime'],
    [/@\/utilities\/generateMeta/g, '@/payload/utils/generateMeta'],
    [/@\/components\/site\/HomePage/g, '@/frontend/features/page/pages/HomePage'],
    [/@\/components\/site\/metadata/g, '@/frontend/utils/metadata'],
    [/@\/seed\/doctor-seed/g, '@/payload/scripts/seed/doctor-seed'],
    [/@\/components\/ui\/button/g, '@/frontend/components/ui/button'],
    [/@\/components\/RichText/g, '@/frontend/components/ui/RichText'],
    [/@\/data\/static/g, '@/frontend/constants/static'],
    [/@\/components\/site\/PostDetail/g, '@/frontend/features/blog/components/PostDetail'],
    [/@\/components\/site\/BlogList/g, '@/frontend/features/blog/components/BlogList']
];

walk('src', (filePath) => {
    if (!filePath.endsWith('.ts') && !filePath.endsWith('.tsx')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    for (const [search, replace] of replacements) {
        content = content.replace(search, replace);
    }
    
    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    }
});
