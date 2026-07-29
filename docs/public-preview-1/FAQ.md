# Frequently Asked Questions

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

## What should I include with feedback?

Include the steps, expected result, actual result and Electron version. Add
connection, firmware or device information when relevant. Review every
screenshot, log and feedback package before sharing it; remove private RFID
data, keys, dumps, payment information, paths and identifiers.

## What should I do before a restore or write action?

Confirm ownership or permission, identify the exact target, read the command,
make and verify a backup, and understand which data will change. Stop if the
card family, target or recovery path is uncertain.
