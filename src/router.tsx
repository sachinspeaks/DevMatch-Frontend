import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Feed from "./pages/feed";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Feed />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);
