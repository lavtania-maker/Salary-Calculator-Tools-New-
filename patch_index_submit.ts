import fs from "fs";

let content = fs.readFileSync("index.html", "utf-8");

const oldLogic = `          // Hide form and show success
          modalFormContent.style.display = "none"; emailModal.style.display = "none";
          modalFeedback.style.display = "block";
          updateSuccessMessage();

          // Auto-close after a longer delay to allow users to click the button
          setTimeout(() => {
            emailModal.style.display = "none";
          }, 10000);`;

const newLogic = `          // Hide form and show success
          modalFormContent.style.display = "none";
          if (emailModal) emailModal.style.display = "none";
          
          if (typeValue === "Employer / HR" || typeValue === "Employer/HR") {
            const hiringModal = document.getElementById("hiringIntentModal");
            if (hiringModal) {
              hiringModal.style.display = "flex";
              // Initialize the new form to submit this extra data
              window._currentLeadEmail = userEmailAddress;
              window._currentLeadType = currentDownloadType;
            }
          }
          
          modalFeedback.style.display = "block";
          updateSuccessMessage();`;

content = content.replace(oldLogic, newLogic);
fs.writeFileSync("index.html", content);
console.log("Fixed index.html end submit logic.");
