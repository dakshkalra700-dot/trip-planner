import { useState, useEffect, useRef } from "react";

const DEPARTURE = new Date("2026-07-07T21:00:00");

const MEMBERS = [
  { name: "Daksh Kalra", role: "Trip Organizer", initials: "DK", emoji: "👑" },
  { name: "Bodhraj Kalra", role: "Elder & Guide", initials: "BK", emoji: "🙏" },
  { name: "Sanjay Sindwani", role: "Traveler", initials: "SS", emoji: "🚂" },
  { name: "Shashi Sindwani", role: "Traveler", initials: "SH", emoji: "🌸" },
  { name: "Asha Kalra", role: "Traveler", initials: "AK", emoji: "🛕" },
  { name: "Yashika", role: "Traveler", initials: "YA", emoji: "⭐" },
  { name: "Taniya", role: "Traveler", initials: "TN", emoji: "🌺" },
  { name: "Priyal", role: "Traveler", initials: "PR", emoji: "💫" },
  { name: "Tisha", role: "Traveler", initials: "TI", emoji: "🌻" },
];

const ITINERARY = [
  {
    day: "Day 1", date: "7 July 2026", icon: "🚂",
    title: "Departure from Shamgarh",
    color: "#f97316",
    items: ["Assemble at Shamgarh Station (SGZ)", "Train departs at 9:00 PM sharp", "Overnight journey begins", "Dinner & bonding time onboard"],
  },
  {
    day: "Day 2", date: "8 July 2026", icon: "🌄",
    title: "Train Journey Continues",
    color: "#f59e0b",
    items: ["Enjoy scenic landscapes rolling by", "Morning chai & snacks on train", "Group games & conversations", "Overnight on train — rest well"],
  },
  {
    day: "Day 3", date: "9 July 2026", icon: "🏨",
    title: "Arrival at Katra",
    color: "#10b981",
    items: ["Arrive at Katra station", "Hotel check-in & freshening up", "Rest and recovery after journey", "Preparation & planning for Yatra", "Light dinner and early to bed"],
  },
  {
    day: "Day 4", date: "10 July 2026", icon: "⛰️",
    title: "Mata Vaishno Devi Darshan",
    color: "#ef4444",
    items: ["Stay in Katra", "Explore vibrant Katra local market", "Shopping for souvenirs & prasad", "Local food experience — Dogri cuisine", "Evening relaxation & spiritual vibes"],
  },
  {
    day: "Day 5", date: "11 July 2026", icon: "🕌",
    title: "Amritsar — Golden Temple & Wagah Border",
    color: "#a855f7",
    items: ["Travel from Katra to Amritsar", "Visit Golden Temple (Harmandir Sahib)", "Langar — community meal experience", "Attend Wagah Border ceremony (if time permits)", "Overnight stay in Amritsar"],
  },
  {
    day: "Day 6", date: "12 July 2026", icon: "🌿",
    title: "Jallianwala Bagh & Amritsar Markets",
    color: "#3b82f6",
    items: ["Visit Jallianwala Bagh memorial", "Explore local Amritsar markets", "Shopping — spices, suits, handicrafts", "Amritsari kulcha & lassi food tour", "Prepare luggage for return journey"],
  },
  {
    day: "Day 7", date: "13 July 2026", icon: "🏠",
    title: "Return Journey to Shamgarh",
    color: "#ec4899",
    items: ["Early morning departure", "Train from Amritsar to Shamgarh (SGZ)", "Train departs at 7:20 AM", "Cherish memories of the yatra", "Safe arrival back home 🙏"],
  },
];

const PLACES = [
  { name: "Mata Vaishno Devi", desc: "Sacred cave shrine in the Trikuta Mountains — one of India's holiest pilgrimage sites.", icon: "🛕" },
  { name: "Bhairavnath Temple", desc: "Ancient temple marking the final step of the Vaishno Devi yatra.", icon: "⛪" },
  { name: "Golden Temple", desc: "Harmandir Sahib — the holiest Sikh shrine, breathtaking at sunrise.", icon: "🕌" },
  { name: "Wagah Border", desc: "The daily flag-lowering ceremony between India and Pakistan — goosebumps guaranteed.", icon: "🇮🇳" },
  { name: "Jallianwala Bagh", desc: "A historic garden and memorial site of profound national significance.", icon: "🌿" },
  { name: "Katra Market", desc: "Vibrant bazaar with local crafts, prasad shops and Dogri street food.", icon: "🛍️" },
];

