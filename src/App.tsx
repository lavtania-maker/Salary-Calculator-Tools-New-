import React, { useState, useMemo } from 'react';
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

function calculateSalary({
  grossMonthlySalary,
  bonus = 0,
  maritalStatus = "single",
  nationality = "malaysian",
  enableEPF = true,
  enableSOCSO = true,
  enableEIS = true,
  enablePCB = true
}: {
  grossMonthlySalary: number;
  bonus?: number;
  maritalStatus?: string;
  nationality?: string;
  enableEPF?: boolean;
  enableSOCSO?: boolean;
  enableEIS?: boolean;
  enablePCB?: boolean;
}) {

  // 1. TOTAL INCOME
  const totalIncome = grossMonthlySalary + bonus;

  // 2. EPF
  let epf = 0;
  if (enableEPF && nationality === "malaysian") {
    epf = totalIncome * 0.11;
  }

  // 3. SOCSO (simplified table)
  function getSocso(salary: number) {
    if (salary <= 1000) return 5.25;
    if (salary <= 2000) return 9.75;
    if (salary <= 3000) return 14.75;
    if (salary <= 4000) return 19.75;
    if (salary <= 5000) return 24.75;
    return 24.75;
  }

  let socso = enableSOCSO ? getSocso(totalIncome) : 0;

  // 4. EIS
  let eis = 0;
  if (enableEIS) {
    const cappedSalary = Math.min(totalIncome, 5000);
    eis = cappedSalary * 0.002;
  }

  // 5. PCB (Tax)
  let pcb = 0;

  if (enablePCB) {
    let annualIncome = totalIncome * 12;

    // EPF relief capped at RM4000/year
    const epfAnnual = Math.min(epf * 12, 4000);

    let chargeableIncome = annualIncome - epfAnnual;

    // marital relief
    if (maritalStatus === "married") {
      chargeableIncome -= 4000;
    }

    function calculateTax(income: number) {
      if (income <= 5000) return 0;
      if (income <= 20000) return (income - 5000) * 0.01;
      if (income <= 35000) return 150 + (income - 20000) * 0.03;
      if (income <= 50000) return 600 + (income - 35000) * 0.08;
      if (income <= 70000) return 1800 + (income - 50000) * 0.14;
      if (income <= 100000) return 4600 + (income - 70000) * 0.21;
      return 10900 + (income - 100000) * 0.24;
    }

    const annualTax = calculateTax(Math.max(chargeableIncome, 0));
    pcb = annualTax / 12;
  }

  // 6. NET SALARY
  const netSalary = totalIncome - epf - socso - eis - pcb;

  // 7. ROUNDING
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
    netSalary: round(netSalary)
  };
}

