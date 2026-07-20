const { Jimp } = require('jimp');

async function run() {
  const image = await Jimp.read('public/logo-small.png');
  console.log('width:', image.bitmap.width, 'height:', image.bitmap.height);
  let leftMost = image.bitmap.width;
  for (let y = 0; y < image.bitmap.height; y++) {
    for (let x = 0; x < leftMost; x++) {
      const color = image.getPixelColor(x, y);
      const alpha = color & 0xFF; // Jimp uses RGBA, so alpha is the lowest 8 bits.
      if (alpha > 10) { // Not fully transparent
        leftMost = x;
        break;
      }
    }
  }
  console.log('Leftmost non-transparent pixel:', leftMost);
}
run();
