/*
  CONTENT STUDIO
  Add a new film or photograph by copying one object below.
  `video` can point to any .mp4 file. The site imposes no duration limit,
  so it supports complete films of seven minutes and beyond.
*/
const defaultFilms = [
  { title: "Between Frames", year: "2025", runtime: "06:42", video: "https://media.w3.org/2010/05/sintel/trailer.mp4", poster: "https://images.unsplash.com/photo-1519608487953-e999c86e7451?auto=format&fit=crop&w=1800&q=88" },
  { title: "After the Rain", year: "2025", runtime: "04:18", video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", poster: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=88" },
  { title: "From the Window", year: "2024", runtime: "07:08", video: "https://media.w3.org/2010/05/bunny/trailer.mp4", poster: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1800&q=88" },
  { title: "Red Thread", year: "2024", runtime: "03:27", video: "https://media.w3.org/2010/05/video/movie_300.mp4", poster: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1800&q=88" },
  { title: "A Little Further", year: "2023", runtime: "05:53", video: "https://media.w3.org/2010/05/sintel/trailer.mp4", poster: "https://images.unsplash.com/photo-1494783367193-149034c05e8f?auto=format&fit=crop&w=1800&q=88" },
  { title: "Blue Hour", year: "2023", runtime: "07:01", video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", poster: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1800&q=88" }
];

const defaultPhotos = [
  ["https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1000&q=85", "Tide / 01"],
  ["https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=1000&q=85", "Quiet field / 02"],
  ["https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=85", "Western light / 03"],
  ["https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1000&q=85", "Evening blue / 04"],
  ["https://images.unsplash.com/photo-1519608487953-e999c86e7451?auto=format&fit=crop&w=1000&q=85", "Low water / 05"],
  ["https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1000&q=85", "Open sea / 06"],
  ["https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1000&q=85", "Passing through / 07"],
  ["https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1000&q=85", "Northbound / 08"],
  ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=85", "Noon / 09"],
  ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85", "Altitude / 10"],
  ["https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1000&q=85", "Last sun / 11"],
  ["https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=1000&q=85", "Grain / 12"]
];

const defaultFilmDescriptions = [
  "A study of distance and the quiet spaces that remain between people.",
  "An observation of changing weather, memory, and a place after everyone has gone.",
  "A short reflection on home, framed through the light arriving at a window.",
  "A small red gesture travels through a sequence of ordinary, charged moments.",
  "A journey made from fragments of landscape and a voice moving forward.",
  "A film about the threshold between the day that ends and what begins after it."
];

const defaultResume = [
  { year: "2026", type: "Competition", title: "Student Film Award", description: "Official selection / short film category" },
  { year: "2025", type: "Director", title: "Between Frames", description: "Writer and director / narrative short film" },
  { year: "2025", type: "Cinematography", title: "After the Rain", description: "Director of photography / collaborative short" }
];

function readLocalItems(key) {
  try { return JSON.parse(localStorage.getItem(key)) || []; }
  catch { return []; }
}
function saveLocalItems(key, items) { localStorage.setItem(key, JSON.stringify(items)); }

const addedFilms = readLocalItems("zhongyuan-yu-added-films");
const addedPhotos = readLocalItems("zhongyuan-yu-added-photos");
const addedResume = readLocalItems("zhongyuan-yu-added-resume");
const films = [...defaultFilms, ...addedFilms].map((film, index) => ({ ...film, description: film.description || defaultFilmDescriptions[index] || "" }));
const photos = [...defaultPhotos, ...addedPhotos];
const resumeEntries = [...defaultResume, ...addedResume];

const stage = document.querySelector("#stage");
const strip = document.querySelector("#filmStrip");
const projectTemplate = document.querySelector("#projectTemplate");
const photoTemplate = document.querySelector("#photoTemplate");
const player = document.querySelector("#playerModal");
const fullVideo = document.querySelector("#fullVideo");
const previewInfo = document.querySelector("#previewInfo");
const photoModal = document.querySelector("#photoModal");
const fullPhoto = document.querySelector("#fullPhoto");
let selectedFilm = 0;

function renderStage(index) {
  const film = films[index];
  stage.innerHTML = `
    <div class="stage-fallback" style="background-image:url('${film.poster}')"></div>
    <video class="stage-media" muted loop playsinline preload="metadata" src="${film.video}"></video>`;
  const video = stage.querySelector("video");
  const fallback = stage.querySelector(".stage-fallback");
  video.addEventListener("canplay", () => { video.classList.add("is-visible"); fallback.classList.add("is-hidden"); video.play().catch(() => {}); }, { once: true });
}

function showPreviewInfo(index) {
  if (index === null) {
    previewInfo.textContent = "";
    previewInfo.classList.remove("is-visible");
    return;
  }
  const film = films[index];
  previewInfo.textContent = film.title;
  previewInfo.classList.add("is-visible");
}

function selectFilm(index, scrollIntoView = false) {
  selectedFilm = index;
  renderStage(index);
  [...strip.children].forEach((card, cardIndex) => card.classList.toggle("is-active", cardIndex === index));
  if (scrollIntoView) strip.children[index].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
}

films.forEach((film, index) => {
  const fragment = projectTemplate.content.cloneNode(true);
  const card = fragment.querySelector(".project-card");
  const preview = fragment.querySelector(".project-preview");
  preview.src = film.video;
  fragment.querySelector(".project-poster").style.backgroundImage = `url('${film.poster}')`;
  fragment.querySelector(".project-number").textContent = String(index + 1).padStart(2, "0");
  fragment.querySelector(".project-title").textContent = film.title;
  fragment.querySelector(".project-runtime").textContent = film.runtime;
  card.addEventListener("pointerenter", () => { selectFilm(index); showPreviewInfo(index); preview.play().then(() => preview.classList.add("is-playing")).catch(() => {}); });
  card.addEventListener("pointerleave", () => { preview.pause(); preview.currentTime = 0; preview.classList.remove("is-playing"); showPreviewInfo(null); });
  card.addEventListener("focus", () => { selectFilm(index); showPreviewInfo(index); });
  card.addEventListener("blur", () => showPreviewInfo(null));
  card.addEventListener("click", () => openPlayer(index));
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `Watch ${film.title}`);
  card.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openPlayer(index); } });
  strip.append(fragment);
});

