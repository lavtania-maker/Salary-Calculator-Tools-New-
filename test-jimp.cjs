const { Jimp } = require('jimp');

async function run() {
  const image = await Jimp.read('test.jpg');
  image.resize({ w: 500 });
  await image.write('test-out.png');
}
run();
