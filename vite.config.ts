import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  return {
    plugins: [react(), tailwindcss()],
    define: {
      "process.env.GEMINI_API_KEY": JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
    appType: "custom",
    server: {
      hmr: false,
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, "index.html"),
          admin: path.resolve(__dirname, "admin.html"),
          mincal: path.resolve(__dirname, "mincal.html"),
          payslip: path.resolve(__dirname, "payslip.html"),
          report: path.resolve(__dirname, "report.html"),
          epfKwsp: path.resolve(__dirname, "epf-kwsp.html"),
          epfreport: path.resolve(__dirname, "epfreport.html"),
          socsoreport: path.resolve(__dirname, "socsoreport.html"),
          privacyPolicy: path.resolve(__dirname, "privacy-policy.html"),
          pcbCalculator: path.resolve(__dirname, "pcb-income-tax.html"),
          annualLeave: path.resolve(__dirname, "annual-leave-calculator.html"),
          socsoPerkeso: path.resolve(__dirname, "socso-perkeso.html"),
          blogPostTemplate: path.resolve(__dirname, "blog-post-template.html"),
          blog: path.resolve(__dirname, "blog.html"),
          blogAdmin: path.resolve(__dirname, "blog-admin.html"),
          blogSalary: path.resolve(__dirname, "blog/salary.html"),
          blogEpf: path.resolve(__dirname, "blog/epf.html"),
          blogSocso: path.resolve(__dirname, "blog/socso.html"),
          blogPerkeso: path.resolve(__dirname, "blog/perkeso.html"),
          blogPcbIncomeTax: path.resolve(__dirname, "blog/pcb-income-tax.html"),
          blogAnnualLeave: path.resolve(__dirname, "blog/annual-leave.html"),
          blogEpfContributionRates2026: path.resolve(__dirname, "blog/epf-contribution-rates-2026.html"),
        },
      },
    },
  };
});
