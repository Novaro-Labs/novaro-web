import FollowList from "../../components/FollowList";
import BlogList from "../../components/BlogList";
import "./index.less"
import {Input} from "@web3uikit/core";
import {Search} from "@web3uikit/icons";

const HomePage = () => {
    return (
        <div className="home-container">
            <div className="home-left">
                <div className="home-left-top">
                    <div>Home</div>
                    <Input
                        style={{
                            height: "40px",
                            background: "#f7f7f7", // A2A5B1
                            outline: "none",
                        }}
                        placeholder="Search or type a command"
                        width="323px"
                        prefixIcon={<Search style={{ color: "#A2A5B1"}} />}
                        name="Test text Input"
                        onBlur={function noRefCheck(){}}
                        onChange={function noRefCheck(){}}
                    />
                </div>
                <div>

                </div>
                <BlogList/>
            </div>
            <div className="home-right">
                <div className="home-right-title">Suggested Follows</div>
                <FollowList/>
            </div>
        </div>
    )
}
export default HomePage;