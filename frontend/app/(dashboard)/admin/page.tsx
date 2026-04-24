"use client";

import {
  COHORT_HEALTH,
  STUDENT_TABLE,
  TODAY_SCHEDULE,
} from "@/lib/dashboard-data";

import CohortHero   from "@/components/dashboard/CohortHero";
import StudentTable from "@/components/dashboard/StudentTable";
import ScheduleList from "@/components/dashboard/ScheduleList";

export default function AdminDashboard() {
  return (
    <>
      {/* Cohort summary */}
      <CohortHero health={COHORT_HEALTH} />

      {/* Today's class schedule — full width */}
      <ScheduleList items={TODAY_SCHEDULE} />

      {/* Student management — attendance + payment */}
      <StudentTable students={STUDENT_TABLE} />
    </>
  );
}
