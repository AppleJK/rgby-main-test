// RGBY · main-blocks.jsx.txt · сборка 2026-10-14
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var MD = () => window.RGBY_MAIN;
var go = h => {
  var el = document.querySelector(h);
  if (el) (window.__scrollTo || window.scrollTo.bind(window))(el.getBoundingClientRect().top + scrollY - 40);
};
function useCycle(n, ms, on = true) {
  var [i, setI] = React.useState(0);
  React.useEffect(() => {
    if (!on) return;
    var t = setInterval(() => setI(x => (x + 1) % n), ms);
    return () => clearInterval(t);
  }, [n, ms, on]);
  return [i, setI];
}
function Arrow({
  className = ""
}) {
  return React.createElement("span", {
    className: "m-arrow " + className,
    "aria-hidden": "true"
  }, "\u2192");
}
function SplitLines({
  text
}) {
  return String(text).split("\n").map((l, i) => React.createElement("span", {
    className: "rv-line",
    key: i
  }, React.createElement("span", {
    style: {
      "--d": 120 + i * 90 + "ms"
    }
  }, l)));
}
function MainHeader({
  tone = "paper"
}) {
  var {
      Logo,
      Button
    } = window.RGBYDS,
    Burger = window.MenuBurger;
  return React.createElement("header", {
    className: "m-hdr m-hdr--" + tone
  }, React.createElement("a", {
    href: "#top",
    "aria-label": "RGBY",
    className: "m-hdr__logo"
  }, React.createElement(Logo, {
    color: "currentColor"
  })), React.createElement("div", {
    className: "m-hdr__r"
  }, React.createElement(Button, {
    variant: tone === "blue" ? "paper" : "blue",
    size: "m",
    onClick: () => go("#brief")
  }, "\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442"), Burger ? React.createElement(Burger, {
    color: "currentColor"
  }) : null));
}
function MainHero({
  variant,
  setVariant
}) {
  var H = MD().HERO,
    D = MD().DIRECTIONS.slice(0, 4),
    [w] = useCycle(H.tagline.length, 2200);
  var vs = React.createElement(VariantSwitch, {
    label: "\u041E\u0431\u043B\u043E\u0436\u043A\u0430",
    value: variant,
    options: ["v1", "v2", "v3"],
    onChange: setVariant
  });
  if (variant === "v2") return React.createElement("section", {
    id: "top",
    className: "m-hero m-hero--v2 rv--in",
    "data-screen-label": "01 \u041E\u0431\u043B\u043E\u0436\u043A\u0430"
  }, vs, React.createElement("div", {
    className: "m-hero2__l"
  }, React.createElement(MainHeader, {
    tone: "paper"
  }), React.createElement("h1", {
    className: "m-hero__h t-h1"
  }, React.createElement(SplitLines, {
    text: H.title
  })), React.createElement("div", {
    className: "m-hero2__dirs"
  }, D.map((d, i) => React.createElement("a", {
    key: d.id,
    href: "#hub",
    onClick: e => {
      e.preventDefault();
      go("#hub");
    },
    className: "m-chip rv",
    style: {
      "--d": 300 + i * 70 + "ms"
    }
  }, d.title)))), React.createElement("div", {
    className: "m-hero2__r"
  }, window.Noise ? React.createElement(window.Noise, {
    className: "m-grain"
  }) : null, React.createElement("div", {
    className: "m-hero2__word t-display-xl",
    "aria-live": "polite"
  }, H.tagline.map((x, i) => React.createElement("span", {
    key: x,
    className: i === w ? "is-on" : i === (w + H.tagline.length - 1) % H.tagline.length ? "is-out" : ""
  }, x))), React.createElement("span", {
    className: "m-hero2__n t-label"
  }, String(w + 1).padStart(2, "0"), " / ", String(H.tagline.length).padStart(2, "0"))));
  if (variant === "v3") return React.createElement("section", {
    id: "top",
    className: "m-hero m-hero--v3 rv--in",
    "data-screen-label": "01 \u041E\u0431\u043B\u043E\u0436\u043A\u0430"
  }, vs, React.createElement("div", {
    className: "m-hero3__grid",
    "aria-hidden": "true"
  }, Array.from({
    length: 12
  }).map((_, i) => React.createElement("i", {
    key: i,
    style: {
      "--d": i * 60 + "ms"
    }
  }))), React.createElement(MainHeader, {
    tone: "blue"
  }), React.createElement("div", {
    className: "m-hero3__mid"
  }, React.createElement("h1", {
    className: "m-hero__h t-display-xl"
  }, React.createElement(SplitLines, {
    text: H.title
  }))), React.createElement("div", {
    className: "m-hero3__cells"
  }, D.map((d, i) => React.createElement("a", {
    key: d.id,
    href: "#hub",
    onClick: e => {
      e.preventDefault();
      go("#hub");
    },
    className: "m-hero3__cell rv",
    style: {
      "--d": 400 + i * 80 + "ms"
    }
  }, React.createElement("span", {
    className: "t-label"
  }, d.n), React.createElement("b", {
    className: "t-h3-l"
  }, d.title), React.createElement(Arrow, null)))));
  return React.createElement("section", {
    id: "top",
    className: "m-hero m-hero--v1 rv--in",
    "data-screen-label": "01 \u041E\u0431\u043B\u043E\u0436\u043A\u0430"
  }, vs, window.Noise ? React.createElement(window.Noise, {
    className: "m-grain"
  }) : null, React.createElement("i", {
    className: "m-hero1__orb",
    "aria-hidden": "true"
  }), React.createElement(MainHeader, {
    tone: "blue"
  }), React.createElement("h1", {
    className: "m-hero__h t-display-xl"
  }, React.createElement(SplitLines, {
    text: H.title
  })), React.createElement("div", {
    className: "m-hero1__foot"
  }, React.createElement("div", {
    className: "m-hero1__tags t-h2"
  }, H.tagline.map((x, i) => React.createElement("span", {
    key: x,
    className: i === w ? "is-on" : ""
  }, x))), React.createElement("div", {
    className: "m-hero1__dirs"
  }, D.map(d => React.createElement("a", {
    key: d.id,
    href: "#hub",
    onClick: e => {
      e.preventDefault();
      go("#hub");
    },
    className: "m-chip m-chip--paper"
  }, d.title)))));
}
function Hub({
  variant,
  setVariant,
  count,
  setCount
}) {
  var D = MD().DIRECTIONS.slice(0, count);
  var [act, setAct] = React.useState(0),
    [hov, setHov] = React.useState(false);
  React.useEffect(() => {
    if (variant !== "accordion" || hov) return;
    var t = setInterval(() => setAct(a => (a + 1) % D.length), 4200);
    return () => clearInterval(t);
  }, [variant, hov, D.length]);
  var link = d => ({
    href: d.href,
    onClick: e => {
      if (d.href === "#") e.preventDefault();
    }
  });
  return React.createElement("section", {
    id: "hub",
    className: "m-sec m-hub m-hub--" + variant + " m-hub--n" + count,
    "data-screen-label": "02 \u041D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F"
  }, React.createElement(VariantSwitch, {
    label: "\u041D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F",
    value: variant,
    options: window.HUB_VARIANTS || ["tiles", "list", "accordion"],
    onChange: setVariant
  }), React.createElement("div", {
    className: "vsw m-vsw2"
  }, React.createElement("span", null, "\u041A\u0430\u0440\u0442\u043E\u0447\u0435\u043A"), [4, 5, 6].map(n => React.createElement("button", {
    key: n,
    type: "button",
    "aria-pressed": count === n,
    onClick: () => setCount(n)
  }, n))), React.createElement("div", {
    className: "m-head"
  }, React.createElement("h2", {
    className: "sec__title rv"
  }, "\u041D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F"), React.createElement("p", {
    className: "m-head__lead t-body-l rv",
    style: {
      "--d": "100ms"
    }
  }, "\u0423 \u043A\u0430\u0436\u0434\u043E\u0433\u043E \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u2014 \u0441\u0432\u043E\u044F \u043A\u043E\u043C\u0430\u043D\u0434\u0430 \u0438 \u0441\u0432\u043E\u0439 \u0441\u0430\u0439\u0442. \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435, \u0441 \u0447\u0435\u043C \u043A \u043D\u0430\u043C \u043F\u0440\u0438\u0448\u043B\u0438")), variant === "tiles" ? React.createElement("div", {
    className: "m-tiles"
  }, D.map((d, i) => React.createElement("a", _extends({
    key: d.id,
    className: "m-tile rv",
    style: {
      "--d": i % 3 * 90 + "ms"
    }
  }, link(d)), React.createElement("span", {
    className: "m-tile__img",
    style: {
      backgroundImage: "url(" + d.img + ")"
    }
  }), React.createElement("span", {
    className: "m-tile__top"
  }, React.createElement("span", {
    className: "t-label"
  }, d.n), d.ready ? React.createElement("span", {
    className: "m-tile__live t-label"
  }, "\u0421\u0430\u0439\u0442 \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F") : null), React.createElement("span", {
    className: "m-tile__title t-h1"
  }, d.title), React.createElement("span", {
    className: "m-tile__sub t-body-m"
  }, d.sub), React.createElement("span", {
    className: "m-tile__tags"
  }, d.tags.map(t => React.createElement("i", {
    key: t
  }, t))), React.createElement(Arrow, {
    className: "m-tile__arr"
  })))) : variant === "list" ? React.createElement("div", {
    className: "m-rows"
  }, D.map((d, i) => React.createElement("a", _extends({
    key: d.id,
    className: "m-row rv",
    style: {
      "--d": i * 60 + "ms"
    }
  }, link(d)), React.createElement("span", {
    className: "m-row__n t-label"
  }, d.n), React.createElement("span", {
    className: "m-row__title t-display-xl"
  }, d.title), React.createElement("span", {
    className: "m-row__sub t-body-m"
  }, d.sub), React.createElement("span", {
    className: "m-row__img",
    style: {
      backgroundImage: "url(" + d.img + ")"
    }
  }), React.createElement(Arrow, {
    className: "m-row__arr"
  })))) : React.createElement("div", {
    className: "m-acc",
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false)
  }, D.map((d, i) => React.createElement("a", _extends({
    key: d.id,
    className: "m-acc__p" + (i === act ? " is-on" : ""),
    onMouseEnter: () => setAct(i),
    onFocus: () => setAct(i)
  }, link(d)), React.createElement("span", {
    className: "m-acc__img",
    style: {
      backgroundImage: "url(" + d.img + ")"
    }
  }), React.createElement("span", {
    className: "m-acc__n t-label"
  }, d.n), React.createElement("span", {
    className: "m-acc__vt t-h3-l"
  }, d.title), React.createElement("span", {
    className: "m-acc__body"
  }, React.createElement("b", {
    className: "t-h1"
  }, d.title), React.createElement("span", {
    className: "t-body-m"
  }, d.text), React.createElement("span", {
    className: "m-acc__go t-link"
  }, "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 ", React.createElement(Arrow, null))), i === act && !hov ? React.createElement("i", {
    className: "m-acc__bar",
    key: act
  }) : null))));
}
function About({
  variant,
  setVariant,
  fill = "blur",
  blurCfg = {}
}) {
  var A = MD().ABOUT,
    ref = React.useRef(null),
    [p, setP] = React.useState(0),
    tgt = React.useRef(0),
    cur = React.useRef(0);
  React.useEffect(() => {
    if (variant !== "v1") return;
    var raf = 0;
    var read = () => {
      var r = ref.current && ref.current.getBoundingClientRect();
      if (r) tgt.current = Math.min(1, Math.max(0, (innerHeight * .8 - r.top) / (r.height + innerHeight * .3)));
    };
    var loop = () => {
      raf = 0;
      cur.current += (tgt.current - cur.current) * .07;
      if (Math.abs(tgt.current - cur.current) < .0004) cur.current = tgt.current;
      setP(cur.current);
      if (cur.current !== tgt.current) raf = requestAnimationFrame(loop);
    };
    var q = () => {
      read();
      if (!raf) raf = requestAnimationFrame(loop);
    };
    read();
    cur.current = tgt.current;
    setP(tgt.current);
    addEventListener("scroll", q, {
      passive: true
    });
    addEventListener("resize", q);
    return () => {
      removeEventListener("scroll", q);
      removeEventListener("resize", q);
      cancelAnimationFrame(raf);
    };
  }, [variant]);
  var words = A.text.split(" "),
    N = words.length,
    W = 3.5,
    SL = 5;
  var BIND = /^(в|во|на|и|а|но|к|ко|с|со|у|о|об|от|до|по|за|из|не|ни|для|без|над|под|про|при|что|как|или|чтобы|если|когда|где|—|–)$/i;
  var groups = [];
  words.forEach((x, i) => {
    var g = groups[groups.length - 1];
    if (g && BIND.test(words[g[g.length - 1]])) g.push(i);else groups.push([i]);
  });
  var cl = x => x <= 0 ? 0 : x >= 1 ? 1 : x;
  var wq = i => {
    var x = cl((p * (N + W) - i) / W);
    return x * x * (3 - 2 * x);
  };
  var hd = p * (N + SL),
    tl = hd - SL;
  var wStyle = i => {
    if (fill !== "select") return {
      "--q": wq(i).toFixed(3)
    };
    var a = cl(hd - i),
      b2 = cl(tl - i);
    return {
      "--a": a.toFixed(4),
      "--b": b2.toFixed(4),
      "--x": a >= 1 && i < N - 1 && hd - i > 1 ? "1" : "0"
    };
  };
  return React.createElement("section", {
    id: "about",
    className: "m-sec m-about m-about--" + variant + (variant === "v2" ? " sec--blue" : ""),
    "data-screen-label": "03 \u041E \u0441\u0442\u0443\u0434\u0438\u0438"
  }, React.createElement(VariantSwitch, {
    label: "\u041E \u0441\u0442\u0443\u0434\u0438\u0438",
    value: variant,
    options: ["v1", "v2", "v3"],
    onChange: setVariant
  }), variant === "v1" ? React.createElement("div", {
    className: "m-about1 m-about1--" + fill,
    style: fill === "blur" ? {
      "--bl": (blurCfg.amount ?? 7) + "px",
      "--bs": blurCfg.scale ?? 1.04,
      "--bo": blurCfg.opacity ?? .3,
      "--bt": blurCfg.tint || "6,16,37"
    } : undefined
  }, React.createElement("h2", {
    className: "m-about1__lab t-body-l rv"
  }, A.title), React.createElement("p", {
    ref: ref,
    className: "m-about1__t"
  }, groups.map((g, k) => React.createElement(React.Fragment, {
    key: k
  }, React.createElement("span", {
    className: "m-about1__g",
    style: {
      whiteSpace: "nowrap"
    }
  }, g.map((i, j) => {
    var x = words[i];
    return React.createElement(React.Fragment, {
      key: i
    }, j ? " " : null, React.createElement("span", {
      className: "m-about1__w",
      style: wStyle(i),
      "data-t": x
    }, x, fill === "select" ? React.createElement("span", {
      className: "m-about1__ink",
      "aria-hidden": "true"
    }, x) : null));
  })), " ")))) : variant === "v2" ? React.createElement("div", {
    className: "m-about2"
  }, window.Noise ? React.createElement(window.Noise, {
    className: "m-grain"
  }) : null, React.createElement("h2", {
    className: "m-about2__t t-display-xl rv"
  }, React.createElement(SplitLines, {
    text: A.title.replace(", звучит", ",\nзвучит")
  })), React.createElement("p", {
    className: "t-body-l m-about2__p rv",
    style: {
      "--d": "200ms"
    }
  }, A.text)) : React.createElement("div", {
    className: "m-about3"
  }, React.createElement("h2", {
    className: "m-about3__t t-h1 rv"
  }, "\u041F\u0440\u0438\u0434\u0443\u043C\u044B\u0432\u0430\u0435\u043C, \u043A\u0430\u043A \u0431\u0440\u0435\u043D\u0434 ", React.createElement("mark", null, "\u0432\u044B\u0433\u043B\u044F\u0434\u0438\u0442"), ", ", React.createElement("mark", null, "\u0437\u0432\u0443\u0447\u0438\u0442"), " \u0438 ", React.createElement("mark", null, "\u0434\u0432\u0438\u0436\u0435\u0442\u0441\u044F")), React.createElement("p", {
    className: "t-body-l m-about3__p rv",
    style: {
      "--d": "150ms"
    }
  }, A.text)));
}
var NEWS_STEP = {
  v1: [6, 3],
  v2: [6, 3],
  v3: [5, 4]
};
function News({
  variant,
  setVariant
}) {
  var ALL = MD().NEWS,
    [first, step] = NEWS_STEP[variant] || NEWS_STEP.v1,
    [shown, setShown] = React.useState(first),
    {
      Button
    } = window.RGBYDS;
  React.useEffect(() => setShown(first), [variant]);
  var N = ALL.slice(0, shown),
    left = ALL.length - shown,
    more = () => setShown(s => Math.min(ALL.length, s + step));
  var nd = (i, base) => ({
    "--d": (i >= first ? (i - first) % step : i) * (base || 90) + "ms"
  });
  var portal = MD().NEWS_PORTAL || "#",
    toPortal = e => {
      if (portal === "#") e.preventDefault();
    };
  return React.createElement("section", {
    id: "news",
    className: "m-sec m-news m-news--" + variant,
    "data-screen-label": "04 \u0427\u0442\u043E \u043F\u0440\u043E\u0438\u0441\u0445\u043E\u0434\u0438\u0442"
  }, React.createElement(VariantSwitch, {
    label: "\u0427\u0442\u043E \u043F\u0440\u043E\u0438\u0441\u0445\u043E\u0434\u0438\u0442",
    value: variant,
    options: ["v1", "v2", "v3", "v4", "v5", "v6"],
    onChange: setVariant
  }), React.createElement("div", {
    className: "m-head"
  }, React.createElement("h2", {
    className: "sec__title rv"
  }, "\u0427\u0442\u043E \u043F\u0440\u043E\u0438\u0441\u0445\u043E\u0434\u0438\u0442"), React.createElement("p", {
    className: "m-head__lead t-body-l rv"
  }, MD().NEWS_LEAD), React.createElement("a", {
    className: "t-link rv m-news__all",
    href: portal,
    onClick: toPortal
  }, "\u0412\u0441\u0435 \u043D\u043E\u0432\u043E\u0441\u0442\u0438 ", React.createElement(Arrow, null))), variant === "v2" ? React.createElement("div", {
    className: "m-nl"
  }, N.map((n, i) => React.createElement("a", {
    key: i,
    href: "#",
    onClick: e => e.preventDefault(),
    className: "m-nl__row rv",
    style: nd(i, 70)
  }, React.createElement("span", {
    className: "t-label m-nl__k"
  }, "/ ", n.kind), React.createElement("span", {
    className: "t-h1 m-nl__t"
  }, n.title), React.createElement("span", {
    className: "t-body-m m-nl__p"
  }, n.text), React.createElement("span", {
    className: "m-nl__img",
    style: {
      backgroundImage: "url(" + n.img + ")"
    }
  }), React.createElement(Arrow, null)))) : variant === "v3" ? React.createElement("div", {
    className: "m-nf"
  }, React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    className: "m-nf__big rv"
  }, React.createElement("span", {
    className: "m-nf__img",
    style: {
      backgroundImage: "url(" + N[0].img + ")"
    }
  }), React.createElement("span", {
    className: "m-nf__cap"
  }, React.createElement("span", {
    className: "t-label"
  }, "/ ", N[0].kind), React.createElement("b", {
    className: "t-h1"
  }, N[0].title), React.createElement("span", {
    className: "t-body-m"
  }, N[0].text))), React.createElement("div", {
    className: "m-nf__side"
  }, N.slice(1).map((n, i) => React.createElement("a", {
    key: i,
    href: "#",
    onClick: e => e.preventDefault(),
    className: "m-nf__s rv",
    style: nd(i + 1)
  }, React.createElement("span", {
    className: "t-label"
  }, "/ ", n.kind), React.createElement("b", {
    className: "t-h3-l"
  }, n.title), React.createElement("span", {
    className: "t-body-m"
  }, n.text), React.createElement(Arrow, null))))) : React.createElement("div", {
    className: "m-nc"
  }, N.map((n, i) => React.createElement("a", {
    key: i,
    href: "#",
    onClick: e => e.preventDefault(),
    className: "m-nc__c rv",
    style: nd(i)
  }, React.createElement("span", {
    className: "m-nc__img",
    style: {
      backgroundImage: "url(" + n.img + ")"
    }
  }, React.createElement("i", {
    className: "t-label"
  }, "/ ", n.kind)), React.createElement("b", {
    className: "t-h3-l"
  }, n.title), React.createElement("span", {
    className: "t-body-m"
  }, n.text)))), React.createElement("div", {
    className: "m-news__bar"
  }, React.createElement("span", {
    className: "m-news__count t-label"
  }, React.createElement("span", null, String(shown).padStart(2, "0"), " / ", String(ALL.length).padStart(2, "0")), React.createElement("i", null, React.createElement("b", {
    style: {
      transform: "scaleX(" + (shown / ALL.length).toFixed(3) + ")"
    }
  }))), left > 0 ? React.createElement("button", {
    type: "button",
    className: "m-news__more",
    onClick: more
  }, React.createElement("span", {
    className: "t-h3-l"
  }, "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0435\u0449\u0451"), React.createElement("span", {
    className: "t-label"
  }, "+", Math.min(step, left))) : React.createElement("span", {
    className: "m-news__done t-body-m"
  }, "\u042D\u0442\u043E \u0432\u0441\u0435 \u0441\u0432\u0435\u0436\u0438\u0435 \u043D\u043E\u0432\u043E\u0441\u0442\u0438 \u2014 \u043E\u0441\u0442\u0430\u043B\u044C\u043D\u043E\u0435 \u0432 \u0430\u0440\u0445\u0438\u0432\u0435"), React.createElement("a", {
    href: portal,
    onClick: toPortal,
    className: "m-news__portal"
  }, React.createElement(Button, {
    variant: "blue",
    size: "l",
    tabIndex: "-1"
  }, "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 \u043C\u0435\u0434\u0438\u0430-\u043F\u043E\u0440\u0442\u0430\u043B \u2192"))));
}
function Trust({
  variant,
  setVariant
}) {
  var ClientLogo = window.ClientLogo,
    M = MD(),
    [g, setG] = React.useState("Все");
  var list = g === "Все" ? M.CLIENTS : M.CLIENTS.filter(c => c.group === g);
  var tabs = React.createElement("div", {
    className: "m-tabs rv"
  }, ["Все"].concat(M.CLIENT_GROUPS).map(x => React.createElement("button", {
    key: x,
    type: "button",
    "aria-pressed": g === x,
    className: "m-tab",
    onClick: () => setG(x)
  }, x)));
  return React.createElement("section", {
    id: "clients",
    className: "m-sec m-trust m-trust--" + variant + (variant === "v3" ? " sec--blue" : ""),
    "data-screen-label": "05 \u041A\u043B\u0438\u0435\u043D\u0442\u044B"
  }, React.createElement(VariantSwitch, {
    label: "\u041A\u043B\u0438\u0435\u043D\u0442\u044B",
    value: variant,
    options: ["v1", "v2", "v3"],
    onChange: setVariant
  }), React.createElement("div", {
    className: "m-head"
  }, React.createElement("h2", {
    className: "sec__title rv"
  }, "\u041A\u0442\u043E \u043D\u0430\u043C \u0434\u043E\u0432\u0435\u0440\u044F\u0435\u0442"), React.createElement("p", {
    className: "m-head__lead t-body-l rv"
  }, M.CLIENTS_LEAD)), variant === "v1" ? React.createElement(window.ClientsStrip, {
    list: M.CLIENTS
  }) : variant === "v2" ? React.createElement("div", {
    className: "m-mq"
  }, M.CLIENT_GROUPS.map((gr, r) => React.createElement("div", {
    key: gr,
    className: "m-mq__row"
  }, React.createElement("span", {
    className: "m-mq__lbl t-label"
  }, gr), React.createElement("div", {
    className: "m-mq__track" + (r % 2 ? " is-rev" : "")
  }, [0, 1].map(k => React.createElement("div", {
    key: k,
    className: "m-mq__set"
  }, M.CLIENTS.concat(M.CLIENTS).map((c, i) => React.createElement(ClientLogo, {
    key: i,
    c: c,
    tone: "bare",
    className: "m-mq__logo"
  })))))))) : React.createElement(React.Fragment, null, tabs, React.createElement("div", {
    className: "m-logos",
    key: g
  }, list.map((c, i) => React.createElement("div", {
    key: c.id,
    className: "m-logos__i",
    style: {
      "--d": i * 40 + "ms"
    }
  }, React.createElement(ClientLogo, {
    c: c,
    tone: variant === "v3" ? "dark" : "mist"
  }))))));
}
function Projects({
  variant,
  setVariant
}) {
  var P = MD().PROJECTS,
    track = React.useRef(null),
    [prog, setProg] = React.useState(0),
    [pv, setPv] = React.useState(null);
  var onScroll = () => {
    var t = track.current;
    if (t) setProg(t.scrollLeft / Math.max(1, t.scrollWidth - t.clientWidth));
  };
  return React.createElement("section", {
    id: "projects",
    className: "m-sec m-proj m-proj--" + variant,
    "data-screen-label": "06 \u041F\u0440\u043E\u0435\u043A\u0442\u044B"
  }, React.createElement(VariantSwitch, {
    label: "\u041F\u0440\u043E\u0435\u043A\u0442\u044B",
    value: variant,
    options: ["v1", "v2", "v3"],
    onChange: setVariant
  }), React.createElement("div", {
    className: "m-head"
  }, React.createElement("h2", {
    className: "sec__title rv"
  }, "\u041D\u0430\u0448\u0438 \u043F\u0440\u043E\u0435\u043A\u0442\u044B"), React.createElement("a", {
    className: "t-link rv",
    href: "#"
  }, "\u0412\u0441\u0435 \u043F\u0440\u043E\u0435\u043A\u0442\u044B ", React.createElement(Arrow, null))), variant === "v2" ? React.createElement("div", {
    className: "m-pl",
    onMouseLeave: () => setPv(null),
    onMouseMove: e => {
      var el = e.currentTarget.querySelector(".m-pl__pv");
      if (el) el.style.transform = "translate(" + (e.clientX + 24) + "px," + (e.clientY - 120) + "px)";
    }
  }, P.map((p, i) => React.createElement("a", {
    key: i,
    href: "#",
    onClick: e => e.preventDefault(),
    className: "m-pl__row rv",
    style: {
      "--d": i * 50 + "ms"
    },
    onMouseEnter: () => setPv(i)
  }, React.createElement("span", {
    className: "t-label"
  }, "/ ", p.kind), React.createElement("b", {
    className: "t-h1"
  }, p.title), React.createElement("span", {
    className: "t-body-m"
  }, p.text), React.createElement(Arrow, null))), React.createElement("span", {
    className: "m-pl__pv" + (pv != null ? " is-on" : ""),
    style: {
      backgroundImage: pv != null ? "url(" + P[pv].img + ")" : "none"
    }
  })) : variant === "v3" ? React.createElement(React.Fragment, null, React.createElement("div", {
    className: "m-ps",
    ref: track,
    onScroll: onScroll
  }, P.map((p, i) => React.createElement("a", {
    key: i,
    href: "#",
    onClick: e => e.preventDefault(),
    className: "m-ps__c"
  }, React.createElement("span", {
    className: "m-ps__img",
    style: {
      backgroundImage: "url(" + p.img + ")"
    }
  }), React.createElement("span", {
    className: "t-label"
  }, "/ ", p.kind), React.createElement("b", {
    className: "t-h3-l"
  }, p.title), React.createElement("span", {
    className: "t-body-m"
  }, p.text)))), React.createElement("div", {
    className: "m-ps__bar"
  }, React.createElement("i", {
    style: {
      transform: "scaleX(" + (.15 + prog * .85) + ")"
    }
  }))) : React.createElement("div", {
    className: "m-pg"
  }, P.map((p, i) => React.createElement("a", {
    key: i,
    href: "#",
    onClick: e => e.preventDefault(),
    className: "m-pg__c rv",
    style: {
      "--d": i % 3 * 90 + "ms"
    }
  }, React.createElement("span", {
    className: "m-pg__img",
    style: {
      backgroundImage: "url(" + p.img + ")"
    }
  }, React.createElement("span", {
    className: "m-pg__more t-label"
  }, "\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043A\u0435\u0439\u0441")), React.createElement("span", {
    className: "t-label m-pg__k"
  }, "/ ", p.kind), React.createElement("b", {
    className: "t-h3-l"
  }, p.title), React.createElement("span", {
    className: "t-body-m m-pg__p"
  }, p.text), React.createElement("span", {
    className: "m-pg__tags"
  }, p.tags.map(t => React.createElement("i", {
    key: t
  }, t)))))));
}
function MainAwards({
  variant,
  setVariant
}) {
  var A = MD().AWARDS,
    [open, setOpen] = React.useState(A[0].year),
    [tab, setTab] = React.useState(A[0].year);
  var total = A.reduce((n, y) => n + y.items.length, 0);
  var item = (x, k) => React.createElement("li", {
    key: k,
    className: "m-aw__it"
  }, React.createElement("span", {
    className: "m-aw__pl t-label"
  }, x.place), React.createElement("span", {
    className: "t-body-m"
  }, React.createElement("b", null, x.org), " \u2014 ", x.nom));
  return React.createElement("section", {
    id: "awards",
    className: "m-sec m-aw m-aw--" + variant + (variant === "v2" ? " sec--blue" : ""),
    "data-screen-label": "07 \u041D\u0430\u0433\u0440\u0430\u0434\u044B"
  }, React.createElement(VariantSwitch, {
    label: "\u041D\u0430\u0433\u0440\u0430\u0434\u044B",
    value: variant,
    options: ["v1", "v2", "v3"],
    onChange: setVariant
  }), React.createElement("div", {
    className: "m-head"
  }, React.createElement("h2", {
    className: "sec__title rv"
  }, "\u041D\u0430\u0433\u0440\u0430\u0434\u044B"), React.createElement("p", {
    className: "m-head__lead t-body-l rv"
  }, MD().AWARDS_LEAD)), variant === "v2" ? React.createElement("div", {
    className: "m-aw2"
  }, React.createElement("div", {
    className: "m-aw2__big"
  }, React.createElement("span", {
    className: "t-display-xl"
  }, total), React.createElement("span", {
    className: "t-body-l"
  }, "\u043D\u0430\u0433\u0440\u0430\u0434 \u0438 \u0448\u043E\u0440\u0442-\u043B\u0438\u0441\u0442\u043E\u0432 \u0437\u0430 ", A.length, " \u043B\u0435\u0442")), React.createElement("ul", {
    className: "m-aw2__list"
  }, A.flatMap(y => y.items.map((x, k) => React.createElement("li", {
    key: y.year + k,
    className: "m-aw2__r rv"
  }, React.createElement("span", {
    className: "t-label"
  }, y.year), React.createElement("span", {
    className: "m-aw__pl t-label"
  }, x.place), React.createElement("span", {
    className: "t-body-m"
  }, React.createElement("b", null, x.org), " \u2014 ", x.nom)))))) : variant === "v3" ? React.createElement("div", {
    className: "m-aw3"
  }, React.createElement("div", {
    className: "m-tabs"
  }, A.map(y => React.createElement("button", {
    key: y.year,
    type: "button",
    className: "m-tab",
    "aria-pressed": tab === y.year,
    onClick: () => setTab(y.year)
  }, y.year, React.createElement("sup", null, y.items.length)))), React.createElement("ul", {
    className: "m-aw3__list",
    key: tab
  }, A.find(y => y.year === tab).items.map(item))) : React.createElement("div", {
    className: "m-aw1"
  }, A.map(y => React.createElement("div", {
    key: y.year,
    className: "m-aw1__y" + (open === y.year ? " is-open" : "")
  }, React.createElement("button", {
    type: "button",
    className: "m-aw1__h",
    "aria-expanded": open === y.year,
    onClick: () => setOpen(open === y.year ? null : y.year)
  }, React.createElement("span", {
    className: "t-display-xl m-aw1__yr"
  }, y.year), React.createElement("span", {
    className: "t-body-m m-aw1__c"
  }, y.items.length, " ", y.items.length === 1 ? "награда" : y.items.length < 5 ? "награды" : "наград"), React.createElement("span", {
    className: "rg-lines rg-lines--plus",
    style: {
      transform: open === y.year ? "rotate(45deg)" : ""
    }
  })), React.createElement("div", {
    className: "m-aw1__b"
  }, React.createElement("div", null, React.createElement("ul", null, y.items.map(item))))))));
}
Object.assign(window, {
  MainHeader,
  MainHeroOld: MainHero,
  Hub,
  HubV1: Hub,
  About,
  News,
  NewsV1: News,
  Trust,
  Projects,
  ProjectsV1: Projects,
  MainAwards,
  MainAwardsV1: MainAwards,
  mainGo: go
});