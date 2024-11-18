import Sidebar from "@/components/Basic/Sidebar";
import ConnectWalletButton from "@/components/ConnectWalletButton";
import ScrollToTop from "@/components/ScrollToTop";
import { Outlet } from "react-router-dom";
import { useAccount } from "wagmi";
import AccountInfo from "./AccountInfo";
import "./index.less";
import NetworkSelector from "./NetworkSelector";

const Main = () => {
  const { address, isConnected } = useAccount();

  return (
    <div className="main-container">
      <Sidebar />
      <div className="flex-1 bg-white ">
        {isConnected ? (
          <div className="flex items-center pr-9 py-3 justify-end mb-3 gap-1">
            <NetworkSelector />
            <AccountInfo />
          </div>
        ) : (
          <ConnectWalletButton />
        )}
        <ScrollToTop />
        <Outlet />
      </div>
    </div>
  );
};
export default Main;
