import NovButton from "../../../../components/Basic/Button/NovButton.tsx";
import { ArrowDownOutlined } from "@ant-design/icons"; // 使用 Ant Design 的箭头图标
import React, { useState } from "react";
import "./index.less"

const TokenExchange = () => {
    // 模拟代币数据
    const OutcomeTokens = [
      { name: "USDT", icon: "https://cryptologos.cc/logos/tether-usdt-logo.svg" },
      { name: "BTC", icon: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg" },
      { name: "ETH", icon: "https://cryptologos.cc/logos/ethereum-eth-logo.svg" },
      { name: "DOGE", icon: "https://cryptologos.cc/logos/dogecoin-doge-logo.svg" },
    ];
    const IncomeTokens = [
        { name: "USDT", icon: "https://cryptologos.cc/logos/tether-usdt-logo.svg" },
        { name: "BTC", icon: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg" },
        { name: "ETH", icon: "https://cryptologos.cc/logos/ethereum-eth-logo.svg" },
        { name: "DOGE", icon: "https://cryptologos.cc/logos/dogecoin-doge-logo.svg" },
        { name: "Share", icon: "https://cryptologos.cc/logos/dogecoin-doge-logo.svg" },
      ];
  
    // 定义动态变量
    const [outcomeAmount, setOutcomeAmount] = useState("123.50");
    const [incomeAmount, setIncomeAmount] = useState("111.50");
    const [outcomeToken, setOutcomeToken] = useState(OutcomeTokens[0]);
    const [incomeToken, setIncomeToken] = useState(IncomeTokens[4]);
    const [outcomeSubText, setOutcomeSubText] = useState("$13.50");
    const [incomeSubText, setIncomeSubText] = useState("$15.50");
  
    return (
      <div className="w-full my-4 p-4 border border-border-color rounded-md">
        {/* Outcome Section */}
        <div className="exchange-section">
          <div className="input-group">
            <div className="input-details">
              <div className="label">Outcome</div>
              <input
                type="text"
                value={outcomeAmount}
                onChange={(e) => setOutcomeAmount(e.target.value)}
                className="amount"
              />
              <div className="subtext">{outcomeSubText}</div>
            </div>
            <div className="currency-container">
              <div className="currency">
                <div className="token-box">
                  <img src={outcomeToken.icon} alt={outcomeToken.name} />
                  <select
                    value={outcomeToken.name}
                    onChange={(e) =>
                      setOutcomeToken(
                        OutcomeTokens.find((token) => token.name === e.target.value) || OutcomeTokens[0]
                      )
                    }
                  >
                    {OutcomeTokens.map((token) => (
                      <option key={token.name} value={token.name}>
                        {token.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div className="arrow-icon">
            <ArrowDownOutlined />
        </div>
  
        {/* Income Section */}
        <div className="exchange-section">
          <div className="input-group">
            <div className="input-details">
              <div className="label">Income</div>
              <input
                type="text"
                value={incomeAmount}
                onChange={(e) => setIncomeAmount(e.target.value)}
                className="amount"
              />
              <div className="subtext">{incomeSubText}</div>
            </div>
            <div className="currency-container">
              <div className="currency">
                <div className="token-box">
                  <img src={incomeToken.icon} alt={incomeToken.name} />
                  <select
                    value={incomeToken.name}
                    onChange={(e) =>
                      setIncomeToken(
                        IncomeTokens.find((token) => token.name === e.target.value) || IncomeTokens[0]
                      )
                    }
                  >
                    {IncomeTokens.map((token) => (
                      <option key={token.name} value={token.name}>
                        {token.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Exchange Button */}
        <div className="w-full mt-2">
             <NovButton width="100%" text="Exchange" />
        </div>
      </div>
    );
  };

  export default TokenExchange;

