// RGBY · main-reel.jsx.txt · сборка 2026-10-14
var REEL_ID = "3eWDsHfMsvdXUWyNeKR7Qs";
var REEL_BG = "https://kinescope.io/embed/" + REEL_ID + "?autoplay=1&muted=1&loop=1&controls=0&autopause=0";
var REEL_FULL = "https://kinescope.io/embed/" + REEL_ID + "?autoplay=1";
var REEL_POSTER = window.RGBY_DATA && window.RGBY_DATA.img ? window.RGBY_DATA.img("hero-still.jpg") : (window.RGBY_BASE + "assets/images/hero-still.jpg");
var REEL_LOCAL = window.REEL_FILE || (() => {
  try {
    var h = location.href;
    if (/^(file|https?):/.test(h)) return new URL("showreel.mp4", h).href;
  } catch (e) {}
  return "showreel.mp4";
})();
var REEL_REMOTE = "https://raw.githubusercontent.com/AppleJK/css/main/video/showreel.mp4";
var REEL_BUNDLED = !document.querySelector('script[src*="main-reel"]');
var REEL_FILE = window.REEL_FILE || (location.protocol === "file:" || REEL_BUNDLED && /^https?:$/.test(location.protocol) && !/claude|anthropic/.test(location.hostname) ? REEL_LOCAL : REEL_BUNDLED ? "" : REEL_REMOTE);
var REEL_WARM = "https://kinescope.io/embed/" + REEL_ID + "?autoplay=0&muted=1&loop=1&controls=0&autopause=0&preload=auto";
var REEL_START = .8;
var REEL_VARIANTS = ["converge", "slit", "signal", "iris", "shutters", "pip", "tilt", "mask"];
var REEL_DIRS = [["ТВ/Медиа", "44,79,255"], ["Веб", "0,165,0"], ["Продакшн", "199,0,0"], ["R&D", "199,0,255"], ["Брендинг", "199,165,0"], ["Мультимедиа", "44,244,255"]];
var rc = (x, a, b) => Math.min(1, Math.max(0, (x - a) / (b - a)));
var rIo = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2,
  rExp = x => x >= 1 ? 1 : 1 - Math.pow(2, -10 * x),
  rQuart = x => x < .5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
