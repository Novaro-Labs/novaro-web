import { getContractAddress } from "@/utils/contract";
import { message } from "antd";
import { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import clientContract from "../../abi/client/NovaroClient.json";
import SpaceHeader from "./SpaceHeader";
import SpaceMintChart from "./SpaceMintChart";
import SpaceMintHistoryTable from "./SpaceMintHistoryTable";
import SpaceMintPanel from "./SpaceMintPanel";
import SpaceProfile from "./SpaceProfile";
import SpaceWallet from "./SpaceWallet";
import "./index.less";

const SpacePage = () => {
  const [mintScore, setMntScore] = useState(237);
  const { writeContractAsync } = useWriteContract();
  const { chain } = useAccount();

  const CLIENT_CONTRACT_ADDRESS = getContractAddress(chain?.name || "")
    .NovaroClient as `0x${string}`;

  const handleActivate = async (score) => {
    if (!chain) {
      return false;
    }
    try {
      // 调用buy合约
      await writeContractAsync({
        address: CLIENT_CONTRACT_ADDRESS,
        chainId: chain.id,
        abi: clientContract.abi,
        functionName: "offChainFeed",
      });
      setMntScore(score);
      message.success("Mint score activated");
      return true;
    } catch (error) {
      console.error("Error activating mint score:", error);
      message.error("Mint score activation failed");
      return false;
    }
  };
  return (
    <div className="space-container">
      <div className="space-content space-y-10 pt-8">
        <SpaceHeader />
        <SpaceMintPanel
          score={mintScore}
          onMintScoreChange={(score) => handleActivate(score)}
        />
        <SpaceMintChart score={mintScore} />
        <SpaceMintHistoryTable />
      </div>
      <div className="px-8 border-l border-[#ededed]">
        <SpaceProfile />
        <SpaceWallet />
      </div>
    </div>
  );
};
export default SpacePage;
