import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "@/hooks";

// Guards protected routes: if there's no logged-in user in the store, redirect
// to /login. Runs on every navigation (including client-side), so a logged-out
// user can't reach these routes no matter how they navigate.
export default function ProtectedRoute() {
  const user = useAppSelector((state) => state.user);
  return user.id ? <Outlet /> : <Navigate to="/login" replace />;
}
