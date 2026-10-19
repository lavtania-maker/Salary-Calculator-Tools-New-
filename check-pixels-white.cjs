const { Jimp } = require('jimp');

async function run() {
  const image = await Jimp.read('public/logo-small.png');
  let leftMostNonWhite = image.bitmap.width;
  for (let y = 0; y < image.bitmap.height; y++) {
    for (let x = 0; x < leftMostNonWhite; x++) {
      const color = image.getPixelColor(x, y);
      // FFFFFFFF is white.
      if (color !== 0xFFFFFFFF) {
        // Wait, Jimp uses RGBA, so white is 0xFFFFFFFF.
        // Let's also check for near white to be safe.
        const r = (color >> 24) & 0xFF;
        const g = (color >> 16) & 0xFF;
        const b = (color >> 8) & 0xFF;
        const a = color & 0xFF;
        if (r < 250 || g < 250 || b < 250) { // Not very white
          leftMostNonWhite = x;
          break;
        }
      }
    }
  }
  console.log('Leftmost non-white pixel:', leftMostNonWhite);
}
run();
