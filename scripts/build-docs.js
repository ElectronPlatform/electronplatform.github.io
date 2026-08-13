"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { marked } = require("marked");
const sanitizeHtml = require("sanitize-html");
const { JSDOM } = require("jsdom");

const root = path.resolve(__dirname, "..");
const sourceDirectory = path.join(root, "docs", "public-preview-1");
const outputDirectory = path.join(root, "documentation", "public-preview-1");
const stagingDirectory = path.join(root, ".documentation-staging");
const templatePath = path.join(root, "templates", "documentation.html");
const checkOnly = process.argv.includes("--check");
const publicScreenshotPrefix = "https://raw.githubusercontent.com/ElectronPlatform/electron-rfid-intelligence-platform/main/docs/screenshots/";

const documents = [
  {
    source: "INSTALLATION_GUIDE.md",
    output: "installation.html",
    label: "Installation Guide",
    description: "Install, verify and start Electron Public Preview 1 safely."
  },
  {
    source: "QUICK_START.md",
    output: "quick-start.html",
    label: "Quick Start",
    description: "Connect a Proxmark3 and complete your first safe scan with Electron."
  },
  {
    source: "USER_GUIDE.md",
    output: "user-guide.html",
    label: "User Guide",
    description: "Learn the Electron workspaces, records, reports and everyday workflows."
  },
  {
    source: "PUBLIC_PREVIEW_NOTICE.md",
    output: "notice.html",
    label: "Public Preview Notice",
    description: "Read the responsibilities and safety boundaries for Electron Public Preview 1."
  },
  {
    source: "KNOWN_LIMITATIONS.md",
    output: "limitations.html",
    label: "Known Limitations",
    description: "Review current platform, hardware and workflow limitations."
  },
  {
    source: "FAQ.md",
    output: "faq.html",
    label: "FAQ",
    description: "Answers to common questions about Electron Public Preview 1."
  },
  {
    source: "RELEASE_NOTES_PUBLIC_PREVIEW_1.md",
    output: "release-notes.html",
    label: "Release Notes",
    description: "See what is included in Electron Public Preview 1."
  },
  {
    source: "SUPPORT.md",
    output: "support.html",
    label: "Support Guide",
    description: "Find safe troubleshooting and feedback guidance for Electron."
  },
  {
    source: "CHANGELOG.md",
    output: "changelog.html",
    label: "Changelog",
    description: "Review the public change history for Electron Public Preview 1."
  }
];

const outputBySource = new Map(documents.map(document => [document.source.toLowerCase(), document.output]));

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[character]));
}

function replaceToken(template, token, value) {
  const marker = `{{${token}}}`;
  if (!template.includes(marker)) {
    throw new Error(`Template marker ${marker} is missing.`);
  }
  return template.split(marker).join(value);
}

function headingSlug(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "section";
}

function rewriteDocumentHref(href) {
  if (!href || href.startsWith("#") || /^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("//")) {
    return href;
  }

  const [pathname, fragment] = href.split("#", 2);
  const sourceName = path.basename(decodeURIComponent(pathname)).toLowerCase();
  const output = outputBySource.get(sourceName);
  if (!output) {
    return href;
  }
  return fragment ? `${output}#${fragment}` : output;
}

function localWebsiteScreenshot(source) {
  if (!source || !source.startsWith(publicScreenshotPrefix)) {
    return source;
  }
  const filename = source.slice(publicScreenshotPrefix.length);
  if (!/^[a-z0-9][a-z0-9-]*\.png$/i.test(filename)) {
    throw new Error(`Unsupported public screenshot path: ${source}`);
  }
  return `../../images/screenshots/${filename.replace(/\.png$/i, ".webp")}`;
}

function renderMarkdown(source) {
  const parsed = marked.parse(source, { gfm: true });
  const dom = new JSDOM(`<body>${parsed}</body>`);
  const { document } = dom.window;
  const usedSlugs = new Map();

  document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach(heading => {
    const base = headingSlug(heading.textContent || "");
    const occurrence = (usedSlugs.get(base) || 0) + 1;
    usedSlugs.set(base, occurrence);
    heading.id = occurrence === 1 ? base : `${base}-${occurrence}`;
  });

  document.querySelectorAll("a[href]").forEach(link => {
    link.setAttribute("href", rewriteDocumentHref(link.getAttribute("href")));
  });

  document.querySelectorAll("img").forEach(image => {
    image.setAttribute("src", localWebsiteScreenshot(image.getAttribute("src")));
    image.setAttribute("loading", "lazy");
  });

  document.querySelectorAll("table").forEach(table => {
    const wrapper = document.createElement("div");
    wrapper.className = "documentationTableWrap";
    table.replaceWith(wrapper);
    wrapper.appendChild(table);
  });

  return sanitizeHtml(document.body.innerHTML, {
    allowedTags: [
      "h1", "h2", "h3", "h4", "h5", "h6", "p", "br", "hr",
      "ul", "ol", "li", "a", "img", "strong", "em", "b", "i",
      "code", "pre", "blockquote", "table", "thead", "tbody", "tr",
      "th", "td", "details", "summary", "span", "div", "figure",
      "figcaption", "abbr", "cite", "kbd", "samp", "sub", "sup",
      "time", "var", "del"
    ],
    allowedAttributes: {
      "*": ["id"],
      a: ["href", "title"],
      img: ["src", "alt", "title", "loading"],
      td: ["colspan", "rowspan"],
      th: ["colspan", "rowspan"],
      code: ["class"],
      pre: ["class"],
      div: ["class"]
    },
    allowedSchemes: ["https", "http", "mailto"],
    allowProtocolRelative: false
  });
}

