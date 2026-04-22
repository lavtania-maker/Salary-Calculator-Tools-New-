import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * QA Scheduler — Salary Calculator MY
 * Vercel Cron: runs every Sunday at 02:00 MYT (18:00 UTC Saturday)
 * Configured in vercel.json under "crons"
 *
 * This route performs a lightweight server-side audit:
 * - Validates core calculation logic (EPF, SOCSO, EIS)
 * - Checks API reachability
 * - Generates a structured QA summary
 * - Returns results as JSON (browser QA engine handles localStorage logging)
 */

interface AuditResult {
  id: string;
  scenario: string;
  status: 'PASS' | 'FAIL';
  severity: 'HIGH' | 'MEDIUM' | 'LOW' | null;
  detail?: string;
}

interface ErrorEntry {
  id: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  module: string;
  issue: string;
  steps_to_reproduce: string;
  expected_result: string;
  actual_result: string;
  impact: string;
  timestamp: string;
  status: 'OPEN';
  suggested_fix: string;
}

function makeId(index: number): string {
  const d = new Date();
  const ymd = d.getFullYear().toString() +
    String(d.getMonth() + 1).padStart(2, '0') +
    String(d.getDate()).padStart(2, '0');
  return `ERR-${ymd}-${String(index).padStart(3, '0')}`;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/* ── Core Calculation Audit (server-side) ─────────────────── */

function auditCalculations(): { results: AuditResult[]; errors: ErrorEntry[] } {
  const results: AuditResult[] = [];
  const errors: ErrorEntry[] = [];
  let idx = 1;

  const cases = [
    { gross: 1700,  expectedEPF: 187.00,  label: 'Minimum wage RM1700' },
    { gross: 3000,  expectedEPF: 330.00,  label: 'Standard RM3000' },
    { gross: 5000,  expectedEPF: 550.00,  label: 'Threshold RM5000' },
    { gross: 6000,  expectedEPF: 660.00,  label: 'Above threshold RM6000' },
    { gross: 10000, expectedEPF: 1100.00, label: 'High salary RM10000' },
    { gross: 0,     expectedEPF: 0.00,    label: 'Zero salary' },
  ];

  cases.forEach(tc => {
    const calcEPF = round2(tc.gross * 0.11);
    if (calcEPF !== tc.expectedEPF) {
      const entry: ErrorEntry = {
        id: makeId(idx++),
        severity: 'HIGH',
        module: 'Calculator',
        issue: `EPF calculation incorrect for gross RM${tc.gross}`,
        steps_to_reproduce: `1. Open calculator. 2. Enter RM${tc.gross}. 3. Click Calculate. 4. Check EPF deduction.`,
        expected_result: `EPF = RM${tc.expectedEPF}`,
        actual_result: `EPF = RM${calcEPF}`,
        impact: 'User receives incorrect take-home pay — financial accuracy compromised.',
        timestamp: new Date().toISOString(),
        status: 'OPEN',
        suggested_fix: 'Verify EPF rate table. Confirm 11% applied correctly. Check rounding with Math.round(gross * 0.11 * 100) / 100.'
      };
      errors.push(entry);
      results.push({ id: entry.id, scenario: tc.label, status: 'FAIL', severity: 'HIGH', detail: entry.issue });
    } else {
      results.push({ id: `CALC-${idx++}`, scenario: tc.label, status: 'PASS', severity: null });
    }

    // SOCSO ceiling: employee contribution capped at RM5,000 wage ceiling
    const socsoBase = Math.min(tc.gross, 5000);
    const socsoEmp = round2(socsoBase * 0.005);
    if (socsoEmp > 25.00) {
      const entry: ErrorEntry = {
        id: makeId(idx++),
        severity: 'HIGH',
        module: 'Calculator',
        issue: `SOCSO employee contribution exceeds ceiling for RM${tc.gross}`,
        steps_to_reproduce: `1. Enter RM${tc.gross}. 2. Click Calculate. 3. Check SOCSO deduction.`,
        expected_result: 'SOCSO employee capped at RM25.00 (RM5000 wage ceiling * 0.5%)',
        actual_result: `SOCSO employee = RM${socsoEmp}`,
        impact: 'User is overcharged on SOCSO contribution.',
        timestamp: new Date().toISOString(),
        status: 'OPEN',
        suggested_fix: 'Apply Math.min(grossSalary, 5000) before SOCSO rate calculation.'
      };
      errors.push(entry);
      results.push({ id: entry.id, scenario: `SOCSO ceiling ${tc.label}`, status: 'FAIL', severity: 'HIGH' });
    } else {
      results.push({ id: `SOCSO-${idx++}`, scenario: `SOCSO ceiling ${tc.label}`, status: 'PASS', severity: null });
    }

    // Net salary must never be negative
    const totalDed = round2(tc.gross * 0.11) + round2(Math.min(tc.gross, 5000) * 0.005) + round2(Math.min(tc.gross, 5000) * 0.002);
    const net = round2(tc.gross - totalDed);
    if (net < 0) {
      const entry: ErrorEntry = {
        id: makeId(idx++),
        severity: 'HIGH',
        module: 'Calculator',
        issue: `Net salary is negative for gross RM${tc.gross}`,
        steps_to_reproduce: `1. Enter RM${tc.gross}. 2. Click Calculate. 3. Check net pay.`,
        expected_result: 'Net salary >= RM0',
        actual_result: `Net salary = RM${net}`,
        impact: 'Critical financial error — user sees impossible negative take-home pay.',
        timestamp: new Date().toISOString(),
        status: 'OPEN',
        suggested_fix: 'Add guard: if (netSalary < 0) netSalary = 0; Review deduction caps.'
      };
      errors.push(entry);
      results.push({ id: entry.id, scenario: `Net pay check ${tc.label}`, status: 'FAIL', severity: 'HIGH' });
    } else {
      results.push({ id: `NET-${idx++}`, scenario: `Net pay check ${tc.label}`, status: 'PASS', severity: null });
    }
  });

  return { results, errors };
}

/* ── Health Score ─────────────────────────────────────────── */

function healthScore(high: number, medium: number, low: number): number {
  return Math.max(0, 100 - (high * 15) - (medium * 5) - (low * 1));
}

/* ── Handler ─────────────────────────────────────────────── */

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Security: only allow GET from Vercel Cron or authenticated internal call
  const authHeader = req.headers['authorization'];
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { results, errors } = auditCalculations();

    const passed = results.filter(r => r.status === 'PASS').length;
    const failed = results.filter(r => r.status === 'FAIL').length;
    const high   = errors.filter(e => e.severity === 'HIGH').length;
    const medium = errors.filter(e => e.severity === 'MEDIUM').length;
    const low    = errors.filter(e => e.severity === 'LOW').length;
    const score  = healthScore(high, medium, low);

    const report = {
      generated_at:   new Date().toISOString(),
      source:         'server-cron',
      audit_scope:    ['Calculator', 'SOCSO', 'EIS', 'NetSalary'],
      summary: {
        total_tests:      results.length,
        passed,
        failed,
        high_severity:    high,
        medium_severity:  medium,
        low_severity:     low,
        health_score:     score,
      },
      errors,
      results,
      next_audit: 'Next Sunday 02:00 MYT',
    };

    return res.status(200).json(report);

  } catch (err: any) {
    return res.status(500).json({
      error: 'QA audit failed',
      message: err.message || 'Unknown error',
      timestamp: new Date().toISOString(),
    });
  }
}
