// @ts-ignore
import { Input } from "@web3uikit/core";
// @ts-ignore
import { Search } from "@web3uikit/icons";
import PostInput from "./PostInput";
import SuggestFollowUsers from "../../components/SuggestFollowUsers";
import PostList from "../../components/PostList";
import "./index.less";
import { mockCurrentUser, mockSuggestFollowUsers } from "../../mock-data/users";
import { mockPosts } from "../../mock-data/posts";
import { useState } from "react";
import { TPost } from "../../types/post-types";

const HomePage = () => {
  const [realtimePosts, setRealtimePosts] = useState<TPost[]>(mockPosts);

  const submitPost = (content: string) => {
    const newPost: TPost = {
      id: Math.floor(Math.random() * 1000),
      content,
      timestamp: new Date().toISOString(),
      author: mockCurrentUser,
      favored: false,
      like_count: 0,
      reply_count: 0,
      share_count: 0,
    };
    setRealtimePosts([newPost, ...realtimePosts]);
  };

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
            prefixIcon={<Search style={{ color: "#A2A5B1" }} />}
            name="Test text Input"
            onBlur={function noRefCheck() {}}
            onChange={function noRefCheck() {}}
          />
        </div>
        <div className="mb-10">
          <PostInput onPost={submitPost} />
        </div>
        <PostList posts={realtimePosts} />
      </div>
      <div className="home-right">
        <SuggestFollowUsers users={mockSuggestFollowUsers} />
      </div>
    </div>
  );
};
export default HomePage;
