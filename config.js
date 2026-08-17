window.ELECTRON_PORTAL_CONFIG = {
  productName: "Electron",
  subtitle: "RFID Intelligence Platform",
  previewVersion: "0.8.0",
  buildLabel: "Early Public Preview",
  siteUrl: "https://electronplatform.github.io",
  repositoryUrl: "https://github.com/ElectronPlatform/electron-rfid-intelligence-platform",
  downloadUrl: "https://github.com/ElectronPlatform/electron-rfid-intelligence-platform/releases/download/v0.8.0-early-preview.1/Electron-Preview-0.8.0-arm64.dmg",
  downloadStatusText: "Electron Early Public Preview 1 is available for macOS Apple Silicon and Apple Intel.",
  releaseCandidate: {
    version: "0.8.0",
    buildDate: "2 August 2026 (arm64); 17 August 2026 (x64)",
    bundleId: "app.electronrfid.preview",
    filename: "Electron-Preview-0.8.0-arm64.dmg",
    sha256: "61fae56779c550fa0dc8a09ca47dcf26fdbb64f963a81d6750495530a5bd6d03",
    signingStatus: "Not Apple Developer ID signed",
    notarizationStatus: "Not notarized",
    provenanceStatus: "arm64: 4fdcec2714dd; x64: 73132225ddda"
  },
  downloads: {
    macosAppleSilicon: {
      url: "https://github.com/ElectronPlatform/electron-rfid-intelligence-platform/releases/download/v0.8.0-early-preview.1/Electron-Preview-0.8.0-arm64.dmg",
      availableLabel: "Download Electron Preview 1 (.dmg)",
      availableStatus: "Available now",
      availableNote: "Download the approved macOS installer from this page.",
      unavailableLabel: "Installer unavailable",
      status: "Installer unavailable",
      note: "The macOS installer link is temporarily unavailable."
    },
    macosIntel: {
      url: "https://github.com/ElectronPlatform/electron-rfid-intelligence-platform/releases/download/v0.8.0-early-preview.1/Electron-Preview-0.8.0-x64.dmg",
      availableLabel: "Download Electron Preview 1 (.dmg)",
      availableStatus: "Available now",
      availableNote: "Download the approved Apple Intel installer from this page.",
      unavailableLabel: "Installer being prepared",
      status: "Official Preview target",
      note: "Download the approved Apple Intel installer from this page."
    },
    windows: {
      url: "",
      availableLabel: "Download Electron Preview 1",
      availableStatus: "Available",
      availableNote: "Download the approved Windows installer from this page.",
      unavailableLabel: "Not yet available",
      status: "Not yet available",
      note: "Public Preview 1 support is not currently claimed for Windows."
    },
    linux: {
      url: "",
      availableLabel: "Download Electron Preview 1",
      availableStatus: "Available",
      availableNote: "Download the approved Linux installer from this page.",
      unavailableLabel: "Not yet available",
      status: "Not yet available",
      note: "Public Preview 1 support is not currently claimed for Linux."
    }
  },
  supportEmail: "electron.platform@gmail.com",
  support: {
    provider: "PayPal",
    url: "https://www.paypal.com/ncp/payment/SH3BTJERWR5XG",
    buttonLabel: "Support Electron with PayPal",
    unavailableLabel: "PayPal support is not currently enabled",
    expectationText: "Financial support is voluntary appreciation. It does not affect Preview access and does not purchase guaranteed features, timelines or individual support."
  },
  tagline: "Explore, understand and preserve RFID evidence in a local-first Collection.",
  footerCredit: "Created by Ronald Peters",
  assistanceCredit: "Developed with the assistance of OpenAI's ChatGPT and OpenAI Codex.",
  modules: [
    {
      id: "knowledge-engine",
      icon: "book",
      title: "Knowledge Engine",
      description: "Understand RFID families, card types, protocols and safe next steps in plain language.",
      actionLabel: "View details",
      actionTarget: "./features.html#knowledge-engine",
      dialogTitle: "Understand what Electron sees",
      dialogIntro: "Knowledge Engine turns verified RFID concepts into clear, source-aware explanations without removing the technical depth behind them.",
      details: [
        {
          title: "What it does",
          text: "Explains card families, protocols, terminology, evidence states and appropriate next steps in language that works for both new and experienced users."
        },
        {
          title: "Why it helps",
          text: "A scan result becomes understandable without requiring the user to begin with Proxmark3 command syntax, while uncertainty and source information remain visible."
        },
        {
          title: "Collection relationship",
          text: "Knowledge can explain and enrich a Collection record, but it never replaces the observations or evidence preserved with that record."
        },
        {
          title: "Current Preview scope",
          text: "The Preview foundation includes contextual RFID explanations and related guidance. Coverage expands only as additional knowledge is verified."
        }
      ]
    },
    {
      id: "card-intelligence",
      icon: "search",
      title: "Card Intelligence",
      description: "Turn scan output into a readable card profile with confidence, context and meaning.",
      actionLabel: "View details",
      actionTarget: "./features.html#card-intelligence",
      dialogTitle: "Turn scans into explainable findings",
      dialogIntro: "Card Intelligence organises device observations into a readable profile while keeping facts, interpretation and uncertainty distinct.",
      details: [
        {
          title: "What it does",
          text: "Interprets HF and LF scan output, identifies supported card families and presents readable characteristics with evidence and confidence context."
        },
        {
          title: "Why it helps",
          text: "Users can understand what Electron observed, what it concluded and what remains unknown instead of relying on an unexplained label."
        },
        {
          title: "Collection relationship",
          text: "A scan is temporary. Card Intelligence supplies observations and proposals that can enrich a durable Collection record without becoming a separate source of truth."
        },
        {
          title: "Current Preview scope",
          text: "Quick Scan, Explore Card, readable card profiles and the Card Viewer provide the current identification and inspection foundation."
        }
      ]
    },
    {
      id: "report-engine",
      icon: "report",
      title: "Report Engine",
      description: "Create structured TXT, DOC and PDF reports from one central Report Model.",
      actionLabel: "View details",
      actionTarget: "./features.html#report-engine",
      dialogTitle: "One source, consistent reports",
      dialogIntro: "Report Engine turns selected Electron information into structured documents without creating another competing data store.",
      details: [
        {
          title: "What it does",
          text: "Builds TXT, DOC and PDF output from a shared Report Model so each format can describe the same selected evidence consistently."
        },
        {
          title: "Why it helps",
          text: "Users can preserve, review or share a clear result without manually copying information from several workspaces."
        },
        {
          title: "Collection relationship",
          text: "Reports are derived views of accepted Collection information and explicit session context. They do not become the authoritative owner of card data."
        },
        {
          title: "Current Preview scope",
          text: "The current Early Public Preview supports structured local report generation and export."
        }
      ]
    },
    {
      id: "device-guard",
      icon: "shield",
      title: "Device Safety",
      description: "Keep hardware workflows predictable with device checks, capability checks and command safety.",
      actionLabel: "View details",
      actionTarget: "./features.html#device-guard",
      dialogTitle: "Predictable hardware workflows",
      dialogIntro: "Electron's device safety checks add context and lifecycle checks around reader operations so hardware behaviour remains understandable and controlled.",
      details: [
        {
          title: "What it does",
          text: "Checks device availability, reported capabilities and port ownership, and supports bounded command execution, cancellation and cleanup."
        },
        {
          title: "Why it helps",
          text: "It reduces confusing busy states, conflicting device sessions and actions that start without a compatible reader or a clear explanation."
        },
        {
          title: "Collection relationship",
          text: "Device safety checks protect hardware workflows and supply operational information. They do not decide card identity or own Collection records."
        },
        {
          title: "Current Preview scope",
          text: "The Preview reports USB availability, active-session state and diagnostic readiness, while existing command-safety controls remain in effect."
        }
      ]
    },
    {
      id: "device-studio",
      icon: "device",
      title: "Device Studio",
      description: "Understand connected hardware through verified capabilities, source-labelled diagnostics and guided explanations.",
      actionLabel: "View details",
      actionTarget: "./features.html#device-studio",
      dialogTitle: "Learn the hardware through verified capabilities",
      dialogIntro: "Device Studio presents the connected reader as an explainable technical system, from beginner guidance to source-labelled diagnostics.",
      details: [
        {
          title: "What it does",
          text: "Explains hardware components, firmware compatibility, diagnostics and available actions according to capabilities Electron can actually verify."
        },
        {
          title: "Why it helps",
          text: "New users can discover the reader visually, while experienced users can inspect technical evidence without Electron pretending unsupported features exist."
        },
        {
          title: "Collection relationship",
          text: "Device Studio supplies hardware context and diagnostic evidence. It never determines the durable identity of an RFID Collection record."
        },
        {
          title: "Current Preview scope",
          text: "Core workflows remain available with compatible stock Proxmark3 firmware. Additional structured hardware status appears only when connected firmware reports it."
        }
      ]
    },
    {
      id: "rfid-collection",
      icon: "feedback",
      title: "RFID Collection",
      description: "Keep identified cards, observations, evidence and history together in one durable local Collection.",
      actionLabel: "View details",
      actionTarget: "./features.html#rfid-collection",
      dialogTitle: "The durable centre of Electron",
      dialogIntro: "RFID Collection preserves the lasting record of the user's RFID work while scans, physical card presence and analysis sessions remain temporary.",
      details: [
        {
          title: "What it does",
          text: "Keeps locally managed RFID records together with their accepted observations, identifying evidence, notes, artefacts and history."
        },
        {
          title: "Why it helps",
          text: "Users can return to an asset over time, compare new evidence with earlier work and preserve context beyond one hardware session."
        },
        {
          title: "Platform relationship",
          text: "Card Lab, scanning, knowledge, reports and device tools all create, explain or enrich Collection work instead of owning competing card databases."
        },
        {
          title: "Current Preview scope",
          text: "The Preview supports local Collection records, RFID Tag editing, comparisons, labels, history, backups and user-controlled imports and exports."
        }
      ]
    }
  ]
};
