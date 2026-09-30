import { CasePage, CaseHero, CaseSection, Stats, Cards, ExternalBtn, InternalBtn } from "./CaseStudy.jsx";

const FEATURES = [
  { icon: "plan", title: "AI study plan", desc: "A placement test sets the starting point, then the plan adapts to each learner's needs." },
  { icon: "quiz", title: "Practice quizzes", desc: "Questions by subject, with instant explanations." },
  { icon: "cards", title: "Flashcards", desc: "Review key terms and must-know formulas." },
  { icon: "timer", title: "Mock exams", desc: "Timed papers that feel like the real exam." },
  { icon: "target", title: "Weakness analysis", desc: "See exactly which topics to strengthen." },
  { icon: "paper", title: "Past papers", desc: "Real exam papers from previous years." },
  { icon: "mentor", title: "Expert mentors", desc: "Advice from experienced teachers." },
  { icon: "news", title: "Exam news", desc: "Official exam news as soon as it's out." },
  { icon: "chart", title: "Progress tracking", desc: "A readiness score and full activity history." },
];

const TEAM = [
  { initials: "RS", name: "Roth Sorayuth", role: "Founder" },
  { initials: "RL", name: "Rin LayHeang", role: "Co-founder", me: true },
  { initials: "SC", name: "So ChanNolly", role: "Co-founder · Backend" },
  { initials: "YE", name: "Yun Eychhean", role: "Co-founder · UI/UX & frontend" },
  { initials: "YS", name: "Yoeung Seyha", role: "Curriculum lead" },
  { initials: "LH", name: "Ly Him", role: "Graphic & 3D designer" },
];

const STACK = ["React", "Node.js", "Express.js", "PostgreSQL", "Vercel", "Railway", "Figma", "GitHub", "Postman"];

export default function PassKruStartup() {
  return (
    <CasePage
      title="PassKru Startup"
      accent="#2f5bea"
      crumb="Startup · PassKru"
      end={{
        title: <>Pass with<br />confidence.</>,
        sub: "AI study plans, real practice and measurable progress for Cambodia's teacher-exam candidates.",
        actions: (
          <>
            <ExternalBtn href="https://pass-kru67.vercel.app/" solid>Visit PassKru</ExternalBtn>
            <InternalBtn to="/project/passkru_ngep">The NGEP win</InternalBtn>
          </>
        ),
      }}
    >
      <CaseHero
        eyebrow="Co-founder · Ed-tech · In development"
        title={<>PassKru<br /><em>teacher exam prep</em></>}
        lede="Cambodia's state teacher-exam prep platform, with a personalized AI study plan, practice and mock exams, all in one place."
        tags={["Ed-tech", "SaaS", "Startup", "2026"]}
        actions={
          <>
            <ExternalBtn href="https://pass-kru67.vercel.app/" solid>Visit the app</ExternalBtn>
            <InternalBtn to="/project/passkru_ngep">1st place at NGEP</InternalBtn>
          </>
        }
        media={
          <figure className="case-media">
            <div className="browser case-frame">
              <div className="browser-bar" aria-hidden="true">
                <span className="dot" /><span className="dot" /><span className="dot" />
                <span className="browser-url">passkru.com</span>
              </div>
              <img src="/img/passkru-site-1024.webp" width="1024" height="516" alt="The PassKru home page" fetchPriority="high" style={{ aspectRatio: "auto" }} />
            </div>
          </figure>
        }
      />

      <Stats
        items={[
          { value: "10", label: "Study tools in one platform" },
          { value: "6", label: "People on the founding team" },
          { value: "1st", label: "Place at NGEP Batch 3" },
        ]}
      />

      <CaseSection label="The product" title="Everything to pass" sub="PassKru helps teacher-exam candidates prepare with practice questions, quizzes, flashcards, mock exams and a study plan built around each learner.">
        <div className="case-split">
          <Cards items={FEATURES} cols={2} />
          <figure className="case-media case-media-poster">
            <div className="case-frame">
              <img src="/img/passkru-poster-1080.webp" srcSet="/img/passkru-poster-640.webp 640w, /img/passkru-poster-1080.webp 1080w" sizes="(max-width: 960px) 92vw, 440px" width="1080" height="1528" alt="PassKru poster: prepare for your teacher exam" loading="lazy" decoding="async" />
            </div>
            <figcaption>The PassKru launch poster</figcaption>
          </figure>
        </div>
      </CaseSection>

      <CaseSection label="Origin" title="Built to win, then built out" sub="The first prototype was built for the Next-Gen Engagement Program (NGEP) Batch 3, where it took 1st place.">
        <div className="case-prose">
          <p>We started PassKru as a competition prototype and kept going after the win. The product now grows from that MVP into a full platform for exam preparation.</p>
          <div>
            <p className="hud-label" style={{ marginBottom: 14 }}>Built with</p>
            <ul className="case-stack">{STACK.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
        </div>
      </CaseSection>

      <CaseSection label="People" title="The team" sub="Six founders and builders across product, engineering, curriculum and design.">
        <ul className="case-team">
          {TEAM.map((m) => (
            <li key={m.name} className={`hud case-member${m.me ? " is-me" : ""}`}>
              <span className="case-avatar" aria-hidden="true">{m.initials}</span>
              <div><strong>{m.name}</strong><span>{m.role}</span></div>
            </li>
          ))}
        </ul>
      </CaseSection>
    </CasePage>
  );
}
