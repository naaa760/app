import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdmin = token?.role === "ADMIN";
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
    const isItemsRoute = req.nextUrl.pathname.startsWith("/items");
    const isAuthRoute = req.nextUrl.pathname.startsWith("/auth");

    // Redirect authenticated users away from auth pages
    if (isAuthRoute && token) {
      return NextResponse.redirect(new URL("/items", req.url));
    }

    // Protect admin routes
    if (isAdminRoute && !isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Allow access to protected routes
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isAuthRoute = req.nextUrl.pathname.startsWith("/auth");
        // Always allow access to auth routes and public pages
        if (isAuthRoute || req.nextUrl.pathname === "/") {
          return true;
        }
        // Require authentication for other routes
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/items/:path*", "/auth/:path*"],
};
