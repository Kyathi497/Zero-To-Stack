"use client";

import { useRef } from "react";
import { useCountUp } from "./useCountUp";

export default function AtAGlance() {
  const c63 = useRef<HTMLSpanElement>(null);
  const c126 = useRef<HTMLSpanElement>(null);
  const c14 = useRef<HTMLSpanElement>(null);
  const c10 = useRef<HTMLSpanElement>(null);

  useCountUp(c63, 63);
  useCountUp(c126, 126);
  useCountUp(c14, 14);
  useCountUp(c10, 10);

  return (
    <section id="glance" className="section">
      <div className="grid-bg" />
      <div className="section-inner">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, flexWrap: "wrap", gap: 32 }}>
          <div>
            <div className="eyebrow animate-reveal">01 / Overview</div>
            <h2 className="animate-reveal animate-reveal-d1" style={{ fontSize: "clamp(48px,6vw,88px)", lineHeight: 0.98, letterSpacing: "-0.03em", fontWeight: 700, margin: 0 }}>
              The program<br />at a glance.
            </h2>
          </div>
          <p className="animate-reveal animate-reveal-d2" style={{ maxWidth: 540, margin: 0, textAlign: "right", fontSize: "clamp(16px,1.5vw,28px)", lineHeight: 1.45, color: "var(--text-dim)" }}>
            Two hours a day. Six months. One clear path from your first line of HTML to a deployed full-stack app.
          </p>
        </div>
        <div className="stat-grid">
          <div className="stat-card animate-reveal animate-reveal-d3">
            <div className="stat-num"><span ref={c63}>0</span></div>
            <div className="stat-label">Classes</div>
            <div className="stat-note">Live, instructor-led</div>
          </div>
          <div className="stat-card animate-reveal animate-reveal-d4">
            <div className="stat-num"><span ref={c126}>0</span></div>
            <div className="stat-label">Hours</div>
            <div className="stat-note">Total instruction time</div>
          </div>
          <div className="stat-card animate-reveal animate-reveal-d5">
            <div className="stat-num"><span ref={c14}>0</span></div>
            <div className="stat-label">Modules</div>
            <div className="stat-note">Frontend + backend</div>
          </div>
          <div className="stat-card animate-reveal animate-reveal-d6">
            <div className="stat-num"><span ref={c10}>0</span><span className="suffix">+</span></div>
            <div className="stat-label">Projects</div>
            <div className="stat-note">Portfolio-ready</div>
          </div>
        </div>
        <div className="slide-chrome">
          <span>Zero to Stack · 2026</span>
          <span className="page-num">02 / 11</span>
        </div>
      </div>
    </section>
  );
}