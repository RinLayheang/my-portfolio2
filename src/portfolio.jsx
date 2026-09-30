import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import "./portfolio.css";
import "./hero.css";
// technology logos: Devicon where it has one, hand-drawn in assets/logos otherwise
import pythonLogo from "devicon/icons/python/python-original.svg";
import pandasLogo from "devicon/icons/pandas/pandas-original.svg";
import matplotlibLogo from "devicon/icons/matplotlib/matplotlib-original.svg";
import jupyterLogo from "devicon/icons/jupyter/jupyter-original.svg";
import reactLogo from "devicon/icons/react/react-original.svg";
import jsLogo from "devicon/icons/javascript/javascript-original.svg";
import tsLogo from "devicon/icons/typescript/typescript-original.svg";
import nextLogo from "devicon/icons/nextjs/nextjs-original.svg";
import nodeLogo from "devicon/icons/nodejs/nodejs-original.svg";
import expressLogo from "devicon/icons/express/express-original.svg";
import tailwindLogo from "devicon/icons/tailwindcss/tailwindcss-original.svg";
import threeLogo from "devicon/icons/threejs/threejs-original.svg";
import htmlLogo from "devicon/icons/html5/html5-original.svg";
import cssLogo from "devicon/icons/css3/css3-original.svg";
import cLogo from "devicon/icons/c/c-original.svg";
import cppLogo from "devicon/icons/cplusplus/cplusplus-original.svg";
import postgresLogo from "devicon/icons/postgresql/postgresql-original.svg";
import supabaseLogo from "devicon/icons/supabase/supabase-original.svg";
import firebaseLogo from "devicon/icons/firebase/firebase-original.svg";
import dockerLogo from "devicon/icons/docker/docker-original.svg";
import vercelLogo from "devicon/icons/vercel/vercel-original.svg";
import gitLogo from "devicon/icons/git/git-original.svg";
import githubLogo from "devicon/icons/github/github-original.svg";
import postmanLogo from "devicon/icons/postman/postman-original.svg";
import viteLogo from "devicon/icons/vitejs/vitejs-original.svg";
import arduinoLogo from "devicon/icons/arduino/arduino-original.svg";
import powerbiLogo from "./assets/logos/powerbi.svg";
import tableauLogo from "./assets/logos/tableau.svg";
import sqlLogo from "./assets/logos/sql.svg";
import seabornLogo from "./assets/logos/seaborn.svg";
import aiLogo from "./assets/logos/ai.svg";
import railwayLogo from "./assets/logos/railway.svg"; // Devicon's is white-on-transparent

/* ── Content ── */
// The skill areas, each with the tools used in it.
const disciplines = [
  {
    key: "data",
    title: "Data analysis",
    desc: "Turning messy datasets into clear narratives: dashboards, statistical analysis and visualisations that support real decisions.",
    tools: [["Python", pythonLogo], ["Pandas", pandasLogo], ["SQL", sqlLogo], ["Matplotlib", matplotlibLogo], ["Seaborn", seabornLogo], ["Jupyter", jupyterLogo], ["Power BI", powerbiLogo], ["Tableau", tableauLogo]],
  },
  {
    key: "build",
    title: "Full-stack development",
    desc: "Building web apps end to end, from the interface people click on to the server and database behind it.",
    tools: [["TypeScript", tsLogo], ["JavaScript", jsLogo], ["React", reactLogo], ["Next.js", nextLogo], ["Node.js", nodeLogo], ["Express", expressLogo], ["Tailwind", tailwindLogo], ["Three.js", threeLogo], ["HTML", htmlLogo], ["CSS", cssLogo], ["C", cLogo], ["C++", cppLogo]],
  },
  {
    key: "tools",
    title: "AI, cloud & tools",
    desc: "The services and tooling behind shipped products: AI models, databases, hosting, containers and version control.",
    tools: [["LLM APIs", aiLogo], ["PostgreSQL", postgresLogo], ["Supabase", supabaseLogo], ["Firebase", firebaseLogo], ["Docker", dockerLogo], ["Vercel", vercelLogo], ["Railway", railwayLogo], ["Git", gitLogo], ["GitHub", githubLogo], ["Postman", postmanLogo], ["Vite", viteLogo], ["Arduino", arduinoLogo]],
  },
];

const img = (name, sizes) => ({
  src: `/img/${name}-${sizes[sizes.length - 1]}.webp`,
  srcSet: sizes.map((w) => `/img/${name}-${w}.webp ${w}w`).join(", "),
});

