import React, { useEffect, useState } from "react";
import "./index.less"

interface InputNumberProps {
  initialValue?: number;
  onChange?: (value: number) => void;
}

const InputNumber: React.FC<InputNumberProps> = ({ initialValue = 0, onChange}) => {
  const [value, setValue] = useState<number>(0)

  useEffect(() => {
    if (onChange) {
      onChange(value)
    }
  }, [value, onChange])
  const decrease = () => {
    setValue(prevValue => Math.max(prevValue - 1, 0))
  }
  const increase = () => {
    setValue(prevValue => prevValue + 1)
  }

  return (
    <div className="input-number">
      <div className="input-number-logo" onClick={decrease}>-</div>
      <div className="input-number__wrapper__input">{value}</div>
      <div className="input-number-logo" onClick={increase}>+</div>
    </div>
  )
}

export default InputNumber