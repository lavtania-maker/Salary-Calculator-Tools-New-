const fs = require('fs');

const path = 'src/salary-calculator.ts';
let code = fs.readFileSync(path, 'utf8');

const functionCode = `
// Expose share progress globally
(window as any).shareProgress = function(platform: string) {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent("I just checked my household income group using the Malaysian Salary Calculator! Check yours here:");
  
  if (platform === 'linkedin') {
    window.open(\`https://www.linkedin.com/sharing/share-offsite/?url=\${url}\`, '_blank');
  } else if (platform === 'facebook') {
    window.open(\`https://www.facebook.com/sharer/sharer.php?u=\${url}\`, '_blank');
  } else if (platform === 'twitter') {
    window.open(\`https://twitter.com/intent/tweet?url=\${url}&text=\${text}\`, '_blank');
  } else if (platform === 'whatsapp') {
    window.open(\`https://api.whatsapp.com/send?text=\${text} \${url}\`, '_blank');
  } else if (platform === 'threads') {
    window.open(\`https://threads.net/intent/post?text=\${text} \${url}\`, '_blank');
  }
};
`;

if (!code.includes("window as any).shareProgress")) {
  code = code + "\n" + functionCode;
  fs.writeFileSync(path, code);
  console.log("Patched src/salary-calculator.ts with shareProgress");
} else {
  console.log("Already exists");
}
