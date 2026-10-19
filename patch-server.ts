import fs from 'fs';

const content = fs.readFileSync('server.ts', 'utf8');

const replacement = `    // Meta updates
    const currentTitle = $('title').text();
    let desc = $('meta[name="description"]').attr('content') || '';
    let ogTitle = $('meta[property="og:title"]').attr('content') || '';
    let ogDesc = $('meta[property="og:description"]').attr('content') || '';

    // Custom MS SEO map
    const SEO_MS: Record<string, { title: string; desc: string; h1: string }> = {
      "/ms/": {
        title: "Kalkulator Gaji Malaysia 2026: Kira Gaji Bersih Anda",
        desc: "Kira gaji bersih anda dengan tepat. Kalkulator gaji Malaysia 2026 percuma kami menolak caruman EPF, SOCSO, EIS dan PCB secara automatik mengikut akta terkini.",
        h1: "Kalkulator Gaji Malaysia"
      },
      "/ms/kalkulator-epf": {
        title: "Kalkulator EPF Malaysia 2026",
        desc: "Kira caruman EPF (KWSP) bahagian pekerja dan majikan dengan mudah. Gunakan kalkulator EPF Malaysia 2026 yang percuma dan pantas ini.",
        h1: "Kalkulator EPF Malaysia"
      },
      "/ms/kalkulator-socso": {
        title: "Kalkulator SOCSO Malaysia 2026",
        desc: "Semak jadual caruman PERKESO (SOCSO) dan SIP (EIS) 2026. Kira kadar potongan majikan dan pekerja dengan tepat menggunakan kalkulator SOCSO ini.",
        h1: "Kalkulator SOCSO Malaysia"
      },
      "/ms/kalkulator-pcb": {
        title: "Kalkulator PCB Malaysia 2026",
        desc: "Kira Potongan Cukai Berjadual (PCB) bulanan anda. Kalkulator cukai pendapatan LHDN ini dikemaskini mengikut struktur cukai rasmi Malaysia 2026.",
        h1: "Kalkulator PCB Malaysia"
      },
      "/ms/kalkulator-cuti-tahunan": {
        title: "Kalkulator Cuti Tahunan Malaysia 2026",
        desc: "Kira kelayakan cuti tahunan pro-rata berdasarkan Akta Kerja 1955 Malaysia. Ketahui hak cuti berbayar mengikut tempoh perkhidmatan anda.",
        h1: "Kalkulator Cuti Tahunan Malaysia"
      },
      "/ms/kalkulator-overtime": {
        title: "Kalkulator Overtime Malaysia 2026",
        desc: "Kira bayaran kerja lebih masa (OT) dengan betul. Kalkulator OT Malaysia ini membantu anda mengira kadar bayaran untuk hari biasa, cuti rehat, dan cuti am.",
        h1: "Kalkulator Overtime Malaysia"
      },
      "/ms/kadar-gaji-sejam": {
        title: "Kalkulator Kadar Gaji Sejam Malaysia 2026",
        desc: "Tukar gaji bulanan kepada kadar sejam, harian, atau pro-rata mengikut piawaian undang-undang Malaysia. Sesuai untuk pekerja separuh masa atau pengiraan OT.",
        h1: "Kalkulator Kadar Gaji Sejam Malaysia"
      },
      "/ms/kalkulator-gaji-minimum": {
        title: "Kalkulator Gaji Minimum Malaysia 2026",
        desc: "Semak jika gaji anda menepati standard Gaji Minimum terkini di Malaysia. Pastikan pematuhan undang-undang buruh untuk majikan dan pekerja.",
        h1: "Kalkulator Gaji Minimum Malaysia"
      },
      "/ms/penjana-payslip": {
        title: "Penjana Payslip Malaysia",
        desc: "Jana slip gaji profesional secara percuma yang lengkap dengan pengiraan EPF, SOCSO, EIS dan PCB. Sesuai untuk PKS dan majikan di Malaysia.",
        h1: "Penjana Payslip Malaysia"
      },
      "/ms/dasar-privasi": {
        title: "Dasar Privasi",
        desc: "Baca dasar privasi kami mengenai perlindungan data peribadi anda di SalaryCalculator.my. Privasi dan kerahsiaan anda adalah keutamaan kami.",
        h1: "Dasar Privasi"
      }
    };

    const msRouteNormalized = msRoute.replace(/\\/$/, '') || '/ms/';
    const seoData = SEO_MS[msRouteNormalized];

    if (seoData) {
      $('title').text(seoData.title);
      $('meta[name="description"]').attr('content', seoData.desc);
      $('meta[property="og:title"]').attr('content', seoData.title);
      $('meta[property="og:description"]').attr('content', seoData.desc);
      $('meta[property="og:url"]').attr('content', canonicalUrl);
      
      // Look for the main h1 and update it if exists
      const h1El = $('h1').first();
      if (h1El.length > 0) {
        h1El.text(seoData.h1);
        // remove data-i18n attribute so client side js doesn't overwrite it incorrectly
        h1El.removeAttr('data-i18n');
      }
    } else {
      const translateMeta = (text: string) => {
        if (!text) return text;
        let res = text;
        if (res.includes('Salary Calculator')) res = res.replace(/Salary Calculator/g, 'Kalkulator Gaji');
        if (res.includes('EPF Calculator')) res = res.replace(/EPF Calculator/g, 'Kalkulator EPF (KWSP)');
        if (res.includes('SOCSO & EIS Calculator')) res = res.replace(/SOCSO & EIS Calculator/g, 'Kalkulator SOCSO & EIS');
        else if (res.includes('SOCSO Calculator')) res = res.replace(/SOCSO Calculator/g, 'Kalkulator SOCSO');
        if (res.includes('PCB Income Tax Calculator')) res = res.replace(/PCB Income Tax Calculator/g, 'Kalkulator PCB & Cukai Pendapatan');
        else if (res.includes('PCB Calculator')) res = res.replace(/PCB Calculator/g, 'Kalkulator PCB');
        if (res.includes('Annual Leave Calculator')) res = res.replace(/Annual Leave Calculator/g, 'Kalkulator Cuti Tahunan');
        if (res.includes('Overtime Pay Calculator')) res = res.replace(/Overtime Pay Calculator/g, 'Kalkulator Overtime (OT)');
        else if (res.includes('Overtime Calculator')) res = res.replace(/Overtime Calculator/g, 'Kalkulator Overtime');
        if (res.includes('Hourly Rate Calculator')) res = res.replace(/Hourly Rate Calculator/g, 'Kalkulator Kadar Gaji Sejam');
        if (res.includes('Minimum Wage Calculator')) res = res.replace(/Minimum Wage Calculator/g, 'Kalkulator Gaji Minimum');
        if (res.includes('Payslip Generator')) res = res.replace(/Payslip Generator/g, 'Penjana Slip Gaji');
        if (res.includes('Privacy Policy')) res = res.replace(/Privacy Policy/g, 'Dasar Privasi');
        res = res.replace(/Calculate your exact take home pay/gi, 'Kira gaji bersih anda');
        res = res.replace(/Calculate employee and employer/gi, 'Kira caruman pekerja dan majikan');
        res = res.replace(/Calculate /g, 'Kira ');
        res = res.replace(/ for FREE/g, ' secara PERCUMA');
        res = res.replace(/Free, instant and accurate HR calculation tools for Malaysia/gi, 'Kalkulator HR percuma, pantas dan tepat untuk Malaysia');
        return res;
      };
      $('title').text(translateMeta(currentTitle));
      if (desc) $('meta[name="description"]').attr('content', translateMeta(desc));
      if (ogTitle) $('meta[property="og:title"]').attr('content', translateMeta(ogTitle));
      if (ogDesc) $('meta[property="og:description"]').attr('content', translateMeta(ogDesc));
      $('meta[property="og:url"]').attr('content', canonicalUrl);
    }`;

const regex = /\/\/ Meta updates[\s\S]*?(?=\/\/ Rewrite internal links)/;
const newContent = content.replace(regex, replacement + '\n    ');

fs.writeFileSync('server.ts', newContent);
console.log('patched');
