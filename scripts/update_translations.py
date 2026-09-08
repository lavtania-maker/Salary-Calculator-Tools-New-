import json
import re

with open("locales/ms.json", "r", encoding="utf-8") as f:
    ms = json.load(f)

# 1. Direct key fixes for bulanly
replacements_keys = {
    "bulanly_contributions_are_split_across_t_e188fc": "monthly_contributions_are_split_across_t_e188fc",
}

for old_k, new_k in replacements_keys.items():
    if old_k in ms:
        ms[new_k] = ms.pop(old_k)

# Also ensure table headers with monthly are present
key_sync = [
    ("bulanly_wages_rm_e9c407", "monthly_wages_rm_e9c407", "Gaji Bulanan (RM)"),
    ("bulanly_salary_64cc7b", "monthly_salary_64cc7b", "Gaji Bulanan"),
    ("gross_bulanly_salary_6b8dd4", "gross_monthly_salary_6b8dd4", "Gaji Kasar Bulanan"),
    ("bulanly_9030e3", "monthly_9030e3", "Bulanan"),
    ("bulanly_income_rm_bda29e", "monthly_income_rm_bda29e", "Pendapatan Bulanan (RM)"),
    ("075_of_bulanly_wages_aa90d1", "075_of_monthly_wages_aa90d1", "0.75% daripada gaji bulanan"),
    ("100_of_bulanly_wages_f20c17", "100_of_monthly_wages_f20c17", "1.00% daripada gaji bulanan"),
    ("125_of_bulanly_wages_d14ed5", "125_of_monthly_wages_d14ed5", "1.25% daripada gaji bulanan"),
    ("bulanly_basic_salary_d17df3", "monthly_basic_salary_d17df3", "Gaji Pokok Bulanan"),
    ("pcb_calculator_calculate_your_bulanly_ta_d9cda1", "pcb_calculator_calculate_your_monthly_ta_d9cda1", "Kira potongan cukai bulanan (PCB) pekerja & majikan.")
]

for old_k, new_k, default_val in key_sync:
    if old_k in ms:
        val = ms[old_k]
        val = val.replace("bulanly", "bulanan").replace("Bulanly", "Bulanan")
        ms[new_k] = val
    else:
        ms[new_k] = default_val

# Fix all values containing 'bulanly'
for k, v in list(ms.items()):
    if isinstance(v, str) and "bulanly" in v:
        # replace in blog url
        v = v.replace("how-to-calculate-pcb-bulanly-tax-deduction", "how-to-calculate-pcb-monthly-tax-deduction")
        # replace occurrences in text
        v = v.replace("bulanly OT cap", "had OT bulanan")
        v = v.replace("bulanly working days", "hari bekerja bulanan")
        v = v.replace("bulanly", "bulanan")
        v = v.replace("Bulanly", "Bulanan")
        ms[k] = v

# 2. Main Homepage Copywriting improvements (Clean, natural, casual, short)
ms["where_does_your_salary_go_82ca49"] = "Gaji Anda Pergi Ke Mana?"
ms["take_home_0_deductions_0_dfbbb9"] = '<span style="color: #15803d">Gaji Bersih (<span id="resPctNetCompact">0</span>%)</span>\n                        <span style="color: #1d4ed8">Potongan (<span id="resPctDedCompact">0</span>%)</span>'
ms["take_home_pay_fdb585"] = "Gaji Bersih"
ms["deductions_8cfb0c"] = "Potongan"

ms["monthly_take_home_94ed5e"] = "GAJI BERSIH BULANAN"
ms["annual_take_home_8a1288"] = "GAJI BERSIH TAHUNAN"
ms["estimated_amount_received_after_epf_soc_efb7ef"] = "Anggaran gaji bersih selepas potongan KWSP, SOCSO, EIS dan PCB."
ms["take_home_salary_36ba82"] = "Gaji Bersih"
ms["take_home_salary_c91f6d"] = "Gaji Bersih"
ms["take_home_pay_at_rm1700_d689f5"] = "Gaji Bersih pada RM1,700:"

