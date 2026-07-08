const fs = require('fs');
const files = [
  'index.html',
  'epf-kwsp.html',
  'pcb-income-tax.html',
  'socso-perkeso.html',
  'annual-leave-calculator.html',
  'overtime-pay-calculator.html',
  'privacy-policy.html',
  'blog.html',
  'blog-post-template.html'
];

const navScript = `
    <!-- Navbar Support Script -->
    <script>
      (function() {
        // Mobile Menu Toggle
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileNavMenu = document.getElementById('mobileNavMenu');

        if (mobileMenuToggle && mobileNavMenu) {
          mobileMenuToggle.addEventListener('click', () => {
            const isOpened = mobileNavMenu.classList.contains('open');
            mobileNavMenu.classList.toggle('open', !isOpened);
            mobileMenuToggle.classList.toggle('active', !isOpened);
          });
        }

        // Desktop Dropdown Toggle (for click fallback on touch devices)
        const freeToolsTrigger = document.getElementById('freeToolsTrigger');
        const freeToolsMenu = document.getElementById('freeToolsMenu');
        
        if (freeToolsTrigger && freeToolsMenu) {
          freeToolsTrigger.addEventListener('click', (e) => {
            if (window.innerWidth > 1150) {
              e.preventDefault();
              const isShow = freeToolsMenu.classList.contains('show');
              freeToolsMenu.classList.toggle('show', !isShow);
            }
          });

          // Close menu when clicking outside
          document.addEventListener('click', (e) => {
            if (!freeToolsTrigger.contains(e.target) && !freeToolsMenu.contains(e.target)) {
              freeToolsMenu.classList.remove('show');
            }
          });
        }

        // Mobile Dropdown/Submenu Toggle
        const mobileFreeToolsTrigger = document.getElementById('mobileFreeToolsTrigger');
        const mobileFreeToolsMenu = document.getElementById('mobileFreeToolsMenu');

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
            gtag('event', 'nav_click', { tool_name: toolName });
          }
        };

        document.querySelectorAll('.nav-item, .mobile-nav-item, .dropdown-item, .mobile-submenu-item').forEach(item => {
          item.addEventListener('click', () => {
            trackNavClick(item.textContent.trim());
          });
        });

        // Highlight Active Nav
        const path = window.location.pathname;
        const normalizedPath = path === '/' || path === '' ? '/index.html' : path;
        
        // desktop and mobile highlighting
        const allLinks = document.querySelectorAll('.nav-item, .mobile-nav-item, .dropdown-item, .mobile-submenu-item');
        allLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (!href) return;
          
          if (href === '/' && (normalizedPath === '/index.html' || normalizedPath === '/')) {
            link.classList.add('active-nav');
          } else if (href !== '/' && normalizedPath.includes(href)) {
            link.classList.add('active-nav');
            
            // If it's a dropdown item, also highlight the trigger
            if (link.classList.contains('dropdown-item')) {
              if (freeToolsTrigger) freeToolsTrigger.classList.add('active-nav');
            }
            if (link.classList.contains('mobile-submenu-item')) {
              if (mobileFreeToolsTrigger) mobileFreeToolsTrigger.classList.add('active-nav');
              if (mobileFreeToolsMenu) mobileFreeToolsMenu.classList.add('show');
              const svg = mobileFreeToolsTrigger?.querySelector('svg');
              if (svg) svg.style.transform = 'rotate(180deg)';
            }
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
