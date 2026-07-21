# VIOLENT ICON — Front Page Packet v3

This is the complete production packet for the VIOLENT ICON front-page embed.

## DESIGN LOCK

The following elements are intentionally preserved:

- Cyan animated Baphomet pentagram centerpiece
- Three continuous rainbow overlay bands
- CRT scanlines
- Animated grain
- Sync-roll effect
- Vignette
- Chromatic cyan/magenta fringe
- Animated particle field
- Responsive/mobile layout
- Fourthwall iframe auto-resizing
- No timed blackout
- No full-page opacity reset
- No disappearing centerpiece

The explicitly requested changes are:

- Brand name changed to `ＶＩＯＬＥＮＴ　ＩＣＯＮ`
- Clean sans-serif typography replaces blackletter
- Front-page manifesto changed to:
  - `ＢＥＡＵＴＩＦＵＬ　ＴＨＩＮＧＳ`
  - `ＢＡＤ　ＩＮＴＥＮＴＩＯＮＳ`
- CTA changed to:
  - `ＳＨＯＰ　ＴＨＥ　ＤＲＯＰ`

No other established visual component was intentionally removed.

## FILES

- `index.html`
- `style.css`
- `script.js`
- `vercel.json`
- `CHANGELOG.txt`
- `README.md`

## DEPLOY TO GITHUB + VERCEL

1. Extract this ZIP.
2. Open the GitHub repository currently connected to the Vercel deployment.
3. Replace the existing site files with the files from this packet.
4. Commit the changes.
5. Vercel will redeploy automatically.

## FOURTHWALL

Use the Vercel deployment URL in the Fourthwall Embed block.

The button currently points to:

`/collections/all`

It uses `target="_top"` so the collection opens outside the embed iframe.

## IMPORTANT

Do not delete the SVG paths in `index.html`. They are the actual animated Baphomet centerpiece.
Do not remove any of the three `.fx-rainbow` elements. They are the continuous rainbow bands.
