import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import profileImg from "./assets/me.png";
import profileImgMobile from "./assets/me2.png";
import bePoster from "./assets/BE badminton Poster/BE badminton Poster.png";
import beLogo from "./assets/BE badminton Poster/bebadmintonlogo.jpg";
import poster10 from "./assets/BE badminton Poster/10.png";
import poster11 from "./assets/BE badminton Poster/11.png";
import poster65 from "./assets/BE badminton Poster/65.png";
import dinoGameImg from "./assets/dino.png";
import gasManagementImg from "./assets/gas.png";
import weatherImg from "/weather_analyzer.png";
import beBadmintonImg from "/be_badminton.png";
import beUI from "/be_ui.png";



const COLORS = {
  bg: "#000000",
  surface: "#080808",
  card: "#0d0d0d",
  border: "#1a1a1a",
  accent: "#4df0c0",
  accent2: "#4db8f0",
  accent3: "#f0c04d",
  text: "#dce4f0",
  muted: "#5a6478",
  white: "#f0f4ff",
};

const skills = [
  {
    icon: "⬡",
    title: "Frontend Dev",
    desc: "Building performant, pixel-perfect interfaces. Clean, maintainable code with thoughtful micro-interactions that elevate user experience.",
    tags: ["HTML/CSS", "JavaScript", "React", "Tailwind"],
    color: COLORS.accent,
  },
  {
    icon: "◎",
    title: "Data Analyst",
    desc: "Turning messy datasets into clear narratives. Dashboards, statistical analysis, and visualizations that drive real decisions.",
    tags: ["Python", "Pandas", "SQL", "Matplotlib"],
    color: COLORS.accent2,
  },
  {
    icon: "◈",
    title: "UI/UX Design",
    desc: "Designing interfaces people actually enjoy. From wireframes to high-fidelity prototypes with a strong sense of visual hierarchy.",
    tags: ["Figma", "Prototyping", "Research", "Design Systems"],
    color: COLORS.accent3,
  },
];

const projects = [
  {
    num: "01",
    name: "Dino Game",
    desc: "A fast-paced endless runner built on Scratch, featuring classic arcade mechanics and progressive difficulty.",
    type: "Scratch",
    year: "2025",
    color: COLORS.accent,
    img: dinoGameImg,
    imgAlt: "Dino Game gameplay",
    path: "/project/dinogame",
  },
  {
    num: "02",
    name: "Gas Management System",
    desc: "This Gas Management System is a terminal-based administrative tool built in C for a first-year project. It streamlines gas station operations through a functional, role-based interface.",
    type: "C Programming",
    year: "2025",
    color: COLORS.accent2,
    img: gasManagementImg,
    imgAlt: "UI design mockup on screen",
  },
  {
    num: "03",
    name: "Weather Analyzer",
    desc: "An OOP-driven Python application that processes Kaggle weather datasets. Features a modular class structure for automated data cleaning, statistical analysis, and trend visualization.",
    type: "Python / Analytics",
    year: "2026",
    color: "#b04df0",
    img: weatherImg,
    imgAlt: "Stock market data and predictions",
  },
  {
    num: "04",
    name: "Be Badminton Website",
    desc: "A React e-commerce platform for badminton gear. Features a modular architecture, persistent shopping cart, and a custom admin dashboard with a high-tech minimalist design",
    type: "Frontend",
    year: "2026",
    color: COLORS.accent3,
    img: beBadmintonImg,
    imgAlt: "Finance app UI on laptop",
  },
  {
    num: "05",
    name: "Be Badminton UX/UI",
    desc: "A UI/UX Design for badminton gear.",
    type: "UX/UI Design",
    year: "2026",
    color: COLORS.accent2,
    img: beUI,
    imgAlt: "Finance app UI on laptop",
  },
];

const businesses = [
  {
    name: "Be Badminton",
    desc: "Your premier destination for high-quality badminton gear and accessories. We empower players to reach their peak performance with elite equipment and expert service. Bringing the best badminton products directly to the community.",
    services: ["Badminton Rackets", "Shuttlecocks", "Custom Stringing", "Sports Apparel"],
    links: [
      { type: "tiktok", url: "https://www.tiktok.com/@be_withu3" },
      { type: "facebook", url: "https://www.facebook.com/profile.php?id=61581383279455" }
    ],
    logo: beLogo,
    poster: bePoster,
    gallery: [bePoster, poster65, poster10, poster11],
    color: COLORS.accent,
  },
];

