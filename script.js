import * as THREE from "three";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

const audio = $("#audio");
const playButton = $("#play");
const heroPlay = $("#hero-play");
const vinyl = $("#vinyl");
const tonearm = $("#tonearm");
const audioTitle = $("#audio-title");
const seek = $("#seek");
const seekFill = $("#seek-fill");
const volume = $("#volume");
const musicModules = import.meta.glob("/music/*.mp3", {
  eager: true,
  query: "?url",
  import: "default"
});
const trackMetadata = {
  "DM_20260728165035_001 (V0)": { title: "A Rose for Epona", artist: "Eluveitie" },
  "DM_20260728170518_001 (V0)": { title: "水之湄", artist: "惘闻" },
  "DM_20260728170923_001 (V0)": { title: "From The Edge Of The Deep Green Sea", artist: "The Cure" },
  "DM_20260728171057_001 (V0)": { title: "Marooned", artist: "Pink Floyd" },
  "DM_20260728171238_001 (V0)": { title: "Epitaph", artist: "King Crimson" },
  "DM_20260728171550_001 (V0)": { title: "妳的烟熏到我没关系", artist: "绿橄榄" },
  "DM_20260728171722_001 (V0)": { title: "←M→", artist: "惘闻" }
};
const playlist = Object.entries(musicModules)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, "zh-CN", { numeric: true }))
  .map(([path, url], index) => {
    const filename = decodeURIComponent(path.split("/").pop().replace(/\.mp3$/i, ""));
    const timestamp = filename.match(/_(\d{8})(\d{4})\d{2}_/);
    return {
      url,
      filename,
      title: trackMetadata[filename]?.title || filename,
      artist: trackMetadata[filename]?.artist || "未知歌手",
      subtitle: timestamp ? `${timestamp[1].slice(0,4)}.${timestamp[1].slice(4,6)}.${timestamp[1].slice(6,8)} · ${timestamp[2].slice(0,2)}:${timestamp[2].slice(2)}` : filename,
      duration: 0
    };
  });
let audioIndex = 0;
let audioContext;
let analyser;
let source;
let audioLevel = 0;

function loadAudio(autoplay = false) {
  if (!playlist.length) return;
  audio.src = playlist[audioIndex].url;
  audioTitle.textContent = playlist[audioIndex].title;
  $("#audio-artist") && ($("#audio-artist").textContent = playlist[audioIndex].artist);
  audio.load();
  updatePlaylistState();
  if (autoplay) audio.play().then(initAudioGraph).catch(() => {});
}

