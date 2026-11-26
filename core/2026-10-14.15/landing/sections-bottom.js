// RGBY · project/ui_kits/landing/sections-bottom.jsx.txt
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Awards, clients, team, brief form, footer.
function useMob(q = "(max-width:599px)") {
  const [m, setM] = React.useState(() => matchMedia(q).matches);
  React.useEffect(() => {
    const mq = matchMedia(q),
      f = () => setM(mq.matches);
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);
  return m;
}
function AwardYears({ rows }) {
  const byYear = new Map();
  for (const row of rows) {
    if (!byYear.has(row.year)) byYear.set(row.year, []);
    byYear.get(row.year).push(row);
  }
  const h = React.createElement;
  return h("span", { className: "award-inside award-inside-years", role: "list" },
    Array.from(byYear, ([year, items]) =>
      h("span", { className: "award-year-group", key: year, role: "listitem" },
        h("span", { className: "award-year" }, year),
        h("span", { className: "award-year-items", role: "list" },
          items.map(({ place, nom }, i) => {
            const parts = nom.split(" → ");
            const name = parts.pop();
            return h("span", { className: "award-pair", key: i, role: "listitem" },
              h("span", { className: "award-place" }, [place, ...parts].join(" · ")),
              h("span", { className: "award-name" }, name)
            );
          })
        )
      )
    )
  );
}

// Единый блок «Награды» для светлой и тёмной тем.
const AWARDS_HEADING = "На полке";
function AwardsBlock({ tone = "ink", sectionNumber, switcher = null, Rows = AwardYears, openAward }) {
  const { AwardItem } = window.RGBYDS;
  const groups = new Map();
  for (const { year, items } of window.RGBY_AWARDS || []) {
    for (const { org, place, nom } of items) {
      if (!groups.has(org)) groups.set(org, []);
      groups.get(org).push({ year, place, nom });
    }
  }
  const plural = new Intl.PluralRules("ru");
  const forms = { one: "награда", few: "награды", many: "наград", other: "наград" };
  const A = Array.from(groups, ([name, rows]) => ({
    name,
    className: "rg-award--grouped",
    summary: rows.length + " " + forms[plural.select(rows.length)],
    defaultOpen: name === openAward,
    items: [{ count: 0, label: React.createElement(Rows, { rows }) }]
  }));
  const item = (a, i) => /*#__PURE__*/React.createElement("div", {
    key: a.name,
    className: "rv",
    style: {
      "--d": i % 3 * 80 + "ms"
    }
  }, /*#__PURE__*/React.createElement(AwardItem, a));
  return /*#__PURE__*/React.createElement("section", {
    id: "awards",
    "data-screen-label": sectionNumber ? sectionNumber + " " + AWARDS_HEADING : AWARDS_HEADING,
    className: "sec awt awt--" + tone + (tone === "ink" ? " sec--ink" : "")
  }, switcher, /*#__PURE__*/React.createElement("div", {
    className: "g12",
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "sec__title sec__title--tight rv c4"
  }, AWARDS_HEADING), /*#__PURE__*/React.createElement("div", {
    className: "awards c8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "awards__col"
  }, A.slice(0, Math.ceil(A.length / 2)).map((a, i) => item(a, i))), /*#__PURE__*/React.createElement("div", {
    className: "awards__col"
  }, A.slice(Math.ceil(A.length / 2)).map((a, i) => item(a, i + 3))))));
}
function Awards({
  variant,
  setVariant,
  tone = "ink"
}) {
  const AOPTS = ["v1", "v2", "v3", "v4", "v5", "v6"];
  if (window.AW_X && window.AW_X.includes(variant)) return /*#__PURE__*/React.createElement(AwardsX, {
    variant: variant,
    setVariant: setVariant,
    options: AOPTS
  });
  if (variant === "v1") return /*#__PURE__*/React.createElement(AwardsBlock, {
    tone: tone,
    sectionNumber: "06",
    switcher: /*#__PURE__*/React.createElement(VariantSwitch, {
      label: "\u041D\u0430\u0433\u0440\u0430\u0434\u044B",
      value: variant,
      options: AOPTS,
      onChange: setVariant
    })
  });
  const {
    AwardItem
  } = window.RGBYDS;
  const A = window.RGBY_DATA.AWARDS;
  const cls = variant === "v1" ? "sec sec--ink" : "sec sec--blue aw-" + variant;
  const item = (a, i, p) => /*#__PURE__*/React.createElement("div", {
    key: a.name,
    className: "rv",
    style: {
      "--d": i % 3 * 80 + "ms"
    }
  }, /*#__PURE__*/React.createElement(AwardItem, _extends({}, a, p)));
  return /*#__PURE__*/React.createElement("section", {
    id: "awards",
    "data-screen-label": "06 " + AWARDS_HEADING,
    className: cls
  }, /*#__PURE__*/React.createElement(VariantSwitch, {
    label: "\u041D\u0430\u0433\u0440\u0430\u0434\u044B",
    value: variant,
    options: AOPTS,
    onChange: setVariant
  }), variant === "v2" ? /*#__PURE__*/React.createElement("img", {
    className: "aw__bg",
    src: window.RGBY_DATA.img("hero-still.jpg"),
    alt: "",
    "data-parallax": "0.08"
  }) : null, /*#__PURE__*/React.createElement("div", {
    className: "g12",
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "sec__title sec__title--tight rv " + (variant === "v2" ? "c6" : variant === "v3" ? "c3" : "c4")
  }, AWARDS_HEADING), variant === "v3" ? /*#__PURE__*/React.createElement("div", {
    className: "awards",
    style: {
      gridColumn: "span 9"
    }
  }, A.map((a, i) => item(a, i, {
    card: true,
    defaultOpen: i === 0
  }))) : /*#__PURE__*/React.createElement("div", {
    className: "awards " + (variant === "v2" ? "c6" : "c8")
  }, /*#__PURE__*/React.createElement("div", {
    className: "awards__col"
  }, A.slice(0, Math.ceil(A.length / 2)).map((a, i) => item(a, i))), /*#__PURE__*/React.createElement("div", {
    className: "awards__col"
  }, A.slice(Math.ceil(A.length / 2)).map((a, i) => item(a, i + 3))))));
}

