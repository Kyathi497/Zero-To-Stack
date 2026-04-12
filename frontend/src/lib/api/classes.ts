import { apiRequest } from "../api-client";

export interface ClassItem {
  id: string;
  courseId: string;
  moduleId: string | null;
  topic: string;
  date: string;
  startTime: string;
  endTime: string;
  meetLink: string | null;
  recordingLink: string | null;
  status: "SCHEDULED" | "LIVE" | "COMPLETED" | "CANCELLED";
  reminderSentAt: string | null;
  hasMeetLink?: boolean;
  meetLinkAccessible?: boolean;
  course?: { courseName: string };
  module?: { title: string } | null;
}

export interface CreateClassPayload {
  courseId: string;
  moduleId?: string;
  topic: string;
  date: string;
  startTime: string;
  endTime: string;
  meetLink?: string;
  recordingLink?: string;
  status?: string;
}

// ─── Admin ─────────────────────────────────────────────────────────────────

export const adminCreateClass = (data: CreateClassPayload) =>
  apiRequest<ClassItem>("/admin/classes", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const adminGetClasses = (courseId?: string) =>
  apiRequest<ClassItem[]>(`/admin/classes${courseId ? `?courseId=${courseId}` : ""}`);

export const adminGetClass = (id: string) =>
  apiRequest<ClassItem>(`/admin/classes/${id}`);

export const adminUpdateClass = (id: string, data: Partial<CreateClassPayload>) =>
  apiRequest<ClassItem>(`/admin/classes/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const adminDeleteClass = (id: string) =>
  apiRequest<null>(`/admin/classes/${id}`, { method: "DELETE" });

// ─── Student ───────────────────────────────────────────────────────────────

export const getClasses = (courseId?: string) =>
  apiRequest<ClassItem[]>(`/classes${courseId ? `?courseId=${courseId}` : ""}`);

export const getMeetLink = (classId: string) =>
  apiRequest<string>(`/classes/${classId}/meet-link`);
