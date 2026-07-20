import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "@/hooks";

// Guest-only routes (e.g. /login): if a user is already logged in, send them
// to the home page instead of showing the login form.
export default function PublicRoute() {
  const user = useAppSelector((state) => state.user);
  return user.id ? <Navigate to="/" replace /> : <Outlet />;
}
