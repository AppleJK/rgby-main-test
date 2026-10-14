// RGBY · main-hub.jsx.txt · сборка 2026-10-14
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var HubOld = props => React.createElement(window.HubV1, props);
var HUB_VARIANTS = ["strips", "prism", "mixer", "tuner", "stack", "pixels", "tiles", "list", "accordion"];
var HB_RGB = {
  media: [84, 56, 255],
  web: [84, 116, 168],
  production: [232, 0, 18],
  rnd: [255, 116, 64],
  branding: [255, 70, 0],
  multimedia: [214, 36, 214]
};
var HB_MIX = {
  media: "b",
  web: "g",
  production: "r",
  rnd: "rb",
  branding: "rg",
  multimedia: "gb"
};
var HB_CH = {
  r: [199, 0, 0],
  g: [0, 165, 0],
  b: [44, 79, 255]
};
var HB_LIGHT = {};
var hbC = id => (HB_RGB[id] || [6, 16, 37]).join(",");
var hbU = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--u")) || 1;
var hbCl = x => x < 0 ? 0 : x > 1 ? 1 : x;
var hbReduce = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
var HB_NAV = false;
var hbLinkOn = d => ({
  href: d.href,
  onClick: e => {
    e.preventDefault();
    if (d.href === "#") return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || !window.rgbyRouteOut) {
      if (e.metaKey || e.ctrlKey) window.open(d.href);else location.href = d.href;
      return;
    }
    window.rgbyRouteOut({
      id: d.id,
      t: d.title,
      n: d.n,
      c: (HB_RGB[d.id] || [44, 79, 255]).join(","),
      img: d.img
    }, e.currentTarget.getBoundingClientRect(), d.href);
  }
});
var hbLink = d => HB_NAV ? hbLinkOn(d) : {
  role: "presentation",
  onClick: e => e.preventDefault(),
  style: undefined
};
var HbArrow = () => React.createElement("span", {
  className: "m-arrow",
  "aria-hidden": "true"
}, "\u2192");
var HbHead = ({
  lead
}) => React.createElement("div", {
  className: "m-head"
}, React.createElement("h2", {
  className: "sec__title rv"
}, "\u041D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F"), React.createElement("p", {
  className: "m-head__lead t-body-l rv"
}, lead));
var HbMix = ({
  id
}) => React.createElement("span", {
  className: "hb-mix",
  "aria-hidden": "true"
}, ["r", "g", "b"].map(k => React.createElement("i", {
  key: k,
  style: {
    background: HB_MIX[id].includes(k) ? "rgb(" + HB_CH[k] + ")" : "transparent"
  }
})));
function HbGo({
  d
}) {
  if (!HB_NAV) return null;
  return React.createElement("a", _extends({}, hbLink(d), {
    className: "hb-go t-h3-l"
  }), React.createElement("span", null, d.ready ? "Сайт направления" : "Подробнее"), React.createElement(HbArrow, null));
}
function useHbPin(ref) {
  var [p, setP] = React.useState(0),
    [span, setSpan] = React.useState(1);
  React.useEffect(() => {
    var raf = 0;
    var f = () => {
      raf = 0;
      var el = ref.current;
      if (!el) return;
      var r = el.getBoundingClientRect(),
        s = r.height - innerHeight;
      setSpan(s);
      setP(s > 0 ? hbCl(-r.top / s) : 0);
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
  var seek = q => {
    var el = ref.current;
    if (!el) return;
    var top = el.getBoundingClientRect().top + scrollY,
      y = top + q * Math.max(0, el.offsetHeight - innerHeight) + 1;
    (window.__scrollTo || (v => scrollTo({
      top: v,
      behavior: "smooth"
    })))(y);
  };
  return {
    p,
    pinned: span > 0,
    seek
  };
}
function useHbBox(ref) {
  var [b, setB] = React.useState({
    w: 0,
    h: 0
  });
  React.useLayoutEffect(() => {
    var el = ref.current;
    if (!el) return;
    var m = () => setB({
      w: el.clientWidth,
      h: el.clientHeight
    });
    m();
    var ro = new ResizeObserver(m);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return b;
}
function HbPrism({
  D
}) {
  var ref = React.useRef(null),
    stage = React.useRef(null),
    {
      p,
      pinned,
      seek
    } = useHbPin(ref),
    box = useHbBox(stage),
    n = D.length,
    [hov, setHov] = React.useState(-1),
    [tap, setTap] = React.useState(0);
  var auto = pinned ? Math.min(n - 1, Math.round(p * (n - 1))) : tap,
    act = hov >= 0 ? hov : auto,
    d = D[act],
    u = hbU();
  var W = box.w,
    H = box.h,
    px = W * .27,
    py = H * .54,
    ps = Math.min(W * .14, H * .3),
    rot = (p - .5) * 22,
    ox = px + ps * .3,
    ex = W * .5;
  var ys = D.map((_, i) => H * (.2 + i * (.66 / Math.max(1, n - 1))));
  return React.createElement("section", {
    id: "hub",
    ref: ref,
    className: "m-hub hb hb--prism",
    style: {
      "--n": n
    },
    "data-screen-label": "02 \u041D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F"
  }, React.createElement("div", {
    className: "hb-pr__pin"
  }, React.createElement("div", {
    className: "hb-pr__head"
  }, React.createElement("h2", {
    className: "sec__title"
  }, "\u041D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F"), React.createElement("span", {
    className: "t-label hb-pr__hint"
  }, pinned ? "Листайте — призма разводит свет по направлениям" : "Выберите направление")), React.createElement("div", {
    className: "hb-pr__stage",
    ref: stage,
    onPointerLeave: () => setHov(-1)
  }, W ? React.createElement("svg", {
    className: "hb-pr__svg",
    viewBox: "0 0 " + W + " " + H,
    "aria-hidden": "true"
  }, React.createElement("polygon", {
    className: "hb-pr__beam",
    points: "0," + (py - 10 * u) + " " + (px - ps * .28) + "," + (py - 2 * u) + " " + (px - ps * .28) + "," + (py + 2 * u) + " 0," + (py + 10 * u)
  }), React.createElement("line", {
    className: "hb-pr__flow hb-pr__flow--w",
    x1: "0",
    y1: py,
    x2: px - ps * .28,
    y2: py
  }), D.map((x, i) => {
    var y = ys[i],
      on = i === act,
      w = 22 * u;
    return React.createElement("g", {
      key: x.id,
      style: {
        "--c": hbC(x.id)
      },
      className: "hb-pr__ray" + (on ? " is-on" : "")
    }, React.createElement("polygon", {
      className: "hb-pr__wedge",
      points: ox + "," + py + " " + ex + "," + (y - w) + " " + ex + "," + (y + w)
    }), React.createElement("line", {
      className: "hb-pr__line",
      x1: ox,
      y1: py,
      x2: ex,
      y2: y
    }), React.createElement("line", {
      className: "hb-pr__flow",
      x1: ox,
      y1: py,
      x2: ex,
      y2: y,
      style: {
        animationDelay: -i * .31 + "s"
      }
    }));
  }), React.createElement("g", {
    transform: "translate(" + px + " " + py + ") rotate(" + rot.toFixed(2) + ")"
  }, React.createElement("polygon", {
    className: "hb-pr__prism",
    points: "0," + -ps * .58 + " " + ps * .5 + "," + ps * .36 + " " + -ps * .5 + "," + ps * .36
  }), React.createElement("polygon", {
    className: "hb-pr__prism hb-pr__prism--in",
    points: "0," + -ps * .4 + " " + ps * .34 + "," + ps * .24 + " " + -ps * .34 + "," + ps * .24
  }))) : null, React.createElement("div", {
    className: "hb-pr__labels"
  }, D.map((x, i) => React.createElement("a", _extends({
    key: x.id
  }, hbLink(x), {
    className: "hb-pr__l" + (i === act ? " is-on" : ""),
    style: {
      "--c": hbC(x.id),
      top: ys[i] + "px"
    },
    onPointerEnter: () => setHov(i),
    onFocus: () => setHov(i),
    onBlur: () => setHov(-1),
    onClick: e => {
      if (!pinned) {
        e.preventDefault();
        setTap(i);
      } else if (x.href === "#") e.preventDefault();
    }
  }), React.createElement("span", {
    className: "t-label"
  }, x.n), React.createElement("b", null, x.title)))), React.createElement("div", {
    className: "hb-pr__card",
    key: d.id,
    style: {
      "--c": hbC(d.id)
    }
  }, React.createElement("span", {
    className: "hb-pr__img"
  }, React.createElement("i", {
    style: {
      backgroundImage: "url(" + d.img + ")"
    }
  })), React.createElement("span", {
    className: "hb-pr__meta t-label"
  }, React.createElement(HbMix, {
    id: d.id
  }), React.createElement("span", null, d.n, " / ", String(n).padStart(2, "0"))), React.createElement("b", {
    className: "t-display-l"
  }, d.title), React.createElement("span", {
    className: "t-body-l hb-pr__text"
  }, d.text), React.createElement("span", {
    className: "m-tile__tags"
  }, d.tags.map(t => React.createElement("i", {
    key: t
  }, t))), React.createElement(HbGo, {
    d: d
  }))), pinned ? React.createElement("div", {
    className: "hb-pr__dots"
  }, D.map((x, i) => React.createElement("button", {
    key: x.id,
    type: "button",
    "aria-label": x.title,
    className: i === act ? "is-on" : "",
    style: {
      "--c": hbC(x.id)
    },
    onClick: () => seek(i / Math.max(1, n - 1))
  }))) : null));
}
var HB_MIXMAP = {
  b: "media",
  g: "web",
  r: "production",
  rb: "rnd",
  rg: "branding",
  gb: "multimedia"
};
function HbMixer({
  D
}) {
  var stage = React.useRef(null),
    cv = React.useRef(null),
    off = React.useRef(null),
    S = React.useRef({
      mx: -1,
      my: -1,
      has: false,
      ox: 0,
      oy: 0,
      raf: 0,
      key: "",
      t0: 0
    }),
    labels = React.useRef({});
  var ids = D.map(d => d.id),
    [key, setKey] = React.useState(Object.keys(HB_MIXMAP).find(k => ids.includes(HB_MIXMAP[k])) || "rgb"),
    [hov, setHov] = React.useState(false),
    box = useHbBox(stage);
  var keyR = React.useRef(key);
  keyR.current = key;
  React.useEffect(() => {
    return;
    if (hov) return;
    var seq = ["b", "g", "r", "gb", "rg", "rb", "rgb"].filter(k => k === "rgb" || ids.includes(HB_MIXMAP[k]));
    var id = setInterval(() => setKey(k => seq[(seq.indexOf(k) + 1) % seq.length]), 2600);
    return () => clearInterval(id);
  }, [hov, ids.join()]);
  var geom = (w, h) => {
    var s = Math.min(w, h),
      cx = w / 2,
      cy = h / 2,
      r = s * .3,
      dd = s * .17,
      st = S.current;
    var sh = st.has ? [(st.mx - cx) * .035, (st.my - cy) * .035] : [0, 0];
    return {
      cx,
      cy,
      r,
      C: {
        r: [cx + Math.cos(Math.PI * 7 / 6) * dd + sh[0] * 1.2, cy + Math.sin(Math.PI * 7 / 6) * dd + sh[1] * 1.2],
        g: [cx + Math.cos(-Math.PI / 6) * dd + sh[0] * .6, cy + Math.sin(-Math.PI / 6) * dd + sh[1] * .6],
        b: [cx + Math.cos(Math.PI / 2) * dd - sh[0] * .4, cy + Math.sin(Math.PI / 2) * dd - sh[1] * .4]
      }
    };
  };
  var draw = () => {
    var c = cv.current,
      o = off.current;
    if (!c || !box.w) return;
    var dpr = Math.min(2, devicePixelRatio || 1),
      w = box.w,
      h = box.h;
    if (c.width !== Math.round(w * dpr)) {
      c.width = o.width = Math.round(w * dpr);
      c.height = o.height = Math.round(h * dpr);
    }
    var x = c.getContext("2d"),
      y = o.getContext("2d"),
      G = geom(w, h),
      k = keyR.current;
    [x, y].forEach(t => t.setTransform(dpr, 0, 0, dpr, 0, 0));
    x.clearRect(0, 0, w, h);
    x.globalCompositeOperation = "lighter";
    ["r", "g", "b"].forEach(ch => {
      x.beginPath();
      x.arc(G.C[ch][0], G.C[ch][1], G.r, 0, 7);
      x.fillStyle = "rgba(" + HB_CH[ch] + "," + (k ? .3 : .6) + ")";
      x.fill();
    });
    if (k) {
      y.clearRect(0, 0, w, h);
      y.save();
      [...k].forEach(ch => {
        y.beginPath();
        y.arc(G.C[ch][0], G.C[ch][1], G.r, 0, 7);
        y.clip();
      });
      var col = [0, 1, 2].map(i => Math.min(255, [...k].reduce((a, ch) => a + HB_CH[ch][i], 0)));
      y.fillStyle = k === "rgb" ? "#F3F4FF" : "rgb(" + col + ")";
      y.fillRect(0, 0, w, h);
      y.restore();
      y.globalCompositeOperation = "destination-out";
      ["r", "g", "b"].filter(ch => !k.includes(ch)).forEach(ch => {
        y.beginPath();
        y.arc(G.C[ch][0], G.C[ch][1], G.r, 0, 7);
        y.fill();
      });
      y.globalCompositeOperation = "source-over";
      x.globalCompositeOperation = "source-over";
      x.drawImage(o, 0, 0, w, h);
    }
    x.globalCompositeOperation = "source-over";
    x.strokeStyle = "rgba(243,244,255,.28)";
    x.lineWidth = 1;
    ["r", "g", "b"].forEach(ch => {
      x.beginPath();
      x.arc(G.C[ch][0], G.C[ch][1], G.r, 0, 7);
      x.stroke();
    });
    var pos = kk => {
      var cs = [...kk].map(ch => G.C[ch]),
        mx = cs.reduce((a, q) => a + q[0], 0) / cs.length,
        my = cs.reduce((a, q) => a + q[1], 0) / cs.length,
        f = kk.length === 3 ? 0 : kk.length === 2 ? 1.05 : 1.15;
      return [mx + (mx - G.cx) * f, my + (my - G.cy) * f];
    };
    Object.keys(labels.current).forEach(kk => {
      var el = labels.current[kk];
      if (!el) return;
      var [lx, ly] = pos(kk);
      el.style.transform = "translate(" + lx.toFixed(1) + "px," + ly.toFixed(1) + "px) translate(-50%,-50%)";
    });
  };
  React.useEffect(() => {
    draw();
  }, [box.w, box.h, key]);
  React.useEffect(() => {
    document.fonts && document.fonts.ready.then(draw);
  }, []);
  var hit = (mx, my) => {
    var G = geom(box.w, box.h);
    return ["r", "g", "b"].filter(ch => Math.hypot(mx - G.C[ch][0], my - G.C[ch][1]) <= G.r).join("");
  };
  var mv = e => {
    var r = stage.current.getBoundingClientRect(),
      st = S.current;
    st.mx = e.clientX - r.left;
    st.my = e.clientY - r.top;
    st.has = true;
    var k = hit(st.mx, st.my);
    setHov(true);
    if (k && k !== keyR.current && (k === "rgb" || ids.includes(HB_MIXMAP[k]))) setKey(k);
    if (!st.raf) st.raf = requestAnimationFrame(() => {
      st.raf = 0;
      draw();
    });
    stage.current.style.cursor = k ? "pointer" : "default";
  };
  var lv = () => {
    S.current.has = false;
    setHov(false);
    draw();
  };
  var d = key === "rgb" ? null : D.find(x => x.id === HB_MIXMAP[key]);
  var click = () => {
    if (d && d.href !== "#") location.href = d.href;
  };
  return React.createElement("section", {
    id: "hub",
    className: "m-sec m-hub hb hb--mixer x-ink",
    "data-screen-label": "02 \u041D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F"
  }, React.createElement(HbHead, {
    lead: "\u041A\u0430\u0436\u0434\u043E\u0435 \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u2014 \u0441\u0432\u043E\u0439 \u043A\u0430\u043D\u0430\u043B \u0441\u0432\u0435\u0442\u0430. \u041D\u0430\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430 \u043E\u0431\u043B\u0430\u0441\u0442\u044C: \u043F\u0435\u0440\u0435\u0441\u0435\u0447\u0435\u043D\u0438\u044F \u043A\u0430\u043D\u0430\u043B\u043E\u0432 \u2014 \u0442\u043E\u0436\u0435 \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F, \u0430 \u0432\u043C\u0435\u0441\u0442\u0435 \u043E\u043D\u0438 \u0434\u0430\u044E\u0442 \u0431\u0435\u043B\u044B\u0439"
  }), React.createElement("div", {
    className: "hb-mx"
  }, React.createElement("div", {
    className: "hb-mx__stage",
    ref: stage,
    onPointerMove: mv,
    onPointerLeave: lv,
    onClick: click
  }, React.createElement("canvas", {
    ref: cv,
    className: "hb-mx__cv",
    "aria-hidden": "true"
  }), React.createElement("canvas", {
    ref: off,
    hidden: true
  }), ["rgb", ...Object.keys(HB_MIXMAP)].filter(k => k === "rgb" || ids.includes(HB_MIXMAP[k])).map(k => {
    var x = k === "rgb" ? null : D.find(q => q.id === HB_MIXMAP[k]);
    return React.createElement("span", {
      key: k,
      ref: el => labels.current[k] = el,
      className: "hb-mx__lab" + (k === key ? " is-on" : "") + (k === "rgb" ? " hb-mx__lab--c" : "")
    }, x ? React.createElement(React.Fragment, null, React.createElement("span", {
      className: "t-label"
    }, k.toUpperCase().split("").join("+")), React.createElement("b", {
      className: "t-h3-l"
    }, x.title)) : React.createElement("b", {
      className: "t-h3-l"
    }, "RGBY"));
  })), React.createElement("div", {
    className: "hb-mx__info",
    key: key,
    style: {
      "--c": d ? hbC(d.id) : "243,244,255"
    }
  }, React.createElement("span", {
    className: "hb-mx__sum t-label"
  }, key.toUpperCase().split("").join(" + "), " ", d ? "= " + d.title : "= белый свет"), React.createElement("b", {
    className: "t-display-l"
  }, d ? d.title : "RGBY"), React.createElement("span", {
    className: "t-body-l hb-mx__text"
  }, d ? d.text : "Сумма всех каналов: шесть направлений, одна команда и общий продакшн. Любой проект можно собрать из нескольких направлений сразу"), d ? React.createElement("span", {
    className: "m-tile__tags"
  }, d.tags.map(t => React.createElement("i", {
    key: t
  }, t))) : null, d ? React.createElement(HbGo, {
    d: d
  }) : null)), React.createElement("div", {
    className: "hb-mx__list"
  }, D.map(x => {
    var k = HB_MIX[x.id];
    return React.createElement("a", _extends({
      key: x.id
    }, hbLink(x), {
      className: "hb-mx__li" + (k === key ? " is-on" : ""),
      style: {
        "--c": hbC(x.id)
      },
      onPointerEnter: () => {
        setHov(true);
        setKey(k);
      },
      onPointerLeave: () => setHov(false),
      onFocus: () => setKey(k)
    }), React.createElement(HbMix, {
      id: x.id
    }), React.createElement("span", {
      className: "t-body-m"
    }, x.title));
  })));
}
function HbNoise({
  amt
}) {
  var ref = React.useRef(null),
    a = React.useRef(amt);
  a.current = amt;
  React.useEffect(() => {
    var c = ref.current,
      x = c.getContext("2d"),
      W = 160,
      H = 90;
    c.width = W;
    c.height = H;
    var img = x.createImageData(W, H);
    var raf = 0,
      vis = false;
    var f = () => {
      if (a.current > .02) {
        var d = img.data;
        for (var i = 0; i < d.length; i += 4) {
          var v = Math.random() * 255 | 0;
          d[i] = d[i + 1] = d[i + 2] = v;
          d[i + 3] = 255;
        }
        x.putImageData(img, 0, 0);
      }
      if (vis && !hbReduce()) raf = requestAnimationFrame(f);
    };
    var io = new IntersectionObserver(([e]) => {
      vis = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (vis) raf = requestAnimationFrame(f);
    });
    io.observe(c);
    f();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);
  return React.createElement("canvas", {
    ref: ref,
    className: "hb-tu__noise",
    style: {
      opacity: (amt * .85).toFixed(3)
    },
    "aria-hidden": "true"
  });
}
function HbTuner({
  D
}) {
  var ref = React.useRef(null),
    {
      p,
      pinned,
      seek
    } = useHbPin(ref),
    n = D.length,
    [pick, setPick] = React.useState(0);
  var raw = pinned ? p * (n - 1) : pick,
    seg = Math.min(n - 2, Math.floor(raw)),
    tl = raw - seg,
    dw = .28,
    e = tl < dw ? 0 : tl > 1 - dw ? 1 : (t => t * t * t * (t * (t * 6 - 15) + 10))((tl - dw) / (1 - 2 * dw));
  var pos = n > 1 ? pinned ? seg + e : raw : 0,
    near = Math.round(pos),
    sig = hbCl(1 - Math.abs(pos - near) / .42),
    d = D[near];
  var stx = i => (i + .5) / n * 100,
    nx = (pos + .5) / n * 100,
    mhz = (87.5 + nx / 100 * 20.5).toFixed(1);
  var go = i => pinned ? seek(i / Math.max(1, n - 1)) : setPick(i);
  return React.createElement("section", {
    id: "hub",
    ref: ref,
    className: "m-hub hb hb--tuner",
    style: {
      "--n": n
    },
    "data-screen-label": "02 \u041D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F"
  }, React.createElement("div", {
    className: "hb-tu__pin"
  }, React.createElement("div", {
    className: "hb-tu__head"
  }, React.createElement("h2", {
    className: "sec__title"
  }, "\u041D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F"), React.createElement("span", {
    className: "t-label hb-tu__hint"
  }, pinned ? "Листайте, чтобы настроиться на направление" : "Выберите станцию")), React.createElement("div", {
    className: "hb-tu__main"
  }, React.createElement("div", {
    className: "hb-tu__info",
    style: {
      opacity: (.25 + sig * .75).toFixed(3),
      "--c": hbC(d.id)
    },
    key: d.id
  }, React.createElement("span", {
    className: "hb-tu__ch t-label"
  }, React.createElement(HbMix, {
    id: d.id
  }), d.n, " \xB7 ", mhz, " \u041C\u0413\u0446"), React.createElement("b", {
    className: "t-display-l"
  }, d.title), React.createElement("span", {
    className: "t-body-l hb-tu__text"
  }, d.text), React.createElement("span", {
    className: "m-tile__tags"
  }, d.tags.map(t => React.createElement("i", {
    key: t
  }, t))), React.createElement(HbGo, {
    d: d
  })), React.createElement("div", {
    className: "hb-tu__screen" + (sig < .9 ? " is-weak" : "")
  }, D.map((x, i) => React.createElement("i", {
    key: x.id,
    className: "hb-tu__img",
    style: {
      backgroundImage: "url(" + x.img + ")",
      opacity: i === near ? 1 : 0,
      filter: "blur(" + ((1 - sig) * 16).toFixed(1) + "px) saturate(" + (.3 + sig * .9).toFixed(2) + ")"
    }
  })), React.createElement(HbNoise, {
    amt: 1 - sig
  }), React.createElement("i", {
    className: "hb-tu__scan"
  }), React.createElement("span", {
    className: "hb-tu__osd t-label"
  }, React.createElement("span", null, sig > .9 ? "● Сигнал" : sig > .3 ? "◌ Настройка…" : "Нет сигнала"), React.createElement("span", {
    className: "hb-tu__bars"
  }, [0, 1, 2, 3, 4].map(k => React.createElement("i", {
    key: k,
    className: sig > k / 5 + .05 ? "is-on" : ""
  })))), React.createElement("b", {
    className: "hb-tu__ttl t-display-xl",
    style: {
      opacity: sig,
      "--c": hbC(d.id)
    }
  }, d.title))), React.createElement("div", {
    className: "hb-tu__dial"
  }, React.createElement("div", {
    className: "hb-tu__ruler"
  }, Array.from({
    length: 61
  }, (_, i) => React.createElement("i", {
    key: i,
    className: i % 5 ? "" : "is-big"
  }))), D.map((x, i) => React.createElement("button", {
    key: x.id,
    type: "button",
    className: "hb-tu__st" + (i === near && sig > .9 ? " is-on" : ""),
    style: {
      left: stx(i) + "%",
      "--c": hbC(x.id)
    },
    onClick: () => go(i)
  }, React.createElement("i", null), React.createElement("span", {
    className: "t-label"
  }, x.n), React.createElement("span", {
    className: "t-small"
  }, x.title))), React.createElement("i", {
    className: "hb-tu__needle",
    style: {
      left: nx.toFixed(3) + "%"
    }
  }, React.createElement("span", {
    className: "t-label"
  }, mhz)))));
}
function HbStack({
  D
}) {
  var refs = React.useRef([]);
  React.useEffect(() => {
    var raf = 0;
    var f = () => {
      raf = 0;
      refs.current.forEach((el, i) => {
        if (!el) return;
        var nx = refs.current[i + 1];
        var q = 0;
        if (nx) {
          var a = el.getBoundingClientRect(),
            b = nx.getBoundingClientRect();
          q = hbCl(1 - (b.top - a.top) / Math.max(1, a.height));
        }
        el.style.setProperty("--q", q.toFixed(3));
      });
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
  }, [D.length]);
  return React.createElement("section", {
    id: "hub",
    className: "m-sec m-hub hb hb--stack",
    "data-screen-label": "02 \u041D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F"
  }, React.createElement(HbHead, {
    lead: "\u0428\u0435\u0441\u0442\u044C \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0439 \u2014 \u0448\u0435\u0441\u0442\u044C \u043A\u043E\u043C\u0430\u043D\u0434. \u041B\u0438\u0441\u0442\u0430\u0439\u0442\u0435: \u043A\u0430\u0436\u0434\u043E\u0435 \u043B\u043E\u0436\u0438\u0442\u0441\u044F \u043F\u043E\u0432\u0435\u0440\u0445 \u043F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0435\u0433\u043E"
  }), React.createElement("div", {
    className: "hb-st"
  }, D.map((d, i) => React.createElement("div", {
    key: d.id,
    ref: el => refs.current[i] = el,
    className: "hb-st__c" + (HB_LIGHT[d.id] ? " is-light" : ""),
    style: {
      "--c": hbC(d.id),
      "--i": i,
      zIndex: i + 1
    }
  }, React.createElement("div", {
    className: "hb-st__in"
  }, React.createElement("div", {
    className: "hb-st__txt"
  }, React.createElement("span", {
    className: "hb-st__top t-label"
  }, React.createElement(HbMix, {
    id: d.id
  }), React.createElement("span", null, d.n, " / ", String(D.length).padStart(2, "0")), React.createElement("span", null, d.sub)), React.createElement("b", {
    className: "hb-st__t"
  }, d.title), React.createElement("span", {
    className: "t-body-l hb-st__p"
  }, d.text), React.createElement("span", {
    className: "m-tile__tags"
  }, d.tags.map(t => React.createElement("i", {
    key: t
  }, t))), React.createElement(HbGo, {
    d: d
  })), React.createElement("a", _extends({}, hbLink(d), {
    className: "hb-st__img",
    tabIndex: "-1",
    "aria-hidden": "true"
  }), React.createElement("i", {
    style: {
      backgroundImage: "url(" + d.img + ")"
    }
  })))))));
}
function HbPixels({
  D
}) {
  var wrap = React.useRef(null),
    cv = React.useRef(null),
    [act, setAct] = React.useState(0),
    [hov, setHov] = React.useState(false),
    G = React.useRef(null),
    actR = React.useRef(0),
    d = D[act];
  actR.current = act;
  React.useEffect(() => {
    return;
    if (hov) return;
    var id = setInterval(() => setAct(a => (a + 1) % D.length), 3400);
    return () => clearInterval(id);
  }, [hov, D.length]);
  React.useEffect(() => {
    var el = wrap.current,
      c = cv.current,
      x = c.getContext("2d");
    var raf = 0,
      vis = false;
    var st = {
      cols: 0,
      rows: 0,
      cell: 10,
      cur: null,
      tgt: null,
      at: null,
      mx: -1e4,
      my: -1e4,
      w: 0,
      h: 0
    };
    G.current = st;
    var build = () => {
      var u = hbU(),
        w = el.clientWidth,
        h = el.clientHeight,
        dpr = Math.min(2, devicePixelRatio || 1);
      st.cell = Math.max(7, Math.round(10 * u));
      st.cols = Math.floor(w / st.cell);
      st.rows = Math.floor(h / st.cell);
      st.w = w;
      st.h = h;
      c.width = w * dpr;
      c.height = h * dpr;
      x.setTransform(dpr, 0, 0, dpr, 0, 0);
      var N = st.cols * st.rows * 3;
      st.cur = new Float32Array(N);
      st.tgt = new Float32Array(N);
      st.at = new Float32Array(st.cols * st.rows);
      target(actR.current, true);
    };
    var target = (i, now) => {
      var o = document.createElement("canvas");
      o.width = st.cols;
      o.height = st.rows;
      var y = o.getContext("2d"),
        txt = D[i].title;
      var fs = st.rows * .62;
      y.font = "700 " + fs + "px \"TT Interphases Pro\", sans-serif";
      var mw = y.measureText(txt).width;
      if (mw > st.cols * .9) fs *= st.cols * .9 / mw;
      y.font = "700 " + fs + "px \"TT Interphases Pro\", sans-serif";
      y.textAlign = "center";
      y.textBaseline = "middle";
      y.fillStyle = "#fff";
      y.fillText(txt, st.cols / 2, st.rows * .54);
      var px = y.getImageData(0, 0, st.cols, st.rows).data,
        mix = HB_MIX[D[i].id],
        t0 = performance.now();
      var _loop = function (k) {
        var on = px[k * 4 + 3] > 110 ? 1 : 0,
          cx = k % st.cols;
        ["r", "g", "b"].forEach((ch, j) => {
          st.tgt[k * 3 + j] = on && mix.includes(ch) ? 1 : 0;
        });
        st.at[k] = now ? 0 : t0 + cx / st.cols * 520 + Math.random() * 260;
        if (now) for (var j = 0; j < 3; j++) st.cur[k * 3 + j] = st.tgt[k * 3 + j];
      };
      for (var k = 0; k < st.cols * st.rows; k++) {
        _loop(k);
      }
      kick();
    };
    st.target = target;
    var COL = ["#C70000", "#00A500", "#2C4FFF"];
    var draw = () => {
      raf = 0;
      var now = performance.now(),
        s = st.cell,
        bw = s * .24,
        bh = s * .72,
        oy = s * .14,
        sig = s * 9;
      var moving = false;
      x.fillStyle = "#061025";
      x.fillRect(0, 0, st.w, st.h);
      for (var k = 0; k < st.cols * st.rows; k++) if (now >= st.at[k]) for (var j = 0; j < 3; j++) {
        var q = k * 3 + j,
          dv = st.tgt[q] - st.cur[q];
        if (Math.abs(dv) > .004) {
          st.cur[q] += dv * .16;
          moving = true;
        } else st.cur[q] = st.tgt[q];
      } else moving = true;
      for (var _j = 0; _j < 3; _j++) {
        x.fillStyle = COL[_j];
        for (var _k = 0; _k < st.cols * st.rows; _k++) {
          var cx = _k % st.cols,
            cy = _k / st.cols | 0,
            gx = cx * s,
            gy = cy * s,
            dx = gx - st.mx,
            dy = gy - st.my,
            b = Math.exp(-(dx * dx + dy * dy) / (2 * sig * sig)) * .4;
          x.globalAlpha = Math.min(1, .07 + st.cur[_k * 3 + _j] * .93 + b * (.35 + st.cur[_k * 3 + _j]));
          x.fillRect(gx + s * .1 + _j * s * .28, gy + oy, bw, bh);
        }
      }
      x.globalAlpha = 1;
      if (moving && vis && !hbReduce()) raf = requestAnimationFrame(draw);
    };
    var kick = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };
    st.kick = kick;
    var io = new IntersectionObserver(([e]) => {
      vis = e.isIntersecting;
      if (vis) kick();
    });
    io.observe(el);
    var ro = new ResizeObserver(build);
    ro.observe(el);
    var mv = e => {
      var r = el.getBoundingClientRect();
      st.mx = e.clientX - r.left;
      st.my = e.clientY - r.top;
      if (!raf) raf = requestAnimationFrame(() => {
        raf = 0;
        draw();
      });
    };
    var lv = () => {
      st.mx = st.my = -1e4;
      kick();
    };
    el.addEventListener("pointermove", mv);
    el.addEventListener("pointerleave", lv);
    if (document.fonts) document.fonts.ready.then(build);else build();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      el.removeEventListener("pointermove", mv);
      el.removeEventListener("pointerleave", lv);
    };
  }, [D.length]);
  React.useEffect(() => {
    var st = G.current;
    if (st && st.target && st.cols) st.target(act, hbReduce());
  }, [act]);
  return React.createElement("section", {
    id: "hub",
    className: "m-sec m-hub hb hb--pixels x-ink",
    "data-screen-label": "02 \u041D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F"
  }, React.createElement(HbHead, {
    lead: "\u042D\u043A\u0440\u0430\u043D \u0438\u0437 \u043A\u0440\u0430\u0441\u043D\u044B\u0445, \u0437\u0435\u043B\u0451\u043D\u044B\u0445 \u0438 \u0441\u0438\u043D\u0438\u0445 \u0441\u0443\u0431\u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439. \u041A\u0430\u0436\u0434\u043E\u0435 \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0437\u0430\u0436\u0438\u0433\u0430\u0435\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u0441\u0432\u043E\u0438\u043C\u0438 \u043A\u0430\u043D\u0430\u043B\u0430\u043C\u0438"
  }), React.createElement("a", _extends({}, hbLink(d), {
    className: "hb-px__wall",
    ref: wrap,
    "aria-label": d.title
  }), React.createElement("canvas", {
    ref: cv,
    "aria-hidden": "true"
  }), React.createElement("span", {
    className: "hb-px__osd t-label"
  }, React.createElement(HbMix, {
    id: d.id
  }), d.n, " \xB7 ", HB_MIX[d.id].toUpperCase().split("").join(" + "))), React.createElement("div", {
    className: "hb-px__row",
    onPointerEnter: () => setHov(true),
    onPointerLeave: () => setHov(false)
  }, React.createElement("div", {
    className: "hb-px__tabs"
  }, D.map((x, i) => React.createElement("a", _extends({
    key: x.id
  }, hbLink(x), {
    className: "hb-px__tab" + (i === act ? " is-on" : ""),
    style: {
      "--c": hbC(x.id)
    },
    onPointerEnter: () => setAct(i),
    onFocus: () => setAct(i)
  }), React.createElement("i", {
    className: "hb-px__bar"
  }, React.createElement("b", {
    key: act + ":" + hov,
    className: i === act ? hov ? "is-full" : "is-run" : ""
  })), React.createElement("span", {
    className: "t-label"
  }, x.n), React.createElement("span", {
    className: "t-h3-l"
  }, x.title)))), React.createElement("div", {
    className: "hb-px__info",
    key: d.id
  }, React.createElement("span", {
    className: "t-body-l"
  }, d.text), React.createElement(HbGo, {
    d: d
  }))));
}
function HbStrips({
  D
}) {
  var ref = React.useRef(null),
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
    id: "hub",
    className: "m-sec m-hub hb hb--strips x-ink",
    "data-screen-label": "02 \u041D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F"
  }, React.createElement(HbHead, {
    lead: "\u0428\u0435\u0441\u0442\u044C \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0439 \u2014 \u0448\u0435\u0441\u0442\u044C \u043A\u043E\u043C\u0430\u043D\u0434. \u041D\u0430\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430 \u043F\u043E\u043B\u043E\u0441\u0443, \u0447\u0442\u043E\u0431\u044B\xA0\u0440\u0430\u0441\u043A\u0440\u044B\u0442\u044C \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435"
  }), React.createElement("div", {
    className: "hb-sr",
    ref: ref
  }, React.createElement("div", {
    className: "mh-st"
  }, D.map((d, i) => React.createElement("a", _extends({
    key: d.id
  }, hbLink(d), {
    ref: el => S.current[i] = el,
    className: "mh-st__s" + (act === i ? " is-on" : ""),
    style: {
      "--c": MH_RGB[d.id]
    }
  }), React.createElement("i", {
    className: "mh-st__img",
    style: window.mhImgSt(d)
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
  }, d.title))))));
}
function Hub(props) {
  var {
    variant,
    setVariant,
    count
  } = props;
  if (!["strips", "prism", "mixer", "tuner", "stack", "pixels"].includes(variant)) return React.createElement(HubOld, props);
  var D = window.RGBY_MAIN.DIRECTIONS.slice(0, count || 6),
    V = {
      strips: HbStrips,
      prism: HbPrism,
      mixer: HbMixer,
      tuner: HbTuner,
      stack: HbStack,
      pixels: HbPixels
    }[variant];
  return React.createElement("div", {
    className: "hb-host"
  }, React.createElement(VariantSwitch, {
    label: "\u041D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F",
    value: variant,
    options: HUB_VARIANTS,
    onChange: setVariant
  }), React.createElement(V, {
    key: variant + D.length,
    D: D
  }));
}
Object.assign(window, {
  Hub,
  HUB_VARIANTS
});