import "./index.less";
import light from "../../assets/svg/light.svg";
import more from "../../assets/svg/more.svg";
import NovButton from "../../components/Basic/Button/NovButton.tsx";
// @ts-ignore
import { Avatar } from "@web3uikit/core";
import { TabPane, Tabs } from "../../components/Basic/Tabs";
import SuggestFollowUsers from "../../components/SuggestFollowUsers";
import PostList from "../../components/PostList/index.tsx";
import { mockOwnPosts, mockPosts, mockWithCommentsPosts } from "../../mock-data/posts.ts";
import { mockSuggestFollowUsers } from "../../mock-data/users.ts";

const ProfilePage = () => {
  return (
    <div className="flex py-6 px-8 min-h-screen">
      <div className="w-3/4 pr-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <img src={light} width={24} height={24} className="mr-2" />
            Leo
          </div>
          <NovButton text="Cast" width="74px" />
        </div>
        <div className="bg-white rounded-lg p-4">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Avatar isRounded size={48} theme="image" />
              <div className="ml-3">
                <div className="font-bold">Leo</div>
                <div className="text-gray-500">@leo0909</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <NovButton
                text="Edit Profile"
                backgroundColor="#E2E6EF"
                textColor="#000000"
                width="120px"
                className="mr-2"
              />
              <div>
                <NovButton
                  icon={<img src={more} width={24} height={24} />}
                  backgroundColor="#E2E6EF"
                  textColor="#000000"
                  width="40px"
                />
              </div>
            </div>
          </div>
          <div className="flex mb-8 gap-4">
            <div className="flex items-center gap-1">
              <div className="font-bold  text-lg">240</div>
              <div className="text-gray-500 text-sm">Following</div>
            </div>
            <div className="flex items-center gap-1">
              <div className="font-bold  text-lg">1200</div>
              <div className="text-gray-500 text-sm">Follower</div>
            </div>
          </div>
          <Tabs>
            <TabPane label="Posts">
              <div className="flex flex-col items-center justify-center">
                <PostList posts={mockOwnPosts} />
              </div>
            </TabPane>
            <TabPane label="Replies">
              <PostList posts={mockWithCommentsPosts} />
            </TabPane>
            <TabPane label="Likes">
              <PostList
                posts={[...mockOwnPosts, ...mockPosts].filter(
                  (post) => post.favored
                )}
              />
            </TabPane>
          </Tabs>
        </div>
      </div>
      <div className="w-1/4">
        <SuggestFollowUsers users={mockSuggestFollowUsers} />
      </div>
    </div>
  );
};
export default ProfilePage;
