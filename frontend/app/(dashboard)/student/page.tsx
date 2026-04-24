"use client";

import {
  STUDENT_KPI,
  LIVE_CLASS,
  LEARNING_TRACK,
  ASSIGNMENTS,
} from "@/lib/dashboard-data";

import KpiCard        from "@/components/dashboard/KpiCard";
import HeroLiveClass  from "@/components/dashboard/HeroLiveClass";
import LearningPath   from "@/components/dashboard/LearningPath";
import AssignmentList from "@/components/dashboard/AssignmentList";

export default function StudentDashboard() {
  return (
    <>
      {/* Page header */}
      <div className="db-page-head">
        <div>
          <div className="db-eyebrow">Welcome back · Day 47 of 126</div>
          <h1 className="db-page-title">
            Good evening, Aarav.{" "}
            <span className="muted">Keep going.</span>
          </h1>
        </div>
        <div className="db-head-actions">
          <button className="db-btn-primary">Resume lesson →</button>
        </div>
      </div>

      {/* KPI row — progress, streak, assignments, attendance */}
      <div className="db-kpi-grid">
        {STUDENT_KPI.map((kpi) => (
          <KpiCard key={kpi.label} data={kpi} />
        ))}
      </div>

      {/* Today's live class */}
      <HeroLiveClass liveClass={LIVE_CLASS} />

      {/* Curriculum progress + assignment list */}
      <div className="db-two-col">
        <LearningPath track={LEARNING_TRACK} />
        <AssignmentList items={ASSIGNMENTS} />
      </div>
    </>
  );
}
