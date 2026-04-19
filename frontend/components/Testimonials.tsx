"use client";

const testimonials = [
  { initials: "PR", name: "Priya Reddy", role: "Frontend Intern · Hyderabad", quote: "I couldn't open a terminal before this course. Six months later I shipped a React + Node app that's used by my college's student union." },
  { initials: "AK", name: "Arjun Khanna", role: "Full Stack Developer · Bengaluru", quote: "The live-coding format is the difference. I've sat through recorded tutorials for years. Watching a real engineer hit a real bug and fix it taught me more than any course I've bought." },
  { initials: "SM", name: "Sana Mirza", role: "Backend Engineer · Pune", quote: "I went from non-tech background to a job offer eight weeks after the capstone. The projects list on my GitHub did most of the talking." },
];

export default function Testimonials() {
  return (
    <section className="section">
      <div className="grid-bg" />
      <div className="section-inner">
        <div className="eyebrow animate-reveal">06 / Outcomes</div>
        <h2 className="animate-reveal animate-reveal-d1" style={{ fontSize: "clamp(48px,6vw,88px)", lineHeight: 0.98, letterSpacing: "-0.03em", fontWeight: 700, margin: 0 }}>
          Students who<br />started from zero.
        </h2>
        <p className="animate-reveal animate-reveal-d2" style={{ fontSize: "clamp(16px,1.5vw,28px)", lineHeight: 1.45, color: "var(--text-dim)", maxWidth: 900, marginTop: 28 }}>
          Graduates from the 2025 cohort — all began with no prior coding experience.
        </p>
        <div className="quotes">
          {testimonials.map((q, i) => (
            <div key={q.name} className={`quote-card animate-reveal animate-reveal-d${i + 3}`}>
              <p className="quote-mark">&ldquo;</p>
              <p className="quote-text">{q.quote}</p>
              <div className="quote-author">
                <div className="quote-avatar">{q.initials}</div>
                <div className="quote-meta">
                  <div className="n">{q.name}</div>
                  <div className="r">{q.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="slide-chrome">
          <span>Zero to Stack · 2026</span>
          <span className="page-num">08 / 11</span>
        </div>
      </div>
    </section>
  );
}