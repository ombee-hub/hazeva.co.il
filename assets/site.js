// תפריט צד למובייל
const burger = document.querySelector(".burger");
const drawer = document.getElementById("drawer");
const scrim = document.querySelector(".scrim");
if (burger && drawer) {
  const setOpen = open => {
    if (open) { scrim.hidden = false; requestAnimationFrame(() => scrim.classList.add("on")); }
    else { scrim.classList.remove("on"); setTimeout(() => { if (!drawer.classList.contains("on")) scrim.hidden = true; }, 300); }
    drawer.classList.toggle("on", open);
    drawer.setAttribute("aria-hidden", !open);
    burger.setAttribute("aria-expanded", open);
    document.body.classList.toggle("lock", open);
  };
  burger.addEventListener("click", () => setOpen(true));
  drawer.querySelector(".dr-x").addEventListener("click", () => setOpen(false));
  scrim.addEventListener("click", () => setOpen(false));
  addEventListener("keydown", e => { if (e.key === "Escape" && drawer.classList.contains("on")) setOpen(false); });
  drawer.querySelectorAll(".dr-toggle").forEach(t => t.addEventListener("click", () => {
    const open = t.parentElement.classList.toggle("open");
    t.setAttribute("aria-expanded", open);
  }));
  drawer.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setOpen(false)));
}

// גלריה – תצוגה מוגדלת
const lb = document.querySelector(".lb");
if (lb) {
  const btns = [...document.querySelectorAll(".masonry button")];
  const srcs = btns.map(b => b.querySelector("img").src);
  const img = lb.querySelector("img"), cnt = lb.querySelector(".cnt");
  let cur = 0;
  const show = i => { cur = (i + srcs.length) % srcs.length; img.src = srcs[cur]; cnt.textContent = `${cur + 1} / ${srcs.length}`; };
  const close = () => lb.classList.remove("on");
  btns.forEach((b, i) => b.addEventListener("click", () => { show(i); lb.classList.add("on"); }));
  lb.querySelector(".x").onclick = close;
  lb.querySelector(".nx").onclick = () => show(cur + 1);
  lb.querySelector(".pv").onclick = () => show(cur - 1);
  lb.addEventListener("click", e => { if (e.target === lb) close(); });
  addEventListener("keydown", e => {
    if (!lb.classList.contains("on")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(cur + 1);
    if (e.key === "ArrowRight") show(cur - 1);
  });
}

// טופס יצירת קשר – פותח את תוכנת הדואר עם ההודעה
const form = document.getElementById("cform");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(form));
    const err = document.getElementById("cerr");
    if (!f.name.trim() || !f.msg.trim()) { err.hidden = false; return; }
    err.hidden = true;
    const body = `${f.msg}\n\n--\n${f.name}${f.phone ? "\nטלפון: " + f.phone : ""}${f.email ? "\nדוא\"ל: " + f.email : ""}`;
    location.href = "mailto:hazeva@arava.co.il?subject=" + encodeURIComponent(`${f.topic} – ${f.name}`) + "&body=" + encodeURIComponent(body);
  });
}

// תפריט נגישות
(() => {
  const root = document.getElementById("a11y");
  if (!root || !window.hzA11y) return;
  const KEY = "hz-a11y";
  const btn = document.getElementById("a11y-btn");
  const panel = document.getElementById("a11y-panel");
  const tip = root.querySelector(".a11y-tip");
  let s = {};
  try { s = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) {}

  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} };
  const render = () => {
    hzA11y(s);
    root.querySelectorAll(".a11y-tile").forEach(t => {
      const k = t.dataset.a11y, n = +t.dataset.steps, v = s[k];
      t.setAttribute("aria-pressed", !!v);
      t.querySelectorAll(".dots i").forEach((d, i) => d.classList.toggle("on", i < (v || 0)));
      const labels = t.dataset.labels ? t.dataset.labels.split("|") : [];
      t.querySelector(".lbl").textContent = n && v ? labels[v - 1] : t.dataset.base;
    });
  };

  // tiles: on/off or cycling through steps
  root.querySelectorAll(".a11y-tile").forEach(t => t.addEventListener("click", () => {
    const k = t.dataset.a11y, n = +t.dataset.steps;
    if (n) { s[k] = ((s[k] || 0) + 1) % (n + 1); if (!s[k]) delete s[k]; }
    else if (s[k]) delete s[k]; else s[k] = true;
    save(); render();
  }));
  root.querySelector(".a11y-reset").addEventListener("click", () => { s = {}; save(); render(); });

  // open / close
  const open = () => { panel.hidden = false; btn.setAttribute("aria-expanded", "true"); root.querySelector(".a11y-x").focus(); };
  const close = () => { panel.hidden = true; btn.setAttribute("aria-expanded", "false"); btn.focus(); };
  btn.addEventListener("click", () => panel.hidden ? open() : close());
  root.querySelector(".a11y-x").addEventListener("click", close);
  addEventListener("keydown", e => {
    if (e.altKey && (e.key === "a" || e.key === "A" || e.code === "KeyA")) {
      e.preventDefault();
      panel.hidden ? open() : close();
    }
    if (e.key === "Escape" && !panel.hidden) close();
  });

  // descriptions: show alt / aria-label / title of the hovered or focused element
  const describe = el => {
    const t = el && el.closest && el.closest("[aria-label],img[alt],[title]");
    if (!t || root.contains(t)) return "";
    return (t.getAttribute("aria-label") || t.getAttribute("alt") || t.getAttribute("title") || "").trim();
  };
  const showTip = (txt, x, y) => {
    if (!s.tips || !txt) { tip.hidden = true; return; }
    tip.textContent = txt; tip.hidden = false;
    const w = tip.offsetWidth, h = tip.offsetHeight;
    tip.style.left = Math.max(8, Math.min(innerWidth - w - 8, x - w / 2)) + "px";
    tip.style.top = (y - h - 14 < 8 ? y + 22 : y - h - 14) + "px";
  };
  document.addEventListener("mouseover", e => showTip(describe(e.target), e.clientX, e.clientY));
  document.addEventListener("focusin", e => { const r = e.target.getBoundingClientRect(); showTip(describe(e.target), r.left + r.width / 2, r.top); });
  document.addEventListener("scroll", () => { tip.hidden = true; }, { passive: true });

  render();
})();

// הודעת עוגיות – בדף הבית, פעם אחת בכל כניסה לאתר
(() => {
  const box = document.getElementById("cookie");
  if (!box) return;
  const KEY = "hz-cookie-ok";
  let seen = false;
  try { seen = !!sessionStorage.getItem(KEY); } catch (e) {}
  if (seen) return;
  // lift the accessibility button above the bar while it is visible
  const lift = () => document.body.style.setProperty("--cookie-h", box.offsetHeight + "px");
  setTimeout(() => {
    box.hidden = false; lift(); document.body.classList.add("cookie-on");
    requestAnimationFrame(() => box.classList.add("on"));
  }, 700);
  addEventListener("resize", () => { if (!box.hidden) lift(); });
  box.querySelectorAll("[data-cookie]").forEach(b => b.addEventListener("click", () => {
    try { sessionStorage.setItem(KEY, b.dataset.cookie); } catch (e) {}   // "accept" / "decline"
    box.classList.remove("on"); document.body.classList.remove("cookie-on");
    setTimeout(() => { box.hidden = true; }, 400);
  }));
})();
