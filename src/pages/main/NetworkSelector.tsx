import { Select } from "antd";
import { useAccount, useSwitchChain } from "wagmi";

const { Option } = Select;

const NetworkSelector = () => {
  const { chain } = useAccount();
  const { chains, switchChain } = useSwitchChain();

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
