/* eslint-disable react-refresh/only-export-components -- small shared building blocks */
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Contours } from "../portfolio.jsx";
import "./case.css";

export const Icon = ({ d }) => (
  <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>
);
export const ArrowUpRight = () => <Icon d="M7 17 17 7M8 7h9v9" />;
const ArrowLeft = () => <Icon d="M19 12H5m6-6-6 6 6 6" />;

// stroke paths for card icons
export const ICONS = {
  plan: "M4 5h16M4 12h10M4 19h7m8-4 2 2-5 5-3-3",
  quiz: "M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3m.1 4h0M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z",
  cards: "M3 7h14v12H3zM7 3h14v12",
  timer: "M12 13V9m-3-7h6M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z",
  target: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-5a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
  paper: "M14 3H6v18h12V7l-4-4Zm0 0v4h4M9 13h6M9 17h4",
  mentor: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 9a7 7 0 0 1 14 0",
  news: "M4 5h13v14H6a2 2 0 0 1-2-2V5Zm13 4h3v8a2 2 0 0 1-4 0M8 9h5M8 13h5",
  chart: "M4 20V10m6 10V4m6 16v-7m4 7H2",
  lang: "M4 5h8M8 3v2m2 0c0 4-3 7-6 8m2-4c1 2 3 3 5 3m3 9 4-10 4 10m-7-3h6",
  flag: "M5 21V4m0 0h11l-2 4 2 4H5",
  hand: "M9 11V5a2 2 0 0 1 4 0v6m0-2a2 2 0 0 1 4 0v4a7 7 0 0 1-7 7 6 6 0 0 1-5-3l-2-4a2 2 0 0 1 3-2l2 2",
  queue: "M4 6h16M4 12h16M4 18h10",
  game: "M6 9h4M8 7v4m7-1h.01M18 12h.01M7 5h10a5 5 0 0 1 5 5v2a5 5 0 0 1-9 3h-2a5 5 0 0 1-9-3v-2a5 5 0 0 1 5-5Z",
  code: "m8 8-4 4 4 4m8-8 4 4-4 4m-2-11-4 14",
  book: "M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Zm0 14a2 2 0 0 1 2-2h13",
  robot: "M12 3v3m-6 3h12v10H6zm3 4h.01M15 13h.01M9 17h6M3 12v3m18-3v3",
  cart: "M3 4h2l2.4 11h11L21 8H6.5M9 20h.01M18 20h.01",
  lock: "M6 11h12v10H6zm2 0V8a4 4 0 0 1 8 0v3",
  terminal: "M4 5h16v14H4zm3 4 3 3-3 3m5 0h5",
  sound: "M4 10v4h4l5 4V6L8 10H4Zm12-1a4 4 0 0 1 0 6",
  moon: "M20 14A8 8 0 1 1 10 4a7 7 0 0 0 10 10Z",
  down: "M12 4v14m-6-6 6 6 6-6M5 21h14",
  pause: "M8 5v14m8-14v14",
  users: "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 10a7 7 0 0 1 14 0m1-10a3 3 0 1 0 0-6m2 16a6 6 0 0 0-3-5",
  signal: "M5 12a10 10 0 0 1 14 0M8.5 15.5a5 5 0 0 1 7 0M12 19h.01",
};

/* Page shell: sticky back bar, contour background, dark closing band. */
export function CasePage({ title, accent, crumb, children, end }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${title} | Rin Layheang`;
  }, [title]);

  return (
    <div className="case" style={{ "--accent": accent }}>
      <Contours />
      <header className="case-bar">
        <div className="case-wrap">
          <Link to="/" className="case-back"><ArrowLeft />Portfolio</Link>
          <Link to="/" className="cond case-brand">Rin Layheang</Link>
          <span className="case-crumb">{crumb}</span>
        </div>
      </header>
      <main className="case-wrap">{children}</main>
      {end && (
        <section className="case-end tone tone-ink" style={{ "--accent": "#ffd43b" }}>
          <div className="case-wrap">
            <div>
              <h2 className="cond">{end.title}</h2>
              {end.sub && <p>{end.sub}</p>}
            </div>
            <div className="case-actions">{end.actions}</div>
          </div>
        </section>
      )}
    </div>
  );
}

export function CaseHero({ eyebrow, title, lede, tags, actions, media }) {
  return (
    <section className="case-hero">
      <div className="case-in">
        <p className="hud-label case-eyebrow" style={{ "--i": 0 }}>{eyebrow}</p>
        <h1 className="cond case-title" style={{ "--i": 1 }}>{title}</h1>
        <p className="case-lede" style={{ "--i": 2 }}>{lede}</p>
        {tags && <ul className="tags" style={{ "--i": 3 }}>{tags.map((t) => <li key={t}>{t}</li>)}</ul>}
        {actions && <div className="case-actions" style={{ "--i": 4 }}>{actions}</div>}
      </div>
      <div className="case-in"><div style={{ "--i": 2 }}>{media}</div></div>
    </section>
  );
}

export function CaseSection({ label, title, sub, children }) {
  return (
    <section className="case-sec">
      <div className="case-sec-head">
        <div>
          <p className="hud-label">{label}</p>
          <h2 className="cond">{title}</h2>
        </div>
        {sub && <p>{sub}</p>}
      </div>
      {children}
    </section>
  );
}

export const Stats = ({ items }) => (
  <div className="case-stats" style={{ "--n": items.length }}>
    {items.map((s) => (
      <div key={s.label} className="hud case-stat">
        <b className="cond">{s.value}</b>
        <span>{s.label}</span>
      </div>
    ))}
  </div>
);

export const Cards = ({ items, cols = 3 }) => (
  <div className="case-grid" style={{ "--cols": cols }}>
    {items.map((c) => (
      <article key={c.title} className="hud case-card">
        {c.icon && <span className="case-card-icon"><Icon d={ICONS[c.icon]} /></span>}
        <h3 className="cond">{c.title}</h3>
        <p>{c.desc}</p>
      </article>
    ))}
  </div>
);

export const ExternalBtn = ({ href, children, solid }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={`cut-btn${solid ? " is-solid" : ""}`}>
    {children} <ArrowUpRight />
  </a>
);

export const InternalBtn = ({ to, children, solid }) => (
  <Link to={to} className={`cut-btn${solid ? " is-solid" : ""}`}>
    {children} <ArrowUpRight />
  </Link>
);
