const fs = require('fs');
const path = require('path');
const { Jimp } = require('jimp');

// Ensure directory exists
if (!fs.existsSync('public')) {
  fs.mkdirSync('public');
}

const imagesToOptimize = [
  {
    url: 'https://s3-ap-southeast-1.amazonaws.com/ricebowl/images/marketing-campaign/image-3c82ee7b-8135-40c5-80cd-6e1717bf265e.jpg',
    filename: 'logo-small.png',
    width: 500, // 2x Retina for 250px display width
  },
  {
    url: 'https://s3-ap-southeast-1.amazonaws.com/ricebowl/images/marketing-campaign/image-a042dd24-6c42-4872-bcca-15280045d191.png',
    filename: 'favicon-ricebowl.png',
    width: 64, // Small icon size
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/64/Employees_Provident_Fund_%28Malaysia%29_logo.svg/1280px-Employees_Provident_Fund_%28Malaysia%29_logo.svg.png',
    filename: 'epf-logo.png',
    width: 120, // displayed small
  },
  {
    url: 'https://vectorseek.com/wp-content/uploads/2023/09/Perkeso-Socso-Logo-Vector.svg-.png',
    filename: 'perkeso-logo-vector.png',
    width: 120, // displayed small
  },
  {
    url: 'https://www.ajobthing.com/resources/blog/data/blog/images/2026/05/LHDN_logo%20(1).png',
    filename: 'lhdn-logo.png',
    width: 120, // displayed small
  }
];

async function run() {
  console.log('Starting image optimization with Jimp...');
  for (const img of imagesToOptimize) {
    try {
      const publicPath = path.join('public', img.filename);
      const rootPath = img.filename;

      const image = await Jimp.read(img.url);
      
      console.log(`Resizing ${img.filename} to width: ${img.width}...`);
      image.resize({ w: img.width });
      
      await image.write(publicPath);
      await image.write(rootPath);
      console.log(`Successfully saved optimized image to ${publicPath} and ${rootPath}`);
    } catch (err) {
      console.error(`Failed to optimize ${img.filename}:`, err);
    }
  }
  console.log('Image optimization complete!');
}

run();
