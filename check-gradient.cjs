const { Jimp } = require('jimp');

async function run() {
  const image = await Jimp.read('https://s3-ap-southeast-1.amazonaws.com/ricebowl/images/marketing-campaign/image-3c82ee7b-8135-40c5-80cd-6e1717bf265e.jpg');
  image.resize({ w: 500 });
  
  for(let x=60; x<=100; x++) {
    const c = image.getPixelColor(x, 40); // 40 is roughly middle of 78
    const r = (c >> 24) & 0xFF;
    const g = (c >> 16) & 0xFF;
    const b = (c >> 8) & 0xFF;
    console.log(`x=${x}: RGB(${r}, ${g}, ${b})`);
  }
}
run();
