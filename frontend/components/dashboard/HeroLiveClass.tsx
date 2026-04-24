"use client";

import type { LiveClass } from "@/lib/dashboard-data";
import CountdownTimer from "./CountdownTimer";

interface HeroLiveClassProps {
  liveClass: LiveClass;
}

export default function HeroLiveClass({ liveClass }: HeroLiveClassProps) {
  return (
    <div className="db-hero-grid">
      <div className="db-hero">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <span className="db-live-tag">
              <span className="db-live-dot" />
              Live Soon · Class {liveClass.classNumber} / {liveClass.totalClasses}
            </span>
          </div>
          <span className="db-hero-module">{liveClass.module}</span>
        </div>

        <h2 className="db-hero-title">{liveClass.title}</h2>
        <div className="db-hero-topics">{liveClass.topics.join(" · ")}</div>

        <div className="db-hero-meta">
          <div className="db-hero-meta-item">
            ▶ <b>6:00 PM IST</b> · {liveClass.durationMin} min
          </div>
          <div className="db-hero-meta-item">
            ✓ <b>{liveClass.instructor}</b> · Lead Instructor
          </div>
        </div>

        <div className="db-hero-cta">
          <button className="db-btn-join">▶ Join live class</button>
          <button className="db-btn-ghost">Add to calendar</button>
        </div>
      </div>

      <CountdownTimer targetDate={liveClass.targetDate} />
    </div>
  );
}
