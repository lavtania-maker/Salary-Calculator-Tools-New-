import fs from 'fs';

const files = ['index.html', 'pcb-calculator.html', 'epf-kwsp.html'];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // We want to strip style="..." from <div class="content-card"> and <div class="seo-card">
  // Since they might span multiple lines, we can use a safer regex:
  content = content.replace(/(class="(?:content-card|seo-card)"[^>]*?)\s*style="[^"]*"/gs, '$1');
  content = content.replace(/style="[^"]*"\s*(class="(?:content-card|seo-card)")/gs, '$1');

  // Similarly for table elements that might have styles, but we don't want to break too much logic.
  // Actually, wait, let's just strip style from content-card and seo-card.
  
  // Also, remove inline styles from <section class="content-section"> if any
  content = content.replace(/(class="content-section"[^>]*?)\s*style="[^"]*"/gs, '$1');
  content = content.replace(/style="[^"]*"\s*(class="content-section")/gs, '$1');

  fs.writeFileSync(file, content, 'utf8');
  console.log('Cleaned inline styles from ' + file);
});
