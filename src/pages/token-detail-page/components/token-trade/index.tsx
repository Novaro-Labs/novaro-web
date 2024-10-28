import { useEffect, useState} from "react";
import NovButton from "../../../../components/Basic/Button/NovButton.tsx";
import NovButtonGroup from "../../../../components/Basic/ButtonGroup/NovButtonGroup.tsx";
import InputNumber from "../../../../components/Basic/inputNumber/InputNumber.tsx";
import "./index.less"

const TokenTrade = () => {
  const children = ['Buy', 'Sell'];
  const [amount, setAmount] = useState(0);

  const handleInputChange = (value: number) => {
    setAmount(value);
  }

  return (
    <div className="w-full token-trade">
      <NovButtonGroup children={children}/>
      <div className="w-full my-4 p-4 border border-border-color rounded-md">
        <div className="head">
          <div className="title">Buy</div>
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
          <NovButton width="100%" text="Trade" />
        </div>
      </div>
    </div>
  )
}

export default TokenTrade;