const fs = require('fs');

const path = 'src/salary-calculator.ts';
let code = fs.readFileSync(path, 'utf8');

const functionCode = `
function updatePremiumIncomeJourney(totalIncome: number) {
  const section = document.getElementById("premiumIncomeJourneySection");
  if (!section) return;

  const isMs = typeof window !== "undefined" && (window.location.pathname.startsWith("/ms/") || window.location.pathname === "/ms" || document.documentElement.lang === "ms");

  let currentGroup = "B40";
  let nextGroup = "M40";
  let lowerBound = 0;
  let upperBound = 5250; 
  let isT20 = false;
  
  if (totalIncome >= 11820) {
    currentGroup = "T20";
    nextGroup = "None";
    lowerBound = 11820;
    upperBound = 11820;
    isT20 = true;
  } else if (totalIncome >= 5250) {
    currentGroup = "M40";
    nextGroup = "T20";
    lowerBound = 5250;
    upperBound = 11820;
  } else {
    currentGroup = "B40";
    nextGroup = "M40";
    lowerBound = 0;
    upperBound = 5250;
  }

  let progressPct = 0;
  let trackPct = 0;
  let amountNeeded = 0;
  
  if (isT20) {
    progressPct = 100;
    trackPct = 100;
  } else {
    amountNeeded = upperBound - totalIncome;
    if (amountNeeded < 0) amountNeeded = 0;
    progressPct = Math.round((totalIncome / upperBound) * 100);
    if (progressPct > 100) progressPct = 100;

    if (currentGroup === "B40") {
      trackPct = (totalIncome / 5250) * 50;
    } else if (currentGroup === "M40") {
      trackPct = 50 + ((totalIncome - 5250) / (11820 - 5250)) * 50;
    }
  }
  
  if (trackPct > 100) trackPct = 100;
  if (trackPct < 0) trackPct = 0;
  
  const badge = document.getElementById("journeyCurrentBadge");
  if (badge) {
    badge.textContent = currentGroup;
    badge.style.background = currentGroup === "B40" ? "#ef4444" : currentGroup === "M40" ? "#eab308" : "#16a34a";
    badge.style.boxShadow = \`0 4px 14px -4px \${currentGroup === "B40" ? "rgba(239, 68, 68, 0.4)" : currentGroup === "M40" ? "rgba(202, 138, 4, 0.4)" : "rgba(22, 163, 74, 0.4)"}\`;
  }

  const trackFill = document.getElementById("journeyTrackFill");
  if (trackFill) {
    trackFill.style.width = \`\${trackPct}%\`;
    trackFill.style.background = currentGroup === "B40" ? "#ef4444" : currentGroup === "M40" ? "#eab308" : "#16a34a";
  }

  const youAreHere = document.getElementById("journeyYouAreHere");
  if (youAreHere) {
    youAreHere.style.left = \`\${trackPct}%\`;
    youAreHere.style.color = currentGroup === "B40" ? "#ef4444" : currentGroup === "M40" ? "#eab308" : "#16a34a";
    youAreHere.innerHTML = isMs 
      ? \`Anda di sini <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="display: block; margin: 2px auto 0"><polyline points="6 9 12 15 18 9"></polyline></svg>\` 
      : \`You are here <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="display: block; margin: 2px auto 0"><polyline points="6 9 12 15 18 9"></polyline></svg>\`;
  }
  
  const nodeB40 = document.getElementById("nodeB40");
  const nodeM40 = document.getElementById("nodeM40");
  const nodeT20 = document.getElementById("nodeT20");
  
  if (nodeB40) nodeB40.style.borderColor = "#ef4444";
  if (nodeM40) nodeM40.style.borderColor = totalIncome >= 5250 ? (currentGroup === "M40" ? "#eab308" : "#16a34a") : "#e2e8f0";
  if (nodeT20) nodeT20.style.borderColor = totalIncome >= 11820 ? "#16a34a" : "#e2e8f0";

  const nextGoalContent = document.getElementById("nextGoalContent");
  const maxGoalContent = document.getElementById("maxGoalContent");
  
  if (isT20) {
    if (nextGoalContent) nextGoalContent.style.display = "none";
    if (maxGoalContent) maxGoalContent.style.display = "block";
  } else {
    if (nextGoalContent) nextGoalContent.style.display = "block";
    if (maxGoalContent) maxGoalContent.style.display = "none";
    
    const nextGoalTitle = document.getElementById("nextGoalTitle");
    if (nextGoalTitle) {
      nextGoalTitle.textContent = isMs ? \`Sasaran: \${nextGroup}\` : \`Next Goal: \${nextGroup}\`;
    }
    
    const nextGoalAmount = document.getElementById("nextGoalAmount");
    if (nextGoalAmount) {
      nextGoalAmount.textContent = \`RM\${amountNeeded.toFixed(2)}\`;
    }
  }

  const milestoneGroup = document.getElementById("insightMilestoneGroup");
  if (milestoneGroup) {
    if (isT20) {
      milestoneGroup.textContent = isMs ? "Kumpulan T20" : "T20 Income Group";
      milestoneGroup.style.color = "#16a34a";
    } else {
      milestoneGroup.textContent = isMs ? \`Kumpulan \${nextGroup}\` : \`\${nextGroup} Income Group\`;
      milestoneGroup.style.color = nextGroup === "M40" ? "#ca8a04" : "#16a34a";
    }
  }

  const milestoneRange = document.getElementById("insightMilestoneRange");
  if (milestoneRange) {
    if (isT20) {
      milestoneRange.textContent = isMs ? "RM11,820 & ke atas" : "RM11,820 & above";
    } else if (nextGroup === "M40") {
      milestoneRange.textContent = "RM5,250 - RM11,819";
    } else {
      milestoneRange.textContent = isMs ? "RM11,820 & ke atas" : "RM11,820 & above";
    }
  }

  const milestoneMsg = document.getElementById("insightMilestoneMsg");
  if (milestoneMsg) {
    if (isT20) {
      milestoneMsg.textContent = isMs ? "Tahniah! Anda berada di kumpulan teratas." : "Awesome! You're in the top group.";
    } else {
      milestoneMsg.textContent = isMs ? "Teruskan usaha! Anda semakin hampir." : "Keep going! You're getting closer.";
    }
  }
  
  const milestoneIconBg = document.getElementById("insightMilestoneIconBg");
  if (milestoneIconBg) {
    if (isT20) {
      milestoneIconBg.style.background = "#dcfce7";
      milestoneIconBg.innerHTML = "🏆";
    } else if (nextGroup === "M40") {
      milestoneIconBg.style.background = "#fef9c3";
      milestoneIconBg.innerHTML = "🏕️";
    } else {
      milestoneIconBg.style.background = "#e0e7ff";
      milestoneIconBg.innerHTML = "🏔️";
    }
  }

  const progressPctEl = document.getElementById("insightProgressPct");
  if (progressPctEl) {
    progressPctEl.textContent = progressPct.toString();
  }
  
  const progressPctWrapper = document.getElementById("insightProgressPctWrapper");
  if (progressPctWrapper) {
    progressPctWrapper.style.color = currentGroup === "B40" ? "#ef4444" : currentGroup === "M40" ? "#eab308" : "#16a34a";
  }
  
  const progressBar = document.getElementById("insightProgressBar");
  if (progressBar) {
    progressBar.style.width = \`\${progressPct}%\`;
    progressBar.style.background = currentGroup === "B40" ? "#ef4444" : currentGroup === "M40" ? "#eab308" : "#16a34a";
  }
  
  const progressBg = document.getElementById("insightProgressBg");
  if (progressBg) {
    progressBg.style.background = currentGroup === "B40" ? "#fee2e2" : currentGroup === "M40" ? "#fef9c3" : "#dcfce7";
  }

  const progressRemaining = document.getElementById("insightProgressRemaining");
  if (progressRemaining) {
    if (isT20) {
      progressRemaining.textContent = isMs ? "Sasaran tercapai" : "Goal reached";
    } else {
      progressRemaining.textContent = isMs ? \`RM\${amountNeeded.toFixed(2)} lagi\` : \`RM\${amountNeeded.toFixed(2)} more to go\`;
    }
  }

  const progressLabel = document.getElementById("insightProgressLabel");
  if (progressLabel) {
    if (isT20) {
      progressLabel.textContent = "";
    } else {
      progressLabel.textContent = isMs ? \`untuk capai \${nextGroup}\` : \`to reach \${nextGroup}\`;
    }
  }
  
  if (section.style.display === "none" || section.style.opacity === "0") {
    section.style.display = "block";
    setTimeout(() => {
      section.style.opacity = "1";
    }, 50);
  }
}
`;

// Inject function at the end
if (!code.includes("updatePremiumIncomeJourney")) {
  code = code + "\n" + functionCode;
}

// Call function inside calculateSalary
const searchStr = `    lastSalaryCalculation = {
      grossSalary,
      bonus,
      totalIncome,
      epf,
      epfEmployer,
      socso,
      socsoEmployer,
      eis,
      eisEmployer,
      pcb,
      netSalary: totalIncome - totalDeductions,
      totalDeductions,
      incomeGroup: \`\${incomeGroup} (\${subGroup})\`
    };`;

if (code.includes(searchStr)) {
  code = code.replace(searchStr, searchStr + "\n\n    updatePremiumIncomeJourney(totalIncome);");
  fs.writeFileSync(path, code);
  console.log("Patched src/salary-calculator.ts");
} else {
  console.log("Could not find insertion point!");
}

