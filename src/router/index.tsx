import { createBrowserRouter, Navigate } from "react-router-dom";
import Main from "@/pages/main";
import HomePage from "@/pages/home-page";
import LandingPage from "@/pages/landing-page";
import ProfilePage from "@/pages/profile-page";
import SpacePage from "@/pages/space-page";
import TokenPage from "@/pages/token-page";
import TokenDetailPage from "@/pages/token-detail-page";
import AuthCallbackPage from "@/pages/auth-callback-page";

import { ReactNode } from "react";
import { useAccount } from "wagmi";

const PrivateRoute: React.FC<{ element: ReactNode }> = ({ element }) => {
  const { isConnected } = useAccount();
  return isConnected ? element : <Navigate to="/login" replace />;
};

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
        path: "/auth/:authProvider/callback",
        element: <AuthCallbackPage />,
      },
      {
        path: "home",
        element: <PrivateRoute element={<HomePage />} />,
      },
      {
        path: "profile",
        element: <PrivateRoute element={<ProfilePage />} />,
      },
      {
        path: "space",
        element: <PrivateRoute element={<SpacePage />} />,
      },
      {
        path: "token",
        element: <PrivateRoute element={<TokenPage />} />,
      },
      {
        path: "token-detail",
        element: <PrivateRoute element={<TokenDetailPage />} />,
      },
    ],
  },
];
// if wallet is not connected, redirect to login page

export default createBrowserRouter(routes);
