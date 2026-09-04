/* ============================================================
   BODY ONE — main.js
   Sadrzaj se renderira iz JS arrayeva radi lakseg odrzavanja.
   Napomena: izbjegavati hrvatske tipografske navodnike u stringovima.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- PODACI ---------- */

  // Paketi usluga (Reformer grupa, grupe do 5 osoba)
  var REFORMER_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="9" width="18" height="6" rx="1.5"/><path d="M6 15v3M18 15v3M3 12H1M23 12h-2"/></svg>';
  var PROGRAMS = [
    {
      kicker: "Reformer grupa",
      name: "5 treninga",
      desc: "5 treninga u grupi do 5 osoba unutar mjesec dana, u terminima po izboru.",
      price: "65 &euro;",
      duration: "1 mjesec",
      icon: REFORMER_ICON
    },
    {
      kicker: "Reformer grupa",
      name: "10 treninga",
      desc: "10 treninga u grupi do 5 osoba unutar mjesec dana, u terminima po izboru.",
      price: "128 &euro;",
      duration: "1 mjesec",
      featured: true, badge: "Najbolja vrijednost",
      icon: REFORMER_ICON
    },
    {
      kicker: "Reformer grupa",
      name: "14 treninga",
      desc: "14 treninga u grupi do 5 osoba unutar dva mjeseca, u terminima po izboru.",
      price: "180 &euro;",
      duration: "2 mjeseca",
      icon: REFORMER_ICON
    }
  ];

  // Voditelj studija (fotka: sasa.jpg)
  var TEAM = [
    {
      name: "Saša", photo: "assets/img/sasa.jpg",
      role: "Voditelj studija",
      bio: "Vodi reformer treninge u Body One studiju. Draga, profesionalna i pristupačna — svaki trening pomno osmisli i prati svaku polaznicu do rezultata."
    }
  ];

  // Recenzije (Google, 5/5, doslovno prepisane; dijakritika uredjena)
  var REVIEWS = [
    { name: "Silvija Cupar", initials: "S", when: "prije godinu dana",
      text: "Iskrena preporuka za ovaj Pilates studio! Svaki trening je drugačiji, vježbe su raznolike i zanimljive. Atmosfera je opuštajuća, prostor lijep i uredan, a osjećaj nakon treninga - neprocjenjiv. Savršeno mjesto za tijelo i um!" },
    { name: "Ines Varga", initials: "I", when: "prije godinu dana",
      text: "Svaka preporuka za pilates instruktoricu koja je prije svega veliki motivator! Svaki trening je pomno osmišljen, radilo se o progressive pilatesu ili reformeru. Pravo mjesto ako želite upoznati svoje tijelo, poboljšati zdravlje i fizički izgled!" },
    { name: "Moira Rogina", initials: "M", when: "prije godinu dana",
      text: "Jako draga, profesionalna Saša i uvijek savršeno odrađen trening. Ako tražiš mjesto za izgradit se, napravit mindreset, na pravom si mjestu! Bravo Saša i hvala!" },
    { name: "bojana lacković", initials: "B", when: "prije godinu dana",
      text: "Trenerica za svaku pohvalu, profesionalna ali i pristupačna, a treninzi kvalitetno i dobro osmišljeni." },
    { name: "Romana Turk", initials: "R", when: "prije godinu dana",
      text: "Izvrsna trenerica! Ugodna atmosfera i motivirajući treninzi." }
  ];

  var REVIEWS_SHOWN = 4;

  /* ---------- HELPERI ---------- */
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function escAttr(s) { return String(s).replace(/"/g, "&quot;"); }

  /* ---------- RENDER: USLUGE ---------- */
  function renderPrograms() {
    var grid = document.getElementById("programsGrid");
    if (!grid) return;
    PROGRAMS.forEach(function (p) {
      var card = el("article", "program-card" + (p.featured ? " is-featured" : ""));
      var inner = "";
      if (p.badge) inner += '<span class="p-badge">' + p.badge + '</span>';
      inner += '<span class="p-ico" aria-hidden="true">' + p.icon + '</span>';
      if (p.kicker) inner += '<p class="p-kicker">' + p.kicker + '</p>';
      inner += '<h3 class="p-title">' + p.name + '</h3>';
      inner += '<p class="p-desc">' + p.desc + '</p>';
      inner += '<div class="p-meta">' +
                 '<span class="p-price"><b>' + p.price + '</b></span>' +
                 '<span class="p-duration">' + p.duration + '</span>' +
               '</div>';
      card.innerHTML = inner;
      grid.appendChild(card);
    });
  }

  /* ---------- RENDER: TRENERICA ---------- */
  function renderTeam() {
    var grid = document.getElementById("teamGrid");
    if (!grid) return;
    TEAM.forEach(function (m) {
      var card = el("article", "team-card");
      card.innerHTML =
        '<div class="team-photo"><img src="' + m.photo + '" alt="' + escAttr(m.name) + ', voditelj studija" loading="lazy" /></div>' +
        '<div class="team-body">' +
          '<h3 class="team-name">' + m.name + '</h3>' +
          '<p class="team-role">' + m.role + '</p>' +
          '<p class="team-bio">' + m.bio + '</p>' +
        '</div>';
      grid.appendChild(card);
    });
  }

  /* ---------- RENDER: RECENZIJE ---------- */
  function renderReviews() {
    var grid = document.getElementById("reviewsGrid");
    if (!grid) return;
    REVIEWS.forEach(function (rv, i) {
      var card = el("article", "review-card" + (i >= REVIEWS_SHOWN ? " is-hidden" : ""));
      card.innerHTML =
        '<div class="review-stars" aria-label="5 od 5">&#9733;&#9733;&#9733;&#9733;&#9733;</div>' +
        '<p class="review-text">' + rv.text + '</p>' +
        '<div class="review-foot">' +
          '<span class="review-avatar">' + rv.initials + '</span>' +
          '<div>' +
            '<div class="review-name">' + rv.name + '</div>' +
            '<div class="review-when">' + rv.when + '</div>' +
          '</div>' +
        '</div>';
      grid.appendChild(card);
    });

    var btn = document.getElementById("reviewsToggle");
    if (!btn) return;
    if (REVIEWS.length <= REVIEWS_SHOWN) { btn.style.display = "none"; return; }
    btn.addEventListener("click", function () {
      var expanded = btn.getAttribute("aria-expanded") === "true";
      var hidden = grid.querySelectorAll(".review-card");
      hidden.forEach(function (c, i) {
        if (i >= REVIEWS_SHOWN) c.classList.toggle("is-hidden", expanded);
      });
      btn.setAttribute("aria-expanded", expanded ? "false" : "true");
      btn.textContent = expanded ? "Prikaži sve recenzije" : "Prikaži manje";
    });
  }

  /* ---------- MOBILNI IZBORNIK ---------- */
  function initMenu() {
    var toggle = document.getElementById("menuToggle");
    var nav = document.getElementById("nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- REVEAL ON SCROLL ---------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach(function (i) { i.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e, k) {
        if (e.isIntersecting) {
          var t = e.target;
          setTimeout(function () { t.classList.add("is-visible"); }, (k % 6) * 55);
          io.unobserve(t);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (i) { io.observe(i); });
  }

  /* ---------- HEADER SHADOW ON SCROLL ---------- */
  function initHeaderScroll() {
    var h = document.getElementById("header");
    if (!h) return;
    var onScroll = function () {
      h.style.boxShadow = window.scrollY > 12 ? "0 8px 26px -20px rgba(40,30,10,.28)" : "none";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- INIT ---------- */
  function init() {
    renderPrograms();
    renderTeam();
    renderReviews();
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
    initMenu();
    initReveal();
    initHeaderScroll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
