import { useState } from "react";
import { useNavigate } from "react-router-dom"
import "./index.less";
import light from "../../assets/svg/light.svg";
import NovButtonGroup from "../../components/Basic/ButtonGroup/NovButtonGroup";
import TokenEcharts from "./components/token-echats";
import TokenTrade from "./components/token-trade";
import TokenRateTable from "./components/token-rateTable";
import TokenCommunity from "./components/token-community";
import TokenExchange from "./components/token-exchange";
import { TokenDollarEnum, TokenTimeEnum } from "../../mock-data/token";

const TokenDetailPage = () => {
  const history = useNavigate();
  const [dollarButtons, setDollarBut] = useState<any>(TokenDollarEnum)
  const [timeButtons, setTimeButtons] = useState<any>(TokenTimeEnum)

  const returnLastPage = () => {
    history(-1)
  }

  return (
    <div className="py-5 px-6">
      <div className="flex items-center">
        <img src={light} width={24} height={24} className="mr-2 cursor-pointer" onClick={returnLastPage} />
        <span className="title">Token</span>
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
          <div>
            <TokenExchange />
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