const PACKING = [
  { cat: "Essentials", icon: "📋", items: ["Aadhaar / Passport", "Train tickets (printed)", "Hotel booking confirmation", "Cash & UPI apps", "Emergency contacts list"] },
  { cat: "Clothing", icon: "👕", items: ["Warm layers for mountains", "Comfortable trek shoes", "Rain cover / poncho", "Head covering (for temples)", "Socks × 5 pairs"] },
  { cat: "Trek Gear", icon: "🎒", items: ["Sturdy trekking backpack", "Trekking poles", "Torch / headlamp", "Water bottle (2L)", "Energy bars / dry fruits"] },
  { cat: "Health & Safety", icon: "💊", items: ["Personal medicines", "First aid kit", "ORS packets", "Hand sanitizer", "Sunscreen SPF 50+"] },
];

const FAQS = [
  { q: "What is the total trek distance to Vaishno Devi?", a: "The standard Katra–Bhawan route is about 13.5 km one way. Helicopter services are also available from Katra to Sanjichhat (half-way)." },
  { q: "Is the trek safe for elderly members?", a: "Yes, ponies and palkis (dolis) are available throughout the route. The path is well-maintained with medical posts along the way." },
  { q: "What dress code is required at the temples?", a: "Modest, respectful clothing covering shoulders and knees. Head coverings required at Gurudwara (Golden Temple). Shoes removed at all shrines." },
  { q: "Is the registration mandatory for Vaishno Devi darshan?", a: "Yes, YATRA PARCHI (registration) is mandatory. Register online at maavaishnodevi.org or at counters in Katra." },
  { q: "What is the best time for Wagah Border ceremony?", a: "The ceremony happens daily at sunset. Reach at least 1.5–2 hours early for good seats. The timing shifts with seasons." },
];

const BUDGET = [
  { item: "SGZ → Katra Train (₹630 × 9)", est: 5670, icon: "🚂", detail: "₹630 per person" },
  { item: "Katra Hotel (2 rooms × 3 nights)", est: 6000, icon: "🏨", detail: "₹1,000/room/night" },
  { item: "Katra Extra Expenses", est: 3000, icon: "🍽️", detail: "Food, transport & misc" },
  { item: "Bus: Katra → Amritsar (₹400 × 9)", est: 3600, icon: "🚌", detail: "₹400 per person" },
  { item: "Amritsar Hotel", est: 1000, icon: "🏨", detail: "1 night stay" },
  { item: "Amritsar → SGZ Train (₹580 × 9)", est: 5220, icon: "🚆", detail: "₹580 per person" },
  { item: "Other / Miscellaneous", est: 5000, icon: "💰", detail: "Shopping, food & emergency" },
];

