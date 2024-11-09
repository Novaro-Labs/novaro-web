import { useState} from "react";
import { useParams } from "react-router-dom";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import NovButton from "../../../../components/Basic/Button/NovButton.tsx";
import NovButtonGroup from "../../../../components/Basic/ButtonGroup/NovButtonGroup.tsx";
import InputNumber from "../../../../components/Basic/inputNumber/InputNumber.tsx";
import "./index.less"
import { POOL_MOCK_CONTRACT_ADDRESS_LOCAL } from "../../../../constants.ts";
import { TokenTradeEnum } from "../../../../mock-data/token.ts";
import FollowerPassTokenContract from "@/abi/tokens/FollowerPassToken.json"
import { ethers } from 'ethers';

type HexString = `0x${string}`;

const TokenTrade = () => {
  const tradeEnums = TokenTradeEnum
  const [title, setTitle] = useState('Buy');
  const [amount, setAmount] = useState(0);

  const FollowerPassTokenAddress: HexString = useParams().followerPassToken as HexString;

  const { writeContractAsync } = useWriteContract();



  // 调用买合约
  const buyAmountContract = async () => {
    try {
      // 验证地址有效性
      if (!ethers.isAddress(POOL_MOCK_CONTRACT_ADDRESS_LOCAL)) {
        throw new Error('Invalid address');
      }
      // 调用buy合约
      await writeContractAsync({
        address: FollowerPassTokenAddress, // 合约地址
        chainId: 1337,
        abi: FollowerPassTokenContract.abi,
        functionName: 'buy',
        args: [ POOL_MOCK_CONTRACT_ADDRESS_LOCAL, ethers.parseEther(String(amount))],
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
      if (!ethers.isAddress(POOL_MOCK_CONTRACT_ADDRESS_LOCAL)) {
        throw new Error('Invalid address');
      }
      // 调用buy合约
      await writeContractAsync({
        address: FollowerPassTokenAddress, // 合约地址
        chainId: 1337,
        abi: FollowerPassTokenContract.abi,
        functionName: 'sell',
        args: [ POOL_MOCK_CONTRACT_ADDRESS_LOCAL, ethers.parseEther(String(amount))],
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