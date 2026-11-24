// RGBY · project/ui_kits/landing/sections-mid.jsx.txt
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Services (9 layouts from Figma), cases masonry + case modal.
const SVC_VARIANTS = ["v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8", "v9"];
function Services({
  variant,
  setVariant,
  onDiscuss,
  xVariant,
  setXVariant
}) {
  const {
    ServiceItem,
    CtaCard
  } = window.RGBYDS;
  const S = window.RGBY_DATA.SERVICES;
  const IMG = window.RGBY_DATA.IMG;
  const discuss = s => () => onDiscuss(s.title);
  const item = (s, i, p = {}) => /*#__PURE__*/React.createElement("div", {
    className: "rv",
    key: i,
    style: {
      "--d": i % 3 * 90 + "ms",
      display: "grid"
    }
  }, /*#__PURE__*/React.createElement(ServiceItem, _extends({}, s, {
    onDiscuss: discuss(s)
  }, p)), /*#__PURE__*/React.createElement(ServiceExamples, {
    index: S.indexOf(s)
  }));
  const cta = (tone, extra) => /*#__PURE__*/React.createElement("div", {
    className: "rv",
    style: {
      "--d": "180ms",
      display: "grid"
    }
  }, /*#__PURE__*/React.createElement(CtaCard, _extends({
    tone: tone,
    onAction: () => onDiscuss("")
  }, extra)));
  let body;
  if (variant === "v1" || variant === "v2") {
    const p = variant === "v2" ? {
      size: "l"
    } : {};
    const colA = [S[0], S[1], S[2]],
      colB = [S[3], S[4]];
    const col = (arr, off, last) => /*#__PURE__*/React.createElement("div", {
      className: (variant === "v2" ? "c4" : "") + " svc-col"
    }, arr.map((s, i) => /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, i ? /*#__PURE__*/React.createElement("hr", {
      className: "hair"
    }) : null, item(s, i + off, p))), last ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("hr", {
      className: "hair"
    }), last) : null);
    body = /*#__PURE__*/React.createElement("div", {
      className: "g12"
    }, /*#__PURE__*/React.createElement("h2", {
      className: "sec__title c4 rv"
    }, "\u0427\u0442\u043E \u043C\u044B \u0434\u0435\u043B\u0430\u0435\u043C"), variant === "v1" ? /*#__PURE__*/React.createElement("div", {
      className: "c8 svc-cols"
    }, col(colA, 0), col(colB, 3, cta("blue"))) : /*#__PURE__*/React.createElement(React.Fragment, null, col(colA, 0), col(colB, 3, cta("blue"))));
  } else if (variant === "v3" || variant === "v6" || variant === "v9") {
    const p = variant === "v3" ? {
      size: "l"
    } : variant === "v6" ? {
      size: "l",
      priceSize: "xl",
      showLink: false
    } : {
      size: "l",
      priceSize: "xl"
    };
    body = /*#__PURE__*/React.createElement("div", {
      className: "stack",
      style: {
        gap: variant === "v6" ? "var(--sp-80)" : "var(--sp-60)"
      }
    }, /*#__PURE__*/React.createElement("h2", {
      className: "sec__title rv"
    }, "\u0427\u0442\u043E \u043C\u044B \u0434\u0435\u043B\u0430\u0435\u043C"), /*#__PURE__*/React.createElement("div", {
      className: "svc-rows",
      style: {
        gap: variant === "v6" ? "var(--sp-80)" : "var(--sp-40)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "svc-row" + (variant === "v3" ? " svc-row--div" : "")
    }, S.slice(0, 3).map((s, i) => item(s, i, p))), variant === "v3" ? /*#__PURE__*/React.createElement("hr", {
      className: "hair"
    }) : null, /*#__PURE__*/React.createElement("div", {
      className: "svc-row" + (variant === "v3" ? " svc-row--div" : "")
    }, S.slice(3).map((s, i) => item(s, i + 3, p)), cta(variant === "v3" ? "blue" : "ink"))));
  } else if (variant === "v4" || variant === "v7" || variant === "v5") {
    const p = variant === "v5" ? {
      size: "l",
      surface: "white"
    } : {
      size: "l",
      surface: "grey",
      priceSize: "xl"
    };
    const order = variant === "v4" ? [S[0], S[1], S[2], S[4], S[3]] : S;
    body = /*#__PURE__*/React.createElement("div", {
      className: "stack",
      style: {
        gap: variant === "v5" ? "var(--sp-60)" : "var(--sp-40)"
      }
    }, /*#__PURE__*/React.createElement("h2", {
      className: "sec__title rv"
    }, "\u0427\u0442\u043E \u043C\u044B \u0434\u0435\u043B\u0430\u0435\u043C"), /*#__PURE__*/React.createElement("div", {
      className: "svc-cards svc-cards--" + variant
    }, order.map((s, i) => item(s, i, p)), cta(variant === "v5" ? "blue" : "outline", variant === "v5" ? {
      className: "rg-service--white",
      style: null
    } : null)));
  } else {
    body = /*#__PURE__*/React.createElement("div", {
      className: "stack",
      style: {
        gap: "var(--sp-40)"
      }
    }, /*#__PURE__*/React.createElement("h2", {
      className: "sec__title rv"
    }, "\u0427\u0442\u043E \u043C\u044B \u0434\u0435\u043B\u0430\u0435\u043C"), /*#__PURE__*/React.createElement("div", {
      className: "svc-media"
    }, S.map((s, i) => /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, i ? /*#__PURE__*/React.createElement("hr", {
      className: "hair"
    }) : null, /*#__PURE__*/React.createElement("div", {
      className: "svc-media__row"
    }, item(s, i, {
      size: "l"
    }), /*#__PURE__*/React.createElement("div", {
      className: "svc-media__pics"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rv-clip",
      style: {
        aspectRatio: i % 2 ? "335/247" : "335/267",
        backgroundImage: "url(" + window.RGBY_DATA.img("service-visual.jpg") + ")"
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "rv-clip",
      style: {
        "--d": "120ms",
        aspectRatio: i % 2 ? "355/404" : "155/147",
        backgroundImage: "url(" + window.RGBY_DATA.img("service-visual.jpg") + ")",
        width: i % 2 ? "100%" : "45%"
      }
    }))))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        maxWidth: "calc(680 * var(--u))"
      }
    }, cta("blue"))));
  }
  return /*#__PURE__*/React.createElement("section", {
    id: "services",
    "data-screen-label": "04 \u0427\u0442\u043E \u043C\u044B \u0434\u0435\u043B\u0430\u0435\u043C",
    className: "sec" + (variant === "v1" ? " sec--l" : variant === "v2" || variant === "v3" || variant === "v4" || variant === "v5" ? " sec--l" : "")
  }, xVariant && xVariant !== "—" ? /*#__PURE__*/React.createElement(VariantSwitch, {
    label: "\u041D\u043E\u0432\u044B\u0435",
    value: xVariant,
    options: ["—", ...SVC_NEW],
    onChange: setXVariant
  }) : /*#__PURE__*/React.createElement(VariantSwitch, {
    label: "\u0427\u0442\u043E \u043C\u044B \u0434\u0435\u043B\u0430\u0435\u043C",
    value: variant,
    options: SVC_VARIANTS,
    onChange: setVariant
  }), xVariant && xVariant !== "—" ? /*#__PURE__*/React.createElement(ServicesX, {
    variant: xVariant,
    onDiscuss: onDiscuss
  }) : body);
}
const CASE_RATIO = {
  vertical: 678.46 / 572,
  horizontal: 188 / 334.66
};
const caseFormat = f => f === "horizontal" || f === "landscape" || f === "wide" ? "horizontal" : "vertical";
function useCols() {
  const get = () => window.innerWidth < 600 ? 1 : window.innerWidth < 1024 ? 2 : 3;
  const [n, setN] = React.useState(get);
  React.useEffect(() => {
    const f = () => setN(get());
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);
  return n;
}
function Cases({
  cases,
  onOpen
}) {
  const {
    CaseCard,
    Button
  } = window.RGBYDS;
  const n = useCols();
  const step = n === 1 ? 3 : 9;
  const [shown, setShown] = React.useState(step);
  React.useEffect(() => setShown(step), [step]);
  const widths = n === 3 ? [453, 572, 335] : n === 2 ? [1, 1] : [1];
  // Two cover formats (CMS): vertical = 572×678, horizontal = 335×188 — each keeps its ratio and scales to its column.
  // Column is chosen in CMS (c.column: 0 = left, 1 = centre, 2 = right). Order inside a column = order in CMS.
  // Tablet (2 cols): left+centre → col 1, right → col 2. Mobile: single column in CMS order.
  const colOf = c => {
    const k = c.column == null ? 1 : +c.column;
    return n === 3 ? k : n === 2 ? k === 2 ? 1 : 0 : 0;
  };
  const cols = widths.map(() => []);
  cases.forEach((c, i) => cols[colOf(c)].push({
    c,
    i,
    format: caseFormat(c.format)
  }));
  return /*#__PURE__*/React.createElement("section", {
    id: "cases",
    "data-screen-label": "05 \u041A\u0435\u0439\u0441\u044B",
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stack",
    style: {
      gap: "var(--sp-40)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "sec__title sec__title--tight rv"
  }, "\u041A\u0435\u0439\u0441\u044B"), /*#__PURE__*/React.createElement("div", {
    className: "cases",
    style: n === 3 ? null : {
      gridTemplateColumns: "repeat(" + n + ",minmax(0,1fr))"
    }
  }, cols.map((col, k) => /*#__PURE__*/React.createElement("div", {
    className: "cases__col",
    key: k
  }, col.map(({
    c,
    i,
    format
  }) => /*#__PURE__*/React.createElement("div", {
    key: c.id,
    className: "rv",
    style: {
      "--d": k * 100 + "ms",
      display: "grid",
      gridTemplateColumns: "minmax(0,1fr)",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(CaseCard, {
    href: window.__RGBY_RELEASE && c.page ? new URL((window.RGBY_BASE ?? "../../") + c.page, location.href).href : undefined,
    cover: c.cover,
    video: c.video,
    year: c.year,
    title: c.title,
    description: c.short,
    format: format,
    onOpen: () => onOpen(i)
  }))))))));
}

// Обложка окна кейса: все кадры кейса, автосмена с плавным наплывом, точки + клик по кадру — следующий; наведение ставит на паузу
function CaseCover({
  c
}) {
  const frames = React.useMemo(() => [c.cover].concat(c.gallery || []).filter((v, i, a) => v && a.indexOf(v) === i), [c]);
  const [i, setI] = React.useState(0),
    [hold, setHold] = React.useState(false),
    n = frames.length;
  // Окно открывается прямо под курсором — первое «наведение» не считаем, иначе слайдшоу сразу встаёт на паузу. Пауза — только при реальном движении над обложкой.
  const armed = React.useRef(false);
  React.useEffect(() => {
    setI(0);
    setHold(false);
    armed.current = false;
    const t = setTimeout(() => {
      armed.current = true;
    }, 900);
    return () => clearTimeout(t);
  }, [c.id]);
  React.useEffect(() => {
    frames.slice(1).forEach(src => {
      const im = new Image();
      im.src = src;
    });
  }, [frames]);
  React.useEffect(() => {
    if (n < 2 || hold || c.video || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setI(v => (v + 1) % n), 4200);
    return () => clearTimeout(t);
  }, [i, n, hold, c.video]);
  if (c.video) return /*#__PURE__*/React.createElement("div", {
    className: "case-modal__cover",
    style: {
      backgroundImage: "url(" + c.cover + ")"
    }
  }, /*#__PURE__*/React.createElement("video", {
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
  return /*#__PURE__*/React.createElement("div", {
    className: "case-modal__cover cmc" + (n > 1 ? " cmc--multi" : ""),
    onClick: () => n > 1 && setI(v => (v + 1) % n)
  }, frames.map((src, k) => /*#__PURE__*/React.createElement("i", {
    key: src,
    className: "cmc__f" + (k === i ? " is-on" : ""),
    style: {
      backgroundImage: "url(" + src + ")"
    },
    "aria-hidden": k !== i
  })), n > 1 ? /*#__PURE__*/React.createElement("div", {
    className: "cmc__dots",
    role: "tablist",
    "aria-label": "\u041A\u0430\u0434\u0440\u044B \u043A\u0435\u0439\u0441\u0430",
    onClick: e => e.stopPropagation()
  }, frames.map((_, k) => /*#__PURE__*/React.createElement("button", {
    key: k,
    type: "button",
    role: "tab",
    "aria-selected": k === i,
    "aria-label": "Кадр " + (k + 1),
    className: "cmc__d" + (k === i ? " is-on" : "") + (hold ? " is-hold" : ""),
    onClick: () => setI(k)
  }, /*#__PURE__*/React.createElement("b", {
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
  const {
    Modal,
    CarouselArrow,
    Button
  } = window.RGBYDS;
  const c = index != null ? cases[index] : null;
  const ref = React.useRef(null);
  React.useEffect(() => {
    const p = document.querySelector(".rg-modal__panel");
    if (p) p.scrollTop = 0;
  }, [index]);
  const isOpen = !!c;
  React.useEffect(() => {
    if (!isOpen) return;
    const panel = ref.current?.closest(".rg-modal__panel");
    if (!panel) return;
    const trigger = document.activeElement;
    const focusable = () => [...panel.querySelectorAll('a[href], button:not([disabled]), video[controls]')].filter(el => el.getClientRects().length);
    const onTab = e => {
      if (e.key !== "Tab") return;
      const list = focusable();
      const first = list[0],
        last = list[list.length - 1];
      const current = document.activeElement;
      if (!first) return;
      if (!panel.contains(current) || (e.shiftKey ? current === first : current === last)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      }
    };
    panel.querySelector(".rg-modal__close")?.focus({
      preventScroll: true
    });
    document.addEventListener("keydown", onTab);
    return () => {
      document.removeEventListener("keydown", onTab);
      if (trigger?.isConnected) trigger.focus({
        preventScroll: true
      });
    };
  }, [isOpen]);
  const next = c ? cases[(index + 1) % cases.length] : null;
  return /*#__PURE__*/React.createElement(Modal, {
    open: !!c,
    onClose: onClose,
    title: c ? "Кейс " + String(index + 1).padStart(2, "0") + " / " + String(cases.length).padStart(2, "0") : "",
    actions: c ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CarouselArrow, {
      dir: "prev",
      tone: "outline",
      onClick: () => onNav(-1)
    }), /*#__PURE__*/React.createElement(CarouselArrow, {
      dir: "next",
      tone: "outline",
      onClick: () => onNav(1)
    })) : null
  }, c ? /*#__PURE__*/React.createElement("div", {
    ref: ref
  }, /*#__PURE__*/React.createElement(CaseCover, {
    c: c
  }), /*#__PURE__*/React.createElement("div", {
    className: "case-modal__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "c12 stack",
    style: {
      gap: "var(--sp-20)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-meta u-muted"
  }, c.year), /*#__PURE__*/React.createElement("h2", {
    className: "sec__title",
    style: {
      fontSize: "calc(56 * var(--u))"
    }
  }, c.title)), /*#__PURE__*/React.createElement("div", {
    className: "case-modal__meta"
  }, /*#__PURE__*/React.createElement("dl", null, [["Клиент", c.client], ["Категория", c.category], ["Год", c.year], ["Что сделали", c.services], ["Награды", (c.awards || []).map(a => a.prize + " " + a.year + " · " + a.nomination).join("\n")]].filter(x => x[1]).map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k
  }, /*#__PURE__*/React.createElement("dt", null, k), /*#__PURE__*/React.createElement("dd", {
    style: {
      whiteSpace: "pre-line"
    }
  }, v))), c.links && c.links.length ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "\u0421\u0441\u044B\u043B\u043A\u0438"), /*#__PURE__*/React.createElement("dd", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, c.links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.url,
    href: l.url,
    target: "_blank",
    rel: "noopener",
    style: {
      color: "inherit",
      textDecoration: "underline",
      textUnderlineOffset: ".2em"
    }
  }, l.label, " \u2197")))) : null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    variant: "blue",
    size: "m",
    onClick: () => {
      onClose();
      onDiscuss([c.category, c.title].filter(Boolean).join(" · "), c.id);
    }
  }, "\u041E\u0431\u0441\u0443\u0434\u0438\u0442\u044C \u043F\u043E\u0445\u043E\u0436\u0438\u0439 \u043F\u0440\u043E\u0435\u043A\u0442"))), /*#__PURE__*/React.createElement("div", {
    className: "case-modal__text"
  }, /*#__PURE__*/React.createElement("p", {
    className: "t-lead",
    style: {
      margin: 0
    }
  }, c.short), window.__RGBY_RELEASE && c.page ? /*#__PURE__*/React.createElement("a", {
    className: "case-direct-link",
    href: new URL((window.RGBY_BASE ?? "../../") + c.page, location.href).href
  }, "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u043A\u0435\u0439\u0441\u0430 \u2197") : null, c.description && c.description !== c.short ? String(c.description).split(/\n\s*\n/).map((pp, k) => /*#__PURE__*/React.createElement("p", {
    key: k,
    className: "t-body-l",
    style: {
      margin: 0,
      opacity: .6
    }
  }, pp)) : null), next && next !== c ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "case-modal__next",
    onClick: () => onNav(1)
  }, /*#__PURE__*/React.createElement("span", {
    className: "stack",
    style: {
      gap: "var(--sp-12)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-meta",
    style: {
      opacity: .6
    }
  }, "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u043A\u0435\u0439\u0441"), /*#__PURE__*/React.createElement("span", {
    className: "t-h3-l"
  }, next.title)), /*#__PURE__*/React.createElement("span", {
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
