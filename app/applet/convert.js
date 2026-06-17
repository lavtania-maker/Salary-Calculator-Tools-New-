const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

try {
  // Let's try sharp if available
  const sharp = require('sharp');
  sharp('./logo-small.png')
    .resize(500, 88)
    .webp()
    .toFile('./logo-small.webp')
    .then(() => console.log('Successfully converted with sharp!'))
    .catch(err => console.error(err));
} catch(e) {
  console.log('Sharp not found, let us install it...');
  execSync('npm install sharp --no-save');
  const sharp = require('sharp');
  sharp('./logo-small.png')
    .resize(500, 88)
    .webp()
    .toFile('./logo-small.webp')
    .then(() => console.log('Successfully converted with sharp!'))
    .catch(err => console.error(err));
}
