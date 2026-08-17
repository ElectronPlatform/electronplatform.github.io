"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { JSDOM } = require("jsdom");

const root = path.resolve(__dirname, "..");
const host = "electronplatform.github.io";
const endpoint = "https://api.indexnow.org/indexnow";
const keyFiles = fs.readdirSync(root).filter(name => /^[a-f0-9]{32}\.txt$/.test(name));

if (keyFiles.length !== 1) {
  throw new Error(`Expected exactly one IndexNow key file, found ${keyFiles.length}.`);
}

const keyFile = keyFiles[0];
const key = fs.readFileSync(path.join(root, keyFile), "utf8").trim();
if (`${key}.txt` !== keyFile) {
  throw new Error("The IndexNow key filename and file content must match.");
}

const sitemapXml = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const sitemap = new JSDOM(sitemapXml, { contentType: "text/xml" }).window.document;
const urlList = Array.from(sitemap.querySelectorAll("loc"), element => element.textContent.trim());

if (!urlList.length || urlList.some(url => new URL(url).host !== host)) {
  throw new Error("sitemap.xml must contain at least one URL and every URL must belong to the Electron host.");
}

async function main() {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
      host,
      key,
      keyLocation: `https://${host}/${keyFile}`,
      urlList
    })
  });

  if (response.status !== 200 && response.status !== 202) {
    const responseBody = (await response.text()).trim();
    throw new Error(`IndexNow returned HTTP ${response.status}${responseBody ? `: ${responseBody}` : ""}.`);
  }

  const meaning = response.status === 202
    ? "accepted; key verification is pending"
    : "accepted";
  console.log(`PASS: IndexNow ${meaning} ${urlList.length} Electron URLs (HTTP ${response.status}).`);
}

main().catch(error => {
  console.error(`IndexNow submission failed: ${error.message}`);
  process.exitCode = 1;
});
