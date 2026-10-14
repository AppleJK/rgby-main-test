// RGBY · main-projects.jsx.txt · сборка 2026-10-14
var ProjectsOld = props => React.createElement(window.ProjectsV1, props);
var PJ_NEW = ["lens", "ring", "tunnel", "shader", "deck"];
var pjU = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--u")) || 1;
var pjReduce = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
var pjPrevent = e => e.preventDefault();
var pjCl = (x, a, b) => x < a ? a : x > b ? b : x;
var PjArrow = () => React.createElement("span", {
  className: "m-arrow",
  "aria-hidden": "true"
}, "\u2192");
var PjHead = ({
  hint
}) => React.createElement("div", {
  className: "m-head"
}, React.createElement("h2", {
  className: "sec__title rv"
}, "\u041D\u0430\u0448\u0438 \u043F\u0440\u043E\u0435\u043A\u0442\u044B"), hint ? React.createElement("p", {
  className: "m-head__lead t-body-l rv"
}, hint) : null, React.createElement("a", {
  className: "t-link rv",
  href: "#",
  onClick: pjPrevent
}, "\u0412\u0441\u0435 \u043F\u0440\u043E\u0435\u043A\u0442\u044B ", React.createElement(PjArrow, null)));
function PjInfo({
  p,
  i,
  n
}) {
  return React.createElement("div", {
    className: "pj-info",
    key: p.title
  }, React.createElement("span", {
    className: "pj-info__meta t-label"
  }, React.createElement("span", null, "/ ", p.kind), React.createElement("span", null, String(i + 1).padStart(2, "0"), " \u2014 ", String(n).padStart(2, "0"))), React.createElement("b", {
    className: "t-display-l pj-info__t"
  }, p.title), React.createElement("span", {
    className: "t-body-l pj-info__p"
  }, p.text), React.createElement("span", {
    className: "m-tile__tags"
  }, p.tags.map(t => React.createElement("i", {
    key: t
  }, t))), React.createElement("a", {
    href: "#",
    onClick: pjPrevent,
    className: "pj-info__go t-h3-l"
  }, React.createElement("span", null, "\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043A\u0435\u0439\u0441"), React.createElement(PjArrow, null)));
}
function usePjLoop(ref, tick, deps) {
  React.useEffect(() => {
    var el = ref.current;
    if (!el) return;
    var raf = 0,
      vis = false,
      prev = performance.now();
    var f = now => {
      var dt = Math.min(50, now - prev);
      prev = now;
      tick(dt, now);
      if (vis) raf = requestAnimationFrame(f);
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
    tick(16, performance.now());
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, deps || []);
}
function PjRing({
  P
}) {
  var L = React.useMemo(() => P.concat(P), [P]),
    N = L.length,
    step = 360 / N;
  var stage = React.useRef(null),
    ring = React.useRef(null),
    cards = React.useRef([]),
    S = React.useRef({
      rot: 0,
      v: 0,
      drag: false,
      lx: 0,
      moved: 0,
      tx: 0,
      ty: 0,
      cx: 0,
      cy: 0,
      has: false,
      target: null,
      R: 600
    });
  var [act, setAct] = React.useState(0),
    actR = React.useRef(0),
    [R, setR] = React.useState(600);
  React.useLayoutEffect(() => {
    var m = () => {
      var w = cards.current[0] ? cards.current[0].offsetWidth : 300;
      var r = w / 2 / Math.tan(Math.PI / N) * 1.06;
      S.current.R = r;
      setR(r);
    };
    m();
    addEventListener("resize", m);
    return () => removeEventListener("resize", m);
  }, [N]);
  usePjLoop(stage, dt => {
    var s = S.current,
      k = dt / 16;
    if (!s.drag) {
      if (s.target != null) {
        var d = s.target - s.rot;
        s.rot += d * Math.min(1, .085 * k);
        if (Math.abs(d) < .05) {
          s.rot = s.target;
          s.target = null;
        }
      } else {
        s.v *= Math.pow(.94, k);
        s.rot += s.v * k;
        if (!s.has && Math.abs(s.v) < .05 && !pjReduce()) s.rot -= .035 * k;
      }
    }
    s.cx += ((s.has ? s.tx : 0) - s.cx) * Math.min(1, .06 * k);
    s.cy += ((s.has ? s.ty : 0) - s.cy) * Math.min(1, .06 * k);
    if (ring.current) ring.current.style.transform = "translateZ(" + (-s.R).toFixed(1) + "px) rotateX(" + (-6 - s.cy * 12).toFixed(2) + "deg) rotateY(" + (s.rot + s.cx * 8).toFixed(2) + "deg)";
    if (stage.current) stage.current.style.perspectiveOrigin = (50 + s.cx * 14).toFixed(2) + "% " + (42 + s.cy * 12).toFixed(2) + "%";
    cards.current.forEach((c, i) => {
      if (c) c.style.setProperty("--f", Math.cos((i * step + s.rot + s.cx * 8) * Math.PI / 180).toFixed(3));
    });
    var a = (Math.round(-s.rot / step) % N + N) % N;
    if (a !== actR.current) {
      actR.current = a;
      setAct(a);
    }
  }, [N]);
  var goTo = i => {
    var s = S.current;
    var t = -i * step;
    while (t - s.rot > 180) t -= 360;
    while (s.rot - t > 180) t += 360;
    s.target = t;
    s.v = 0;
  };
  var dn = e => {
    var s = S.current;
    s.drag = true;
    s.lx = e.clientX;
    s.moved = 0;
    s.v = 0;
    s.target = null;
    stage.current.setPointerCapture(e.pointerId);
    stage.current.classList.add("is-drag");
  };
  var mv = e => {
    if (fromCase(e)) return;
    var s = S.current,
      r = stage.current.getBoundingClientRect();
    s.tx = (e.clientX - r.left) / r.width - .5;
    s.ty = (e.clientY - r.top) / r.height - .5;
    s.has = true;
    if (s.drag) {
      var dx = e.clientX - s.lx;
      s.rot += dx * .2;
      s.v = dx * .2;
      s.lx = e.clientX;
      s.moved += Math.abs(dx);
    }
  };
  var up = () => {
    S.current.drag = false;
    stage.current.classList.remove("is-drag");
  };
  var p = L[act];
  return React.createElement("section", {
    id: "projects",
    className: "m-sec m-proj pj pj--ring",
    "data-screen-label": "06 \u041F\u0440\u043E\u0435\u043A\u0442\u044B"
  }, React.createElement(PjHead, {
    hint: "\u0422\u044F\u043D\u0438\u0442\u0435 \u043A\u043E\u043B\u044C\u0446\u043E \u0438\u043B\u0438 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0440\u043E\u0435\u043A\u0442 \u2014 \u0441\u0446\u0435\u043D\u0430 \u0441\u043B\u0435\u0434\u0443\u0435\u0442 \u0437\u0430 \u043A\u0443\u0440\u0441\u043E\u0440\u043E\u043C"
  }), React.createElement("div", {
    className: "pj-rg",
    ref: stage,
    onPointerDown: dn,
    onPointerMove: mv,
    onPointerUp: up,
    onPointerCancel: up,
    onPointerLeave: e => {
      if (fromCase(e)) return;
      S.current.has = false;
      up();
    }
  }, React.createElement("div", {
    className: "pj-rg__ring",
    ref: ring
  }, L.map((x, i) => React.createElement("a", {
    key: i,
    ref: el => cards.current[i] = el,
    href: "#",
    draggable: "false",
    className: "pj-rg__c" + (i === act ? " is-on" : ""),
    style: {
      transform: "rotateY(" + i * step + "deg) translateZ(" + R.toFixed(1) + "px)"
    },
    onClick: e => {
      e.preventDefault();
      if (S.current.moved < 6 && i !== act) goTo(i);
    }
  }, React.createElement("i", {
    style: {
      backgroundImage: "url(" + x.img + ")"
    }
  }), React.createElement("span", {
    className: "pj-rg__lab t-label"
  }, x.kind)))), React.createElement("i", {
    className: "pj-rg__floor",
    "aria-hidden": "true"
  })), React.createElement("div", {
    className: "pj-rg__info"
  }, React.createElement(PjInfo, {
    p: p,
    i: act % P.length,
    n: P.length
  }), React.createElement("div", {
    className: "pj-arr"
  }, React.createElement("button", {
    type: "button",
    onClick: () => goTo((act - 1 + N) % N),
    "aria-label": "\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0439"
  }, "\u2190"), React.createElement("button", {
    type: "button",
    onClick: () => goTo((act + 1) % N),
    "aria-label": "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439"
  }, "\u2192"))));
}
var PJ_DIRC = {
  media: "84,56,255",
  web: "84,116,168",
  production: "232,0,18",
  rnd: "255,116,64",
  branding: "255,70,0",
  multimedia: "214,36,214"
};
function PjLens({
  P,
  flow,
  dof = false
}) {
  var DIAG = flow === "diag",
    ANG = DIAG ? -13 * Math.PI / 180 : 0,
    CA = Math.cos(ANG),
    SA = Math.sin(ANG);
  var sec = React.useRef(null),
    wrap = React.useRef(null),
    cv = React.useRef(null),
    tip = React.useRef(null),
    imgs = React.useRef({});
  var S = React.useRef({
    ox: 0,
    vx: 0,
    mx: 0,
    my: 0,
    has: false,
    lx: 0,
    drag: false,
    moved: 0,
    lmx: -1,
    lmy: -1,
    t: 0,
    W: 0,
    H: 0,
    top: 0,
    band: 0,
    hov: -1,
    best: false
  });
  var [hov, setHov] = React.useState(-1),
    n = P.length,
    ROWS = 3;
  var DIRS = React.useMemo(() => Object.fromEntries((window.RGBY_MAIN.DIRECTIONS || []).map(x => [x.id, x.title])), []);
  var perm = React.useMemo(() => {
    var a = P.map((_, i) => i);
    var s = 7;
    for (var i = a.length - 1; i > 0; i--) {
      s = (s * 9301 + 49297) % 233280;
      var j = Math.floor(s / 233280 * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }, [P]);
  var srcOf = (pi, v) => {
    var L = P[pi].imgs && P[pi].imgs.length ? P[pi].imgs : [P[pi].img];
    return L[(v % L.length + L.length) % L.length];
  };
  var imOf = src => {
    var im = imgs.current[src];
    if (!im) {
      im = new Image();
      im.decoding = "async";
      im.src = src;
      imgs.current[src] = im;
    }
    return im;
  };
  React.useEffect(() => {
    P.forEach(p => (p.imgs || [p.img]).forEach(imOf));
  }, [P]);
  React.useLayoutEffect(() => {
    var el = wrap.current,
      c = cv.current;
    var m = () => {
      if (S.current.open) return;
      if (DIAG && sec.current) {
        var rise = Math.ceil(Math.abs(SA) * el.clientWidth / 2),
          ov = Math.ceil(rise + el.clientHeight * .45 + 24);
        if (sec.current.style.getPropertyValue("--ov") !== ov + "px") {
          sec.current.style.setProperty("--ov", ov + "px");
          sec.current.style.setProperty("--rise", rise + "px");
        }
      }
      var d = Math.min(2, devicePixelRatio || 1),
        st = S.current;
      st.W = c.clientWidth;
      st.H = c.clientHeight;
      st.top = el.getBoundingClientRect().top - c.getBoundingClientRect().top;
      st.band = el.clientHeight;
      c.width = Math.round(st.W * d);
      c.height = Math.round(st.H * d);
      c.getContext("2d").setTransform(d, 0, 0, d, 0, 0);
    };
    m();
    var ro = new ResizeObserver(m);
    ro.observe(el);
    ro.observe(c);
    return () => ro.disconnect();
  }, []);
  var lv = React.useRef(new Map());
  var levels = im => {
    var a = lv.current.get(im);
    if (a) return a;
    if (!im.complete || !im.naturalWidth) return null;
    var r = im.naturalHeight / im.naturalWidth;
    a = [im];
    var src = im;
    for (var w = 240; w >= 30; w /= 2) {
      var c = document.createElement("canvas");
      c.width = w;
      c.height = Math.max(1, Math.round(w * r));
      var x = c.getContext("2d");
      x.imageSmoothingQuality = "high";
      x.drawImage(src, 0, 0, c.width, c.height);
      a.push(c);
      src = c;
    }
    lv.current.set(im, a);
    return a;
  };
  var coverB = (ctx, im, x, y, w, h, b) => {
    var L = b > .02 && im ? levels(im) : null;
    if (!L) return cover(ctx, im, x, y, w, h);
    var f = Math.min(L.length - 1.001, b * (L.length - 1)),
      i0 = Math.floor(f),
      t = f - i0;
    cover(ctx, L[i0], x, y, w, h);
    if (t > .02) {
      ctx.globalAlpha = t;
      cover(ctx, L[i0 + 1], x, y, w, h);
      ctx.globalAlpha = 1;
    }
  };
  var cover = (ctx, im, x, y, w, h) => {
    var iw = im && (im.naturalWidth || im.width),
      ih = im && (im.naturalHeight || im.height);
    if (!im || im.complete === false || !iw) {
      ctx.fillStyle = "rgba(243,244,255,.06)";
      ctx.fillRect(x, y, w, h);
      return;
    }
    var r = w / h;
    var sx = 0,
      sy = 0,
      sw = iw,
      sh = ih;
    if (iw / ih > r) {
      sw = ih * r;
      sx = (iw - sw) / 2;
    } else {
      sh = iw / r;
      sy = (ih - sh) / 2;
    }
    ctx.drawImage(im, sx, sy, sw, sh, x, y, w, h);
  };
  usePjLoop(wrap, dt => {
    var s = S.current,
      c = cv.current;
    if (!c || !s.W) return;
    var ctx = c.getContext("2d"),
      u = pjU(),
      W = s.W,
      H = s.H,
      k = dt / 16,
      red = pjReduce();
    s.blue = !!(sec.current && sec.current.closest(".tn-proj"));
    if (s.open) {
      if (s.frozeKey === s.openKey) return;
      s.frozeKey = s.openKey;
    } else {
      s.frozeKey = undefined;
      s.t += dt;
    }
    var FZ = s.open;
    var B0 = s.top,
      B1 = s.top + s.band,
      cxm = W / 2,
      cym = (B0 + B1) / 2;
    var dper = s.has ? Math.abs(-(s.mx - cxm) * SA + (s.my - cym) * CA) : 1e9,
      hb = s.band / 2,
      fall = 150 * u,
      nr = dper <= hb ? 1 : dper >= hb + fall ? 0 : 1 - (dper - hb) / fall,
      nearT = nr * nr * (3 - 2 * nr);
    if (!FZ) s.near = (s.near || 0) + (nearT - (s.near || 0)) * Math.min(1, .08 * k);
    if (!s.drag && !s.open) {
      var VM = 18 * u;
      s.vx = Math.max(-VM, Math.min(VM, s.vx)) * Math.pow(.93, k);
      s.ox += (s.vx + (red ? 0 : -.35 * (1 - .9 * s.near) * (s.hov >= 0 ? .15 : 1))) * k;
    }
    var ix = cxm + Math.sin(s.t * .00042) * W * .3,
      iy = cym + Math.sin(s.t * .00061 + 1) * s.band * .3;
    var cmy = cym + (s.mx - cxm) * SA / CA,
      tx = ix + (s.mx - ix) * s.near,
      ty = iy + (pjCl(s.my, cmy - hb, cmy + hb) - iy) * s.near,
      ease = .05 + .15 * s.near;
    if (s.lmx < 0) {
      s.lmx = tx;
      s.lmy = ty;
    }
    if (!FZ) s.lmx += (tx - s.lmx) * Math.min(1, ease * k);
    if (!FZ) s.lmy += (ty - s.lmy) * Math.min(1, ease * k);
    var g = 36 * u,
      th = 1.07 * (s.band * .86 - 26 * u * (ROWS - 1)) / ROWS,
      ch = th + g,
      Y0 = B1 - s.band * .021 - (th * ROWS + g * (ROWS - 1)) + 36 * u,
      gx = (DIAG ? 56 : 12) * u,
      R = Math.max(s.band * .5, Math.min(W * .22, s.band * .75)),
      T = [];
    var AR = P.map(p => {
      var im = imgs.current[p.img];
      var r = im && im.naturalWidth ? im.naturalWidth / im.naturalHeight : 16 / 9;
      return r < .5 ? .5 : r > 2.4 ? 2.4 : r;
    });
    var cx0 = W / 2,
      cy0 = (B0 + B1) / 2,
      span = W / CA,
      off = Math.max(1, Math.round(n / ROWS) + 1),
      avg = th * 16 / 9;
    for (var j = 0; j < ROWS; j++) {
      var ord = [],
        X = [];
      var Pj = 0;
      for (var q = 0; q < n; q++) {
        var pi = perm[(q + j * off) % n];
        ord.push(pi);
        X.push(Pj);
        Pj += th * AR[pi] + gx;
      }
      var shift = j * avg * .42,
        xmin = -(span - W) / 2 - s.ox - shift - 2 * avg,
        xmax = xmin + span + 4 * avg;
      for (var _c = Math.floor(xmin / Pj); _c <= Math.floor(xmax / Pj); _c++) for (var _q = 0; _q < n; _q++) {
        var _pi = ord[_q],
          tw = th * AR[_pi],
          x0 = _c * Pj + X[_q];
        if (x0 + tw < xmin || x0 > xmax) continue;
        var lx = x0 + s.ox + shift + tw / 2 - cx0,
          ly = Y0 + j * ch + th / 2 - cy0,
          x = cx0 + lx * CA - ly * SA,
          y = cy0 + lx * SA + ly * CA,
          dx = x - s.lmx,
          dy = y - s.lmy,
          qq = Math.exp(-(dx * dx + dy * dy) / (R * R));
        var nx = s.lmx + dx * (1 + .5 * qq),
          ny = s.lmy + dy * (1 + .32 * qq),
          sc = 1 + 1.05 * qq,
          w = tw * sc,
          h = th * sc;
        if (nx + w / 2 < 0 || nx - w / 2 > W || ny + h / 2 < 0 || ny - h / 2 > H) continue;
        T.push({
          x: nx - w / 2,
          y: ny - h / 2,
          w,
          h,
          q: qq,
          key: _c + ":" + _q + ":" + j,
          pi: _pi,
          src: srcOf(_pi, _c + j + _pi * 3 % 2)
        });
      }
    }
    T.sort((a, b) => a.q - b.q);
    ctx.clearRect(0, 0, W, H);
    var best = null;
    var bMax = dof ? .34 + .36 * (s.near || 0) : 0,
      qTop = T.length ? T[T.length - 1].q : 1;
    T.forEach(t => {
      var rel = qTop > .001 ? t.q / qTop : 0,
        hit = s.has && s.mx >= t.x && s.mx <= t.x + t.w && s.my >= t.y && s.my <= t.y + t.h;
      t.b = hit && s.near > .5 ? 0 : bMax * Math.pow(1 - rel, .8);
    });
    T.forEach(t => {
      if (s.open && t.key === s.openKey) return;
      coverB(ctx, imOf(t.src), t.x, t.y, t.w, t.h, t.b);
      ctx.fillStyle = (s.blue ? "rgba(30,58,214," : "rgba(6,16,37,") + ((s.blue ? .62 : .68) * (1 - t.q)).toFixed(3) + ")";
      ctx.fillRect(t.x, t.y, t.w, t.h);
      if (s.has && s.mx >= t.x && s.mx <= t.x + t.w && s.my >= t.y && s.my <= t.y + t.h) best = t;
    });
    if (best) {
      ctx.strokeStyle = s.blue ? "#F3F4FF" : "#2C4FFF";
      ctx.lineWidth = 2;
      ctx.strokeRect(best.x + 1, best.y + 1, best.w - 2, best.h - 2);
    }
    if (best && !s.open) {
      s.bestR = {
        x: best.x,
        y: best.y,
        w: best.w,
        h: best.h
      };
      s.bestKey = best.key;
    }
    var bi = best && !s.open ? best.pi : -1;
    if (bi !== s.hov) {
      s.hov = bi;
      setHov(bi);
    }
    if (tip.current) {
      var tw2 = tip.current.offsetWidth,
        flip = s.mx + 24 + tw2 > W;
      tip.current.style.transform = "translate(" + (flip ? s.mx - 18 - tw2 : s.mx + 22).toFixed(1) + "px," + (s.my + 18).toFixed(1) + "px)";
    }
    c.style.cursor = best ? "pointer" : s.drag ? "grabbing" : "grab";
  }, [n]);
  var pt = e => {
    var r = cv.current.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top];
  };
  var inside = (x, y) => {
    var s = S.current;
    return y >= 0 && y <= s.H && x >= 0 && x <= s.W;
  };
  var fromCase = e => S.current.open || e.target.closest && e.target.closest(".pj-cs");
  var dn = e => {
    if (fromCase(e)) return;
    var s = S.current,
      [x, y] = pt(e);
    if (!inside(x, y) || e.button !== 0 || e.target.closest("a.t-link,.vsw")) return;
    s.drag = true;
    s.lx = x;
    s.moved = 0;
    s.vx = 0;
    sec.current.setPointerCapture(e.pointerId);
  };
  var mv = e => {
    if (fromCase(e)) return;
    var s = S.current,
      [x, y] = pt(e);
    s.mx = x;
    s.my = y;
    s.has = inside(x, y);
    if (s.drag) {
      var VM = 28 * pjU(),
        raw = (x - s.lx) / CA,
        dx = Math.max(-VM, Math.min(VM, raw));
      s.ox += dx;
      s.vx = Math.max(-VM * .6, Math.min(VM * .6, s.vx * .5 + dx * .5));
      s.lx = x;
      s.moved += Math.abs(raw);
    }
  };
  var [open, setOpen] = React.useState(null);
  var up = e => {
    if (e && fromCase(e)) return;
    var s = S.current;
    if (s.drag && s.moved < 6 && s.hov >= 0 && s.bestR && !s.open) {
      var r = cv.current.getBoundingClientRect(),
        b = s.bestR;
      if (window.__rgbyOpenCase && P[s.hov] && P[s.hov].caseId) {
        s.vx = 0;
        window.__rgbyOpenCase(P[s.hov].caseId);
      } else {
        s.open = true;
        s.openKey = null;
        s.pendKey = s.bestKey;
        s.vx = 0;
        setOpen({
          i: s.hov,
          from: {
            x: r.left + b.x,
            y: r.top + b.y,
            w: b.w,
            h: b.h
          }
        });
      }
    }
    s.drag = false;
  };
  var close = React.useCallback(() => {
    S.current.open = false;
    setOpen(null);
  }, []);
  var p = hov >= 0 && !open ? P[hov] : null;
  return React.createElement("section", {
    id: "projects",
    ref: sec,
    className: "m-sec m-proj pj pj--lens x-ink" + (DIAG ? " pj--diag" : ""),
    "data-screen-label": "06 \u041F\u0440\u043E\u0435\u043A\u0442\u044B",
    onPointerDown: dn,
    onPointerMove: mv,
    onPointerUp: up,
    onPointerCancel: up,
    onPointerLeave: e => {
      if (fromCase(e)) return;
      S.current.has = false;
      up();
    }
  }, React.createElement("div", {
    className: "pj-ln__head"
  }, React.createElement("div", {
    className: "pj-ln__ht"
  }, React.createElement("h2", {
    className: "sec__title rv"
  }, "\u041D\u0430\u0448\u0438 \u043F\u0440\u043E\u0435\u043A\u0442\u044B"), React.createElement("p", {
    className: "m-head__lead t-body-l rv"
  }, "\u0410\u0440\u0445\u0438\u0432 \u0440\u0430\u0431\u043E\u0442 \u043F\u043E\u0434 \u043B\u0443\u043F\u043E\u0439: \u043D\u0430\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430 \u043F\u0440\u043E\u0435\u043A\u0442, \u0442\u044F\u043D\u0438\u0442\u0435 \u043B\u0435\u043D\u0442\u0443, \u0447\u0442\u043E\u0431\u044B\xA0\u043B\u0438\u0441\u0442\u0430\u0442\u044C")), DIAG ? null : React.createElement("a", {
    className: "pj-ln__all rv",
    href: "#",
    onClick: pjPrevent
  }, React.createElement("span", {
    className: "t-label"
  }, "\u0412\u0441\u0435 \u043F\u0440\u043E\u0435\u043A\u0442\u044B"), React.createElement(PjArrow, null))), DIAG ? React.createElement("a", {
    className: "pj-ln__all pj-ln__all--corner rv",
    href: "#",
    onClick: pjPrevent
  }, React.createElement("span", {
    className: "t-label"
  }, "\u0412\u0441\u0435 \u043F\u0440\u043E\u0435\u043A\u0442\u044B"), React.createElement(PjArrow, null)) : null, React.createElement("div", {
    className: "pj-ln",
    ref: wrap
  }, React.createElement("canvas", {
    ref: cv,
    className: "pj-ln__cv",
    "aria-label": "\u0410\u0440\u0445\u0438\u0432 \u043F\u0440\u043E\u0435\u043A\u0442\u043E\u0432"
  })), React.createElement("a", {
    href: "#",
    onClick: pjPrevent,
    ref: tip,
    className: "pj-ln__tip" + (p ? " is-on" : ""),
    tabIndex: "-1",
    "aria-hidden": !p,
    style: p ? {
      "--c": PJ_DIRC[p.dir] || "44,79,255"
    } : undefined
  }, p ? React.createElement(React.Fragment, {
    key: hov
  }, React.createElement("b", {
    className: "t-h3-l"
  }, p.title), React.createElement("span", {
    className: "pj-ln__dir t-label"
  }, React.createElement("i", null), DIRS[p.dir] || p.kind), React.createElement("span", {
    className: "pj-ln__go t-label"
  }, "\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043A\u0435\u0439\u0441 ", React.createElement("span", null, "\u2197"))) : null), open ? ReactDOM.createPortal(React.createElement(PjCase, {
    P: P,
    i: open.i,
    from: open.from,
    DIRS: DIRS,
    onReady: () => {
      S.current.openKey = S.current.pendKey;
    },
    onRestore: () => {
      S.current.openKey = null;
    },
    onClose: close
  }), document.body) : null);
}
function PjCase({
  P,
  i,
  from,
  DIRS,
  onReady,
  onRestore,
  onClose
}) {
  var p = P[i],
    hero = React.useRef(null),
    ghost = React.useRef(null),
    box = React.useRef(null),
    [phase, setPhase] = React.useState("pre"),
    EZ = "cubic-bezier(.6,0,.12,1)";
  var gal = React.useMemo(() => [1, 2, 3, 4, 5].map(k => P[(i + k) % P.length].img), [i]);
  var fly = (a, b, d) => ghost.current.animate([{
    left: a.x + "px",
    top: a.y + "px",
    width: a.w + "px",
    height: a.h + "px"
  }, {
    left: b.x + "px",
    top: b.y + "px",
    width: b.w + "px",
    height: b.h + "px"
  }], {
    duration: d,
    easing: EZ,
    fill: "forwards"
  });
  var heroR = () => {
    var r = hero.current.getBoundingClientRect();
    return {
      x: r.left,
      y: r.top,
      w: r.width,
      h: r.height
    };
  };
  React.useLayoutEffect(() => {
    var root = document.documentElement,
      prev = root.style.overflow,
      sw = innerWidth - root.clientWidth,
      pr = root.style.paddingRight;
    root.style.overflow = "hidden";
    if (sw > 0) root.style.paddingRight = sw + "px";
    var dead = false;
    var g = ghost.current;
    (g.decode ? g.decode() : Promise.resolve()).catch(() => {}).then(() => {
      if (dead) return;
      g.style.opacity = "1";
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (dead) return;
        onReady && onReady();
        setPhase("in");
        var a = fly(from, heroR(), 1300);
        a.onfinish = () => {
          box.current.style.setProperty("--hh", hero.current.offsetHeight + "px");
          setPhase("dock");
          requestAnimationFrame(() => requestAnimationFrame(() => {
            if (!dead) setPhase("on");
          }));
        };
      }));
    });
    var key = e => {
      if (e.key === "Escape") shut();
    };
    addEventListener("keydown", key);
    return () => {
      dead = true;
      root.style.overflow = prev;
      root.style.paddingRight = pr;
      removeEventListener("keydown", key);
    };
  }, []);
  var closing = React.useRef(false);
  var shut = () => {
    if (closing.current) return;
    closing.current = true;
    var bx = box.current;
    bx.style.setProperty("--hh", hero.current.offsetHeight + "px");
    var go = () => {
      setPhase("fold");
      setTimeout(() => {
        var b = heroR();
        setPhase("out");
        requestAnimationFrame(() => {
          var a = fly(b, from, 1100);
          a.onfinish = () => {
            ghost.current.classList.add("is-land");
            onRestore && onRestore();
            requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(onClose)));
          };
        });
      }, 900);
    };
    if (bx.scrollTop > 0) {
      bx.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      setTimeout(go, 450);
    } else go();
  };
  var stop = e => e.stopPropagation();
  return React.createElement("div", {
    className: "pj-cs is-" + phase,
    onPointerDown: stop,
    onPointerMove: stop,
    onPointerUp: stop,
    onClick: stop,
    role: "dialog",
    "aria-modal": "true",
    "aria-label": p.title,
    "data-lenis-prevent": "",
    style: {
      "--c": PJ_DIRC[p.dir] || "44,79,255"
    }
  }, React.createElement("i", {
    className: "pj-cs__bd",
    onClick: shut
  }), React.createElement("div", {
    className: "pj-cs__box",
    ref: box
  }, React.createElement("button", {
    type: "button",
    className: "pj-cs__x",
    onClick: shut,
    "aria-label": "\u0417\u0430\u043A\u0440\u044B\u0442\u044C"
  }, "\xD7"), React.createElement("div", {
    className: "pj-cs__hero",
    ref: hero
  }, React.createElement("img", {
    src: p.img,
    alt: "",
    decoding: "sync"
  })), React.createElement("div", {
    className: "pj-cs__body"
  }, React.createElement("div", {
    className: "pj-cs__main"
  }, React.createElement("span", {
    className: "pj-ln__dir t-label"
  }, React.createElement("i", null), DIRS[p.dir] || p.kind), React.createElement("h3", {
    className: "t-h1"
  }, p.title), React.createElement("p", {
    className: "t-body-l"
  }, p.text)), React.createElement("dl", {
    className: "pj-cs__meta"
  }, React.createElement("div", null, React.createElement("dt", {
    className: "t-label"
  }, "\u041D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435"), React.createElement("dd", {
    className: "t-body-m"
  }, DIRS[p.dir] || "—")), React.createElement("div", null, React.createElement("dt", {
    className: "t-label"
  }, "\u0422\u0438\u043F \u0440\u0430\u0431\u043E\u0442"), React.createElement("dd", {
    className: "t-body-m"
  }, p.kind)), React.createElement("div", null, React.createElement("dt", {
    className: "t-label"
  }, "\u041A\u043B\u0438\u0435\u043D\u0442"), React.createElement("dd", {
    className: "t-body-m"
  }, p.title)))), React.createElement("div", {
    className: "pj-cs__gal"
  }, React.createElement("span", {
    className: "t-label pj-cs__gl"
  }, "\u041A\u0430\u0434\u0440\u044B \u043F\u0440\u043E\u0435\u043A\u0442\u0430"), React.createElement("div", {
    className: "pj-cs__strip"
  }, gal.map((g, k) => React.createElement("figure", {
    key: k,
    className: k === 0 ? "is-wide" : ""
  }, React.createElement("img", {
    src: g,
    alt: "",
    loading: "lazy"
  }))))), React.createElement("div", {
    className: "pj-cs__foot"
  }, React.createElement("a", {
    className: "pj-cs__go",
    href: "#",
    onClick: pjPrevent
  }, React.createElement("span", {
    className: "t-h3-l"
  }, "\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043F\u043E\u043B\u043D\u044B\u0439 \u043A\u0435\u0439\u0441"), React.createElement("span", {
    className: "m-arrow"
  }, "\u2192")))), React.createElement("img", {
    ref: ghost,
    className: "pj-cs__ghost",
    src: p.img,
    alt: "",
    "aria-hidden": "true",
    style: {
      left: from.x,
      top: from.y,
      width: from.w,
      height: from.h,
      opacity: 0
    }
  }));
}
function PjTunnel({
  P
}) {
  var sec = React.useRef(null),
    scene = React.useRef(null),
    floor = React.useRef(null),
    cards = React.useRef([]),
    S = React.useRef({
      p: 0,
      pc: 0,
      tx: 0,
      ty: 0,
      cx: 0,
      cy: 0,
      raf: 0
    }),
    n = P.length;
  var [act, setAct] = React.useState(0),
    actR = React.useRef(0);
  var seek = i => {
    var el = sec.current,
      top = el.getBoundingClientRect().top + scrollY,
      y = top + i / (n - 1) * (el.offsetHeight - innerHeight) + 2;
    (window.__scrollTo || (v => scrollTo({
      top: v,
      behavior: "smooth"
    })))(y);
  };
  React.useEffect(() => {
    var s = S.current;
    var paint = () => {
      s.raf = 0;
      var u = pjU(),
        W = scene.current.clientWidth,
        D = 820 * u;
      s.pc += (s.p - s.pc) * .12;
      s.cx += (s.tx - s.cx) * .08;
      s.cy += (s.ty - s.cy) * .08;
      var cam = s.pc * (n - 1) * D;
      cards.current.forEach((c, i) => {
        if (!c) return;
        var z = -i * D + cam,
          side = i % 2 ? 1 : -1,
          x = side * W * .2,
          o = z > 0 ? pjCl(1 - z / (420 * u), 0, 1) : pjCl((z + 3.4 * D) / (.9 * D), 0, 1);
        c.style.transform = "translate(-50%,-50%) translate3d(" + x.toFixed(1) + "px,0," + z.toFixed(1) + "px) rotateY(" + (-side * 26).toFixed(1) + "deg)";
        c.style.opacity = o.toFixed(3);
        c.style.pointerEvents = o > .5 ? "auto" : "none";
      });
      scene.current.style.perspectiveOrigin = (50 + s.cx * 22).toFixed(2) + "% " + (46 + s.cy * 18).toFixed(2) + "%";
      if (floor.current) floor.current.style.backgroundPositionY = (cam % (120 * u)).toFixed(1) + "px";
      var a = pjCl(Math.round(s.pc * (n - 1)), 0, n - 1);
      if (a !== actR.current) {
        actR.current = a;
        setAct(a);
      }
      if (Math.abs(s.p - s.pc) > .0005 || Math.abs(s.tx - s.cx) > .002 || Math.abs(s.ty - s.cy) > .002) s.raf = requestAnimationFrame(paint);
    };
    var kick = () => {
      if (!s.raf) s.raf = requestAnimationFrame(paint);
    };
    var onScroll = () => {
      var r = sec.current.getBoundingClientRect(),
        span = r.height - innerHeight;
      s.p = span > 0 ? pjCl(-r.top / span, 0, 1) : 0;
      kick();
    };
    var onMove = e => {
      s.tx = e.clientX / innerWidth - .5;
      s.ty = e.clientY / innerHeight - .5;
      kick();
    };
    var el = sec.current;
    onScroll();
    addEventListener("scroll", onScroll, {
      passive: true
    });
    addEventListener("resize", onScroll);
    el.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(s.raf);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      el.removeEventListener("pointermove", onMove);
    };
  }, [n]);
  var p = P[act];
  return React.createElement("section", {
    id: "projects",
    ref: sec,
    className: "m-proj pj pj--tunnel",
    style: {
      "--n": n
    },
    "data-screen-label": "06 \u041F\u0440\u043E\u0435\u043A\u0442\u044B"
  }, React.createElement("div", {
    className: "pj-tn__pin"
  }, React.createElement("div", {
    className: "pj-tn__head"
  }, React.createElement("h2", {
    className: "sec__title"
  }, "\u041D\u0430\u0448\u0438 \u043F\u0440\u043E\u0435\u043A\u0442\u044B"), React.createElement("a", {
    className: "t-link",
    href: "#",
    onClick: pjPrevent
  }, "\u0412\u0441\u0435 \u043F\u0440\u043E\u0435\u043A\u0442\u044B ", React.createElement(PjArrow, null))), React.createElement("div", {
    className: "pj-tn__scene",
    ref: scene
  }, React.createElement("i", {
    className: "pj-tn__floor",
    ref: floor,
    "aria-hidden": "true"
  }), P.map((x, i) => React.createElement("a", {
    key: i,
    ref: el => cards.current[i] = el,
    href: "#",
    onClick: pjPrevent,
    className: "pj-tn__c" + (i === act ? " is-on" : "")
  }, React.createElement("i", {
    style: {
      backgroundImage: "url(" + x.img + ")"
    }
  }), React.createElement("span", {
    className: "pj-tn__n t-label"
  }, String(i + 1).padStart(2, "0"), " / ", x.kind)))), React.createElement("div", {
    className: "pj-tn__info"
  }, React.createElement(PjInfo, {
    p: p,
    i: act,
    n: n
  })), React.createElement("div", {
    className: "pj-tn__idx"
  }, P.map((x, i) => React.createElement("button", {
    key: i,
    type: "button",
    className: i === act ? "is-on" : "",
    onClick: () => seek(i)
  }, React.createElement("span", {
    className: "t-label"
  }, String(i + 1).padStart(2, "0")), React.createElement("span", {
    className: "t-small"
  }, x.title))))));
}
var PJ_FRAG = `precision mediump float;uniform sampler2D ta,tb;uniform float pr,hv,vel,ra,rb,cr;uniform vec2 m;varying vec2 v;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n2(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fb(vec2 p){float s=0.,a=.5;for(int i=0;i<4;i++){s+=a*n2(p);p*=2.1;a*=.5;}return s;}
vec2 cov(vec2 uv,float ir){vec2 s=cr>ir?vec2(1.,ir/cr):vec2(cr/ir,1.);return (uv-.5)*s+.5;}
vec3 smp(sampler2D t,vec2 uv,float ir,vec2 sh){vec2 c=cov(uv,ir);return vec3(texture2D(t,c+sh).r,texture2D(t,c).g,texture2D(t,c-sh).b);}
void main(){vec2 uv=v;vec2 d=uv-m;d.x*=cr;float r=length(d);float bul=hv*smoothstep(.42,0.,r);uv-=(uv-m)*bul*.24;
float n=fb(uv*3.2);float mx=1.-smoothstep(pr*1.4-.25,pr*1.4,n*.65+(1.-uv.y)*.35);float s=pr*(1.-pr)*4.;
vec2 o=(vec2(n,fb(uv*3.2+5.))-.5)*.3*s;vec2 sh=vec2(.002+vel*.03+s*.01,0.);
vec3 a=smp(ta,uv+o*mx,ra,sh),b=smp(tb,uv-o*(1.-mx),rb,sh);vec3 col=mix(a,b,mx);
float e=mx*(1.-mx)*4.;col=mix(col,vec3(.17,.31,1.),e*.75);col+=vec3(.95,.96,1.)*smoothstep(.43,.41,r)*smoothstep(.39,.41,r)*hv*.5;
gl_FragColor=vec4(col,1.);}`;
function PjShader({
  P
}) {
  var cv = React.useRef(null),
    wrap = React.useRef(null),
    G = React.useRef(null),
    S = React.useRef({
      cur: 0,
      nxt: 0,
      pr: 0,
      t0: 0,
      tr: false,
      mx: .5,
      my: .5,
      tmx: .5,
      tmy: .5,
      hv: 0,
      thv: 0,
      vel: 0
    });
  var [act, setAct] = React.useState(0),
    [hovL, setHovL] = React.useState(false),
    [ok, setOk] = React.useState(true),
    n = P.length;
  React.useEffect(() => {
    var c = cv.current,
      gl = c.getContext("webgl", {
        antialias: false,
        premultipliedAlpha: false
      });
    if (!gl) {
      setOk(false);
      return;
    }
    var sh = (t, src) => {
      var o = gl.createShader(t);
      gl.shaderSource(o, src);
      gl.compileShader(o);
      if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) console.warn(gl.getShaderInfoLog(o));
      return o;
    };
    var pr = gl.createProgram();
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, "attribute vec2 a;varying vec2 v;void main(){v=a*.5+.5;gl_Position=vec4(a,0.,1.);}"));
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, PJ_FRAG));
    gl.linkProgram(pr);
    gl.useProgram(pr);
    var b = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, b);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    var al = gl.getAttribLocation(pr, "a");
    gl.enableVertexAttribArray(al);
    gl.vertexAttribPointer(al, 2, gl.FLOAT, false, 0, 0);
    var U = {};
    ["ta", "tb", "pr", "hv", "vel", "ra", "rb", "cr", "m"].forEach(k => U[k] = gl.getUniformLocation(pr, k));
    gl.uniform1i(U.ta, 0);
    gl.uniform1i(U.tb, 1);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    var tex = P.map(p => {
      var t = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([6, 16, 37, 255]));
      [gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_T].forEach(w => gl.texParameteri(gl.TEXTURE_2D, w, gl.CLAMP_TO_EDGE));
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      var o = {
          t,
          r: 1.5
        },
        im = new Image();
      im.onload = () => {
        gl.bindTexture(gl.TEXTURE_2D, t);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, im);
        o.r = im.naturalWidth / im.naturalHeight;
      };
      im.src = p.img;
      return o;
    });
    G.current = {
      gl,
      U,
      tex
    };
    var fit = () => {
      var d = Math.min(2, devicePixelRatio || 1);
      c.width = Math.round(c.clientWidth * d);
      c.height = Math.round(c.clientHeight * d);
      gl.viewport(0, 0, c.width, c.height);
    };
    fit();
    var ro = new ResizeObserver(fit);
    ro.observe(c);
    return () => ro.disconnect();
  }, [n]);
  usePjLoop(wrap, (dt, now) => {
    var g = G.current;
    if (!g) return;
    var {
        gl,
        U,
        tex
      } = g,
      s = S.current,
      k = dt / 16;
    if (s.tr) {
      var q = Math.min(1, (now - s.t0) / 1100);
      s.pr = q < .5 ? 4 * q * q * q : 1 - Math.pow(-2 * q + 2, 3) / 2;
      if (q >= 1) {
        s.tr = false;
        s.cur = s.nxt;
        s.pr = 0;
      }
    }
    var px = s.mx,
      py = s.my;
    s.mx += (s.tmx - s.mx) * Math.min(1, .12 * k);
    s.my += (s.tmy - s.my) * Math.min(1, .12 * k);
    s.hv += (s.thv - s.hv) * Math.min(1, .07 * k);
    s.vel = Math.min(1, s.vel * Math.pow(.9, k) + Math.hypot(s.mx - px, s.my - py) * 2.2);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tex[s.cur].t);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, tex[s.nxt].t);
    gl.uniform1f(U.pr, s.pr);
    gl.uniform1f(U.hv, s.hv);
    gl.uniform1f(U.vel, s.vel);
    gl.uniform1f(U.ra, tex[s.cur].r);
    gl.uniform1f(U.rb, tex[s.nxt].r);
    gl.uniform1f(U.cr, gl.canvas.width / Math.max(1, gl.canvas.height));
    gl.uniform2f(U.m, s.mx, s.my);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }, [n]);
  var goTo = i => {
    var s = S.current;
    if (i === (s.tr ? s.nxt : s.cur)) return;
    if (s.tr) s.cur = s.nxt;
    s.nxt = i;
    s.pr = 0;
    s.t0 = performance.now();
    s.tr = !pjReduce();
    if (!s.tr) s.cur = i;
    setAct(i);
  };
  React.useEffect(() => {
    if (hovL) return;
    var id = setInterval(() => goTo((S.current.nxt + 1) % n), 4200);
    return () => clearInterval(id);
  }, [hovL, n]);
  var mv = e => {
    var r = cv.current.getBoundingClientRect(),
      s = S.current;
    s.tmx = (e.clientX - r.left) / r.width;
    s.tmy = 1 - (e.clientY - r.top) / r.height;
    s.thv = 1;
  };
  var p = P[act];
  return React.createElement("section", {
    id: "projects",
    className: "m-sec m-proj pj pj--shader",
    "data-screen-label": "06 \u041F\u0440\u043E\u0435\u043A\u0442\u044B"
  }, React.createElement(PjHead, {
    hint: "\u041D\u0430\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430 \u043F\u0440\u043E\u0435\u043A\u0442 \u2014 \u043A\u0430\u0434\u0440 \u043F\u0435\u0440\u0435\u0442\u0435\u043A\u0430\u0435\u0442 \u0432 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439. \u041A\u0443\u0440\u0441\u043E\u0440 \u043D\u0430\u0434 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435\u043C \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u043A\u0430\u043A \u043B\u0438\u043D\u0437\u0430"
  }), React.createElement("div", {
    className: "pj-sd",
    ref: wrap
  }, React.createElement("div", {
    className: "pj-sd__list",
    onPointerEnter: () => setHovL(true),
    onPointerLeave: () => setHovL(false)
  }, P.map((x, i) => React.createElement("a", {
    key: i,
    href: "#",
    onClick: pjPrevent,
    className: "pj-sd__r" + (i === act ? " is-on" : ""),
    onPointerEnter: () => goTo(i),
    onFocus: () => goTo(i)
  }, React.createElement("span", {
    className: "t-label pj-sd__n"
  }, String(i + 1).padStart(2, "0")), React.createElement("b", {
    className: "t-h1"
  }, x.title), React.createElement("span", {
    className: "t-label pj-sd__k"
  }, x.kind)))), React.createElement("div", {
    className: "pj-sd__view",
    onPointerMove: mv,
    onPointerLeave: () => {
      S.current.thv = 0;
    }
  }, ok ? React.createElement("canvas", {
    ref: cv,
    className: "pj-sd__cv",
    "aria-hidden": "true"
  }) : React.createElement("i", {
    className: "pj-sd__fb",
    style: {
      backgroundImage: "url(" + p.img + ")"
    }
  }), React.createElement("div", {
    className: "pj-sd__cap",
    key: act
  }, React.createElement("span", {
    className: "t-label"
  }, "/ ", p.kind), React.createElement("span", {
    className: "t-body-l"
  }, p.text), React.createElement("span", {
    className: "m-tile__tags"
  }, p.tags.map(t => React.createElement("i", {
    key: t
  }, t)))), React.createElement("span", {
    className: "pj-sd__go t-label"
  }, "\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043A\u0435\u0439\u0441 \u2192"))));
}
function PjDeck({
  P
}) {
  var n = P.length,
    [order, setOrder] = React.useState(() => P.map((_, i) => i)),
    stage = React.useRef(null),
    mids = React.useRef({}),
    inns = React.useRef({}),
    S = React.useRef({
      drag: false,
      sx: 0,
      sy: 0,
      x: 0,
      y: 0,
      vx: 0,
      lx: 0,
      lt: 0,
      busy: false
    });
  var top = order[0],
    u = pjU();
  var tilt = e => {
    var r = stage.current.getBoundingClientRect(),
      x = (e.clientX - r.left) / r.width - .5,
      y = (e.clientY - r.top) / r.height - .5;
    stage.current.style.setProperty("--mx", x.toFixed(3));
    stage.current.style.setProperty("--my", y.toFixed(3));
    var inn = inns.current[order[0]];
    if (inn && !S.current.drag) {
      var b = inn.getBoundingClientRect(),
        tx = pjCl((e.clientX - b.left) / b.width - .5, -.7, .7),
        ty = pjCl((e.clientY - b.top) / b.height - .5, -.7, .7);
      inn.style.setProperty("--tx", tx.toFixed(3));
      inn.style.setProperty("--ty", ty.toFixed(3));
      inn.style.setProperty("--gx", ((tx + .5) * 100).toFixed(1) + "%");
      inn.style.setProperty("--gy", ((ty + .5) * 100).toFixed(1) + "%");
    }
  };
  var untilt = () => {
    var inn = inns.current[order[0]];
    if (inn) {
      inn.style.setProperty("--tx", 0);
      inn.style.setProperty("--ty", 0);
    }
    stage.current.style.setProperty("--mx", 0);
    stage.current.style.setProperty("--my", 0);
  };
  var throwTop = dir => {
    var s = S.current;
    if (s.busy) return;
    s.busy = true;
    var id = order[0],
      mid = mids.current[id];
    untilt();
    mid.style.transition = "transform .5s cubic-bezier(.5,0,.75,0)";
    mid.style.transform = "translate(" + dir * 130 + "%," + (s.y - 60 * u).toFixed(0) + "px) rotate(" + dir * 24 + "deg)";
    setTimeout(() => {
      setOrder(o => o.slice(1).concat(o[0]));
      requestAnimationFrame(() => {
        mid.style.transition = "transform .9s cubic-bezier(.16,1,.3,1)";
        mid.style.transform = "";
      });
      s.x = s.y = 0;
      setTimeout(() => {
        s.busy = false;
      }, 300);
    }, 430);
  };
  var back = () => {
    if (S.current.busy) return;
    setOrder(o => [o[o.length - 1]].concat(o.slice(0, -1)));
  };
  var dn = e => {
    var s = S.current;
    if (s.busy || e.button !== 0) return;
    s.drag = true;
    s.sx = e.clientX;
    s.sy = e.clientY;
    s.lx = e.clientX;
    s.lt = performance.now();
    s.vx = 0;
    s.moved = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
    mids.current[order[0]].style.transition = "none";
  };
  var mv = e => {
    var s = S.current;
    if (!s.drag) return;
    var now = performance.now();
    s.vx = (e.clientX - s.lx) / Math.max(1, now - s.lt) * 16;
    s.lx = e.clientX;
    s.lt = now;
    s.x = e.clientX - s.sx;
    s.y = e.clientY - s.sy;
    s.moved = Math.max(s.moved || 0, Math.abs(s.x) + Math.abs(s.y));
    mids.current[order[0]].style.transform = "translate(" + s.x.toFixed(1) + "px," + s.y.toFixed(1) + "px) rotate(" + (s.x * .05).toFixed(2) + "deg) rotateY(" + pjCl(s.vx * 1.6, -24, 24).toFixed(2) + "deg)";
  };
  var up = e => {
    var s = S.current;
    if (!s.drag) return;
    s.drag = false;
    var mid = mids.current[order[0]],
      w = mid.offsetWidth;
    if (Math.abs(s.x) > w * .28 || Math.abs(s.vx) > 14) throwTop(Math.sign(s.x || s.vx));else {
      mid.style.transition = "transform .7s cubic-bezier(.34,1.56,.64,1)";
      mid.style.transform = "";
      s.x = s.y = 0;
    }
  };
  var p = P[top];
  return React.createElement("section", {
    id: "projects",
    className: "m-sec m-proj pj pj--deck sec--blue",
    "data-screen-label": "06 \u041F\u0440\u043E\u0435\u043A\u0442\u044B"
  }, React.createElement(PjHead, {
    hint: "\u0421\u043C\u0430\u0445\u043D\u0438\u0442\u0435 \u0432\u0435\u0440\u0445\u043D\u044E\u044E \u043A\u0430\u0440\u0442\u0443 \u0432 \u0441\u0442\u043E\u0440\u043E\u043D\u0443 \u2014 \u043E\u043D\u0430 \u0443\u0439\u0434\u0451\u0442 \u043F\u043E\u0434 \u043A\u043E\u043B\u043E\u0434\u0443"
  }), React.createElement("div", {
    className: "pj-dk"
  }, React.createElement("div", {
    className: "pj-dk__info"
  }, React.createElement(PjInfo, {
    p: p,
    i: top,
    n: n
  }), React.createElement("div", {
    className: "pj-arr"
  }, React.createElement("button", {
    type: "button",
    onClick: back,
    "aria-label": "\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0439"
  }, "\u2190"), React.createElement("button", {
    type: "button",
    onClick: () => throwTop(1),
    "aria-label": "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439"
  }, "\u2192"))), React.createElement("div", {
    className: "pj-dk__stage",
    ref: stage,
    onPointerMove: tilt,
    onPointerLeave: untilt
  }, P.map((x, id) => {
    var k = order.indexOf(id);
    return React.createElement("div", {
      key: id,
      className: "pj-dk__c" + (k === 0 ? " is-top" : ""),
      style: {
        "--k": k,
        "--rz": (id % 2 ? 1 : -1) * (1.2 + id % 3 * .6) + "deg",
        zIndex: n - k
      }
    }, React.createElement("div", {
      className: "pj-dk__mid",
      ref: el => mids.current[id] = el,
      onPointerDown: k === 0 ? dn : undefined,
      onPointerMove: k === 0 ? mv : undefined,
      onPointerUp: k === 0 ? up : undefined,
      onPointerCancel: k === 0 ? up : undefined
    }, React.createElement("a", {
      href: "#",
      draggable: "false",
      onClick: e => {
        e.preventDefault();
      },
      className: "pj-dk__in",
      ref: el => inns.current[id] = el
    }, React.createElement("i", {
      className: "pj-dk__img",
      style: {
        backgroundImage: "url(" + x.img + ")"
      }
    }), React.createElement("span", {
      className: "pj-dk__cap"
    }, React.createElement("span", {
      className: "t-label"
    }, "/ ", x.kind), React.createElement("b", {
      className: "t-h1"
    }, x.title)), React.createElement("i", {
      className: "pj-dk__glare"
    }))));
  }))));
}
function Projects(props) {
  var {
    variant,
    setVariant
  } = props;
  if (!PJ_NEW.includes(variant)) return React.createElement(ProjectsOld, props);
  var P = window.RGBY_MAIN.PROJECTS,
    V = {
      ring: PjRing,
      lens: PjLens,
      tunnel: PjTunnel,
      shader: PjShader,
      deck: PjDeck
    }[variant];
  return React.createElement("div", {
    className: "pj-host"
  }, React.createElement(VariantSwitch, {
    label: "\u041F\u0440\u043E\u0435\u043A\u0442\u044B",
    value: variant,
    options: PJ_NEW,
    onChange: setVariant
  }), React.createElement(V, {
    key: variant,
    P: P,
    flow: props.lensFlow,
    dof: !!props.lensDof
  }));
}
Object.assign(window, {
  Projects,
  PJ_NEW
});