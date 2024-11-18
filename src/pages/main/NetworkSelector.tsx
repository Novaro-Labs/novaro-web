import { Select } from "antd";
import { useEffect } from "react";
import { sepolia } from "viem/chains";
import { useAccount, useSwitchChain } from "wagmi";

const { Option } = Select;

const NetworkSelector = () => {
  const { chain, isConnected } = useAccount();
  const { chains, switchChain } = useSwitchChain();

  // 强制切换到 Sepolia
  useEffect(() => {
    const switchToSepolia = async () => {
      if (isConnected && chain?.id !== sepolia.id) {
        try {
          await switchChain({ chainId: sepolia.id });
        } catch (error) {
          console.error("Failed to switch network:", error);
        }
      }
    };

    switchToSepolia();
  }, [isConnected]);

  return (
    <div style={{ position: "relative" }}>
      <Select
        value={chain?.id || ""}
        onChange={(v) => switchChain?.({ chainId: Number(v) })}
        popupMatchSelectWidth={false}
      >
        {chains.map((c) => (
          <Option key={c.id} value={c.id}>
            {c.name}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default NetworkSelector;