const projects = [
  {
    name: "Dino Run 3D",
    desc: "A fully 3D reimagining of the classic endless runner game. Jump, duck, and dodge obstacles as you speed through the desert.",
    type: "Three.js", year: "2026", kind: "build",
    path: "/project/dino_run_3d",
    img: img("dino3d", [640, 1200]), imgAlt: "Dino Run 3D game interface",
    url: "https://dino3d.rinlayheang.me/",
  },
  {
    name: "KonMus",
    desc: "A modern Data Science & AI Academy platform featuring lessons, code, models, and interactive quizzes in Khmer and English.",
    type: "Web App", year: "2026", kind: "build",
    path: "/project/konmus",
    img: img("konmus", [640, 1200]), imgAlt: "KonMus Data Science & AI Academy interface",
    url: "https://kon-mus.vercel.app/",
  },
  {
    name: "PassKru Arcade",
    desc: "A gamified educational platform to play games, answer questions, and win prizes while learning.",
    type: "Web App", year: "2026", kind: "build",
    path: "/project/passkru_arcade",
    img: img("passkru_arcade", [640, 1200]), imgAlt: "PassKru Arcade game interface",
    url: "https://passkru.game.rinlayheang.me/",
  },
  {
    name: "Weather Analyzer",
    desc: "An object-oriented Python app that cleans Kaggle weather data, runs statistical analysis and plots trends.",
    type: "Python", year: "2026", kind: "data",
    img: img("weather_analyzer", [640, 1200]), imgAlt: "Weather Analyzer charts",
    path: "/project/weather_analyzer",
  },
  {
    name: "Be Badminton website",
    desc: "A React shop for badminton gear with a persistent cart and a custom admin dashboard.",
    type: "React", year: "2026", kind: "build",
    path: "/project/be_badminton",
    img: img("be_badminton", [640, 1200]), imgAlt: "Be Badminton website on a laptop",
  },
  {
    name: "Be Badminton UI/UX",
    desc: "The interface design for the Be Badminton shop, prototyped in Figma.",
    type: "Figma", year: "2026", kind: "design",
    img: img("be_ui", [640, 1200]), imgAlt: "Be Badminton interface screens",
    path: "/project/be_badminton_ui",
  },
  {
    name: "4WD robot car",
    desc: "An Arduino UNO robot with line following, obstacle detection and Bluetooth or joystick control, programmed in C++.",
    type: "Arduino", year: "2026", kind: "build",
    path: "/project/robot_car",
    img: img("robot", [640, 1200]), imgAlt: "4WD robot car",
  },
  {
    name: "Dino Game",
    desc: "An endless runner built in Scratch with classic arcade mechanics and difficulty that ramps up as you play.",
    type: "Scratch", year: "2025", kind: "build",
    img: img("dino", [640, 1200]), imgAlt: "Dino Game title screen",
    path: "/project/dinogame",
  },
  {
    name: "Gas Management System",
    desc: "A terminal-based admin tool written in C for a first-year project, with role-based menus for running a gas station.",
    type: "C", year: "2025", kind: "build",
    path: "/project/gas_management",
    img: img("gas", [640, 1200]), imgAlt: "Gas Management System terminal interface",
  },
];

const business = {
  name: "Be Badminton",
  desc: "My own start-up selling badminton equipment and accessories.",
  services: ["Rackets", "Shuttlecocks", "Custom stringing", "Sports apparel"],
  links: [
    { label: "TikTok", url: "https://www.tiktok.com/@be_withu3" },
    { label: "Facebook", url: "https://www.facebook.com/profile.php?id=61581383279455" },
  ],
  logo: "/img/be-logo-160.webp",
  gallery: [
    { ...img("poster-main", [480, 1080]), w: 1080, h: 1080 },
    { ...img("poster-65", [480, 1080]), w: 1080, h: 1080 },
    { ...img("poster-10", [480, 1080]), w: 1080, h: 1350 },
    { ...img("poster-11", [480, 1080]), w: 1080, h: 1350 },
  ],
};

