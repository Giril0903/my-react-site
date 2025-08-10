import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Mail, Youtube, Music2, Apple, ArrowRight, ExternalLink, Globe } from "lucide-react";

// ================= VINTAGE / CINEMATIC REDESIGN (update 2) =================
// Updates: brand, tracks (1 cover + 2 blurred placeholders w/o images),
// platforms row (Spotify/Apple/Tidal/All via single aggregator link),
// video description adjusted, Contact links updated (no Instagram).


function PaperButton({ children, href, onClick, className = "", icon: Icon, ...rest }) {
  const Cmp = href ? "a" : "button";
  return (
    <Cmp
      href={href}
      onClick={onClick}
      className={`relative inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold tracking-wide transition-transform focus:outline-none focus:ring-2 focus:ring-amber-400/60 paper-btn ${className}`}
      {...rest}
    >
      {Icon ? <Icon className="w-4 h-4" aria-hidden /> : null}
      <span>{children}</span>
    </Cmp>
  );
}

const NeonButton = PaperButton;

function SectionTag({ children }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.18em] border border-white/10 bg-white/5 text-white/70">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
      <span>{children}</span>
    </div>
  );
}

function TrackCard({ title, cover, src, mutedLevel = 0 }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onEnd = () => setPlaying(false);
    a.addEventListener("ended", onEnd);
    return () => a.removeEventListener("ended", onEnd);
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); } else { a.play(); setPlaying(true); }
  };

  const isComingSoon = !src || mutedLevel > 0;
  const displayTitle = isComingSoon && title !== "Coming soon" ? "Coming soon" : title;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-[0_10px_30px_-20px_rgba(0,0,0,.6)]"
    >
      <div className="relative aspect-square overflow-hidden rounded-xl polaroid">
        {cover ? (
          <img
            src={cover}
            alt={displayTitle}
            className="object-contain w-full h-full p-2 bg-black/30"
            style={{ filter: mutedLevel ? `blur(${3 + mutedLevel * 2}px) contrast(0.8) brightness(0.75) saturate(0.8)` : undefined }}
          />
        ) : (
          <div className="absolute inset-0">
            <div className="w-full h-full bg-gradient-to-br from-[#6e4b33] via-[#2b1d12] to-[#0f0b07]" style={{ filter: `blur(${6 + mutedLevel * 3}px)` }} />
            <div className="grain absolute inset-0 opacity-20" />
          </div>
        )}

        {src ? (
          <button
            onClick={toggle}
            className="absolute bottom-3 right-3 inline-flex items-center justify-center w-12 h-12 rounded-xl backdrop-blur bg-black/50 border border-white/10 hover:scale-105 transition"
            aria-label={playing ? "Pause" : "Play"}
            title={playing ? "Pause" : "Play"}
          >
            {playing ? <Pause /> : <Play />}
          </button>
        ) : (
          <div className="absolute bottom-3 right-3 text-xs text-white/70 bg-black/40 px-3 py-2 rounded-lg border border-white/10">Soon</div>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <div>
          <div className="font-semibold tracking-wide">{displayTitle}</div>
          <div className="text-xs text-white/60">Single • 2025</div>
        </div>
        <NeonButton className="px-3 py-2 text-xs" icon={ExternalLink} href="#">
          More
        </NeonButton>
      </div>
      {src ? <audio ref={audioRef} src={src} preload="none" /> : null}
    </motion.div>
  );
}

// ---------------- i18n (10 languages) ----------------
const languages = [
  { code: "en", label: "English" },
  { code: "zh", label: "中文" },
  { code: "hi", label: "हिन्दी" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "ar", label: "العربية" },
  { code: "bn", label: "বাংলা" },
  { code: "pt", label: "Português" },
  { code: "ru", label: "Русский" },
  { code: "ja", label: "日本語" },
];