function openPlayer(index) {
  const film = films[index];
  selectedFilm = index;
  fullVideo.src = film.video;
  document.querySelector("#playerTitle").textContent = `${film.title} / ${film.year} / ${film.runtime}`;
  document.querySelector("#playerDescription").textContent = film.description;
  player.showModal();
  fullVideo.play().catch(() => {});
}
function closePlayer() { fullVideo.pause(); fullVideo.removeAttribute("src"); fullVideo.load(); player.close(); }
document.querySelector("#closePlayer").addEventListener("click", closePlayer);
player.addEventListener("click", event => { if (event.target === player) closePlayer(); });
document.querySelector("#scrollLeft").addEventListener("click", () => strip.scrollBy({ left: -280, behavior: "smooth" }));
document.querySelector("#scrollRight").addEventListener("click", () => strip.scrollBy({ left: 280, behavior: "smooth" }));

const grid = document.querySelector("#photoGrid");
let loadedPhotos = [];

function loadPhoto([src, label]) {
  return new Promise(resolve => {
    const image = new Image();
    image.onload = () => resolve({ src, label, ratio: image.naturalWidth / image.naturalHeight });
    image.onerror = () => resolve({ src, label, ratio: 4 / 3 });
    image.src = src;
  });
}

function openPhoto(photo) {
  fullPhoto.src = photo.src;
  fullPhoto.alt = photo.label;
  photoModal.showModal();
}

function closePhoto() {
  fullPhoto.removeAttribute("src");
  photoModal.close();
}

/* Builds rows whose calculated image widths exactly fill the available line.
   Each item's rendered ratio matches its original ratio, so personal images
   are never stretched or cropped while the grid adapts to any viewport. */