// Two SaaS ventures beside Be Badminton. DRAFT COPY: pitch, features, stack and links are guesses —
// replace them. Add `img` (see the img() helper) and the mockup shows a real screenshot instead.
const ventures = [
  {
    key: "findmoy",
    name: "FindMoy",
    product: "KCMS",
    tagline: "Khmer-first AI comment moderation",
    status: "Early access",
    domain: "findmoy.app",
    desc: "KCMS reads Facebook Page comments in Khmer, Khmerlish and English, then flags scams, abuse and spam in context. A person on the team confirms every action, and every hide is reversible with a full audit trail.",
    features: [
      "Reads Khmer, Khmerlish and English in context",
      "Flags safe, offensive or harmful, with the reason",
      "Human review, reversible, with an audit trail",
    ],
    stack: ["Facebook Pages", "AI moderation", "Dashboard"],
    accent: "#0a7a8c",
    url: "https://findmoy.app",
    detail: { label: "How it works", url: "/project/findmoy" },
    poster: { ...img("findmoy-poster", [640, 1080]), w: 1080, h: 1350 },
  },
  {
    key: "passkru",
    name: "PassKru",
    product: "",
    tagline: "Ace your teacher-exam preparation",
    status: "In development",
    domain: "passkru.com",
    desc: "A learning platform designed to help teacher-exam candidates prepare effectively with personalized study plans based on each learner's needs.",
    features: ["Practice questions & quizzes", "Flashcards & mock exams", "Personalized study plans"],
    stack: ["React", "Node.js", "PostgreSQL"],
    accent: "#2f5bea",
    url: "https://pass-kru67.vercel.app/",
    detail: { label: "Startup details", url: "/project/passkru_startup" },
    poster: { ...img("passkru-poster", [640, 1080]), w: 1080, h: 1528 },
  },
];

const contacts = [
  { label: "Email", value: "layheangrin@gmail.com", href: "mailto:layheangrin@gmail.com" },
  { label: "GitHub", value: "github.com/RinLayheang", href: "https://github.com/RinLayheang" },
  { label: "LinkedIn", value: "linkedin.com/in/rin-layheang", href: "https://www.linkedin.com/in/rin-layheang-7aab5a334" },
  { label: "Facebook", value: "facebook.com/rinn.layheang", href: "https://www.facebook.com/rinn.layheang.2025" },
];

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Elements marked data-reveal animate in once as they scroll into view; --i staggers siblings.
// Content is only hidden once .reveal-ready is on <html>, so it stays visible without JS or motion.
function useScrollReveal() {
  useEffect(() => {
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) return;
    const root = document.documentElement;
    root.classList.add("reveal-ready");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    document.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);
}

// Arriving at /#section from another page: the browser tries to jump before React has rendered
// the section, so jump once it exists.
function useHashScroll() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(decodeURIComponent(hash.slice(1)));
    el?.scrollIntoView({ behavior: "instant", block: "start" });
  }, [hash]);
}

const stagger = (i) => ({ "--i": i });

/* ── Icons (inline SVG instead of a multi-megabyte icon font) ── */
const ArrowUpRight = () => (
  <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
);
const Chevron = ({ dir }) => (
  <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d={dir === "left" ? "m15 5-7 7 7 7" : "m9 5 7 7-7 7"} /></svg>
);
const Menu = ({ open }) => (
  <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
    {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
  </svg>
);
const Close = () => (
  <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
);

/* ── Nav ── */
const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#achievements", label: "Achievements" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#business", label: "Business" },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  // on phones the section links live behind a menu button
  const [open, setOpen] = useState(false);
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      // setState with an unchanged boolean bails out, so this only renders on threshold changes
      setScrolled(y > 40);
      // hide while scrolling down, show again as soon as the visitor scrolls up
      if (Math.abs(y - last) > 4) {
        const away = y > 120 && y > last;
        setHidden(away);
        if (away) setOpen(false); // the menu goes with the bar
      }
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close the menu on Escape, on a tap outside it, or once the bar slides away
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onPointer = (e) => !e.target.closest(".nav") && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);
  return (
    <header className={`nav${scrolled ? " is-scrolled" : ""}${hidden ? " is-hidden" : ""}${open ? " is-open" : ""}`}>
      <a href="#top" className="nav-brand">Rin Layheang</a>
      <nav aria-label="Sections">
        <ul className="nav-links">
          {NAV_LINKS.map((l) => (
            <li key={l.href}><a href={l.href} onClick={() => setOpen(false)}>{l.label}</a></li>
          ))}
          <li className="nav-links-contact">
            <a href="#contact" onClick={() => setOpen(false)}>Contact <ArrowUpRight /></a>
          </li>
        </ul>
      </nav>
      <div className="nav-end">
        <a href="#contact" className="nav-cta" onClick={() => setOpen(false)}>Contact <ArrowUpRight /></a>
        <button
          type="button"
          className="nav-menu-btn"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <Menu open={open} />
        </button>
      </div>
    </header>
  );
}

