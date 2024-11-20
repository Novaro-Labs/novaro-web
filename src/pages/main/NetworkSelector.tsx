import { Select } from "antd";
import { useAccount, useSwitchChain } from "wagmi";

const { Option } = Select;
const supportChains = ["Linea Sepolia Testnet", "Sepolia"];

const NetworkSelector = () => {
  const { chain, isConnected } = useAccount();
  const { chains, switchChain } = useSwitchChain();

  const defaultChains = chains.filter((chain) =>
    supportChains.includes(chain.name)
  );

  const defaultChainId = chains.find(
    (chain) => chain.name === "Linea Sepolia Testnet"
  )!.id;

  // // 强制切换到 Sepolia
  // useEffect(() => {
  //   const switchToSepolia = async () => {
  //     console.log(chain)
  //     if (isConnected && chain?.id !== defaultChainId) {
  //       try {
  //         await switchChain({ chainId: defaultChainId });
  //       } catch (error) {
  //         console.error("Failed to switch network:", error);
  //       }
  //     }
  //   };

  //   switchToSepolia();
  // }, [isConnected]);

  return (
    <div style={{ position: "relative" }}>
      <Select
        value={chain?.id || ""}
        onChange={(v) => switchChain?.({ chainId: Number(v) })}
        popupMatchSelectWidth={false}
      >
        {defaultChains.map((c) => (
          <Option key={c.id} value={c.id}>
            {c.name}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default NetworkSelector;
