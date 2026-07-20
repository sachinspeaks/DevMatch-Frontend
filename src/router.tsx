import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Feed from "./pages/feed";
import ProtectedRoute from "./customComponents/ProtectedRoute";
import PublicRoute from "./customComponents/PublicRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Guest-only routes — redirect to / if already logged in
      {
        element: <PublicRoute />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
        ],
      },
      // Protected routes — require a logged-in user
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <Feed />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);
