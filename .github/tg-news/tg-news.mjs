// RGBY · новости из Telegram-канала → карточки новостей сайта.
// Читает публичную веб-версию канала (https://t.me/s/<канал>, без ключей и бота), всю историю постранично,
// пишет content/news/telegram.js (window.RGBY_NEWS_TG) и обложки assets/images/news/tg/<номер>.jpg.
// Ручные новости (content/news/news.js, CMS) не трогает. Правки карточек из Telegram делаются в CMS:
// запись с тем же id ("tg-<номер>") в news.js перекрывает автоматическую — робот её не меняет.
//
// Запуск:  node tg-news.mjs --site <корень сайта> [--channel rgby_feed] [--dry]
//   --dry — только прочитать канал и показать, что получится, ничего не записывая.
// Видео: веб-версия канала отдаёт только превью 320 px (самого ролика в ней нет) — обложка видео-поста = это превью (поле video: true).
// Чёткую обложку можно поставить в CMS; полный кадр из ролика — только через Telegram-бота с правами в канале (не подключён).
// Где работает: на стенде — GitHub Actions (.github/workflows/tg-news.yml, раз в 30 мин), на сервере — systemd-таймер.
// Безопасность: если канал прочитать не удалось целиком (ошибка сети, пустой ответ) — ничего не записывает.
import fs from "node:fs";
import path from "node:path";

const arg = (k, d) => { const i = process.argv.indexOf("--" + k); return i < 0 ? d : (process.argv[i + 1] && !process.argv[i + 1].startsWith("--") ? process.argv[i + 1] : true); };
const SITE = path.resolve(String(arg("site", ".")));
const CH = String(arg("channel", "rgby_feed"));
const DRY = !!arg("dry", false);
// Сколько последних постов держать на сайте (пользователь, 11.11): в блоке 15, ещё 5 — запас, если часть скрыть в CMS. Старее — только в канале.
const KEEP = Math.max(1, +arg("keep", 20) || 20);
const OUT_JS = path.join(SITE, "content/news/telegram.js");
const IMG_DIR = path.join(SITE, "assets/images/news/tg");
const UA = "Mozilla/5.0 (compatible; rgby-site-news/1.0)";

// Хештег → тип карточки (TAGS в news.js). Без подходящего хештега — DEFAULT_TAG.
const TAG_MAP = {
  "статья": "Статья", "статьи": "Статья", "колонка": "Статья", "мнение": "Статья", "лонгрид": "Статья", "советы": "Статья", "разбор": "Статья",
  "дайджест": "Дайджест", "новости": "Дайджест", "подборка": "Дайджест",
  "кейс": "Кейс", "кейсы": "Кейс", "проект": "Кейс", "проекты": "Кейс", "работа": "Кейс", "портфолио": "Кейс",
  "событие": "Событие", "события": "Событие", "мероприятие": "Событие", "мероприятия": "Событие", "конференция": "Событие", "лекция": "Событие", "фестиваль": "Событие", "анонс": "Событие", "новость": "Событие", "команда": "Событие", "деньрождения": "Событие",
  "награда": "Награда", "награды": "Награда", "премия": "Награда", "победа": "Награда", "шортлист": "Награда"
};
// В канале (11.11.2026) хештегов нет — без хештега тип угадывается по словам поста (первые 400 знаков), иначе — по длине текста
const WORD_RULES = [
  ["Дайджест", /дайджест|новости,? которые вы могли пропустить/i],
  ["Награда", /шорт-?лист|номинац|премия|премии|наград|золото|серебро|бронз|победил|победа в|лауреат|гран-?при/i],
  ["Событие", /ждём вас|ждем вас|встреча|встречаемся|лекци|выступа|конференц|фестивал|форум|регистрац|в гости|мастер-?класс|митап|приглашаем|день рождения/i],
  ["Кейс", /оформля|оформили|айдентик|ребрендинг|запустили|сделали для|наш проект|новый проект|работа для|для телеканала|эфирн/i]
];
const DEFAULT_TAG = "Событие";
const LIM = { title: 70, excerpt: 160 };

const sleep = ms => new Promise(r => setTimeout(r, ms));
async function get(url, bin = false) {
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(url, { headers: { "user-agent": UA, "accept-language": "ru" }, redirect: "follow" });
      if (!r.ok) throw new Error("HTTP " + r.status);
      return bin ? Buffer.from(await r.arrayBuffer()) : await r.text();
    } catch (e) { if (i === 2) throw new Error(url + ": " + e.message); await sleep(1500 * (i + 1)); }
  }
}

