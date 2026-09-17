import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import "./portfolio.css";
import "./hero.css";

/* ── Content ── */
// The three disciplines colour-code skills and projects across the page.
const disciplines = [
  {
    key: "data",
    title: "Data analysis",
    desc: "Turning messy datasets into clear narratives: dashboards, statistical analysis and visualisations that support real decisions.",
    tags: ["Python", "Pandas", "SQL", "Matplotlib", "Statistics", "Power BI", "Tableau", "Automation"],
  },
  {
    key: "build",
    title: "Full-stack development",
    desc: "Building web apps end to end, from the interface people click on to the server and database behind it.",
    tags: ["React", "JavaScript", "Node.js", "SQL", "Tailwind", "HTML/CSS", "C", "C++", "Python"],
  },
  {
    key: "design",
    title: "UI/UX design",
    desc: "Designing interfaces people enjoy using, from wireframes to high-fidelity prototypes with a clear visual hierarchy.",
    tags: ["Figma", "Prototyping", "User research", "Design systems", "UML"],
  },
];

const img = (name, sizes) => ({
  src: `/img/${name}-${sizes[sizes.length - 1]}.webp`,
  srcSet: sizes.map((w) => `/img/${name}-${w}.webp ${w}w`).join(", "),
});

const projects = [
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
    img: img("gas", [640, 1200]), imgAlt: "Gas Management System terminal interface",
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
    img: img("robot", [640, 1200]), imgAlt: "4WD robot car",
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

const contacts = [
  { label: "Email", value: "layheangrin@gmail.com", href: "mailto:layheangrin@gmail.com" },
  { label: "GitHub", value: "github.com/RinLayheang", href: "https://github.com/RinLayheang" },
  { label: "LinkedIn", value: "linkedin.com/in/rin-layheang", href: "https://www.linkedin.com/in/rin-layheang-7aab5a334" },
  { label: "Facebook", value: "facebook.com/rinn.layheang", href: "https://www.facebook.com/rinn.layheang.2025" },
];

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ── Icons (inline SVG instead of a multi-megabyte icon font) ── */
const ArrowUpRight = () => (
  <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
);
const Chevron = ({ dir }) => (
  <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d={dir === "left" ? "m15 5-7 7 7 7" : "m9 5 7 7-7 7"} /></svg>
);
const Close = () => (
  <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
);

/* ── Nav ── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      // setState with an unchanged boolean bails out, so this only renders on threshold changes
      setScrolled(y > 40);
      setHidden(y > 120 && y > last);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`nav${scrolled ? " is-scrolled" : ""}${hidden ? " is-hidden" : ""}`}>
      <a href="#top" className="nav-brand">Rin Layheang</a>
      <nav aria-label="Sections">
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#business">Business</a></li>
          <li><a href="#contact" className="nav-cta">Contact <ArrowUpRight /></a></li>
        </ul>
      </nav>
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
  srcSet: `/img/${name}-600.webp 600w, /img/${name}-933.webp 933w, /img/${name}-1866.webp 1866w`,
});
const HERO_SIZES = "(max-width: 1024px) 100vw, 90vh";

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
        <ul className="hero-meta">
          <li><Icon d={ICONS.pin} />Phnom Penh, Cambodia</li>
          <li><Icon d={ICONS.cap} />Data Science, year 2 at CADT</li>
          <li><Icon d={ICONS.code} />Data, full-stack and UI/UX</li>
        </ul>
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
            <div><dt>Skill areas</dt><dd>{disciplines.length}</dd></div>
            <div><dt>Business</dt><dd>1</dd></div>
          </dl>
        </div>
      </aside>

      <div className="hero-bar">
        <button type="button" className="hero-switch" onClick={switchLayer} aria-pressed={layer === "alt"}>
          <span className="switch-icon" aria-hidden="true">
            <svg className="icon" viewBox="0 0 24 24"><path d="M4 8h13m0 0-3.5-3.5M17 8l-3.5 3.5M20 16H7m0 0 3.5-3.5M7 16l3.5 3.5" /></svg>
          </span>
          <span>
            <span className="hero-switch-title">{layer === "photo" ? "Show aura" : "Show steav"}</span>
            <span className="hero-switch-sub">Switch portrait</span>
          </span>
        </button>
        <a href="#projects" className="hero-cta">View projects <ArrowUpRight /></a>
        <ul className="hero-social">
          <li><a href="https://github.com/RinLayheang" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a href="https://www.linkedin.com/in/rin-layheang-7aab5a334" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a href="https://www.facebook.com/rinn.layheang.2025" target="_blank" rel="noopener noreferrer">Facebook</a></li>
        </ul>
      </div>
    </section>
  );
}

/* ── Shared section pieces (same language as the hero) ── */
function Contours() {
  return (
    <svg className="contours" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {contourPaths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

function SectionHead({ title, label, sub }) {
  return (
    <div className="sec-head">
      <h2 className="cond sec-title">{title}</h2>
      <div className="sec-meta">
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
          <p>
            I'm a second-year Data Science student at the Cambodia Academy of Digital Technology (CADT). I'm interested in where data, design and technology meet.
          </p>
          <p>
            Good interfaces tell stories, and so does good data. My work joins analytical thinking with visual communication.
          </p>
        </div>
        <dl className="facts">
          <div className="hud"><dt className="hud-label">Studying</dt><dd>Data Science, year 2, CADT</dd></div>
          <div className="hud"><dt className="hud-label">Based in</dt><dd>Phnom Penh, Cambodia</dd></div>
          <div className="hud"><dt className="hud-label">Works across</dt><dd>Data, code and design</dd></div>
          <div className="hud"><dt className="hud-label">Runs</dt><dd>Be Badminton, a gear shop</dd></div>
        </dl>
      </div>
    </section>
  );
}

/* ── Skills ── */
// decorative bar shapes for each skill panel
const skillBars = { data: [40, 65, 50, 85, 70, 95], build: [55, 45, 80, 60, 90, 75], design: [70, 50, 60, 40, 80, 65] };
const skillShort = { data: "Data", build: "Build", design: "Design" };

function Skills() {
  return (
    <section id="skills" className="section">
      <Contours />
      <SectionHead title="Skills" label="What I work with" sub={`${disciplines.length} areas`} />
      <div className="skills-grid">
        {disciplines.map((d) => (
          <article key={d.key} className="hud skill">
            <p className="hud-label">{skillShort[d.key]}</p>
            <h3 className="cond">{d.title}</h3>
            <p className="skill-desc">{d.desc}</p>
            <ul className="tags">
              {d.tags.map((t) => <li key={t}>{t}</li>)}
            </ul>
            <div className="bars" aria-hidden="true">
              {skillBars[d.key].map((h, i) => <i key={i} style={{ height: `${h}%`, animationDelay: `${i * 0.05}s` }} />)}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ── Projects ── */
function ProjectCard({ p }) {
  return (
    <li className="project">
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
        <div>
          <p className="hud-label">{p.type} · {p.year}</p>
          <h3 className="cond">{p.name}</h3>
        </div>
        {p.path && <Link to={p.path} className="cut-btn">View <ArrowUpRight /></Link>}
      </div>
      <p className="project-desc">{p.desc}</p>
    </li>
  );
}

function Projects() {
  const years = projects.map((p) => p.year).sort();
  return (
    <section id="projects" className="section">
      <Contours />
      <SectionHead title="Projects" label="Selected work" sub={`${years[0]} – ${years[years.length - 1]}`} />
      <ul className="projects-grid">
        {projects.map((p) => <ProjectCard key={p.name} p={p} />)}
      </ul>
    </section>
  );
}

/* ── Business ── */
function Business({ onOpen }) {
  return (
    <section id="business" className="section">
      <Contours />
      <SectionHead title="Business" label="My own start-up" />
      <div className="hud business">
        <div className="business-head">
          <img src={business.logo} width="80" height="80" alt="" className="business-logo" loading="lazy" />
          <div>
            <p className="hud-label">Founder</p>
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
    <section id="contact" className="section contact tone tone-ink">
      <Contours />
      <div>
        <h2 className="cond contact-title">Let's<br />work.</h2>
        <p className="contact-sub">I'm open to projects, collaborations and internships.</p>
      </div>
      <ul className="contact-list">
        {contacts.map((c) => (
          <li key={c.label}>
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
  return (
    <div className="portfolio">
      <a href="#about" className="skip-link">Skip to content</a>
      <Nav />
      <main>
        <Hero />
        <div className="paper">
          <About />
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
