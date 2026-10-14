// RGBY · main-hero2.jsx.txt · сборка 2026-10-14
var MH2_TASKS = {
  media: ["нужно", "оформление телеканала"],
  web: ["нужен", "сайт, который продаёт"],
  production: ["нужен", "рекламный ролик"],
  rnd: ["нужна", "генеративная графика"],
  branding: ["нужен", "ребрендинг"],
  multimedia: ["нужен", "контент для LED-экранов"]
};
var mh2Go = id => e => {
  e.preventDefault();
  var el = document.getElementById(id);
  if (el) window.scrollTo({
    top: el.getBoundingClientRect().top + scrollY,
    behavior: "smooth"
  });
};
var Mh2Cta = () => React.createElement("div", {
  className: "mh2-cta"
}, React.createElement("a", {
  href: "#brief",
  onClick: mh2Go("brief"),
  className: "mh2-btn mh2-btn--fill"
}, "\u041E\u0431\u0441\u0443\u0434\u0438\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442 ", React.createElement("span", {
  className: "m-arrow"
}, "\u2192")), React.createElement("a", {
  href: "#reel",
  onClick: mh2Go("reel"),
  className: "mh2-btn"
}, "\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0448\u043E\u0443\u0440\u0438\u043B"));
function MhTask({
  vs
}) {
  var H = MHD().HERO,
    D = MHD().DIRECTIONS,
    P = MHD().PROJECTS,
    [cur, setCur] = React.useState(0),
    [nch, setN] = React.useState(0);
  var S = React.useRef({
    i: 0,
    n: 0,
    ph: "wait",
    t: 0
  });
  var task = i => MH2_TASKS[D[i].id] || ["нужен", D[i].sub.toLowerCase()];
  React.useEffect(() => {
    if (mhReduce()) {
      setN(99);
      return;
    }
    var raf = 0,
      prev = performance.now();
    var f = now => {
      var dt = Math.min(50, now - prev),
        s = S.current,
        len = task(s.i)[1].length;
      prev = now;
      s.t += dt;
      if (s.ph === "type" && s.t > 48 + Math.random() * 40) {
        s.t = 0;
        s.n++;
        setN(s.n);
        if (s.n >= len) s.ph = "hold";
      } else if (s.ph === "hold" && s.t > 2800) {
        s.t = 0;
        s.ph = "erase";
      } else if (s.ph === "erase" && s.t > 18) {
        s.t = 0;
        s.n = Math.max(0, s.n - 1);
        setN(s.n);
        if (!s.n) {
          s.i = (s.i + 1) % D.length;
          setCur(s.i);
          s.ph = "wait";
        }
      } else if (s.ph === "wait" && s.t > 520) {
        s.t = 0;
        s.ph = "type";
      }
      raf = requestAnimationFrame(f);
    };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  }, []);
  var jump = i => {
    Object.assign(S.current, {
      i,
      n: 0,
      t: 0,
      ph: "wait"
    });
    setCur(i);
    setN(0);
  };
  var d = D[cur],
    tk = task(cur),
    done = nch >= tk[1].length,
    cs = P.find(p => p.dir === d.id);
  return React.createElement("section", {
    id: "top",
    className: "m-hero mh mh--tk rv--in",
    "data-screen-label": "01 \u041E\u0431\u043B\u043E\u0436\u043A\u0430"
  }, vs, React.createElement("div", {
    className: "mh-tk__bg",
    "aria-hidden": "true"
  }, D.map((x, i) => React.createElement("i", {
    key: x.id,
    className: "mh-tk__img" + (i === cur ? " is-on" : ""),
    style: {
      backgroundImage: "url(" + x.img + ")"
    }
  })), React.createElement("b", {
    key: cur,
    className: "mh-tk__sweep"
  }, MH_CH.map(([k, c]) => React.createElement("i", {
    key: k,
    style: {
      background: c
    }
  }))), React.createElement("i", {
    className: "mh-tk__shade"
  })), React.createElement(MainHeader, {
    tone: "blue"
  }), React.createElement("h1", {
    className: "mh-sr"
  }, H.title.replace("\n", " ")), React.createElement("div", {
    className: "mh-tk__main"
  }, React.createElement("p", {
    className: "t-label mh-tk__k"
  }, React.createElement("i", null), "RGBY \u2014 \u043A\u0440\u0435\u0430\u0442\u0438\u0432\u043D\u043E\u0435 \u0430\u0433\u0435\u043D\u0442\u0441\u0442\u0432\u043E \u0438 CG-\u043F\u0440\u043E\u0434\u0430\u043A\u0448\u043D \u043F\u043E\u043B\u043D\u043E\u0433\u043E \u0446\u0438\u043A\u043B\u0430"), React.createElement("div", {
    className: "mh-tk__h",
    "aria-hidden": "true"
  }, React.createElement("span", {
    className: "mh-tk__l1"
  }, "\u0412\u0430\u043C ", tk[0]), React.createElement("span", {
    className: "mh-tk__l2"
  }, tk[1].slice(0, nch), React.createElement("i", {
    className: "mh-tk__caret" + (done ? " is-blink" : "")
  }))), React.createElement("p", {
    className: "mh-tk__ans" + (done ? " is-on" : ""),
    style: {
      "--c": MH_RGB[d.id]
    }
  }, React.createElement("b", null, "\u0421\u0434\u0435\u043B\u0430\u0435\u043C."), React.createElement("span", {
    className: "t-body-m"
  }, d.title, cs ? " · например, " + cs.title : " · " + d.sub))), React.createElement("div", {
    className: "mh-tk__foot"
  }, React.createElement("nav", {
    className: "mh-tk__idx",
    "aria-label": "\u041D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F"
  }, D.map((x, i) => React.createElement("button", {
    key: x.id,
    type: "button",
    className: i === cur ? "is-on" : "",
    style: {
      "--c": MH_RGB[x.id]
    },
    onClick: () => jump(i)
  }, React.createElement("span", {
    className: "t-label"
  }, x.n), React.createElement("span", {
    className: "t-small"
  }, x.title)))), React.createElement(Mh2Cta, null)));
}
function MhWall({
  vs
}) {
  var H = MHD().HERO,
    D = MHD().DIRECTIONS,
    P = MHD().PROJECTS,
    ref = React.useRef(null),
    plane = React.useRef(null),
    cols = React.useRef([]),
    A = React.useRef({
      rx: 0,
      ry: 0,
      o: []
    });
  var NC = 6,
    PER = 8,
    [live, setLive] = React.useState([5, 20, 34]);
  var tiles = React.useMemo(() => MHD().TILES && MHD().TILES.length ? MHD().TILES : P.map(p => ({
    img: p.img,
    t: p.title,
    dir: p.dir || "media",
    id: p.caseId
  })), []);
  var grid = React.useMemo(() => {
    var n = tiles.length,
      used = [];
    return Array.from({
      length: NC
    }, (_, c) => {
      var col = [];
      var _loop = function (r) {
        var idx = (c * PER + r) % n,
          guard = 0;
        var bad = t => col.length && col[col.length - 1].id === t.id || used[c - 1] && used[c - 1][r] && used[c - 1][r].id === t.id || r === PER - 1 && col[0] && col[0].id === t.id;
        while (guard++ < n && bad(tiles[idx])) idx = (idx + 1) % n;
        col.push(Object.assign({
          k: c * PER + r
        }, tiles[idx]));
      };
      for (var r = 0; r < PER; r++) {
        _loop(r);
      }
      used[c] = col;
      return col;
    });
  }, [tiles]);
  React.useEffect(() => {
    if (mhReduce()) return;
    var n = 0;
    var id = setInterval(() => {
      n++;
      setLive(L => {
        var tot = NC * PER,
          cnt = n % 4 === 3 ? 2 : 3,
          nx = L.slice(1);
        var c = (L[L.length - 1] + 11 + n % 5) % tot;
        while (nx.some(v => Math.floor(v / PER) === Math.floor(c / PER))) c = (c + PER) % tot;
        nx.push(c);
        return nx.slice(-cnt);
      });
    }, 1700);
    return () => clearInterval(id);
  }, []);
  useMhLoop(ref, (st, dt) => {
    var el = ref.current,
      r = el.getBoundingClientRect(),
      k = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height * .8))),
      e = k * k * (3 - 2 * k),
      a = A.current;
    var tx = st.has ? st.mx / st.w - .5 : 0,
      ty = st.has ? st.my / st.h - .5 : 0;
    a.rx += (ty - a.rx) * .045;
    a.ry += (tx - a.ry) * .045;
    if (plane.current) plane.current.style.transform = "translate(-50%,-50%) rotateX(" + (30 * (1 - e) - a.rx * 7).toFixed(2) + "deg) rotateY(" + (a.ry * 8).toFixed(2) + "deg) rotateZ(" + (-12 * (1 - e)).toFixed(2) + "deg) scale(" + (1 + e * 1.2).toFixed(3) + ")";
    cols.current.forEach((c, i) => {
      if (!c || !c.children[PER]) return;
      var per = c.children[PER].offsetTop - c.children[0].offsetTop;
      if (!per) return;
      var sp = (i % 2 ? 1 : -1) * (.0026 + i % 3 * .0009) * (1 - e * .7) * per / 50;
      a.o[i] = (((a.o[i] == null ? per * i * .13 : a.o[i]) + sp * dt) % per + per) % per;
      c.style.transform = "translate3d(0," + (-a.o[i]).toFixed(2) + "px,0)";
    });
    el.style.setProperty("--k", e.toFixed(3));
  });
  var names = P.map(p => p.title);
  return React.createElement("section", {
    id: "top",
    ref: ref,
    className: "m-hero mh mh--wl rv--in",
    "data-screen-label": "01 \u041E\u0431\u043B\u043E\u0436\u043A\u0430"
  }, vs, React.createElement("div", {
    className: "mh-wl__stage",
    "aria-hidden": "true"
  }, React.createElement("div", {
    className: "mh-wl__plane",
    ref: plane
  }, grid.map((col, c) => React.createElement("div", {
    key: c,
    className: "mh-wl__col"
  }, React.createElement("div", {
    className: "mh-wl__run",
    ref: el => cols.current[c] = el
  }, col.concat(col).map((t, j) => React.createElement("figure", {
    key: j,
    className: "mh-wl__t" + (live.includes(t.k) ? " is-live" : ""),
    style: {
      "--c": MH_RGB[t.dir]
    }
  }, React.createElement("i", {
    style: {
      backgroundImage: "url(" + t.img + ")"
    }
  }), React.createElement("figcaption", null, React.createElement("span", {
    className: "t-label"
  }, "\u25CF \u0432 \u0440\u0430\u0431\u043E\u0442\u0435"), React.createElement("b", null, t.t)))))))), React.createElement("i", {
    className: "mh-wl__shade"
  })), React.createElement(MainHeader, {
    tone: "blue"
  }), React.createElement("div", {
    className: "mh-wl__main"
  }, React.createElement("p", {
    className: "t-label mh-wl__k"
  }, "RGBY \xB7 ", D.length, " \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0439 \xB7 \u044D\u0444\u0438\u0440, \u0434\u0438\u0434\u0436\u0438\u0442\u0430\u043B, \u0431\u043E\u043B\u044C\u0448\u0438\u0435 \u044D\u043A\u0440\u0430\u043D\u044B"), React.createElement("h1", {
    className: "m-hero__h t-display-xl mh-wl__h"
  }, React.createElement(MhTitle, {
    text: H.title
  })), React.createElement("div", {
    className: "mh-wl__row"
  }, React.createElement("div", {
    className: "mh-wl__cl"
  }, React.createElement("span", {
    className: "t-label"
  }, "\u0421\u0440\u0435\u0434\u0438 \u043D\u0430\u0448\u0438\u0445 \u0440\u0430\u0431\u043E\u0442"), React.createElement("div", {
    className: "mh-wl__tick"
  }, React.createElement("div", null, names.concat(names).map((n, i) => React.createElement("span", {
    key: i,
    className: "t-h3-l"
  }, n))))), React.createElement(Mh2Cta, null))));
}
Object.assign(window, {
  MhTask,
  MhWall
});