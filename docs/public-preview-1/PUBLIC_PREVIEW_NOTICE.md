# Public Preview Notice

Electron Public Preview is test software. It may contain errors, stop working
or produce incomplete results.

Electron Early Public Preview 1 is publicly available through the verified
download on the official Electron website.

## Distribution status

This Early Public Preview is distributed without Apple Developer ID signing
or Apple notarization. MacOs may therefore ask the user to confirm the
application during first launch. Verify the official source revision and the
published SHA-256 before using the installer, then follow only Apple's normal
**Open** or **Open Anyway** workflow.

The published DMG is paired with its public GitHub source revision, SHA-256 and
matching source archives. Download it only through the official website or its
linked GitHub release.

## 30-day Preview period

- The standard Preview period begins when the installed Preview is launched for
  the first time.
- The full application remains available for 30 days.
- Electron shows a reminder during the final five days.
- After day 30, Electron opens the expiry screen instead of the full
  application.
- Saved Collection data is not deleted when the Preview expires.
- Approved testers may request a signed Preview Extension Key tied to their
  Installation ID.
- Preview Extension Key validation happens locally. No internet account or automatic upload is
  required.

## Local device verification

Electron records privacy-preserving hashes of available local machine and
network signals so a Preview installation can recognise the Mac on which it
started. Raw MAC addresses and the raw platform machine identifier are not
stored or uploaded.

One matching signal is sufficient. Missing signals do not count as a mismatch,
and small hardware changes are tolerated. Access is paused only after three
consecutive launches where all available signals differ. A legitimate hardware
change can be reviewed by Electron Support and restored with a signed,
short-lived recovery token.

## What participation means

- Features, screens and data structures may change.
- Hardware and firmware combinations may behave differently.
- A detected device or recognised card family does not guarantee that every
  value can be read.
- You remain responsible for your computer, Proxmark3, RFID items and stored
  data.
- Keep independent backups outside Electron.
- Check important results before relying on them.
- Use only RFID items that you own or are authorised to test.

The Preview is provided for evaluation. Fault-free operation, suitability for
a particular purpose and recovery of lost data cannot be guaranteed.

## Sending feedback

Select **Send Feedback** in Electron and describe:

1. what you were trying to do;
2. the steps that led to the issue;
3. what you expected;
4. what happened instead.

You may choose to include a screenshot, log or device output. Electron creates
a local package for review; it is not uploaded automatically. Inspect the
package and remove card data, keys, dumps, payment information, private paths
or other sensitive information before sharing it through the official Preview
support channel.

## Short onboarding acceptance

> I understand that Electron is preview software. I will keep independent
> backups, verify important results, use only RFID items I own or am authorised
> to test, and review any feedback package before sharing it.

See the official
[Documentation page](https://electronplatform.github.io/documentation.html)
for installation, user and support guidance.
