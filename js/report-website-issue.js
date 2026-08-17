(function(){
  const form=document.getElementById("websiteIssueForm");
  const status=document.getElementById("issueFormStatus");
  if(!form) return;

  form.addEventListener("submit",event=>{
    event.preventDefault();
    if(!form.reportValidity()) return;

    const data=new FormData(form);
    const summary=String(data.get("issueSummary") || "").trim();
    const issueType=String(data.get("issueType") || "").trim();
    const pageUrl=String(data.get("pageUrl") || "").trim();
    const problem=String(data.get("problem") || "").trim();
    const expected=String(data.get("expected") || "").trim();
    const environment=String(data.get("environment") || "").trim() || "Not provided";

    const body=[
      "## Website issue",
      "",
      "### Type of issue",
      issueType,
      "",
      "### Page address",
      pageUrl,
      "",
      "### What is wrong?",
      problem,
      "",
      "### What did you expect?",
      expected,
      "",
      "### Browser and device",
      environment,
      "",
      "### Privacy check",
      "I checked that this report does not contain passwords, RFID keys, card dumps, personal data, or other sensitive information.",
      "",
      "---",
      "Prepared using the Electron website issue form."
    ].join("\n");

    const githubUrl=new URL("https://github.com/ElectronPlatform/electronplatform.github.io/issues/new");
    githubUrl.searchParams.set("title",`[Website] ${summary}`);
    githubUrl.searchParams.set("body",body);
    githubUrl.searchParams.set("labels","bug");

    if(status) status.textContent="Opening GitHub for your final review. Nothing has been submitted yet.";
    window.location.assign(githubUrl.toString());
  });
})();
