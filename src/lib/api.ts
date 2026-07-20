import axios from "axios";
import { BASE_URL } from "./utils";

// Central axios instance — `withCredentials` ensures the auth cookie is sent
// on every request, so you never have to remember it per-call.
export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Global auth guard: if any request comes back 401 (token expired/deleted
// mid-session), send the user to login. We use a hard redirect here because
// interceptors live outside React and can't use the router's navigate().
// Skip the redirect if we're already on /login to avoid a loop.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error?.response?.status === 401 &&
      window.location.pathname !== "/login"
    ) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