const translations = {
  en: {
    portfolio_tag: "Music portfolio",
    hero_line1: "Ultimate Collection by Tonal Swell",
    hero_line2: "cinematic vintage tones for golden hours",
    listen_releases: "Listen releases",
    booking: "Booking",
    releases: "Releases",
    new_tracks: "New tracks",
    watch_all: "View all",
    video: "Video",
    video_title: "Official video",
    video_desc: "Official video with on‑screen lyrics.",
    watch: "Watch",
    contact_tag: "Booking & contacts",
    contact_title: "Get in touch",
    name_label: "Your name",
    email_label: "E‑mail",
    message_label: "Message",
    send_request: "Send",
    more_soon_title: "More soon",
    more_soon_desc: "More songs are on the way. Stay tuned.",
    faq_title: "FAQ",
    faq_q1: "Is this the official website?",
    faq_a1: "Yes — this is the official site of Tonal Swell.",
    faq_q2: "Where can I listen in high quality?",
    faq_a2: "See the separate Audiophile Release section (Qobuz).",
    faq_q3: "Business/press inquiries?",
    faq_a3: "Use the contact form – we’ll reply promptly.",
    faq_q4: "Can I use the music in my video?",
    faq_a4: "Write to us about licensing.",
    press_title: "In the press",
    audiophile_title: "Audiophile release",
  },
  ru: {
    portfolio_tag: "Музыкальное портфолио",
    hero_line1: "Ultimate Collection by Tonal Swell",
    hero_line2: "кинематографичный винтаж для золотого часа",
    listen_releases: "Слушать релизы",
    booking: "Бронирование",
    releases: "Релизы",
    new_tracks: "Новые треки",
    watch_all: "Смотреть все",
    video: "Видео",
    video_title: "Официальное видео",
    video_desc: "Официальное видео с текстом песни на экране.",
    watch: "Смотреть",
    contact_tag: "Бронирование и связи",
    contact_title: "Свяжитесь с нами",
    name_label: "Ваше имя",
    email_label: "E‑mail",
    message_label: "Сообщение",
    send_request: "Отправить",
    more_soon_title: "Скоро больше",
    more_soon_desc: "Новые песни уже в пути. Оставайтесь на связи.",
    faq_title: "FAQ",
    faq_q1: "Это официальный сайт?",
    faq_a1: "Да — официальный сайт Tonal Swell.",
    faq_q2: "Где послушать в наилучшем качестве?",
    faq_a2: "Смотрите отдельный раздел про Qobuz.",
    faq_q3: "По деловым/PR вопросам?",
    faq_a3: "Напишите через форму — ответим оперативно.",
    faq_q4: "Можно использовать музыку в видео?",
    faq_a4: "Свяжитесь с нами по поводу лицензирования.",
    press_title: "Пишут о нас",
    audiophile_title: "Аудиофильный релиз",
  },
  es: { portfolio_tag: "Portfolio musical", hero_line1: "Ultimate Collection by Tonal Swell", hero_line2: "tonos vintage cinematográficos", listen_releases: "Escuchar", booking: "Booking", releases: "Lanzamientos", new_tracks: "Nuevos temas", watch_all: "Ver todo", video: "Video", video_title: "Video oficial", video_desc: "Video oficial con letra en pantalla.", watch: "Ver", contact_tag: "Booking y contacto", contact_title: "Escríbenos", name_label: "Tu nombre", email_label: "E‑mail", message_label: "Mensaje", send_request: "Enviar", more_soon_title: "Más pronto", more_soon_desc: "Más canciones en camino.", faq_title: "FAQ", faq_q1: "¿Este es el sitio oficial?", faq_a1: "Sí — sitio oficial de Tonal Swell.", faq_q2: "¿Dónde escuchar en alta calidad?", faq_a2: "Mira la sección de Qobuz.", faq_q3: "¿Prensa/negocios?", faq_a3: "Usa el formulario de contacto.", faq_q4: "¿Puedo usar la música en mi video?", faq_a4: "Escríbenos sobre licencias.", press_title: "En la prensa", audiophile_title: "Lanzamiento audiófilo" },
  fr: { portfolio_tag: "Portfolio musical", hero_line1: "Ultimate Collection by Tonal Swell", hero_line2: "tons vintage cinématographiques", listen_releases: "Écouter", booking: "Booking", releases: "Sorties", new_tracks: "Nouveaux titres", watch_all: "Tout voir", video: "Vidéo", video_title: "Clip officiel", video_desc: "Clip officiel avec paroles à l'écran.", watch: "Regarder", contact_tag: "Booking & contacts", contact_title: "Nous contacter", name_label: "Votre nom", email_label: "E‑mail", message_label: "Message", send_request: "Envoyer", more_soon_title: "Bientôt plus", more_soon_desc: "D'autres titres arrivent.", faq_title: "FAQ", faq_q1: "Ceci est-il le site officiel ?", faq_a1: "Oui — site officiel de Tonal Swell.", faq_q2: "Où écouter en haute qualité ?", faq_a2: "Voir la section Qobuz.", faq_q3: "Presse/affaires ?", faq_a3: "Utilisez le formulaire.", faq_q4: "Puis-je utiliser la musique dans ma vidéo ?", faq_a4: "Écrivez-nous pour la licence.", press_title: "Dans la presse", audiophile_title: "Sortie audiophile" },
  pt: { portfolio_tag: "Portfólio musical", hero_line1: "Ultimate Collection by Tonal Swell", hero_line2: "tons vintage cinematográficos", listen_releases: "Ouvir", booking: "Booking", releases: "Lançamentos", new_tracks: "Novas faixas", watch_all: "Ver tudo", video: "Vídeo", video_title: "Vídeo oficial", video_desc: "Vídeo oficial com letra na tela.", watch: "Assistir", contact_tag: "Booking e contatos", contact_title: "Fale conosco", name_label: "Seu nome", email_label: "E‑mail", message_label: "Mensagem", send_request: "Enviar", more_soon_title: "Em breve", more_soon_desc: "Mais músicas chegando.", faq_title: "FAQ", faq_q1: "Este é o site oficial?", faq_a1: "Sim — site oficial de Tonal Swell.", faq_q2: "Onde ouvir em alta qualidade?", faq_a2: "Veja a seção Qobuz.", faq_q3: "Imprensa/negócios?", faq_a3: "Use o formulário de contato.", faq_q4: "Posso usar a música no meu vídeo?", faq_a4: "Escreva sobre licenciamento.", press_title: "Na imprensa", audiophile_title: "Lançamento audiófilo" },
  zh: { portfolio_tag: "音乐作品集", hero_line1: "Ultimate Collection by Tonal Swell", hero_line2: "电影感复古音色", listen_releases: "收听", booking: "演出联系", releases: "发行", new_tracks: "新曲目", watch_all: "查看全部", video: "视频", video_title: "官方视频", video_desc: "带屏幕歌词的官方视频。", watch: "观看", contact_tag: "联系与预订", contact_title: "联系我们", name_label: "你的名字", email_label: "邮箱", message_label: "留言", send_request: "发送", more_soon_title: "更多即将到来", more_soon_desc: "更多歌曲路上，敬请期待。", faq_title: "常见问题", faq_q1: "这是官方网站吗？", faq_a1: "是的——这是 Tonal Swell 的官方网站。", faq_q2: "哪里能高品质收听？", faq_a2: "见 Qobuz 专区。", faq_q3: "商务/媒体联系？", faq_a3: "使用联系表单。", faq_q4: "我可以在视频中使用音乐吗？", faq_a4: "请联系我们获取许可。", press_title: "媒体报道", audiophile_title: "发烧友发行" },
  hi: { portfolio_tag: "संगीत पोर्टफोलियो", hero_line1: "Ultimate Collection by Tonal Swell", hero_line2: "सिनेमैटिक विंटेज टोन", listen_releases: "सुनें", booking: "बुकिंग", releases: "रिलीज़", new_tracks: "नए ट्रैक", watch_all: "सब देखें", video: "वीडियो", video_title: "ऑफिशियल वीडियो", video_desc: "स्क्रीन पर लिरिक्स के साथ ऑफिशियल वीडियो।", watch: "देखें", contact_tag: "बुकिंग और संपर्क", contact_title: "हमसे जुड़ें", name_label: "आपका नाम", email_label: "ई‑मेल", message_label: "संदेश", send_request: "भेजें", more_soon_title: "जल्द ही और", more_soon_desc: "और गाने आ रहे हैं।", faq_title: "सामान्य प्रश्न", faq_q1: "क्या यह आधिकारिक वेबसाइट है?", faq_a1: "हाँ — Tonal Swell की आधिकारिक साइट।", faq_q2: "उच्च गुणवत्ता में कहाँ सुनें?", faq_a2: "Qobuz सेक्शन देखें।", faq_q3: "प्रेस/व्यापार पूछताछ?", faq_a3: "कॉन्टैक्ट फ़ॉर्म का उपयोग करें।", faq_q4: "क्या मैं अपने वीडियो में संगीत उपयोग कर सकता हूँ?", faq_a4: "लाइसेंस के लिए लिखें।", press_title: "प्रेस में", audiophile_title: "ऑडियोफाइल रिलीज़" },
  ar: { portfolio_tag: "معرض موسيقي", hero_line1: "Ultimate Collection by Tonal Swell", hero_line2: "نغمات سينمائية قديمة", listen_releases: "استمع", booking: "الحجوزات", releases: "الإصدارات", new_tracks: "أغانٍ جديدة", watch_all: "عرض الكل", video: "فيديو", video_title: "فيديو رسمي", video_desc: "فيديو رسمي مع كلمات على الشاشة.", watch: "مشاهدة", contact_tag: "الحجز والتواصل", contact_title: "تواصل معنا", name_label: "اسمك", email_label: "البريد الإلكتروني", message_label: "رسالة", send_request: "إرسال", more_soon_title: "المزيد قريبًا", more_soon_desc: "أغانٍ أخرى في الطريق.", faq_title: "الأسئلة الشائعة", faq_q1: "هل هذا الموقع الرسمي؟", faq_a1: "نعم — الموقع الرسمي لـ Tonal Swell.", faq_q2: "أين أستمع بجودة عالية؟", faq_a2: "راجع قسم Qobuz.", faq_q3: "استفسارات الصحافة/الأعمال؟", faq_a3: "استخدم نموذج الاتصال.", faq_q4: "هل يمكنني استخدام الموسيقى في فيديو؟", faq_a4: "راسلنا بشأن الترخيص.", press_title: "في الصحافة", audiophile_title: "إصدار لهواة الصوت" },
  bn: { portfolio_tag: "সঙ্গীত পোর্টফোলিও", hero_line1: "Ultimate Collection by Tonal Swell", hero_line2: "সিনেমাটিক ভিন্টেজ টোন", listen_releases: "শুনুন", booking: "বুকিং", releases: "রিলিজ", new_tracks: "নতুন ট্র্যাক", watch_all: "সব দেখুন", video: "ভিডিও", video_title: "অফিসিয়াল ভিডিও", video_desc: "অন-স্ক্রিন গানের কথাসহ অফিসিয়াল ভিডিও।", watch: "দেখুন", contact_tag: "বুকিং ও যোগাযোগ", contact_title: "যোগাযোগ করুন", name_label: "আপনার নাম", email_label: "ই‑মেইল", message_label: "বার্তা", send_request: "পাঠান", more_soon_title: "শীঘ্রই আরও", more_soon_desc: "আরও গান আসছে।", faq_title: "জিজ্ঞাসা", faq_q1: "এটি কি অফিসিয়াল ওয়েবসাইট?", faq_a1: "হ্যাঁ — Tonal Swell-এর অফিসিয়াল সাইট।", faq_q2: "উচ্চ মানে কোথায় শুনবো?", faq_a2: "Qobuz বিভাগ দেখুন।", faq_q3: "ব্যবসা/প্রেস?", faq_a3: "ফর্মটি ব্যবহার করুন।", faq_q4: "আমি কি ভিডিওতে ব্যবহার করতে পারি?", faq_a4: "লাইসেন্সের জন্য লিখুন।", press_title: "মিডিয়ায়", audiophile_title: "অডিওফাইল রিলিজ" },
  ja: { portfolio_tag: "ミュージック・ポートフォリオ", hero_line1: "Ultimate Collection by Tonal Swell", hero_line2: "シネマティックなヴィンテージトーン", listen_releases: "聴く", booking: "ブッキング", releases: "リリース", new_tracks: "新曲", watch_all: "すべて見る", video: "動画", video_title: "公式映像", video_desc: "歌詞表示付きの公式映像。", watch: "見る", contact_tag: "ブッキング＆連絡", contact_title: "お問い合わせ", name_label: "お名前", email_label: "メール", message_label: "メッセージ", send_request: "送信", more_soon_title: "近日公開", more_soon_desc: "新しい曲を準備中。", faq_title: "FAQ", faq_q1: "公式サイトですか？", faq_a1: "はい — Tonal Swell の公式サイトです。", faq_q2: "高音質で聴くには？", faq_a2: "Qobuz セクションをご覧ください。", faq_q3: "ビジネス/プレス問い合わせは？", faq_a3: "コンタクトフォームをご利用ください。", faq_q4: "動画で楽曲を使えますか？", faq_a4: "ライセンスについてご連絡ください。", press_title: "メディア掲載", audiophile_title: "オーディオファイル向け" },
};

