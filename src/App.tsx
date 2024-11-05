import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useAccount } from "wagmi";
import "./global.css";
import router from "./router/index.tsx";

function App() {
  const { isConnected, address } = useAccount();

  useEffect(() => {
    if (isConnected) {
      localStorage.setItem("x_auth_code", String(address));
      localStorage.setItem("x_auth_time", String(Date.now()));
    } else {
      localStorage.removeItem("x_auth_code");
      localStorage.removeItem("x_auth_time");
    }
  }, [isConnected]);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
