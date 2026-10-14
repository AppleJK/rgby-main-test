// RGBY · app.jsx.txt · сборка 2026-10-14
var TWEAK_DEFAULTS = {
  "heavyScroll": true,
  "scrollWeight": 70,
  "wheelSpeed": 0.8,
  "tailShade": 15,
  "reveal": true,
  "parallax": true,
  "showSwitchers": true,
  "showCms": true,
  "hero": "v1",
  "heroCover": true,
  "heroMotion": "signal",
  "heroBand": "breathe",
  "heroAuto": true,
  "cursorOn": true,
  "cursor": "cross",
  "cursorTone": "adaptive",
  "heroInterval": 6,
  "menuAnim": "crt",
  "menuHover": "vhs",
  "menuBg": "light",
  "menuGlitch": "step",
  "stats": "v1",
  "statsFill": "ink",
  "why": "v4",
  "services": "v1",
  "servicesNew": "n3",
  "awards": "v1",
  "awardsTone": "ink",
  "clients": "v5",
  "team": "v1",
  "staffView": "tabs",
  "showStaff": false,
  "briefV": "b4",
  "tailBlur": true,
  "awardsX": "—",
  "budget": "range",
  "notice": "card",
  "preloader": "C",
  "plExit": "crt",
  "plLine": "white",
  "plTheme": "light"
};
function useHeavyScroll(enabled, weight, speed) {
  enabled = enabled && !window.__RGBY_TUNE && !document.documentElement.classList.contains("is-touch");
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
    var target = window.scrollY,
      cur = target,
      raf = 0,
      ours = false;
    var max = () => root.scrollHeight - window.innerHeight;
    var loop = () => {
      var k = 0.2 - cfg.current.weight / 100 * 0.185;
      cur += (target - cur) * k;
      if (Math.abs(target - cur) < 0.4) cur = target;
      ours = true;
      window.scrollTo(0, cur);
      raf = cur !== target ? requestAnimationFrame(loop) : 0;
    };
    var kick = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };
    var onWheel = e => {
      if (!enabled || e.ctrlKey || root.style.overflow === "hidden") return;
      if (e.target.closest && e.target.closest("[data-lenis-prevent], .twk-panel, [class*='tweak']")) return;
      e.preventDefault();
      var d = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1) * cfg.current.speed;
      target = Math.max(0, Math.min(max(), target + d));
      kick();
    };
    var onScroll = () => {
      if (ours) {
        ours = false;
        return;
      }
      if (!raf) {
        target = cur = window.scrollY;
      }
    };
    window.__scrollTo = y => {
      y = Math.max(0, Math.min(max(), y));
      if (!enabled) {
        window.scrollTo({
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
      target = cur = window.scrollY;
    };
    window.addEventListener("touchstart", onTouch, {
      passive: true
    });
    window.addEventListener("wheel", onWheel, {
      passive: false
    });
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
    };
  }, [enabled]);
}
function useReveal(on) {
  React.useEffect(() => {
    document.body.classList.toggle("no-anim", !on);
    if (!on) return;
    var seen = new WeakSet();
    var raf = 0;
    var scan = () => {
      raf = 0;
      if (document.documentElement.hasAttribute("data-preloading")) return;
      var vh = window.innerHeight;
      var TOUCH = document.documentElement.classList.contains("is-touch");
      var trg = document.querySelector(".tail__rg i:not(.tail__rgb)"),
        trb = document.querySelector(".tail__rgb");
      if (trg) {
        if (!window.__tailBlur) {
          trg.style.filter = "";
        } else {
          var tail = trg.closest(".tail"),
            max = document.documentElement.scrollHeight - vh;
          var start = Math.max(0, tail.getBoundingClientRect().top + scrollY - vh);
          var p = Math.min(1, Math.max(0, (scrollY - start) / Math.max(1, max - start)));
          var q = Math.min(1, Math.max(0, (p - .35) / .65)),
            e = q * q * (3 - 2 * q);
          if (TOUCH) {
            trg.style.filter = "";
            if (trb) trb.style.opacity = e.toFixed(3);
          } else {
            trg.style.filter = "blur(" + (e * 80).toFixed(1) + "px) brightness(" + (1 + e * .35).toFixed(3) + ") saturate(" + (1 + e * .25).toFixed(3) + ")";
            if (trb) trb.style.opacity = "0";
          }
          var tr = tail.getBoundingClientRect();
          var lift = Math.max(0, tr.bottom - vh);
          if (TOUCH) {
            trg.style.transform = "";
            if (trb) trb.style.transform = "";
          } else trg.style.transform = "translate3d(0," + (-lift).toFixed(1) + "px,0) scale(" + (1 + e * .42).toFixed(4) + ")";
          var veil = tail.querySelector(".tail__veil");
          if (veil) veil.style.opacity = ((.7 + .3 * p) * (window.__tailShade == null ? .35 : window.__tailShade)).toFixed(3);
        }
      }
      document.querySelectorAll("[data-parallax-c]").forEach(el => {
        if (!on || TOUCH) {
          el.style.transform = "";
          return;
        }
        var r = el.parentElement.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        var off = Math.max(0, r.bottom - vh);
        el.style.transform = "translate3d(0," + (off * parseFloat(el.dataset.parallaxC)).toFixed(1) + "px,0)";
      });
      document.querySelectorAll(".rv:not(.rv--in), .rv-clip:not(.rv--in)").forEach(el => {
        var r = el.getBoundingClientRect();
        if (r.top < vh * 0.94 && r.bottom > -vh * 0.5) {
          el.classList.add("rv--in");
          seen.add(el);
        } else if (r.bottom <= -vh * 0.5) {
          el.classList.add("rv--in");
          seen.add(el);
        }
      });
    };
    var req = () => {
      if (!raf) raf = requestAnimationFrame(scan);
    };
    scan();
    var mo = new MutationObserver(list => {
      for (var m of list) if (m.type === "attributes" && seen.has(m.target) && !m.target.classList.contains("rv--in") && !document.documentElement.hasAttribute("data-preloading")) m.target.classList.add("rv--in");
      req();
    });
    mo.observe(document.getElementById("root"), {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class"]
    });
    window.addEventListener("rgby:preloaded", req);
    window.addEventListener("scroll", req, {
      passive: true
    });
    window.addEventListener("resize", req);
    var iv = setInterval(scan, 600);
    return () => {
      mo.disconnect();
      clearInterval(iv);
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", req);
      window.removeEventListener("resize", req);
    };
  }, [on]);
}
function useParallax(on, setSticky) {
  React.useEffect(() => {
    var raf = 0;
    var tick = () => {
      raf = 0;
      var els = document.querySelectorAll("[data-parallax]");
      var TOUCHP = document.documentElement.classList.contains("is-touch");
      els.forEach(el => {
        if (!on || TOUCHP) {
          el.style.transform = "";
          return;
        }
        var p = el.parentElement.getBoundingClientRect();
        if (p.bottom < -200 || p.top > window.innerHeight + 200) return;
        el.style.transform = "translate3d(0," + (-p.top * parseFloat(el.dataset.parallax)).toFixed(1) + "px,0)";
      });
      var vh = window.innerHeight;
      document.querySelectorAll(".cases").forEach(grid => {
        var cols = [...grid.querySelectorAll(":scope > .cases__col")];
        if (!on || cols.length < 2 || window.innerWidth < 600) {
          cols.forEach(c => c.style.transform = "");
          return;
        }
        var r = grid.getBoundingClientRect();
        if (r.bottom < -vh || r.top > vh * 2) return;
        var hs = cols.map(c => c.offsetHeight);
        var H = Math.max(...hs);
        var start = vh * 0.15,
          travel = Math.max(1, H - vh * 0.7);
        var p = Math.min(1, Math.max(0, (start - r.top) / travel));
        var e = p * p * (3 - 2 * p);
        cols.forEach((c, k) => {
          c.style.transform = "translate3d(0," + ((H - hs[k]) * e).toFixed(1) + "px,0)";
        });
      });
      var hero = document.getElementById("top");
      setSticky(hero ? hero.getBoundingClientRect().bottom < 0 : false);
    };
    var req = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", req, {
      passive: true
    });
    window.addEventListener("resize", req);
    tick();
    return () => {
      window.removeEventListener("scroll", req);
      window.removeEventListener("resize", req);
      cancelAnimationFrame(raf);
    };
  }, [on]);
}
function App() {
  var PROD = !!window.__RGBY_PROD,
    ADMIN = PROD && /[?&]admin(=|&|$)/.test(location.search);
  var TUNE = !!window.__RGBY_TUNE;
  var pubCfg = React.useMemo(() => {
    if (PROD || TUNE) return {};
    try {
      return (JSON.parse(localStorage.getItem("rgby-tune-pub-v1") || "null") || {}).cfg || {};
    } catch (e) {
      return {};
    }
  }, []);
  var [t0, setTweak] = useTweaks(PROD ? {
    ...TWEAK_DEFAULTS,
    ...(window.RGBY_CONFIG || {})
  } : {
    ...TWEAK_DEFAULTS,
    ...pubCfg
  });
  var [tcfg, setTcfg] = React.useState(() => window.__RGBY_CFG || {});
  var t = PROD ? {
    ...t0,
    ...(window.RGBY_CONFIG || {}),
    showSwitchers: ADMIN,
    showCms: ADMIN
  } : TUNE ? {
    ...TWEAK_DEFAULTS,
    ...tcfg,
    showSwitchers: false,
    showCms: false
  } : t0;
  window.__RGBY_BASE = TWEAK_DEFAULTS;
  var exportConfig = () => {
    var keep = {
      ...t0
    };
    delete keep.showSwitchers;
    delete keep.showCms;
    var b = new Blob([JSON.stringify(keep, null, 2)], {
      type: "application/json"
    });
    var l = document.createElement("a");
    l.href = URL.createObjectURL(b);
    l.download = "site.config.json";
    l.click();
  };
  var D = window.RGBY_DATA;
  var [data, setDataRaw] = React.useState(() => D.cms.load());
  var [cmsOpen, setCmsOpen] = React.useState(false);
  var [sticky, setSticky] = React.useState(false);
  var [caseIdx, setCaseIdx] = React.useState(null);
  var [prefill, setPrefill] = React.useState({
    n: 0,
    text: ""
  });
  var [noticeOpen, setNoticeOpen] = React.useState(false);
  React.useEffect(() => {
    var x;
    var arm = () => {
      clearTimeout(x);
      if (window.__rgbyCookiePending) return;
      x = setTimeout(() => setNoticeOpen(true), 2200);
    };
    var hide = () => {
      clearTimeout(x);
      setNoticeOpen(false);
    };
    if (window.__rgbyPreloaded !== false) arm();
    window.addEventListener("rgby:preloaded", arm);
    window.addEventListener("rgby:preloading", hide);
    window.addEventListener("rgby:cookies-done", arm);
    return () => {
      clearTimeout(x);
      window.removeEventListener("rgby:preloaded", arm);
      window.removeEventListener("rgby:preloading", hide);
      window.removeEventListener("rgby:cookies-done", arm);
    };
  }, []);
  var [toast, setToast] = React.useState("");
  var [plKey, setPlKey] = React.useState(0);
  var [plOn, setPlOn] = React.useState(t.preloader !== "off" && !window.__RGBY_TUNE && !window.__RGBY_NOPL);
  React.useEffect(() => {
    if (t.preloader === "off" && !window.__rgbyPreloaded) {
      document.documentElement.removeAttribute("data-preloading");
      window.__rgbyPreloaded = true;
      window.dispatchEvent(new Event("rgby:preloaded"));
    }
  }, [t.preloader]);
  React.useEffect(() => {
    if (!TUNE) return;
    var h = e => setTcfg({
        ...(e.detail || {})
      }),
      o = () => setCmsOpen(true),
      c = () => setCmsOpen(false);
    window.addEventListener("rgby:cfg", h);
    window.addEventListener("rgby:cms", o);
    window.addEventListener("rgby:cms-close", c);
    return () => {
      window.removeEventListener("rgby:cfg", h);
      window.removeEventListener("rgby:cms", o);
      window.removeEventListener("rgby:cms-close", c);
    };
  }, []);
  var replayPreloader = () => {
    window.__rgbyPreloaded = false;
    window.dispatchEvent(new Event("rgby:preloading"));
    setPlKey(k => k + 1);
    setPlOn(true);
  };
  var setData = fn => setDataRaw(prev => {
    var next = typeof fn === "function" ? fn(prev) : fn;
    if (!D.cms.save(next)) setToast("Хранилище браузера переполнено — уменьшите изображения или экспортируйте JSON");
    return next;
  });
  useHeavyScroll(t.heavyScroll, t.scrollWeight, t.wheelSpeed);
  window.__tailBlur = t.tailBlur;
  useReveal(t.reveal && !window.__RGBY_TUNE);
  React.useEffect(() => {
    window.__tailShade = t.tailShade / 100;
    document.documentElement.style.setProperty("--tail-shade", (t.tailShade / 100).toFixed(3));
    window.dispatchEvent(new Event("scroll"));
  }, [t.tailShade]);
  useParallax(t.parallax, setSticky);
  React.useEffect(() => {
    document.body.classList.toggle("hide-vsw", !t.showSwitchers);
  }, [t.showSwitchers]);
  var firstNotice = React.useRef(true);
  React.useEffect(() => {
    if (firstNotice.current) {
      firstNotice.current = false;
      return;
    }
    if (t.notice !== "off") setNoticeOpen(true);
  }, [t.notice]);
  React.useEffect(() => {
    if (!toast) return;
    var x = setTimeout(() => setToast(""), 4000);
    return () => clearTimeout(x);
  }, [toast]);
  var go = hash => {
    var el = document.querySelector(hash);
    if (el) window.__scrollTo(el.getBoundingClientRect().top + window.scrollY - (hash === "#top" ? 0 : 60));
  };
  React.useEffect(() => {
    var h = e => {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || a.getAttribute("href").length < 2 || a.closest(".menu")) return;
      e.preventDefault();
      go(a.getAttribute("href"));
    };
    document.addEventListener("click", h);
    return () => document.removeEventListener("click", h);
  }, []);
  var goBrief = React.useCallback(() => go("#brief"), []);
  var discuss = text => {
    setPrefill(p => ({
      n: p.n + 1,
      text
    }));
    go("#brief");
  };
  var sv = k => v => setTweak(k, v);
  var noticeText = t.notice === "long" ? D.NOTICE.long : D.NOTICE.short;
  var showFloatingNotice = t.notice !== "off" && t.hero !== "v2" && noticeOpen;
  var {
    Notice
  } = window.RGBYDS;
  return React.createElement(React.Fragment, null, plOn && t.preloader !== "off" && !window.__RGBY_TUNE && !window.__RGBY_NOPL ? React.createElement(Preloader, {
    key: plKey + t.preloader + t.plExit,
    variant: t.preloader,
    exit: t.plExit,
    line: t.plLine,
    theme: t.plTheme,
    onDone: () => setPlOn(false)
  }) : null, t.cursorOn && !window.__RGBY_TUNE ? React.createElement(CustomCursor, {
    key: t.cursor + t.cursorTone,
    variant: t.cursor,
    tone: t.cursorTone
  }) : null, React.createElement(SiteSticky, {
    onBrief: goBrief,
    label: "\u0420\u0430\u0441\u0441\u0447\u0438\u0442\u0430\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442"
  }), React.createElement(Menu, {
    go: go,
    anim: "crt",
    hover: "vhs",
    bg: "light",
    glitch: "step"
  }), React.createElement("main", null, React.createElement(Hero, {
    variant: t.hero,
    setVariant: sv("hero"),
    notice: t.notice,
    setNotice: sv("notice"),
    noticeText: D.NOTICE.short,
    coverOn: t.heroCover,
    motion: t.heroMotion,
    band: t.heroBand,
    auto: t.heroAuto,
    interval: t.heroInterval,
    onBrief: () => go("#brief")
  }), React.createElement(Stats, {
    statsFill: t.statsFill,
    variant: t.stats,
    setVariant: sv("stats")
  }), React.createElement(Why, {
    variant: t.why,
    setVariant: sv("why")
  }), React.createElement(Cases, {
    cases: data.cases,
    onOpen: setCaseIdx
  }), React.createElement(Services, {
    variant: t.services,
    setVariant: sv("services"),
    xVariant: t.servicesNew,
    setXVariant: sv("servicesNew"),
    onDiscuss: discuss
  }), React.createElement(Awards, {
    variant: t.awards,
    setVariant: sv("awards"),
    tone: t.awardsTone
  }), React.createElement(Clients, {
    variant: t.clients,
    setVariant: sv("clients")
  }), React.createElement(Team, {
    variant: t.team,
    setVariant: sv("team"),
    team: data.team,
    lead: data.lead,
    staff: !t.showStaff ? [] : data.staff && data.staff.length ? data.staff : window.RGBY_DATA.staffDraft(),
    staffView: t.staffView,
    setStaffView: sv("staffView")
  })), React.createElement("div", {
    className: "tail" + (t.briefV === "b4" ? " tail--b4" : "")
  }, t.briefV === "b4" ? React.createElement(TailBg, null) : null, React.createElement(Brief, {
    budgetMode: t.budget,
    setBudgetMode: sv("budget"),
    prefill: prefill,
    version: t.briefV,
    setVersion: sv("briefV"),
    sharedBg: t.briefV === "b4"
  }), React.createElement(Footer, {
    sharedBg: t.briefV === "b4"
  })), showFloatingNotice ? React.createElement("div", {
    className: "pl-notice",
    style: {
      position: "fixed",
      zIndex: 65,
      right: "var(--margin)",
      bottom: "var(--margin)",
      width: t.notice === "card" ? "min(calc(625 * var(--u)), calc(100vw - 2 * var(--margin)))" : "min(calc(1400 * var(--u)), calc(100vw - 2 * var(--margin)))"
    }
  }, React.createElement(Notice, {
    variant: t.notice === "card" ? "card" : "wide",
    onClose: () => setNoticeOpen(false)
  }, noticeText)) : null, React.createElement(CaseModal, {
    cases: data.cases,
    index: caseIdx,
    onClose: () => setCaseIdx(null),
    onNav: d => setCaseIdx(i => (i + d + data.cases.length) % data.cases.length),
    onDiscuss: discuss
  }), t.showCms ? React.createElement("div", {
    className: "cms-fab"
  }, React.createElement("button", {
    type: "button",
    onClick: () => setCmsOpen(!cmsOpen)
  }, cmsOpen ? "Закрыть CMS" : "CMS · Кейсы и команда")) : null, React.createElement(Cms, {
    open: cmsOpen,
    onClose: () => setCmsOpen(false),
    data: data,
    setData: setData
  }), toast ? React.createElement("div", {
    style: {
      position: "fixed",
      zIndex: 120,
      left: 16,
      bottom: 64,
      background: "var(--rgby-ink)",
      color: "var(--rgby-paper)",
      padding: "12px 14px",
      font: "600 13px/1.3 var(--font-sans)",
      maxWidth: 360
    }
  }, toast) : null, !TUNE ? React.createElement(TweaksPanel, null, React.createElement(TweakSection, {
    label: "\u0421\u043A\u0440\u043E\u043B\u043B \u0438 \u0430\u043D\u0438\u043C\u0430\u0446\u0438\u0438"
  }), React.createElement(TweakToggle, {
    label: "\u0422\u044F\u0436\u0451\u043B\u044B\u0439 \u0441\u043A\u0440\u043E\u043B\u043B",
    value: t.heavyScroll,
    onChange: sv("heavyScroll")
  }), React.createElement(TweakSlider, {
    label: "\u0422\u044F\u0436\u0435\u0441\u0442\u044C (\u0438\u043D\u0435\u0440\u0446\u0438\u044F)",
    value: t.scrollWeight,
    min: 0,
    max: 100,
    step: 1,
    onChange: sv("scrollWeight")
  }), React.createElement(TweakSlider, {
    label: "\u0421\u043A\u043E\u0440\u043E\u0441\u0442\u044C \u043A\u043E\u043B\u0435\u0441\u0430",
    value: t.wheelSpeed,
    min: 0.4,
    max: 2,
    step: 0.1,
    unit: "\xD7",
    onChange: sv("wheelSpeed")
  }), React.createElement(TweakSlider, {
    label: "\u0417\u0430\u0442\u0435\u043C\u043D\u0435\u043D\u0438\u0435 \u0432\u043D\u0438\u0437\u0443",
    value: t.tailShade,
    min: 0,
    max: 100,
    step: 1,
    unit: "%",
    onChange: sv("tailShade")
  }), React.createElement(TweakToggle, {
    label: "\u041F\u0440\u043E\u044F\u0432\u043B\u0435\u043D\u0438\u0435 \u0431\u043B\u043E\u043A\u043E\u0432",
    value: t.reveal,
    onChange: sv("reveal")
  }), React.createElement(TweakToggle, {
    label: "\u041F\u0430\u0440\u0430\u043B\u043B\u0430\u043A\u0441 \u043E\u0431\u043B\u043E\u0436\u0435\u043A",
    value: t.parallax,
    onChange: sv("parallax")
  }), React.createElement(TweakSection, {
    label: "\u0412\u0430\u0440\u0438\u0430\u043D\u0442\u044B \u0431\u043B\u043E\u043A\u043E\u0432"
  }), React.createElement(TweakToggle, {
    label: "\u041F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0430\u0442\u0435\u043B\u0438 \u0432 \u0431\u043B\u043E\u043A\u0430\u0445",
    value: t.showSwitchers,
    onChange: sv("showSwitchers")
  }), React.createElement(TweakRadio, {
    label: "Hero",
    value: t.hero,
    options: ["v1", "v2", "v3"],
    onChange: sv("hero")
  }), React.createElement(TweakToggle, {
    label: "\u041E\u0431\u043B\u043E\u0436\u043A\u0430 hero",
    value: t.heroCover,
    onChange: sv("heroCover")
  }), t.hero === "v1" ? React.createElement(TweakSelect, {
    label: "\u0421\u0438\u043D\u0438\u0439 \u0433\u0440\u0430\u0434\u0438\u0435\u043D\u0442",
    value: t.heroBand,
    options: ["static", "breathe", "flow", "surge"],
    onChange: sv("heroBand")
  }) : null, t.hero === "v1" ? React.createElement(TweakToggle, {
    label: "\u0410\u0432\u0442\u043E\u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u043E\u0431\u043B\u043E\u0436\u0435\u043A",
    value: t.heroAuto,
    onChange: sv("heroAuto")
  }) : null, t.hero === "v1" ? React.createElement(TweakSlider, {
    label: "\u0418\u043D\u0442\u0435\u0440\u0432\u0430\u043B",
    value: t.heroInterval,
    min: 3,
    max: 12,
    step: 0.5,
    unit: "\u0441",
    onChange: sv("heroInterval")
  }) : null, React.createElement(TweakRadio, {
    label: "\u0427\u0438\u0441\u043B\u0430",
    value: t.stats === "v3" || t.stats === "v4" ? "v5" : t.stats,
    options: ["v1", "v2", "v5"],
    onChange: sv("stats")
  }), t.stats === "v5" || t.stats === "v3" || t.stats === "v4" ? React.createElement(TweakRadio, {
    label: "\u0417\u0430\u043B\u0438\u0432\u043A\u0430 \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439",
    value: t.statsFill,
    options: ["ink", "glow"],
    onChange: sv("statsFill")
  }) : null, React.createElement(TweakSelect, {
    label: "\u041F\u043E\u0447\u0435\u043C\u0443 \u043C\u044B",
    value: t.why,
    options: ["v1", "v2", "v3", "v4", "v5", "v6", "v7"],
    onChange: sv("why")
  }), React.createElement(TweakSelect, {
    label: "\u0427\u0442\u043E \u043C\u044B \u0434\u0435\u043B\u0430\u0435\u043C \xB7 \u043D\u043E\u0432\u044B\u0435",
    value: t.servicesNew,
    options: ["—", ...SVC_NEW],
    onChange: sv("servicesNew")
  }), t.servicesNew === "—" ? React.createElement(TweakSelect, {
    label: "\u0427\u0442\u043E \u043C\u044B \u0434\u0435\u043B\u0430\u0435\u043C \xB7 \u0438\u0437 \u043C\u0430\u043A\u0435\u0442\u0430",
    value: t.services,
    options: SVC_VARIANTS,
    onChange: sv("services")
  }) : null, React.createElement(TweakSelect, {
    label: "\u041D\u0430\u0433\u0440\u0430\u0434\u044B",
    value: t.awards,
    options: ["v1", "v2", "v3", "v4", "v5", "v6"],
    onChange: sv("awards")
  }), t.awards === "v1" ? React.createElement(TweakRadio, {
    label: "\u041D\u0430\u0433\u0440\u0430\u0434\u044B \u2014 \u0444\u043E\u043D",
    value: t.awardsTone,
    options: ["ink", "paper"],
    onChange: sv("awardsTone")
  }) : null, React.createElement(TweakSelect, {
    label: "\u041A\u043B\u0438\u0435\u043D\u0442\u044B",
    value: t.clients,
    options: ["v1", "v2", "v3", "v4", "v5"],
    onChange: sv("clients")
  }), React.createElement(TweakRadio, {
    label: "\u041A\u043E\u043C\u0430\u043D\u0434\u0430",
    value: t.team,
    options: ["v1", "v2"],
    onChange: sv("team")
  }), React.createElement(TweakToggle, {
    label: "\u0411\u043B\u043E\u043A \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u043E\u0432",
    value: t.showStaff,
    onChange: sv("showStaff")
  }), t.showStaff ? React.createElement(TweakRadio, {
    label: "\u0421\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0438",
    value: t.staffView,
    options: ["grid", "tabs", "list"],
    onChange: sv("staffView")
  }) : null, t.briefV === "b4" ? React.createElement(TweakToggle, {
    label: "\u0420\u0430\u0437\u043C\u044B\u0442\u0438\u0435 RG \u043F\u0440\u0438 \u0441\u043A\u0440\u043E\u043B\u043B\u0435",
    value: t.tailBlur,
    onChange: sv("tailBlur")
  }) : null, React.createElement(TweakRadio, {
    label: "\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442",
    value: t.briefV,
    options: ["b1", "b2", "b3", "b4"],
    onChange: sv("briefV")
  }), React.createElement(TweakRadio, {
    label: "\u0411\u044E\u0434\u0436\u0435\u0442",
    value: t.budget,
    options: ["single", "range"],
    onChange: sv("budget")
  }), React.createElement(TweakSelect, {
    label: "Pop-up \xAB\u0417\u0430\u043A\u043E\u043D\xBB",
    value: t.notice,
    options: ["card", "wide", "long", "off"],
    onChange: sv("notice")
  }), React.createElement(TweakSection, {
    label: "\u041C\u0435\u043D\u044E"
  }), React.createElement(TweakButton, {
    label: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043C\u0435\u043D\u044E",
    onClick: () => menuStore.set(true)
  }), React.createElement(TweakSection, {
    label: "\u041A\u0443\u0440\u0441\u043E\u0440"
  }), React.createElement(TweakToggle, {
    label: "\u041A\u0430\u0441\u0442\u043E\u043C\u043D\u044B\u0439 \u043A\u0443\u0440\u0441\u043E\u0440",
    value: t.cursorOn,
    onChange: sv("cursorOn")
  }), t.cursorOn ? React.createElement(TweakRadio, {
    label: "\u0412\u0438\u0434",
    value: t.cursor,
    options: ["dot", "cross", "rec", "pixel"],
    onChange: sv("cursor")
  }) : null, t.cursorOn && t.cursor === "cross" ? React.createElement(TweakRadio, {
    label: "\u0426\u0432\u0435\u0442 \u043A\u0443\u0440\u0441\u043E\u0440\u0430",
    value: t.cursorTone,
    options: ["ink", "adaptive"],
    onChange: sv("cursorTone")
  }) : null, React.createElement(TweakSection, {
    label: "\u041F\u0440\u0435\u043B\u043E\u0430\u0434\u0435\u0440"
  }), React.createElement(TweakRadio, {
    label: "\u0412\u0430\u0440\u0438\u0430\u043D\u0442",
    value: t.preloader,
    options: ["A", "B", "C", "off"],
    onChange: v => {
      setTweak("preloader", v);
      if (v !== "off") {
        window.__rgbyPreloaded = false;
        window.dispatchEvent(new Event("rgby:preloading"));
        setPlKey(k => k + 1);
        setPlOn(true);
      }
    }
  }), t.preloader === "C" ? React.createElement(TweakRadio, {
    label: "\u0423\u0445\u043E\u0434 (C)",
    value: t.plExit,
    options: ["fade", "cubes", "crt"],
    onChange: v => {
      setTweak("plExit", v);
      replayPreloader();
    }
  }) : null, t.preloader === "C" ? React.createElement(TweakRadio, {
    label: "\u0424\u043E\u043D (C)",
    value: t.plTheme,
    options: ["ink", "blue", "light"],
    onChange: v => setTweak("plTheme", v)
  }) : null, t.preloader === "C" ? React.createElement(TweakRadio, {
    label: "\u041B\u0438\u043D\u0438\u044F \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438",
    value: t.plLine,
    options: ["white", "glow", "red"],
    onChange: v => setTweak("plLine", v)
  }) : null, React.createElement(TweakButton, {
    label: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0435\u0449\u0451 \u0440\u0430\u0437",
    onClick: replayPreloader
  }), React.createElement(TweakSection, {
    label: "\u041A\u043E\u043D\u0442\u0435\u043D\u0442"
  }), React.createElement(TweakToggle, {
    label: "\u041A\u043D\u043E\u043F\u043A\u0430 CMS",
    value: t.showCms,
    onChange: sv("showCms")
  }), React.createElement(TweakButton, {
    label: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C CMS",
    onClick: () => setCmsOpen(true)
  }), React.createElement(TweakButton, {
    label: "\u0421\u043A\u0430\u0447\u0430\u0442\u044C site.config.json (\u0434\u043B\u044F \u0441\u0431\u043E\u0440\u043A\u0438)",
    onClick: exportConfig
  })) : null);
}
window.__dsReady.then(() => ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App, null))).catch(e => {
  document.getElementById("root").textContent = "Не удалось загрузить компоненты: " + e.message;
  console.error(e);
});