const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'client', 'src', 'pages', 'config.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Substituir todas as ocorrências
content = content.replace(/CheckIcon/g, 'Check');
content = content.replace(/XIcon/g, 'X');
content = content.replace(/SavingIcon/g, 'Loader2');
content = content.replace(/LoadedIcon/g, 'Check');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed all icon references in config.tsx');
