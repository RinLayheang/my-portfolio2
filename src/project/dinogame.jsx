import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dinoImg from "../assets/dino.png";

const COLORS = {
  bg: "#000000",
  surface: "#080808",
  card: "#0d0d0d",
  border: "#1a1a1a",
  accent: "#4df0c0",
  accent2: "#4db8f0",
  text: "#dce4f0",
  muted: "#5a6478",
  white: "#f0f4ff",
};

export default function DinoGame() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    // SEO / Open Graph Update
    const originalTitle = document.title;
    const currentUrl = window.location.href;
    const metaTags = [
      { property: "og:title", content: "Dino Game | Rin Layheang" },
      { property: "og:description", content: "A fast-paced endless runner built on Scratch, featuring classic arcade mechanics." },
      { property: "og:image", content: window.location.origin + "/dino.png" },
      { property: "og:url", content: currentUrl },
      { name: "twitter:title", content: "Dino Game | Rin Layheang" },
      { name: "twitter:description", content: "A fast-paced endless runner built on Scratch, featuring classic arcade mechanics." },
      { name: "twitter:image", content: window.location.origin + "/dino.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ];

    const prevMetaValues = {};

    document.title = "Dino Game | Rin Layheang";

    metaTags.forEach(tag => {
      const selector = tag.property
        ? `meta[property="${tag.property}"]`
        : `meta[name="${tag.name}"]`;
      let el = document.querySelector(selector);

      if (el) {
        prevMetaValues[selector] = el.getAttribute("content");
        el.setAttribute("content", tag.content);
      } else {
        // Create if doesn't exist
        el = document.createElement("meta");
        if (tag.property) el.setAttribute("property", tag.property);
        if (tag.name) el.setAttribute("name", tag.name);
        el.setAttribute("content", tag.content);
        document.head.appendChild(el);
        prevMetaValues[selector] = null;
      }
    });

    return () => {
      document.title = originalTitle;
      Object.entries(prevMetaValues).forEach(([selector, val]) => {
        const el = document.querySelector(selector);
        if (el) {
          if (val === null) el.remove();
          else el.setAttribute("content", val);
        }
      });
    };
  }, []);

  return (
    <div style={{
      backgroundColor: COLORS.bg,
      color: COLORS.text,
      minHeight: "100vh",
      fontFamily: "monospace",
      overflowX: "hidden"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');
        
        html, body { 
          background: ${COLORS.bg} !important; 
          margin: 0; 
        }

        .main-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 40px;
          margin-top: 40px;
        }

        @media (max-width: 1100px) {
          .main-grid {
            grid-template-columns: 1fr;
          }
        }

        .game-container {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          background: #000;
          border-radius: 0;
          overflow: hidden;
          box-shadow: 0 0 100px rgba(0, 0, 0, 0.8);
          transition: all 0.4s ease;
        }

        @media (max-width: 768px) {
          main {
            padding: 24px 0 100px !important;
          }
          .back-link, .section-title, .tag-container {
            margin-left: 24px !important;
            margin-right: 24px !important;
          }
          .game-container {
            width: 100% !important;
            aspect-ratio: 4 / 3 !important;
            margin-bottom: 32px;
          }
          .info-column {
            padding: 0 24px;
          }
          nav {
            padding: 24px !important;
          }
        }

        .game-container:hover {
          border-color: ${COLORS.accent};
          box-shadow: 0 0 60px rgba(77, 240, 192, 0.15);
        }

        .iframe-wrapper {
          width: 100%;
          height: 100%;
          border: none;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: ${COLORS.muted};
          text-decoration: none;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          transition: color 0.3s ease;
          margin-bottom: 40px;
        }

        .back-link:hover {
          color: ${COLORS.accent};
        }

        .section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 42px;
          color: ${COLORS.white};
          margin-bottom: 24px;
          letter-spacing: 0.05em;
        }

        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-top: 60px;
        }

        @media (max-width: 768px) {
          .info-grid {
            grid-template-columns: 1fr;
          }
        }

        .info-card {
          background: ${COLORS.card};
          border: 1px solid ${COLORS.border};
          padding: 32px;
          height: 100%;
        }

        .info-card h3 {
          color: ${COLORS.accent};
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .info-card h3::before {
          content: "";
          display: block;
          width: 20px;
          height: 1px;
          background: ${COLORS.accent};
        }

        .info-card p {
          color: ${COLORS.muted};
          line-height: 1.8;
          font-size: 13px;
        }

        .tag {
          display: inline-block;
          padding: 4px 12px;
          border: 1px solid ${COLORS.border};
          font-size: 10px;
          color: ${COLORS.muted};
          margin-right: 8px;
          margin-bottom: 8px;
        }
      `}</style>

      {/* Nav */}
      <nav style={{ padding: "40px 56px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link to="/" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: "0.1em", color: COLORS.accent, textDecoration: "none" }}>LAYHEANG</Link>
        <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.2em", color: COLORS.muted }}>PROJECT // 01</div>
      </nav>

      <main style={{ padding: "40px 56px 100px", maxWidth: "1400px", margin: "0 auto" }}>
        <Link to="/" className="back-link">
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span>
          Back to Portfolio
        </Link>

        <h1 className="section-title">Dino Game</h1>
        <div className="tag-container" style={{ display: "flex", gap: 12, marginBottom: 40 }}>
          <span className="tag">SCRATCH</span>
          <span className="tag">ARCADE</span>
          <span className="tag">2025</span>
        </div>

        <div className="main-grid">
          {/* Game Iframe */}
          <div className="game-container">
            {loading && (
              <div style={{
                position: "absolute", inset: 0,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                background: COLORS.bg, zIndex: 1
              }}>
                <div style={{ width: 40, height: 40, border: `2px solid ${COLORS.border}`, borderTopColor: COLORS.accent, borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                <p style={{ marginTop: 20, color: COLORS.muted, fontSize: 11, letterSpacing: "0.1em" }}>LOADING GAME...</p>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            )}
            <iframe
              src="https://turbowarp.org/1131368328/embed?dark=true&autoplay=true"
              allowtransparency="true"
              frameBorder="0"
              scrolling="no"
              allowFullScreen
              className="iframe-wrapper"
              onLoad={() => setLoading(false)}
              title="Dino Game"
              style={{
                width: "100%",
                height: "100%",
                background: "#000",
                opacity: loading ? 0 : 1,
                transition: "opacity 0.5s ease"
              }}
            />
          </div>

          {/* Info Column */}
          <div className="info-column" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div className="info-card">
              <h3>About Project</h3>
              <p>
                This Dino Game is a classic endless runner project built using Scratch
              </p>
            </div>

            <div className="info-card">
              <h3>Instructions</h3>
              <p>
                The objective is simple: survive as long as possible while running through the desert.
                <br /><br />
                • Press <strong>SPACE</strong> to jump. <br />
                • Avoid cacti and flying birds to maintain your streak.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer style={{ borderTop: `1px solid ${COLORS.border}`, padding: "40px 56px", marginTop: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 17, color: COLORS.muted }}>RIN LAYHEANG</div>
          <div style={{ fontFamily: "monospace", fontSize: 11, color: COLORS.muted }}>© 2025 · DINO GAME</div>
        </div>
      </footer>
    </div>
  );
}
