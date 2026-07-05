import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fontsDir = path.resolve(__dirname, '..', 'public', 'fonts');

if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true });
}

const FONT_URL =
  'https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap';

const response = await fetch(FONT_URL, {
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  },
});

const css = await response.text();

const blocks = css.split('@font-face');
const fontFaces = [];
let fileIndex = 0;

for (const block of blocks) {
  if (!block.includes('url(')) continue;

  const urlMatch = block.match(/url\((https:\/\/[^)]+)\)/);
  const familyMatch = block.match(/font-family:\s*'([^']+)'/);
  const weightMatch = block.match(/font-weight:\s*(\d+)/);
  const styleMatch = block.match(/font-style:\s*(\w+)/);
  const unicodeMatch = block.match(/unicode-range:\s*([^;]+)/);
  const displayMatch = block.match(/font-display:\s*(\w+)/);

  if (!urlMatch || !familyMatch) continue;

  const url = urlMatch[1];
  const family = familyMatch[1];
  const weight = weightMatch ? weightMatch[1] : '400';
  const style = styleMatch ? styleMatch[1] : 'normal';
  const unicode = unicodeMatch ? unicodeMatch[1].trim() : '';
  const display = displayMatch ? displayMatch[1] : 'swap';

  const extMatch = url.match(/\.(woff2|woff|ttf)/);
  const ext = extMatch ? extMatch[1] : 'woff2';

  const subset = unicode.includes('0370') ? 'greek'
    : unicode.includes('0100') ? 'latin-ext'
    : unicode.includes('0000') ? 'latin'
    : `subset${fileIndex}`;

  const filename = `${family.toLowerCase().replace(/\s+/g, '-')}-${style}-${weight}-${subset}.${ext}`;
  const filepath = path.join(fontsDir, filename);

  console.log(`Downloading ${family} ${style} ${weight} (${subset})...`);
  const fontResponse = await fetch(url);
  const buffer = Buffer.from(await fontResponse.arrayBuffer());
  fs.writeFileSync(filepath, buffer);
  console.log(`  Saved: ${filename} (${(buffer.length / 1024).toFixed(1)} KB)`);

  fontFaces.push({ family, style, weight, filename, unicode, display });
  fileIndex++;
}

let fontCss = '';
for (const ff of fontFaces) {
  fontCss += `@font-face {\n  font-family: '${ff.family}';\n  font-style: ${ff.style};\n  font-weight: ${ff.weight};\n  font-display: ${ff.display};\n  src: url('/fonts/${ff.filename}') format('woff2');\n`;
  if (ff.unicode) {
    fontCss += `  unicode-range: ${ff.unicode};\n`;
  }
  fontCss += '}\n\n';
}

const cssPath = path.resolve(__dirname, '..', 'src', 'styles', 'fonts.css');
fs.writeFileSync(cssPath, fontCss);
console.log(`\nFont CSS written to: ${cssPath}`);
console.log('Done!');
