import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.resolve(__dirname, '..', 'src', 'assets');

const files = fs.readdirSync(assetsDir).filter(f => f.endsWith('.png') && (f.includes('-640') || f.includes('-1280')));

async function convert() {
  for (const file of files) {
    const inputPath = path.join(assetsDir, file);
    const outputName = file.replace('.png', '.webp');
    const outputPath = path.join(assetsDir, outputName);

    const inputSize = fs.statSync(inputPath).size;

    await sharp(inputPath)
      .webp({ quality: 80, effort: 6 })
      .toFile(outputPath);

    const outputSize = fs.statSync(outputPath).size;
    const savings = ((1 - outputSize / inputSize) * 100).toFixed(1);
    console.log(`${file} → ${outputName} (${(inputSize / 1024).toFixed(1)} KB → ${(outputSize / 1024).toFixed(1)} KB, ${savings}% savings)`);
  }

  const totalBefore = files.reduce((sum, f) => sum + fs.statSync(path.join(assetsDir, f)).size, 0);
  const webpFiles = files.map(f => f.replace('.png', '.webp'));
  const totalAfter = webpFiles.reduce((sum, f) => sum + (fs.statSync(path.join(assetsDir, f), { throwIfNoEntry: false })?.size || 0), 0);
  const totalSavings = ((1 - totalAfter / totalBefore) * 100).toFixed(1);
  console.log(`\nTotal: ${(totalBefore / 1024).toFixed(1)} KB → ${(totalAfter / 1024).toFixed(1)} KB (${totalSavings}% savings)`);
}

convert().catch(console.error);
