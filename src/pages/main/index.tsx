import Sidebar from "@/components/Basic/Sidebar";
import { Outlet } from "react-router-dom";
import "./index.less";

const Main = () => {
    return (
        <div className="main-container">
            <Sidebar/>
            <div className="flex-1 bg-white">
                <Outlet/>
            </div>
        </div>
    )
}
export default Main
