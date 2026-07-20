const fs = require('fs');

const html = `
<!DOCTYPE html>
<html>
<head>
<style>
img { max-width: 100% !important; height: auto !important; display: block; }
.logo-img { height: 44px; width: auto; max-width: 250px; object-fit: contain; }
</style>
</head>
<body>
<div style="width: 500px; border: 1px solid red; padding: 20px;">
  <a href="/" class="logo" style="margin-bottom: 20px; display: block; border: 1px solid blue;">
    <img src="logo-small.png" width="250" height="44" style="height: 60px; width: auto; object-fit: contain; object-position: left center; border: 1px solid green;">
  </a>
  <p style="margin: 0; border: 1px solid orange;">Accurate Malaysia salary calculator.</p>
</div>
</body>
</html>
`;
fs.writeFileSync('test.html', html);
