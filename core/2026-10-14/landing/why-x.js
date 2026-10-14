// RGBY · why-x.jsx.txt · сборка 2026-10-14
var whySplit = t => {
  var m = String(t).match(/^(\d+)\.\s*(.*)$/);
  return m ? {
    n: m[1],
    t: m[2]
  } : {
    n: "",
    t
  };
};
function WhyGuide({
  items
}) {
  var [a, setA] = React.useState(0);
  var [hold, setHold] = React.useState(false);
  return React.createElement("div", {
    className: "g12"
  }, React.createElement("div", {
    className: "c4 stack",
    style: {
      gap: "var(--sp-16)"
    }
  }, React.createElement("h2", {
    className: "sec__title rv"
  }, "\u041F\u043E\u0447\u0435\u043C\u0443 \u043C\u044B"), React.createElement("span", {
    className: "wg__kicker rv"
  }, "\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430 \u043F\u0435\u0440\u0435\u0434\u0430\u0447")), React.createElement("div", {
    className: "c8 wg",
    onPointerEnter: e => e.pointerType === "mouse" && setHold(true),
    onPointerLeave: () => setHold(false)
  }, items.map((w, i) => {
    var s = whySplit(w.t),
      on = i === a;
    return React.createElement("div", {
      key: i,
      className: "wg__row rv" + (on ? " is-on" : ""),
      style: {
        "--d": i * 80 + "ms"
      }
    }, React.createElement("button", {
      type: "button",
      className: "wg__head",
      "aria-expanded": on,
      onClick: () => setA(i)
    }, React.createElement("span", {
      className: "wg__n"
    }, s.n), React.createElement("span", {
      className: "wg__t"
    }, s.t), React.createElement("span", {
      className: "wg__live"
    }, React.createElement("b", null), "\u0412 \u044D\u0444\u0438\u0440\u0435")), React.createElement("div", {
      className: "wg__body"
    }, React.createElement("div", null, React.createElement("p", {
      className: "wg__d"
    }, w.d))), React.createElement("i", {
      className: "wg__bar",
      key: on ? "a" + a : "x",
      style: {
        animationPlayState: hold ? "paused" : "running"
      },
      onAnimationEnd: () => on && setA((a + 1) % items.length)
    }));
  })));
}
function WhyStory({
  items
}) {
  var ref = React.useRef(null);
  var [st, setSt] = React.useState({
    i: 0,
    p: 0
  });
  React.useEffect(() => {
    var raf = 0;
    var calc = () => {
      raf = 0;
      var el = ref.current;
      if (!el) return;
      var r = el.getBoundingClientRect(),
        vh = window.innerHeight;
      var p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - vh)));
      var i = Math.min(items.length - 1, Math.floor(p * items.length * .999));
      setSt(s => s.i === i && Math.abs(s.p - p) < .004 ? s : {
        i,
        p
      });
    };
    var req = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    calc();
    window.addEventListener("scroll", req, {
      passive: true
    });
    window.addEventListener("resize", req);
    return () => {
      window.removeEventListener("scroll", req);
      window.removeEventListener("resize", req);
      cancelAnimationFrame(raf);
    };
  }, [items.length]);
  var n = items.length;
  return React.createElement("div", {
    ref: ref,
    className: "ws",
    style: {
      "--n": n
    }
  }, React.createElement("div", {
    className: "ws__pin"
  }, React.createElement("div", {
    className: "g12 ws__grid"
  }, React.createElement("div", {
    className: "c4 ws__left"
  }, React.createElement("h2", {
    className: "sec__title"
  }, "\u041F\u043E\u0447\u0435\u043C\u0443 \u043C\u044B"), React.createElement("div", {
    className: "ws__idx",
    "aria-hidden": "true"
  }, React.createElement("span", {
    key: st.i
  }, whySplit(items[st.i].t).n), React.createElement("em", null, "/", String(n).padStart(2, "0"))), React.createElement("div", {
    className: "ws__seg"
  }, items.map((_, i) => React.createElement("i", {
    key: i,
    style: {
      "--f": Math.min(1, Math.max(0, st.p * n - i))
    }
  })))), React.createElement("div", {
    className: "c8 ws__list"
  }, items.map((w, i) => {
    var s = whySplit(w.t);
    return React.createElement("div", {
      key: i,
      className: "ws__item" + (i === st.i ? " is-on" : i < st.i ? " is-past" : "")
    }, React.createElement("span", {
      className: "ws__t"
    }, s.t), React.createElement("p", {
      className: "ws__d"
    }, w.d));
  })))));
}
function WhyMonitors({
  items
}) {
  var [tc, setTc] = React.useState(0);
  React.useEffect(() => {
    var t = setInterval(() => setTc(x => x + 1), 40);
    return () => clearInterval(t);
  }, []);
  var code = k => {
    var f = tc + k * 431;
    var s = Math.floor(f / 25);
    return String(Math.floor(s / 60) % 60).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0") + ":" + String(f % 25).padStart(2, "0");
  };
  return React.createElement("div", {
    className: "g12"
  }, React.createElement("h2", {
    className: "sec__title c4 rv"
  }, "\u041F\u043E\u0447\u0435\u043C\u0443 \u043C\u044B"), React.createElement("div", {
    className: "c8 wm"
  }, items.map((w, i) => {
    var s = whySplit(w.t);
    return React.createElement("div", {
      key: i,
      className: "wm__cell rv",
      style: {
        "--d": i * 140 + "ms"
      }
    }, React.createElement("div", {
      className: "wm__screen"
    }, React.createElement("div", {
      className: "wm__top"
    }, React.createElement("span", null, React.createElement("b", null), "CAM ", s.n), React.createElement("span", {
      className: "wm__tc"
    }, code(i))), React.createElement("div", {
      className: "wm__txt"
    }, React.createElement("span", {
      className: "wm__t"
    }, s.t), React.createElement("p", {
      className: "wm__d"
    }, w.d)), React.createElement("i", {
      className: "wm__scan"
    })));
  })));
}
function WhyTicker({
  items
}) {
  var track = React.useRef(null);
  React.useEffect(() => {
    var raf,
      x = 0,
      lastY = window.scrollY,
      boost = 0,
      last = performance.now();
    var loop = now => {
      raf = requestAnimationFrame(loop);
      var dt = Math.min(50, now - last);
      last = now;
      var y = window.scrollY;
      boost += (Math.abs(y - lastY) * .9 - boost) * .12;
      lastY = y;
      var el = track.current;
      if (!el) return;
      var half = el.scrollWidth / 2 || 1;
      x -= dt * .06 + boost * .35;
      if (-x >= half) x += half;
      el.style.transform = "translate3d(" + x.toFixed(1) + "px,0,0)";
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  var run = items.map(w => whySplit(w.t).t);
  return React.createElement("div", {
    className: "stack",
    style: {
      gap: "var(--sp-40)"
    }
  }, React.createElement("h2", {
    className: "sec__title rv"
  }, "\u041F\u043E\u0447\u0435\u043C\u0443 \u043C\u044B"), React.createElement("div", {
    className: "wt__band rv",
    "aria-hidden": "true"
  }, React.createElement("div", {
    className: "wt__track",
    ref: track
  }, [0, 1].map(k => React.createElement("span", {
    key: k,
    className: "wt__run"
  }, run.map((t, i) => React.createElement(React.Fragment, {
    key: i
  }, React.createElement("span", null, t), React.createElement("i", null))))))), React.createElement("div", {
    className: "wt__cols"
  }, items.map((w, i) => {
    var s = whySplit(w.t);
    return React.createElement("div", {
      key: i,
      className: "wt__col rv",
      style: {
        "--d": i * 90 + "ms"
      }
    }, React.createElement("span", {
      className: "wt__n"
    }, s.n), React.createElement("span", {
      className: "wt__t"
    }, s.t), React.createElement("p", {
      className: "wt__d"
    }, w.d));
  })));
}
function WhyX({
  variant
}) {
  var items = window.RGBY_DATA.WHY;
  if (variant === "v4") return React.createElement(WhyGuide, {
    items: items
  });
  if (variant === "v5") return React.createElement(WhyStory, {
    items: items
  });
  if (variant === "v6") return React.createElement(WhyMonitors, {
    items: items
  });
  return React.createElement(WhyTicker, {
    items: items
  });
}
Object.assign(window, {
  WhyX
});