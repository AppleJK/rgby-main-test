// Переход «Главная → направление» (и обратно), работает между любыми страницами, в т.ч. между поддоменами.
// Уход: нажатая карточка/полоса направления раскрывается из своего прямоугольника на весь экран → переход по ссылке с #via=hub&...
// Приход: страница направления по параметрам сразу рисует тот же кадр (картинка + название), ждёт загрузку и «поднимает шторку».
(function () {
  var EASE = "cubic-bezier(.7,0,.2,1)";
  function css() {
    if (document.getElementById("rgby-route-css")) return;
    var s = document.createElement("style"); s.id = "rgby-route-css";
    s.textContent = ".rgr{position:fixed;inset:0;z-index:10000;overflow:hidden;background:#061025;color:#F3F4FF;pointer-events:all;will-change:clip-path}" +
      ".rgr__img{position:absolute;inset:0;background:center/cover;will-change:transform}" +
      ".rgr__tint{position:absolute;inset:0;background:linear-gradient(180deg,rgba(6,16,37,.55) 0%,rgba(6,16,37,.1) 45%,rgba(6,16,37,.8) 100%)}" +
      ".rgr__bar{position:absolute;left:0;right:0;bottom:0;height:4px;transform-origin:left}" +
      ".rgr__cap{position:absolute;left:var(--margin,40px);bottom:var(--margin,40px);display:flex;flex-direction:column;gap:12px;font-family:var(--font-sans,sans-serif)}" +
      ".rgr__n{font:700 12px/1 var(--font-sans,sans-serif);letter-spacing:.06em;text-transform:uppercase;opacity:.75}" +
      ".rgr__t{font:700 clamp(56px,9vw,168px)/.86 var(--font-sans,sans-serif);letter-spacing:-.055em}" +
      "@media (prefers-reduced-motion:reduce){.rgr{display:none}}";
    document.head.appendChild(s);
  }
  function build(o) {
    css();
    var el = document.createElement("div"); el.className = "rgr"; el.setAttribute("aria-hidden", "true");
    el.innerHTML = '<i class="rgr__img"></i><i class="rgr__tint"></i><span class="rgr__cap"><span class="rgr__n"></span><b class="rgr__t"></b></span><i class="rgr__bar"></i>';
    el.querySelector(".rgr__img").style.backgroundImage = "url(" + o.img + ")";
    el.querySelector(".rgr__bar").style.background = "rgb(" + o.c + ")";
    el.querySelector(".rgr__n").textContent = (o.n ? o.n + " · " : "") + "Направление";
    el.querySelector(".rgr__t").textContent = o.t;
    return el;
  }
  // уход с главной
  window.rgbyRouteOut = function (o, rect, href) {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { location.href = href; return; }
    var el = build(o), W = innerWidth, H = innerHeight, from = "inset(" + rect.top + "px " + (W - rect.right) + "px " + (H - rect.bottom) + "px " + rect.left + "px)";
    var cap = el.querySelector(".rgr__cap"), img = el.querySelector(".rgr__img"), bar = el.querySelector(".rgr__bar");
    document.body.appendChild(el);
    var pre = new Image(); pre.src = o.img;
    el.animate([{ clipPath: from }, { clipPath: "inset(0px 0px 0px 0px)" }], { duration: 950, easing: EASE, fill: "both" });
    img.animate([{ transform: "scale(1.18)" }, { transform: "scale(1)" }], { duration: 1300, easing: "cubic-bezier(.16,1,.3,1)", fill: "both" });
    cap.animate([{ opacity: 0, transform: "translateY(40px)" }, { opacity: 1, transform: "none" }], { duration: 700, delay: 450, easing: "cubic-bezier(.16,1,.3,1)", fill: "both" });
    bar.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], { duration: 900, delay: 500, easing: EASE, fill: "both" });
    var q = new URLSearchParams({ via: "hub", d: o.id || "", t: o.t, n: o.n || "", c: o.c, img: new URL(o.img, location.href).href });
    // данные кадра — в хэше: query-параметры меняют адрес страницы (и ломают предпросмотр/кэш), хэш — нет
    setTimeout(function () { location.href = href.split("#")[0] + "#" + q.toString(); }, 1250);
  };
  // назад по истории (bfcache) — убрать шторку
  addEventListener("pageshow", function (e) { if (e.persisted) document.querySelectorAll(".rgr").forEach(function (x) { x.remove(); }); });
  // приход на страницу направления
  var P = new URLSearchParams(location.hash.slice(1));
  if (P.get("via") === "hub") {
    window.__RGBY_NOPL = true; // свой прелоадер не нужен — кадр уже на экране
    var o = { t: P.get("t") || "", n: P.get("n") || "", c: P.get("c") || "44,79,255", img: P.get("img") || "" };
    var mount = function () {
      var el = build(o); document.documentElement.appendChild(el);
      var t0 = performance.now(), out = function () {
        var wait = Math.max(0, 500 - (performance.now() - t0));
        setTimeout(function () {
          el.querySelector(".rgr__cap").animate([{ opacity: 1, transform: "none" }, { opacity: 0, transform: "translateY(-60px)" }], { duration: 500, easing: EASE, fill: "both" });
          el.querySelector(".rgr__img").animate([{ transform: "none" }, { transform: "translateY(-12%) scale(1.04)" }], { duration: 1100, easing: EASE, fill: "both" });
          var a = el.animate([{ clipPath: "inset(0 0 0 0)" }, { clipPath: "inset(0 0 100% 0)" }], { duration: 1100, delay: 120, easing: EASE, fill: "both" });
          a.onfinish = function () { el.remove(); document.documentElement.style.background = ""; };
          try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {}
        }, wait);
      };
      if (document.readyState === "complete") setTimeout(out, 300); else addEventListener("load", function () { setTimeout(out, 300); });
    };
    // без пустого кадра: тёмный фон и шторка ставятся синхронно ещё в <head>, до появления <body> (оверлей вешается прямо на <html>)
    document.documentElement.style.background = "#061025";
    var hold = document.createElement("style"); hold.textContent = "body{visibility:hidden}.rgr{visibility:visible}"; document.head.appendChild(hold);
    mount();
    var show = function () { hold.remove(); };
    if (document.readyState !== "loading") show(); else document.addEventListener("DOMContentLoaded", function () { requestAnimationFrame(show); });
  }
})();
