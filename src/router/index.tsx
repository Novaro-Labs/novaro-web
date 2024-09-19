import { createBrowserRouter, Navigate } from "react-router-dom";
import Main from "../pages/main";
import HomePage from "../pages/home-page";
import LandingPage from "../pages/landing-page";
import ProfilePage from "../pages/profile-page";
import SpacePage from "../pages/space-page";
import TokenPage from "../pages/token-page";

const routes = [
  {
    path: "/login",
    element: <LandingPage />,
  },
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Navigate to="home" replace />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "space",
        element: <SpacePage />,
      },
      {
        path: "token",
        element: <TokenPage />,
      },
    ],
  },
];

export default createBrowserRouter(routes);
