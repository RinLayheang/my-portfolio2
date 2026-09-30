import { Navigate, useParams } from "react-router-dom";
import { CasePage, CaseHero, CaseSection, Stats, Cards, ExternalBtn, InternalBtn, ArrowUpRight } from "./CaseStudy.jsx";

/* Detail pages for projects that don't have a page of their own.
   Content comes from each project's README and code; the robot car and gas system are
   described from the portfolio card only, as their code isn't public. */
const GH = "https://github.com/RinLayheang/";

const PROJECTS = {
  dinogame: {
    name: "Dino Game",
    eyebrow: "Game · Scratch · 2025",
    title: <>Dino Game<br /><em>in Scratch</em></>,
    lede: "A retro-style 2D endless runner built in Scratch, paying homage to the classic dinosaur game: keep the dino alive by jumping over whatever the desert throws at it.",
    tags: ["Scratch", "Arcade", "Game"],
    img: "dino", alt: "The Dino Game title screen",
    related: { label: "The 3D version", to: "/project/dino_run_3d" },
    embed: {
      label: "Play", title: "Play it here", sub: "Press Space or click the game to jump. Avoid the cacti and flying birds to keep your streak going.",
      src: "https://turbowarp.org/1310615112/embed?dark=true&autoplay=true", frameTitle: "Dino Game, playable", ratio: "480 / 360", maxWidth: 800,
    },
    sections: [
      {
        label: "Why I built it", title: "Game basics",
        cards: [
          { icon: "game", title: "Game loop", desc: "The run keeps going frame after frame, and difficulty ramps up the longer you survive." },
          { icon: "target", title: "Collision detection", desc: "Touching a cactus or a flying bird ends the run." },
          { icon: "cards", title: "Sprite animation", desc: "The dino and the obstacles are animated sprites, in the style of classic arcade games." },
        ],
      },
    ],
    stack: ["Scratch", "TurboWarp"],
  },

  weather_analyzer: {
    name: "Weather Analyzer",
    eyebrow: "Data · Python · 2026",
    title: <>Weather<br /><em>Analyzer</em></>,
    lede: "An object-oriented Python project that explores historical weather data from Kaggle to find patterns, seasonal trends and anomalies, from data cleaning through to visualisation.",
    tags: ["Python", "Pandas", "Data science", "Kaggle"],
    img: "weather_analyzer", alt: "Weather Analyzer charts",
    live: "https://www.kaggle.com/code/layheangrin/weather-analyzer", liveLabel: "Notebook on Kaggle",
    code: GH + "weather-analysis",
    sections: [
      {
        label: "The analysis", title: "End-to-end EDA", sub: "Exploratory data analysis in a Jupyter notebook, from raw data to charts.",
        cards: [
          { icon: "paper", title: "Data cleaning", desc: "Handling missing values and formatting the time-series data." },
          { icon: "chart", title: "Visualisation", desc: "Line charts, heatmaps and distribution plots of the weather trends." },
          { icon: "target", title: "Statistics", desc: "Moving averages and variance to understand how the weather shifts." },
        ],
      },
    ],
    stack: ["Python", "Pandas", "Matplotlib", "Seaborn", "Jupyter", "Kaggle"],
  },

  be_badminton_ui: {
    name: "Be Badminton UI/UX",
    eyebrow: "Design · Figma · 2026",
    title: <>Be Badminton<br /><em>UI/UX design</em></>,
    lede: "A high-fidelity design for the Be Badminton e-commerce platform: a sleek, easy interface that puts premium badminton gear first, with a dark look and vibrant accents for players.",
    tags: ["Figma", "UI/UX", "E-commerce"],
    img: "be_ui", alt: "Be Badminton interface screens",
    related: { label: "The website", to: "/project/be_badminton" },
    embed: {
      label: "Prototype", title: "The Figma file", sub: "Pan and zoom around the design, straight from Figma.",
      src: "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FBkRDK2oXY0kqL5FOwY1UdI%2Fbadminton%3Fnode-id%3D0-1%26t%3Dp2Nt9H8rPuVkj5Nc-1",
      frameTitle: "Be Badminton Figma prototype", ratio: "16 / 10",
    },
    sections: [
      {
        label: "The design", title: "What it covers",
        cards: [
          { icon: "cards", title: "Design system", desc: "Typography, colour palettes and a component library." },
          { icon: "cart", title: "User journey", desc: "A streamlined path from finding a product to checkout." },
          { icon: "signal", title: "Mobile first", desc: "Designed for phones first, so it works across every device." },
        ],
      },
    ],
    stack: ["Figma"],
  },

  dino_run_3d: {
    name: "Dino Run 3D",
    eyebrow: "Game · Three.js · 2026",
    title: <>Dino Run<br /><em>in 3D</em></>,
    lede: "A 3D take on the Chrome offline dinosaur game. The dino runs on the spot while the desert scrolls past; cacti and pterodactyls appear out of the fog, the speed keeps climbing, and day turns to night the longer you last.",
    tags: ["Three.js", "Vite", "Web Audio", "Game"],
    img: "dino3d", alt: "Dino Run 3D in the desert",
    live: "https://dino3d.rinlayheang.me/", code: GH + "dino-run-3d",
    stats: [
      { value: "0", label: "Art or audio files shipped: models are built from boxes, sounds are synthesised" },
      { value: "3", label: "Pterodactyl heights: jump the low, duck the middle, run under the high" },
      { value: "700", label: "Points between each day and night swap" },
    ],
    sections: [
      {
        label: "Play", title: "How to play", sub: "Keyboard or touch. Your best score and sound setting are kept in the browser.",
        cards: [
          { icon: "game", title: "Jump", desc: "Space, ↑ or W. On touch, tap or press JUMP. Cacti come small, large and in clusters." },
          { icon: "down", title: "Duck", desc: "↓ or S, which also drops you faster in the air. On touch, swipe down or hold DUCK." },
          { icon: "pause", title: "Pause", desc: "P or Esc. The score climbs about 10 points a second, with a bleep and a blink every 100." },
          { icon: "sound", title: "Mute", desc: "M, or the sound button on touch screens." },
        ],
        cols: 2,
      },
      {
        label: "Under the hood", title: "How it works",
        cards: [
          { icon: "code", title: "A treadmill world", desc: "The dino holds at z = 0; the ground, scenery and obstacles move toward the camera and are recycled once they pass." },
          { icon: "target", title: "Fair spawning", desc: "Obstacles spawn beyond the fog, with gaps widening as the speed rises, so there is always time to react." },
          { icon: "sound", title: "No asset files", desc: "The dino, cacti and birds are built from boxes at runtime, and every sound comes from the Web Audio API." },
          { icon: "chart", title: "3/4 camera", desc: "The camera sits in a three-quarter side view, so what's coming never hides behind the dino." },
        ],
        cols: 2,
      },
    ],
    stack: ["JavaScript", "Three.js", "Vite", "Web Audio API"],
  },

  konmus: {
    name: "KonMus",
    eyebrow: "Web app · Ed-tech · 2026",
    title: <>KonMus<br /><em>Data Science in Khmer</em></>,
    lede: "A web app for studying Data Science in Khmer: lessons, runnable Python code, a guide to models and technologies, QCM exercises, flashcards and games.",
    tags: ["React", "Express", "PostgreSQL", "Pyodide"],
    img: "konmus", alt: "The KonMus home page",
    live: "https://kon-mus.vercel.app/", code: GH + "KonMus",
    stats: [
      { value: "7", label: "Python libraries running in the browser, including Pandas and scikit-learn" },
      { value: "0", label: "Installs needed to run the code: Python runs in the page" },
    ],
    sections: [
      {
        label: "What's inside", title: "Learn by doing", sub: "Every lesson can end in a QCM, and progress is saved to your account.",
        cards: [
          { icon: "book", title: "Lessons", desc: "Tracks for foundations, SQL, math, statistics, machine learning, deep learning, computer vision, NLP and LLMs." },
          { icon: "code", title: "Runnable code", desc: "Python runs in the browser through Pyodide, and SQL examples run against a sample database." },
          { icon: "chart", title: "Models guide", desc: "Each model explained in Khmer with how it works, pros, cons, when to use it and runnable code." },
          { icon: "quiz", title: "QCM exercises", desc: "Multiple-choice quizzes linked to lessons, with options shuffled on every attempt." },
          { icon: "cards", title: "Flashcards & games", desc: "Decks of terms plus true/false, guess-the-output, sorting, ordering and matching games." },
          { icon: "users", title: "Accounts & admin", desc: "Completed lessons, best scores and known cards are saved; an admin area manages users and content." },
        ],
      },
    ],
    stack: ["React", "Vite", "React Router", "highlight.js", "Pyodide", "Node.js", "Express", "PostgreSQL"],
  },

  passkru_arcade: {
    name: "PassKru Arcade",
    eyebrow: "Web app · Games · 2026",
    title: <>PassKru<br /><em>Arcade</em></>,
    lede: "A set of quick learning games in Khmer, built for the PassKru booth: players pick a game, answer questions and play against the clock or an AI.",
    tags: ["React", "TypeScript", "Tailwind", "Game"],
    img: "passkru_arcade", alt: "The PassKru Arcade game menu",
    live: "https://passkru.game.rinlayheang.me/",
    stats: [
      { value: "4", label: "Games in the arcade" },
      { value: "4", label: "Flashcard decks: coding, general culture, Data Science and CCNA" },
      { value: "3", label: "Difficulty levels: easy, medium and hard" },
    ],
    sections: [
      {
        label: "The games", title: "Pick a game", sub: "A daily player count is kept on the booth's device, so the team can see how busy the day was.",
        cards: [
          { icon: "cards", title: "Flashcards", desc: "Coding, general culture, Data Science and CCNA, in three levels: easy, medium and hard." },
          { icon: "robot", title: "Code Maze", desc: "Write a short program of commands to steer a robot through the maze. No time limit." },
          { icon: "target", title: "Nim", desc: "A take-away strategy game played against the computer. No time limit." },
          { icon: "quiz", title: "Knowledge Match", desc: "Match each term to its meaning in two minutes." },
        ],
        cols: 2,
      },
    ],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Lucide", "Vercel"],
  },

  be_badminton: {
    name: "Be Badminton website",
    eyebrow: "Web · E-commerce · 2026",
    title: <>Be Badminton<br /><em>online shop</em></>,
    lede: "An e-commerce site for Be Badminton, the gear shop I run: product pages by category, a cart, and one sign-in that sends customers to the store and admins to their dashboard.",
    tags: ["HTML", "CSS", "JavaScript", "E-commerce"],
    img: "be_badminton", alt: "The Be Badminton website on a laptop",
    code: GH + "Bebadminton",
    related: { label: "The UI/UX design", to: "/project/be_badminton_ui" },
    stats: [
      { value: "7", label: "Shop categories: rackets, shoes, shuttlecocks, bags, accessories, men and women" },
      { value: "2", label: "Roles, customer and admin, from one sign-in" },
      { value: "3", label: "Admin areas: inventory, order status and user roles" },
    ],
    sections: [
      {
        label: "Features", title: "Store and dashboard",
        cards: [
          { icon: "cart", title: "Storefront", desc: "Category pages, product detail pages and a cart for badminton gear." },
          { icon: "lock", title: "One sign-in", desc: "A single user icon replaces separate login and sign-up buttons; each role is redirected to the right place." },
          { icon: "chart", title: "Admin dashboard", desc: "A sidebar for inventory, order status and user roles, with stats cards, data tables and an add-product form." },
          { icon: "users", title: "Role-based access", desc: "Admin pages are closed to customers, and the header updates to match whoever is signed in." },
        ],
        cols: 2,
      },
    ],
    stack: ["HTML", "CSS", "JavaScript", "localStorage"],
  },

  robot_car: {
    name: "4WD robot car",
    eyebrow: "Hardware · Arduino · 2026",
    title: <>4WD<br /><em>robot car</em></>,
    lede: "A four-wheel-drive robot built on an Arduino UNO and programmed in C++. It follows a line, detects obstacles, and can be driven by Bluetooth or a joystick.",
    tags: ["Arduino", "C++", "Robotics"],
    img: "robot", alt: "The 4WD robot car",
    stats: [
      { value: "4", label: "Driven wheels" },
      { value: "3", label: "Modes: line following, Bluetooth and joystick" },
    ],
    sections: [
      {
        label: "Features", title: "What it does",
        cards: [
          { icon: "signal", title: "Line following", desc: "Follows a line on the floor on its own." },
          { icon: "target", title: "Obstacle detection", desc: "Detects obstacles in its path." },
          { icon: "robot", title: "Bluetooth control", desc: "Driven from a phone over Bluetooth." },
          { icon: "game", title: "Joystick control", desc: "Driven with a joystick." },
        ],
        cols: 2,
      },
    ],
    stack: ["Arduino UNO", "C++"],
  },

  gas_management: {
    name: "Gas Management System",
    eyebrow: "Terminal app · C · 2025",
    title: <>Gas station<br /><em>management</em></>,
    lede: "A terminal-based admin tool written in C for a first-year project, with role-based menus for running a gas station.",
    tags: ["C", "Terminal", "First year"],
    img: "gas", alt: "The Gas Management System in a terminal",
    sections: [
      {
        label: "Features", title: "What it does",
        cards: [
          { icon: "terminal", title: "Terminal interface", desc: "Runs entirely in the terminal, driven by numbered menus." },
          { icon: "users", title: "Role-based menus", desc: "Each role sees the menu for its own tasks in running the station." },
          { icon: "code", title: "Written in C", desc: "Built from scratch in C as a first-year university project." },
        ],
      },
    ],
    stack: ["C"],
  },
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const p = PROJECTS[slug];
  if (!p) return <Navigate to="/#projects" replace />;

  const links = (
    <>
      {p.live && <ExternalBtn href={p.live} solid>{p.liveLabel || "Live site"}</ExternalBtn>}
      {/* the source only when there is nothing live to show */}
      {p.code && !p.live && <ExternalBtn href={p.code} solid>Source code</ExternalBtn>}
      {p.related && <InternalBtn to={p.related.to} solid={!p.live && !p.code}>{p.related.label}</InternalBtn>}
    </>
  );

  return (
    <CasePage
      key={slug}
      title={p.name}
      accent="#0a7a8c"
      crumb={`Project · ${p.name}`}
      end={{
        title: <>More<br />projects.</>,
        sub: p.live || p.code ? "Try it yourself, read the code, or head back for the rest of my work." : "Head back to the portfolio for the rest of my work.",
        actions: (
          <>
            {p.live && <ExternalBtn href={p.live} solid>{p.liveLabel || "Live site"}</ExternalBtn>}
            {/* a full load, so the browser jumps to the section */}
            <a href="/#projects" className={`cut-btn${p.live ? "" : " is-solid"}`}>All projects <ArrowUpRight /></a>
          </>
        ),
      }}
    >
      <CaseHero
        eyebrow={p.eyebrow}
        title={p.title}
        lede={p.lede}
        tags={p.tags}
        actions={p.live || p.code || p.related ? links : null}
        media={
          <figure className="case-media">
            <div className="case-frame">
              <img
                src={`/img/${p.img}-1200.webp`}
                srcSet={`/img/${p.img}-640.webp 640w, /img/${p.img}-1200.webp 1200w`}
                sizes="(max-width: 960px) 92vw, 45vw"
                width="1200" height="630" alt={p.alt} fetchPriority="high"
              />
            </div>
          </figure>
        }
      />

      {p.stats && <Stats items={p.stats} />}

      {p.embed && (
        <CaseSection label={p.embed.label} title={p.embed.title} sub={p.embed.sub}>
          <div className="case-frame case-embed" style={{ aspectRatio: p.embed.ratio, maxWidth: p.embed.maxWidth }}>
            <iframe src={p.embed.src} title={p.embed.frameTitle} loading="lazy" allowFullScreen allow="fullscreen" />
          </div>
        </CaseSection>
      )}

      {p.sections.map((s) => (
        <CaseSection key={s.title} label={s.label} title={s.title} sub={s.sub}>
          <Cards items={s.cards} cols={s.cols} />
        </CaseSection>
      ))}

      <CaseSection label="Stack" title="Built with">
        <ul className="case-stack">{p.stack.map((t) => <li key={t}>{t}</li>)}</ul>
      </CaseSection>
    </CasePage>
  );
}
