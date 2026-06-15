const payload = {
    timestamp: new Date().toISOString(),
    "Email": "lavtania@epicareer.com",
    "User Type": "Employer / HR",
    "Hiring Status": "Not Hiring",
    "Company Name": "EpiCareer",
    "User Phone": "12345678",
    download_via: "Download Salary Report"
};

fetch("http://localhost:3000/api/salary-sheet", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
}).then(res => res.text()).then(text => console.log("Response:", text)).catch(console.error);
