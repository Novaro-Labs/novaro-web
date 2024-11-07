import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useAccount } from "wagmi";
import "./global.css";
import router from "./router/index.tsx";

function App() {
  const { isConnected, address } = useAccount();

  useEffect(() => {
    // 暂时作为钱包登录的方式
    if (isConnected) {
      localStorage.setItem("x_auth_code", String(address));
      localStorage.setItem("x_auth_time", String(Date.now()));
    }
  }, [isConnected]);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
