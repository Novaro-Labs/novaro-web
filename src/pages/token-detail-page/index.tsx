import "./index.less";
// import { useEffect, useState } from "react";
import light from "../../assets/svg/light.svg";
import { TabPane, Tabs } from "../../components/Basic/Tabs";
import { NovButtonGroup } from "../../components/Basic/ButtonGroup/NovButtonGroup.tsx";
import TokenEcharts from "./components/token-echats";
import PostList from "../../components/PostList";
import { mockOwnPosts, mockPosts, mockWithCommentsPosts } from "../../mock-data/posts.ts";
import { useEffect, useState } from "react";

const TokenDetailPage = () => {
  const [dollarButtons, setDollarButtons] = useState<any>([])
  const [timeButtons, setTimeButtons] = useState<any>([])
  useEffect(() => {
    const dollarBtns = [{
      label: "USD"
    }, {
      label: "ETH"
    }]
    const timeButtons = ['1h', '4h', '12h', '1d']
    setDollarButtons(dollarBtns);
    setTimeButtons(timeButtons);
  }, [])
  return (
    <div className="py-5 px-6">
      <div className="flex items-center">
        <img src={light} width={24} height={24} className="mr-2" />
        Leo
      </div>
      <div className="flex py-6 min-h-screen">
        <div className="w-4/6 pr-6">
          <div className="bg-white rounded-lg">
            {/* filter */}
            <div className="flex items-center justify-between">
              <NovButtonGroup
                className="w-1/6"
                children={dollarButtons}
              />
              <NovButtonGroup
                className="w-1/4"
                children={timeButtons}
              />
            </div>
            {/* echarts */}
            <TokenEcharts />
          </div>
        </div>
        <div className="w-2/6">
          <div className="bg-white rounded-lg p-4">
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
      </div>
    </div>

  );
};

export default TokenDetailPage;