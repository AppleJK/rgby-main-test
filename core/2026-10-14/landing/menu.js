// RGBY · menu.jsx.txt · сборка 2026-10-14
var menuStore = {
  open: false,
  subs: new Set(),
  set(v) {
    if (this.open === v) return;
    this.open = v;
    this.subs.forEach(f => f());
  },
  toggle() {
    this.set(!this.open);
  }
};
function useMenuOpen() {
  var [, force] = React.useReducer(x => x + 1, 0);
  React.useEffect(() => {
    menuStore.subs.add(force);
    return () => menuStore.subs.delete(force);
  }, []);
  return menuStore.open;
}
function MenuBurger({
  color
}) {
  var open = useMenuOpen();
  var {
    Burger
  } = window.RGBYDS;
  return React.createElement(Burger, {
    open: open,
    onClick: () => menuStore.toggle(),
    color: color
  });
}
var MENU_ANIM = ["crt"];
var MENU_HOVER = ["vhs", "fill", "glitch", "roll"];
var MENU_BG = ["blue", "mesh", "grid", "light"];
var MENU_GLITCH = ["step"];
var GL_R = "#FF0A2B",
  GL_B = "#0A1FFF",
  GL_K = "var(--rgby-ink)";
var rnd = (a, b) => a + Math.random() * (b - a);
function glitchFrame() {
  var bands = [0, 1, 2, 3, 4].sort(() => Math.random() - .5).slice(0, 1 + (Math.random() * 3 | 0));
  var R = [],
    L = [],
    blocks = [];
  bands.forEach(b => {
    var top = b * 20 + rnd(0, 6),
      h = rnd(8, 20),
      dep = rnd(4, 20),
      side = Math.random() < .6 ? R : L;
    side.push({
      top,
      h,
      dep
    });
    var c = Math.random() < .5 ? GL_R : GL_B,
      out = rnd(.04, .22).toFixed(3);
    blocks.push(side === R ? {
      top,
      h,
      left: 100 - dep - rnd(0, 6) + "%",
      right: "-" + out + "em",
      c
    } : {
      top,
      h,
      left: "-" + out + "em",
      right: 100 - dep - rnd(0, 6) + "%",
      c
    });
  });
  if (Math.random() < .55) {
    var t = rnd(0, 80),
      right = Math.random() < .5;
    blocks.push({
      top: t,
      h: rnd(4, 14),
      left: right ? "calc(100% + " + rnd(.02, .1).toFixed(3) + "em)" : "-" + rnd(.12, .3).toFixed(3) + "em",
      right: right ? "-" + rnd(.12, .3).toFixed(3) + "em" : "calc(100% + " + rnd(.02, .1).toFixed(3) + "em)",
      c: GL_K
    });
  }
  if (Math.random() < .35) {
    var _t = rnd(5, 90);
    blocks.push({
      top: _t,
      h: rnd(2, 5),
      left: rnd(-4, 20) + "%",
      right: rnd(-6, 30) + "%",
      c: Math.random() < .5 ? GL_R : GL_B
    });
  }
  R.sort((a, b) => a.top - b.top);
  L.sort((a, b) => b.top - a.top);
  var p = ["0% 0%", "100% 0%"];
  R.forEach(n => p.push("100% " + n.top + "%", 100 - n.dep + "% " + n.top + "%", 100 - n.dep + "% " + (n.top + n.h) + "%", "100% " + (n.top + n.h) + "%"));
  p.push("100% 100%", "0% 100%");
  L.forEach(n => p.push("0% " + (n.top + n.h) + "%", n.dep + "% " + (n.top + n.h) + "%", n.dep + "% " + n.top + "%", "0% " + n.top + "%"));
  return {
    clip: "polygon(" + p.join(",") + ")",
    x: rnd(-.03, .03).toFixed(3) + "em",
    blocks
  };
}
function useStepGlitch(hl, gl, force) {
  var timer = React.useRef(0);
  var reset = () => {
    clearTimeout(timer.current);
    timer.current = 0;
    if (hl.current) {
      hl.current.style.removeProperty("--gl-clip");
      hl.current.style.removeProperty("--gl-x");
    }
    if (gl.current) [...gl.current.children].forEach(i => {
      i.style.opacity = "0";
    });
  };
  var apply = f => {
    if (!hl.current || !gl.current) return;
    hl.current.style.setProperty("--gl-clip", f.clip);
    hl.current.style.setProperty("--gl-x", f.x);
    [...gl.current.children].forEach((i, k) => {
      var b = f.blocks[k];
      if (!b) {
        i.style.opacity = "0";
        return;
      }
      Object.assign(i.style, {
        opacity: "1",
        top: b.top + "%",
        height: b.h + "%",
        left: b.left,
        right: b.right,
        background: b.c
      });
    });
  };
  var clear = () => {
    if (hl.current) {
      hl.current.style.setProperty("--gl-clip", "none");
      hl.current.style.setProperty("--gl-x", "0em");
    }
    if (gl.current) [...gl.current.children].forEach(i => {
      i.style.opacity = "0";
    });
  };
  var start = el => {
    if (!force && !el.closest(".menu--h-vhs.menu--g-step") || timer.current) return;
    var frames = 2 + (Math.random() * 3 | 0);
    var burst = () => {
      if (frames-- > 0) {
        apply(glitchFrame());
        timer.current = setTimeout(burst, rnd(35, 90));
      } else {
        clear();
        frames = 1 + (Math.random() * 4 | 0);
        timer.current = setTimeout(burst, rnd(120, 650));
      }
    };
    burst();
  };
  React.useEffect(() => reset, []);
  return {
    start,
    stop: reset
  };
}
function MenuLink({
  href,
  label,
  i,
  num,
  small,
  onClick,
  external,
  current
}) {
  var t = String(label);
  var hl = React.useRef(null),
    gl = React.useRef(null);
  var g = useStepGlitch(hl, gl);
  return React.createElement("a", {
    href: href,
    "aria-current": current ? "true" : undefined,
    className: "menu__item" + (small ? " menu__item--s" : "") + (current ? " menu__item--cur" : ""),
    style: {
      "--i": i
    },
    onClick: e => {
      g.stop();
      onClick && onClick(e);
    },
    target: external ? "_blank" : undefined,
    rel: external ? "noopener" : undefined,
    onMouseEnter: e => g.start(e.currentTarget),
    onMouseLeave: g.stop,
    onFocus: e => g.start(e.currentTarget),
    onBlur: g.stop
  }, num ? React.createElement("span", {
    className: "menu__num"
  }, num) : null, React.createElement("span", {
    className: "menu__hl",
    ref: hl
  }, React.createElement("span", {
    className: "menu__gl",
    ref: gl,
    "aria-hidden": "true"
  }, React.createElement("i", null), React.createElement("i", null), React.createElement("i", null), React.createElement("i", null), React.createElement("i", null), React.createElement("i", null)), React.createElement("span", {
    className: "menu__t"
  }, React.createElement("span", {
    className: "menu__rise"
  }, React.createElement("span", {
    className: "menu__roll",
    "data-t": t
  }, t))), React.createElement("span", {
    className: "menu__arrow",
    "aria-hidden": "true"
  }, "\u2192")));
}
var SITE_ALL = [["Главная", "../main/index.html"], ["ТВ/Медиа", "../landing/index.html"], ["Веб", "../web/index.html"], ["Продакшн", "../dir/production.html"], ["R&D", "../dir/rnd.html"], ["Брендинг", "../dir/branding.html"], ["Мультимедиа", "../dir/multimedia.html"]];
var SITE = window.__RGBY_LINKS ? SITE_ALL.filter(([, h]) => h in window.__RGBY_LINKS).map(([t, h]) => [t, window.__RGBY_LINKS[h], h]) : SITE_ALL;
var sitePath = h => h.replace(/^\.\.\//, "/").replace(/\/index\.html$/, "/");
function siteCurrent() {
  if (window.RGBY_BASE != null) {
    var here = location.pathname.replace(/index\.html$/, "");
    var _hit = SITE.find(([, h]) => {
      try {
        return new URL(h, location.href).pathname.replace(/index\.html$/, "") === here;
      } catch (e) {
        return false;
      }
    });
    return _hit ? _hit[1] : null;
  }
  var p = decodeURI(location.pathname).replace(/\/index(\.release)?(\.html)?$/, "/");
  var hit = SITE.find(([, h, o]) => o && p.endsWith(sitePath(o)) || (h.charAt(0) === "/" ? p === h : p.endsWith(sitePath(h))));
  return hit ? hit[1] : /web-v2\//.test(p) ? "../web/index.html" : null;
}
function pnavTone(nav) {
  if (!nav) return "ink";
  var x = innerWidth - Math.max(8, innerWidth * .02),
    y = innerHeight / 2;
  var list = document.elementsFromPoint(x, y) || [];
  var el = list.find(n => !nav.contains(n) && !n.closest(".menu, .twk-panel, [data-twk]"));
  while (el && el !== document.documentElement) {
    var t = el.tagName;
    if (t === "IMG" || t === "VIDEO" || t === "CANVAS" || t === "IFRAME") return "paper";
    var s = getComputedStyle(el);
    if (s.backgroundImage && s.backgroundImage !== "none" && !/gradient/.test(s.backgroundImage)) return "paper";
    var m = s.backgroundColor.match(/[\d.]+/g);
    if (m && (m[3] === undefined || +m[3] > .5)) {
      var [R, G, B] = m.map(Number),
        L = .2126 * R + .7152 * G + .0722 * B,
        sat = Math.max(R, G, B) - Math.min(R, G, B);
      return L > 170 && sat < 90 ? "ink" : "paper";
    }
    el = el.parentElement;
  }
  return "ink";
}
function navInDom(list) {
  var rows = (list || []).map(([t, h], k) => ({
    t,
    h,
    k,
    el: h.charAt(0) === "#" ? document.querySelector(h) : null
  }));
  var ext = rows.filter(r => r.h.charAt(0) !== "#"),
    on = rows.filter(r => r.el);
  if (!on.length) return list || [];
  on.sort((a, b) => a.el === b.el ? a.k - b.k : a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
  return on.concat(ext).map(r => [r.t, r.h]);
}
function PageNav({
  go
}) {
  var open = useMenuOpen(),
    [NAVS, setNavs] = React.useState(() => window.NAV || []);
  React.useEffect(() => {
    var upd = () => setNavs(prev => {
      var nx = navInDom(window.NAV);
      return nx.map(r => r[1]).join() === prev.map(r => r[1]).join() ? prev : nx;
    });
    upd();
    var t1 = setTimeout(upd, 400),
      t2 = setTimeout(upd, 1500);
    var mo = new MutationObserver(() => {
      clearTimeout(mo.t);
      mo.t = setTimeout(upd, 120);
    });
    mo.observe(document.body, {
      childList: true,
      subtree: true
    });
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(mo.t);
      mo.disconnect();
    };
  }, []);
  var [tone, setTone] = React.useState("ink"),
    navRef = React.useRef(null);
  var [cur, setCur] = React.useState(-1),
    [show, setShow] = React.useState(false),
    [sheet, setSheet] = React.useState(false),
    [p, setP] = React.useState(0);
  React.useEffect(() => {
    var raf = 0;
    var f = () => {
      raf = 0;
      var line = innerHeight * .42;
      var hit = -1;
      NAVS.forEach(([, h], i) => {
        var el = h.charAt(0) === "#" && document.querySelector(h);
        if (el && el.getBoundingClientRect().top <= line) hit = i;
      });
      var max = document.documentElement.scrollHeight - innerHeight;
      setCur(hit);
      try {
        var tn = pnavTone(navRef.current);
        setTone(tn);
      } catch (e) {}
      setShow(scrollY > innerHeight * .6);
      setP(max > 0 ? Math.min(1, scrollY / max) : 0);
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
      cancelAnimationFrame(raf);
      removeEventListener("scroll", q);
      removeEventListener("resize", q);
    };
  }, [NAVS]);
  React.useEffect(() => {
    if (!show) setSheet(false);
  }, [show]);
  if (!NAVS.length || NAVS.every(([, h]) => h.charAt(0) !== "#")) return null;
  var to = (e, h) => {
    e.preventDefault();
    setSheet(false);
    go(h);
  };
  var c = NAVS[cur];
  return React.createElement("nav", {
    ref: navRef,
    className: "pnav pnav--" + tone + (show && !open ? " is-on" : "") + (sheet ? " is-sheet" : ""),
    "aria-label": "\u0420\u0430\u0437\u0434\u0435\u043B\u044B \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B",
    style: {
      "--p": p
    }
  }, React.createElement("ol", {
    className: "pnav__rail"
  }, NAVS.map(([t, h], i) => React.createElement("li", {
    key: h
  }, React.createElement("a", {
    href: h,
    onClick: e => to(e, h),
    className: "pnav__i" + (i === cur ? " is-cur" : "") + (i < cur ? " is-past" : ""),
    "aria-current": i === cur ? "location" : undefined
  }, React.createElement("span", {
    className: "pnav__t"
  }, t), React.createElement("span", {
    className: "pnav__n"
  }, String(i + 1).padStart(2, "0")), React.createElement("i", {
    className: "pnav__tick"
  }))))), React.createElement("button", {
    type: "button",
    className: "pnav__pill",
    onClick: () => setSheet(s => !s),
    "aria-expanded": sheet
  }, React.createElement("i", {
    className: "pnav__bar"
  }), React.createElement("span", {
    className: "pnav__n"
  }, c ? String(cur + 1).padStart(2, "0") : "—"), React.createElement("span", {
    className: "pnav__t"
  }, c ? c[0] : "Разделы"), React.createElement("svg", {
    viewBox: "0 0 10 6",
    "aria-hidden": "true"
  }, React.createElement("path", {
    d: "M1 5l4-4 4 4",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }))));
}
function Menu({
  go,
  anim: animProp = "crt",
  hover = "vhs",
  bg = "light",
  glitch = "step",
  setAnim,
  setHover,
  setBg,
  setGlitch
}) {
  var {
    Logo,
    Burger
  } = window.RGBYDS;
  var Noise = window.Noise;
  var anim = "crt";
  var open = useMenuOpen();
  var onClose = React.useCallback(() => menuStore.set(false), []);
  React.useEffect(() => {
    if (!open) return;
    var k = e => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);
  var tiles = React.useMemo(() => {
    var out = [];
    for (var r = 0; r < 7; r++) for (var c = 0; c < 12; c++) out.push(Math.round((c + r * 1.4) * 22 + Math.random() * 60));
    return out;
  }, []);
  var CLOSE_MS = {
    top: 620,
    crt: 620,
    channel: 760,
    grid: 1300
  };
  var [closing, setClosing] = React.useState(false);
  var [prevOpen, setPrevOpen] = React.useState(open);
  if (prevOpen !== open) {
    setPrevOpen(open);
    setClosing(!open);
  }
  React.useEffect(() => {
    if (!closing) return;
    var t = setTimeout(() => setClosing(false), CLOSE_MS[anim] || 900);
    return () => clearTimeout(t);
  }, [closing]);
  var live = open || closing;
  React.useEffect(() => {
    if (!live) return;
    var root = document.documentElement,
      prev = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = prev;
    };
  }, [live]);
  var [cur, setCur] = React.useState(null);
  React.useEffect(() => {
    if (!open) return;
    var line = window.innerHeight * .4;
    var hit = null;
    NAV.forEach(([, h]) => {
      var el = document.querySelector(h);
      if (el && el.getBoundingClientRect().top <= line) hit = h;
    });
    setCur(hit);
  }, [open]);
  var nav = (e, h) => {
    e.preventDefault();
    onClose();
    setTimeout(() => go(h), (CLOSE_MS[anim] || 650) + 40);
  };
  var PNAV = React.useMemo(() => live ? navInDom(window.NAV) : window.NAV || [], [live]);
  var here = siteCurrent();
  var page = (e, h) => {
    e.preventDefault();
    if (h === here) {
      onClose();
      setTimeout(() => go("#top"), (CLOSE_MS[anim] || 650) + 40);
      return;
    }
    location.href = h;
  };
  var N = SITE.length + NAV.length;
  return React.createElement(React.Fragment, null, React.createElement(PageNav, {
    go: go
  }), React.createElement("div", {
    className: "menu menu--a-" + anim + " menu--h-" + hover + " menu--g-" + glitch + " menu--bg-" + bg + (open ? " menu--open" : "") + (closing ? " menu--closing" : ""),
    "aria-hidden": !open,
    role: "dialog",
    "aria-label": "\u041C\u0435\u043D\u044E"
  }, React.createElement("div", {
    className: "menu__bg"
  }, bg === "mesh" ? React.createElement("div", {
    className: "menu__mesh"
  }, React.createElement("i", null), React.createElement("i", null), React.createElement("i", null), React.createElement("i", null), React.createElement("i", null)) : null, bg === "grid" ? React.createElement(React.Fragment, null, React.createElement("div", {
    className: "menu__cols"
  }, Array.from({
    length: 12
  }).map((_, k) => React.createElement("i", {
    key: k
  }))), React.createElement("div", {
    className: "menu__rows"
  }), React.createElement("div", {
    className: "menu__bars"
  }, React.createElement("i", null), React.createElement("i", null), React.createElement("i", null), React.createElement("i", null), React.createElement("i", null), React.createElement("i", null), React.createElement("i", null))) : null, (bg === "mesh" || bg === "light") && Noise && live ? React.createElement(Noise, {
    className: "menu__grain"
  }) : null, bg === "light" ? React.createElement("div", {
    className: "menu__lines"
  }) : null, React.createElement("i", {
    className: "menu__glow"
  })), anim === "channel" && live ? React.createElement("div", {
    key: open ? "o" : "c",
    className: "menu__static"
  }, Noise ? React.createElement(Noise, {
    className: "menu__static-grain",
    strong: true
  }) : null, React.createElement("i", null)) : null, anim === "grid" ? React.createElement("div", {
    className: "menu__tiles"
  }, tiles.map((d, k) => React.createElement("i", {
    key: k,
    style: {
      "--dl": d + "ms"
    }
  }))) : null, React.createElement("div", {
    className: "menu__in"
  }, React.createElement("div", {
    className: "hdr menu__fade"
  }, React.createElement("div", {
    className: "hdr__l"
  }, React.createElement(Logo, {
    color: "currentColor"
  }), React.createElement("span", {
    className: "menu__live"
  }, React.createElement("b", null), "\u0412 \u044D\u0444\u0438\u0440\u0435")), React.createElement(Burger, {
    open: open,
    onClick: onClose,
    color: "currentColor"
  })), React.createElement("div", {
    className: "menu__body"
  }, React.createElement("nav", {
    className: "menu__nav",
    "aria-label": "\u0420\u0430\u0437\u0434\u0435\u043B\u044B \u0441\u0430\u0439\u0442\u0430"
  }, SITE.map(([t, h], k) => React.createElement(MenuLink, {
    key: h,
    href: h,
    i: k,
    num: k ? String(k).padStart(2, "0") : "00",
    onClick: e => page(e, h),
    label: t,
    current: here === h
  }))), PNAV.some(([, h]) => h.charAt(0) === "#") ? React.createElement("nav", {
    className: "menu__page",
    "aria-label": "\u041D\u0430 \u044D\u0442\u043E\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435"
  }, React.createElement("span", {
    className: "menu__page-k menu__fade"
  }, "\u041D\u0430 \u044D\u0442\u043E\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435"), PNAV.map(([t, h], k) => React.createElement(MenuLink, {
    small: true,
    key: h,
    href: h,
    i: SITE.length + k,
    onClick: e => nav(e, h),
    label: t,
    current: cur === h
  }))) : null), React.createElement("div", {
    className: "menu__foot"
  }, React.createElement("div", {
    className: "menu__contacts"
  }, React.createElement(MenuLink, {
    small: true,
    i: N,
    href: "mailto:hello@rgby.ru",
    label: "hello@rgby.ru"
  }), React.createElement(MenuLink, {
    small: true,
    i: N + 1,
    href: "tel:+78047007370",
    label: "+7(804) 700-73-70"
  }), React.createElement(MenuLink, {
    small: true,
    i: N + 2,
    href: "https://t.me/hellorgby",
    external: true,
    label: "@hellorgby"
  })), React.createElement(MenuLink, {
    small: true,
    i: N + 3,
    href: "#brief",
    onClick: e => nav(e, "#brief"),
    label: "\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442"
  })), setAnim ? React.createElement("div", {
    className: "menu__vsw menu__fade"
  }, React.createElement(VariantSwitch, {
    label: "\u0425\u043E\u0432\u0435\u0440",
    value: hover,
    options: MENU_HOVER,
    onChange: setHover
  }), React.createElement(VariantSwitch, {
    label: "\u0424\u043E\u043D",
    value: bg,
    options: MENU_BG,
    onChange: setBg
  })) : null)));
}
function SiteSticky({
  onBrief,
  label = "Запустить проект"
}) {
  var {
    Logo,
    Button
  } = window.RGBYDS;
  var menuOpen = useMenuOpen();
  var [show, setShow] = React.useState(false),
    [hold, setHold] = React.useState(false),
    prev = React.useRef(menuOpen);
  React.useEffect(() => {
    var raf = 0;
    var f = () => {
      raf = 0;
      var h = document.getElementById("top");
      setShow(h ? h.getBoundingClientRect().bottom < 0 : scrollY > innerHeight);
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
      cancelAnimationFrame(raf);
      removeEventListener("scroll", q);
      removeEventListener("resize", q);
    };
  }, []);
  React.useEffect(() => {
    if (prev.current && !menuOpen) {
      setHold(true);
      var t = setTimeout(() => setHold(false), 900);
      prev.current = menuOpen;
      return () => clearTimeout(t);
    }
    prev.current = menuOpen;
  }, [menuOpen]);
  return React.createElement("div", {
    className: "sticky" + (show && !menuOpen && !hold ? " sticky--on" : "")
  }, React.createElement("a", {
    href: "#top",
    "aria-label": "RGBY",
    style: {
      display: "flex",
      color: "var(--rgby-ink)"
    }
  }, React.createElement(Logo, null)), React.createElement("div", {
    className: "hdr__r"
  }, React.createElement(Button, {
    variant: "blue",
    size: "m",
    onClick: onBrief
  }, label), React.createElement(MenuBurger, {
    color: "var(--rgby-ink)"
  })));
}
Object.assign(window, {
  SiteSticky,
  SITE,
  PageNav,
  useStepGlitch,
  Menu,
  menuStore,
  useMenuOpen,
  MenuBurger,
  MENU_ANIM,
  MENU_HOVER,
  MENU_BG,
  MENU_GLITCH
});