// RGBY · cms.jsx.txt · сборка 2026-10-14
function DropImage({
  value,
  onFile,
  label = "Перетащите обложку или нажмите",
  accept = "image/*"
}) {
  var [over, setOver] = React.useState(false);
  var pick = files => files && files[0] && onFile(files[0]);
  return React.createElement("label", {
    className: "cms__drop" + (value ? " cms__drop--has" : "") + (over ? " cms__drop--over" : ""),
    style: value && !/^data:video/.test(value) ? {
      backgroundImage: "url(" + value + ")"
    } : null,
    onDragOver: e => {
      e.preventDefault();
      setOver(true);
    },
    onDragLeave: () => setOver(false),
    onDrop: e => {
      e.preventDefault();
      setOver(false);
      pick(e.dataTransfer.files);
    }
  }, React.createElement("span", null, value ? "Заменить" : label), React.createElement("input", {
    type: "file",
    accept: accept,
    onChange: e => pick(e.target.files)
  }));
}
var BLANK_CASE = () => ({
  id: "c" + Date.now(),
  year: String(new Date().getFullYear()),
  title: "Новый кейс",
  client: "",
  category: "",
  short: "",
  description: "",
  services: "",
  cover: "",
  gallery: [],
  video: "",
  format: "vertical",
  column: 1
});
var BLANK_MEMBER = () => ({
  id: "t" + Date.now(),
  name: "Имя Фамилия",
  role: "Должность",
  photo: "",
  highlights: [{
    org: "RGBY",
    role: "",
    period: ""
  }],
  career: []
});
var COLS = [{
  k: 0,
  name: "Левый",
  w: 453
}, {
  k: 1,
  name: "Центр",
  w: 572
}, {
  k: 2,
  name: "Правый",
  w: 335
}];
var RATIO_V = 678.46 / 572,
  RATIO_H = 188 / 334.66;
