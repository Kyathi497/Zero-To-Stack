"use client";

export default function FinalCTA() {
  return (
    <section className="section" style={{ background: "var(--navy-dark)" }}>
      <div className="grid-bg" />
      <div className="glow-orange" style={{ top: -300, left: "50%", transform: "translateX(-50%)", opacity: 0.6 }} />
      <div className="glow-orange" style={{ bottom: -400, left: "50%", transform: "translateX(-50%)", opacity: 0.5 }} />
      <div className="final-center">
        <div className="final-eyebrow animate-reveal">Start your journey</div>
        <h1 className="final-title animate-reveal animate-reveal-d2">
          Go from zero<br />to <span className="go">full stack</span>.
        </h1>
        <div className="final-sub animate-reveal animate-reveal-d4">63 classes · 126 hours · One clear path</div>
        <div className="final-ctas animate-reveal animate-reveal-d5">
          <a href="#enroll" className="final-btn primary">Enroll Now <span>→</span></a>
          <a href="#curriculum" className="final-btn outline">View Full Curriculum</a>
        </div>
        <div className="final-foot animate-reveal animate-reveal-d6">
          Built with <span className="heart">❤</span> in Hyderabad &nbsp;·&nbsp; Zero to Stack © 2026
        </div>
      </div>
    </section>
  );
}