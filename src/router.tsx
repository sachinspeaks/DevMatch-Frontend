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
import About from "./pages/about";
import Privacy from "./pages/privacy";
import Contact from "./pages/contact";
import Chat from "./pages/chat";
import Premium from "./pages/premium";
import PremiumSuccess from "./pages/premium-success";

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
      // Static pages — linked from the footer, open to everyone
      {
        path: "about",
        element: <About />,
      },
      {
        path: "privacy",
        element: <Privacy />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "premium",
        element: <Premium />,
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
          {
            path: "chat/:toUserId",
            element: <Chat />,
          },
          {
            path: "premium/success",
            element: <PremiumSuccess />,
          },
        ],
      },
    ],
  },
]);
