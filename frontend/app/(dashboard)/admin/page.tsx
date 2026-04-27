"use client";

import { useEffect, useState } from "react";
import { getAdminStudents, getAdminClasses } from "@/lib/api";
import type { ApiStudentDashboardRow, ApiAdminClass } from "@/lib/api";
import { toCohortHealth, toStudentRows, toScheduleItems } from "@/lib/transforms";
import type { CohortHealth, StudentRow, ScheduleItem } from "@/lib/dashboard-data";

import CohortHero   from "@/components/dashboard/CohortHero";
import StudentTable from "@/components/dashboard/StudentTable";
import ScheduleList from "@/components/dashboard/ScheduleList";

export default function AdminDashboard() {
  const [health,   setHealth]   = useState<CohortHealth | null>(null);
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const [rawStudents, rawClasses]: [ApiStudentDashboardRow[], ApiAdminClass[]] =
        await Promise.all([getAdminStudents(), getAdminClasses()]);

      setHealth(toCohortHealth(rawStudents));
      setStudents(toStudentRows(rawStudents));
      setSchedule(toScheduleItems(rawClasses));
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
      {/* Cohort summary */}
      {health && <CohortHero health={health} />}

      {/* Today's class schedule */}
      <ScheduleList items={schedule} />

      {/* Student roster */}
      <StudentTable students={students} />
    </>
  );
}
