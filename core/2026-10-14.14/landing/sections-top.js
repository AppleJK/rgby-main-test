// RGBY · project/ui_kits/landing/sections-top.jsx.txt
// Header, menu, hero, stats, why-us.
function VariantSwitch({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "vsw",
    role: "group",
    "aria-label": "Вариант блока " + label
  }, /*#__PURE__*/React.createElement("span", null, label), options.map(o => /*#__PURE__*/React.createElement("button", {
    key: o,
    type: "button",
    "aria-pressed": value === o,
    onClick: () => onChange(o)
  }, o)));
}
function Header({
  variant,
  onMenu,
  menuOpen,
  onBrief,
  dark
}) {
  const {
    Logo,
    Button,
    Burger
  } = window.RGBYDS;
  const ink = dark ? "var(--rgby-paper)" : variant === "v3" ? "var(--rgby-ink-3)" : variant === "v1" ? "var(--rgby-ink-2)" : "var(--rgby-ink)";
  return /*#__PURE__*/React.createElement("header", {
    className: "hdr",
    style: {
      color: ink
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hdr__l"
  }, /*#__PURE__*/React.createElement("a", {
    href: window.RGBY_BASE || "../",
    "aria-label": "RGBY \u2014 \u043D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E",
    style: {
      color: ink,
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    color: ink
  })), variant === "v2" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "hdr__sep"
  }), /*#__PURE__*/React.createElement("span", {
    className: "hdr__mark"
  }, "\u0422\u0412/\u041C\u0415\u0414\u0418\u0410")) : null), /*#__PURE__*/React.createElement("div", {
    className: "hdr__r"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: dark ? "paper" : variant === "v2" ? "blue" : "ink",
    size: variant === "v1" ? "m" : "l",
    onClick: onBrief,
    style: variant === "v3" ? {
      background: "var(--rgby-ink-3)",
      color: "#F2F2FF"
    } : null
  }, "\u041E\u0431\u0441\u0443\u0434\u0438\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442"), /*#__PURE__*/React.createElement(MenuBurger, {
    color: ink
  })));
}
function StickyHeader({
  show,
  onBrief
}) {
  const {
    Logo,
    Button
  } = window.RGBYDS;
  const menuOpen = useMenuOpen();
  // keep the sticky bar hidden until the menu close animation has finished
  const [hold, setHold] = React.useState(false);
  const prev = React.useRef(menuOpen);
  React.useEffect(() => {
    if (prev.current && !menuOpen) {
      setHold(true);
      const t = setTimeout(() => setHold(false), 900);
      prev.current = menuOpen;
      return () => clearTimeout(t);
    }
    prev.current = menuOpen;
  }, [menuOpen]);
  return /*#__PURE__*/React.createElement("div", {
    className: "sticky" + (show && !menuOpen && !hold ? " sticky--on" : "")
  }, /*#__PURE__*/React.createElement("a", {
    href: "#top",
    "aria-label": "RGBY",
    style: {
      display: "flex",
      color: "var(--rgby-ink)"
    }
  }, /*#__PURE__*/React.createElement(Logo, null)), /*#__PURE__*/React.createElement("div", {
    className: "hdr__r"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "blue",
    size: "m",
    onClick: onBrief
  }, "\u041E\u0431\u0441\u0443\u0434\u0438\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442"), /*#__PURE__*/React.createElement(MenuBurger, {
    color: "var(--rgby-ink)"
  })));
}
const NAV = [["Почему мы", "#why"], ["Что мы делаем", "#services"], ["Кейсы", "#cases"], ["На полке", "#awards"], ["Команда", "#team"], ["Контакты", "#contacts"]];
function Lines({
  text,
  base = 0
}) {
  return String(text).split("\n").map((l, i) => /*#__PURE__*/React.createElement("span", {
    className: "rv-line",
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      "--d": base + i * 90 + "ms"
    }
  }, l)));
}
function Hero({
  variant,
  setVariant,
  notice,
  setNotice,
  noticeText,
  coverOn,
  onMenu,
  menuOpen,
  onBrief,
  motion,
  band,
  auto,
  interval
}) {
  const [tone, setTone] = React.useState("light");
  const [slide, setSlide] = React.useState("rg");
  const captions = window.RGBY_TV_HERO || {};
  const copy = captions[variant === "v1" && coverOn ? slide : "rg"];
  const keyToCase = {
    "k1-4": "k1",
    "tv3-wonderland-2": "tv3-wonderland",
    "soviet-classics-1": "soviet-classics"
  };
  const linked = window.__RGBY_RELEASE && copy && window.RGBY_CASES.list.find(c => c.id === keyToCase[slide]);
  const {
    Notice
  } = window.RGBYDS;
  const D = window.RGBY_DATA;
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    let t;
    const go = () => {
      t = setTimeout(() => setReady(true), 80);
    };
    const reset = () => setReady(false);
    if (window.__rgbyPreloaded !== false) go();
    window.addEventListener("rgby:preloaded", go);
    window.addEventListener("rgby:preloading", reset);
    return () => {
      clearTimeout(t);
      window.removeEventListener("rgby:preloaded", go);
      window.removeEventListener("rgby:preloading", reset);
    };
  }, [variant]);
  const img = variant === "v1" ? window.RGBY_DATA.img("hero-cover.jpg") : window.RGBY_DATA.img("hero-still.jpg");
  return /*#__PURE__*/React.createElement("section", {
    id: "top",
    "data-screen-label": "01 Hero",
    className: "hero hero--" + variant + (ready ? " rv--in" : "")
  }, /*#__PURE__*/React.createElement(VariantSwitch, {
    label: "Hero",
    value: variant,
    options: ["v1", "v2", "v3"],
    onChange: setVariant
  }), /*#__PURE__*/React.createElement("div", {
    className: "hero__cover"
  }, variant === "v1" ? /*#__PURE__*/React.createElement(HeroStage, {
    motion: motion,
    band: band,
    auto: auto,
    interval: interval,
    active: ready,
    onTone: setTone,
    onSlide: setSlide,
    cover: coverOn
  }) : coverOn ? /*#__PURE__*/React.createElement("img", {
    src: img,
    alt: "",
    "data-parallax": "0.18"
  }) : null), /*#__PURE__*/React.createElement(Header, {
    variant: variant,
    onMenu: onMenu,
    menuOpen: menuOpen,
    onBrief: onBrief,
    dark: variant === "v1" && coverOn && tone === "dark"
  }), variant === "v2" && notice !== "off" ? /*#__PURE__*/React.createElement("div", {
    className: "hero__notice rv rv--in",
    style: {
      "--d": "600ms"
    }
  }, /*#__PURE__*/React.createElement(Notice, {
    variant: "compact",
    onClose: () => setNotice("off")
  }, noticeText)) : null, /*#__PURE__*/React.createElement("div", {
    className: "hero__bottom"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero__copy"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "hero__h"
  }, /*#__PURE__*/React.createElement(Lines, {
    text: variant === "v3" ? "Оформление телеканалов \nи медиапроектов" : "Оформление телеканалов и медиапроектов",
    base: 200
  })), copy && copy !== captions.rg ? /*#__PURE__*/React.createElement("p", {
    className: "hero__slide-title"
  }, linked ? /*#__PURE__*/React.createElement("a", {
    href: new URL((window.RGBY_BASE ?? "../../") + linked.page, location.href).href
  }, copy.title, " \u2197") : copy.title) : null, /*#__PURE__*/React.createElement("p", {
    className: "hero__p rv",
    style: {
      "--d": "450ms"
    }
  }, copy ? copy.caption : "Айдентика, эфирный пакет, промо и ID. Одна команда — от идеи до мастер-файлов, готовых к эфиру."), /*#__PURE__*/React.createElement("div", {
    className: "hero__links"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#cases"
  }, "\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043A\u0435\u0439\u0441\u044B \u2193"), /*#__PURE__*/React.createElement("a", {
    href: "#services"
  }, "\u0427\u0442\u043E \u043C\u044B \u0434\u0435\u043B\u0430\u0435\u043C \u2193"))), variant !== "v2" ? /*#__PURE__*/React.createElement("p", {
    className: "hero__mark"
  }, /*#__PURE__*/React.createElement(Lines, {
    text: "\u0422\u0412/\u041C\u0415\u0414\u0418\u0410",
    base: 120
  })) : null));
}
function Stats({
  variant,
  setVariant,
  statsFill
}) {
  const {
    StatCard
  } = window.RGBYDS;
  const opts = ["v1", "v2", "v5"];
  if (variant === "v3" || variant === "v4" || variant === "v5") return /*#__PURE__*/React.createElement("section", {
    className: "stats-x stats-x--" + variant,
    "data-screen-label": "02 \u0427\u0438\u0441\u043B\u0430"
  }, /*#__PURE__*/React.createElement(VariantSwitch, {
    label: "\u0427\u0438\u0441\u043B\u0430",
    value: variant,
    options: opts,
    onChange: setVariant
  }), /*#__PURE__*/React.createElement(StatsX, {
    variant: variant,
    fill: statsFill
  }));
  return /*#__PURE__*/React.createElement("section", {
    className: "stats stats--" + variant,
    "data-screen-label": "02 \u0427\u0438\u0441\u043B\u0430",
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(VariantSwitch, {
    label: "\u0427\u0438\u0441\u043B\u0430",
    value: variant,
    options: opts,
    onChange: setVariant
  }), window.RGBY_DATA.STATS.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "rv",
    style: {
      "--d": i * 90 + "ms",
      display: "grid"
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    value: s.v,
    label: s.l,
    tone: variant === "v2" ? "blue" : "muted"
  }))));
}
function Why({
  variant,
  setVariant
}) {
  const W = window.RGBY_DATA.WHY;
  const item = (w, i) => /*#__PURE__*/React.createElement("div", {
    className: "why__item rv",
    key: i,
    style: {
      "--d": i % 2 * 120 + "ms"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "why__t"
  }, w.t), /*#__PURE__*/React.createElement("p", {
    className: "why__d"
  }, w.d));
  return /*#__PURE__*/React.createElement("section", {
    id: "why",
    "data-screen-label": "03 \u041F\u043E\u0447\u0435\u043C\u0443 \u043C\u044B",
    className: "sec why-" + variant + (variant === "v1" ? "" : variant === "v2" ? " sec--l" : "") + (variant === "v5" ? " why-pin" : "")
  }, /*#__PURE__*/React.createElement(VariantSwitch, {
    label: "\u041F\u043E\u0447\u0435\u043C\u0443 \u043C\u044B",
    value: variant,
    options: ["v1", "v2", "v3", "v4", "v5", "v6", "v7"],
    onChange: setVariant
  }), ["v4", "v5", "v6", "v7"].includes(variant) ? /*#__PURE__*/React.createElement(WhyX, {
    variant: variant
  }) : variant === "v1" ? /*#__PURE__*/React.createElement("div", {
    className: "g12"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "sec__title c4 rv"
  }, "\u041F\u043E\u0447\u0435\u043C\u0443 \u043C\u044B"), /*#__PURE__*/React.createElement("div", {
    className: "c8 why__grid"
  }, W.slice(0, 2).map(item)), /*#__PURE__*/React.createElement("div", {
    className: "o4 why__grid"
  }, W.slice(2).map((w, i) => item(w, i + 2)))) : /*#__PURE__*/React.createElement("div", {
    className: "stack",
    style: {
      gap: "var(--sp-40)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "sec__title rv"
  }, "\u041F\u043E\u0447\u0435\u043C\u0443 \u043C\u044B"), /*#__PURE__*/React.createElement("hr", {
    className: "hair"
  }), /*#__PURE__*/React.createElement("div", {
    className: "why__row"
  }, W.slice(0, 2).map(item)), /*#__PURE__*/React.createElement("hr", {
    className: "hair"
  }), /*#__PURE__*/React.createElement("div", {
    className: "why__row" + (variant === "v2" ? " why__row--off" : "")
  }, W.slice(2).map((w, i) => item(w, i + 2)))));
}
Object.assign(window, {
  VariantSwitch,
  Header,
  StickyHeader,
  Hero,
  Stats,
  Why,
  Lines,
  NAV
});
