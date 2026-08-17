# Electron Public Preview 1 Release Notes

**Application version:** 0.8.0

**Release targets:** macOS on Apple Silicon (arm64) and Apple Intel (x64)

**Current status:** published Early Public Preview

## Purpose

Public Preview 1 is published for early users to perform
workflow, hardware and compatibility testing. It focuses on clear evidence,
safe defaults and practical feedback.

## Distribution Status

Current build:

- Unsigned — it is not signed with an Apple Developer ID. The package
  uses only local ad-hoc signing for bundle integrity.
- Not notarized by Apple.
- Intended for experienced Early Public Preview testers.

The published architecture-specific builds are version 0.8.0 with bundle ID
`app.electronrfid.preview`. Their SHA-256 values and build dates are recorded on the
official Download page and GitHub release.

Later broader public releases are intended to be Apple Developer ID signed and
Apple notarized after the project joins Apple's Developer Program.

## Available in this Preview

- Workshop entry points for the main user tasks.
- Card Lab guided HF and LF identification.
- Card Viewer for reviewing stored read evidence.
- Collection and RFID Tag record management.
- Restore Helper, Compare and Labels workspaces.
- Device Console with command safety controls.
- Device Studio read-only hardware diagnostics.
- Research, History and Change Log views.
- Local reports and a reviewable feedback-package workflow.

## User experience and safety

- Similar workflows now share a live progress panel.
- RFID Tag, Restore Helper, Compare and Labels begin without silently choosing
  a record.
- The reusable RFID Tag Picker supports searching and sortable result columns.
- Change Log tables show short summaries while full details remain available
  in the detail view.
- Connection status separates USB detection, active PM3 session and available
  diagnostics.
- Potentially sensitive feedback attachments remain optional and are not
  uploaded automatically.

## Preview Boundary

Public packages hide Maintainer-only authoring tools, hotspot calibration,
Engineering Mode and the internal build checklist. The normal Device Studio
explorer, safe diagnostics, scans, Collection, reports and feedback remain
available.

## Preview access

- The standard Public Preview provides 30 days of full application access from
  first launch.
- Saved Collection data is not deleted when the Preview expires.
- Additional testing time requires a signed Preview Extension Key tied to the local
  Installation ID.
- Local device verification uses salted hashes rather than storing or
  uploading raw machine identifiers or MAC addresses.
- A single matching signal is sufficient, small hardware changes are
  tolerated, and access pauses only after three consecutive complete
  mismatches.
- A legitimate device change can be reviewed and restored with a signed,
  short-lived recovery token.

## Electron Engine and connection status

The Electron Engine supplies structured, read-only connection and compatibility
results in the background. Device Console and Device Studio present the same
connection states and recommended next action. It is not a separate workspace,
and a complete guided diagnostic workflow is not part of this Preview.

## RFID Tag workflows

The RFID Tag workspace starts with **No RFID tag selected**. Testers can create
a new record or use the shared picker to open an existing Collection record.
Restore Helper, Compare and Labels follow the same explicit-selection pattern.

## Card Viewer and evidence

Card Viewer follows **Evidence Before Inference**. Chip-reported data, observed
results and inferred explanations must remain distinguishable. Unsupported
values are shown as not reported or unknown instead of being invented.

## Known limitations

Compatibility depends on the Proxmark3 board, PM3 client, firmware and RFID
technology. The unsigned and non-notarized status is deliberately disclosed
for this Early Public Preview. The matching GPL corresponding source is
published with the release.
See [Known Limitations and Issues](KNOWN_LIMITATIONS.md) for the current list.

## Feedback

Select **Send Feedback** to create a local, reviewable package. Describe the
steps, expected result and actual result. Include screenshots, logs or device
output only when useful, and remove sensitive information before sharing the
package through the official Preview support channel.

This Preview should be used only with RFID items that the tester owns or is
authorised to test.

Installation, user and support instructions are available from the official
[Documentation page](https://electronplatform.github.io/documentation.html).
