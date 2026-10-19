const fs = require('fs');

let content = fs.readFileSync('optimize_images.cjs', 'utf8');

const replacement = `
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
        console.log(\`Successfully saved optimized & cropped image to \${publicPath}\`);
        continue; // skip the default resize below
      }
      
      console.log(\`Resizing \${img.filename} to width: \${img.width}...\`);
`;

content = content.replace(/const image = await Jimp\.read\(img\.url\);\s*console\.log\(`Resizing \${img\.filename} to width: \${img\.width}\.\.\.`\);/, replacement);

fs.writeFileSync('optimize_images.cjs', content, 'utf8');
