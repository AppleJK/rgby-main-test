// RGBY · ds-loader.js.txt · сборка 2026-10-14
(function () {
  var NS = "RGBYMediaDesignSystem_80632e";
  var ROOT = (window.RGBY_BASE + "core/2026-10-14/components/");
  var FILES = ["brand/glyphs.js", "brand/Icon", "brand/Logo", "actions/Button", "actions/TextLink", "actions/CarouselArrow", "actions/Burger", "forms/TextField", "forms/ChoiceChip", "forms/Checkbox", "forms/FileAttach", "forms/BudgetSlider", "content/StatCard", "content/ServiceItem", "content/CtaCard", "content/CaseCard", "content/AwardItem", "content/ClientTile", "content/TeamMember", "overlay/Notice", "overlay/Modal"];
  function fromBundle() {
    return Promise.resolve(window[NS] && window[NS].Button ? window[NS] : null);
  }
  async function fromSource() {
    var srcs = await Promise.all(FILES.map(f => fetch(ROOT + f + (/\.js$/.test(f) ? "" : ".jsx")).then(r => r.text())));
    var names = [];
    var code = srcs.map(s => s.replace(/^import[^\n]*\n/gm, "").replace(/export (function|const) (\w+)/g, (m, k, n) => {
      names.push(n);
      return k + " " + n;
    })).join("\n");
    var out = Babel.transform("function __mod(){\n" + code + "\nreturn {" + names.join(",") + "};}", {
      presets: ["react"]
    }).code;
    return new Function("React", out + "\nreturn __mod();")(React);
  }
  window.__dsReady = fromBundle().then(ns => ns || fromSource()).then(ns => {
    window.RGBYDS = ns;
    return ns;
  });
})();