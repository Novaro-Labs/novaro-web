import { Outlet} from "react-router-dom";
import Sidebar from "@/components/Basic/Sidebar";
import "./index.less"

const Main = () => {
    return (
        <div className="main-container">
            <Sidebar/>
            <div className="content">
                <Outlet/>
            </div>
        </div>
    )
}
export default Main
