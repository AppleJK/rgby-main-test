// RGBY · логотипы клиентов — общий модуль для всех страниц. Файлы: assets/clients/logos/<file> (белые PNG без полей; на сайте перекрашиваются фильтром).
// ratio — ширина/высота логотипа: по нему тайл подбирает размер, чтобы широкие и компактные знаки выглядели одинаково весомо.
(function () {
  const GROUPS = ["Медиа","Платформы","Продакшн","Агентства","Бренды"];
  const LIST = [
    {
      "id": "kommersant",
      "name": "Коммерсантъ",
      "group": "Медиа",
      "file": "kommersant.png",
      "ratio": 7.293
    },
    {
      "id": "media-ct",
      "name": "Цифровое телевидение",
      "group": "Медиа",
      "file": "media-ct.png",
      "ratio": 3.946
    },
    {
      "id": "media-ctc",
      "name": "СТС",
      "group": "Медиа",
      "file": "media-ctc.png",
      "ratio": 2.625
    },
    {
      "id": "media-mosfilm",
      "name": "Мосфильм",
      "group": "Медиа",
      "file": "media-mosfilm.png",
      "ratio": 1.698
    },
    {
      "id": "media-otr",
      "name": "ОТР",
      "group": "Медиа",
      "file": "media-otr.png",
      "ratio": 2.258
    },
    {
      "id": "media-senseof",
      "name": "Сенсоф Медиа",
      "group": "Медиа",
      "file": "media-senseof.png",
      "ratio": 3.04
    },
    {
      "id": "media-tricolor",
      "name": "Триколор",
      "group": "Медиа",
      "file": "media-tricolor.png",
      "ratio": 3.629
    },
    {
      "id": "media-tv3",
      "name": "ТВ-3",
      "group": "Медиа",
      "file": "media-tv3.png",
      "ratio": 1.157
    },
    {
      "id": "plat-kion",
      "name": "KION",
      "group": "Платформы",
      "file": "plat-kion.png",
      "ratio": 4.25
    },
    {
      "id": "plat-kp",
      "name": "Кинопоиск",
      "group": "Платформы",
      "file": "plat-kp.png",
      "ratio": 6.818
    },
    {
      "id": "plat-rutube",
      "name": "RUTUBE",
      "group": "Платформы",
      "file": "plat-rutube.png",
      "ratio": 5.78
    },
    {
      "id": "plat-start",
      "name": "START",
      "group": "Платформы",
      "file": "plat-start.png",
      "ratio": 2.011
    },
    {
      "id": "prod-amed",
      "name": "AMedia",
      "group": "Продакшн",
      "file": "prod-amed.png",
      "ratio": 2.949
    },
    {
      "id": "prod-genp",
      "name": "Генеральные продюсеры",
      "group": "Продакшн",
      "file": "prod-genp.png",
      "ratio": 3.301
    },
    {
      "id": "prod-weit",
      "name": "Weit",
      "group": "Продакшн",
      "file": "prod-weit.png",
      "ratio": 0.883
    },
    {
      "id": "agency-embacy",
      "name": "Embacy",
      "group": "Агентства",
      "file": "agency-embacy.png",
      "ratio": 3.75
    },
    {
      "id": "agency-raduga",
      "name": "Raduga Design",
      "group": "Агентства",
      "file": "agency-raduga.png",
      "ratio": 6.786
    },
    {
      "id": "agency-raketamedia",
      "name": "Ракета Медиа",
      "group": "Агентства",
      "file": "agency-raketamedia.png",
      "ratio": 2.75
    },
    {
      "id": "agency-rw",
      "name": "RW",
      "group": "Агентства",
      "file": "agency-rw.png",
      "ratio": 2.309
    },
    {
      "id": "agency-silasveta",
      "name": "Сила Света",
      "group": "Агентства",
      "file": "agency-silasveta.png",
      "ratio": 9.656
    },
    {
      "id": "agency-touchpoint",
      "name": "Touchpoint",
      "group": "Агентства",
      "file": "agency-touchpoint.png",
      "ratio": 5.409
    },
    {
      "id": "comp-aquarius",
      "name": "Aquarius",
      "group": "Бренды",
      "file": "comp-aquarius.png",
      "ratio": 6.811
    },
    {
      "id": "comp-evocargo",
      "name": "Evocargo",
      "group": "Бренды",
      "file": "comp-evocargo.png",
      "ratio": 8.718
    },
    {
      "id": "comp-glen",
      "name": "Glen",
      "group": "Бренды",
      "file": "comp-glen.png",
      "ratio": 4.479
    },
    {
      "id": "comp-groupib",
      "name": "Group-IB",
      "group": "Бренды",
      "file": "comp-groupib.png",
      "ratio": 4.967
    },
    {
      "id": "comp-livi",
      "name": "Livi",
      "group": "Бренды",
      "file": "comp-livi.png",
      "ratio": 2.453
    },
    {
      "id": "comp-roskino",
      "name": "Роскино",
      "group": "Бренды",
      "file": "comp-roskino.png",
      "ratio": 4.754
    },
    {
      "id": "sharelogo",
      "name": "Share",
      "group": "Бренды",
      "file": "sharelogo.png",
      "ratio": 3.532
    }
  ];
  // путь к файлу; в собранном (одним файлом) сайте картинки лежат в #rgby-images как data:
  const src = file => { const el = document.querySelector('#rgby-images img[data-key="clients/' + file + '"]'); return el ? el.getAttribute("src") : "../../assets/clients/logos/" + file; };
  // размер знака в тайле: одинаковая «площадь» для любых пропорций, с ограничением по ширине и высоте
  const box = r => { const A = 0.11; return { w: Math.min(0.78, Math.sqrt(A * r)) * 100, h: Math.min(0.5, Math.sqrt(A / r)) * 100 }; };
  window.RGBY_CLIENTS = { GROUPS, LIST, src, box };
})();
