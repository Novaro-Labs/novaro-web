import React, { ReactNode, useState } from "react";
// @ts-ignore
import { Button } from "@web3uikit/core";
import "./index.less"

type NovButtonItems = {
  label: string;
}

type NovButtonGroupProps = {
  children: NovButtonItems
  className?: string;
}

export const NovButtonGroup = (props : NovButtonGroupProps) => {
  const [flag, setFlag] = useState<number>(0)
  const [activeBtn, setActiveBtn] = useState<number>(0)

  const changeBtn = (index: number) => {
    setActiveBtn(index)
  }
  return (
    <div className={["btn-group", props.className].join(' ')}>
      {props.children.map((item: NovButtonItems, index: number) => (
        <Button
          className={["btn-item",
            index === activeBtn ? "btn-item-active" : "btn-item-normal"
          ].join(' ')}
          text={item?.label || item }
          onClick={() => changeBtn(index)}
        />
      ))}
    </div>
  )
}