"use client";

import { useEffect, useState } from "react";
import { getClasses, getMeetLink, type ClassItem } from "@/lib/api/classes";
import { getCourses, type Course } from "@/lib/api/courses";

const STATUS_BADGE: Record<string, string> = {
  SCHEDULED: "bg-blue-500/10 text-blue-400",
  LIVE: "bg-green-500/20 text-green-400 animate-pulse",
  COMPLETED: "bg-slate-500/10 text-slate-400",
  CANCELLED: "bg-red-500/10 text-red-400",
};

function groupByDate(classes: ClassItem[]): Record<string, ClassItem[]> {
  return classes.reduce<Record<string, ClassItem[]>>((acc, cls) => {
    const key = new Date(cls.startTime).toDateString();
    if (!acc[key]) acc[key] = [];
    acc[key].push(cls);
    return acc;
  }, {});
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-IN", { timeStyle: "short" });
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  if (d.toDateString() === today.toDateString()) return "Today";
  if (d.toDateString() === tomorrow.toDateString()) return "Tomorrow";
  return d.toLocaleDateString("en-IN", { weekday: "long", month: "short", day: "numeric" });
}

export default function SchedulePage() {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [meetLinks, setMeetLinks] = useState<Record<string, string>>({});
  const [fetchingLink, setFetchingLink] = useState<string | null>(null);
  const [linkError, setLinkError] = useState<Record<string, string>>({});

  useEffect(() => {
    getCourses().then((res) => {
      if (res.success && res.data) setCourses(res.data);
    });
    loadClasses();
  }, []);

  async function loadClasses(courseId?: string) {
    setLoading(true);
    const res = await getClasses(courseId);
    if (res.success && res.data) setClasses(res.data);
    setLoading(false);
  }

  function onCourseFilter(courseId: string) {
    setSelectedCourseId(courseId);
    loadClasses(courseId || undefined);
  }

  async function handleGetMeetLink(classId: string) {
    if (meetLinks[classId]) return; // already fetched
    setFetchingLink(classId);
    setLinkError({});
    const res = await getMeetLink(classId);
    if (res.success && res.data) {
      setMeetLinks((prev) => ({ ...prev, [classId]: res.data as string }));
    } else {
      setLinkError((prev) => ({
        ...prev,
        [classId]: res.error?.message ?? "Unable to fetch link",
      }));
    }
    setFetchingLink(null);
  }

  const grouped = groupByDate(classes);
  const sortedDates = Object.keys(grouped).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight mb-1">Class Schedule</h1>
          <p className="text-slate-400 text-sm">
            Upcoming live sessions. Meet links are sent 15 minutes before class.
          </p>
        </div>

        {courses.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-6">
            <button
              onClick={() => onCourseFilter("")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                !selectedCourseId
                  ? "bg-orange-500 text-white"
                  : "bg-zinc-800 text-slate-400 hover:text-white"
              }`}
            >
              All
            </button>
            {courses.map((c) => (
              <button
                key={c.id}
                onClick={() => onCourseFilter(c.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedCourseId === c.id
                    ? "bg-orange-500 text-white"
                    : "bg-zinc-800 text-slate-400 hover:text-white"
                }`}
              >
                {c.courseName}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-orange-500" />
          </div>
        ) : classes.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <div className="text-4xl mb-3">📅</div>
            <p>No classes scheduled yet.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {sortedDates.map((dateKey) => (
              <div key={dateKey}>
                <h2 className="text-sm font-semibold text-orange-400 uppercase tracking-wider mb-3">
                  {formatDate(dateKey)}
                </h2>
                <div className="space-y-3">
                  {grouped[dateKey].map((cls) => (
                    <ClassCard
                      key={cls.id}
                      cls={cls}
                      meetLink={meetLinks[cls.id]}
                      isFetching={fetchingLink === cls.id}
                      linkError={linkError[cls.id]}
                      onGetLink={() => handleGetMeetLink(cls.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ClassCard({
  cls,
  meetLink,
  isFetching,
  linkError,
  onGetLink,
}: {
  cls: ClassItem;
  meetLink?: string;
  isFetching: boolean;
  linkError?: string;
  onGetLink: () => void;
}) {
  const isUpcoming = cls.status === "SCHEDULED" || cls.status === "LIVE";
  const isCompleted = cls.status === "COMPLETED";

  return (
    <div className="bg-zinc-900 border border-white/5 rounded-xl px-5 py-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="font-bold text-white">{cls.topic}</h3>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                STATUS_BADGE[cls.status]
              }`}
            >
              {cls.status === "LIVE" ? "🔴 LIVE" : cls.status}
            </span>
          </div>

          {cls.course && (
            <p className="text-slate-400 text-sm">{cls.course.courseName}</p>
          )}

          <div className="flex gap-3 mt-2 text-xs text-slate-500">
            <span>
              {formatTime(cls.startTime)} – {formatTime(cls.endTime)}
            </span>
            {cls.module && <span className="text-slate-600">• {cls.module.title}</span>}
          </div>
        </div>

        <div className="ml-4 text-right">
          {isUpcoming && cls.meetLinkAccessible && (
            meetLink ? (
              <a
                href={meetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                Join Meet
              </a>
            ) : (
              <button
                onClick={onGetLink}
                disabled={isFetching}
                className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                {isFetching ? "Loading…" : "Get Link"}
              </button>
            )
          )}

          {isUpcoming && !cls.meetLinkAccessible && cls.hasMeetLink && (
            <span className="text-xs text-slate-500 italic">Payment required</span>
          )}

          {isUpcoming && !cls.hasMeetLink && (
            <span className="text-xs text-slate-600 italic">Link coming soon</span>
          )}

          {isCompleted && cls.recordingLink && (
            <a
              href={cls.recordingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Watch Recording
            </a>
          )}
        </div>
      </div>

      {linkError && (
        <p className="text-red-400 text-xs mt-2">{linkError}</p>
      )}

      {meetLink && (
        <div className="mt-3 flex items-center gap-2 bg-green-500/5 border border-green-500/20 rounded-lg px-3 py-2">
          <span className="text-xs text-slate-400">Meet link:</span>
          <a
            href={meetLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-green-400 hover:underline truncate"
          >
            {meetLink}
          </a>
        </div>
      )}
    </div>
  );
}