# Placeholders & helper texts
ms["your_results_are_just_one_step_away_03998f"] = "Sedia untuk kira gaji anda"
ms["complete_the_form_to_continue_060777"] = "Masukkan maklumat gaji dan klik Kira"
ms["enter_salary_details_5fa624"] = "Butiran Gaji"
ms["gross_monthly_salary_2e964a"] = "Gaji Pokok / Kasar Bulanan"
ms["bonus__allowance_rm_1e37bc"] = "Bonus / Elaun (RM)"
ms["salary_option_bca7f7"] = "Pilihan Potongan Gaji"
ms["statutory_contributions_9f1437"] = "Caruman Berkanun"
ms["marital_status_9f4fa1"] = "Status Perkahwinan"
ms["number_of_children_under_18_years_old_fbb04c"] = "Bilangan Anak (Bawah 18 tahun)"
ms["age_group_d4ee48"] = "Kumpulan Umur"
ms["below_60_years_old_d7aa38"] = "Bawah 60 tahun"
ms["60_years_old_and_above_f15e7a"] = "60 tahun dan ke atas"

# Download / Share buttons
ms["download_salary_report_e25ffc"] = "Muat Turun Laporan Gaji"
ms["download_salary_payslip_ecb7c5"] = "Muat Turun Slip Gaji"
ms["share_your_progress_73a9eb"] = "Kongsi Keputusan"

# Income journey & Milestones
ms["estimated_individual_income_tier_07c570"] = "KUMPULAN PENDAPATAN ANDA"
ms["your_income_journey_c77395"] = "Laluan Pendapatan Anda"
ms["track_your_progress_towards_the_next_h_96d729"] = "Jejak sasaran pendapatan isi rumah (B40, M40, T20)."
ms["your_current_group_b70129"] = "Kumpulan Semasa"
ms["next_goal_m40_0bf5ad"] = "Sasaran: M40"
ms["next_goal_t20_209cb1"] = "Sasaran: T20"
ms["next_milestone_f269ba"] = "Sasaran Seterusnya"
ms["your_progress_7e81ea"] = "Kemajuan"

# Results breakdown labels
ms["gross_annual_salary_84ad70"] = "Gaji Kasar Tahunan"
ms["employee_deductions_df8d7e"] = "Potongan Pekerja"
ms["total_employee_deductions_7df8ae"] = "Jumlah Potongan Pekerja"
ms["employer_contributions_332f17"] = "Caruman Majikan"
ms["total_employer_contributions_950efd"] = "Jumlah Caruman Majikan"
ms["total_cost_to_employer_30bf42"] = "Jumlah Kos Majikan"

# EPF Results Card & Breakdown
ms["epf_calculator_malaysia_2026_2dcf57"] = "Kalkulator KWSP (EPF) Malaysia 2026"
ms["epf_results_9ca73e"] = "Keputusan KWSP"
ms["total_epf_contribution_429a17"] = "Jumlah Caruman KWSP"
ms["employee_contribution_f20bf8"] = "Bahagian Pekerja"
ms["employer_contribution_56eaae"] = "Bahagian Majikan"
ms["net_salary_after_epf_07ff90"] = "Gaji Bersih Selepas KWSP"
ms["breakdown__projections_72bf5e"] = "Pecahan & Unjuran Simpanan"
ms["employee_epf_6d0422"] = "KWSP Pekerja"
ms["employer_epf_28e348"] = "KWSP Majikan"
ms["total_epf_savings_e1d931"] = "Jumlah Simpanan KWSP"
ms["input_your_salary_to_get_instant_resul_61bcf7"] = "Masukkan gaji untuk melihat anggaran caruman"
ms["your_epf_contribution_will_appear_here_85d51d"] = "Jumlah caruman KWSP akan dipaparkan di sini"

