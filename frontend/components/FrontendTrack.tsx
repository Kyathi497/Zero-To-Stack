"use client";

const frontendPhases = [
  { n: "01", title: "HTML Foundations", topics: "semantic markup · forms · accessibility · SEO basics", dur: "4 Days" },
  { n: "02", title: "CSS & Layout", topics: "flexbox · grid · animations · responsive design", dur: "3 Days" },
  { n: "03", title: "HTML + CSS Projects", topics: "portfolio · landing page · pixel-perfect clones", dur: "3 Days" },
  { n: "04", title: "JavaScript Core", topics: "syntax · DOM · events · async · ES6+", dur: "5 Days" },
  { n: "05", title: "JavaScript Projects", topics: "to-do list · quiz app · GitHub finder", dur: "5 Days" },
  { n: "06", title: "Advanced JavaScript", topics: "closures · promises · patterns · modules", dur: "3 Days" },
  { n: "07", title: "React Basics", topics: "components · props · state · rendering", dur: "5 Days" },
  { n: "08", title: "React Hooks", topics: "useState · useEffect · custom hooks · context", dur: "3 Days" },
  { n: "09", title: "React API + Router", topics: "fetch · axios · routing · protected routes", dur: "3 Days" },
];

export default function FrontendTrack() {
  return (
    <section id="curriculum" className="section">
      <div className="grid-bg" />
      <div className="glow-orange" style={{ top: -300, right: -200, opacity: 0.35 }} />
      <div className="section-inner">
        <div className="eyebrow animate-reveal">03 / Curriculum</div>
        <div className="curriculum-layout" style={{ marginTop: 32 }}>
          <div className="curr-left">
            <div className="track-tag animate-reveal animate-reveal-d1">Track 01</div>
            <h2 className="animate-reveal animate-reveal-d1">Frontend<br />Track.</h2>
            <p className="lead animate-reveal animate-reveal-d2">Everything that renders in the browser — structure, style, behavior, and modern component UIs.</p>
            <div className="tot animate-reveal animate-reveal-d3">
              <div className="big">34 days</div>
              <div className="sm">9 Modules</div>
            </div>
          </div>
          <div className="phases">
            {frontendPhases.map((p, i) => (
              <div key={p.n} className={`phase animate-reveal animate-reveal-d${Math.min(i + 2, 8)}`} style={{ "--i": i } as React.CSSProperties}>
                <div className="phase-num">{p.n}</div>
                <div className="phase-body">
                  <h4>{p.title}</h4>
                  <p className="topics">{p.topics}</p>
                </div>
                <div className="phase-duration">{p.dur}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="slide-chrome">
          <span>Zero to Stack · 2026</span>
          <span className="page-num">04 / 11</span>
        </div>
      </div>
    </section>
  );
}