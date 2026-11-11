// RGBY · страница «Проекты» (релиз 2026-10-14.13): все опубликованные кейсы из общей базы content/cases/cases.js.
// Фильтр по направлению (чипы со счётчиками) и по клиенту; окно кейса — общий CaseModal (landing/sections-mid), листается внутри фильтра.
// Фильтр и открытый кейс живут в адресе (?dir=tv&client=…&case=k1) — ссылкой можно поделиться. Новые кейсы появляются сами: status "published" в базе.
var PJ_DIRS = [["ТВ/Медиа", "tv"], ["Брендинг", "branding"], ["Продакшн", "production"], ["Мультимедиа", "multimedia"], ["Веб", "web"], ["R&D", "rnd"]];
var pjPlural = n => {
  var a = n % 10,
    b = n % 100;
  return n + " " + (a === 1 && b !== 11 ? "проект" : a >= 2 && a <= 4 && (b < 12 || b > 14) ? "проекта" : "проектов");
};
// Шапка и форма берут VariantSwitch из страницы; здесь переключателей вариантов нет
function VariantSwitch() {
  return null;
}
var pjGo = h => {
  var el = document.querySelector(h);
  if (!el) return;
  (window.__scrollTo || window.scrollTo.bind(window))(el.getBoundingClientRect().top + scrollY - 40);
};
window.mainGo = window.mainGo || pjGo;
window.NAV = [];

// Кейсы в формате окна кейса (как в landing/data.js), но все направления, а не только ТВ/Медиа
function pjCases() {
  var img = window.RGBY_DATA.img,
    PH = ["case-k1-a.jpg", "case-k1-b.jpg", "case-k1-c.jpg", "hero-still.jpg"];
  var asImg = v => !v ? "" : /^(https?:|data:|\.|\/)/.test(v) ? v : img(v);
  var L = (window.RGBY_CASES && window.RGBY_CASES.list || []).filter(c => c.status === "published");
  return L.map((c, i) => ({
    id: c.id,
    year: c.year,
    title: c.title,
    client: c.client,
    category: c.category,
    primary: c.primary,
    short: c.short,
    description: (c.description || []).join("\n\n"),
    services: (c.deliverables || []).join(", "),
    cover: asImg(c.media.cover) || img(PH[i % PH.length]),
    placeholder: !c.media.cover,
    gallery: (c.media.gallery || []).map(asImg),
    video: c.media.video,
    format: c.media.format,
    directions: c.directions || [],
    flagship: c.flagship,
    links: c.links,
    awards: c.awards
  }));
}
var pjQuery = () => {
  var q = new URLSearchParams(location.search);
  return {
    dir: q.get("dir") || "",
    client: q.get("client") || "",
    open: q.get("case") || ""
  };
};
function pjWrite(s) {
  var q = new URLSearchParams(location.search);
  [["dir", s.dir], ["client", s.client], ["case", s.open]].forEach(([k, v]) => {
    if (v) q.set(k, v);else q.delete(k);
  });
  var qs = q.toString();
  try {
    history.replaceState(null, "", location.pathname + (qs ? "?" + qs : "") + location.hash);
  } catch (e) {}
}

