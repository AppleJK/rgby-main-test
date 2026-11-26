// RGBY · project/ui_kits/landing/hero-stage.jsx.txt
// Hero v1 «Обложка» stage: fine grain under the RG graphic, animated blue band, three TV-themed RG motions,
// auto-rotating covers with banner-style dots, channel-switch transitions and a per-cover TV animation.
const HERO_SLIDES = [{
  key: "rg",
  img: "hero-rg.webp",
  fx: "rg",
  tone: "light",
  name: "RGBY"
},
// Кадры кейсов — та же анимация, что у RG: зерно + «настройка сигнала» с телебликами
...[["k1-4", "dark", "К1"], ["tv3-wonderland-2", "light", "ТВ-3 · Страна Чудес"], ["rw-1", "light", "RW+"], ["energiya-pera-2", "dark", "Энергия пера"], ["soviet-classics-1", "dark", "Киноклассика"], ["beat-2", "dark", "Beat"], ["start-1", "dark", "START"], ["start-3", "light", "START"]].map(([f, tone, name]) => ({
  key: f,
  img: "cases/" + f + ".jpg",
  fx: "tv",
  tone,
  name
}))];
const hsEase = x => .5 - .5 * Math.cos(Math.PI * x);
const hsEase3 = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
const hsTri = (t, p) => {
  const u = t / p % 2;
  return u < 1 ? u : 2 - u;
};
const HS_CAM = [[1, 0, 0], [1.14, -4.5, 2.6], [1.06, 3.4, -1.8], [1.2, 1.6, 3.6]];

// RG motion: dvd — eased ping-pong between the frame edges, hue shifts on every bounce (the DVD screensaver);
// signal — slow float + periodic «tuning» glitch with chroma split; camera — studio camera reframing with focus pull.
function useRgMotion(ref, boxRef, mode, on) {
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
    el.style.filter = "";
    if (!on) return;
    let raf,
      t0 = performance.now(),
      hue = 0,
      bx = -1,
      by = -1,
      glitchAt = 2600,
      glitchEnd = 0,
      lastG = 0;
    const box = boxRef.current;
    const loop = now => {
      raf = requestAnimationFrame(loop);
      const t = now - t0;
      if (mode === "dvd") {
        const W = box.offsetWidth,
          H = box.offsetHeight,
          w = el.offsetWidth,
          h = el.offsetHeight;
        const rx = Math.max(0, W - w),
          ry = Math.max(0, H - h);
        const x = hsEase(hsTri(t, 12800)) * rx,
          y = hsEase(hsTri(t, 7900)) * ry;
        const sx = Math.floor(t / 12800),
          sy = Math.floor(t / 7900);
        if (sx !== bx || sy !== by) {
          if (bx >= 0) {
            hue = (hue + 52) % 360;
            el.style.filter = "hue-rotate(" + hue + "deg) saturate(1.15)";
          }
          bx = sx;
          by = sy;
        }
        el.style.transform = "translate3d(" + x.toFixed(1) + "px," + y.toFixed(1) + "px,0)";
      } else if (mode === "signal") {
        const fx = Math.sin(t / 4100) * 1.1 + Math.sin(t / 1700) * .25,
          fy = Math.sin(t / 5300) * .9;
        let gx = 0,
          f = "";
        if (t > glitchAt && !glitchEnd) {
          glitchEnd = t + 360 + Math.random() * 260;
          box.classList.add("hs--tune");
        }
        if (glitchEnd) {
          if (t - lastG > 55) {
            lastG = t;
            gx = (Math.random() - .5) * 3.2;
            el.dataset.gx = gx;
          }
          gx = +el.dataset.gx || 0;
          const s = 4 + Math.random() * 6;
          f = "drop-shadow(" + s.toFixed(1) + "px 0 0 rgba(255,40,80,.45)) drop-shadow(" + (-s).toFixed(1) + "px 0 0 rgba(40,170,255,.45)) brightness(1.08)";
          if (t > glitchEnd) {
            glitchEnd = 0;
            glitchAt = t + 2800 + Math.random() * 3200;
            box.classList.remove("hs--tune");
            f = "";
            gx = 0;
          }
        }
        el.style.transform = "translate3d(0," + (fy + gx * .35).toFixed(2) + "%,0)";
        el.style.filter = f;
      } else {
        const HOLD = 3400,
          MOVE = 2600,
          P = HOLD + MOVE;
        const k = Math.floor(t / P),
          u = t % P;
        const a = HS_CAM[k % HS_CAM.length],
          b = HS_CAM[(k + 1) % HS_CAM.length];
        const p = u < HOLD ? 0 : hsEase3((u - HOLD) / MOVE);
        const s = a[0] + (b[0] - a[0]) * p,
          x = a[1] + (b[1] - a[1]) * p,
          y = a[2] + (b[2] - a[2]) * p;
        const blur = u < HOLD ? 0 : Math.sin(Math.PI * p) * 4.5;
        el.style.transform = "translate3d(" + x.toFixed(2) + "%," + y.toFixed(2) + "%,0) scale(" + s.toFixed(4) + ")";
        el.style.filter = blur > .05 ? "blur(" + blur.toFixed(2) + "px)" : "";
        box.classList.toggle("hs--focus", u >= HOLD);
      }
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      box.classList.remove("hs--tune", "hs--focus");
      el.style.transform = "";
      el.style.filter = "";
    };
  }, [mode, on, ref.current]);
}

