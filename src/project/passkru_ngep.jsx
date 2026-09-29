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

export default function PassKruNgep() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "PassKru 1st Place NGEP | Rin Layheang";
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
        
        .btn-link { display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: ${COLORS.accent}; color: #fff; text-decoration: none; font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.1em; font-size: 18px; border-radius: 4px; transition: opacity 0.3s ease; border: 1px solid ${COLORS.accent}; }
        .btn-link:hover { opacity: 0.8; }
        .btn-outline { background: transparent; color: ${COLORS.accent}; }
        
        .gallery-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
        .gallery-img { width: 100%; aspect-ratio: 4/3; object-fit: cover; border-radius: 8px; border: 1px solid ${COLORS.border}; }
      `}</style>

      <nav style={{ padding: "40px 56px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link to="/" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: "0.1em", color: COLORS.accent, textDecoration: "none" }}>LAYHEANG</Link>
        <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.2em", color: COLORS.muted }}>ACHIEVEMENT // 01</div>
      </nav>

      <main style={{ padding: "40px 56px 100px", maxWidth: "1200px", margin: "0 auto" }}>
        <Link to="/" className="back-link">
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span>
          Back to Portfolio
        </Link>

        <h1 className="section-title">🏆 1st Place - NGEP</h1>
        <div style={{ display: "flex", gap: 12, marginBottom: 40, flexWrap: "wrap" }}>
          <span className="tag">STARTUP</span>
          <span className="tag">COMPETITION</span>
          <span className="tag">2026</span>
          <span className="tag">ED-TECH</span>
        </div>

        <div className="info-card">
          <h3>About PassKru & NGEP</h3>
          <p>
            Our team <strong>PassKru</strong> won 1st Place in the Next-Gen Engagement Program (NGEP) Batch 3! 
            <br/><br/>
            PassKru is a gamified educational platform that allows students to play games, answer questions, and win prizes while learning. We pitched our working prototype against teams from many departments and secured the top prize.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <a href="https://pass-kru67.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn-link">
              View PassKru Project <span className="material-symbols-outlined" style={{ fontSize: 18 }}>open_in_new</span>
            </a>
            <a href="https://ngep.idt.edu.kh/" target="_blank" rel="noopener noreferrer" className="btn-link btn-outline">
              NGEP Program <span className="material-symbols-outlined" style={{ fontSize: 18 }}>open_in_new</span>
            </a>
          </div>
        </div>

        <div className="gallery-grid">
          <img src="/img/passkru-ngep-1-1080.webp" alt="NGEP 1st Place Team" className="gallery-img" />
          <img src="/img/passkru-ngep-2-1080.webp" alt="NGEP 1st Place Announcement" className="gallery-img" />
          <img src="/img/passkru-ngep-3-1080.webp" alt="NGEP 1st Place Presentation" className="gallery-img" />
        </div>
      </main>
    </div>
  );
}
