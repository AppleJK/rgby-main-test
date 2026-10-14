// RGBY · релизный режим (подключается только в index.release.html; в прототипе не грузится).
// Прячет переключатели вариантов/CMS, включает отправку брифа на /api, переводит внутренние ссылки прототипа в адреса сервера.
(function () {
  window.__RGBY_RELEASE = true;
  window.__RGBY_PROD = true; // лендинг: переключатели и CMS — только с ?admin
  window.RGBY_CONFIG = window.RGBY_CONFIG || {};
  window.__RGBY_API = "/api";
  // Опубликованные страницы. Остальные направления пока не выкладываются — ссылки на них показывают подсказку.
  var L = window.__RGBY_LINKS = { "../main/index.html": "/", "../main/": "/", "../landing/index.html": "/tv/", "../landing/": "/tv/", "../legal/policy.html": "/policy/", "../legal/cookies.html": "/cookies/", "../legal/consent.html": "/consent/" };
  // Предпросмотр релиза в редакторе (страница лежит в /ui_kits/…): ссылки не переводим — ведут на файлы проекта. На сервере — адреса /, /tv/, /policy/…
  var PREVIEW = /\/ui_kits\//.test(location.pathname);
  // Предпросмотр и стенд GitHub Pages (та же структура папок): ссылки ведут между релизными версиями и юр. страницами проекта
  if (PREVIEW) { L = window.__RGBY_LINKS = { "../main/index.html": "../main/index.release.html", "../main/": "../main/index.release.html", "../main/index.release.html": "../main/index.release.html", "../landing/index.html": "../landing/index.release.html", "../landing/": "../landing/index.release.html", "../landing/index.release.html": "../landing/index.release.html", "../legal/policy.html": "../legal/policy.html", "../legal/cookies.html": "../legal/cookies.html", "../legal/consent.html": "../legal/consent.html" }; if (/github\.io$/.test(location.hostname)) { window.__RGBY_API = null; var rt = location.href.split("/ui_kits/")[0]; window.REEL_FILE = window.REEL_FILE || rt + "/showreel.mp4"; } }
  // Релизная сборка (release/site): страницы в корне, /tv/, /policy/…; RGBY_BASE — путь от страницы до корня сайта (./ или ../). Работает и на сервере, и на GitHub Pages в подпапке.
  if (window.RGBY_BASE != null) { var B = window.RGBY_BASE; L = window.__RGBY_LINKS = { "../main/index.html": B, "../main/": B, "../main/index.release.html": B, "../landing/index.html": B + "tv/", "../landing/": B + "tv/", "../landing/index.release.html": B + "tv/", "../legal/policy.html": B + "policy/", "../legal/cookies.html": B + "cookies/", "../legal/consent.html": B + "consent/" }; window.__RGBY_API = /github\.io$/.test(location.hostname) ? null : "/api"; try { window.REEL_FILE = window.REEL_FILE || new URL(B + "showreel.mp4", location.href).href; } catch (e) {} }
  var DONE = {}; for (var k in L) DONE[L[k]] = 1; // уже переведённые адреса не трогаем повторно
  function map(h) {
    if (!h || !/^\.\.\//.test(h)) return h;
    if (DONE[h.split("#")[0]]) return h;
    var i = h.indexOf("#"), b = i < 0 ? h : h.slice(0, i), x = i < 0 ? "" : h.slice(i);
    return b in L ? L[b] + x : null;
  }
  window.__rgbyHref = map;
  var tt;
  function soon() {
    var el = document.getElementById("rgby-soon");
    if (!el) {
      el = document.createElement("div"); el.id = "rgby-soon"; el.setAttribute("role", "status");
      el.style.cssText = "position:fixed;left:50%;bottom:28px;z-index:10001;transform:translate(-50%,20px);opacity:0;transition:opacity .35s,transform .5s cubic-bezier(.16,1,.3,1);background:#061025;color:#F3F4FF;padding:14px 20px;font:700 15px/1.2 var(--font-sans,sans-serif);letter-spacing:-.02em;pointer-events:none";
      el.textContent = "Страница направления скоро появится";
      document.body.appendChild(el);
    }
    requestAnimationFrame(function () { el.style.opacity = "1"; el.style.transform = "translate(-50%,0)"; });
    clearTimeout(tt); tt = setTimeout(function () { el.style.opacity = "0"; el.style.transform = "translate(-50%,20px)"; }, 2400);
  }
  window.__rgbySoon = soon;
  function fix(e) {
    var a = e.target && e.target.closest && e.target.closest("a[href]"); if (!a) return;
    var h = a.getAttribute("href"); if (!/^\.\.\//.test(h)) return;
    var m = map(h);
    if (m == null) { if (e.type === "click") { e.preventDefault(); e.stopPropagation(); soon(); } return; }
    a.setAttribute("href", m);
  }
  ["pointerdown", "focusin", "click"].forEach(function (t) { document.addEventListener(t, fix, true); });
  function wrap() {
    var o = window.rgbyRouteOut; if (!o || o.__rel) return;
    var w = function (d, rect, href) { var m = map(href); if (m == null) { soon(); return; } o(d, rect, m); };
    w.__rel = true; window.rgbyRouteOut = w;
  }
  wrap(); document.addEventListener("DOMContentLoaded", wrap);
})();
