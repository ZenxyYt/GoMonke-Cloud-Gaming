# gomonke

A bring-your-own-game PS1 player for the browser, powered by [EmulatorJS](https://emulatorjs.org). Players load their own game file; nothing is uploaded or hosted.

## Run locally
The page must be served over http, not opened as a file. From this folder run `python3 -m http.server` and visit http://localhost:8000.

## Deploy
Push the folder to a GitHub repo and enable Pages (Settings > Pages > deploy from branch), or use Cloudflare Pages / Netlify. It is fully static.

## Notes
- Best formats: `.chd` or `.pbp`. A `.cue` + `.bin` pair must be converted to `.chd` first (chdman).
- Save states live in the player's browser storage.
- Do not add game or BIOS files to this repo. Hosting them is copyright infringement and would get the site taken down.
- Real "cloud gaming" (running the emulator on your server and streaming video) needs GPU servers, low-latency streaming and carries more legal risk. Browser emulation avoids all of that.
