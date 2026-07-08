const fs = require('fs');
const files = [
  'index.html',
  'epf-kwsp.html',
  'pcb-income-tax.html',
  'socso-perkeso.html',
  'annual-leave-calculator.html',
  'overtime-pay-calculator.html',
  'privacy-policy.html',
  'blog.html'
];

const navScript = `
    <!-- Navbar Support Script -->
    <script>
      (function() {
        const freeToolsTrigger = document.getElementById('freeToolsTrigger');
        const freeToolsMenu = document.getElementById('freeToolsMenu');
        const mobileFreeToolsTrigger = document.getElementById('mobileFreeToolsTrigger');
        const mobileFreeToolsMenu = document.getElementById('mobileFreeToolsMenu');

        if (freeToolsTrigger && freeToolsMenu) {
          const toggleMenu = (show) => {
            freeToolsMenu.classList.toggle('show', show);
            freeToolsTrigger.setAttribute('aria-expanded', show);
          };

          freeToolsTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isShow = freeToolsMenu.classList.contains('show');
            toggleMenu(!isShow);
          });

          document.addEventListener('click', (e) => {
            if (!freeToolsTrigger.contains(e.target) && !freeToolsMenu.contains(e.target)) {
              toggleMenu(false);
            }
          });

          freeToolsTrigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleMenu(!freeToolsMenu.classList.contains('show'));
            } else if (e.key === 'Escape') {
              toggleMenu(false);
            }
          });
        }

        if (mobileFreeToolsTrigger && mobileFreeToolsMenu) {
          mobileFreeToolsTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            const isShow = mobileFreeToolsMenu.classList.contains('show');
            mobileFreeToolsMenu.classList.toggle('show', !isShow);
            const svg = mobileFreeToolsTrigger.querySelector('svg');
            if (svg) svg.style.transform = isShow ? 'rotate(0deg)' : 'rotate(180deg)';
          });
        }

        // GA4 Tracking
        const trackNavClick = (toolName) => {
          if (typeof gtag === 'function') {
            gtag('event', 'nav_free_tools_click', { tool_name: toolName });
          }
        };

        document.querySelectorAll('[data-tool]').forEach(item => {
          item.addEventListener('click', (e) => {
            trackNavClick(item.getAttribute('data-tool'));
          });
        });

        // Highlight Active Nav
        const path = window.location.pathname;
        const normalizedPath = path === '/' || path === '' ? '/index.html' : path;
        
        // Desktop highlighting
        const desktopLinks = document.querySelectorAll('.desktop-nav .nav-item');
        desktopLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === '/' && (normalizedPath === '/index.html' || normalizedPath === '/')) {
            link.classList.add('active-nav');
          } else if (href !== '/' && normalizedPath.includes(href)) {
            link.classList.add('active-nav');
          }
        });

        // If a sub-item is active, also highlight the parent dropdown
        if (normalizedPath.includes('annual-leave-calculator') || normalizedPath.includes('overtime-pay-calculator')) {
          freeToolsTrigger?.classList.add('active-nav');
          mobileFreeToolsTrigger?.classList.add('active-nav');
        }

        // Mobile highlighting
        const mobileLinks = document.querySelectorAll('.mobile-nav .mobile-nav-item');
        mobileLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === '/' && (normalizedPath === '/index.html' || normalizedPath === '/')) {
            link.classList.add('active-nav');
          } else if (href !== '/' && normalizedPath.includes(href)) {
            link.classList.add('active-nav');
          }
        });
      })();
    </script>
`;

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  
  // Remove any old version if somehow present (though diagnosis said missing)
  content = content.replace(/<!-- Navbar Support Script -->[\s\S]*?<\/script>/, '');
  
  // Inject before </body>
  if (content.includes('</body>')) {
    content = content.replace('</body>', navScript + '</body>');
    fs.writeFileSync(file, content);
    console.log(`Injected script into ${file}`);
  }
}
