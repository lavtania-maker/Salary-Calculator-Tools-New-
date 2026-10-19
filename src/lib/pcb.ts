/**
 * Official HASiL (LHDN) 2026 Computerised Calculation Specification for PCB / MTD
 * Reference: "Spesifikasi Pengiraan PCB 2026 Menggunakan Pengiraan Berkomputer"
 * 
 * Rules covered:
 * 1. Category 1 & 3 (Single, or Married with working spouse) vs Category 2 (Married, non-working spouse).
 * 2. Resident individual progressive tax brackets (0% - 30%) with YA 2023-2026 rate revisions.
 * 3. Section 6A Tax Rebates: RM 400 (Category 1 & 3) and RM 800 (Category 2) when Chargeable Income (P) <= RM 35,000.
 * 4. Statutory reliefs: Individual (RM 9,000), Spouse (RM 4,000 for Category 2), Child (RM 2,000 per qualifying child).
 * 5. EPF relief via official K1/K2 computerized formulation capped at RM 4,000 annual limit.
 * 6. Non-resident individuals taxed at flat 30% gross without personal reliefs or tax rebates.
 * 7. Additional remuneration (bonus, commission, arrears) computed as incremental annual tax.
 * 8. Official HASiL rounding: truncated to 2 decimals, rounded up to next 5 cents, and exempt if monthly PCB < RM 10.
 */

export interface PcbCalculationInput {
  grossSalary: number;            // Monthly basic / normal remuneration
  bonus?: number;                  // One-off bonus or additional remuneration in current month
  epfRate?: number;                // EPF rate (default 0.11, e.g. 11% or 9%)
  includeEpf?: boolean;            // Whether EPF deduction applies (default true)
  maritalStatus?: string;          // "single" | "married" | "married_spouse_not_working" | "married_spouse_working"
  spouseWorking?: string | boolean;// "yes" | "no" | boolean (for pcb-calculator UI format)
  childrenCount?: number;          // Number of eligible children (< 18)
  additionalRelief?: number;       // Annual voluntary tax reliefs (TP1)
  taxStatus?: string;              // "resident" | "non-resident"
}

export interface PcbCalculationResult {
  monthlyPcb: number;              // Final rounded monthly PCB deduction for the month
  normalMonthlyPcb: number;        // Monthly PCB on regular salary alone
  additionalPcb: number;           // PCB on bonus / additional remuneration
  annualTax: number;               // Estimated total annual tax payable
  annualTaxNormal: number;         // Estimated annual tax on normal salary
  annualIncome: number;            // Estimated annual gross income
  chargeableIncome: number;        // Annual chargeable income (P)
  monthlyChargeableIncome: number; // Chargeable income / 12
  totalRelief: number;             // Total annual reliefs claimed
  monthlyRelief: number;           // Total annual reliefs / 12
  actualEpfMonthly: number;        // Actual employee EPF contribution per month
  epfReliefAnnual: number;         // Allowable annual EPF relief (max RM 4,000)
  effectiveTaxRate: number;        // Effective tax rate percentage (%)
  taxBracket: string;              // Tax bracket string (e.g. "6%", "11%", "19%", etc.)
  isNonResident: boolean;
  isCategory2: boolean;            // Married, spouse not working
}

export interface MtdBand {
  lo: number;
  hi: number;
  M: number;
  R: number;
  B1: number; // Category 1 & 3: Single, or Married with working spouse
  B2: number; // Category 2: Married with non-working spouse
}

export const MTD_TABLE_2026: MtdBand[] = [
  { lo: 0, hi: 5000, M: 0, R: 0.00, B1: 0, B2: 0 },
  { lo: 5000, hi: 20000, M: 5000, R: 0.01, B1: -400, B2: -800 },
  { lo: 20000, hi: 35000, M: 20000, R: 0.03, B1: -250, B2: -650 },
  { lo: 35000, hi: 50000, M: 35000, R: 0.06, B1: 600, B2: 600 },
  { lo: 50000, hi: 70000, M: 50000, R: 0.11, B1: 1500, B2: 1500 },
  { lo: 70000, hi: 100000, M: 70000, R: 0.19, B1: 3700, B2: 3700 },
  { lo: 100000, hi: 400000, M: 100000, R: 0.25, B1: 9400, B2: 9400 },
  { lo: 400000, hi: 600000, M: 400000, R: 0.26, B1: 84400, B2: 84400 },
  { lo: 600000, hi: 2000000, M: 600000, R: 0.28, B1: 136400, B2: 136400 },
  { lo: 2000000, hi: Infinity, M: 2000000, R: 0.30, B1: 528400, B2: 528400 },
];

