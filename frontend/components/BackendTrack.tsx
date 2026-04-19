"use client";

const backendPhases = [
  { n: "10", title: "Backend Basics", topics: "HTTP · servers · request / response · middleware", dur: "5 Days" },
  { n: "11", title: "Node.js + File Structure", topics: "npm · modules · routing · project structure", dur: "3 Days" },
  { n: "12", title: "REST API Design", topics: "CRUD · validation · errors · auth · Postman", dur: "5 Days" },
  { n: "13", title: "MySQL & Databases", topics: "schemas · joins · indexes · migrations · queries", dur: "10 Days" },
  { n: "14", title: "Full Stack Capstone", topics: "React + Node + MySQL · deployed to Vercel", dur: "5 Days" },
];

export default function BackendTrack() {
  return (
    <section className="section">
      <div className="grid-bg" />
      <div className="glow-orange" style={{ top: -300, left: -200, opacity: 0.35 }} />
      <div className="section-inner">
        <div className="eyebrow animate-reveal">03 / Curriculum</div>
        <div className="curriculum-layout" style={{ marginTop: 32 }}>
          <div className="curr-left">
            <div className="track-tag animate-reveal animate-reveal-d1">Track 02</div>
            <h2 className="animate-reveal animate-reveal-d1">Backend<br />Track.</h2>
            <p className="lead animate-reveal animate-reveal-d2">Servers, databases, and the APIs that connect them — culminating in a deployed full-stack capstone.</p>
            <div className="tot animate-reveal animate-reveal-d3">
              <div className="big">28 days</div>
              <div className="sm">5 Modules · Capstone</div>
            </div>
          </div>
          <div className="phases">
            {backendPhases.map((p, i) => (
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
          <span className="page-num">05 / 11</span>
        </div>
      </div>
    </section>
  );
}