import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { api } from "@/lib/api";
import { useAppDispatch } from "@/hooks";

import { BASE_URL } from "@/lib/utils";
import { clearUser, setUser } from "@/features/user/userSlice";
import { isPublicRoute } from "@/lib/routes";

// Runs once on app load. Uses the auth cookie (sent automatically by `api`)
// to ask the backend who the current user is, and rehydrates the store.
// If the cookie is missing/expired/invalid, sends the user to /login — unless
// they're on a public route (the landing page, login, signup), where a
// logged-out visitor is welcome to stay.
// Returns `loading` so the app can hold the UI until the check resolves.
export function useAuthInit() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        // NOTE: match this to your backend's "get current user" route.
        const res = await api.get("/profile/view");
        if (active) dispatch(setUser(res.data.user ?? res.data));
      } catch {
        // No valid session (401 / expired / deleted token). Reset any stale
        // state and bounce to login — unless we're already on a public route.
        if (active) {
          dispatch(clearUser());
          if (!isPublicRoute(location.pathname)) {
            navigate("/login", { replace: true });
          }
        }
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
    // Run once on mount only — we don't want a re-check on every navigation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return loading;
}