// RGB → цвет плашки: тон кадра сохраняем, яркость — под цвет текста (тёмный кадр → глубокий тёмный, светлый → светлый)
function hsTint(r, g, b, tone) {
  r /= 255;
  g /= 255;
  b /= 255;
  const mx = Math.max(r, g, b),
    mn = Math.min(r, g, b),
    l0 = (mx + mn) / 2,
    dd = mx - mn;
  let hh = 0,
    s = 0;
  if (dd) {
    s = dd / (1 - Math.abs(2 * l0 - 1));
    hh = mx === r ? (g - b) / dd % 6 : mx === g ? (b - r) / dd + 2 : (r - g) / dd + 4;
    hh *= 60;
    if (hh < 0) hh += 360;
  }
  return "hsl(" + hh.toFixed(0) + " " + (Math.min(.8, s * 1.15) * 100).toFixed(0) + "% " + (tone === "light" ? 84 : 20) + "%)";
}
function HeroStage({
  motion = "signal",
  band = "breathe",
  auto = true,
  interval = 6,
  active,
  onTone,
  onSlide,
  cover = true
}) {
  const D = window.RGBY_DATA;
  const Noise = window.Noise;
  const box = React.useRef(null),
    rg = React.useRef(null);
  const [idx, setIdx] = React.useState(0);
  const [shown, setShown] = React.useState(0);
  const [sw, setSw] = React.useState(false);
  const [cycle, setCycle] = React.useState(0);
  // Порядок: первый кадр (RG) всегда первый, остальные — случайно при каждой загрузке
  const SL = React.useMemo(() => {
    const r = HERO_SLIDES.slice(1);
    for (let i = r.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [r[i], r[j]] = [r[j], r[i]];
    }
    return [HERO_SLIDES[0]].concat(r);
  }, []);
  const N = SL.length;
  // Цвет нижней плашки — из самого кадра (низ картинки), для RG остаётся фирменный синий
  const [tints, setTints] = React.useState({});
  React.useEffect(() => {
    SL.forEach(s => {
      if (s.fx === "rg") return;
      const im = new Image();
      im.decoding = "async";
      im.onload = () => {
        try {
          const W = 48,
            H = 27,
            c = document.createElement("canvas");
          c.width = W;
          c.height = H;
          const x = c.getContext("2d", {
            willReadFrequently: true
          });
          x.drawImage(im, 0, 0, W, H);
          const d = x.getImageData(0, Math.floor(H * .55), W, H - Math.floor(H * .55)).data;
          let r = 0,
            g = 0,
            bl = 0,
            wt = 0;
          for (let k = 0; k < d.length; k += 4) {
            const R = d[k],
              G = d[k + 1],
              B = d[k + 2],
              mx = Math.max(R, G, B),
              mn = Math.min(R, G, B),
              w = 1 + (mx - mn) / 32;
            r += R * w;
            g += G * w;
            bl += B * w;
            wt += w;
          }
          setTints(t => ({
            ...t,
            [s.key]: hsTint(r / wt, g / wt, bl / wt, s.tone)
          }));
        } catch (e) {}
      };
      im.src = D.img(s.img);
    });
  }, []);
  useRgMotion(rg, box, shown === 0 ? motion : "signal", active, shown);
  const go = React.useCallback(n => {
    n = (n + N) % N;
    if (n === idx) return;
    setIdx(n);
    setSw(true);
    setTimeout(() => setShown(n), 260);
    setTimeout(() => setSw(false), 620);
  }, [idx]);
  React.useEffect(() => {
    onTone && onTone(SL[shown].tone);
    onSlide && onSlide(SL[shown].key);
  }, [shown]);
  React.useEffect(() => {
    if (!active || !auto) return;
    let left = interval * 1000,
      last = performance.now(),
      raf;
    const tick = now => {
      const dt = now - last;
      last = now;
      const r = box.current && box.current.getBoundingClientRect();
      const visible = !document.hidden && r && r.bottom > 0;
      if (visible && !sw) left -= dt;
      const host = box.current && box.current.parentElement;
      if (host) host.style.setProperty("--hs-p", Math.min(1, 1 - left / (interval * 1000)).toFixed(4));
      if (left <= 0) {
        go(idx + 1);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, auto, interval, idx, cycle, sw]);
  const pick = n => {
    if (n === idx) {
      setCycle(c => c + 1);
      return;
    }
    go(n);
  };
  const cur = SL[shown];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    ref: box,
    className: "hs hs--" + motion + " hs-band--" + band + (sw ? " hs--switch" : "") + (active ? " hs--on" : "") + (cover ? "" : " hs--nocover"),
    "data-tone": cur.tone,
    "data-fx": cur.fx,
    style: tints[cur.key] ? {
      "--band-c": tints[cur.key]
    } : null
  }, Noise ? /*#__PURE__*/React.createElement(Noise, {
    className: "hs-grain"
  }) : null, /*#__PURE__*/React.createElement("div", {
    className: "hs-layer",
    "data-parallax": "0.3"
  }, SL.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s.key,
    className: "hs-slide hs-slide--" + (s.fx === "rg" ? "rg" : "img") + " hs-fx--" + s.fx + (i === shown ? " hs-slide--on" : ""),
    "aria-hidden": i !== shown
  }, /*#__PURE__*/React.createElement("img", {
    ref: i === shown ? rg : null,
    src: D.img(s.img),
    alt: (window.RGBY_TV_HERO || {})[s.key]?.alt || "",
    decoding: "async"
  }), s.fx === "roll" ? /*#__PURE__*/React.createElement("i", {
    className: "hs-roll"
  }) : null, s.fx === "grid" ? /*#__PURE__*/React.createElement("div", {
    className: "hs-tiles"
  }, Array.from({
    length: 40
  }).map((_, k) => /*#__PURE__*/React.createElement("i", {
    key: k,
    style: {
      "--dl": k * 37 % 40 * 14 + "ms"
    }
  }))) : null, s.fx === "vhs" ? /*#__PURE__*/React.createElement("i", {
    className: "hs-track"
  }) : null))), /*#__PURE__*/React.createElement("div", {
    className: "hs-bars"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hs-band"
  }, /*#__PURE__*/React.createElement("i", {
    className: "hs-band__blur"
  }), /*#__PURE__*/React.createElement("i", {
    className: "hs-band__grad"
  }), /*#__PURE__*/React.createElement("i", {
    className: "hs-band__tint"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hs-flow"
  }, /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null))), /*#__PURE__*/React.createElement("div", {
    className: "hs-static"
  }, Noise ? /*#__PURE__*/React.createElement(Noise, {
    className: "hs-static__grain",
    strong: true
  }) : null, /*#__PURE__*/React.createElement("i", null))), /*#__PURE__*/React.createElement("div", {
    className: "hs-dots" + (auto ? "" : " hs-dots--manual"),
    role: "tablist",
    "aria-label": "\u041E\u0431\u043B\u043E\u0436\u043A\u0438"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hs-ch"
  }, "CH ", String(idx + 1).padStart(2, "0")), SL.map((s, i) => /*#__PURE__*/React.createElement("button", {
    key: s.key,
    type: "button",
    role: "tab",
    "aria-selected": i === idx,
    "aria-label": s.name,
    className: "hs-dot" + (i === idx ? " hs-dot--on" : ""),
    onClick: () => pick(i)
  }, /*#__PURE__*/React.createElement("i", null)))));
}
Object.assign(window, {
  HeroStage,
  HERO_SLIDES
});
