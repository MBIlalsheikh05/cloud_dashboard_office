import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Paths that require admin access
const adminPaths = ["/admin", "/admin/*"];

export function middleware(req: NextRequest) {
  const role = req.cookies.get("role")?.value; // read role from cookie

  // Check if current path requires admin
  const pathname = req.nextUrl.pathname;
  const isAdminPath = adminPaths.some((path) =>
    new RegExp("^" + path.replace("*", ".*") + "$").test(pathname)
  );

  if (isAdminPath) {
    if (role !== "admin") {
      // Redirect non-admin users to home or login
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  // Let other requests pass
  return NextResponse.next();
}

// Optional: apply middleware only to certain paths
export const config = {
  matcher: ["/admin/:path*"], // all admin routes
};
