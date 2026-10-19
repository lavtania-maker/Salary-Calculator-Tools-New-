const fs = require('fs');

const cssToAdd = `    <noscript>
      <style>
        /* Desktop Dropdown Fallback */
        .nav-dropdown:hover .dropdown-menu,
        .nav-dropdown:focus-within .dropdown-menu {
          visibility: visible !important;
          opacity: 1 !important;
          transform: translateY(0) !important;
          display: block !important;
        }
        
        /* Mobile Navigation Fallback */
        @media (max-width: 1150px) {
          .mobile-menu-btn {
            display: none !important;
          }
          .mobile-nav {
            display: flex !important;
            position: static !important;
            box-shadow: none !important;
            border-top: 1px solid #e2e8f0;
          }
          .mobile-submenu {
            display: block !important;
          }
        }
      </style>
    </noscript>
`;

const files = [
  'annual-leave-calculator.html',
  'blog-post-template.html',
  'blog.html',
  'epf-kwsp.html',
  'index.html',
  'overtime-pay-calculator.html',
  'pcb-income-tax.html',
  'privacy-policy.html',
  'socso-perkeso.html'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  if (content.includes('/* Desktop Dropdown Fallback */')) {
    console.log(`Skipping ${file}`);
    return;
  }
  
  content = content.replace('</head>', cssToAdd + '</head>');
  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
});
