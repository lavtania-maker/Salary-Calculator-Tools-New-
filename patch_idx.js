import * as fs from 'fs';

let content = fs.readFileSync('index.html', 'utf8');

const oldPayload = `const sheetPayload = {
                timestamp: new Date().toISOString(),
                email: userEmailAddress,
                userType: typeValue,
                hiringStatus: hiringValue,
                companyName: companyValue,
                userPhone: phoneValue,`;

const newPayload = `const sheetPayload = {
                timestamp: new Date().toISOString(),
                "Email": userEmailAddress,
                "User Type": typeValue,
                "Hiring Status": hiringValue,
                "Company Name": companyValue,
                "User Phone": phoneValue,`;

content = content.replace(oldPayload, newPayload);
fs.writeFileSync('index.html', content, 'utf8');
console.log('Fixed index.html');
