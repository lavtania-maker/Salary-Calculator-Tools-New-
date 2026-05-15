const fs = require('fs');
let html = fs.readFileSync('epf-kwsp.html', 'utf8');

const regex = /<!-- Section 6: Official Calculators -->[\s\S]*?(?=<\/div>\s*<\/div>\s*<\/section>)/;
const replacement = `<!-- Section 6: Official Calculators -->
        <div class="content-card" style="margin-bottom: 32px; padding: 32px; background: #fff; border: 1px solid #e2e8f0; border-radius: 20px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--text-main); margin-bottom: 10px; letter-spacing: -0.025em;">Official Government Salary Calculators</h2>
          <p style="color: #64748b; font-size: 1.05rem; margin-bottom: 24px; line-height: 1.6;">
            For official verification and precise statutory calculations, visit
            the government portal:
          </p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">
            <a
              href="https://www.kwsp.gov.my/"
              target="_blank"
              rel="noopener noreferrer"
              style="
                padding: 16px;
                background: #f0f9ff;
                border: 1px solid #bae6fd;
                border-radius: 12px;
                display: flex;
                flex-direction: column;
                gap: 12px;
                text-decoration: none;
                color: inherit;
                box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.05);
                transition: transform 0.2s, box-shadow 0.2s;
              "
              onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 10px -3px rgba(0, 0, 0, 0.1)';"
              onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px -1px rgba(0, 0, 0, 0.05)';"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/6/64/Employees_Provident_Fund_%28Malaysia%29_logo.svg/1280px-Employees_Provident_Fund_%28Malaysia%29_logo.svg.png"
                alt="EPF Logo"
                style="width: 48px; height: 48px; object-fit: contain; flex-shrink: 0; margin-bottom: 4px;"
              />
              <div style="flex: 1;">
                <h3
                  style="
                    font-size: 1rem;
                    font-weight: 800;
                    color: #0369a1;
                    margin: 0 0 4px 0;
                  "
                >
                  Official EPF Website
                </h3>
                <p style="color: #075985; font-size: 0.85rem; margin: 0; line-height: 1.4;">
                  Official EPF contribution & savings portal.
                </p>
              </div>
              <span
                style="
                  display: inline-flex;
                  align-items: center;
                  gap: 4px;
                  padding: 6px 12px;
                  background: #0369a1;
                  color: white;
                  font-size: 0.8rem;
                  font-weight: 700;
                  border-radius: 6px;
                  align-self: flex-start;
                "
              >
                Visit EPF
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </span>
            </a>
          </div>
        </div>`;

html = html.replace(regex, replacement);
fs.writeFileSync('epf-kwsp.html', html);
console.log('done!');
