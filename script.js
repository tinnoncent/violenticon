(() => {
  "use strict";

  const canvas = document.getElementById("field");
  const ctx = canvas?.getContext("2d");
  const wordmark = document.querySelector(".wordmark");

  let width = 0;
  let height = 0;
  let dpr = 1;
  let motes = [];

  const resizeCanvas = () => {
    if (!canvas || !ctx) return;

    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.max(22, Math.min(72, Math.round((width * height) / 27000)));
    motes = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.25 + 0.25,
      speed: Math.random() * 0.13 + 0.025,
      drift: (Math.random() - 0.5) * 0.05,
      alpha: Math.random() * 0.22 + 0.04
    }));
  };

  const drawField = () => {
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, width, height);

    for (const mote of motes) {
      mote.y -= mote.speed;
      mote.x += mote.drift;

      if (mote.y < -4) {
        mote.y = height + 4;
        mote.x = Math.random() * width;
      }

      if (mote.x < -4) mote.x = width + 4;
      if (mote.x > width + 4) mote.x = -4;

      ctx.beginPath();
      ctx.fillStyle = `rgba(0, 229, 255, ${mote.alpha})`;
      ctx.arc(mote.x, mote.y, mote.size, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(drawField);
  };

  const glitch = () => {
    if (!wordmark) return;
    wordmark.classList.add("is-glitching");
    window.setTimeout(() => wordmark.classList.remove("is-glitching"), 520);
  };

  const scheduleGlitch = () => {
    const delay = 5200 + Math.random() * 4200;
    window.setTimeout(() => {
      glitch();
      scheduleGlitch();
    }, delay);
  };

  const sendHeight = () => {
    const height = Math.ceil(document.documentElement.scrollHeight);
    window.parent?.postMessage({ type: "resize", height }, "*");
  };

  resizeCanvas();
  drawField();
  glitch();
  scheduleGlitch();

  window.addEventListener("resize", () => {
    resizeCanvas();
    sendHeight();
  }, { passive: true });

  window.addEventListener("load", sendHeight, { once: true });
  document.fonts?.ready.then(sendHeight);

  if ("ResizeObserver" in window) {
    new ResizeObserver(sendHeight).observe(document.documentElement);
  }

  [120, 500, 1200].forEach((delay) => window.setTimeout(sendHeight, delay));
})();
