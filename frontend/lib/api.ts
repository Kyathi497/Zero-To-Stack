const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

async function tryRefresh(): Promise<boolean> {
  if (isRefreshing && refreshPromise) return refreshPromise;
  isRefreshing = true;
  refreshPromise = fetch(`${API_BASE}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  })
    .then(async (r) => {
      if (!r.ok) return false;
      const body = await r.json();
      return !!((body.data ?? body).accessToken || (body.data ?? body).user);
    })
    .catch(() => false)
    .finally(() => {
      isRefreshing = false;
      refreshPromise = null;
    });
  return refreshPromise;
}

function unwrap<T>(body: unknown): T {
  const b = body as Record<string, unknown>;
  return (b.data ?? b) as T;
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    credentials: "include",
  });

  if (res.status === 401) {
    const refreshed = await tryRefresh();
    if (refreshed) {
      const retry = await fetch(`${API_BASE}${path}`, {
        ...init,
        credentials: "include",
      });
      if (retry.ok) return unwrap<T>(await retry.json());
      const retryBody = await retry.json().catch(() => ({})) as Record<string, unknown>;
      const retryErr = retryBody.error as Record<string, string> | undefined;
      throw new Error(retryErr?.message ?? `API error ${retry.status}`);
    }
    // Refresh failed — redirect to login
    if (typeof window !== "undefined") window.location.href = "/login";
    throw new Error("Session expired");
  }

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({})) as Record<string, unknown>;
    const err = errBody.error as Record<string, string> | undefined;
    throw new Error(err?.message ?? `API error ${res.status}`);
  }
  return unwrap<T>(await res.json());
}

// ── Student progress ──────────────────────────────────────────────────────────

export interface ApiModule {
  id: string;
  moduleNumber: number;
  title: string;
  description: string;
  estimatedHours: number;
  completed: boolean;
  completionDate: string | null;
  studentCompleted: boolean;
}

export interface ApiProgressRecord {
  courseId: string;
  courseName: string;
  totalModules: number;
  enrollmentDate: string;
  completionPercentage: number;
  modulesCompleted: number;
  streakDays: number;
  lastActivityDate: string;
  modules: ApiModule[];
}

export async function getMyProgress(): Promise<ApiProgressRecord[]> {
  return apiFetch<ApiProgressRecord[]>("/progress");
}

// ── Classes (student view) ────────────────────────────────────────────────────

export interface ApiClass {
  id: string;
  courseId: string;
  moduleId: string | null;
  topic: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "SCHEDULED" | "LIVE" | "COMPLETED" | "CANCELLED";
  meetLink: null;
  hasMeetLink: boolean;
  meetLinkAccessible: boolean;
  recordingLink: string | null;
  course: { courseName: string };
  module: { title: string } | null;
}

export async function getMyClasses(): Promise<ApiClass[]> {
  return apiFetch<ApiClass[]>("/classes");
}

export async function getMeetLink(classId: string): Promise<string> {
  return apiFetch<string>(`/classes/${classId}/meet-link`);
}

// ── Admin: students dashboard ─────────────────────────────────────────────────

export interface ApiStudentDashboardRow {
  id: string;
  name: string;
  email: string;
  paymentStatus: boolean;
  avgCompletion: number;
  streakDays: number;
  currentModule: string;
  lastActive: string | null;
}

export async function getAdminStudents(): Promise<ApiStudentDashboardRow[]> {
  return apiFetch<ApiStudentDashboardRow[]>("/admin/progress/students/dashboard");
}

// ── Admin: classes ────────────────────────────────────────────────────────────

export interface ApiAdminClass {
  id: string;
  courseId: string;
  moduleId: string | null;
  topic: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "SCHEDULED" | "LIVE" | "COMPLETED" | "CANCELLED";
  meetLink: string | null;
  recordingLink: string | null;
  course: { courseName: string };
  module: { title: string } | null;
}

export async function getAdminClasses(courseId?: string): Promise<ApiAdminClass[]> {
  const qs = courseId ? `?courseId=${encodeURIComponent(courseId)}` : "";
  return apiFetch<ApiAdminClass[]>(`/admin/classes${qs}`);
}
