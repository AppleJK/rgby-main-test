// RGBY · staff.jsx.txt · сборка 2026-10-14
function initials(n) {
  return String(n || "").split(/\s+/).map(w => w[0] || "").join("").slice(0, 2).toUpperCase();
}
function StaffCard({
  m,
  i
}) {
  return React.createElement("div", {
    className: "sf-card rv",
    style: {
      "--d": i % 4 * 70 + "ms"
    }
  }, React.createElement("div", {
    className: "sf-card__ph"
  }, m.photo ? React.createElement("img", {
    src: m.photo,
    alt: m.name,
    loading: "lazy"
  }) : React.createElement("span", null, initials(m.name))), React.createElement("span", {
    className: "sf-card__n"
  }, m.name), React.createElement("span", {
    className: "sf-card__r"
  }, m.role));
}
function staffGroups(staff) {
  var order = [...(window.RGBY_DATA.DEPTS || [])];
  staff.forEach(m => {
    if (m.dept && !order.includes(m.dept)) order.push(m.dept);
  });
  return order.map(dept => ({
    dept,
    people: staff.filter(m => m.dept === dept)
  })).filter(g => g.people.length);
}
function Staff({
  staff,
  view = "grid"
}) {
  var groups = staffGroups(staff);
  var [tab, setTab] = React.useState(0);
  var [k, setK] = React.useState(0);
  var cur = groups[Math.min(tab, groups.length - 1)];
  return React.createElement("div", {
    className: "sf sf--" + view
  }, React.createElement("div", {
    className: "sf__head rv"
  }, React.createElement("span", {
    className: "sf__title"
  }, "\u0421\u0442\u0443\u0434\u0438\u044F"), React.createElement("span", {
    className: "sf__count"
  }, staff.length, " \u0447\u0435\u043B\u043E\u0432\u0435\u043A \xB7 ", groups.length, " \u043E\u0442\u0434\u0435\u043B\u043E\u0432")), view === "grid" ? groups.map((g, gi) => React.createElement("div", {
    className: "sf__dept",
    key: g.dept
  }, React.createElement("div", {
    className: "sf__dl rv"
  }, React.createElement("span", {
    className: "sf__dn"
  }, String(gi + 1).padStart(2, "0")), React.createElement("span", {
    className: "sf__dt"
  }, g.dept), React.createElement("span", {
    className: "sf__dc"
  }, g.people.length)), React.createElement("div", {
    className: "sf__cards"
  }, g.people.map((m, i) => React.createElement(StaffCard, {
    key: m.id,
    m: m,
    i: i
  }))))) : view === "tabs" ? React.createElement(React.Fragment, null, React.createElement("div", {
    className: "sf__tabs rv",
    role: "tablist"
  }, groups.map((g, gi) => React.createElement("button", {
    key: g.dept,
    type: "button",
    role: "tab",
    "aria-selected": gi === tab,
    className: "sf__tab" + (gi === tab ? " is-on" : ""),
    onClick: () => {
      setTab(gi);
      setK(x => x + 1);
    }
  }, g.dept, React.createElement("sup", null, g.people.length)))), cur ? React.createElement("div", {
    className: "sf__cards sf__cards--tabs",
    key: k
  }, cur.people.map((m, i) => React.createElement("div", {
    key: m.id,
    className: "sf-swap",
    style: {
      "--d": i * 60 + "ms"
    }
  }, React.createElement(StaffCard, {
    m: m,
    i: i
  })))) : null) : React.createElement("div", {
    className: "sf__credits"
  }, groups.map(g => React.createElement("div", {
    className: "sf__cg rv",
    key: g.dept
  }, React.createElement("span", {
    className: "sf__cgt"
  }, g.dept), React.createElement("div", {
    className: "sf__cgl"
  }, g.people.map(m => React.createElement("div", {
    className: "sf__cr",
    key: m.id
  }, React.createElement("span", {
    className: "sf__crr"
  }, m.role), React.createElement("i", null), React.createElement("span", {
    className: "sf__crn"
  }, m.name))))))));
}
function StaffEditor({
  staff,
  setData,
  img
}) {
  var depts = staffGroups(staff).map(g => g.dept);
  var all = [...new Set([...(window.RGBY_DATA.DEPTS || []), ...depts])];
  var upd = (id, p) => setData(d => ({
    ...d,
    staff: (d.staff || []).map(x => x.id === id ? {
      ...x,
      ...p
    } : x)
  }));
  var add = dept => setData(d => ({
    ...d,
    staff: [...(d.staff || []), {
      id: "s" + Date.now(),
      name: "Имя Фамилия",
      role: "Должность",
      dept,
      photo: ""
    }]
  }));
  var del = id => confirm("Удалить сотрудника?") && setData(d => ({
    ...d,
    staff: d.staff.filter(x => x.id !== id)
  }));
  var [nd, setNd] = React.useState("");
  return React.createElement(React.Fragment, null, all.map(dept => {
    var list = staff.filter(m => m.dept === dept);
    return React.createElement("div", {
      className: "cms__item",
      key: dept
    }, React.createElement("div", {
      className: "cms__bar",
      style: {
        padding: 10
      }
    }, React.createElement("b", {
      style: {
        font: "700 14px/1.1 var(--font-sans)",
        letterSpacing: "-.03em"
      }
    }, dept, " \xB7 ", list.length), React.createElement("button", {
      type: "button",
      className: "cms__btn",
      onClick: () => add(dept)
    }, "+ \u0421\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A")), React.createElement("div", {
      className: "sfe"
    }, list.map(m => React.createElement("div", {
      className: "sfe__row",
      key: m.id
    }, React.createElement("label", {
      className: "sfe__ph",
      style: {
        backgroundImage: m.photo ? "url(" + m.photo + ")" : null
      },
      title: "\u0424\u043E\u0442\u043E"
    }, m.photo ? "" : initials(m.name), React.createElement("input", {
      type: "file",
      accept: "image/*",
      onChange: e => e.target.files[0] && img(e.target.files[0], v => upd(m.id, {
        photo: v
      }))
    })), React.createElement("input", {
      value: m.name,
      placeholder: "\u0418\u043C\u044F \u0424\u0430\u043C\u0438\u043B\u0438\u044F",
      onChange: e => upd(m.id, {
        name: e.target.value
      })
    }), React.createElement("input", {
      value: m.role,
      placeholder: "\u0414\u043E\u043B\u0436\u043D\u043E\u0441\u0442\u044C",
      onChange: e => upd(m.id, {
        role: e.target.value
      })
    }), React.createElement("select", {
      value: m.dept,
      onChange: e => upd(m.id, {
        dept: e.target.value
      })
    }, all.map(x => React.createElement("option", {
      key: x,
      value: x
    }, x))), React.createElement("button", {
      type: "button",
      className: "cms__btn",
      onClick: () => del(m.id)
    }, "\xD7")))));
  }), React.createElement("div", {
    className: "cms__row",
    style: {
      padding: 0
    }
  }, React.createElement("input", {
    className: "sfe__new",
    value: nd,
    placeholder: "\u041D\u043E\u0432\u044B\u0439 \u043E\u0442\u0434\u0435\u043B",
    onChange: e => setNd(e.target.value)
  }), React.createElement("button", {
    type: "button",
    className: "cms__btn cms__btn--blue",
    disabled: !nd.trim(),
    onClick: () => {
      add(nd.trim());
      setNd("");
    }
  }, "+ \u041E\u0442\u0434\u0435\u043B")));
}
Object.assign(window, {
  Staff,
  StaffEditor
});