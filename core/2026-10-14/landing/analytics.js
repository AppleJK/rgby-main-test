// RGBY · analytics.js.txt · сборка 2026-10-14
(function () {
  if (window.__RGBY_TUNE || window.__RGBY_PERF) return;
  var KEY = "rgby-consent-v1";
  var read = () => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "null");
    } catch (e) {
      return null;
    }
  };
  var save = v => {
    try {
      localStorage.setItem(KEY, JSON.stringify({
        v: 1,
        analytics: !!v,
        ts: new Date().toISOString()
      }));
    } catch (e) {}
  };
  var ymReady = false;
  var queue = [];
  function loadYm() {
    var id = window.RGBY_YM_ID;
    if (!id || ymReady) return;
    ymReady = true;
    (function (m, e, t, r, i, k, a) {
      m[i] = m[i] || function () {
        (m[i].a = m[i].a || []).push(arguments);
      };
      m[i].l = 1 * new Date();
      k = e.createElement(t);
      a = e.getElementsByTagName(t)[0];
      k.async = 1;
      k.src = r;
      a.parentNode.insertBefore(k, a);
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
    window.ym(id, "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true
    });
    queue.splice(0).forEach(g => window.ym(id, "reachGoal", g));
  }
  window.rgbyGoal = function (goal) {
    if (window.RGBY_DEBUG_GOALS) console.log("[goal]", goal);
    if (ymReady && window.ym) window.ym(window.RGBY_YM_ID, "reachGoal", goal);else queue.push(goal);
    if (queue.length > 20) queue.shift();
  };
  document.addEventListener("click", e => {
    var a = e.target.closest && e.target.closest("a,[data-goal],.rg-case");
    if (!a) return;
    if (a.dataset && a.dataset.goal) return window.rgbyGoal(a.dataset.goal);
    if (a.classList.contains("rg-case")) return window.rgbyGoal("case_open");
    var h = a.getAttribute("href") || "";
    if (/^https?:\/\/(t\.me|telegram\.me)\//.test(h)) window.rgbyGoal("tg_click");else if (/^tel:/.test(h)) window.rgbyGoal("phone_click");else if (/^mailto:/.test(h)) window.rgbyGoal("email_click");else if (/yandex\.[a-z]+\/maps/.test(h)) window.rgbyGoal("address_click");
  }, true);
  var viewed = false;
  var onScroll = () => {
    if (viewed) return;
    var el = document.getElementById("brief");
    if (el && el.getBoundingClientRect().top < innerHeight * .6) {
      viewed = true;
      window.rgbyGoal("brief_view");
      removeEventListener("scroll", onScroll);
    }
  };
  addEventListener("scroll", onScroll, {
    passive: true
  });
  var hide = () => document.querySelectorAll("#brief input, #brief textarea").forEach(el => el.classList.add("ym-disable-keys", "ym-hide-content"));
  new MutationObserver(hide).observe(document.documentElement, {
    childList: true,
    subtree: true
  });
  var box = null;
  function close() {
    window.__rgbyCookiePending = false;
    dispatchEvent(new Event("rgby:cookies-done"));
    if (!box) return;
    box.classList.remove("ck--in");
    var b = box;
    box = null;
    setTimeout(() => b.remove(), 500);
  }
  function open() {
    if (box || read()) return;
    box = document.createElement("div");
    box.className = "ck";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-label", "Настройки cookies");
    box.innerHTML = '<p class="ck__t">Мы обрабатываем cookie-файлы с целью персонализации сервисов и удобства пользования веб-сайтом. Вы можете запретить обработку cookie-файлов в настройках браузера. Пожалуйста, ознакомьтесь с <a href="../legal/cookies.html">политикой использования cookie-файлов</a>.</p><div class="ck__a"><button type="button" class="ck__b" data-ck="0">Отклонить</button><button type="button" class="ck__b ck__b--on" data-ck="1">Принять</button></div>';
    box.addEventListener("click", e => {
      var b = e.target.closest("[data-ck]");
      if (!b) return;
      var ok = b.dataset.ck === "1";
      save(ok);
      close();
      if (ok) loadYm();else if (ymReady) location.reload();
    });
    document.body.appendChild(box);
    requestAnimationFrame(() => requestAnimationFrame(() => box && box.classList.add("ck--in")));
  }
  window.rgbyCookies = {
    open,
    state: read
  };
  var c = read();
  var start = () => {
    if (c && c.analytics) loadYm();else if (!c) {
      window.__rgbyCookiePending = true;
      var show = () => setTimeout(open, 1200);
      if (window.__rgbyPreloaded === false) {
        addEventListener("rgby:preloaded", show, {
          once: true
        });
        setTimeout(open, 6000);
      } else show();
    }
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);else start();
})();