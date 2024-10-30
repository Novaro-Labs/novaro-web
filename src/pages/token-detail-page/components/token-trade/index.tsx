import { useState} from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import NovButton from "../../../../components/Basic/Button/NovButton.tsx";
import NovButtonGroup from "../../../../components/Basic/ButtonGroup/NovButtonGroup.tsx";
import InputNumber from "../../../../components/Basic/inputNumber/InputNumber.tsx";
import "./index.less"
import { CLIENT_CONTRACT_ADDRESS_LOCAL } from "../../../../constants.ts";
import { TokenTradeEnum } from "../../../../mock-data/token.ts";
import clientContract from "../../../../abi/client/NovaroClient.json";
import { ethers } from 'ethers';

const TokenTrade = () => {
  const tradeEnums = TokenTradeEnum
  const [title, setTitle] = useState('Buy');
  const [amount, setAmount] = useState(0);

  // 创建账户
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();

  // 调用买合约
  const buyAmountContract = async () => {
    // 调用buy合约
    await writeContractAsync({
      address: CLIENT_CONTRACT_ADDRESS_LOCAL, // 合约地址
      chainId: 1337,
      abi: clientContract.abi,
      functionName: 'buy',
      args: [address, ethers.parseEther(String(amount))],
    })
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
          <NovButton width="100%" text="Trade" onClick={buyAmountContract}/>
        </div>
      </div>
    </div>
  )
}

export default TokenTrade;