// Mobile clients: endless horizontal marquee; the tile closest to the screen centre is highlighted.
// Тайл с логотипом клиента (реальные логотипы из content/clients/clients.js); вид тайла — как у ClientTile из дизайн-системы
function ClientLogo({
  c,
  tone = "mist",
  className = ""
}) {
  const R = window.RGBY_CLIENTS,
    b = R.box(c.ratio || 3);
  return /*#__PURE__*/React.createElement("div", {
    className: "rg-client cl-logo" + (tone && tone !== "mist" ? " rg-client--" + tone : "") + (className ? " " + className : ""),
    title: c.name
  }, /*#__PURE__*/React.createElement("img", {
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
// Лента клиентов: бесконечная автопрокрутка + перетаскивание мышью/пальцем с инерцией; после отпускания скорость плавно возвращается к авто
function ClientsStrip({
  list,
  tone = "mist"
}) {
  const wrap = React.useRef(null),
    track = React.useRef(null),
    set = React.useRef(null);
  React.useEffect(() => {
    const el = wrap.current,
      tr = track.current;
    if (!el || !tr) return;
    const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const S = {
      x: 0,
      v: 0,
      drag: false,
      lx: 0,
      lt: 0,
      moved: 0,
      w: 1,
      hold: 0
    };
    const auto = () => RM ? 0 : -S.w / (list.length * 3.2);
    const measure = () => {
      S.w = set.current ? set.current.offsetWidth : 1;
    };
    measure();
    S.v = auto();
    let raf = 0,
      last = performance.now(),
      vis = true;
    const io = new IntersectionObserver(e => {
      vis = e[0].isIntersecting;
    }, {
      rootMargin: "100px"
    });
    io.observe(el);
    const tick = t => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(50, t - last) / 1000;
      last = t;
      if (!vis) return;
      if (!S.drag) {
        const a = auto();
        S.v += (a - S.v) * (1 - Math.exp(-dt * (S.hold > t ? 1.2 : 2.4)));
        S.x += S.v * dt;
      }
      if (S.x <= -S.w) S.x += S.w;
      if (S.x > 0) S.x -= S.w;
      tr.style.transform = "translate3d(" + S.x.toFixed(2) + "px,0,0)";
    };
    raf = requestAnimationFrame(tick);
    const dn = e => {
      if (e.button !== undefined && e.button !== 0) return;
      S.drag = true;
      S.lx = e.clientX;
      S.lt = performance.now();
      S.moved = 0;
      S.v = 0;
      el.classList.add("is-drag");
      el.setPointerCapture && el.setPointerCapture(e.pointerId);
    };
    const mv = e => {
      if (!S.drag) return;
      const now = performance.now(),
        dx = e.clientX - S.lx,
        dtt = Math.max(1, now - S.lt) / 1000;
      S.x += dx;
      S.v = S.v * .6 + dx / dtt * .4;
      S.lx = e.clientX;
      S.lt = now;
      S.moved += Math.abs(dx);
    };
    const up = () => {
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
    const ro = new ResizeObserver(measure);
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
  return /*#__PURE__*/React.createElement("div", {
    ref: wrap,
    className: "m-lr m-lr--js rv",
    role: "region",
    "aria-label": "\u041A\u043B\u0438\u0435\u043D\u0442\u044B \u2014 \u043B\u0435\u043D\u0442\u0430, \u043C\u043E\u0436\u043D\u043E \u043B\u0438\u0441\u0442\u0430\u0442\u044C \u043F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u043D\u0438\u0435\u043C"
  }, /*#__PURE__*/React.createElement("div", {
    ref: track,
    className: "m-lr__track"
  }, [0, 1].map(k => /*#__PURE__*/React.createElement("div", {
    key: k,
    ref: k ? null : set,
    className: "m-lr__set",
    "aria-hidden": k ? "true" : undefined
  }, list.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.id,
    className: "m-lr__i"
  }, /*#__PURE__*/React.createElement(ClientLogo, {
    c: c,
    tone: tone
  })))))));
}
function ClientsMarquee({
  L,
  dark
}) {
  const {
    ClientTile
  } = window.RGBYDS;
  const track = React.useRef(null);
  React.useEffect(() => {
    let raf,
      last = 0,
      cur = null;
    const tick = t => {
      raf = requestAnimationFrame(tick);
      if (t - last < 120 || !track.current) return;
      last = t;
      const r0 = track.current.parentElement.getBoundingClientRect();
      if (r0.bottom < 0 || r0.top > innerHeight) return;
      const cx = innerWidth / 2;
      let best = null,
        bd = 1e9;
      track.current.querySelectorAll(".rg-client").forEach(el => {
        const r = el.getBoundingClientRect();
        const dd = Math.abs(r.left + r.width / 2 - cx);
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
  const row = [...L, ...L];
  return /*#__PURE__*/React.createElement("div", {
    className: "cl-mq rv" + (dark ? " cl-mob--dark" : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "cl-mq__track",
    ref: track
  }, row.map((logo, i) => /*#__PURE__*/React.createElement(ClientTile, {
    key: i,
    logo: logo,
    tone: dark ? "dark" : "mist"
  }))));
}
const CL_SIZES = [[454, 407], [217, 197], [98, 98]];
function Clients({
  variant,
  setVariant
}) {
  const {
    ClientTile,
    CarouselArrow
  } = window.RGBYDS;
  const L = window.RGBY_DATA.CLIENTS;
  const N = L.length;
  const [off, setOff] = React.useState(0);
  const [hover, setHover] = React.useState(false);
  React.useEffect(() => {
    if (variant !== "v1" && variant !== "v3") return;
    const t = setInterval(() => setOff(o => (o + 1) % N), 1600);
    return () => clearInterval(t);
  }, [variant]);
  const mob = useMob();
  const carousel = variant === "v1" || variant === "v3";
  const dark = variant === "v3";
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": "07 \u041A\u043B\u0438\u0435\u043D\u0442\u044B",
    className: "sec" + (variant === "v1" ? " sec--l" : ""),
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, /*#__PURE__*/React.createElement(VariantSwitch, {
    label: "\u041A\u043B\u0438\u0435\u043D\u0442\u044B",
    value: variant,
    options: ["v1", "v2", "v3", "v4", "v5"],
    onChange: setVariant
  }), /*#__PURE__*/React.createElement("div", {
    className: "stack",
    style: {
      gap: variant === "v1" || variant === "v3" ? "var(--sp-20)" : "var(--sp-40)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "sec__title rv"
  }, "\u041A\u043B\u0438\u0435\u043D\u0442\u044B"), variant === "v5" ? /*#__PURE__*/React.createElement(ClientsStrip, {
    list: window.RGBY_CLIENTS.LIST
  }) : carousel && mob ? /*#__PURE__*/React.createElement(ClientsMarquee, {
    L: L,
    dark: dark
  }) : carousel ? /*#__PURE__*/React.createElement("div", {
    className: "cl-track rv",
    style: {
      height: "calc(407 * var(--u))"
    }
  }, /*#__PURE__*/React.createElement(CarouselArrow, {
    dir: "prev",
    tone: dark ? "mist" : "blue",
    onClick: () => setOff((off - 1 + N) % N)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: 0,
      overflow: "hidden"
    }
  }, L.map((logo, i) => {
    let d = (i - off + N) % N;
    if (d > N / 2) d -= N;
    const s = CL_SIZES[Math.abs(d)];
    const vis = !!s;
    return /*#__PURE__*/React.createElement(ClientTile, {
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
  })), /*#__PURE__*/React.createElement(CarouselArrow, {
    dir: "next",
    tone: dark ? "mist" : "blue",
    onClick: () => setOff((off + 1) % N)
  })) : variant === "v2" ? /*#__PURE__*/React.createElement("div", {
    className: "cl-strip"
  }, L.map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "rv",
    style: {
      "--d": i * 40 + "ms"
    }
  }, /*#__PURE__*/React.createElement(ClientTile, {
    logo: l,
    tone: "strip"
  })))) : /*#__PURE__*/React.createElement("div", {
    className: "cl-row"
  }, L.map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "rv",
    style: {
      "--d": i * 40 + "ms"
    }
  }, /*#__PURE__*/React.createElement(ClientTile, {
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
  const {
    TeamMember
  } = window.RGBYDS;
  const ratios = [502 / 450, 502 / 450]; // оба основателя — одинаковый кадр и вес
  const members = team.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: m.id,
    className: "rv",
    style: {
      "--d": i * 120 + "ms"
    }
  }, /*#__PURE__*/React.createElement(TeamMember, _extends({}, m, {
    layout: variant === "v2" ? "photo-first" : "name-first",
    photoRatio: ratios[i % 2]
  }))));
  const leadEl = /*#__PURE__*/React.createElement("div", {
    className: "team__lead rv"
  }, String(lead).split(/\n\s*\n/).map((para, k) => /*#__PURE__*/React.createElement("p", {
    key: k
  }, para.split("\n").map((l, j) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: j
  }, j ? /*#__PURE__*/React.createElement("br", {
    className: "br-d"
  }) : null, l.trim() + " ")))));
  return /*#__PURE__*/React.createElement("section", {
    id: "team",
    "data-screen-label": "08 \u041A\u043E\u043C\u0430\u043D\u0434\u0430",
    className: "sec sec--l"
  }, /*#__PURE__*/React.createElement(VariantSwitch, {
    label: "\u041A\u043E\u043C\u0430\u043D\u0434\u0430",
    value: variant,
    options: ["v1", "v2"],
    onChange: setVariant
  }), /*#__PURE__*/React.createElement("div", {
    className: "stack",
    style: {
      gap: "var(--sp-40)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "sec__title sec__title--tight rv"
  }, "\u041A\u043E\u043C\u0430\u043D\u0434\u0430"), /*#__PURE__*/React.createElement("div", {
    className: "team" + (variant === "v2" ? " team--v2" : "")
  }, variant === "v1" ? /*#__PURE__*/React.createElement(React.Fragment, null, leadEl, members) : /*#__PURE__*/React.createElement(React.Fragment, null, members[0], leadEl, members.slice(1))), staff.length && window.Staff ? /*#__PURE__*/React.createElement(window.Staff, {
    staff: staff,
    view: staffView,
    setView: setStaffView
  }) : null));
}

// Тип задачи — те же 6 направлений, что в блоке «Направления»; можно выбрать несколько
const TYPES = ["ТВ/Медиа", "Веб", "Продакшн", "R&D", "Брендинг", "Мультимедиа"];
const BRIEF_STEPS = [0, 250, 500, 750, 1000, 1500, 2000, 2500, 3000, 3800];
const briefBudget = i => {
  const k = BRIEF_STEPS[i] || 0;
  return k <= 0 ? "0" : k < 1000 ? k + "к ₽" : (k / 1000).toString().replace(".", ",") + " млн ₽";
};
// b2: live «монитор» — the brief assembles as an on-air card while the user types.
function BriefMonitor({
  f,
  type,
  budget,
  files,
  done,
  sent
}) {
  const [tc, setTc] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setTc(x => x + 1), 40);
    return () => clearInterval(t);
  }, []);
  const s = Math.floor(tc / 25),
    fr = tc % 25;
  const T = n => String(n).padStart(2, "0");
  const row = (k, v, ph) => /*#__PURE__*/React.createElement("div", {
    className: "bm__r" + (v ? " is-on" : "")
  }, /*#__PURE__*/React.createElement("span", null, k), /*#__PURE__*/React.createElement("b", null, v || ph));
  return /*#__PURE__*/React.createElement("div", {
    className: "bm rv",
    style: {
      "--d": "220ms"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "bm__top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bm__rec"
  }, /*#__PURE__*/React.createElement("i", null), sent ? "ОТПРАВЛЕНО" : "REC"), /*#__PURE__*/React.createElement("span", {
    className: "bm__tc"
  }, T(Math.floor(s / 60)), ":", T(s % 60), ":", T(fr))), /*#__PURE__*/React.createElement("div", {
    className: "bm__body"
  }, row("Клиент", [f.name, f.company].filter(Boolean).join(" · "), "—"), row("Формат", type, "—"), row("Связь", budget, "—"), row("Задача", f.about ? f.about.slice(0, 90) + (f.about.length > 90 ? "…" : "") : "", "ждём пару слов"), files ? row("Файлы", files + " шт.", "") : null), /*#__PURE__*/React.createElement("div", {
    className: "bm__sig"
  }, Array.from({
    length: 4
  }).map((_, i) => /*#__PURE__*/React.createElement("i", {
    key: i,
    className: i < done ? "on" : ""
  })), /*#__PURE__*/React.createElement("span", null, "\u0421\u0438\u0433\u043D\u0430\u043B ", done, "/4")));
}
// АРХИВ (сейчас выключено): поле «Мессенджер» — выпадающий список (Telegram / WhatsApp / MAX) → под ним поле для ника, номера или ссылки.
// Вернуть: window.RGBY_BRIEF_CONTACT = "messenger" (или поменять значение по умолчанию в BRIEF_CONTACT ниже). По умолчанию в форме — «Телефон».
const BRIEF_CONTACT = () => window.RGBY_BRIEF_CONTACT || "phone";
// Телефон: страна определяется по первым цифрам кода (самое длинное совпадение), рядом флаг. +7 — маска РФ/Казахстана, остальные — группами.
// Без «+»: 8… и 9… считаются российскими (8 → +7), иначе цифры читаются как международный номер.
const PH_CC = "7:RU 1:US 20:EG 27:ZA 30:GR 31:NL 32:BE 33:FR 34:ES 36:HU 39:IT 40:RO 41:CH 43:AT 44:GB 45:DK 46:SE 47:NO 48:PL 49:DE 52:MX 54:AR 55:BR 56:CL 57:CO 60:MY 61:AU 62:ID 63:PH 65:SG 66:TH 81:JP 82:KR 84:VN 86:CN 90:TR 91:IN 351:PT 352:LU 353:IE 357:CY 358:FI 359:BG 370:LT 371:LV 372:EE 373:MD 374:AM 375:BY 380:UA 381:RS 382:ME 385:HR 386:SI 420:CZ 421:SK 966:SA 971:AE 972:IL 974:QA 976:MN 992:TJ 993:TM 994:AZ 995:GE 996:KG 998:UZ".split(" ").reduce((o, x) => {
  const [c, i] = x.split(":");
  o[c] = i;
  return o;
}, {});
const phFlag = iso => iso ? String.fromCodePoint(...[...iso].map(c => 127397 + c.charCodeAt(0))) : "";
const parsePhone = v => {
  const raw = String(v || "").trim(),
    plus = raw.charAt(0) === "+";
  let d = raw.replace(/\D/g, "");
  if (!d) return {
    text: plus ? "+" : "",
    iso: null,
    digits: ""
  };
  if (!plus) {
    if (d[0] === "8") d = "7" + d.slice(1);else if (d[0] === "9") d = "7" + d;
  }
  d = d.slice(0, 15);
  let cc = "";
  for (let n = 3; n >= 1; n--) if (PH_CC[d.slice(0, n)]) {
    cc = d.slice(0, n);
    break;
  }
  let iso = cc ? PH_CC[cc] : null;
  if (cc === "7") {
    iso = /^7[67]/.test(d) ? "KZ" : "RU";
    const r = d.slice(1, 11),
      p = [r.slice(0, 3), r.slice(3, 6), r.slice(6, 8), r.slice(8, 10)];
    return {
      iso,
      digits: d.slice(0, 11),
      text: "+7" + (p[0] ? " (" + p[0] + (p[0].length === 3 ? ")" : "") : "") + (p[1] ? " " + p[1] : "") + (p[2] ? "-" + p[2] : "") + (p[3] ? "-" + p[3] : "")
    };
  }
  const head = cc || d.slice(0, 3),
    rest = d.slice(head.length),
    g = [];
  for (let i = 0; i < rest.length;) {
    const n = i < 6 ? 3 : 2;
    g.push(rest.slice(i, i + n));
    i += n;
  }
  return {
    iso,
    digits: d,
    text: "+" + head + (g.length ? " " + g.join(" ") : "")
  };
};
const fmtPhone = v => parsePhone(v).text;
// Поле телефона в стиле rg-field (дизайн-система) + флаг страны внутри
function BriefPhone({
  value,
  onChange,
  error
}) {
  const p = parsePhone(value),
    filled = !!value;
  return /*#__PURE__*/React.createElement("label", {
    className: "rg-field bph" + (filled ? " rg-field--filled" : "") + (error ? " rg-field--error" : "")
  }, /*#__PURE__*/React.createElement("span", {
    className: "rg-field__label"
  }, "\u0422\u0435\u043B\u0435\u0444\u043E\u043D"), /*#__PURE__*/React.createElement("span", {
    className: "bph__row" + (p.iso ? " has-flag" : "")
  }, /*#__PURE__*/React.createElement("span", {
    className: "bph__flag",
    "aria-hidden": "true",
    title: p.iso || ""
  }, phFlag(p.iso)), /*#__PURE__*/React.createElement("input", {
    className: "rg-field__control bph__in",
    type: "tel",
    inputMode: "tel",
    autoComplete: "tel",
    placeholder: "+7 (900) 000-00-00 \u0438\u043B\u0438 \u0434\u0440\u0443\u0433\u043E\u0439 \u043A\u043E\u0434 \u0441\u0442\u0440\u0430\u043D\u044B",
    value: value,
    onChange: e => onChange(fmtPhone(e.target.value)),
    "aria-describedby": p.iso ? "bph-c" : undefined
  }), p.iso ? /*#__PURE__*/React.createElement("span", {
    id: "bph-c",
    className: "bph__sr"
  }, "\u0421\u0442\u0440\u0430\u043D\u0430: ", p.iso) : null), error ? /*#__PURE__*/React.createElement("span", {
    className: "rg-field__error"
  }, error) : null);
}
const BRIEF_MSG = [["Telegram", "@username или ссылка t.me/…"], ["WhatsApp", "+7 900 000-00-00 или ссылка wa.me/…"], ["MAX", "Ник, номер или ссылка на профиль"]];
function BriefMessenger({
  app,
  contact,
  onApp,
  onContact
}) {
  const {
    TextField
  } = window.RGBYDS;
  const [open, setOpen] = React.useState(false),
    [hi, setHi] = React.useState(-1),
    box = React.useRef(null),
    btn = React.useRef(null),
    inp = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const out = e => {
      if (box.current && !box.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", out);
    return () => document.removeEventListener("pointerdown", out);
  }, [open]);
  const pick = i => {
    onApp(BRIEF_MSG[i][0]);
    setOpen(false);
    setTimeout(() => inp.current && inp.current.querySelector("input") && inp.current.querySelector("input").focus(), 380);
  };
  const key = e => {
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
  const cur = BRIEF_MSG.find(m => m[0] === app);
  return /*#__PURE__*/React.createElement("div", {
    className: "bmsg"
  }, /*#__PURE__*/React.createElement("div", {
    ref: box,
    className: "rg-field bmsg__sel" + (app ? " rg-field--filled" : "") + (open ? " is-open" : "")
  }, /*#__PURE__*/React.createElement("span", {
    className: "rg-field__label",
    id: "bm-l"
  }, "\u041C\u0435\u0441\u0441\u0435\u043D\u0434\u0436\u0435\u0440"), /*#__PURE__*/React.createElement("button", {
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
  }, /*#__PURE__*/React.createElement("span", {
    className: app ? "" : "bmsg__ph"
  }, app || "Выберите мессенджер"), /*#__PURE__*/React.createElement("svg", {
    className: "bmsg__chev",
    viewBox: "0 0 12 8",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 1.5l5 5 5-5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6"
  }))), /*#__PURE__*/React.createElement("ul", {
    className: "bmsg__list",
    role: "listbox",
    "aria-labelledby": "bm-l"
  }, BRIEF_MSG.map(([m], i) => /*#__PURE__*/React.createElement("li", {
    key: m,
    role: "option",
    "aria-selected": m === app,
    className: "bmsg__o" + (i === hi ? " is-hi" : "") + (m === app ? " is-on" : ""),
    onPointerEnter: () => setHi(i),
    onClick: () => pick(i)
  }, m)))), /*#__PURE__*/React.createElement("div", {
    ref: inp,
    className: "bmsg__more" + (app ? " is-on" : ""),
    "aria-hidden": !app
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(TextField, {
    label: app ? "Контакт в " + app : "Контакт",
    placeholder: cur ? cur[1] : "",
    value: contact,
    onChange: onContact,
    tabIndex: app ? 0 : -1,
    autoComplete: "off"
  }))));
}

