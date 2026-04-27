"use client";

import { useEffect, useState } from "react";
import { getMyProgress, getMyClasses } from "@/lib/api";
import type { ApiProgressRecord, ApiClass } from "@/lib/api";
import { toLearningTrack, toStudentKpis, toNextLiveClass } from "@/lib/transforms";
import type { KpiData, LiveClass, LearningTrack } from "@/lib/dashboard-data";

import KpiCard        from "@/components/dashboard/KpiCard";
import HeroLiveClass  from "@/components/dashboard/HeroLiveClass";
import LearningPath   from "@/components/dashboard/LearningPath";
import AssignmentList from "@/components/dashboard/AssignmentList";

export default function StudentDashboard() {
  const [kpis,      setKpis]      = useState<KpiData[] | null>(null);
  const [liveClass, setLiveClass] = useState<LiveClass | null>(null);
  const [track,     setTrack]     = useState<LearningTrack | null>(null);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const [progressList, classes]: [ApiProgressRecord[], ApiClass[]] =
        await Promise.all([getMyProgress(), getMyClasses()]);

      // Pick the most recently active course
      const record = [...progressList].sort(
        (a, b) =>
          new Date(b.lastActivityDate).getTime() -
          new Date(a.lastActivityDate).getTime(),
      )[0];

      if (record) {
        setKpis(toStudentKpis(record));
        setTrack(toLearningTrack(record));
      }

      setLiveClass(toNextLiveClass(classes));
    }

    load()
      .catch((e: unknown) =>
        setError(e instanceof Error ? e.message : "Failed to load dashboard"),
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="db-page-head">
        <p className="muted">Loading dashboard…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="db-page-head">
        <p style={{ color: "var(--danger, #ef4444)" }}>Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      {/* Page header */}
      <div className="db-page-head">
        <div>
          <div className="db-eyebrow">Welcome back</div>
          <h1 className="db-page-title">
            Keep going. <span className="muted">You&apos;re making progress.</span>
          </h1>
        </div>
        <div className="db-head-actions">
          <button className="db-btn-primary">Resume lesson →</button>
        </div>
      </div>

      {/* KPI row */}
      {kpis && (
        <div className="db-kpi-grid">
          {kpis.map((kpi) => (
            <KpiCard key={kpi.label} data={kpi} />
          ))}
        </div>
      )}

      {/* Today's live class */}
      {liveClass && <HeroLiveClass liveClass={liveClass} />}

      {/* Curriculum progress + assignment list */}
      <div className="db-two-col">
        {track && <LearningPath track={track} />}
        <AssignmentList items={[]} />
      </div>
    </>
  );
}
