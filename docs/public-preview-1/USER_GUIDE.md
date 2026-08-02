# Electron Public Preview 1 User Guide

This first user guide covers the normal Public Preview workflow. It does not
replace the safety information in the [Public Preview Notice](PUBLIC_PREVIEW_NOTICE.md).

## 1. How Electron is organised

Electron is a local-first RFID Collection and evidence platform.

- **Collection** is the lasting record of RFID items you choose to save.
- **Scans** are temporary observations until you deliberately save useful
  information.
- **Device tools** operate and explain connected hardware.
- **Reports and feedback packages** are created locally and shared only when
  you choose.

Electron distinguishes direct evidence from observations, calculations and
inferences. **Unknown** means that the available evidence is insufficient.

## 2. First launch and Preview access

The standard Preview provides 30 days of full access from first launch.

Open **Settings → Preview Access** to see:

- Installation ID;
- installation date;
- days remaining;
- access end date;
- tester level;
- device-verification status.

Saved Collection data is not deleted when the Preview expires. Approved
additional testing time requires a signed Preview Extension Key tied to the Installation ID.

## 3. Main workspaces

### Workshop

Use Workshop when you know the task but not which technical workspace to open.
It provides entry points for Card Lab, Collection, Device Studio and advanced
tools.

### Collection

Collection lists saved RFID Tag records. Use it to:

- search and open records;
- review Collection health and backup status;
- import or export selected records;
- open one record in the RFID Tag workspace.

### RFID Tag

RFID Tag starts with **No RFID tag selected**.

- **Open RFID Tag...** opens the shared picker.
- **New RFID Tag** starts an empty record.
- Existing records show their Alias / Name and RFID Tag ID.

The picker searches RFID Tag ID and Alias / Name by default. Additional search
fields are available under **More Search Options**. Select a column heading to
sort results.

### Device Console

Device Console owns the active PM3 session and direct command workflows. It
shows:

- USB device detection;
- active-session state;
- diagnostic availability;
- recommended next action;
- command output.

Use **Check Device** to detect USB presence. Use **Connect Device** to start an
active PM3 session. Only one application can normally use the PM3 serial port
at a time.

Device Console is an expert surface. Read a command and its safety status
before running it.

### Device Studio

Device Studio explains connected Proxmark3 hardware through a PCB view,
component information and safe diagnostics.

Public Preview Device Studio:

- is diagnostic and read-only;
- does not flash firmware;
- does not reconfigure the FPGA;
- does not write, clone, emulate, restore or attack RFID items;
- reports unsupported information as Unknown;
- shows additional status only when hardware or firmware evidence supports it.

Use **Quick Refresh** for current status. Use **Full RF Check** only when you
want the explicit read-only RF measurements.

### Restore Helper

Restore Helper starts without a selected RFID Tag. Open a record, verify the
registered backup and review every generated command.

A generated command is not proof that the target is correct. Confirm:

- ownership or authorisation;
- exact card family and target;
- backup integrity;
- recovery path;
- effect of every command.

### Compare

Compare starts without selected records. Choose the source and destination
RFID Tags explicitly, then compare their registered backups. Loose-file
comparison remains separate.

### Labels

Labels starts without a selected RFID Tag. Choose a saved record, select the
label style and use Print Preview. Direct printing requires a configured label
printer.

### Scan / Intelligence

This workspace contains Card Lab:

- **Quick Scan** performs guided identification.
- **Explore Card** provides a deeper, family-aware workflow when supported.
- **Card Viewer** presents saved read details and evidence.

Keep the RFID item steady during a scan. The workflow panel shows the current
step and the read-only PM3 command Electron is observing.

### Research

Research stores user-created local research records and verified knowledge
context. Nothing is uploaded automatically.

### Electron Portal

Electron Portal provides Preview, support, licence, update and project
information. **Visit Electron Portal** opens the official website.

### History and Change Log

History presents stored RFID history and observations. Change Log shows
compact summaries of local record changes. Use **View full details** to inspect
previous and new values.

## 4. First safe scan

1. Connect the Proxmark3 by USB.
2. Open Device Console and select **Check Device**.
3. Select **Connect Device** if USB is detected but no session is active.
4. Open Workshop and choose **Card Lab**.
5. Place one authorised card or tag on the reader.
6. Select **Quick Scan**.
7. Wait for the workflow to finish.
8. Review the result and evidence sources.
9. Save only the information you intend to keep.

Do not treat a suggested family or inferred value as direct chip evidence.

## 5. Saving and backing up records

Collection data is local. Use Collection export and database backup tools to
keep an independent copy.

Before a risky test:

1. open the correct RFID Tag;
2. verify the current UID and card family;
3. register or create the required backup;
4. confirm that the backup can be found and read;
5. store another copy outside Electron.

An application reinstall is not a backup strategy.

## 6. Reports

Reports are derived from selected Electron information. Review a report before
sharing it, especially when it contains:

- UIDs or identifiers;
- screenshots;
- technical card data;
- local file paths;
- device or firmware information.

Electron does not make an unsafe disclosure safe merely by placing it in a
report.

## 7. Feedback

Select **Send Feedback** to create a local, reviewable package. Include the
steps, expected result and actual result. Add screenshots or logs only when
useful.

Nothing is uploaded automatically. Inspect and redact the package before
sending it through the official support route.

## 8. Settings

Settings contains:

- photo-storage quality for newly selected photos;
- Help Engine visibility;
- additional Device Command Safety rules;
- database management;
- Preview Access;
- backup storage location.

Public Preview does not expose Engineering Mode, maintainer hotspot authoring
or the internal Preview Build Checklist.

## 9. Updating or reinstalling

Quit Electron before replacing the application with a newer approved build.
Read that build's release notes and back up the Collection first.

Replacing the application normally preserves local data, but future Preview
release notes may require different steps. Preview access is associated with
local installation data; reinstalling does not promise a new 30-day period.

## 10. Troubleshooting

### USB detected, session not connected

Close other software using the PM3 serial port and select **Connect Device**.

### Device not detected

Reconnect the USB cable, try a direct port or known working adapter and select
**Check Device** again.

### Device Studio shows Unknown

The current hardware, PM3 client or firmware did not provide enough evidence.
Unknown is not automatically a fault.

### A scan finds nothing

Keep the item steady, verify whether it is HF or LF, remove other RFID items
from the reader area and try the appropriate authorised scan.

### Electron is no longer opening the full app

Open the Preview Access information shown on the expiry screen. If the 30-day
period ended, request approved additional testing time. If device verification
paused access, request a device review.

### More help

- [Installation Guide](INSTALLATION_GUIDE.md)
- [Quick Start](QUICK_START.md)
- [FAQ](FAQ.md)
- [Known Limitations and Issues](KNOWN_LIMITATIONS.md)
- [Support Guide](SUPPORT.md)
