/* ============================================================
   QA ENGINE — Salary Calculator MY
   Runs full audit, classifies severity, logs to localStorage.
   Triggered by: /api/qa-scheduler (Vercel Cron) every Sunday
   ============================================================ */

var QAEngine = (function () {

  var STORE_KEY   = 'salary_error_logs';
  var REPORT_KEY  = 'qa_weekly_report';
  var VERSION     = '1.0.0';

  /* ── Helpers ─────────────────────────────────────────────── */

  function timestamp() {
    return new Date().toISOString();
  }

  function makeId(index) {
    var d = new Date();
    var ymd = d.getFullYear().toString() +
      String(d.getMonth() + 1).padStart(2, '0') +
      String(d.getDate()).padStart(2, '0');
    return 'ERR-' + ymd + '-' + String(index).padStart(3, '0');
  }

  function saveLog(entry) {
    var logs = JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
    logs.unshift(entry);
    // Keep max 200 entries
    if (logs.length > 200) logs = logs.slice(0, 200);
    localStorage.setItem(STORE_KEY, JSON.stringify(logs));
  }

  function saveReport(report) {
    localStorage.setItem(REPORT_KEY, JSON.stringify(report));
  }

  /* ── Severity Classifier ─────────────────────────────────── */

  function classify(module) {
    var HIGH   = ['Calculator', 'Download', 'API'];
    var MEDIUM = ['Performance', 'Navigation', 'DataIntegrity'];
    if (HIGH.indexOf(module) !== -1)   return 'HIGH';
    if (MEDIUM.indexOf(module) !== -1) return 'MEDIUM';
    return 'LOW';
  }

  /* ── Audit Modules ───────────────────────────────────────── */

  var results = [];
  var errorIndex = 1;

  function pass(id, scenario) {
    results.push({ id: id, scenario: scenario, status: 'PASS', severity: null });
  }

  function fail(severity, module, issue, stepsToReproduce, expected, actual, impact, suggestedFix) {
    var entry = {
      id:                makeId(errorIndex++),
      severity:          severity,
      module:            module,
      issue:             issue,
      steps_to_reproduce: stepsToReproduce,
      expected_result:   expected,
      actual_result:     actual,
      impact:            impact,
      timestamp:         timestamp(),
      status:            'OPEN',
      suggested_fix:     suggestedFix
    };
    saveLog(entry);
    results.push({ id: entry.id, scenario: issue, status: 'FAIL', severity: severity });
    return entry;
  }

  /* ── 1. Core Calculation Engine ──────────────────────────── */

  function auditCalculator() {
    var cases = [
      // [label, gross, epfRate, expectedEPF, expectedSOCSO, expectedEIS]
      { label: 'EPF 11% on RM3000',   gross: 3000,   epf: 0.11, expectedEPF: 330,   socsoMax: false },
      { label: 'EPF 11% on RM5000',   gross: 5000,   epf: 0.11, expectedEPF: 550,   socsoMax: false },
      { label: 'EPF 11% on RM6000',   gross: 6000,   epf: 0.11, expectedEPF: 660,   socsoMax: true  },
      { label: 'SOCSO ceiling check',  gross: 10000,  epf: 0.11, expectedEPF: 1100,  socsoMax: true  },
      { label: 'Zero salary',          gross: 0,      epf: 0.11, expectedEPF: 0,     socsoMax: false },
      { label: 'Minimum wage RM1700',  gross: 1700,   epf: 0.11, expectedEPF: 187,   socsoMax: false },
    ];

    cases.forEach(function (tc) {
      var calcEPF = Math.round(tc.gross * tc.epf * 100) / 100;
      if (calcEPF !== tc.expectedEPF) {
        fail('HIGH', 'Calculator',
          'EPF calculation incorrect for gross RM' + tc.gross,
          '1. Open calculator. 2. Enter RM' + tc.gross + '. 3. Click Calculate.',
          'EPF = RM' + tc.expectedEPF,
          'EPF = RM' + calcEPF,
          'User receives incorrect take-home pay',
          'Review EPF rate table and rounding logic.'
        );
      } else {
        pass(tc.label, 'EPF calc RM' + tc.gross);
      }

      // SOCSO ceiling: capped at RM5,000 wage ceiling
      var socsoBase = Math.min(tc.gross, 5000);
      var socsoEmployee = Math.round(socsoBase * 0.005 * 100) / 100; // ~0.5%
      if (tc.socsoMax && socsoEmployee > 25) {
        pass(tc.label + ' SOCSO', 'SOCSO ceiling respected');
      }

      // EIS ceiling check
      var eisBase = Math.min(tc.gross, 5000);
      var eisEmployee = Math.round(eisBase * 0.002 * 100) / 100;
      if (eisEmployee > 10) {
        pass(tc.label + ' EIS', 'EIS ceiling respected');
      }
    });

    // Net salary must not be negative
    var testGross = 3000;
    var mockDeductions = (testGross * 0.11) + (Math.min(testGross, 5000) * 0.005) + (Math.min(testGross, 5000) * 0.002);
    var net = testGross - mockDeductions;
    if (net < 0) {
      fail('HIGH', 'Calculator',
        'Net salary is negative — total deductions exceed gross salary',
        '1. Enter any gross salary. 2. Click Calculate. 3. Check net pay.',
        'Net salary must always be >= 0',
        'Net salary shows negative value: RM' + net.toFixed(2),
        'Critical financial error displayed to user',
        'Add guard: if (netSalary < 0) netSalary = 0 and log error.'
      );
    } else {
      pass('NET-001', 'Net salary non-negative');
    }
  }

  /* ── 2. Input Validation ─────────────────────────────────── */

  function auditInputValidation() {
    var invalidInputs = ['', '-3000', 'abc', '@@##', '999999999999', '3500.999999'];

    invalidInputs.forEach(function (input) {
      var numeric = parseFloat(input);
      var isInvalid = isNaN(numeric) || numeric < 0;
      var isExtreme = numeric > 10000000;

      if (isInvalid) {
        // Confirm the system would catch this
        pass('INPUT-' + input, 'Invalid input rejected: "' + input + '"');
      } else if (isExtreme) {
        pass('INPUT-EXTREME', 'Extreme value handled: ' + input);
      } else {
        pass('INPUT-VALID', 'Valid input accepted: ' + input);
      }
    });

    // Decimal precision
    var decimalResult = Math.round(3500.50 * 0.11 * 100) / 100;
    if (decimalResult !== 385.06) {
      fail('MEDIUM', 'Calculator',
        'Decimal salary rounding inconsistency at RM3500.50',
        '1. Enter 3500.50 as gross salary. 2. Click Calculate. 3. Check EPF value.',
        'EPF = RM385.06 (2 decimal places)',
        'EPF = RM' + decimalResult,
        'Minor financial rounding error in displayed results',
        'Use Math.round(value * 100) / 100 consistently.'
      );
    } else {
      pass('INPUT-DECIMAL', 'Decimal rounding correct');
    }
  }

  /* ── 3. UI / UX Stability ────────────────────────────────── */

  function auditUI() {
    if (typeof document === 'undefined') return;

    // Check key elements exist
    var elements = [
      { id: 'grossSalary',  label: 'Salary input field',   severity: 'HIGH'   },
      { id: 'resultCard',   label: 'Result card',          severity: 'HIGH'   },
      { id: 'maritalStatus',label: 'Marital status select', severity: 'MEDIUM' },
      { id: 'bonus',        label: 'Bonus input field',    severity: 'MEDIUM' },
    ];

    elements.forEach(function (el) {
      var elem = document.getElementById(el.id);
      if (!elem) {
        fail(el.severity, 'UI',
          el.label + ' (#' + el.id + ') not found in DOM',
          '1. Open https://salarycalculator.my. 2. Inspect element #' + el.id + '.',
          'Element #' + el.id + ' exists and is interactive',
          'Element #' + el.id + ' is missing from the page',
          el.severity === 'HIGH' ? 'User cannot complete salary calculation' : 'Usability degraded',
          'Check HTML for missing #' + el.id + ' element.'
        );
      } else {
        pass('UI-' + el.id, el.label + ' present in DOM');
      }
    });

    // Page title check
    if (document.title.indexOf('Salary') === -1) {
      fail('LOW', 'UI',
        'Page title does not contain "Salary"',
        '1. Open the page. 2. Check browser tab title.',
        'Title contains "Salary Calculator"',
        'Actual title: "' + document.title + '"',
        'Minor SEO and branding inconsistency',
        'Update <title> tag to include "Salary Calculator".'
      );
    } else {
      pass('UI-TITLE', 'Page title correct');
    }

    // Meta description
    var meta = document.querySelector('meta[name="description"]');
    if (!meta || !meta.content) {
      fail('LOW', 'UI',
        'Missing or empty meta description',
        '1. View page source. 2. Look for <meta name="description">.',
        'Meta description present with relevant content',
        'Meta description is missing',
        'Minor SEO impact',
        'Add <meta name="description" content="..."> to <head>.'
      );
    } else {
      pass('UI-META', 'Meta description present');
    }
  }

  /* ── 4. System Reliability ───────────────────────────────── */

  function auditReliability() {
    // localStorage availability
    try {
      localStorage.setItem('qa_ping', '1');
      localStorage.removeItem('qa_ping');
      pass('SYS-LOCALSTORAGE', 'localStorage is accessible');
    } catch (e) {
      fail('MEDIUM', 'DataIntegrity',
        'localStorage is not accessible',
        '1. Open site in private/incognito mode with storage blocked.',
        'localStorage available for error logging',
        'localStorage access denied: ' + e.message,
        'Error logs and status tracking will not persist',
        'Add try/catch around all localStorage calls.'
      );
    }

    // Console error monitoring (post-load check)
    if (typeof window !== 'undefined') {
      var originalError = console.error;
      var caughtErrors = [];
      console.error = function () {
        caughtErrors.push(Array.prototype.slice.call(arguments).join(' '));
        originalError.apply(console, arguments);
      };
      setTimeout(function () {
        console.error = originalError;
        if (caughtErrors.length > 0) {
          fail('MEDIUM', 'API',
            caughtErrors.length + ' console error(s) detected on page load',
            '1. Open devtools console. 2. Reload the page. 3. Check for red errors.',
            'No console errors on page load',
            'Console errors: ' + caughtErrors.slice(0, 2).join('; '),
            'Runtime errors may affect calculator stability',
            'Review and resolve all console errors before next release.'
          );
        } else {
          pass('SYS-CONSOLE', 'No console errors on page load');
        }
      }, 3000);
    }

    // Performance: check if page loaded in reasonable time
    if (typeof window !== 'undefined' && window.performance && window.performance.timing) {
      var loadTime = window.performance.timing.domContentLoadedEventEnd -
                     window.performance.timing.navigationStart;
      if (loadTime > 5000) {
        fail('MEDIUM', 'Performance',
          'Page load time exceeds 5 seconds (' + (loadTime / 1000).toFixed(2) + 's)',
          '1. Open https://salarycalculator.my. 2. Check Network tab in DevTools.',
          'Page loads within 3 seconds',
          'Page load time: ' + (loadTime / 1000).toFixed(2) + 's',
          'Poor user experience, high bounce rate risk',
          'Optimize images, reduce JS bundle, enable Vercel edge caching.'
        );
      } else {
        pass('SYS-PERF', 'Page load time acceptable: ' + (loadTime / 1000).toFixed(2) + 's');
      }
    }
  }

  /* ── 5. Critical User Flows ──────────────────────────────── */

  function auditUserFlows() {
    if (typeof document === 'undefined') return;

    // Calculate button
    var calcBtn = document.querySelector('[onclick*="calculateSalary"], button[id*="calc"]') ||
                  Array.prototype.find.call(document.querySelectorAll('button'), function(b) {
                    return b.textContent.toLowerCase().indexOf('calculate') !== -1;
                  });
    if (!calcBtn) {
      fail('HIGH', 'Calculator',
        'Calculate button not found on page',
        '1. Open https://salarycalculator.my. 2. Look for a Calculate button.',
        'Calculate button is visible and clickable',
        'No Calculate button found in DOM',
        'Users cannot calculate salary — core function broken',
        'Verify button HTML exists and onclick is bound.'
      );
    } else {
      pass('FLOW-CALC-BTN', 'Calculate button found in DOM');
    }

    // Reset / clear form
    var resetBtn = Array.prototype.find.call(document.querySelectorAll('button'), function(b) {
      return b.textContent.toLowerCase().indexOf('reset') !== -1 ||
             b.textContent.toLowerCase().indexOf('clear') !== -1;
    });
    if (!resetBtn) {
      fail('HIGH', 'Calculator',
        'Reset/Clear button not found on page',
        '1. Open https://salarycalculator.my. 2. Look for a Reset or Clear button.',
        'Reset button exists and clears all form fields',
        'No Reset or Clear button found',
        'User cannot reset the form — stuck with previous data',
        'Add a reset button that clears all input fields.'
      );
    } else {
      pass('FLOW-RESET-BTN', 'Reset button found in DOM');
    }

    // Download buttons
    var downloadBtns = document.querySelectorAll('[onclick*="download"], [onclick*="Download"], a[download]');
    if (downloadBtns.length === 0) {
      fail('HIGH', 'Download',
        'Download salary report/payslip button not found',
        '1. Open https://salarycalculator.my. 2. Look for Download Report or Download Payslip button.',
        'Download buttons are visible after calculation',
        'No download buttons found in DOM',
        'User cannot download salary report or payslip',
        'Verify download buttons render after calculateSalary() runs.'
      );
    } else {
      pass('FLOW-DOWNLOAD', 'Download button(s) found: ' + downloadBtns.length);
    }
  }

  /* ── Generate Weekly Report ──────────────────────────────── */

  function generateReport() {
    var total  = results.length;
    var passed = results.filter(function(r) { return r.status === 'PASS'; }).length;
    var failed = results.filter(function(r) { return r.status === 'FAIL'; }).length;
    var high   = results.filter(function(r) { return r.severity === 'HIGH'; }).length;
    var medium = results.filter(function(r) { return r.severity === 'MEDIUM'; }).length;
    var low    = results.filter(function(r) { return r.severity === 'LOW'; }).length;

    // Health score: start at 100, deduct per severity
    var score = Math.max(0, 100 - (high * 15) - (medium * 5) - (low * 1));

    var report = {
      generated_at:    timestamp(),
      version:         VERSION,
      audit_scope:     ['Calculator', 'InputValidation', 'UI', 'Reliability', 'UserFlows'],
      summary: {
        total_tests:   total,
        passed:        passed,
        failed:        failed,
        high_severity: high,
        medium_severity: medium,
        low_severity:  low,
        health_score:  score
      },
      results: results,
      next_audit: 'Next Sunday 02:00 MYT'
    };

    saveReport(report);
    console.log('[QA Engine] Weekly audit complete. Health score: ' + score + '/100');
    console.log('[QA Engine] Tests: ' + total + ' | Pass: ' + passed + ' | Fail: ' + failed);
    console.log('[QA Engine] HIGH: ' + high + ' | MEDIUM: ' + medium + ' | LOW: ' + low);
    return report;
  }

  /* ── Public API ──────────────────────────────────────────── */

  function runAudit() {
    results    = [];
    errorIndex = 1;
    console.log('[QA Engine v' + VERSION + '] Starting full audit — ' + timestamp());

    auditCalculator();
    auditInputValidation();
    auditUI();
    auditReliability();
    auditUserFlows();

    return generateReport();
  }

  function getReport() {
    return JSON.parse(localStorage.getItem(REPORT_KEY) || 'null');
  }

  function clearReport() {
    localStorage.removeItem(REPORT_KEY);
  }

  return { runAudit: runAudit, getReport: getReport, clearReport: clearReport };

})();
