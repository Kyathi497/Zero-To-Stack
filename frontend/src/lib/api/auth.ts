import { apiRequest } from "../api-client";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "STUDENT" | "ADMIN";
}

export async function signupApi(data: {
  name: string;
  email: string;
  password: string;
  phone?: string;
}) {
  return apiRequest<User>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function loginApi(data: { email: string; password: string }) {
  return apiRequest<User>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function logoutApi() {
  return apiRequest<null>("/auth/logout", { method: "POST" });
}

export async function meApi() {
  return apiRequest<User>("/auth/me");
}
