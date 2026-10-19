const { Jimp } = require('jimp');

async function run() {
  // Read the original (or cropped) image. Actually I overwrote it, so I read the cropped one (356x48)
  const cropped = await Jimp.read('public/logo-small.png');
  
  // Create a new blank transparent image of 500x78
  // Jimp v1: new Jimp({ width, height, color })
  const newImage = new Jimp({ width: 500, height: 78, color: 0x00000000 });
  
  // Paste the cropped image at x=0, y=15
  newImage.composite(cropped, 0, 15);
  
  await newImage.write('public/logo-small.png');
  await newImage.write('logo-small.png');
  console.log('Padded logo created successfully.');
}
run();
