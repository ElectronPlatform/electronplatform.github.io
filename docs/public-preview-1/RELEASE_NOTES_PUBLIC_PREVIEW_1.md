# Electron Public Preview 1 Release Notes

## Purpose

Public Preview 1 makes Electron available to a small group of real users for
workflow, hardware and compatibility testing. It focuses on clear evidence,
safe defaults and practical feedback.

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
technology. Public installer, signing, clean-machine portability, exact GPL
source pairing and the Electron application licence are still release gates.
See [Known Limitations](KNOWN_LIMITATIONS.md) for the current list.

## Feedback

Select **Send Feedback** to create a local, reviewable package. Describe the
steps, expected result and actual result. Include screenshots, logs or device
output only when useful, and remove sensitive information before sharing the
package through the official Preview support channel.

This Preview should be used only with RFID items that the tester owns or is
authorised to test.