var ins = (t, r, b, l) => "inset(" + t.toFixed(2) + "% " + r.toFixed(2) + "% " + b.toFixed(2) + "% " + l.toFixed(2) + "%)";
function ReelModal({
  open,
  onClose
}) {
  React.useEffect(() => {
    if (!open) return;
    var k = e => {
      if (e.key === "Escape") onClose();
    };
    addEventListener("keydown", k);
    document.documentElement.style.overflow = "hidden";
    return () => {
      removeEventListener("keydown", k);
      document.documentElement.style.overflow = "";
    };
  }, [open]);
  if (!open) return null;
  return ReactDOM.createPortal(React.createElement("div", {
    className: "rl-m",
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "\u0428\u043E\u0443\u0440\u0438\u043B RGBY",
    onClick: onClose
  }, React.createElement("button", {
    type: "button",
    className: "rl-m__x t-label",
    onClick: onClose
  }, "\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u2715"), React.createElement("div", {
    className: "rl-m__v",
    onClick: e => e.stopPropagation()
  }, React.createElement("iframe", {
    src: REEL_FULL,
    allow: "autoplay; fullscreen; picture-in-picture; encrypted-media",
    allowFullScreen: true,
    title: "\u0428\u043E\u0443\u0440\u0438\u043B RGBY"
  }))), document.body);
}
function Showreel({
  variant,
  setVariant
}) {
  var ref = React.useRef(null),
    maskRef = React.useRef(null),
    bRef = React.useRef(null);
  var [p, setP] = React.useState(0),
    [live, setLive] = React.useState(false),
    [ready, setReady] = React.useState(false),
    [open, setOpen] = React.useState(false),
    [vp, setVp] = React.useState({
      w: 1440,
      h: 900
    }),
    [org, setOrg] = React.useState("50% 50%");
  React.useEffect(() => {
    var raf = 0;
    var f = () => {
      raf = 0;
      var el = ref.current;
      if (!el) return;
      var r = el.getBoundingClientRect(),
        span = r.height - innerHeight,
        q = Math.min(1, Math.max(0, -r.top / Math.max(1, span)));
      setP(q);
      setVp({
        w: innerWidth,
        h: innerHeight
      });
      var red = matchMedia("(prefers-reduced-motion: reduce)").matches,
        inView = r.bottom > 0 && r.top < innerHeight;
      if (!inView) setLive(false);else if (r.top <= innerHeight * .35) setLive(true);
    };
    var q = () => {
      if (!raf) raf = requestAnimationFrame(f);
    };
    f();
    addEventListener("scroll", q, {
      passive: true
    });
    addEventListener("resize", q);
    return () => {
      removeEventListener("scroll", q);
      removeEventListener("resize", q);
      cancelAnimationFrame(raf);
    };
  }, []);
  var [fb, setFb] = React.useState(false),
    [blocked, setBlocked] = React.useState(false);
  React.useEffect(() => {
    if (!live) {
      setReady(false);
      setFb(false);
      return;
    }
    var t = setTimeout(() => setFb(true), 9000);
    return () => clearTimeout(t);
  }, [live]);
  var [warm, setWarm] = React.useState(false),
    vid = React.useRef(null),
    [fileErr, setFileErr] = React.useState(false),
    useFile = REEL_FILE && !fileErr;
  React.useEffect(() => {
    var go = () => setWarm(true);
    if (document.readyState === "complete") setTimeout(go, 600);else addEventListener("load", () => setTimeout(go, 600), {
      once: true
    });
  }, []);
  React.useEffect(() => {
    var v = vid.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    if (!live) {
      v.pause();
      return;
    }
    var tryPlay = () => {
      if (!v.paused) return;
      v.muted = true;
      var pr = v.play();
      if (pr && pr.then) pr.then(() => setBlocked(false), err => {
        if (err && err.name === "NotAllowedError") {
          setBlocked(true);
          setFb(true);
        }
      });
    };
    tryPlay();
    var iv = setInterval(tryPlay, 400),
      ev = ["pointerdown", "wheel", "keydown", "touchstart"];
    ev.forEach(n => addEventListener(n, tryPlay, {
      passive: true
    }));
    v.addEventListener("canplay", tryPlay);
    return () => {
      clearInterval(iv);
      ev.forEach(n => removeEventListener(n, tryPlay));
      v.removeEventListener("canplay", tryPlay);
    };
  }, [live, warm]);
  var passed = React.useRef(false);
  React.useEffect(() => {
    if (passed.current) {
      window.__scrollGate = null;
      return;
    }
    var el = ref.current;
    if (!el) return;
    var end = () => el.getBoundingClientRect().top + scrollY + el.offsetHeight - innerHeight;
    if (ready || fb) {
      passed.current = true;
      window.__scrollGate = null;
      return;
    }
    window.__scrollGate = end();
    var hold = () => {
      if (passed.current) return;
      var g = end();
      window.__scrollGate = g;
      if (window.__scrollTo && scrollY > g + 1) window.__scrollTo(g);
      if (scrollY > g + 1 && scrollY < g + innerHeight * 6) scrollTo(0, g);
    };
    addEventListener("scroll", hold, {
      passive: true
    });
    addEventListener("resize", hold);
    hold();
    return () => {
      removeEventListener("scroll", hold);
      removeEventListener("resize", hold);
      if (passed.current) window.__scrollGate = null;
    };
  }, [live, ready, fb]);
  React.useEffect(() => () => {
    window.__scrollGate = null;
  }, []);
  var loadT = React.useRef(0);
  React.useEffect(() => {
    if (!live) return;
    var on = e => {
      if (!/kinescope\.io$/.test(String(e.origin).replace(/^https?:\/\//, ""))) return;
      var d = e.data;
      if (typeof d === "string") {
        try {
          d = JSON.parse(d);
        } catch (x) {
          d = {
            type: d
          };
        }
      }
      if (!d || typeof d !== "object") return;
      var ev = String(d.event || d.type || d.method || d.name || "").toLowerCase().replace(/^.*[:.]/, ""),
        pl = d.data || d.payload || d.value || {},
        t = +(pl.currentTime ?? pl.time ?? d.currentTime ?? 0);
      if (ev === "playing" || (ev === "timeupdate" || ev === "progress") && t > 0.2) setReady(true);
    };
    addEventListener("message", on);
    return () => {
      removeEventListener("message", on);
      clearTimeout(loadT.current);
    };
  }, [live]);
  React.useLayoutEffect(() => {
    if (variant !== "mask") return;
    var m = () => {
      var o = maskRef.current,
        b = bRef.current;
      if (!o || !b) return;
      var a = o.getBoundingClientRect(),
        r = b.getBoundingClientRect();
      setOrg(((r.left + r.width * .16 - a.left) / a.width * 100).toFixed(2) + "% " + ((r.top + r.height * .5 - a.top) / a.height * 100).toFixed(2) + "%");
    };
    m();
    if (document.fonts) document.fonts.ready.then(m);
    addEventListener("resize", m);
    return () => removeEventListener("resize", m);
  }, [variant]);
  var red = matchMedia("(prefers-reduced-motion: reduce)").matches,
    P = red ? 1 : p,
    u = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--u")) || 1;
  var win = {},
    over = null,
    inner = null;
  if (variant === "slit") {
    var a = rQuart(rc(P, .05, .45)),
      b = rIo(rc(P, .4, .78)),
      sx = (1 - b) * 30,
      sy = 49.6 * (1 - a);
    win = {
      clipPath: ins(sy, sx, sy, sx)
    };
  } else if (variant === "signal") {
    var d = rExp(rc(P, 0, .25)),
      _a = rQuart(rc(P, .25, .5)),
      _b = rIo(rc(P, .45, .8)),
      _sx = 50 - 24 * _a - 26 * _b,
      _sy = 50 - 16 * _a - 34 * _b;
    win = {
      clipPath: ins(_sy, _sx, _sy, _sx),
      opacity: _a > 0 ? 1 : 0
    };
    over = React.createElement("i", {
      className: "rl-line",
      style: {
        transform: "scaleY(" + d.toFixed(4) + ")",
        opacity: 1 - rc(P, .3, .42)
      }
    });
  } else if (variant === "iris") {
    var _a2 = rIo(rc(P, .06, .78)),
      R = Math.hypot(vp.w, vp.h) / 2,
      r = _a2 * R;
    win = {
      clipPath: "circle(" + r.toFixed(1) + "px at 50% 50%)"
    };
    over = ["#C70000", "#00A500", "#2C4FFF"].map((c, i) => {
      var rr = r + (i + 1) * 34 * u * (1 - _a2) + (1 - rExp(rc(P, 0, .12))) * 200 * u;
      return React.createElement("i", {
        key: i,
        className: "rl-ring",
        style: {
          width: rr * 2 + "px",
          height: rr * 2 + "px",
          borderColor: c,
          opacity: (1 - rc(P, .6, .78)) * rExp(rc(P, 0, .1))
        }
      });
    });
  } else if (variant === "shutters") {
    over = React.createElement("div", {
      className: "rl-sh",
      "aria-hidden": "true"
    }, REEL_DIRS.map(([t, c], i) => {
      var k = rQuart(rc(P, .06 + i * .07, .4 + i * .07));
      return React.createElement("i", {
        key: t,
        style: {
          background: "rgb(" + c + ")",
          transform: "translateY(" + ((i % 2 ? 1 : -1) * k * 101).toFixed(2) + "%)"
        }
      }, React.createElement("span", {
        className: "t-label",
        style: {
          opacity: 1 - rc(k, 0, .3),
          color: i === 4 || i === 5 ? "#061025" : "#F3F4FF"
        }
      }, String(i + 1).padStart(2, "0"), " \xB7 ", t));
    }));
  } else if (variant === "pip") {
    var enter = rExp(rc(P, 0, .14)),
      _a3 = rIo(rc(P, .16, .8)),
      t = 60 * (1 - _a3),
      _r = 3 * (1 - _a3),
      _b2 = 6 * (1 - _a3),
      l = 70 * (1 - _a3),
      dy = (1 - enter) * 8;
    win = {
      clipPath: ins(t + dy, _r, _b2 - dy, l),
      opacity: enter
    };
    over = React.createElement("span", {
      className: "rl-pip t-label",
      style: {
        left: "calc(" + l.toFixed(2) + "% + 0px)",
        top: "calc(" + (t + dy).toFixed(2) + "% - " + 30 * u + "px)",
        opacity: enter * (1 - rc(_a3, 0, .3))
      }
    }, "\u25B6 \u0428\u043E\u0443\u0440\u0438\u043B RGBY \xB7 2026");
  } else if (variant === "tilt") {
    var _a4 = rIo(rc(P, .04, .8));
    win = {
      transform: "perspective(1400px) translateY(" + ((1 - _a4) * 34).toFixed(2) + "%) rotateX(" + ((1 - _a4) * 64).toFixed(2) + "deg) scale(" + (.56 + .44 * _a4).toFixed(4) + ")",
      transformOrigin: "50% 100%",
      opacity: rExp(rc(P, 0, .12))
    };
    over = React.createElement("div", {
      className: "rl-floor",
      "aria-hidden": "true",
      style: {
        opacity: (1 - rc(P, .4, .7)) * rExp(rc(P, 0, .12))
      }
    });
  } else if (variant === "mask") {
    var _a5 = rIo(rc(P, .06, .74)),
      s = Math.pow(70, _a5);
    inner = React.createElement("div", {
      className: "rl-mask",
      ref: maskRef,
      "aria-hidden": "true",
      style: {
        transform: "scale(" + s.toFixed(3) + ")",
        transformOrigin: org,
        opacity: 1 - rc(P, .66, .8)
      }
    }, React.createElement("span", null, "RG"), React.createElement("span", {
      ref: bRef
    }, "B"), React.createElement("span", null, "Y"));
  } else {
    var _a6 = rIo(rc(P, .05, .78)),
      _s = 34 * (1 - _a6),
      sp = (1 - rExp(rc(P, .1, .55))) * 90;
    win = {
      clipPath: ins(_s * .9, _s, _s * .9, _s)
    };
    over = [["#C70000", -1, -.5], ["#00A500", 0, 1], ["#2C4FFF", 1, -.5]].map(([c, dx, dy], i) => React.createElement("i", {
      key: i,
      className: "rl-ch",
      style: {
        inset: (_s * .9).toFixed(2) + "% " + _s.toFixed(2) + "%",
        borderColor: c,
        transform: "translate(calc(" + (dx * sp).toFixed(1) + " * var(--u)),calc(" + (dy * sp * .6).toFixed(1) + " * var(--u)))",
        opacity: 1 - rc(P, .55, .75)
      }
    }));
  }
  var capIn = rExp(rc(P, .78, .95)),
    titleOp = 1 - rc(P, .05, .3);
  return React.createElement("section", {
    id: "reel",
    ref: ref,
    className: "rl rl--" + variant,
    "data-screen-label": "02 \u0428\u043E\u0443\u0440\u0438\u043B"
  }, React.createElement(VariantSwitch, {
    label: "\u0428\u043E\u0443\u0440\u0438\u043B",
    value: variant,
    options: REEL_VARIANTS,
    onChange: setVariant
  }), React.createElement("div", {
    className: "rl__pin"
  }, React.createElement("div", {
    className: "rl__pre",
    style: {
      opacity: titleOp
    }
  }, React.createElement("span", {
    className: "t-label"
  }, "\u0428\u043E\u0443\u0440\u0438\u043B \xB7 2026"), React.createElement("span", {
    className: "t-label"
  }, "\u041B\u0438\u0441\u0442\u0430\u0439\u0442\u0435 \u2193")), React.createElement("div", {
    className: "rl__win",
    style: win
  }, blocked && !ready ? React.createElement("button", {
    type: "button",
    className: "rl__play",
    onClick: () => {
      var v = vid.current;
      if (v) {
        v.muted = true;
        var pr = v.play();
        if (pr && pr.then) pr.then(() => setBlocked(false), () => {});
      }
    }
  }, React.createElement("span", {
    className: "rl__play-i",
    "aria-hidden": "true"
  }), React.createElement("span", {
    className: "t-label"
  }, "\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0448\u043E\u0443\u0440\u0438\u043B")) : null, React.createElement("img", {
    className: "rl__poster",
    src: REEL_POSTER,
    alt: "",
    "aria-hidden": "true",
    decoding: "async"
  }), React.createElement("div", {
    className: "rl-ld" + (ready || fb ? " is-done" : "") + (live ? " is-live" : ""),
    "aria-hidden": "true"
  }, React.createElement("div", {
    className: "rl-ld__bars"
  }, ["#C70000", "#00A500", "#2C4FFF"].map((c, i) => React.createElement("i", {
    key: i,
    style: {
      "--c": c,
      "--i": i
    }
  }))), React.createElement("div", {
    className: "rl-ld__cap"
  }, React.createElement("span", {
    className: "t-label"
  }, live ? "Загружаем шоурил" : "Шоурил RGBY"), React.createElement("span", {
    className: "rl-ld__dots"
  }, React.createElement("i", null), React.createElement("i", null), React.createElement("i", null))), React.createElement("i", {
    className: "rl-ld__scan"
  })), useFile ? React.createElement("video", {
    ref: vid,
    className: "rl__v" + (ready ? " is-on" : ""),
    src: REEL_FILE,
    poster: REEL_POSTER,
    muted: true,
    loop: true,
    playsInline: true,
    preload: "auto",
    onTimeUpdate: e => {
      if (live && e.currentTarget.currentTime > .4) setReady(true);
    },
    onError: e => {
      var v = e.currentTarget;
      window.__reelErr = (v.error && v.error.code) + " @ " + v.src;
      if (v.src.indexOf(REEL_REMOTE) < 0) {
        console.warn("Шоурил: локальный файл недоступен, берём из репозитория —", v.src);
        v.src = REEL_REMOTE;
        v.load();
      } else {
        console.warn("Шоурил: файл недоступен, откат на Kinescope");
        setFileErr(true);
      }
    },
    "aria-hidden": "true",
    tabIndex: "-1"
  }) : warm || live ? React.createElement("iframe", {
    className: "rl__v",
    src: live ? REEL_BG : REEL_WARM,
    style: live ? null : {
      visibility: "hidden"
    },
    allow: "autoplay; fullscreen; encrypted-media",
    title: "\u0428\u043E\u0443\u0440\u0438\u043B RGBY \u2014 \u0444\u043E\u043D",
    tabIndex: "-1",
    "aria-hidden": "true"
  }) : null, inner, React.createElement("i", {
    className: "rl__shade"
  })), over, React.createElement("div", {
    className: "rl__cap",
    style: {
      opacity: capIn,
      transform: "translateY(calc(" + ((1 - capIn) * 24).toFixed(1) + " * var(--u)))",
      pointerEvents: capIn > .5 ? "auto" : "none"
    }
  }, React.createElement("h2", {
    className: "t-display-xl rl__h"
  }, "\u0428\u043E\u0443\u0440\u0438\u043B"), React.createElement("button", {
    type: "button",
    className: "rl__play",
    onClick: () => setOpen(true)
  }, React.createElement("i", {
    "aria-hidden": "true"
  }, "\u25B6"), React.createElement("span", {
    className: "t-h3-l"
  }, "\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0441\u043E \u0437\u0432\u0443\u043A\u043E\u043C")))), React.createElement(ReelModal, {
    open: open,
    onClose: () => setOpen(false)
  }));
}
Object.assign(window, {
  Showreel,
  REEL_VARIANTS
});