# SOCSO Results Card & Breakdown
ms["socso__eis_calculator_malaysia_2026_c2c4ba"] = "Kalkulator SOCSO & EIS Malaysia 2026"
ms["total_socso__eis_contribution_6cf1ad"] = "Jumlah Caruman SOCSO & EIS"
ms["socso_employee_contribution_7fa003"] = "Caruman SOCSO Pekerja"
ms["socso_employer_contribution_f6f7fb"] = "Caruman SOCSO Majikan"
ms["perkeso_lindung_24_jam_502758"] = "Skim LINDUNG 24 Jam"
ms["annual_socso_employee_contribution_065ec5"] = "Caruman Tahunan Pekerja"
ms["annual_socso_employer_contribution_2b6c97"] = "Caruman Tahunan Majikan"
ms["socso_results_47a508"] = "Keputusan SOCSO"

# PCB Results Card & Breakdown
ms["pcb_monthly_tax_deduction_calculator_202_881091"] = "Kalkulator PCB Malaysia 2026"
ms["monthly_pcb_deduction_915941"] = "Potongan PCB Bulanan"
ms["chargeable_income_7a0b3f"] = "Pendapatan Bercukai"
ms["effective_tax_rate_56bb95"] = "Kadar Cukai Efektif"
ms["tax_bracket_f61b17"] = "Tangga Cukai"
ms["estimated_annual_tax_1a7e4b"] = "Anggaran Cukai Tahunan"
ms["annual_gross_income_e664bf"] = "Pendapatan Kasar Tahunan"
ms["total_annual_pcb_tax_deduction_2a433f"] = "Jumlah PCB Tahunan"

# Overtime Results Card & Breakdown
ms["overtime_pay_calculator_malaysia_2026_662d58"] = "Kalkulator Overtime (OT) Malaysia 2026"
ms["total_overtime_pay_8233f2"] = "Jumlah Bayaran Overtime (OT)"
ms["hourly_rate_hrp_e98583"] = "Kadar Sejam (HRP)"
ms["daily_rate_orp_ff6fc8"] = "Kadar Harian (ORP)"
ms["total_ot_hours_cf09a1"] = "Jumlah Jam OT"
ms["multiplier_applied_47f872"] = "Kadar Digunakan"
ms["statutory_eligibility_status_ea_1955_c70b8f"] = "Status Kelayakan"
ms["estimated_gross_pay_salary__ot_be2d31"] = "Anggaran Gaji Keseluruhan (Gaji + OT)"
ms["normal_working_days_15x_4048e4"] = "Hari Bekerja Biasa (1.5x)"
ms["rest_days_20x_d85b14"] = "Hari Rehat (2.0x)"
ms["public_holidays_30x_91f42d"] = "Cuti Umum (3.0x)"

# Annual Leave Results Card & Breakdown
ms["annual_leave_calculator_malaysia_2026_8c9913"] = "Kalkulator Cuti Tahunan Malaysia 2026"
ms["leave_results_8ef1df"] = "Keputusan Cuti Tahunan"
ms["years_of_service_221dbb"] = "Tempoh Perkhidmatan"
ms["total_annual_leave_entitlement_b77efd"] = "Kelayakan Cuti Tahunan"
ms["prorated_leave_entitlement_847e25"] = "Kelayakan Cuti Pro-rata"
ms["leave_taken_91ae6b"] = "Cuti Telah Diambil"
ms["remaining_leave_balance_e3f940"] = "Baki Cuti"
ms["suggested_hr_action_76bf74"] = "Status Cuti"

# Hourly Rate Results Card & Breakdown
ms["hourly_rate_calculator_malaysia_2026_9e4fd9"] = "Kalkulator Kadar Gaji Sejam 2026"
ms["hourly_rate_182103"] = "Kadar Gaji Sejam"
ms["daily_salary_22e703"] = "Kadar Gaji Harian"
ms["monthly_working_hours_150821"] = "Jam Bekerja Sebulan"
ms["monthly_gross_salary_b5e53e"] = "Gaji Kasar Bulanan"
ms["calculation_steps_44131d"] = "Langkah Pengiraan"

