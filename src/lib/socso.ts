/**
 * Shared SOCSO (PERKESO) Contribution Rates & Logic
 * Official Schedule under Employees' Social Security Act 1969 (Act 4)
 * Wage ceiling: RM 6,000 (effective October 2024)
 */

export interface SocsoResult {
  er: number;
  ee: number;
  total: number;
  er_only: number;
  bracket: number;
}

export const ER_ACT4_TABLE = [
  0, 0.4, 0.7, 1.1, 1.5, 2.1, 2.95, 4.35, 6.15, 7.85, 9.65, 11.35,
  13.15, 14.85, 16.65, 18.35, 20.15, 21.85, 23.65, 25.35, 27.15,
  28.85, 30.65, 32.35, 34.15, 35.85, 37.65, 39.35, 41.15, 42.85,
  44.65, 46.35, 48.15, 49.85, 51.65, 53.35, 55.15, 56.85, 58.65,
  60.35, 62.15, 63.85, 65.65, 67.35, 69.15, 70.85, 72.65, 74.35,
  76.15, 77.85, 79.65, 81.35, 83.15, 84.85, 86.65, 88.35, 90.15,
  91.85, 93.65, 95.35, 97.15, 98.85, 100.65, 102.35, 104.15, 104.15,
];

export const ER_ONLY_TABLE = [
  0, 0.3, 0.5, 0.8, 1.1, 1.5, 2.1, 3.1, 4.4, 5.6, 6.9, 8.1, 9.4, 10.6,
  11.9, 13.1, 14.4, 15.6, 16.9, 18.1, 19.4, 20.6, 21.9, 23.1, 24.4,
  25.6, 26.9, 28.1, 29.4, 30.6, 31.9, 33.1, 34.4, 35.6, 36.9, 38.1,
  39.4, 40.6, 41.9, 43.1, 44.4, 45.6, 46.9, 48.1, 49.4, 50.6, 51.9,
  53.1, 54.4, 55.6, 56.9, 58.1, 59.4, 60.6, 61.9, 63.1, 64.4, 65.6,
  66.9, 68.1, 69.4, 70.6, 71.9, 73.1, 74.4, 74.4,
];

export const EE_TABLE = [
  0, 0.1, 0.2, 0.3, 0.4, 0.6, 0.85, 1.25, 1.75, 2.25, 2.75, 3.25,
  3.75, 4.25, 4.75, 5.25, 5.75, 6.25, 6.75, 7.25, 7.75, 8.25, 8.75,
  9.25, 9.75, 10.25, 10.75, 11.25, 11.75, 12.25, 12.75, 13.25, 13.75,
  14.25, 14.75, 15.25, 15.75, 16.25, 16.75, 17.25, 17.75, 18.25,
  18.75, 19.25, 19.75, 20.25, 20.75, 21.25, 21.75, 22.25, 22.75,
  23.25, 23.75, 24.25, 24.75, 25.25, 25.75, 26.25, 26.75, 27.25,
  27.75, 28.25, 28.75, 29.25, 29.75, 29.75,
];

export const LINDUNG_TABLE = [
  0, 0.15, 0.30, 0.45, 0.65, 0.90, 1.30, 1.90, 2.65, 3.40, 4.15, 4.90,
  5.65, 6.40, 7.15, 7.90, 8.65, 9.40, 10.15, 10.90, 11.65, 12.40,
  13.15, 13.90, 14.65, 15.40, 16.15, 16.90, 17.65, 18.40, 19.15,
  19.90, 20.65, 21.40, 22.15, 22.90, 23.65, 24.40, 25.15, 25.90,
  26.65, 27.40, 28.15, 28.90, 29.65, 30.40, 31.15, 31.90, 32.65,
  33.40, 34.15, 34.90, 35.65, 36.40, 37.15, 37.90, 38.65, 39.40,
  40.15, 40.90, 41.65, 42.40, 43.15, 43.90, 44.65, 44.65,
];

export function getSocsoRates(
  salary: number,
  age: string = "below60",
  nationality: string = "malaysian"
): SocsoResult {
  if (!salary || salary <= 0) {
    return { er: 0, ee: 0, total: 0, er_only: 0, bracket: 0 };
  }
  const capped = Math.min(salary, 6000);
  let bracketIndex = 0;

  if (capped <= 30) bracketIndex = 1;
  else if (capped <= 50) bracketIndex = 2;
  else if (capped <= 70) bracketIndex = 3;
  else if (capped <= 100) bracketIndex = 4;
  else if (capped <= 140) bracketIndex = 5;
  else if (capped <= 200) bracketIndex = 6;
  else if (salary >= 6000) bracketIndex = salary > 6000 ? 65 : 64;
  else {
    bracketIndex = Math.floor((capped - 200.01) / 100) + 7;
  }

  const bracket_er_act4 = ER_ACT4_TABLE[bracketIndex] || 0;
  const bracket_er_only = ER_ONLY_TABLE[bracketIndex] || 0;
  const bracket_ee = EE_TABLE[bracketIndex] || 0;

  if (age === "above60" || nationality === "foreigner") {
    return {
      er: bracket_er_only,
      ee: 0,
      total: bracket_er_only,
      er_only: bracket_er_only,
      bracket: bracketIndex,
    };
  }

  return {
    er: bracket_er_act4,
    ee: bracket_ee,
    total: Number((bracket_er_act4 + bracket_ee).toFixed(2)),
    er_only: bracket_er_only,
    bracket: bracketIndex,
  };
}

export function getLindung24JamRate(salary: number): number {
  if (!salary || salary <= 0) return 0;
  const capped = Math.min(salary, 6000);
  let bracketIndex = 0;

  if (capped <= 30) bracketIndex = 1;
  else if (capped <= 50) bracketIndex = 2;
  else if (capped <= 70) bracketIndex = 3;
  else if (capped <= 100) bracketIndex = 4;
  else if (capped <= 140) bracketIndex = 5;
  else if (capped <= 200) bracketIndex = 6;
  else if (salary >= 6000) bracketIndex = salary > 6000 ? 65 : 64;
  else {
    bracketIndex = Math.floor((capped - 200.01) / 100) + 7;
  }

  return LINDUNG_TABLE[bracketIndex] !== undefined
    ? LINDUNG_TABLE[bracketIndex]
    : Number((capped * 0.0075).toFixed(2));
}
