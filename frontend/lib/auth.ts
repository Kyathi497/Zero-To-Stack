const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    paymentStatus?: string;
  };
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.error?.message || "Login failed");
  }

  const data = body.data ?? body;
  return { user: data.user ?? data };
}

export async function register(
  email: string,
  password: string,
  name: string,
  phone: string
): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name, phone }),
    credentials: "include",
  });

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.error?.message || "Registration failed");
  }

  const data = body.data ?? body;
  return { user: data.user ?? data };
}

export async function logout(): Promise<void> {
  await fetch(`${API_BASE}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}

export async function getCurrentUser(): Promise<AuthResponse["user"] | null> {
  try {
    const res = await fetch(`${API_BASE}/auth/me`, {
      credentials: "include",
    });
    if (!res.ok) return null;
    const body = await res.json();
    const data = body.data ?? body;
    return data.user ?? data;
  } catch {
    return null;
  }
}
