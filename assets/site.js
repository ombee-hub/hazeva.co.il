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

// הודעת עוגיות – בדף הבית, פעם אחת בכל כניסה לאתר
(() => {
  const box = document.getElementById("cookie");
  if (!box) return;
  const KEY = "hz-cookie-ok";
  let seen = false;
  try { seen = !!sessionStorage.getItem(KEY); } catch (e) {}
  if (seen) return;
  setTimeout(() => {
    box.hidden = false;
    requestAnimationFrame(() => box.classList.add("on"));
  }, 700);
  box.querySelectorAll("[data-cookie]").forEach(b => b.addEventListener("click", () => {
    try { sessionStorage.setItem(KEY, b.dataset.cookie); } catch (e) {}   // "accept" / "decline"
    box.classList.remove("on");
    setTimeout(() => { box.hidden = true; }, 400);
  }));
})();
