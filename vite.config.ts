import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    appType: 'mpa',
    server: {
      host: '0.0.0.0',
      port: 3000,
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          admin: path.resolve(__dirname, 'admin.html'),
          mincal: path.resolve(__dirname, 'mincal.html'),
          payslip: path.resolve(__dirname, 'payslip.html'),
          report: path.resolve(__dirname, 'report.html'),
          socsoreport: path.resolve(__dirname, 'socsoreport.html'),
          socsoPage: path.resolve(__dirname, 'socso-perkeso/index.html'),
        }
      }
    }
  };
});
