(function(){
  const REPOSITORY="ElectronPlatform/electronplatform.github.io";
  const STORAGE_KEY="electronWebsiteIssueHandoff";
  const CHECK_THROTTLE_MS=10000;
  const form=document.getElementById("websiteIssueForm");
  const liveStatus=document.getElementById("issueFormStatus");
  const panel=document.getElementById("issueHandoffPanel");
  const panelEyebrow=document.getElementById("issueHandoffEyebrow");
  const panelTitle=document.getElementById("issueHandoffTitle");
  const panelMessage=document.getElementById("issueHandoffMessage");
  const panelMeta=document.getElementById("issueHandoffMeta");
  const githubLink=document.getElementById("issueGithubLink");
  const checkButton=document.getElementById("checkIssueStatus");
  const editButton=document.getElementById("editIssueForm");
  const clearButton=document.getElementById("clearIssueForm");
  if(!form || !panel) return;

  let activeReport=readStoredReport();
  let githubDraftUrl="";
  let checking=false;
  let lastCheckAt=0;
  let waitingForReturn=false;

  function setLiveStatus(message){
    if(liveStatus) liveStatus.textContent=message;
  }

  function createReportId(){
    if(window.crypto && typeof window.crypto.randomUUID==="function") return window.crypto.randomUUID();
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
  }

  function readStoredReport(){
    try{
      const value=JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || "null");
      if(!value || typeof value.id!=="string" || typeof value.startedAt!=="number") return null;
      return value;
    }catch(_error){
      return null;
    }
  }

  function storeReport(){
    try{
      if(activeReport) window.sessionStorage.setItem(STORAGE_KEY,JSON.stringify(activeReport));
      else window.sessionStorage.removeItem(STORAGE_KEY);
    }catch(_error){
      // The live page still works when session storage is unavailable.
    }
  }

  function buildGithubUrl(reportId){
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
      "Prepared using the Electron website issue form.",
      `<!-- electron-report-id: ${reportId} -->`
    ].join("\n");

    const githubUrl=new URL(`https://github.com/${REPOSITORY}/issues/new`);
    githubUrl.searchParams.set("title",`[Website] ${summary}`);
    githubUrl.searchParams.set("body",body);
    githubUrl.searchParams.set("labels","bug");
    return githubUrl.toString();
  }

  function openInNewTab(url){
    const link=document.createElement("a");
    link.href=url;
    link.target="_blank";
    link.rel="noopener noreferrer";
    link.hidden=true;
    document.body.append(link);
    link.click();
    link.remove();
  }

  function setPendingPanel(message,meta){
    panel.hidden=false;
    panel.dataset.state="pending";
    panelEyebrow.textContent="GitHub review pending";
    panelTitle.textContent="GitHub opened in a new tab";
    panelMessage.textContent=message || "Review the report on GitHub and submit it when you are ready. Return to this tab afterwards for confirmation.";
    panelMeta.textContent=meta || "Nothing has been confirmed as submitted yet.";
    githubLink.hidden=!githubDraftUrl;
    if(githubDraftUrl){
      githubLink.href=githubDraftUrl;
      githubLink.textContent="Open GitHub again";
    }
    checkButton.hidden=false;
    editButton.hidden=false;
    clearButton.hidden=true;
  }

  function setSuccessPanel(issue){
    panel.hidden=false;
    panel.dataset.state="success";
    panelEyebrow.textContent="Submission confirmed";
    panelTitle.textContent="Website issue successfully submitted";
    panelMessage.textContent=`Issue #${issue.number} was found on GitHub. Thank you for helping Electron improve.`;
    panelMeta.textContent=issue.title || "The submitted website issue is now public on GitHub.";
    githubLink.hidden=false;
    githubLink.href=issue.html_url;
    githubLink.textContent=`View issue #${issue.number} on GitHub`;
    checkButton.hidden=true;
    editButton.hidden=true;
    clearButton.hidden=false;
    setLiveStatus(`Website issue #${issue.number} was successfully found on GitHub.`);
  }

  function formatCheckedTime(){
    return new Intl.DateTimeFormat(undefined,{hour:"2-digit",minute:"2-digit",second:"2-digit"}).format(new Date());
  }

  async function checkForSubmittedIssue(manual){
    if(!activeReport || activeReport.status==="success" || checking) return;
    const now=Date.now();
    if(!manual && now-lastCheckAt<CHECK_THROTTLE_MS) return;
    if(manual && now-lastCheckAt<5000){
      panelMeta.textContent="Please wait a few seconds before checking GitHub again.";
      setLiveStatus("Please wait a few seconds before checking GitHub again.");
      return;
    }
    lastCheckAt=now;
    checking=true;
    checkButton.disabled=true;
    checkButton.textContent="Checking…";
    panel.dataset.state="checking";
    panelMeta.textContent="Checking the public GitHub issues now…";
    setLiveStatus("Checking GitHub for the submitted website issue.");

    try{
      const since=new Date(activeReport.startedAt-300000).toISOString();
      const apiUrl=new URL(`https://api.github.com/repos/${REPOSITORY}/issues`);
      apiUrl.searchParams.set("state","all");
      apiUrl.searchParams.set("since",since);
      apiUrl.searchParams.set("per_page","100");
      apiUrl.searchParams.set("sort","created");
      apiUrl.searchParams.set("direction","desc");
      const response=await window.fetch(apiUrl.toString(),{cache:"no-store"});
      if(!response.ok) throw new Error(`GitHub returned ${response.status}`);
      const issues=await response.json();
      const marker=`electron-report-id: ${activeReport.id}`;
      const issue=Array.isArray(issues) ? issues.find(item=>typeof item.body==="string" && item.body.includes(marker)) : null;

      if(issue){
        activeReport={
          ...activeReport,
          status:"success",
          issueNumber:issue.number,
          issueUrl:issue.html_url,
          issueTitle:issue.title || ""
        };
        storeReport();
        setSuccessPanel(issue);
      }else{
        setPendingPanel(
          "We have not detected a submitted issue yet. You may still be editing it, or GitHub may need a moment to publish it.",
          `Last checked at ${formatCheckedTime()}. Nothing has been confirmed as submitted.`
        );
        setLiveStatus("No submitted issue has been detected yet.");
      }
    }catch(_error){
      setPendingPanel(
        "Electron could not check GitHub just now. This does not mean your report failed; you can open GitHub or try the check again shortly.",
        `The last check at ${formatCheckedTime()} could not be completed.`
      );
      panel.dataset.state="error";
      setLiveStatus("The GitHub status check could not be completed.");
    }finally{
      checking=false;
      checkButton.disabled=false;
      checkButton.textContent="Check again";
    }
  }

  function checkAfterReturn(){
    if(!waitingForReturn || document.visibilityState!=="visible") return;
    waitingForReturn=false;
    window.setTimeout(()=>checkForSubmittedIssue(false),600);
  }

  form.addEventListener("submit",event=>{
    event.preventDefault();
    if(!form.reportValidity()) return;

    if(!activeReport || activeReport.status==="success"){
      activeReport={id:createReportId(),startedAt:Date.now(),status:"pending"};
    }
    githubDraftUrl=buildGithubUrl(activeReport.id);
    activeReport.status="pending";
    storeReport();
    setPendingPanel();
    setLiveStatus("GitHub opened in a new tab. Nothing has been confirmed as submitted yet.");
    waitingForReturn=true;
    openInNewTab(githubDraftUrl);
  });

  checkButton.addEventListener("click",()=>checkForSubmittedIssue(true));
  editButton.addEventListener("click",()=>{
    document.getElementById("issueType")?.focus();
    setLiveStatus("You can update the Electron form and review it on GitHub again.");
  });
  clearButton.addEventListener("click",()=>{
    form.reset();
    activeReport=null;
    githubDraftUrl="";
    waitingForReturn=false;
    storeReport();
    panel.hidden=true;
    setLiveStatus("The completed report was cleared from this page.");
    document.getElementById("issueType")?.focus();
  });

  document.addEventListener("visibilitychange",()=>{
    if(document.visibilityState==="hidden" && activeReport?.status==="pending") waitingForReturn=true;
    else checkAfterReturn();
  });
  window.addEventListener("focus",checkAfterReturn);

  if(activeReport?.status==="success" && activeReport.issueNumber && activeReport.issueUrl){
    setSuccessPanel({number:activeReport.issueNumber,html_url:activeReport.issueUrl,title:activeReport.issueTitle});
  }else if(activeReport?.status==="pending"){
    setPendingPanel(
      "This tab is still waiting to confirm the GitHub submission. Use Check again after you have submitted the issue.",
      "The report details themselves were not saved in session storage."
    );
  }
})();
