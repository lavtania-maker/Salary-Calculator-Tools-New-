const { Jimp } = require('jimp');

async function run() {
  const image = await Jimp.read('public/logo-small.png');
  for (let y = 0; y < image.bitmap.height; y++) {
    const color = image.getPixelColor(0, y);
    const alpha = color & 0xFF;
    if (alpha > 0) {
      console.log(`Pixel at 0, ${y} is not transparent. Color: ${color.toString(16)} (alpha: ${alpha})`);
    }
  }
}
run();
