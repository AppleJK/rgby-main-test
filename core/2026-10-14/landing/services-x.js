// RGBY · services-x.jsx.txt · сборка 2026-10-14
var svcPrice = s => {
  var m = String(s.price).replace(",", ".").match(/([\d.]+)\s*(млн|тыс)/);
  return m ? +m[1] * (m[2] === "млн" ? 1000 : 1) : 0;
};
var svcFmt = k => k >= 1000 ? (Math.round(k / 100) / 10).toString().replace(".", ",") + " млн ₽" : Math.round(k) + " тыс ₽";
var svcNum = i => String(i + 1).padStart(2, "0");
function SvcPult({
  S,
  onDiscuss
}) {
  var {
    Button
  } = window.RGBYDS;
  var [pgm, setPgm] = React.useState(0);
  var [pvw, setPvw] = React.useState(1);
  var [cut, setCut] = React.useState(0);
  var [hold, setHold] = React.useState(false);
  var take = n => {
    setPgm(n);
    setPvw((n + 1) % S.length);
    setCut(c => c + 1);
  };
  React.useEffect(() => {
    if (hold) return;
    var t = setTimeout(() => take(pvw), 5200);
    return () => clearTimeout(t);
  }, [pgm, pvw, hold]);
  var s = S[pgm];
  return React.createElement("div", {
    className: "g12"
  }, React.createElement("h2", {
    className: "sec__title c4 rv"
  }, "\u0427\u0442\u043E \u043C\u044B \u0434\u0435\u043B\u0430\u0435\u043C"), React.createElement("div", {
    className: "c8 sp",
    onMouseEnter: () => setHold(true),
    onMouseLeave: () => setHold(false)
  }, React.createElement("div", {
    className: "sp__mon",
    key: cut
  }, React.createElement("div", {
    className: "sp__bar"
  }, React.createElement("span", null, React.createElement("b", null), "PGM"), React.createElement("span", null, svcNum(pgm), " / ", svcNum(S.length - 1))), React.createElement("div", {
    className: "sp__body"
  }, React.createElement("span", {
    className: "sp__t"
  }, s.title), React.createElement("p", {
    className: "sp__d"
  }, s.description), s.details && s.details.length ? React.createElement("ul", {
    className: "sp__list"
  }, s.details.map((d, i) => React.createElement("li", {
    key: i,
    style: {
      "--d": 200 + i * 80 + "ms"
    }
  }, d))) : null), React.createElement("div", {
    className: "sp__foot"
  }, React.createElement("span", {
    className: "sp__price"
  }, s.price, s.unit ? React.createElement("em", null, " ", s.unit) : null), React.createElement(Button, {
    variant: "paper",
    size: "m",
    onClick: () => onDiscuss(s.title)
  }, "\u041E\u0431\u0441\u0443\u0434\u0438\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0443")), !hold ? React.createElement("i", {
    className: "sp__timer"
  }) : null), React.createElement("div", {
    className: "sp__keys rv"
  }, S.map((x, i) => React.createElement("button", {
    key: i,
    type: "button",
    className: "sp__key" + (i === pgm ? " is-pgm" : i === pvw ? " is-pvw" : ""),
    onMouseEnter: () => i !== pgm && setPvw(i),
    onClick: () => take(i)
  }, React.createElement("span", {
    className: "sp__kn"
  }, svcNum(i)), React.createElement("span", {
    className: "sp__kt"
  }, x.title), React.createElement("span", {
    className: "sp__kp"
  }, x.price))), React.createElement("button", {
    type: "button",
    className: "sp__key sp__key--cta",
    onClick: () => onDiscuss("")
  }, React.createElement("span", {
    className: "sp__kn"
  }, "+"), React.createElement("span", {
    className: "sp__kt"
  }, "\u041D\u0435 \u043D\u0430\u0448\u043B\u0438 \u0441\u0432\u043E\u044E \u0437\u0430\u0434\u0430\u0447\u0443?"), React.createElement("span", {
    className: "sp__kp"
  }, "\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u043D\u0430\u043C")))));
}
function SvcGrid({
  S,
  onDiscuss
}) {
  var {
    Button
  } = window.RGBYDS;
  var [a, setA] = React.useState(0);
  var total = S.reduce((n, s) => n + Math.max(1, svcPrice(s)), 0);
  var acc = 0;
  var slots = S.map(s => {
    var w = Math.max(1, svcPrice(s));
    var r = {
      x: acc / total,
      w: w / total
    };
    acc += w;
    return r;
  });
  var times = ["06:00", "09:00", "12:00", "15:00", "18:00", "21:00", "00:00"];
  var s = S[a];
  return React.createElement("div", {
    className: "stack",
    style: {
      gap: "var(--sp-40)"
    }
  }, React.createElement("div", {
    className: "sg__head"
  }, React.createElement("h2", {
    className: "sec__title rv"
  }, "\u0427\u0442\u043E \u043C\u044B \u0434\u0435\u043B\u0430\u0435\u043C"), React.createElement("span", {
    className: "sg__kicker rv"
  }, "\u0428\u0438\u0440\u0438\u043D\u0430 \u0441\u043B\u043E\u0442\u0430 \u2014 \u043F\u043E\u0440\u044F\u0434\u043E\u043A \u0431\u044E\u0434\u0436\u0435\u0442\u0430")), React.createElement("div", {
    className: "sg rv"
  }, React.createElement("div", {
    className: "sg__ruler"
  }, times.map(t => React.createElement("span", {
    key: t
  }, t))), React.createElement("div", {
    className: "sg__track"
  }, S.map((x, i) => React.createElement("button", {
    key: i,
    type: "button",
    className: "sg__slot" + (i === a ? " is-on" : ""),
    style: {
      left: slots[i].x * 100 + "%",
      width: slots[i].w * 100 + "%",
      "--d": i * 90 + "ms"
    },
    onClick: () => setA(i)
  }, React.createElement("span", {
    className: "sg__n"
  }, svcNum(i)), React.createElement("span", {
    className: "sg__t"
  }, x.title), React.createElement("span", {
    className: "sg__p"
  }, x.price))), React.createElement("i", {
    className: "sg__head-line",
    style: {
      left: (slots[a].x + slots[a].w / 2) * 100 + "%"
    }
  }))), React.createElement("div", {
    className: "sg__panel",
    key: a
  }, React.createElement("div", {
    className: "sg__pl"
  }, React.createElement("span", {
    className: "sg__pn"
  }, svcNum(a)), React.createElement("span", {
    className: "sg__pt"
  }, s.title)), React.createElement("div", {
    className: "sg__pr"
  }, React.createElement("p", {
    className: "sg__pd"
  }, s.description), s.details && s.details.length ? React.createElement("ul", {
    className: "sp__list sp__list--ink"
  }, s.details.map((d, i) => React.createElement("li", {
    key: i,
    style: {
      "--d": 120 + i * 70 + "ms"
    }
  }, d))) : null, React.createElement("div", {
    className: "sg__pf"
  }, React.createElement("span", {
    className: "sp__price"
  }, s.price, s.unit ? React.createElement("em", null, " ", s.unit) : null), React.createElement(Button, {
    variant: "blue",
    size: "m",
    onClick: () => onDiscuss(s.title)
  }, "\u041E\u0431\u0441\u0443\u0434\u0438\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0443"), React.createElement("button", {
    type: "button",
    className: "rg-link",
    onClick: () => onDiscuss("")
  }, "\u041D\u0435 \u043D\u0430\u0448\u043B\u0438 \u0441\u0432\u043E\u044E \u0437\u0430\u0434\u0430\u0447\u0443? \u2192")))));
}
function SvcRows({
  S,
  onDiscuss
}) {
  var {
    TextLink
  } = window.RGBYDS;
  var SVC_PREV = [[/ребрендинг|спешл/i, "cases/comedy-10-1.jpg"], [/программ|промо/i, "cases/fan-2026-1.jpg"], [/id/i, "cases/tv3-wonderland-1.jpg"], [/шоу/i, "cases/last-hero-1.jpg"], [/нового канала|запуск канала/i, "cases/k1-1.jpg"]];
  var FALL = ["cases/soyuzny-1.jpg", "cases/soviet-classics-1.jpg", "cases/k1-3.jpg"];
  var pics = React.useMemo(() => {
    var used = new Set();
    return S.map((sv, i) => {
      var hit = SVC_PREV.find(([re, f]) => re.test(sv.title) && !used.has(f));
      var f = hit ? hit[1] : FALL.find(x => !used.has(x)) || FALL[0];
      used.add(f);
      return window.RGBY_DATA.img(f);
    });
  }, [S]);
  React.useEffect(() => {
    pics.forEach(src => {
      var im = new Image();
      im.src = src;
    });
  }, [pics]);
  var wrap = React.useRef(null),
    prev = React.useRef(null);
  var [hov, setHov] = React.useState(-1);
  var [open, setOpen] = React.useState(-1);
  var ctaHl = React.useRef(null),
    ctaGl = React.useRef(null);
  var g = window.useStepGlitch ? window.useStepGlitch(ctaHl, ctaGl, true) : {
    start() {},
    stop() {}
  };
  React.useEffect(() => {
    var raf,
      x = 0,
      y = 0,
      tx = 0,
      ty = 0;
    var mv = e => {
      var r = wrap.current.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
    };
    var loop = () => {
      raf = requestAnimationFrame(loop);
      x += (tx - x) * .14;
      y += (ty - y) * .14;
      if (prev.current) prev.current.style.transform = "translate3d(" + x.toFixed(1) + "px," + y.toFixed(1) + "px,0) rotate(" + ((tx - x) * .02).toFixed(2) + "deg)";
    };
    var el = wrap.current;
    el.addEventListener("pointermove", mv);
    raf = requestAnimationFrame(loop);
    return () => {
      el.removeEventListener("pointermove", mv);
      cancelAnimationFrame(raf);
    };
  }, []);
  return React.createElement("div", {
    className: "stack",
    style: {
      gap: "var(--sp-40)"
    }
  }, React.createElement("h2", {
    className: "sec__title rv"
  }, "\u0427\u0442\u043E \u043C\u044B \u0434\u0435\u043B\u0430\u0435\u043C"), React.createElement("div", {
    className: "sr",
    ref: wrap,
    onPointerLeave: () => setHov(-1)
  }, React.createElement("div", {
    className: "sr__prev" + (hov >= 0 && open !== hov ? " is-on" : ""),
    ref: prev,
    "aria-hidden": "true"
  }, React.createElement("div", {
    className: "sr__screen"
  }, pics.map((src, k) => React.createElement("i", {
    key: k,
    className: "sr__pic" + (k === hov ? " is-on" : ""),
    style: {
      backgroundImage: "url(" + src + ")"
    }
  })), React.createElement("span", null, React.createElement("b", null), hov >= 0 ? "CH " + svcNum(hov) : ""))), S.map((s, i) => React.createElement("div", {
    key: i,
    className: "rv",
    style: {
      "--d": i * 60 + "ms"
    }
  }, React.createElement("div", {
    className: "sr__row" + (open === i ? " is-open" : "") + (hov >= 0 && hov !== i ? " is-dim" : ""),
    onPointerEnter: () => setHov(i)
  }, React.createElement("button", {
    type: "button",
    className: "sr__head",
    "aria-expanded": open === i,
    onClick: () => setOpen(open === i ? -1 : i)
  }, React.createElement("span", {
    className: "sr__n"
  }, svcNum(i)), React.createElement("span", {
    className: "sr__t"
  }, React.createElement("span", null, s.title)), React.createElement("span", {
    className: "sr__p"
  }, s.price, s.unit ? " " + s.unit : ""), React.createElement("span", {
    className: "sr__x"
  }, React.createElement("span", {
    className: "rg-lines rg-lines--plus" + (open === i ? " rg-lines--open" : "")
  }))), React.createElement("div", {
    className: "sr__body"
  }, React.createElement("div", null, React.createElement("div", {
    className: "sr__in"
  }, React.createElement("p", {
    className: "sr__d"
  }, s.description), s.details && s.details.length ? React.createElement("ul", {
    className: "sp__list sp__list--ink"
  }, s.details.map((d, k) => React.createElement("li", {
    key: k
  }, d))) : null, React.createElement(TextLink, {
    sign: "\u2192",
    onClick: () => onDiscuss(s.title)
  }, "\u041E\u0431\u0441\u0443\u0434\u0438\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0443"))))))), React.createElement("div", {
    className: "sr__row sr__row--cta rv",
    onPointerEnter: () => setHov(-1)
  }, React.createElement("button", {
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
  }, React.createElement("span", {
    className: "sr__fill",
    ref: ctaHl,
    "aria-hidden": "true"
  }), React.createElement("span", {
    className: "sr__gl",
    ref: ctaGl,
    "aria-hidden": "true"
  }, React.createElement("i", null), React.createElement("i", null), React.createElement("i", null), React.createElement("i", null), React.createElement("i", null), React.createElement("i", null)), React.createElement("span", {
    className: "sr__n"
  }, "+"), React.createElement("span", {
    className: "sr__t"
  }, React.createElement("span", null, "\u041D\u0435 \u043D\u0430\u0448\u043B\u0438 \u0441\u0432\u043E\u044E \u0437\u0430\u0434\u0430\u0447\u0443?")), React.createElement("span", {
    className: "sr__p"
  }, "\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u043D\u0430\u043C \u2192"), React.createElement("span", {
    className: "sr__x"
  })))));
}
function SvcTapes({
  S,
  onDiscuss
}) {
  var {
    Button
  } = window.RGBYDS;
  var shelf = React.useRef(null);
  var [a, setA] = React.useState(-1);
  var drag = React.useRef(null);
  var down = e => {
    drag.current = {
      x: e.clientX,
      s: shelf.current.scrollLeft,
      moved: false
    };
    shelf.current.setPointerCapture(e.pointerId);
  };
  var move = e => {
    var d = drag.current;
    if (!d) return;
    var dx = e.clientX - d.x;
    if (Math.abs(dx) > 4) d.moved = true;
    shelf.current.scrollLeft = d.s - dx;
  };
  var up = () => {
    setTimeout(() => drag.current = null, 0);
  };
  var pick = i => {
    if (drag.current && drag.current.moved) return;
    setA(a === i ? -1 : i);
  };
  var s = a >= 0 ? S[a] : null;
  var lbl = ["#2C4FFF", "#061025", "#F3F4FF", "#2C4FFF", "#061025"];
  return React.createElement("div", {
    className: "stack",
    style: {
      gap: "var(--sp-40)"
    }
  }, React.createElement("div", {
    className: "sg__head"
  }, React.createElement("h2", {
    className: "sec__title rv"
  }, "\u0427\u0442\u043E \u043C\u044B \u0434\u0435\u043B\u0430\u0435\u043C"), React.createElement("span", {
    className: "sg__kicker rv"
  }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u0430\u0441\u0441\u0435\u0442\u0443 \xB7 \u0442\u044F\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043B\u0438\u0441\u0442\u0430\u0442\u044C")), React.createElement("div", {
    className: "stp__shelf",
    ref: shelf,
    onPointerDown: down,
    onPointerMove: move,
    onPointerUp: up,
    onPointerCancel: up,
    "data-lenis-prevent": ""
  }, S.map((x, i) => React.createElement("button", {
    key: i,
    type: "button",
    className: "stp rv" + (a === i ? " is-on" : a >= 0 ? " is-off" : ""),
    style: {
      "--d": i * 80 + "ms",
      "--lbl": lbl[i % lbl.length]
    },
    onClick: () => pick(i)
  }, React.createElement("span", {
    className: "stp__case"
  }, React.createElement("span", {
    className: "stp__label"
  }, React.createElement("span", {
    className: "stp__n"
  }, svcNum(i), " \xB7 SP"), React.createElement("span", {
    className: "stp__t"
  }, x.title)), React.createElement("span", {
    className: "stp__win"
  }, React.createElement("i", null), React.createElement("i", null)), React.createElement("span", {
    className: "stp__p"
  }, x.price)))), React.createElement("button", {
    type: "button",
    className: "stp stp--blank rv",
    onClick: () => onDiscuss("")
  }, React.createElement("span", {
    className: "stp__case"
  }, React.createElement("span", {
    className: "stp__label"
  }, React.createElement("span", {
    className: "stp__n"
  }, "+ \xB7 REC"), React.createElement("span", {
    className: "stp__t"
  }, "\u041D\u0435 \u043D\u0430\u0448\u043B\u0438 \u0441\u0432\u043E\u044E \u0437\u0430\u0434\u0430\u0447\u0443?")), React.createElement("span", {
    className: "stp__win"
  }, React.createElement("i", null), React.createElement("i", null)), React.createElement("span", {
    className: "stp__p"
  }, "\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u043D\u0430\u043C")))), React.createElement("div", {
    className: "stp__deck" + (s ? " is-on" : "")
  }, React.createElement("div", {
    className: "stp__deckin",
    key: a
  }, s ? React.createElement(React.Fragment, null, React.createElement("div", {
    className: "stp__dl"
  }, React.createElement("span", {
    className: "stp__play"
  }, "\u25B6 PLAY"), React.createElement("span", {
    className: "sg__pt"
  }, s.title)), React.createElement("div", {
    className: "sg__pr"
  }, React.createElement("p", {
    className: "sg__pd"
  }, s.description), s.details && s.details.length ? React.createElement("ul", {
    className: "sp__list sp__list--ink"
  }, s.details.map((d, k) => React.createElement("li", {
    key: k,
    style: {
      "--d": 120 + k * 70 + "ms"
    }
  }, d))) : null, React.createElement("div", {
    className: "sg__pf"
  }, React.createElement("span", {
    className: "sp__price"
  }, s.price, s.unit ? React.createElement("em", null, " ", s.unit) : null), React.createElement(Button, {
    variant: "blue",
    size: "m",
    onClick: () => onDiscuss(s.title)
  }, "\u041E\u0431\u0441\u0443\u0434\u0438\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0443"), React.createElement("button", {
    type: "button",
    className: "rg-link",
    onClick: () => setA(-1)
  }, "\u23CF \u0418\u0437\u0432\u043B\u0435\u0447\u044C")))) : null)));
}
function RollNum({
  value
}) {
  return React.createElement("span", {
    className: "se__roll",
    "aria-label": value
  }, String(value).split("").map((ch, i) => /\d/.test(ch) ? React.createElement("span", {
    key: i,
    className: "se__dig"
  }, React.createElement("span", {
    style: {
      transform: "translateY(" + -+ch * 10 + "%)"
    }
  }, "0123456789".split("").map(n => React.createElement("i", {
    key: n
  }, n)))) : React.createElement("span", {
    key: i,
    className: "se__ch"
  }, ch)));
}
function SvcEstimate({
  S,
  onDiscuss
}) {
  var {
    Button
  } = window.RGBYDS;
  var [sel, setSel] = React.useState([0]);
  var tog = i => setSel(s => s.includes(i) ? s.filter(x => x !== i) : [...s, i]);
  var sum = sel.reduce((n, i) => n + svcPrice(S[i]), 0);
  var big = sum >= 1000 ? (Math.round(sum / 100) / 10).toFixed(1).replace(".", ",") : String(Math.round(sum));
  var unit = sum >= 1000 ? "млн ₽" : "тыс ₽";
  return React.createElement("div", {
    className: "g12"
  }, React.createElement("h2", {
    className: "sec__title c4 rv"
  }, "\u0427\u0442\u043E \u043C\u044B \u0434\u0435\u043B\u0430\u0435\u043C"), React.createElement("div", {
    className: "c8 se"
  }, React.createElement("div", {
    className: "se__list"
  }, S.map((s, i) => {
    var on = sel.includes(i);
    return React.createElement("button", {
      key: i,
      type: "button",
      className: "se__item rv" + (on ? " is-on" : ""),
      style: {
        "--d": i * 70 + "ms"
      },
      "aria-pressed": on,
      onClick: () => tog(i)
    }, React.createElement("span", {
      className: "se__box"
    }, React.createElement("span", {
      className: "rg-icon--check"
    })), React.createElement("span", {
      className: "se__txt"
    }, React.createElement("span", {
      className: "se__t"
    }, s.title), React.createElement("span", {
      className: "se__d"
    }, s.description)), React.createElement("span", {
      className: "se__p"
    }, s.price, s.unit ? React.createElement("em", null, " ", s.unit) : null));
  })), React.createElement("div", {
    className: "se__sum rv"
  }, React.createElement("span", {
    className: "se__lbl"
  }, "\u041E\u0440\u0438\u0435\u043D\u0442\u0438\u0440 \u043F\u043E \u0441\u043C\u0435\u0442\u0435 \xB7 ", sel.length ? sel.length + " " + (sel.length === 1 ? "услуга" : sel.length < 5 ? "услуги" : "услуг") : "ничего не выбрано"), React.createElement("div", {
    className: "se__val"
  }, sel.length ? React.createElement(React.Fragment, null, React.createElement("span", {
    className: "se__from"
  }, "\u043E\u0442"), React.createElement(RollNum, {
    value: big
  }), React.createElement("span", {
    className: "se__unit"
  }, unit)) : React.createElement("span", {
    className: "se__from"
  }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0437\u0430\u0434\u0430\u0447\u0438")), React.createElement("p", {
    className: "se__note"
  }, "\u0418\u0442\u043E\u0433 \u2014 \u043D\u0438\u0436\u043D\u044F\u044F \u0433\u0440\u0430\u043D\u0438\u0446\u0430. \u0422\u043E\u0447\u043D\u0443\u044E \u0441\u043C\u0435\u0442\u0443 \u0441\u043E\u0431\u0435\u0440\u0451\u043C \u043F\u043E\u0441\u043B\u0435 \u0431\u0440\u0438\u0444\u0430."), React.createElement(Button, {
    variant: "paper",
    onClick: () => onDiscuss(sel.map(i => S[i].title).join(", "))
  }, "\u041E\u0431\u0441\u0443\u0434\u0438\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0443"))));
}
var SVC_NEW = ["n1", "n2", "n3", "n4", "n5"];
function ServicesX({
  variant,
  onDiscuss
}) {
  var S = window.RGBY_DATA.SERVICES;
  var C = {
    n1: SvcPult,
    n2: SvcGrid,
    n3: SvcRows,
    n4: SvcTapes,
    n5: SvcEstimate
  }[variant] || SvcPult;
  return React.createElement(C, {
    S: S,
    onDiscuss: onDiscuss
  });
}
Object.assign(window, {
  ServicesX,
  SVC_NEW
});