const jobToGradePayMap = {
    "Assistant Section Officer": "4600",
    "Junior Secretariat Assistant": "1900",
    "Upper Division Clerk": "2400",
    "Lower Division Clerk": "1900",
    "Income Tax Inspector": "4600",
    "Central Excise Inspector": "4600",
    "Preventive Officer": "4600",
    "Examiner (CBIC)": "4600",
    "Assistant Audit Officer": "4800",
    "Statistical Investigator": "4200",
    "Auditor (CAG/CGDA)": "2800",
    "Stenographer Grade C": "4200",
    "Stenographer Grade D": "2400",
    "Postal Assistant": "2400",
    "Sorting Assistant": "2400",
    "Multi Tasking Staff (MTS)": "1800",
    "Tax Assistant": "2400",
    "Divisional Accountant": "4200",
    "Sub-Inspector (CBI)": "4600",
    "Sub-Inspector (NIA)": "4600"
  };
  
  // Auto-set Grade Pay based on job title
  document.getElementById("jobTitle").addEventListener("change", function () {
    const selectedTitle = this.value;
    const gradePayField = document.getElementById("gradePay");
  
    if (jobToGradePayMap[selectedTitle]) {
      gradePayField.value = jobToGradePayMap[selectedTitle];
    } else {
      gradePayField.value = "";
    }
  });
  
  document.getElementById("payForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const gradePay = document.getElementById("gradePay").value;
    const serviceYears = parseInt(document.getElementById("serviceYears").value, 10);
  
    const output = document.getElementById("output");
  
    if (!gradePay || isNaN(serviceYears)) {
      output.textContent = "Please fill in all fields correctly.";
      return;
    }
  
    const payLevelMap = {
      1800: 1,
      1900: 2,
      2400: 4,
      2800: 5,
      4200: 6,
      4600: 7,
      4800: 8
    };
  
    const baseLevel = payLevelMap[gradePay];
  
    const increment = Math.floor(serviceYears / 3);
    const payLevelStep = baseLevel + (increment > 5 ? 5 : increment); // Cap for simplicity
  
    output.innerHTML = `
      <strong>Base Pay Level:</strong> Level ${baseLevel} <br/>
      <strong>Estimated Pay Level (with service):</strong> Level ${payLevelStep} <br/>
      <small>Note: Final level may vary by promotion rules and department-specific norms.</small>
    `;
  });