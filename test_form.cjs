const fetch = require('node-fetch');

const payload = {
    timestamp: new Date().toISOString(),
    email: "test@example.com",
    userType: "Employer/HR",
    hiringStatus: "Hiring Now",
    companyName: "ABC Sdn Bhd",
    userPhone: "0123456789",
    download_via: "PCB Calculator"
};

const run = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/pcb-sheet", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        const text = await res.text();
        console.log("Response:", text);
    } catch(err) {
        console.error(err);
    }
}
run();
