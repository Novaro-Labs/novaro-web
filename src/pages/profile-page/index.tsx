import "./index.less";
import light from "../../assets/svg/light.svg";
import more from "../../assets/svg/more.svg";
import NovButton from "../../components/Basic/Button/NovButton.tsx";
import { Avatar } from "@web3uikit/core";
import { TabPane, Tabs } from "../../components/Basic/Tabs";
import empty from "../../assets/img/empty.png";
import FollowList from "../../components/FollowList";

const ProfilePage = () => {
  return (
    <div className="profile-container">
      <div className="profile-left">
        <div className="top">
          <div className="top-left">
            <img src={light} width={24} height={24} />
            Leo
          </div>
          <NovButton text="Cast" width="74px" />
        </div>
        {/*TODO 字体导入*/}
        <div className="user">
          <div className="user-info">
            <div className="avatar-username">
              <Avatar isRounded size={48} theme="image" />
              <div className="user-text">
                <div className="username">Leo</div>
                <div className="user-id">@leo0909</div>
              </div>
            </div>
            <div className="user-operate">
              <NovButton
                text="Edit Profile"
                backgroundColor="#E2E6EF"
                textColor="#000000"
                width="120px"
              />
              <div className="more-btn">
                <NovButton
                  icon={<img src={more} width={24} height={24} />}
                  backgroundColor="#E2E6EF"
                  textColor="#000000"
                  width="40px"
                />
              </div>
            </div>
          </div>
          <div className="follow-status">
            <div className="follow-item">
              <div className="num">240</div>
              <div className="text">Following</div>
            </div>
            <div className="follow-item">
              <div className="num">1200</div>
              <div className="text">Follower</div>
            </div>
          </div>
          <Tabs>
            <TabPane label="Casted">
              <div className="empty">
                <img src={empty} />
                <div>leo has not cast yet</div>
              </div>
            </TabPane>
            <TabPane label="Casted+Replies">
              <h2>Your Profile</h2>
            </TabPane>
            <TabPane label="Likes">
              <h2>Likes</h2>
            </TabPane>
            <TabPane label="Channels">
              <h2>Channels</h2>
            </TabPane>
          </Tabs>
        </div>
      </div>
      <div className="profile-right">
        <div className="profile-right-title">Suggested Follows</div>
        <FollowList />
      </div>
    </div>
  );
};
export default ProfilePage;
