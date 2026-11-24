// RGBY · project/ui_kits/landing/data.js.txt
// RGBY Media landing — default content + CMS persistence. Text copied from the Figma file.
(function () {
  const IMG = (window.RGBY_BASE ?? "../../") + "assets/images/";
  const IMGMAP = {};
  document.querySelectorAll("#rgby-images img[data-key]").forEach(i => {
    IMGMAP[i.dataset.key] = i.getAttribute("src");
  });
  const img = n => IMGMAP[n] || IMG + n;
  const fix = v => typeof v === "string" && v.indexOf(IMG) === 0 ? img(v.slice(IMG.length)) : v;
  const K1 = "Прикольное оформление телеканала К1 для Кинопоиска. Очень много деталей и особенностей в проекте, вы просто не поверите! Там реально весело, вы обязаны посмотреть";
  // Кейсы — из общего модуля content/cases/cases.js (мастер-файл standards/cases/RGBY_cases_master.docx). Пустая обложка → заглушка по кругу.
  const PH = ["case-k1-a.jpg", "case-k1-b.jpg", "case-k1-c.jpg", "hero-still.jpg"];
  const asImg = v => !v ? "" : /^(https?:|data:|\.|\/)/.test(v) ? v : img(v);
  const CASES = (window.RGBY_CASES && window.RGBY_CASES.forDirection("ТВ/Медиа") || []).map((c, i) => ({
    id: c.id,
    page: c.page,
    column: c.media.column,
    year: c.year,
    title: c.title,
    client: c.client,
    category: c.category,
    short: c.short,
    description: c.description.join("\n\n"),
    services: c.deliverables.join(", "),
    cover: asImg(c.media.cover) || img(PH[i % PH.length]),
    placeholder: !c.media.cover,
    gallery: c.media.gallery.map(asImg),
    video: c.media.video,
    format: c.media.format,
    directions: c.directions,
    flagship: c.flagship,
    links: c.links,
    awards: c.awards
  }));
  const C = (org, role, period) => ({
    org,
    role,
    period
  });
  const CAREER_PAVEL = [C("АО «Цифровое телевидение»", "Бренд-директор", "2018 – 2020"), C("АО «Цифровое телевидение»", "Директор по маркетингу", "2016 – 2018"), C("Телеканал «Россия»", "Зам. главного продюсера", "2012 – 2016"), C("Телеканал «Москва 24»", "Арт-директор", "2011 – 2012"), C("Телеканал «Россия 24»", "Креативный директор", "2006 – 2011")];
  const CAREER_ILDAR = [C("Единая Медиа Группа", "Моушн-дизайнер", "2018 – 2020"), C("VR-студия «Spherica»", "Моушн-дизайнер", "2016 – 2018"), C("VIZART", "Моушн-дизайнер", "2014 – 2016"), C("Красный квадрат", "Броадкаст-дизайнер", "2011 – 2013"), C("Трёхмер", "CG-дженералист", "2008 – 2011")];
  const CAREER_OLD = "Бренд-директор";
  const TEAM = [{
    id: "t1",
    name: "Павел Борейко",
    role: "Со-основатель, генеральный директор",
    photo: img("team-pavel.jpg"),
    highlights: [{
      org: "RGBY",
      role: "Со-основатель, генеральный директор",
      period: "2020 – н.в."
    }, {
      org: "БВШД",
      role: "Куратор курса «Моушн-дизайн»",
      period: "2011 – н.в."
    }],
    career: CAREER_PAVEL.map(c => ({
      ...c
    }))
  }, {
    id: "t2",
    name: "Ильдар Еникеев",
    role: "Со-основатель, продакшн-директор",
    photo: img("team-ildar.jpg"),
    highlights: [{
      org: "RGBY",
      role: "Со-основатель, продакшн-директор",
      period: "2020 – н.в."
    }, {
      org: "БВШД",
      role: "Преподаватель курса «Моушн-дизайн»",
      period: "2023 – н.в."
    }],
    career: CAREER_ILDAR.map(c => ({
      ...c
    }))
  }];
  const TEAM_LEAD = "Команда RGBY объединяет дизайн, съёмку, 3D, звук и композитинг. Подбираем специалистов под задачу и ведём проект от идеи до мастер-файлов.";
  // details[] are DRAFT copy (not in Figma) — replace with real scope of work.
  const SERVICES = [{
    title: "Ребрендинг канала и спешлы",
    description: "Обновляем айдентику и весь эфирный пакет действующего канала. Или делаем тематическое оформление под дату, юбилей, сезон",
    price: "от 1,5 млн ₽",
    details: ["Аудит текущего эфирного пакета", "Новая айдентика и эфирный пакет", "Тематические спешлы под дату или сезон"]
  }, {
    title: "Оформление программы и промо",
    description: "Графика для программы, сценарные ролики, рекламная кампания, потоковый монтаж трейлеров",
    price: "от 950 тыс ₽",
    details: ["Графика программы", "Сценарные ролики и рекламная кампания", "Потоковый монтаж трейлеров"]
  }, {
    title: "ID-заставки",
    description: "Лицо канала в эфире. Графические, съёмочные или гибридные",
    price: "от 250 тыс ₽",
    unit: "/ ID",
    details: ["Графические ID", "Съёмочные ID", "Гибридные ID"]
  }, {
    title: "Запуск шоу",
    description: "Оформление проекта целиком — от названия и логотипа до графики каждого выпуска и промокампании",
    price: "от 2 млн ₽",
    details: ["Название и логотип", "Графика каждого выпуска", "Промокампания"]
  }, {
    title: "Запуск нового канала",
    description: "Готовим телеканал к запуску: разрабатываем айдентику, собираем эфирный пакет и делаем промо к первому эфиру",
    price: "от 3,5 млн ₽",
    details: ["Айдентика канала", "Полный эфирный пакет", "Промо к запуску"]
  }];
  const WHY = [{
    t: "01. Эфирный стандарт",
    d: "Отдаём не картинки, а рабочие файлы: .aep с корректными пресетами, .mov с альфой, тайминги под пульт. Графика встаёт в эфир без доработок с вашей стороны"
  }, {
    t: "02. Одна команда",
    d: "Дизайн, 3D, съёмка, звук и композитинг внутри. Ничего не теряется на стыке агентства и подрядчика"
  }, {
    t: "03. Понимаем регуляторику",
    d: "ВО, курение, иноагенты, лицензии, маркировка — знаем, что и как должно быть оформлено, и закладываем это в пакет с самого начала"
  }, {
    t: "04. Проверено индустрией",
    d: "Золото «Медиабренда», «Медиакульта», TAGLINE, Best for life. Silver Mercury. Работы, которые видят миллионы"
  }];
  const STATS = [{
    v: "20+",
    l: "лет в эфире"
  }, {
    v: "40+",
    l: "каналов и проектов"
  }, {
    v: "18",
    l: "наград профильных премий"
  }];
  // items[] beyond Dprofile are DRAFT (Figma only draws the Dprofile breakdown).
  // Только общее число наград по каждой премии — без разбивки по номинациям
  const awardGroups = new Map();
  for (const {
    year,
    items
  } of window.RGBY_AWARDS || []) {
    for (const {
      org,
      place,
      nom
    } of items) {
      if (!awardGroups.has(org)) awardGroups.set(org, []);
      awardGroups.get(org).push({
        count: 1, year,
        label: place + " · " + nom
      });
    }
  }
  const AWARDS = Array.from(awardGroups, ([name, items]) => ({
    name,
    summary: items.length + " " + (items.length === 1 ? "позиция" : items.length < 5 ? "позиции" : "позиций"),
    items
  }));
  const CLIENTS = ["rgby", "sprite", "ten", "rgby", "ring", "sprite", "ten", "rgby", "ring"];
  const NOTICE = {
    short: "С 1 марта 2026 действует закон о защите русского языка.\nЛоготип-товарный знак менять не обязательно. \nА вот всё, что вокруг него в эфире, — уже да",
    long: "С 1 марта 2026 действует ФЗ № 168-ФЗ от 24.06.20. \nИностранные слова в публичном пространстве допускаются \nтолько при полном дублировании на русском — одинаковым \nцветом, шрифтом, размером и в том же месте. Транслитерация \nне считается: нужен смысловой эквивалент."
  };

  // DRAFT staff — names/roles are placeholders until real data arrives via CMS.
  const DEPTS = ["Дизайн", "3D и CG", "Моушн", "Продакшн", "Менеджмент"];
  // Из команды пока показываем только основателей (ждём корпоративную фотосессию). Черновой список сотрудников — STAFF_DRAFT, в релиз не идёт.
  const STAFF = [];
  const STAFF_DRAFT = [["Анна Соколова", "Арт-директор", "Дизайн"], ["Михаил Орлов", "Старший дизайнер", "Дизайн"], ["Екатерина Белова", "Дизайнер", "Дизайн"], ["Илья Захаров", "Дизайнер шрифтов", "Дизайн"], ["Дмитрий Волков", "Руководитель 3D", "3D и CG"], ["Олег Смирнов", "3D-художник", "3D и CG"], ["Мария Ковалёва", "Композер", "3D и CG"], ["Артём Лебедев", "Ведущий моушн-дизайнер", "Моушн"], ["Ксения Морозова", "Моушн-дизайнер", "Моушн"], ["Никита Фёдоров", "Аниматор", "Моушн"], ["Полина Егорова", "Моушн-дизайнер", "Моушн"], ["Сергей Попов", "Режиссёр", "Продакшн"], ["Алексей Новиков", "Оператор-постановщик", "Продакшн"], ["Виктория Павлова", "Саунд-дизайнер", "Продакшн"], ["Юлия Кузнецова", "Продюсер", "Менеджмент"], ["Татьяна Васильева", "Аккаунт-менеджер", "Менеджмент"]].map((s, i) => ({
    id: "s" + (i + 1),
    name: s[0],
    role: s[1],
    dept: s[2],
    photo: ""
  }));
  const KEY = "rgby-media-cms-v2-cases"; // v2: кейсы из общего модуля — старые черновики из localStorage не перекрывают базу
  function load() {
    const PROD = !!window.__RGBY_PROD,
      ADMIN = PROD && /[?&]admin(=|&|$)/.test(location.search);
    // Сохранения старого формата (кейсы без directions) — кейсы заменяются базой модуля, команда/прочее остаются
    const legacy = s => !s || !Array.isArray(s.cases) || !s.cases.some(c => Array.isArray(c.directions));
    const fresh = () => CASES.map(c => ({
      ...c,
      gallery: [...c.gallery]
    }));
    const pub = window.RGBY_CONTENT && window.RGBY_CONTENT.cases ? JSON.parse(JSON.stringify(window.RGBY_CONTENT)) : null;
    if (pub && legacy(pub) && CASES.length) pub.cases = fresh();
    try {
      if (!localStorage.getItem(KEY)) {
        const old = JSON.parse(localStorage.getItem("rgby-media-cms-v1") || "null");
        if (old && old.team) {
          if (legacy(old)) old.cases = fresh();
          localStorage.setItem(KEY, JSON.stringify(old));
        }
      }
    } catch (e) {}
    if (PROD && !ADMIN) return pub ? {
      lead: TEAM_LEAD,
      staff: STAFF.map(x => ({
        ...x
      })),
      ...pub
    } : {
      cases: CASES.map(c => ({
        ...c,
        gallery: [...c.gallery]
      })),
      team: JSON.parse(JSON.stringify(TEAM)),
      lead: TEAM_LEAD,
      staff: STAFF.map(x => ({
        ...x
      }))
    };
    try {
      const s = JSON.parse(localStorage.getItem(KEY) || "null");
      if (s && s.cases && s.team) {
        s.staff = (s.staff || []).filter(x => !STAFF_DRAFT.some(y => y.name === x.name));
        s.team.forEach(m => {
          const real = m.id === "t1" ? CAREER_PAVEL : m.id === "t2" ? CAREER_ILDAR : null;
          if (real && (!m.career || m.career.every(c => c.role === CAREER_OLD))) m.career = real.map(c => ({
            ...c
          }));
        });
        s.cases.forEach((c, i) => {
          if (c.column == null) c.column = [1, 0, 2][i % 3];
          c.cover = fix(c.cover);
          c.gallery = (c.gallery || []).map(fix);
          const b = CASES.find(x => x.id === c.id);
          if (b && /\/cases\//.test(b.cover) && !/\/cases\/|^data:/.test(c.cover || "")) {
            c.cover = b.cover;
            c.placeholder = false;
            c.gallery = [...b.gallery];
          }
          if (b && /\/cases\//.test(b.cover) && /\/cases\//.test(c.cover || "")) {
            c.cover = b.cover;
            c.gallery = [...b.gallery];
            c.format = b.format;
            c.column = b.column;
          }
        });
        s.team.forEach(m => {
          m.photo = fix(m.photo);
        });
        return {
          lead: TEAM_LEAD,
          ...s
        };
      }
    } catch (e) {}
    if (pub) return {
      lead: TEAM_LEAD,
      staff: STAFF.map(x => ({
        ...x
      })),
      ...pub
    };
    return {
      cases: CASES.map(c => ({
        ...c,
        gallery: [...c.gallery]
      })),
      team: JSON.parse(JSON.stringify(TEAM)),
      lead: TEAM_LEAD,
      staff: STAFF.map(x => ({
        ...x
      }))
    };
  }
  function save(state) {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
      return true;
    } catch (e) {
      return false;
    }
  }
  function reset() {
    localStorage.removeItem(KEY);
    return load();
  }
  // Downscale an uploaded image to a JPEG data URL so it fits in localStorage.
  function fileToDataURL(file, max = 1600, q = .82) {
    return new Promise((res, rej) => {
      if (/^video\//.test(file.type)) {
        const r = new FileReader();
        r.onload = () => res(r.result);
        r.onerror = rej;
        r.readAsDataURL(file);
        return;
      }
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        const s = Math.min(1, max / Math.max(img.width, img.height));
        const c = document.createElement("canvas");
        c.width = Math.round(img.width * s);
        c.height = Math.round(img.height * s);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        res(c.toDataURL("image/jpeg", q));
      };
      img.onerror = rej;
      img.src = url;
    });
  }
  const staffDraft = () => STAFF_DRAFT.map((r, i) => Array.isArray(r) ? {
    id: "sd" + i,
    name: r[0],
    role: r[1],
    dept: r[2],
    photo: ""
  } : {
    ...r
  });
  window.RGBY_DATA = {
    img,
    DEPTS,
    STAFF,
    staffDraft,
    CASES,
    TEAM,
    TEAM_LEAD,
    SERVICES,
    WHY,
    STATS,
    AWARDS,
    CLIENTS,
    NOTICE,
    IMG,
    cms: {
      load,
      save,
      reset,
      fileToDataURL,
      KEY
    }
  };
})();
