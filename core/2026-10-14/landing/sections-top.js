// RGBY · sections-top.jsx.txt · сборка 2026-10-14
function VariantSwitch({
  label,
  value,
  options,
  onChange
}) {
  return React.createElement("div", {
    className: "vsw",
    role: "group",
    "aria-label": "Вариант блока " + label
  }, React.createElement("span", null, label), options.map(o => React.createElement("button", {
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
  var {
    Logo,
    Button,
    Burger
  } = window.RGBYDS;
  var ink = dark ? "var(--rgby-paper)" : variant === "v3" ? "var(--rgby-ink-3)" : variant === "v1" ? "var(--rgby-ink-2)" : "var(--rgby-ink)";
  return React.createElement("header", {
    className: "hdr",
    style: {
      color: ink
    }
  }, React.createElement("div", {
    className: "hdr__l"
  }, React.createElement("a", {
    href: "#top",
    "aria-label": "RGBY \u2014 \u043D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E",
    style: {
      color: ink,
      display: "flex"
    }
  }, React.createElement(Logo, {
    color: ink
  })), variant === "v2" ? React.createElement(React.Fragment, null, React.createElement("span", {
    className: "hdr__sep"
  }), React.createElement("span", {
    className: "hdr__mark"
  }, "\u0422\u0412/\u041C\u0415\u0414\u0418\u0410")) : null), React.createElement("div", {
    className: "hdr__r"
  }, React.createElement(Button, {
    variant: dark ? "paper" : variant === "v2" ? "blue" : "ink",
    size: variant === "v1" ? "m" : "l",
    onClick: onBrief,
    style: variant === "v3" ? {
      background: "var(--rgby-ink-3)",
      color: "#F2F2FF"
    } : null
  }, "\u0420\u0430\u0441\u0441\u0447\u0438\u0442\u0430\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442"), React.createElement(MenuBurger, {
    color: ink
  })));
}
function StickyHeader({
  show,
  onBrief
}) {
  var {
    Logo,
    Button
  } = window.RGBYDS;
  var menuOpen = useMenuOpen();
  var [hold, setHold] = React.useState(false);
  var prev = React.useRef(menuOpen);
  React.useEffect(() => {
    if (prev.current && !menuOpen) {
      setHold(true);
      var t = setTimeout(() => setHold(false), 900);
      prev.current = menuOpen;
      return () => clearTimeout(t);
    }
    prev.current = menuOpen;
  }, [menuOpen]);
  return React.createElement("div", {
    className: "sticky" + (show && !menuOpen && !hold ? " sticky--on" : "")
  }, React.createElement("a", {
    href: "#top",
    "aria-label": "RGBY",
    style: {
      display: "flex",
      color: "var(--rgby-ink)"
    }
  }, React.createElement(Logo, null)), React.createElement("div", {
    className: "hdr__r"
  }, React.createElement(Button, {
    variant: "blue",
    size: "m",
    onClick: onBrief
  }, "\u0420\u0430\u0441\u0441\u0447\u0438\u0442\u0430\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442"), React.createElement(MenuBurger, {
    color: "var(--rgby-ink)"
  })));
}
var NAV = [["Почему мы", "#why"], ["Что мы делаем", "#services"], ["Кейсы", "#cases"], ["Награды", "#awards"], ["Команда", "#team"], ["Контакты", "#contacts"]];
function Lines({
  text,
  base = 0
}) {
  return String(text).split("\n").map((l, i) => React.createElement("span", {
    className: "rv-line",
    key: i
  }, React.createElement("span", {
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
  var [tone, setTone] = React.useState("light");
  var {
    Notice
  } = window.RGBYDS;
  var D = window.RGBY_DATA;
  var [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    var t;
    var go = () => {
      t = setTimeout(() => setReady(true), 80);
    };
    var reset = () => setReady(false);
    if (window.__rgbyPreloaded !== false) go();
    window.addEventListener("rgby:preloaded", go);
    window.addEventListener("rgby:preloading", reset);
    return () => {
      clearTimeout(t);
      window.removeEventListener("rgby:preloaded", go);
      window.removeEventListener("rgby:preloading", reset);
    };
  }, [variant]);
  var img = variant === "v1" ? window.RGBY_DATA.img("hero-cover.jpg") : window.RGBY_DATA.img("hero-still.jpg");
  return React.createElement("section", {
    id: "top",
    "data-screen-label": "01 Hero",
    className: "hero hero--" + variant + (ready ? " rv--in" : "")
  }, React.createElement(VariantSwitch, {
    label: "Hero",
    value: variant,
    options: ["v1", "v2", "v3"],
    onChange: setVariant
  }), React.createElement("div", {
    className: "hero__cover"
  }, variant === "v1" ? React.createElement(HeroStage, {
    motion: motion,
    band: band,
    auto: auto,
    interval: interval,
    active: ready,
    onTone: setTone,
    cover: coverOn
  }) : coverOn ? React.createElement("img", {
    src: img,
    alt: "",
    "data-parallax": "0.18"
  }) : null), React.createElement(Header, {
    variant: variant,
    onMenu: onMenu,
    menuOpen: menuOpen,
    onBrief: onBrief,
    dark: variant === "v1" && coverOn && tone === "dark"
  }), variant === "v2" && notice !== "off" ? React.createElement("div", {
    className: "hero__notice rv rv--in",
    style: {
      "--d": "600ms"
    }
  }, React.createElement(Notice, {
    variant: "compact",
    onClose: () => setNotice("off")
  }, noticeText)) : null, React.createElement("div", {
    className: "hero__bottom"
  }, React.createElement("div", {
    className: "hero__copy"
  }, React.createElement("h1", {
    className: "hero__h"
  }, React.createElement(Lines, {
    text: variant === "v3" ? "Оформление телеканалов \nи медиапроектов" : "Оформление телеканалов и медиапроектов",
    base: 200
  })), React.createElement("p", {
    className: "hero__p rv",
    style: {
      "--d": "450ms"
    }
  }, variant === "v2" ? "Айдентика, эфирный пакет, промо и ID. Одна команда — от идеи до мастер-файлов, готовых к выдаче в эфир." : "Айдентика, эфирный пакет, промо и ID. Одна команда — \nот идеи до мастер-файлов, готовых к выдаче в эфир.")), variant !== "v2" ? React.createElement("p", {
    className: "hero__mark"
  }, React.createElement(Lines, {
    text: "\u0422\u0412/\u041C\u0415\u0414\u0418\u0410",
    base: 120
  })) : null));
}
function Stats({
  variant,
  setVariant,
  statsFill
}) {
  var {
    StatCard
  } = window.RGBYDS;
  var opts = ["v1", "v2", "v5"];
  if (variant === "v3" || variant === "v4" || variant === "v5") return React.createElement("section", {
    className: "stats-x stats-x--" + variant,
    "data-screen-label": "02 \u0427\u0438\u0441\u043B\u0430"
  }, React.createElement(VariantSwitch, {
    label: "\u0427\u0438\u0441\u043B\u0430",
    value: variant,
    options: opts,
    onChange: setVariant
  }), React.createElement(StatsX, {
    variant: variant,
    fill: statsFill
  }));
  return React.createElement("section", {
    className: "stats stats--" + variant,
    "data-screen-label": "02 \u0427\u0438\u0441\u043B\u0430",
    style: {
      position: "relative"
    }
  }, React.createElement(VariantSwitch, {
    label: "\u0427\u0438\u0441\u043B\u0430",
    value: variant,
    options: opts,
    onChange: setVariant
  }), window.RGBY_DATA.STATS.map((s, i) => React.createElement("div", {
    key: i,
    className: "rv",
    style: {
      "--d": i * 90 + "ms",
      display: "grid"
    }
  }, React.createElement(StatCard, {
    value: s.v,
    label: s.l,
    tone: variant === "v2" ? "blue" : "muted",
    animate: true
  }))));
}
function Why({
  variant,
  setVariant
}) {
  var W = window.RGBY_DATA.WHY;
  var item = (w, i) => React.createElement("div", {
    className: "why__item rv",
    key: i,
    style: {
      "--d": i % 2 * 120 + "ms"
    }
  }, React.createElement("span", {
    className: "why__t"
  }, w.t), React.createElement("p", {
    className: "why__d"
  }, w.d));
  return React.createElement("section", {
    id: "why",
    "data-screen-label": "03 \u041F\u043E\u0447\u0435\u043C\u0443 \u043C\u044B",
    className: "sec why-" + variant + (variant === "v1" ? "" : variant === "v2" ? " sec--l" : "") + (variant === "v5" ? " why-pin" : "")
  }, React.createElement(VariantSwitch, {
    label: "\u041F\u043E\u0447\u0435\u043C\u0443 \u043C\u044B",
    value: variant,
    options: ["v1", "v2", "v3", "v4", "v5", "v6", "v7"],
    onChange: setVariant
  }), ["v4", "v5", "v6", "v7"].includes(variant) ? React.createElement(WhyX, {
    variant: variant
  }) : variant === "v1" ? React.createElement("div", {
    className: "g12"
  }, React.createElement("h2", {
    className: "sec__title c4 rv"
  }, "\u041F\u043E\u0447\u0435\u043C\u0443 \u043C\u044B"), React.createElement("div", {
    className: "c8 why__grid"
  }, W.slice(0, 2).map(item)), React.createElement("div", {
    className: "o4 why__grid"
  }, W.slice(2).map((w, i) => item(w, i + 2)))) : React.createElement("div", {
    className: "stack",
    style: {
      gap: "var(--sp-40)"
    }
  }, React.createElement("h2", {
    className: "sec__title rv"
  }, "\u041F\u043E\u0447\u0435\u043C\u0443 \u043C\u044B"), React.createElement("hr", {
    className: "hair"
  }), React.createElement("div", {
    className: "why__row"
  }, W.slice(0, 2).map(item)), React.createElement("hr", {
    className: "hair"
  }), React.createElement("div", {
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