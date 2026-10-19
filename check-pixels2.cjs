const { Jimp } = require('jimp');

async function run() {
  const image = await Jimp.read('public/logo-small.png');
  for (let y = 0; y < 10; y++) {
    const c = image.getPixelColor(10, y);
    console.log(y, c.toString(16));
  }
}
run();
