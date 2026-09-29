import { useEffect } from "react";
import { Link } from "react-router-dom";

const COLORS = {
  bg: "#000000",
  surface: "#080808",
  card: "#0d0d0d",
  border: "#1a1a1a",
  accent: "#8a5cf6",
  text: "#dce4f0",
  muted: "#5a6478",
  white: "#f0f4ff",
};

export default function PassKruStartup() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "PassKru Startup | Rin Layheang";
  }, []);

  return (
    <div style={{ backgroundColor: COLORS.bg, color: COLORS.text, minHeight: "100vh", fontFamily: "monospace", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=analytics,arrow_back,open_in_new&display=block');
        
        html, body { background: ${COLORS.bg} !important; margin: 0; }
        .back-link { display: inline-flex; align-items: center; gap: 8px; color: ${COLORS.muted}; text-decoration: none; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; transition: color 0.3s ease; margin-bottom: 40px; }
        .back-link:hover { color: ${COLORS.accent}; }
        .section-title { font-family: 'Bebas Neue', sans-serif; font-size: 48px; color: ${COLORS.white}; margin-bottom: 24px; letter-spacing: 0.05em; }
        
        .tag { display: inline-block; padding: 4px 12px; border: 1px solid ${COLORS.border}; font-size: 10px; color: ${COLORS.muted}; margin-right: 8px; margin-bottom: 8px; }
        
        .info-card { background: ${COLORS.card}; border: 1px solid ${COLORS.border}; padding: 40px; margin-bottom: 40px; }
        .info-card h3 { color: ${COLORS.accent}; font-size: 14px; text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
        .info-card h3::before { content: ""; display: block; width: 20px; height: 1px; background: ${COLORS.accent}; }
        .info-card p { color: ${COLORS.muted}; line-height: 1.8; font-size: 14px; margin-bottom: 32px; }
        
        .team-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; }
        .team-member { background: ${COLORS.surface}; border: 1px solid ${COLORS.border}; padding: 24px; text-align: center; }
        .team-avatar { width: 80px; height: 80px; background: #222; border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold; color: ${COLORS.muted}; }
        .team-name { font-family: 'Bebas Neue', sans-serif; font-size: 20px; color: ${COLORS.white}; letter-spacing: 0.05em; margin: 0 0 4px; }
        .team-role { font-size: 11px; color: ${COLORS.accent}; letter-spacing: 0.1em; text-transform: uppercase; }

        .btn-link { display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: ${COLORS.accent}; color: #fff; text-decoration: none; font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.1em; font-size: 18px; border-radius: 4px; transition: opacity 0.3s ease; border: 1px solid ${COLORS.accent}; }
        .btn-link:hover { opacity: 0.8; }
      `}</style>

      <nav style={{ padding: "40px 56px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link to="/" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: "0.1em", color: COLORS.accent, textDecoration: "none" }}>LAYHEANG</Link>
        <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.2em", color: COLORS.muted }}>STARTUP // PASSKRU</div>
      </nav>

      <main style={{ padding: "40px 56px 100px", maxWidth: "1200px", margin: "0 auto" }}>
        <Link to="/" className="back-link">
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span>
          Back to Portfolio
        </Link>

        <h1 className="section-title">PassKru Startup</h1>
        <div style={{ display: "flex", gap: 12, margin: "-12px 0 40px", flexWrap: "wrap" }}>
          <span className="tag">ED-TECH</span>
          <span className="tag">SAAS</span>
          <span className="tag">STARTUP</span>
          <span className="tag">2026</span>
        </div>

        <div className="info-card">
          <h3>Startup Detail</h3>
          <img src="/img/passkru-hero.png" alt="PassKru App Preview" style={{ width: '100%', borderRadius: '8px', marginBottom: '32px' }} />
          <p>
            Our project is PassKru, a learning platform designed to help teacher-exam candidates prepare more effectively. It provides practice questions, quizzes, flashcards, mock exams, and personalized study plans based on each learner’s needs.
            <br /><br />
            Our initial prototype was built for the Next-Gen Engagement Program (NGEP) Batch 3, where we won 1st place among many talented teams.
          </p>
          <a href="https://pass-kru67.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn-link">
            Visit PassKru App <span className="material-symbols-outlined" style={{ fontSize: 18 }}>open_in_new</span>
          </a>
        </div>

        <div className="info-card">
          <h3>The Team</h3>
          <div className="team-grid">
            <div className="team-member">
              <div className="team-avatar">RS</div>
              <h4 className="team-name">Roth Sorayuth</h4>
              <p className="team-role">Founder</p>
            </div>
            <div className="team-member">
              <div className="team-avatar">RL</div>
              <h4 className="team-name">Rin LayHeang</h4>
              <p className="team-role">Co-Founder</p>
            </div>
            <div className="team-member">
              <div className="team-avatar">SC</div>
              <h4 className="team-name">So ChanNolly</h4>
              <p className="team-role">Backend (Co-Founder)</p>
            </div>
            <div className="team-member">
              <div className="team-avatar">YE</div>
              <h4 className="team-name">Yun Eychhean</h4>
              <p className="team-role">UI/UX & Frontend (Co-Founder)</p>
            </div>
            <div className="team-member">
              <div className="team-avatar">YS</div>
              <h4 className="team-name">Yoeung Seyha</h4>
              <p className="team-role">Curriculum Lead</p>
            </div>
            <div className="team-member">
              <div className="team-avatar">LH</div>
              <h4 className="team-name">Ly Him</h4>
              <p className="team-role">Graphic & 3D Designer</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