export default function App() {
  const [grossSalary, setGrossSalary] = useState<number>(5000);
  const [maritalStatus, setMaritalStatus] = useState<string>('single');
  const [nationality, setNationality] = useState<string>('malaysian');
  const [bonus, setBonus] = useState<number>(0);
  const [includeEpf, setIncludeEpf] = useState<boolean>(true);
  const [includeSocso, setIncludeSocso] = useState<boolean>(true);
  const [includeEis, setIncludeEis] = useState<boolean>(true);
  const [includePcb, setIncludePcb] = useState<boolean>(true);

  const calculations = useMemo(() => {
    return calculateSalary({
      grossMonthlySalary: grossSalary,
      bonus,
      maritalStatus,
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

  const incomeGroup = useMemo(() => {
    const totalMonthlyIncome = calculations.totalIncome;
    if (totalMonthlyIncome <= 4850) return 'B40';
    if (totalMonthlyIncome <= 10970) return 'M40';
    return 'T20';
  }, [calculations.totalIncome]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans selection:bg-blue-100">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="https://www.ajobthing.com/resources/blog/data/blog/images/2026/03/ChatGPT%20Image%20Mar%2030,%202026,%2005_03_47%20PM.jpg?v=1"
              alt="Logo"
              className="h-9 w-auto"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex items-center gap-6">
            <a 
              href="#" 
              className="hidden sm:flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
            >
              Free Salary Templates
            </a>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                <Share2 size={20} />
              </button>
              <button className="hidden sm:flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-all shadow-sm">
                <Download size={16} />
                Export PDF
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-6">
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-xl flex items-center gap-2">
                  <Wallet className="text-blue-600" size={20} />
                  Income Details
                </h2>
                <button 
                  onClick={() => {
                    setGrossSalary(5000);
                    setMaritalStatus('single');
                    setNationality('malaysian');
                    setBonus(0);
                    setIncludeEpf(true);
                    setIncludeSocso(true);
                    setIncludeEis(true);
                    setIncludePcb(true);
                  }}
                  className="text-xs text-gray-400 hover:text-blue-600 flex items-center gap-1 transition-colors"
                >
                  <RefreshCw size={12} />
                  Reset
                </button>
              </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">
                      Monthly Gross Salary (RM)
                    </label>
                    <p className="text-[10px] text-red-500 font-bold mb-2">*Required</p>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">RM</span>
                      <input 
                        type="number" 
                        value={grossSalary}
                        onChange={(e) => setGrossSalary(Number(e.target.value))}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium text-lg"
                        placeholder="e.g. 5000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">
                      Bonus / Allowance (RM)
                    </label>
                    <p className="text-[10px] text-gray-400 mb-2">(Optional)</p>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">RM</span>
                      <input 
                        type="number" 
                        value={bonus || ''}
                        onChange={(e) => setBonus(Number(e.target.value))}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pl-9 pr-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:border-blue-300 transition-all" onClick={() => setIncludeEpf(!includeEpf)}>
                      <input 
                        type="checkbox" 
                        checked={includeEpf}
                        onChange={() => setIncludeEpf(!includeEpf)}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-xs font-bold text-gray-700">EPF</span>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:border-blue-300 transition-all" onClick={() => setIncludeSocso(!includeSocso)}>
                      <input 
                        type="checkbox" 
                        checked={includeSocso}
                        onChange={() => setIncludeSocso(!includeSocso)}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-xs font-bold text-gray-700">SOCSO</span>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:border-blue-300 transition-all" onClick={() => setIncludeEis(!includeEis)}>
                      <input 
                        type="checkbox" 
                        checked={includeEis}
                        onChange={() => setIncludeEis(!includeEis)}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-xs font-bold text-gray-700">EIS</span>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:border-blue-300 transition-all" onClick={() => setIncludePcb(!includePcb)}>
                      <input 
                        type="checkbox" 
                        checked={includePcb}
                        onChange={() => setIncludePcb(!includePcb)}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-xs font-bold text-gray-700">PCB (Tax)</span>
                    </div>
                  </div>

                <div className="pt-4 border-t border-gray-100">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Tax Relief Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1">
                        Nationality
                      </label>
                      <select 
                        value={nationality}
                        onChange={(e) => setNationality(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm appearance-none cursor-pointer"
                      >
                        <option value="malaysian">Malaysian</option>
                        <option value="non-malaysian">Non-Malaysian</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1">
                        Marital Status
                      </label>
                      <select 
                        value={maritalStatus}
                        onChange={(e) => setMaritalStatus(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm appearance-none cursor-pointer"
                      >
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
                  <Info size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-blue-900 text-sm mb-1">Did you know?</h4>
                  <p className="text-blue-800/70 text-xs leading-relaxed">
                    The 2024 budget reduced income tax rates for the RM35,000 to RM100,000 taxable income range by 2%.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 opacity-50" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-bold text-gray-400 uppercase tracking-widest text-xs">Monthly Net Salary</h2>
                  <div className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter">
                    Estimated
                  </div>
                </div>

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
                  <p className="text-[10px] text-gray-400 mt-3 italic leading-tight">
                    * This is just an estimate based on individual salary. Actual group depends on total household income.
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

                  <div className="space-y-8">
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
                  
                    <p className="text-[10px] text-gray-400 text-center italic">Estimated values for reference</p>
                  </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute bottom-0 right-0 opacity-10">
                <PieChart size={200} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg">Annual Projection</h3>
                  <div className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    12 Months
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <p className="text-gray-400 text-xs uppercase font-bold mb-1">Annual Net Income</p>
                    <p className="text-3xl font-black tracking-tight">{formatCurrency(calculations.netSalary * 12)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase font-bold mb-1">Total Annual Tax</p>
                    <p className="text-3xl font-black tracking-tight text-red-400">{formatCurrency(calculations.pcb * 12)}</p>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-gray-900 bg-gray-700 flex items-center justify-center text-[10px] font-bold">
                          {i === 1 ? 'KWSP' : i === 2 ? 'PER' : 'LHDN'}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400">Statutory contributions included</p>
                  </div>
                  <button className="text-xs font-bold flex items-center gap-1 hover:text-blue-400 transition-colors">
                    View Full Table
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deadline Submission Section */}
        <section className="mt-12 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg text-gray-900 mb-4">Deadline Submission for Employers</h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            EPF (KWSP), SOCSO (PERKESO), and EIS contributions must be submitted on or before the 15th of the following month.
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-500">
            <li>Late payments may result in penalties</li>
            <li>Deadlines are subject to changes by the respective authorities</li>
          </ul>
        </section>

        {/* Official Government Salary Calculators Section */}
        <section className="mt-8 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg text-gray-900 mb-4">Official Government Salary Calculators</h3>
          <p className="text-sm text-gray-500 mb-6">For official verification and precise statutory calculations, visit these government portals:</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a 
              href="https://www.kwsp.gov.my/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-bold text-gray-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all"
            >
              EPF Official Website
            </a>
            <a 
              href="https://www.perkeso.gov.my/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-bold text-gray-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all"
            >
              SOCSO Official Website
            </a>
            <a 
              href="https://calc.hasil.gov.my/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-bold text-gray-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all"
            >
              LHDN PCB Calculator
            </a>
          </div>
        </section>
      </main>

      <footer className="max-w-7xl mx-auto px-4 py-12 border-t border-gray-200 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calculator size={24} className="text-blue-600" />
              <span className="font-bold text-xl tracking-tight">GajiMY</span>
            </div>
            <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
              Accurate Malaysia salary calculator. Instantly calculate take-home pay after <br /> EPF, SOCSO, EIS & PCB.
            </p>
          </div>
          
          <div className="md:pl-12">
            <h4 className="font-bold text-base text-gray-900 mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Free Salary Templates</a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Blog</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            &copy; 2026 GajiMY. Data is estimated for reference only.
          </p>
          <p className="text-[10px] text-gray-300 max-w-md text-center md:text-right">
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

