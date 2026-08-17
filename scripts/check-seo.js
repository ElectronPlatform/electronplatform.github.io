"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { JSDOM } = require("jsdom");

const root = path.resolve(__dirname, "..");
const origin = "https://electronplatform.github.io";
const documentationDirectory = path.join(root, "documentation", "public-preview-1");
const pagePaths = [
  ...fs.readdirSync(root)
    .filter(name => name.endsWith(".html"))
    .sort(),
  ...fs.readdirSync(documentationDirectory)
    .filter(name => name.endsWith(".html"))
    .sort()
    .map(name => path.join("documentation", "public-preview-1", name))
];

function fail(message) {
  throw new Error(message);
}

function canonicalFor(relativePath) {
  return relativePath === "index.html" ? `${origin}/` : `${origin}/${relativePath}`;
}

function requiredMeta(document, selector, pagePath) {
  const element = document.querySelector(selector);
  const content = element?.getAttribute("content")?.trim();
  if (!content) {
    fail(`${pagePath} is missing ${selector}.`);
  }
  return content;
}

function validateStructuredData(document, pagePath) {
  const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
  if (pagePath === "index.html" || pagePath.startsWith("documentation/public-preview-1/")) {
    if (scripts.length !== 1) {
      fail(`${pagePath} must contain exactly one JSON-LD block.`);
    }
  }
  for (const script of scripts) {
    try {
      JSON.parse(script.textContent);
    } catch {
      fail(`${pagePath} contains invalid JSON-LD.`);
    }
  }
}

const titles = new Map();
const descriptions = new Map();
const canonicals = new Map();
const indexableUrls = new Set();

for (const pagePath of pagePaths) {
  const html = fs.readFileSync(path.join(root, pagePath), "utf8");
  const document = new JSDOM(html).window.document;
  const title = document.title.trim();
  const description = requiredMeta(document, 'meta[name="description"]', pagePath);
  const robots = requiredMeta(document, 'meta[name="robots"]', pagePath).toLowerCase();
  const canonical = document.querySelector('link[rel="canonical"]')?.href?.trim();
  const expectedCanonical = canonicalFor(pagePath);

  if (document.documentElement.lang !== "en") {
    fail(`${pagePath} must declare lang="en".`);
  }
  if (!title || title.length > 65) {
    fail(`${pagePath} has an empty or overly long title (${title.length} characters).`);
  }
  if (description.length < 50 || description.length > 180) {
    fail(`${pagePath} description must be 50-180 characters (${description.length} found).`);
  }
  if (!robots.includes("index") || !robots.includes("follow") || robots.includes("noindex")) {
    fail(`${pagePath} must be indexable and followable.`);
  }
  if (canonical !== expectedCanonical) {
    fail(`${pagePath} canonical must be ${expectedCanonical}, found ${canonical || "none"}.`);
  }
  if (document.querySelectorAll("h1").length !== 1) {
    fail(`${pagePath} must contain exactly one h1.`);
  }

  const socialMetadata = {
    "og:site_name": "Electron RFID Intelligence Platform",
    "og:title": null,
    "og:description": null,
    "og:url": canonical,
    "og:image": null,
    "og:image:alt": null,
    "twitter:card": "summary_large_image"
  };
  for (const [name, expected] of Object.entries(socialMetadata)) {
    const selector = name.startsWith("og:")
      ? `meta[property="${name}"]`
      : `meta[name="${name}"]`;
    const value = requiredMeta(document, selector, pagePath);
    if (expected && value !== expected) {
      fail(`${pagePath} ${name} must match ${expected}, found ${value}.`);
    }
  }

  if (titles.has(title)) {
    fail(`${pagePath} duplicates the title from ${titles.get(title)}.`);
  }
  if (descriptions.has(description)) {
    fail(`${pagePath} duplicates the description from ${descriptions.get(description)}.`);
  }
  if (canonicals.has(canonical)) {
    fail(`${pagePath} duplicates the canonical from ${canonicals.get(canonical)}.`);
  }
  titles.set(title, pagePath);
  descriptions.set(description, pagePath);
  canonicals.set(canonical, pagePath);
  indexableUrls.add(canonical);
  validateStructuredData(document, pagePath);
}

const homepage = fs.readFileSync(path.join(root, "index.html"), "utf8");
if (!homepage.includes('name="google-site-verification"')) {
  fail("index.html must retain Google Search Console verification.");
}
if (!homepage.includes("Electron-Preview-0.8.0-arm64.dmg") || !homepage.includes("Electron-Preview-0.8.0-x64.dmg")) {
  fail("Homepage structured data must list both official macOS installers.");
}

const sitemapXml = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const sitemap = new JSDOM(sitemapXml, { contentType: "text/xml" }).window.document;
const sitemapUrls = new Set();
for (const entry of sitemap.querySelectorAll("url")) {
  const location = entry.querySelector("loc")?.textContent.trim();
  const lastModified = entry.querySelector("lastmod")?.textContent.trim();
  if (!location || !lastModified) {
    fail("Every sitemap entry must contain loc and lastmod.");
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(lastModified) || Number.isNaN(Date.parse(`${lastModified}T00:00:00Z`))) {
    fail(`Sitemap entry ${location} has invalid lastmod ${lastModified}.`);
  }
  if (sitemapUrls.has(location)) {
    fail(`Sitemap contains duplicate URL ${location}.`);
  }
  sitemapUrls.add(location);
}

const missingFromSitemap = [...indexableUrls].filter(url => !sitemapUrls.has(url));
const unexpectedInSitemap = [...sitemapUrls].filter(url => !indexableUrls.has(url));
if (missingFromSitemap.length || unexpectedInSitemap.length) {
  fail(`Sitemap mismatch. Missing: ${missingFromSitemap.join(", ") || "none"}. Unexpected: ${unexpectedInSitemap.join(", ") || "none"}.`);
}

const robotsTxt = fs.readFileSync(path.join(root, "robots.txt"), "utf8");
if (!/^User-agent:\s*\*$/m.test(robotsTxt) || !/^Allow:\s*\/$/m.test(robotsTxt)) {
  fail("robots.txt must allow public crawling.");
}
if (!robotsTxt.includes(`Sitemap: ${origin}/sitemap.xml`)) {
  fail("robots.txt must advertise the canonical sitemap URL.");
}

const spellingFiles = [
  ...pagePaths,
  "config.js",
  "templates/documentation.html",
  ...fs.readdirSync(path.join(root, "docs", "public-preview-1"))
    .filter(name => name.endsWith(".md"))
    .map(name => path.join("docs", "public-preview-1", name))
];
for (const relativePath of spellingFiles) {
  if (fs.readFileSync(path.join(root, relativePath), "utf8").includes("Mac" + "Os")) {
    fail(`${relativePath} contains an incorrectly capitalized macOS reference.`);
  }
}

console.log(`PASS: ${pagePaths.length} indexable pages have complete, unique SEO metadata and match sitemap.xml.`);
