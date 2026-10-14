// RGBY · awards-x.jsx.txt · сборка 2026-10-14
var FLAP_CH = "АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЭЮЯABCDEFGHIKLMNOPRSTUVWXYZ0123456789";
function useInView(ref, once = true) {
  var [v, setV] = React.useState(false);
  React.useEffect(() => {
    var raf;
    var chk = () => {
      var r = ref.current && ref.current.getBoundingClientRect();
      var pre = document.documentElement.hasAttribute("data-preloading");
      if (r && !pre && r.top < innerHeight * .85 && r.bottom > 0) {
        setV(true);
        if (once) return;
      }
      raf = requestAnimationFrame(chk);
    };
    raf = requestAnimationFrame(chk);
    return () => cancelAnimationFrame(raf);
  }, []);
  return v;
}
function Flap({
  text,
  go,
  delay = 0,
  tick = 0
}) {
  var T = String(text).toUpperCase();
  var [s, setS] = React.useState(() => T.replace(/\S/g, " "));
  React.useEffect(() => {
    if (!go) return;
    var raf,
      t0 = 0;
    var steps = T.split("").map((c, i) => c === " " ? 0 : 6 + i * 2 + (Math.random() * 6 | 0));
    var loop = t => {
      if (!t0) t0 = t + delay;
      var k = Math.floor(Math.max(0, t - t0) / 42);
      var done = true;
      setS(T.split("").map((c, i) => {
        if (k >= steps[i]) return c;
        done = false;
        return k < 1 ? " " : FLAP_CH[Math.random() * FLAP_CH.length | 0];
      }).join(""));
      if (!done) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [go, T, tick]);
  return React.createElement("span", {
    className: "fl",
    "aria-label": T
  }, s.split("").map((c, i) => React.createElement("i", {
    key: i,
    className: c === " " ? "fl__sp" : ""
  }, c)));
}
var awTotal = a => (a.items || []).reduce((n, x) => n + (+x.count || 0), 0);
function AwBoard({
  A
}) {
  var ref = React.useRef(null);
  var go = useInView(ref);
  var [open, setOpen] = React.useState(-1);
  var [tk, setTk] = React.useState({
    i: -1,
    n: 0
  });
  React.useEffect(() => {
    if (!go) return;
    var t = setInterval(() => setTk(x => ({
      i: Math.random() * A.length | 0,
      n: x.n + 1
    })), 4200);
    return () => clearInterval(t);
  }, [go]);
  return React.createElement("div", {
    className: "awb",
    ref: ref
  }, React.createElement("div", {
    className: "awb__hd"
  }, React.createElement("span", null, "\u2116"), React.createElement("span", null, "\u041F\u0440\u0435\u043C\u0438\u044F"), React.createElement("span", null, "\u041D\u043E\u043C\u0438\u043D\u0430\u0446\u0438\u0438"), React.createElement("span", null, "\u0412\u0441\u0435\u0433\u043E")), A.map((a, i) => React.createElement("div", {
    key: a.name,
    className: "awb__row" + (open === i ? " is-open" : "")
  }, React.createElement("button", {
    type: "button",
    className: "awb__head",
    "aria-expanded": open === i,
    onClick: () => setOpen(open === i ? -1 : i)
  }, React.createElement("span", {
    className: "awb__n"
  }, String(i + 1).padStart(2, "0")), React.createElement("span", {
    className: "awb__t"
  }, React.createElement(Flap, {
    text: a.name,
    go: go,
    delay: i * 140,
    tick: tk.i === i ? tk.n : 0
  })), React.createElement("span", {
    className: "awb__s"
  }, a.summary), React.createElement("span", {
    className: "awb__c"
  }, React.createElement(Flap, {
    text: String(awTotal(a)).padStart(2, "0"),
    go: go,
    delay: 300 + i * 140,
    tick: tk.i === i ? tk.n : 0
  }))), React.createElement("div", {
    className: "awb__body"
  }, React.createElement("div", null, React.createElement("div", {
    className: "awb__items"
  }, (a.items || []).map((x, k) => React.createElement("div", {
    key: k,
    className: "awb__it"
  }, React.createElement(Flap, {
    text: String(x.count).padStart(2, "0"),
    go: open === i,
    delay: k * 120
  }), React.createElement("span", null, x.label)))))))));
}
function AwMeter({
  A
}) {
  var ref = React.useRef(null);
  var go = useInView(ref);
  var [open, setOpen] = React.useState(0);
  var max = Math.max(...A.map(awTotal), 1);
  var total = A.reduce((n, a) => n + awTotal(a), 0);
  var [n, setN] = React.useState(0);
  React.useEffect(() => {
    if (!go) return;
    var raf, t0;
    var st = t => {
      t0 = t0 || t;
      var p = Math.min(1, (t - t0) / 1600);
      setN(Math.round(total * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(st);
    };
    raf = requestAnimationFrame(st);
    return () => cancelAnimationFrame(raf);
  }, [go]);
  return React.createElement("div", {
    className: "awm" + (go ? " is-go" : ""),
    ref: ref
  }, React.createElement("div", {
    className: "awm__marq",
    "aria-hidden": "true"
  }, React.createElement("div", null, [0, 1].map(k => React.createElement("span", {
    key: k
  }, A.map(a => a.name).join(" · "), " \xB7 ")))), React.createElement("div", {
    className: "awm__big"
  }, React.createElement("span", {
    className: "awm__num"
  }, n), React.createElement("span", {
    className: "awm__cap"
  }, "\u043D\u0430\u0433\u0440\u0430\u0434 \u0438 \u043D\u043E\u043C\u0438\u043D\u0430\u0446\u0438\u0439 \u043F\u0440\u043E\u0444\u0438\u043B\u044C\u043D\u044B\u0445 \u043F\u0440\u0435\u043C\u0438\u0439")), React.createElement("div", {
    className: "awm__list"
  }, A.map((a, i) => {
    var t = awTotal(a);
    return React.createElement("div", {
      key: a.name,
      className: "awm__row" + (open === i ? " is-open" : ""),
      style: {
        "--w": t / max,
        "--d": i * 110 + "ms"
      }
    }, React.createElement("button", {
      type: "button",
      className: "awm__head",
      "aria-expanded": open === i,
      onClick: () => setOpen(open === i ? -1 : i)
    }, React.createElement("span", {
      className: "awm__t"
    }, a.name), React.createElement("span", {
      className: "awm__c"
    }, t), React.createElement("span", {
      className: "awm__bar"
    }, React.createElement("i", null))), React.createElement("div", {
      className: "awm__body"
    }, React.createElement("div", null, React.createElement("div", {
      className: "awm__items"
    }, (a.items || []).map((x, k) => React.createElement("div", {
      key: k,
      className: "awm__it"
    }, React.createElement("span", {
      className: "awm__lbl"
    }, x.label), React.createElement("span", {
      className: "awm__px"
    }, Array.from({
      length: +x.count || 0
    }).map((_, j) => React.createElement("i", {
      key: j,
      style: {
        "--j": j * 45 + k * 120 + "ms"
      }
    }))), React.createElement("b", null, x.count)))))));
  })));
}
function AwCase({
  A
}) {
  var [flip, setFlip] = React.useState(-1);
  var mv = e => {
    var el = e.currentTarget,
      r = el.getBoundingClientRect();
    var x = (e.clientX - r.left) / r.width,
      y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", (x * 100).toFixed(1) + "%");
    el.style.setProperty("--my", (y * 100).toFixed(1) + "%");
    el.style.setProperty("--rx", ((.5 - y) * 8).toFixed(2) + "deg");
    el.style.setProperty("--ry", ((x - .5) * 10).toFixed(2) + "deg");
  };
  var out = e => {
    var el = e.currentTarget;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };
  return React.createElement("div", {
    className: "awc"
  }, A.map((a, i) => React.createElement("div", {
    key: a.name,
    className: "awc__cell rv",
    style: {
      "--d": i * 90 + "ms"
    }
  }, React.createElement("button", {
    type: "button",
    className: "awc__card" + (flip === i ? " is-flip" : ""),
    onPointerMove: mv,
    onPointerLeave: out,
    onClick: () => setFlip(flip === i ? -1 : i),
    "aria-pressed": flip === i
  }, React.createElement("span", {
    className: "awc__face awc__front"
  }, React.createElement("span", {
    className: "awc__top"
  }, React.createElement("span", null, "CH ", String(i + 1).padStart(2, "0")), React.createElement("span", {
    className: "awc__live"
  }, React.createElement("b", null), "ON AIR")), React.createElement("span", {
    className: "awc__num"
  }, awTotal(a)), React.createElement("span", {
    className: "awc__name"
  }, a.name), React.createElement("span", {
    className: "awc__sum"
  }, a.summary), React.createElement("span", {
    className: "awc__spot"
  })), React.createElement("span", {
    className: "awc__face awc__back"
  }, React.createElement("span", {
    className: "awc__name"
  }, a.name), React.createElement("span", {
    className: "awc__items"
  }, (a.items || []).map((x, k) => React.createElement("span", {
    key: k,
    className: "awc__it"
  }, React.createElement("b", null, x.count), x.label))), React.createElement("span", {
    className: "awc__hint"
  }, "\u041D\u0430\u0436\u043C\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0432\u0435\u0440\u043D\u0443\u0442\u044C"))))));
}
var AW_X = ["v4", "v5", "v6"];
function AwardsX({
  variant,
  setVariant,
  options
}) {
  var A = window.RGBY_DATA.AWARDS;
  var tone = variant === "v5" ? "sec--blue" : "sec--ink";
  return React.createElement("section", {
    id: "awards",
    "data-screen-label": "06 \u041D\u0430\u0433\u0440\u0430\u0434\u044B",
    className: "sec sec--l " + tone + " awx awx--" + variant
  }, React.createElement(VariantSwitch, {
    label: "\u041D\u0430\u0433\u0440\u0430\u0434\u044B",
    value: variant,
    options: options,
    onChange: setVariant
  }), React.createElement("div", {
    className: "stack",
    style: {
      gap: "var(--sp-40)"
    }
  }, React.createElement("h2", {
    className: "sec__title sec__title--tight rv"
  }, "\u041D\u0430\u0433\u0440\u0430\u0434\u044B"), variant === "v4" ? React.createElement(AwBoard, {
    A: A
  }) : variant === "v5" ? React.createElement(AwMeter, {
    A: A
  }) : React.createElement(AwCase, {
    A: A
  })));
}
Object.assign(window, {
  AwardsX,
  AW_X
});