// RGBY · project/ui_kits/landing/services-x.jsx.txt
// «Что мы делаем» — five new versions (tweak «Что мы делаем · новые»). Data: RGBY_DATA.SERVICES.
// n1 «Пульт»: vision-mixer — service buttons (PVW/PGM), big program monitor with auto-cut, take to brief.
// n2 «Сетка»: broadcast schedule — services as time-slots on a ruler, playhead, click slot → details panel.
// n3 «Строки + превью»: full-width rows, cursor-following preview monitor, click row → details.
// n4 «Кассеты»: drag-scroll shelf of VHS cassettes; click → cassette slides into the «deck» with details.
// n5 «Смета»: pick services → live «от …» estimate with rolling digits → send to brief.
const svcPrice = s => {
  const m = String(s.price).replace(",", ".").match(/([\d.]+)\s*(млн|тыс)/);
  return m ? +m[1] * (m[2] === "млн" ? 1000 : 1) : 0;
};
const svcFmt = k => k >= 1000 ? (Math.round(k / 100) / 10).toString().replace(".", ",") + " млн ₽" : Math.round(k) + " тыс ₽";
const SERVICE_CASES = [["fan-2026", "k1"], ["last-hero"], ["tv3-wonderland", "tv3-vek-izobreteniy"], ["horror-fest"], ["k1", "plan-b", "soviet-classics"]];
function ServiceExamples({
  index
}) {
  const cases = (SERVICE_CASES[index] || []).map(id => window.RGBY_CASES.list.find(c => c.id === id && c.page)).filter(Boolean);
  if (!window.__RGBY_RELEASE || !cases.length) return null;
  return /*#__PURE__*/React.createElement("ul", {
    className: "service-cases",
    "aria-label": "\u041F\u0440\u0438\u043C\u0435\u0440\u044B \u0440\u0430\u0431\u043E\u0442"
  }, cases.map(c => /*#__PURE__*/React.createElement("li", {
    key: c.id
  }, /*#__PURE__*/React.createElement("a", {
    href: new URL((window.RGBY_BASE ?? "../../") + c.page, location.href).href
  }, "\u041A\u0435\u0439\u0441 \xB7 ", c.title, " \u2197"))));
}
const svcNum = i => String(i + 1).padStart(2, "0");
function SvcPult({
  S,
  onDiscuss
}) {
  const {
    Button
  } = window.RGBYDS;
  const [pgm, setPgm] = React.useState(0);
  const [pvw, setPvw] = React.useState(1);
  const [cut, setCut] = React.useState(0);
  const [hold, setHold] = React.useState(false);
  const take = n => {
    setPgm(n);
    setPvw((n + 1) % S.length);
    setCut(c => c + 1);
  };
  React.useEffect(() => {
    if (hold) return;
    const t = setTimeout(() => take(pvw), 5200);
    return () => clearTimeout(t);
  }, [pgm, pvw, hold]);
  const s = S[pgm];
  return /*#__PURE__*/React.createElement("div", {
    className: "g12"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "sec__title c4 rv"
  }, "\u0427\u0442\u043E \u043C\u044B \u0434\u0435\u043B\u0430\u0435\u043C"), /*#__PURE__*/React.createElement("div", {
    className: "c8 sp",
    onMouseEnter: () => setHold(true),
    onMouseLeave: () => setHold(false)
  }, /*#__PURE__*/React.createElement("div", {
    className: "sp__mon",
    key: cut
  }, /*#__PURE__*/React.createElement("div", {
    className: "sp__bar"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null), "PGM"), /*#__PURE__*/React.createElement("span", null, svcNum(pgm), " / ", svcNum(S.length - 1))), /*#__PURE__*/React.createElement("div", {
    className: "sp__body"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sp__t"
  }, s.title), /*#__PURE__*/React.createElement("p", {
    className: "sp__d"
  }, s.description), s.details && s.details.length ? /*#__PURE__*/React.createElement("ul", {
    className: "sp__list"
  }, s.details.map((d, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      "--d": 200 + i * 80 + "ms"
    }
  }, d))) : null), /*#__PURE__*/React.createElement("div", {
    className: "sp__foot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sp__price"
  }, s.price, s.unit ? /*#__PURE__*/React.createElement("em", null, " ", s.unit) : null), /*#__PURE__*/React.createElement(Button, {
    variant: "paper",
    size: "m",
    onClick: () => onDiscuss(s.title)
  }, "\u041E\u0431\u0441\u0443\u0434\u0438\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0443")), !hold ? /*#__PURE__*/React.createElement("i", {
    className: "sp__timer"
  }) : null), /*#__PURE__*/React.createElement("div", {
    className: "sp__keys rv"
  }, S.map((x, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    type: "button",
    className: "sp__key" + (i === pgm ? " is-pgm" : i === pvw ? " is-pvw" : ""),
    onMouseEnter: () => i !== pgm && setPvw(i),
    onClick: () => take(i)
  }, /*#__PURE__*/React.createElement("span", {
    className: "sp__kn"
  }, svcNum(i)), /*#__PURE__*/React.createElement("span", {
    className: "sp__kt"
  }, x.title), /*#__PURE__*/React.createElement("span", {
    className: "sp__kp"
  }, x.price))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "sp__key sp__key--cta",
    onClick: () => onDiscuss("")
  }, /*#__PURE__*/React.createElement("span", {
    className: "sp__kn"
  }, "+"), /*#__PURE__*/React.createElement("span", {
    className: "sp__kt"
  }, "\u041D\u0435 \u043D\u0430\u0448\u043B\u0438 \u0441\u0432\u043E\u044E \u0437\u0430\u0434\u0430\u0447\u0443?"), /*#__PURE__*/React.createElement("span", {
    className: "sp__kp"
  }, "\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u043D\u0430\u043C")))));
}
function SvcGrid({
  S,
  onDiscuss
}) {
  const {
    Button
  } = window.RGBYDS;
  const [a, setA] = React.useState(0);
  const total = S.reduce((n, s) => n + Math.max(1, svcPrice(s)), 0);
  let acc = 0;
  const slots = S.map(s => {
    const w = Math.max(1, svcPrice(s));
    const r = {
      x: acc / total,
      w: w / total
    };
    acc += w;
    return r;
  });
  const times = ["06:00", "09:00", "12:00", "15:00", "18:00", "21:00", "00:00"];
  const s = S[a];
  return /*#__PURE__*/React.createElement("div", {
    className: "stack",
    style: {
      gap: "var(--sp-40)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sg__head"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "sec__title rv"
  }, "\u0427\u0442\u043E \u043C\u044B \u0434\u0435\u043B\u0430\u0435\u043C"), /*#__PURE__*/React.createElement("span", {
    className: "sg__kicker rv"
  }, "\u0428\u0438\u0440\u0438\u043D\u0430 \u0441\u043B\u043E\u0442\u0430 \u2014 \u043F\u043E\u0440\u044F\u0434\u043E\u043A \u0431\u044E\u0434\u0436\u0435\u0442\u0430")), /*#__PURE__*/React.createElement("div", {
    className: "sg rv"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sg__ruler"
  }, times.map(t => /*#__PURE__*/React.createElement("span", {
    key: t
  }, t))), /*#__PURE__*/React.createElement("div", {
    className: "sg__track"
  }, S.map((x, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    type: "button",
    className: "sg__slot" + (i === a ? " is-on" : ""),
    style: {
      left: slots[i].x * 100 + "%",
      width: slots[i].w * 100 + "%",
      "--d": i * 90 + "ms"
    },
    onClick: () => setA(i)
  }, /*#__PURE__*/React.createElement("span", {
    className: "sg__n"
  }, svcNum(i)), /*#__PURE__*/React.createElement("span", {
    className: "sg__t"
  }, x.title), /*#__PURE__*/React.createElement("span", {
    className: "sg__p"
  }, x.price))), /*#__PURE__*/React.createElement("i", {
    className: "sg__head-line",
    style: {
      left: (slots[a].x + slots[a].w / 2) * 100 + "%"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "sg__panel",
    key: a
  }, /*#__PURE__*/React.createElement("div", {
    className: "sg__pl"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sg__pn"
  }, svcNum(a)), /*#__PURE__*/React.createElement("span", {
    className: "sg__pt"
  }, s.title)), /*#__PURE__*/React.createElement("div", {
    className: "sg__pr"
  }, /*#__PURE__*/React.createElement("p", {
    className: "sg__pd"
  }, s.description), s.details && s.details.length ? /*#__PURE__*/React.createElement("ul", {
    className: "sp__list sp__list--ink"
  }, s.details.map((d, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      "--d": 120 + i * 70 + "ms"
    }
  }, d))) : null, /*#__PURE__*/React.createElement("div", {
    className: "sg__pf"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sp__price"
  }, s.price, s.unit ? /*#__PURE__*/React.createElement("em", null, " ", s.unit) : null), /*#__PURE__*/React.createElement(Button, {
    variant: "blue",
    size: "m",
    onClick: () => onDiscuss(s.title)
  }, "\u041E\u0431\u0441\u0443\u0434\u0438\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0443"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "rg-link",
    onClick: () => onDiscuss("")
  }, "\u041D\u0435 \u043D\u0430\u0448\u043B\u0438 \u0441\u0432\u043E\u044E \u0437\u0430\u0434\u0430\u0447\u0443? \u2192")))));
}
function SvcRows({
  S,
  onDiscuss
}) {
  const {
    TextLink
  } = window.RGBYDS;
  // Превью у курсора — кадр из кейса по смыслу услуги, у каждой свой
  const SVC_PREV = [[/ребрендинг|спешл/i, "cases/comedy-10-1.jpg"], [/программ|промо/i, "cases/fan-2026-1.jpg"], [/id/i, "cases/tv3-wonderland-1.jpg"], [/шоу/i, "cases/last-hero-1.jpg"], [/нового канала|запуск канала/i, "cases/k1-1.jpg"]];
  const FALL = ["cases/soyuzny-1.jpg", "cases/soviet-classics-1.jpg", "cases/k1-3.jpg"];
  const pics = React.useMemo(() => {
    const used = new Set();
    return S.map((sv, i) => {
      const hit = SVC_PREV.find(([re, f]) => re.test(sv.title) && !used.has(f));
      const f = hit ? hit[1] : FALL.find(x => !used.has(x)) || FALL[0];
      used.add(f);
      return window.RGBY_DATA.img(f);
    });
  }, [S]);
  React.useEffect(() => {
    pics.forEach(src => {
      const im = new Image();
      im.src = src;
    });
  }, [pics]);
  const wrap = React.useRef(null),
    prev = React.useRef(null);
  const [hov, setHov] = React.useState(-1);
  const [open, setOpen] = React.useState(() => {
    const match = /^#service-([0-4])$/.exec(location.hash);
    return match ? Number(match[1]) : -1;
  });
  const ctaHl = React.useRef(null),
    ctaGl = React.useRef(null);
  const g = window.useStepGlitch ? window.useStepGlitch(ctaHl, ctaGl, true) : {
    start() {},
    stop() {}
  };
  React.useEffect(() => {
    let raf,
      x = 0,
      y = 0,
      tx = 0,
      ty = 0;
    const mv = e => {
      const r = wrap.current.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
    };
    const loop = () => {
      raf = requestAnimationFrame(loop);
      x += (tx - x) * .14;
      y += (ty - y) * .14;
      if (prev.current) prev.current.style.transform = "translate3d(" + x.toFixed(1) + "px," + y.toFixed(1) + "px,0) rotate(" + ((tx - x) * .02).toFixed(2) + "deg)";
    };
    const el = wrap.current;
    el.addEventListener("pointermove", mv);
    raf = requestAnimationFrame(loop);
    return () => {
      el.removeEventListener("pointermove", mv);
      cancelAnimationFrame(raf);
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "stack",
    style: {
      gap: "var(--sp-40)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "sec__title rv"
  }, "\u0427\u0442\u043E \u043C\u044B \u0434\u0435\u043B\u0430\u0435\u043C"), /*#__PURE__*/React.createElement("div", {
    className: "sr",
    ref: wrap,
    onPointerLeave: () => setHov(-1)
  }, /*#__PURE__*/React.createElement("div", {
    className: "sr__prev" + (hov >= 0 && open !== hov ? " is-on" : ""),
    ref: prev,
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sr__screen"
  }, pics.map((src, k) => /*#__PURE__*/React.createElement("i", {
    key: k,
    className: "sr__pic" + (k === hov ? " is-on" : ""),
    style: {
      backgroundImage: "url(" + src + ")"
    }
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null), hov >= 0 ? "CH " + svcNum(hov) : ""))), S.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "rv",
    style: {
      "--d": i * 60 + "ms"
    }
  }, /*#__PURE__*/React.createElement("div", {
    id: "service-" + i,
    className: "sr__row" + (open === i ? " is-open" : "") + (hov >= 0 && hov !== i ? " is-dim" : ""),
    onPointerEnter: () => setHov(i)
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "sr__head",
    "aria-expanded": open === i,
    onClick: () => setOpen(open === i ? -1 : i)
  }, /*#__PURE__*/React.createElement("span", {
    className: "sr__n"
  }, svcNum(i)), /*#__PURE__*/React.createElement("span", {
    className: "sr__t"
  }, /*#__PURE__*/React.createElement("span", null, s.title)), /*#__PURE__*/React.createElement("span", {
    className: "sr__p"
  }, s.price, s.unit ? " " + s.unit : ""), /*#__PURE__*/React.createElement("span", {
    className: "sr__x"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rg-lines rg-lines--plus" + (open === i ? " rg-lines--open" : "")
  }))), /*#__PURE__*/React.createElement("div", {
    className: "sr__body"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "sr__in"
  }, /*#__PURE__*/React.createElement("p", {
    className: "sr__d"
  }, s.description), /*#__PURE__*/React.createElement(ServiceExamples, {
    index: i
  }), s.details && s.details.length ? /*#__PURE__*/React.createElement("ul", {
    className: "sp__list sp__list--ink"
  }, s.details.map((d, k) => /*#__PURE__*/React.createElement("li", {
    key: k
  }, d))) : null, /*#__PURE__*/React.createElement(TextLink, {
    sign: "\u2192",
    onClick: () => onDiscuss(s.title)
  }, "\u041E\u0431\u0441\u0443\u0434\u0438\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0443"))))))), /*#__PURE__*/React.createElement("div", {
    className: "sr__row sr__row--cta rv",
    onPointerEnter: () => setHov(-1)
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "sr__head",
    onClick: () => {
      g.stop();
      onDiscuss("");
    },
    onMouseEnter: e => g.start(e.currentTarget),
    onMouseLeave: g.stop,
    onFocus: e => g.start(e.currentTarget),
    onBlur: g.stop
  }, /*#__PURE__*/React.createElement("span", {
    className: "sr__fill",
    ref: ctaHl,
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", {
    className: "sr__gl",
    ref: ctaGl,
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null)), /*#__PURE__*/React.createElement("span", {
    className: "sr__n"
  }, "+"), /*#__PURE__*/React.createElement("span", {
    className: "sr__t"
  }, /*#__PURE__*/React.createElement("span", null, "\u041D\u0435 \u043D\u0430\u0448\u043B\u0438 \u0441\u0432\u043E\u044E \u0437\u0430\u0434\u0430\u0447\u0443?")), /*#__PURE__*/React.createElement("span", {
    className: "sr__p"
  }, "\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u043D\u0430\u043C \u2192"), /*#__PURE__*/React.createElement("span", {
    className: "sr__x"
  })))));
}
function SvcTapes({
  S,
  onDiscuss
}) {
  const {
    Button
  } = window.RGBYDS;
  const shelf = React.useRef(null);
  const [a, setA] = React.useState(-1);
  const drag = React.useRef(null);
  const down = e => {
    drag.current = {
      x: e.clientX,
      s: shelf.current.scrollLeft,
      moved: false
    };
    shelf.current.setPointerCapture(e.pointerId);
  };
  const move = e => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 4) d.moved = true;
    shelf.current.scrollLeft = d.s - dx;
  };
  const up = () => {
    setTimeout(() => drag.current = null, 0);
  };
  const pick = i => {
    if (drag.current && drag.current.moved) return;
    setA(a === i ? -1 : i);
  };
  const s = a >= 0 ? S[a] : null;
  const lbl = ["#2C4FFF", "#061025", "#F3F4FF", "#2C4FFF", "#061025"];
  return /*#__PURE__*/React.createElement("div", {
    className: "stack",
    style: {
      gap: "var(--sp-40)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sg__head"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "sec__title rv"
  }, "\u0427\u0442\u043E \u043C\u044B \u0434\u0435\u043B\u0430\u0435\u043C"), /*#__PURE__*/React.createElement("span", {
    className: "sg__kicker rv"
  }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u0430\u0441\u0441\u0435\u0442\u0443 \xB7 \u0442\u044F\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043B\u0438\u0441\u0442\u0430\u0442\u044C")), /*#__PURE__*/React.createElement("div", {
    className: "stp__shelf",
    ref: shelf,
    onPointerDown: down,
    onPointerMove: move,
    onPointerUp: up,
    onPointerCancel: up,
    "data-hscroll": ""
  }, S.map((x, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    type: "button",
    className: "stp rv" + (a === i ? " is-on" : a >= 0 ? " is-off" : ""),
    style: {
      "--d": i * 80 + "ms",
      "--lbl": lbl[i % lbl.length]
    },
    onClick: () => pick(i)
  }, /*#__PURE__*/React.createElement("span", {
    className: "stp__case"
  }, /*#__PURE__*/React.createElement("span", {
    className: "stp__label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "stp__n"
  }, svcNum(i), " \xB7 SP"), /*#__PURE__*/React.createElement("span", {
    className: "stp__t"
  }, x.title)), /*#__PURE__*/React.createElement("span", {
    className: "stp__win"
  }, /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null)), /*#__PURE__*/React.createElement("span", {
    className: "stp__p"
  }, x.price)))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "stp stp--blank rv",
    onClick: () => onDiscuss("")
  }, /*#__PURE__*/React.createElement("span", {
    className: "stp__case"
  }, /*#__PURE__*/React.createElement("span", {
    className: "stp__label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "stp__n"
  }, "+ \xB7 REC"), /*#__PURE__*/React.createElement("span", {
    className: "stp__t"
  }, "\u041D\u0435 \u043D\u0430\u0448\u043B\u0438 \u0441\u0432\u043E\u044E \u0437\u0430\u0434\u0430\u0447\u0443?")), /*#__PURE__*/React.createElement("span", {
    className: "stp__win"
  }, /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null)), /*#__PURE__*/React.createElement("span", {
    className: "stp__p"
  }, "\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u043D\u0430\u043C")))), /*#__PURE__*/React.createElement("div", {
    className: "stp__deck" + (s ? " is-on" : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "stp__deckin",
    key: a
  }, s ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "stp__dl"
  }, /*#__PURE__*/React.createElement("span", {
    className: "stp__play"
  }, "\u25B6 PLAY"), /*#__PURE__*/React.createElement("span", {
    className: "sg__pt"
  }, s.title)), /*#__PURE__*/React.createElement("div", {
    className: "sg__pr"
  }, /*#__PURE__*/React.createElement("p", {
    className: "sg__pd"
  }, s.description), s.details && s.details.length ? /*#__PURE__*/React.createElement("ul", {
    className: "sp__list sp__list--ink"
  }, s.details.map((d, k) => /*#__PURE__*/React.createElement("li", {
    key: k,
    style: {
      "--d": 120 + k * 70 + "ms"
    }
  }, d))) : null, /*#__PURE__*/React.createElement("div", {
    className: "sg__pf"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sp__price"
  }, s.price, s.unit ? /*#__PURE__*/React.createElement("em", null, " ", s.unit) : null), /*#__PURE__*/React.createElement(Button, {
    variant: "blue",
    size: "m",
    onClick: () => onDiscuss(s.title)
  }, "\u041E\u0431\u0441\u0443\u0434\u0438\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0443"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "rg-link",
    onClick: () => setA(-1)
  }, "\u23CF \u0418\u0437\u0432\u043B\u0435\u0447\u044C")))) : null)));
}
function RollNum({
  value
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "se__roll",
    "aria-label": value
  }, String(value).split("").map((ch, i) => /\d/.test(ch) ? /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "se__dig"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      transform: "translateY(" + -+ch * 10 + "%)"
    }
  }, "0123456789".split("").map(n => /*#__PURE__*/React.createElement("i", {
    key: n
  }, n)))) : /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "se__ch"
  }, ch)));
}
function SvcEstimate({
  S,
  onDiscuss
}) {
  const {
    Button
  } = window.RGBYDS;
  const [sel, setSel] = React.useState([0]);
  const tog = i => setSel(s => s.includes(i) ? s.filter(x => x !== i) : [...s, i]);
  const sum = sel.reduce((n, i) => n + svcPrice(S[i]), 0);
  const big = sum >= 1000 ? (Math.round(sum / 100) / 10).toFixed(1).replace(".", ",") : String(Math.round(sum));
  const unit = sum >= 1000 ? "млн ₽" : "тыс ₽";
  return /*#__PURE__*/React.createElement("div", {
    className: "g12"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "sec__title c4 rv"
  }, "\u0427\u0442\u043E \u043C\u044B \u0434\u0435\u043B\u0430\u0435\u043C"), /*#__PURE__*/React.createElement("div", {
    className: "c8 se"
  }, /*#__PURE__*/React.createElement("div", {
    className: "se__list"
  }, S.map((s, i) => {
    const on = sel.includes(i);
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "se__item rv" + (on ? " is-on" : ""),
      style: {
        "--d": i * 70 + "ms"
      },
      "aria-pressed": on,
      onClick: () => tog(i)
    }, /*#__PURE__*/React.createElement("span", {
      className: "se__box"
    }, /*#__PURE__*/React.createElement("span", {
      className: "rg-icon--check"
    })), /*#__PURE__*/React.createElement("span", {
      className: "se__txt"
    }, /*#__PURE__*/React.createElement("span", {
      className: "se__t"
    }, s.title), /*#__PURE__*/React.createElement("span", {
      className: "se__d"
    }, s.description)), /*#__PURE__*/React.createElement("span", {
      className: "se__p"
    }, s.price, s.unit ? /*#__PURE__*/React.createElement("em", null, " ", s.unit) : null));
  })), /*#__PURE__*/React.createElement("div", {
    className: "se__sum rv"
  }, /*#__PURE__*/React.createElement("span", {
    className: "se__lbl"
  }, "\u041E\u0440\u0438\u0435\u043D\u0442\u0438\u0440 \u043F\u043E \u0441\u043C\u0435\u0442\u0435 \xB7 ", sel.length ? sel.length + " " + (sel.length === 1 ? "услуга" : sel.length < 5 ? "услуги" : "услуг") : "ничего не выбрано"), /*#__PURE__*/React.createElement("div", {
    className: "se__val"
  }, sel.length ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "se__from"
  }, "\u043E\u0442"), /*#__PURE__*/React.createElement(RollNum, {
    value: big
  }), /*#__PURE__*/React.createElement("span", {
    className: "se__unit"
  }, unit)) : /*#__PURE__*/React.createElement("span", {
    className: "se__from"
  }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0437\u0430\u0434\u0430\u0447\u0438")), /*#__PURE__*/React.createElement("p", {
    className: "se__note"
  }, "\u0418\u0442\u043E\u0433 \u2014 \u043D\u0438\u0436\u043D\u044F\u044F \u0433\u0440\u0430\u043D\u0438\u0446\u0430. \u0422\u043E\u0447\u043D\u0443\u044E \u0441\u043C\u0435\u0442\u0443 \u0441\u043E\u0431\u0435\u0440\u0451\u043C \u043F\u043E\u0441\u043B\u0435 \u0431\u0440\u0438\u0444\u0430."), /*#__PURE__*/React.createElement(Button, {
    variant: "paper",
    onClick: () => onDiscuss(sel.map(i => S[i].title).join(", "))
  }, "\u041E\u0431\u0441\u0443\u0434\u0438\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0443"))));
}
const SVC_NEW = ["n1", "n2", "n3", "n4", "n5"];
function ServicesX({
  variant,
  onDiscuss
}) {
  const S = window.RGBY_DATA.SERVICES;
  const C = {
    n1: SvcPult,
    n2: SvcGrid,
    n3: SvcRows,
    n4: SvcTapes,
    n5: SvcEstimate
  }[variant] || SvcPult;
  return /*#__PURE__*/React.createElement(C, {
    S: S,
    onDiscuss: onDiscuss
  });
}
Object.assign(window, {
  ServicesX,
  SVC_NEW
});
