// RGBY · main-news.jsx.txt · сборка 2026-10-14
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var NewsOld = props => React.createElement(window.NewsV1, props);
var NX_KIND = {
  "Статья": "44,79,255",
  "Кейс": "0,165,0",
  "Событие": "199,0,0",
  "Награда": "199,165,0",
  "Дайджест": "100,34,106"
};
var NX_STEP = {
  v4: [7, 7],
  v5: [8, 4],
  v6: [8, 4]
};
var NX_MONTHS = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];
var nxPrevent = e => e.preventDefault();
var nxKc = n => ({
  "--kc": NX_KIND[n.kind] || "6,16,37"
});
var nxEase = el => {
  if (el.__nxRaf) return;
  var step = () => {
    var s = el.__nx;
    s.x += (s.tx - s.x) * .12;
    s.y += (s.ty - s.y) * .12;
    el.style.setProperty("--px", s.x.toFixed(4));
    el.style.setProperty("--py", s.y.toFixed(4));
    if (Math.abs(s.tx - s.x) + Math.abs(s.ty - s.y) > .0008) el.__nxRaf = requestAnimationFrame(step);else el.__nxRaf = 0;
  };
  el.__nxRaf = requestAnimationFrame(step);
};
var nxTilt = e => {
  var el = e.currentTarget,
    r = el.getBoundingClientRect();
  el.__nx = el.__nx || {
    x: 0,
    y: 0,
    tx: 0,
    ty: 0
  };
  el.__nx.tx = (e.clientX - r.left) / r.width - .5;
  el.__nx.ty = (e.clientY - r.top) / r.height - .5;
  nxEase(el);
};
var nxUntilt = e => {
  var el = e.currentTarget;
  if (!el.__nx) return;
  el.__nx.tx = 0;
  el.__nx.ty = 0;
  nxEase(el);
};
var NxMeta = ({
  n
}) => React.createElement("span", {
  className: "nx-meta t-label"
}, React.createElement("i", {
  className: "nx-kind"
}, n.kind), React.createElement("span", null, n.date.slice(0, 5)));
var NxCorner = () => React.createElement("span", {
  className: "nx-corner",
  "aria-hidden": "true"
}, React.createElement("i", null, "\u2197"));
function useNxReveal(ref, deps) {
  React.useEffect(() => {
    var host = ref.current;
    if (!host) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      host.querySelectorAll("[data-nx]").forEach(el => el.classList.add("is-in"));
      return;
    }
    var io = new IntersectionObserver(es => {
      var k = 0;
      es.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left).forEach(e => {
        e.target.style.setProperty("--st", k++ * 75 + "ms");
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      });
    }, {
      rootMargin: "0px 0px -6% 0px",
      threshold: .08
    });
    host.querySelectorAll("[data-nx]:not(.is-in)").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, deps);
}
function NxBar({
  shown,
  total,
  left,
  step,
  more,
  portal,
  toPortal,
  label
}) {
  var {
    Button
  } = window.RGBYDS;
  return React.createElement("div", {
    className: "m-news__bar"
  }, React.createElement("span", {
    className: "m-news__count t-label"
  }, React.createElement("span", null, String(shown).padStart(2, "0"), " / ", String(total).padStart(2, "0"), label ? " · " + label : ""), React.createElement("i", null, React.createElement("b", {
    style: {
      transform: "scaleX(" + (total ? shown / total : 0).toFixed(3) + ")"
    }
  }))), left > 0 ? React.createElement("button", {
    type: "button",
    className: "m-news__more nx-press",
    onClick: more
  }, React.createElement("span", {
    className: "t-h3-l"
  }, "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0435\u0449\u0451"), React.createElement("span", {
    className: "t-label"
  }, "+", Math.min(step, left))) : React.createElement("span", {
    className: "m-news__done t-body-m"
  }, "\u042D\u0442\u043E \u0432\u0441\u0435 \u0441\u0432\u0435\u0436\u0438\u0435 \u043D\u043E\u0432\u043E\u0441\u0442\u0438 \u2014 \u043E\u0441\u0442\u0430\u043B\u044C\u043D\u043E\u0435 \u0432 \u0430\u0440\u0445\u0438\u0432\u0435"), React.createElement("a", {
    href: portal,
    onClick: toPortal,
    className: "m-news__portal"
  }, React.createElement(Button, {
    variant: "blue",
    size: "l",
    tabIndex: "-1"
  }, "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 \u043C\u0435\u0434\u0438\u0430-\u043F\u043E\u0440\u0442\u0430\u043B \u2192")));
}
var NX_SHAPE = ["L", "S", "S", "S", "S", "W", "T"];
function NxCard({
  n,
  shape,
  mirror
}) {
  var st = shape === "L" && mirror ? {
    gridColumn: "7 / span 6"
  } : undefined;
  return React.createElement("a", {
    href: "#news-" + n.id,
    onClick: e => nxOpen(e, n),
    "data-nx": "",
    className: "nx-c nx-c--" + shape + " nx-press",
    style: {
      ...nxKc(n),
      ...st
    },
    onPointerMove: nxTilt,
    onPointerLeave: nxUntilt
  }, shape !== "T" ? React.createElement("span", {
    className: "nx-c__media"
  }, React.createElement("i", {
    className: "nx-c__img",
    style: {
      backgroundImage: "url(" + n.img + ")"
    }
  }), React.createElement(NxCorner, null)) : React.createElement(NxCorner, null), React.createElement("span", {
    className: "nx-c__body"
  }, React.createElement(NxMeta, {
    n: n
  }), React.createElement("b", {
    className: shape === "L" ? "t-display-l nx-c__t" : shape === "T" ? "t-h1 nx-c__t" : "t-h3-l nx-c__t"
  }, shape === "T" ? "«" + n.title + "»" : n.title), shape === "S" ? null : React.createElement("span", {
    className: "t-body-m nx-c__p"
  }, n.text)));
}
function NxJournal({
  ALL,
  ctx
}) {
  var kinds = React.useMemo(() => ["Все", ...Array.from(new Set(ALL.map(n => n.kind)))], [ALL]);
  var [f, setF] = React.useState("Все"),
    [shown, setShown] = React.useState(7),
    tabs = React.useRef(null),
    [ind, setInd] = React.useState({
      x: 0,
      w: 0
    }),
    grid = React.useRef(null);
  var L = f === "Все" ? ALL : ALL.filter(n => n.kind === f),
    N = L.slice(0, shown);
  React.useLayoutEffect(() => {
    var el = tabs.current && tabs.current.querySelector(".is-on");
    if (el) setInd({
      x: el.offsetLeft,
      w: el.offsetWidth
    });
  }, [f]);
  useNxReveal(grid, [f, shown]);
  return React.createElement(React.Fragment, null, React.createElement("div", {
    className: "nx-tabs",
    ref: tabs,
    role: "tablist"
  }, React.createElement("i", {
    className: "nx-tabs__ind",
    style: {
      transform: "translateX(" + ind.x + "px)",
      width: ind.w + "px"
    }
  }), kinds.map(k => {
    var c = k === "Все" ? ALL.length : ALL.filter(n => n.kind === k).length;
    return React.createElement("button", {
      key: k,
      type: "button",
      role: "tab",
      "aria-selected": f === k,
      className: "nx-tab" + (f === k ? " is-on" : ""),
      style: k !== "Все" ? {
        "--kc": NX_KIND[k]
      } : undefined,
      onClick: () => {
        setF(k);
        setShown(7);
      }
    }, k !== "Все" ? React.createElement("i", {
      className: "nx-tab__dot"
    }) : null, React.createElement("span", null, k), React.createElement("sup", null, c));
  })), React.createElement("div", {
    className: "nx-j",
    ref: grid,
    key: f
  }, N.map((n, i) => React.createElement(NxCard, {
    key: n.title,
    n: n,
    shape: NX_SHAPE[i % 7],
    mirror: Math.floor(i / 7) % 2 === 1
  }))), React.createElement(NxBar, _extends({
    shown: N.length,
    total: L.length,
    left: L.length - N.length,
    step: 7,
    more: () => setShown(s => s + 7),
    label: f === "Все" ? "" : f.toLowerCase()
  }, ctx)));
}
function NxIndex({
  ALL,
  ctx
}) {
  var [shown, setShown] = React.useState(8),
    list = React.useRef(null),
    [mon, setMon] = React.useState(null);
  var N = ALL.slice(0, shown);
  var groups = React.useMemo(() => {
    var g = [];
    N.forEach(n => {
      var [dd, mm, yy] = n.date.split("."),
        key = mm + "." + yy;
      var G = g[g.length - 1];
      if (!G || G.key !== key) {
        G = {
          key,
          m: NX_MONTHS[+mm - 1],
          y: yy,
          items: []
        };
        g.push(G);
      }
      G.items.push({
        ...n,
        dd
      });
    });
    return g;
  }, [shown]);
  useNxReveal(list, [shown]);
  React.useEffect(() => {
    var els = Array.from(list.current.querySelectorAll(".nx-ix__g"));
    var io = new IntersectionObserver(es => {
      es.forEach(e => {
        if (e.isIntersecting) setMon(e.target.dataset.k);
      });
    }, {
      rootMargin: "-40% 0px -55% 0px"
    });
    els.forEach(el => io.observe(el));
    if (!mon && groups[0]) setMon(groups[0].key);
    return () => io.disconnect();
  }, [groups.length]);
  var cur = groups.find(g => g.key === mon) || groups[0];
  return React.createElement(React.Fragment, null, React.createElement("div", {
    className: "nx-ix"
  }, React.createElement("aside", {
    className: "nx-ix__side"
  }, React.createElement("div", {
    className: "nx-ix__stick"
  }, React.createElement("span", {
    className: "t-label nx-ix__lab"
  }, "\u0425\u0440\u043E\u043D\u0438\u043A\u0430"), React.createElement("span", {
    className: "nx-ix__mon",
    key: cur && cur.key
  }, cur ? cur.m : ""), React.createElement("span", {
    className: "t-label nx-ix__y"
  }, cur ? cur.y + " · " + cur.items.length + " " + (cur.items.length === 1 ? "материал" : cur.items.length < 5 ? "материала" : "материалов") : ""), React.createElement("span", {
    className: "nx-ix__legend"
  }, Object.keys(NX_KIND).map(k => React.createElement("span", {
    key: k,
    className: "t-label",
    style: {
      "--kc": NX_KIND[k]
    }
  }, React.createElement("i", null), k))))), React.createElement("div", {
    className: "nx-ix__list",
    ref: list
  }, groups.map(g => React.createElement("div", {
    key: g.key,
    className: "nx-ix__g",
    "data-k": g.key
  }, React.createElement("span", {
    className: "nx-ix__gh t-label"
  }, g.m, " ", g.y), g.items.map(n => React.createElement("a", {
    key: n.title,
    href: "#news-" + n.id,
    onClick: e => nxOpen(e, n),
    "data-nx": "",
    className: "nx-r nx-press",
    style: nxKc(n),
    onPointerMove: nxTilt,
    onPointerLeave: nxUntilt
  }, React.createElement("span", {
    className: "nx-r__d"
  }, n.dd), React.createElement("span", {
    className: "nx-r__main"
  }, React.createElement(NxMeta, {
    n: n
  }), React.createElement("b", {
    className: "t-h1 nx-r__t"
  }, n.title), React.createElement("span", {
    className: "t-body-m nx-r__p"
  }, n.text)), React.createElement("span", {
    className: "nx-r__thumb"
  }, React.createElement("i", {
    style: {
      backgroundImage: "url(" + n.img + ")"
    }
  })), React.createElement(NxCorner, null))))))), React.createElement(NxBar, _extends({
    shown: N.length,
    total: ALL.length,
    left: ALL.length - N.length,
    step: 4,
    more: () => setShown(s => s + 4)
  }, ctx)));
}
function NxShelf({
  ALL,
  ctx
}) {
  var shown = ALL.length,
    rail = React.useRef(null),
    track = React.useRef(null),
    bar = React.useRef(null),
    S = React.useRef({
      x: 0,
      v: 0,
      max: 0,
      drag: false,
      sx: 0,
      ox: 0,
      lx: 0,
      lt: 0,
      moved: 0,
      raf: 0
    });
  var N = ALL.slice(0, shown);
  useNxReveal(track, [shown]);
  var paint = () => {
    var s = S.current;
    track.current.style.transform = "translate3d(" + (-s.x).toFixed(1) + "px,0,0)";
    track.current.style.setProperty("--sk", Math.max(-4, Math.min(4, s.v * .06)).toFixed(2) + "deg");
    if (bar.current) bar.current.style.transform = "translateX(" + (s.max ? s.x / s.max * (100 / .22 - 100) : 0).toFixed(2) + "%)";
  };
  var measure = () => {
    var s = S.current;
    var cs = getComputedStyle(rail.current),
      inner = rail.current.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    s.max = Math.max(0, track.current.scrollWidth - inner);
    s.x = Math.min(s.x, s.max);
    paint();
  };
  var glide = () => {
    var s = S.current;
    cancelAnimationFrame(s.raf);
    var f = () => {
      if (s.drag) return;
      s.v *= .93;
      s.x += s.v;
      if (s.x < 0) {
        s.x += (0 - s.x) * .2;
        s.v *= .5;
      }
      if (s.x > s.max) {
        s.x += (s.max - s.x) * .2;
        s.v *= .5;
      }
      paint();
      if (Math.abs(s.v) > .1 || s.x < -.5 || s.x > s.max + .5) s.raf = requestAnimationFrame(f);else {
        s.x = Math.max(0, Math.min(s.max, s.x));
        s.v = 0;
        paint();
      }
    };
    s.raf = requestAnimationFrame(f);
  };
  var to = x => {
    var s = S.current;
    cancelAnimationFrame(s.raf);
    var x0 = s.x,
      x1 = Math.max(0, Math.min(s.max, x)),
      t0 = performance.now(),
      D = 900;
    var f = now => {
      var k = Math.min(1, (now - t0) / D),
        e = k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
      s.x = x0 + (x1 - x0) * e;
      s.v = 0;
      paint();
      if (k < 1) s.raf = requestAnimationFrame(f);
    };
    s.raf = requestAnimationFrame(f);
  };
  React.useLayoutEffect(() => {
    measure();
    var ro = new ResizeObserver(measure);
    ro.observe(rail.current);
    ro.observe(track.current);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(S.current.raf);
    };
  }, [shown]);
  var dn = e => {
    if (e.button !== 0) return;
    var s = S.current;
    s.drag = true;
    s.sx = e.clientX;
    s.ox = s.x;
    s.lx = e.clientX;
    s.lt = performance.now();
    s.moved = 0;
    s.v = 0;
    cancelAnimationFrame(s.raf);
    s.pid = e.pointerId;
    s.cap = false;
  };
  var mv = e => {
    var s = S.current;
    if (!s.drag) return;
    var now = performance.now(),
      dx = e.clientX - s.lx;
    s.v = -dx / Math.max(1, now - s.lt) * 16;
    s.lx = e.clientX;
    s.lt = now;
    s.moved = Math.max(s.moved, Math.abs(e.clientX - s.sx));
    if (!s.cap && s.moved > 6) {
      s.cap = true;
      try {
        rail.current.setPointerCapture(s.pid);
      } catch (er) {}
      rail.current.classList.add("is-drag");
    }
    if (!s.cap) return;
    var x = s.ox - (e.clientX - s.sx);
    if (x < 0) x *= .35;
    if (x > s.max) x = s.max + (x - s.max) * .35;
    s.x = x;
    paint();
  };
  var up = () => {
    var s = S.current;
    if (!s.drag) return;
    s.drag = false;
    rail.current.classList.remove("is-drag");
    glide();
  };
  var click = e => {
    if (S.current.moved > 6) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  var wheel = e => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      var s = S.current;
      s.v = e.deltaX * .5;
      s.x = Math.max(0, Math.min(s.max, s.x + e.deltaX));
      paint();
      glide();
    }
  };
  var hov = React.useRef(null);
  var setHov = el => {
    if (hov.current === el) return;
    if (hov.current) {
      hov.current.classList.remove("is-h");
      nxUntilt({
        currentTarget: hov.current
      });
    }
    hov.current = el;
    if (el) el.classList.add("is-h");
  };
  var hover = e => {
    if (e.pointerType === "touch") return;
    var x = e.clientX,
      y = e.clientY;
    var hit = null;
    track.current.querySelectorAll("[data-nx]").forEach(c => {
      var r = c.getBoundingClientRect();
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) hit = c;
    });
    setHov(hit);
    if (hit) nxTilt({
      currentTarget: hit,
      clientX: x,
      clientY: y
    });
  };
  var page = dir => to(S.current.x + dir * rail.current.clientWidth * .7);
  return React.createElement(React.Fragment, null, React.createElement("div", {
    className: "nx-sh__nav nx-sh__nav--l"
  }, React.createElement("button", {
    type: "button",
    className: "nx-sh__arr nx-press",
    onClick: () => page(-1),
    "aria-label": "\u041D\u0430\u0437\u0430\u0434"
  }, "\u2190"), React.createElement("button", {
    type: "button",
    className: "nx-sh__arr nx-press",
    onClick: () => page(1),
    "aria-label": "\u0412\u043F\u0435\u0440\u0451\u0434"
  }, "\u2192"), React.createElement("span", {
    className: "t-label nx-sh__hint"
  }, "\u2190 \u0422\u044F\u043D\u0438\u0442\u0435 \u043B\u0435\u043D\u0442\u0443 \u2192"), React.createElement("span", {
    className: "nx-sh__prog"
  }, React.createElement("i", {
    ref: bar
  }))), React.createElement("div", {
    className: "nx-sh",
    ref: rail,
    onPointerDown: dn,
    onPointerMove: e => {
      mv(e);
      hover(e);
    },
    onPointerLeave: () => setHov(null),
    onPointerUp: up,
    onPointerCancel: up,
    onClickCapture: click,
    onWheel: wheel,
    "data-lenis-prevent": ""
  }, React.createElement("div", {
    className: "nx-sh__track",
    ref: track
  }, N.map((n, i) => {
    var L = n.layout || (i % 3 === 0 ? "horizontal" : n.kind === "Статья" ? "text" : "vertical"),
      wide = L === "horizontal",
      txt = L === "text";
    return React.createElement("a", {
      key: n.title,
      href: "#news-" + n.id,
      onClick: e => nxOpen(e, n),
      "data-nx": "",
      draggable: "false",
      className: "nx-t" + (wide ? " nx-t--w" : "") + (txt ? " nx-t--txt" : ""),
      style: nxKc(n)
    }, React.createElement("span", {
      className: "nx-t__in"
    }, txt ? null : React.createElement("span", {
      className: "nx-t__media"
    }, React.createElement("i", {
      style: {
        backgroundImage: "url(" + n.img + ")"
      }
    })), React.createElement("span", {
      className: "nx-t__body"
    }, React.createElement(NxMeta, {
      n: n
    }), React.createElement("b", {
      className: wide || txt ? "t-h1" : "t-h3-l"
    }, n.title), React.createElement("span", {
      className: "t-body-m nx-t__p"
    }, n.text))), React.createElement(NxCorner, null));
  }), React.createElement("a", {
    href: ctx.portal,
    onClick: ctx.toPortal,
    "data-nx": "",
    draggable: "false",
    className: "nx-t nx-t--end"
  }, React.createElement("span", {
    className: "nx-t__in"
  }, React.createElement("span", {
    className: "t-label"
  }, "\u041C\u0435\u0434\u0438\u0430-\u043F\u043E\u0440\u0442\u0430\u043B"), React.createElement("span", {
    className: "nx-t__end-b"
  }, React.createElement("b", {
    className: "nx-t__end-t"
  }, "\u0412\u0441\u0435 \u043D\u043E\u0432\u043E\u0441\u0442\u0438, \u0441\u0442\u0430\u0442\u044C\u0438 \u0438\xA0\u043A\u0435\u0439\u0441\u044B"), React.createElement("span", {
    className: "nx-t__go",
    "aria-hidden": "true"
  }, React.createElement("i", null, "\u2192"))))))));
}
var nxOpen = (e, n) => {
  e.preventDefault();
  window.dispatchEvent(new CustomEvent("rgby-news-open", {
    detail: n.id
  }));
};
function NewsModal({
  list,
  index,
  onClose,
  onNav
}) {
  var {
    Modal,
    CarouselArrow
  } = window.RGBYDS;
  var n = index != null ? list[index] : null,
    next = n && list.length > 1 ? list[(index + 1) % list.length] : null;
  React.useEffect(() => {
    var p = document.querySelector(".rg-modal__panel");
    if (p) p.scrollTop = 0;
  }, [index]);
  var paras = n ? String(n.body || "").split(/\n\s*\n/).map(s => s.trim()).filter(Boolean) : [];
  return React.createElement(Modal, {
    open: !!n,
    onClose: onClose,
    title: n ? "Новость " + String(index + 1).padStart(2, "0") + " / " + String(list.length).padStart(2, "0") : "",
    actions: n && list.length > 1 ? React.createElement(React.Fragment, null, React.createElement(CarouselArrow, {
      dir: "prev",
      tone: "outline",
      onClick: () => onNav(-1)
    }), React.createElement(CarouselArrow, {
      dir: "next",
      tone: "outline",
      onClick: () => onNav(1)
    })) : null
  }, n ? React.createElement("div", {
    className: "nwm"
  }, n.img ? React.createElement("div", {
    className: "nwm__cover"
  }, React.createElement("img", {
    src: n.img,
    alt: "",
    decoding: "async"
  })) : null, React.createElement("div", {
    className: "case-modal__body"
  }, React.createElement("div", {
    className: "nwm__meta",
    style: nxKc(n)
  }, React.createElement(NxMeta, {
    n: n
  })), React.createElement("h2", {
    className: "sec__title nwm__title"
  }, n.title), React.createElement("div", {
    className: "case-modal__text nwm__text"
  }, n.text ? React.createElement("p", {
    className: "t-lead",
    style: {
      margin: 0
    }
  }, n.text) : null, paras.map((p, k) => React.createElement("p", {
    key: k,
    className: "t-body-l",
    style: {
      margin: 0
    }
  }, p))), next && next !== n ? React.createElement("button", {
    type: "button",
    className: "case-modal__next",
    onClick: () => onNav(1)
  }, React.createElement("span", {
    className: "stack",
    style: {
      gap: "var(--sp-12)"
    }
  }, React.createElement("span", {
    className: "t-meta",
    style: {
      opacity: .6
    }
  }, "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0430\u044F \u043D\u043E\u0432\u043E\u0441\u0442\u044C"), React.createElement("span", {
    className: "t-h3-l"
  }, next.title)), React.createElement("span", {
    className: "t-button"
  }, "\u2192")) : null)) : null);
}
function News({
  variant,
  setVariant
}) {
  if (!["v4", "v5", "v6"].includes(variant)) return React.createElement(NewsOld, {
    variant: variant,
    setVariant: setVariant
  });
  var ALL = window.RGBY_MAIN.NEWS,
    portal = window.RGBY_MAIN.NEWS_PORTAL || "#",
    toPortal = e => {
      if (portal === "#") e.preventDefault();
    },
    ctx = {
      portal,
      toPortal
    };
  var V = {
    v4: NxJournal,
    v5: NxIndex,
    v6: NxShelf
  }[variant];
  var [open, setOpen] = React.useState(null);
  React.useEffect(() => {
    var f = e => {
      var i = ALL.findIndex(x => x.id === e.detail);
      if (i >= 0) setOpen(i);
    };
    addEventListener("rgby-news-open", f);
    return () => removeEventListener("rgby-news-open", f);
  }, [ALL]);
  return React.createElement("section", {
    id: "news",
    className: "m-sec m-news nx nx--" + variant,
    "data-screen-label": "04 \u0427\u0442\u043E \u043F\u0440\u043E\u0438\u0441\u0445\u043E\u0434\u0438\u0442"
  }, React.createElement(VariantSwitch, {
    label: "\u0427\u0442\u043E \u043F\u0440\u043E\u0438\u0441\u0445\u043E\u0434\u0438\u0442",
    value: variant,
    options: ["v1", "v2", "v3", "v4", "v5", "v6"],
    onChange: setVariant
  }), React.createElement("div", {
    className: "m-head"
  }, React.createElement("h2", {
    className: "sec__title rv"
  }, "\u0427\u0442\u043E \u043F\u0440\u043E\u0438\u0441\u0445\u043E\u0434\u0438\u0442"), React.createElement("p", {
    className: "m-head__lead t-body-l rv"
  }, window.RGBY_MAIN.NEWS_LEAD), React.createElement("a", {
    className: "t-link rv m-news__all",
    href: portal,
    onClick: toPortal
  }, "\u0412\u0441\u0435 \u043D\u043E\u0432\u043E\u0441\u0442\u0438 ", React.createElement("span", {
    className: "m-arrow",
    "aria-hidden": "true"
  }, "\u2192"))), React.createElement(V, {
    key: variant,
    ALL: ALL,
    ctx: ctx
  }), React.createElement(NewsModal, {
    list: ALL,
    index: open,
    onClose: () => setOpen(null),
    onNav: d => setOpen(i => (i + d + ALL.length) % ALL.length)
  }));
}
Object.assign(window, {
  News
});