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
      
      if (img.filename === 'logo-small.png') {
        // Crop out the massive white border
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
        
        // Make white transparent
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
        
        // Then pad it to maintain height scale but left-aligned
        image.resize({ w: 356 }); // The size after cropping
        
        const newImage = new Jimp({ width: 500, height: 78, color: 0x00000000 });
        newImage.composite(image, 0, 15);
        
        await newImage.write(publicPath);
        await newImage.write(rootPath);
        console.log(`Successfully saved optimized & cropped image to ${publicPath}`);
        continue; // skip the default resize below
      }
      
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
