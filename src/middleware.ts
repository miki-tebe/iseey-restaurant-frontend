// import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";

import { NextRequest, NextResponse } from "next/server";
import { publicRoutes, DEFAULT_LOGIN_REDIRECT, authRoutes } from "../routes";
import { cookies } from "next/headers";

// import { decrypt } from "@/lib/session";

// const protectedRoutes = ["/dashboard"];
// const publicRoutes = ["/"];

// export default async function middleware(req: NextRequest) {
//   const path = req.nextUrl.pathname;
//   const isProtectedRoute = protectedRoutes.includes(path);
//   const isPublicRoute = publicRoutes.includes(path);

//   const cookie = cookies().get("session")?.value;
//   if (!cookie) {
//     // return NextResponse.redirect(new URL("/", req.nextUrl));
//   } else {
//     console.log("Cookie found", path);
//   }
//   const session = await decrypt(cookie);
//   console.log("--------------", session);
//   if (isProtectedRoute && !session?.token) {
//     console.log("I am in protected route", path);
//     return NextResponse.redirect(new URL("/login", req.nextUrl));
//   }

//   if (isPublicRoute && session?.token && !path.startsWith("/dashboard")) {
//     console.log("I am in public route", path);
//     return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
//   }

//   return NextResponse.next();
// }

// Routes Middleware should not run on
// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
// };

export default function middleware(req: NextRequest) {
  const { nextUrl } = req;
  // const isLoggedIn = !!req.auth;
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isLoggedIn = !!cookies().get("session")?.value;
  console.log("isLoggedIn", isLoggedIn);
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    console.log("Not logged in", nextUrl.pathname);
    console.log(
      "next routing",
      NextResponse.redirect(new URL("/restaurants/auth/login", nextUrl))
    );
    return NextResponse.redirect(new URL("/restaurants/auth/login", nextUrl));
  }

  return null;

  // return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
