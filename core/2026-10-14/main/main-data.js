// RGBY · main-data.js.txt · сборка 2026-10-14
(function () {
  var IMG = (window.RGBY_BASE + "assets/images/");
  var DIRECTIONS = [{
    id: "media",
    n: "01",
    title: "ТВ/Медиа",
    sub: "Оформление телеканалов и медиапроектов",
    text: "Эфирный и внеэфирный креатив, промо-кампании, кросс-медийные проекты, графика для художественных и документальных фильмов",
    tags: ["Айдентика", "Эфирный пакет", "Промо"],
    href: "../landing/index.html",
    img: IMG + "cases/k1-1.jpg",
    ready: true
  }, {
    id: "web",
    n: "02",
    title: "Веб",
    sub: "Сайты и цифровые продукты",
    text: "Сайты, лендинги и спецпроекты: от концепции и дизайн-системы до вёрстки и CMS",
    tags: ["Сайты", "Спецпроекты", "CMS"],
    href: "../web/index.html",
    img: IMG + "cases/rw-1.jpg",
    draft: true,
    ready: true
  }, {
    id: "production",
    n: "03",
    title: "Продакшн",
    sub: "Рекламный продакшн и корпоративное видео",
    text: "Полный цикл для рекламных агентств: от креатива и ключевого визуала до съёмок и поста",
    tags: ["Съёмки", "CG", "Пост"],
    href: "../dir/production.html",
    img: IMG + "cases/start-3.jpg"
  }, {
    id: "rnd",
    n: "04",
    title: "R&D",
    sub: "Исследования и технологии",
    text: "Эксперименты с CG, генеративными инструментами и реалтаймом — то, что завтра станет частью проектов",
    tags: ["CG", "AI", "Реалтайм"],
    href: "../dir/rnd.html",
    img: IMG + "cases/tv3-wonderland-2.jpg",
    draft: true
  }, {
    id: "branding",
    n: "05",
    title: "Брендинг",
    sub: "Диджитал и медиа-брендинг",
    text: "Айдентика для корпоративных, цифровых и медиапроектов. Аналитика и социология — вместе с партнёрами из MOMRI Institute",
    tags: ["Айдентика", "Стратегия", "Исследования"],
    href: "../dir/branding.html",
    img: IMG + "cases/rw-tech-1.jpg"
  }, {
    id: "multimedia",
    n: "06",
    title: "Мультимедиа",
    sub: "Мультимедиа для больших экранов",
    text: "CG-контент для мероприятий, выставок и музеев, мультимедиа для форумов и конференций",
    tags: ["Медиафасады", "Выставки", "Форумы"],
    href: "../dir/multimedia.html",
    img: IMG + "cases/intervision-1.jpg"
  }];
  var NB1 = t => String(t || "").replace(/(^|[\s(«„"])([а-яёА-ЯЁa-zA-Z]{1,2}|[—–])\s+/g, (m, a, w) => a + w + "\u00A0").replace(/\s+([—–])/g, "\u00A0$1");
  var NB = t => NB1(NB1(t));
  var NIMG = s => !s ? "" : /^(https?:|data:|\/)/.test(s) ? s : IMG + s;
  var NEWS = (window.RGBY_NEWS ? window.RGBY_NEWS.feed() : []).map(n => ({
    id: n.id,
    layout: n.layout || "",
    kind: n.tag,
    title: NB(n.title),
    text: NB(n.excerpt),
    body: NB(n.body),
    img: NIMG(n.cover),
    date: window.RGBY_NEWS.fmtDate(n.date),
    read: window.RGBY_NEWS.readMin(n),
    draft: n.status !== "published"
  }));
  var DIRID = {
    "ТВ/Медиа": "media",
    "Веб": "web",
    "Продакшн": "production",
    "R&D": "rnd",
    "Брендинг": "branding",
    "Мультимедиа": "multimedia"
  };
  var LC = window.RGBY_DATA && window.RGBY_DATA.CASES || [],
    RC = window.RGBY_CASES;
  var asI = v => !v ? "" : /^(https?:|data:|\.|\/)/.test(v) ? v : IMG + v;
  var withPics = RC ? RC.list.filter(c => c.media && c.media.cover && /^cases\//.test(c.media.cover)).sort((a, b) => (a.status === "published" ? 0 : 1) - (b.status === "published" ? 0 : 1)) : [];
  var PROJECTS = withPics.map(c => {
    var imgs = [c.media.cover].concat(c.media.gallery || []).map(asI);
    return {
      caseId: c.id,
      kind: c.category,
      title: c.title,
      dir: DIRID[c.primary] || "",
      text: c.short,
      tags: c.deliverables.slice(0, 3),
      img: imgs[0],
      imgs,
      full: {
        id: c.id,
        column: c.media.column,
        year: c.year,
        title: c.title,
        client: c.client,
        category: c.category,
        short: c.short,
        description: c.description.join("\n\n"),
        services: c.deliverables.join(", "),
        cover: imgs[0],
        placeholder: false,
        gallery: imgs.slice(1),
        video: c.media.video,
        format: c.media.format,
        directions: c.directions,
        flagship: c.flagship,
        links: c.links,
        awards: c.awards
      }
    };
  });
  var TILES = [];
  var _loop = function (_more, k) {
    _more = false;
    PROJECTS.forEach(p => {
      if (p.imgs[k]) {
        _more = true;
        TILES.push({
          img: p.imgs[k],
          t: p.title,
          dir: p.dir || "media",
          id: p.caseId
        });
      }
    });
    more = _more;
  };
  for (var k = 0, more = true; more; k++) {
    _loop(more, k);
  }
  var raw = {
    2026: "SHORTLIST / Silver Mercury — BEST CRAFT OF VISUAL BRAND COMMUNICATION / / SHORTLIST / White Square — Visual effects",
    2025: "1-е место / Best for life design — Дизайн-концепция года / / 1-е место / Медиакульт — Лучшая айдентика бренда / / 2-е место / Медиабренд — Лучший 3D-моушн-дизайн в промороликах и трейлерах / / Золото / TAGLINE — Кампании / креатив → Искусство, культура, развлечения и мероприятия / / Серебро / TAGLINE — Совершенное исполнение (Craft) → Международный проект / / Бронза / TAGLINE — Совершенное исполнение (Craft) → Лучший дизайн",
    2024: "2-е место / Медиабренд — Лучший дизайн логотипа / / 3-е место / Медиабренд — Лучшее оформление тематического телевизионного канала / / 3-е место / Медиабренд — Самое смешное промо",
    2023: "1-е место / Медиабренд — Лучший ребрендинг",
    2022: "1-е место / Медиабренд — Лучшее оформление любого телевизионного канала / / 1-е место / Медиабренд — Лучшее оформление кабельного телевизионного канала / / 1-е место / Медиабренд — Лучший дизайн логотипа / / 2-е место / Медиабренд — Лучший дизайн логотипа / / 2-е место / Медиабренд — Лучший брендинг / / 3-е место / Медиабренд — Лучший дизайн кабельного ТВ / / SHORTLIST / Silver Mercury — Best Craft of Brand Naming & Brand Packaging",
    2021: "SILVER / Silver Mercury — Best Strategy / Media & Entertainment / / BRONZE / Silver Mercury — Best Product Launch or Re-Launch Campaign"
  };
  var AWARDS = Object.keys(raw).sort((a, b) => b - a).map(y => ({
    year: y,
    items: raw[y].split(" / / ").map(s => {
      var i = s.indexOf(" / ");
      var place = s.slice(0, i),
        rest = s.slice(i + 3),
        j = rest.indexOf(" — ");
      return {
        place,
        org: rest.slice(0, j),
        nom: rest.slice(j + 3)
      };
    })
  }));
  var CLIENT_GROUPS = window.RGBY_CLIENTS && window.RGBY_CLIENTS.GROUPS || ["Медиа", "Продакшн", "Бренды"];
  var CLIENTS = window.RGBY_CLIENTS ? window.RGBY_CLIENTS.LIST.map(c => ({
    ...c,
    logo: null
  })) : [];
  var IMGMAP = {};
  document.querySelectorAll("#rgby-images img[data-key]").forEach(i => {
    IMGMAP[i.dataset.key] = i.getAttribute("src");
  });
  var fixImg = o => {
    if (o && typeof o.img === "string" && o.img.indexOf(IMG) === 0) {
      var _k = o.img.slice(IMG.length);
      if (IMGMAP[_k]) o.img = IMGMAP[_k];
    }
    return o;
  };
  [DIRECTIONS, NEWS, PROJECTS].forEach(a => a.forEach(fixImg));
  window.RGBY_MAIN = {
    TILES,
    DIRECTIONS,
    NEWS,
    PROJECTS,
    AWARDS,
    CLIENTS,
    CLIENT_GROUPS,
    HERO: {
      title: "Креативное агентство\nи CG-продакшн полного цикла",
      tagline: ["Эфир", "Диджитал", "Большие экраны"]
    },
    ABOUT: {
      title: "Придумываем, как бренд выглядит, звучит и движется",
      text: "Мы работаем там, где ваш бренд встречается со зрителем — в эфире и онлайне, на упаковке и медиафасаде. От первой идеи и ключевого визуала до финального рендера собираем команду под задачу и доводим до результата, который замечают"
    },
    CLIENTS_LEAD: "Телеканалы и платформы, продакшены и агентства, технологические компании и бренды",
    NEWS_LEAD: "Вот чем заняты прямо сейчас: свежие кейсы, публикации и новости",
    NEWS_PORTAL: "#",
    AWARDS_LEAD: "Хороший кейс всегда говорит сам за себя. Вот чем гордимся:"
  };
})();