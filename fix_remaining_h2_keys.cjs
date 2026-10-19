const fs = require('fs');
const cheerio = require('cheerio');

const msJson = JSON.parse(fs.readFileSync('locales/ms.json', 'utf8'));

const files = [
  'overtime-pay-calculator.html',
  'hourly-rate.html',
  'pcb-income-tax.html',
  'socso-perkeso.html',
  'epf-kwsp.html',
  'mincal.html',
  'payslip.html'
];

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const $ = cheerio.load(html);
  $('h1, h2, h3, h4, th, td, summary, p, label').each((_, el) => {
    const key = $(el).attr('data-i18n');
    const text = $(el).text().trim();
    if (!key) return;

    // Overtime fixes
    if (key.includes('who_is_eligible_for_overtime')) msJson[key] = "Siapa Yang Layak Menerima Bayaran Overtime (OT)?";
    if (key.includes('how_to_calculate_overtime')) msJson[key] = "Cara Mengira Bayaran Kerja Lebih Masa";
    if (key.includes('factors_that_affect_overtime')) msJson[key] = "Faktor Yang Mempengaruhi Bayaran Overtime";
    if (key.includes('overtime_calculation_example')) msJson[key] = "Contoh Pengiraan Bayaran Overtime";
    if (key.includes('understanding_overtime')) msJson[key] = "Memahami Bayaran Kerja Lebih Masa (OT) di Malaysia";

    // Hourly Rate fixes
    if (key.includes('how_to_calculate_hourly')) msJson[key] = "Cara Mengira Kadar Gaji Sejam";
    if (key.includes('monthly_salary_to_hourly')) msJson[key] = "Jadual Penukaran Gaji Bulanan Kepada Kadar Gaji Sejam";
    if (key.includes('factors_that_affect_hourly')) msJson[key] = "Faktor Yang Mempengaruhi Kadar Gaji Sejam";
    if (key.includes('average_hourly_rates')) msJson[key] = "Purata Kadar Gaji Sejam di Malaysia Mengikut Industri";
    if (key.includes('minimum_wage_hourly')) msJson[key] = "Gaji Minimum & Kadar Bayaran Sejam di Malaysia";
    if (key.includes('tips_for_part_time')) msJson[key] = "Panduan Untuk Pekerja Separuh Masa, Freelancer & Pelatih";

    // PCB fixes
    if (key.includes('who_needs_to_pay_pcb')) msJson[key] = "Siapa Yang Perlu Membayar PCB & Pendapatan Bercukai";
    if (key.includes('pcb_tax_rate_malaysia')) msJson[key] = "Jadual Kadar Cukai Pendapatan LHDN Malaysia 2026";
    if (key.includes('how_pcb_is_calculated')) msJson[key] = "Langkah Demi Langkah Pengiraan PCB LHDN";
    if (key.includes('pcb_calculation_result')) msJson[key] = "Keputusan Pengiraan PCB";

    // SOCSO fixes
    if (key.includes('how_socso_contribution')) msJson[key] = "Bagaimana Caruman SOCSO Berfungsi";
    if (key.includes('the_10_types_of_socso')) msJson[key] = "10 Jenis Tuntutan Faedah PERKESO di Malaysia";
    if (key.includes('socso_eis_salary_ceiling')) msJson[key] = "Kemas Kini Had Siling Gaji PERKESO & SIP (RM6,000)";
    if (key.includes('socso_contribution_table')) msJson[key] = "Jadual Caruman PERKESO & EIS Terkini 2026";
    if (key.includes('payment_methods')) msJson[key] = "Kaedah Pembayaran Caruman";

    // EPF fixes
    if (key.includes('epf_contribution_table')) msJson[key] = "Jadual Caruman KWSP 2026 (Kadar 11% / 12% / 13%)";
    if (key.includes('epf_calculation_result')) msJson[key] = "Keputusan Pengiraan EPF";
  });
}

fs.writeFileSync('locales/ms.json', JSON.stringify(msJson, null, 2), 'utf8');
console.log('Fixed remaining H2 keys successfully!');
