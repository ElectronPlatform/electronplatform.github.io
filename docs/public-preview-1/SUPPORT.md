# Electron Public Preview 1 Support Guide

Electron support is based on clear evidence and user-controlled sharing.
Nothing is uploaded automatically.

Official support information:

<https://electronplatform.github.io/support.html>

Official contact route:

<https://electronplatform.github.io/contact.html>

Official support email:

<electron.platform@gmail.com>

## Before asking for help

1. Read the [Quick Start](QUICK_START.md).
2. Check [Known Limitations and Issues](KNOWN_LIMITATIONS.md).
3. Search the [FAQ](FAQ.md).
4. Restart Electron and reconnect the Proxmark3 if the problem concerns an
   interrupted device session.
5. Confirm that no other application is using the PM3 serial port.

## Describe the problem

Include:

- what you were trying to do;
- the exact steps you followed;
- what you expected;
- what happened instead;
- Electron version and operating system;
- Proxmark3 model, PM3 client and firmware information when relevant;
- whether USB was detected and whether an active session was connected;
- the text of any error message.

Avoid descriptions such as “it does not work” without the steps and observed
result.

## Feedback packages

Select **Send Feedback** in Electron to prepare a local package. Depending on
your choices, it may contain:

- your description;
- selected screenshots;
- selected application logs;
- selected device-console output;
- limited application status.

Electron does not send the package automatically. Open and inspect it before
sharing.

Remove:

- private keys and authentication material;
- card dumps;
- full payment-card data;
- personal information;
- customer information;
- private filesystem paths;
- information unrelated to the reported problem.

## Screenshots

Screenshots are useful when they show:

- the complete status card or error;
- which workspace is open;
- the relevant button and result;
- no unrelated private information.

Crop or redact sensitive information before sharing.

## Preview access and extension requests

The standard Preview lasts 30 days from first launch. If more approved testing
time is needed:

1. Open **Settings → Preview Access**.
2. Select **Request Additional Testing Time**.
3. Electron opens the official contact page in the default web browser.
4. Email Electron Support from that page and include the Installation ID shown
   in Preview Access, the current status and why more testing time is needed.
5. If approved, Electron Support supplies a signed Preview Extension Key.
6. Paste the complete key in Preview Access and select **Apply Extension Key**.

Nothing is sent automatically. A Preview Extension Key is normally tied to one Installation
ID and does not delete or replace Collection data.

If Electron pauses access after repeated complete device-verification
mismatches, request a device review through the same official support route.

## GitHub Issues

Use GitHub Issues only in the repository identified by the official Electron
website or release. Do not assume every visible ElectronPlatform repository is
the application support tracker.

Before posting publicly, remove private RFID data and search for an existing
report.

## Other ways to help

Support is not limited to financial contributions. Useful testing, clear bug
reports, documentation corrections and verified compatibility observations
are equally valuable.

Voluntary financial support:

- does not affect Preview access;
- does not buy features, deadlines or individual support;
- is configured only through the official Support page;
- is never processed inside the Electron application.

## Response expectations

Electron is an actively developed project. A support request does not
guarantee an immediate response, a specific fix or compatibility with every
hardware and firmware combination.

Clear, reproducible evidence gives a report the best chance of being useful.
