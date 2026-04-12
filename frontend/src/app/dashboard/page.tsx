"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { getAllMyProgress, type CourseProgress } from "@/lib/api/progress";
import { getClasses, type ClassItem } from "@/lib/api/classes";
import Link from "next/link";

function formatDate(iso: string) {
  const d = new Date(iso);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  if (d.toDateString() === today.toDateString()) return "Today";
  if (d.toDateString() === tomorrow.toDateString()) return "Tomorrow";
  return d.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-IN", { timeStyle: "short" });
}

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [progressList, setProgressList] = useState<CourseProgress[]>([]);
  const [upcomingClasses, setUpcomingClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [progressRes, classesRes] = await Promise.all([
        getAllMyProgress(),
        getClasses(),
      ]);
      if (progressRes.success && progressRes.data) setProgressList(progressRes.data);
      if (classesRes.success && classesRes.data) {
        const now = new Date();
        const upcoming = classesRes.data
          .filter(
            (c) =>
              (c.status === "SCHEDULED" || c.status === "LIVE") &&
              new Date(c.startTime) >= now
          )
          .slice(0, 4);
        setUpcomingClasses(upcoming);
      }
      setLoading(false);
    }
    load();
  }, []);

  const totalModulesCompleted = progressList.reduce(
    (sum, p) => sum + p.modulesCompleted,
    0
  );
  const overallProgress =
    progressList.length > 0
      ? progressList.reduce((sum, p) => sum + p.completionPercentage, 0) /
        progressList.length
      : 0;
  const primaryCourse = progressList[0] ?? null;

  return (
    <div className="min-h-screen font-body text-on-surface">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-xl shadow-[0_0_24px_rgba(232,80,10,0.15)] flex justify-between items-center px-8 h-20">
        <span className="text-2xl font-black text-white italic font-headline tracking-tight">
          StackForge
        </span>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/schedule" className="text-slate-400 font-headline font-bold tracking-tight hover:text-orange-400 transition-all duration-300">
            Schedule
          </Link>
        </nav>
        <div className="flex items-center gap-6">
          <span className="text-slate-400 text-sm">{user?.name}</span>
          <button
            onClick={logout}
            className="text-xs text-slate-500 hover:text-red-400 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex pt-20">
        {/* Sidebar */}
        <aside className="h-screen w-64 fixed left-0 top-20 bg-surface-container-low flex flex-col py-6 px-4 gap-4">
          <div className="px-4 mb-6">
            <h3 className="text-white font-headline font-bold text-lg">Student Hub</h3>
            <p className="text-slate-400 text-xs font-medium">Full Stack Path</p>
          </div>
          <nav className="flex flex-col gap-2">
            <a
              className="flex items-center gap-3 px-4 py-3 text-white bg-primary/10 border-r-4 border-primary transition-all ease-in-out duration-300"
              href="/dashboard"
            >
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-medium text-sm">Dashboard</span>
            </a>
            <a
              className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-surface-container hover:text-white transition-all ease-in-out duration-300"
              href="/schedule"
            >
              <span className="material-symbols-outlined">calendar_today</span>
              <span className="font-medium text-sm">Schedule</span>
            </a>
            <a
              className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-surface-container hover:text-white transition-all ease-in-out duration-300"
              href="/schedule"
            >
              <span className="material-symbols-outlined">podcasts</span>
              <span className="font-medium text-sm">Live Sessions</span>
            </a>
          </nav>
          <div className="mt-auto flex flex-col gap-2 pt-6 border-t border-outline-variant/15">
            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-surface-container hover:text-red-400 transition-all ease-in-out duration-300 w-full text-left"
            >
              <span className="material-symbols-outlined">logout</span>
              <span className="font-medium text-sm">Logout</span>
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="ml-64 flex-1 p-8">
          <div className="mb-10 flex flex-col gap-2">
            <h1 className="text-4xl font-headline font-extrabold tracking-tight text-white">
              Welcome back, {user?.name?.split(" ")[0] ?? "Student"} 👋
            </h1>
            <p className="text-on-surface-variant">
              {upcomingClasses.length > 0
                ? `You have ${upcomingClasses.length} upcoming live session${upcomingClasses.length > 1 ? "s" : ""}.`
                : "No upcoming sessions right now. Check back soon."}
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-orange-500" />
            </div>
          ) : (
            <>
              {/* Stats Row */}
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-4 grid grid-cols-1 gap-4">
                  <div className="bg-surface-container p-6 rounded-xl flex items-center gap-6 group hover:bg-surface-container-high transition-all">
                    <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-primary text-3xl">school</span>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm font-medium">Enrolled Courses</p>
                      <h4 className="text-3xl font-headline font-bold text-white">{progressList.length}</h4>
                    </div>
                  </div>
                  <div className="bg-surface-container p-6 rounded-xl flex items-center gap-6 group hover:bg-surface-container-high transition-all">
                    <div className="w-14 h-14 rounded-lg bg-tertiary-container/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-tertiary-container text-3xl">check_circle</span>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm font-medium">Modules Completed</p>
                      <h4 className="text-3xl font-headline font-bold text-white">{totalModulesCompleted}</h4>
                    </div>
                  </div>
                  <div className="bg-surface-container p-6 rounded-xl flex items-center gap-6 group hover:bg-surface-container-high transition-all">
                    <div className="w-14 h-14 rounded-lg bg-secondary-container/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-secondary-container text-3xl">local_fire_department</span>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm font-medium">Streak Days</p>
                      <h4 className="text-3xl font-headline font-bold text-white">
                        {progressList[0]?.streakDays ?? 0}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Hero course card */}
                {primaryCourse ? (
                  <div className="col-span-12 lg:col-span-8 bg-surface-container-low rounded-xl relative overflow-hidden flex flex-col justify-between p-8 min-h-[300px]">
                    <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-l from-primary/40 to-transparent"></div>
                    </div>
                    <div className="relative z-10">
                      <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">In Progress</span>
                      <h2 className="text-4xl font-headline font-black text-white mt-4 max-w-md">
                        {primaryCourse.courseName}
                      </h2>
                      <p className="text-slate-400 mt-2">
                        {primaryCourse.modulesCompleted} of {primaryCourse.totalModules} modules completed
                      </p>
                    </div>
                    <div className="relative z-10 flex items-end justify-between">
                      <div className="flex-1 max-w-md pr-8">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-bold text-white">
                            {primaryCourse.completionPercentage.toFixed(0)}% Complete
                          </span>
                          <span className="text-sm text-slate-400">
                            {primaryCourse.modulesCompleted}/{primaryCourse.totalModules} Modules
                          </span>
                        </div>
                        <div className="h-2 w-full bg-surface-variant rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary shadow-[0_0_12px_#ffb59c]"
                            style={{ width: `${primaryCourse.completionPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <Link
                        href="/schedule"
                        className="bg-gradient-to-r from-primary to-primary-container text-on-primary-container px-8 py-4 rounded-xl font-headline font-bold text-lg shadow-[0_0_24px_rgba(232,80,10,0.3)] hover:scale-105 active:scale-95 transition-all"
                      >
                        Join Class
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="col-span-12 lg:col-span-8 bg-surface-container-low rounded-xl flex flex-col items-center justify-center p-8 min-h-[300px] text-center">
                    <span className="material-symbols-outlined text-5xl text-slate-600 mb-4">school</span>
                    <h2 className="text-xl font-bold text-white mb-2">No courses yet</h2>
                    <p className="text-slate-400 text-sm">
                      {user?.paymentStatus
                        ? "You're enrolled — contact your instructor to be added to a course."
                        : "Complete your payment to get access to courses."}
                    </p>
                    {!user?.paymentStatus && (
                      <Link
                        href="/checkout"
                        className="mt-6 bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary/90 transition-all"
                      >
                        Enroll Now
                      </Link>
                    )}
                  </div>
                )}
              </div>

              {/* Course progress + Upcoming Sessions */}
              <div className="grid grid-cols-12 gap-6 mt-6">
                {/* Courses */}
                <div className="col-span-12 lg:col-span-8">
                  <h3 className="text-xl font-headline font-bold text-white mb-6">My Courses</h3>
                  {progressList.length === 0 ? (
                    <p className="text-slate-500 text-sm">No courses to show.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {progressList.map((course) => (
                        <div
                          key={course.courseId}
                          className="bg-surface-container rounded-xl overflow-hidden hover:bg-surface-container-high transition-colors border border-outline-variant/5"
                        >
                          <div className="p-6">
                            <h3 className="font-bold text-lg mb-1 text-white">{course.courseName}</h3>
                            <p className="text-slate-400 text-sm mb-4">
                              {course.modulesCompleted}/{course.totalModules} modules
                            </p>
                            <div className="flex items-center gap-2 mb-3">
                              <div className="flex-1 h-2 bg-surface-variant rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary rounded-full"
                                  style={{ width: `${course.completionPercentage}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-slate-400 w-10 text-right">
                                {course.completionPercentage.toFixed(0)}%
                              </span>
                            </div>
                            {/* Module list */}
                            <div className="space-y-1 mt-4">
                              {course.modules.slice(0, 5).map((m) => (
                                <div key={m.id} className="flex items-center gap-2 text-xs">
                                  <span
                                    className={`material-symbols-outlined text-sm ${
                                      m.completed ? "text-green-400" : "text-slate-600"
                                    }`}
                                  >
                                    {m.completed ? "check_circle" : "radio_button_unchecked"}
                                  </span>
                                  <span className={m.completed ? "text-slate-400" : "text-slate-500"}>
                                    {m.moduleNumber}. {m.title}
                                  </span>
                                </div>
                              ))}
                              {course.modules.length > 5 && (
                                <p className="text-xs text-slate-600 pl-6">
                                  +{course.modules.length - 5} more modules
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Upcoming sessions */}
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
                  <h3 className="text-xl font-headline font-bold text-white">Upcoming Sessions</h3>
                  {upcomingClasses.length === 0 ? (
                    <p className="text-slate-500 text-sm">No upcoming sessions.</p>
                  ) : (
                    upcomingClasses.map((cls) => (
                      <div
                        key={cls.id}
                        className="bg-surface-container p-4 rounded-xl border-l-4 border-primary flex items-center justify-between hover:bg-surface-container-high transition-all"
                      >
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-primary mb-1">
                            {formatDate(cls.startTime)} • {formatTime(cls.startTime)}
                          </span>
                          <h5 className="text-white font-bold text-sm">{cls.topic}</h5>
                          {cls.course && (
                            <p className="text-slate-400 text-xs italic">{cls.course.courseName}</p>
                          )}
                        </div>
                        <Link href="/schedule">
                          <button className="bg-surface-variant p-2 rounded-lg text-primary hover:bg-primary hover:text-white transition-all">
                            <span className="material-symbols-outlined">video_camera_front</span>
                          </button>
                        </Link>
                      </div>
                    ))
                  )}

                  {/* Overall progress summary */}
                  {progressList.length > 0 && (
                    <div className="mt-4 bg-surface-container p-5 rounded-xl">
                      <h4 className="text-sm font-bold text-white mb-3">Overall Progress</h4>
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-full border-4 border-primary/20 flex items-center justify-center relative">
                          <span className="text-lg font-black text-primary">
                            {overallProgress.toFixed(0)}%
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">
                            {totalModulesCompleted} modules done
                          </p>
                          <p className="text-slate-400 text-xs">
                            across {progressList.length} course{progressList.length > 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
