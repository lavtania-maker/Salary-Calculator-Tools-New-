const fs = require('fs');
const msJson = JSON.parse(fs.readFileSync('locales/ms.json', 'utf8'));
msJson['tips_for_parttime_workers_freelancers_in_ec6995'] = "Panduan Untuk Pekerja Separuh Masa, Freelancer & Pelatih";
fs.writeFileSync('locales/ms.json', JSON.stringify(msJson, null, 2), 'utf8');
console.log('Updated tips_for_parttime_workers_freelancers_in_ec6995');
