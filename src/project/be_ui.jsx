import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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

export default function BeBadmintonUI() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);

        // SEO / Open Graph Update
        const originalTitle = document.title;
        const currentUrl = window.location.href;
        const metaTags = [
            { property: "og:title", content: "Be Badminton UX/UI | Rin Layheang" },
            { property: "og:description", content: "A modern UI/UX design for a badminton gear e-commerce platform." },
            { property: "og:url", content: currentUrl },
            { name: "twitter:title", content: "Be Badminton UX/UI | Rin Layheang" },
            { name: "twitter:description", content: "A modern UI/UX design for a badminton gear e-commerce platform." },
            { name: "twitter:card", content: "summary_large_image" },
        ];

        const prevMetaValues = {};

        document.title = "Be Badminton UX/UI | Rin Layheang";

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

        .project-display {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          background: ${COLORS.card};
          border: 1px solid ${COLORS.border};
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
          .project-display {
            width: 100% !important;
            aspect-ratio: 4 / 3 !important;
            margin-bottom: 32px;
            border-left: none;
            border-right: none;
          }
          .info-column {
            padding: 0 24px;
          }
          nav {
            padding: 24px !important;
          }
        }

        .project-display:hover {
          border-color: ${COLORS.accent2};
          box-shadow: 0 0 60px rgba(77, 184, 240, 0.15);
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
          color: ${COLORS.accent2};
        }

        .section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 42px;
          color: ${COLORS.white};
          margin-bottom: 24px;
          letter-spacing: 0.05em;
        }

        .info-card {
          background: ${COLORS.card};
          border: 1px solid ${COLORS.border};
          padding: 32px;
          height: 100%;
        }

        .info-card h3 {
          color: ${COLORS.accent2};
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
          background: ${COLORS.accent2};
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
                <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.2em", color: COLORS.muted }}>PROJECT // 05</div>
            </nav>

            <main style={{ padding: "40px 56px 100px", maxWidth: "1400px", margin: "0 auto" }}>
                <Link to="/" className="back-link">
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span>
                    Back to Portfolio
                </Link>

                <h1 className="section-title">Be Badminton UX/UI</h1>
                <div className="tag-container" style={{ display: "flex", gap: 12, marginBottom: 40, flexWrap: "wrap" }}>
                    <span className="tag">FIGMA</span>
                    <span className="tag">UI/UX DESIGN</span>
                    <span className="tag">E-COMMERCE</span>
                </div>

                <div className="main-grid">
                    {/* Project Display */}
                    <div className="project-display">
                        {loading && (
                            <div style={{
                                position: "absolute", inset: 0,
                                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                                background: COLORS.bg, zIndex: 1
                            }}>
                                <div style={{ width: 40, height: 40, border: `2px solid ${COLORS.border}`, borderTopColor: COLORS.accent2, borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                                <p style={{ marginTop: 20, color: COLORS.muted, fontSize: 11, letterSpacing: "0.1em" }}>LOADING FIGMA...</p>
                                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                            </div>
                        )}
                        <iframe
                            src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FBkRDK2oXY0kqL5FOwY1UdI%2Fbadminton%3Fnode-id%3D0-1%26t%3Dp2Nt9H8rPuVkj5Nc-1"
                            allowFullScreen={true}
                            allow="fullscreen"
                            className="iframe-wrapper"
                            onLoad={() => setLoading(false)}
                            title="Be Badminton Figma Prototype"
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
                                A high-fidelity UX/UI design project for the Be Badminton e-commerce platform. The goal was to create a sleek, user-friendly interface that highlights premium badminton gear and accessories.
                                <br /><br />
                                The design system leverages a dark mode aesthetic with vibrant accents to appeal to sports enthusiasts and professional players.
                            </p>
                        </div>

                        <div className="info-card">
                            <h3>Key Features</h3>
                            <p>
                                • <strong>Design System:</strong> Comprehensive typography, color palettes, and component library.<br /><br />
                                • <strong>User Journey:</strong> Streamlined shopping experience from product discovery to checkout.<br /><br />
                                • <strong>Responsiveness:</strong> Designed with mobile-first principles ensuring accessibility across all devices.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <footer style={{ borderTop: `1px solid ${COLORS.border}`, padding: "40px 56px", marginTop: "auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 17, color: COLORS.muted }}>RIN LAYHEANG</div>
                    <div style={{ fontFamily: "monospace", fontSize: 11, color: COLORS.muted }}>© 2026 · BE BADMINTON UX/UI</div>
                </div>
            </footer>
        </div>
    );
}
