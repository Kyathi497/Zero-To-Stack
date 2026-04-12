"use client";

import Link from "next/link";

export default function AdminOverviewPage() {
  return (
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight mb-2">Admin Overview</h1>
      <p className="text-slate-400 mb-8">Manage courses, modules, live class sessions, and student progress.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/admin/courses"
          className="bg-zinc-900 border border-white/5 rounded-xl p-6 hover:border-orange-500/40 transition-all group"
        >
          <div className="text-2xl mb-3">📚</div>
          <h2 className="text-lg font-bold mb-1 group-hover:text-orange-400 transition-colors">
            Courses & Modules
          </h2>
          <p className="text-slate-400 text-sm">
            Create and manage course content, modules, and curriculum structure.
          </p>
        </Link>

        <Link
          href="/admin/classes"
          className="bg-zinc-900 border border-white/5 rounded-xl p-6 hover:border-orange-500/40 transition-all group"
        >
          <div className="text-2xl mb-3">🎥</div>
          <h2 className="text-lg font-bold mb-1 group-hover:text-orange-400 transition-colors">
            Live Classes
          </h2>
          <p className="text-slate-400 text-sm">
            Schedule classes, paste Google Meet links, and add recording URLs after sessions.
          </p>
        </Link>

        <Link
          href="/admin/progress"
          className="bg-zinc-900 border border-white/5 rounded-xl p-6 hover:border-orange-500/40 transition-all group"
        >
          <div className="text-2xl mb-3">📊</div>
          <h2 className="text-lg font-bold mb-1 group-hover:text-orange-400 transition-colors">
            Student Progress
          </h2>
          <p className="text-slate-400 text-sm">
            View all students, track completion percentages, mark modules complete, and export reports.
          </p>
        </Link>
      </div>
    </div>
  );
}
