// RGBY · project/ui_kits/main/main-data.js.txt
// RGBY — главная (разводящая). Тексты — из экспорта Tilda (release/refs/rgby-main-texts.txt).
// Пометка draft: true — текст написан для прототипа, в экспорте его нет.
(function () {
  const IMG = (window.RGBY_BASE ?? "../../") + "assets/images/";
  const DIRECTIONS = [{
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
    img: IMG + "cases/energiya-pera-5.jpg"
  }];
  // Новости — из общей базы (content/news/news.js), правятся в CMS новостей
  const NB1 = t => String(t || "").replace(/(^|[\s(«„"])([а-яёА-ЯЁa-zA-Z]{1,2}|[—–])\s+/g, (m, a, w) => a + w + "\u00A0").replace(/\s+([—–])/g, "\u00A0$1");
  const NB = t => NB1(NB1(t));
  const NIMG = s => !s ? "" : /^(https?:|data:|\/)/.test(s) ? s : IMG + s;
  // Лента из Telegram — сотни постов: в блоке только свежие NEWS_MAX (остальные — в канале); ссылка на пост — в окне новости (релиз .13)
  const NEWS_MAX = 15;
  // альбом поста Telegram: все картинки по порядку; если обложку заменили в CMS — она первой
  const nGal = n => {
    const g = (n.gallery || []).map(x => ({
      img: NIMG(x.src),
      ratio: x.ratio || 0,
      video: !!x.video
    }));
    if (g.length && n.cover && n.gallery[0].src !== n.cover) g.unshift({
      img: NIMG(n.cover),
      ratio: 0,
      video: false
    });
    return g.length > 1 ? g : [];
  };
  const NEWS = (window.RGBY_NEWS ? window.RGBY_NEWS.feed() : []).slice(0, NEWS_MAX).map(n => ({
    id: n.id,
    layout: n.layout || "",
    kind: n.tag,
    title: NB(n.title),
    text: NB(n.excerpt),
    body: NB(n.body),
    img: NIMG(n.cover),
    date: window.RGBY_NEWS.fmtDate(n.date),
    read: window.RGBY_NEWS.readMin(n),
    draft: n.status !== "published",
    link: n.link || "",
    video: !!n.video,
    ratio: n.ratio || 0,
    gallery: nGal(n),
    html: n.html || "",
    head: NB(n.titleFull && n.titleFull.indexOf(String(n.title).replace(/…$/, "")) === 0 ? n.titleFull : n.title)
  }));
  // Проекты — из общей базы кейсов (content/cases/cases.js, список PAGES.main). Обложки и тексты — те же, что в окне кейса на ТВ/Медиа.
  const DIRID = {
    "ТВ/Медиа": "media",
    "Веб": "web",
    "Продакшн": "production",
    "R&D": "rnd",
    "Брендинг": "branding",
    "Мультимедиа": "multimedia"
  };
  const LC = window.RGBY_DATA && window.RGBY_DATA.CASES || [],
    RC = window.RGBY_CASES;
  // «Наши проекты» и обложка: все кейсы базы, у которых есть картинки (сначала опубликованные, затем черновики без текстов). imgs — все кадры кейса, чередуются в отображении.
  const asI = v => !v ? "" : /^(https?:|data:|\.|\/)/.test(v) ? v : IMG + v;
  const withPics = RC ? RC.list.filter(c => c.media && c.media.cover && /^cases\//.test(c.media.cover)).sort((a, b) => (a.status === "published" ? 0 : 1) - (b.status === "published" ? 0 : 1)) : [];
  const PROJECTS = withPics.map(c => {
    const imgs = [c.media.cover].concat(c.media.gallery || []).map(asI);
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
  // Плитки с разными кейсами рядом: по кругу берём k-й кадр каждого кейса (сначала все обложки, затем вторые кадры и т.д.)
  const TILES = [];
  for (let k = 0, more = true; more; k++) {
    more = false;
    PROJECTS.forEach(p => {
      if (p.imgs[k]) {
        more = true;
        TILES.push({
          img: p.imgs[k],
          t: p.title,
          dir: p.dir || "media",
          id: p.caseId
        });
      }
    });
  }
  const AWARDS = window.RGBY_AWARDS || [];
  const CLIENT_GROUPS = window.RGBY_CLIENTS && window.RGBY_CLIENTS.GROUPS || ["Медиа", "Продакшн", "Бренды"];
  // Логотипы — заглушки из ассетов дизайн-системы; реальные логотипы клиентов нужно получить
  const CLIENTS = window.RGBY_CLIENTS ? window.RGBY_CLIENTS.LIST.map(c => ({
    ...c,
    logo: null
  })) : [];
  // в собранном файле картинки лежат внутри #rgby-images (data:), путь ../../assets/images/ там не существует
  const IMGMAP = {};
  document.querySelectorAll("#rgby-images img[data-key]").forEach(i => {
    IMGMAP[i.dataset.key] = i.getAttribute("src");
  });
  const fixImg = o => {
    if (o && typeof o.img === "string" && o.img.indexOf(IMG) === 0) {
      const k = o.img.slice(IMG.length);
      if (IMGMAP[k]) o.img = IMGMAP[k];
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
    NEWS_PORTAL: "https://t.me/rgby_feed",
    // портала новостей пока нет — «Все новости» ведут в Telegram-канал (релиз .13); вернуть адрес портала, когда появится
    AWARDS_LEAD: "Хороший кейс всегда говорит сам за себя. Вот чем гордимся:"
  };
})();