const contacts = [
  { icon: "mail", label: "Email", value: "layheangrin@gmail.com", href: "mailto:layheangrin@gmail.com", target: "_blank" },
  { icon: "code", label: "GitHub", value: "github.com/RinLayheang", href: "https://github.com/RinLayheang", target: "_blank" },
  { icon: "link", label: "LinkedIn", value: "linkedin.com/in/rin-layheang", href: "https://www.linkedin.com/in/rin-layheang-7aab5a334", target: "_blank" },
  { icon: "public", label: "Facebook", value: "facebook.com/rinn.layheang", href: "https://www.facebook.com/rinn.layheang.2025", target: "_blank" },
];

/* ── Hooks ── */
// Ref-based mouse position — zero re-renders, RAF-driven DOM updates only
function useMousePosition() {
  const posRef = useRef({ x: -100, y: -100 });
  useEffect(() => {
    const h = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", h, { passive: true });
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return posRef; // consumers read posRef.current inside RAF loops
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return y;
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useScrollDirection() {
  const [dir, setDir] = useState("up");
  const lastScroll = useRef(0);
  useEffect(() => {
    const h = () => {
      const current = window.scrollY;
      if (current < 10) { setDir("up"); return; }
      if (current > lastScroll.current && current > 100) setDir("down");
      else if (current < lastScroll.current) setDir("up");
      lastScroll.current = current;
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return dir;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth <= 768);
    h();
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return isMobile;
}

/* ── Cursor ── */
function Cursor({ mouseRef }) {
  const dotEl = useRef(null);
  const ringEl = useRef(null);
  const ring = useRef({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const rafRef = useRef();

  useEffect(() => {
    const handleMouseOver = (e) => {
      const isInteractive = !!e.target.closest('a, button, [role="button"], .interactive, [onmouseenter]');
      setHovered(isInteractive);
    };
    window.addEventListener("mouseover", handleMouseOver);
    return () => window.removeEventListener("mouseover", handleMouseOver);
  }, []);

  useEffect(() => {
    const animate = () => {
      const { x, y } = mouseRef.current;
      // dot snaps instantly
      if (dotEl.current) {
        dotEl.current.style.left = x + "px";
        dotEl.current.style.top = y + "px";
      }
      // ring lags behind smoothly
      ring.current.x += (x - ring.current.x) * 0.1;
      ring.current.y += (y - ring.current.y) * 0.1;
      if (ringEl.current) {
        ringEl.current.style.left = ring.current.x + "px";
        ringEl.current.style.top = ring.current.y + "px";
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [mouseRef]);

  return (
    <>
      <div ref={dotEl} className="cursor-el" style={{
        position: "fixed", width: 8, height: 8,
        background: COLORS.accent, borderRadius: "50%",
        pointerEvents: "none", zIndex: 9999,
        transform: `translate(-50%,-50%) scale(${hovered ? 0 : 1})`,
        opacity: hovered ? 0 : 1,
        mixBlendMode: "difference",
        transition: "transform 0.3s ease, opacity 0.3s ease",
      }} />
      <div ref={ringEl} className="cursor-el" style={{
        position: "fixed", width: 32, height: 32,
        border: `1px solid ${COLORS.accent}`,
        borderRadius: "50%", pointerEvents: "none", zIndex: 9998,
        transform: `translate(-50%,-50%) scale(${hovered ? 2.5 : 1})`,
        opacity: hovered ? 0.2 : 0.45,
        transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease",
      }} />
    </>
  );
}

/* ── FadeIn wrapper ── */
function Reveal({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(36px)",
      transition: `opacity 0.85s ${delay}s ease, transform 0.85s ${delay}s ease`,
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ── Animated counter ── */
function Counter({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  const [ref, inView] = useInView();
  useEffect(() => {
    if (!inView) return;
    if (isNaN(target)) { setVal(target); return; }
    let start = 0;
    const step = () => {
      start += Math.ceil((target - start) / 8) || 1;
      setVal(start);
      if (start < target) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);
  return <span ref={ref}>{isNaN(target) ? target : val}{suffix}</span>;
}

/* ── Marquee ── */
function Marquee() {
  const items = ["DATA ANALYST", "UI/UX DESIGN", "PYTHON", "REACT", "SQL", "FIGMA", "MACHINE LEARNING", "FRONTEND DEV", "DATA SCIENCE"];
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}`, background: COLORS.bg, padding: "18px 0", position: "relative", zIndex: 10 }}>
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
      <div style={{ display: "flex", whiteSpace: "nowrap", animation: "marquee 35s linear infinite" }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 700, letterSpacing: "0.15em", color: "#6e778a", padding: "0 40px", display: "flex", alignItems: "center", gap: 40 }}>
            {item}<span style={{ color: COLORS.accent, fontSize: 14 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Nav ── */
function Nav({ scrollY }) {
  const sections = ["about", "skills", "projects", "business", "contact"];
  const dir = useScrollDirection();
  const isMobile = useIsMobile();
  const scrolled = scrollY > 60;
  const isHidden = isMobile && dir === "down";

  return (
    <nav className="nav-container" style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "22px 56px",
      borderBottom: `1px solid ${scrolled ? COLORS.border : "transparent"}`,
      backdropFilter: scrolled ? "blur(20px)" : "none",
      background: scrolled ? "rgba(0,0,0,0.85)" : "transparent",
      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      transform: isHidden ? "translateY(-100%)" : "translateY(0)",
    }}>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: "0.1em", color: COLORS.accent }}>LAYHEANG</div>
      <div className="nav-links" style={{ display: "flex", gap: 36 }}>
        {sections.map(s => (
          <a key={s} href={`#${s}`} style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: COLORS.muted, textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => e.target.style.color = COLORS.accent}
            onMouseLeave={e => e.target.style.color = COLORS.muted}>
            {s}
          </a>
        ))}
      </div>
    </nav>
  );
}

/* ── Hero ── */
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);
  const anim = (delay) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(32px)",
    transition: `opacity 1s ${delay}s ease, transform 1s ${delay}s ease`,
  });

  return (
    <section id="home" className="hero-section" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 8%", position: "relative", overflow: "hidden" }}>
      {/* Grid BG */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(rgba(77,240,192,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(77,240,192,0.03) 1px,transparent 1px)`,
        backgroundSize: "60px 60px",
        WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%,black 0%,transparent 100%)",
        maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%,black 0%,transparent 100%)",
        zIndex: 0,
      }} />

      <div className="hero-content" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 2, width: "100%" }}>
        <div style={{ flex: 1 }} className="hero-text">
          <div style={{ ...anim(0.1), fontFamily: "monospace", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: COLORS.accent, marginBottom: 28, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 30, height: 1, background: COLORS.accent }} /> Portfolio · Data Science · CADT
          </div>
          <h1 style={{ ...anim(0.3), fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(80px, 15vw, 180px)", lineHeight: 0.82, letterSpacing: "-0.01em", margin: 0, textTransform: "uppercase" }}>
            <span style={{ color: COLORS.white }}>Rin</span><br />
            <span style={{ color: COLORS.accent }}>Layheang</span>
          </h1>
          <p style={{ ...anim(0.5), fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(20px, 3.5vw, 42px)", color: COLORS.muted, marginTop: 24, letterSpacing: "0.02em" }}>
            2nd Year Data Science Student
          </p>
        </div>

        <div className="hero-image-container" style={{ ...anim(0.4), position: "relative", flex: "0 0 55%", display: "flex", justifyContent: "center", transform: "translateY(60px)" }}>
          {/* Subtle Glow behind image */}
          <div style={{ position: "absolute", inset: "0", background: `radial-gradient(circle, ${COLORS.accent}12 0%, transparent 70%)`, filter: "blur(50px)", zIndex: -1 }} />
          <picture style={{ width: "100%", height: "auto" }}>
            <source media="(max-width: 768px)" srcSet={profileImgMobile} />
            <img src={profileImg} alt="Rin Layheang" style={{ width: "100%", height: "auto", objectFit: "contain", filter: "drop-shadow(0 20px 40px rgba(70, 159, 144, 0.4))" }} />
          </picture>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="hero-bottom" style={{ position: "absolute", bottom: 60, left: "8%", right: "8%", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <p className="hero-desc" style={{ ...anim(0.7), maxWidth: 280, fontFamily: "monospace", fontSize: 12, lineHeight: 1.8, color: COLORS.muted, textAlign: "left" }}>
          Turning raw data into meaningful stories — through analysis, interfaces, and design. Based in Phnom Penh, Cambodia.
        </p>
        <div className="hero-scroll-wrapper">
          <ScrollIndicator loaded={loaded} />
        </div>
      </div>
    </section>
  );
}

function ScrollIndicator({ loaded }) {
  return (
    <div style={{
      opacity: loaded ? 1 : 0,
      transform: loaded ? "translateY(0)" : "translateY(20px)",
      transition: "all 1s 1s ease",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
      fontFamily: "monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.muted
    }}>
      <style>{`@keyframes scrollPulse{0%,100%{transform:scaleY(0.7);opacity:0.3}50%{transform:scaleY(1);opacity:1}}`}</style>
      SCROLL
      <div style={{ width: 1, height: 48, background: `linear-gradient(to bottom,${COLORS.accent},transparent)`, transformOrigin: "top", animation: "scrollPulse 2s infinite" }} />
    </div>
  );
}

/* ── About ── */
function About() {
  const stats = [
    { num: "2nd", label: "Year at CADT" },
    { num: 3, label: "Disciplines" },
    { icon: "all_inclusive", label: "Curiosity" },
    { num: "KH", label: "Phnom Penh" },
  ];
  return (
    <section id="about" className="about-section section-padding" style={{ padding: "140px 56px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
      <Reveal>
        <SectionLabel>About Me</SectionLabel>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(34px,3.5vw,52px)", lineHeight: 1.1, color: COLORS.white, marginBottom: 26 }}>
          Crafting with <em style={{ color: COLORS.accent, fontStyle: "italic" }}>data</em> & design.
        </h2>
        <p style={{ fontFamily: "monospace", fontSize: 13, lineHeight: 1.9, color: COLORS.muted, marginBottom: 14 }}>
          I'm a 2nd year Data Science student at the Cambodia Academy of Digital Technology (CADT), passionate about the intersection of data, design, and technology.
        </p>
        <p style={{ fontFamily: "monospace", fontSize: 13, lineHeight: 1.9, color: COLORS.muted, marginBottom: 32 }}>
          I believe great interfaces tell stories — and great data does too. My work bridges analytical thinking with visual communication.
        </p>
        <CtaButton href="#contact">Get in Touch →</CtaButton>
      </Reveal>
      <Reveal delay={0.15}>
        <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          {stats.map((s, i) => <StatCard key={i} {...s} />)}
        </div>
      </Reveal>
    </section>
  );
}

function StatCard({ num, icon, label }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} className="interactive"
      style={{ background: hov ? "#161b22" : COLORS.card, border: `1px solid ${hov ? COLORS.accent : COLORS.border}`, padding: "28px 24px", transition: "all 0.3s" }}>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, color: COLORS.accent, lineHeight: 1, display: "flex", alignItems: "center", minHeight: 52 }}>
        {icon ? (
          <span className="material-symbols-outlined" style={{ fontSize: 48 }}>{icon}</span>
        ) : (
          <Counter target={num} />
        )}
      </div>
      <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: COLORS.muted, marginTop: 6 }}>{label}</div>
    </div>
  );
}

/* ── Skills ── */
function Skills() {
  return (
    <section id="skills" className="section-padding" style={{ padding: "0 56px 140px" }}>
      <Reveal>
        <SectionLabel>What I Do</SectionLabel>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(52px,7vw,100px)", lineHeight: 1, color: COLORS.white, marginBottom: 56 }}>
          Skills &<br />Expertise
        </h2>
      </Reveal>
      <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
        {skills.map((s, i) => <SkillCard key={i} {...s} delay={i * 0.12} />)}
      </div>
    </section>
  );
}

function SkillCard({ icon, title, desc, tags, color, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={delay}>
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} className="interactive"
        style={{ background: hov ? "#14181f" : COLORS.card, border: `1px solid ${hov ? color : COLORS.border}`, padding: "40px 32px", position: "relative", overflow: "hidden", transition: "all 0.4s", height: "100%" }}>
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg,${color}0a 0%,transparent 60%)`, opacity: hov ? 1 : 0, transition: "opacity 0.4s" }} />
        <div style={{ fontSize: 34, marginBottom: 18, color }}>{icon}</div>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: "0.04em", color: COLORS.white, marginBottom: 14 }}>{title}</div>
        <p style={{ fontFamily: "monospace", fontSize: 12, lineHeight: 1.85, color: COLORS.muted, marginBottom: 24 }}>{desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {tags.map((t, i) => (
            <span key={i} style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", padding: "5px 12px", border: `1px solid ${hov ? color + "55" : COLORS.border}`, color: hov ? color : COLORS.muted, transition: "all 0.3s" }}>{t}</span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/* ── Projects ── */
function Projects() {
  return (
    <section id="projects" className="section-padding" style={{ padding: "0 56px 140px" }}>
      <Reveal>
        <SectionLabel>Work</SectionLabel>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(52px,7vw,100px)", lineHeight: 1, color: COLORS.white, marginBottom: 60 }}>
          Selected<br />Projects
        </h2>
      </Reveal>
      {/* Featured top row: 2 wide cards */}
      <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, marginBottom: 3 }}>
        {projects.slice(0, 2).map((p, i) => <ProjectCard key={i} {...p} delay={i * 0.1} />)}
      </div>
      {/* Bottom row: 2 wide + list hybrid */}
      <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
        {projects.slice(2, 4).map((p, i) => <ProjectCard key={i} {...p} delay={0.2 + i * 0.1} />)}
      </div>
      <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 3 }}>
        {projects.slice(4, 5).map((p, i) => <ProjectCard key={i} {...p} delay={0.2 + i * 0.1} />)}
      </div>
    </section>
  );
}

function ProjectCard({ num, name, desc, type, year, color, img, imgAlt, delay, path }) {
  const [hov, setHov] = useState(false);
  const CardContent = (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="interactive"
      style={{
        background: COLORS.card,
        border: `1px solid ${hov ? color : COLORS.border}`,
        overflow: "hidden",
        position: "relative",
        transition: "border-color 0.4s",
        cursor: "none",
        height: "100%",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", overflow: "hidden", aspectRatio: "1.9 / 1" }}>
        <img
          src={img}
          alt={imgAlt}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transform: hov ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.6s ease",
            display: "block",
          }}
        />
        {/* Dark overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(to bottom, transparent 30%, ${COLORS.bg}dd 100%)`,
        }} />
        {/* Color tint on hover */}
        <div style={{
          position: "absolute", inset: 0,
          background: color + "22",
          opacity: hov ? 1 : 0,
          transition: "opacity 0.4s",
        }} />
        {/* Type badge top-right */}
        <div style={{
          position: "absolute", top: 16, right: 16,
          fontFamily: "monospace", fontSize: 10, letterSpacing: "0.15em",
          textTransform: "uppercase", color: color,
          border: `1px solid ${color}55`,
          background: COLORS.bg + "cc",
          padding: "4px 12px",
          backdropFilter: "blur(8px)",
        }}>{type}</div>
        {/* Number top-left */}
        <div style={{
          position: "absolute", top: 16, left: 16,
          fontFamily: "'Bebas Neue', sans-serif", fontSize: 15,
          letterSpacing: "0.1em", color: COLORS.muted,
        }}>{num}</div>
      </div>

      {/* Content */}
      <div style={{ padding: "24px 28px 28px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 19, color: COLORS.white, lineHeight: 1.25 }}>{name}</div>
          <span className="material-symbols-outlined" style={{
            fontSize: 20, color: hov ? color : COLORS.muted,
            transform: hov ? "translate(2px,-2px)" : "none",
            transition: "all 0.2s", flexShrink: 0,
          }}>north_east</span>
        </div>
        <p style={{ fontFamily: "monospace", fontSize: 12, color: COLORS.muted, lineHeight: 1.7, marginBottom: 18 }}>{desc}</p>
        {/* Bottom row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ width: 32, height: 1, background: `linear-gradient(to right,${color},transparent)` }} />
          <span style={{ fontFamily: "monospace", fontSize: 11, color: COLORS.muted }}>{year}</span>
        </div>
      </div>

      {/* Left accent bar */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 3,
        background: color,
        transform: hov ? "scaleY(1)" : "scaleY(0)",
        transformOrigin: "top",
        transition: "transform 0.4s ease",
      }} />
    </div>
  );

  return (
    <Reveal delay={delay}>
      {path ? (
        <Link to={path} style={{ textDecoration: "none", cursor: "none" }}>
          {CardContent}
        </Link>
      ) : (
        CardContent
      )}
    </Reveal>
  );
}

/* ── Business ── */
function Business({ setFullscreenImg }) {
  return (
    <section id="business" className="section-padding" style={{ padding: "0 56px 140px" }}>
      <Reveal>
        <SectionLabel>My own business</SectionLabel>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(52px,7vw,100px)", lineHeight: 1, color: COLORS.white, marginBottom: 56 }}>
          Ventures &<br />Entrepreneurship
        </h2>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 3 }}>
        {businesses.map((b, i) => <BusinessCard key={i} {...b} delay={i * 0.1} setFullscreenImg={setFullscreenImg} />)}
      </div>
    </section>
  );
}

function BusinessCard({ name, desc, services, links, logo, poster, gallery, color, delay, setFullscreenImg }) {
  const [hov, setHov] = useState(false);
  const scrollRef = useRef(null);

  // Manual Drag to Scroll
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);
  const dragDistance = useRef(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragDistance.current = 0;
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setStartScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll speed
    dragDistance.current = Math.abs(walk);
    scrollRef.current.scrollLeft = startScrollLeft - walk;
  };

  const handleImageClick = (images, index) => {
    // Only open if they didn't drag
    if (dragDistance.current < 10) {
      setFullscreenImg({ images, index });
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let rafId;
    let direction = 1;
    let currentScroll = el.scrollLeft;
    const speed = 0.5;

    const animate = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (!isDragging && maxScroll > 0) {
        currentScroll += speed * direction;
        if (currentScroll >= maxScroll) {
          currentScroll = maxScroll;
          direction = -1;
        } else if (currentScroll <= 0) {
          currentScroll = 0;
          direction = 1;
        }
        el.scrollLeft = currentScroll;
      } else {
        currentScroll = el.scrollLeft;
      }
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [hov, isDragging]);

  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        className="interactive business-card"
        style={{
          background: COLORS.card,
          border: `1px solid ${hov ? color : COLORS.border}`,
          padding: "48px 40px",
          position: "relative",
          transition: "all 0.3s",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          gap: 32
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${color}0a 0%, transparent 50%)`, opacity: hov ? 1 : 0, transition: "opacity 0.4s" }} />

        {/* Top Header Row with Logo on Left */}
        <div className="business-header" style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "flex-start", gap: 24 }}>
          {logo && (
            <div style={{ flexShrink: 0 }}>
              <img src={logo} alt="Logo" style={{ width: 80, height: 80, borderRadius: "50%", border: `2px solid ${color}`, padding: 4, background: COLORS.surface }} />
            </div>
          )}
          <div style={{ flex: 1 }}>
            <div className="business-name" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, color: COLORS.white, marginBottom: 16, letterSpacing: "0.02em" }}>{name}</div>
            <div className="business-links" style={{ display: "flex", gap: 20, marginBottom: 14 }}>
              {links.map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                  style={{ color: hov ? color : COLORS.muted, transition: "color 0.3s", display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
                  {link.type === 'tiktok' ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.92-.35-2.81.07-.67.32-1.28.87-1.58 1.56-.57 1.08-.29 2.48.62 3.32.74.77 1.84 1.06 2.87.92 1.09-.13 2.13-.88 2.53-1.94.1-.22.18-.44.23-.67.05-2.45.02-4.9.03-7.35z" /></svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                  )}
                  <span style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}>{link.type}</span>
                </a>
              ))}
            </div>
            <p className="business-desc" style={{ fontFamily: "monospace", fontSize: 13, color: COLORS.muted, lineHeight: 1.8, maxWidth: "85%" }}>{desc}</p>
          </div>
        </div>

        {/* Services & Links */}
        <div className="business-services" style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 14 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {services.map((s, i) => (
              <span key={i} style={{
                fontFamily: "monospace", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
                padding: "6px 14px", border: `1px solid ${hov ? color + "44" : COLORS.border}`, color: hov ? color : COLORS.muted,
                transition: "all 0.3s"
              }}>{s}</span>
            ))}
          </div>

        </div>

        {/* Horizontal Scroll Gallery (Figma/Insta style) */}
        <div className="business-gallery-wrapper" style={{ position: "relative", zIndex: 1, margin: "0 -40px" }}>
          <div
            className="business-gallery"
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onTouchCancel={() => setIsDragging(false)}
            style={{
              display: "flex",
              gap: 20,
              overflowX: "auto",
              padding: "0 40px",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              cursor: isDragging ? "grabbing" : "grab"
            }}
          >
            <style>{`.interactive div::-webkit-scrollbar { display: none; }`}</style>
            {(() => {
              const uniqueImages = [poster, ...(gallery || [])].filter((img, i, self) => self.indexOf(img) === i);
              return uniqueImages.map((img, i) => (
                <div key={i} className="interactive business-gallery-item" style={{ flex: "0 0 320px", height: "450px", overflow: "hidden", border: `1px solid ${COLORS.border}` }} onClick={() => handleImageClick(uniqueImages, i)}>
                  <img
                    src={img}
                    alt={`${name} work ${i}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                    onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
                    onMouseLeave={e => e.target.style.transform = "scale(1)"}
                  />
                </div>
              ));
            })()}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ── Contact ── */
function Contact() {
  return (
    <section id="contact" className="contact-section section-padding" style={{ padding: "0 56px 120px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
      <Reveal>
        <SectionLabel>Contact</SectionLabel>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(64px,9vw,120px)", lineHeight: 0.88, color: COLORS.white }}>
          Let's<br /><span style={{ color: COLORS.accent }}>Work.</span>
        </h2>
        <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 18, color: COLORS.muted, marginTop: 20 }}>
          Open to projects, collaborations & opportunities.
        </p>
      </Reveal>
      <Reveal delay={0.15}>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {contacts.map((c, i) => <ContactRow key={i} {...c} />)}
        </div>
      </Reveal>
    </section>
  );
}

function ContactRow({ icon, label, value, href, target }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target={target} rel="noopener noreferrer" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} className="interactive"
      style={{ background: hov ? "#101418" : COLORS.card, border: `1px solid ${hov ? COLORS.accent : COLORS.border}`, padding: "22px 26px", display: "flex", alignItems: "center", justifyContent: "space-between", textDecoration: "none", transition: "all 0.3s" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span className="material-symbols-outlined" style={{ fontSize: 22, color: COLORS.accent }}>{icon}</span>
        <div>
          <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: COLORS.muted }}>{label}</div>
          <div style={{ fontFamily: "monospace", fontSize: 13, color: COLORS.white, marginTop: 3 }}>{value}</div>
        </div>
      </div>
      <span className="material-symbols-outlined" style={{
        color: hov ? COLORS.accent : COLORS.muted,
        transform: hov ? "translate(2px,-2px)" : "none",
        transition: "all 0.2s",
        fontSize: 20
      }}>north_east</span>
    </a>
  );
}