// ---------- разбор HTML веб-версии канала ----------
const ENT = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", laquo: "«", raquo: "»", mdash: "—", ndash: "–", hellip: "…" };
const decode = s => s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => e[0] === "#" ? String.fromCodePoint(e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : +e.slice(1)) : (ENT[e.toLowerCase()] ?? m));
const toText = html => decode(html.replace(/<br\s*\/?>/gi, "\n").replace(/<\/(p|div)>/gi, "\n").replace(/<img[^>]*alt="([^"]*)"[^>]*>/gi, "$1").replace(/<[^>]+>/g, "")).replace(/ /g, " ");
const bgUrl = s => { const m = /background-image:\s*url\(['"]?([^'")]+)/i.exec(s || ""); return m ? decode(m[1]) : ""; };

function parsePage(html) {
  const out = [];
  const parts = html.split('<div class="tgme_widget_message_wrap').slice(1);
  for (const p of parts) {
    const idm = /data-post="([^"\/]+)\/(\d+)"/.exec(p); if (!idm) continue;
    const id = +idm[2];
    const service = /class="tgme_widget_message[^"]*service_message/.test(p);
    const tm = /<time[^>]*datetime="([^"]+)"/.exec(p);
    // текст: блок сообщения (без цитаты ответа и без превью ссылки)
    let text = "";
    // внутри текста вложенных div нет — берём до первого закрывающего (дальше идут реакции со счётчиками, их не захватывать)
    const tx = /<div class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/.exec(p);
    if (tx) text = toText(tx[1]).trim();
    const raw = tx ? tx[1] : "";
    const photos = [...p.matchAll(/class="tgme_widget_message_photo_wrap[^"]*"[^>]*style="([^"]*)"/g)].map(m => bgUrl(m[1])).filter(Boolean);
    const vthumb = [...p.matchAll(/class="tgme_widget_message_(?:video|roundvideo)_thumb[^"]*"[^>]*style="([^"]*)"/g)].map(m => bgUrl(m[1])).filter(Boolean);
    const video = /tgme_widget_message_video_player|tgme_widget_message_roundvideo/.test(p);
    // все картинки поста по порядку (альбом — несколько фото и видео): фото — сама картинка, видео — его превью
    const items = [...p.matchAll(/class="tgme_widget_message_(photo_wrap|video_thumb|roundvideo_thumb)[^"]*"[^>]*style="([^"]*)"/g)].map(m => ({ url: bgUrl(m[2]), video: m[1] !== "photo_wrap" })).filter(x => x.url);
    const lp = /class="link_preview_(?:right_)?image[^"]*"[^>]*style="([^"]*)"/.exec(p);
    out.push({ id, service, date: tm ? tm[1] : "", text, raw, photos, vthumb, video, items, preview: lp ? bgUrl(lp[1]) : "" });
  }
  return out;
}

async function crawl() {
  const all = new Map();
  let url = `https://t.me/s/${CH}`, guard = 0, last = Infinity;
  while (guard++ < 200) {
    const html = await get(url);
    if (!/tgme_channel_info|tgme_widget_message/.test(html)) throw new Error("страница канала не похожа на канал: " + url);
    const page = parsePage(html);
    const fresh = page.filter(m => !all.has(m.id));
    fresh.forEach(m => all.set(m.id, m));
    const min = Math.min(...page.map(m => m.id));
    if ([...all.values()].filter(m => !m.service).length >= KEEP) break;
    if (!page.length || !fresh.length || !(min < last) || min <= 1) break;
    last = min; url = `https://t.me/s/${CH}?before=${min}`;
    await sleep(700);
  }
  return [...all.values()].sort((a, b) => b.id - a.id);
}

// ---------- оформление текста как в Telegram ----------
// Из HTML поста собираем свою разметку по белому списку — тег за тегом, текст экранируется: чужой код в страницу не попадёт.
// Остаются: жирный, курсив, подчёркнутый, зачёркнутый, код, цитата, ссылки http(s)/tg (в новой вкладке). Эмодзи-картинки → символы,
// ссылки-хештеги → обычный текст. Строки разбиваются по <br>: открытые теги закрываются в конце строки и открываются в начале следующей.
const escH = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const RICH_TAG = { b: "b", strong: "b", i: "i", em: "i", u: "u", s: "s", del: "s", strike: "s", code: "code", pre: "code", blockquote: "blockquote", a: "a" };
function richLines(raw) {
  const h = raw.replace(/<i class="emoji"[^>]*>\s*<b>([^<]*)<\/b>\s*<\/i>/g, "$1").replace(/<tg-emoji[^>]*>([\s\S]*?)<\/tg-emoji>/g, "$1");
  const lines = [], open = []; let html = "", plain = "";
  const openTag = o => o.emit === "a" ? '<a href="' + escH(o.href) + '" target="_blank" rel="noopener">' : "<" + o.emit + ">";
  const endLine = () => { for (let k = open.length - 1; k >= 0; k--) html += "</" + open[k].emit + ">"; lines.push({ html, plain }); html = open.map(openTag).join(""); plain = ""; };
  const re = /<(\/?)([a-zA-Z0-9-]+)([^>]*)>|([^<]+)/g; let m;
  while ((m = re.exec(h))) {
    if (m[4] != null) { const t = decode(m[4]).replace(/ /g, " "); plain += t; html += escH(t.replace(/#([\p{L}\p{N}_]+)/gu, "$1")); continue; }
    const tag = m[2].toLowerCase(), emit = RICH_TAG[tag];
    if (tag === "br") { endLine(); continue; }
    if (!emit) continue;
    if (m[1]) { const k = open.map(o => o.src).lastIndexOf(tag); if (k < 0) continue; for (let j = open.length - 1; j >= k; j--) html += "</" + open[j].emit + ">"; const rest = open.splice(k); rest.shift(); rest.forEach(o => { open.push(o); html += openTag(o); }); continue; }
    let o = { src: tag, emit };
    if (emit === "a") { const hm = /href="([^"]*)"/.exec(m[3]); const href = hm ? decode(hm[1]) : ""; if (/^(https?:|tg:)/i.test(href)) o.href = href; else o.emit = "span"; }
    open.push(o); html += openTag(o);
  }
  endLine();
  return lines.map(l => ({ html: l.html.replace(/<(b|i|u|s|code|span|blockquote)><\/\1>/g, "").replace(/<a [^>]*><\/a>/g, ""), plain: l.plain }));
}
// строки → абзацы; строка целиком жирным (кроме эмодзи и знаков) — подзаголовок <h4>; skipFirst — первая строка ушла в заголовок карточки
function richHtml(raw, skipFirst) {
  let L = richLines(raw).filter(l => !/^\s*(#[\p{L}\p{N}_]+\s*)+$/u.test(l.plain));
  if (skipFirst) { const k = L.findIndex(l => l.plain.trim()); if (k >= 0) L.splice(k, 1); }
  const paras = []; let cur = [];
  for (const l of L) { if (!l.plain.trim()) { if (cur.length) paras.push(cur); cur = []; } else cur.push(l); }
  if (cur.length) paras.push(cur);
  const isHead = l => l.plain.trim().length <= 90 && /<b>/.test(l.html) && !/[\p{L}\p{N}]/u.test(l.html.replace(/<b>[\s\S]*?<\/b>/g, "").replace(/<[^>]+>/g, "").replace(/&[a-z]+;/g, ""));
  return paras.map(p => {
    let out = "";
    if (isHead(p[0])) { out += "<h4>" + p[0].html.replace(/<\/?b>/g, "").trim() + "</h4>"; p = p.slice(1); }
    if (p.length) out += "<p>" + p.map(l => l.html.trim()).join("<br>") + "</p>";
    return out;
  }).join("");
}

// ---------- пост → карточка ----------
const KEYCAP = /[0-9#*]️?⃣/gu;
const PICT = /[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}\u{FE0F}\u{200D}\u{20E3}]/gu;
const clean = s => s.replace(KEYCAP, "").replace(PICT, "").replace(/[ \t]{2,}/g, " ").replace(/^[\s\-–—•·:|]+|[\s\-–—•·:|]+$/g, "");
const cut = (s, n) => { if (s.length <= n) return s; const w = s.slice(0, n - 1); const i = w.lastIndexOf(" "); return (i > n * .6 ? w.slice(0, i) : w).replace(/[\s,;:—–-]+$/, "") + "…"; };
function card(m) {
  const tags = [...m.text.matchAll(/#([\p{L}\p{N}_]+)/gu)].map(x => x[1].toLowerCase());
  const head = m.text.slice(0, 400), line1 = m.text.split("\n").find(l => l.trim()) || "";
  const byWords = s => (WORD_RULES.find(([, re]) => re.test(s)) || [])[0];
  const tag = tags.map(t => TAG_MAP[t]).find(Boolean) || byWords(line1) || byWords(head) || (m.text.length > 600 ? "Статья" : DEFAULT_TAG);
  // хештеги из текста убираем: строки только из хештегов — целиком, внутри фраз — оставляем слово без «#»
  const lines = m.text.split("\n").filter(l => !/^\s*(#[\p{L}\p{N}_]+\s*)+$/u.test(l)).map(l => l.replace(/#([\p{L}\p{N}_]+)/gu, "$1"));
  const paras = lines.join("\n").split(/\n\s*\n/).map(p => p.split("\n").map(x => x.trim()).filter(Boolean).join("\n")).filter(Boolean);
  let first = (paras[0] || "").split("\n")[0] || "", title = clean(first), restFirst = (paras[0] || "").split("\n").slice(1).join("\n");
  let wholeLine = !!title;
  // длинная первая строка — заголовок = первое предложение, остальное уходит в текст
  if (title.length > LIM.title) { wholeLine = false;
    const sm = /^(.{12,}?[.!?…])(\s|$)/u.exec(title);
    if (sm && sm[1].length <= LIM.title) { restFirst = (title.slice(sm[1].length).trim() + (restFirst ? "\n" + restFirst : "")).trim(); title = sm[1].replace(/[.]$/, ""); }
  }
  const bodyParas = [restFirst, ...paras.slice(1)].map(p => p.trim()).filter(Boolean);
  const body = bodyParas.join("\n\n");
  const flat = s => clean(s.replace(/\s*\n\s*/g, " "));
  if (!title) title = flat(body).split(/(?<=[.!?…])\s/)[0] || (m.video ? "Видео в Telegram" : m.photos.length ? "Фото в Telegram" : "Пост в Telegram");
  // картинки поста: первая — обложка (<номер>.jpg), остальные — галерея (<номер>-2.jpg, -3…); без картинок — превью ссылки
  const items = m.items.length ? m.items : m.preview ? [{ url: m.preview, video: false }] : [];
  const media = items.length ? items[0].url : "";
  return {
    id: "tg-" + m.id, source: "tg", status: "published", date: (m.date || "").slice(0, 10), tag,
    layout: media ? "vertical" : "text", title: cut(title, LIM.title), titleFull: title.length > LIM.title ? title : undefined, excerpt: cut(flat(body), LIM.excerpt),
    cover: media ? "news/tg/" + m.id + ".jpg" : "", body, html: m.raw ? richHtml(m.raw, wholeLine) || undefined : undefined, link: `https://t.me/${CH}/${m.id}`, video: (items[0] && items[0].video) || (!items.length && m.video) || undefined,
    _items: items.map((x, k) => ({ ...x, src: "news/tg/" + m.id + (k ? "-" + (k + 1) : "") + ".jpg" })), _media: media
  };
}

// размер JPEG/PNG/WebP по заголовку — для выбора вида карточки (широкая или вертикальная)
function imgSize(b) {
  if (b[0] === 0xFF && b[1] === 0xD8) { let i = 2; while (i < b.length) { if (b[i] !== 0xFF) { i++; continue; } const t = b[i + 1], L = b.readUInt16BE(i + 2); if (t >= 0xC0 && t <= 0xCF && ![0xC4, 0xC8, 0xCC].includes(t)) return { w: b.readUInt16BE(i + 7), h: b.readUInt16BE(i + 5) }; i += 2 + L; } }
  if (b.slice(1, 4).toString() === "PNG") return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
  if (b.slice(8, 12).toString() === "WEBP") { const f = b.slice(12, 16).toString(); if (f === "VP8X") return { w: 1 + b.readUIntLE(24, 3), h: 1 + b.readUIntLE(27, 3) }; if (f === "VP8 ") return { w: b.readUInt16LE(26) & 0x3FFF, h: b.readUInt16LE(28) & 0x3FFF }; if (f === "VP8L") { const n = b.readUInt32LE(21); return { w: 1 + (n & 0x3FFF), h: 1 + ((n >> 14) & 0x3FFF) }; } }
  return null;
}

function readOld() {
  try { const w = {}; new Function("window", fs.readFileSync(OUT_JS, "utf8"))(w); return w.RGBY_NEWS_TG || null; } catch (e) { return null; }
}

async function main() {
  const posts = (await crawl()).filter(m => !m.service && (m.text || m.photos.length || m.vthumb.length)).slice(0, KEEP);
  const old = readOld();
  if (!posts.length) { if (old && old.list && old.list.length) throw new Error("канал прочитан пустым, а в файле " + old.list.length + " карточек — ничего не меняю"); }
  const cards = posts.map(card);
  if (!DRY) fs.mkdirSync(IMG_DIR, { recursive: true });
  for (const c of cards) {
    if (!c._media) continue;
    // все картинки поста; ratio — пропорции: карточка и окно на сайте берут форму картинки и не обрезают её (текст на обложках постов)
    const got = [];
    for (const it of c._items) {
      const f = path.join(IMG_DIR, path.basename(it.src));
      let buf = null;
      if (fs.existsSync(f)) buf = fs.readFileSync(f);
      else { try { buf = await get(it.url, true); if (!DRY) fs.writeFileSync(f, buf); } catch (e) { console.warn("картинка не скачалась:", c.id, it.src, e.message); continue; } }
      const sz = imgSize(buf);
      got.push({ src: it.src, ratio: sz && sz.h ? +(sz.w / sz.h).toFixed(3) : 0, video: it.video || undefined });
    }
    if (!got.length || got[0].src !== c.cover) { console.warn("обложка не скачалась:", c.id); c.cover = got[0] ? got[0].src : ""; if (!c.cover) { c.layout = "text"; continue; } }
    c.video = got[0].video || undefined;
    if (got[0].ratio) { c.ratio = got[0].ratio; if (c.ratio > 1.15) c.layout = "horizontal"; }
    if (got.length > 1) c.gallery = got.map(g => (g.video ? g : { src: g.src, ratio: g.ratio }));
  }
  cards.forEach(c => { delete c._media; delete c._items; if (!c.video) delete c.video; if (!c.titleFull) delete c.titleFull; });
  // картинки постов, ушедших из последних KEEP (или удалённых из канала), — убираем; кроме тех, на которые ссылаются правки в CMS (news.js)
  if (!DRY && fs.existsSync(IMG_DIR)) {
    let own = [];
    try { const w = {}; new Function("window", "localStorage", fs.readFileSync(path.join(SITE, "content/news/news.js"), "utf8"))(w, { getItem: () => null }); own = (w.RGBY_NEWS && w.RGBY_NEWS.list) || []; } catch (e) {}
    const keep = new Set(cards.concat(own).flatMap(c => [c.cover, ...(c.gallery || []).map(g => g.src)]).filter(Boolean).map(s => path.basename(s))); for (const f of fs.readdirSync(IMG_DIR)) if (/^\d+(-\d+)?\.jpg$/.test(f) && !keep.has(f)) fs.unlinkSync(path.join(IMG_DIR, f)); }
  const same = old && JSON.stringify(old.list) === JSON.stringify(cards);
  const tagStat = cards.reduce((a, c) => (a[c.tag] = (a[c.tag] || 0) + 1, a), {});
  console.log(`Канал @${CH}: постов ${posts.length}, карточек ${cards.length} (${Object.entries(tagStat).map(([k, v]) => k + " " + v).join(", ")}), с обложкой ${cards.filter(c => c.cover).length}, видео ${cards.filter(c => c.video).length}, альбомов ${cards.filter(c => c.gallery).length} (картинок в них ${cards.reduce((a, c) => a + (c.gallery || []).length, 0)})`);
  if (DRY) { cards.slice(0, 40).forEach(c => console.log(`  ${c.id} ${c.date} [${c.tag}] ${c.layout}${c.video ? " видео" : ""} · ${c.title} | ${c.excerpt.slice(0, 70)}`)); return; }
  if (same) { console.log("Изменений нет."); return; }
  const now = new Date().toISOString().replace(/\.\d+Z$/, "Z");
  const js = `// RGBY · новости из Telegram-канала @${CH} — файл пишет робот (tools/telegram/tg-news.mjs; на стенде — GitHub Actions, раз в 30 мин).
// Руками не править: перезапишется. Поправить или скрыть карточку — в CMS новостей: правка сохраняется в content/news/news.js
// с тем же id ("tg-<номер поста>") и перекрывает эту карточку. Тип карточки — по хештегу поста (см. TAG_MAP в tg-news.mjs).
window.RGBY_NEWS_TG = ${JSON.stringify({ channel: CH, updated: now, list: cards }, null, 2)};
`;
  fs.mkdirSync(path.dirname(OUT_JS), { recursive: true });
  fs.writeFileSync(OUT_JS, js);
  console.log("Записано: content/news/telegram.js" + (old ? ` (было ${old.list.length}, стало ${cards.length})` : ""));
}
main().catch(e => { console.error("Ошибка:", e.message); process.exit(1); });
