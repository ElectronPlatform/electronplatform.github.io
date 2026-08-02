# Changelog

This changelog records public, user-visible Electron releases. Internal
development checkpoints and historical sprint notes are intentionally omitted.

## [0.8.0] — Public Preview 1 release candidate

**Public release status:** not published.

### Added

- Guided Card Lab HF and LF identification workflows.
- Card Viewer for reviewing stored read evidence.
- Local Collection and RFID Tag record management.
- Shared RFID Tag Picker for RFID Tag, Restore Helper, Compare and Labels.
- Device Console with command library and command-safety controls.
- Device Studio PCB Explorer and safe, read-only diagnostics.
- Research, History and Change Log workspaces.
- Local reports and user-controlled feedback packages.
- Shared workflow-progress panel for supported scans and analysis.
- Clear connection status separating USB detection, active PM3 session and
  diagnostic availability.
- Thirty-day Preview access with signed extension and recovery tokens.
- Privacy-preserving, tolerant local device verification.

### Changed

- RFID-related workspaces no longer silently select a Collection record.
- Change Log tables use compact summaries with full details in the existing
  detail view.
- Card Viewer distinguishes reported, observed and inferred evidence and no
  longer accepts temporary physical-card notes that disappear after the
  session.
- Public Preview packages hide maintainer authoring, hotspot calibration,
  Engineering Mode and the internal build checklist.
- Public wording uses Device Connection, Compatibility and Diagnostics instead
  of the former user-facing internal name.

### Safety and privacy

- Device Studio remains diagnostic and read-only.
- Feedback packages are created locally and are never uploaded automatically.
- Saved Collection data remains local unless the user explicitly exports or
  shares it.
- Raw MAC addresses and raw machine identifiers are not stored for Preview
  device verification.
- Legacy `EP-EXT` values are rejected; approved access changes require signed
  tokens.

### Known limitations

- Public Preview 1 is deliberately unsigned and not notarized; final
  clean-machine acceptance remains open.
- Public Preview 1 support is currently limited to the approved MacOs Apple
  Silicon package when it becomes available.
- Hardware and firmware combinations can expose different information.
- Some hardware fields correctly remain **Unknown**.
- Electron Public Preview License v1.0 has been selected. The exact
  corresponding Proxmark3 source release must still be completed before public
  distribution.

See [Known Limitations and Issues](KNOWN_LIMITATIONS.md) and the
[Public Preview 1 Release Notes](RELEASE_NOTES_PUBLIC_PREVIEW_1.md).
