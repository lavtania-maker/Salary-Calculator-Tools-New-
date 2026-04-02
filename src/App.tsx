import React, { useState, useMemo, useEffect } from 'react';
import { 
  Calculator, 
  Wallet, 
  TrendingDown, 
  PieChart, 
  Info, 
  ChevronRight,
  Download,
  Share2,
  RefreshCw
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from './lib/utils';

// --- Constants & Logic ---

function calculateSOCSO(salary: number) {
  if (salary <= 30) return 0.4;
  if (salary <= 50) return 0.7;
  if (salary <= 70) return 1.1;
  if (salary <= 100) return 1.5;
  if (salary <= 140) return 2.1;
  if (salary <= 200) return 3.0;
  if (salary <= 300) return 4.3;
  if (salary <= 400) return 6.0;
  if (salary <= 500) return 8.5;
  if (salary <= 600) return 12.3;
  if (salary <= 700) return 17.0;
  if (salary <= 800) return 23.6;
  if (salary <= 900) return 30.8;
  if (salary <= 1000) return 39.0;
  return 0;
}

function calculateTaxBracket(ci: number) {
  if (ci <= 5000) return 0;
  if (ci <= 20000) return (ci - 5000) * 0.01;
  if (ci <= 35000) return 150 + (ci - 20000) * 0.03;
  if (ci <= 50000) return 600 + (ci - 35000) * 0.06;
  if (ci <= 70000) return 1500 + (ci - 50000) * 0.11;
  if (ci <= 100000) return 3700 + (ci - 70000) * 0.19;
  if (ci <= 400000) return 9400 + (ci - 100000) * 0.25;
  if (ci <= 600000) return 84400 + (ci - 400000) * 0.26;
  if (ci <= 2000000) return 136400 + (ci - 600000) * 0.28;
  return 528400 + (ci - 2000000) * 0.30;
}

function parseTaxCategory(category: string) {
  const cat = category.toLowerCase();
  const isSingle = cat.includes("single");
  const spouseWorking = cat.includes("spouse working");
  
  let children = 0;
  // Matches "1 child", "2 children", etc.
  const match = cat.match(/(\d+)\s*child/);
  if (match) {
    children = parseInt(match[1], 10);
  }
  
  return { isSingle, spouseWorking, children };
}

function calculateSalary({
  grossMonthlySalary,
  bonus = 0,
  taxCategory = "single",
  nationality = "malaysian",
  enableEPF = true,
  enableSOCSO = true,
  enableEIS = true,
  enablePCB = true
}: {
  grossMonthlySalary: number;
  bonus?: number;
  taxCategory?: string;
  nationality?: string;
  enableEPF?: boolean;
  enableSOCSO?: boolean;
  enableEIS?: boolean;
  enablePCB?: boolean;
}) {
  const totalIncome = grossMonthlySalary + bonus;
  const isMalaysian = nationality === "malaysian";

  // Contributions
  const epf = (enableEPF && isMalaysian) ? totalIncome * 0.11 : 0;
  const socso = enableSOCSO ? calculateSOCSO(totalIncome) : 0;
  const eis = enableEIS ? Math.min(totalIncome * 0.002, 5000) : 0;

  let pcb = 0;
  let totalRelief = 0;

  if (enablePCB) {
    const taxData = parseTaxCategory(taxCategory);

    // Reliefs
    const personalRelief = 9000;
    const spouseRelief = (!taxData.isSingle && !taxData.spouseWorking) ? 4000 : 0;
    const childrenRelief = taxData.children * 2000;
    
    totalRelief = personalRelief + spouseRelief + childrenRelief;

    // Annual calculations
    const annualIncome = totalIncome * 12;
    const epfAnnual = Math.min(epf * 12, 4000);

    // Chargeable income
    let chargeableIncome = Math.max(0, annualIncome - epfAnnual - totalRelief);

    // Tax calculation
    const annualTax = calculateTaxBracket(chargeableIncome);
    pcb = annualTax / 12;
  }

  // Net Salary
  const netSalary = totalIncome - epf - socso - eis - pcb;

  // Rounding
  function round(num: number) {
    return Number(num.toFixed(2));
  }

  return {
    grossMonthlySalary: round(grossMonthlySalary),
    bonus: round(bonus),
    totalIncome: round(totalIncome),
    epf: round(epf),
    socso: round(socso),
    eis: round(eis),
    pcb: round(pcb),
    netSalary: round(netSalary),
    totalRelief: round(totalRelief)
  };
}

export default function App() {
  const [grossSalary, setGrossSalary] = useState<number>(() => Number(localStorage.getItem('grossSalary')) || 5000);
  const [maritalStatus, setMaritalStatus] = useState<string>(() => localStorage.getItem('maritalStatus') || 'Single');
  const [nationality, setNationality] = useState<string>(() => localStorage.getItem('nationality') || 'malaysian');
  const [bonus, setBonus] = useState<number>(() => Number(localStorage.getItem('bonus')) || 0);
  const [includeEpf, setIncludeEpf] = useState<boolean>(() => localStorage.getItem('includeEpf') !== 'false');
  const [includeSocso, setIncludeSocso] = useState<boolean>(() => localStorage.getItem('includeSocso') !== 'false');
  const [includeEis, setIncludeEis] = useState<boolean>(() => localStorage.getItem('includeEis') !== 'false');
  const [includePcb, setIncludePcb] = useState<boolean>(() => localStorage.getItem('includePcb') !== 'false');
  const [email, setEmail] = useState<string>(() => localStorage.getItem('email') || '');

  useEffect(() => {
    localStorage.setItem('grossSalary', grossSalary.toString());
    localStorage.setItem('maritalStatus', maritalStatus);
    localStorage.setItem('nationality', nationality);
    localStorage.setItem('bonus', bonus.toString());
    localStorage.setItem('includeEpf', includeEpf.toString());
    localStorage.setItem('includeSocso', includeSocso.toString());
    localStorage.setItem('includeEis', includeEis.toString());
    localStorage.setItem('includePcb', includePcb.toString());
    localStorage.setItem('email', email);
  }, [grossSalary, maritalStatus, nationality, bonus, includeEpf, includeSocso, includeEis, includePcb, email]);

  const calculations = useMemo(() => {
    return calculateSalary({
      grossMonthlySalary: grossSalary,
      bonus,
      taxCategory: maritalStatus,
      nationality,
      enableEPF: includeEpf,
      enableSOCSO: includeSocso,
      enableEIS: includeEis,
      enablePCB: includePcb
    });
  }, [grossSalary, bonus, maritalStatus, nationality, includeEpf, includeSocso, includeEis, includePcb]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
    }).format(value);
  };

  const saveLead = async (downloadType: 'report' | 'payslip') => {
    if (!email) {
      alert('Please enter your email to download.');
      return;
    }

    const leadData = {
      email,
      salary: grossSalary,
      bonus,
      taxCategory: maritalStatus,
      calculatedPCB: calculations.pcb,
      downloadType: downloadType,
      timestamp: new Date().toISOString()
    };

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });
      alert(`Downloading ${downloadType}...`);
    } catch (error) {
      console.error('Error saving lead:', error);
      alert('Failed to save lead. Please try again.');
    }
  };

  const incomeGroup = useMemo(() => {
    const totalMonthlyIncome = calculations.totalIncome;
    if (totalMonthlyIncome <= 4850) return 'B40';
    if (totalMonthlyIncome <= 10970) return 'M40';
    return 'T20';
  }, [calculations.totalIncome]);

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] font-sans selection:bg-blue-100">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="font-bold text-2xl text-blue-600 tracking-tighter">GajiMY</span>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
              <a href="#" className="hover:text-blue-600 transition-colors">Salary Tool</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Templates</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-blue-600">Login</a>
            <a href="https://www.ajobthing.com/register?utm_source=salarycalculator&utm_medium=seo_tools&utm_campaign=salary_calculator" className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm">
              Post Job
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center text-center mb-16 px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tighter">
            Salary Calculator Malaysia (Take Home Pay)
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Calculate your net salary after EPF, SOCSO & statutory deductions instantly with our free tool.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column: Form */}
          <section className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100">
            <h2 className="font-bold text-2xl text-gray-900 mb-8 tracking-tight">Enter Salary Details</h2>
            <div className="space-y-8">
              {/* ... form fields ... */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Monthly Gross Salary (RM)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">RM</span>
                  <input 
                    type="number" 
                    value={grossSalary}
                    onChange={(e) => setGrossSalary(Number(e.target.value))}
                    className="w-full bg-white border border-gray-200 rounded-lg py-3.5 pl-14 pr-4 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium text-lg text-gray-900"
                    placeholder="e.g. 5000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bonus / Allowance (RM)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">RM</span>
                  <input 
                    type="number" 
                    value={bonus || ''}
                    onChange={(e) => setBonus(Number(e.target.value))}
                    className="w-full bg-white border border-gray-200 rounded-lg py-3.5 pl-14 pr-4 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium text-lg text-gray-900"
                    placeholder="e.g. 1000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Marital Status
                </label>
                <select 
                    value={maritalStatus}
                    onChange={(e) => setMaritalStatus(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg py-3.5 px-4 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-lg text-gray-900 appearance-none cursor-pointer"
                  >
                    <option value="single">Single</option>
                    <option value="married_spouse_working_no_child">Married (Spouse Working, No Child)</option>
                    <option value="married_spouse_not_working_no_child">Married (Spouse NOT Working, No Child)</option>
                    <option value="married_1_child_spouse_working">Married + 1 Child (Spouse Working)</option>
                    <option value="married_1_child_spouse_not_working">Married + 1 Child (Spouse NOT Working)</option>
                    <option value="married_2_children_spouse_working">Married + 2 Children (Spouse Working)</option>
                    <option value="married_2_children_spouse_not_working">Married + 2 Children (Spouse NOT Working)</option>
                  </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nationality
                </label>
                <select 
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-lg py-3.5 px-4 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-lg text-gray-900 appearance-none cursor-pointer"
                >
                  <option value="malaysian">Malaysian</option>
                  <option value="foreigner">Foreigner</option>
                </select>
              </div>
            </div>
          </section>

          {/* Right Column: Results */}
          <section className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100">
            <h2 className="font-bold text-2xl text-gray-900 mb-8 tracking-tight">Calculation Results</h2>
            <div className="space-y-8">
              <div className="mb-10">
                <motion.div 
                  key={calculations.netSalary}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl md:text-6xl font-black tracking-tighter text-gray-900"
                >
                  {formatCurrency(calculations.netSalary)}
                </motion.div>
                <p className="text-gray-400 text-sm mt-2 font-medium">Take-home pay after all statutory deductions</p>
              </div>

              <div className="mb-10 p-5 bg-blue-50/50 border border-blue-100/50 rounded-3xl">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest">Your Income Group</h3>
                  <motion.span 
                    key={incomeGroup}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-black tracking-tight",
                      incomeGroup === 'B40' ? "bg-blue-100 text-blue-700" :
                      incomeGroup === 'M40' ? "bg-indigo-100 text-indigo-700" :
                      "bg-purple-100 text-purple-700"
                    )}
                  >
                    {incomeGroup}
                  </motion.span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  With your total monthly income, you’re in the <span className="font-bold text-gray-900">{incomeGroup}</span> income group in Malaysia.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Total Income</p>
                  <p className="font-bold text-gray-900">{formatCurrency(calculations.totalIncome)}</p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Total Deductions</p>
                  <p className="font-bold text-red-500">-{formatCurrency(calculations.epf + calculations.socso + calculations.eis + calculations.pcb)}</p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Tax Rate</p>
                  <p className="font-bold text-gray-900">{((calculations.epf + calculations.socso + calculations.eis + calculations.pcb) / calculations.totalIncome * 100).toFixed(1)}%</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-sm flex items-center gap-2 mb-4">
                  <TrendingDown className="text-red-500" size={18} />
                  Employee Deductions
                </h3>
                <div className="space-y-3">
                  <DeductionRow label="EPF" value={calculations.epf} color="bg-blue-500" total={calculations.totalIncome} />
                  <DeductionRow label="SOCSO" value={calculations.socso} color="bg-orange-500" total={calculations.totalIncome} />
                  <DeductionRow label="EIS" value={calculations.eis} color="bg-purple-500" total={calculations.totalIncome} />
                  <DeductionRow label="PCB (Tax)" value={calculations.pcb} color="bg-red-500" total={calculations.totalIncome} />
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="mt-16 bg-white rounded-2xl p-10 shadow-sm border border-gray-100">
          <h3 className="font-bold text-xl text-gray-900 mb-6">Get Your Report</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-grow bg-white border border-gray-200 rounded-lg py-3.5 px-4 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-gray-900"
            />
            <button 
              onClick={() => saveLead('report')}
              className="bg-blue-600 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-sm"
            >
              Download Salary Report
            </button>
            <button 
              onClick={() => saveLead('payslip')}
              className="bg-gray-900 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-gray-800 transition-all shadow-sm"
            >
              Download Payslip
            </button>
          </div>
        </section>

        <section className="mt-12 bg-white rounded-2xl p-10 shadow-sm border border-gray-100">
          <h3 className="font-bold text-xl text-gray-900 mb-6">Deadline Submission for Employers</h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            EPF (KWSP), SOCSO (PERKESO), and EIS contributions must be submitted on or before the 15th of the following month.
          </p>
          <ul className="list-disc list-inside space-y-3 text-gray-600">
            <li>Late payments may result in penalties</li>
            <li>Deadlines are subject to changes by the respective authorities</li>
          </ul>
        </section>

        {/* Official Government Salary Calculators Section */}
        <section className="mt-12 bg-white rounded-2xl p-10 shadow-sm border border-gray-100">
          <h3 className="font-bold text-xl text-gray-900 mb-6">Official Government Salary Calculators</h3>
          <p className="text-gray-600 mb-8">For official verification and precise statutory calculations, visit these government portals:</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <a 
              href="https://www.kwsp.gov.my/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center px-6 py-4 rounded-lg bg-white border border-gray-200 text-sm font-semibold text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-all"
            >
              EPF Official Website
            </a>
            <a 
              href="https://www.perkeso.gov.my/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center px-6 py-4 rounded-lg bg-white border border-gray-200 text-sm font-semibold text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-all"
            >
              SOCSO Official Website
            </a>
            <a 
              href="https://calc.hasil.gov.my/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center px-6 py-4 rounded-lg bg-white border border-gray-200 text-sm font-semibold text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-all"
            >
              LHDN PCB Calculator
            </a>
          </div>
        </section>
      </main>

      <footer className="max-w-7xl mx-auto px-6 py-16 border-t border-gray-100 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calculator size={28} className="text-blue-600" />
              <span className="font-bold text-2xl tracking-tighter">GajiMY</span>
            </div>
            <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
              Accurate Malaysia salary calculator. Instantly calculate take-home pay after <br /> EPF, SOCSO, EIS & PCB.
            </p>
          </div>
          
          <div className="md:pl-16">
            <h4 className="font-bold text-sm text-gray-900 mb-6 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Free Salary Templates</a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Blog</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-gray-500">
            &copy; 2026 GajiMY. Data is estimated for reference only.
          </p>
          <p className="text-xs text-gray-400 max-w-md text-center md:text-right">
            Disclaimer: This calculator provides estimates based on 2024 statutory rates. 
            Actual deductions may vary based on specific employer policies and LHDN rulings.
          </p>
        </div>
      </footer>
    </div>
  );
}

function DeductionRow({ label, value, percentage, color, total }: { 
  label: string, 
  value: number, 
  percentage?: number, 
  color: string,
  total: number
}) {
  const rowPercentage = (value / total) * 100;
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <div className={cn("w-1.5 h-1.5 rounded-full", color)} />
          <span className="text-sm font-semibold text-gray-700">{label}</span>
          {percentage && <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{percentage}%</span>}
        </div>
        <span className="text-sm font-bold text-gray-900">
          {new Intl.NumberFormat('en-MY', { style: 'currency', currency: 'MYR' }).format(value)}
        </span>
      </div>
      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(rowPercentage * 5, 100)}%` }}
          className={cn("h-full rounded-full", color)}
        />
      </div>
    </div>
  );
}