# Clean other-calc-cards to natural BM
cards_html = """
      <a href="/" class="other-calc-card hover-lift" style="padding: 24px; border: 1px solid #fde68a; border-radius: 12px; background: #fffbeb; text-decoration: none; box-shadow: 0 2px 4px -1px rgba(0,0,0,0.05); transition: transform 0.2s, box-shadow 0.2s; display: block;" onmouseover="this.style.transform = 'translateY(-2px)'; this.style.boxShadow = '0 6px 10px -3px rgba(0, 0, 0, 0.1)';" onmouseout="this.style.transform = 'translateY(0)'; this.style.boxShadow = '0 2px 4px -1px rgba(0, 0, 0, 0.05)';">
        <div style="background: #fef3c7; width: 48px; height: 48px; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path><circle cx="14" cy="9" r="1"></circle></svg>
        </div>
        <h3 style="color: #d97706; font-size: 1.125rem; font-weight: 700; margin-bottom: 8px;">Kalkulator Gaji</h3>
        <p style="color: #64748b; font-size: 15px; line-height: 1.6; margin: 0;">Kira gaji bersih selepas potongan KWSP, SOCSO, EIS dan PCB.</p>
      </a>
      <a href="/socso-perkeso" class="other-calc-card hover-lift" style="padding: 24px; border: 1px solid #bbf7d0; border-radius: 12px; background: #f0fdf4; text-decoration: none; box-shadow: 0 2px 4px -1px rgba(0,0,0,0.05); transition: transform 0.2s, box-shadow 0.2s; display: block;" onmouseover="this.style.transform = 'translateY(-2px)'; this.style.boxShadow = '0 6px 10px -3px rgba(0, 0, 0, 0.1)';" onmouseout="this.style.transform = 'translateY(0)'; this.style.boxShadow = '0 2px 4px -1px rgba(0, 0, 0, 0.05)';">
        <div style="background: #dcfce7; width: 48px; height: 48px; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#166534" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
        </div>
        <h3 style="color: #166534; font-size: 1.125rem; font-weight: 700; margin-bottom: 8px;">Kalkulator SOCSO</h3>
        <p style="color: #64748b; font-size: 15px; line-height: 1.6; margin: 0;">Semak kadar caruman PERKESO &amp; SIP pekerja dan majikan.</p>
      </a>
      <a href="/pcb-calculator" class="other-calc-card hover-lift" style="padding: 24px; border: 1px solid #bae6fd; border-radius: 12px; background: #f0f9ff; text-decoration: none; box-shadow: 0 2px 4px -1px rgba(0,0,0,0.05); transition: transform 0.2s, box-shadow 0.2s; display: block;" onmouseover="this.style.transform = 'translateY(-2px)'; this.style.boxShadow = '0 6px 10px -3px rgba(0, 0, 0, 0.1)';" onmouseout="this.style.transform = 'translateY(0)'; this.style.boxShadow = '0 2px 4px -1px rgba(0, 0, 0, 0.05)';">
        <div style="background: #e0f2fe; width: 48px; height: 48px; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#075985" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z"></path><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path><path d="M12 17.5V6.5"></path></svg>
        </div>
        <h3 style="color: #075985; font-size: 1.125rem; font-weight: 700; margin-bottom: 8px;">Kalkulator PCB</h3>
        <p style="color: #64748b; font-size: 15px; line-height: 1.6; margin: 0;">Kira potongan cukai bulanan (PCB) pekerja dan majikan.</p>
      </a>
      <a href="/epf-kwsp" class="other-calc-card hover-lift" style="padding: 24px; border: 1px solid #fecaca; border-radius: 12px; background: #fef2f2; text-decoration: none; box-shadow: 0 2px 4px -1px rgba(0,0,0,0.05); transition: transform 0.2s, box-shadow 0.2s; display: block;" onmouseover="this.style.transform = 'translateY(-2px)'; this.style.boxShadow = '0 6px 10px -3px rgba(0, 0, 0, 0.1)';" onmouseout="this.style.transform = 'translateY(0)'; this.style.boxShadow = '0 2px 4px -1px rgba(0, 0, 0, 0.05)';">
        <div style="background: #fee2e2; width: 48px; height: 48px; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#991b1b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"></path><path d="M3 7v1a3 3 0 0 0 6 0V7m6 0v1a3 3 0 0 0 6 0V7M9 7h6"></path><path d="M5 21V10.85M19 21V10.85M9 21V14M15 21V14"></path><path d="M10.22 2.72a2 2 0 0 1 3.56 0L15 5H9l1.22-2.28Z"></path></svg>
        </div>
        <h3 style="color: #991b1b; font-size: 1.125rem; font-weight: 700; margin-bottom: 8px;">Kalkulator KWSP</h3>
        <p style="color: #64748b; font-size: 15px; line-height: 1.6; margin: 0;">Kira caruman KWSP pekerja &amp; majikan serta simpanan persaraan.</p>
      </a>
      <a href="/annual-leave-calculator" class="other-calc-card hover-lift" style="padding: 24px; border: 1px solid #e9d5ff; border-radius: 12px; background: #faf5ff; text-decoration: none; box-shadow: 0 2px 4px -1px rgba(0,0,0,0.05); transition: transform 0.2s, box-shadow 0.2s; display: block;" onmouseover="this.style.transform = 'translateY(-2px)'; this.style.boxShadow = '0 6px 10px -3px rgba(0, 0, 0, 0.1)';" onmouseout="this.style.transform = 'translateY(0)'; this.style.boxShadow = '0 2px 4px -1px rgba(0, 0, 0, 0.05)';">
        <div style="background: #ede9fe; width: 48px; height: 48px; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5b21b6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path><path d="M8 18h.01"></path><path d="M12 18h.01"></path><path d="M16 18h.01"></path></svg>
        </div>
        <h3 style="color: #5b21b6; font-size: 1.125rem; font-weight: 700; margin-bottom: 8px;">Kalkulator Cuti Tahunan</h3>
        <p style="color: #64748b; font-size: 15px; line-height: 1.6; margin: 0;">Kira kelayakan cuti tahunan dan baki cuti pro-rata dengan tepat.</p>
      </a>
      <a href="/overtime-pay-calculator" class="other-calc-card hover-lift" style="padding: 24px; border: 1px solid #fde68a; border-radius: 12px; background: #fffbeb; text-decoration: none; box-shadow: 0 2px 4px -1px rgba(0,0,0,0.05); transition: transform 0.2s, box-shadow 0.2s; display: block;" onmouseover="this.style.transform = 'translateY(-2px)'; this.style.boxShadow = '0 6px 10px -3px rgba(0, 0, 0, 0.1)';" onmouseout="this.style.transform = 'translateY(0)'; this.style.boxShadow = '0 2px 4px -1px rgba(0, 0, 0, 0.05)';">
        <div style="background: #fef3c7; width: 48px; height: 48px; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b45309" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        </div>
        <h3 style="color: #b45309; font-size: 1.125rem; font-weight: 700; margin-bottom: 8px;">Kalkulator Overtime</h3>
        <p style="color: #64748b; font-size: 15px; line-height: 1.6; margin: 0;">Kira bayaran kerja lebih masa (OT) mengikut Akta Kerja 1955.</p>
      </a>
""".strip()

for k in ["socso_calculator_check_employee_and_empl_aea3ef", "salary_calculator_calculate_your_exact_t_cbec65", "salary_calculator_calculate_your_exact_t_098bb5", "salary_calculator_calculate_your_exact_t_d33b71", "salary_calculator_calculate_your_exact_t_80acd8", "salary_calculator_calculate_your_exact_t_706a31", "salary_calculator_calculate_your_exact_t_236a65"]:
    if k in ms:
        ms[k] = cards_html

with open("locales/ms.json", "w", encoding="utf-8") as f:
    json.dump(ms, f, indent=2, ensure_ascii=False)

print("Updated locales/ms.json successfully.")
