const fs = require('fs');
const path = require('path');

const targetDirs = [
  'app',
  'components',
  'public/reports',
  'public/pdf',
];

const replaceRules = [
  { search: /Reckon One/g, replace: 'MYOB' },
  { search: /Reckon/g, replace: 'MYOB' },
  { search: /reckon-one/g, replace: 'myob' },
  { search: /reckon/g, replace: 'myob' },
  { search: /RECKON/g, replace: 'MYOB' },
  // Dates
  { search: /19 April 2025/g, replace: '9 July 2024' },
  // specific mock dates in report/page.tsx
  { search: /15\/03\/2024/g, replace: '09/07/2024' },
  { search: /18\/03\/2024/g, replace: '09/07/2024' },
  { search: /22\/03\/2024/g, replace: '09/07/2024' },
  { search: /25\/03\/2024/g, replace: '09/07/2024' },
  { search: /10\/03\/2024/g, replace: '09/07/2024' },
  { search: /12\/03\/2024/g, replace: '09/07/2024' },
  { search: /14\/03\/2024/g, replace: '09/07/2024' },
  { search: /16\/03\/2024/g, replace: '09/07/2024' },
  { search: /20\/03\/2024/g, replace: '09/07/2024' },
  { search: /23\/03\/2024/g, replace: '09/07/2024' },
  { search: /27\/03\/2024/g, replace: '09/07/2024' },
  { search: /30\/03\/2024/g, replace: '09/07/2024' },
  { search: /17\/03\/2024/g, replace: '09/07/2024' },
  { search: /19\/03\/2024/g, replace: '09/07/2024' },
  { search: /21\/03\/2024/g, replace: '09/07/2024' },
  { search: /28\/03\/2024/g, replace: '09/07/2024' },
  { search: /02\/04\/2024/g, replace: '09/07/2024' },
  { search: /31\/03\/2024/g, replace: '09/07/2024' }
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (stat.isFile() && (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.html') || fullPath.endsWith('.css') || fullPath.endsWith('.json'))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;
      
      for (const rule of replaceRules) {
        if (rule.search.test(content)) {
          content = content.replace(rule.search, rule.replace);
          modified = true;
        }
      }
      
      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

for (const dir of targetDirs) {
  if (fs.existsSync(dir)) {
    processDirectory(dir);
  } else {
    console.warn(`Directory not found: ${dir}`);
  }
}
console.log('Replacement complete.');
