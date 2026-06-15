import fs from "fs";

function updateIndexJS() {
  let content = fs.readFileSync("index.html", "utf-8");

  // 1. the "change" event
  const changeLogicOld = `const userTypeSelect = document.getElementById("userType");
        userTypeSelect.addEventListener("change", function () {
          const hiringGroup = document.getElementById("hiringQuestionGroup");
          const hiringStatus = document.getElementById("hiringStatus");
          const hiringError = document.getElementById("hiringError");
          const companyGroup = document.getElementById("companyNameGroup");
          const companyInput = document.getElementById("companyName");

          if (this.value === "Employer / HR") {
            hiringGroup.style.display = "block";
            hiringStatus.required = true;
            companyGroup.style.display = "block";
            companyInput.required = true;
          } else {
            hiringGroup.style.display = "none";
            hiringStatus.required = false;
            hiringStatus.value = "";
            hiringError.style.display = "none";
            companyGroup.style.display = "none";
            companyInput.required = false;
            companyInput.value = "";
          }
        });`;

  const changeLogicNew = `const userTypeSelect = document.getElementById("userType");
        userTypeSelect.addEventListener("change", function () {
          const companyGroup = document.getElementById("companyNameGroup");
          const companyInput = document.getElementById("companyName");

          if (this.value === "Employer / HR") {
            if(companyGroup) companyGroup.style.display = "block";
            if(companyInput) companyInput.required = true;
          } else {
            if(companyGroup) companyGroup.style.display = "none";
            if(companyInput) {
               companyInput.required = false;
               companyInput.value = "";
            }
          }
        });`;

  content = content.replace(changeLogicOld, changeLogicNew);

  // 2. the "submit" event part 1 - removing references
  const submitLogicOld = `          const hiringStatusInput = document.getElementById("hiringStatus");
          const hiringGroup = document.getElementById("hiringQuestionGroup");
          const hiringError = document.getElementById("hiringError");

          const emailValue = emailInput.value.trim();
          const typeValue = typeInput.value;
          const phoneValue = phoneInput.value.trim();
          const companyValue = companyInput.value.trim();

          let hiringValue = "";
          if (hiringGroup.style.display !== "none") {
            hiringValue = hiringStatusInput.value;
            if (!hiringValue) {
              hiringError.style.display = "block";
              return;
            }
          }
          hiringError.style.display = "none";`;

  const submitLogicNew = `
          const emailValue = emailInput.value.trim();
          const typeValue = typeInput.value;
          const phoneValue = phoneInput ? phoneInput.value.trim() : "";
          const companyValue = companyInput ? companyInput.value.trim() : "";
          let hiringValue = "";
  `;

  content = content.replace(submitLogicOld, submitLogicNew);

  // 3. Modifying the bottom of the submit listener
  // We need to inject the new logic right where the fetch calls wrap up, or at the end.
  // Wait, the prompt says "Display the question immediately after the report download action."
  // Right now, download happens after Firebase addDoc and sheet fetch.
  // The structure is:
  // await addDoc(...)
  // await fetch(...)
  // await fetch(/api/deliver-document)
  // window.open(blobUrl) --> This is the download action
  // emailModal.style.display = "none"

  // Let's find:
  // emailModal.style.display = "none";
  // And replace it with the logic to show hiringModal if typeValue === "Employer / HR"
  const endLogicOld = `emailModal.style.display = "none";
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;`;

  const endLogicNew = `emailModal.style.display = "none";
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            if (typeValue === "Employer / HR" || typeValue === "Employer/HR") {
                const hiringModal = document.getElementById("hiringIntentModal");
                if (hiringModal) {
                    hiringModal.style.display = "flex";
                    // Initialize the new form to submit this extra data
                    window._currentLeadEmail = userEmailAddress;
                    window._currentLeadType = currentDownloadType;
                }
            }
  `;
  content = content.replace(endLogicOld, endLogicNew);

  // We should also look at other places `hiringGroup` or `hiringStatus` is used in index.html.
  // E.g. in the initial setup or close modal.
  content = content.replace(
    /const hiringGroup = document\.getElementById\("hiringQuestionGroup"\);/g,
    "",
  );
  content = content.replace(
    /const hiringStatus = document\.getElementById\("hiringStatus"\);/g,
    "",
  );
  content = content.replace(
    /const hiringError = document\.getElementById\("hiringError"\);/g,
    "",
  );
  content = content.replace(/hiringStatus\.required = false;/g, "");
  content = content.replace(/hiringStatus\.value = "";/g, "");
  content = content.replace(/hiringError\.style\.display = "none";/g, "");

  fs.writeFileSync("index.html", content);
  console.log("Fixed index.html js logic");
}

updateIndexJS();