var isH = f => f === "horizontal" || f === "landscape" || f === "wide";
var colOf = c => c.column == null ? 1 : +c.column;
function CaseBoard({
  cases,
  setData,
  img,
  F,
  del
}) {
  var [sel, setSel] = React.useState(null);
  var [drag, setDrag] = React.useState(null);
  var [over, setOver] = React.useState(null);
  var idx = cases.findIndex(c => c.id === sel);
  var cur = idx >= 0 ? cases[idx] : null;
  var upd = (id, patch) => setData(d => ({
    ...d,
    cases: d.cases.map(x => x.id === id ? {
      ...x,
      ...patch
    } : x)
  }));
  var place = (id, k, beforeId) => setData(d => {
    var a = [...d.cases];
    var from = a.findIndex(x => x.id === id);
    if (from < 0) return d;
    var [it] = a.splice(from, 1);
    var moved = {
      ...it,
      column: k
    };
    var at = beforeId ? a.findIndex(x => x.id === beforeId) : -1;
    if (at < 0) {
      var last = -1;
      a.forEach((x, j) => {
        if (colOf(x) === k) last = j;
      });
      at = last + 1 || a.length;
    }
    a.splice(at, 0, moved);
    return {
      ...d,
      cases: a
    };
  });
  var step = (c, dir) => {
    var list = cases.filter(x => colOf(x) === colOf(c));
    var j = list.findIndex(x => x.id === c.id) + dir;
    if (j < 0 || j >= list.length) return;
    place(c.id, colOf(c), dir < 0 ? list[j].id : list[j + 1] && list[j + 1].id);
  };
  var add = k => {
    var n = {
      ...BLANK_CASE(),
      column: k
    };
    setData(d => ({
      ...d,
      cases: [...d.cases, n]
    }));
    setSel(n.id);
  };
  var dropFiles = (e, c) => {
    var fl = e.dataTransfer.files;
    if (fl && fl[0] && /^image\//.test(fl[0].type)) {
      img(fl[0], v => upd(c.id, {
        cover: v
      }));
      return true;
    }
    return false;
  };
  var heights = COLS.map(col => cases.filter(x => colOf(x) === col.k).reduce((h, x) => h + col.w * (isH(x.format) ? RATIO_H : RATIO_V) + 130, 0));
  var maxH = Math.max(1, ...heights);
  return React.createElement(React.Fragment, null, React.createElement("div", {
    className: "cmsb"
  }, COLS.map((col, ci) => {
    var list = cases.filter(x => colOf(x) === col.k);
    return React.createElement("div", {
      key: col.k,
      className: "cmsb__col" + (over === "col" + col.k ? " cmsb__col--over" : ""),
      style: {
        flex: col.w + " 1 0"
      },
      onDragOver: e => {
        e.preventDefault();
        if (over !== "col" + col.k && !e.target.closest(".cmsb__card")) setOver("col" + col.k);
      },
      onDragLeave: e => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOver(null);
      },
      onDrop: e => {
        e.preventDefault();
        setOver(null);
        if (drag && !e.target.closest(".cmsb__card")) place(drag, col.k);
        setDrag(null);
      }
    }, React.createElement("div", {
      className: "cmsb__head"
    }, React.createElement("span", null, col.name, " \xB7 ", col.w), React.createElement("span", {
      title: "\u041E\u0442\u043D\u043E\u0441\u0438\u0442\u0435\u043B\u044C\u043D\u0430\u044F \u0432\u044B\u0441\u043E\u0442\u0430 \u0441\u0442\u043E\u043B\u0431\u0446\u0430"
    }, Math.round(heights[ci] / maxH * 100), "%")), React.createElement("div", {
      className: "cmsb__meter"
    }, React.createElement("i", {
      style: {
        transform: "scaleX(" + heights[ci] / maxH + ")"
      }
    })), list.map(c => {
      var h = isH(c.format);
      return React.createElement("div", {
        key: c.id,
        className: "cmsb__card" + (sel === c.id ? " cmsb__card--sel" : "") + (drag === c.id ? " cmsb__card--drag" : "") + (over === c.id ? " cmsb__card--over" : ""),
        draggable: true,
        onDragStart: e => {
          setDrag(c.id);
          e.dataTransfer.effectAllowed = "move";
          e.dataTransfer.setData("text/plain", c.id);
        },
        onDragEnd: () => {
          setDrag(null);
          setOver(null);
        },
        onDragOver: e => {
          e.preventDefault();
          e.stopPropagation();
          if (over !== c.id) setOver(c.id);
        },
        onDrop: e => {
          e.preventDefault();
          e.stopPropagation();
          setOver(null);
          if (!dropFiles(e, c) && drag && drag !== c.id) place(drag, col.k, c.id);
          setDrag(null);
        },
        onClick: () => setSel(sel === c.id ? null : c.id)
      }, React.createElement("div", {
        className: "cmsb__cover",
        style: {
          paddingTop: (h ? RATIO_H : RATIO_V) * 100 + "%",
          backgroundImage: c.cover ? "url(" + c.cover + ")" : null
        }
      }, !c.cover ? React.createElement("span", {
        className: "cmsb__empty"
      }, "\u041D\u0435\u0442 \u043E\u0431\u043B\u043E\u0436\u043A\u0438", React.createElement("br", null), "\u043F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 \u0444\u0430\u0439\u043B") : null, React.createElement("span", {
        className: "cmsb__badge"
      }, h ? "Г" : "В"), React.createElement("div", {
        className: "cmsb__tools",
        onClick: e => e.stopPropagation()
      }, React.createElement("button", {
        type: "button",
        title: "\u0421\u043C\u0435\u043D\u0438\u0442\u044C \u0444\u043E\u0440\u043C\u0430\u0442",
        onClick: () => upd(c.id, {
          format: h ? "vertical" : "horizontal"
        })
      }, h ? "→ В" : "→ Г"), React.createElement("button", {
        type: "button",
        title: "\u0412 \u0441\u0442\u043E\u043B\u0431\u0435\u0446 \u043B\u0435\u0432\u0435\u0435",
        disabled: col.k === 0,
        onClick: () => place(c.id, col.k - 1)
      }, "\u2190"), React.createElement("button", {
        type: "button",
        title: "\u0412\u044B\u0448\u0435",
        onClick: () => step(c, -1)
      }, "\u2191"), React.createElement("button", {
        type: "button",
        title: "\u041D\u0438\u0436\u0435",
        onClick: () => step(c, 1)
      }, "\u2193"), React.createElement("button", {
        type: "button",
        title: "\u0412 \u0441\u0442\u043E\u043B\u0431\u0435\u0446 \u043F\u0440\u0430\u0432\u0435\u0435",
        disabled: col.k === 2,
        onClick: () => place(c.id, col.k + 1)
      }, "\u2192"), React.createElement("label", {
        title: "\u0417\u0430\u043C\u0435\u043D\u0438\u0442\u044C \u043E\u0431\u043B\u043E\u0436\u043A\u0443"
      }, "\u2912", React.createElement("input", {
        type: "file",
        accept: "image/*",
        onChange: e => e.target.files[0] && img(e.target.files[0], v => upd(c.id, {
          cover: v
        }))
      })))), React.createElement("span", {
        className: "cmsb__year"
      }, c.year), React.createElement("span", {
        className: "cmsb__title"
      }, c.title || "Без названия"), c.short ? React.createElement("span", {
        className: "cmsb__desc"
      }, c.short) : null);
    }), React.createElement("button", {
      type: "button",
      className: "cmsb__add",
      onClick: () => add(col.k)
    }, "+ \u041A\u0435\u0439\u0441 \u0432 \xAB", col.name, "\xBB"));
  })), cur ? React.createElement("div", {
    className: "cms__item cmsb__edit"
  }, React.createElement("div", {
    className: "cms__bar",
    style: {
      padding: "10px"
    }
  }, React.createElement("b", {
    style: {
      font: "700 14px/1.1 var(--font-sans)",
      letterSpacing: "-.03em"
    }
  }, cur.title || "Без названия"), React.createElement("div", {
    className: "cms__tabs"
  }, React.createElement("button", {
    type: "button",
    className: "cms__btn",
    onClick: () => {
      del(idx);
      setSel(null);
    }
  }, "\u0423\u0434\u0430\u043B\u0438\u0442\u044C"), React.createElement("button", {
    type: "button",
    className: "cms__btn",
    onClick: () => setSel(null)
  }, "\u0413\u043E\u0442\u043E\u0432\u043E"))), React.createElement("div", {
    className: "cms__fields",
    style: {
      paddingTop: 10
    }
  }, React.createElement("div", {
    className: "w2"
  }, React.createElement(DropImage, {
    value: cur.cover,
    onFile: fl => img(fl, v => upd(cur.id, {
      cover: v
    }))
  })), F("Название", cur.title, v => upd(cur.id, {
    title: v
  }), {
    w2: 1
  }), F("Год", cur.year, v => upd(cur.id, {
    year: v
  })), React.createElement("label", null, "\u0421\u0442\u043E\u043B\u0431\u0435\u0446", React.createElement("select", {
    value: colOf(cur),
    onChange: e => place(cur.id, +e.target.value)
  }, COLS.map(col => React.createElement("option", {
    key: col.k,
    value: col.k
  }, col.name, " \xB7 ", col.w)))), React.createElement("label", null, "\u0424\u043E\u0440\u043C\u0430\u0442 \u043E\u0431\u043B\u043E\u0436\u043A\u0438", React.createElement("select", {
    value: isH(cur.format) ? "horizontal" : "vertical",
    onChange: e => upd(cur.id, {
      format: e.target.value
    })
  }, React.createElement("option", {
    value: "vertical"
  }, "\u0412\u0435\u0440\u0442\u0438\u043A\u0430\u043B\u044C\u043D\u0430\u044F \xB7 572\xD7678"), React.createElement("option", {
    value: "horizontal"
  }, "\u0413\u043E\u0440\u0438\u0437\u043E\u043D\u0442\u0430\u043B\u044C\u043D\u0430\u044F \xB7 335\xD7188"))), F("Клиент", cur.client, v => upd(cur.id, {
    client: v
  })), F("Категория", cur.category, v => upd(cur.id, {
    category: v
  })), F("Анонс (карточка)", cur.short, v => upd(cur.id, {
    short: v
  }), {
    w2: 1,
    area: 1
  }), F("Описание (модальное окно)", cur.description, v => upd(cur.id, {
    description: v
  }), {
    w2: 1,
    area: 1,
    rows: 4
  }), F("Что сделали", cur.services, v => upd(cur.id, {
    services: v
  }), {
    w2: 1
  }), F("Видео (URL .mp4)", cur.video, v => upd(cur.id, {
    video: v
  }), {
    w2: 1,
    ph: "https://…/case.mp4"
  }), React.createElement("div", {
    className: "w2 cms__career"
  }, React.createElement("span", {
    className: "cms__hint"
  }, "\u0413\u0430\u043B\u0435\u0440\u0435\u044F \xB7 ", cur.gallery.length), React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap"
    }
  }, cur.gallery.map((g, k) => React.createElement("button", {
    type: "button",
    key: k,
    title: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
    className: "cms__thumb",
    style: {
      backgroundImage: "url(" + g + ")",
      border: 0,
      cursor: "pointer"
    },
    onClick: () => upd(cur.id, {
      gallery: cur.gallery.filter((_, j) => j !== k)
    })
  })), React.createElement("div", {
    style: {
      width: 120
    }
  }, React.createElement(DropImage, {
    label: "+ \u043A\u0430\u0434\u0440",
    onFile: fl => img(fl, v => upd(cur.id, {
      gallery: [...cur.gallery, v]
    }))
  })))))) : React.createElement("p", {
    className: "cms__hint",
    style: {
      textAlign: "center"
    }
  }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443, \u0447\u0442\u043E\u0431\u044B \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0442\u0435\u043A\u0441\u0442\u044B, \u0433\u0430\u043B\u0435\u0440\u0435\u044E \u0438 \u0432\u0438\u0434\u0435\u043E."));
}
function Cms({
  open,
  onClose,
  data,
  setData
}) {
  var D = window.RGBY_DATA;
  var [tab, setTab] = React.useState("cases");
  var [msg, setMsg] = React.useState("");
  var upd = (key, i, patch) => setData(d => ({
    ...d,
    [key]: d[key].map((x, j) => j === i ? {
      ...x,
      ...patch
    } : x)
  }));
  var move = (key, i, dir) => setData(d => {
    var a = [...d[key]];
    var j = i + dir;
    if (j < 0 || j >= a.length) return d;
    [a[i], a[j]] = [a[j], a[i]];
    return {
      ...d,
      [key]: a
    };
  });
  var del = (key, i) => confirm("Удалить запись?") && setData(d => ({
    ...d,
    [key]: d[key].filter((_, j) => j !== i)
  }));
  var img = async (file, cb) => {
    try {
      cb(await D.cms.fileToDataURL(file));
    } catch (e) {
      setMsg("Не удалось прочитать файл");
    }
  };
  var buildCases = async () => {
    var src = await (await fetch((window.RGBY_BASE + "content/cases/cases.js"), {
      cache: "no-store"
    })).text();
    var a = src.indexOf("const CASES = "),
      b = src.indexOf("\n  ];", a);
    if (a < 0 || b < 0) throw new Error("Не найден список кейсов в cases.js");
    var base = JSON.parse(JSON.stringify(window.RGBY_CASES.list)),
      files = [],
      seen = {};
    var rel = (v, id, k) => {
      if (!v) return "";
      if (/^data:/.test(v)) {
        var ext = (v.match(/^data:image\/(\w+)/) || [, "jpg"])[1].replace("jpeg", "jpg"),
          p = "cases/" + id + "-cms-" + k + "." + ext;
        files.push({
          path: "assets/images/" + p,
          blob: fetch(v).then(r => r.blob())
        });
        return p;
      }
      var m = v.match(/assets\/images\/(.+)$/);
      return m ? decodeURI(m[1]) : v;
    };
    data.cases.forEach(x => {
      seen[x.id] = 1;
      var r = base.find(y => y.id === x.id);
      if (!r) {
        r = {
          id: x.id,
          status: "published",
          year: "",
          title: "",
          client: "",
          category: "",
          directions: ["ТВ/Медиа"],
          primary: "ТВ/Медиа",
          flagship: false,
          short: "",
          description: [],
          deliverables: [],
          links: [],
          awards: [],
          media: {
            cover: "",
            format: "horizontal",
            column: 1,
            gallery: [],
            video: ""
          }
        };
        base.push(r);
      }
      Object.assign(r, {
        status: "published",
        year: x.year || "",
        title: x.title || "",
        client: x.client || "",
        category: x.category || "",
        short: x.short || "",
        description: String(x.description || "").split(/\n\s*\n/).map(s => s.trim()).filter(Boolean),
        deliverables: String(x.services || "").split(/\s*,\s*/).filter(Boolean)
      });
      if (Array.isArray(x.directions) && x.directions.length) r.directions = x.directions;
      r.media = Object.assign({}, r.media, {
        cover: x.placeholder ? r.media.cover : rel(x.cover, x.id, 0),
        gallery: (x.gallery || []).map((g, k) => rel(g, x.id, k + 1)),
        format: x.format || r.media.format,
        column: x.column != null && x.column !== "" ? +x.column : r.media.column, // 0 — левая колонка, это тоже значение
        video: x.video || ""
      });
    });
    base.forEach(r => {
      if (!seen[r.id] && r.status === "published" && r.directions.indexOf("ТВ/Медиа") >= 0 && r.primary === "ТВ/Медиа") r.status = "draft";
    });
    // Порядок кейсов — как в CMS: места кейсов ТВ/Медиа в общем списке заполняются в порядке CMS, остальные кейсы не двигаются
    var slots = [];
    base.forEach((r, i) => { if (seen[r.id]) slots.push(i); });
    var ordered = data.cases.map(x => base.find(r => r.id === x.id)).filter(Boolean);
    slots.forEach((s, k) => { base[s] = ordered[k]; });
    var text = src.slice(0, a + 14) + JSON.stringify(base, null, 2).replace(/\n/g, "\n  ") + src.slice(b + 4);
    // Команда: основатели, сотрудники, вводный текст — content/team/team.js (раньше в публикацию не попадали)
    var relT = (v, id) => {
      if (!v) return "";
      if (/^data:/.test(v)) {
        var ext = (v.match(/^data:image\/(\w+)/) || [, "jpg"])[1].replace("jpeg", "jpg"),
          p = "team/" + id + "-cms-" + Date.now().toString(36) + "." + ext;
        files.push({ path: "assets/images/" + p, blob: fetch(v).then(r => r.blob()) });
        return p;
      }
      var m = v.match(/assets\/images\/(.+)$/);
      return m ? decodeURI(m[1]) : v;
    };
    var team = {
      lead: data.lead || "",
      team: (data.team || []).map(m => ({ ...m, photo: relT(m.photo, m.id || "t") })),
      staff: (data.staff || []).map(m => ({ ...m, photo: relT(m.photo, m.id || "s") }))
    };
    var teamText = "// RGBY · команда (основатели, сотрудники, вводный текст) — публикуется из CMS «Кейсы и команда».\n// Выгружено " + new Date().toLocaleString("ru-RU") + ". Пути картинок — от assets/images/.\nwindow.RGBY_TEAM = " + JSON.stringify(team, null, 2) + ";\n";
    for (var f of files) f.blob = await f.blob;
    return [{
      path: "content/cases/cases.js",
      text
    }, {
      path: "content/team/team.js",
      text: teamText
    }].concat(files);
  };
  var exportCasesJs = async () => {
    try {
      var f = await buildCases();
      f.forEach((x, i) => setTimeout(() => {
        var a = document.createElement("a");
        a.href = URL.createObjectURL(x.blob || new Blob([x.text], {
          type: "text/javascript"
        }));
        a.download = x.path.split("/").pop();
        a.click();
      }, 300 * i));
      setMsg("cases.js → content/cases/" + (f.length > 1 ? " · картинки → assets/images/cases/" : ""));
    } catch (e) {
      setMsg(e.message);
    }
  };
  var publishGh = async ev => {
    if (ev.altKey) {
      window.rgbyGH.forget();
      setMsg("Токен GitHub забыт");
      return;
    }
    if (!window.rgbyGH) {
      setMsg("Нет модуля публикации");
      return;
    }
    try {
      setMsg("Готовлю файлы…");
      var f = await buildCases();
      var r = await window.rgbyGH.publish(f, "CMS кейсов: обновление", (i, k) => setMsg("Публикую " + i + "/" + k + "…"));
      setMsg(r.done ? "Опубликовано: " + r.done + " файл(ов). Сайт обновится через ~1 мин" : "Изменений нет — на GitHub то же самое");
    } catch (e) {
      setMsg("Не удалось: " + e.message);
    }
  };
  var exportJson = () => {
    var b = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json"
    });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(b);
    a.download = "rgby-media-content.json";
    a.click();
  };
  var importJson = e => {
    var f = e.target.files[0];
    if (!f) return;
    var r = new FileReader();
    r.onload = () => {
      try {
        var j = JSON.parse(r.result);
        if (j.cases && j.team) {
          setData(j);
          setMsg("Импортировано");
        }
      } catch (x) {
        setMsg("Неверный JSON");
      }
    };
    r.readAsText(f);
  };
  var F = (label, value, on, opt = {}) => React.createElement("label", {
    className: opt.w2 ? "w2" : ""
  }, label, opt.area ? React.createElement("textarea", {
    rows: opt.rows || 3,
    value: value || "",
    onChange: e => on(e.target.value)
  }) : React.createElement("input", {
    value: value || "",
    placeholder: opt.ph,
    onChange: e => on(e.target.value)
  }));
  var Tools = (key, i, n) => React.createElement("div", {
    className: "cms__row"
  }, React.createElement("button", {
    type: "button",
    className: "cms__btn",
    onClick: () => move(key, i, -1),
    disabled: i === 0
  }, "\u2191"), React.createElement("button", {
    type: "button",
    className: "cms__btn",
    onClick: () => move(key, i, 1),
    disabled: i === n - 1
  }, "\u2193"), React.createElement("button", {
    type: "button",
    className: "cms__btn",
    onClick: () => del(key, i)
  }, "\u0423\u0434\u0430\u043B\u0438\u0442\u044C"));
  return React.createElement("aside", {
    className: "cms" + (open ? " cms--open" : "") + (tab === "cases" ? " cms--wide" : ""),
    "data-lenis-prevent": "",
    "aria-hidden": !open
  }, React.createElement("div", {
    className: "cms__bar"
  }, React.createElement("div", {
    className: "cms__tabs"
  }, React.createElement("button", {
    type: "button",
    "aria-pressed": tab === "cases",
    onClick: () => setTab("cases")
  }, "\u041A\u0435\u0439\u0441\u044B \xB7 ", data.cases.length), React.createElement("button", {
    type: "button",
    "aria-pressed": tab === "team",
    onClick: () => setTab("team")
  }, "\u041E\u0441\u043D\u043E\u0432\u0430\u0442\u0435\u043B\u0438 \xB7 ", data.team.length), React.createElement("button", {
    type: "button",
    "aria-pressed": tab === "staff",
    onClick: () => setTab("staff")
  }, "\u0421\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0438 \xB7 ", (data.staff || []).length)), React.createElement("button", {
    type: "button",
    className: "cms__btn",
    onClick: onClose
  }, "\u0417\u0430\u043A\u0440\u044B\u0442\u044C")), React.createElement("div", {
    className: "cms__scroll"
  }, React.createElement("p", {
    className: "cms__hint"
  }, tab === "cases" ? "Мини-версия блока «Кейсы»: 3 столбца в пропорциях макета. Перетаскивайте карточки между столбцами и внутри них, бросьте картинку на карточку — обложка заменится. Клик — редактирование." : "Изменения сразу собираются на странице и сохраняются в браузере.", " \xAB\u042D\u043A\u0441\u043F\u043E\u0440\u0442 JSON\xBB \u2014 \u043F\u0435\u0440\u0435\u0434\u0430\u0442\u044C \u043A\u043E\u043D\u0442\u0435\u043D\u0442 \u0432 \u043F\u0440\u043E\u0434\u0430\u043A\u0448\u043D. \u041E\u0431\u043B\u043E\u0436\u043A\u0438 \u0441\u0436\u0438\u043C\u0430\u044E\u0442\u0441\u044F \u0434\u043E 1600px."), tab === "cases" ? React.createElement(CaseBoard, {
    cases: data.cases,
    setData: setData,
    img: img,
    F: F,
    del: i => del("cases", i)
  }) : tab === "staff" ? React.createElement(StaffEditor, {
    staff: data.staff || [],
    setData: setData,
    img: img
  }) : React.createElement(React.Fragment, null, React.createElement("label", {
    className: "cms__fields",
    style: {
      padding: 0
    }
  }, React.createElement("label", {
    className: "w2"
  }, "\u0412\u0432\u043E\u0434\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442 \u0431\u043B\u043E\u043A\u0430", React.createElement("textarea", {
    rows: 4,
    value: data.lead,
    onChange: e => setData(d => ({
      ...d,
      lead: e.target.value
    }))
  }))), React.createElement("button", {
    type: "button",
    className: "cms__btn cms__btn--blue",
    onClick: () => setData(d => ({
      ...d,
      team: [...d.team, BLANK_MEMBER()]
    }))
  }, "+ \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0447\u0435\u043B\u043E\u0432\u0435\u043A\u0430"), data.team.map((m, i) => React.createElement("details", {
    className: "cms__item",
    key: m.id
  }, React.createElement("summary", null, React.createElement("span", {
    className: "cms__thumb",
    style: {
      backgroundImage: m.photo ? "url(" + m.photo + ")" : null
    }
  }), React.createElement("span", null, m.name, React.createElement("br", null), React.createElement("span", {
    className: "cms__hint"
  }, m.role))), React.createElement("div", {
    className: "cms__fields"
  }, React.createElement("div", {
    className: "w2"
  }, React.createElement(DropImage, {
    value: m.photo,
    label: "\u041F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 \u0444\u043E\u0442\u043E \u0438\u043B\u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435",
    onFile: f => img(f, v => upd("team", i, {
      photo: v
    }))
  })), F("Имя", m.name, v => upd("team", i, {
    name: v
  })), F("Роль", m.role, v => upd("team", i, {
    role: v
  })), [["highlights", "Ключевые позиции (крупно)"], ["career", "Опыт (мелко)"]].map(([key, label]) => React.createElement("div", {
    className: "cms__career",
    key: key
  }, React.createElement("span", {
    className: "cms__hint"
  }, label), m[key].map((r, k) => React.createElement("div", {
    key: k
  }, React.createElement("input", {
    value: r.org,
    placeholder: "\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F",
    onChange: e => upd("team", i, {
      [key]: m[key].map((x, j) => j === k ? {
        ...x,
        org: e.target.value
      } : x)
    })
  }), React.createElement("input", {
    value: r.role,
    placeholder: "\u0414\u043E\u043B\u0436\u043D\u043E\u0441\u0442\u044C",
    onChange: e => upd("team", i, {
      [key]: m[key].map((x, j) => j === k ? {
        ...x,
        role: e.target.value
      } : x)
    })
  }), React.createElement("input", {
    value: r.period,
    placeholder: "2020 \u2013 \u043D.\u0432.",
    onChange: e => upd("team", i, {
      [key]: m[key].map((x, j) => j === k ? {
        ...x,
        period: e.target.value
      } : x)
    })
  }), React.createElement("button", {
    type: "button",
    className: "cms__btn",
    onClick: () => upd("team", i, {
      [key]: m[key].filter((_, j) => j !== k)
    })
  }, "\xD7"))), React.createElement("button", {
    type: "button",
    className: "cms__btn",
    style: {
      alignSelf: "flex-start"
    },
    onClick: () => upd("team", i, {
      [key]: [...m[key], {
        org: "",
        role: "",
        period: ""
      }]
    })
  }, "+ \u0441\u0442\u0440\u043E\u043A\u0430")))), Tools("team", i, data.team.length))))), React.createElement("div", {
    className: "cms__bar",
    style: {
      borderTop: "1px solid var(--ink-a10)",
      borderBottom: 0
    }
  }, React.createElement("span", {
    className: "cms__hint"
  }, msg), React.createElement("div", {
    className: "cms__tabs"
  }, React.createElement("button", {
    type: "button",
    className: "cms__btn",
    onClick: publishGh,
    title: "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C cases.js \u0438 \u043D\u043E\u0432\u044B\u0435 \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0438 \u0432 \u0440\u0435\u043F\u043E\u0437\u0438\u0442\u043E\u0440\u0438\u0439 \u0441\u0442\u0435\u043D\u0434\u0430 (Alt+\u043A\u043B\u0438\u043A \u2014 \u0437\u0430\u0431\u044B\u0442\u044C \u0442\u043E\u043A\u0435\u043D)",
    style: {
      background: "var(--rgby-blue)",
      color: "var(--rgby-paper)"
    }
  }, "\u041E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u0442\u044C \u043D\u0430 GitHub"), React.createElement("button", {
    type: "button",
    className: "cms__btn",
    onClick: exportCasesJs,
    title: "\u0421\u043A\u0430\u0447\u0430\u0442\u044C content/cases/cases.js"
  }, "cases.js"), React.createElement("button", {
    type: "button",
    className: "cms__btn",
    onClick: exportJson
  }, "\u042D\u043A\u0441\u043F\u043E\u0440\u0442 JSON"), React.createElement("label", {
    className: "cms__btn",
    style: {
      position: "relative"
    }
  }, "\u0418\u043C\u043F\u043E\u0440\u0442", React.createElement("input", {
    type: "file",
    accept: "application/json",
    onChange: importJson,
    style: {
      position: "absolute",
      inset: 0,
      opacity: 0
    }
  })), React.createElement("button", {
    type: "button",
    className: "cms__btn",
    onClick: () => confirm("Вернуть контент из макета?") && setData(D.cms.reset())
  }, "\u0421\u0431\u0440\u043E\u0441"))));
}
Object.assign(window, {
  Cms
});