/* ── Hero ── */
// Contour lines drawn as a density plot around three "cluster" centres; built once at load.
const contourPaths = (() => {
  const centres = [[260, 250, 1.0], [1180, 190, 0.8], [900, 760, 1.15]];
  const paths = [];
  centres.forEach(([cx, cy, scale], c) => {
    for (let ring = 1; ring <= 7; ring++) {
      const base = ring * 46 * scale;
      let d = "";
      for (let i = 0; i <= 64; i++) {
        const a = (i / 64) * Math.PI * 2;
        const r = base * (1 + 0.16 * Math.sin(a * 3 + c * 2 + ring * 0.35) + 0.08 * Math.cos(a * 5 - c));
        d += `${i ? "L" : "M"}${(cx + Math.cos(a) * r * 1.25).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)}`;
      }
      paths.push(d + "Z");
    }
  });
  return paths;
})();

const Icon = ({ d }) => (
  <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>
);
const ICONS = {
  pin: "M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  cap: "M2 9l10-5 10 5-10 5L2 9Zm4 2.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5M22 9v6",
  code: "m8 8-4 4 4 4m8-8 4 4-4 4m-2-11-4 14",
};

// Illustrative monthly temperature curve (°C) for the latest-project panel sparkline
const sparkline = [26.6, 27.8, 29.2, 30.1, 29.9, 29.0, 28.5, 28.4, 28.1, 27.7, 27.1, 26.3];

// Both portrait layers share one crop, so they line up pixel for pixel
const heroSrc = (name) => ({
  src: `/img/${name}-933.webp`,
  srcSet: `/img/${name}-600.webp 600w, /img/${name}-933.webp 933w`,
});
const HERO_SIZES = "(max-width: 1024px) 100vw, 90vh";

// under the name on wide screens, down in the bottom bar on phones
const HeroMeta = ({ where }) => (
  <ul className={`hero-meta hero-meta-${where}`}>
    <li><Icon d={ICONS.pin} />Phnom Penh, Cambodia</li>
    <li><Icon d={ICONS.cap} />Data Science, year 2 at CADT</li>
    <li><Icon d={ICONS.code} />Data, full-stack and UI/UX</li>
  </ul>
);

