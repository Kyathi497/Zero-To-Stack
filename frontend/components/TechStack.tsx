"use client";

const frontendTech = [
  { label: "HTML 5", bg: "#E34F26", ic: "H" },
  { label: "CSS 3", bg: "#1572B6", ic: "C" },
  { label: "JavaScript", bg: "#F7DF1E", ic: "JS", dark: true },
  { label: "TypeScript", bg: "#3178C6", ic: "TS" },
  { label: "React", bg: "#61DAFB", ic: "⚛", dark: true },
  { label: "Next.js", bg: "#000", ic: "N", border: true },
  { label: "Tailwind", bg: "#06B6D4", ic: "~" },
];

const backendTech = [
  { label: "Node.js", bg: "#339933", ic: "N" },
  { label: "Express", bg: "#444", ic: "E" },
  { label: "MySQL", bg: "#00758F", ic: "SQL" },
  { label: "Git", bg: "#F05032", ic: "Git" },
  { label: "GitHub", bg: "#24292E", ic: "GH", border: true },
  { label: "Postman", bg: "#FF6C37", ic: "P" },
  { label: "Vercel", bg: "#000", ic: "▲", border: true },
];

export default function TechStack() {
  return (
    <section id="tech" className="section">
      <div className="grid-bg" />
      <div className="glow-orange" style={{ top: -400, left: "40%", opacity: 0.4 }} />
      <div className="section-inner" style={{ paddingBottom: 0 }}>
        <div className="eyebrow animate-reveal">02 / Technology</div>
        <h2 className="animate-reveal animate-reveal-d1" style={{ fontSize: "clamp(48px,6vw,88px)", lineHeight: 0.98, letterSpacing: "-0.03em", fontWeight: 700, margin: 0 }}>
          Technologies<br />you will master.
        </h2>
        <p className="animate-reveal animate-reveal-d2" style={{ fontSize: "clamp(16px,1.5vw,28px)", lineHeight: 1.45, color: "var(--text-dim)", maxWidth: 900, marginTop: 28 }}>
          Industry-standard tools, taught in order. From the first{" "}
          <code style={{ color: "var(--orange)", fontFamily: "var(--mono)" }}>&lt;html&gt;</code>{" "}
          tag to a deployed full-stack app on Vercel.
        </p>
      </div>

      <div className="marquee-wrap" style={{ position: "absolute", left: 0, right: 0, top: "clamp(260px,28vw,480px)" }}>
        <div className="marquee-track">
          {[...Array(2)].flatMap((_, ai) =>
            frontendTech.map((t, i) => (
              <div key={`${ai}-${i}`} className="tech-chip">
                <div className="ic" style={{ background: t.bg, color: t.dark ? "#111" : "#fff", border: t.border ? "1px solid rgba(255,255,255,0.2)" : undefined }}>{t.ic}</div>
                {t.label}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="marquee-wrap" style={{ position: "absolute", left: 0, right: 0, top: "clamp(340px,38vw,680px)" }}>
        <div className="marquee-track-rev">
          {[...Array(2)].flatMap((_, ai) =>
            backendTech.map((t, i) => (
              <div key={`${ai}-${i}`} className="tech-chip">
                <div className="ic" style={{ background: t.bg, color: "#fff", border: t.border ? "1px solid rgba(255,255,255,0.2)" : undefined }}>{t.ic}</div>
                {t.label}
              </div>
            ))
          )}
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 32, left: "clamp(24px,6vw,100px)", right: "clamp(24px,6vw,100px)" }} className="slide-chrome">
        <span>Zero to Stack · 2026</span>
        <span className="page-num">03 / 11</span>
      </div>
    </section>
  );
}