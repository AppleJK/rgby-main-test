// RGBY · база новостей — общий подключаемый модуль (блок «Что происходит» на главной, в будущем — медиа-портал /news).
// Выгружено из CMS новостей 14.10.2026, 15:06:48. Положить в content/news/news.js; свои обложки — в assets/images/news/.
// Поля: id, status (published|draft), date (ГГГГ-ММ-ДД), tag, title, excerpt, cover (от assets/images/), body (абзацы через пустую строку)
(function () {
  const TAGS = [
    {
      "id": "Статья",
      "color": "44,79,255"
    },
    {
      "id": "Дайджест",
      "color": "100,34,106"
    },
    {
      "id": "Кейс",
      "color": "0,165,0"
    },
    {
      "id": "Событие",
      "color": "199,0,0"
    },
    {
      "id": "Награда",
      "color": "199,165,0"
    }
  ];
  const LAYOUTS = [{"id":"vertical","label":"Вертикальная"},{"id":"horizontal","label":"Горизонтальная"},{"id":"text","label":"Без обложки"}];
  const LIMITS = {"title":70,"excerpt":160};
  const NEWS = [
    {
      "id": "dizayn-tinder",
      "status": "published",
      "date": "2026-10-06",
      "tag": "Статья",
      "layout": "horizontal",
      "title": "Дизайнерский Тиндер",
      "excerpt": "Отношения с заказчиком начинаются задолго до договора. Первое сообщение в директ или на почту...",
      "cover": "cases/k1-2.jpg",
      "body": ""
    },
    {
      "id": "zhizn-vne-behance",
      "status": "published",
      "date": "2026-10-02",
      "tag": "Статья",
      "layout": "text",
      "title": "Жизнь вне Behance",
      "excerpt": "Жизнь вне Behance: где искать работу и вдохновение?",
      "cover": "cases/fan-2026-3.jpg",
      "body": ""
    },
    {
      "id": "digest-leto",
      "status": "published",
      "date": "2026-09-29",
      "tag": "Дайджест",
      "layout": "vertical",
      "title": "Дайджест RGBY",
      "excerpt": "Успевайте получить удовольствие от этого лета, а главные новости индустрии читайте в свежем выпуске...",
      "cover": "cases/tv3-wonderland-1.jpg",
      "body": ""
    },
    {
      "id": "k1-efir",
      "status": "published",
      "date": "2026-09-24",
      "tag": "Кейс",
      "layout": "horizontal",
      "title": "Новый эфир «К1»",
      "excerpt": "Как мы пересобрали визуальную концепцию телеканала и что получилось в эфире",
      "cover": "cases/comedy-10-1.jpg",
      "body": ""
    },
    {
      "id": "rgby-festival",
      "status": "published",
      "date": "2026-09-19",
      "tag": "Событие",
      "layout": "text",
      "title": "RGBY на фестивале (Тест Публикации)",
      "excerpt": "Рассказываем про работу с большими экранами на конференции о моушн-дизайне",
      "cover": "cases/last-hero-3.jpg",
      "body": ""
    },
    {
      "id": "shortlist-fan",
      "status": "published",
      "date": "2026-09-15",
      "tag": "Награда",
      "layout": "vertical",
      "title": "Шорт-лист премии",
      "excerpt": "Ребрендинг ЦТ FAN вошёл в шорт-лист профессиональной премии",
      "cover": "cases/soviet-classics-1.jpg",
      "body": ""
    },
    {
      "id": "svoya-cms",
      "status": "draft",
      "date": "2026-09-10",
      "tag": "Статья",
      "layout": "horizontal",
      "title": "Как мы делаем CMS",
      "excerpt": "Почему мы написали свою систему управления сайтами и как она помогает клиентам",
      "cover": "cases/cartoon-classics-2.jpg",
      "body": ""
    },
    {
      "id": "digest-osen",
      "status": "draft",
      "date": "2026-09-04",
      "tag": "Дайджест",
      "layout": "vertical",
      "title": "Дайджест RGBY · осень",
      "excerpt": "Главное в индустрии за сезон: релизы, тренды и наши любимые работы коллег",
      "cover": "cases/rw-2.jpg",
      "body": ""
    },
    {
      "id": "multimedia-vystavka",
      "status": "draft",
      "date": "2026-08-29",
      "tag": "Кейс",
      "layout": "vertical",
      "title": "Мультимедиа для выставки",
      "excerpt": "Контент для LED-экранов павильона: от идеи до монтажа на площадке",
      "cover": "cases/evocargo-1.jpg",
      "body": ""
    },
    {
      "id": "lekciya",
      "status": "draft",
      "date": "2026-08-22",
      "tag": "Событие",
      "layout": "horizontal",
      "title": "Открытая лекция",
      "excerpt": "Арт-директор студии расскажет, как строится брендинг телеканала",
      "cover": "cases/vremya-igrat-1.jpg",
      "body": ""
    },
    {
      "id": "showreel-kak",
      "status": "draft",
      "date": "2026-08-18",
      "tag": "Статья",
      "layout": "text",
      "title": "Шоурил: как собирали",
      "excerpt": "За кадром нового шоурила: отбор работ, монтаж и музыка",
      "cover": "cases/lovestory-1.jpg",
      "body": ""
    },
    {
      "id": "horror-fest-5",
      "status": "draft",
      "date": "2026-08-11",
      "tag": "Награда",
      "layout": "vertical",
      "title": "Хоррор Фест · пятый год",
      "excerpt": "Айдентика фестиваля снова отмечена жюри — рассказываем, что изменилось",
      "cover": "cases/energiya-pera-2.jpg",
      "body": ""
    }
  ];
  const KEY = "rgby-news-cms-v1";
  const release = () => !!window.__RGBY_RELEASE;
  function source() {
    if (!release()) { try { const s = JSON.parse(localStorage.getItem(KEY) || "null"); if (s && Array.isArray(s.list)) return s.list.map(n => s.covers && s.covers[n.cover] ? Object.assign({}, n, { cover: s.covers[n.cover] }) : n); } catch (e) {} }
    return NEWS;
  }
  const words = t => (String(t || "").match(/\S+/g) || []).length;
  const readMin = n => Math.max(1, Math.round((words(n.title) + words(n.excerpt) + words(n.body)) / 180));
  const fmtDate = d => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(d || ""); return m ? m[3] + "." + m[2] + "." + m[1] : d || ""; };
  function feed() {
    return source().filter(n => n.status === "published" || (!release() && n.status === "draft"))
      .slice().sort((a, b) => String(b.date).localeCompare(String(a.date)));
  }
  window.RGBY_NEWS = { version: "2026-10-14", KEY, TAGS, LAYOUTS, LIMITS, list: NEWS, source, feed, readMin, fmtDate };
})();
