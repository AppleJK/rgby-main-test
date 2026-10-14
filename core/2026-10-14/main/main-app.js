// RGBY · main-app.jsx.txt · сборка 2026-10-14
var NAV = [["Направления", "#hub"], ["О студии", "#about"], ["Что происходит", "#news"], ["Проекты", "#projects"], ["Награды", "#awards"], ["Контакты", "#contacts"]];
window.NAV = NAV;
window.VSW_ALLOW = window.VSW_ALLOW || {
  "Обложка": ["prism", "router", "strips", "task", "wall"],
  "Шоурил": ["mask", "iris", "shutters", "pip", "tilt"],
  "Направления": ["strips", "prism", "mixer", "tuner", "stack", "pixels"],
  "О студии": ["v1"],
  "Что происходит": ["v4", "v5", "v6"],
  "Клиенты": ["v1", "v2", "v3"],
  "Проекты": ["lens", "ring", "tunnel", "shader", "deck"],
  "Награды": ["ink", "paper"]
};
function VariantSwitch({
  label,
  value,
  options,
  onChange
}) {
  var opts = window.VSW_ALLOW && window.VSW_ALLOW[label] || options;
  if (opts.length < 2) return null;
  return React.createElement("div", {
    className: "vsw",
    role: "group",
    "aria-label": "Вариант блока " + label
  }, React.createElement("span", null, label), opts.map(o => React.createElement("button", {
    key: o,
    type: "button",
    "aria-pressed": value === o,
    onClick: () => onChange(o)
  }, o)));
}
var MAIN_DEFAULTS = {
  "hero": "wall",
  "intro": "index",
  "reel": "mask",
  "hub": "strips",
  "hubCount": 6,
  "wallTone": "blue",
  "aboutTone": "blue",
  "projTone": "blue",
  "about": "v1",
  "aboutFill": "select",
  "blurAmount": 7,
  "blurScale": 1.04,
  "blurOpacity": 0.3,
  "blurTint": "6,16,37",
  "news": "v6",
  "trust": "v1",
  "projects": "lens",
  "lensFlow": "diag",
  "lensDof": false,
  "awards": "paper",
  "briefV": "b4",
  "tailTone": "light",
  "tailBlur": true,
  "showSwitchers": true,
  "reveal": true,
  "heavyScroll": true,
  "scrollWeight": 70,
  "wheelSpeed": 0.8
};
function useMainHeavyScroll(enabled, weight, speed) {
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
      ours = false;
    var max = () => root.scrollHeight - innerHeight;
    var lt = 0;
    var loop = now => {
      var dt = lt ? Math.min(64, now - lt) : 16.7;
      lt = now;
      var g = window.__scrollGate;
      if (g != null && cur <= g + 2 && target > g) target = g;
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
      if (e.target.closest && e.target.closest("[data-lenis-prevent], .twk-panel, [class*='tweak'], .rl-m")) return;
      e.preventDefault();
      var d = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? innerHeight : 1) * cfg.current.speed;
      target = Math.max(0, Math.min(max(), window.__scrollGate != null && cur <= window.__scrollGate + 2 ? window.__scrollGate : Infinity, target + d));
      kick();
    };
    var onScroll = () => {
      if (ours) {
        ours = false;
        return;
      }
      if (!raf) target = cur = scrollY;else if (window.__scrollGate != null && target > window.__scrollGate && scrollY <= window.__scrollGate + 1) target = cur = scrollY;
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
function useMainReveal(on) {
  React.useEffect(() => {
    document.body.classList.toggle("no-anim", !on);
    if (!on) return;
    var SEL = ".rv:not(.rv--in),.rv-clip:not(.rv--in),.m-logos__i:not(.rv--in)",
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
  }, [on]);
}
function MainTailBg() {
  var img = window.RGBY_DATA.img("hero-rg.webp");
  return React.createElement("div", {
    className: "tail__bg",
    "aria-hidden": "true"
  }, React.createElement("i", {
    className: "tail__g"
  }), React.createElement("div", {
    className: "tail__rg"
  }, React.createElement("i", {
    style: {
      backgroundImage: "url(" + img + ")"
    }
  }), React.createElement("i", {
    className: "tail__rgb",
    style: {
      backgroundImage: "url(" + img + ")"
    }
  })), React.createElement("i", {
    className: "tail__top"
  }), React.createElement("i", {
    className: "tail__veil"
  }));
}
function useMainTailBlur(on) {
  React.useEffect(() => {
    var raf = 0;
    var f = () => {
      raf = 0;
      var trg = document.querySelector(".tail__rg i:not(.tail__rgb)"),
        trb = document.querySelector(".tail__rgb");
      if (!trg) return;
      if (!on) {
        trg.style.filter = "";
        trg.style.transform = "";
        return;
      }
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
  }, [on]);
}
function MainApp() {
  var [t, setTweak] = useTweaks(MAIN_DEFAULTS);
  var sv = k => v => setTweak(k, v),
    A = window.VSW_ALLOW;
  var [intro, setIntro] = React.useState(1);
  var playIntro = () => setIntro(n => Math.abs(n) + 1);
  var pick = (k, label) => A[label].includes(t[k]) ? t[k] : A[label][0];
  useMainHeavyScroll(t.heavyScroll, t.scrollWeight, t.wheelSpeed);
  useMainReveal(t.reveal);
  useMainTailBlur(t.tailBlur && t.briefV === "b4");
  React.useEffect(() => {
    document.body.classList.toggle("hide-vsw", !t.showSwitchers || !!window.__RGBY_RELEASE && !/[?&]admin(=|&|$)/.test(location.search));
  }, [t.showSwitchers]);
  var b4 = t.briefV === "b4";
  var mcases = React.useMemo(() => {
    var all = window.RGBY_DATA.cms.load().cases || [];
    return (window.RGBY_MAIN.PROJECTS || []).map(p => all.find(c => c.id === p.caseId) || p.full).filter(Boolean);
  }, []);
  var [caseIdx, setCaseIdx] = React.useState(null);
  React.useEffect(() => {
    window.__rgbyOpenCase = id => {
      var i = mcases.findIndex(c => c.id === id);
      if (i >= 0) setCaseIdx(i);
    };
    return () => {
      window.__rgbyOpenCase = null;
    };
  }, [mcases]);
  return React.createElement(React.Fragment, null, React.createElement(SiteSticky, {
    onBrief: () => window.mainGo("#brief"),
    label: "\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442"
  }), React.createElement(Menu, {
    go: window.mainGo,
    anim: "crt",
    hover: "vhs",
    bg: "light",
    glitch: "step"
  }), t.intro !== "off" && intro > 0 ? React.createElement(MainIntro, {
    key: intro,
    variant: t.intro,
    onDone: () => setIntro(n => -n)
  }) : null, React.createElement("main", {
    className: [t.wallTone === "blue" ? "tn-wall" : "", t.aboutTone === "blue" ? "tn-about" : "", t.projTone === "blue" ? "tn-proj" : ""].join(" ")
  }, React.createElement(MainHero, {
    variant: pick("hero", "Обложка"),
    setVariant: sv("hero")
  }), React.createElement(Showreel, {
    variant: pick("reel", "Шоурил"),
    setVariant: sv("reel")
  }), React.createElement(Hub, {
    variant: pick("hub", "Направления"),
    setVariant: sv("hub"),
    count: t.hubCount,
    setCount: sv("hubCount")
  }), React.createElement(About, {
    variant: pick("about", "О студии"),
    setVariant: sv("about"),
    fill: t.aboutFill,
    blurCfg: {
      amount: t.blurAmount,
      scale: t.blurScale,
      opacity: t.blurOpacity,
      tint: t.blurTint
    }
  }), React.createElement(News, {
    variant: pick("news", "Что происходит"),
    setVariant: sv("news")
  }), React.createElement(Trust, {
    variant: t.trust,
    setVariant: sv("trust")
  }), React.createElement(Projects, {
    variant: pick("projects", "Проекты"),
    setVariant: sv("projects"),
    lensFlow: t.lensFlow,
    lensDof: t.lensDof
  }), React.createElement(MainAwards, {
    variant: pick("awards", "Награды"),
    setVariant: sv("awards")
  })), React.createElement("div", {
    className: "tail" + (b4 ? " tail--b4 tail--" + t.tailTone : "")
  }, b4 ? React.createElement(MainTailBg, null) : null, React.createElement(Brief, {
    budgetMode: "range",
    setBudgetMode: () => {},
    version: t.briefV,
    setVersion: sv("briefV"),
    sharedBg: b4
  }), React.createElement(Footer, {
    sharedBg: b4
  })), window.CaseModal ? React.createElement(CaseModal, {
    cases: mcases,
    index: caseIdx,
    onClose: () => setCaseIdx(null),
    onNav: d => setCaseIdx(i => (i + d + mcases.length) % mcases.length),
    onDiscuss: () => {
      setCaseIdx(null);
      setTimeout(() => window.mainGo("#brief"), 350);
    }
  }) : null, React.createElement(TweaksPanel, null, React.createElement(TweakSection, {
    label: "\u041F\u0440\u0435\u043B\u043E\u0430\u0434\u0435\u0440"
  }), React.createElement(TweakRadio, {
    label: "\u041F\u0440\u0435\u043B\u043E\u0430\u0434\u0435\u0440",
    value: t.intro,
    options: ["off", "spectrum", "mark", "index"],
    onChange: v => {
      setTweak("intro", v);
      if (v !== "off") playIntro();
    }
  }), React.createElement(TweakButton, {
    label: "\u041F\u0440\u043E\u0438\u0433\u0440\u0430\u0442\u044C \u043F\u0440\u0435\u043B\u043E\u0430\u0434\u0435\u0440",
    onClick: playIntro
  }), React.createElement(TweakSection, {
    label: "\u0412\u0430\u0440\u0438\u0430\u043D\u0442\u044B \u0431\u043B\u043E\u043A\u043E\u0432"
  }), React.createElement(TweakToggle, {
    label: "\u041F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0430\u0442\u0435\u043B\u0438 \u0432 \u0431\u043B\u043E\u043A\u0430\u0445",
    value: t.showSwitchers,
    onChange: sv("showSwitchers")
  }), React.createElement(TweakSelect, {
    label: "\u041E\u0431\u043B\u043E\u0436\u043A\u0430",
    value: pick("hero", "Обложка"),
    options: A["Обложка"],
    onChange: sv("hero")
  }), pick("hero", "Обложка") === "wall" ? React.createElement(TweakRadio, {
    label: "Wall \u2014 \u0444\u043E\u043D",
    value: t.wallTone,
    options: ["ink", "blue"],
    onChange: sv("wallTone")
  }) : null, React.createElement(TweakSelect, {
    label: "\u0428\u043E\u0443\u0440\u0438\u043B \u2014 \u043F\u0435\u0440\u0435\u0445\u043E\u0434",
    value: pick("reel", "Шоурил"),
    options: A["Шоурил"],
    onChange: sv("reel")
  }), React.createElement(TweakSelect, {
    label: "\u041D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F",
    value: pick("hub", "Направления"),
    options: A["Направления"],
    onChange: sv("hub")
  }), React.createElement(TweakRadio, {
    label: "\u041A\u0430\u0440\u0442\u043E\u0447\u0435\u043A \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0439",
    value: String(t.hubCount),
    options: ["4", "5", "6"],
    onChange: v => setTweak("hubCount", +v)
  }), React.createElement(TweakRadio, {
    label: "\u041E \u0441\u0442\u0443\u0434\u0438\u0438 \u2014 \u0444\u043E\u043D",
    value: t.aboutTone,
    options: ["paper", "blue"],
    onChange: sv("aboutTone")
  }), React.createElement(TweakRadio, {
    label: "\u041E \u0441\u0442\u0443\u0434\u0438\u0438 \u2014 \u0437\u0430\u043B\u0438\u0432\u043A\u0430",
    value: t.aboutFill,
    options: ["fade", "blur", "select"],
    onChange: sv("aboutFill")
  }), t.aboutFill === "blur" ? React.createElement(React.Fragment, null, React.createElement(TweakSlider, {
    label: "Blur \u2014 \u0441\u0438\u043B\u0430",
    value: t.blurAmount,
    min: 0,
    max: 24,
    step: 0.5,
    unit: "px",
    onChange: sv("blurAmount")
  }), React.createElement(TweakSlider, {
    label: "Blur \u2014 \u0440\u0430\u0437\u043C\u0435\u0440 \u0431\u0443\u043A\u0432",
    value: t.blurScale,
    min: 0.85,
    max: 1.3,
    step: 0.01,
    unit: "\xD7",
    onChange: sv("blurScale")
  }), React.createElement(TweakSlider, {
    label: "Blur \u2014 \u043D\u0435\u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u043E\u0441\u0442\u044C",
    value: t.blurOpacity,
    min: 0,
    max: 1,
    step: 0.05,
    onChange: sv("blurOpacity")
  }), React.createElement(TweakSelect, {
    label: "Blur \u2014 \u0446\u0432\u0435\u0442",
    value: t.blurTint,
    options: [{
      value: "6,16,37",
      label: "Чернила"
    }, {
      value: "44,79,255",
      label: "Синий"
    }, {
      value: "100,34,106",
      label: "Слива"
    }, {
      value: "146,151,170",
      label: "Серый"
    }, {
      value: "243,244,255",
      label: "Бумага"
    }],
    onChange: sv("blurTint")
  })) : null, React.createElement(TweakRadio, {
    label: "\u0427\u0442\u043E \u043F\u0440\u043E\u0438\u0441\u0445\u043E\u0434\u0438\u0442",
    value: pick("news", "Что происходит"),
    options: A["Что происходит"],
    onChange: sv("news")
  }), React.createElement(TweakRadio, {
    label: "\u041A\u043B\u0438\u0435\u043D\u0442\u044B",
    value: t.trust,
    options: ["v1", "v2", "v3"],
    onChange: sv("trust")
  }), React.createElement(TweakSelect, {
    label: "\u041F\u0440\u043E\u0435\u043A\u0442\u044B",
    value: pick("projects", "Проекты"),
    options: A["Проекты"],
    onChange: sv("projects")
  }), pick("projects", "Проекты") === "lens" ? React.createElement(TweakRadio, {
    label: "Lens \u2014 \u0444\u043E\u043D",
    value: t.projTone,
    options: ["ink", "blue"],
    onChange: sv("projTone")
  }) : null, pick("projects", "Проекты") === "lens" ? React.createElement(TweakRadio, {
    label: "Lens \u2014 \u043F\u043E\u0442\u043E\u043A",
    value: t.lensFlow,
    options: ["row", "diag"],
    onChange: sv("lensFlow")
  }) : null, pick("projects", "Проекты") === "lens" ? React.createElement(TweakToggle, {
    label: "Lens \u2014 \u0433\u043B\u0443\u0431\u0438\u043D\u0430 \u0440\u0435\u0437\u043A\u043E\u0441\u0442\u0438",
    value: t.lensDof,
    onChange: sv("lensDof")
  }) : null, React.createElement(TweakRadio, {
    label: "\u041D\u0430\u0433\u0440\u0430\u0434\u044B",
    value: pick("awards", "Награды"),
    options: A["Награды"],
    onChange: sv("awards")
  }), React.createElement(TweakRadio, {
    label: "\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442",
    value: t.briefV,
    options: ["b1", "b2", "b3", "b4"],
    onChange: sv("briefV")
  }), t.briefV === "b4" ? React.createElement(React.Fragment, null, React.createElement(TweakRadio, {
    label: "\u041F\u043E\u0434\u0432\u0430\u043B \u2014 \u0444\u043E\u043D",
    value: t.tailTone,
    options: ["light", "ink"],
    onChange: sv("tailTone")
  }), React.createElement(TweakToggle, {
    label: "\u0420\u0430\u0437\u043C\u044B\u0442\u0438\u0435 RG \u043F\u0440\u0438 \u0441\u043A\u0440\u043E\u043B\u043B\u0435",
    value: t.tailBlur,
    onChange: sv("tailBlur")
  })) : null, React.createElement(TweakSection, {
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
  }), React.createElement(TweakToggle, {
    label: "\u041F\u0440\u043E\u044F\u0432\u043B\u0435\u043D\u0438\u0435 \u0431\u043B\u043E\u043A\u043E\u0432",
    value: t.reveal,
    onChange: sv("reveal")
  }), React.createElement(TweakSection, {
    label: "\u0410\u0440\u0445\u0438\u0432"
  }), React.createElement(TweakButton, {
    label: "\u0421\u0442\u0430\u0440\u044B\u0435 \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u044B \u0431\u043B\u043E\u043A\u043E\u0432 \u2192",
    onClick: () => {
      location.href = "variants.html";
    }
  })));
}
window.__rgbyPreloaded = true;
window.__dsReady.then(() => ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(MainApp, null))).catch(e => {
  document.getElementById("root").textContent = "Ошибка загрузки: " + e.message;
  console.error(e);
});