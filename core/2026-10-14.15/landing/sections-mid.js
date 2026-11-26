// RGBY · project/ui_kits/landing/sections-mid.jsx.txt
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Services (9 layouts from Figma), cases masonry + case modal.
const SVC_VARIANTS = ["v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8", "v9"];
function Services({
  variant,
  setVariant,
  onDiscuss,
  xVariant,
  setXVariant,
  cases,
  onOpenCase
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
  return React.createElement(ServiceCases.Provider, { value: { cases, onOpenCase } }, /*#__PURE__*/React.createElement("section", {
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
  }) : body));
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
function useMobileCaseList(cases, mobile, listId) {
  const [expanded, setExpanded] = React.useState(false);
  const limited = mobile && !expanded && cases.length > 5;
  const { Button } = window.RGBYDS;
  return {
    visible: limited ? cases.slice(0, 5) : cases,
    more: limited ? React.createElement("div", { className: "case-list__more" },
      React.createElement(Button, { size: "m", variant: "outline", "aria-controls": listId, onClick: () => setExpanded(true) }, "Смотреть ещё")
    ) : null
  };
}
function Cases({
  cases,
  onOpen
}) {
  const { CaseCard } = window.RGBYDS;
  const n = useCols();
  const { visible, more } = useMobileCaseList(cases, n === 1, "tv-case-list");
  const widths = n === 3 ? [453, 572, 335] : n === 2 ? [1, 1] : [1];
  // Two cover formats (CMS): vertical = 572×678, horizontal = 335×188 — each keeps its ratio and scales to its column.
  // Column is chosen in CMS (c.column: 0 = left, 1 = centre, 2 = right). Order inside a column = order in CMS.
  // Tablet (2 cols): left+centre → col 1, right → col 2. Mobile: single column in CMS order.
  const colOf = c => {
    const k = c.column == null ? 1 : +c.column;
    return n === 3 ? k : n === 2 ? k === 2 ? 1 : 0 : 0;
  };
  const cols = widths.map(() => []);
  visible.forEach((c, i) => cols[colOf(c)].push({
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
    id: "tv-case-list",
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
  })))))), more));
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
function CaseDetails({ c, nextCase }) {
  const h = React.createElement;
  const story = String(c.description || c.short || "").replace("генерацию.Главным", "генерацию.\n\nГлавным");
  const paragraphs = story.split(/\n\s*\n/).filter(Boolean);
  const materials = (c.links || []).filter(link => /^https?:\/\//.test(link.url));
  const facts = [c.client, c.category, c.year].filter(Boolean);
  const awards = (c.awards || []).map(({ prize, year, nomination }) => [prize, year].filter(Boolean).join(" ") + (nomination ? " · " + nomination : ""));
  const section = (title, content) => h("section", { className: "case-modal__section" }, h("h3", null, title), content);
  return h("article", { className: "case-modal__details", "data-case-id": c.id },
    h("header", { className: "case-modal__heading" },
      facts.length ? h("p", { className: "case-modal__facts" }, facts.map((fact, i) => h("span", { key: i }, fact))) : null,
      h("h2", null, c.title)
    ),
    (c.cover || c.video || c.gallery?.length) ? h(CaseCover, { key: c.id, c }) : null,
    h("div", { className: "case-modal__content" },
      paragraphs.length ? h("div", { className: "case-modal__story" }, paragraphs.map((text, i) => h("p", { key: i }, text))) : null,
      c.services ? section("Что сделали", h("p", null, c.services)) : null,
      awards.length ? section("Награды", h("ul", { className: "case-modal__awards" }, awards.map((award, i) => h("li", { key: i }, award)))) : null,
      materials.length ? section("Материалы", h("ul", { className: "case-modal__materials" }, materials.map(({ url, label }) =>
        h("li", { key: url }, h("a", { href: url, className: "case-modal__material", target: "_blank", rel: "noopener" },
          h("span", null, label), h("span", { className: "case-modal__material-arrow", "aria-hidden": true }, "↗")
        ))
      ))) : null,
      nextCase
    )
  );
}

function CaseModal({ cases, index, onClose, onNav }) {
  const { Modal, CarouselArrow } = window.RGBYDS;
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
  const nextCase = next && next !== c ? /*#__PURE__*/React.createElement("button", {
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
  }, "\u2192")) : null;
  return /*#__PURE__*/React.createElement(Modal, {
    className: "rg-modal--case",
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
  }, React.createElement(CaseDetails, { c, nextCase })) : null);
}
Object.assign(window, {
  Services,
  Cases,
  CaseModal,
  CaseCover,
  SVC_VARIANTS
});
