// RGBY · публикация из CMS прямо в репозиторий стенда (GitHub Contents API). Без зависимостей.
// Токен (fine-grained, доступ только к репозиторию стенда, право Contents: Read and write) хранится только в этом браузере.
(function () {
  var KEY = "rgby-gh-v1";
  var DEF = { owner: "AppleJK", repo: "rgby-main-test", branch: "main", root: "" };
  function cfg() { try { return Object.assign({}, DEF, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) { return Object.assign({}, DEF); } }
  function save(c) { localStorage.setItem(KEY, JSON.stringify(c)); }
  function setup(force) {
    var c = cfg();
    if (c.token && !force) return c;
    var t = prompt("Токен GitHub для публикации в " + c.owner + "/" + c.repo + " (хранится только в этом браузере).\nСоздать: GitHub → Settings → Developer settings → Fine-grained tokens → доступ только к " + c.repo + ", Contents: Read and write.", c.token || "");
    if (t == null) return null; t = t.trim(); if (!t) return null;
    var r = prompt("Репозиторий (владелец/имя):", c.owner + "/" + c.repo); if (r && r.indexOf("/") > 0) { c.owner = r.split("/")[0].trim(); c.repo = r.split("/")[1].trim(); }
    c.token = t; save(c); return c;
  }
  function forget() { var c = cfg(); delete c.token; save(c); }
  function textB64(s) { var b = new TextEncoder().encode(s), o = ""; for (var i = 0; i < b.length; i += 0x8000) o += String.fromCharCode.apply(null, b.subarray(i, i + 0x8000)); return btoa(o); }
  function blobB64(b) { return new Promise(function (ok, no) { var r = new FileReader(); r.onload = function () { ok(String(r.result).split(",")[1]); }; r.onerror = no; r.readAsDataURL(b); }); }
  function api(c, path, opt) {
    return fetch("https://api.github.com/repos/" + c.owner + "/" + c.repo + "/contents/" + path.split("/").map(encodeURIComponent).join("/") + (opt && opt.method ? "" : "?ref=" + encodeURIComponent(c.branch)), Object.assign({ headers: { Authorization: "Bearer " + c.token, Accept: "application/vnd.github+json" } }, opt || {}));
  }
  async function putOne(c, path, b64, msg) {
    var full = (c.root ? c.root.replace(/\/$/, "") + "/" : "") + path, sha;
    var g = await api(c, full); if (g.status === 401) throw new Error("Токен не подходит (401)"); if (g.ok) { var j = await g.json(); sha = j.sha; if (j.content && j.content.replace(/\n/g, "") === b64) return "same"; }
    var p = await api(c, full, { method: "PUT", headers: { Authorization: "Bearer " + c.token, Accept: "application/vnd.github+json", "Content-Type": "application/json" }, body: JSON.stringify({ message: msg, content: b64, branch: c.branch, sha: sha }) });
    if (!p.ok) { var e = await p.json().catch(function () { return {}; }); throw new Error((e.message || ("Ошибка " + p.status)) + " — " + path); }
    return "ok";
  }
  // files: [{ path, text } | { path, blob } | { path, b64 }]; onStep(i, n, path)
  async function publish(files, msg, onStep) {
    var c = setup(false); if (!c) throw new Error("Публикация отменена: нет токена");
    var done = 0, same = 0;
    for (var i = 0; i < files.length; i++) {
      var f = files[i]; if (onStep) onStep(i + 1, files.length, f.path);
      var b64 = f.b64 || (f.blob ? await blobB64(f.blob) : textB64(f.text));
      (await putOne(c, f.path, b64, msg)) === "same" ? same++ : done++;
    }
    return { done: done, same: same, url: "https://" + c.owner.toLowerCase() + ".github.io/" + c.repo + "/" };
  }
  window.rgbyGH = { cfg: cfg, setup: setup, forget: forget, publish: publish, textB64: textB64 };
})();

// ───── Сервер (релиз 2026-10-14.4) ─────
// На стенде GitHub Pages всё выше работает как раньше. На своём сервере (любой адрес, кроме *.github.io)
// публикация уходит в серверную CMS (/admin/api/publish, вход по логину и роли), а черновики CMS
// хранятся на сервере — общие для всех, кто вошёл, и не теряются при смене браузера.
(function () {
  if (!/^https?:$/.test(location.protocol) || /github\.io$/.test(location.hostname)) return;
  var CMS_PAGE = /^\/admin\//.test(location.pathname) || /[?&]admin(=|&|$)/.test(location.search);
  var DRAFTS = ["rgby-news-cms-v1", "rgby-media-cms-v2-cases"];
  var toLogin = function () { location.href = "/ops/login?next=" + encodeURIComponent(location.pathname + location.search); };
  function syncGet(url) { var x = new XMLHttpRequest(); try { x.open("GET", url, false); x.send(); } catch (e) { return { status: 0 }; } return x; }

  if (CMS_PAGE) {
    // 1. Без входа CMS не открывается
    var me = syncGet("/ops/api/me");
    if (me.status === 401) { toLogin(); return; }
    // 2. Черновики берём с сервера до того, как CMS прочитает localStorage
    DRAFTS.forEach(function (k) {
      var r = syncGet("/admin/api/draft/" + k);
      try { if (r.status === 200) localStorage.setItem(k, JSON.parse(r.responseText).value); else if (r.status === 404) localStorage.removeItem(k); } catch (e) {}
    });
    // 3. Каждое сохранение черновика уходит на сервер (с задержкой, чтобы не слать на каждую букву)
    var set = Storage.prototype.setItem, del = Storage.prototype.removeItem, timers = {};
    var badge = function (t, bad) { var b = document.getElementById("rgby-draft-badge"); if (!b) { if (!document.body) return; b = document.createElement("div"); b.id = "rgby-draft-badge"; b.setAttribute("role", "status"); b.style.cssText = "position:fixed;right:16px;bottom:16px;z-index:100000;padding:8px 12px;font:600 12px/1.2 -apple-system,BlinkMacSystemFont,sans-serif;background:#061025;color:#F3F4FF;opacity:.85;pointer-events:none"; document.body.appendChild(b); } b.textContent = t; b.style.background = bad ? "#C70000" : "#061025"; };
    var push = function (k, method, value) {
      clearTimeout(timers[k]); badge("Черновик: сохраняю…");
      timers[k] = setTimeout(function () {
        fetch("/admin/api/draft/" + k, { method: method, credentials: "same-origin", headers: { "Content-Type": "application/json" }, body: method === "PUT" ? JSON.stringify({ value: value }) : undefined })
          .then(function (r) { if (r.status === 401) { badge("Сессия истекла — войдите снова", true); return; } badge(r.ok ? "Черновик сохранён на сервере · " + new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }) : "Черновик не сохранён (" + r.status + ")", !r.ok); })
          .catch(function () { badge("Нет связи — черновик пока только в этом браузере", true); });
      }, 800);
    };
    Storage.prototype.setItem = function (k, v) { set.call(this, k, v); if (this === window.localStorage && DRAFTS.indexOf(k) >= 0) push(k, "PUT", String(v)); };
    Storage.prototype.removeItem = function (k) { del.call(this, k); if (this === window.localStorage && DRAFTS.indexOf(k) >= 0) push(k, "DELETE"); };
    // 4. Кнопки «Опубликовать на GitHub» → «Опубликовать»
    var relabel = function () { document.querySelectorAll("button").forEach(function (b) { if (/на GitHub/.test(b.textContent)) b.textContent = b.textContent.replace(/\s*на GitHub/, ""); }); };
    document.addEventListener("DOMContentLoaded", function () { relabel(); new MutationObserver(relabel).observe(document.body, { childList: true, subtree: true, characterData: true }); });
  }

  // Публикация на сервер: тот же интерфейс rgbyGH.publish(files, msg, onStep)
  function b64(f) { return f.b64 ? Promise.resolve(f.b64) : f.blob ? new Promise(function (ok, no) { var r = new FileReader(); r.onload = function () { ok(String(r.result).split(",")[1]); }; r.onerror = no; r.readAsDataURL(f.blob); }) : Promise.resolve(window.rgbyGH.textB64(f.text)); }
  window.rgbyGH.publish = async function (files, message, onStep) {
    var out = [];
    for (var i = 0; i < files.length; i++) { if (onStep) onStep(i + 1, files.length, files[i].path); out.push({ path: files[i].path, b64: await b64(files[i]) }); }
    var r = await fetch("/admin/api/publish", { method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: message, files: out }) });
    var j = await r.json().catch(function () { return {}; });
    if (r.status === 401) { toLogin(); throw new Error("Нужно войти"); }
    if (!r.ok) throw new Error(j.error || ("Ошибка " + r.status));
    return { done: j.done, same: j.same, url: "/", version: j.version };
  };
  window.rgbyGH.setup = function () { return {}; };
  window.rgbyGH.forget = function () { fetch("/ops/api/logout", { method: "POST", credentials: "same-origin" }).then(toLogin); };
  window.rgbyGH.server = true;
})();
