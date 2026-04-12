"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  adminGetCourses,
  adminCreateCourse,
  adminDeleteCourse,
  adminCreateModule,
  adminGetModules,
  type Course,
  type CourseModule,
} from "@/lib/api/courses";

const courseSchema = z.object({
  courseName: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
  startDate: z.string().min(1, "Required"),
  endDate: z.string().min(1, "Required"),
  totalModules: z.coerce.number().int().min(1, "At least 1"),
});

const moduleSchema = z.object({
  moduleNumber: z.coerce.number().int().min(1),
  title: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
  estimatedHours: z.coerce.number().min(0).optional(),
});

type CourseFields = z.infer<typeof courseSchema>;
type ModuleFields = z.infer<typeof moduleSchema>;

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [showModuleForm, setShowModuleForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register: regCourse,
    handleSubmit: handleCourse,
    reset: resetCourse,
    formState: { errors: courseErrors, isSubmitting: courseSubmitting },
  } = useForm<CourseFields>({ resolver: zodResolver(courseSchema) });

  const {
    register: regModule,
    handleSubmit: handleModule,
    reset: resetModule,
    formState: { errors: moduleErrors, isSubmitting: moduleSubmitting },
  } = useForm<ModuleFields>({ resolver: zodResolver(moduleSchema) });

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    setLoading(true);
    const res = await adminGetCourses();
    if (res.success && res.data) setCourses(res.data);
    setLoading(false);
  }

  async function loadModules(courseId: string) {
    const res = await adminGetModules(courseId);
    if (res.success && res.data) setModules(res.data);
  }

  async function onCreateCourse(values: CourseFields) {
    setError(null);
    const res = await adminCreateCourse(values);
    if (res.success) {
      resetCourse();
      setShowCourseForm(false);
      await loadCourses();
    } else {
      setError(res.error?.message ?? "Failed to create course");
    }
  }

  async function onDeleteCourse(id: string) {
    if (!confirm("Delete this course and all its data?")) return;
    await adminDeleteCourse(id);
    if (selectedCourse?.id === id) setSelectedCourse(null);
    await loadCourses();
  }

  async function onSelectCourse(course: Course) {
    setSelectedCourse(course);
    await loadModules(course.id);
    setShowModuleForm(false);
  }

  async function onCreateModule(values: ModuleFields) {
    if (!selectedCourse) return;
    setError(null);
    const res = await adminCreateModule(selectedCourse.id, values);
    if (res.success) {
      resetModule();
      setShowModuleForm(false);
      await loadModules(selectedCourse.id);
    } else {
      setError(res.error?.message ?? "Failed to create module");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Courses</h1>
          <p className="text-slate-400 text-sm mt-1">Manage course catalog and modules</p>
        </div>
        <button
          onClick={() => setShowCourseForm((v) => !v)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          {showCourseForm ? "Cancel" : "+ New Course"}
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 text-sm mb-4">
          {error}
        </div>
      )}

      {showCourseForm && (
        <form
          onSubmit={handleCourse(onCreateCourse)}
          className="bg-zinc-900 border border-white/5 rounded-xl p-6 mb-6"
        >
          <h2 className="text-lg font-bold mb-4">New Course</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-400 block mb-1">Course Name</label>
              <input
                {...regCourse("courseName")}
                className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
                placeholder="e.g. Full Stack Bootcamp"
              />
              {courseErrors.courseName && (
                <p className="text-red-400 text-xs mt-1">{courseErrors.courseName.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm text-slate-400 block mb-1">Total Modules</label>
              <input
                {...regCourse("totalModules")}
                type="number"
                className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
              />
              {courseErrors.totalModules && (
                <p className="text-red-400 text-xs mt-1">{courseErrors.totalModules.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm text-slate-400 block mb-1">Start Date</label>
              <input
                {...regCourse("startDate")}
                type="date"
                className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 block mb-1">End Date</label>
              <input
                {...regCourse("endDate")}
                type="date"
                className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm text-slate-400 block mb-1">Description</label>
              <textarea
                {...regCourse("description")}
                rows={3}
                className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
              />
              {courseErrors.description && (
                <p className="text-red-400 text-xs mt-1">{courseErrors.description.message}</p>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={courseSubmitting}
            className="mt-4 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            {courseSubmitting ? "Creating…" : "Create Course"}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <p className="text-slate-400 text-sm">Loading…</p>
        ) : courses.length === 0 ? (
          <p className="text-slate-400 text-sm">No courses yet.</p>
        ) : (
          courses.map((course) => (
            <div
              key={course.id}
              onClick={() => onSelectCourse(course)}
              className={`bg-zinc-900 border rounded-xl p-5 cursor-pointer transition-all ${
                selectedCourse?.id === course.id
                  ? "border-orange-500/60"
                  : "border-white/5 hover:border-orange-500/30"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-white">{course.courseName}</h3>
                  <p className="text-slate-400 text-sm mt-1 line-clamp-2">{course.description}</p>
                  <div className="flex gap-4 mt-3 text-xs text-slate-500">
                    <span>{course.totalModules} modules</span>
                    <span>{course._count?.classes ?? 0} classes</span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteCourse(course.id);
                  }}
                  className="text-slate-500 hover:text-red-400 transition-colors text-xs px-2 py-1"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedCourse && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">
              Modules —{" "}
              <span className="text-orange-400">{selectedCourse.courseName}</span>
            </h2>
            <button
              onClick={() => setShowModuleForm((v) => !v)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              {showModuleForm ? "Cancel" : "+ Add Module"}
            </button>
          </div>

          {showModuleForm && (
            <form
              onSubmit={handleModule(onCreateModule)}
              className="bg-zinc-900 border border-white/5 rounded-xl p-6 mb-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-400 block mb-1">Module #</label>
                  <input
                    {...regModule("moduleNumber")}
                    type="number"
                    defaultValue={modules.length + 1}
                    className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-400 block mb-1">Estimated Hours</label>
                  <input
                    {...regModule("estimatedHours")}
                    type="number"
                    step="0.5"
                    className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-400 block mb-1">Title</label>
                  <input
                    {...regModule("title")}
                    className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
                  />
                  {moduleErrors.title && (
                    <p className="text-red-400 text-xs mt-1">{moduleErrors.title.message}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm text-slate-400 block mb-1">Description</label>
                  <input
                    {...regModule("description")}
                    className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
                  />
                  {moduleErrors.description && (
                    <p className="text-red-400 text-xs mt-1">{moduleErrors.description.message}</p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                disabled={moduleSubmitting}
                className="mt-4 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                {moduleSubmitting ? "Adding…" : "Add Module"}
              </button>
            </form>
          )}

          {modules.length === 0 ? (
            <p className="text-slate-400 text-sm">No modules yet.</p>
          ) : (
            <div className="space-y-2">
              {modules.map((mod) => (
                <div
                  key={mod.id}
                  className="bg-zinc-900 border border-white/5 rounded-lg px-5 py-4 flex items-center justify-between"
                >
                  <div>
                    <span className="text-orange-400 text-xs font-semibold mr-2">
                      Module {mod.moduleNumber}
                    </span>
                    <span className="font-medium">{mod.title}</span>
                    <p className="text-slate-400 text-xs mt-1">{mod.description}</p>
                  </div>
                  <span className="text-slate-500 text-xs">{mod.estimatedHours}h</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
