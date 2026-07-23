import axios from "axios";
import { BASE_URL } from "./utils";
import { isPublicRoute } from "./routes";

// Central axios instance — `withCredentials` ensures the auth cookie is sent
// on every request, so you never have to remember it per-call.
export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Global auth guard: if any request comes back 401 (token expired/deleted
// mid-session), send the user to login. We use a hard redirect here because
// interceptors live outside React and can't use the router's navigate().
// Skip the redirect on public routes (/, /login, /signup) — a logged-out
// visitor is allowed to be there, and bouncing them would also loop.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error?.response?.status === 401 &&
      !isPublicRoute(window.location.pathname)
    ) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
