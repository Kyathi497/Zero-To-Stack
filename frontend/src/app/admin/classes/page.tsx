"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  adminGetClasses,
  adminCreateClass,
  adminUpdateClass,
  adminDeleteClass,
  type ClassItem,
} from "@/lib/api/classes";
import { adminGetCourses, type Course } from "@/lib/api/courses";

const classSchema = z.object({
  courseId: z.string().uuid("Select a course"),
  topic: z.string().min(1, "Required"),
  date: z.string().min(1, "Required"),
  startTime: z.string().min(1, "Required"),
  endTime: z.string().min(1, "Required"),
  meetLink: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  recordingLink: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  status: z.enum(["SCHEDULED", "LIVE", "COMPLETED", "CANCELLED"]).optional(),
});

type ClassFields = z.infer<typeof classSchema>;

const STATUS_COLORS: Record<string, string> = {
  SCHEDULED: "text-blue-400 bg-blue-500/10",
  LIVE: "text-green-400 bg-green-500/10",
  COMPLETED: "text-slate-400 bg-slate-500/10",
  CANCELLED: "text-red-400 bg-red-500/10",
};

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function AdminClassesPage() {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingClass, setEditingClass] = useState<ClassItem | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ClassFields>({ resolver: zodResolver(classSchema) });

  useEffect(() => {
    Promise.all([loadClasses(), loadCourses()]);
  }, []);

  async function loadClasses() {
    setLoading(true);
    const res = await adminGetClasses();
    if (res.success && res.data) setClasses(res.data);
    setLoading(false);
  }

  async function loadCourses() {
    const res = await adminGetCourses();
    if (res.success && res.data) setCourses(res.data);
  }

  function openCreate() {
    setEditingClass(null);
    reset();
    setShowForm(true);
  }

  function openEdit(cls: ClassItem) {
    setEditingClass(cls);
    setValue("courseId", cls.courseId);
    setValue("topic", cls.topic);
    setValue("date", cls.date.split("T")[0]);
    setValue("startTime", cls.startTime.slice(0, 16));
    setValue("endTime", cls.endTime.slice(0, 16));
    setValue("meetLink", cls.meetLink ?? "");
    setValue("recordingLink", cls.recordingLink ?? "");
    setValue("status", cls.status);
    setShowForm(true);
  }

  async function onSubmit(values: ClassFields) {
    setError(null);

    // Build ISO datetimes: combine date + time fields
    const startTime = values.startTime.includes("T")
      ? values.startTime
      : `${values.date}T${values.startTime}`;
    const endTime = values.endTime.includes("T")
      ? values.endTime
      : `${values.date}T${values.endTime}`;

    const payload = {
      ...values,
      startTime,
      endTime,
      meetLink: values.meetLink || undefined,
      recordingLink: values.recordingLink || undefined,
    };

    let res;
    if (editingClass) {
      res = await adminUpdateClass(editingClass.id, payload);
    } else {
      res = await adminCreateClass(payload);
    }

    if (res.success) {
      reset();
      setShowForm(false);
      setEditingClass(null);
      await loadClasses();
    } else {
      setError(res.error?.message ?? "Failed to save class");
    }
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this class?")) return;
    await adminDeleteClass(id);
    await loadClasses();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Live Classes</h1>
          <p className="text-slate-400 text-sm mt-1">
            Schedule sessions and paste Google Meet links
          </p>
        </div>
        <button
          onClick={showForm ? () => setShowForm(false) : openCreate}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          {showForm ? "Cancel" : "+ Schedule Class"}
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 text-sm mb-4">
          {error}
        </div>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-zinc-900 border border-white/5 rounded-xl p-6 mb-6"
        >
          <h2 className="text-lg font-bold mb-4">
            {editingClass ? "Edit Class" : "Schedule New Class"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-400 block mb-1">Course</label>
              <select
                {...register("courseId")}
                className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
              >
                <option value="">— Select a course —</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.courseName}
                  </option>
                ))}
              </select>
              {errors.courseId && (
                <p className="text-red-400 text-xs mt-1">{errors.courseId.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm text-slate-400 block mb-1">Topic</label>
              <input
                {...register("topic")}
                className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
                placeholder="e.g. Introduction to React Hooks"
              />
              {errors.topic && (
                <p className="text-red-400 text-xs mt-1">{errors.topic.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm text-slate-400 block mb-1">Date</label>
              <input
                {...register("date")}
                type="date"
                className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-sm text-slate-400 block mb-1">Start Time</label>
                <input
                  {...register("startTime")}
                  type="time"
                  className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="text-sm text-slate-400 block mb-1">End Time</label>
                <input
                  {...register("endTime")}
                  type="time"
                  className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-400 block mb-1">
                Google Meet Link{" "}
                <span className="text-slate-500">(paste here — never shared in list)</span>
              </label>
              <input
                {...register("meetLink")}
                className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
                placeholder="https://meet.google.com/xxx-xxxx-xxx"
              />
              {errors.meetLink && (
                <p className="text-red-400 text-xs mt-1">{errors.meetLink.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm text-slate-400 block mb-1">
                Recording Link{" "}
                <span className="text-slate-500">(add after class)</span>
              </label>
              <input
                {...register("recordingLink")}
                className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
                placeholder="https://drive.google.com/..."
              />
              {errors.recordingLink && (
                <p className="text-red-400 text-xs mt-1">{errors.recordingLink.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm text-slate-400 block mb-1">Status</label>
              <select
                {...register("status")}
                className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
              >
                <option value="SCHEDULED">Scheduled</option>
                <option value="LIVE">Live</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            {isSubmitting ? "Saving…" : editingClass ? "Save Changes" : "Schedule Class"}
          </button>
        </form>
      )}

      {loading ? (
        <p className="text-slate-400 text-sm">Loading…</p>
      ) : classes.length === 0 ? (
        <p className="text-slate-400 text-sm">No classes scheduled yet.</p>
      ) : (
        <div className="space-y-3">
          {classes.map((cls) => (
            <div
              key={cls.id}
              className="bg-zinc-900 border border-white/5 rounded-xl px-5 py-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-white">{cls.topic}</h3>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        STATUS_COLORS[cls.status] ?? ""
                      }`}
                    >
                      {cls.status}
                    </span>
                    {cls.meetLink && (
                      <span className="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">
                        Meet link set
                      </span>
                    )}
                  </div>
                  <p className="text-slate-400 text-sm">{cls.course?.courseName}</p>
                  <div className="flex gap-4 mt-2 text-xs text-slate-500">
                    <span>{formatDateTime(cls.startTime)}</span>
                    <span>→ {new Date(cls.endTime).toLocaleTimeString("en-IN", { timeStyle: "short" })}</span>
                  </div>
                  {cls.recordingLink && (
                    <a
                      href={cls.recordingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-400 text-xs mt-2 inline-block hover:underline"
                    >
                      Recording available
                    </a>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(cls)}
                    className="text-slate-400 hover:text-white text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(cls.id)}
                    className="text-red-400 hover:text-red-300 text-xs px-3 py-1.5 rounded-lg bg-red-500/5 hover:bg-red-500/15 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
