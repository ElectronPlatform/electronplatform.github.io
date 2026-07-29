# Known Limitations

This list describes known limits of Public Preview 1. It is not a list of
planned features.

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

- A final signed and notarized public installer has not yet been confirmed.
- Clean-machine portability still requires release validation.
- The currently reviewed macOS PM3 client has local Homebrew runtime
  dependencies that must be resolved or reproduced for distribution.
- The exact corresponding Proxmark3 source bundle and build provenance must be
  completed for any release that includes GPL-covered PM3 binaries.
- The Electron application licence has not yet been selected.
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
