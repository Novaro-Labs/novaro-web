import levelIconUrl from "@/assets/space-page/level-icon.png";
import rockIconUrl from "@/assets/space-page/rock-icon.png";
import MintPanelBg from "@/assets/space-page/space-mint-panel-bg.png";
import Progress from "@/components/Progress";
import SpaceMintPoints from "./SpaceMintPoints";

const CUR_LEVEL_TARGET = 300;

export default function SpaceMintPanel({
  score,
  onMintScoreChange,
}: {
  score: number;
  onMintScoreChange: (score: number) => Promise<boolean>;
}) {
  return (
    <div className="nft relative">
      <div className="absolute inset-0">
        <img
          src={MintPanelBg}
          className="object-cover h-full w-full object-center "
        />
      </div>

      <div className="relative z-10 h-full w-full py-10 px-8">
        <Progress ratio={score / CUR_LEVEL_TARGET} />
        <div className="grade mt-6">
          <img className="level-icon" src={levelIconUrl} />
          <div className="level-text">Level 1</div>
          <div className="gap-line" />
          <img className="rock-icon" src={rockIconUrl} />
          <div className="level-text">Rock 18,000</div>
        </div>
        <SpaceMintPoints score={score} onMint={onMintScoreChange} />
      </div>
    </div>
  );
}
