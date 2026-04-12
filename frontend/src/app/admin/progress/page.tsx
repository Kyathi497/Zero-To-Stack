"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  adminGetAllStudents,
  adminGetStudentDetail,
  adminGetCourseStudentsProgress,
  adminMarkModuleComplete,
  adminExportStudentsCsvUrl,
  type StudentSummary,
  type StudentDetail,
  type CourseStudentProgress,
} from "@/lib/api/progress";
import { adminGetCourses } from "@/lib/api/courses";
import type { Course } from "@/lib/api/courses";

// ─── helpers ──────────────────────────────────────────────────────────────────

function fmt(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", { dateStyle: "medium" });
}

function ProgressBar({ pct }: { pct: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-orange-500 rounded-full transition-all"
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
      </div>
      <span className="text-xs text-slate-400 w-10 text-right">{pct.toFixed(0)}%</span>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function AdminProgressPage() {
  const [students, setStudents] = useState<StudentSummary[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<StudentDetail | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [courseStudents, setCourseStudents] = useState<CourseStudentProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [markingModule, setMarkingModule] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [tab, setTab] = useState<"students" | "course">("students");

  useEffect(() => {
    Promise.all([adminGetAllStudents(), adminGetCourses()]).then(
      ([studentsRes, coursesRes]) => {
        if (studentsRes.success && studentsRes.data) setStudents(studentsRes.data);
        if (coursesRes.success && coursesRes.data) setCourses(coursesRes.data);
        setLoading(false);
      }
    );
  }, []);

  async function openStudent(id: string) {
    setDetailLoading(true);
    const res = await adminGetStudentDetail(id);
    if (res.success && res.data) setSelectedStudent(res.data);
    setDetailLoading(false);
  }

  async function loadCourseStudents(courseId: string) {
    setSelectedCourseId(courseId);
    const res = await adminGetCourseStudentsProgress(courseId);
    if (res.success && res.data) setCourseStudents(res.data);
  }

  async function markComplete(courseId: string, moduleId: string) {
    setMarkingModule(moduleId);
    const res = await adminMarkModuleComplete(courseId, moduleId);
    setMarkingModule(null);
    if (res.success && res.data) {
      setToast(
        `Module marked complete! ${res.data.studentsNotified} student${res.data.studentsNotified !== 1 ? "s" : ""} notified. Overall progress: ${res.data.newPercentage.toFixed(0)}%`
      );
      setTimeout(() => setToast(null), 5000);
      // Refresh student detail if open
      if (selectedStudent) openStudent(selectedStudent.id);
    } else {
      setToast(res.error?.message ?? "Failed to mark module");
      setTimeout(() => setToast(null), 4000);
    }
  }

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-zinc-800 border border-orange-500/30 text-white text-sm px-4 py-3 rounded-xl shadow-lg z-50 max-w-sm">
          {toast}
        </div>
      )}

      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-extrabold tracking-tight">Progress Tracking</h1>
        <a
          href={adminExportStudentsCsvUrl()}
          className="text-sm bg-zinc-800 hover:bg-zinc-700 text-slate-300 px-4 py-2 rounded-lg transition-colors"
        >
          Export CSV
        </a>
      </div>
      <p className="text-slate-400 mb-6">Track student progress, mark modules complete, and send notifications.</p>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab("students")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === "students" ? "bg-orange-500/20 text-orange-400" : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          All Students
        </button>
        <button
          onClick={() => setTab("course")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === "course" ? "bg-orange-500/20 text-orange-400" : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          By Course
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-orange-500" />
        </div>
      ) : tab === "students" ? (
        <div className="flex gap-6">
          {/* Students table */}
          <div className={`${selectedStudent ? "w-1/2" : "w-full"} transition-all`}>
            <div className="bg-zinc-900 border border-white/5 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5 text-left">
                    <th className="px-4 py-3 text-slate-400 font-medium">Student</th>
                    <th className="px-4 py-3 text-slate-400 font-medium">Status</th>
                    <th className="px-4 py-3 text-slate-400 font-medium">Progress</th>
                    <th className="px-4 py-3 text-slate-400 font-medium">Last Active</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {students.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                        No students yet.
                      </td>
                    </tr>
                  ) : (
                    students.map((s) => (
                      <tr
                        key={s.id}
                        className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                          selectedStudent?.id === s.id ? "bg-orange-500/5" : ""
                        }`}
                      >
                        <td className="px-4 py-3">
                          <p className="font-medium text-white">{s.name}</p>
                          <p className="text-xs text-slate-500">{s.email}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                              s.paymentStatus
                                ? "bg-green-500/10 text-green-400"
                                : "bg-slate-500/10 text-slate-400"
                            }`}
                          >
                            {s.paymentStatus ? "Paid" : "Unpaid"}
                          </span>
                        </td>
                        <td className="px-4 py-3 w-36">
                          <ProgressBar pct={s.avgCompletion} />
                        </td>
                        <td className="px-4 py-3 text-slate-500 text-xs">{fmt(s.lastActive)}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => openStudent(s.id)}
                            className="text-xs text-orange-400 hover:text-orange-300 transition-colors"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Student detail panel */}
          {selectedStudent && (
            <div className="w-1/2 bg-zinc-900 border border-white/5 rounded-xl p-5 overflow-y-auto max-h-[70vh]">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-white">{selectedStudent.name}</h2>
                  <p className="text-slate-400 text-sm">{selectedStudent.email}</p>
                  <div className="flex gap-2 mt-1">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        selectedStudent.paymentStatus
                          ? "bg-green-500/10 text-green-400"
                          : "bg-slate-500/10 text-slate-400"
                      }`}
                    >
                      {selectedStudent.paymentStatus ? "Paid" : "Unpaid"}
                    </span>
                    <span className="text-xs text-slate-500">Joined {fmt(selectedStudent.joinedAt)}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="text-slate-500 hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {detailLoading ? (
                <div className="flex justify-center py-10">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-orange-500" />
                </div>
              ) : selectedStudent.progress.length === 0 ? (
                <p className="text-slate-500 text-sm">Not enrolled in any courses.</p>
              ) : (
                <div className="space-y-6">
                  {selectedStudent.progress.map((cp) => (
                    <div key={cp.courseId}>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-white text-sm">{cp.courseName}</h3>
                        <span className="text-xs text-slate-400">
                          {cp.completionPercentage.toFixed(0)}%
                        </span>
                      </div>
                      <ProgressBar pct={cp.completionPercentage} />
                      <div className="mt-3 space-y-1.5">
                        {cp.modules.map((m) => (
                          <div key={m.id} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <span
                                className={`material-symbols-outlined text-sm ${
                                  m.completed ? "text-green-400" : "text-slate-600"
                                }`}
                              >
                                {m.completed ? "check_circle" : "radio_button_unchecked"}
                              </span>
                              <span className={m.completed ? "text-slate-300" : "text-slate-500"}>
                                {m.moduleNumber}. {m.title}
                              </span>
                            </div>
                            {!m.completed && (
                              <button
                                onClick={() => markComplete(cp.courseId, m.id)}
                                disabled={markingModule === m.id}
                                className="text-orange-400 hover:text-orange-300 disabled:opacity-50 transition-colors text-xs"
                              >
                                {markingModule === m.id ? "Marking…" : "Mark Done"}
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* By Course tab */
        <div>
          <div className="flex gap-2 flex-wrap mb-6">
            {courses.map((c) => (
              <button
                key={c.id}
                onClick={() => loadCourseStudents(c.id)}
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

          {selectedCourseId ? (
            courseStudents.length === 0 ? (
              <p className="text-slate-500 text-sm">No students enrolled in this course yet.</p>
            ) : (
              <div className="bg-zinc-900 border border-white/5 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5 text-left">
                      <th className="px-4 py-3 text-slate-400 font-medium">Student</th>
                      <th className="px-4 py-3 text-slate-400 font-medium">Progress</th>
                      <th className="px-4 py-3 text-slate-400 font-medium">Modules</th>
                      <th className="px-4 py-3 text-slate-400 font-medium">Streak</th>
                      <th className="px-4 py-3 text-slate-400 font-medium">Last Active</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseStudents.map((s) => (
                      <tr key={s.studentId} className="border-b border-white/5 hover:bg-white/5">
                        <td className="px-4 py-3">
                          <p className="font-medium text-white">{s.name}</p>
                          <p className="text-xs text-slate-500">{s.email}</p>
                        </td>
                        <td className="px-4 py-3 w-40">
                          <ProgressBar pct={s.completionPercentage} />
                        </td>
                        <td className="px-4 py-3 text-slate-400">{s.modulesCompleted}</td>
                        <td className="px-4 py-3 text-slate-400">{s.streakDays}d</td>
                        <td className="px-4 py-3 text-slate-500 text-xs">{fmt(s.lastActivityDate)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ) : (
            <p className="text-slate-500 text-sm">Select a course above to view enrolled students.</p>
          )}

          {/* Mark module complete section */}
          {selectedCourseId && (
            <ModuleCompleteSection
              courseId={selectedCourseId}
              courses={courses}
              markingModule={markingModule}
              onMark={markComplete}
            />
          )}
        </div>
      )}
    </div>
  );
}

// ─── Module complete section ──────────────────────────────────────────────────

function ModuleCompleteSection({
  courseId,
  courses,
  markingModule,
  onMark,
}: {
  courseId: string;
  courses: Course[];
  markingModule: string | null;
  onMark: (courseId: string, moduleId: string) => void;
}) {
  const [modules, setModules] = useState<
    { id: string; moduleNumber: number; title: string; completed: boolean }[]
  >([]);

  useEffect(() => {
    import("@/lib/api/courses").then(({ adminGetModules }) => {
      adminGetModules(courseId).then((res) => {
        if (res.success && res.data) setModules(res.data);
      });
    });
  }, [courseId]);

  if (modules.length === 0) return null;

  return (
    <div className="mt-6 bg-zinc-900 border border-white/5 rounded-xl p-5">
      <h3 className="font-semibold text-white mb-1">Mark Module Complete</h3>
      <p className="text-slate-400 text-sm mb-4">
        Marking a module complete updates progress for all enrolled students and sends them an email notification.
      </p>
      <div className="space-y-2">
        {modules.map((m) => (
          <div key={m.id} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span
                className={`material-symbols-outlined text-base ${
                  m.completed ? "text-green-400" : "text-slate-600"
                }`}
              >
                {m.completed ? "check_circle" : "radio_button_unchecked"}
              </span>
              <span className={m.completed ? "text-slate-400" : "text-white"}>
                {m.moduleNumber}. {m.title}
              </span>
              {m.completed && (
                <span className="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">
                  Done
                </span>
              )}
            </div>
            {!m.completed && (
              <button
                onClick={() => onMark(courseId, m.id)}
                disabled={markingModule === m.id}
                className="text-xs bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 disabled:opacity-50 px-3 py-1.5 rounded-lg transition-colors"
              >
                {markingModule === m.id ? "Marking…" : "Mark Complete"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
