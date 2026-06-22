const fs = require('fs');

const files = ['index.html', 'socso-perkeso.html', 'pcb-income-tax.html', 'epf-kwsp.html', 'annual-leave-calculator.html'];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  content = content.replace(/<(h[23])([^>]*)>([\s\S]*?)<\/\1>/gi, (match, tag, attrs, innerHTML) => {
    // replace any span that contains no alphanumeric characters
    // e.g. <span>🇲🇾</span> or <span>️</span>
    let newInner = innerHTML.replace(/<span[^>]*>[^a-zA-Z0-9]*<\/span>\s*/gi, '');
    
    // Also strip generic emojis directly (including regional indicators)
    newInner = newInner.replace(/[\u{1F300}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1f9ff}\u{1f200}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}\u{1F1E6}-\u{1F1FF}\uFE0F]/gu, '');
    
    return `<${tag}${attrs}>${newInner.trim()}</${tag}>`;
  });

  fs.writeFileSync(file, content);
  console.log('Cleaned emojis in ' + file);
});
