import { useState } from "react";
import "./index.less";
import SpaceHeader from "./SpaceHeader";
import SpaceMintChart from "./SpaceMintChart";
import SpaceMintHistoryTable from "./SpaceMintHistoryTable";
import SpaceMintPanel from "./SpaceMintPanel";
import SpaceProfile from "./SpaceProfile";
import SpaceWallet from "./SpaceWallet";

const SpacePage = () => {
  const [mintScore, setMntScore] = useState(237);
  return (
    <div className="space-container">
      <div className="space-content space-y-10 pt-8">
        <SpaceHeader />
        <SpaceMintPanel
          score={mintScore}
          onMintScoreChange={(score) => setMntScore(score)}
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
