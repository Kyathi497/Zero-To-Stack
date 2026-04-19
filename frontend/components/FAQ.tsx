"use client";

const faqItems = [
  { q: "Do I need prior coding experience?", a: "No. The program starts at the first line of HTML. If you can use a laptop, you can start." },
  { q: "Is the course fully online or in-person?", a: "Live online classes with a Hyderabad-based instructor. Recordings are available for every session." },
  { q: "What hardware do I need?", a: "Any laptop with 8GB+ RAM running macOS, Windows, or Linux. We'll help set up your dev environment on day one." },
  { q: "Will I get help if I fall behind?", a: "Yes. Every class includes a guided practice hour, and there's a cohort Slack for round-the-clock peer and instructor help." },
  { q: "Is there job placement support?", a: "We don't guarantee placement, but we provide portfolio review, GitHub polish, and referrals into our alumni network." },
  { q: "What's the refund policy?", a: "Full refund available within the first two weeks, no questions asked. After that, pro-rated for documented reasons." },
];

export default function FAQ() {
  return (
    <section id="faq" className="section">
      <div className="grid-bg" />
      <div className="section-inner">
        <div className="eyebrow animate-reveal">08 / FAQ</div>
        <h2 className="animate-reveal animate-reveal-d1" style={{ fontSize: "clamp(48px,6vw,88px)", lineHeight: 0.98, letterSpacing: "-0.03em", fontWeight: 700, margin: 0 }}>
          Common<br />questions.
        </h2>
        <div className="faq-grid">
          {faqItems.map((item, i) => (
            <div key={item.q} className={`faq-item animate-reveal animate-reveal-d${Math.min(i + 2, 8)}`}>
              <div className="q">
                <span className="plus">?</span>
                <span>{item.q}</span>
              </div>
              <p className="a">{item.a}</p>
            </div>
          ))}
        </div>
        <div className="slide-chrome">
          <span>Zero to Stack · 2026</span>
          <span className="page-num">10 / 11</span>
        </div>
      </div>
    </section>
  );
}