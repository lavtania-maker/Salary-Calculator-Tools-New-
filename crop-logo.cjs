const { Jimp } = require('jimp');

async function run() {
  const image = await Jimp.read('public/logo-small.png');
  let minX = image.bitmap.width;
  let minY = image.bitmap.height;
  let maxX = 0;
  let maxY = 0;
  
  for (let y = 0; y < image.bitmap.height; y++) {
    for (let x = 0; x < image.bitmap.width; x++) {
      const color = image.getPixelColor(x, y);
      const r = (color >> 24) & 0xFF;
      const g = (color >> 16) & 0xFF;
      const b = (color >> 8) & 0xFF;
      
      if (r < 250 || g < 250 || b < 250) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  
  console.log(`Bounds: minX=${minX}, minY=${minY}, maxX=${maxX}, maxY=${maxY}`);
  
  // Also turn white pixels into transparent pixels so the logo is transparent
  for (let y = 0; y < image.bitmap.height; y++) {
    for (let x = 0; x < image.bitmap.width; x++) {
      const color = image.getPixelColor(x, y);
      const r = (color >> 24) & 0xFF;
      const g = (color >> 16) & 0xFF;
      const b = (color >> 8) & 0xFF;
      if (r > 250 && g > 250 && b > 250) {
        image.setPixelColor(0x00000000, x, y);
      }
    }
  }

  image.crop({ x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 });
  await image.write('public/logo-small.png');
  await image.write('logo-small.png'); // Also update the root one if it exists
  console.log('Cropped and saved public/logo-small.png');
}
run();
