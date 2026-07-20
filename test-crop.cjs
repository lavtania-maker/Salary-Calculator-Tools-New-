const { Jimp } = require('jimp');

async function run() {
  const image = await Jimp.read('https://s3-ap-southeast-1.amazonaws.com/ricebowl/images/marketing-campaign/image-3c82ee7b-8135-40c5-80cd-6e1717bf265e.jpg');
  
  // Just print the first 100 pixels in the middle row (y=119 since it's 238 high)
  let row = '';
  for(let x=0; x<150; x++) {
    const c = image.getPixelColor(x, 119);
    const r = (c >> 24) & 0xFF;
    const g = (c >> 16) & 0xFF;
    const b = (c >> 8) & 0xFF;
    if (r > 250 && g > 250 && b > 250) {
      row += 'W';
    } else {
      row += 'X';
    }
  }
  console.log(row);
}
run();
