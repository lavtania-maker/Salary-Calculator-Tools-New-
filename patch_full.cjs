const fs = require('fs');

const files = ['index.html', 'pcb-income-tax.html', 'epf-kwsp.html', 'annual-leave-calculator.html'];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // 1. Remove the hiring modal display trigger
  content = content.replace(
    /if \(typeValue === "Employer \/ HR" \|\| typeValue === "Employer\/HR"\) \{\s*const hiringModal = document\.getElementById\("hiringIntentModal"\);\s*if \(hiringModal\) \{\s*hiringModal\.style\.display = "flex";\s*window\._currentLeadEmail = userEmailAddress;\s*window\._currentLeadType = currentDownloadType;\s*\}\s*\}/g,
    ''
  );
  
  // also specifically targeting:
  content = content.replace(
    /if \(typeValue === "Employer \/ HR" \|\| typeValue === "Employer\/HR"\) \{\s*const hiringModal = document\.getElementById\("hiringIntentModal"\);\s*if \(hiringModal\) \{\s*hiringModal\.style\.display = "flex";\s*\}\s*\}/g,
    ''
  );

  // same thing but without typeValue, using `role` or `this.value` if exists
  content = content.replace(
    /if \(role === "Employer \/ HR" \|\| role === "Employer\/HR"\) \{\s*const hiringModal = document\.getElementById\("hiringIntentModal"\);\s*if \(hiringModal\) \{\s*hiringModal\.style\.display = "flex";\s*\}\s*\}/g,
    ''
  );

  // 2. Ensure Javascript declaration handles all occurrences of `const companyInput = document.getElementById("companyName");`
  content = content.replace(
    /const companyInput = document\.getElementById\("companyName"\);(?![\s\S]*?hiringQuestionGroup)/g,
    'const companyInput = document.getElementById("companyName");\n          const hiringGroup = document.getElementById("hiringQuestionGroup");\n          const hiringInput = document.getElementById("hiringStatus");'
  );
  // wait the above regex with negative lookahead is tricky, let's just globally replace it if it's not immediately followed by hiringGroup.
  content = content.replace(
      /const companyInput = document\.getElementById\("companyName"\);\s*(?!const hiringGroup)/g,
      'const companyInput = document.getElementById("companyName");\n          const hiringGroup = document.getElementById("hiringQuestionGroup");\n          const hiringInput = document.getElementById("hiringStatus");\n'
  );

  // 3. Remove old hiringIntentModal HTML completely
  content = content.replace(
      /<!-- Hiring Intent Modal -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/,
      ''
  );

  fs.writeFileSync(file, content, 'utf8');
  console.log('Cleaned up HTML/JS in', file);
});
