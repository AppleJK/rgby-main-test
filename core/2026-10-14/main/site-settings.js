// RGBY · настройки страницы в релизе (с 2026-10-14.8). Работает только в сборке и только с ?admin.
//
// Кнопка «Tweaks» открывает панель Tweaks. Без неё панель в сборке не открыть: она ждёт сигнал от редактора Claude Design.
// Кнопка «Опубликовать настройки» записывает отличия от значений в коде в content/settings/<страница>.js
// через rgbyGH (gh-publish.js), как CMS: на стенде — коммит в репозиторий GitHub, на сервере — новая версия модуля content.
//
// Страница читает content/settings/<страница>.js при загрузке (window.RGBY_SETTINGS) и кладёт поверх значений в коде
// (MAIN_DEFAULTS в main-app, TWEAK_DEFAULTS в landing/app). Сами приложения отдают сюда текущее состояние через window.__RGBY_TWEAKS.
// Прототипы в Claude Design этот файл не читают: опубликованные значения в блок EDITMODE переносит tools/sync/settings.js.
(function () {
  if (!window.__RGBY_RELEASE || !/[?&]admin(=|&|$)/.test(location.search)) return;
  var SKIP = { showSwitchers: 1, showCms: 1 };
  var NAMES = { main: "Главная", tv: "ТВ/Медиа" };
  var same = function (a, b) { return JSON.stringify(a) === JSON.stringify(b); };
  var show = function (v) { return v === undefined ? "—" : JSON.stringify(v); };

  // отличия текущих значений от значений в коде — это и есть файл настроек
  function diff(tw) {
    var d = {};
    Object.keys(tw.values).forEach(function (k) { if (!SKIP[k] && !same(tw.values[k], tw.defaults[k])) d[k] = tw.values[k]; });
    return d;
  }
  // что поменяется по сравнению с уже опубликованным
  function changes(tw, d) {
    var pub = (window.RGBY_SETTINGS || {})[tw.page] || {}, keys = {}, out = [];
    Object.keys(pub).concat(Object.keys(d)).forEach(function (k) { keys[k] = 1; });
    Object.keys(keys).forEach(function (k) {
      var was = k in pub ? pub[k] : tw.defaults[k], now = k in d ? d[k] : tw.defaults[k];
      if (!same(was, now)) out.push({ k: k, was: was, now: now });
    });
    return out;
  }
  function fileText(page, d) {
    return "// RGBY · настройки страницы «" + NAMES[page] + "» поверх значений по умолчанию в коде.\n" +
      "// Опубликовано из панели Tweaks (?admin) " + new Date().toLocaleString("ru-RU") + ". Пустой объект — всё как в коде.\n" +
      "(window.RGBY_SETTINGS = window.RGBY_SETTINGS || {})." + page + " = " + JSON.stringify(d, null, 2) + ";\n";
  }

  function mount() {
    var bar = document.createElement("div");
    bar.id = "rgby-settings-bar";
    bar.style.cssText = "position:fixed;left:16px;bottom:16px;z-index:100001;display:flex;gap:6px;align-items:center;padding:6px;background:#061025;color:#F3F4FF;font:600 12px/1.2 -apple-system,BlinkMacSystemFont,sans-serif;box-shadow:0 4px 16px rgba(0,0,0,.25)";
    var btn = function (text) { var b = document.createElement("button"); b.type = "button"; b.textContent = text; b.style.cssText = "font:inherit;padding:7px 10px;border:0;cursor:pointer;background:#F3F4FF;color:#061025"; bar.appendChild(b); return b; };
    var tweaks = btn("Tweaks"), publish = btn("Опубликовать настройки");
    var msg = document.createElement("span"); msg.setAttribute("role", "status"); msg.style.cssText = "padding:0 6px;max-width:42vw"; bar.appendChild(msg);
    var say = function (t, bad) { msg.textContent = t; msg.style.color = bad ? "#FF8A8A" : "#F3F4FF"; };

    var open = false;
    tweaks.addEventListener("click", function () {
      open = !open;
      window.postMessage({ type: open ? "__activate_edit_mode" : "__deactivate_edit_mode" }, "*");
      tweaks.textContent = open ? "Скрыть Tweaks" : "Tweaks";
    });
    window.addEventListener("message", function (e) { if (e.data && e.data.type === "__edit_mode_dismissed") { open = false; tweaks.textContent = "Tweaks"; } });

    publish.addEventListener("click", function () {
      var tw = window.__RGBY_TWEAKS;
      if (!tw) return say("Страница ещё загружается", true);
      if (!window.rgbyGH) return say("Нет модуля публикации (gh-publish.js)", true);
      var d = diff(tw), ch = changes(tw, d);
      if (!ch.length) return say("Нечего публиковать: всё как уже опубликовано");
      var list = ch.map(function (c) { return c.k + ": " + show(c.was) + " → " + show(c.now); });
      if (!confirm("Опубликовать настройки страницы «" + NAMES[tw.page] + "»?\n\n" + list.join("\n"))) return;
      publish.disabled = true; say("Публикую…");
      window.rgbyGH.publish([{ path: "content/settings/" + tw.page + ".js", text: fileText(tw.page, d) }],
        "Настройки «" + NAMES[tw.page] + "»: " + ch.map(function (c) { return c.k; }).join(", "))
        .then(function (r) {
          (window.RGBY_SETTINGS = window.RGBY_SETTINGS || {})[tw.page] = d;
          say(window.rgbyGH.server ? "Опубликовано на сервере" : "Опубликовано. На стенде появится через 1–2 минуты");
        })
        .catch(function (e) { say("Не опубликовано: " + e.message, true); })
        .then(function () { publish.disabled = false; });
    });
    document.body.appendChild(bar);
  }
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", mount) : mount();
})();
