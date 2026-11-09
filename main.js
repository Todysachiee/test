const $ = (selector) => document.querySelector(selector);

function setText(selector, value) {
  const element = $(selector);
  if (element && value !== undefined) element.textContent = value;
}
function safeImage(path) { return path || "images/memory-placeholder.svg"; }

function renderGift() {
  setText("#envelopeName", gift.names.receiver);
  $("#heroTitle").innerHTML = gift.cover.title;
  setText("#heroSubtitle", gift.cover.subtitle);
  setText("#heroDate", gift.cover.established);
  $("#coverImage").src = safeImage(gift.cover.image);
  $("#coverCaption").textContent = gift.cover.caption;
  $("#endingImage").src = safeImage(gift.ending.image);
  setText("#endingMessage", gift.ending.message);
  $("#letterHeading").textContent = gift.letter.heading;
  $("#letterBody").textContent = gift.letter.message;
  setText("#letterSignature", gift.letter.signature);

  $("#timelineList").innerHTML = gift.timeline.map(item => `
    <article class="timeline-item reveal">
      <div class="timeline-card">
        <img src="${safeImage(item.image)}" alt="${escapeHTML(item.title)}" loading="lazy">
        <time>${escapeHTML(item.date)}</time>
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.description)}</p>
      </div>
    </article>`).join("");

  $("#galleryGrid").innerHTML = gift.gallery.map(item => `
    <figure class="polaroid reveal" tabindex="0" role="button" aria-label="View photo: ${escapeHTML(item.caption)}">
      <img src="${safeImage(item.image)}" alt="${escapeHTML(item.caption)}" loading="lazy">
      <figcaption>${escapeHTML(item.caption)}</figcaption>
    </figure>`).join("");

  $("#keepsakeGrid").innerHTML = gift.keepsakes.map((item, index) => `
    <button class="keepsake reveal" type="button" data-keepsake="${index}">
      <span class="symbol">${escapeHTML(item.symbol)}</span>
      <strong>${escapeHTML(item.title)}</strong>
      <small>${escapeHTML(item.hint)}</small>
    </button>`).join("");

  const audio = $("#backgroundMusic");
  audio.src = gift.music.file;
  $("#musicLabel").textContent = `play ${gift.music.title}`;
}

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 3200);
}

function openLightbox(src, alt) {
  const layer = document.createElement("div");
  layer.className = "lightbox";
  layer.innerHTML = `<button type="button" aria-label="Close image">×</button><img alt="">`;
  layer.querySelector("img").src = src;
  layer.querySelector("img").alt = alt;
  layer.addEventListener("click", event => {
    if (event.target === layer || event.target.tagName === "BUTTON") layer.remove();
  });
  document.body.appendChild(layer);
}

function setupInteractions() {
  $("#openGift").addEventListener("click", () => {
    $(".envelope").classList.add("open");
    document.body.classList.remove("locked");
    $("#intro").classList.add("closed");
    $("#siteContent").classList.add("visible");
    $("#siteContent").setAttribute("aria-hidden", "false");
    setTimeout(() => $("#home").scrollIntoView({ behavior: "smooth" }), 350);
  });

  $("#galleryGrid").addEventListener("click", event => {
    const figure = event.target.closest(".polaroid");
    if (!figure) return;
    openLightbox(figure.querySelector("img").src, figure.querySelector("img").alt);
  });

  $("#galleryGrid").addEventListener("keydown", event => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const figure = event.target.closest(".polaroid");
    if (!figure) return;
    event.preventDefault();
    openLightbox(figure.querySelector("img").src, figure.querySelector("img").alt);
  });

  $("#keepsakeGrid").addEventListener("click", event => {
    const button = event.target.closest("[data-keepsake]");
    if (!button) return;
    const item = gift.keepsakes[Number(button.dataset.keepsake)];
    showToast(item.message);
  });

  const audio = $("#backgroundMusic");
  $("#musicToggle").addEventListener("click", async () => {
    if (!audio.src || audio.src.endsWith("/")) {
      showToast("Add your song file in js/config.js first.");
      return;
    }
    try {
      if (audio.paused) {
        await audio.play();
        $("#musicToggle").classList.add("playing");
        $("#musicLabel").textContent = "pause our song";
      } else {
        audio.pause();
        $("#musicToggle").classList.remove("playing");
        $("#musicLabel").textContent = `play ${gift.music.title}`;
      }
    } catch {
      showToast("Add a valid audio file to the music folder.");
    }
  });
  audio.addEventListener("ended", () => {
    $("#musicToggle").classList.remove("playing");
    $("#musicLabel").textContent = `play ${gift.music.title}`;
  });

  $("#replayLetter").addEventListener("click", () => {
    const body = $("#letterBody");
    body.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 700 });
  });

  $("#replaySite").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      $("#intro").classList.remove("closed");
      $("#siteContent").classList.remove("visible");
      $("#siteContent").setAttribute("aria-hidden", "true");
      document.body.classList.add("locked");
      $(".envelope").classList.remove("open");
    }, 500);
  });
}

function setupAnniversaryCounter() {
  const start = new Date(`${gift.anniversaryDate}T00:00:00`);
  if (Number.isNaN(start.getTime())) {
    $("#counterWrap").hidden = true;
    return;
  }
  const today = new Date();
  const days = Math.max(0, Math.floor((today - start) / 86400000));
  $("#anniversaryCount").textContent = `${days.toLocaleString()} days`;
}

function setupRevealAnimations() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("in-view"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

renderGift();
setupInteractions();
setupAnniversaryCounter();
setupRevealAnimations();
