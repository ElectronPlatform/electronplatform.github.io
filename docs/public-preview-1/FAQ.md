# Frequently Asked Questions

## Where can I download Electron?

The official Download and Installation page is:

<https://electronplatform.github.io/download.html>

No public installer is available until that page activates an approved
download. Do not use an installer from an unofficial source.

## Why is a status shown as Unknown?

Electron did not receive enough evidence to report that value. The hardware,
PM3 client or firmware may not expose it. Electron shows **Unknown** instead of
guessing.

## Why is my Proxmark3 visible over USB but there is no active session?

USB detection only confirms that the computer can see a likely device. Select
**Connect Device** to start Electron's PM3 session. Close other software using
the same serial port first.

## Can Electron recognise data automatically?

Electron can parse supported PM3 output and suggest a card family or explain
reported fields. Results depend on the card, command, client and firmware.
Check whether a value is reported, observed, calculated or inferred.

## May I scan or copy any RFID tag?

No. Use only items that you own or are authorised to test. Copying, writing or
emulating a credential can be restricted or unlawful even when reading its
public identification data is possible.

## Where are RFID Tag records stored?

They are stored locally in Electron's Collection database on your computer.
Electron does not automatically upload them. Use the backup tools and keep an
independent copy in a safe location.

## Why is this a Public Preview?

The core workflows are ready for real testing, but compatibility, packaging
and some user-facing details still need validation across more systems and
hardware combinations.

## Why isn't Electron signed yet?

This is an early community Preview. Apple Developer ID signing and notarization
require a paid Apple Developer Program membership, so Public Preview 1 is being
prepared first for experienced testers with a published checksum and matching
source information.

MacOs may show an unidentified-developer or verification message during first
launch. This is expected for the current distribution method. Follow only
Apple's normal **Open** or **Open Anyway** procedure after verifying the
official download and SHA-256.

If the Preview proves valuable, later broader public releases are intended to
use Apple Developer ID signing and Apple notarization.

## How long can I use the Preview?

The standard Preview provides 30 days of full access from first launch.
Electron shows the current status under **Settings → Preview Access**. Saved
Collection data is not deleted when the Preview expires.

## How do I request more testing time?

Open **Settings → Preview Access** and select **Request Additional Testing
Time**. Electron prepares an email containing the Installation ID and status.
Nothing is sent automatically. If approved, Electron Support supplies a signed
Preview Extension Key for that Installation ID.

## Why does Electron verify the Mac?

Preview access is intended for the installation on which it began. Electron
stores privacy-preserving hashes of available machine and network signals. It
does not store or upload raw MAC addresses or the raw platform machine
identifier.

Normal hardware changes are tolerated. If every available signal differs
during three consecutive launches, access pauses and Electron offers a device
review route.

## Does reinstalling start another 30 days?

No. Reinstalling the application does not promise a new Preview period.
Application files, Preview access information and Collection data are separate.

## Does expiry delete my Collection?

No. Preview expiry stops the full application from opening but does not delete
the saved Collection. Keep an independent backup regardless.

## Does Electron require an internet account?

No. Core use, Collection storage and Preview Extension Key validation are local.
Internet access is needed for downloads, current documentation and support
messages that you choose to send.

## What should I include with feedback?

Include the steps, expected result, actual result and Electron version. Add
connection, firmware or device information when relevant. Review every
screenshot, log and feedback package before sharing it; remove private RFID
data, keys, dumps, payment information, paths and identifiers.

## What should I do before a restore or write action?

Confirm ownership or permission, identify the exact target, read the command,
make and verify a backup, and understand which data will change. Stop if the
card family, target or recovery path is uncertain.

## Does Device Studio write to cards or flash firmware?

No. Device Studio is diagnostic and read-only. It does not provide firmware
flashing, FPGA reconfiguration, RFID writing, cloning, restore, emulation or
attack workflows.

Device Console and Restore Helper are separate expert surfaces and can expose
commands that require additional review and authorisation.

## Why do the header LEDs not always match a short physical flash?

Short hardware LED pulses can finish before polling observes them. Electron
does not invent persistent physical LED states to make the display look more
active.

## Is my Collection uploaded?

No. Collection data remains local unless you deliberately export or share it.
Feedback packages are also created locally and must be sent by you.

## Which operating systems are supported?

Public Preview 1 is being prepared for MacOs on Apple Silicon. Windows, Linux
and Intel Mac support are not claimed until dedicated packages are built and
tested.

## Where do I get help?

Read the [Support Guide](SUPPORT.md) or use the official Contact page:

<https://electronplatform.github.io/contact.html>
