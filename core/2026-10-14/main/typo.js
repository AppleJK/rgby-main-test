// RGBY · русская типографика по редполитике (те же правила, что в Tuner core): неразрывный пробел после коротких предлогов,
// союзов и частиц, перед тире, между числом и единицей, после «№», в инициалах. Кавычки и тексты в полях ввода не трогает.
(function (G) {
  var NB = "\u00A0";
  var BIND = "в|во|на|и|а|но|к|ко|с|со|у|о|об|обо|от|до|по|за|из|изо|не|ни|для|без|над|под|про|при|что|как|или|чтобы|если|когда|где|либо|лишь|из-за|из-под|a|an|the|of|to|in|on|at|by|for|and|or";
  var reW = new RegExp("(^|[\\s(«„\"'\u2014\u2013/])(" + BIND + ") +(?=[^\\s])", "gi");
  var UNIT = "₽|%|руб\\.?|тыс\\.?|млн|млрд|мин|сек|ч|с|мс|км|м|см|мм|кг|г|л|МБ|ГБ|КБ|Мб|Гб|px|шт\\.?|лет|год|года|дней|дня|дн\\.?|раз|кадр\\w*|секунд\\w*|минут\\w*|час\\w*|наград\\w*|проект\\w*|кейс\\w*|человек|сотрудник\\w*|клиент\\w*";
  var reU = new RegExp("(\\d) +(" + UNIT + ")(?=$|[\\s.,;:!?)»])", "g");
  function run(s) {
    if (!s || s.length < 2 || !/[ ]/.test(s)) return s;
    if (/^\s+$/.test(s)) return s;
    var out = s.replace(reW, function (m, a, w) { return a + w + NB; });
    out = out.replace(reW, function (m, a, w) { return a + w + NB; });
    out = out.replace(/ +([\u2014\u2013])(?= )/g, NB + "$1");
    out = out.replace(/ +(же|ли|ль|бы|б)(?=$|[\s.,;:!?)»])/gi, NB + "$1");
    out = out.replace(reU, "$1" + NB + "$2");
    out = out.replace(/([№§]) +(?=\d)/g, "$1" + NB);
    out = out.replace(/(^|[\s(])([А-ЯЁA-Z]\.) ?([А-ЯЁA-Z]\.) +(?=[А-ЯЁA-Z][а-яёa-z])/g, "$1$2" + NB + "$3" + NB);
    out = out.replace(/([А-ЯЁ][а-яё]+) +([А-ЯЁ]\.) ?([А-ЯЁ]\.)/g, "$1" + NB + "$2" + NB + "$3");
    return out;
  }
  G.rgbyTypo = run;
})(typeof window !== "undefined" ? window : globalThis);

(function () {
  if (typeof document === "undefined" || window.__rgbyTypoOn) return; window.__rgbyTypoOn = true;
  var SKIP = /^(SCRIPT|STYLE|TEXTAREA|INPUT|SELECT|OPTION|CODE|PRE|NOSCRIPT|TEMPLATE)$/;
  function skip(n) { for (var e = n.parentNode; e && e.nodeType === 1; e = e.parentNode) { if (SKIP.test(e.nodeName) || e.isContentEditable || e.hasAttribute("data-no-typo")) return true; } return false; }
  function fixText(t) { var v = t.nodeValue; if (!v || v.indexOf(" ") < 0 || /@|:\/\//.test(v) || skip(t)) return; var r = window.rgbyTypo(v); if (r !== v) t.nodeValue = r; }
  function walk(root) {
    if (root.nodeType === 3) { fixText(root); return; }
    if (root.nodeType !== 1 || SKIP.test(root.nodeName)) return;
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), n; while ((n = w.nextNode())) fixText(n);
  }
  var q = new Set(), raf = 0;
  function flush() { raf = 0; q.forEach(function (n) { if (n.isConnected) walk(n); }); q.clear(); }
  function add(n) { q.add(n); if (!raf) raf = requestAnimationFrame(flush); }
  function start() {
    walk(document.body);
    new MutationObserver(function (ms) { for (var i = 0; i < ms.length; i++) { var m = ms[i]; if (m.type === "characterData") add(m.target); else for (var k = 0; k < m.addedNodes.length; k++) add(m.addedNodes[k]); } })
      .observe(document.body, { childList: true, subtree: true, characterData: true });
  }
  if (document.body) start(); else document.addEventListener("DOMContentLoaded", start);
})();
