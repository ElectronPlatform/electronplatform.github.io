"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { JSDOM } = require("jsdom");

const root = path.resolve(__dirname, "..");
const configSource = fs.readFileSync(path.join(root, "config.js"), "utf8");
const portalSource = fs.readFileSync(path.join(root, "js", "portal.js"), "utf8");

const documentationDirectory = path.join(root, "documentation", "public-preview-1");
const cases = [
  {
    file: path.join(root, "index.html"),
    url: "https://electronplatform.github.io/index.html"
  }
].concat(
  fs.readdirSync(documentationDirectory)
    .filter(filename => filename.endsWith(".html"))
    .sort()
    .map(filename => ({
      file: path.join(documentationDirectory, filename),
      url: `https://electronplatform.github.io/documentation/public-preview-1/${filename}`
    }))
);

for (const testCase of cases) {
  const dom = new JSDOM(fs.readFileSync(testCase.file, "utf8"), {
    runScripts: "outside-only",
    url: testCase.url
  });

  dom.window.eval(configSource);
  dom.window.eval(portalSource);
  dom.window.document.dispatchEvent(new dom.window.Event("DOMContentLoaded"));

  const download = dom.window.document.getElementById("headerDownload");
  if (!download) {
    throw new Error(`Missing header download link: ${testCase.file}`);
  }

  const resolved = new URL(download.href);
  if (resolved.origin !== "https://electronplatform.github.io" || resolved.pathname !== "/download.html") {
    throw new Error(`Incorrect runtime download URL for ${testCase.url}: ${download.href}`);
  }
}

console.log(`PASS: ${cases.length} runtime header download links resolve to /download.html.`);
