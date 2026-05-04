const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    for (const [search, replace] of replacements) {
        content = content.replace(search, replace);
    }
    
    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    }
}

replaceInFile('src/app/(frontend)/blog/[slug]/page.tsx', [
    [/@\/components\/site\/SiteShell/g, '@/frontend/components/layouts/SiteShell']
]);
replaceInFile('src/app/(frontend)/blog/page.tsx', [
    [/@\/components\/site\/SiteShell/g, '@/frontend/components/layouts/SiteShell']
]);
replaceInFile('src/app/(frontend)/en/blog/[slug]/page.tsx', [
    [/@\/components\/site\/SiteShell/g, '@/frontend/components/layouts/SiteShell']
]);
replaceInFile('src/app/(frontend)/en/blog/page.tsx', [
    [/@\/components\/site\/SiteShell/g, '@/frontend/components/layouts/SiteShell']
]);
replaceInFile('src/app/(frontend)/layout.tsx', [
    [/@\/providers/g, '@/frontend/components/providers']
]);
