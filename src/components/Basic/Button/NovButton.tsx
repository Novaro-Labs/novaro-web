// @ts-ignore
import { Button } from "@web3uikit/core";
import { useState } from "react";


const NovButton = ({
  text,
  width,
  backgroundColor,
  textColor,
  icon,
  onClick = () => {},
}: {
  text?: string;
  width?: string;
  backgroundColor?: string;
  textColor?: string;
  icon?: JSX.Element; // 使用 JSX.Element 类型
  className?: string;
  onClick?: () => void;
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      style={{
        width: width || "87px",
        height: "40px",
        background: backgroundColor || "#436BD1",
        borderRadius: "4px",
        border: 0,
        color: textColor || "#fff",
        fontSize: "16px",
      }}
      loadingText=""
      icon={icon}
      onClick={onClick}
      text={text || ""}
      isLoading={loading} // 控制按钮的加载状态
      disabled={loading} // 当加载时禁用按钮
    />
  );
};
export default NovButton;