/**
 * HASiL Official Rounding Rule:
 * 1. Truncate to 2 decimal places.
 * 2. If calculated monthly MTD < RM 10, deduction is RM 0.00.
 * 3. Monthly MTD is rounded up to the nearest 5 cents:
 *    - 1, 2, 3, 4 cents round up to 5 cents
 *    - 6, 7, 8, 9 cents round up to 10 cents
 *    - 0 or 5 cents remain unchanged
 */
export function roundHasilPcb(raw: number): number {
  if (raw <= 0) return 0;
  if (raw < 10) return 0; // Exemption if MTD < RM 10
  
  // Truncate to 2 decimal places per LHDN spec
  const truncated = Math.floor(raw * 100) / 100;
  
  // Round up to next 5 cents
  const rounded = Math.ceil(Math.floor(truncated * 100) / 5) * 5 / 100;
  return Math.round(rounded * 100) / 100;
}

/**
 * Helper to determine Category 2 (married, spouse not working)
 */
export function isCategory2Status(maritalStatus: string, spouseWorking?: string | boolean): boolean {
  if (maritalStatus === "married_spouse_not_working" || maritalStatus === "married_non_working") {
    return true;
  }
  if (maritalStatus === "married" || maritalStatus === "married_working") {
    if (spouseWorking === "no" || spouseWorking === false) {
      return true;
    }
  }
  if (maritalStatus.includes("spouse_not_working")) {
    return true;
  }
  return false;
}

/**
 * Calculate annual tax on a given chargeable income P for resident individual
 */
export function calculateAnnualTaxForP(P: number, isCat2: boolean): { annualTax: number; bracket: string } {
  if (P <= 0) return { annualTax: 0, bracket: "0%" };

  let band = MTD_TABLE_2026[0];
  for (let i = MTD_TABLE_2026.length - 1; i >= 0; i--) {
    if (P > MTD_TABLE_2026[i].lo) {
      band = MTD_TABLE_2026[i];
      break;
    }
  }

  const B = isCat2 ? band.B2 : band.B1;
  const rawTax = (P - band.M) * band.R + B;
  const annualTax = Math.max(0, rawTax);

  const bracket = (band.R * 100).toFixed(0) + "%";
  return { annualTax, bracket };
}

/**
 * Core official 2026 HASiL computerized PCB calculation
 */
