import React, { ReactNode, useState } from "react";
// @ts-ignore
import { Button } from "@web3uikit/core";
import "./index.less"

type NovButtonItems = {
  label?: string | undefined;
}

type NovButtonGroupProps = {
  children: (NovButtonItems | string)[]
  className?: string;
  onActiveChange?: (activeLabel: string) => void;
}

const NovButtonGroup = (props : NovButtonGroupProps) => {
  const [flag, setFlag] = useState<number>(0)
  const [activeBtn, setActiveBtn] = useState<number>(0)

  const changeBtn = (index: number) => {
    setActiveBtn(index)
    // 传递选中标签
    const activeLabel = typeof props.children[index] === 'string' ? props.children[index] : (props.children[index] as NovButtonItems)?.label;
    if (props.onActiveChange && activeLabel) {
      props.onActiveChange(activeLabel);
    }
  }
  return (
    <div className={["btn-group", props.className].join(' ')}>
      {(props?.children ?? []).map((item: any, index: number) => (
        <Button
          key={index} // 添加key属性
          //@ts-ignore
          className={["btn-item",
            index === activeBtn ? "btn-item-active" : "btn-item-normal"
          ].join(' ')}
          text={typeof item === 'string' ? item : item?.label}
          onClick={() => changeBtn(index)}
        />
      ))}
    </div>
  )
}

export default NovButtonGroup