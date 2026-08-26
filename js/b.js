/* איך את.ה? - Direction B shared interactions (mockup, static) */
(function () {
  "use strict";

  // mobile menu
  document.querySelectorAll("[data-menu-toggle]").forEach(function (t) {
    t.addEventListener("click", function () {
      var nav = document.getElementById(t.getAttribute("aria-controls"));
      if (!nav) return;
      var open = nav.classList.toggle("open");
      t.setAttribute("aria-expanded", open ? "true" : "false");
      t.setAttribute("aria-label", open ? "סגירת תפריט" : "פתיחת תפריט");
    });
  });

  // subtle motion - only when the visitor allows it
  if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!("IntersectionObserver" in window)) return;
  document.body.classList.add("anim");

  var heroKids = document.querySelectorAll(".hero > .container > *");
  heroKids.forEach(function (el, i) {
    el.style.setProperty("--hd", (0.05 + i * 0.11).toFixed(2) + "s");
    el.classList.add("hero-enter");
  });

  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.18, rootMargin: "0px 0px -6% 0px" });

  var idx = 0;
  document.querySelectorAll("section .card, section .panel, .section-head, .card-grid > *, .logo-strip > *, .fact, .again-panel").forEach(function (el) {
    if (el.closest(".hero") || el.dataset.rv) return;
    el.dataset.rv = "1";
    el.style.setProperty("--rd", ((idx++ % 6) * 0.06).toFixed(2) + "s");
    el.classList.add("rv");
    io.observe(el);
  });

  // typewriter placeholder in the home hero search
  var input = document.querySelector('.hero input[name="q"]');
  if (input) {
    var PREFIX = "אפשר לכתוב: ";
    var PHRASES = [
      "אני לא מצליח לישון",
      "הילד שלי מפחד",
      "אני מרגישה מוצפת",
      "חזרתי מהמילואים והראש עוד שם",
      "אני דואג למישהו קרוב"
    ];
    var pi = 0, ci = 0, del = false, stop = false, t;
    function halt() { stop = true; clearTimeout(t); input.setAttribute("placeholder", PREFIX + PHRASES[0] + "…"); }
    input.addEventListener("focus", halt);
    input.addEventListener("input", halt);
    (function tick() {
      if (stop) return;
      var w = PHRASES[pi];
      ci += del ? -1 : 1;
      input.setAttribute("placeholder", PREFIX + w.slice(0, ci));
      var d = del ? 26 : 52;
      if (!del && ci === w.length) { d = 1900; del = true; }
      else if (del && ci === 0) { del = false; pi = (pi + 1) % PHRASES.length; d = 350; }
      t = setTimeout(tick, d);
    })();
  }
})();
