// RGBY · sections-bottom.jsx.txt · сборка 2026-10-14
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useMob(q = "(max-width:599px)") {
  var [m, setM] = React.useState(() => matchMedia(q).matches);
  React.useEffect(() => {
    var mq = matchMedia(q),
      f = () => setM(mq.matches);
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);
  return m;
}
function AwardsBlock({
  tone = "ink",
  label = "Награды",
  switcher = null
}) {
  var {
      AwardItem
    } = window.RGBYDS,
    A = window.RGBY_DATA.AWARDS;
  var item = (a, i) => React.createElement("div", {
    key: a.name,
    className: "rv",
    style: {
      "--d": i % 3 * 80 + "ms"
    }
  }, React.createElement(AwardItem, a));
  return React.createElement("section", {
    id: "awards",
    "data-screen-label": label,
    className: "sec awt awt--" + tone + (tone === "ink" ? " sec--ink" : "")
  }, switcher, React.createElement("div", {
    className: "g12",
    style: {
      position: "relative"
    }
  }, React.createElement("h2", {
    className: "sec__title sec__title--tight rv c4"
  }, "\u041D\u0430\u0433\u0440\u0430\u0434\u044B"), React.createElement("div", {
    className: "awards c8"
  }, React.createElement("div", {
    className: "awards__col"
  }, A.slice(0, 3).map((a, i) => item(a, i))), React.createElement("div", {
    className: "awards__col"
  }, A.slice(3).map((a, i) => item(a, i + 3))))));
}
function Awards({
  variant,
  setVariant,
  tone = "ink"
}) {
  var AOPTS = ["v1", "v2", "v3", "v4", "v5", "v6"];
  if (window.AW_X && window.AW_X.includes(variant)) return React.createElement(AwardsX, {
    variant: variant,
    setVariant: setVariant,
    options: AOPTS
  });
  if (variant === "v1") return React.createElement(AwardsBlock, {
    tone: tone,
    label: "06 \u041D\u0430\u0433\u0440\u0430\u0434\u044B",
    switcher: React.createElement(VariantSwitch, {
      label: "\u041D\u0430\u0433\u0440\u0430\u0434\u044B",
      value: variant,
      options: AOPTS,
      onChange: setVariant
    })
  });
  var {
    AwardItem
  } = window.RGBYDS;
  var A = window.RGBY_DATA.AWARDS;
  var cls = variant === "v1" ? "sec sec--ink" : "sec sec--blue aw-" + variant;
  var item = (a, i, p) => React.createElement("div", {
    key: a.name,
    className: "rv",
    style: {
      "--d": i % 3 * 80 + "ms"
    }
  }, React.createElement(AwardItem, _extends({}, a, p)));
  return React.createElement("section", {
    id: "awards",
    "data-screen-label": "06 \u041D\u0430\u0433\u0440\u0430\u0434\u044B",
    className: cls
  }, React.createElement(VariantSwitch, {
    label: "\u041D\u0430\u0433\u0440\u0430\u0434\u044B",
    value: variant,
    options: AOPTS,
    onChange: setVariant
  }), variant === "v2" ? React.createElement("img", {
    className: "aw__bg",
    src: window.RGBY_DATA.img("hero-still.jpg"),
    alt: "",
    "data-parallax": "0.08"
  }) : null, React.createElement("div", {
    className: "g12",
    style: {
      position: "relative"
    }
  }, React.createElement("h2", {
    className: "sec__title sec__title--tight rv " + (variant === "v2" ? "c6" : variant === "v3" ? "c3" : "c4")
  }, "\u041D\u0430\u0433\u0440\u0430\u0434\u044B"), variant === "v3" ? React.createElement("div", {
    className: "awards",
    style: {
      gridColumn: "span 9"
    }
  }, A.map((a, i) => item(a, i, {
    card: true,
    defaultOpen: i === 0
  }))) : React.createElement("div", {
    className: "awards " + (variant === "v2" ? "c6" : "c8")
  }, React.createElement("div", {
    className: "awards__col"
  }, A.slice(0, 3).map((a, i) => item(a, i))), React.createElement("div", {
    className: "awards__col"
  }, A.slice(3).map((a, i) => item(a, i + 3))))));
}
function ClientLogo({
  c,
  tone = "mist",
  className = ""
}) {
  var R = window.RGBY_CLIENTS,
    b = R.box(c.ratio || 3);
  return React.createElement("div", {
    className: "rg-client cl-logo" + (tone && tone !== "mist" ? " rg-client--" + tone : "") + (className ? " " + className : ""),
    title: c.name
  }, React.createElement("img", {
    src: R.src(c.file),
    alt: c.name,
    loading: "lazy",
    decoding: "async",
    style: {
      width: b.w.toFixed(1) + "%",
      height: b.h.toFixed(1) + "%"
    }
  }));
}
function ClientsStrip({
  list,
  tone = "mist"
}) {
  var wrap = React.useRef(null),
    track = React.useRef(null),
    set = React.useRef(null);
  React.useEffect(() => {
    var el = wrap.current,
      tr = track.current;
    if (!el || !tr) return;
    var RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
    var S = {
      x: 0,
      v: 0,
      drag: false,
      lx: 0,
      lt: 0,
      moved: 0,
      w: 1,
      hold: 0
    };
    var auto = () => RM ? 0 : -S.w / (list.length * 3.2);
    var measure = () => {
      S.w = set.current ? set.current.offsetWidth : 1;
    };
    measure();
    S.v = auto();
    var raf = 0,
      last = performance.now(),
      vis = true;
    var io = new IntersectionObserver(e => {
      vis = e[0].isIntersecting;
    }, {
      rootMargin: "100px"
    });
    io.observe(el);
    var tick = t => {
      raf = requestAnimationFrame(tick);
      var dt = Math.min(50, t - last) / 1000;
      last = t;
      if (!vis) return;
      if (!S.drag) {
        var a = auto();
        S.v += (a - S.v) * (1 - Math.exp(-dt * (S.hold > t ? 1.2 : 2.4)));
        S.x += S.v * dt;
      }
      if (S.x <= -S.w) S.x += S.w;
      if (S.x > 0) S.x -= S.w;
      tr.style.transform = "translate3d(" + S.x.toFixed(2) + "px,0,0)";
    };
    raf = requestAnimationFrame(tick);
    var dn = e => {
      if (e.button !== undefined && e.button !== 0) return;
      S.drag = true;
      S.lx = e.clientX;
      S.lt = performance.now();
      S.moved = 0;
      S.v = 0;
      el.classList.add("is-drag");
      el.setPointerCapture && el.setPointerCapture(e.pointerId);
    };
    var mv = e => {
      if (!S.drag) return;
      var now = performance.now(),
        dx = e.clientX - S.lx,
        dtt = Math.max(1, now - S.lt) / 1000;
      S.x += dx;
      S.v = S.v * .6 + dx / dtt * .4;
      S.lx = e.clientX;
      S.lt = now;
      S.moved += Math.abs(dx);
    };
    var up = () => {
      if (!S.drag) return;
      S.drag = false;
      el.classList.remove("is-drag");
      S.v = Math.max(-2400, Math.min(2400, S.v));
      S.hold = performance.now() + 900;
    };
    el.addEventListener("pointerdown", dn);
    el.addEventListener("pointermove", mv);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("lostpointercapture", up);
    var ro = new ResizeObserver(measure);
    set.current && ro.observe(set.current);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      el.removeEventListener("pointerdown", dn);
      el.removeEventListener("pointermove", mv);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("lostpointercapture", up);
    };
  }, [list.length]);
  return React.createElement("div", {
    ref: wrap,
    className: "m-lr m-lr--js rv",
    role: "region",
    "aria-label": "\u041A\u043B\u0438\u0435\u043D\u0442\u044B \u2014 \u043B\u0435\u043D\u0442\u0430, \u043C\u043E\u0436\u043D\u043E \u043B\u0438\u0441\u0442\u0430\u0442\u044C \u043F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u043D\u0438\u0435\u043C"
  }, React.createElement("div", {
    ref: track,
    className: "m-lr__track"
  }, [0, 1].map(k => React.createElement("div", {
    key: k,
    ref: k ? null : set,
    className: "m-lr__set",
    "aria-hidden": k ? "true" : undefined
  }, list.map(c => React.createElement("div", {
    key: c.id,
    className: "m-lr__i"
  }, React.createElement(ClientLogo, {
    c: c,
    tone: tone
  })))))));
}
function ClientsMarquee({
  L,
  dark
}) {
  var {
    ClientTile
  } = window.RGBYDS;
  var track = React.useRef(null);
  React.useEffect(() => {
    var raf,
      last = 0,
      cur = null;
    var tick = t => {
      raf = requestAnimationFrame(tick);
      if (t - last < 120 || !track.current) return;
      last = t;
      var r0 = track.current.parentElement.getBoundingClientRect();
      if (r0.bottom < 0 || r0.top > innerHeight) return;
      var cx = innerWidth / 2;
      var best = null,
        bd = 1e9;
      track.current.querySelectorAll(".rg-client").forEach(el => {
        var r = el.getBoundingClientRect();
        var dd = Math.abs(r.left + r.width / 2 - cx);
        if (dd < bd) {
          bd = dd;
          best = el;
        }
      });
      if (best !== cur) {
        if (cur) cur.classList.remove("is-on");
        if (best) best.classList.add("is-on");
        cur = best;
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  var row = [...L, ...L];
  return React.createElement("div", {
    className: "cl-mq rv" + (dark ? " cl-mob--dark" : "")
  }, React.createElement("div", {
    className: "cl-mq__track",
    ref: track
  }, row.map((logo, i) => React.createElement(ClientTile, {
    key: i,
    logo: logo,
    tone: dark ? "dark" : "mist"
  }))));
}
var CL_SIZES = [[454, 407], [217, 197], [98, 98]];
function Clients({
  variant,
  setVariant
}) {
  var {
    ClientTile,
    CarouselArrow
  } = window.RGBYDS;
  var L = window.RGBY_DATA.CLIENTS;
  var N = L.length;
  var [off, setOff] = React.useState(0);
  var [hover, setHover] = React.useState(false);
  React.useEffect(() => {
    if (variant !== "v1" && variant !== "v3") return;
    var t = setInterval(() => setOff(o => (o + 1) % N), 1600);
    return () => clearInterval(t);
  }, [variant]);
  var mob = useMob();
  var carousel = variant === "v1" || variant === "v3";
  var dark = variant === "v3";
  return React.createElement("section", {
    "data-screen-label": "07 \u041A\u043B\u0438\u0435\u043D\u0442\u044B",
    className: "sec" + (variant === "v1" ? " sec--l" : ""),
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, React.createElement(VariantSwitch, {
    label: "\u041A\u043B\u0438\u0435\u043D\u0442\u044B",
    value: variant,
    options: ["v1", "v2", "v3", "v4", "v5"],
    onChange: setVariant
  }), React.createElement("div", {
    className: "stack",
    style: {
      gap: variant === "v1" || variant === "v3" ? "var(--sp-20)" : "var(--sp-40)"
    }
  }, React.createElement("h2", {
    className: "sec__title rv"
  }, "\u041A\u043B\u0438\u0435\u043D\u0442\u044B"), variant === "v5" ? React.createElement(ClientsStrip, {
    list: window.RGBY_CLIENTS.LIST
  }) : carousel && mob ? React.createElement(ClientsMarquee, {
    L: L,
    dark: dark
  }) : carousel ? React.createElement("div", {
    className: "cl-track rv",
    style: {
      height: "calc(407 * var(--u))"
    }
  }, React.createElement(CarouselArrow, {
    dir: "prev",
    tone: dark ? "mist" : "blue",
    onClick: () => setOff((off - 1 + N) % N)
  }), React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: 0,
      overflow: "hidden"
    }
  }, L.map((logo, i) => {
    var d = (i - off + N) % N;
    if (d > N / 2) d -= N;
    var s = CL_SIZES[Math.abs(d)];
    var vis = !!s;
    return React.createElement(ClientTile, {
      key: i,
      logo: logo,
      tone: dark ? "dark" : "mist",
      style: {
        order: d + N,
        width: vis ? "calc(" + s[0] + " * var(--u))" : 0,
        height: vis ? "calc(" + s[1] + " * var(--u))" : 0,
        aspectRatio: "auto",
        marginInline: vis ? "calc(10 * var(--u))" : 0,
        opacity: vis ? 1 : 0,
        background: d === 0 && !dark ? undefined : undefined
      }
    });
  })), React.createElement(CarouselArrow, {
    dir: "next",
    tone: dark ? "mist" : "blue",
    onClick: () => setOff((off + 1) % N)
  })) : variant === "v2" ? React.createElement("div", {
    className: "cl-strip"
  }, L.map((l, i) => React.createElement("div", {
    key: i,
    className: "rv",
    style: {
      "--d": i * 40 + "ms"
    }
  }, React.createElement(ClientTile, {
    logo: l,
    tone: "strip"
  })))) : React.createElement("div", {
    className: "cl-row"
  }, L.map((l, i) => React.createElement("div", {
    key: i,
    className: "rv",
    style: {
      "--d": i * 40 + "ms"
    }
  }, React.createElement(ClientTile, {
    logo: l,
    tone: "bare"
  }))))));
}
function Team({
  variant,
  setVariant,
  team,
  lead,
  staff = [],
  staffView = "grid",
  setStaffView
}) {
  var {
    TeamMember
  } = window.RGBYDS;
  var ratios = [502 / 450, 502 / 450];
  var members = team.map((m, i) => React.createElement("div", {
    key: m.id,
    className: "rv",
    style: {
      "--d": i * 120 + "ms"
    }
  }, React.createElement(TeamMember, _extends({}, m, {
    layout: variant === "v2" ? "photo-first" : "name-first",
    photoRatio: ratios[i % 2]
  }))));
  var leadEl = React.createElement("div", {
    className: "team__lead rv"
  }, String(lead).split(/\n\s*\n/).map((para, k) => React.createElement("p", {
    key: k
  }, para.split("\n").map((l, j) => React.createElement(React.Fragment, {
    key: j
  }, j ? React.createElement("br", {
    className: "br-d"
  }) : null, l.trim() + " ")))));
  return React.createElement("section", {
    id: "team",
    "data-screen-label": "08 \u041A\u043E\u043C\u0430\u043D\u0434\u0430",
    className: "sec sec--l"
  }, React.createElement(VariantSwitch, {
    label: "\u041A\u043E\u043C\u0430\u043D\u0434\u0430",
    value: variant,
    options: ["v1", "v2"],
    onChange: setVariant
  }), React.createElement("div", {
    className: "stack",
    style: {
      gap: "var(--sp-40)"
    }
  }, React.createElement("h2", {
    className: "sec__title sec__title--tight rv"
  }, "\u041A\u043E\u043C\u0430\u043D\u0434\u0430"), React.createElement("div", {
    className: "team" + (variant === "v2" ? " team--v2" : "")
  }, variant === "v1" ? React.createElement(React.Fragment, null, leadEl, members) : React.createElement(React.Fragment, null, members[0], leadEl, members.slice(1))), staff.length && window.Staff ? React.createElement(window.Staff, {
    staff: staff,
    view: staffView,
    setView: setStaffView
  }) : null));
}
var TYPES = ["ТВ/Медиа", "Веб", "Продакшн", "R&D", "Брендинг", "Мультимедиа"];
var BRIEF_STEPS = [0, 250, 500, 750, 1000, 1500, 2000, 2500, 3000, 3800];
var briefBudget = i => {
  var k = BRIEF_STEPS[i] || 0;
  return k <= 0 ? "0" : k < 1000 ? k + "к ₽" : (k / 1000).toString().replace(".", ",") + " млн ₽";
};
function BriefMonitor({
  f,
  type,
  budget,
  files,
  done,
  sent
}) {
  var [tc, setTc] = React.useState(0);
  React.useEffect(() => {
    var t = setInterval(() => setTc(x => x + 1), 40);
    return () => clearInterval(t);
  }, []);
  var s = Math.floor(tc / 25),
    fr = tc % 25;
  var T = n => String(n).padStart(2, "0");
  var row = (k, v, ph) => React.createElement("div", {
    className: "bm__r" + (v ? " is-on" : "")
  }, React.createElement("span", null, k), React.createElement("b", null, v || ph));
  return React.createElement("div", {
    className: "bm rv",
    style: {
      "--d": "220ms"
    }
  }, React.createElement("div", {
    className: "bm__top"
  }, React.createElement("span", {
    className: "bm__rec"
  }, React.createElement("i", null), sent ? "ОТПРАВЛЕНО" : "REC"), React.createElement("span", {
    className: "bm__tc"
  }, T(Math.floor(s / 60)), ":", T(s % 60), ":", T(fr))), React.createElement("div", {
    className: "bm__body"
  }, row("Клиент", [f.name, f.company].filter(Boolean).join(" · "), "—"), row("Формат", type, "—"), row("Бюджет", budget, "—"), row("Задача", f.about ? f.about.slice(0, 90) + (f.about.length > 90 ? "…" : "") : "", "ждём пару слов"), files ? row("Файлы", files + " шт.", "") : null), React.createElement("div", {
    className: "bm__sig"
  }, Array.from({
    length: 4
  }).map((_, i) => React.createElement("i", {
    key: i,
    className: i < done ? "on" : ""
  })), React.createElement("span", null, "\u0421\u0438\u0433\u043D\u0430\u043B ", done, "/4")));
}
var BRIEF_CONTACT = () => window.RGBY_BRIEF_CONTACT || "phone";
var PH_CC = "7:RU 1:US 20:EG 27:ZA 30:GR 31:NL 32:BE 33:FR 34:ES 36:HU 39:IT 40:RO 41:CH 43:AT 44:GB 45:DK 46:SE 47:NO 48:PL 49:DE 52:MX 54:AR 55:BR 56:CL 57:CO 60:MY 61:AU 62:ID 63:PH 65:SG 66:TH 81:JP 82:KR 84:VN 86:CN 90:TR 91:IN 351:PT 352:LU 353:IE 357:CY 358:FI 359:BG 370:LT 371:LV 372:EE 373:MD 374:AM 375:BY 380:UA 381:RS 382:ME 385:HR 386:SI 420:CZ 421:SK 966:SA 971:AE 972:IL 974:QA 976:MN 992:TJ 993:TM 994:AZ 995:GE 996:KG 998:UZ".split(" ").reduce((o, x) => {
  var [c, i] = x.split(":");
  o[c] = i;
  return o;
}, {});
var phFlag = iso => iso ? String.fromCodePoint(...[...iso].map(c => 127397 + c.charCodeAt(0))) : "";
var parsePhone = v => {
  var raw = String(v || "").trim(),
    plus = raw.charAt(0) === "+";
  var d = raw.replace(/\D/g, "");
  if (!d) return {
    text: plus ? "+" : "",
    iso: null,
    digits: ""
  };
  if (!plus) {
    if (d[0] === "8") d = "7" + d.slice(1);else if (d[0] === "9") d = "7" + d;
  }
  d = d.slice(0, 15);
  var cc = "";
  for (var n = 3; n >= 1; n--) if (PH_CC[d.slice(0, n)]) {
    cc = d.slice(0, n);
    break;
  }
  var iso = cc ? PH_CC[cc] : null;
  if (cc === "7") {
    iso = /^7[67]/.test(d) ? "KZ" : "RU";
    var r = d.slice(1, 11),
      p = [r.slice(0, 3), r.slice(3, 6), r.slice(6, 8), r.slice(8, 10)];
    return {
      iso,
      digits: d.slice(0, 11),
      text: "+7" + (p[0] ? " (" + p[0] + (p[0].length === 3 ? ")" : "") : "") + (p[1] ? " " + p[1] : "") + (p[2] ? "-" + p[2] : "") + (p[3] ? "-" + p[3] : "")
    };
  }
  var head = cc || d.slice(0, 3),
    rest = d.slice(head.length),
    g = [];
  for (var i = 0; i < rest.length;) {
    var _n = i < 6 ? 3 : 2;
    g.push(rest.slice(i, i + _n));
    i += _n;
  }
  return {
    iso,
    digits: d,
    text: "+" + head + (g.length ? " " + g.join(" ") : "")
  };
};
var fmtPhone = v => parsePhone(v).text;
function BriefPhone({
  value,
  onChange,
  error
}) {
  var p = parsePhone(value),
    filled = !!value;
  return React.createElement("label", {
    className: "rg-field bph" + (filled ? " rg-field--filled" : "") + (error ? " rg-field--error" : "")
  }, React.createElement("span", {
    className: "rg-field__label"
  }, "\u0422\u0435\u043B\u0435\u0444\u043E\u043D"), React.createElement("span", {
    className: "bph__row" + (p.iso ? " has-flag" : "")
  }, React.createElement("span", {
    className: "bph__flag",
    "aria-hidden": "true",
    title: p.iso || ""
  }, phFlag(p.iso)), React.createElement("input", {
    className: "rg-field__control bph__in",
    type: "tel",
    inputMode: "tel",
    autoComplete: "tel",
    placeholder: "+7 (900) 000-00-00 \u0438\u043B\u0438 \u0434\u0440\u0443\u0433\u043E\u0439 \u043A\u043E\u0434 \u0441\u0442\u0440\u0430\u043D\u044B",
    value: value,
    onChange: e => onChange(fmtPhone(e.target.value)),
    "aria-describedby": p.iso ? "bph-c" : undefined
  }), p.iso ? React.createElement("span", {
    id: "bph-c",
    className: "bph__sr"
  }, "\u0421\u0442\u0440\u0430\u043D\u0430: ", p.iso) : null), error ? React.createElement("span", {
    className: "rg-field__error"
  }, error) : null);
}
var BRIEF_MSG = [["Telegram", "@username или ссылка t.me/…"], ["WhatsApp", "+7 900 000-00-00 или ссылка wa.me/…"], ["MAX", "Ник, номер или ссылка на профиль"]];
function BriefMessenger({
  app,
  contact,
  onApp,
  onContact
}) {
  var {
    TextField
  } = window.RGBYDS;
  var [open, setOpen] = React.useState(false),
    [hi, setHi] = React.useState(-1),
    box = React.useRef(null),
    btn = React.useRef(null),
    inp = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    var out = e => {
      if (box.current && !box.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", out);
    return () => document.removeEventListener("pointerdown", out);
  }, [open]);
  var pick = i => {
    onApp(BRIEF_MSG[i][0]);
    setOpen(false);
    setTimeout(() => inp.current && inp.current.querySelector("input") && inp.current.querySelector("input").focus(), 380);
  };
  var key = e => {
    if (e.key === "Escape") {
      setOpen(false);
      btn.current && btn.current.focus();
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        setHi(Math.max(0, BRIEF_MSG.findIndex(m => m[0] === app)));
        return;
      }
      setHi(h => (h + (e.key === "ArrowDown" ? 1 : BRIEF_MSG.length - 1)) % BRIEF_MSG.length);
    }
    if ((e.key === "Enter" || e.key === " ") && open && hi >= 0) {
      e.preventDefault();
      pick(hi);
    }
  };
  var cur = BRIEF_MSG.find(m => m[0] === app);
  return React.createElement("div", {
    className: "bmsg"
  }, React.createElement("div", {
    ref: box,
    className: "rg-field bmsg__sel" + (app ? " rg-field--filled" : "") + (open ? " is-open" : "")
  }, React.createElement("span", {
    className: "rg-field__label",
    id: "bm-l"
  }, "\u041C\u0435\u0441\u0441\u0435\u043D\u0434\u0436\u0435\u0440"), React.createElement("button", {
    ref: btn,
    type: "button",
    className: "rg-field__control bmsg__btn",
    "aria-haspopup": "listbox",
    "aria-expanded": open,
    "aria-labelledby": "bm-l",
    onClick: () => {
      setOpen(!open);
      setHi(Math.max(0, BRIEF_MSG.findIndex(m => m[0] === app)));
    },
    onKeyDown: key
  }, React.createElement("span", {
    className: app ? "" : "bmsg__ph"
  }, app || "Выберите мессенджер"), React.createElement("svg", {
    className: "bmsg__chev",
    viewBox: "0 0 12 8",
    "aria-hidden": "true"
  }, React.createElement("path", {
    d: "M1 1.5l5 5 5-5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6"
  }))), React.createElement("ul", {
    className: "bmsg__list",
    role: "listbox",
    "aria-labelledby": "bm-l"
  }, BRIEF_MSG.map(([m], i) => React.createElement("li", {
    key: m,
    role: "option",
    "aria-selected": m === app,
    className: "bmsg__o" + (i === hi ? " is-hi" : "") + (m === app ? " is-on" : ""),
    onPointerEnter: () => setHi(i),
    onClick: () => pick(i)
  }, m)))), React.createElement("div", {
    ref: inp,
    className: "bmsg__more" + (app ? " is-on" : ""),
    "aria-hidden": !app
  }, React.createElement("div", null, React.createElement(TextField, {
    label: app ? "Контакт в " + app : "Контакт",
    placeholder: cur ? cur[1] : "",
    value: contact,
    onChange: onContact,
    tabIndex: app ? 0 : -1,
    autoComplete: "off"
  }))));
}
function Brief({
  budgetMode,
  setBudgetMode,
  prefill,
  version = "b1",
  setVersion,
  sharedBg = false
}) {
  var {
    TextField,
    ChoiceChip,
    Checkbox,
    FileAttach,
    BudgetSlider,
    Button
  } = window.RGBYDS;
  var [f, setF] = React.useState({
    name: "",
    email: "",
    phone: "",
    messenger: "",
    company: "",
    about: ""
  });
  var [msgApp, setMsgApp] = React.useState("");
  var [types, setTypes] = React.useState([]);
  var toggleType = i => setTypes(a => a.includes(i) ? a.filter(x => x !== i) : [...a, i].sort((x, y) => x - y));
  var typeText = types.length ? types.map(i => TYPES[i]).join(", ") : "Не выбран";
  var [budget, setBudget] = React.useState(0);
  var [range, setRange] = React.useState([2, 9]);
  var [agree, setAgree] = React.useState(false);
  var [files, setFiles] = React.useState([]);
  var [err, setErr] = React.useState({});
  var [sent, setSent] = React.useState(false);
  var [busy, setBusy] = React.useState(false);
  React.useEffect(() => {
    if (prefill && prefill.n) {
      setTypes(a => a.includes(0) ? a : [0, ...a]);
      if (prefill.text) setF(s => ({
        ...s,
        about: s.about || "Интересует: " + prefill.text
      }));
    }
  }, [prefill && prefill.n]);
  var set = k => e => {
    setF({
      ...f,
      [k]: e.target.value
    });
    if (err[k]) setErr({
      ...err,
      [k]: null
    });
  };
  var submit = e => {
    e.preventDefault();
    var x = {};
    if (!f.name.trim()) x.name = "Укажите имя";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) x.email = "Проверьте почту";
    if (!f.about.trim()) x.about = "Пара слов о задаче";
    if (BRIEF_CONTACT() === "phone" && f.phone) {
      var pp = parsePhone(f.phone);
      if (pp.iso === "RU" || pp.iso === "KZ" ? pp.digits.length !== 11 : pp.digits.length < 8) x.phone = "Проверьте номер";
    }
    if (!agree) x.agree = true;
    setErr(x);
    if (Object.keys(x).length) return;
    setBusy(true);
    var api = window.__RGBY_API;
    if (!api) {
      setTimeout(() => {
        setBusy(false);
        setSent(true);
      }, 900);
      return;
    }
    var fd = new FormData();
    Object.keys(f).forEach(k => fd.append(k, k === "messenger" ? msgApp ? msgApp + (f.messenger.trim() ? ": " + f.messenger.trim() : "") : "" : f[k] || ""));
    fd.append("type", typeText);
    fd.append("budget", budgetMode === "range" ? briefBudget(range[0]) + " — " + briefBudget(range[1]) : budget ? briefBudget(budget) : "Пока не знаю");
    fd.append("consent", agree ? "1" : "");
    fd.append("consent_text", "Даю согласие на обработку персональных данных (/consent/, версия " + (window.RGBY_CONSENT_VERSION || "2026-10-v1") + ")");
    fd.append("consent_version", window.RGBY_CONSENT_VERSION || "2026-10-v1");
    fd.append("website", e.target.elements.website && e.target.elements.website.value || "");
    fd.append("page", location.href);
    files.forEach(x => x instanceof File && fd.append("files", x, x.name));
    fetch(api + "/brief", {
      method: "POST",
      body: fd
    }).then(r => r.json().catch(() => ({})).then(j => ({
      ok: r.ok,
      j
    }))).then(({
      ok,
      j
    }) => {
      setBusy(false);
      if (ok) {
        setSent(true);
        window.rgbyGoal && window.rgbyGoal("brief_sent");
        return;
      }
      if (j && j.fields) setErr(j.fields);else setErr({
        about: j && j.error || "Не удалось отправить. Попробуйте ещё раз или напишите на почту."
      });
    }).catch(() => {
      setBusy(false);
      setErr({
        about: "Нет связи с сервером. Попробуйте ещё раз."
      });
    });
  };
  var tone = version === "b2" ? "sec--ink" : version === "b3" ? "" : "sec--blue";
  var bText = budgetMode === "range" ? briefBudget(range[0]) + " — " + briefBudget(range[1]) : budget ? briefBudget(budget) : "Пока не знаю";
  var steps = [!!(f.name && f.email), types.length > 0, budgetMode === "range" || budget > 0, !!(f.about && agree)];
  var done = steps.filter(Boolean).length;
  return React.createElement("section", {
    id: "brief",
    "data-screen-label": "09 \u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442",
    className: "sec " + tone + " bv bv--" + version
  }, React.createElement(VariantSwitch, {
    label: "\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C",
    value: version,
    options: ["b1", "b2", "b3", "b4"],
    onChange: v => setVersion && setVersion(v)
  }), React.createElement("div", {
    className: "bv__sw2"
  }, React.createElement(VariantSwitch, {
    label: "\u0411\u044E\u0434\u0436\u0435\u0442",
    value: budgetMode,
    options: ["single", "range"],
    onChange: setBudgetMode
  })), version === "b4" && !sharedBg ? React.createElement("div", {
    className: "bv-sig",
    "aria-hidden": "true"
  }, React.createElement("i", {
    className: "bv-sig__g"
  }), window.Noise ? React.createElement(window.Noise, {
    className: "bv-sig__n"
  }) : null) : null, version === "b3" ? React.createElement("div", {
    className: "bv-safe",
    "aria-hidden": "true"
  }, React.createElement("i", null), React.createElement("i", null), React.createElement("i", null), React.createElement("i", null), React.createElement("span", {
    className: "bv-safe__x"
  })) : null, React.createElement("form", {
    className: "brief",
    onSubmit: submit,
    noValidate: true
  }, React.createElement("input", {
    type: "text",
    name: "website",
    tabIndex: -1,
    autoComplete: "off",
    "aria-hidden": "true",
    style: {
      position: "absolute",
      left: "-9999px",
      width: 1,
      height: 1,
      opacity: 0
    }
  }), React.createElement("div", {
    className: "brief__head"
  }, React.createElement("h2", {
    className: "sec__title sec__title--tight u-pre rv"
  }, "Запустить \nпроект"), React.createElement("div", {
    className: "stack",
    style: {
      gap: "var(--sp-30)"
    }
  }, React.createElement("p", {
    className: "brief__lead u-pre rv",
    style: {
      "--d": "120ms"
    }
  }, "Расскажите о задаче, а мы соберём \nпод неё команду и вернёмся с идеей"), version === "b2" ? React.createElement(BriefMonitor, {
    f: f,
    type: typeText,
    budget: bText,
    files: files.length,
    done: done,
    sent: sent
  }) : null, version === "b3" ? React.createElement("div", {
    className: "bv-steps rv"
  }, ["Контакты", "Тип задачи", "Бюджет", "Детали"].map((s, i) => React.createElement("div", {
    key: s,
    className: "bv-steps__s" + (steps[i] ? " is-on" : "")
  }, React.createElement("span", null, String(i + 1).padStart(2, "0")), React.createElement("b", null, s), React.createElement("i", null)))) : null)), sent ? React.createElement("div", {
    className: "brief__body bv__body"
  }, React.createElement("div", {
    className: "brief__done rv rv--in"
  }, React.createElement("span", {
    className: "sec__title"
  }, "\u0421\u043F\u0430\u0441\u0438\u0431\u043E, ", f.name.split(" ")[0], "!"), React.createElement("span", {
    className: "t-body-l"
  }, "\u0417\u0430\u044F\u0432\u043A\u0430 \u0443\u0448\u043B\u0430 \u043A\u043E\u043C\u0430\u043D\u0434\u0435. \u041E\u0442\u0432\u0435\u0442\u0438\u043C \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 3 \u0440\u0430\u0431\u043E\u0447\u0438\u0445 \u0434\u043D\u0435\u0439 \u043D\u0430 ", f.email, "."), React.createElement("div", null, React.createElement(Button, {
    variant: "blue",
    size: "m",
    type: "button",
    onClick: () => {
      setSent(false);
      setF({
        name: "",
        email: "",
        phone: "",
        messenger: "",
        company: "",
        about: ""
      });
      setMsgApp("");
      setAgree(false);
      setFiles([]);
    }
  }, "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0435\u0449\u0451 \u043E\u0434\u043D\u0443")))) : React.createElement("div", {
    className: "brief__body bv__body"
  }, React.createElement("div", {
    className: "stack rv",
    style: {
      gap: "var(--sp-20)"
    }
  }, React.createElement("div", {
    className: "brief__pair"
  }, React.createElement(TextField, {
    label: "\u0418\u043C\u044F",
    required: true,
    placeholder: "\u041A\u0430\u043A \u043A \u0432\u0430\u043C \u043E\u0431\u0440\u0430\u0449\u0430\u0442\u044C\u0441\u044F",
    value: f.name,
    onChange: set("name"),
    error: err.name,
    autoComplete: "name"
  }), React.createElement(TextField, {
    label: "\u041F\u043E\u0447\u0442\u0430",
    required: true,
    type: "email",
    placeholder: "name@company.ru",
    value: f.email,
    onChange: set("email"),
    error: err.email,
    autoComplete: "email"
  })), React.createElement("div", {
    className: "brief__pair"
  }, BRIEF_CONTACT() === "messenger" ? React.createElement(BriefMessenger, {
    app: msgApp,
    contact: f.messenger,
    onApp: setMsgApp,
    onContact: set("messenger")
  }) : React.createElement(BriefPhone, {
    value: f.phone,
    error: err.phone,
    onChange: v => {
      setF({
        ...f,
        phone: v
      });
      if (err.phone) setErr({
        ...err,
        phone: null
      });
    }
  }), React.createElement(TextField, {
    label: "\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F",
    placeholder: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438",
    value: f.company,
    onChange: set("company"),
    autoComplete: "organization"
  }))), React.createElement("div", {
    className: "brief__group rv"
  }, React.createElement("div", {
    className: "brief__th"
  }, React.createElement("div", {
    className: "brief__tt"
  }, React.createElement("span", {
    className: "rg-field__label brief__tl"
  }, "\u0422\u0438\u043F \u0437\u0430\u0434\u0430\u0447\u0438"), React.createElement("span", {
    className: "brief__hint"
  }, "\u041C\u043E\u0436\u043D\u043E \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E")), React.createElement("span", {
    className: "brief__count" + (types.length ? " is-on" : ""),
    "aria-live": "polite",
    "aria-label": types.length ? "Выбрано: " + types.length : undefined
  }, types.length || "")), React.createElement("div", {
    className: "brief__chips brief__chips--6",
    role: "group",
    "aria-label": "\u0422\u0438\u043F \u0437\u0430\u0434\u0430\u0447\u0438"
  }, TYPES.map((t, i) => React.createElement(ChoiceChip, {
    key: t,
    selected: types.includes(i),
    "aria-pressed": types.includes(i),
    onClick: () => toggleType(i)
  }, t)))), React.createElement("div", {
    className: "rv",
    style: {
      paddingBottom: budgetMode === "range" ? "calc(14 * var(--u))" : 0
    }
  }, budgetMode === "range" ? React.createElement(BudgetSlider, {
    mode: "range",
    value: range,
    onChange: setRange
  }) : React.createElement(BudgetSlider, {
    value: budget,
    onChange: setBudget
  })), React.createElement("div", {
    className: "stack rv",
    style: {
      gap: "var(--sp-40)"
    }
  }, React.createElement(TextField, {
    label: "\u041E \u0437\u0430\u0434\u0430\u0447\u0435",
    required: true,
    multiline: true,
    placeholder: "\u041F\u0430\u0440\u0430 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0439: \u0447\u0442\u043E \u0437\u0430 \u043F\u0440\u043E\u0435\u043A\u0442, \u043D\u0430 \u043A\u0430\u043A\u043E\u043C \u0432\u044B \u044D\u0442\u0430\u043F\u0435, \u0435\u0441\u0442\u044C \u043B\u0438 \u0441\u0440\u043E\u043A\u0438",
    value: f.about,
    onChange: set("about"),
    error: err.about
  }), React.createElement("div", {
    className: "brief__foot"
  }, React.createElement(Checkbox, {
    checked: agree,
    onChange: e => {
      setAgree(e.target.checked);
      setErr({
        ...err,
        agree: null
      });
    },
    error: err.agree
  }, "\u0414\u0430\u044E ", React.createElement("a", {
    href: "../legal/consent.html",
    target: "_blank",
    rel: "noopener",
    className: "rg-check__link",
    onClick: e => e.stopPropagation()
  }, "\u0441\u043E\u0433\u043B\u0430\u0441\u0438\u0435 \u043D\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445")), React.createElement(FileAttach, {
    files: files,
    onFiles: fs => {
      var ok = fs.filter(x => /\.(pdf|docx?|xlsx?|pptx?)$/i.test(x.name)),
        big = ok.filter(x => x.size > 20 * 1048576);
      if (ok.length < fs.length || big.length) alert("Можно прикрепить PDF, DOC, XLS, PPTX до 20 МБ" + (big.length ? ". Слишком большие: " + big.map(x => x.name).join(", ") : ""));
      setFiles(ok.filter(x => x.size <= 20 * 1048576));
    },
    accept: ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx",
    label: "\u041F\u0440\u0438\u043A\u0440\u0435\u043F\u0438\u0442\u044C \u0431\u0440\u0438\u0444 \xB7 PDF, DOC, XLS, PPTX \u0434\u043E 20 \u041C\u0411"
  })), React.createElement(Button, {
    variant: "submit",
    type: "submit",
    disabled: busy
  }, busy ? "Отправляем…" : "Отправить"), React.createElement("span", {
    className: "brief__note"
  }, "\u041E\u0442\u0432\u0435\u0442\u0438\u043C \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 3 \u0440\u0430\u0431\u043E\u0447\u0438\u0445 \u0434\u043D\u0435\u0439")))));
}
function Footer({
  sharedBg = false
}) {
  var {
    Logo,
    Icon
  } = window.RGBYDS;
  return React.createElement("footer", {
    id: "contacts",
    "data-screen-label": "10 \u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B",
    className: "ftr"
  }, sharedBg ? null : React.createElement("div", {
    className: "ftr__cover",
    "aria-hidden": "true"
  }, window.Noise ? React.createElement(window.Noise, {
    className: "ftr__grain"
  }) : null, React.createElement("div", {
    className: "ftr__pl",
    "data-parallax-c": "0.28"
  }, React.createElement("i", {
    style: {
      backgroundImage: "url(" + window.RGBY_DATA.img("hero-rg.webp") + ")"
    }
  }))), React.createElement("div", {
    className: "ftr__r1"
  }, React.createElement("h2", {
    className: "ftr__title rv"
  }, "\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B"), React.createElement("div", {
    className: "ftr__near"
  }, React.createElement("span", {
    className: "ftr__small"
  }, "\u041C\u044B \u0440\u044F\u0434\u043E\u043C"), React.createElement("div", {
    className: "ftr__links rv"
  }, React.createElement("a", {
    href: "https://t.me/hellorgby",
    target: "_blank",
    rel: "noopener"
  }, "@hellorgby"), React.createElement("a", {
    href: "mailto:hello@rgby.ru"
  }, "hello@rgby.ru"), React.createElement("a", {
    href: "tel:+78047007370"
  }, "+7(804) 700-73-70")))), React.createElement("div", {
    className: "ftr__r2"
  }, React.createElement("a", {
    className: "ftr__addr rv",
    href: "https://yandex.ru/maps/-/CXeoEX6e",
    target: "_blank",
    rel: "noopener",
    title: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0432 \u042F\u043D\u0434\u0435\u043A\u0441 \u041A\u0430\u0440\u0442\u0430\u0445"
  }, "Москва, Артплей, Нижняя\nСыромятническая 10с7,\nкорп. 7, 201.Б."), React.createElement("div", {
    className: "ftr__soc rv",
    style: {
      "--d": "100ms"
    }
  }, React.createElement("a", {
    href: "https://t.me/rgby_feed",
    target: "_blank",
    rel: "noopener",
    "aria-label": "Telegram"
  }, React.createElement(Icon, {
    name: "telegram",
    style: {
      width: "calc(16 * var(--u))",
      height: "calc(13.3 * var(--u))",
      transform: "translateX(calc(-1 * var(--u)))"
    }
  })), React.createElement("a", {
    href: "https://vk.ru/hellorgby",
    target: "_blank",
    rel: "noopener",
    "aria-label": "VK"
  }, React.createElement(Icon, {
    name: "vk",
    style: {
      width: "calc(19 * var(--u))",
      height: "calc(12.7 * var(--u))"
    }
  })), React.createElement("a", {
    href: "https://www.instagram.com/hello_rgby",
    target: "_blank",
    rel: "noopener",
    "aria-label": "Instagram*"
  }, React.createElement("svg", {
    viewBox: "0 0 20 20",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    style: {
      width: "calc(18 * var(--u))",
      height: "calc(18 * var(--u))"
    }
  }, React.createElement("rect", {
    x: "1.5",
    y: "1.5",
    width: "17",
    height: "17",
    rx: "5"
  }), React.createElement("circle", {
    cx: "10",
    cy: "10",
    r: "4"
  }), React.createElement("circle", {
    cx: "15",
    cy: "5",
    r: ".6",
    fill: "currentColor"
  }))), React.createElement("a", {
    href: "https://www.behance.net/rgby",
    target: "_blank",
    rel: "noopener",
    "aria-label": "Behance",
    className: "ftr__soc-t"
  }, "B\u0113"), React.createElement("a", {
    href: "https://dprofile.ru/rgby",
    target: "_blank",
    rel: "noopener",
    "aria-label": "Dprofile",
    className: "ftr__soc-t"
  }, "Dp")), React.createElement("span", {
    className: "ftr__docs"
  }, React.createElement("a", {
    href: "../legal/policy.html",
    className: "ftr__policy"
  }, "\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445"), React.createElement("a", {
    href: "../legal/cookies.html",
    className: "ftr__policy"
  }, "\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 cookie-\u0444\u0430\u0439\u043B\u043E\u0432"))), React.createElement("div", {
    className: "ftr__r3"
  }, React.createElement("div", {
    className: "ftr__logo"
  }, React.createElement(Logo, {
    size: "footer",
    color: "var(--rgby-paper)"
  })), React.createElement("p", {
    className: "ftr__legal"
  }, React.createElement("span", {
    className: "ftr__legal--d"
  }, "Информация, размещенная на настоящем сайте, носит исключительно\nсправочный характер и не является публичной офертой по смыслу ст. 437 ГК РФ.\n\nКомпания ООО «РГБИ» ИНН 5029275960 осуществляет деятельность исключительно в сегменте B2B:\nуслуги оказываются только юридическим лицам и индивидуальным предпринимателям. Физическим\nлицам (потребителям) услуги не предоставляются. Материалы сайта не адресованы потребителям\nи не предназначены для целей, предусмотренных законодательством о защите прав потребителей\n\n*Деятельность Meta Platforms Inc. (соцсети Facebook и Instagram) запрещена на территории Российской Федерации"), React.createElement("span", {
    className: "ftr__legal--m"
  }, React.createElement("span", {
    className: "ftr__lp"
  }, "\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F, \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u043D\u0430\u044F \u043D\u0430 \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0435\u043C \u0441\u0430\u0439\u0442\u0435, \u043D\u043E\u0441\u0438\u0442 \u0438\u0441\u043A\u043B\u044E\u0447\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0441\u043F\u0440\u0430\u0432\u043E\u0447\u043D\u044B\u0439 \u0445\u0430\u0440\u0430\u043A\u0442\u0435\u0440 \u0438 \u043D\u0435 \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043F\u0443\u0431\u043B\u0438\u0447\u043D\u043E\u0439 \u043E\u0444\u0435\u0440\u0442\u043E\u0439 \u043F\u043E \u0441\u043C\u044B\u0441\u043B\u0443 \u0441\u0442. 437 \u0413\u041A \u0420\u0424."), React.createElement("span", {
    className: "ftr__lp"
  }, "\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F \u041E\u041E\u041E \xAB\u0420\u0413\u0411\u0418\xBB \u0418\u041D\u041D 5029275960 \u043E\u0441\u0443\u0449\u0435\u0441\u0442\u0432\u043B\u044F\u0435\u0442 \u0434\u0435\u044F\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u0438\u0441\u043A\u043B\u044E\u0447\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0432 \u0441\u0435\u0433\u043C\u0435\u043D\u0442\u0435 B2B: \u0443\u0441\u043B\u0443\u0433\u0438 \u043E\u043A\u0430\u0437\u044B\u0432\u0430\u044E\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u044E\u0440\u0438\u0434\u0438\u0447\u0435\u0441\u043A\u0438\u043C \u043B\u0438\u0446\u0430\u043C \u0438 \u0438\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u044B\u043C \u043F\u0440\u0435\u0434\u043F\u0440\u0438\u043D\u0438\u043C\u0430\u0442\u0435\u043B\u044F\u043C. \u0424\u0438\u0437\u0438\u0447\u0435\u0441\u043A\u0438\u043C \u043B\u0438\u0446\u0430\u043C (\u043F\u043E\u0442\u0440\u0435\u0431\u0438\u0442\u0435\u043B\u044F\u043C) \u0443\u0441\u043B\u0443\u0433\u0438 \u043D\u0435 \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u044E\u0442\u0441\u044F. \u041C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B \u0441\u0430\u0439\u0442\u0430 \u043D\u0435 \u0430\u0434\u0440\u0435\u0441\u043E\u0432\u0430\u043D\u044B \u043F\u043E\u0442\u0440\u0435\u0431\u0438\u0442\u0435\u043B\u044F\u043C \u0438 \u043D\u0435 \u043F\u0440\u0435\u0434\u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u044B \u0434\u043B\u044F \u0446\u0435\u043B\u0435\u0439, \u043F\u0440\u0435\u0434\u0443\u0441\u043C\u043E\u0442\u0440\u0435\u043D\u043D\u044B\u0445 \u0437\u0430\u043A\u043E\u043D\u043E\u0434\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u043E\u043C \u043E \u0437\u0430\u0449\u0438\u0442\u0435 \u043F\u0440\u0430\u0432 \u043F\u043E\u0442\u0440\u0435\u0431\u0438\u0442\u0435\u043B\u0435\u0439."), React.createElement("span", {
    className: "ftr__lp"
  }, "*\u0414\u0435\u044F\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C Meta Platforms Inc. (\u0441\u043E\u0446\u0441\u0435\u0442\u0438 Facebook \u0438 Instagram) \u0437\u0430\u043F\u0440\u0435\u0449\u0435\u043D\u0430 \u043D\u0430 \u0442\u0435\u0440\u0440\u0438\u0442\u043E\u0440\u0438\u0438 \u0420\u043E\u0441\u0441\u0438\u0439\u0441\u043A\u043E\u0439 \u0424\u0435\u0434\u0435\u0440\u0430\u0446\u0438\u0438"))), React.createElement("p", {
    className: "ftr__entity"
  }, "ООО «РГБИ» · ОГРН 1235000044146 · ИНН 5029275960\n105120, г. Москва, ул. Нижняя Сыромятническая, д. 10, стр. 7")));
}
function TailBg() {
  return React.createElement("div", {
    className: "tail__bg",
    "aria-hidden": "true"
  }, React.createElement("i", {
    className: "tail__g"
  }), React.createElement("div", {
    className: "tail__rg",
    "data-parallax-c": "0.22"
  }, React.createElement("i", {
    style: {
      backgroundImage: "url(" + window.RGBY_DATA.img("hero-rg.webp") + ")"
    }
  }), React.createElement("i", {
    className: "tail__rgb",
    style: {
      backgroundImage: "url(" + window.RGBY_DATA.img("hero-rg.webp") + ")"
    }
  })), React.createElement("i", {
    className: "tail__top"
  }), React.createElement("i", {
    className: "tail__veil"
  }), window.Noise ? React.createElement(window.Noise, {
    className: "tail__n"
  }) : null);
}
Object.assign(window, {
  ClientLogo,
  ClientsStrip,
  AwardsBlock,
  TailBg,
  Awards,
  Clients,
  Team,
  Brief,
  Footer
});