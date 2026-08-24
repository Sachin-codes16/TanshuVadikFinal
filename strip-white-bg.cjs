const fs = require('fs');
const { PNG } = require('pngjs');

const inputPath = process.argv[2];
const outputPath = process.argv[3] || inputPath;

const data = fs.readFileSync(inputPath);
const png = PNG.sync.read(data);

const threshold = 235;
const softStart = 200;

for (let i = 0; i < png.data.length; i += 4) {
  const r = png.data[i];
  const g = png.data[i + 1];
  const b = png.data[i + 2];

  const minChannel = Math.min(r, g, b);

  if (minChannel >= threshold) {
    png.data[i + 3] = 0;
  } else if (minChannel >= softStart) {
    const fade = (minChannel - softStart) / (threshold - softStart);
    png.data[i + 3] = Math.round(png.data[i + 3] * (1 - fade));
  }
}

const outBuffer = PNG.sync.write(png);
fs.writeFileSync(outputPath, outBuffer);
console.log('Done:', outputPath);
