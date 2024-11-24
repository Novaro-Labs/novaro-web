import MintPanelStarHalo from "@/assets/space-page/space-mint-star-halo.png";
import MintPanelStarPoint from "@/assets/space-page/space-mint-star-point.png";
import MintPanelStar from "@/assets/space-page/space-mint-star.png";
import { Button } from "antd";
import { useState } from "react";
import { animated, useSpring } from "react-spring";

export default function SpaceMintPoints({
  onMint,
  score,
}: {
  score: number;
  onMint: (score: number) => Promise<boolean>;
}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [loading, setLoading] = useState(false);

  const element1Spring = useSpring({
    from: { left: "30%", top: "60px" },
    to: async (next) => {
      if (!isAnimating) return;
      await next({ left: "50%", top: "160px" });
    },
    config: { duration: 500 + Math.random() * 1000 },
  });

  const element2Spring = useSpring({
    from: { left: "42%", top: "40px" },
    to: async (next) => {
      if (!isAnimating) return;
      await next({ left: "50%", top: "160px" });
    },
    config: { duration: 500 + Math.random() * 1000 },
  });

  const element3Spring = useSpring({
    from: { left: "54%", top: "10px" },
    to: async (next) => {
      if (!isAnimating) return;
      await next({ left: "50%", top: "160px" });
    },
    config: { duration: 500 + Math.random() * 900 },
  });

  const element4Spring = useSpring({
    from: { left: "64%", top: "60px" },
    to: async (next) => {
      if (!isAnimating) return;
      await next({ left: "50%", top: "160px" });
    },
    config: { duration: 500 + Math.random() * 1000 },
  });

  const startAnimation = async () => {
    setLoading(true);
    const result = await onMint(score + 4);
    if (result) {
      setIsAnimating(true);
    }
    setLoading(false);
  };

  return (
    <div>
      <img
        src={MintPanelStarHalo}
        className="absolute z-[2]  w-[466px] h-[128px] left-1/2 bottom-[140px] -translate-x-1/2"
      />
      <img
        src={MintPanelStar}
        className="absolute z-[1] w-[304px] h-[304px] left-1/2 bottom-10 -translate-x-1/2"
      />
      <Button
        className="active-btn"
        loading={loading}
        onClick={startAnimation}
      ></Button>
      <animated.div className="space-y-2 absolute" style={element1Spring}>
        <div className="text-[#FFCE42] text-sm">
          {300 + Math.floor(Math.random() * 300)}
        </div>
        <img src={MintPanelStarPoint} className="size-[50px]" />
      </animated.div>
      <animated.div className="space-y-2 absolute" style={element2Spring}>
        <div className="text-[#FFCE42] text-sm">
          {300 + Math.floor(Math.random() * 300)}
        </div>
        <img src={MintPanelStarPoint} className="size-[50px]" />
      </animated.div>
      <animated.div className="space-y-2 absolute" style={element3Spring}>
        <div className="text-[#FFCE42] text-sm">
          {300 + Math.floor(Math.random() * 300)}
        </div>
        <img src={MintPanelStarPoint} className="size-[50px]" />
      </animated.div>
      <animated.div className="space-y-2 absolute" style={element4Spring}>
        <div className="text-[#FFCE42] text-sm">
          {300 + Math.floor(Math.random() * 300)}
        </div>
        <img src={MintPanelStarPoint} className="size-[50px]" />
      </animated.div>
    </div>
  );
}
