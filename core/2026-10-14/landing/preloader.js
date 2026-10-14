// RGBY · preloader.jsx.txt · сборка 2026-10-14
function useLoadProgress(minMs) {
  var [p, setP] = React.useState(0);
  React.useEffect(() => {
    var real = 0,
      raf,
      t0 = performance.now(),
      shown = 0,
      alive = true;
    var D = window.RGBY_DATA;
    var srcs = ["hero-rg.webp", "hero-cover.jpg", "hero-still.jpg"].map(n => D && D.img ? D.img(n) : (window.RGBY_BASE + "assets/images/") + n);
    var total = srcs.length + 1;
    var done = 0;
    var bump = () => {
      done++;
      real = done / total;
    };
    srcs.forEach(src => {
      var im = new Image();
      im.onload = im.onerror = bump;
      im.src = src;
      if (im.decode) im.decode().catch(() => {});
    });
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(bump);
    var tick = t => {
      if (!alive) return;
      var time = Math.min(1, (t - t0) / minMs);
      var target = Math.min(real, time * 0.96 + (real >= 1 && time >= 1 ? 0.04 : 0));
      shown += (target - shown) * 0.12;
      if (target >= 1 && shown > 0.995) shown = 1;
      setP(Math.round(shown * 100));
      if (shown < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    var safety = setTimeout(() => {
      real = 1;
    }, 6000);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      clearTimeout(safety);
    };
  }, []);
  return p;
}
function DrawMark({
  className = "",
  style,
  fill
}) {
  var G = window.RGBYDS.GLYPHS;
  var ref = React.useRef(null);
  React.useLayoutEffect(() => {
    ref.current.querySelectorAll("path").forEach((p, i) => {
      var L = p.getTotalLength ? p.getTotalLength() : 400;
      p.style.strokeDasharray = L;
      p.style.strokeDashoffset = L;
      p.style.setProperty("--L", L);
      p.style.setProperty("--i", i);
    });
    requestAnimationFrame(() => requestAnimationFrame(() => ref.current && ref.current.classList.add("pl-draw--go")));
  }, []);
  return React.createElement("svg", {
    ref: ref,
    className: "pl-draw " + className,
    style: style,
    viewBox: G.mark.vb,
    fill: fill ? "currentColor" : "none",
    dangerouslySetInnerHTML: {
      __html: G.mark.body
    }
  });
}
function FillMark({
  className = "",
  style
}) {
  var G = window.RGBYDS.GLYPHS;
  return React.createElement("svg", {
    className: className,
    style: style,
    viewBox: G.mark.vb,
    fill: "currentColor",
    dangerouslySetInnerHTML: {
      __html: G.mark.body
    }
  });
}
var EXIT_MS = {
  fade: 950,
  cubes: 1350,
  crt: 1100
};
var PL_BUS = {
  glitch: false,
  beam: false,
  stop: false
};
function VhsLogo({
  p,
  merged
}) {
  var box = React.useRef(null);
  var refs = [React.useRef(null), React.useRef(null), React.useRef(null)];
  var pr = React.useRef(p);
  pr.current = p;
  var mr = React.useRef(merged);
  mr.current = merged;
  React.useEffect(() => {
    var raf,
      t = 0,
      glitch = 0;
    var DIR = [[-1, .4], [1, -.55], [.15, 1]];
    var loop = () => {
      t++;
      var w = box.current ? box.current.offsetWidth : 200;
      if (mr.current) {
        PL_BUS.glitch = false;
        PL_BUS.stop = true;
        refs.forEach(r => {
          if (r.current) {
            r.current.style.transform = "";
            r.current.style.clipPath = "";
          }
        });
        return;
      }
      var k = Math.pow(1 - pr.current / 100, 1.2);
      if (!glitch && !PL_BUS.beam && Math.random() < .022) glitch = 4 + Math.random() * 5 | 0;
      var g = glitch > 0;
      if (g) glitch--;
      PL_BUS.glitch = g;
      if (t % 2 === 0 || g) refs.forEach((r, i) => {
        if (!r.current) return;
        var amp = w * (.075 * k + (g ? .03 * (.4 + k) : .0035));
        var x = DIR[i][0] * amp + (Math.random() - .5) * amp * .6;
        var y = DIR[i][1] * amp * .45 + (Math.random() - .5) * amp * .3;
        r.current.style.transform = "translate3d(" + x.toFixed(1) + "px," + y.toFixed(1) + "px,0)";
        r.current.style.clipPath = g && i !== 2 ? "inset(" + (Math.random() * 55 | 0) + "% 0 " + (Math.random() * 35 | 0) + "% 0)" : "";
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      PL_BUS.glitch = false;
    };
  }, [merged]);
  return React.createElement("div", {
    className: "pl__logo",
    ref: box,
    style: {
      "--mix": Math.min(1, Math.max(0, (p - 55) / 45)).toFixed(3)
    }
  }, ["r", "g", "b"].map((c, i) => React.createElement("svg", {
    key: c,
    ref: refs[i],
    className: "pl__ch pl__ch--" + c,
    viewBox: window.RGBYDS.GLYPHS.mark.vb,
    fill: "currentColor",
    dangerouslySetInnerHTML: {
      __html: window.RGBYDS.GLYPHS.mark.body
    }
  })), React.createElement(FillMark, {
    className: "pl__solid"
  }));
}
var GRAIN_CACHE = {};
function grainFrames(strong) {
  var key = strong ? "s" : "f";
  if (GRAIN_CACHE[key]) return GRAIN_CACHE[key];
  var S = 180,
    out = [];
  for (var f = 0; f < 6; f++) {
    var c = document.createElement("canvas");
    c.width = c.height = S;
    var ctx = c.getContext("2d"),
      im = ctx.createImageData(S, S),
      d = im.data;
    for (var i = 0; i < d.length; i += 4) {
      var v = Math.random() * 255;
      d[i] = d[i + 1] = v;
      d[i + 2] = Math.min(255, v * 1.08);
      d[i + 3] = strong ? 255 : Math.random() < .5 ? 14 : 30;
    }
    ctx.putImageData(im, 0, 0);
    out.push("url(" + c.toDataURL("image/png") + ")");
  }
  return GRAIN_CACHE[key] = out;
}
function Noise({
  className = "pl__grain",
  strong = false
}) {
  var ref = React.useRef(null);
  React.useEffect(() => {
    var fr = grainFrames(strong);
    var raf,
      last = 0,
      i = 0;
    var STEP = document.documentElement.classList.contains("is-touch") ? 125 : 42;
    var loop = t => {
      raf = requestAnimationFrame(loop);
      if (t - last < STEP || !ref.current) return;
      last = t;
      i = (i + 1 + (Math.random() * 3 | 0)) % fr.length;
      ref.current.style.backgroundImage = fr[i];
      ref.current.style.backgroundPosition = (Math.random() * 180 | 0) + "px " + (Math.random() * 180 | 0) + "px";
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  return React.createElement("div", {
    ref: ref,
    className: className,
    "aria-hidden": "true"
  });
}
var BEAM_EASE = ["cubic-bezier(.65,0,.35,1)", "cubic-bezier(.7,0,.3,1)", "cubic-bezier(.45,.05,.2,1)"];
function Beam() {
  var ref = React.useRef(null);
  React.useEffect(() => {
    var t,
      alive = true;
    var wait = () => {
      t = setTimeout(pass, 900 + Math.random() * 1600);
    };
    var pass = () => {
      var el = ref.current;
      if (!alive || !el || PL_BUS.stop) return;
      if (PL_BUS.glitch) {
        t = setTimeout(pass, 160);
        return;
      }
      PL_BUS.beam = true;
      var down = Math.random() < .7,
        rot = (Math.random() - .5) * 8,
        dur = 650 + Math.random() * 450;
      el.style.transition = "none";
      el.style.opacity = "0";
      el.style.transform = "translate3d(0," + (down ? -30 : 130) + "vh,0) rotate(" + rot.toFixed(1) + "deg)";
      void el.offsetHeight;
      el.style.transition = "transform " + dur + "ms " + BEAM_EASE[Math.random() * BEAM_EASE.length | 0] + ", opacity " + dur * .25 + "ms linear";
      el.style.opacity = "1";
      el.style.transform = "translate3d(0," + (down ? 130 : -30) + "vh,0) rotate(" + (-rot).toFixed(1) + "deg)";
      t = setTimeout(() => {
        if (el) el.style.opacity = "0";
        PL_BUS.beam = false;
        wait();
      }, dur);
    };
    PL_BUS.stop = false;
    wait();
    return () => {
      alive = false;
      clearTimeout(t);
      PL_BUS.beam = false;
    };
  }, []);
  return React.createElement("div", {
    ref: ref,
    className: "pl__scan",
    style: {
      opacity: 0
    }
  });
}
function vhsDate() {
  var m = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
    d = new Date();
  return m[d.getMonth()] + " " + String(d.getDate()).padStart(2, "0") + " " + d.getFullYear();
}
function Tiles() {
  var tiles = React.useMemo(() => {
    var W = window.innerWidth,
      H = window.innerHeight;
    var cols = W < 600 ? 8 : W < 1024 ? 12 : 16;
    var size = W / cols,
      rows = Math.ceil(H / size);
    var out = [];
    for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) {
      var dx = (c + .5) / cols - .5,
        dy = (r + .5) * size / H - .5;
      var dist = Math.min(1, Math.sqrt(dx * dx + dy * dy) / .7);
      out.push(Math.round((Math.random() * .55 + dist * .45) * 800));
    }
    return {
      cols,
      rows,
      size,
      out
    };
  }, []);
  return React.createElement("div", {
    className: "pl__tiles",
    style: {
      gridTemplateColumns: "repeat(" + tiles.cols + ",1fr)",
      gridAutoRows: tiles.size + "px"
    }
  }, tiles.out.map((dl, i) => React.createElement("i", {
    key: i,
    style: {
      "--dl": dl + "ms"
    }
  })));
}
function Preloader({
  variant = "A",
  exit = "cubes",
  line = "white",
  theme = "ink",
  onDone
}) {
  var p = useLoadProgress(variant === "C" ? 2600 : 2200);
  var [phase, setPhase] = React.useState("load");
  React.useEffect(() => {
    var root = document.documentElement;
    root.style.overflow = "hidden";
    root.setAttribute("data-preloading", "");
    window.scrollTo(0, 0);
    document.querySelectorAll(".rv--in").forEach(el => {
      if (!el.closest(".pl")) el.classList.remove("rv--in");
    });
    return () => {
      root.style.overflow = "";
      root.removeAttribute("data-preloading");
    };
  }, []);
  React.useEffect(() => {
    if (p < 100 || phase !== "load") return;
    var C = variant === "C";
    var a = setTimeout(() => setPhase("full"), C ? 250 : 350);
    var reveal = () => {
      document.documentElement.removeAttribute("data-preloading");
      document.documentElement.style.overflow = "";
      window.__rgbyPreloaded = true;
      window.dispatchEvent(new Event("rgby:preloaded"));
    };
    var b = setTimeout(() => {
      setPhase("exit");
      if (!C || exit !== "crt") reveal();else setTimeout(reveal, 350);
    }, C ? 1650 : 1050);
    var c = setTimeout(() => onDone && onDone(), (C ? 1650 + EXIT_MS[exit] : 2100) + 100);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
      clearTimeout(c);
    };
  }, [p >= 100]);
  var pct = String(p).padStart(2, "0");
  var cls = "pl pl--" + variant + " pl--" + phase;
  if (variant === "A") return React.createElement("div", {
    className: cls,
    style: {
      "--p": p / 100
    },
    "aria-busy": phase !== "exit",
    role: "progressbar",
    "aria-valuenow": p
  }, React.createElement("div", {
    className: "pl__panel"
  }), React.createElement("div", {
    className: "pl__stage"
  }, React.createElement("div", {
    className: "pl__logo"
  }, React.createElement(DrawMark, {
    className: "pl__outline"
  }), React.createElement(FillMark, {
    className: "pl__liquid",
    style: {
      clipPath: "inset(" + (100 - p) + "% 0 0 0)"
    }
  }))), React.createElement("div", {
    className: "pl__foot"
  }, React.createElement("span", {
    className: "pl__count"
  }, pct), React.createElement("span", {
    className: "pl__cap"
  }, "\u0422\u0412/\u041C\u0415\u0414\u0418\u0410 \u2014 \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u0435 \u0442\u0435\u043B\u0435\u043A\u0430\u043D\u0430\u043B\u043E\u0432 \u0438 \u043C\u0435\u0434\u0438\u0430\u043F\u0440\u043E\u0435\u043A\u0442\u043E\u0432")), React.createElement("div", {
    className: "pl__bar"
  }, React.createElement("i", {
    style: {
      transform: "scaleX(" + p / 100 + ")"
    }
  })));
  if (variant === "B") return React.createElement("div", {
    className: cls,
    "aria-busy": phase !== "exit",
    role: "progressbar",
    "aria-valuenow": p
  }, React.createElement("div", {
    className: "pl__half pl__half--t"
  }), React.createElement("div", {
    className: "pl__half pl__half--b"
  }), React.createElement("div", {
    className: "pl__stage"
  }, React.createElement("div", {
    className: "pl__logo"
  }, React.createElement(DrawMark, {
    className: "pl__outline"
  }), React.createElement(FillMark, {
    className: "pl__liquid",
    style: {
      clipPath: "inset(" + (100 - p) + "% 0 0 0)"
    }
  })), React.createElement("div", {
    className: "pl__word"
  }, React.createElement("span", {
    className: "rv-line"
  }, React.createElement("span", null, "\u0422\u0412/\u041C\u0415\u0414\u0418\u0410")))), React.createElement("div", {
    className: "pl__ring"
  }, React.createElement("svg", {
    viewBox: "0 0 40 40"
  }, React.createElement("circle", {
    cx: "20",
    cy: "20",
    r: "18",
    pathLength: "100",
    style: {
      strokeDashoffset: 100 - p
    }
  })), React.createElement("span", null, pct)));
  var tc = "00:00:" + String(Math.floor(p / 25)).padStart(2, "0") + ":" + String(Math.round(p % 25 * .96)).padStart(2, "0");
  return React.createElement("div", {
    className: cls + " pl--x-" + exit + " pl--line-" + line + " pl--bg-" + theme,
    "aria-busy": phase !== "exit",
    role: "progressbar",
    "aria-valuenow": p
  }, React.createElement("div", {
    className: "pl__screen"
  }, exit === "cubes" ? React.createElement(Tiles, null) : React.createElement("div", {
    className: "pl__bg"
  }), React.createElement("div", {
    className: "pl__fx"
  }, React.createElement(Noise, null), React.createElement("div", {
    className: "pl__noise"
  }), React.createElement(Beam, null), React.createElement("div", {
    className: "pl__flash"
  })), React.createElement("div", {
    className: "pl__glow"
  })), React.createElement("div", {
    className: "pl__stage"
  }, React.createElement(VhsLogo, {
    p: p,
    merged: phase !== "load"
  })), React.createElement("div", {
    className: "pl__osd",
    "aria-hidden": "true"
  }, React.createElement("i", {
    className: "pl__corner pl__corner--tl"
  }), React.createElement("i", {
    className: "pl__corner pl__corner--tr"
  }), React.createElement("i", {
    className: "pl__corner pl__corner--bl"
  }), React.createElement("i", {
    className: "pl__corner pl__corner--br"
  }), React.createElement("div", {
    className: "pl__top"
  }, React.createElement("span", {
    className: "pl__rec"
  }, React.createElement("b", null), phase === "load" ? "REC" : "STOP", React.createElement("em", null, "SP")), React.createElement("span", {
    className: "pl__tc"
  }, tc)), React.createElement("div", {
    className: "pl__side pl__side--l"
  }, React.createElement("span", null, "TRACKING"), React.createElement("span", {
    className: "pl__trk"
  }, Array.from({
    length: 9
  }).map((_, i) => React.createElement("i", {
    key: i,
    style: {
      "--o": Math.max(.15, 1 - Math.abs(i - 4 - Math.round((1 - p / 100) * 3 * Math.sin(p))) * .28)
    }
  })))), React.createElement("div", {
    className: "pl__side pl__side--r"
  }, React.createElement("span", null, "CH 01"), React.createElement("span", null, "RGBY \xB7 \u0422\u0412/\u041C\u0415\u0414\u0418\u0410")), React.createElement("span", {
    className: "pl__date"
  }, vhsDate())), React.createElement("div", {
    className: "pl__meta"
  }, React.createElement("span", {
    className: "pl__label"
  }, "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u044D\u0444\u0438\u0440\u0430"), React.createElement("span", {
    className: "pl__line"
  }, React.createElement("i", {
    style: {
      transform: "scaleX(" + p / 100 + ")"
    }
  })), React.createElement("span", {
    className: "pl__count"
  }, pct, "%")));
}
Object.assign(window, {
  Preloader,
  Noise
});