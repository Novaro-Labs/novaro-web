import "./index.less";
// import { useEffect, useState } from "react";
import light from "../../assets/svg/light.svg";
import { TabPane, Tabs } from "../../components/Basic/Tabs";
import NovButtonGroup from "../../components/Basic/ButtonGroup/NovButtonGroup.tsx";
import TokenEcharts from "./components/token-echats";
import TokenTrade from "./components/token-trade";
import TokenRateTable from "./components/token-rateTable";
import TokenCommunity from "./components/token-community";
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
        <div className="w-4/6 pr-6 ml-6">
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
            {/* rate */}
            <div className="my-8">
              <TokenRateTable />
            </div>
          </div>
        </div>
        <div className="w-2/6">
          <div className="bg-white rounded-lg">
            <TokenTrade />
          </div>
          <div className="my-8">
            <TokenCommunity />
          </div>
        </div>
      </div>
    </div>

  );
};

export default TokenDetailPage;