function Hero() {
  const canvasRef = useRef(null);
  const photoRef = useRef(null);
  const altRef = useRef(null);
  const effectRef = useRef(null);
  // intro: chrome version shown as a plain <img> until WebGL takes over and burns it into the photo.
  // static: plain images with a crossfade, when motion is reduced or WebGL isn't available.
  const [mode, setMode] = useState(() => (prefersReducedMotion() ? "static" : "intro"));
  // which version the visitor asked for: the real photo or the chrome-and-python version
  const [layer, setLayer] = useState("photo");
  const layerRef = useRef(layer);

  useEffect(() => {
    let cancelled = false;
    const reduced = prefersReducedMotion();
    // a fresh Image of the chosen file: with srcset, the DOM img reports density-corrected
    // natural sizes, which makes WebGL allocate a texture smaller than the real bitmap
    const load = async (el) => {
      const img = new Image();
      img.src = el.currentSrc || el.src;
      await img.decode();
      return img;
    };
    const start = async () => {
      try {
        const [photo, alt, { mountPortraitReveal }] = await Promise.all([
          load(photoRef.current), load(altRef.current), import("./portraitReveal.js"),
        ]);
        if (cancelled) return;
        effectRef.current = mountPortraitReveal(canvasRef.current, photo, alt, { reducedMotion: reduced });
        effectRef.current.show(layerRef.current); // honour a switch pressed before WebGL was ready
        setMode("webgl");
      } catch {
        if (!cancelled) setMode("static");
      }
    };
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(start, { timeout: 800 })
      : setTimeout(start, 200);
    return () => {
      cancelled = true;
      window.cancelIdleCallback ? window.cancelIdleCallback(idle) : clearTimeout(idle);
      effectRef.current?.destroy();
      effectRef.current = null;
    };
  }, []);

  const switchLayer = () => {
    const next = layer === "photo" ? "alt" : "photo";
    layerRef.current = next;
    setLayer(next);
    effectRef.current?.show(next);
    if (mode === "intro" && !effectRef.current) setMode("static");
  };

  const max = Math.max(...sparkline), min = Math.min(...sparkline);
  const points = sparkline.map((v, i) => `${(i / (sparkline.length - 1)) * 100},${28 - ((v - min) / (max - min)) * 24}`).join(" ");

  return (
    <section id="top" className="hero">
      <svg className="hero-contours" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {contourPaths.map((d, i) => <path key={i} d={d} />)}
      </svg>

      <div className="hero-intro">
        <h1 className="hero-name"><span>Rin</span> <span>Layheang</span></h1>
        <HeroMeta where="top" />
      </div>

      <div className="hero-stage">
        <div className={`hero-portrait is-${mode}`} data-layer={layer}>
          <img
            ref={altRef}
            className="layer-alt"
            {...heroSrc("hero-chrome")}
            sizes={HERO_SIZES}
            width="933" height="871"
            alt=""
            fetchPriority="high"
          />
          <img
            ref={photoRef}
            className="layer-photo"
            {...heroSrc("hero-photo")}
            sizes={HERO_SIZES}
            width="933" height="871"
            alt="Portrait of Rin Layheang"
          />
          <canvas ref={canvasRef} aria-hidden="true" />
        </div>
      </div>

      <aside className="hero-panels" aria-label="At a glance">
        <div className="hud">
          <p className="hud-label">Currently</p>
          <p className="hud-title">Data Science student</p>
          <p className="hud-sub">Cambodia Academy of Digital Technology</p>
        </div>
        <Link to="/project/weather_analyzer" className="hud hud-link">
          <p className="hud-label">Latest project</p>
          <p className="hud-title">Weather Analyzer</p>
          <p className="hud-sub">Python, 2026</p>
          <svg className="hud-spark" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true">
            <polyline points={points} />
          </svg>
        </Link>
        <div className="hud">
          <p className="hud-label">At a glance</p>
          <dl className="hud-stats">
            <div><dt>Projects</dt><dd>{projects.length}</dd></div>
            <div><dt>Skills</dt><dd>{disciplines.length}</dd></div>
            <div><dt>Business</dt><dd>1</dd></div>
          </dl>
        </div>
      </aside>

      <div className="hero-bar">
        <HeroMeta where="bar" />
        <button type="button" className="hero-switch" onClick={switchLayer} aria-pressed={layer === "alt"}>
          <span className="switch-icon" aria-hidden="true">
            <svg className="icon" viewBox="0 0 24 24"><path d="M4 8h13m0 0-3.5-3.5M17 8l-3.5 3.5M20 16H7m0 0 3.5-3.5M7 16l3.5 3.5" /></svg>
          </span>
          <span>
            <span className="hero-switch-title">{layer === "photo" ? "Show aura" : "Show steav"}</span>
            <span className="hero-switch-sub">Switch portrait</span>
          </span>
        </button>
        <div style={{ gridColumn: 3, justifySelf: 'end' }}>
          <a href="#projects" className="hero-cta">View projects <ArrowUpRight /></a>
        </div>
      </div>
    </section>
  );
}

