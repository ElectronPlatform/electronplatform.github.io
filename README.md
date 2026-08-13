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

The Portal is the official public information layer for Electron. It introduces
Electron as a local-first RFID Collection and evidence platform, shows the
current Preview status, explains the capability-based firmware policy, provides
documentation and screenshots, and identifies the official support route.

Public responsibilities are intentionally separated:

- The website contains official product information, download status,
  documentation, screenshots and support guidance.
- GitHub contains public source repositories, releases, issues and development
  information as each resource is published.

The Portal is split into separate pages:

- `index.html` introduces Electron and shows the Electron Core.
- `preview.html` contains Preview release, download and tester information.
- `download.html` is the official download-status, installation and first-launch
  guide.
- `features.html` explains the Electron modules.
- `documentation.html` contains the current public guidance and website/GitHub
  role split.
- `about.html` contains project background, philosophy and credits.
- `support.html` explains community participation and the optional external
  financial-support route.
- `contact.html` contains the official support and feedback route.

Downloads are not embedded in the website source. Platform availability,
button labels and approved release URLs are configured centrally in:

```text
config.js
```

The public GitHub Pages URL must remain:

```text
https://electronplatform.github.io
```

Because the repository is named `electronplatform.github.io`, the website files
belong at the repository root when publishing through GitHub Pages.

Public product copy should preserve these current decisions:

- the RFID Collection is Electron's durable centre;
- compatible stock Proxmark3 firmware supports core Preview workflows;
- additional Device Studio status appears only when the connected firmware
  reports the required capabilities;
- unavailable hardware capabilities remain explicit rather than guessed or
  presented as errors requiring an automatic firmware change.

On `features.html`, the six module cards open accessible detail dialogs. Their
hash links remain stable so links from the homepage or an external page can
open the matching explanation directly. Keep the separate firmware comparison
visible on the page because it applies across modules rather than belonging to
one module.

The website uses relative paths such as `./css`, `./js`, `./images` and
`./assets`, making it portable to any static web server.

Public documentation snapshots for a release belong under
`docs/<release-name>/`. Markdown remains the authoritative source. The
Documentation page links to generated, branded HTML under
`documentation/<release-name>/`, so visitors stay within the public Electron
website. Do not publish internal plans, handoffs, constitutions or unfinished
legal drafts in this folder.

The Public Preview 1 snapshot currently contains the Installation Guide, Quick
Start, User Guide, Public Preview Notice, Known Limitations and Issues, FAQ,
Support Guide, Release Notes and Changelog. Keep these generated from the
approved application-repository sources before publication. These files must
not be edited independently in this repository. The generation manifest permits
only small publication-path adjustments where a target requires them.

From the sibling application repository, update and verify them with:

```text
npm run docs:sync:website
npm run docs:check:website
```

Website HTML, navigation, styling and website-only wording remain owned and
edited in this repository.

## Release Distribution

Keep release packages separate from the GitHub Pages source so the website
remains a simple static presentation layer. The final approved host may be a
GitHub release or another official release location.

When a public Preview package is ready, publish the package, checksums, release
notes, licence notices and corresponding source information together. Then
update the matching platform entry under `downloads` and the shared
`downloadStatusText` in `config.js`. The legacy `downloadUrl` remains a MacOs
fallback until the first approved package is published.

## Local Preview

Install the documentation build dependencies and generate the public pages:

```text
npm install
npm run build:docs
```

Then run `npm run preview` and open `http://localhost:8080`. Use
`npm run check:docs` to verify that all generated pages are current and valid.
The published site remains fully static; Node.js is used only while generating
and validating the documentation.

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

- Platform download URLs and status: `config.js`
- Shared download status: `config.js`
- Documentation source-to-page mapping: `scripts/build-docs.js`
- Documentation page template: `templates/documentation.html`
- Preview version: `config.js`
- Footer credits: `config.js`
- Feature cards: `config.js`
- Feature-dialog behaviour: `js/portal.js`
- Visual style: `css/styles.css`
- Browser logic: `js/portal.js`
- Images: `images/`
- Public screenshots: `images/screenshots/`
- Public release-document snapshots: `docs/`
- Generated public documentation pages: `documentation/`
- Static assets: `assets/`
- Support email: `config.js`
- External support provider, label, URL and expectation text: `config.js`

## Design Direction

The visual identity should follow the Electron splash screen:

- dark navy / black background
- electric blue core
- orbit lines with moving light points
- calm, professional, platform-focused
- one clear Preview or download-status action
