/**
 * An Array of public routes
 * These routes don't require authentication
 * @type {string[]}
 */

export const publicRoutes: string[] = [
    "/",
    "/auth/new-verification"

]

/**
 * An Array of routes used for authentication
 * These routes will redirect the user to settings page
 * @type {string[]}
 */

export const authRoutes: string[] = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password"
]

/**
 * The prefix for API authentication route
 * Routes that start with this prefix are used for API authentication processes
 * @type {string}
 */

export const apiAuthPrefix: string = "/api/auth"

/**
 * The default redirect path after logging in
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT: string = "/settings";