/* ── Shared section pieces (same language as the hero) ── */
export function Contours() {
  return (
    <svg className="contours" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {contourPaths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

function SectionHead({ title, label, sub }) {
  return (
    <div className="sec-head" data-reveal="wipe">
      <h2 className="cond sec-title">{title}</h2>
      <div className="sec-meta" data-reveal style={stagger(1)}>
        <p className="hud-label">{label}</p>
        {sub && <p className="sec-sub">{sub}</p>}
      </div>
    </div>
  );
}

/* ── About ── */
function About() {
  return (
    <section id="about" className="section tone tone-ink">
      <Contours />
      <SectionHead title="About" label="Who I am" sub="Phnom Penh, Cambodia" />
      <div className="about">
        <div className="about-text">
          <p data-reveal>
            I'm a second-year Data Science student at the Cambodia Academy of Digital Technology (CADT). I'm interested in where data, design and technology meet.
          </p>
          <p data-reveal style={stagger(1)}>
            Good interfaces tell stories, and so does good data. My work joins analytical thinking with visual communication.
          </p>
        </div>
        <dl className="facts">
          <div className="hud" data-reveal style={stagger(1)}><dt className="hud-label">Studying</dt><dd>Data Science, year 2, CADT</dd></div>
          <div className="hud" data-reveal style={stagger(2)}><dt className="hud-label">Based in</dt><dd>Phnom Penh, Cambodia</dd></div>
          <div className="hud" data-reveal style={stagger(3)}><dt className="hud-label">Works across</dt><dd>Data, code and design</dd></div>
          <div className="hud" data-reveal style={stagger(4)}><dt className="hud-label">Runs</dt><dd>Be Badminton, a gear shop</dd></div>
        </dl>
      </div>
    </section>
  );
}

/* ── Achievements ── */
const ACHIEVEMENTS = [
  {
    key: "passkru",
    kicker: "Competition winner",
    place: "1st place",
    badge: "Champion",
    event: "NGEP Batch 3",
    desc: "Our team PassKru won the Next-Gen Engagement Program (NGEP) Batch 3, pitching our MVP and business plan against teams from three departments. The prototype became PassKru, a teacher-exam prep platform with personalized study plans.",
    facts: [
      { label: "Event", value: "Next-Gen's Day, CADT" },
      { label: "Date", value: "25 Sep 2026" },
      { label: "Role", value: "Co-founder" },
    ],
    tags: ["Ed-tech", "SaaS", "Pitch"],
    link: "/project/passkru_ngep",
    related: { label: "The startup", url: "/project/passkru_startup" },
    images: [
      { name: "passkru-ngep-2", alt: "Team PassKru with their medals and the 1st Place Award" },
      { name: "passkru-ngep-1", alt: "Holding the champion trophy and the award board", pos: "50% 30%" },
      { name: "passkru-ngep-3", alt: "PassKru at the NGEP award ceremony" },
    ],
  },
];

// Crossfading slides with dots. Auto-advances unless motion is reduced, and pauses on hover or focus.
function ImageCarousel({ images }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = images.length;

  useEffect(() => {
    if (count <= 1 || paused || prefersReducedMotion()) return;
    const t = setTimeout(() => setCurrent((i) => (i + 1) % count), 4500);
    return () => clearTimeout(t);
  }, [current, paused, count]);

  const go = (d) => setCurrent((i) => (i + d + count) % count);

  return (
    <div
      className="carousel"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}
    >
      {images.map((im, i) => (
        <img
          key={im.name}
          src={`/img/${im.name}-1080.webp`}
          srcSet={`/img/${im.name}-480.webp 480w, /img/${im.name}-1080.webp 1080w`}
          sizes="(max-width: 900px) 92vw, 46vw"
          alt={im.alt}
          aria-hidden={i !== current}
          className={i === current ? "is-current" : undefined}
          style={im.pos ? { objectPosition: im.pos } : undefined}
          loading={i === 0 ? undefined : "lazy"}
          decoding="async"
        />
      ))}
      {count > 1 && (
        <div className="carousel-ui">
          <button type="button" className="carousel-btn" onClick={() => go(-1)} aria-label="Previous photo"><Chevron dir="left" /></button>
          <div className="carousel-dots">
            {images.map((im, i) => (
              <button
                key={im.name} type="button" onClick={() => setCurrent(i)}
                aria-label={`Photo ${i + 1} of ${count}`} aria-current={i === current}
                className={i === current ? "is-current" : undefined}
              />
            ))}
          </div>
          <button type="button" className="carousel-btn" onClick={() => go(1)} aria-label="Next photo"><Chevron dir="right" /></button>
        </div>
      )}
    </div>
  );
}

const Medal = () => (
  <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3h8l-2 6h-4L8 3Zm4 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" /></svg>
);

function Achievements() {
  return (
    <section id="achievements" className="section">
      <Contours />
      <SectionHead title="Achievements" label="Competitions" sub="Hackathons & awards" />
      <ul className="achievements">
        {ACHIEVEMENTS.map((a) => (
          <li key={a.key} className="hud achievement" data-reveal>
            <div className="achievement-media">
              <ImageCarousel images={a.images} />
              <span className="achievement-badge"><Medal />{a.badge}</span>
            </div>
            <div className="achievement-body">
              <p className="hud-label">{a.kicker}</p>
              <h3 className="cond">{a.place}<span>{a.event}</span></h3>
              <p className="achievement-desc">{a.desc}</p>
              <dl className="achievement-facts">
                {a.facts.map((f) => (
                  <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>
                ))}
              </dl>
              <ul className="tags">{a.tags.map((t) => <li key={t}>{t}</li>)}</ul>
              <div className="achievement-actions">
                <Link to={a.link} className="cut-btn is-solid">Read the story <ArrowUpRight /></Link>
                {a.related && <Link to={a.related.url} className="venture-detail">{a.related.label}</Link>}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ── Skills ── */
const skillShort = { data: "Data", build: "Build", tools: "Tools" };

function Skills() {
  return (
    <section id="skills" className="section" data-reveal-style="scan">
      <Contours />
      <SectionHead title="Skills" label="What I work with" sub={`${disciplines.length} areas`} />
      <div className="skills-grid">
        {disciplines.map((d, i) => (
          <article key={d.key} className="hud skill" data-reveal style={stagger(i)}>
            <p className="hud-label">{skillShort[d.key]}</p>
            <h3 className="cond">{d.title}</h3>
            <p className="skill-desc">{d.desc}</p>
            <ul className="logos">
              {d.tools.map(([name, logo]) => (
                <li key={name}>
                  <img src={logo} alt="" width="20" height="20" loading="lazy" decoding="async" />
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ── Projects ── */
function ProjectCard({ p, i }) {
  return (
    <li className="project" data-reveal style={stagger(i % 2)}>
      <div className="project-media burn">
        <img
          src={p.img.src}
          srcSet={p.img.srcSet}
          sizes="(max-width: 900px) 92vw, 46vw"
          width="1200" height="630"
          alt={p.imgAlt}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="project-row">
        <p className="hud-label">{p.type} · {p.year}</p>
        <h3 className="cond">{p.name}</h3>
      </div>
      <p className="project-desc">{p.desc}</p>
      {(p.path || p.url) && (
        <div className="project-actions">
          {p.path && <Link to={p.path} className="cut-btn project-btn">Details <ArrowUpRight /></Link>}
          {p.url && <a href={p.url} target="_blank" rel="noopener noreferrer" className="cut-btn">Live site <ArrowUpRight /></a>}
        </div>
      )}
    </li>
  );
}

function Projects() {
  const years = projects.map((p) => p.year).sort();
  return (
    <section id="projects" className="section">
      <Contours />
      <SectionHead title="Projects" />
      <ul className="projects-grid">
        {projects.map((p, i) => <ProjectCard key={p.name} p={p} i={i} />)}
      </ul>
    </section>
  );
}

/* ── Business ── */
const Tick = () => (
  <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 13 4 4 10-10" /></svg>
);

// stand-in for a screenshot: an abstract dashboard in the venture's accent colour
const AppMock = ({ name }) => (
  <div className="mock" aria-hidden="true">
    <div className="mock-side">
      <span className="mock-logo">{name[0]}</span>
      <i /><i /><i /><i />
    </div>
    <div className="mock-main">
      <div className="mock-row">
        <span className="mock-pill" /><span className="mock-pill wide" />
      </div>
      <div className="mock-cards">
        <span /><span /><span />
      </div>
      <div className="mock-chart">
        {[46, 68, 38, 82, 58, 94, 72].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}
      </div>
    </div>
  </div>
);
/* The section runs software first, then the shop under its own sub-heading, so a SaaS product and
   a badminton shop never sit side by side. */
function SubHead({ label, title, sub }) {
  return (
    <div className="sub-head" data-reveal>
      <p className="hud-label">{label}</p>
      <h3 className="cond">{title}</h3>
      {sub && <p className="sub-sub">{sub}</p>}
    </div>
  );
}

function VentureCard({ v, i }) {
  return (
    <li className="venture" data-reveal style={{ ...stagger(i), "--accent": v.accent }}>
      <article className={`hud venture-card${i % 2 ? " is-reverse" : ""}`}>
        <div className="venture-screen">
          {v.poster ? (
            <div className="venture-poster">
              <img src={v.poster.src} srcSet={v.poster.srcSet} sizes="(max-width: 900px) 70vw, 340px" width={v.poster.w} height={v.poster.h} alt={`${v.name} poster`} loading="lazy" decoding="async" />
            </div>
          ) : (
            <div className="browser">
              <div className="browser-bar" aria-hidden="true">
                <span className="dot" /><span className="dot" /><span className="dot" />
                <span className="browser-url">{v.domain}</span>
              </div>
              <AppMock name={v.name} />
            </div>
          )}
          <span className="venture-status">{v.status}</span>
          <span className="venture-domain">{v.domain}</span>
        </div>

        <div className="venture-body">
          <p className="hud-label">Founder · SaaS{v.product && ` · ${v.product}`}</p>
          <h3 className="cond">{v.name}</h3>
          <p className="venture-tagline">{v.tagline}</p>
          <p className="venture-desc">{v.desc}</p>
          <ul className="venture-features">
            {v.features.map((f) => (
              <li key={f}><Tick />{f}</li>
            ))}
          </ul>
          <div className="venture-foot">
            <ul className="tags venture-stack">
              {v.stack.map((t) => <li key={t}>{t}</li>)}
            </ul>
            {v.url ? (
              <div className="venture-actions">
                {v.detail && (
                  v.detail.url.startsWith("/") ? (
                    <Link to={v.detail.url} className="venture-detail">{v.detail.label}</Link>
                  ) : (
                    <a href={v.detail.url} target="_blank" rel="noopener noreferrer" className="venture-detail">{v.detail.label}</a>
                  )
                )}
                <a href={v.url} target="_blank" rel="noopener noreferrer" className="cut-btn">Visit site <ArrowUpRight /></a>
              </div>
            ) : (
              <span className="venture-soon">Launching soon</span>
            )}
          </div>
        </div>
      </article>
    </li>
  );
}

const Ventures = () => (
  <ul className="ventures">
    {ventures.map((v, i) => <VentureCard key={v.key} v={v} i={i} />)}
  </ul>
);

// the shop as it is now: wide panel with the poster slider
function ShopPanel({ onOpen }) {
  return (
    <div className="hud business" data-reveal>
      <div className="business-head">
        <img src={business.logo} width="80" height="80" alt="" className="business-logo" loading="lazy" />
        <div>
          <p className="hud-label">Founder · Retail</p>
          <h3 className="cond">{business.name}</h3>
          <p className="business-desc">{business.desc}</p>
          <ul className="tags">
            {business.services.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </div>
        <ul className="business-links">
          {business.links.map((l) => (
            <li key={l.label}>
              <a href={l.url} target="_blank" rel="noopener noreferrer" className="cut-btn">{l.label} <ArrowUpRight /></a>
            </li>
          ))}
        </ul>
      </div>
      <ul className="gallery" aria-label="Be Badminton posters">
        {business.gallery.map((g, i) => (
          <li key={g.src} className="gallery-item">
            <button type="button" className="burn" onClick={() => onOpen(i)} aria-label={`Open poster ${i + 1} of ${business.gallery.length}`}>
              <img src={g.srcSet.split(" ")[0]} srcSet={g.srcSet} sizes="320px" width={g.w} height={g.h} alt="" loading="lazy" decoding="async" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Business({ onOpen }) {
  return (
    <section id="business" className="section" data-reveal-style="scan">
      <Contours />
      <SectionHead title="Business" label="What I'm building" sub={`${ventures.length + 1} ventures`} />
      <SubHead label="Software" title="SaaS products" sub="Built and run by me" />
      <Ventures />
      <SubHead label="Retail" title="On the ground" sub="A shop, not an app" />
      <ShopPanel onOpen={onOpen} />
    </section>
  );
}

function Lightbox({ index, setIndex }) {
  const images = business.gallery;
  const closeRef = useRef(null);
  const close = useCallback(() => setIndex(null), [setIndex]);
  const step = useCallback(
    (d) => setIndex((i) => Math.min(images.length - 1, Math.max(0, i + d))),
    [setIndex, images.length]
  );
  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [close, step]);

  const g = images[index];
  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Poster viewer" onClick={close}>
      <button ref={closeRef} type="button" className="lb-btn lb-close" onClick={close} aria-label="Close"><Close /></button>
      {index > 0 && (
        <button type="button" className="lb-btn lb-prev" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous poster"><Chevron dir="left" /></button>
      )}
      {index < images.length - 1 && (
        <button type="button" className="lb-btn lb-next" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next poster"><Chevron dir="right" /></button>
      )}
      <img key={g.src} src={g.src} width={g.w} height={g.h} alt={`Be Badminton poster ${index + 1}`} onClick={(e) => e.stopPropagation()} />
    </div>
  );
}

/* ── Contact ── */
function Contact() {
  return (
    <section id="contact" className="section contact tone tone-ink" data-reveal-style="scan">
      <Contours />
      <div data-reveal="wipe">
        <h2 className="cond contact-title">Let's<br />work.</h2>
        <p className="contact-sub" data-reveal style={stagger(1)}>I'm open to projects, collaborations and internships.</p>
      </div>
      <ul className="contact-list">
        {contacts.map((c, i) => (
          <li key={c.label} data-reveal style={stagger(i)}>
            <a className="hud" href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
              <span className="hud-label">{c.label}</span>
              <span className="contact-value">{c.value}</span>
              <ArrowUpRight />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ── Root ── */
export default function Portfolio() {
  const [lightbox, setLightbox] = useState(null);
  useScrollReveal();
  useHashScroll();
  return (
    <div className="portfolio">
      <a href="#about" className="skip-link">Skip to content</a>
      <Nav />
      <main>
        <Hero />
        <div className="paper">
          <About />
          <Achievements />
          <Skills />
          <Projects />
          <Business onOpen={setLightbox} />
          <Contact />
          <footer className="footer tone tone-ink">
            <span className="cond footer-name">Rin Layheang</span>
            <span>Built with React and three.js in Phnom Penh</span>
          </footer>
        </div>
      </main>
      {lightbox !== null && <Lightbox index={lightbox} setIndex={setLightbox} />}
    </div>
  );
}