function documentationMenu(activeDocument) {
  return documents.map(document => {
    const current = document === activeDocument ? ' aria-current="page"' : "";
    return `<a href="${document.output}"${current}>${escapeHtml(document.label)}</a>`;
  }).join("\n          ");
}

function pagerLink(document, direction) {
  if (!document) {
    return '<span class="documentationPagerSpacer"></span>';
  }
  const arrow = direction === "previous" ? "←" : "→";
  const caption = direction === "previous" ? "Previous" : "Next";
  const className = direction === "previous" ? "previous" : "next";
  const label = direction === "previous" ? `${arrow} ${document.label}` : `${document.label} ${arrow}`;
  return `<a class="${className}" href="${document.output}"><span>${caption}</span><strong>${escapeHtml(label)}</strong></a>`;
}

function buildPage(template, document, index) {
  const sourcePath = path.join(sourceDirectory, document.source);
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Required documentation source is missing: ${document.source}`);
  }

  let page = template;
  page = replaceToken(page, "PAGE_TITLE", escapeHtml(document.label));
  page = replaceToken(page, "PAGE_DESCRIPTION", escapeHtml(document.description));
  page = replaceToken(page, "CANONICAL_URL", `https://electronplatform.github.io/documentation/public-preview-1/${document.output}`);
  page = replaceToken(page, "DOCUMENTATION_MENU", documentationMenu(document));
  page = replaceToken(page, "DOCUMENT_CONTENT", renderMarkdown(fs.readFileSync(sourcePath, "utf8")));
  page = replaceToken(page, "PREVIOUS_LINK", pagerLink(documents[index - 1], "previous"));
  page = replaceToken(page, "NEXT_LINK", pagerLink(documents[index + 1], "next"));

  if (/{{[A-Z_]+}}/.test(page)) {
    throw new Error(`Unresolved template marker in ${document.output}.`);
  }
  return `${page.trim()}\n`;
}

function validateGeneratedPages(pages) {
  const outputNames = new Set(documents.map(document => document.output));
  const rootFiles = new Set();
  const websiteDom = new JSDOM(fs.readFileSync(path.join(root, "documentation.html"), "utf8"));
  const expectedNavigation = Array.from(
    websiteDom.window.document.querySelectorAll(".siteHeader nav a"),
    link => link.textContent.trim()
  );

  for (const [output, html] of pages) {
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const actualNavigation = Array.from(
      document.querySelectorAll(".siteHeader nav a"),
      link => link.textContent.trim()
    );
    if (document.querySelectorAll("h1").length !== 1) {
      throw new Error(`${output} must contain exactly one h1.`);
    }
    if (document.querySelectorAll('.documentationMenu a[aria-current="page"]').length !== 1) {
      throw new Error(`${output} must contain one active documentation navigation item.`);
    }
    if (JSON.stringify(actualNavigation) !== JSON.stringify(expectedNavigation)) {
      throw new Error(`${output} primary navigation does not match documentation.html.`);
    }
    if (document.querySelector("script:not([src])")) {
      throw new Error(`${output} contains an unexpected inline script.`);
    }

    document.querySelectorAll("a[href], img[src], script[src], link[href]").forEach(element => {
      const attribute = element.hasAttribute("href") ? "href" : "src";
      const value = element.getAttribute(attribute);
      if (!value || value.startsWith("#") || /^[a-z][a-z0-9+.-]*:/i.test(value) || value.startsWith("//")) {
        return;
      }
      const cleanValue = decodeURIComponent(value.split(/[?#]/, 1)[0]);
      const resolved = path.normalize(path.join("documentation", "public-preview-1", cleanValue));
      if (resolved.startsWith(`documentation${path.sep}public-preview-1${path.sep}`)) {
        const generatedName = path.basename(resolved);
        if (!outputNames.has(generatedName)) {
          throw new Error(`${output} links to missing generated page: ${value}`);
        }
      } else {
        rootFiles.add(resolved);
      }
    });
  }

  for (const relativePath of rootFiles) {
    if (!fs.existsSync(path.join(root, relativePath))) {
      throw new Error(`Generated documentation references missing website file: ${relativePath}`);
    }
  }
}

function main() {
  if (!fs.existsSync(templatePath)) {
    throw new Error("Documentation template is missing.");
  }

  const template = fs.readFileSync(templatePath, "utf8");
  const pages = new Map(documents.map((document, index) => [document.output, buildPage(template, document, index)]));
  validateGeneratedPages(pages);

  if (checkOnly) {
    for (const [output, html] of pages) {
      const publishedPath = path.join(outputDirectory, output);
      if (!fs.existsSync(publishedPath) || fs.readFileSync(publishedPath, "utf8") !== html) {
        throw new Error(`Generated documentation is not current: ${output}`);
      }
    }
    console.log(`PASS: ${pages.size} generated documentation pages are current and valid.`);
    return;
  }

  fs.rmSync(stagingDirectory, { recursive: true, force: true });
  fs.mkdirSync(stagingDirectory, { recursive: true });
  for (const [output, html] of pages) {
    fs.writeFileSync(path.join(stagingDirectory, output), html);
  }

  fs.rmSync(outputDirectory, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(outputDirectory), { recursive: true });
  fs.renameSync(stagingDirectory, outputDirectory);
  console.log(`PASS: generated ${pages.size} documentation pages.`);
}

try {
  main();
} catch (error) {
  console.error(`Documentation build failed: ${error.message}`);
  process.exitCode = 1;
}
