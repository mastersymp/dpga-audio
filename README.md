# DPGA Audio

Sound tech app for Duhaney Park Gospel Assembly: troubleshooting, Sunday checklist, podium mutes, X32 patch list, signal flow and a problem log. It installs on a phone and works offline after the first open.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The app |
| `manifest.webmanifest` | App name, colours and icons for installing |
| `sw.js` | Offline cache |
| `icon.svg`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png` | App icons |

## Installing on a phone

- **iPhone:** open the site in Safari, then Share › Add to Home Screen.
- **Android:** open the site in Chrome, then ⋮ › Install app.

## Updating

1. Upload the changed files here (Add file › Upload files), replacing the old ones.
2. Change the `VERSION` line at the top of `sw.js` (for example to today's date) and upload it too.

Phones pick up the new version the next time they open the app with signal.
