// RGBY · база кейсов — единый подключаемый модуль для всех страниц сайта.
// Источник правды: standards/cases/RGBY_cases_master.docx (заполняется по шаблону RGBY_case_template.docx, регламент — standards/cases/README.md).
// Страница направления берёт только кейсы, у которых в directions есть её направление; полная страница кейса живёт в разделе primary.
// media.cover / gallery — пути от assets/images/ (кейсы: cases/<id>-N.jpg; в релизе папка отдаётся как /media/cases/) или полный URL. status "draft" — есть картинки, ждут текстов, на сайт не выводятся. Пустая обложка → на сайте показывается заглушка.
(function () {
  const DIRECTIONS = ["ТВ/Медиа", "Веб", "Продакшн", "R&D", "Брендинг", "Мультимедиа"];
  const CATEGORIES = { "ТВ/Медиа": ["Ребрендинг канала", "Эфирный пакет", "ID-заставки", "Оформление программы", "Промо", "Запуск шоу", "Запуск нового канала"] };
  const LIMITS = { title: 40, short: 150, description: 1500 };
  const CASES = [
    {
      "id": "k1",
      "status": "published",
      "year": "2025–2026",
      "title": "К1: логотип, который светится",
      "client": "Кинопоиск",
      "category": "Ребрендинг канала",
      "directions": [
        "ТВ/Медиа",
        "Брендинг"
      ],
      "primary": "ТВ/Медиа",
      "flagship": true,
      "short": "Сделали айдентику К1 к запуску канала, а через год обновили эфир к годовщине вещания. Логотип стал источником света.",
      "description": [
        "К1 — телеканал Кинопоиска. Его айдентику мы сделали к запуску в 2025 году, а в 2026-м, к годовщине вещания, обновили эфирное оформление. Задача обновления: показать, насколько разный у К1 контент, и сохранить узнаваемость, интонацию и характер, к которым привыкли зрители.",
        "Центром системы остался логотип. Мы работали с ним как с объектом, который светится изнутри: направленный луч даёт знаку плотность, рассеянное свечение делает его лёгким и воздушным. На этапе концепций проверили два пути: массу и объём знака или его силуэт и световую ауру. В итоге свет стал основой всего оформления. На нём построены ID-ролики, а в анонсах и титрах переливающийся градиент перешёл в плашки под текстом. Работали вместе с креативной командой Кинопоиска."
      ],
      "deliverables": [
        "Айдентика к запуску канала",
        "обновление эфира: концепция",
        "ID-ролики",
        "анонсы и титры",
        "3D и VFX (Blender",
        "Houdini",
        "Cinema 4D)",
        "композитинг"
      ],
      "links": [
        {
          "label": "Behance",
          "url": "https://www.behance.net/gallery/248333741/obnovlennoe-oformlenie-telekanala-k1-(kinopoisk)"
        }
      ],
      "awards": [],
      "media": {
        "cover": "cases/k1-1.jpg",
        "format": "vertical",
        "column": 1,
        "gallery": [
          "cases/k1-2.jpg",
          "cases/k1-3.jpg",
          "cases/k1-4.jpg"
        ],
        "video": ""
      }
    },
    {
      "id": "tv3-wonderland",
      "status": "published",
      "year": "2025",
      "title": "ТВ-3: Страна Чудес",
      "client": "ТВ-3",
      "category": "ID-заставки",
      "directions": [
        "ТВ/Медиа",
        "Продакшн",
        "R&D"
      ],
      "primary": "ТВ/Медиа",
      "flagship": true,
      "short": "Сняли и собрали 15-секундные ID для ТВ-3 по мотивам «Алисы в Стране чудес»: живые актёры в мире из CGI-островов.",
      "description": [
        "Для ТВ-3 мы сделали серию съёмочно-графических ID по мотивам «Алисы в Стране чудес»: реальные люди попадают в фантазийный мир канала. Каждый ролик — отдельная сцена, а вместе они складываются в один сюжет. Сквозной образ — парящие острова в форме треугольника из логотипа ТВ-3. У каждого острова свой смысл: механический хроно-мир — время, шахматный конус — стратегия, зелёный лабиринт — развитие. Острова смоделированы в 3D с мелкими деталями, материалы сделаны на процедурных шейдерах, с фотограмметрией и текстурированием в Blender. Затем мы вписали их в живую съёмку с точным совпадением движения камеры и света, а на композитинге добавили атмосферу, объёмные облака и единую цветокоррекцию.",
        "Для зимней версии референсы атмосферы и света готовили в KLING O1. Зимний гардероб персонажей сделали нейросетевым переодеванием во FLUX.2 без ручной перерисовки, а для анимации собрали свой пайплайн в ComfyUI на базе Wan 2.2 Animate. ID для ТВ-3 мы делаем второй год подряд."
      ],
      "deliverables": [
        "Раскадровка",
        "аниматик",
        "съёмка",
        "3D",
        "композитинг",
        "цветокоррекция",
        "монтаж",
        "нейросетевая генерация для зимней версии"
      ],
      "links": [
        {
          "label": "Behance",
          "url": "https://www.behance.net/gallery/243091335/oformlenie-ID-rolikov-dlja-tv-3"
        }
      ],
      "awards": [],
      "media": {
        "cover": "cases/tv3-wonderland-1.jpg",
        "format": "horizontal",
        "column": 0,
        "gallery": [
          "cases/tv3-wonderland-2.jpg",
          "cases/tv3-wonderland-3.jpg",
          "cases/tv3-wonderland-4.jpg"
        ],
        "video": ""
      }
    },
    {
      "id": "fan-2026",
      "status": "published",
      "year": "2026",
      "title": "FAN: меню из жанров (Тест Выгрузки)",
      "client": "Телеканал FAN",
      "category": "Ребрендинг канала",
      "directions": [
        "ТВ/Медиа",
        "Брендинг",
        "Веб"
      ],
      "primary": "ТВ/Медиа",
      "flagship": true,
      "short": "Второй этап работы с FAN: собрали из идеи «на вкус» бренд-систему. Каждый жанр узнаётся сразу — в эфире, на сайте и в соцсетях.",
      "description": [
        "Идея «Попробуй новый FAN», с которой мы обновили канал в 2024 году, прижилась, и канал вернулся к нам за следующим шагом: превратить промокампанию в устойчивую систему бренда, которая одинаково работает в эфире, на сайте и в соцсетях.",
        "Мы собрали «меню», в котором каждый жанр работает на узнаваемость. Зритель сразу понимает, что сейчас в эфире — аниме, фэнтези или дорама, и путь по каналу превращается в знакомство с персонажами и вкусами. Новый слоган «FAN на вкус» продолжает первую кампанию, поэтому зрителю не приходится знакомиться с каналом заново. Позиционирование канала теперь звучит так: «телеканал для тех, кто любит фэнтези и фантастику — от яркой анимации до атмосферных историй»."
      ],
      "deliverables": [
        "Айдентика и позиционирование",
        "эфирный пакет",
        "горизонтальные форматы для анонсов",
        "сайта и соцсетей",
        "дизайн сайта"
      ],
      "links": [
        {
          "label": "Behance",
          "url": "https://www.behance.net/gallery/242705817/rebrending-tv-kanala-FAN"
        }
      ],
      "awards": [],
      "media": {
        "cover": "cases/fan-2026-4.jpg",
        "format": "horizontal",
        "column": 1,
        "gallery": [
          "cases/fan-2026-1.jpg",
          "cases/fan-2026-2.jpg",
          "cases/fan-2026-3.jpg",
          "cases/fan-2026-5.jpg",
          "cases/fan-2026-6.jpg",
          "cases/fan-2026-7.jpg"
        ],
        "video": ""
      }
    },
    {
      "id": "fan-2024",
      "status": "published",
      "year": "2024",
      "title": "FAN: больше, чем аниме",
      "client": "Телеканал FAN",
      "category": "Ребрендинг канала",
      "directions": [
        "ТВ/Медиа",
        "Брендинг"
      ],
      "primary": "ТВ/Медиа",
      "flagship": false,
      "short": "Канал FAN вырос из аниме: в сетке появились фэнтези, экшн и дорамы. Сделали новый образ канала и промокампанию «Попробуй новый FAN».",
      "description": [
        "FAN начинался как канал аниме. Со временем в сетке появились фантастика, фэнтези, экшн, приключения, дунхуа и дорамы. Зрителям нужно было показать, что канал стал шире, и не оттолкнуть тех, кто пришёл за аниме.",
        "Мы предложили попробовать новый канал на вкус. Жанры подаются как блюда азиатской кухни: роллы, лапша, пельмени, а из тарелок выглядывают дракон и сундук с сокровищами. Логотип стал объёмным, палитра — яркой: фиолетовый, розовый, синий. Слоган «Попробуй новый FAN» объединил эфир, промо и диджитал в одну кампанию. В 2026 году мы продолжили работу с каналом и сделали ребрендинг."
      ],
      "deliverables": [
        "Новый визуальный образ",
        "эфирная графика и анонсы",
        "промо-ролики",
        "материалы для диджитала"
      ],
      "links": [
        {
          "label": "Behance",
          "url": "https://www.behance.net/gallery/204512565/FAN"
        }
      ],
      "awards": [],
      "media": {
        "cover": "cases/fan-2024-1.jpg",
        "format": "vertical",
        "column": 0,
        "gallery": [
          "cases/fan-2024-2.jpg",
          "cases/fan-2024-3.jpg",
          "cases/fan-2024-4.jpg",
          "cases/fan-2024-5.jpg",
          "cases/fan-2024-6.jpg",
          "cases/fan-2024-7.jpg",
          "cases/fan-2024-8.jpg"
        ],
        "video": ""
      }
    },
    {
      "id": "comedy-10",
      "status": "published",
      "year": "2025",
      "title": "«Комедия»: юбилей с квоккой",
      "client": "Телеканал «Комедия»",
      "category": "Промо",
      "directions": [
        "ТВ/Медиа",
        "Брендинг"
      ],
      "primary": "ТВ/Медиа",
      "flagship": false,
      "short": "К 10-летию канала «Комедия» сделали серию праздничных ID и оформление эфира. Поздравляет зрителей наш бренд-персонаж — квокка.",
      "description": [
        "«Комедия» показывает юмористические программы, сериалы и комедийные фильмы. К десятилетию канала нужен был праздничный эфир: заметный для зрителя и при этом внутри действующего фирменного стиля.",
        "Главным героем юбилея стала квокка. Этого бренд-персонажа мы придумали для канала раньше, с него началась наша работа с «Комедией». Мы превратили ID в серию анимированных поздравительных открыток: квокка радуется празднику, вокруг летят подарки и серпантин, в кадре крупная цифра 10. Цвета взяли из палитры канала (жёлтый, фиолетовый, зелёный), поэтому юбилейная графика встала в сетку без швов. Звук, музыку и дикторскую озвучку делали в той же команде, что и графику."
      ],
      "deliverables": [
        "Юбилейные ID-заставки",
        "анонсы и пэкшоты",
        "2D-анимация персонажа",
        "иллюстрации",
        "копирайт",
        "озвучка",
        "музыка и саунд-дизайн"
      ],
      "links": [
        {
          "label": "Behance",
          "url": "https://www.behance.net/gallery/244901223/tematicheskoe-oformlenie-tv-kanala-komedija-10-let"
        },
        {
          "label": "Behance — персонаж",
          "url": "https://www.behance.net/gallery/167615527/kvokka-brend-personazh-telekanala-komedija"
        }
      ],
      "awards": [],
      "media": {
        "cover": "cases/comedy-10-1.jpg",
        "format": "horizontal",
        "column": 1,
        "gallery": [
          "cases/comedy-10-2.jpg",
          "cases/comedy-10-3.jpg",
          "cases/comedy-10-4.jpg"
        ],
        "video": ""
      }
    },
    {
      "id": "soyuzny",
      "status": "published",
      "year": "2025",
      "title": "«Союзный»: стиль с нуля",
      "client": "Телеканал «Союзный»",
      "category": "Запуск нового канала",
      "directions": [
        "ТВ/Медиа",
        "Брендинг"
      ],
      "primary": "ТВ/Медиа",
      "flagship": false,
      "short": "Создали фирменный стиль телеканала «Союзный»: логотип, брендбук и весь эфирный пакет — от титров и погоды до технических заглушек.",
      "description": [
        "«Союзный» прошёл ребрендинг и представил себя зрителю как новый канал. Мы разработали его фирменный стиль целиком: от логотипа до анимации технических заглушек.",
        "Знак построен на визуальной рифме буквы «С» и кругового спектра. Спектр — метафора полного охвата. Второй фирменный приём — скобки. Они символизируют объединение, и в скобки можно взять часть фразы или всю фразу целиком. Скобки собраны из колец правильных окружностей, отсечённых по высоте кегля названия. Логотип адаптивный: скобки окрашиваются в акцентный цвет под задачу, например в прямом эфире становятся красными."
      ],
      "deliverables": [
        "Логотип",
        "брендбук и гайдлайны",
        "анимированный пакет титров (тема дня",
        "подписи спикеров",
        "цитаты СМИ",
        "погода",
        "часы)",
        "промо",
        "заставки и перебивки",
        "технические заглушки",
        "мерч"
      ],
      "links": [
        {
          "label": "Behance",
          "url": "https://www.behance.net/gallery/251775479/oformlenie-telekanala-soznyj"
        }
      ],
      "awards": [],
      "media": {
        "cover": "cases/soyuzny-1.jpg",
        "format": "horizontal",
        "column": 2,
        "gallery": [],
        "video": ""
      }
    },
    {
      "id": "soviet-classics",
      "status": "published",
      "year": "2024",
      "title": "Киноклассика: золотой фонд",
      "client": "Триколор",
      "category": "Запуск нового канала",
      "directions": [
        "ТВ/Медиа",
        "Брендинг"
      ],
      "primary": "ТВ/Медиа",
      "flagship": false,
      "short": "Разработали айдентику канала «Советская киноклассика» для Триколора: рукописный логотип, золото на глубоком синем, анонсы и заставки.",
      "description": [
        "«Советская киноклассика» — канал о фильмах, которые стали целой эпохой: шедевры прославленных советских киностудий и эксклюзивная коллекция Киностудии имени Горького и «Ленфильма». К запуску канала на Триколоре нужна была айдентика с нуля.",
        "Логотип — леттеринг: рукописное «Советская» над строгой надписью «КИНОКЛАССИКА», в овальной рамке, похожей на экран старого телевизора. Палитра — тёплое золото и персиковый на глубоком ночном синем. В анонсах чёрно-белые кадры из фильмов стоят рядом с золотой графикой. До итогового оформления проработали несколько концепций."
      ],
      "deliverables": [
        "Концепции",
        "логотип и его версии",
        "шрифты и цвета",
        "анонсы",
        "заставки",
        "эфирный пакет"
      ],
      "links": [
        {
          "label": "Behance",
          "url": "https://www.behance.net/gallery/240968547/graficheskoe-oformlenie-tk-sovetskaja-kinoklassika"
        }
      ],
      "awards": [],
      "media": {
        "cover": "cases/soviet-classics-1.jpg",
        "format": "vertical",
        "column": 2,
        "gallery": [
          "cases/soviet-classics-2.jpg"
        ],
        "video": ""
      }
    },
    {
      "id": "horror-fest",
      "status": "published",
      "year": "с 2021",
      "title": "«Хоррор Фест»: фестиваль страха",
      "client": "ЦТ, телеканал НСТ",
      "category": "Запуск шоу",
      "directions": [
        "ТВ/Медиа",
        "Брендинг",
        "Продакшн"
      ],
      "primary": "ТВ/Медиа",
      "flagship": false,
      "short": "С 2021 года оформляем «Хоррор Фест» — фестиваль фильмов ужасов от телеканала НСТ, который стартовал сразу в пяти городах России.",
      "description": [
        "«Хоррор Фест» — первый в России международный кинофестиваль фильмов ужасов и триллеров. Он проходит под эгидой НСТ («Настоящее страшное телевидение»), главного канала о хорроре, триллерах и мистике на рынке платного ТВ. Первый фестиваль прошёл одновременно в Москве, Санкт-Петербурге, Казани, Екатеринбурге и Новосибирске.",
        "Фирменный стиль построен на леттеринге логотипа и тёмной, почти монохромной графике с красным акцентом. Лица скрыты в тени, пустые коридоры и лес держат напряжение. Страх строится на атмосфере, поэтому один и тот же стиль работает и в эфире, и в промо. Мы оформляем фестиваль с 2021 года, а в 2026-м делаем для НСТ ещё и графику к 20-летию канала."
      ],
      "deliverables": [
        "Логотип и леттеринг",
        "графический дизайн",
        "3D",
        "моушн-дизайн для эфира и промо",
        "сценарий и копирайт"
      ],
      "links": [
        {
          "label": "Behance",
          "url": "https://www.behance.net/gallery/135095861/festival-filmov-uzhasov-horror-fest"
        }
      ],
      "awards": [],
      "media": {
        "cover": "cases/horror-fest-1.jpg",
        "format": "horizontal",
        "column": 0,
        "gallery": [
          "cases/horror-fest-2.jpg",
          "cases/horror-fest-3.jpg",
          "cases/horror-fest-4.jpg",
          "cases/horror-fest-5.jpg"
        ],
        "video": ""
      }
    },
    {
      "id": "last-hero",
      "status": "published",
      "year": "2023–2024",
      "title": "«Последний герой»: сезоны ТВ-3",
      "client": "ТВ-3",
      "category": "Оформление программы",
      "directions": [
        "ТВ/Медиа",
        "Продакшн"
      ],
      "primary": "ТВ/Медиа",
      "flagship": false,
      "short": "Оформили сезоны «Последнего героя» на ТВ-3: объёмные логотипы, заставки, титры и анонсы премьер. У каждого сезона свой мир.",
      "description": [
        "«Последний герой» — реалити-шоу, у каждого сезона которого свой подзаголовок и своя тема. ТВ-3 было нужно оформление, которое сохраняет узнаваемость шоу и даёт каждому сезону собственное лицо.",
        "Для «Русского сезона» логотип стал резной деревянной вывеской с народным орнаментом, в промо — кокошник, лес и схватка медведей. Для сезона «Остаться семьёй» выбрали джунгли, огонь, камень и дерево. Логотип встроен в предметы острова (вывеску, сундук, камень) и появляется прямо в кадре. Во всех сезонах основа одна: объёмный логотип из натуральных материалов. Меняются детали и атмосфера."
      ],
      "deliverables": [
        "Логотипы сезонов в 3D",
        "заставки",
        "эфирная графика",
        "титры",
        "анонсы премьер",
        "key visual"
      ],
      "links": [
        {
          "label": "Behance",
          "url": "https://www.behance.net/gallery/211530133/poslednij-geroj"
        }
      ],
      "awards": [],
      "media": {
        "cover": "cases/last-hero-2.jpg",
        "format": "horizontal",
        "column": 2,
        "gallery": [
          "cases/last-hero-1.jpg",
          "cases/last-hero-3.jpg",
          "cases/last-hero-4.jpg",
          "cases/last-hero-5.jpg"
        ],
        "video": ""
      }
    },
    {
      "id": "plan-b",
      "status": "published",
      "year": "2022",
      "title": "PLAN_B: канал без правил",
      "client": "PLAN_B (группа каналов «Сенсоф Медиа»)",
      "category": "Запуск нового канала",
      "directions": [
        "ТВ/Медиа",
        "Брендинг"
      ],
      "primary": "ТВ/Медиа",
      "flagship": false,
      "short": "Логотип и дизайн-упаковка нового кабельного киноканала PLAN_B. Проект получил три награды «Медиабренда» в 2022 году.",
      "description": [
        "«Сделать то, чего ещё не было» — так звучало главное требование заказчика. PLAN_B показывает эксклюзивы и премьеры, а ещё просто хорошие и просто плохие фильмы. Посмотрев контент, который прислала редакция, мы решили, что логотип и оформление канала должны быть такими же сумасшедшими, динамичными и непредсказуемыми.",
        "Динамика и непредсказуемость стали основой визуального языка. Дизайн-система работает во множестве вариантов, поэтому даже самый странный фильм выглядит в эфире органично. В 2022 году проект получил три награды «Медиабренда»: «Лучший дизайн логотипа», «Лучшее оформление любого телевизионного канала» и «Лучшее оформление кабельного телевизионного канала»."
      ],
      "deliverables": [
        "Логотип",
        "дизайн-упаковка канала",
        "дизайн-система"
      ],
      "links": [
        {
          "label": "Behance",
          "url": "https://www.behance.net/gallery/135618809/Plan_B-TV-branding-oformlenie-telekanala"
        }
      ],
      "awards": [
        {
          "year": "2022",
          "prize": "Медиабренд",
          "nomination": "Лучшее оформление любого телевизионного канала"
        },
        {
          "year": "2022",
          "prize": "Медиабренд",
          "nomination": "Лучшее оформление кабельного телевизионного канала"
        },
        {
          "year": "2022",
          "prize": "Медиабренд",
          "nomination": "Лучший дизайн логотипа"
        }
      ],
      "media": {
        "cover": "cases/plan-b-1.jpg",
        "format": "horizontal",
        "column": 1,
        "gallery": [
          "cases/plan-b-2.jpg",
          "cases/plan-b-3.jpg",
          "cases/plan-b-4.jpg",
          "cases/plan-b-5.jpg"
        ],
        "video": ""
      }
    },
    {
      "id": "beat",
      "status": "draft",
      "year": "",
      "title": "Beat",
      "client": "",
      "category": "",
      "directions": [
        "ТВ/Медиа"
      ],
      "primary": "ТВ/Медиа",
      "flagship": false,
      "short": "",
      "description": [],
      "deliverables": [],
      "links": [],
      "awards": [],
      "media": {
        "cover": "cases/beat-1.jpg",
        "format": "horizontal",
        "column": 1,
        "gallery": [
          "cases/beat-2.jpg",
          "cases/beat-3.jpg",
          "cases/beat-4.jpg"
        ],
        "video": ""
      },
      "primaryCheck": true
    },
    {
      "id": "cartoon-classics",
      "status": "draft",
      "year": "",
      "title": "Cartoon Classics",
      "client": "",
      "category": "",
      "directions": [
        "ТВ/Медиа"
      ],
      "primary": "ТВ/Медиа",
      "flagship": false,
      "short": "",
      "description": [],
      "deliverables": [],
      "links": [],
      "awards": [],
      "media": {
        "cover": "cases/cartoon-classics-1.jpg",
        "format": "horizontal",
        "column": 1,
        "gallery": [
          "cases/cartoon-classics-2.jpg",
          "cases/cartoon-classics-3.jpg",
          "cases/cartoon-classics-4.jpg",
          "cases/cartoon-classics-5.jpg"
        ],
        "video": ""
      },
      "primaryCheck": true
    },
    {
      "id": "evocargo",
      "status": "draft",
      "year": "",
      "title": "Evocargo",
      "client": "",
      "category": "",
      "directions": [
        "Брендинг"
      ],
      "primary": "Брендинг",
      "flagship": false,
      "short": "",
      "description": [],
      "deliverables": [],
      "links": [],
      "awards": [],
      "media": {
        "cover": "cases/evocargo-1.jpg",
        "format": "horizontal",
        "column": 1,
        "gallery": [
          "cases/evocargo-2.jpg",
          "cases/evocargo-3.jpg"
        ],
        "video": ""
      },
      "primaryCheck": true
    },
    {
      "id": "ftv",
      "status": "draft",
      "year": "",
      "title": "FTV",
      "client": "",
      "category": "",
      "directions": [
        "ТВ/Медиа"
      ],
      "primary": "ТВ/Медиа",
      "flagship": false,
      "short": "",
      "description": [],
      "deliverables": [],
      "links": [],
      "awards": [],
      "media": {
        "cover": "cases/ftv-1.jpg",
        "format": "horizontal",
        "column": 1,
        "gallery": [
          "cases/ftv-2.jpg"
        ],
        "video": ""
      },
      "primaryCheck": true
    },
    {
      "id": "intervision",
      "status": "draft",
      "year": "",
      "title": "Интервидение",
      "client": "",
      "category": "",
      "directions": [
        "Мультимедиа"
      ],
      "primary": "Мультимедиа",
      "flagship": false,
      "short": "",
      "description": [],
      "deliverables": [],
      "links": [],
      "awards": [],
      "media": {
        "cover": "cases/intervision-1.jpg",
        "format": "horizontal",
        "column": 1,
        "gallery": [],
        "video": ""
      },
      "primaryCheck": true
    },
    {
      "id": "pobeda",
      "status": "draft",
      "year": "",
      "title": "Победа",
      "client": "",
      "category": "",
      "directions": [
        "ТВ/Медиа"
      ],
      "primary": "ТВ/Медиа",
      "flagship": false,
      "short": "",
      "description": [],
      "deliverables": [],
      "links": [],
      "awards": [],
      "media": {
        "cover": "cases/pobeda-1.jpg",
        "format": "horizontal",
        "column": 1,
        "gallery": [
          "cases/pobeda-2.jpg"
        ],
        "video": ""
      },
      "primaryCheck": true
    },
    {
      "id": "rw",
      "status": "draft",
      "year": "",
      "title": "RW+",
      "client": "",
      "category": "",
      "directions": [
        "Веб"
      ],
      "primary": "Веб",
      "flagship": false,
      "short": "",
      "description": [],
      "deliverables": [],
      "links": [],
      "awards": [],
      "media": {
        "cover": "cases/rw-1.jpg",
        "format": "horizontal",
        "column": 1,
        "gallery": [
          "cases/rw-2.jpg",
          "cases/rw-3.jpg",
          "cases/rw-4.jpg",
          "cases/rw-5.jpg"
        ],
        "video": ""
      },
      "primaryCheck": true
    },
    {
      "id": "rw-tech",
      "status": "draft",
      "year": "",
      "title": "RW Tech",
      "client": "",
      "category": "",
      "directions": [
        "Брендинг"
      ],
      "primary": "Брендинг",
      "flagship": false,
      "short": "",
      "description": [],
      "deliverables": [],
      "links": [],
      "awards": [],
      "media": {
        "cover": "cases/rw-tech-1.jpg",
        "format": "horizontal",
        "column": 1,
        "gallery": [
          "cases/rw-tech-2.jpg",
          "cases/rw-tech-3.jpg"
        ],
        "video": ""
      },
      "primaryCheck": true
    },
    {
      "id": "regional-to-global",
      "status": "draft",
      "year": "",
      "title": "Regional to Global",
      "client": "",
      "category": "",
      "directions": [
        "Брендинг"
      ],
      "primary": "Брендинг",
      "flagship": false,
      "short": "",
      "description": [],
      "deliverables": [],
      "links": [],
      "awards": [],
      "media": {
        "cover": "cases/regional-to-global-1.jpg",
        "format": "horizontal",
        "column": 1,
        "gallery": [
          "cases/regional-to-global-2.jpg",
          "cases/regional-to-global-3.jpg"
        ],
        "video": ""
      },
      "primaryCheck": true
    },
    {
      "id": "start",
      "status": "draft",
      "year": "",
      "title": "START",
      "client": "",
      "category": "",
      "directions": [
        "Продакшн"
      ],
      "primary": "Продакшн",
      "flagship": false,
      "short": "",
      "description": [],
      "deliverables": [],
      "links": [],
      "awards": [],
      "media": {
        "cover": "cases/start-1.jpg",
        "format": "horizontal",
        "column": 1,
        "gallery": [
          "cases/start-2.jpg",
          "cases/start-3.jpg"
        ],
        "video": ""
      },
      "primaryCheck": true
    },
    {
      "id": "touchpoint",
      "status": "draft",
      "year": "",
      "title": "Touchpoint",
      "client": "",
      "category": "",
      "directions": [
        "Мультимедиа"
      ],
      "primary": "Мультимедиа",
      "flagship": false,
      "short": "",
      "description": [],
      "deliverables": [],
      "links": [],
      "awards": [],
      "media": {
        "cover": "cases/touchpoint-1.jpg",
        "format": "horizontal",
        "column": 1,
        "gallery": [],
        "video": ""
      },
      "primaryCheck": true
    },
    {
      "id": "vremya-igrat",
      "status": "draft",
      "year": "",
      "title": "Время играть",
      "client": "",
      "category": "",
      "directions": [
        "Продакшн"
      ],
      "primary": "Продакшн",
      "flagship": false,
      "short": "",
      "description": [],
      "deliverables": [],
      "links": [],
      "awards": [],
      "media": {
        "cover": "cases/vremya-igrat-1.jpg",
        "format": "horizontal",
        "column": 1,
        "gallery": [
          "cases/vremya-igrat-2.jpg"
        ],
        "video": ""
      },
      "primaryCheck": true
    },
    {
      "id": "zhivaya-planeta",
      "status": "draft",
      "year": "",
      "title": "Живая планета",
      "client": "",
      "category": "",
      "directions": [
        "ТВ/Медиа"
      ],
      "primary": "ТВ/Медиа",
      "flagship": false,
      "short": "",
      "description": [],
      "deliverables": [],
      "links": [],
      "awards": [],
      "media": {
        "cover": "cases/zhivaya-planeta-1.jpg",
        "format": "horizontal",
        "column": 1,
        "gallery": [],
        "video": ""
      },
      "primaryCheck": true
    },
    {
      "id": "lovestory",
      "status": "draft",
      "year": "",
      "title": "Лавстори",
      "client": "",
      "category": "",
      "directions": [
        "ТВ/Медиа"
      ],
      "primary": "ТВ/Медиа",
      "flagship": false,
      "short": "",
      "description": [],
      "deliverables": [],
      "links": [],
      "awards": [],
      "media": {
        "cover": "cases/lovestory-1.jpg",
        "format": "horizontal",
        "column": 1,
        "gallery": [
          "cases/lovestory-2.jpg",
          "cases/lovestory-3.jpg"
        ],
        "video": ""
      },
      "primaryCheck": true
    },
    {
      "id": "russkiy-detektiv",
      "status": "draft",
      "year": "",
      "title": "Русский детектив",
      "client": "",
      "category": "",
      "directions": [
        "Мультимедиа"
      ],
      "primary": "Мультимедиа",
      "flagship": false,
      "short": "",
      "description": [],
      "deliverables": [],
      "links": [],
      "awards": [],
      "media": {
        "cover": "cases/russkiy-detektiv-1.jpg",
        "format": "horizontal",
        "column": 1,
        "gallery": [
          "cases/russkiy-detektiv-2.jpg",
          "cases/russkiy-detektiv-3.jpg",
          "cases/russkiy-detektiv-4.jpg"
        ],
        "video": ""
      },
      "primaryCheck": true
    },
    {
      "id": "roskhim",
      "status": "draft",
      "year": "",
      "title": "Росхим",
      "client": "",
      "category": "",
      "directions": [
        "Брендинг"
      ],
      "primary": "Брендинг",
      "flagship": false,
      "short": "",
      "description": [],
      "deliverables": [],
      "links": [],
      "awards": [],
      "media": {
        "cover": "cases/roskhim-1.jpg",
        "format": "horizontal",
        "column": 1,
        "gallery": [
          "cases/roskhim-2.jpg"
        ],
        "video": ""
      },
      "primaryCheck": true
    },
    {
      "id": "stroynadzor",
      "status": "draft",
      "year": "",
      "title": "Стройнадзор",
      "client": "",
      "category": "",
      "directions": [
        "Брендинг"
      ],
      "primary": "Брендинг",
      "flagship": false,
      "short": "",
      "description": [],
      "deliverables": [],
      "links": [],
      "awards": [],
      "media": {
        "cover": "cases/stroynadzor-1.jpg",
        "format": "horizontal",
        "column": 1,
        "gallery": [
          "cases/stroynadzor-2.jpg",
          "cases/stroynadzor-3.jpg"
        ],
        "video": ""
      },
      "primaryCheck": true
    },
    {
      "id": "energiya-pera",
      "status": "draft",
      "year": "",
      "title": "Энергия пера",
      "client": "",
      "category": "",
      "directions": [
        "Продакшн"
      ],
      "primary": "Продакшн",
      "flagship": false,
      "short": "",
      "description": [],
      "deliverables": [],
      "links": [],
      "awards": [],
      "media": {
        "cover": "cases/energiya-pera-1.jpg",
        "format": "horizontal",
        "column": 1,
        "gallery": [
          "cases/energiya-pera-2.jpg",
          "cases/energiya-pera-3.jpg",
          "cases/energiya-pera-4.jpg"
        ],
        "video": ""
      },
      "primaryCheck": true
    }
  ];
  const forDirection = d => CASES.filter(c => c.status === "published" && c.directions.indexOf(d) >= 0);
  // Какие кейсы показывает каждая страница: список id в нужном порядке. Нет записи — страница направления берёт все свои кейсы (forDirection).
  const PAGES = { main: ["k1", "tv3-wonderland", "fan-2026", "horror-fest", "comedy-10", "plan-b"] };
  const forPage = (page, dir) => PAGES[page] ? PAGES[page].map(id => CASES.find(c => c.id === id && c.status === "published")).filter(Boolean) : dir ? forDirection(dir) : [];
  window.RGBY_CASES = { version: "2026-10-14", DIRECTIONS, CATEGORIES, LIMITS, list: CASES, forDirection, PAGES, forPage, inWork: [{ title: "ТВ-3 — ID 2026 («моторы»)", status: "Оформляется в кейс" }, { title: "«Цифровое телевидение»", status: "Материалов пока нет" }] };
})();
