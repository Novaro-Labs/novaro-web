import AuthCallbackPage from "@/pages/auth-callback-page";
import HomePage from "@/pages/home-page";
import LandingPage from "@/pages/landing-page";
import Main from "@/pages/main";
import ProfilePage from "@/pages/profile-page";
import SpacePage from "@/pages/space-page";
import TokenDetailPage from "@/pages/token-detail-page";
import TokenPage from "@/pages/token-page";
import CommunityPage from "@/pages/community-page";
import { createBrowserRouter, Navigate } from "react-router-dom";
import NotFound from "@/components/NotFound";
import CryptosPage from "@/pages/cryptos-page";
import { ReactNode } from "react";

const PrivateRoute: React.FC<{ element: ReactNode }> = ({ element }) => {
  // const { isConnected } = useAccount();
  let x_auth_code = localStorage.getItem("x_auth_code");
  const x_auth_time = localStorage.getItem("x_auth_time");
  console.log({ x_auth_code, x_auth_time });
  if (
    x_auth_time &&
    Date.now() - Number(x_auth_time) > 1000 * 60 * 60 * 24 * 30
  ) {
    x_auth_code = null;
    localStorage.removeItem("x_auth_code");
    localStorage.removeItem("x_auth_time");
  }
  return x_auth_code ? element : <Navigate to="/login" replace />;
};

const routes = [
  {
    path: "/login",
    element: <LandingPage />,
  },
  {
    path: "/auth/:authProvider/callback",
    element: <AuthCallbackPage />,
  },
  {
    path: "/",
    element: <PrivateRoute element={<Main />} />,
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
        path: "space",
        element: <SpacePage />,
      },
      {
        path: "token",
        element: <TokenPage />,
      },
      {
        path: "token/:tokenId",
        element: <TokenDetailPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "cryptos",
        element: <CryptosPage />,
      },
      {
        path: "community",
        element: <CommunityPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default createBrowserRouter(routes);
