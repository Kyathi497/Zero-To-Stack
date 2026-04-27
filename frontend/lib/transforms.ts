import type {
  ModuleState,
  KpiData,
  LiveClass,
  LearningTrack,
  ModuleItem,
  StudentRow,
  ScheduleItem,
  CohortHealth,
} from "./dashboard-data";
import type {
  ApiModule,
  ApiProgressRecord,
  ApiClass,
  ApiAdminClass,
  ApiStudentDashboardRow,
} from "./api";

// ── Module state derivation ───────────────────────────────────────────────────

export function deriveModuleItems(modules: ApiModule[]): ModuleItem[] {
  let activeAssigned = false;
  let nextAssigned = false;

  return modules.map((m) => {
    if (m.studentCompleted) {
      return { number: m.moduleNumber, title: m.title, state: "done" as ModuleState, progress: 100 };
    }
    if (!activeAssigned) {
      activeAssigned = true;
      return { number: m.moduleNumber, title: m.title, state: "active" as ModuleState, progress: 0 };
    }
    if (!nextAssigned) {
      nextAssigned = true;
      return { number: m.moduleNumber, title: m.title, state: "next" as ModuleState, progress: 0 };
    }
    return { number: m.moduleNumber, title: m.title, state: "locked" as ModuleState, progress: 0 };
  });
}

function buildHeatmap(items: ModuleItem[]): ModuleState[] {
  return items.flatMap((m) => [m.state, m.state, m.state]);
}

export function toLearningTrack(record: ApiProgressRecord): LearningTrack {
  const items = deriveModuleItems(record.modules);
  return { modules: items, heatmap: buildHeatmap(items) };
}

// ── Streak week-dot array ─────────────────────────────────────────────────────

function toWeekDots(streakDays: number): boolean[] {
  const s = Math.min(streakDays, 7);
  return Array.from({ length: 7 }, (_, i) => i >= 7 - s);
}

// ── Student KPI cards ─────────────────────────────────────────────────────────

export function toStudentKpis(record: ApiProgressRecord): KpiData[] {
  const pct = Math.round(record.completionPercentage);
  const streak = record.streakDays;

  return [
    {
      label: "Overall Progress",
      value: pct,
      suffix: "%",
      subtext: `${record.modulesCompleted} / ${record.totalModules} modules`,
      barPercent: pct,
    },
    {
      label: "Current Streak",
      value: streak,
      suffix: " days",
      weekDots: toWeekDots(streak),
    },
    {
      label: "Assignments",
      value: "—",
      subtext: "Coming soon",
    },
    {
      label: "Attendance",
      value: "—",
      subtext: "Coming soon",
    },
  ];
}

// ── Next live class ───────────────────────────────────────────────────────────

export function toNextLiveClass(classes: ApiClass[]): LiveClass | null {
  const upcoming = classes
    .filter((c) => c.status === "SCHEDULED" || c.status === "LIVE")
    .sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
    );

  const next = upcoming[0];
  if (!next) return null;

  const totalClasses = classes.length;
  const completedCount = classes.filter((c) => c.status === "COMPLETED").length;
  const durationMin = Math.round(
    (new Date(next.endTime).getTime() - new Date(next.startTime).getTime()) /
      60000,
  );

  return {
    title: next.topic,
    module: next.module
      ? `MODULE ${next.module.title.toUpperCase()}`
      : next.course.courseName.toUpperCase(),
    instructor: "—",
    targetDate: next.startTime,
    joinUrl: "#",
    topics: [next.topic],
    classNumber: completedCount + 1,
    totalClasses,
    durationMin,
  };
}

// ── Admin student rows ────────────────────────────────────────────────────────

function toRisk(pct: number): "green" | "yellow" | "red" {
  if (pct >= 60) return "green";
  if (pct >= 30) return "yellow";
  return "red";
}

export function toStudentRows(students: ApiStudentDashboardRow[]): StudentRow[] {
  return students.map((s) => ({
    id: s.id,
    name: s.name,
    initials: s.name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase(),
    email: s.email,
    progress: Math.round(s.avgCompletion),
    currentModule: s.currentModule,
    attendance: 0,
    risk: toRisk(s.avgCompletion),
    paymentDone: s.paymentStatus,
  }));
}

// ── Admin cohort health ───────────────────────────────────────────────────────

export function toCohortHealth(students: ApiStudentDashboardRow[]): CohortHealth {
  const total = students.length;
  const onTrack = students.filter((s) => s.avgCompletion >= 60).length;
  const atRisk = students.filter(
    (s) => s.avgCompletion >= 30 && s.avgCompletion < 60,
  ).length;
  const critical = students.filter((s) => s.avgCompletion < 30).length;

  return {
    onTrack,
    atRisk,
    critical,
    totalStudents: total,
    attendance: 0,
    nps: 0,
    onTrackCount: onTrack,
  };
}

// ── Admin schedule items (today only) ─────────────────────────────────────────

function classType(topic: string): ScheduleItem["type"] {
  const t = topic.toLowerCase();
  if (t.includes("office")) return "office-hours";
  if (t.includes("review")) return "review";
  if (t.includes("sync") || t.includes("mentor")) return "sync";
  return "live";
}

export function toScheduleItems(classes: ApiAdminClass[]): ScheduleItem[] {
  const todayStr = new Date().toDateString();

  return classes
    .filter((c) => new Date(c.date).toDateString() === todayStr)
    .sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
    )
    .map((c) => {
      const start = new Date(c.startTime);
      const time = start.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      });
      const subtitle = c.module
        ? `${c.course.courseName} · ${c.module.title}`
        : c.course.courseName;

      return {
        id: c.id,
        time,
        title: c.topic,
        subtitle,
        type: classType(c.topic),
        isNow: c.status === "LIVE",
      };
    });
}
