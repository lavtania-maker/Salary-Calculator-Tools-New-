const fs = require('fs');
const data = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));

// Filter out old www and x-forwarded-proto redirects
data.redirects = data.redirects.filter(r => !r.has);

// Add the new ones at the beginning
data.redirects.unshift(
    {
      "source": "/(.*)",
      "has": [{ "type": "host", "value": "www.salarycalculator.my" }],
      "destination": "https://salarycalculator.my/$1",
      "permanent": true
    }
);
data.redirects.unshift(
    {
      "source": "/index",
      "destination": "/",
      "permanent": true
    }
);
data.redirects.unshift(
    {
      "source": "/index.html",
      "destination": "/",
      "permanent": true
    }
);

fs.writeFileSync('vercel.json', JSON.stringify(data, null, 2));
