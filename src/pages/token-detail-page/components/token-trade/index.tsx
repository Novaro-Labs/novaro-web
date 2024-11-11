import FollowerPassTokenContract from "@/abi/tokens/FollowerPassToken.json";
import { config } from "@/wagmi.ts";
import { readContract } from "@wagmi/core";
import { ethers } from 'ethers';
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAccount, useWriteContract } from "wagmi";
import NovButton from "../../../../components/Basic/Button/NovButton.tsx";
import NovButtonGroup from "../../../../components/Basic/ButtonGroup/NovButtonGroup.tsx";
import InputNumber from "../../../../components/Basic/inputNumber/InputNumber.tsx";
import { TokenTradeEnum } from "../../../../mock-data/token.ts";
import "./index.less";

const LIQUIDITY_POOL_CONTRACT_ADDRESS = import.meta.env.VITE_LIQUIDITY_POOL_CONTRACT_ADDRESS;
const CHAIN_ID = parseInt(import.meta.env.VITE_CHAIN_ID);

type HexString = `0x${string}`;

const TokenTrade = () => {
  const tradeEnums = TokenTradeEnum
  const [title, setTitle] = useState('Buy');
  const [amount, setAmount] = useState(0);
  const { address, addresses } = useAccount();

  const FollowerPassTokenAddress: HexString = useParams().followerPassToken as HexString;

  const { writeContractAsync } = useWriteContract();



  // 调用买合约
  const buyAmountContract = async () => {
    try {
      // 验证地址有效性
      if (!ethers.isAddress(LIQUIDITY_POOL_CONTRACT_ADDRESS)) {
        throw new Error('Invalid address');
      }
      console.log('amount', ethers.parseEther(String(amount)))
      // 调用buy合约
      await writeContractAsync({
        address: FollowerPassTokenAddress, // 合约地址
        chainId: CHAIN_ID,
        abi: FollowerPassTokenContract.abi,
        functionName: 'buy',
        args: [ LIQUIDITY_POOL_CONTRACT_ADDRESS, ethers.parseEther(String(amount))],
        value: ethers.parseEther(String(1))
      })
      console.log('Token purchase successful');
    } catch (error) {
      console.error('Error buying token:', error);
    }
  }

  // 调用sell contract
  const sellAmountContract = async () => {
    try {
      // 验证地址有效性
      if (!ethers.isAddress(LIQUIDITY_POOL_CONTRACT_ADDRESS)) {
        throw new Error('Invalid address');
      }
      let sellerBalance = (await readContract(config as any, {
        address: FollowerPassTokenAddress,
        chainId: CHAIN_ID,
        abi: FollowerPassTokenContract.abi,
        functionName: "balanceOf",
        args: [address],
      })) as string;
      console.log('seller balance', sellerBalance)

      // 调用buy合约
      await writeContractAsync({
        address: FollowerPassTokenAddress, // 合约地址
        chainId: CHAIN_ID,
        abi: FollowerPassTokenContract.abi,
        functionName: 'sell',
        args: [ LIQUIDITY_POOL_CONTRACT_ADDRESS, parseInt(String(amount))],
      })


      console.log('Token sell successful');
    } catch (error) {
      console.error('Error sell token:', error);
    }
  }

  const handleInputChange = (value: number) => {
    setAmount(value);
  }

  const handleActiveChange = (activeLabel: string) => {
    setTitle(activeLabel);
  }

  return (
    <div className="w-full token-trade">
      <NovButtonGroup children={tradeEnums} onActiveChange={handleActiveChange} />
      <div className="w-full my-4 p-4 border border-border-color rounded-md">
        <div className="head">
          <div className="title">{ title }</div>
          <div className="introduce">available balance:$0（0ETH）</div>
        </div>
        <div className="amount">
          <div className="amount_title">Amount</div>
          <InputNumber initialValue={0} onChange={handleInputChange}/>
          <div className="amount_total mb-2">
            <div>Total Cost</div>
            <div>0.001ETH($12.50)</div>
          </div>
        </div>
        <div className="trade_button mt-2">
          <NovButton width="100%" text="Trade" onClick={ title === 'Buy' ? buyAmountContract : sellAmountContract}/>
        </div>
      </div>
    </div>
  )
}

export default TokenTrade;