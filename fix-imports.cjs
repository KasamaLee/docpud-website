const fs = require('fs');

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

// 1. Update payload.config.ts
replaceInFile('src/payload.config.ts', [
    [/(from|import)\s+['"]\.\/collections\//g, "$1 './payload/features/blog/collections/"],
    [/(from|import)\s+['"]\.\/plugins['"]/g, "$1 './payload/plugins'"],
    [/(from|import)\s+['"]@\/fields\//g, "$1 '@/payload/fields/'"],
    [/(from|import)\s+['"]\.\/utilities\//g, "$1 './payload/utils/'"],
    [/(from|import)\s+['"]\.\/payload\/features\/blog\/collections\/Users['"]/g, "$1 './payload/features/user/collections/Users'"]
]);

// 2. Update Categories.ts
replaceInFile('src/payload/features/blog/collections/Categories.ts', [
    [/(from|import)\s+['"]\.\.\/access\//g, "$1 '../../../access/"]
]);

// 3. Update Media.ts
replaceInFile('src/payload/features/blog/collections/Media.ts', [
    [/(from|import)\s+['"]\.\.\/access\//g, "$1 '../../../access/"]
]);

// 4. Update Posts
replaceInFile('src/payload/features/blog/collections/Posts/index.ts', [
    [/(from|import)\s+['"]\.\.\/\.\.\/access\//g, "$1 '../../../../access/"],
    [/(from|import)\s+['"]\.\.\/\.\.\/utilities\//g, "$1 '../../../../utils/"]
]);

replaceInFile('src/payload/features/blog/collections/Posts/hooks/revalidatePost.ts', [
    [/(from|import)\s+['"]\.\.\/\.\.\/\.\.\/payload-types['"]/g, "$1 '../../../../../../payload-types'"]
]);

// 5. Update Users
replaceInFile('src/payload/features/user/collections/Users/index.ts', [
    [/(from|import)\s+['"]\.\.\/\.\.\/access\//g, "$1 '../../../../access/"]
]);

// 6. Update Plugins
replaceInFile('src/payload/plugins/index.ts', [
    [/(from|import)\s+['"]@\/utilities\//g, "$1 '@/payload/utils/'"]
]);

// 7. Update getMeUser
replaceInFile('src/payload/utils/getMeUser.ts', [
    [/(from|import)\s+['"]\.\.\/payload-types['"]/g, "$1 '../../payload-types'"]
]);

// Frontend components
replaceInFile('src/frontend/features/page/pages/HomePage/HomePage.tsx', [
    [/(from|import)\s+['"]\.\/SiteShell['"]/g, "$1 '@/frontend/components/layouts/SiteShell'"],
    [/(from|import)\s+['"]\.\/Hero['"]/g, "$1 '@/frontend/features/page/components/Hero'"],
    [/(from|import)\s+['"]\.\/About['"]/g, "$1 '@/frontend/features/page/components/About'"],
    [/(from|import)\s+['"]\.\/Services['"]/g, "$1 '@/frontend/features/page/components/Services'"],
    [/(from|import)\s+['"]\.\/LatestPosts['"]/g, "$1 '@/frontend/features/blog/components/LatestPosts'"],
    [/(from|import)\s+['"]\.\/Contact['"]/g, "$1 '@/frontend/features/page/components/Contact'"]
]);

replaceInFile('src/frontend/utils/metadata.ts', [
    [/(from|import)\s+['"]@\/data\/static['"]/g, "$1 '@/frontend/constants/static'"]
]);

replaceInFile('src/frontend/components/layouts/SiteShell.tsx', [
    [/(from|import)\s+['"]@\/data\/static['"]/g, "$1 '@/frontend/constants/static'"]
]);

