import FollowerPassTokenContract from "@/abi/tokens/FollowerPassToken.json";
import { getContractAddress } from "@/utils/contract.ts";
import { Button, message } from "antd";
import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAccount, useBalance, useWriteContract } from "wagmi";
import NovButtonGroup from "../../../../components/Basic/ButtonGroup/NovButtonGroup.tsx";
import InputNumber from "../../../../components/Basic/inputNumber/InputNumber.tsx";
import { TokenTradeEnum } from "../../../../mock-data/token.ts";
import "./index.less";

const MOCK_PRICE = 0.0001;

const calTotalCostInWei = (amount: number) => {
  return BigNumber(ethers.parseEther(MOCK_PRICE.toString()).toString())
    .multipliedBy(amount)
    .toFixed(0);
};

type HexString = `0x${string}`;

const TokenTrade = () => {
  const tradeEnums = TokenTradeEnum;
  const [title, setTitle] = useState("Buy");
  const [amount, setAmount] = useState(0);
  const [tradeButtonLoading, setTradeButtonLoading] = useState(false);

  const { address, chain } = useAccount();
  const { data: balanceData } = useBalance({
    address,
  });

  const FollowerPassTokenAddress: HexString = useParams()
    .followerPassToken as HexString;

  const { writeContractAsync } = useWriteContract();

  // 调用买合约
  const buyAmountContract = async () => {
    setTradeButtonLoading(true);
    try {
      const valueInWei = calTotalCostInWei(amount);

      if (!chain) {
        message.error("Please connect wallet first");
        setTradeButtonLoading(false);
        return;
      }

      if ((balanceData?.value || 0) < BigInt(valueInWei)) {
        message.error("Insufficient balance");
        setTradeButtonLoading(false);
        return;
      }
      const LIQUIDITY_POOL_CONTRACT_ADDRESS = getContractAddress(chain?.name).LiquidityPool as `0x${string}`;

      // 调用buy合约
      await writeContractAsync({
        address: FollowerPassTokenAddress, // 合约地址
        chainId: chain.id,
        abi: FollowerPassTokenContract.abi,
        functionName: "buy",
        args: [LIQUIDITY_POOL_CONTRACT_ADDRESS, BigInt(valueInWei)],
        value: BigInt(valueInWei),
      });
      setAmount(0);
      message.success("Token purchase successful");
      setTradeButtonLoading(false);
    } catch (error) {
      setTradeButtonLoading(false);
      console.error("Error buying token:", error);
    }
  };

  // 调用sell contract
  const sellAmountContract = async () => {
    setTradeButtonLoading(true);

    try {
      const valueInWei = calTotalCostInWei(amount);

      if (!chain) {
        message.error("Please connect wallet first");
        setTradeButtonLoading(false);
        return;
      }

      const LIQUIDITY_POOL_CONTRACT_ADDRESS = getContractAddress(chain?.name).LiquidityPool as `0x${string}`;

      // 调用buy合约
      await writeContractAsync({
        address: FollowerPassTokenAddress, // 合约地址
        chainId: chain.id,
        abi: FollowerPassTokenContract.abi,
        functionName: "sell",
        args: [LIQUIDITY_POOL_CONTRACT_ADDRESS, BigInt(valueInWei)],
      });
      setTradeButtonLoading(false);
      setAmount(0);
      message.success("Token sell successful");
    } catch (error) {
      setTradeButtonLoading(false);
      message.error("Error selling token");
      console.log({ error });
    }
  };

  const handleInputChange = (value: number) => {
    setAmount(value);
  };

  const handleActiveChange = (activeLabel: string) => {
    setTitle(activeLabel);
  };

  return (
    <div className="w-full token-trade">
      <NovButtonGroup
        children={tradeEnums}
        onActiveChange={handleActiveChange}
      />
      <div className="w-full my-4 p-4 border border-border-color rounded-md">
        <div className="head">
          <div className="title">{title}</div>
          <div className="introduce">available balance:$0（0ETH）</div>
        </div>
        <div className="amount">
          <div className="amount_title">Amount</div>
          <InputNumber initialValue={0} onChange={handleInputChange} />
          <div className="amount_total mb-2">
            <div>Total Cost</div>
            <div>{ethers.formatEther(calTotalCostInWei(amount))} ETH</div>
          </div>
        </div>
        <div className="trade_button mt-2 px-4">
          <Button
            type="primary"
            className="w-full mt-4"
            onClick={title === "Buy" ? buyAmountContract : sellAmountContract}
            disabled={amount === 0}
            loading={tradeButtonLoading}
          >
            Trade
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TokenTrade;
