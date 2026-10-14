// RGBY · tune.js.txt · сборка 2026-10-14
(function () {
  var KEY_PUB = "rgby-tune-pub-v1",
    KEY_DRAFT = "rgby-tune-draft-v1";
  var TUNE = !!window.__RGBY_TUNE;
  var BPS = [{
    id: "uw",
    label: "Ultrawide",
    w: 3440,
    h: 1440,
    mq: "(min-width:2240px) and (min-aspect-ratio:21/10)"
  }, {
    id: "4k",
    label: "4K",
    w: 3840,
    h: 2160,
    mq: "(min-width:3200px) and (max-aspect-ratio:21/10)"
  }, {
    id: "2k",
    label: "2K",
    w: 2560,
    h: 1440,
    mq: "(min-width:2240px) and (max-width:3199.98px) and (max-aspect-ratio:21/10)"
  }, {
    id: "1920",
    label: "1920",
    w: 1920,
    h: 1080,
    mq: "(min-width:1680px) and (max-width:2239.98px)"
  }, {
    id: "1440",
    label: "1440",
    w: 1440,
    h: 900,
    mq: "(min-width:1280px) and (max-width:1679.98px)"
  }, {
    id: "1024",
    label: "1024",
    w: 1024,
    h: 768,
    mq: "(min-width:1024px) and (max-width:1279.98px)"
  }, {
    id: "768",
    label: "768",
    w: 768,
    h: 1024,
    mq: "(min-width:600px) and (max-width:1023.98px)"
  }, {
    id: "375",
    label: "375",
    w: 375,
    h: 812,
    mq: "(max-width:599.98px)"
  }];
  var PROPS = {
    fs: ["font-size", "px"],
    lh: ["line-height", ""],
    ls: ["letter-spacing", "em"],
    mw: ["max-width", "px"],
    mt: ["margin-top", "px"],
    mb: ["margin-bottom", "px"]
  };
  var norm = d => ({
    v: 1,
    text: d && d.text || {},
    bp: d && d.bp || {}
  });
  var read = k => {
    try {
      var v = JSON.parse(localStorage.getItem(k) || "null");
      return v && v.v === 1 ? v : null;
    } catch (e) {
      return null;
    }
  };
  var data = norm(TUNE ? read(KEY_DRAFT) || read(KEY_PUB) : read(KEY_PUB) || window.RGBY_TUNE_DATA);
  var attrQ = s => '"' + String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"';
  function selectorFor(el) {
    if (!el || el.nodeType !== 1) return null;
    var a = el.closest("[data-screen-label]") || el.closest("[id]");
    var base = "body",
      stop = document.body;
    if (a && a !== document.documentElement) {
      base = a.hasAttribute("data-screen-label") ? "[data-screen-label=" + attrQ(a.getAttribute("data-screen-label")) + "]" : "#" + CSS.escape(a.id);
      stop = a;
    }
    var parts = [];
    var n = el;
    while (n && n !== stop) {
      var p = n.parentElement;
      if (!p) return null;
      parts.unshift(n.tagName.toLowerCase() + ":nth-child(" + (Array.prototype.indexOf.call(p.children, n) + 1) + ")");
      n = p;
    }
    if (n !== stop) return null;
    return parts.length ? base + " > " + parts.join(" > ") : base;
  }
  var isLeaf = el => !!el && el.childNodes.length > 0 && Array.prototype.every.call(el.childNodes, n => n.nodeType === 3 || n.nodeType === 1 && n.tagName === "BR") && /\S/.test(el.textContent);
  var plain = el => Array.prototype.map.call(el.childNodes, n => n.nodeType === 3 ? n.nodeValue : n.classList && n.classList.contains("tune-br") ? "" : "\n").join("");
  function render(el, base, marks) {
    var pre = /pre/.test(getComputedStyle(el).whiteSpace);
    var frag = document.createDocumentFragment();
    var buf = "";
    var flush = () => {
      if (buf) frag.appendChild(document.createTextNode(buf));
      buf = "";
    };
    var add = s => {
      if (pre) {
        buf += s;
        return;
      }
      s.split("\n").forEach((seg, j) => {
        if (j) {
          flush();
          frag.appendChild(document.createElement("br"));
        }
        buf += seg;
      });
    };
    var parts = String(base).split(/(\s+)/);
    var w = -1;
    parts.forEach((s, i) => {
      if (!s) return;
      if (i % 2 === 0) {
        w++;
        add(s);
        return;
      }
      add(s);
      var b = marks[w];
      if (b && b.length) {
        flush();
        var br = document.createElement("br");
        br.className = "tune-br " + b.map(x => "tb-" + x).join(" ");
        frag.appendChild(br);
      }
    });
    flush();
    el.textContent = "";
    el.appendChild(frag);
    el.__tuneFirst = el.firstChild;
  }
  function applyDom() {
    var want = new Map();
    Object.keys(data.text).forEach(s => want.set(s, {
      text: data.text[s],
      marks: {}
    }));
    Object.keys(data.bp).forEach(b => {
      var m = data.bp[b];
      Object.keys(m).forEach(s => {
        var br = m[s].br;
        if (!br || !br.length) return;
        var o = want.get(s) || {
          text: null,
          marks: {}
        };
        br.forEach(k => (o.marks[k] = o.marks[k] || []).push(b));
        want.set(s, o);
      });
    });
    var touched = new Set();
    want.forEach((o, s) => {
      var el;
      try {
        el = document.querySelector(s);
      } catch (e) {
        return;
      }
      if (!el || !isLeaf(el)) return;
      if (!el.hasAttribute("data-tune-orig")) el.setAttribute("data-tune-orig", plain(el));
      touched.add(el);
      var base = o.text != null ? o.text : el.getAttribute("data-tune-orig");
      var sig = base + "|" + JSON.stringify(o.marks);
      if (el.__tuneSig === sig && el.firstChild === el.__tuneFirst) return;
      el.__tuneSig = sig;
      render(el, base, o.marks);
    });
    document.querySelectorAll("[data-tune-orig]").forEach(el => {
      if (touched.has(el)) return;
      var orig = el.getAttribute("data-tune-orig");
      el.removeAttribute("data-tune-orig");
      el.__tuneSig = null;
      render(el, orig, {});
    });
  }
  function cssFor(d) {
    d = norm(d);
    var out = ".tune-br{display:none}\n";
    BPS.forEach(b => {
      var m = d.bp[b.id];
      if (!m) return;
      var rules = "";
      Object.keys(m).forEach(s => {
        var o = m[s];
        var decl = "";
        Object.keys(PROPS).forEach(k => {
          if (o[k] != null && o[k] !== "") decl += PROPS[k][0] + ":" + o[k] + PROPS[k][1] + "!important;";
        });
        if (o.mw != null && o.ib) decl += "display:inline-block!important;";
        if (decl) rules += s + "{" + decl + "}\n";
      });
      if (Object.keys(m).some(s => m[s].br && m[s].br.length)) rules += ".tune-br.tb-" + b.id + "{display:inline}\n";
      if (rules) out += "@media " + b.mq + "{\n" + rules + "}\n";
    });
    return out;
  }
  function applyCss() {
    var st = document.getElementById("rgby-tune");
    if (!st) {
      st = document.createElement("style");
      st.id = "rgby-tune";
      document.head.appendChild(st);
    }
    st.textContent = cssFor(data);
  }
  var has = () => Object.keys(data.text).length || Object.keys(data.bp).length || document.querySelector("[data-tune-orig]");
  function apply() {
    applyCss();
    if (has()) applyDom();
  }
  var raf = 0;
  var schedule = () => {
    if (!raf) raf = requestAnimationFrame(() => {
      raf = 0;
      if (has()) applyDom();
    });
  };
  var start = () => {
    apply();
    new MutationObserver(schedule).observe(document.body, {
      childList: true,
      subtree: true
    });
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);else start();
  if (!TUNE) window.addEventListener("storage", e => {
    if (e.key === KEY_PUB) {
      data = norm(read(KEY_PUB) || window.RGBY_TUNE_DATA);
      apply();
    }
  });
  window.RGBYTune = {
    BPS,
    PROPS,
    selectorFor,
    isLeaf,
    plain,
    cssFor,
    preview(d) {
      data = norm(JSON.parse(JSON.stringify(d || {})));
      apply();
    },
    current() {
      var b = BPS.find(x => matchMedia(x.mq).matches);
      return b ? b.id : null;
    }
  };
})();