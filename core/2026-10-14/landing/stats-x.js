// RGBY · stats-x.jsx.txt · сборка 2026-10-14
var STAT_NOTES = ["С 2006 года делаем графику для федеральных и тематических каналов", "Федеральные каналы, тематические каналы, шоу и спецпроекты", "Золото «Медиабренда», «Медиакульта», TAGLINE, Silver Mercury"];
var stParse = v => {
  var m = String(v).match(/^(\d+)(.*)$/);
  return m ? {
    n: +m[1],
    suf: m[2]
  } : {
    n: 0,
    suf: String(v)
  };
};
var stClamp = x => Math.max(0, Math.min(1, x));
function useScrollProgress(ref) {
  var [p, setP] = React.useState(0);
  React.useEffect(() => {
    var raf = 0;
    var f = () => {
      raf = 0;
      var el = ref.current;
      if (!el) return;
      var r = el.getBoundingClientRect(),
        vh = window.innerHeight;
      setP(stClamp(-r.top / Math.max(1, r.height - vh)));
    };
    var req = () => {
      if (!raf) raf = requestAnimationFrame(f);
    };
    window.addEventListener("scroll", req, {
      passive: true
    });
    window.addEventListener("resize", req);
    f();
    return () => {
      window.removeEventListener("scroll", req);
      window.removeEventListener("resize", req);
      cancelAnimationFrame(raf);
    };
  }, []);
  return p;
}
function useInView(ref, threshold = .35) {
  var [v, setV] = React.useState(false);
  React.useEffect(() => {
    var el = ref.current;
    if (!el) return;
    var io = new IntersectionObserver(([e]) => setV(e.isIntersecting && !document.documentElement.hasAttribute("data-preloading")), {
      threshold
    });
    io.observe(el);
    var pre = () => {
      var r = el.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) setV(true);
    };
    window.addEventListener("rgby:preloaded", pre);
    return () => {
      io.disconnect();
      window.removeEventListener("rgby:preloaded", pre);
    };
  }, []);
  return v;
}
var PIX = {
  "0": ["###", "#.#", "#.#", "#.#", "###"],
  "1": [".#.", "##.", ".#.", ".#.", "###"],
  "2": ["###", "..#", "###", "#..", "###"],
  "3": ["###", "..#", ".##", "..#", "###"],
  "4": ["#.#", "#.#", "###", "..#", "..#"],
  "5": ["###", "#..", "###", "..#", "###"],
  "6": ["###", "#..", "###", "#.#", "###"],
  "7": ["###", "..#", ".#.", ".#.", ".#."],
  "8": ["###", "#.#", "###", "#.#", "###"],
  "9": ["###", "#.#", "###", "..#", "###"],
  "+": ["...", ".#.", "###", ".#.", "..."]
};
function PixelNumber({
  value,
  p
}) {
  var glyphs = String(value).split("").filter(c => PIX[c]);
  var map = {};
  var total = 0;
  glyphs.forEach((g, gi) => PIX[g].forEach((row, r) => row.split("").forEach((ch, c) => {
    if (ch === "#") map[gi + "-" + r + "-" + c] = total++;
  })));
  var rank = React.useMemo(() => {
    var o = Array.from({
      length: total
    }, (_, i) => i).sort(() => Math.random() - .5);
    var rk = [];
    o.forEach((ci, i) => rk[ci] = i);
    return rk;
  }, [value]);
  var litN = Math.round(p * total);
  return React.createElement("div", {
    className: "st-pix",
    style: {
      "--g": glyphs.length
    },
    ref: el => {
      if (!el) return;
      var r = el.getBoundingClientRect();
      el.style.setProperty("--pw", r.width + "px");
      el.style.setProperty("--ph", r.height + "px");
      el.querySelectorAll("i").forEach(c => {
        var q = c.getBoundingClientRect();
        c.style.setProperty("--cx", q.left - r.left + "px");
        c.style.setProperty("--cy", q.top - r.top + "px");
      });
    }
  }, glyphs.map((g, gi) => React.createElement("div", {
    key: gi,
    className: "st-pix__glyph"
  }, PIX[g].map((row, r) => row.split("").map((ch, c) => {
    var id = map[gi + "-" + r + "-" + c];
    var on = ch === "#";
    return React.createElement("i", {
      key: r + "-" + c,
      className: (on ? "is-cell" : "") + (on && rank[id] < litN ? " is-lit" : "")
    });
  })))));
}
function StatsGrid({
  stats,
  fill = "ink"
}) {
  var ref = React.useRef(null);
  var [ps, setPs] = React.useState(stats.map(() => 0));
  React.useEffect(() => {
    var raf = 0;
    var f = () => {
      raf = 0;
      var el = ref.current;
      if (!el) return;
      var vh = innerHeight;
      setPs([...el.querySelectorAll(".st-grid__cell")].map(c => {
        var r = c.getBoundingClientRect();
        return stClamp((vh * .95 - r.top) / (vh * .5));
      }));
    };
    var req = () => {
      if (!raf) raf = requestAnimationFrame(f);
    };
    addEventListener("scroll", req, {
      passive: true
    });
    addEventListener("resize", req);
    addEventListener("rgby:preloaded", req);
    f();
    return () => {
      removeEventListener("scroll", req);
      removeEventListener("resize", req);
      removeEventListener("rgby:preloaded", req);
      cancelAnimationFrame(raf);
    };
  }, []);
  var pre = document.documentElement.hasAttribute("data-preloading");
  return React.createElement("div", {
    ref: ref,
    className: "st-grid st-grid--" + fill
  }, stats.map((s, i) => React.createElement("div", {
    key: i,
    className: "st-grid__cell"
  }, React.createElement("div", {
    className: "st-grid__head"
  }, React.createElement("span", null, "CH ", String(i + 1).padStart(2, "0")), React.createElement("span", null, Math.round((pre ? 0 : ps[i]) * 100), "%")), React.createElement(PixelNumber, {
    value: s.v,
    p: pre ? 0 : ps[i]
  }), React.createElement("div", {
    className: "st-grid__label"
  }, s.l), STAT_NOTES[i] ? React.createElement("p", {
    className: "st-grid__note" + (!pre && ps[i] > .98 ? " is-on" : "")
  }, STAT_NOTES[i]) : null)));
}
function StatsX({
  fill
}) {
  return React.createElement(StatsGrid, {
    stats: window.RGBY_DATA.STATS,
    fill: fill
  });
}
Object.assign(window, {
  StatsX,
  STAT_NOTES
});