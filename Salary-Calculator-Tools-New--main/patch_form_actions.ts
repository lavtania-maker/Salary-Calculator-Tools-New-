import fs from 'fs';

const cssFile = 'public/calculator-styles.css';
let css = fs.readFileSync(cssFile, 'utf8');

const supplement = `
.form-actions {
  display: flex;
  gap: 16px;
  margin-top: 32px;
  margin-bottom: 24px;
}
.form-actions .btn-outline {
  flex: 0.4;
}
.form-actions .btn-primary {
  flex: 1;
}
`;

if (!css.includes('.form-actions {')) {
  fs.appendFileSync(cssFile, supplement, 'utf8');
}
