import { apiRequest } from "../api-client";

export interface Course {
  id: string;
  courseName: string;
  description: string;
  startDate: string;
  endDate: string;
  totalModules: number;
  createdBy: string;
  createdAt: string;
  _count?: { modules: number; classes: number };
}

export interface CourseModule {
  id: string;
  courseId: string;
  moduleNumber: number;
  title: string;
  description: string;
  estimatedHours: number;
  completed: boolean;
}

export interface CreateCoursePayload {
  courseName: string;
  description: string;
  startDate: string;
  endDate: string;
  totalModules: number;
}

export interface CreateModulePayload {
  moduleNumber: number;
  title: string;
  description: string;
  estimatedHours?: number;
}

// ─── Admin ─────────────────────────────────────────────────────────────────

export const adminCreateCourse = (data: CreateCoursePayload) =>
  apiRequest<Course>("/admin/courses", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const adminGetCourses = () => apiRequest<Course[]>("/admin/courses");

export const adminGetCourse = (id: string) =>
  apiRequest<Course & { modules: CourseModule[] }>(`/admin/courses/${id}`);

export const adminUpdateCourse = (id: string, data: Partial<CreateCoursePayload>) =>
  apiRequest<Course>(`/admin/courses/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const adminDeleteCourse = (id: string) =>
  apiRequest<null>(`/admin/courses/${id}`, { method: "DELETE" });

export const adminCreateModule = (courseId: string, data: CreateModulePayload) =>
  apiRequest<CourseModule>(`/admin/courses/${courseId}/modules`, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const adminGetModules = (courseId: string) =>
  apiRequest<CourseModule[]>(`/admin/courses/${courseId}/modules`);

export const adminUpdateModule = (
  courseId: string,
  moduleId: string,
  data: Partial<CreateModulePayload>
) =>
  apiRequest<CourseModule>(`/admin/courses/${courseId}/modules/${moduleId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const adminDeleteModule = (courseId: string, moduleId: string) =>
  apiRequest<null>(`/admin/courses/${courseId}/modules/${moduleId}`, {
    method: "DELETE",
  });

// ─── Student ───────────────────────────────────────────────────────────────

export const getCourses = () => apiRequest<Course[]>("/courses");

export const getCourse = (id: string) =>
  apiRequest<Course & { modules: CourseModule[] }>(`/courses/${id}`);

export const getModules = (courseId: string) =>
  apiRequest<CourseModule[]>(`/courses/${courseId}/modules`);
