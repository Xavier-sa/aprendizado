// Uses sharp already provided by Next.js; adds no favicon dependency.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const app = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src/app");
const source = await fs.readFile(path.join(app, "icon.svg"));
const png = (size) => sharp(source).resize(size, size).png().toBuffer();

for (const [file, size] of [["apple-icon.png", 180], ["icon1.png", 192], ["icon2.png", 512]]) {
  await fs.writeFile(path.join(app, file), await png(size));
}

// ICO directory containing PNG frames at the three browser fallback sizes.
const sizes = [16, 32, 48];
const frames = await Promise.all(sizes.map(png));
const header = Buffer.alloc(6 + sizes.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
for (const [i, size] of sizes.entries()) {
  const entry = 6 + i * 16;
  header[entry] = size;
  header[entry + 1] = size;
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(frames[i].length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += frames[i].length;
}
await fs.writeFile(path.join(app, "favicon.ico"), Buffer.concat([header, ...frames]));
console.log("Generated FinanceBot icons: ICO 16/32/48, Apple 180, PNG 192/512, scalable SVG.");
