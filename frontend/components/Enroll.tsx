"use client";

const metaItems = [
  { k: "Based in", v: "Hyderabad" },
  { k: "Per class", v: "2 hours" },
  { k: "Batch", v: "2026" },
];

const inclusions = [
  "63 live classes · 126 hours of instruction",
  "14 modules across frontend & backend tracks",
  "10+ portfolio projects + capstone deployment",
  "Instructor feedback on every submission",
  "Private cohort community & alumni network",
  "Lifetime access to recordings & materials",
];

export default function Enroll() {
  return (
    <section id="enroll" className="section">
      <div className="grid-bg" />
      <div className="glow-orange" style={{ top: "50%", right: "20%", transform: "translateY(-50%)", opacity: 0.5 }} />
      <div className="section-inner">
        <div className="enroll-wrap">
          <div className="enroll-left">
            <div className="tag animate-reveal">07 / Enroll</div>
            <h2 className="animate-reveal animate-reveal-d1">One course.<br />Everything<br />you need.</h2>
            <p className="sub animate-reveal animate-reveal-d2">No tier system. No upsells. One program that takes you from zero to a shipped full-stack application.</p>
            <div className="meta-row animate-reveal animate-reveal-d3">
              {metaItems.map((m) => (
                <div key={m.k} className="meta-item">
                  <div className="k">{m.k}</div>
                  <div className="v">{m.v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="enroll-card animate-reveal animate-reveal-d4">
            <div className="plan-tag">Full Stack Program</div>
            <div className="plan-title">Zero to Stack · 2026</div>
            <div className="plan-desc">Six-month live program · cohort-based</div>
            <div className="price">
              <span className="amt">₹49,999</span>
              <span className="unit">/ once</span>
            </div>
            <ul className="inc">
              {inclusions.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <button className="enroll-cta">Enroll now — 2026 Batch <span>→</span></button>
          </div>
        </div>
        <div className="slide-chrome">
          <span>Zero to Stack · 2026</span>
          <span className="page-num">09 / 11</span>
        </div>
      </div>
    </section>
  );
}