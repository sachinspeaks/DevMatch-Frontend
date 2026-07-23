// Routes a logged-out user is allowed to sit on. Kept in one place because
// both the axios 401 interceptor and the auth-init hook need the same list.
export const PUBLIC_ROUTES = ["/", "/login", "/signup"];

export function isPublicRoute(pathname: string) {
  return PUBLIC_ROUTES.includes(pathname);
}