// Тяжёлый скролл и размытие RG в подвале — как на главной (main-app); настройки скролла — опубликованные для главной (content/settings/main.js)
function usePjHeavyScroll(enabled, weight, speed) {
  enabled = enabled && !document.documentElement.classList.contains("is-touch");
  var cfg = React.useRef({
    weight,
    speed
  });
  cfg.current = {
    weight,
    speed
  };
  React.useEffect(() => {
    var root = document.documentElement;
    var target = scrollY,
      cur = target,
      raf = 0,
      ours = false,
      lt = 0;
    var max = () => root.scrollHeight - innerHeight;
    var loop = now => {
      var dt = lt ? Math.min(64, now - lt) : 16.7;
      lt = now;
      var k0 = .2 - cfg.current.weight / 100 * .185,
        k = 1 - Math.pow(1 - k0, dt / 16.7);
      cur += (target - cur) * k;
      if (Math.abs(target - cur) < .4) cur = target;
      ours = true;
      scrollTo(0, cur);
      if (cur !== target) raf = requestAnimationFrame(loop);else {
        raf = 0;
        lt = 0;
      }
    };
    var kick = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };
    var onWheel = e => {
      if (!enabled || e.ctrlKey || root.style.overflow === "hidden") return;
      if (e.target.closest && e.target.closest("[data-lenis-prevent], .rg-modal, select")) return;
      e.preventDefault();
      var d = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? innerHeight : 1) * cfg.current.speed;
      target = Math.max(0, Math.min(max(), target + d));
      kick();
    };
    var onScroll = () => {
      if (ours) {
        ours = false;
        return;
      }
      if (!raf) target = cur = scrollY;
    };
    window.__scrollTo = y => {
      y = Math.max(0, Math.min(max(), y));
      if (!enabled) {
        scrollTo({
          top: y,
          behavior: "smooth"
        });
        return;
      }
      target = y;
      kick();
    };
    root.classList.toggle("heavy", enabled);
    var onTouch = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
      target = cur = scrollY;
    };
    addEventListener("touchstart", onTouch, {
      passive: true
    });
    addEventListener("wheel", onWheel, {
      passive: false
    });
    addEventListener("scroll", onScroll, {
      passive: true
    });
    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("heavy");
      removeEventListener("touchstart", onTouch);
      removeEventListener("wheel", onWheel);
      removeEventListener("scroll", onScroll);
    };
  }, [enabled]);
}
function usePjTailBlur() {
  React.useEffect(() => {
    var raf = 0;
    var f = () => {
      raf = 0;
      var trg = document.querySelector(".tail__rg i:not(.tail__rgb)"),
        trb = document.querySelector(".tail__rgb");
      if (!trg) return;
      var TOUCH = document.documentElement.classList.contains("is-touch"),
        vh = innerHeight,
        tail = trg.closest(".tail"),
        max = document.documentElement.scrollHeight - vh;
      var start = Math.max(0, tail.getBoundingClientRect().top + scrollY - vh),
        p = Math.min(1, Math.max(0, (scrollY - start) / Math.max(1, max - start)));
      var q = Math.min(1, Math.max(0, (p - .35) / .65)),
        e = q * q * (3 - 2 * q);
      if (TOUCH) {
        trg.style.filter = "";
        if (trb) trb.style.opacity = e.toFixed(3);
      } else {
        trg.style.filter = "blur(" + (40 + e * 50).toFixed(1) + "px) brightness(" + (1.08 + e * .27).toFixed(3) + ") saturate(" + (1.1 + e * .15).toFixed(3) + ")";
        if (trb) trb.style.opacity = "0";
      }
      var lift = Math.max(0, tail.getBoundingClientRect().bottom - vh);
      trg.style.transform = TOUCH ? "" : "translate3d(0," + (-lift).toFixed(1) + "px,0) scale(" + (1.18 + e * .3).toFixed(4) + ")";
      var veil = tail.querySelector(".tail__veil");
      if (veil) veil.style.opacity = ((.7 + .3 * p) * .35).toFixed(3);
    };
    var q = () => {
      if (!raf) raf = requestAnimationFrame(f);
    };
    f();
    var t = setTimeout(f, 300);
    addEventListener("scroll", q, {
      passive: true
    });
    addEventListener("resize", q);
    var ro = new ResizeObserver(() => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
      f();
    });
    ro.observe(document.body);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
      ro.disconnect();
      removeEventListener("scroll", q);
      removeEventListener("resize", q);
    };
  }, []);
}
// Проявление общих блоков (форма, подвал: классы .rv, .rv-clip) — как useMainReveal на главной; без него они остаются невидимыми
function usePjRevealRv() {
  React.useEffect(() => {
    var SEL = ".rv:not(.rv--in),.rv-clip:not(.rv--in)",
      seen = new WeakSet(),
      done = new WeakSet();
    var io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting || e.boundingClientRect.top < 0) {
        e.target.classList.add("rv--in");
        done.add(e.target);
        io.unobserve(e.target);
      }
    }), {
      rootMargin: "0px 0px -8% 0px"
    });
    var raf = 0;
    var scan = () => {
      raf = 0;
      document.querySelectorAll(SEL).forEach(el => {
        if (done.has(el)) el.classList.add("rv--in");else if (!seen.has(el)) {
          seen.add(el);
          io.observe(el);
        }
      });
    };
    scan();
    var mo = new MutationObserver(() => {
      if (!raf) raf = requestAnimationFrame(scan);
    });
    mo.observe(document.getElementById("root"), {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class"]
    });
    return () => {
      mo.disconnect();
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);
}
// Карточки проявляются, когда доезжают до экрана; после смены фильтра — заново, лесенкой
function usePjReveal(key) {
  React.useEffect(() => {
    var io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting || e.boundingClientRect.top < 0) {
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      }
    }), {
      rootMargin: "0px 0px -6% 0px"
    });
    document.querySelectorAll(".pg-c:not(.is-in)").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [key]);
}
function PjHeader() {
  var {
      Logo,
      Button
    } = window.RGBYDS,
    Burger = window.MenuBurger;
  return /*#__PURE__*/React.createElement("header", {
    className: "m-hdr m-hdr--paper"
  }, /*#__PURE__*/React.createElement("a", {
    href: "../main/index.html",
    "aria-label": "RGBY \u2014 \u043D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E",
    className: "m-hdr__logo"
  }, /*#__PURE__*/React.createElement(Logo, {
    color: "currentColor"
  })), /*#__PURE__*/React.createElement("div", {
    className: "m-hdr__r"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "blue",
    size: "m",
    onClick: () => pjGo("#brief")
  }, "\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442"), Burger ? /*#__PURE__*/React.createElement(Burger, {
    color: "currentColor"
  }) : null));
}
function PjCard({
  c,
  i,
  onOpen
}) {
  var alt = c.gallery.find(g => g && g !== c.cover);
  return /*#__PURE__*/React.createElement("li", {
    className: "pg-c" + (c.format === "vertical" ? " pg-c--v" : ""),
    style: {
      "--i": i % 6
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "?case=" + c.id,
    className: "pg-c__a",
    onClick: e => {
      e.preventDefault();
      onOpen(c.id);
    },
    "aria-label": c.title + " — " + c.client
  }, /*#__PURE__*/React.createElement("span", {
    className: "pg-c__m"
  }, /*#__PURE__*/React.createElement("img", {
    className: "pg-c__img",
    src: c.cover,
    alt: "",
    loading: i < 4 ? "eager" : "lazy",
    decoding: "async"
  }), alt ? /*#__PURE__*/React.createElement("img", {
    className: "pg-c__img pg-c__img--2",
    src: alt,
    alt: "",
    loading: "lazy",
    decoding: "async"
  }) : null, /*#__PURE__*/React.createElement("span", {
    className: "pg-c__go t-label",
    "aria-hidden": "true"
  }, "\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043A\u0435\u0439\u0441 ", /*#__PURE__*/React.createElement("span", null, "\u2192"))), /*#__PURE__*/React.createElement("span", {
    className: "pg-c__meta t-meta"
  }, /*#__PURE__*/React.createElement("b", null, c.client), c.year ? /*#__PURE__*/React.createElement("span", null, c.year) : null), /*#__PURE__*/React.createElement("span", {
    className: "pg-c__t"
  }, c.title), /*#__PURE__*/React.createElement("span", {
    className: "pg-c__d"
  }, c.short), /*#__PURE__*/React.createElement("span", {
    className: "pg-c__tags"
  }, c.directions.map(d => /*#__PURE__*/React.createElement("span", {
    key: d,
    className: d === c.primary ? "is-main" : ""
  }, d)))));
}
function ProjectsApp() {
  var S = (window.RGBY_SETTINGS || {}).main || {};
  usePjHeavyScroll(S.heavyScroll !== false, S.scrollWeight != null ? S.scrollWeight : 95, S.wheelSpeed != null ? S.wheelSpeed : 1.4);
  usePjTailBlur();
  usePjRevealRv();
  React.useEffect(() => {
    document.body.classList.add("hide-vsw");
  }, []);
  // полоса фильтра прилипает под липкой шапкой, когда та видна
  React.useEffect(() => {
    var s = document.querySelector(".sticky"),
      f = () => document.documentElement.style.setProperty("--pg-st", s && s.classList.contains("sticky--on") ? s.offsetHeight + "px" : "0px");
    var mo = new MutationObserver(f);
    if (s) mo.observe(s, {
      attributes: true,
      attributeFilter: ["class"]
    });
    f();
    addEventListener("resize", f);
    return () => {
      mo.disconnect();
      removeEventListener("resize", f);
    };
  }, []);
  var all = React.useMemo(pjCases, []);
  var [st, setSt] = React.useState(pjQuery);
  var set = p => setSt(s => {
    var n = {
      ...s,
      ...p
    };
    pjWrite(n);
    return n;
  });
  var clients = React.useMemo(() => [...new Set(all.map(c => c.client))].sort((a, b) => a.localeCompare(b, "ru")), [all]);
  var dirName = (PJ_DIRS.find(d => d[1] === st.dir) || [])[0] || "";
  var client = clients.includes(st.client) ? st.client : "";
  var byClient = all.filter(c => !client || c.client === client);
  var list = byClient.filter(c => !dirName || c.directions.includes(dirName));
  var dirs = PJ_DIRS.map(([t, s]) => [t, s, byClient.filter(c => c.directions.includes(t)).length, all.some(c => c.directions.includes(t))]).filter(d => d[3]);
  var fkey = st.dir + "|" + client;
  usePjReveal(fkey);
  // телефон: чипы в одну строку с прокруткой — выбранный подкатываем в середину строки
  React.useEffect(() => {
    var c = document.querySelector(".pg-chip[aria-pressed=\"true\"]"),
      w = c && c.parentElement;
    if (!w || w.scrollWidth <= w.clientWidth + 1) return;
    var cr = c.getBoundingClientRect(),
      wr = w.getBoundingClientRect();
    w.scrollTo({
      left: Math.max(0, w.scrollLeft + cr.left - wr.left - (w.clientWidth - cr.width) / 2),
      behavior: "smooth"
    });
  }, [dirName]);
  // окно кейса листает только то, что сейчас в фильтре
  var idx = st.open ? list.findIndex(c => c.id === st.open) : -1;
  var open = id => set({
    open: id
  });
  var filtered = !!(dirName || client);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SiteSticky, {
    onBrief: () => pjGo("#brief"),
    label: "\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442"
  }), /*#__PURE__*/React.createElement(Menu, {
    go: pjGo,
    anim: "crt",
    hover: "vhs",
    bg: "light",
    glitch: "step"
  }), /*#__PURE__*/React.createElement("main", {
    className: "pg"
  }, /*#__PURE__*/React.createElement("section", {
    id: "top",
    className: "pg-top",
    "data-screen-label": "01 \u041F\u0440\u043E\u0435\u043A\u0442\u044B"
  }, /*#__PURE__*/React.createElement(PjHeader, null), /*#__PURE__*/React.createElement("nav", {
    className: "pg-crumbs t-meta",
    "aria-label": "\u0412\u044B \u0437\u0434\u0435\u0441\u044C"
  }, /*#__PURE__*/React.createElement("a", {
    href: "../main/index.html"
  }, "\u0413\u043B\u0430\u0432\u043D\u0430\u044F"), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "/"), /*#__PURE__*/React.createElement("span", {
    "aria-current": "page"
  }, "\u041F\u0440\u043E\u0435\u043A\u0442\u044B")), /*#__PURE__*/React.createElement("div", {
    className: "pg-top__row"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "pg-h"
  }, "\u041F\u0440\u043E\u0435\u043A\u0442\u044B", /*#__PURE__*/React.createElement("sup", {
    className: "pg-h__n"
  }, all.length)), /*#__PURE__*/React.createElement("p", {
    className: "pg-lead t-body-l"
  }, "\u0410\u0439\u0434\u0435\u043D\u0442\u0438\u043A\u0430 \u0438 \u044D\u0444\u0438\u0440 \u0442\u0435\u043B\u0435\u043A\u0430\u043D\u0430\u043B\u043E\u0432, \u0431\u0440\u0435\u043D\u0434\u0438\u043D\u0433, \u043F\u0440\u043E\u0434\u0430\u043A\u0448\u043D \u0438 \u0431\u043E\u043B\u044C\u0448\u0438\u0435 \u044D\u043A\u0440\u0430\u043D\u044B. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u043A\u0435\u0439\u0441 \u2014 \u0432\u043D\u0443\u0442\u0440\u0438 \u0437\u0430\u0434\u0430\u0447\u0430, \u0440\u0435\u0448\u0435\u043D\u0438\u0435 \u0438 \u0447\u0442\u043E \u043C\u044B \u0441\u0434\u0435\u043B\u0430\u043B\u0438."))), /*#__PURE__*/React.createElement("section", {
    className: "pg-list",
    "aria-label": "\u0421\u043F\u0438\u0441\u043E\u043A \u043F\u0440\u043E\u0435\u043A\u0442\u043E\u0432"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pg-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pg-chips",
    role: "group",
    "aria-label": "\u041D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "pg-chip",
    "aria-pressed": !dirName,
    onClick: () => set({
      dir: ""
    })
  }, "\u0412\u0441\u0435", /*#__PURE__*/React.createElement("sup", null, byClient.length)), dirs.map(([t, s, n]) => /*#__PURE__*/React.createElement("button", {
    key: s,
    type: "button",
    className: "pg-chip",
    "aria-pressed": dirName === t,
    disabled: !n && dirName !== t,
    onClick: () => set({
      dir: dirName === t ? "" : s
    })
  }, t, /*#__PURE__*/React.createElement("sup", null, n)))), /*#__PURE__*/React.createElement("label", {
    className: "pg-sel" + (client ? " is-on" : "")
  }, /*#__PURE__*/React.createElement("span", {
    className: "pg-sr"
  }, "\u041A\u043B\u0438\u0435\u043D\u0442"), /*#__PURE__*/React.createElement("select", {
    value: client,
    onChange: e => set({
      client: e.target.value
    })
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u0412\u0441\u0435 \u043A\u043B\u0438\u0435\u043D\u0442\u044B"), clients.map(c => /*#__PURE__*/React.createElement("option", {
    key: c,
    value: c
  }, c))), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 10 6",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 1l4 4 4-4",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "pg-sum t-meta",
    "aria-live": "polite"
  }, /*#__PURE__*/React.createElement("span", null, filtered ? "Найдено: " + pjPlural(list.length) : pjPlural(list.length)), filtered ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "pg-reset",
    onClick: () => set({
      dir: "",
      client: ""
    })
  }, "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u0444\u0438\u043B\u044C\u0442\u0440 \xD7") : null), list.length ? /*#__PURE__*/React.createElement("ul", {
    className: "pg-grid",
    key: fkey
  }, list.map((c, i) => /*#__PURE__*/React.createElement(PjCard, {
    key: c.id,
    c: c,
    i: i,
    onOpen: open
  }))) : /*#__PURE__*/React.createElement("div", {
    className: "pg-empty"
  }, /*#__PURE__*/React.createElement("p", {
    className: "t-body-l"
  }, "\u041F\u043E\u0434 \u044D\u0442\u043E\u0442 \u0444\u0438\u043B\u044C\u0442\u0440 \u043F\u0440\u043E\u0435\u043A\u0442\u043E\u0432 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442."), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "pg-reset",
    onClick: () => set({
      dir: "",
      client: ""
    })
  }, "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0432\u0441\u0435 \u043F\u0440\u043E\u0435\u043A\u0442\u044B")))), /*#__PURE__*/React.createElement("div", {
    className: "tail tail--b4 tail--light"
  }, /*#__PURE__*/React.createElement(TailBg, null), /*#__PURE__*/React.createElement(Brief, {
    budgetMode: "range",
    setBudgetMode: () => {},
    version: "b4",
    setVersion: () => {},
    sharedBg: true
  }), /*#__PURE__*/React.createElement(Footer, {
    sharedBg: true
  })), window.CaseModal ? /*#__PURE__*/React.createElement(CaseModal, {
    cases: list,
    index: idx >= 0 ? idx : null,
    onClose: () => set({
      open: ""
    }),
    onNav: d => {
      if (idx >= 0) set({
        open: list[(idx + d + list.length) % list.length].id
      });
    },
    onDiscuss: () => {
      set({
        open: ""
      });
      setTimeout(() => pjGo("#brief"), 350);
    }
  }) : null);
}
window.__rgbyPreloaded = true;
window.__dsReady.then(() => ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(ProjectsApp, null))).catch(e => {
  document.getElementById("root").textContent = "Ошибка загрузки: " + e.message;
  console.error(e);
});
