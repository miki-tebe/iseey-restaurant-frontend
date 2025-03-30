/**
 * These routes do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = ["/public"];

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged-in users to the dashboard.
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/",
];

export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after a successful login.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard/index";
