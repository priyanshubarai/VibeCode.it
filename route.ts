/**
 * an array of routes accessible to public
 * this routes dont need authentication
 * @type {string[]}
 */
export const publicRoutes : Array<string> = [
    "/",
    "/login",
    "/signup",
];

/**
 * array of protected routes
 * need authentication of access
 * @type {string[]}
 */
export const protectedRoutes : Array<string> = [
    "/dashboard"
]


/**
 * routes related to authentication
 * logged in user will be redirected to dashboard
 * @type {string[]}
 */
export const authRoutes : Array<string> = [
    "/auth/login",
    "/auth/signup",     
]

/**
 * for authjs use of authentication
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"

/**
 * the default redirect path for logged in user
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard"