export function calculateOfficialPcb(input: PcbCalculationInput): PcbCalculationResult {
  const salary = Math.max(0, input.grossSalary || 0);
  const bonus = Math.max(0, input.bonus || 0);
  const totalMonthlyGross = salary + bonus;

  if (totalMonthlyGross <= 0) {
    return {
      monthlyPcb: 0,
      normalMonthlyPcb: 0,
      additionalPcb: 0,
      annualTax: 0,
      annualTaxNormal: 0,
      annualIncome: 0,
      chargeableIncome: 0,
      monthlyChargeableIncome: 0,
      totalRelief: 0,
      monthlyRelief: 0,
      actualEpfMonthly: 0,
      epfReliefAnnual: 0,
      effectiveTaxRate: 0,
      taxBracket: "0%",
      isNonResident: false,
      isCategory2: false,
    };
  }

  const isNonResident = input.taxStatus === "non-resident";
  const includeEpf = input.includeEpf !== false;
  const epfRate = input.epfRate !== undefined ? input.epfRate : 0.11;
  const maritalStatus = input.maritalStatus || "single";
  const isCat2 = isCategory2Status(maritalStatus, input.spouseWorking);
  const childrenCount = Math.max(0, input.childrenCount || 0);
  const additionalRelief = Math.max(0, input.additionalRelief || 0);

  // 1. Non-resident calculation: flat 30% without relief/rebates
  if (isNonResident) {
    const actualEpfMonthly = includeEpf ? salary * epfRate : 0;
    const normalMonthlyTax = salary * 0.30;
    const additionalTax = bonus * 0.30;
    const totalMonthlyTax = normalMonthlyTax + additionalTax;
    const annualIncome = (salary * 12) + bonus;
    const annualTax = annualIncome * 0.30;

    return {
      monthlyPcb: Math.round(totalMonthlyTax * 100) / 100,
      normalMonthlyPcb: Math.round(normalMonthlyTax * 100) / 100,
      additionalPcb: Math.round(additionalTax * 100) / 100,
      annualTax: Math.round(annualTax * 100) / 100,
      annualTaxNormal: Math.round((salary * 12 * 0.30) * 100) / 100,
      annualIncome,
      chargeableIncome: annualIncome,
      monthlyChargeableIncome: totalMonthlyGross,
      totalRelief: 0,
      monthlyRelief: 0,
      actualEpfMonthly,
      epfReliefAnnual: 0,
      effectiveTaxRate: 30,
      taxBracket: "30%",
      isNonResident: true,
      isCategory2: false,
    };
  }

  // 2. Resident employee calculation

  // Step A: EPF on normal remuneration
  const actualEpfMonthly = includeEpf ? salary * epfRate : 0;
  const EPF_LIMIT = 4000;
  const n = 11;
  const K1 = Math.min(actualEpfMonthly, EPF_LIMIT);
  const K2 = Math.min(Math.floor(((EPF_LIMIT - K1) / n) * 100) / 100, K1);
  const epfReliefNormal = Math.min(K1 + K2 * n, EPF_LIMIT);

  // Step B: Reliefs on normal remuneration
  const personalRelief = 9000; // D
  const spouseRelief = isCat2 ? 4000 : 0; // S
  const childRelief = childrenCount * 2000; // QC
  const totalReliefNormal = personalRelief + spouseRelief + childRelief + epfReliefNormal + additionalRelief;

  // Step C: Chargeable income on normal remuneration
  const annualGrossNormal = salary * 12;
  const P_normal = Math.max(0, annualGrossNormal - totalReliefNormal);

  // Step D: Annual tax on normal remuneration
  const { annualTax: annualTaxNormal, bracket: normalBracket } = calculateAnnualTaxForP(P_normal, isCat2);
  const rawNormalMonthlyPcb = annualTaxNormal / 12;
  const normalMonthlyPcb = roundHasilPcb(rawNormalMonthlyPcb);

  // Step E: Additional remuneration (Bonus), if any
  let additionalPcb = 0;
  let totalAnnualTax = annualTaxNormal;
  let P_total = P_normal;
  let totalReliefFinal = totalReliefNormal;
  let epfReliefFinal = epfReliefNormal;
  let finalBracket = normalBracket;

  if (bonus > 0) {
    const epfBonus = includeEpf ? bonus * epfRate : 0;
    epfReliefFinal = Math.min(epfReliefNormal + epfBonus, EPF_LIMIT);
    totalReliefFinal = personalRelief + spouseRelief + childRelief + epfReliefFinal + additionalRelief;

    const annualGrossTotal = annualGrossNormal + bonus;
    P_total = Math.max(0, annualGrossTotal - totalReliefFinal);

    const { annualTax: taxTotalWithBonus, bracket: totalBracket } = calculateAnnualTaxForP(P_total, isCat2);
    totalAnnualTax = taxTotalWithBonus;
    finalBracket = totalBracket;

    const rawAdditionalTax = Math.max(0, taxTotalWithBonus - annualTaxNormal);
    // Truncate to 2 decimal places and round to next 5 cents per HASiL specification
    if (rawAdditionalTax >= 10) {
      const truncated = Math.floor(rawAdditionalTax * 100) / 100;
      additionalPcb = Math.ceil(Math.floor(truncated * 100) / 5) * 5 / 100;
      additionalPcb = Math.round(additionalPcb * 100) / 100;
    } else {
      additionalPcb = 0;
    }
  }

  const finalMonthlyPcb = Math.round((normalMonthlyPcb + additionalPcb) * 100) / 100;
  const effectiveRate = totalMonthlyGross > 0 ? (finalMonthlyPcb / totalMonthlyGross) * 100 : 0;

  return {
    monthlyPcb: finalMonthlyPcb,
    normalMonthlyPcb,
    additionalPcb,
    annualTax: totalAnnualTax,
    annualTaxNormal,
    annualIncome: (salary * 12) + bonus,
    chargeableIncome: P_total,
    monthlyChargeableIncome: P_total > 0 ? P_total / 12 : 0,
    totalRelief: totalReliefFinal,
    monthlyRelief: totalReliefFinal / 12,
    actualEpfMonthly,
    epfReliefAnnual: epfReliefFinal,
    effectiveTaxRate: effectiveRate,
    taxBracket: finalBracket,
    isNonResident: false,
    isCategory2: isCat2,
  };
}
