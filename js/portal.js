(function(){
  const config=window.ELECTRON_PORTAL_CONFIG || {};

  function byId(id){ return document.getElementById(id); }

  function setText(id, value){
    const el=byId(id);
    if(el) el.textContent=value || "";
  }

  function configureDownloads(){
    const url=String(config.downloadUrl || "").trim();
    const targets=[byId("primaryDownload"), byId("headerDownload")].filter(Boolean);
    targets.forEach(link=>{
      if(url){
        link.href=url;
        link.removeAttribute("aria-disabled");
        link.classList.remove("disabled");
      }else{
        link.href="./preview.html";
        link.setAttribute("aria-disabled","true");
        link.classList.add("disabled");
      }
    });
    const status=byId("downloadStatus");
    if(status && !url){
      status.textContent="Download link not configured yet. Add the Google Drive URL in config.js.";
    }
  }

  function renderFeatures(){
    const grid=byId("featureGrid");
    if(!grid) return;
    const modules=Array.isArray(config.modules) ? config.modules : [];
    grid.innerHTML=modules.map(module=>`
      <a class="featureCard" href="${escapeHtml(module.actionTarget || "./features.html")}" data-module-id="${escapeHtml(module.id)}" aria-haspopup="dialog" aria-controls="moduleDialog">
        <div class="featureIcon" aria-hidden="true">${iconSvg(module.icon)}</div>
        <h3>${escapeHtml(module.title)}</h3>
        <p>${escapeHtml(module.description)}</p>
        <span class="featureAction">${escapeHtml(module.actionLabel || "Explore")} <span aria-hidden="true">-&gt;</span></span>
      </a>
    `).join("");
  }

  function moduleForId(id){
    const modules=Array.isArray(config.modules) ? config.modules : [];
    return modules.find(module=>module.id===id) || null;
  }

  function moduleIdFromHash(){
    try{
      return decodeURIComponent(String(window.location.hash || "").replace(/^#/,""));
    }catch(_error){
      return "";
    }
  }

  function renderModuleDialog(module){
    setText("moduleDialogEyebrow", module.title);
    setText("moduleDialogTitle", module.dialogTitle || module.title);
    setText("moduleDialogIntro", module.dialogIntro || module.description);

    const icon=byId("moduleDialogIcon");
    if(icon) icon.innerHTML=iconSvg(module.icon);

    const details=byId("moduleDialogDetails");
    const sections=Array.isArray(module.details) ? module.details : [];
    if(details){
      details.innerHTML=sections.map(section=>`
        <article class="moduleDialogSection">
          <h3>${escapeHtml(section.title)}</h3>
          <p>${escapeHtml(section.text)}</p>
        </article>
      `).join("");
    }
  }

  function openModuleDialog(module){
    const dialog=byId("moduleDialog");
    if(!dialog || !module) return;
    renderModuleDialog(module);
    dialog.dataset.moduleId=module.id;
    document.body.classList.add("moduleDialogOpen");
    if(!dialog.open){
      if(typeof dialog.showModal==="function") dialog.showModal();
      else dialog.setAttribute("open","");
    }
    const closeButton=dialog.querySelector("[data-module-dialog-close]");
    if(closeButton) closeButton.focus();
  }

  function closeModuleDialog(){
    const dialog=byId("moduleDialog");
    if(!dialog?.open) return;
    if(typeof dialog.close==="function") dialog.close();
    else{
      dialog.removeAttribute("open");
      dialog.dispatchEvent(new Event("close"));
    }
  }

  function syncModuleDialogToHash(){
    const dialog=byId("moduleDialog");
    const module=moduleForId(moduleIdFromHash());
    if(module){
      openModuleDialog(module);
    }else if(dialog?.open){
      closeModuleDialog();
    }
  }

  function configureModuleDialog(){
    const grid=byId("featureGrid");
    const dialog=byId("moduleDialog");
    if(!grid || !dialog) return;

    grid.addEventListener("click",event=>{
      const link=event.target.closest("[data-module-id]");
      if(!link || event.button!==0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const module=moduleForId(link.dataset.moduleId);
      if(!module) return;
      event.preventDefault();
      dialog._returnFocus=link;
      window.history.replaceState(null,"",`#${encodeURIComponent(module.id)}`);
      openModuleDialog(module);
    });

    dialog.querySelectorAll("[data-module-dialog-close]").forEach(button=>{
      button.addEventListener("click",closeModuleDialog);
    });

    dialog.addEventListener("click",event=>{
      if(event.target===dialog) closeModuleDialog();
    });

    dialog.addEventListener("close",()=>{
      document.body.classList.remove("moduleDialogOpen");
      const moduleId=dialog.dataset.moduleId;
      if(moduleId && moduleIdFromHash()===moduleId){
        window.history.replaceState(null,"",`${window.location.pathname}${window.location.search}`);
      }
      if(dialog._returnFocus?.isConnected) dialog._returnFocus.focus();
      delete dialog._returnFocus;
      delete dialog.dataset.moduleId;
    });

    window.addEventListener("hashchange",syncModuleDialogToHash);
    syncModuleDialogToHash();
  }

  function iconSvg(name){
    const icons={
      book:`<svg viewBox="0 0 48 48"><path d="M10 12c7 0 11 2 14 6 3-4 7-6 14-6v25c-7 0-11 2-14 6-3-4-7-6-14-6V12z"/><path d="M24 18v25"/></svg>`,
      search:`<svg viewBox="0 0 48 48"><circle cx="21" cy="21" r="11"/><path d="M30 30l9 9"/></svg>`,
      report:`<svg viewBox="0 0 48 48"><path d="M14 8h16l6 6v26H14V8z"/><path d="M29 8v7h7"/><path d="M20 25h16M20 32h10M20 18h5"/></svg>`,
      shield:`<svg viewBox="0 0 48 48"><path d="M24 6l16 6v11c0 10-6 17-16 21C14 40 8 33 8 23V12l16-6z"/><path d="M17 24l5 5 10-11"/></svg>`,
      device:`<svg viewBox="0 0 48 48"><rect x="9" y="13" width="30" height="22" rx="3"/><path d="M16 21h8M16 28h4M31 28h2M36 28h1"/><path d="M18 39h12"/></svg>`,
      feedback:`<svg viewBox="0 0 48 48"><path d="M10 13h28a4 4 0 014 4v14a4 4 0 01-4 4H22l-10 7v-7h-2a4 4 0 01-4-4V17a4 4 0 014-4z"/><path d="M17 24h.1M24 24h.1M31 24h.1"/></svg>`
    };
    return icons[name] || icons.device;
  }

  function escapeHtml(value){
    return String(value ?? "").replace(/[&<>"']/g, char=>({
      "&":"&amp;",
      "<":"&lt;",
      ">":"&gt;",
      '"':"&quot;",
      "'":"&#39;"
    }[char]));
  }

  function markActiveNav(){
    const page=document.body?.dataset?.page || "home";
    document.querySelectorAll("nav a[data-page-link]").forEach(link=>{
      link.classList.toggle("active", link.dataset.pageLink===page);
    });
  }

  function configureSupportLinks(){
    const email=String(config.supportEmail || "").trim();
    document.querySelectorAll("[data-support-email]").forEach(link=>{
      link.textContent=email || "Contact";
      if(email) link.href=`mailto:${email}`;
    });
  }

  function init(){
    if(document.body?.dataset?.page==="home"){
      document.title=`${config.productName || "Electron"} - ${config.subtitle || "RFID Intelligence Platform"}`;
    }
    setText("portalTagline", config.tagline);
    setText("previewVersion", config.previewVersion);
    setText("buildLabel", config.buildLabel);
    setText("footerCredit", config.footerCredit);
    setText("assistanceCredit", config.assistanceCredit);
    configureDownloads();
    configureSupportLinks();
    renderFeatures();
    configureModuleDialog();
    markActiveNav();
  }

  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
