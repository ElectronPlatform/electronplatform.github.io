# Known Limitations and Issues

This list describes confirmed limits and known release issues for Public
Preview 1. It is not a roadmap or a list of promised features.

## Public Preview limitations

- Workflows, labels and stored-data structures may still change.
- The Electron Engine currently provides a read-only background foundation and
  shared connection-status information. A complete guided diagnostic workflow
  is not part of this Preview.
- Some hardware fields remain **Unknown** when the PM3 client or firmware does
  not report evidence for them.
- Support has not been verified across every Proxmark3 board and firmware
  combination.
- Only one program can normally use the PM3 serial connection at a time.
- Multiple simultaneous Proxmark3 devices are not supported as a normal
  workflow.

## Hardware and firmware dependencies

- Available scan and diagnostic data depends on the PM3 client, firmware,
  FPGA image, board type and connected RFID item.
- Stock firmware may expose less structured status information than the
  Device Studio development firmware.
- Stable device serial number, PCB revision, LED brightness, authoritative
  busy state, temperature and power-sensor data may not be available.
- Short physical LED pulses are not guaranteed to be mirrored perfectly in the
  application.
- Device Studio does not guess a component state when firmware evidence is
  absent.

## Distribution and installation limitations

- No public installer is available yet.
- The Early Public Preview candidate is not Apple Developer ID signed and is
  not notarized. The internal package uses only local ad-hoc signing for bundle
  integrity, which is not equivalent to Apple Developer ID signing.
- The bundled Apple Silicon PM3 client now links only to MacOs system
  libraries, but a full clean-machine release test is still required.
- The exact corresponding Proxmark3 source bundle and build provenance must be
  completed for any release that includes GPL-covered PM3 binaries.
- The Electron Public Preview License v1.0 has been selected for Public Preview
  1 and must be included with the release.
- Windows and Linux packaging targets exist in project configuration, but
  Public Preview 1 support is not claimed until those packages are built and
  tested.

## Deliberately not available in Preview 1

- Maintainer hotspot calibration and component-authoring tools in public
  packages.
- Engineering Mode and the internal Preview Build Checklist in public
  packages.
- Firmware flashing, FPGA reconfiguration, RFID writing, cloning, emulation or
  attack workflows inside Device Studio.
- Full live RF visualisation and background hardware monitoring.
- Automatic cloud upload of Collection data or feedback packages.

Device Console and Restore Helper can expose expert or potentially mutating
commands. Their presence does not replace authorisation, command review or a
verified backup.

## Preview access limitations

- The standard Preview provides 30 days of full access from first launch.
- Reinstalling does not promise a new Preview period.
- Additional testing time and device-verification recovery require an approved
  signed Preview Extension Key tied to the Installation ID.
- Device verification is local and tolerant, but it is not an online account
  or a guarantee against deliberate application modification.
- There is no online token revocation or account recovery service.

## Known user-facing issues

- Short physical LED activity may finish before the application can observe
  and mirror it.
- A PM3 device can appear over USB while its active session is unavailable
  because another application owns the serial port.
- Some advanced PM3 commands can be available in Device Console without a
  guided Electron explanation.
- Preview data structures may change. A later build may require specific
  migration instructions.

See the official
[Documentation page](https://electronplatform.github.io/documentation.html)
for common explanations and
[Support](https://electronplatform.github.io/support.html) for reporting an
issue.
