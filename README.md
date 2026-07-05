# Electron Portal

Static website foundation for the future Electron Portal.

Recommended local layout:

```text
~/Documents/Electron Portal/
├── portal/
│   ├── index.html
│   ├── config.js
│   ├── css/
│   ├── js/
│   ├── images/
│   └── assets/
├── downloads/
├── logs/
└── README.md
```

## Purpose

The Portal is presentation only. It introduces Electron, shows the Preview status,
links to future documentation, and points users to the Preview download.

The Portal is split into separate pages:

- `index.html` introduces Electron and shows the Electron Core.
- `preview.html` contains Preview release, download and tester information.
- `features.html` explains the Electron modules.
- `documentation.html` is the documentation foundation.
- `about.html` contains project background, philosophy and credits.

Downloads are intentionally not hosted by the website. Put Preview ZIPs and future
releases on Google Drive or another file host, then update the central URL in:

```text
portal/config.js
```

The site uses relative paths such as `./css`, `./js`, `./images` and `./assets`
so the `portal/` folder can be moved to another local folder or server later.

## Local Preview

Open this file in a browser:

```text
portal/index.html
```

No Node.js server is required for the current static version.

## Edit Points

- Download URL: `portal/config.js`
- Preview version: `portal/config.js`
- Footer credits: `portal/config.js`
- Feature cards: `portal/config.js`
- Visual style: `portal/css/styles.css`
- Browser logic: `portal/js/portal.js`
- Images: `portal/images/`
- Static assets: `portal/assets/`

## Design Direction

The visual identity should follow the Electron splash screen:

- dark navy / black background
- electric blue core
- orbit lines with moving light points
- calm, professional, platform-focused
- one clear Download Preview action
