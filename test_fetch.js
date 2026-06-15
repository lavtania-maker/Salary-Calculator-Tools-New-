const testFetch = async () => {
    const payload1 = {
        email: "test1@example.com",
        "Email": "test1@example.com",
        userType: "Employer/HR",
        "User Type": "Employer/HR",
        companyName: "ABC Sdn Bhd",
        "Company Name": "ABC Sdn Bhd",
        hiringStatus: "Hiring Now",
        "Hiring Status": "Hiring Now",
        userPhone: "0123456789",
        "User Phone": "0123456789",
        download_via: "PCB Calculator"
    };
    
    try {
        const res = await fetch("http://localhost:3000/api/pcb-sheet", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload1)
        });
        const text = await res.text();
        console.log("Response:", text);
    } catch(err) {
        console.error(err);
    }
};
testFetch();
