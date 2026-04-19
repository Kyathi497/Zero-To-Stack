"use client";

const timelineSteps = [
  { n: "01", title: "Learn the concept", desc: "Short framing on what, why, and when to use it." },
  { n: "02", title: "Code it live", desc: "Instructor builds it in the IDE. You follow along." },
  { n: "03", title: "Build something real", desc: "You implement a variation on your own, same session." },
];

export default function HowClassesWork() {
  return (
    <section className="section">
      <div className="grid-bg" />
      <div className="section-inner">
        <div className="eyebrow animate-reveal">04 / Method</div>
        <h2 className="animate-reveal animate-reveal-d1" style={{ fontSize: "clamp(48px,6vw,88px)", lineHeight: 0.98, letterSpacing: "-0.03em", fontWeight: 700, margin: 0 }}>
          How every<br />class works.
        </h2>
        <p className="animate-reveal animate-reveal-d2" style={{ fontSize: "clamp(16px,1.5vw,28px)", lineHeight: 1.45, color: "var(--text-dim)", maxWidth: 900, marginTop: 28 }}>
          Two hours, two halves. Watch it built in front of you — then build it yourself, same session.
        </p>
        <div className="hour-grid">
          <div className="hour-card live animate-reveal animate-reveal-d3">
            <div className="hour-num"><span className="num">1</span>Hour One · Theory</div>
            <div className="hour-title">Live coding, no pre-recorded slides.</div>
            <div className="hour-desc">Instructor types every line in real time. You see the bugs, the fixes, and the thinking behind the decisions — not a polished end state.</div>
            <div className="hour-tags">
              <span className="hour-tag">live-coded</span>
              <span className="hour-tag">questions welcome</span>
              <span className="hour-tag">real IDE</span>
            </div>
          </div>
          <div className="hour-card animate-reveal animate-reveal-d4">
            <div className="hour-num" style={{ color: "var(--text)" }}>
              <span className="num" style={{ background: "rgba(255,255,255,0.1)" }}>2</span>Hour Two · Practice
            </div>
            <div className="hour-title">You build. We watch.</div>
            <div className="hour-desc">Every concept gets a hands-on exercise or mini-project the same day. The instructor is on the call — stuck for more than five minutes and we jump in.</div>
            <div className="hour-tags">
              <span className="hour-tag">guided practice</span>
              <span className="hour-tag">code review</span>
              <span className="hour-tag">ship daily</span>
            </div>
          </div>
        </div>
        <div className="timeline">
          {timelineSteps.map((s) => (
            <div key={s.n} className="tl-step">
              <div className="tl-node">{s.n}</div>
              <h5>{s.title}</h5>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="slide-chrome">
          <span>Zero to Stack · 2026</span>
          <span className="page-num">06 / 11</span>
        </div>
      </div>
    </section>
  );
}