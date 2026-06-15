import fs from "fs";

const modalScript = `
<script>
  document.addEventListener("DOMContentLoaded", function() {
    const hiringModal = document.getElementById("hiringIntentModal");
    const closeBtn = document.getElementById("closeHiringModal");
    const skipBtn = document.getElementById("skipHiringModal");
    const form = document.getElementById("hiringIntentForm");

    function closeHiring() {
      if(hiringModal) hiringModal.style.display = "none";
    }

    if(closeBtn) closeBtn.addEventListener("click", function(e) {
      e.preventDefault();
      closeHiring();
    });

    if(skipBtn) skipBtn.addEventListener("click", function(e) {
      e.preventDefault();
      closeHiring();
    });

    if(form) form.addEventListener("submit", async function(e) {
      e.preventDefault();
      const selected = form.querySelector('input[name="hiring_status"]:checked');
      if (!selected) {
        // Optional? The prompt says "Make the selection optional unless otherwise specified."
        // But if they submit without selecting, it's virtually a skip.
        closeHiring();
        return;
      }
      
      const status = selected.value;
      const email = window._currentLeadEmail || "";
      const dlType = window._currentLeadType || "Unknown";
      
      if (email) {
        try {
          const payload = {
            timestamp: new Date().toISOString(),
            email: email,
            hiringStatus: status,
            download_via: dlType + " - Hiring Intent Update"
          };
          
          await fetch("/api/salary-sheet", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        } catch(e) {
          console.error("Error saving hiring intent:", e);
        }
      }
      
      closeHiring();
    });
  });
</script>
`;

function injectScript(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");
  if (!content.includes('id="hiringIntentModal"')) {
    return;
  }
  if (content.includes('id="closeHiringModal"')) {
    if (!content.includes("function closeHiring()")) {
      content = content.replace("</body>", modalScript + "\\n</body>");
      fs.writeFileSync(filePath, content);
      console.log("Injected script into " + filePath);
    }
  }
}

[
  "index.html",
  "pcb-income-tax.html",
  "epf-kwsp.html",
  "annual-leave-calculator.html",
].forEach((f) => injectScript(f));
