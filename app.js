// gomonke: loads a user-supplied PS1 game file into EmulatorJS. Nothing is uploaded anywhere.
const CDN = "https://cdn.emulatorjs.org/stable/data/";
const OK = ["chd", "pbp", "iso", "img", "bin", "zip", "7z"];

const lobby = document.getElementById("lobby");
const stage = document.getElementById("stage");
const drop = document.getElementById("drop");
const gameInput = document.getElementById("game-file");
const biosInput = document.getElementById("bios-file");
const biosName = document.getElementById("bios-name");
const msg = document.getElementById("msg");
const title = document.getElementById("title");

let biosFile = null;

function say(text) {
  msg.textContent = text;
  msg.hidden = !text;
}

function launch(file) {
  const ext = file.name.split(".").pop().toLowerCase();
  if (ext === "cue") {
    say("A .cue file points to separate .bin files, which can't be loaded one by one. Convert the pair to a single .chd (with chdman) and try again.");
    return;
  }
  if (!OK.includes(ext)) {
    say("That file type isn't supported. Try .chd, .pbp, .iso, .img, .bin, .zip or .7z.");
    return;
  }
  say("");
  lobby.hidden = true;
  stage.hidden = false;
  const name = file.name.replace(/\.[^.]+$/, "");
  title.textContent = name;
  document.title = name + " – gomonke";

  // EmulatorJS reads these globals when its loader script runs.
  window.EJS_player = "#game";
  window.EJS_core = "psx";
  window.EJS_gameName = name;
  window.EJS_gameUrl = URL.createObjectURL(file);
  window.EJS_pathtodata = CDN;
  window.EJS_color = "#ffd23f";
  window.EJS_startOnLoaded = true;
  if (biosFile) window.EJS_biosUrl = URL.createObjectURL(biosFile);

  const s = document.createElement("script");
  s.src = CDN + "loader.js";
  s.onerror = () => {
    stage.hidden = true;
    lobby.hidden = false;
    say("Couldn't load the emulator. Check your connection and that the page is served over http(s).");
  };
  document.body.append(s);
}

drop.addEventListener("click", () => gameInput.click());
drop.addEventListener("keydown", e => {
  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); gameInput.click(); }
});
gameInput.addEventListener("change", () => { if (gameInput.files[0]) launch(gameInput.files[0]); });
["dragenter", "dragover"].forEach(t => drop.addEventListener(t, e => { e.preventDefault(); drop.classList.add("over"); }));
["dragleave", "drop"].forEach(t => drop.addEventListener(t, e => { e.preventDefault(); drop.classList.remove("over"); }));
drop.addEventListener("drop", e => { if (e.dataTransfer.files[0]) launch(e.dataTransfer.files[0]); });

biosInput.addEventListener("change", () => {
  biosFile = biosInput.files[0] || null;
  biosName.textContent = biosFile ? " " + biosFile.name : "";
});

// The emulator can only start once per page load, so ejecting reloads the page.
document.getElementById("eject").addEventListener("click", () => location.reload());
