// RGBY · cursor.jsx.txt · сборка 2026-10-14
function CustomCursor({
  variant = "dot",
  tone = "ink"
}) {
  var dot = React.useRef(null),
    ring = React.useRef(null),
    box = React.useRef(null),
    lbl = React.useRef(null),
    trail = React.useRef(null);
  var [mode, setMode] = React.useState("");
  var [text, setText] = React.useState("");
  var [down, setDown] = React.useState(false);
  var [hidden, setHidden] = React.useState(true);
  React.useEffect(() => {
    if (!matchMedia("(pointer:fine)").matches) return;
    document.documentElement.classList.add("cc-on");
    var x = innerWidth / 2,
      y = innerHeight / 2,
      rx = x,
      ry = y,
      raf,
      target = null,
      rect = null,
      last = 0;
    var pts = [];
    var move = e => {
      x = e.clientX;
      y = e.clientY;
      setHidden(false);
      var el = e.target.closest && e.target.closest("a,button,[role=tab],label,.rg-case,input,textarea,select,[data-cursor]");
      if (el !== target) {
        target = el;
        var m = "",
          t = "";
        if (el) {
          if (el.matches("input,textarea,select")) m = variant === "cross" ? "link" : "text";else if (el.closest(".rg-case") || el.classList.contains("rg-case")) {
            m = "media";
            t = "Смотреть";
          } else if (el.dataset.cursor) {
            m = "media";
            t = el.dataset.cursor;
          } else m = "link";
        }
        setMode(m);
        setText(t);
      }
      rect = target && variant === "cross" && mode !== "text" ? target.getBoundingClientRect() : null;
      if (variant === "pixel" && trail.current) {
        var now = performance.now();
        if (now - last > 16) {
          last = now;
          pts.push({
            x,
            y,
            t: now
          });
        }
      }
    };
    var leave = () => setHidden(true);
    var dn = () => setDown(true),
      up = () => setDown(false);
    var toneT = 0,
      curTone = "";
    var lum = c => {
      var m = c && c.match(/rgba?\(([^)]+)\)/);
      if (!m) return null;
      var p = m[1].split(",").map(parseFloat);
      if (p.length > 3 && p[3] < .35) return null;
      return (.2126 * p[0] + .7152 * p[1] + .0722 * p[2]) / 255;
    };
    var sample = () => {
      var root = document.querySelector(".cc");
      if (!root) return;
      root.style.display = "none";
      var el = document.elementFromPoint(x, y);
      root.style.display = "";
      var L = null,
        n = el;
      while (n && n !== document.documentElement && L == null) {
        var cs = getComputedStyle(n);
        L = lum(cs.backgroundColor);
        if (L == null && cs.backgroundImage !== "none" && n.tagName !== "BUTTON") L = .3;
        n = n.parentElement;
      }
      if (L == null) L = 1;
      var tn = L < .55 ? "light" : "dark";
      if (tn !== curTone) {
        curTone = tn;
        root.setAttribute("data-tone", tn);
      }
    };
    var loop = () => {
      raf = requestAnimationFrame(loop);
      if (tone === "adaptive" && performance.now() - toneT > 90) {
        toneT = performance.now();
        sample();
      }
      rx += (x - rx) * .18;
      ry += (y - ry) * .18;
      if (dot.current) dot.current.style.transform = "translate3d(" + x + "px," + y + "px,0)";
      if (ring.current) ring.current.style.transform = "translate3d(" + rx + "px," + ry + "px,0)";
      if (lbl.current) lbl.current.style.transform = "translate3d(" + (x + 18) + "px," + (y + 18) + "px,0)";
      if (box.current) {
        if (false) {
          var r = target.getBoundingClientRect(),
            p = 6;
          box.current.style.transform = "translate3d(" + (r.left - p) + "px," + (r.top - p) + "px,0)";
          box.current.style.width = r.width + p * 2 + "px";
          box.current.style.height = r.height + p * 2 + "px";
        } else {
          box.current.style.transform = "translate3d(" + x + "px," + y + "px,0)";
        }
      }
      if (trail.current) {
        var now = performance.now();
        while (pts.length && now - pts[0].t > 520) pts.shift();
        var kids = trail.current.children;
        for (var i = 0; i < kids.length; i++) {
          var _p = pts[pts.length - 1 - i * 2];
          if (!_p) {
            kids[i].style.opacity = 0;
            continue;
          }
          var a = 1 - (now - _p.t) / 520;
          var g = 8;
          kids[i].style.opacity = Math.max(0, a).toFixed(2);
          kids[i].style.transform = "translate3d(" + (Math.round(_p.x / g) * g - 4) + "px," + (Math.round(_p.y / g) * g - 4) + "px,0) scale(" + Math.max(.2, a).toFixed(2) + ")";
        }
      }
    };
    raf = requestAnimationFrame(loop);
    addEventListener("pointermove", move, {
      passive: true
    });
    document.addEventListener("pointerleave", leave);
    addEventListener("pointerdown", dn);
    addEventListener("pointerup", up);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cc-on");
      removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      removeEventListener("pointerdown", dn);
      removeEventListener("pointerup", up);
    };
  }, [variant, tone]);
  var tc = React.useMemo(() => {
    var d = new Date();
    return [d.getHours(), d.getMinutes(), d.getSeconds()].map(n => String(n).padStart(2, "0")).join(":");
  }, [mode]);
  var cls = "cc cc--tone-" + tone + " cc--" + variant + (mode ? " cc--" + mode : "") + (down ? " cc--down" : "") + (hidden ? " cc--hidden" : "");
  return React.createElement("div", {
    className: cls,
    "aria-hidden": "true"
  }, variant === "pixel" ? React.createElement("div", {
    className: "cc-trail",
    ref: trail
  }, Array.from({
    length: 14
  }).map((_, i) => React.createElement("i", {
    key: i
  }))) : null, variant === "cross" ? React.createElement("div", {
    className: "cc-box",
    ref: box
  }, React.createElement("div", {
    className: "cc-box__in"
  }, React.createElement("i", null), React.createElement("i", null), React.createElement("i", null), React.createElement("i", null), React.createElement("b", {
    className: "cc-rec"
  }))) : null, React.createElement("div", {
    className: "cc-ring",
    ref: ring
  }, React.createElement("span", null, text)), React.createElement("div", {
    className: "cc-dot",
    ref: dot
  }), variant === "rec" ? React.createElement("div", {
    className: "cc-lbl",
    ref: lbl
  }, React.createElement("b", null), mode === "media" ? text : mode === "link" ? "REC " + tc : "") : null);
}
Object.assign(window, {
  CustomCursor
});