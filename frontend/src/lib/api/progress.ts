import { apiRequest } from "../api-client";

export interface ModuleProgress {
  id: string;
  moduleNumber: number;
  title: string;
  description: string;
  estimatedHours: number;
  completed: boolean;
  completionDate: string | null;
  studentCompleted: boolean;
}

export interface CourseProgress {
  courseId: string;
  courseName: string;
  totalModules: number;
  enrollmentDate: string;
  completionPercentage: number;
  modulesCompleted: number;
  streakDays: number;
  lastActivityDate: string;
  modules: ModuleProgress[];
}

export interface StudentSummary {
  id: string;
  name: string;
  email: string;
  paymentStatus: boolean;
  paymentDate: string | null;
  enrollmentDate: string | null;
  joinedAt: string;
  coursesEnrolled: number;
  avgCompletion: number;
  lastActive: string | null;
}

export interface StudentDetail extends Omit<StudentSummary, "avgCompletion" | "coursesEnrolled" | "lastActive"> {
  progress: CourseProgress[];
}

export interface CourseStudentProgress {
  studentId: string;
  name: string;
  email: string;
  paymentStatus: boolean;
  enrollmentDate: string;
  completionPercentage: number;
  modulesCompleted: number;
  streakDays: number;
  lastActivityDate: string;
}

export interface MarkModuleCompleteResult {
  moduleId: string;
  moduleName: string;
  newPercentage: number;
  studentsNotified: number;
}

// ─── Student ───────────────────────────────────────────────────────────────

export const enrollInCourse = (courseId: string) =>
  apiRequest<CourseProgress>("/progress/enroll", {
    method: "POST",
    body: JSON.stringify({ courseId }),
  });

export const getAllMyProgress = () =>
  apiRequest<CourseProgress[]>("/progress");

export const getMyCourseProgress = (courseId: string) =>
  apiRequest<CourseProgress>(`/progress/${courseId}`);

// ─── Admin ─────────────────────────────────────────────────────────────────

export const adminGetAllStudents = () =>
  apiRequest<StudentSummary[]>("/admin/progress/students");

export const adminGetStudentDetail = (studentId: string) =>
  apiRequest<StudentDetail>(`/admin/progress/students/${studentId}`);

export const adminGetCourseStudentsProgress = (courseId: string) =>
  apiRequest<CourseStudentProgress[]>(`/admin/progress/courses/${courseId}`);

export const adminMarkModuleComplete = (courseId: string, moduleId: string) =>
  apiRequest<MarkModuleCompleteResult>(
    `/admin/progress/courses/${courseId}/modules/${moduleId}/complete`,
    { method: "PATCH" }
  );

export const adminExportStudentsCsvUrl = () =>
  `${process.env.NEXT_PUBLIC_API_URL}/admin/progress/students/export`;
