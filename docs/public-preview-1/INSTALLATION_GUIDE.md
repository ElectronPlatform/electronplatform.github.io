# Electron Public Preview 1 Installation Guide

**Current status:** the unsigned, non-notarized Apple Silicon DMG is publicly
available as Electron Early Public Preview 1.

Use the official Download and Installation page for current availability:

<https://electronplatform.github.io/download.html>

## Requirements

- A Mac with Apple Silicon.
- A supported MacOs version stated with the final release.
- A compatible Proxmark3 and a working USB-C or USB-A connection.
- Permission to test every RFID card, tag or device you use.
- An independent backup location for important Collection data.

Internet access is needed to download Electron and view current online
documentation. The core application, Collection and Preview Extension Key validation operate
locally.

## Early Public Preview distribution

Electron Early Public Preview 1 is distributed without Apple Developer ID
signing or Apple notarization. This allows the project to gather real-world
feedback before investing in Apple's Developer Program.

The published DMG was built from the matching public GitHub source revision,
checked after packaging and published with its exact SHA-256 and corresponding
source archives.

## Verify the installer

Download Electron only from the official website or its linked GitHub release.
The release page must publish the installer filename and SHA-256 checksum.

In Terminal, the downloaded DMG can be checked with:

```text
shasum -a 256 "/path/to/Electron-Preview-0.8.0-arm64.dmg"
```

The result must exactly match the checksum on the official release page. Do
not continue if it differs.

## Install Electron

1. Open the downloaded DMG.
2. Drag **Electron Preview** into **Applications**.
3. Wait for the copy to finish.
4. Eject the Electron installer.
5. Open **Electron Preview** from Applications.

Installing a newer approved Preview normally means replacing the application
in Applications. Quit Electron and read that build's release notes first.

## First launch on MacOs

Because this Early Public Preview is not Apple Developer ID signed or
notarized, MacOs may show messages such as:

- “Electron cannot be opened because it is from an unidentified developer.”
- “Apple could not verify this application.”

These messages are expected for this distribution method. They describe the
application's signing status and do not by themselves show that Electron is
unsafe. Electron is intended for review and testing when the DMG comes from the
official release, its checksum matches and the published source revision can
be inspected.

Use only Apple's normal **Open** or **Open Anyway** workflow after confirming
the source and checksum. Do not disable MacOs security or use Terminal commands
to remove its protection.

### Open from Applications

1. Open Applications.
2. Right-click or Control-click **Electron Preview**.
3. Select **Open**.
4. Select **Open** again when MacOs asks for confirmation.

### Use Privacy & Security

1. Try to open Electron once.
2. Open **System Settings**.
3. Select **Privacy & Security**.
4. Scroll to the Security section.
5. Select **Open Anyway** for Electron and confirm.
6. Open Electron again.

## What Electron creates on first launch

On first launch Electron:

- creates local Preview settings and support folders;
- creates an Installation ID;
- starts the standard 30-day Preview period;
- opens with an empty starter Collection for a new user;
- does not require an internet account;
- does not upload Collection or feedback data automatically.

The Installation ID and access status are visible under **Settings → Preview
Access**.

## Connect a Proxmark3

1. Connect the Proxmark3 directly by USB.
2. Close other programs that may be using its serial port.
3. Open **Device Console**.
4. Select **Check Device**.
5. If **USB device** is detected but **Active session** is not connected,
   select **Connect Device**.

USB detection only means that the computer can see a compatible device. An
active session means Electron can communicate with it.

## Storage and reinstall behaviour

Application removal and local data removal are separate:

- replacing or removing the application should not by itself delete the
  Collection;
- Preview data is stored under the current user's Electron Preview data
  locations;
- reinstalling does not promise a new 30-day period;
- back up the Collection before replacing a build or intentionally deleting
  local data.

Follow release-specific migration instructions when supplied. Do not assume a
future build can always read older Preview data.

## Uninstall

To remove the application, quit Electron and move **Electron Preview** from
Applications to the Bin.

Do not remove the Electron Preview data folders unless you intentionally want
to remove local settings, access information and Collection data. Make a
verified backup first.

## Need help?

- [Quick Start](QUICK_START.md)
- [User Guide](USER_GUIDE.md)
- [FAQ](FAQ.md)
- [Known Limitations and Issues](KNOWN_LIMITATIONS.md)
- [Support Guide](SUPPORT.md)
- <https://electronplatform.github.io/contact.html>