// «Как с вами связаться?» (BR_RGBY, Форма; релиз 2026-10-14.11): сначала выпадающий список способов связи (Max, Telegram, Почта, Телефон); после выбора слева остаётся
// кнопка способа (сменить можно в любой момент), справа — поле под него. Подсказки короткие; если всё же не влезают — многоточие, полная — по наведению (title). Введённое для каждого способа запоминается (переключение не стирает).
const BRIEF_WAYS = [{
  id: "max",
  label: "Max",
  type: "text",
  ph: "Ник, номер или ссылка",
  ac: "off"
}, {
  id: "tg",
  label: "Telegram",
  type: "text",
  ph: "@ник или t.me/…",
  ac: "off"
}, {
  id: "mail",
  label: "Почта",
  type: "email",
  ph: "name@company.ru",
  ac: "email"
}, {
  id: "call",
  label: "Телефон",
  type: "tel",
  ph: "+7 (900) 000-00-00",
  ac: "tel"
}];
function BriefContact({
  way,
  value,
  onWay,
  onValue,
  error
}) {
  const [open, setOpen] = React.useState(false),
    [hi, setHi] = React.useState(-1),
    box = React.useRef(null),
    btn = React.useRef(null),
    inp = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const out = e => {
      if (box.current && !box.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", out);
    return () => document.removeEventListener("pointerdown", out);
  }, [open]);
  const idx = BRIEF_WAYS.findIndex(w => w.id === way),
    cur = BRIEF_WAYS[idx];
  const pick = i => {
    onWay(BRIEF_WAYS[i].id);
    setOpen(false);
    setTimeout(() => inp.current && inp.current.focus(), 60);
  };
  const key = e => {
    if (e.key === "Escape") {
      setOpen(false);
      btn.current && btn.current.focus();
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        setHi(Math.max(0, idx));
        return;
      }
      setHi(h => (h + (e.key === "ArrowDown" ? 1 : BRIEF_WAYS.length - 1)) % BRIEF_WAYS.length);
    }
    if ((e.key === "Enter" || e.key === " ") && open && hi >= 0) {
      e.preventDefault();
      pick(hi);
    }
  };
  const p = cur && cur.id === "call" ? parsePhone(value) : null;
  return React.createElement("div", {
    ref: box,
    className: "rg-field bmsg__sel bct" + (cur ? " bct--on" : "") + (open ? " is-open" : "") + (error ? " rg-field--error" : "")
  }, React.createElement("span", {
    className: "rg-field__label",
    id: "bct-l"
  }, "Как с вами связаться?"), React.createElement("div", {
    className: "bct__row"
  },
  // синей (заполненной) после выбора становится только кнопка способа; поле ввода — как остальные поля формы: синее при фокусе и с текстом
  React.createElement("span", {
    className: "bct__pick" + (cur ? " rg-field--filled" : "")
  }, React.createElement("button", {
    ref: btn,
    type: "button",
    className: "rg-field__control bmsg__btn bct__btn",
    "aria-haspopup": "listbox",
    "aria-expanded": open,
    "aria-label": "Способ связи: " + (cur ? cur.label : "не выбран"),
    onClick: () => {
      setOpen(!open);
      setHi(Math.max(0, idx));
    },
    onKeyDown: key
  }, React.createElement("span", {
    className: cur ? "" : "bmsg__ph"
  }, cur ? cur.label : "Выберите способ связи"), React.createElement("svg", {
    className: "bmsg__chev",
    viewBox: "0 0 12 8",
    "aria-hidden": "true"
  }, React.createElement("path", {
    d: "M1 1.5l5 5 5-5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6"
  })))), cur ? React.createElement("span", {
    className: "bct__in" + (value ? " rg-field--filled" : "") + (p && p.iso ? " has-flag" : "")
  }, p ? React.createElement("span", {
    className: "bct__flag",
    "aria-hidden": "true",
    title: p.iso || ""
  }, phFlag(p.iso)) : null, React.createElement("input", {
    ref: inp,
    key: cur.id,
    className: "rg-field__control",
    type: cur.type,
    inputMode: cur.id === "call" ? "tel" : cur.id === "mail" ? "email" : undefined,
    autoComplete: cur.ac,
    placeholder: cur.ph,
    title: cur.ph,
    value: value,
    "aria-label": cur.label + ": контакт",
    onChange: e => onValue(cur.id === "call" ? fmtPhone(e.target.value) : e.target.value)
  })) : null), React.createElement("ul", {
    className: "bmsg__list bct__list",
    role: "listbox",
    "aria-labelledby": "bct-l"
  }, BRIEF_WAYS.map((w, i) => React.createElement("li", {
    key: w.id,
    role: "option",
    "aria-selected": w.id === way,
    className: "bmsg__o" + (i === hi ? " is-hi" : "") + (w.id === way ? " is-on" : ""),
    onPointerEnter: () => setHi(i),
    onClick: () => pick(i)
  }, w.label))), error ? React.createElement("span", {
    className: "rg-field__error"
  }, error) : null);
}
function Brief({
  budgetMode,
  setBudgetMode,
  prefill,
  version = "b1",
  setVersion,
  sharedBg = false
}) {
  const {
    TextField,
    ChoiceChip,
    Checkbox,
    FileAttach,
    BudgetSlider,
    Button
  } = window.RGBYDS;
  const [f, setF] = React.useState({
    name: "",
    email: "",
    phone: "",
    messenger: "",
    company: "",
    about: ""
  });
  const [msgApp, setMsgApp] = React.useState("");
  // способ связи и введённое для каждого способа; для «Почты» по умолчанию — адрес из поля «Почта»
  const [way, setWay] = React.useState(""),
    [cv, setCv] = React.useState({});
  const cval = way ? cv[way] != null ? cv[way] : way === "mail" ? f.email : "" : "",
    wayLabel = way ? BRIEF_WAYS.find(w => w.id === way).label : "";
  const pickWay = id => {
    setWay(id);
    if (err.contact) setErr({
      ...err,
      contact: null
    });
  };
  const [types, setTypes] = React.useState([]);
  const toggleType = i => setTypes(a => a.includes(i) ? a.filter(x => x !== i) : [...a, i].sort((x, y) => x - y));
  const typeText = types.length ? types.map(i => TYPES[i]).join(", ") : "Не выбран";
  const [budget, setBudget] = React.useState(0);
  const [range, setRange] = React.useState([2, 9]);
  const [agree, setAgree] = React.useState(false);
  const [files, setFiles] = React.useState([]);
  const [err, setErr] = React.useState({});
  const [sent, setSent] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  React.useEffect(() => {
    if (prefill && prefill.n) {
      setTypes(a => a.includes(0) ? a : [0, ...a]);
      if (prefill.text) setF(s => ({
        ...s,
        about: s.about || "Интересует: " + prefill.text
      }));
    }
  }, [prefill && prefill.n]);
  const set = k => e => {
    setF({
      ...f,
      [k]: e.target.value
    });
    if (err[k]) setErr({
      ...err,
      [k]: null
    });
  };
  const submit = e => {
    e.preventDefault();
    const x = {};
    if (!f.name.trim()) x.name = "Укажите имя";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) x.email = "Проверьте почту";
    if (!f.about.trim()) x.about = "Пара слов о задаче";
    if (way === "call" && cval) {
      const pp = parsePhone(cval);
      if (pp.iso === "RU" || pp.iso === "KZ" ? pp.digits.length !== 11 : pp.digits.length < 8) x.contact = "Проверьте номер";
    }
    if (way === "mail" && cval && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cval)) x.contact = "Проверьте почту";
    if (!agree) x.agree = true;
    setErr(x);
    if (Object.keys(x).length) return;
    setBusy(true);
    const api = window.__RGBY_API;
    if (!api) {
      setTimeout(() => {
        setBusy(false);
        setSent(true);
      }, 900);
      return;
    }
    const fd = new FormData();
    // способ связи: в «Мессенджер» — «Способ: контакт» (в письме — строка «Как связаться»), для «Телефона» номер ещё и в поле phone
    Object.keys(f).forEach(k => fd.append(k, k === "phone" ? way === "call" ? cval : "" : k === "messenger" ? way ? wayLabel + (cval.trim() ? ": " + cval.trim() : "") : "" : f[k] || ""));
    fd.append("type", typeText);
    fd.append("consent", agree ? "1" : "");
    fd.append("consent_text", "Даю согласие на обработку персональных данных (/consent/, версия " + (window.RGBY_CONSENT_VERSION || "2026-10-v1") + ")");
    fd.append("consent_version", window.RGBY_CONSENT_VERSION || "2026-10-v1");
    fd.append("website", e.target.elements.website && e.target.elements.website.value || "");
    fd.append("page", location.href);
    if (prefill?.caseId) fd.append("case_id", prefill.caseId);
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
  const tone = version === "b2" ? "sec--ink" : version === "b3" ? "" : "sec--blue";
  const bText = way ? wayLabel + (cval ? ": " + cval : "") : "";
  const steps = [!!(f.name && f.email), types.length > 0, !!(way && cval), !!(f.about && agree)];
  const done = steps.filter(Boolean).length;
  return /*#__PURE__*/React.createElement("section", {
    id: "brief",
    "data-screen-label": "09 Обсудить проект",
    className: "sec " + tone + " bv bv--" + version
  }, /*#__PURE__*/React.createElement(VariantSwitch, {
    label: "Обсудить проект",
    value: version,
    options: ["b1", "b2", "b3", "b4"],
    onChange: v => setVersion && setVersion(v)
  }), version === "b4" && !sharedBg ? /*#__PURE__*/React.createElement("div", {
    className: "bv-sig",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bv-sig__g"
  }), window.Noise ? /*#__PURE__*/React.createElement(window.Noise, {
    className: "bv-sig__n"
  }) : null) : null, version === "b3" ? /*#__PURE__*/React.createElement("div", {
    className: "bv-safe",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("span", {
    className: "bv-safe__x"
  })) : null, /*#__PURE__*/React.createElement("form", {
    className: "brief",
    "aria-labelledby": "brief-title",
    onSubmit: submit,
    noValidate: true
  }, /*#__PURE__*/React.createElement("input", {
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
  }), /*#__PURE__*/React.createElement("div", {
    className: "brief__head"
  }, /*#__PURE__*/React.createElement("h2", {
    id: "brief-title",
    className: "sec__title sec__title--tight u-pre rv"
  }, "Обсудить проект"), /*#__PURE__*/React.createElement("div", {
    className: "stack",
    style: {
      gap: "var(--sp-30)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "brief__lead u-pre rv",
    style: {
      "--d": "120ms"
    }
  }, "Расскажите о задаче, а мы соберём \nпод неё команду и вернёмся с идеей"), version === "b2" ? /*#__PURE__*/React.createElement(BriefMonitor, {
    f: f,
    type: typeText,
    budget: bText,
    files: files.length,
    done: done,
    sent: sent
  }) : null, version === "b3" ? /*#__PURE__*/React.createElement("div", {
    className: "bv-steps rv"
  }, ["Контакты", "Тип задачи", "Связь", "Детали"].map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s,
    className: "bv-steps__s" + (steps[i] ? " is-on" : "")
  }, /*#__PURE__*/React.createElement("span", null, String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("b", null, s), /*#__PURE__*/React.createElement("i", null)))) : null)), sent ? /*#__PURE__*/React.createElement("div", {
    className: "brief__body bv__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brief__done rv rv--in"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sec__title"
  }, "\u0421\u043F\u0430\u0441\u0438\u0431\u043E, ", f.name.split(" ")[0], "!"), /*#__PURE__*/React.createElement("span", {
    className: "t-body-l"
  }, "\u0417\u0430\u044F\u0432\u043A\u0430 \u0443\u0448\u043B\u0430 \u043A\u043E\u043C\u0430\u043D\u0434\u0435. \u041E\u0442\u0432\u0435\u0442\u0438\u043C \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 3 \u0440\u0430\u0431\u043E\u0447\u0438\u0445 \u0434\u043D\u0435\u0439 \u043D\u0430 ", f.email, "."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
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
      setWay("");
      setCv({});
      setAgree(false);
      setFiles([]);
    }
  }, "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0435\u0449\u0451 \u043E\u0434\u043D\u0443")))) : /*#__PURE__*/React.createElement("div", {
    className: "brief__body bv__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stack rv",
    style: {
      gap: "var(--sp-20)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "brief__pair"
  }, /*#__PURE__*/React.createElement(TextField, {
    label: "\u0418\u043C\u044F",
    required: true,
    placeholder: "\u041A\u0430\u043A \u043A \u0432\u0430\u043C \u043E\u0431\u0440\u0430\u0449\u0430\u0442\u044C\u0441\u044F",
    value: f.name,
    onChange: set("name"),
    error: err.name,
    autoComplete: "name"
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "\u041F\u043E\u0447\u0442\u0430",
    required: true,
    type: "email",
    placeholder: "name@company.ru",
    value: f.email,
    onChange: set("email"),
    error: err.email,
    autoComplete: "email"
  })), /*#__PURE__*/React.createElement("div", {
    className: "brief__pair"
  }, /*#__PURE__*/React.createElement(BriefContact, {
    way: way,
    value: cval,
    onWay: pickWay,
    onValue: v => {
      setCv(c => ({
        ...c,
        [way]: v
      }));
      if (err.contact) setErr({
        ...err,
        contact: null
      });
    },
    error: err.contact
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F",
    placeholder: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438",
    value: f.company,
    onChange: set("company"),
    autoComplete: "organization"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "brief__group rv"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brief__th"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brief__tt"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rg-field__label brief__tl"
  }, "\u0422\u0438\u043F \u0437\u0430\u0434\u0430\u0447\u0438"), /*#__PURE__*/React.createElement("span", {
    className: "brief__hint"
  }, "\u041C\u043E\u0436\u043D\u043E \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E")), /*#__PURE__*/React.createElement("span", {
    className: "brief__count" + (types.length ? " is-on" : ""),
    "aria-live": "polite",
    "aria-label": types.length ? "Выбрано: " + types.length : undefined
  }, types.length || "")), /*#__PURE__*/React.createElement("div", {
    className: "brief__chips brief__chips--6",
    role: "group",
    "aria-label": "\u0422\u0438\u043F \u0437\u0430\u0434\u0430\u0447\u0438"
  }, TYPES.map((t, i) => /*#__PURE__*/React.createElement(ChoiceChip, {
    key: t,
    selected: types.includes(i),
    "aria-pressed": types.includes(i),
    onClick: () => toggleType(i)
  }, t)))), /*#__PURE__*/React.createElement("div", {
    className: "stack rv",
    style: {
      gap: "var(--sp-40)"
    }
  }, /*#__PURE__*/React.createElement(TextField, {
    label: "\u041E \u0437\u0430\u0434\u0430\u0447\u0435",
    required: true,
    multiline: true,
    placeholder: "\u041F\u0430\u0440\u0430 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0439: \u0447\u0442\u043E \u0437\u0430 \u043F\u0440\u043E\u0435\u043A\u0442, \u043D\u0430 \u043A\u0430\u043A\u043E\u043C \u0432\u044B \u044D\u0442\u0430\u043F\u0435, \u0435\u0441\u0442\u044C \u043B\u0438 \u0441\u0440\u043E\u043A\u0438",
    value: f.about,
    onChange: set("about"),
    error: err.about
  }), /*#__PURE__*/React.createElement("div", {
    className: "brief__foot"
  }, /*#__PURE__*/React.createElement(Checkbox, {
    checked: agree,
    onChange: e => {
      setAgree(e.target.checked);
      setErr({
        ...err,
        agree: null
      });
    },
    error: err.agree
  }, "\u0414\u0430\u044E ", /*#__PURE__*/React.createElement("a", {
    href: "../legal/consent.html",
    target: "_blank",
    rel: "noopener",
    className: "rg-check__link",
    onClick: e => e.stopPropagation()
  }, "\u0441\u043E\u0433\u043B\u0430\u0441\u0438\u0435 \u043D\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445")), /*#__PURE__*/React.createElement(FileAttach, {
    files: files,
    onFiles: fs => {
      const ok = fs.filter(x => /\.(pdf|docx?|xlsx?|pptx?)$/i.test(x.name)),
        big = ok.filter(x => x.size > 20 * 1048576);
      if (ok.length < fs.length || big.length) alert("Можно прикрепить PDF, DOC, XLS, PPTX до 20 МБ" + (big.length ? ". Слишком большие: " + big.map(x => x.name).join(", ") : ""));
      setFiles(ok.filter(x => x.size <= 20 * 1048576));
    },
    accept: ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx",
    className: "brief-attach",
    label: React.createElement(React.Fragment, null, "Прикрепить бриф ", React.createElement("small", {
      className: "brief-attach__formats"
    }, "PDF, DOC, XLS, PPTX до 20 МБ"))
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "submit",
    type: "submit",
    disabled: busy
  }, busy ? "Отправляем…" : "Отправить"), /*#__PURE__*/React.createElement("span", {
    className: "brief__note"
  }, "\u041E\u0442\u0432\u0435\u0442\u0438\u043C \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 3 \u0440\u0430\u0431\u043E\u0447\u0438\u0445 \u0434\u043D\u0435\u0439")))));
}