function useCountdown(target) {
  const [t, setT] = useState({});
  useEffect(() => {
    const calc = () => {
      const diff = target - Date.now();
      if (diff <= 0) return setT({ d: 0, h: 0, m: 0, s: 0 });
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

function useScrollProgress() {
  const [prog, setProg] = useState(0);
  useEffect(() => {
    const h = () => {
      const el = document.documentElement;
      setProg((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return prog;
}

function useInView(ref) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return vis;
}

function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef();
  const vis = useInView(ref);
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`
    }}>{children}</div>
  );
}

function CountdownBox({ value, label }) {
  return (
    <div style={{ textAlign: "center", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(249,115,22,0.3)", borderRadius: 16, padding: "20px 28px", backdropFilter: "blur(12px)", minWidth: 80 }}>
      <div style={{ fontSize: 42, fontWeight: 700, color: "#fb923c", fontFamily: "serif", lineHeight: 1 }}>{String(value).padStart(2, "0")}</div>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 6, letterSpacing: 2, textTransform: "uppercase" }}>{label}</div>
    </div>
  );
}

export default function App() {
  const [dark, setDark] = useState(true);
  const [nav, setNav] = useState(false);
  const [activeDay, setActiveDay] = useState(0);
  const [checklist, setChecklist] = useState({});
  const [top, setTop] = useState(false);
  const countdown = useCountdown(DEPARTURE.getTime());
  const progress = useScrollProgress();

  useEffect(() => {
    const h = () => setTop(window.scrollY > 400);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const bg = dark ? "#0a0a0f" : "#f8f4f0";
  const text = dark ? "#f1f0ee" : "#1a1a1a";
  const card = dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
  const border = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)";
  const sub = dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";

  const scroll = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setNav(false); };

  const navLinks = [["hero", "Home"], ["itinerary", "Itinerary"], ["places", "Places"], ["packing", "Packing"], ["budget", "Budget"], ["faq", "FAQ"], ["contact", "Contact"]];

  return (
    <div style={{ background: bg, color: text, fontFamily: "'Segoe UI', system-ui, sans-serif", minHeight: "100vh", position: "relative", overflowX: "hidden" }}>

      {/* Scroll progress */}
      <div style={{ position: "fixed", top: 0, left: 0, height: 3, width: `${progress}%`, background: "linear-gradient(90deg,#f97316,#facc15,#fb923c)", zIndex: 1001, transition: "width 0.1s" }} />

      {/* Cursor glow */}
      <style>{`
        * { box-sizing: border-box; }
        ::selection { background: rgba(249,115,22,0.3); }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #f97316; border-radius: 3px; }
        .glow-btn { position: relative; overflow: hidden; transition: all 0.3s; }
        .glow-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(249,115,22,0.4); }
        .card-hover { transition: all 0.3s; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(249,115,22,0.15); }
        .nav-link { cursor: pointer; transition: color 0.2s; }
        .nav-link:hover { color: #f97316; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes shimmer { 0%{background-position:0 0} 100%{background-position:200% 0} }
        @keyframes pulse-ring { 0%{transform:scale(0.8);opacity:1} 100%{transform:scale(1.6);opacity:0} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .float { animation: float 4s ease-in-out infinite; }
        .cloud { position:absolute;background:rgba(255,255,255,0.04);border-radius:50px;filter:blur(2px);animation:float 8s ease-in-out infinite; }
        @keyframes gradient-shift {
          0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%}
        }
      `}</style>

      {/* Navbar */}
      <nav style={{ position: "fixed", top: 3, left: 0, right: 0, zIndex: 1000, padding: "0 5%", background: dark ? "rgba(10,10,15,0.85)" : "rgba(248,244,240,0.9)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => scroll("hero")}>
          <span style={{ fontSize: 22 }}>🚩</span>
          <span style={{ fontWeight: 700, fontSize: 15, background: "linear-gradient(90deg,#f97316,#facc15)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Yatra 2026</span>
        </div>

        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {navLinks.map(([id, label]) => (
            <span key={id} className="nav-link" onClick={() => scroll(id)} style={{ fontSize: 14, color: sub, display: window.innerWidth < 768 ? "none" : "block" }}>{label}</span>
          ))}
          <button onClick={() => setDark(!dark)} style={{ background: "none", border: `1px solid ${border}`, color: text, borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 16 }}>
            {dark ? "☀️" : "🌙"}
          </button>
          <button onClick={() => setNav(!nav)} style={{ background: "none", border: "none", color: text, cursor: "pointer", fontSize: 22, display: "flex" }}>☰</button>
        </div>
      </nav>

      {/* Mobile Nav Drawer */}
      {nav && (
        <div style={{ position: "fixed", inset: 0, zIndex: 999, background: dark ? "rgba(10,10,15,0.97)" : "rgba(248,244,240,0.97)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28 }}>
          <button onClick={() => setNav(false)} style={{ position: "absolute", top: 20, right: 24, background: "none", border: "none", color: text, fontSize: 28, cursor: "pointer" }}>✕</button>
          {navLinks.map(([id, label]) => (
            <span key={id} onClick={() => scroll(id)} style={{ fontSize: 24, fontWeight: 600, cursor: "pointer", color: text }} className="nav-link">{label}</span>
          ))}
        </div>
      )}

      {/* Hero */}
      <section id="hero" style={{ minHeight: "100vh", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 5% 60px", textAlign: "center", overflow: "hidden" }}>

        {/* Animated bg */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#0a0a0f 0%,#1a0a00 40%,#0a1020 80%,#0a0a0f 100%)", backgroundSize: "400% 400%", animation: "gradient-shift 12s ease infinite" }} />

        {/* Mountain silhouette */}
        <svg style={{ position: "absolute", bottom: 0, left: 0, right: 0, width: "100%", opacity: 0.15 }} viewBox="0 0 1440 300" preserveAspectRatio="none">
          <polygon points="0,300 200,80 400,200 600,40 800,160 1000,20 1200,140 1440,60 1440,300" fill="#f97316" />
          <polygon points="0,300 300,120 500,220 700,80 900,180 1100,50 1300,160 1440,90 1440,300" fill="#facc15" opacity="0.5" />
        </svg>

        {/* Stars */}
        {[...Array(40)].map((_, i) => (
          <div key={i} style={{
            position: "absolute", width: Math.random() * 2 + 1, height: Math.random() * 2 + 1,
            borderRadius: "50%", background: "white", opacity: Math.random() * 0.6 + 0.2,
            top: `${Math.random() * 70}%`, left: `${Math.random() * 100}%`,
            animation: `float ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 3}s infinite`
          }} />
        ))}

        {/* Floating clouds */}
        <div className="cloud" style={{ width: 180, height: 40, top: "15%", left: "8%", animationDelay: "0s" }} />
        <div className="cloud" style={{ width: 120, height: 30, top: "25%", right: "12%", animationDelay: "2s" }} />
        <div className="cloud" style={{ width: 220, height: 50, top: "8%", left: "40%", animationDelay: "4s" }} />

        <div style={{ position: "relative", zIndex: 2 }}>
          <FadeIn>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.3)", borderRadius: 50, padding: "6px 20px", marginBottom: 24, fontSize: 13, color: "#fb923c" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f97316", display: "inline-block", boxShadow: "0 0 8px #f97316" }} />
              9 Members · July 2026 · Shamgarh to Katra
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div style={{ fontSize: 72, marginBottom: 8, lineHeight: 1 }} className="float">🛕</div>
            <h1 style={{ fontSize: "clamp(32px,6vw,72px)", fontWeight: 800, lineHeight: 1.1, margin: "16px 0", background: "linear-gradient(135deg,#fff 30%,#fb923c 60%,#facc15 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Shri Mata Vaishno Devi<br />Yatra 2026
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p style={{ fontSize: 20, color: "rgba(255,255,255,0.65)", marginBottom: 40, fontWeight: 300, letterSpacing: 0.5 }}>
              A Journey of Faith, Adventure &amp; Memories
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 56 }}>
              <button className="glow-btn" onClick={() => scroll("itinerary")} style={{ background: "linear-gradient(135deg,#f97316,#ea580c)", color: "#fff", border: "none", borderRadius: 50, padding: "14px 32px", fontSize: 16, fontWeight: 600, cursor: "pointer" }}>
                View Itinerary ↓
              </button>
              <button className="glow-btn" onClick={() => scroll("contact")} style={{ background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 50, padding: "14px 32px", fontSize: 16, fontWeight: 600, cursor: "pointer", backdropFilter: "blur(8px)" }}>
                Join Trip 🚩
              </button>
            </div>
          </FadeIn>

          {/* Countdown */}
          <FadeIn delay={0.4}>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 16, letterSpacing: 2, textTransform: "uppercase" }}>Departure in</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              {[["d", "Days"], ["h", "Hours"], ["m", "Minutes"], ["s", "Seconds"]].map(([k, l]) => (
                <CountdownBox key={k} value={countdown[k] ?? 0} label={l} />
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer", zIndex: 2 }} onClick={() => scroll("overview")}>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: 2, textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: 1, height: 32, background: "linear-gradient(180deg,rgba(249,115,22,0.6),transparent)", animation: "float 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* Trip Overview */}
      <section id="overview" style={{ padding: "80px 5%" }}>
        <FadeIn>
          <SectionTitle dark={dark} title="Trip Overview" subtitle="Everything you need to know at a glance" />
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20, marginTop: 40 }}>
          {[
            { icon: "📍", label: "Origin", val: "Shamgarh, MP" },
            { icon: "🏁", label: "Destination", val: "Katra, Jammu" },
            { icon: "📅", label: "Departure", val: "7 July 2026" },
            { icon: "🕘", label: "Time", val: "9:00 PM" },
            { icon: "👥", label: "Travelers", val: "9 Members" },
            { icon: "🗓️", label: "Duration", val: "7 Days" },
          ].map((s, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <div className="card-hover" style={{ background: card, border: `1px solid ${border}`, borderRadius: 20, padding: "28px 24px", textAlign: "center", backdropFilter: "blur(8px)" }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{s.icon}</div>
                <div style={{ fontSize: 12, color: sub, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#f97316" }}>{s.val}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Itinerary */}
      <section id="itinerary" style={{ padding: "80px 5%", background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
        <FadeIn>
          <SectionTitle dark={dark} title="Day-wise Itinerary" subtitle="Your complete journey, planned with love" />
        </FadeIn>

        {/* Day selector */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", margin: "36px 0" }}>
          {ITINERARY.map((d, i) => (
            <button key={i} onClick={() => setActiveDay(i)} style={{
              background: activeDay === i ? d.color : card,
              color: activeDay === i ? "#fff" : text,
              border: `1px solid ${activeDay === i ? d.color : border}`,
              borderRadius: 50, padding: "10px 22px", cursor: "pointer", fontWeight: 600, fontSize: 14,
              transition: "all 0.3s"
            }}>
              {d.icon} {d.day}
            </button>
          ))}
        </div>

        {/* Active day card */}
        <FadeIn key={activeDay}>
          <div style={{ maxWidth: 700, margin: "0 auto", background: card, border: `1px solid ${ITINERARY[activeDay].color}44`, borderRadius: 24, padding: 36, backdropFilter: "blur(12px)", boxShadow: `0 0 40px ${ITINERARY[activeDay].color}22` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <div style={{ fontSize: 48 }}>{ITINERARY[activeDay].icon}</div>
              <div>
                <div style={{ fontSize: 13, color: ITINERARY[activeDay].color, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1.5 }}>{ITINERARY[activeDay].day} · {ITINERARY[activeDay].date}</div>
                <div style={{ fontSize: 24, fontWeight: 700 }}>{ITINERARY[activeDay].title}</div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {ITINERARY[activeDay].items.map((item, j) => (
                <div key={j} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", borderRadius: 12 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: ITINERARY[activeDay].color, flexShrink: 0 }} />
                  <span style={{ fontSize: 15 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Journey Map */}
      <section id="map" style={{ padding: "80px 5%" }}>
        <FadeIn>
          <SectionTitle dark={dark} title="Journey Route" subtitle="Shamgarh → Katra → Amritsar → Home" />
        </FadeIn>
        <FadeIn delay={0.2}>
          <div style={{ maxWidth: 800, margin: "40px auto 0", position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24, position: "relative" }}>
              {["Shamgarh\nSGZ", "Katra\nJ&K", "Vaishno Devi\nSanctuary", "Amritsar\nPunjab", "Shamgarh\nSGZ"].map((loc, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flex: 1, minWidth: 100 }}>
                  <div style={{ width: 52, height: 52, borderRadius: "50%", background: `linear-gradient(135deg,#f97316,#facc15)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, boxShadow: "0 0 20px rgba(249,115,22,0.4)", animation: `float ${3 + i * 0.5}s ease-in-out ${i * 0.3}s infinite` }}>
                    {["🏠", "🚂", "🛕", "🕌", "🏠"][i]}
                  </div>
                  <div style={{ fontSize: 12, textAlign: "center", color: sub, whiteSpace: "pre-line" }}>{loc}</div>
                  {i < 4 && <div style={{ position: "absolute", display: "none" }}>→</div>}
                </div>
              ))}
              <div style={{ position: "absolute", top: 25, left: "10%", right: "10%", height: 2, background: "linear-gradient(90deg,#f97316,#facc15,#f97316)", borderRadius: 1, zIndex: -1 }} />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Places to Visit */}
      <section id="places" style={{ padding: "80px 5%", background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
        <FadeIn>
          <SectionTitle dark={dark} title="Places to Visit" subtitle="Sacred shrines, historic landmarks & vibrant bazaars" />
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24, marginTop: 40 }}>
          {PLACES.map((p, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="card-hover" style={{ background: card, border: `1px solid ${border}`, borderRadius: 20, padding: 28, backdropFilter: "blur(8px)" }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{p.icon}</div>
                <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: "#f97316" }}>{p.name}</div>
                <div style={{ fontSize: 14, color: sub, lineHeight: 1.7 }}>{p.desc}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Group Members */}
      <section id="members" style={{ padding: "80px 5%" }}>
        <FadeIn>
          <SectionTitle dark={dark} title="Our Group" subtitle="9 souls on a journey of faith and friendship" />
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 20, marginTop: 40, maxWidth: 860, margin: "40px auto 0" }}>
          {MEMBERS.map((m, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div className="card-hover" style={{ background: card, border: `1px solid ${border}`, borderRadius: 20, padding: "24px 16px", textAlign: "center", backdropFilter: "blur(8px)" }}>
                <div style={{ position: "relative", width: 60, height: 60, margin: "0 auto 12px" }}>
                  <div style={{ width: 60, height: 60, borderRadius: "50%", background: `hsl(${i * 40},70%,45%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700, color: "#fff", boxShadow: `0 4px 16px hsl(${i * 40},70%,45%,0.4)` }}>
                    {m.initials}
                  </div>
                  <div style={{ position: "absolute", bottom: -2, right: -2, fontSize: 16, background: card, borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${border}` }}>{m.emoji}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.3 }}>{m.name}</div>
                <div style={{ fontSize: 11, color: sub, marginTop: 4 }}>{m.role}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Packing Checklist */}
      <section id="packing" style={{ padding: "80px 5%", background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
        <FadeIn>
          <SectionTitle dark={dark} title="Packing Checklist" subtitle="Everything you need for a smooth yatra" />
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 24, marginTop: 40 }}>
          {PACKING.map((cat, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 20, padding: 28, backdropFilter: "blur(8px)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <span style={{ fontSize: 28 }}>{cat.icon}</span>
                  <span style={{ fontWeight: 700, fontSize: 17 }}>{cat.cat}</span>
                </div>
                {cat.items.map((item, j) => {
                  const key = `${i}-${j}`;
                  return (
                    <label key={j} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, cursor: "pointer" }}>
                      <div onClick={() => setChecklist(c => ({ ...c, [key]: !c[key] }))} style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${checklist[key] ? "#f97316" : border}`, background: checklist[key] ? "#f97316" : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                        {checklist[key] && <span style={{ color: "#fff", fontSize: 12 }}>✓</span>}
                      </div>
                      <span style={{ fontSize: 14, color: checklist[key] ? sub : text, textDecoration: checklist[key] ? "line-through" : "none", transition: "all 0.2s" }}>{item}</span>
                    </label>
                  );
                })}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Budget Planner */}
      <section id="budget" style={{ padding: "80px 5%" }}>
        <FadeIn>
          <SectionTitle dark={dark} title="Budget Planner" subtitle="Full trip cost breakdown for all 9 members" />
        </FadeIn>
        <FadeIn delay={0.2}>
          <div style={{ maxWidth: 700, margin: "40px auto 0" }}>
            {/* Summary cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 16, marginBottom: 32 }}>
              {[
                { label: "Grand Total", val: "₹29,490", icon: "💰", color: "#f97316" },
                { label: "Per Person", val: "₹3,278", icon: "👤", color: "#a855f7" },
                { label: "Members", val: "9", icon: "👥", color: "#10b981" },
                { label: "Duration", val: "7 Days", icon: "🗓️", color: "#3b82f6" },
              ].map((s, i) => (
                <div key={i} className="card-hover" style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, padding: "20px 16px", textAlign: "center", backdropFilter: "blur(8px)" }}>
                  <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
                  <div style={{ fontSize: 11, color: sub, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.val}</div>
                </div>
              ))}
            </div>

            {/* Itemized list */}
            {BUDGET.map((b, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", background: card, border: `1px solid ${border}`, borderRadius: 16, marginBottom: 10, backdropFilter: "blur(8px)" }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{b.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{b.item}</div>
                  <div style={{ fontSize: 12, color: sub, marginTop: 2 }}>{b.detail}</div>
                  <div style={{ height: 4, background: border, borderRadius: 2, marginTop: 8, overflow: "hidden" }}>
                    <div style={{ width: `${(b.est / 29490) * 100}%`, height: "100%", background: `linear-gradient(90deg,#f97316,#facc15)`, borderRadius: 2 }} />
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontWeight: 700, color: "#f97316", fontSize: 16 }}>₹{b.est.toLocaleString()}</div>
                  <div style={{ fontSize: 11, color: sub }}>{Math.round((b.est / 29490) * 100)}%</div>
                </div>
              </div>
            ))}

            {/* Grand total bar */}
            <div style={{ background: "linear-gradient(135deg,rgba(249,115,22,0.15),rgba(250,204,21,0.1))", border: "1px solid rgba(249,115,22,0.4)", borderRadius: 16, padding: "24px 24px", marginTop: 4 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 18 }}>Grand Total</div>
                  <div style={{ fontSize: 13, color: sub, marginTop: 2 }}>For all 9 members · 7 days</div>
                </div>
                <div style={{ fontWeight: 800, fontSize: 28, color: "#f97316" }}>₹29,490</div>
              </div>
              <div style={{ height: 1, background: border, margin: "12px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 14, color: sub }}>Cost per person (÷ 9)</div>
                <div style={{ fontWeight: 700, fontSize: 20, color: "#facc15" }}>≈ ₹3,278</div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Train Info */}
      <section id="train" style={{ padding: "80px 5%", background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
        <FadeIn>
          <SectionTitle dark={dark} title="Train Information" subtitle="All aboard the Yatra Express!" />
        </FadeIn>
        <FadeIn delay={0.2}>
          <div style={{ maxWidth: 640, margin: "40px auto 0", background: card, border: "1px solid rgba(249,115,22,0.3)", borderRadius: 24, padding: 36, backdropFilter: "blur(12px)" }}>
            <div style={{ fontSize: 48, textAlign: "center", marginBottom: 24 }}>🚂</div>
            {[
              ["From", "Shamgarh (SGZ)"],
              ["To", "Katra (SVDK)"],
              ["Departure Date", "7 July 2026"],
              ["Departure Time", "9:00 PM"],
              ["Return Train", "Amritsar → SGZ"],
              ["Return Departure", "13 July · 7:20 AM"],
              ["Class", "Sleeper / 3AC"],
              ["Travelers", "9 Members"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: `1px solid ${border}` }}>
                <span style={{ color: sub, fontSize: 14 }}>{k}</span>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{v}</span>
              </div>
            ))}
            <div style={{ marginTop: 24, textAlign: "center" }}>
              <a href="https://www.irctc.co.in" target="_blank" rel="noreferrer" style={{ display: "inline-block", background: "linear-gradient(135deg,#f97316,#ea580c)", color: "#fff", border: "none", borderRadius: 50, padding: "12px 28px", fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
                Book on IRCTC →
              </a>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "80px 5%" }}>
        <FadeIn>
          <SectionTitle dark={dark} title="Frequently Asked Questions" subtitle="Quick answers for a smooth yatra" />
        </FadeIn>
        <div style={{ maxWidth: 700, margin: "40px auto 0" }}>
          {FAQS.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} i={i} dark={dark} card={card} border={border} sub={sub} />)}
        </div>
      </section>

      {/* Emergency Contacts */}
      <section id="emergency" style={{ padding: "80px 5%", background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
        <FadeIn>
          <SectionTitle dark={dark} title="Emergency Contacts" subtitle="Stay safe — save these numbers" />
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, maxWidth: 800, margin: "40px auto 0" }}>
          {[
            { icon: "🆘", name: "Emergency", num: "112" },
            { icon: "🏥", name: "Medical", num: "108" },
            { icon: "👮", name: "Police", num: "100" },
            { icon: "🔥", name: "Fire", num: "101" },
            { icon: "🛕", name: "Vaishno Devi", num: "01991-234567" },
            { icon: "📞", name: "Daksh Kalra (Organizer)", num: "7440323783" },
          ].map((e, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="card-hover" style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, padding: 20, textAlign: "center", backdropFilter: "blur(8px)" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{e.icon}</div>
                <div style={{ fontSize: 13, color: sub, marginBottom: 4 }}>{e.name}</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: "#f97316" }}>{e.num}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* QR Registration */}
      <section id="contact" style={{ padding: "80px 5%" }}>
        <FadeIn>
          <SectionTitle dark={dark} title="Join the Yatra" subtitle="Register your interest and get all trip updates" />
        </FadeIn>
        <FadeIn delay={0.15}>
          <div style={{ maxWidth: 560, margin: "32px auto 0", background: "linear-gradient(135deg,rgba(249,115,22,0.12),rgba(168,85,247,0.08))", border: "1px solid rgba(249,115,22,0.35)", borderRadius: 24, padding: "32px 36px", backdropFilter: "blur(12px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 24 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg,#f97316,#facc15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 800, color: "#fff", flexShrink: 0, boxShadow: "0 4px 20px rgba(249,115,22,0.4)" }}>DK</div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800 }}>Daksh Kalra</div>
                <div style={{ fontSize: 13, color: sub, marginTop: 2 }}>Trip Organizer · Son of Bodhraj Kalra</div>
                <div style={{ fontSize: 14, color: "#f97316", fontWeight: 600, marginTop: 4 }}>📱 7440323783</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, marginBottom: 28, flexWrap: "wrap" }}>
              <a href="tel:7440323783" className="glow-btn" style={{ flex: 1, minWidth: 140, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "linear-gradient(135deg,#f97316,#ea580c)", color: "#fff", borderRadius: 12, padding: "13px 20px", fontSize: 15, fontWeight: 700, textDecoration: "none" }}>
                📞 Call Now
              </a>
              <a href="https://wa.me/917440323783?text=Hi%20Daksh!%20I%20want%20to%20join%20the%20Vaishno%20Devi%20Yatra%202026%20🛕" target="_blank" rel="noreferrer" className="glow-btn" style={{ flex: 1, minWidth: 140, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "linear-gradient(135deg,#25d366,#128c7e)", color: "#fff", borderRadius: 12, padding: "13px 20px", fontSize: 15, fontWeight: 700, textDecoration: "none" }}>
                💬 WhatsApp
              </a>
            </div>
            <div style={{ height: 1, background: border, marginBottom: 24 }} />
            <p style={{ color: sub, fontSize: 14, marginBottom: 20, textAlign: "center" }}>Or fill the form below to register and receive all updates, itinerary PDFs, and emergency contacts.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <input placeholder="Your Name" style={{ background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)", border: `1px solid ${border}`, borderRadius: 12, padding: "14px 18px", fontSize: 15, color: text, outline: "none", width: "100%" }} />
              <input placeholder="Phone Number" style={{ background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)", border: `1px solid ${border}`, borderRadius: 12, padding: "14px 18px", fontSize: 15, color: text, outline: "none", width: "100%" }} />
              <input placeholder="Email Address" style={{ background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)", border: `1px solid ${border}`, borderRadius: 12, padding: "14px 18px", fontSize: 15, color: text, outline: "none", width: "100%" }} />
              <button className="glow-btn" style={{ background: "linear-gradient(135deg,#f97316,#ea580c)", color: "#fff", border: "none", borderRadius: 12, padding: "15px", fontSize: 16, fontWeight: 700, cursor: "pointer", marginTop: 4 }}>
                Register for Yatra 🚩
              </button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Footer */}
      <footer style={{ padding: "48px 5% 32px", background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.03)", borderTop: `1px solid ${border}`, textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>🛕</div>
        <div style={{ fontSize: 20, fontWeight: 700, background: "linear-gradient(90deg,#f97316,#facc15)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 8 }}>
          Vaishno Devi & Amritsar Yatra 2026
        </div>
        <p style={{ color: sub, fontSize: 14, marginBottom: 24 }}>Shamgarh → Katra → Amritsar · 7–13 July 2026 · 9 Members</p>
        <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
          {navLinks.map(([id, label]) => (
            <span key={id} className="nav-link" onClick={() => scroll(id)} style={{ color: sub, fontSize: 14 }}>{label}</span>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${border}`, paddingTop: 24 }}>
          <div style={{ color: sub, fontSize: 13, marginBottom: 6 }}>
            Jai Mata Di 🙏 · Shri Mata Vaishno Devi & Amritsar Yatra 2026
          </div>
          <div style={{ fontSize: 13, color: sub, marginBottom: 4 }}>
            Made with ❤️ by <span style={{ color: "#f97316", fontWeight: 700 }}>DeveloperDaksh</span>
          </div>
          <div style={{ fontSize: 12, color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.35)" }}>
            Developed by <strong style={{ color: "#facc15" }}>Daksh Kalra</strong> · Son of Bodhraj Kalra · 📱 7440323783
          </div>
        </div>
      </footer>

      {/* Back to top */}
      {top && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="glow-btn" style={{ position: "fixed", bottom: 32, right: 24, width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg,#f97316,#ea580c)", border: "none", color: "#fff", fontSize: 20, cursor: "pointer", zIndex: 998, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(249,115,22,0.5)" }}>
          ↑
        </button>
      )}
    </div>
  );
}

function SectionTitle({ dark, title, subtitle }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 8 }}>
      <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, margin: "0 0 12px", background: "linear-gradient(135deg,#f97316,#facc15)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{title}</h2>
      <p style={{ fontSize: 16, color: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)", margin: 0 }}>{subtitle}</p>
    </div>
  );
}

function FAQItem({ q, a, i, dark, card, border, sub }) {
  const [open, setOpen] = useState(false);
  return (
    <FadeIn delay={i * 0.07}>
      <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, marginBottom: 12, overflow: "hidden", backdropFilter: "blur(8px)", transition: "all 0.3s" }}>
        <div onClick={() => setOpen(!open)} style={{ padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontWeight: 600, fontSize: 15 }}>
          <span>{q}</span>
          <span style={{ color: "#f97316", fontSize: 20, transition: "transform 0.3s", transform: open ? "rotate(45deg)" : "none" }}>+</span>
        </div>
        {open && (
          <div style={{ padding: "0 24px 18px", color: sub, fontSize: 14, lineHeight: 1.7 }}>{a}</div>
        )}
      </div>
    </FadeIn>
  );
}
