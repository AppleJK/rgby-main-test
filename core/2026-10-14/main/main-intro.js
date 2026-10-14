// RGBY · main-intro.jsx.txt · сборка 2026-10-14
function mainLoadProgress() {
  var f = document.fonts && document.fonts.status === "loaded" ? 1 : 0;
  var im = [...document.images].filter(i => i.loading !== "lazy" && i.src),
    ic = im.length ? im.filter(i => i.complete).length / im.length : 1;
  var v = document.querySelector("video.rl__v");
  var vp = 1;
  if (v) {
    if (v.readyState >= 4 || v.error) vp = 1;else {
      var b = 0;
      try {
        if (v.buffered.length) b = v.buffered.end(0);
      } catch (e) {}
      var need = Math.min(8, v.duration || 8);
      vp = Math.min(1, b / need);
      if (v.readyState >= 3 && vp > .9) vp = 1;
    }
  }
  return f * .1 + ic * .25 + vp * .65;
}
function MainIntro({
  variant,
  onDone
}) {
  var [p, setP] = React.useState(0),
    [out, setOut] = React.useState(false),
    LOAD = 1850,
    OUT = 650,
    CAP = 20000;
  React.useEffect(() => {
    var root = document.documentElement,
      prev = root.style.overflow;
    root.style.overflow = "hidden";
    window.scrollTo(0, 0);
    var raf = 0,
      tm = 0,
      shown = 0,
      last = 0;
    var t0 = performance.now();
    var f = now => {
      var el = now - t0,
        q = Math.min(1, el / LOAD),
        s = q < .45 ? q / .45 * .62 : q < .62 ? .62 + (q - .45) / .17 * .04 : .66 + (q - .62) / .38 * .34;
      var real = el > CAP ? 1 : mainLoadProgress(),
        goal = Math.min(1 - Math.pow(1 - s, 1.6), real);
      var dt = Math.min(64, now - (last || now));
      last = now;
      shown += (goal - shown) * (1 - Math.exp(-dt / 140));
      if (goal >= 1 && shown > .995) shown = 1;
      setP(shown);
      if (shown < 1) raf = requestAnimationFrame(f);else {
        setOut(true);
        tm = setTimeout(() => {
          root.style.overflow = prev;
          onDone();
        }, OUT + 80);
      }
    };
    raf = requestAnimationFrame(f);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(tm);
      root.style.overflow = prev;
    };
  }, []);
  var n = Math.round(p * 100),
    D = MHD().DIRECTIONS,
    cls = "mi mi--" + variant + (out ? " is-out" : "");
  if (variant === "mark") {
    var G = window.RGBYDS && window.RGBYDS.GLYPHS && window.RGBYDS.GLYPHS.mark,
      k = 1 - p,
      off = [[-70, -26], [58, 34], [12, -60]];
    return React.createElement("div", {
      className: cls,
      "aria-hidden": "true"
    }, React.createElement("div", {
      className: "mi__panel"
    }, React.createElement("div", {
      className: "mi-mk"
    }, MH_CH.map(([c, col], i) => React.createElement("span", {
      key: c,
      style: {
        color: p >= 1 ? "var(--rgby-paper)" : col,
        transform: "translate(" + (off[i][0] * k).toFixed(1) + "px," + (off[i][1] * k).toFixed(1) + "px)"
      }
    }, G ? React.createElement("svg", {
      viewBox: G.vb,
      fill: "currentColor",
      dangerouslySetInnerHTML: {
        __html: G.body
      }
    }) : React.createElement("b", null, "RGBY")))), React.createElement("span", {
      className: "t-label mi-mk__n"
    }, String(n).padStart(3, "0"))));
  }
  if (variant === "index") {
    return React.createElement("div", {
      className: cls,
      "aria-hidden": "true"
    }, React.createElement("div", {
      className: "mi-ix__cols"
    }, D.map((d, i) => React.createElement("i", {
      key: d.id,
      style: {
        transitionDelay: i * 55 + "ms"
      }
    }))), React.createElement("div", {
      className: "mi-ix"
    }, React.createElement("p", {
      className: "t-label"
    }, "RGBY \u2014 \u043A\u0440\u0435\u0430\u0442\u0438\u0432\u043D\u043E\u0435 \u0430\u0433\u0435\u043D\u0442\u0441\u0442\u0432\u043E \u0438 CG-\u043F\u0440\u043E\u0434\u0430\u043A\u0448\u043D \u043F\u043E\u043B\u043D\u043E\u0433\u043E \u0446\u0438\u043A\u043B\u0430"), React.createElement("ul", null, D.map((d, i) => React.createElement("li", {
      key: d.id,
      className: p > (i + .5) / D.length ? "is-on" : "",
      style: {
        "--c": MH_RGB[d.id]
      }
    }, React.createElement("span", {
      className: "t-label"
    }, d.n), React.createElement("b", {
      className: "t-h3-l"
    }, d.title)))), React.createElement("div", {
      className: "mi-ix__b"
    }, React.createElement("b", {
      className: "mi-ix__n"
    }, n), React.createElement("div", {
      className: "mi-ix__bar"
    }, D.map((d, i) => React.createElement("i", {
      key: d.id,
      style: {
        "--c": MH_RGB[d.id],
        "--f": Math.min(1, Math.max(0, p * D.length - i))
      }
    }))))));
  }
  return React.createElement("div", {
    className: cls,
    "aria-hidden": "true"
  }, React.createElement("div", {
    className: "mi__panel"
  }, React.createElement("span", {
    className: "t-label mi-sp__n"
  }, String(n).padStart(3, "0")), React.createElement("span", {
    className: "t-label mi-sp__k"
  }, "RGBY \xB7 \u043A\u0440\u0435\u0430\u0442\u0438\u0432\u043D\u043E\u0435 \u0430\u0433\u0435\u043D\u0442\u0441\u0442\u0432\u043E")), React.createElement("div", {
    className: "mi-sp__lines"
  }, MH_CH.map(([c, col]) => React.createElement("i", {
    key: c,
    className: "mi-sp__l mi-sp__l--" + c,
    style: {
      "--w": p,
      "--col": col
    }
  }))));
}
Object.assign(window, {
  MainIntro
});