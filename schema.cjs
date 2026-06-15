const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
const FAQContent = `
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": ["SoftwareApplication", "WebApplication"],
            "name": "Salary Calculator Malaysia",
            "url": "https://salarycalculator.my/",
            "description": "Calculate your net salary in Malaysia after EPF, SOCSO, EIS, and PCB deductions instantly.",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "MYR"
            },
            "author": {
              "@type": "Organization",
              "name": "SalaryCalc MY",
              "url": "https://salarycalculator.my/"
            }
          },
          {
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How accurate are these calculations?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "All calculations are based on the latest 2026 official rates published by KWSP (EPF), PERKESO (SOCSO and EIS), and LHDN (PCB tax). Results are estimates."
                }
              },
              {
                "@type": "Question",
                "name": "Is my salary data saved anywhere?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. Every calculation runs entirely in your browser. We do not store, collect, or share any information you enter."
                }
              },
              {
                "@type": "Question",
                "name": "What should I enter as gross salary?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Gross salary is your base pay plus any fixed monthly allowances such as transport, housing, or meal allowances — before any deductions."
                }
              },
              {
                "@type": "Question",
                "name": "Why is my PCB showing RM0?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "PCB only applies once your monthly income after EPF exceeds RM2,851 (single) or RM3,851 (married)."
                }
              },
              {
                "@type": "Question",
                "name": "Why does SOCSO stop at RM6,000?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "SOCSO and EIS contributions are capped at RM6,000 per month."
                }
              },
              {
                "@type": "Question",
                "name": "Does this calculator work for foreigners?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Select Foreigner under Nationality."
                }
              },
              {
                "@type": "Question",
                "name": "How often are the rates updated?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We review and update all rates every January."
                }
              },
              {
                "@type": "Question",
                "name": "What is the difference between employee and employer contributions?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Employee contributions are deducted from your gross salary. Employer contributions are paid separately by your company."
                }
              }
            ]
          }
        ]
      }
    </script>
`;
html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, FAQContent);
fs.writeFileSync('index.html', html);
console.log('Schema updated.');
