import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that require authentication
const PROTECTED = ["/dashboard", "/checkout", "/settings", "/batches", "/certificates", "/results"];
// Routes only for guests (redirect away if already logged in)
const GUEST_ONLY = ["/login", "/sign-up"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasAccessToken = request.cookies.has("access_token");

  const isProtected = PROTECTED.some((path) => pathname.startsWith(path));
  const isGuestOnly = GUEST_ONLY.some((path) => pathname.startsWith(path));

  if (isProtected && !hasAccessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isGuestOnly && hasAccessToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