function renderPhotos() {
  if (!loadedPhotos.length) return;
  const gap = window.innerWidth <= 650 ? 6 : 10;
  const targetHeight = window.innerWidth <= 650 ? 150 : 260;
  const availableWidth = grid.clientWidth;
  if (!availableWidth) return;
  grid.replaceChildren();
  let row = [];
  let ratioSum = 0;

  const appendRow = items => {
    const rowHeight = (availableWidth - gap * (items.length - 1)) / items.reduce((sum, item) => sum + item.ratio, 0);
    const rowElement = document.createElement("div");
    rowElement.className = "photo-row";
    items.forEach(photo => {
      const fragment = photoTemplate.content.cloneNode(true);
      const figure = fragment.querySelector(".photo-item");
      const image = fragment.querySelector("img");
      image.src = photo.src;
      image.alt = photo.label;
      figure.style.setProperty("--row-height", `${rowHeight}px`);
      figure.style.setProperty("--photo-width", `${rowHeight * photo.ratio}px`);
      figure.tabIndex = 0;
      figure.setAttribute("role", "button");
      figure.setAttribute("aria-label", `View ${photo.label} in full size`);
      figure.addEventListener("click", () => openPhoto(photo));
      figure.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openPhoto(photo); }
      });
      rowElement.append(fragment);
    });
    grid.append(rowElement);
  };

  loadedPhotos.forEach(photo => {
    row.push(photo);
    ratioSum += photo.ratio;
    if (ratioSum * targetHeight + gap * (row.length - 1) >= availableWidth) {
      appendRow(row);
      row = [];
      ratioSum = 0;
    }
  });
  if (row.length) appendRow(row);
}

Promise.all(photos.map(loadPhoto)).then(items => {
  loadedPhotos = items;
  renderPhotos();
  new ResizeObserver(() => renderPhotos()).observe(grid);
});

function renderResume() {
  const resumeList = document.querySelector("#resumeList");
  resumeEntries.forEach(entry => {
    const item = document.createElement("article");
    item.className = "resume-item";
    const year = document.createElement("p");
    year.className = "resume-year";
    year.textContent = entry.year;
    const type = document.createElement("p");
    type.className = "resume-type";
    type.textContent = entry.type;
    const title = document.createElement("h3");
    title.textContent = entry.title;
    const description = document.createElement("p");
    description.className = "resume-description";
    description.textContent = entry.description;
    item.append(year, type, title, description);
    resumeList.append(item);
  });
}
renderResume();

document.querySelector("#closePhoto").addEventListener("click", closePhoto);
photoModal.addEventListener("click", event => { if (event.target === photoModal) closePhoto(); });

const studioModal = document.querySelector("#studioModal");
document.querySelector("#openStudio").addEventListener("click", () => studioModal.showModal());
document.querySelector("#closeStudio").addEventListener("click", () => studioModal.close());
studioModal.addEventListener("click", event => { if (event.target === studioModal) studioModal.close(); });

document.querySelector("#videoForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  addedFilms.push({
    title: form.get("title").trim(), year: form.get("year").trim(), runtime: form.get("runtime").trim(),
    video: form.get("video").trim(), poster: form.get("poster").trim(), description: form.get("description").trim()
  });
  saveLocalItems("zhongyuan-yu-added-films", addedFilms);
  location.reload();
});

document.querySelector("#photoForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  addedPhotos.push([form.get("src").trim(), form.get("label").trim()]);
  saveLocalItems("zhongyuan-yu-added-photos", addedPhotos);
  location.reload();
});

document.querySelector("#resumeForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  addedResume.push({
    year: form.get("year").trim(), type: form.get("type").trim(),
    title: form.get("title").trim(), description: form.get("description").trim()
  });
  saveLocalItems("zhongyuan-yu-added-resume", addedResume);
  location.reload();
});
document.querySelector("#year").textContent = new Date().getFullYear();
selectFilm(0);