function useI18n() {
  const [lang, setLang] = useState("ru");
  const tr = (key) => (translations[lang] && translations[lang][key]) || translations.en[key] || key;
  const isRTL = lang === "ar";
  return { lang, setLang, tr, isRTL };
}

export default function VintagePortfolio() {
  const { lang, setLang, tr, isRTL } = useI18n();
    // Inject OpenGraph/Twitter meta into <head>
  React.useEffect(() => {
    const metas = [
      { property: 'og:title', content: 'Ultimate Collection by Tonal Swell' },
      { property: 'og:site_name', content: 'TonalSwell.com' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: 'data:image/webp;base64,UklGRpwSAABXRUJQVlA4IJASAACwZACdASoAAAIAPpEik9rVgH7oQqWDk4m2ZrH2l1+Nc8QTeOBVINiTfd6m6fQhQp6P7Ypci6x67G9e4rAqOLYf7mO+1n8yQjcq+Fqj8yG1tYq0e7fOe8q8Zk7O3gKiQKQvC3x5Wf6j+QY1n+o3u7D1W0QZqVg0v6mH7M3BfQ4EJm9W7b2b3JZs5sQ5VJcQ+N2wIag7jv8Gu0+0I3q7Yg9b2C1v2B+zGq19V5S0yZgQ4bJkVnE8c7z9zvE2uBqzS1Q9xGk8v7C9s9ZB2lO9bQwV2hJ7Q+qW8yA5v4N+c1Z7YQ8wFre48osHj54XtdvqxY/9oIhJ1TzKb/MQ5L+Zw1GRfQP4Lz1mCXC3buEAAA' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Ultimate Collection by Tonal Swell' },
      { name: 'twitter:image', content: 'data:image/webp;base64,UklGRpwSAABXRUJQVlA4IJASAACwZACdASoAAAIAPpEik9rVgH7oQqWDk4m2ZrH2l1+Nc8QTeOBVINiTfd6m6fQhQp6P7Ypci6x67G9e4rAqOLYf7mO+1n8yQjcq+Fqj8yG1tYq0e7fOe8q8Zk7O3gKiQKQvC3x5Wf6j+QY1n+o3u7D1W0QZqVg0v6mH7M3BfQ4EJm9W7b2b3JZs5sQ5VJcQ+N2wIag7jv8Gu0+0I3q7Yg9b2C1v2B+zGq19V5S0yZgQ4bJkVnE8c7z9zvE2uBqzS1Q9xGk8v7C9s9ZB2lO9bQwV2hJ7Q+qW8yA5v4N+c1Z7YQ8wFre48osHj54XtdvqxY/9oIhJ1TzKb/MQ5L+Zw1GRfQP4Lz1mCXC3buEAAA' },
    ];
    const created = metas.map(m => { const el = document.createElement('meta'); Object.keys(m).forEach(k => el.setAttribute(k, m[k])); document.head.appendChild(el); return el; });
    return () => created.forEach(el => document.head.removeChild(el));
  }, []);

  
  const tracks = [
    {
      title: "Summertime Sadness (Cover)",
      cover: "data:image/webp;base64,UklGRpwSAABXRUJQVlA4IJASAACwZACdASoAAAIAPpEik9rVgH7oQqWDk4m2ZrH2l1+Nc8QTeOBVINiTfd6m6fQhQp6P7Ypci6x67G9e4rAqOLYf7mO+1n8yQjcq+Fqj8yG1tYq0e7fOe8q8Zk7O3gKiQKQvC3x5Wf6j+QY1n+o3u7D1W0QZqVg0v6mH7M3BfQ4EJm9W7b2b3JZs5sQ5VJcQ+N2wIag7jv8Gu0+0I3q7Yg9b2C1v2B+zGq19V5S0yZgQ4bJkVnE8c7z9zvE2uBqzS1Q9xGk8v7C9s9ZB2lO9bQwV2hJ7Q+qW8yA5v4N+c1Z7YQ8wFre48osHj54XtdvqxY/9oIhJ1TzKb/MQ5L+Zw1GRfQP4Lz1mCXC3buEAAA",
      src: "https://cdn.pixabay.com/download/audio/2021/11/09/audio_0ed93484bf.mp3?filename=retro-synthwave-110922.mp3",
    },
    { title: "Coming soon", cover: null, src: null, mutedLevel: 1 },
    { title: "Coming soon", cover: null, src: null, mutedLevel: 2 },
  ];

  const press = [
    { title: "KARLISMYUNKLE — review", href: "https://karlismyunkle.com/2025/08/07/tonal-swell-shares-a-high-emotional-quotient-with-immersive-and-cinematic-cover-of-lana-del-reys-summertime-sadness/" },
    { title: "Good Music Radar — review", href: "https://www.goodmusicradar.com/review/tonal-swell-summertime-sadness-cover/" },
    { title: "Biography Web — feature", href: "https://www.biographyweb.org/tonal-swell-stuns-with-her-cover-single-summertime-sadness/" },
    { title: "JYLA Blog — review", href: "https://jylablog.com/tonal-swell-summertime-sadness-cover/" },
  ];

  const qobuz = { title: "Qobuz — Summertime Sadness (Cover)", href: "https://www.qobuz.com/us-en/album/summertime-sadness-cover-tonal-swell/drzueggumlaea" };

  const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
  const ytId = "xSsJrycjiVo";

  return (
    <div className={`min-h-screen text-white relative overflow-hidden vintage-bg ${isRTL ? "rtl" : ""}`} dir={isRTL ? "rtl" : "ltr"}>
      {/* Warm glow layers */}
      <div aria-hidden className="pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-40 bg-amber-500/30" />
        <div className="absolute -bottom-40 -right-40 w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-40 bg-orange-700/30" />
        <div className="grain" />
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-40 backdrop-blur bg-black/30 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-3">
          <a href="#" className="font-black tracking-[0.12em] text-sm md:text-base title-shadow">TonalSwell.com</a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
            <a className="hover:text-white" href="#music">{tr("releases")}</a>
            <a className="hover:text-white" href="#video">{tr("video")}</a>
            <a className="hover:text-white" href="#contact">Contact</a>
            <a className="hover:text-white" href="#press">Press</a>
          </nav>
          <div className="flex items-center gap-2">
            <LangSelect lang={lang} setLang={setLang} />
            <NeonButton href="#music" className="hidden md:inline-flex" icon={Music2}>{tr("listen_releases")}</NeonButton>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 pt-16 pb-20 md:pb-24 relative">
          <SectionTag>{tr("portfolio_tag")}</SectionTag>
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" className="mt-6 text-4xl md:text-6xl font-black leading-[1.12] tracking-tight warm-title">
            {tr("hero_line1")}
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.1 }} className="mt-4 max-w-2xl text-white/80">
            {tr("hero_line2")}
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.2 }} className="mt-8 flex flex-wrap items-center gap-3">
            <NeonButton href="#music" className=""><ArrowRight className="w-4 h-4" /> {tr("listen_releases")}</NeonButton>
            <NeonButton href="#contact" className="bg-white/5"><Mail className="w-4 h-4" /> {tr("booking")}</NeonButton>
          </motion.div>

          {/* Platforms */}
          <div className="mt-10 flex flex-wrap items-center gap-3 text-white/80">
            <span className="text-xs text-white/60">Listen on</span>
            <a href="https://open.spotify.com/track/0v46dx5tntdECmyFtSkxXU?referral=labelaffiliate&utm_source=1110liYrYyu&utm_medium=Indie_TuneCore&utm_campaign=labelaffiliate" target="_blank" rel="noreferrer" className="platform-link"><Music2 className="w-4 h-4" /> <span>Spotify</span></a>
            <a href="https://music.apple.com/us/album/summertime-sadness-cover/1805282367?i=1805282375" target="_blank" rel="noreferrer" className="platform-link"><Apple className="w-4 h-4" /> <span>Apple Music</span></a>
            <a href="https://music.apple.com/us/album/summertime-sadness-cover/1805282367?i=1805282375" target="_blank" rel="noreferrer" className="platform-link"><Apple className="w-4 h-4" /> <span>iTunes</span></a>
            <a href="https://music.youtube.com/watch?v=CGQ-PA55Th0" target="_blank" rel="noreferrer" className="platform-link"><Youtube className="w-4 h-4" /> <span>YouTube Music</span></a>
            <a href="https://listen.tidal.com/album/426821044/track/426821046" target="_blank" rel="noreferrer" className="platform-link"><Globe className="w-4 h-4" /> <span>Tidal</span></a>
            <a href="https://www.deezer.com/ru/track/3299099021" target="_blank" rel="noreferrer" className="platform-link"><Globe className="w-4 h-4" /> <span>Deezer</span></a>
            <a href="https://music.amazon.com/albums/B0F2TL1XTM?trackAsin=B0F2TJ8D8N&do=play" target="_blank" rel="noreferrer" className="platform-link"><Globe className="w-4 h-4" /> <span>Amazon Music</span></a>
            <a href="https://www.amazon.com/dp/B0F2TJ8D8N" target="_blank" rel="noreferrer" className="platform-link"><Globe className="w-4 h-4" /> <span>Amazon</span></a>
          </div>
        </div>
      </section>

      {/* Music */}
      <section id="music" className="relative py-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div className="space-y-3">
              <SectionTag>{tr("releases")}</SectionTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{tr("new_tracks")}</h2>
              <p className="text-white/70 max-w-xl">Polaroid covers, warm tape textures — a curated selection by Tonal Swell.</p>
            </div>
            <NeonButton href="#" className="">{tr("watch_all")} <ArrowRight className="w-4 h-4" /></NeonButton>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {tracks.map((t, idx) => (
              <TrackCard key={idx} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* Video */}
      <section id="video" className="relative py-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4">
          <SectionTag>{tr("video")}</SectionTag>
          <div className="mt-6 grid md:grid-cols-2 gap-6 items-stretch">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative rounded-2xl overflow-hidden border border-white/15 bg-white/[0.04] shadow-[0_10px_30px_-20px_rgba(0,0,0,.6)]">
              <div className="aspect-video w-full bg-black/60">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${ytId}?rel=0`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
                
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl border border-white/15 p-6 bg-gradient-to-br from-white/[0.04] to-white/[0.02]">
              <h3 className="text-xl font-semibold">{tr("video_title")}</h3>
              <p className="mt-3 text-white/70">{tr("video_desc")} “Summertime Sadness (Cover)”.</p>
              <div className="mt-6 flex gap-3">
                <NeonButton href={`https://youtu.be/${ytId}`} target="_blank" rel="noreferrer"><Youtube className="w-4 h-4" /> {tr("watch")}</NeonButton>
                <NeonButton href="#" className="bg-white/5"><ExternalLink className="w-4 h-4" /> Details</NeonButton>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* More soon */}
      <section id="more" className="relative py-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4">
          <SectionTag>{tr("more_soon_title")}</SectionTag>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">{tr("more_soon_desc")}</h2>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#6e4b33] via-[#2b1d12] to-[#0f0b07]" style={{ filter: `blur(${i*2}px)`, opacity: 0.95 - i*0.15 }} />
                <div className="absolute inset-0 grid place-items-center text-white/70">
                  <span>Coming soon…</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press / Reviews */}
      <section id="press" className="relative py-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4">
          <SectionTag>{tr("press_title")}</SectionTag>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {press.map((p) => (
              <a key={p.href} href={p.href} target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 p-4 bg-white/[0.03] hover:bg-white/[0.05] transition grid">
                <div className="text-white font-medium">{p.title}</div>
                <div className="text-white/60 text-sm mt-1">External article <ExternalLink className="inline w-3 h-3" /></div>
              </a>
            ))}
          </div>

          <div className="mt-10">
            <SectionTag>{tr("audiophile_title")}</SectionTag>
            <a href={qobuz.href} target="_blank" rel="noreferrer" className="mt-3 block rounded-2xl border border-white/10 p-5 bg-gradient-to-br from-white/[0.04] to-white/[0.02] hover:bg-white/[0.06] transition">
              <div className="text-white font-semibold">{qobuz.title}</div>
              <div className="text-white/60 text-sm mt-1">High‑quality streaming on Qobuz <ExternalLink className="inline w-3 h-3" /></div>
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative py-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4">
          <SectionTag>{tr("contact_tag")}</SectionTag>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">{tr("contact_title")}</h2>
          <form
            onSubmit={(e) => { e.preventDefault(); alert("Thanks! We'll get back by e‑mail."); }}
            className="mt-8 grid md:grid-cols-2 gap-6"
          >
            <div className="space-y-2">
              <label className="text-sm text-white/80">{tr("name_label")}</label>
              <input required className="w-full px-4 py-3 rounded-2xl bg-white/[0.06] border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400/60" placeholder="Name" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/80">{tr("email_label")}</label>
              <input type="email" required className="w-full px-4 py-3 rounded-2xl bg-white/[0.06] border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400/60" placeholder="you@label.com" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm text-white/80">{tr("message_label")}</label>
              <textarea rows={5} className="w-full px-4 py-3 rounded-2xl bg-white/[0.06] border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400/60" placeholder="Brief: date, city, format" />
            </div>
            <div className="md:col-span-2">
              <NeonButton className="w-full md:w-auto">{tr("send_request")}</NeonButton>
            </div>
          </form>

          {/* Extra links (no Instagram for now) */}
          <div className="mt-8 flex flex-wrap items-center gap-3 text-white/80">
            <a href="https://open.spotify.com/track/0v46dx5tntdECmyFtSkxXU?referral=labelaffiliate&utm_source=1110liYrYyu&utm_medium=Indie_TuneCore&utm_campaign=labelaffiliate" target="_blank" rel="noreferrer" className="platform-link"><Music2 className="w-4 h-4" /> <span>Spotify</span></a>
            <a href="https://music.apple.com/us/album/summertime-sadness-cover/1805282367?i=1805282375" target="_blank" rel="noreferrer" className="platform-link"><Apple className="w-4 h-4" /> <span>Apple Music</span></a>
            <a href="https://music.apple.com/us/album/summertime-sadness-cover/1805282367?i=1805282375" target="_blank" rel="noreferrer" className="platform-link"><Apple className="w-4 h-4" /> <span>iTunes</span></a>
            <a href="https://music.youtube.com/watch?v=CGQ-PA55Th0" target="_blank" rel="noreferrer" className="platform-link"><Youtube className="w-4 h-4" /> <span>YouTube Music</span></a>
            <a href="https://listen.tidal.com/album/426821044/track/426821046" target="_blank" rel="noreferrer" className="platform-link"><Globe className="w-4 h-4" /> <span>Tidal</span></a>
            <a href="https://www.deezer.com/ru/track/3299099021" target="_blank" rel="noreferrer" className="platform-link"><Globe className="w-4 h-4" /> <span>Deezer</span></a>
            <a href="https://music.amazon.com/albums/B0F2TL1XTM?trackAsin=B0F2TJ8D8N&do=play" target="_blank" rel="noreferrer" className="platform-link"><Globe className="w-4 h-4" /> <span>Amazon Music</span></a>
            <a href="https://www.amazon.com/dp/B0F2TJ8D8N" target="_blank" rel="noreferrer" className="platform-link"><Globe className="w-4 h-4" /> <span>Amazon</span></a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative py-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4">
          <SectionTag>{tr("faq_title")}</SectionTag>
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <FaqItem q={tr("faq_q1")} a={tr("faq_a1")} />
            <FaqItem q={tr("faq_q2")} a={tr("faq_a2")} />
            <FaqItem q={tr("faq_q3")} a={tr("faq_a3")} />
            <FaqItem q={tr("faq_q4")} a={tr("faq_a4")} />
          </div>
        </div>
      </section>
      <footer className="relative border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/70">
          <div>© 2025 Tonal Swell — all rights reserved</div>
          <div className="flex items-center gap-6">
            <a className="hover:text-white" href="#press">Press</a>
            <a className="hover:text-white" href="#faq">FAQ</a>
            <a className="hover:text-white" href="#contact">Contact</a>
          </div>
        </div>
      </footer>

      <style>{`
        .vintage-bg { background: radial-gradient(1200px 600px at 20% 10%, rgba(223,169,111,0.08), transparent 60%), radial-gradient(1000px 600px at 100% 100%, rgba(255,153,0,0.08), transparent 60%), linear-gradient(180deg, #0f0b07 0%, #2b1d12 100%); }
        .title-shadow { text-shadow: 0 0 6px rgba(223,169,111,0.45); }
        .warm-title { text-shadow: 0 0 12px rgba(223,169,111,0.25), 0 0 28px rgba(94,75,51,0.25); }
        .paper-btn { background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03)); border: 1px solid rgba(255,255,255,.12); box-shadow: 0 10px 25px -20px rgba(0,0,0,.8); }
        .polaroid { background: #111; border: 1px solid rgba(255,255,255,.08); box-shadow: 0 30px 60px -30px rgba(0,0,0,.7); }
        .grain { position: fixed; inset: 0; pointer-events: none; opacity: .08; background-image: radial-gradient(rgba(255,255,255,.15) 1px, transparent 1px); background-size: 3px 3px; mix-blend-mode: overlay; }
        .platform-link { display:inline-flex; align-items:center; gap:.5rem; padding:.4rem .6rem; border:1px solid rgba(255,255,255,.12); border-radius: .6rem; background: rgba(255,255,255,.04); backdrop-filter: blur(4px); font-size: .85rem; }
      `}</style>
    </div>
  );
}

function LangSelect({ lang, setLang }) {
  return (
    <label className="relative inline-flex items-center gap-2 text-sm text-white/80">
      <Globe className="w-4 h-4" />
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="bg-black/40 border border-white/15 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
      >
        {languages.map((l) => (
          <option key={l.code} value={l.code}>{l.label}</option>
        ))}
      </select>
    </label>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03]">
      <button className="w-full text-left px-5 py-4 font-semibold flex items-center justify-between" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <span className="text-white/50">{open ? '–' : '+'}</span>
      </button>
      {open && <div className="px-5 pb-5 text-white/70">{a}</div>}
    </div>
  );
}


