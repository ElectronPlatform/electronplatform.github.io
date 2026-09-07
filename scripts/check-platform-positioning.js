"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { JSDOM } = require("jsdom");

const root = path.resolve(__dirname, "..");

function documentFor(file) {
  return new JSDOM(fs.readFileSync(path.join(root, file), "utf8")).window.document;
}

function textFor(document, selector, attribute) {
  const element = document.querySelector(selector);
  if (!element) throw new Error(`Missing ${selector}.`);
  return attribute ? element.getAttribute(attribute) || "" : element.textContent || "";
}

const productMetadata = [
  ["index.html", "title"],
  ["index.html", 'meta[name="description"]', "content"],
  ["index.html", 'meta[property="og:title"]', "content"],
  ["about.html", 'meta[name="description"]', "content"],
  ["about.html", 'meta[property="og:description"]', "content"],
  ["features.html", "title"],
  ["features.html", 'meta[property="og:title"]', "content"]
];

for (const [file, selector, attribute] of productMetadata) {
  const value = textFor(documentFor(file), selector, attribute);
  if (/Proxmark|\bPM3\b/i.test(value)) {
    throw new Error(`${file} ${selector} still defines Electron's product positioning through Proxmark3.`);
  }
}

const homepage = documentFor("index.html");
const softwareGraph = JSON.parse(textFor(homepage, 'script[type="application/ld+json"]'))["@graph"];
const softwareDescription = softwareGraph.find(entry => entry["@type"] === "SoftwareApplication")?.description || "";
if (!/local-first RFID Collection and evidence platform/i.test(softwareDescription) || /Proxmark|\bPM3\b/i.test(softwareDescription)) {
  throw new Error("Homepage SoftwareApplication metadata must describe Electron as a hardware-neutral RFID Collection and evidence platform.");
}

const aboutText = documentFor("about.html").body.textContent || "";
if (!aboutText.includes("Proxmark3 is Electron's first implemented RFID hardware provider.")) {
  throw new Error("About must identify Proxmark3 as Electron's first implemented RFID hardware provider.");
}

for (const [file, phrase] of [
  ["features.html", "Compatible stock Proxmark3 firmware supports core Electron workflows"],
  ["download.html", "Connect the Proxmark3 directly by USB"],
  ["preview.html", "Core workflows support compatible stock Proxmark3 firmware"]
]) {
  const source = fs.readFileSync(path.join(root, file), "utf8");
  if (!source.includes(phrase)) {
    throw new Error(`${file} must retain its legitimate current Proxmark3 requirement.`);
  }
}

console.log("PASS: platform positioning is hardware-neutral while current Proxmark3 requirements remain explicit.");
