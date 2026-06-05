import fs from 'fs';

const css = `
/* CSS Variables for easy maintenance */
:root {
  --primary: #2563eb;
  --primary-hover: #1d4ed8;
  --secondary: #4b5563;
  --bg-light: #ffffff;
  --card-bg: #ffffff;
  --text-main: #0f172a;
  --text-muted: #64748b;
  --border: #e2e8f0;
  --border-input: #cbd5e1;
  --success: #059669;
  --danger: #dc2626;
  --shadow-soft: 0 4px 20px rgba(0, 0, 0, 0.03);
  --shadow-hover: 0 10px 30px rgba(0, 0, 0, 0.06);
}

/* Reset & Base Styles */
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  background-color: var(--bg-light);
  color: var(--text-main);
  line-height: 1.5;
  font-size: 15px;
  letter-spacing: -0.01em;
}

a { text-decoration: none; color: inherit; }
ul { list-style: none; }

/* Layout Containers */
.container { max-width: 1100px; margin: 0 auto; padding: 0 20px; }
.seo-container { max-width: 900px; margin: 0 auto; padding: 0 20px; }

/* Navbar */
.navbar { background: #ffffff; border-bottom: 1px solid var(--border); padding: 12px 0; position: sticky; top: 0; z-index: 100; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
.navbar .container { display: flex; justify-content: space-between; align-items: center; }
.logo { display: flex; align-items: center; text-decoration: none; }
.logo-img { height: 44px; width: auto; max-width: 250px; object-fit: contain; }
.desktop-nav { display: flex; gap: 8px; align-items: center; }
.nav-item {
  background: transparent; border: none; font-family: inherit; font-size: 0.95rem; font-weight: 600;
  color: var(--text-muted); cursor: pointer; padding: 8px 16px; border-radius: 8px;
  transition: all 0.2s ease; display: inline-block; white-space: nowrap;
}
.nav-item:hover { background: #f8fafc; color: var(--text-main); }
.active-nav { background: var(--primary) !important; color: #ffffff !important; box-shadow: 0 2px 4px rgba(37,99,235,0.2) !important; }
.active-nav:hover { background: var(--primary-hover) !important; }

/* Mobile Menu */
.mobile-menu-btn { display: none; background: none; border: none; cursor: pointer; padding: 8px; color: var(--text-main); }
.mobile-nav { display: none; flex-direction: column; background: #ffffff; border-top: 1px solid var(--border); position: absolute; top: 100%; left: 0; width: 100%; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); z-index: 99; }
.mobile-nav.open { display: flex; }
.mobile-nav-item { background: transparent; border: none; font-family: inherit; font-size: 1.05rem; font-weight: 600; color: var(--text-main); padding: 16px 20px; margin: 6px; border-radius: 8px; text-align: left; cursor: pointer; transition: all 0.2s ease; display: block; }
.mobile-nav-item:hover { background: #f8fafc; color: var(--primary); }
.nav-menu { display: flex; gap: 15px; align-items: center; }
.nav-link { font-weight: 500; color: var(--text-muted); transition: color 0.1s; font-size: 0.85rem; }
.nav-link:hover { color: var(--primary); text-decoration: underline; }

/* Typography */
h1, h2, h3, h4 { color: var(--text-main); letter-spacing: -0.02em; }
.hero { padding: 40px 0 24px; text-align: center; background-color: transparent; margin-bottom: 0; }
.hero h1 { font-size: 2.2rem; margin-bottom: 8px; color: var(--primary); font-weight: 800; line-height: 1.2; }
.hero p { font-size: 1.1rem; color: var(--text-muted); max-width: 700px; margin: 4px auto 0; line-height: 1.6; }

/* Buttons */
.btn {
  padding: 12px 20px; border-radius: 10px; font-weight: 600; cursor: pointer;
  transition: all 0.2s ease; border: 1px solid transparent; display: inline-block;
  text-align: center; text-decoration: none; font-size: 1rem; font-family: inherit; height: 48px;
  line-height: normal; display: inline-flex; align-items: center; justify-content: center;
}
.btn-primary { background: var(--primary); color: white; box-shadow: 0 2px 4px rgba(37,99,235,0.2); }
.btn-primary:hover { background: var(--primary-hover); transform: translateY(-1px); box-shadow: 0 4px 6px rgba(37,99,235,0.3); }
.btn-outline { background: #ffffff; border: 1px solid #cbd5e1; color: #334155; }
.btn-outline:hover { background: #f8fafc; border-color: #94a3b8; color: #0f172a; }
.btn:disabled, .btn.disabled { background-color: #f1f5f9 !important; color: #94a3b8 !important; cursor: not-allowed !important; pointer-events: none; border-color: #e2e8f0 !important; box-shadow: none !important; transform: none !important; }

/* Calculators Core Grid */
.calculator-area { background-color: var(--bg-light); padding-bottom: 40px; }
.main-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-top: 16px; padding-bottom: 32px; align-items: start; }

/* Unified Premium Card (Used for Forms, Results, and Content) */
.card, .content-card, .seo-card {
  background: #ffffff; border-radius: 20px; padding: 32px; box-shadow: 0 4px 20px rgba(0,0,0,0.03);
  border: 1px solid #f1f5f9; transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 24px;
}
.card:hover, .content-card:hover, .seo-card:hover {
  box-shadow: 0 10px 30px rgba(0,0,0,0.06); transform: translateY(-2px);
}

.card-title, .content-card h2, .seo-title, .content-card h3 {
  font-size: 1.5rem; font-weight: 800; color: #0f172a; margin-bottom: 24px;
  letter-spacing: -0.02em; display: flex; align-items: center; gap: 8px;
  line-height: 1.3;
}
.card-subtitle, .seo-subtitle, .content-card p {
  color: #64748b; font-size: 1rem; margin-bottom: 24px; line-height: 1.6;
}
.content-card h3 { font-size: 1.2rem; margin-top: 16px; margin-bottom: 12px; }

/* Form Elements */
.form-group { margin-bottom: 24px; }
.form-label { display: block; font-weight: 700; margin-bottom: 10px; font-size: 1rem; color: #1e293b; }
.input-group {
  display: flex; align-items: center; border: 1px solid var(--border-input);
  border-radius: 12px; overflow: hidden; background: #ffffff; transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0,0,0,0.02) inset;
}
.input-group:focus-within { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1); }
.input-prefix { background: #f8fafc; padding: 12px 16px; font-weight: 600; color: var(--text-muted); border-right: 1px solid var(--border-input); font-size: 1rem; }
.form-input, .form-select {
  width: 100%; padding: 12px 16px; border: 1px solid var(--border-input); border-radius: 12px;
  font-size: 1rem; font-family: inherit; background: #ffffff; transition: all 0.2s ease;
  outline: none; box-shadow: 0 1px 2px rgba(0,0,0,0.02) inset; height: 48px;
}
.input-group .form-input { border: none; border-radius: 0; box-shadow: none; height: auto; }
.form-input:focus, .form-select:focus { border-color: var(--primary); box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1); }
.form-select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 16px center; background-size: 16px; padding-right: 40px; cursor: pointer; }

/* Radio Segment Form (Tabs internally) */
.radio-segments { display: flex; gap: 8px; background: #f1f5f9; padding: 6px; border-radius: 14px; margin-bottom: 24px; }
.radio-segment { flex: 1; text-align: center; }
.radio-segment input[type="radio"] { display: none; }
.radio-segment label {
  display: block; padding: 10px; font-size: 0.95rem; font-weight: 600; cursor: pointer;
  border-radius: 10px; color: var(--text-muted); transition: all 0.2s ease;
}
.radio-segment input[type="radio"]:checked + label { background: #ffffff; color: var(--primary); box-shadow: 0 2px 6px rgba(0,0,0,0.05); }

/* Unified Tabs (SEO Tabs / Calculator Tabs) */
.seo-tabs, .contribution-tabs, .calc-tabs { display: flex; background: #f1f5f9; padding: 6px; border-radius: 14px; width: fit-content; margin-bottom: 24px; gap: 8px; flex-wrap: wrap; }
.seo-tab, .contribution-tab, .calc-tab {
  padding: 10px 20px; font-size: 0.95rem; font-weight: 600; border-radius: 10px; color: var(--text-muted);
  cursor: pointer; transition: all 0.2s ease; border: 1px solid transparent; flex: 1; text-align: center; white-space: nowrap;
}
.seo-tab:hover, .contribution-tab:hover, .calc-tab:hover { color: var(--text-main); }
.seo-tab.active, .contribution-tab.active, .calc-tab.active { background: #ffffff; color: var(--primary); box-shadow: 0 2px 6px rgba(0,0,0,0.05); border-color: #ffffff; }

/* Tables (SEO, Contributions, Results) */
.seo-table-wrapper, .table-container, .contribution-table-wrapper {
  overflow-x: auto; border-radius: 16px; border: 1px solid var(--border);
  background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.02); margin-top: 16px; margin-bottom: 24px;
}
.seo-table, .styled-table, .contribution-table { width: 100%; border-collapse: separate; border-spacing: 0; min-width: 600px; font-size: 0.95rem; }
.seo-table th, .styled-table th, .contribution-table th {
  background: #f8fafc; padding: 16px 20px; font-size: 0.85rem; font-weight: 700; color: var(--text-muted);
  text-transform: uppercase; letter-spacing: 0.05em; text-align: left; border-bottom: 1px solid var(--border);
  position: sticky; top: 0; z-index: 10;
}
.seo-table td, .styled-table td, .contribution-table td { padding: 16px 20px; color: #334155; border-bottom: 1px solid #f1f5f9; transition: background-color 0.2s; }
.seo-table tbody tr:last-child td, .styled-table tbody tr:last-child td, .contribution-table tbody tr:last-child td { border-bottom: none; }
.seo-table tbody tr:nth-child(even) td, .styled-table tbody tr:nth-child(even) td, .contribution-table tbody tr:nth-child(even) td { background-color: #fcfcfc; }
.seo-table tbody tr:hover td, .styled-table tbody tr:hover td, .contribution-table tbody tr:hover td { background-color: #f8fafc; }

/* Result Highlight Cards */
.result-panel { position: sticky; top: 80px; }
.placeholder-text { text-align: center; color: var(--text-muted); padding: 40px 20px; font-size: 1rem; }
.result-content { display: none; opacity: 0; transform: translateY(10px); transition: opacity 0.4s ease, transform 0.4s ease; }
.result-content.show, .contribution-content.active { display: block; opacity: 1; transform: translateY(0); }
.highlight-box, .seo-highlight-box {
  background: linear-gradient(135deg, #f0f6ff 0%, #e0edff 100%); border: 1px solid #bfdbfe; border-radius: 16px;
  padding: 24px; text-align: left; margin-bottom: 24px; box-shadow: 0 4px 12px rgba(37,99,235,0.05); display: flex; align-items: center; gap: 16px;
}
.highlight-box.center { text-align: center; flex-direction: column; justify-content: center; gap: 8px; }
.highlight-label { font-size: 0.95rem; color: #1e3a8a; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
.highlight-value { font-size: 2.75rem; font-weight: 800; color: var(--primary); line-height: 1.1; letter-spacing: -0.02em; }

/* Result Row Items */
.result-section { background: white; border: 1px solid var(--border); border-radius: 16px; margin-bottom: 16px; overflow: hidden; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
.result-section-title { font-size: 1.1rem; font-weight: 700; color: #1e293b; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; cursor: default; }
.result-item { display: flex; justify-content: space-between; align-items: center; font-size: 1rem; color: var(--text-main); padding: 12px 0; border-bottom: 1px dashed #e2e8f0; }
.result-item:last-child { border-bottom: none; }
.result-item.total { margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border); font-weight: 800; font-size: 1.15rem; border-bottom: none; color: #0f172a; }
.result-item span:last-child { font-weight: 600; text-align: right; }

/* Grid Layouts inside cards */
.breakdown-grid, .seo-grid-2, .pcb-calc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
.breakdown-card, .seo-info-box, .pcb-calc-box {
  background: #f8fafc; border: 1px solid var(--border); border-radius: 16px; padding: 20px; transition: border-color 0.2s;
}
.breakdown-card:hover, .seo-info-box:hover { border-color: #cbd5e1; }
.breakdown-title { font-size: 0.95rem; color: var(--text-muted); font-weight: 600; margin-bottom: 8px; }
.breakdown-amt { font-size: 1.6rem; font-weight: 800; color: var(--text-main); line-height: 1.2; }
.breakdown-rate, .seo-tag {
  font-size: 0.85rem; color: var(--primary); background: #dbeafe; padding: 4px 10px; border-radius: 8px; display: inline-block; margin-top: 8px; font-weight: 700;
}

/* Info Boxes and Lists */
.seo-formula-box { background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 1px solid var(--border); border-radius: 16px; padding: 24px; text-align: center; margin: 24px 0; }
.seo-formula-text { font-size: 1.35rem; font-weight: 800; color: #1e293b; letter-spacing: -0.01em; display: block; }
.seo-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
.seo-list li { position: relative; padding-left: 24px; font-size: 1rem; color: #475569; line-height: 1.5; }
.seo-list li::before { content: "•"; position: absolute; left: 0; color: var(--primary); font-weight: bold; font-size: 1.2rem; line-height: 1; top: 2px; }

/* Official Card */
.official-card { background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 20px; padding: 32px; display: flex; align-items: center; gap: 32px; margin-bottom: 32px; }
.official-card h2 { font-size: 1.6rem; font-weight: 800; color: #0369a1; margin-bottom: 12px; }
.official-card p { color: #0c4a6e; font-size: 1.05rem; margin-bottom: 24px; line-height: 1.6; }
.official-btn { display: inline-flex; align-items: center; justify-content: center; height: 48px; gap: 10px; padding: 0 24px; background: #0369a1; color: white !important; font-weight: 700; border-radius: 10px; text-decoration: none; transition: background 0.2s; font-size: 1rem; }
.official-btn:hover { background: #0284c7; }

/* Responsive Adjustments */
@media (max-width: 768px) {
  .main-layout { grid-template-columns: 1fr; gap: 24px; }
  .desktop-nav { display: none; }
  .mobile-menu-btn { display: block; }
  .result-panel { position: relative; top: 0; }
  .hero { padding: 32px 0 16px; }
  .hero h1 { font-size: 1.8rem; }
  .card, .content-card, .seo-card { padding: 24px; border-radius: 16px; }
  .card-title, .seo-title { font-size: 1.35rem; }
  .highlight-value { font-size: 2.25rem; }
  .official-card { flex-direction: column; text-align: center; gap: 20px; padding: 24px; }
  .official-card img { width: 64px; height: 64px; }
  .breakdown-grid, .seo-grid-2, .pcb-calc-grid { grid-template-columns: 1fr; gap: 16px; }
}

@keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }

.contribution-content { display: none; animation: fadeIn 0.3s ease forwards; }

.footer { background: #0f172a; color: white; padding: 48px 0 24px; border-top: 1px solid var(--border); }
.footer-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 32px; margin-bottom: 32px; }
@media (max-width: 640px) { .footer-grid { grid-template-columns: 1fr; } }
.footer-col h4 { margin-bottom: 16px; font-size: 1rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; }
.footer-link { display: block; margin-bottom: 10px; color: #cbd5e1; font-size: 0.95rem; transition: color 0.2s; }
.footer-link:hover { color: white; text-decoration: underline; }
.footer-bottom { text-align: center; padding-top: 24px; border-top: 1px solid rgba(255, 255, 255, 0.1); font-size: 0.85rem; color: #64748b; }
`;

fs.writeFileSync('calculator-styles.css', css, 'utf8');

const files = ['index.html', 'pcb-calculator.html', 'epf-kwsp.html'];
const headLink = '<link rel="stylesheet" href="/calculator-styles.css" />';

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace <style>*</style> recursively because some files have multiple.
  content = content.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  
  // Insert the link before </head> if not already present
  if (!content.includes('calculator-styles.css')) {
     content = content.replace('</head>', `  ${headLink}\n  </head>`);
  }
  
  fs.writeFileSync(file, content, 'utf8');
  console.log('Updated ' + file);
});
