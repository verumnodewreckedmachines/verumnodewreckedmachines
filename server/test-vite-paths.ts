import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Running from:', process.cwd());
console.log('__dirname:', __dirname);
console.log('import.meta.dirname:', import.meta.dirname);
console.log('');

// Simulate serveStatic logic
let distPath = path.resolve(import.meta.dirname, "public");
console.log('1. Tried:', distPath, '- Exists?', fs.existsSync(distPath));

if (!fs.existsSync(distPath)) {
  distPath = path.resolve(import.meta.dirname, "../../dist/public");
  console.log('2. Tried:', distPath, '- Exists?', fs.existsSync(distPath));
}

if (!fs.existsSync(distPath)) {
  distPath = path.resolve(import.meta.dirname, "../../../dist/public");
  console.log('3. Tried:', distPath, '- Exists?', fs.existsSync(distPath));
}

if (!fs.existsSync(distPath)) {
  distPath = path.resolve(process.cwd(), "dist/public");
  console.log('4. Tried:', distPath, '- Exists?', fs.existsSync(distPath));
}

if (!fs.existsSync(distPath) && process.resourcesPath) {
  distPath = path.resolve(process.resourcesPath, "app", "dist", "public");
  console.log('5. Tried:', distPath, '- Exists?', fs.existsSync(distPath));
}

console.log('');
if (fs.existsSync(distPath)) {
  console.log('SUCCESS: Found dist/public at:', distPath);
} else {
  console.log('ERROR: Could not find dist/public!');
}
