import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Home from "./pages/home";
import ProtectedRoute from "./customComponents/ProtectedRoute";
import PublicRoute from "./customComponents/PublicRoute";
import Requests from "./pages/requests";
import Connections from "./pages/connections";
import SignUp from "./pages/signup";
import Feed from "./pages/feed";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Public landing page — logged-out visitors only; Home forwards a
      // logged-in user to /feed.
      {
        index: true,
        element: <Home />,
      },
      // Guest-only routes — redirect to / if already logged in
      {
        element: <PublicRoute />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "signup",
            element: <SignUp />,
          },
        ],
      },
      // Protected routes — require a logged-in user
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "requests",
            element: <Requests />,
          },
          {
            path: "connections",
            element: <Connections />,
          },
          {
            path: "feed",
            element: <Feed />,
          },
        ],
      },
    ],
  },
]);