/* ── Shared ── */
function SectionLabel({ children }) {
  return (
    <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: COLORS.accent, marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ display: "inline-block", width: 28, height: 1, background: COLORS.accent }} />
      {children}
    </div>
  );
}

function CtaButton({ href, children }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: "inline-flex", alignItems: "center", gap: 10, background: hov ? COLORS.accent2 : COLORS.accent, color: COLORS.bg, fontFamily: "monospace", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", padding: "15px 26px", textDecoration: "none", fontWeight: 600, transform: hov ? "translateY(-2px)" : "none", transition: "all 0.2s" }}>
      {children}
    </a>
  );
}

function Divider() {
  return <div style={{ height: 1, background: COLORS.border, margin: "0 56px" }} />;
}

function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${COLORS.border}`, padding: "28px 56px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 17, letterSpacing: "0.1em", color: COLORS.muted }}>RIN LAYHEANG</div>
      <div style={{ fontFamily: "monospace", fontSize: 11, color: COLORS.muted, letterSpacing: "0.1em" }}>© 2025 · Data Science · CADT · Phnom Penh</div>
    </footer>
  );
}

/* ── Root ── */
export default function Portfolio() {
  const mouseRef = useMousePosition(); // ref, not state — no re-renders
  const scrollY = useScrollY();
  const [fullscreenData, setFullscreenData] = useState(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!fullscreenData) return;
      if (e.key === 'Escape') setFullscreenData(null);
      if (e.key === 'ArrowRight' && fullscreenData.index < fullscreenData.images.length - 1) {
        setFullscreenData(prev => ({ ...prev, index: prev.index + 1 }));
      }
      if (e.key === 'ArrowLeft' && fullscreenData.index > 0) {
        setFullscreenData(prev => ({ ...prev, index: prev.index - 1 }));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenData]);

  return (
    <>
      {fullscreenData && (
        <div
          className="interactive"
          style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.95)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          onClick={() => setFullscreenData(null)}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setFullscreenData(null); }}
            style={{ position: 'absolute', top: 40, right: 40, background: 'none', border: 'none', color: COLORS.white, cursor: 'none', zIndex: 1001 }}
          >
            <span className="material-symbols-outlined interactive" style={{ fontSize: 36 }}>close</span>
          </button>

          {fullscreenData.index > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setFullscreenData(prev => ({ ...prev, index: prev.index - 1 })); }}
              style={{ position: 'absolute', left: 40, background: 'none', border: 'none', color: COLORS.white, cursor: 'none', zIndex: 1001 }}
            >
              <span className="material-symbols-outlined interactive" style={{ fontSize: 48 }}>chevron_left</span>
            </button>
          )}

          {fullscreenData.index < fullscreenData.images.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setFullscreenData(prev => ({ ...prev, index: prev.index + 1 })); }}
              style={{ position: 'absolute', right: 40, background: 'none', border: 'none', color: COLORS.white, cursor: 'none', zIndex: 1001 }}
            >
              <span className="material-symbols-outlined interactive" style={{ fontSize: 48 }}>chevron_right</span>
            </button>
          )}

          <img
            src={fullscreenData.images[fullscreenData.index]}
            style={{ maxWidth: '85%', maxHeight: '85%', objectFit: 'contain' }}
            alt="Fullscreen"
          />
        </div>
      )}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital,wght@1,400;1,700&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{background:${COLORS.bg};color:${COLORS.text};cursor:none;overflow-x:hidden;}
        body::before{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");pointer-events:none;z-index:1000;opacity:0.3;}
        a{cursor:none;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:${COLORS.bg};}
        ::-webkit-scrollbar-thumb{background:${COLORS.border};}

        @media (max-width: 1024px) {
          .nav-links { gap: 20px !important; }
          .hero-section { padding: 0 5% !important; }
          .about-section, .contact-section { grid-template-columns: 1fr !important; gap: 40px !important; }
          .skills-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
          .interactive[style*="display: grid"] { grid-template-columns: 1fr !important; }
        }

        @media (max-width: 768px) {
          body { cursor: default !important; }
          .cursor-el { display: none !important; }
          .nav-container { padding: 16px 24px !important; }
          .nav-links { display: none !important; }
          .hero-content { flex-direction: column !important; text-align: center !important; }
          .hero-text { flex: none !important; margin-bottom: 40px !important; }
          .hero-image-container { flex: none !important; width: 80% !important; transform: translateY(0) !important; }
          .hero-bottom { position: static !important; margin-top: 60px !important; padding: 0 !important; flex-direction: column !important; align-items: center !important; gap: 40px !important; }
          .hero-desc { text-align: center !important; max-width: 100% !important; }
          .section-padding { padding: 100px 24px !important; }
          .skills-grid { grid-template-columns: 1fr !important; }
          .about-section { padding: 100px 24px !important; }
          .contact-section { padding: 0 24px 100px !important; }
          
          .business-card { padding: 32px 20px !important; gap: 24px !important; }
          .business-header { flex-direction: column !important; align-items: center !important; text-align: center !important; gap: 16px !important; }
          .business-name { font-size: 36px !important; }
          .business-links { justify-content: center !important; flex-wrap: wrap !important; }
          .business-desc { max-width: 100% !important; text-align: center !important; }
          .business-services { align-items: center !important; }
          .business-services > div { justify-content: center !important; }
          .business-gallery-wrapper { margin: 0 -20px !important; }
          .business-gallery { padding: 0 20px !important; gap: 16px !important; }
          .business-gallery-item { flex: 0 0 240px !important; height: 320px !important; }
        }
      `}</style>
      <Cursor mouseRef={mouseRef} />
      <Nav scrollY={scrollY} />
      <Hero />
      <Marquee />
      <About />
      <Divider />
      <Skills />
      <Divider />
      <Projects />
      <Divider />
      <Business setFullscreenImg={setFullscreenData} />
      <Divider />
      <Contact />
      <Footer />
    </>
  );
}
