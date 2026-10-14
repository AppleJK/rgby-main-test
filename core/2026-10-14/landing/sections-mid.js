// RGBY · sections-mid.jsx.txt · сборка 2026-10-14
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var SVC_VARIANTS = ["v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8", "v9"];
function Services({
  variant,
  setVariant,
  onDiscuss,
  xVariant,
  setXVariant
}) {
  var {
    ServiceItem,
    CtaCard
  } = window.RGBYDS;
  var S = window.RGBY_DATA.SERVICES;
  var IMG = window.RGBY_DATA.IMG;
  var discuss = s => () => onDiscuss(s.title);
  var item = (s, i, p = {}) => React.createElement("div", {
    className: "rv",
    key: i,
    style: {
      "--d": i % 3 * 90 + "ms",
      display: "grid"
    }
  }, React.createElement(ServiceItem, _extends({}, s, {
    onDiscuss: discuss(s)
  }, p)));
  var cta = (tone, extra) => React.createElement("div", {
    className: "rv",
    style: {
      "--d": "180ms",
      display: "grid"
    }
  }, React.createElement(CtaCard, _extends({
    tone: tone,
    onAction: () => onDiscuss("")
  }, extra)));
  var body;
  if (variant === "v1" || variant === "v2") {
    var p = variant === "v2" ? {
      size: "l"
    } : {};
    var colA = [S[0], S[1], S[2]],
      colB = [S[3], S[4]];
    var col = (arr, off, last) => React.createElement("div", {
      className: (variant === "v2" ? "c4" : "") + " svc-col"
    }, arr.map((s, i) => React.createElement(React.Fragment, {
      key: i
    }, i ? React.createElement("hr", {
      className: "hair"
    }) : null, item(s, i + off, p))), last ? React.createElement(React.Fragment, null, React.createElement("hr", {
      className: "hair"
    }), last) : null);
    body = React.createElement("div", {
      className: "g12"
    }, React.createElement("h2", {
      className: "sec__title c4 rv"
    }, "\u0427\u0442\u043E \u043C\u044B \u0434\u0435\u043B\u0430\u0435\u043C"), variant === "v1" ? React.createElement("div", {
      className: "c8 svc-cols"
    }, col(colA, 0), col(colB, 3, cta("blue"))) : React.createElement(React.Fragment, null, col(colA, 0), col(colB, 3, cta("blue"))));
  } else if (variant === "v3" || variant === "v6" || variant === "v9") {
    var _p = variant === "v3" ? {
      size: "l"
    } : variant === "v6" ? {
      size: "l",
      priceSize: "xl",
      showLink: false
    } : {
      size: "l",
      priceSize: "xl"
    };
    body = React.createElement("div", {
      className: "stack",
      style: {
        gap: variant === "v6" ? "var(--sp-80)" : "var(--sp-60)"
      }
    }, React.createElement("h2", {
      className: "sec__title rv"
    }, "\u0427\u0442\u043E \u043C\u044B \u0434\u0435\u043B\u0430\u0435\u043C"), React.createElement("div", {
      className: "svc-rows",
      style: {
        gap: variant === "v6" ? "var(--sp-80)" : "var(--sp-40)"
      }
    }, React.createElement("div", {
      className: "svc-row" + (variant === "v3" ? " svc-row--div" : "")
    }, S.slice(0, 3).map((s, i) => item(s, i, _p))), variant === "v3" ? React.createElement("hr", {
      className: "hair"
    }) : null, React.createElement("div", {
      className: "svc-row" + (variant === "v3" ? " svc-row--div" : "")
    }, S.slice(3).map((s, i) => item(s, i + 3, _p)), cta(variant === "v3" ? "blue" : "ink"))));
  } else if (variant === "v4" || variant === "v7" || variant === "v5") {
    var _p2 = variant === "v5" ? {
      size: "l",
      surface: "white"
    } : {
      size: "l",
      surface: "grey",
      priceSize: "xl"
    };
    var order = variant === "v4" ? [S[0], S[1], S[2], S[4], S[3]] : S;
    body = React.createElement("div", {
      className: "stack",
      style: {
        gap: variant === "v5" ? "var(--sp-60)" : "var(--sp-40)"
      }
    }, React.createElement("h2", {
      className: "sec__title rv"
    }, "\u0427\u0442\u043E \u043C\u044B \u0434\u0435\u043B\u0430\u0435\u043C"), React.createElement("div", {
      className: "svc-cards svc-cards--" + variant
    }, order.map((s, i) => item(s, i, _p2)), cta(variant === "v5" ? "blue" : "outline", variant === "v5" ? {
      className: "rg-service--white",
      style: null
    } : null)));
  } else {
    body = React.createElement("div", {
      className: "stack",
      style: {
        gap: "var(--sp-40)"
      }
    }, React.createElement("h2", {
      className: "sec__title rv"
    }, "\u0427\u0442\u043E \u043C\u044B \u0434\u0435\u043B\u0430\u0435\u043C"), React.createElement("div", {
      className: "svc-media"
    }, S.map((s, i) => React.createElement(React.Fragment, {
      key: i
    }, i ? React.createElement("hr", {
      className: "hair"
    }) : null, React.createElement("div", {
      className: "svc-media__row"
    }, item(s, i, {
      size: "l"
    }), React.createElement("div", {
      className: "svc-media__pics"
    }, React.createElement("div", {
      className: "rv-clip",
      style: {
        aspectRatio: i % 2 ? "335/247" : "335/267",
        backgroundImage: "url(" + window.RGBY_DATA.img("service-visual.jpg") + ")"
      }
    }), React.createElement("div", {
      className: "rv-clip",
      style: {
        "--d": "120ms",
        aspectRatio: i % 2 ? "355/404" : "155/147",
        backgroundImage: "url(" + window.RGBY_DATA.img("service-visual.jpg") + ")",
        width: i % 2 ? "100%" : "45%"
      }
    }))))), React.createElement("div", {
      style: {
        display: "grid",
        maxWidth: "calc(680 * var(--u))"
      }
    }, cta("blue"))));
  }
  return React.createElement("section", {
    id: "services",
    "data-screen-label": "04 \u0427\u0442\u043E \u043C\u044B \u0434\u0435\u043B\u0430\u0435\u043C",
    className: "sec" + (variant === "v1" ? " sec--l" : variant === "v2" || variant === "v3" || variant === "v4" || variant === "v5" ? " sec--l" : "")
  }, xVariant && xVariant !== "—" ? React.createElement(VariantSwitch, {
    label: "\u041D\u043E\u0432\u044B\u0435",
    value: xVariant,
    options: ["—", ...SVC_NEW],
    onChange: setXVariant
  }) : React.createElement(VariantSwitch, {
    label: "\u0427\u0442\u043E \u043C\u044B \u0434\u0435\u043B\u0430\u0435\u043C",
    value: variant,
    options: SVC_VARIANTS,
    onChange: setVariant
  }), xVariant && xVariant !== "—" ? React.createElement(ServicesX, {
    variant: xVariant,
    onDiscuss: onDiscuss
  }) : body);
}
var CASE_RATIO = {
  vertical: 678.46 / 572,
  horizontal: 188 / 334.66
};
var caseFormat = f => f === "horizontal" || f === "landscape" || f === "wide" ? "horizontal" : "vertical";
function useCols() {
  var get = () => window.innerWidth < 600 ? 1 : window.innerWidth < 1024 ? 2 : 3;
  var [n, setN] = React.useState(get);
  React.useEffect(() => {
    var f = () => setN(get());
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);
  return n;
}
function Cases({
  cases,
  onOpen
}) {
  var {
    CaseCard,
    Button
  } = window.RGBYDS;
  var n = useCols();
  var step = n === 1 ? 3 : 9;
  var [shown, setShown] = React.useState(step);
  React.useEffect(() => setShown(step), [step]);
  var widths = n === 3 ? [453, 572, 335] : n === 2 ? [1, 1] : [1];
  var colOf = c => {
    var k = c.column == null ? 1 : +c.column;
    return n === 3 ? k : n === 2 ? k === 2 ? 1 : 0 : 0;
  };
  var cols = widths.map(() => []);
  cases.forEach((c, i) => cols[colOf(c)].push({
    c,
    i,
    format: caseFormat(c.format)
  }));
  return React.createElement("section", {
    id: "cases",
    "data-screen-label": "05 \u041A\u0435\u0439\u0441\u044B",
    className: "sec"
  }, React.createElement("div", {
    className: "stack",
    style: {
      gap: "var(--sp-40)"
    }
  }, React.createElement("h2", {
    className: "sec__title sec__title--tight rv"
  }, "\u041A\u0435\u0439\u0441\u044B"), React.createElement("div", {
    className: "cases",
    style: n === 3 ? null : {
      gridTemplateColumns: "repeat(" + n + ",minmax(0,1fr))"
    }
  }, cols.map((col, k) => React.createElement("div", {
    className: "cases__col",
    key: k
  }, col.map(({
    c,
    i,
    format
  }) => React.createElement("div", {
    key: c.id,
    className: "rv",
    style: {
      "--d": k * 100 + "ms",
      display: "grid",
      gridTemplateColumns: "minmax(0,1fr)",
      width: "100%"
    }
  }, React.createElement(CaseCard, {
    cover: c.cover,
    video: c.video,
    year: c.year,
    title: c.title,
    description: c.short,
    format: format,
    onOpen: () => onOpen(i)
  }))))))));
}
function CaseCover({
  c
}) {
  var frames = React.useMemo(() => [c.cover].concat(c.gallery || []).filter((v, i, a) => v && a.indexOf(v) === i), [c]);
  var [i, setI] = React.useState(0),
    [hold, setHold] = React.useState(false),
    n = frames.length;
  var armed = React.useRef(false);
  React.useEffect(() => {
    setI(0);
    setHold(false);
    armed.current = false;
    var t = setTimeout(() => {
      armed.current = true;
    }, 900);
    return () => clearTimeout(t);
  }, [c.id]);
  React.useEffect(() => {
    frames.slice(1).forEach(src => {
      var im = new Image();
      im.src = src;
    });
  }, [frames]);
  React.useEffect(() => {
    if (n < 2 || hold || c.video || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var t = setTimeout(() => setI(v => (v + 1) % n), 4200);
    return () => clearTimeout(t);
  }, [i, n, hold, c.video]);
  if (c.video) return React.createElement("div", {
    className: "case-modal__cover",
    style: {
      backgroundImage: "url(" + c.cover + ")"
    }
  }, React.createElement("video", {
    src: c.video,
    poster: c.cover,
    autoPlay: true,
    muted: true,
    loop: true,
    playsInline: true,
    controls: true,
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }));
  return React.createElement("div", {
    className: "case-modal__cover cmc" + (n > 1 ? " cmc--multi" : ""),
    onClick: () => n > 1 && setI(v => (v + 1) % n)
  }, frames.map((src, k) => React.createElement("i", {
    key: src,
    className: "cmc__f" + (k === i ? " is-on" : ""),
    style: {
      backgroundImage: "url(" + src + ")"
    },
    "aria-hidden": k !== i
  })), n > 1 ? React.createElement("div", {
    className: "cmc__dots",
    role: "tablist",
    "aria-label": "\u041A\u0430\u0434\u0440\u044B \u043A\u0435\u0439\u0441\u0430",
    onClick: e => e.stopPropagation()
  }, frames.map((_, k) => React.createElement("button", {
    key: k,
    type: "button",
    role: "tab",
    "aria-selected": k === i,
    "aria-label": "Кадр " + (k + 1),
    className: "cmc__d" + (k === i ? " is-on" : "") + (hold ? " is-hold" : ""),
    onClick: () => setI(k)
  }, React.createElement("b", {
    key: k === i ? "a" + i : "x"
  })))) : null);
}
function CaseModal({
  cases,
  index,
  onClose,
  onNav,
  onDiscuss
}) {
  var {
    Modal,
    CarouselArrow,
    Button
  } = window.RGBYDS;
  var c = index != null ? cases[index] : null;
  var ref = React.useRef(null);
  React.useEffect(() => {
    var p = document.querySelector(".rg-modal__panel");
    if (p) p.scrollTop = 0;
  }, [index]);
  var next = c ? cases[(index + 1) % cases.length] : null;
  return React.createElement(Modal, {
    open: !!c,
    onClose: onClose,
    title: c ? "Кейс " + String(index + 1).padStart(2, "0") + " / " + String(cases.length).padStart(2, "0") : "",
    actions: c ? React.createElement(React.Fragment, null, React.createElement(CarouselArrow, {
      dir: "prev",
      tone: "outline",
      onClick: () => onNav(-1)
    }), React.createElement(CarouselArrow, {
      dir: "next",
      tone: "outline",
      onClick: () => onNav(1)
    })) : null
  }, c ? React.createElement("div", {
    ref: ref
  }, React.createElement(CaseCover, {
    c: c
  }), React.createElement("div", {
    className: "case-modal__body"
  }, React.createElement("div", {
    className: "c12 stack",
    style: {
      gap: "var(--sp-20)"
    }
  }, React.createElement("span", {
    className: "t-meta u-muted"
  }, c.year), React.createElement("h2", {
    className: "sec__title",
    style: {
      fontSize: "calc(56 * var(--u))"
    }
  }, c.title)), React.createElement("div", {
    className: "case-modal__meta"
  }, React.createElement("dl", null, [["Клиент", c.client], ["Категория", c.category], ["Год", c.year], ["Что сделали", c.services], ["Награды", (c.awards || []).map(a => a.prize + " " + a.year + " · " + a.nomination).join("\n")]].filter(x => x[1]).map(([k, v]) => React.createElement("div", {
    key: k
  }, React.createElement("dt", null, k), React.createElement("dd", {
    style: {
      whiteSpace: "pre-line"
    }
  }, v))), c.links && c.links.length ? React.createElement("div", null, React.createElement("dt", null, "\u0421\u0441\u044B\u043B\u043A\u0438"), React.createElement("dd", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, c.links.map(l => React.createElement("a", {
    key: l.url,
    href: l.url,
    target: "_blank",
    rel: "noopener",
    style: {
      color: "inherit",
      textDecoration: "underline",
      textUnderlineOffset: ".2em"
    }
  }, l.label, " \u2197")))) : null), React.createElement("div", null, React.createElement(Button, {
    variant: "blue",
    size: "m",
    onClick: () => {
      onClose();
      onDiscuss(c.category || "");
    }
  }, "\u041E\u0431\u0441\u0443\u0434\u0438\u0442\u044C \u043F\u043E\u0445\u043E\u0436\u0438\u0439 \u043F\u0440\u043E\u0435\u043A\u0442"))), React.createElement("div", {
    className: "case-modal__text"
  }, React.createElement("p", {
    className: "t-lead",
    style: {
      margin: 0
    }
  }, c.short), c.description && c.description !== c.short ? String(c.description).split(/\n\s*\n/).map((pp, k) => React.createElement("p", {
    key: k,
    className: "t-body-l",
    style: {
      margin: 0,
      opacity: .6
    }
  }, pp)) : null), next && next !== c ? React.createElement("button", {
    type: "button",
    className: "case-modal__next",
    onClick: () => onNav(1)
  }, React.createElement("span", {
    className: "stack",
    style: {
      gap: "var(--sp-12)"
    }
  }, React.createElement("span", {
    className: "t-meta",
    style: {
      opacity: .6
    }
  }, "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u043A\u0435\u0439\u0441"), React.createElement("span", {
    className: "t-h3-l"
  }, next.title)), React.createElement("span", {
    className: "t-button"
  }, "\u2192")) : null)) : null);
}
Object.assign(window, {
  Services,
  Cases,
  CaseModal,
  CaseCover,
  SVC_VARIANTS
});