function initAudioGraph() {
  if (audioContext) {
    if (audioContext.state === "suspended") audioContext.resume();
    return;
  }
  audioContext = new AudioContext();
  analyser = audioContext.createAnalyser();
  analyser.fftSize = 128;
  source = audioContext.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(audioContext.destination);
}
function togglePlayback() {
  if (!playlist.length) return;
  initAudioGraph();
  audio.paused ? audio.play() : audio.pause();
}
playButton?.addEventListener("click", togglePlayback);
heroPlay?.addEventListener("click", togglePlayback);
$("#previous")?.addEventListener("click", () => changeAudio(-1));
$("#next")?.addEventListener("click", () => changeAudio(1));
function changeAudio(direction) {
  if (!playlist.length) return;
  audioIndex = (audioIndex + direction + playlist.length) % playlist.length;
  loadAudio(true);
}
audio.addEventListener("ended", () => changeAudio(1));
audio.addEventListener("play", () => setPlaybackUI(true));
audio.addEventListener("pause", () => setPlaybackUI(false));
function setPlaybackUI(playing) {
  document.body.classList.toggle("is-playing", playing);
  vinyl.classList.toggle("playing", playing && !reducedMotion);
  tonearm.classList.toggle("playing", playing);
  if (playButton) {
    playButton.textContent = playing ? "Ⅱ" : "▶";
    playButton.setAttribute("aria-label", playing ? "暂停" : "播放");
  }
  $(".button-icon").textContent = playing ? "Ⅱ" : "▶";
  $(".button-label").textContent = playing ? "暂停音乐" : "播放专辑";
}
function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2,"0")}`;
}
audio.addEventListener("timeupdate", () => {
  const percent = audio.duration ? audio.currentTime / audio.duration * 100 : 0;
  if (seek) seek.value = percent;
  if (seekFill) seekFill.style.width = `${percent}%`;
  const current = $("#current-time");
  const duration = $("#duration");
  if (current) current.textContent = formatTime(audio.currentTime);
  if (duration) duration.textContent = formatTime(audio.duration);
});
seek?.addEventListener("input", () => { if (audio.duration) audio.currentTime = seek.value / 100 * audio.duration; });
if (volume) {
  volume.addEventListener("input", () => { audio.volume = volume.value; });
  audio.volume = volume.value;
}
$("#volume-icon")?.addEventListener("click", () => {
  audio.muted = !audio.muted;
  $("#volume-icon").textContent = audio.muted ? "×" : "◖";
});

let dragRotation = 0;
let dragStart = 0;
vinyl.addEventListener("pointerdown", (event) => {
  dragStart = event.clientX;
  vinyl.setPointerCapture(event.pointerId);
  vinyl.classList.add("dragging");
});
vinyl.addEventListener("pointermove", (event) => {
  if (!vinyl.classList.contains("dragging")) return;
  dragRotation += (event.clientX - dragStart) * .9;
  dragStart = event.clientX;
  vinyl.style.transform = `rotate(${dragRotation}deg)`;
  if (playlist.length && audio.duration) audio.currentTime = Math.max(0, Math.min(audio.duration, audio.currentTime + event.movementX * .08));
});
vinyl.addEventListener("pointerup", () => {
  vinyl.classList.remove("dragging");
  vinyl.style.transform = "";
});

const playlistPanel = $("#playlist-panel");
const playlistBackdrop = $("#playlist-backdrop");
const playlistButtons = [$("#playlist-toggle"), $("#sound-pill")].filter(Boolean);
function setPlaylistOpen(open) {
  playlistPanel.classList.toggle("open", open);
  playlistBackdrop.classList.toggle("open", open);
  playlistPanel.setAttribute("aria-hidden", String(!open));
  playlistButtons.forEach((button) => button.setAttribute("aria-expanded", String(open)));
}
playlistButtons.forEach((button) => button.addEventListener("click", () => setPlaylistOpen(!playlistPanel.classList.contains("open"))));
$("#playlist-close")?.addEventListener("click", () => setPlaylistOpen(false));
playlistBackdrop.addEventListener("click", () => setPlaylistOpen(false));
addEventListener("keydown", (event) => {
  if (event.key === "Escape") setPlaylistOpen(false);
});

function renderPlaylist() {
  $("#playlist-count").textContent = `${String(playlist.length).padStart(2,"0")} TRACKS`;
  $("#audio-playlist").innerHTML = playlist.map((track, index) => `
    <li data-audio-index="${index}">
      <button type="button" aria-label="播放 ${track.title}">
        <span class="list-no">${String(index + 1).padStart(2,"0")}</span>
        <span class="list-title">
          <strong>${track.title}</strong>
          <span class="list-artist">${track.artist}</span>
          <small>${track.subtitle}</small>
        </span>
        <time class="list-time">${track.duration ? formatTime(track.duration) : "--:--"}</time>
      </button>
    </li>`).join("");
  $$("#audio-playlist button").forEach((button, index) => button.addEventListener("click", () => {
    audioIndex = index;
    loadAudio(true);
  }));
  updatePlaylistState();
}
function updatePlaylistState() {
  $$("#audio-playlist li").forEach((item, index) => item.classList.toggle("active", index === audioIndex));
}
playlist.forEach((track) => {
  const probe = new Audio();
  probe.preload = "metadata";
  probe.src = track.url;
  probe.addEventListener("loadedmetadata", () => {
    track.duration = probe.duration;
    renderPlaylist();
  }, { once: true });
});
renderPlaylist();
if (playlist.length) loadAudio(false);

$$(".root-button").forEach((button) => button.addEventListener("pointermove", (event) => {
  const rect = button.getBoundingClientRect();
  button.style.setProperty("--x", `${event.clientX - rect.left}px`);
  button.style.setProperty("--y", `${event.clientY - rect.top}px`);
}));

// Three.js: 以封面中的根系、光点和矿物色块为视觉语汇。
const canvas = $("#root-canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x112d18, .055);
const camera = new THREE.PerspectiveCamera(52, innerWidth / innerHeight, .1, 100);
camera.position.set(0, 0, 14);

const rootGroup = new THREE.Group();
scene.add(rootGroup);
const rootMaterial = new THREE.LineBasicMaterial({ color: 0xfff0a8, transparent: true, opacity: .16 });
for (let branch = 0; branch < 38; branch++) {
  const points = [];
  let x = (Math.random() - .5) * 16;
  let y = -8 - Math.random() * 2;
  let z = (Math.random() - .5) * 5;
  for (let p = 0; p < 18; p++) {
    x += (Math.random() - .5) * .55 + Math.sin(branch * .8) * .05;
    y += .55;
    z += (Math.random() - .5) * .22;
    points.push(new THREE.Vector3(x, y, z));
  }
  rootGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), rootMaterial));
}
const particleCount = innerWidth < 700 ? 340 : 720;
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);
const palette = [new THREE.Color(0xfff0a8), new THREE.Color(0x9dacfc), new THREE.Color(0xb65d16)];
for (let i = 0; i < particleCount; i++) {
  positions[i*3] = (Math.random()-.5)*24;
  positions[i*3+1] = (Math.random()-.5)*17;
  positions[i*3+2] = (Math.random()-.5)*8;
  const color = palette[Math.floor(Math.random()*palette.length)];
  colors.set([color.r,color.g,color.b],i*3);
}
const particleGeometry = new THREE.BufferGeometry();
particleGeometry.setAttribute("position",new THREE.BufferAttribute(positions,3));
particleGeometry.setAttribute("color",new THREE.BufferAttribute(colors,3));
const particles = new THREE.Points(particleGeometry,new THREE.PointsMaterial({size:.055,vertexColors:true,transparent:true,opacity:.5,blending:THREE.AdditiveBlending}));
scene.add(particles);

const pointer = { x:0, y:0 };
addEventListener("pointermove", (event) => {
  pointer.x = event.clientX / innerWidth - .5;
  pointer.y = event.clientY / innerHeight - .5;
});
addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
  renderer.setSize(innerWidth,innerHeight); renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));
});
const clock = new THREE.Clock();
const frequencyData = new Uint8Array(64);
function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();
  if (analyser && !audio.paused) {
    analyser.getByteFrequencyData(frequencyData);
    audioLevel += ((frequencyData.reduce((a,b)=>a+b,0)/frequencyData.length/255) - audioLevel) * .12;
  } else audioLevel *= .94;
  if (!reducedMotion) {
    particles.rotation.y = t * .004 + pointer.x * .08;
    particles.rotation.x += (-pointer.y * .05 - particles.rotation.x) * .02;
    rootGroup.rotation.y += (pointer.x * .06 - rootGroup.rotation.y) * .014;
    rootGroup.position.y = Math.sin(t*.18)*.1;
    const scale = 1 + audioLevel * .65;
    particles.scale.setScalar(scale);
    rootMaterial.opacity = .13 + audioLevel * .45;
  }
  renderer.render(scene,camera);
}
animate();
