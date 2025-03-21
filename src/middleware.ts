import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { decrypt } from "@/lib/session";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (isProtectedRoute && !session?.token) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (isPublicRoute && session?.token && !path.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/dashboard/index", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
