// RGBY · main-hero.jsx.txt · сборка 2026-10-14
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var mhImgSt = d => {
  if (!d.fit) return {
    backgroundImage: "url(" + d.img + ")",
    backgroundPosition: d.pos || undefined
  };
  var f = d.fit.fill,
    s = "rgba(" + f + ",";
  return {
    backgroundColor: "rgb(" + f + ")",
    backgroundImage: "linear-gradient(180deg," + s + "1) 0%," + s + "1) 9%," + s + ".75) 15%," + s + "0) 26%," + s + "0) 74%," + s + ".75) 85%," + s + "1) 91%," + s + "1) 100%),url(" + d.img + ")",
    backgroundSize: "100% 100%,auto " + d.fit.size.replace("auto ", ""),
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center,center"
  };
};
var MHD = () => window.RGBY_MAIN;
var MH_RGB = {
  media: "44,79,255",
  web: "120,132,150",
  production: "199,0,0",
  rnd: "240,136,104",
  branding: "255,84,0",
  multimedia: "196,82,196"
};
var MH_MIX = {
  media: ["b"],
  web: ["g"],
  production: ["r"],
  rnd: ["r", "b"],
  branding: ["r", "g"],
  multimedia: ["g", "b"]
};
var MH_CH = [["r", "#C70000"], ["g", "#00A500"], ["b", "#2C4FFF"]];
var mhReduce = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
var mhU = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--u")) || 1;
var MhTitle = ({
  text
}) => React.createElement(React.Fragment, null, String(text).split("\n").map((l, i) => React.createElement(React.Fragment, {
  key: i
}, i ? React.createElement("br", null) : null, l)));
var mhLink = d => ({
  href: d.href,
  onClick: d.href === "#" ? e => e.preventDefault() : undefined
});
function useMhLoop(ref, tick, deps) {
  React.useEffect(() => {
    var el = ref.current;
    if (!el) return;
    var st = {
      mx: -1,
      my: -1,
      has: false,
      last: 0,
      t: 0,
      w: el.clientWidth,
      h: el.clientHeight
    };
    var raf = 0,
      vis = false,
      prev = performance.now();
    var ro = new ResizeObserver(() => {
      st.w = el.clientWidth;
      st.h = el.clientHeight;
    });
    ro.observe(el);
    var f = now => {
      var dt = Math.min(50, now - prev);
      prev = now;
      st.t += dt;
      tick(st, dt);
      if (vis && !mhReduce()) raf = requestAnimationFrame(f);
    };
    var io = new IntersectionObserver(([e]) => {
      vis = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (vis) {
        prev = performance.now();
        raf = requestAnimationFrame(f);
      }
    });
    io.observe(el);
    var mv = e => {
      var r = el.getBoundingClientRect();
      st.mx = e.clientX - r.left;
      st.my = e.clientY - r.top;
      st.has = true;
      st.last = st.t;
    };
    var lv = () => {
      st.has = false;
    };
    el.addEventListener("pointermove", mv);
    el.addEventListener("pointerleave", lv);
    tick(st, 16);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      el.removeEventListener("pointermove", mv);
      el.removeEventListener("pointerleave", lv);
    };
  }, deps || []);
}
function useMhRects(ref, sel, deps) {
  var [R, setR] = React.useState([]);
  React.useLayoutEffect(() => {
    var host = ref.current;
    if (!host) return;
    var els = Array.from(host.querySelectorAll(sel));
    var m = () => {
      var h = host.getBoundingClientRect();
      setR(els.map(el => {
        var r = el.getBoundingClientRect();
        return {
          x: r.left - h.left,
          y: r.top - h.top,
          w: r.width,
          h: r.height
        };
      }));
    };
    m();
    var ro = new ResizeObserver(m);
    ro.observe(host);
    els.forEach(el => ro.observe(el));
    if (document.fonts) document.fonts.ready.then(m);
    return () => ro.disconnect();
  }, deps || []);
  return R;
}
function MhChannels({
  vs
}) {
  var H = MHD().HERO,
    D = MHD().DIRECTIONS,
    ref = React.useRef(null),
    L = React.useRef([]),
    [hov, setHov] = React.useState(null);
  var S = React.useRef(MH_CH.map(() => ({
      x: 0,
      y: 0,
      vx: 0,
      vy: 0
    }))),
    V = React.useRef({
      x: 0,
      y: 0,
      px: -1,
      py: -1
    });
  useMhLoop(ref, (st, dt) => {
    var v = V.current,
      k = dt / 16;
    if (st.has && v.px >= 0) {
      v.x += (st.mx - v.px - v.x) * .25;
      v.y += (st.my - v.py - v.y) * .25;
    } else {
      v.x *= .9;
      v.y *= .9;
    }
    v.px = st.has ? st.mx : -1;
    v.py = st.has ? st.my : -1;
    var cx = st.has ? st.mx / st.w - .5 : Math.sin(st.t * .0007) * .25,
      cy = st.has ? st.my / st.h - .5 : Math.cos(st.t * .0009) * .2;
    var sp = Math.min(60, Math.hypot(v.x, v.y)),
      a = Math.atan2(v.y, v.x);
    S.current.forEach((s, i) => {
      var ang = a + (i - 1) * 2.1,
        tx = cx * (i - 1) * 22 + Math.cos(ang) * sp * .55 * (i === 1 ? .4 : 1),
        ty = cy * (i - 1) * 12 + Math.sin(ang) * sp * .55 * (i === 1 ? .4 : 1);
      s.vx += (tx - s.x) * .12 * k;
      s.vy += (ty - s.y) * .12 * k;
      s.vx *= Math.pow(.78, k);
      s.vy *= Math.pow(.78, k);
      s.x += s.vx * k;
      s.y += s.vy * k;
      var el = L.current[i];
      if (el) el.style.transform = "translate3d(" + s.x.toFixed(2) + "px," + s.y.toFixed(2) + "px,0)";
    });
  });
  var mix = hov ? MH_MIX[hov] : ["r", "g", "b"];
  return React.createElement("section", {
    id: "top",
    ref: ref,
    className: "m-hero mh mh--ch rv--in",
    "data-screen-label": "01 \u041E\u0431\u043B\u043E\u0436\u043A\u0430"
  }, vs, React.createElement(MainHeader, {
    tone: "blue"
  }), React.createElement("div", {
    className: "mh-ch"
  }, React.createElement("h1", {
    className: "mh-sr"
  }, H.title.replace("\n", " ")), MH_CH.map(([k, c], i) => React.createElement("div", {
    key: k,
    "aria-hidden": "true",
    ref: el => L.current[i] = el,
    className: "mh-ch__l t-display-xl",
    style: {
      color: c,
      opacity: mix.includes(k) ? 1 : 0
    }
  }, React.createElement(MhTitle, {
    text: H.title
  })))), React.createElement("div", {
    className: "mh-ch__foot"
  }, React.createElement("span", {
    className: "mh-ch__sum t-label",
    "aria-live": "polite"
  }, mix.map(m => m.toUpperCase()).join(" + "), hov ? " → " + D.find(d => d.id === hov).title : " = RGBY"), React.createElement("div", {
    className: "mh-ch__dirs",
    onPointerLeave: () => setHov(null)
  }, D.map(d => React.createElement("a", _extends({
    key: d.id
  }, mhLink(d), {
    className: "mh-ch__d" + (hov === d.id ? " is-on" : ""),
    style: {
      "--c": MH_RGB[d.id]
    },
    onPointerEnter: () => setHov(d.id),
    onFocus: () => setHov(d.id),
    onBlur: () => setHov(null)
  }), React.createElement("span", {
    className: "mh-ch__mix"
  }, MH_CH.map(([k, c]) => React.createElement("i", {
    key: k,
    style: {
      background: MH_MIX[d.id].includes(k) ? c : "transparent"
    }
  }))), React.createElement("span", {
    className: "t-label mh-ch__n"
  }, d.n), React.createElement("b", {
    className: "t-h3-l"
  }, d.title))))));
}
function MhPrism({
  vs
}) {
  var H = MHD().HERO,
    D = MHD().DIRECTIONS,
    ref = React.useRef(null),
    [hov, setHov] = React.useState(null),
    R = useMhRects(ref, ".mh-pr__d", []),
    host = useMhRects(ref, ".mh-pr__stage", [])[0];
  var A = React.useRef({
      x: 0,
      y: 0,
      rot: 0
    }),
    geo = React.useRef({
      R: [],
      host: null,
      u: 1
    }),
    svg = React.useRef(null),
    beams = React.useRef([]),
    rays = React.useRef([]),
    ends = React.useRef([]),
    prismG = React.useRef(null);
  var [box, setBox] = React.useState({
    w: 0,
    h: 0
  });
  React.useLayoutEffect(() => {
    var el = ref.current;
    if (!el) return;
    var m = () => setBox({
      w: el.clientWidth,
      h: el.clientHeight
    });
    m();
    var ro = new ResizeObserver(m);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  geo.current = {
    R,
    host,
    u: mhU()
  };
  useMhLoop(ref, st => {
    var {
      R,
      host,
      u
    } = geo.current;
    if (!host || !R.length || !prismG.current) return;
    var a = A.current,
      bx = host.x + host.w * .44,
      by = host.y + host.h * .58,
      ps = 46 * u;
    var tx = bx + (st.has ? (st.mx - bx) * .06 : Math.sin(st.t * .0006) * 10),
      ty = by + (st.has ? (st.my - by) * .1 : Math.cos(st.t * .0008) * 8);
    a.x = a.x ? a.x + (tx - a.x) * .08 : tx;
    a.y = a.y ? a.y + (ty - a.y) * .08 : ty;
    a.rot += ((st.has ? (st.my - by) * .05 : Math.sin(st.t * .0005) * 6) - a.rot) * .08;
    var X = a.x.toFixed(1),
      Y = a.y.toFixed(1);
    beams.current.forEach(l => {
      if (l) {
        l.setAttribute("y1", Y);
        l.setAttribute("x2", X);
        l.setAttribute("y2", Y);
      }
    });
    R.forEach((r, i) => {
      var ex = r.x - 18 * u,
        ey = r.y + r.h * .5,
        mx = a.x + (ex - a.x) * .55,
        d = "M " + (a.x + ps * .35).toFixed(1) + " " + Y + " C " + mx.toFixed(1) + " " + Y + " " + mx.toFixed(1) + " " + ey.toFixed(1) + " " + ex.toFixed(1) + " " + ey.toFixed(1);
      var pr = rays.current[i];
      if (pr) {
        pr[0] && pr[0].setAttribute("d", d);
        pr[1] && pr[1].setAttribute("d", d);
      }
      var e = ends.current[i];
      if (e) {
        e.setAttribute("x", (ex - 3).toFixed(1));
        e.setAttribute("y", (ey - 3).toFixed(1));
      }
    });
    prismG.current.setAttribute("transform", "translate(" + X + " " + Y + ") rotate(" + a.rot.toFixed(2) + ")");
  });
  var u = mhU(),
    ps = 46 * u,
    ready = R.length && host && box.w;
  return React.createElement("section", {
    id: "top",
    ref: ref,
    className: "m-hero mh mh--pr rv--in",
    "data-screen-label": "01 \u041E\u0431\u043B\u043E\u0436\u043A\u0430"
  }, vs, React.createElement(MainHeader, {
    tone: "blue"
  }), React.createElement("div", {
    className: "mh-pr__stage"
  }, React.createElement("h1", {
    className: "mh-pr__h t-display-xl"
  }, React.createElement(MhTitle, {
    text: H.title
  })), React.createElement("div", {
    className: "mh-pr__dirs",
    onPointerLeave: () => setHov(null)
  }, D.map(d => React.createElement("a", _extends({
    key: d.id
  }, mhLink(d), {
    className: "mh-pr__d" + (hov === d.id ? " is-on" : hov ? " is-dim" : ""),
    style: {
      "--c": MH_RGB[d.id]
    },
    onPointerEnter: () => setHov(d.id),
    onFocus: () => setHov(d.id),
    onBlur: () => setHov(null)
  }), React.createElement("span", {
    className: "t-label"
  }, d.n), React.createElement("b", {
    className: "t-h1"
  }, d.title), React.createElement("span", {
    className: "t-body-m mh-pr__sub"
  }, d.sub))))), ready ? React.createElement("svg", {
    ref: svg,
    className: "mh-pr__svg",
    "aria-hidden": "true",
    viewBox: "0 0 " + box.w + " " + box.h
  }, React.createElement("line", {
    ref: el => beams.current[0] = el,
    x1: "0",
    className: "mh-pr__beam"
  }), React.createElement("line", {
    ref: el => beams.current[1] = el,
    x1: "0",
    className: "mh-pr__beam mh-pr__flow",
    style: {
      animationDuration: "1.8s"
    }
  }), D.map((d, i) => {
    var on = hov === d.id;
    if (!rays.current[i]) rays.current[i] = [];
    return React.createElement("g", {
      key: d.id,
      style: {
        "--c": MH_RGB[d.id],
        opacity: hov ? on ? 1 : .14 : 1
      },
      className: "mh-pr__ray"
    }, React.createElement("path", {
      ref: el => rays.current[i][0] = el,
      className: "mh-pr__rb",
      style: {
        strokeWidth: on ? 3 : 1.4
      }
    }), React.createElement("path", {
      ref: el => rays.current[i][1] = el,
      className: "mh-pr__flow",
      style: {
        animationDuration: (on ? 0.9 : 1.6 + i % 3 * .45) + "s",
        animationDelay: -i * .37 + "s"
      }
    }), React.createElement("rect", {
      ref: el => ends.current[i] = el,
      width: "6",
      height: "6",
      className: "mh-pr__end"
    }));
  }), React.createElement("g", {
    ref: prismG
  }, React.createElement("polygon", {
    points: "0," + -ps * .62 + " " + ps * .55 + "," + ps * .4 + " " + -ps * .55 + "," + ps * .4,
    className: "mh-pr__prism"
  }))) : null);
}
function MhLayer({
  d,
  on
}) {
  var tc = React.useRef(null);
  React.useEffect(() => {
    if (d.id !== "production" || !on) return;
    var f = 0;
    var id = setInterval(() => {
      f++;
      if (tc.current) tc.current.textContent = "00:00:" + String(Math.floor(f / 25) % 60).padStart(2, "0") + ":" + String(f % 25).padStart(2, "0");
    }, 40);
    return () => clearInterval(id);
  }, [on]);
  var img = {
    backgroundImage: "url(" + d.img + ")"
  };
  var body = null;
  if (d.id === "media") body = React.createElement(React.Fragment, null, React.createElement("i", {
    className: "mh-pt__img",
    style: img
  }), window.Noise ? React.createElement(window.Noise, {
    className: "mh-pt__noise"
  }) : null, React.createElement("i", {
    className: "mh-pt__scan"
  }), React.createElement("span", {
    className: "mh-pt__tag t-label"
  }, "\u25CF \u042D\u0424\u0418\u0420"));else if (d.id === "web") body = React.createElement(React.Fragment, null, React.createElement("i", {
    className: "mh-pt__grid"
  }, Array.from({
    length: 12
  }, (_, i) => React.createElement("b", {
    key: i
  }))), React.createElement("i", {
    className: "mh-pt__box",
    style: {
      left: "8%",
      top: "16%",
      width: "56%",
      height: "34%"
    }
  }, React.createElement("span", {
    className: "t-label"
  }, "h1 \xB7 108")), React.createElement("i", {
    className: "mh-pt__box",
    style: {
      left: "68%",
      top: "16%",
      width: "24%",
      height: "52%"
    }
  }, React.createElement("span", {
    className: "t-label"
  }, "img \xB7 4:5")), React.createElement("i", {
    className: "mh-pt__box",
    style: {
      left: "8%",
      top: "56%",
      width: "40%",
      height: "14%"
    }
  }, React.createElement("span", {
    className: "t-label"
  }, "p \xB7 20")));else if (d.id === "production") body = React.createElement(React.Fragment, null, React.createElement("i", {
    className: "mh-pt__img",
    style: img
  }), React.createElement("i", {
    className: "mh-pt__frame"
  }), React.createElement("span", {
    className: "mh-pt__tag t-label"
  }, "\u25CF REC ", React.createElement("span", {
    ref: tc
  }, "00:00:00:00")));else if (d.id === "rnd") body = React.createElement("i", {
    className: "mh-pt__img mh-pt__dots",
    style: img
  });else if (d.id === "branding") body = React.createElement("svg", {
    className: "mh-pt__con",
    viewBox: "0 0 100 60",
    preserveAspectRatio: "xMidYMid slice"
  }, React.createElement("circle", {
    cx: "50",
    cy: "30",
    r: "22"
  }), React.createElement("circle", {
    cx: "50",
    cy: "30",
    r: "13.6"
  }), React.createElement("circle", {
    cx: "36.4",
    cy: "30",
    r: "13.6"
  }), React.createElement("circle", {
    cx: "63.6",
    cy: "30",
    r: "13.6"
  }), React.createElement("line", {
    x1: "0",
    y1: "30",
    x2: "100",
    y2: "30"
  }), React.createElement("line", {
    x1: "50",
    y1: "0",
    x2: "50",
    y2: "60"
  }), React.createElement("line", {
    x1: "28",
    y1: "0",
    x2: "72",
    y2: "60"
  }), React.createElement("line", {
    x1: "72",
    y1: "0",
    x2: "28",
    y2: "60"
  }), React.createElement("rect", {
    x: "28",
    y: "8",
    width: "44",
    height: "44"
  }));else body = React.createElement("i", {
    className: "mh-pt__img mh-pt__led",
    style: img
  });
  return React.createElement("div", {
    className: "mh-pt__layer mh-pt__layer--" + d.id + (on ? " is-on" : "")
  }, body);
}
function MhPortals({
  vs
}) {
  var H = MHD().HERO,
    D = MHD().DIRECTIONS,
    ref = React.useRef(null),
    lens = React.useRef(null),
    [cur, setCur] = React.useState(0),
    [auto, setAuto] = React.useState(true),
    P = React.useRef({
      x: 0,
      y: 0,
      r: 0
    });
  React.useEffect(() => {
    if (!auto) return;
    var id = setInterval(() => setCur(c => (c + 1) % D.length), 2600);
    return () => clearInterval(id);
  }, [auto]);
  useMhLoop(ref, st => {
    var p = P.current,
      idle = !st.has || st.t - st.last > 1800,
      u = mhU();
    var tx = idle ? st.w * (.62 + Math.sin(st.t * .00042) * .2) : st.mx,
      ty = idle ? st.h * (.5 + Math.sin(st.t * .00067 + 1) * .2) : st.my;
    p.x = p.x ? p.x + (tx - p.x) * (idle ? .03 : .14) : tx;
    p.y = p.y ? p.y + (ty - p.y) * (idle ? .03 : .14) : ty;
    p.r = p.r ? p.r + ((idle ? 190 : 230) * u - p.r) * .08 : (idle ? 190 : 230) * u;
    var el = lens.current;
    if (el) {
      el.style.setProperty("--mx", p.x.toFixed(1) + "px");
      el.style.setProperty("--my", p.y.toFixed(1) + "px");
      el.style.setProperty("--lr", p.r.toFixed(1) + "px");
    }
  });
  var d = D[cur];
  return React.createElement("section", {
    id: "top",
    ref: ref,
    className: "m-hero mh mh--pt rv--in",
    "data-screen-label": "01 \u041E\u0431\u043B\u043E\u0436\u043A\u0430"
  }, vs, React.createElement("div", {
    className: "mh-pt__lens",
    ref: lens,
    "aria-hidden": "true"
  }, D.map((x, i) => React.createElement(MhLayer, {
    key: x.id,
    d: x,
    on: i === cur
  })), React.createElement("i", {
    className: "mh-pt__ring"
  }), React.createElement("span", {
    className: "mh-pt__name t-label"
  }, d.n, " \xB7 ", d.title)), React.createElement(MainHeader, {
    tone: "blue"
  }), React.createElement("h1", {
    className: "m-hero__h t-display-xl mh-pt__h"
  }, React.createElement(MhTitle, {
    text: H.title
  })), React.createElement("div", {
    className: "mh-pt__dirs",
    onPointerLeave: () => setAuto(true)
  }, D.map((x, i) => React.createElement("a", _extends({
    key: x.id
  }, mhLink(x), {
    className: "mh-pt__d" + (i === cur ? " is-on" : ""),
    onPointerEnter: () => {
      setAuto(false);
      setCur(i);
    },
    onFocus: () => {
      setAuto(false);
      setCur(i);
    }
  }), React.createElement("i", {
    className: "mh-pt__bar"
  }, React.createElement("b", {
    key: cur + ":" + auto,
    className: i === cur && auto ? "is-run" : i === cur ? "is-full" : ""
  })), React.createElement("span", {
    className: "t-label"
  }, x.n), React.createElement("b", {
    className: "t-h3-l"
  }, x.title)))));
}
function MhStrips({
  vs
}) {
  var H = MHD().HERO,
    D = MHD().DIRECTIONS,
    ref = React.useRef(null),
    S = React.useRef([]),
    G = React.useRef(D.map(() => 1)),
    [act, setAct] = React.useState(-1);
  useMhLoop(ref, (st, dt) => {
    var n = D.length,
      idle = !st.has,
      x = idle ? (Math.sin(st.t * .00035) * .5 + .5) * st.w : st.mx,
      sig = st.w / n * .9;
    var best = 0,
      bv = 0;
    S.current.forEach((el, i) => {
      if (!el) return;
      var c = el.offsetLeft + el.offsetWidth / 2,
        g = 1 + (idle ? 2.2 : 4.4) * Math.exp(-Math.pow((x - c) / sig, 2));
      G.current[i] += (g - G.current[i]) * Math.min(1, dt / 16 * .12);
      el.style.flexGrow = G.current[i].toFixed(4);
      el.style.setProperty("--k", ((G.current[i] - 1) / 4.4).toFixed(3));
      if (g > bv) {
        bv = g;
        best = i;
      }
    });
    var na = idle ? -1 : best;
    if (S.current.__a !== na) {
      S.current.__a = na;
      setAct(na);
    }
  });
  return React.createElement("section", {
    id: "top",
    ref: ref,
    className: "m-hero mh mh--st rv--in",
    "data-screen-label": "01 \u041E\u0431\u043B\u043E\u0436\u043A\u0430"
  }, vs, React.createElement("div", {
    className: "mh-st"
  }, D.map((d, i) => React.createElement("a", _extends({
    key: d.id
  }, mhLink(d), {
    ref: el => S.current[i] = el,
    className: "mh-st__s" + (act === i ? " is-on" : ""),
    style: {
      "--c": MH_RGB[d.id]
    }
  }), React.createElement("i", {
    className: "mh-st__img",
    style: mhImgSt(d)
  }), React.createElement("span", {
    className: "mh-st__cap"
  }, React.createElement("span", {
    className: "t-label"
  }, d.n), React.createElement("b", {
    className: "t-h1"
  }, d.title), React.createElement("span", {
    className: "t-body-m mh-st__sub"
  }, d.sub)), React.createElement("span", {
    className: "mh-st__vt t-h3-l",
    "aria-hidden": "true"
  }, d.title)))), React.createElement("div", {
    className: "mh-st__top"
  }, React.createElement(MainHeader, {
    tone: "blue"
  }), React.createElement("h1", {
    className: "m-hero__h t-display-xl"
  }, React.createElement(MhTitle, {
    text: H.title
  }))));
}
function MhRouter({
  vs
}) {
  var H = MHD().HERO,
    D = MHD().DIRECTIONS,
    ref = React.useRef(null),
    area = React.useRef(null),
    [hov, setHov] = React.useState(null);
  var ports = useMhRects(area, ".mh-rt__p", []),
    hubR = useMhRects(area, ".mh-rt__hub", [])[0],
    paths = React.useRef([]),
    pk = React.useRef([]),
    hovR = React.useRef(null);
  hovR.current = hov;
  var lines = React.useMemo(() => !hubR || ports.length < 6 ? [] : ports.map((p, i) => {
    var left = i < 3,
      hx = left ? hubR.x : hubR.x + hubR.w,
      hy = hubR.y + hubR.h * (.25 + i % 3 * .25),
      px = left ? p.x + p.w : p.x,
      py = p.y + p.h / 2,
      mx = hx + (px - hx) * (.45 + i % 3 * .08);
    return "M " + hx + " " + hy + " H " + mx + " V " + py + " H " + px;
  }), [hubR, ports]);
  var prog = React.useRef(D.map((_, i) => [i * .17, i * .17 + .5]));
  useMhLoop(ref, (st, dt) => {
    D.forEach((d, i) => {
      var p = paths.current[i];
      if (!p) return;
      var L = p.getTotalLength(),
        on = hovR.current === d.id,
        sp = (on ? .0011 : .00028 + i % 3 * .00006) * dt;
      prog.current[i] = prog.current[i].map((q, j) => {
        q = (q + sp) % 1;
        var e = q < .5 ? 4 * q * q * q : 1 - Math.pow(-2 * q + 2, 3) / 2,
          pt = p.getPointAtLength(e * L),
          el = pk.current[i * 2 + j];
        if (el) {
          el.style.transform = "translate(" + pt.x.toFixed(1) + "px," + pt.y.toFixed(1) + "px)";
          el.style.opacity = hovR.current && !on ? .15 : 1;
        }
        return q;
      });
    });
  }, [lines.length]);
  return React.createElement("section", {
    id: "top",
    ref: ref,
    className: "m-hero mh mh--rt rv--in",
    "data-screen-label": "01 \u041E\u0431\u043B\u043E\u0436\u043A\u0430"
  }, vs, React.createElement(MainHeader, {
    tone: "paper"
  }), React.createElement("h1", {
    className: "m-hero__h t-display-xl mh-rt__h"
  }, React.createElement(MhTitle, {
    text: H.title
  })), React.createElement("div", {
    className: "mh-rt",
    ref: area,
    onPointerLeave: () => setHov(null)
  }, React.createElement("svg", {
    className: "mh-rt__svg",
    "aria-hidden": "true"
  }, lines.map((l, i) => {
    var id = D[i].id,
      on = hov === id;
    return React.createElement("path", {
      key: i,
      ref: el => paths.current[i] = el,
      d: l,
      style: {
        stroke: on ? "rgb(" + MH_RGB[id] + ")" : hov ? "rgba(6,16,37,.1)" : "rgba(6,16,37,.28)",
        strokeWidth: on ? 2.5 : 1
      }
    });
  })), D.map((d, i) => [0, 1].map(j => React.createElement("i", {
    key: d.id + j,
    ref: el => pk.current[i * 2 + j] = el,
    className: "mh-rt__pk",
    style: {
      background: "rgb(" + MH_RGB[d.id] + ")"
    },
    "aria-hidden": "true"
  }))), React.createElement("div", {
    className: "mh-rt__col"
  }, D.slice(0, 3).map(d => React.createElement(RtPort, {
    key: d.id,
    d: d,
    hov: hov,
    setHov: setHov
  }))), React.createElement("div", {
    className: "mh-rt__hub"
  }, React.createElement("span", {
    className: "t-label"
  }, "RGBY"), React.createElement("b", {
    className: "t-h1"
  }, D.length, " \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0439"), React.createElement("span", {
    className: "mh-rt__leds"
  }, D.map(d => React.createElement("i", {
    key: d.id,
    className: hov === d.id ? "is-on" : "",
    style: {
      background: "rgb(" + MH_RGB[d.id] + ")"
    }
  }))), React.createElement("span", {
    className: "t-label mh-rt__st"
  }, hov ? "→ " + D.find(d => d.id === hov).title : "все каналы активны")), React.createElement("div", {
    className: "mh-rt__col mh-rt__col--r"
  }, D.slice(3).map(d => React.createElement(RtPort, {
    key: d.id,
    d: d,
    hov: hov,
    setHov: setHov
  })))));
}
function RtPort({
  d,
  hov,
  setHov
}) {
  return React.createElement("a", _extends({}, mhLink(d), {
    className: "mh-rt__p" + (hov === d.id ? " is-on" : hov ? " is-dim" : ""),
    style: {
      "--c": MH_RGB[d.id]
    },
    onPointerEnter: () => setHov(d.id),
    onFocus: () => setHov(d.id),
    onBlur: () => setHov(null)
  }), React.createElement("span", {
    className: "mh-rt__ph"
  }, React.createElement("span", {
    className: "t-label"
  }, d.n), React.createElement("i", null)), React.createElement("b", {
    className: "t-h3-l"
  }, d.title), React.createElement("span", {
    className: "t-body-m mh-rt__sub"
  }, d.sub));
}
function MainHero({
  variant,
  setVariant
}) {
  if (["v1", "v2", "v3"].includes(variant) && window.MainHeroOld) return React.createElement(window.MainHeroOld, {
    variant: variant,
    setVariant: setVariant
  });
  var vs = React.createElement(VariantSwitch, {
    label: "\u041E\u0431\u043B\u043E\u0436\u043A\u0430",
    value: variant,
    options: ["prism", "router", "strips"],
    onChange: setVariant
  });
  var V = {
    task: window.MhTask,
    wall: window.MhWall,
    router: MhRouter,
    strips: MhStrips,
    channels: MhChannels,
    portals: MhPortals
  }[variant] || MhPrism;
  return React.createElement(V, {
    key: variant,
    vs: vs
  });
}
Object.assign(window, {
  mhImgSt,
  MainHero
});