(() => {
  "use strict";

  const SHOP_URL = "https://violenticon.com/collections/all";
  const body = document.body;
  const video = document.querySelector(".world-video");
  const button = document.getElementById("dropButton");
  const status = document.getElementById("statusText");

  button.href = SHOP_URL;

  const states = [
    "TX-00 // SIGNAL LOCKED",
    "TX-06 // WATER IN SYSTEM",
    "TX-66 // UNAUTHORIZED",
    "TX-09 // LUXURY FAILURE"
  ];
  status.textContent = states[Math.floor(Math.random() * states.length)];

  let revealed = false;
  const reveal = () => {
    if (revealed) return;
    revealed = true;
    window.setTimeout(() => {
      body.classList.remove("is-loading");
      body.classList.add("is-ready");
    }, 300);
  };

  const forcePlayback = async () => {
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    try {
      await video.play();
      body.classList.remove("playback-blocked");
      reveal();
      return true;
    } catch (_) {
      body.classList.add("playback-blocked");
      reveal();
      return false;
    }
  };

  video.addEventListener("loadeddata", forcePlayback, { once: true });
  video.addEventListener("canplay", forcePlayback, { once: true });
  video.addEventListener("playing", reveal);
  video.addEventListener("error", () => {
    body.classList.add("video-error");
    reveal();
  });

  if (video.readyState >= 2) forcePlayback();
  else {
    video.load();
    window.setTimeout(forcePlayback, 900);
    window.setTimeout(reveal, 2200);
  }

  // Any user interaction gives blocked mobile browsers another chance.
  const retry = () => forcePlayback();
  document.addEventListener("pointerdown", retry, { once: true, passive: true });
  document.addEventListener("touchstart", retry, { once: true, passive: true });

  const schedulePulse = () => {
    const delay = 12000 + Math.random() * 10000;
    window.setTimeout(() => {
      if (!body.classList.contains("is-leaving")) {
        body.classList.add("pulse");
        window.setTimeout(() => body.classList.remove("pulse"), 420);
      }
      schedulePulse();
    }, delay);
  };
  schedulePulse();

  button.addEventListener("click", (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    body.classList.add("is-leaving");
    window.setTimeout(() => {
      window.top.location.href = SHOP_URL;
    }, 190);
  });

  try {
    window.parent.postMessage(
      { type: "s6n-frame-ready", page: "landing", height: document.documentElement.scrollHeight },
      "https://violenticon.com"
    );
  } catch (_) {}
})();