// Footer — Figma «Скелет сайта» (desktop 81:609 → 1440×291, mobile 375×657).
function Footer({
  sharedBg = false
}) {
  const {
    Logo,
    Icon
  } = window.RGBYDS;
  return /*#__PURE__*/React.createElement("footer", {
    id: "contacts",
    "data-screen-label": "10 \u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B",
    className: "ftr"
  }, sharedBg ? null : /*#__PURE__*/React.createElement("div", {
    className: "ftr__cover",
    "aria-hidden": "true"
  }, window.Noise ? /*#__PURE__*/React.createElement(window.Noise, {
    className: "ftr__grain"
  }) : null, /*#__PURE__*/React.createElement("div", {
    className: "ftr__pl",
    "data-parallax-c": "0.28"
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      backgroundImage: "url(" + window.RGBY_DATA.img("hero-rg.webp") + ")"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "ftr__r1"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "ftr__title rv"
  }, "\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B"), /*#__PURE__*/React.createElement("div", {
    className: "ftr__near"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ftr__small"
  }, "\u041C\u044B \u0440\u044F\u0434\u043E\u043C"), /*#__PURE__*/React.createElement("div", {
    className: "ftr__links rv"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://t.me/hellorgby",
    target: "_blank",
    rel: "noopener"
  }, "@hellorgby"), /*#__PURE__*/React.createElement("a", {
    href: "mailto:hello@rgby.ru"
  }, "hello@rgby.ru"), /*#__PURE__*/React.createElement("a", {
    href: "tel:+78047007370"
  }, "+7(804) 700-73-70")))), /*#__PURE__*/React.createElement("div", {
    className: "ftr__r2"
  }, /*#__PURE__*/React.createElement("a", {
    className: "ftr__addr rv",
    href: "https://yandex.ru/maps/-/CXeoEX6e",
    target: "_blank",
    rel: "noopener",
    title: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0432 \u042F\u043D\u0434\u0435\u043A\u0441 \u041A\u0430\u0440\u0442\u0430\u0445"
  }, "Москва, Артплей, Нижняя\nСыромятническая 10с7,\nкорп. 7, 201.Б."), /*#__PURE__*/React.createElement("div", {
    className: "ftr__soc rv",
    style: {
      "--d": "100ms"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://t.me/rgby_feed",
    target: "_blank",
    rel: "noopener",
    "aria-label": "Telegram"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "telegram",
    style: {
      width: "calc(16 * var(--u))",
      height: "calc(13.3 * var(--u))",
      transform: "translateX(calc(-1 * var(--u)))"
    }
  })), /*#__PURE__*/React.createElement("a", {
    href: "https://vk.ru/hellorgby",
    target: "_blank",
    rel: "noopener",
    "aria-label": "VK"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "vk",
    style: {
      width: "calc(19 * var(--u))",
      height: "calc(12.7 * var(--u))"
    }
  })), /*#__PURE__*/React.createElement("a", {
    href: "https://www.instagram.com/hello_rgby",
    target: "_blank",
    rel: "noopener",
    "aria-label": "Instagram*"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 20 20",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    style: {
      width: "calc(18 * var(--u))",
      height: "calc(18 * var(--u))"
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: "1.5",
    y: "1.5",
    width: "17",
    height: "17",
    rx: "5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "10",
    cy: "10",
    r: "4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "15",
    cy: "5",
    r: ".6",
    fill: "currentColor"
  }))), /*#__PURE__*/React.createElement("a", {
    href: "https://www.behance.net/rgby",
    target: "_blank",
    rel: "noopener",
    "aria-label": "Behance",
    className: "ftr__soc-t"
  }, "B\u0113"), /*#__PURE__*/React.createElement("a", {
    href: "https://dprofile.ru/rgby",
    target: "_blank",
    rel: "noopener",
    "aria-label": "Dprofile",
    className: "ftr__soc-t"
  }, "Dp")), /*#__PURE__*/React.createElement("span", {
    className: "ftr__docs"
  }, /*#__PURE__*/React.createElement("a", {
    href: "../legal/policy.html",
    className: "ftr__policy"
  }, "\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445"), /*#__PURE__*/React.createElement("a", {
    href: "../legal/cookies.html",
    className: "ftr__policy"
  }, "\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 cookie-\u0444\u0430\u0439\u043B\u043E\u0432"))), /*#__PURE__*/React.createElement("div", {
    className: "ftr__r3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ftr__logo"
  }, /*#__PURE__*/React.createElement(Logo, {
    size: "footer",
    color: "var(--rgby-paper)"
  })), /*#__PURE__*/React.createElement("p", {
    className: "ftr__legal"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ftr__legal--d"
  }, "Информация, размещенная на настоящем сайте, носит исключительно\nсправочный характер и не является публичной офертой по смыслу ст. 437 ГК РФ.\n\nКомпания ООО «РГБИ» ИНН 5029275960 осуществляет деятельность исключительно в сегменте B2B:\nуслуги оказываются только юридическим лицам и индивидуальным предпринимателям. Физическим\nлицам (потребителям) услуги не предоставляются. Материалы сайта не адресованы потребителям\nи не предназначены для целей, предусмотренных законодательством о защите прав потребителей\n\n*Деятельность Meta Platforms Inc. (соцсети Facebook и Instagram) запрещена на территории Российской Федерации"), /*#__PURE__*/React.createElement("span", {
    className: "ftr__legal--m"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ftr__lp"
  }, "\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F, \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u043D\u0430\u044F \u043D\u0430 \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0435\u043C \u0441\u0430\u0439\u0442\u0435, \u043D\u043E\u0441\u0438\u0442 \u0438\u0441\u043A\u043B\u044E\u0447\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0441\u043F\u0440\u0430\u0432\u043E\u0447\u043D\u044B\u0439 \u0445\u0430\u0440\u0430\u043A\u0442\u0435\u0440 \u0438 \u043D\u0435 \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043F\u0443\u0431\u043B\u0438\u0447\u043D\u043E\u0439 \u043E\u0444\u0435\u0440\u0442\u043E\u0439 \u043F\u043E \u0441\u043C\u044B\u0441\u043B\u0443 \u0441\u0442. 437 \u0413\u041A \u0420\u0424."), /*#__PURE__*/React.createElement("span", {
    className: "ftr__lp"
  }, "\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F \u041E\u041E\u041E \xAB\u0420\u0413\u0411\u0418\xBB \u0418\u041D\u041D 5029275960 \u043E\u0441\u0443\u0449\u0435\u0441\u0442\u0432\u043B\u044F\u0435\u0442 \u0434\u0435\u044F\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u0438\u0441\u043A\u043B\u044E\u0447\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0432 \u0441\u0435\u0433\u043C\u0435\u043D\u0442\u0435 B2B: \u0443\u0441\u043B\u0443\u0433\u0438 \u043E\u043A\u0430\u0437\u044B\u0432\u0430\u044E\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u044E\u0440\u0438\u0434\u0438\u0447\u0435\u0441\u043A\u0438\u043C \u043B\u0438\u0446\u0430\u043C \u0438 \u0438\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u044B\u043C \u043F\u0440\u0435\u0434\u043F\u0440\u0438\u043D\u0438\u043C\u0430\u0442\u0435\u043B\u044F\u043C. \u0424\u0438\u0437\u0438\u0447\u0435\u0441\u043A\u0438\u043C \u043B\u0438\u0446\u0430\u043C (\u043F\u043E\u0442\u0440\u0435\u0431\u0438\u0442\u0435\u043B\u044F\u043C) \u0443\u0441\u043B\u0443\u0433\u0438 \u043D\u0435 \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u044E\u0442\u0441\u044F. \u041C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B \u0441\u0430\u0439\u0442\u0430 \u043D\u0435 \u0430\u0434\u0440\u0435\u0441\u043E\u0432\u0430\u043D\u044B \u043F\u043E\u0442\u0440\u0435\u0431\u0438\u0442\u0435\u043B\u044F\u043C \u0438 \u043D\u0435 \u043F\u0440\u0435\u0434\u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u044B \u0434\u043B\u044F \u0446\u0435\u043B\u0435\u0439, \u043F\u0440\u0435\u0434\u0443\u0441\u043C\u043E\u0442\u0440\u0435\u043D\u043D\u044B\u0445 \u0437\u0430\u043A\u043E\u043D\u043E\u0434\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u043E\u043C \u043E \u0437\u0430\u0449\u0438\u0442\u0435 \u043F\u0440\u0430\u0432 \u043F\u043E\u0442\u0440\u0435\u0431\u0438\u0442\u0435\u043B\u0435\u0439."), /*#__PURE__*/React.createElement("span", {
    className: "ftr__lp"
  }, "*\u0414\u0435\u044F\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C Meta Platforms Inc. (\u0441\u043E\u0446\u0441\u0435\u0442\u0438 Facebook \u0438 Instagram) \u0437\u0430\u043F\u0440\u0435\u0449\u0435\u043D\u0430 \u043D\u0430 \u0442\u0435\u0440\u0440\u0438\u0442\u043E\u0440\u0438\u0438 \u0420\u043E\u0441\u0441\u0438\u0439\u0441\u043A\u043E\u0439 \u0424\u0435\u0434\u0435\u0440\u0430\u0446\u0438\u0438"))), /*#__PURE__*/React.createElement("p", {
    className: "ftr__entity"
  }, "ООО «РГБИ» · ОГРН 1235000044146 · ИНН 5029275960\n105120, г. Москва, ул. Нижняя Сыромятническая, д. 10, стр. 7")));
}

// Shared background for «Обсудить проект» b4 + «Контакты»: one ink field, one drifting gradient, one grain, RG graphic spanning the join.
function TailBg() {
  return /*#__PURE__*/React.createElement("div", {
    className: "tail__bg",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("i", {
    className: "tail__g"
  }), /*#__PURE__*/React.createElement("div", {
    className: "tail__rg",
    "data-parallax-c": "0.22"
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      backgroundImage: "url(" + window.RGBY_DATA.img("hero-rg.webp") + ")"
    }
  }), /*#__PURE__*/React.createElement("i", {
    className: "tail__rgb",
    style: {
      backgroundImage: "url(" + window.RGBY_DATA.img("hero-rg.webp") + ")"
    }
  })), /*#__PURE__*/React.createElement("i", {
    className: "tail__top"
  }), /*#__PURE__*/React.createElement("i", {
    className: "tail__veil"
  }), window.Noise ? /*#__PURE__*/React.createElement(window.Noise, {
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
