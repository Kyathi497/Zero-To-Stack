"use client";

const featuredProjects = [
  { phase: "Phase 03", name: "Portfolio Page", desc: "Your first deployed site.", tags: ["HTML", "CSS"], span: 2 },
  { phase: "Phase 03", name: "Landing Page", desc: "Pixel-perfect responsive marketing page.", tags: ["HTML", "CSS"], span: 2 },
  { phase: "Capstone", name: "Full Stack\nCapstone App", desc: "Your graduation project. React frontend, Node + Express API, MySQL database, deployed end-to-end.", tags: ["React", "Node", "Express", "MySQL"], span: 2, row: 2, feat: true },
  { phase: "Phase 05", name: "To-Do List", desc: "State, persistence, and the DOM.", tags: ["JS", "localStorage"], span: 2 },
  { phase: "Phase 05", name: "Quiz App", desc: "Timers, scores, logic.", tags: ["JS"], span: 2 },
];

const smallProjects = [
  { phase: "Phase 05", name: "GitHub Finder", desc: "First API call." },
  { phase: "Phase 07", name: "Task Manager", desc: "React state mgmt." },
  { phase: "Phase 09", name: "Movie Search", desc: "API + routing." },
  { phase: "Phase 12", name: "Blog REST API", desc: "Full CRUD backend." },
  { phase: "Phase 13", name: "Student Mgmt", desc: "API + MySQL." },
];

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="grid-bg" />
      <div className="glow-orange" style={{ bottom: -400, right: -300, opacity: 0.4 }} />
      <div className="section-inner">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
          <div>
            <div className="eyebrow animate-reveal">05 / Output</div>
            <h2 className="animate-reveal animate-reveal-d1" style={{ fontSize: "clamp(48px,6vw,88px)", lineHeight: 0.98, letterSpacing: "-0.03em", fontWeight: 700, margin: 0 }}>
              Real projects<br />you will build.
            </h2>
          </div>
          <p className="animate-reveal animate-reveal-d2" style={{ maxWidth: 480, margin: 0, textAlign: "right", fontSize: "clamp(16px,1.5vw,28px)", lineHeight: 1.45, color: "var(--text-dim)" }}>
            Ten portfolio-ready builds. Every one deployed, every one shippable.
          </p>
        </div>
        <div className="bento">
          {featuredProjects.map((p) => (
            <div key={p.name} className={`bento-card span-${p.span} ${p.row ? `row-${p.row}` : ""} ${p.feat ? "feat" : ""} animate-reveal animate-reveal-d3`}>
              <div className="bento-top"><span className="bento-phase">{p.phase}</span></div>
              <div>
                <h3 className="bento-name">{p.name}</h3>
                <p className="bento-desc">{p.desc}</p>
                <div className="bento-tags">{p.tags.map(t => <span key={t} className="bento-tag">{t}</span>)}</div>
              </div>
              {p.feat && <div className="bento-art" />}
            </div>
          ))}
          {smallProjects.map((p, i) => (
            <div key={p.name} className={`bento-card animate-reveal animate-reveal-d${Math.min(i + 5, 8)}`}>
              <div className="bento-top"><span className="bento-phase">{p.phase}</span></div>
              <div>
                <h3 className="bento-name" style={{ fontSize: "clamp(16px,1.5vw,24px)" }}>{p.name}</h3>
                <p className="bento-desc">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="slide-chrome">
          <span>Zero to Stack · 2026</span>
          <span className="page-num">07 / 11</span>
        </div>
      </div>
    </section>
  );
}