# Electron Portal

Static website foundation for the public Electron Portal.

Live site:

```text
https://electronplatform.github.io
```

GitHub repository:

```text
https://github.com/ElectronPlatform/electronplatform.github.io
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
- `contact.html` contains the official support and feedback route.

Downloads are intentionally not hosted by the website. Put Preview ZIPs and future
releases on Google Drive or another file host, then update the central URL in:

```text
config.js
```

The public GitHub Pages URL must remain:

```text
https://electronplatform.github.io
```

Because the repository is named `electronplatform.github.io`, the website files
belong at the repository root when publishing through GitHub Pages.

The website uses relative paths such as `./css`, `./js`, `./images` and
`./assets`, making it portable to any static web server.

## Google Drive Distribution

Google Drive is the distribution and storage area. Keep it separate from GitHub
Pages so the website remains a simple static presentation layer.

Recommended folder meaning:

- `Releases/`: public Preview ZIPs, future releases, checksums and release notes.
- `Documents/`: manuals, PDF guides, public documentation exports and test notes.
- `Media/`: logos, screenshots, demo images and public promotional media.
- `Feedback/`: received tester feedback packages. Keep this private by default.

When a new Preview ZIP is ready, upload it to `Releases/`, copy the share link,
and update only `downloadUrl` in `config.js`.

## Local Preview

Open this file in a browser:

```text
index.html
```

No Node.js server is required for the current static version.

If you prefer a local web server during testing, run one inside the Portal folder
and open `http://localhost:8080`. A missing `favicon.ico` warning is harmless if
the browser asks for it before deployment.

## Publishing Workflow

Use GitHub Desktop with the local `ElectronPlatform/electronplatform.github.io`
repository:

1. Edit files directly in the `electronplatform.github.io` repository.
2. Commit.
3. Push.
4. GitHub Pages deploys automatically.

No router ports, WireGuard changes, local public web server, backend, login or
database are needed.

## Edit Points

- Download URL: `config.js`
- Preview version: `config.js`
- Footer credits: `config.js`
- Feature cards: `config.js`
- Visual style: `css/styles.css`
- Browser logic: `js/portal.js`
- Images: `images/`
- Static assets: `assets/`
- Support email: `config.js`

## Design Direction

The visual identity should follow the Electron splash screen:

- dark navy / black background
- electric blue core
- orbit lines with moving light points
- calm, professional, platform-focused
- one clear Download Preview action
