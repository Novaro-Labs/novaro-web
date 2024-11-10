import MintPanelStarHalo from "@/assets/space-page/space-mint-star-halo.png";
import MintPanelStarPoint from "@/assets/space-page/space-mint-star-point.png";
import MintPanelStar from "@/assets/space-page/space-mint-star.png";
import { useState } from "react";
import { animated, useSpring } from "react-spring";

export default function SpaceMintPoints({
  onMint,
  score,
}: {
  score: number;
  onMint: (score: number) => void;
}) {
  const [isAnimating, setIsAnimating] = useState(false);

  const element1Spring = useSpring({
    from: { left: "300px", top: "60px" },
    to: async (next) => {
      if (!isAnimating) return;
      await next({ left: "450px", top: "160px" });
    },
    config: { duration: 500 + Math.random() * 1500 },
  });

  const element2Spring = useSpring({
    from: { left: "400px", top: "20px" },
    to: async (next) => {
      if (!isAnimating) return;
      await next({ left: "450px", top: "160px" });
    },
    config: { duration: 500 + Math.random() * 1500 },
  });

  const element3Spring = useSpring({
    from: { left: "500px", top: "20px" },
    to: async (next) => {
      if (!isAnimating) return;
      await next({ left: "450px", top: "160px" });
    },
    config: { duration: 500 + Math.random() * 1500 },
  });

  const element4Spring = useSpring({
    from: { left: "600px", top: "60px" },
    to: async (next) => {
      if (!isAnimating) return;
      await next({ left: "450px", top: "160px" });
    },
    config: { duration: 500 + Math.random() * 1500 },
  });

  const startAnimation = () => {
    setIsAnimating(true);
    onMint(score + 4);
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
      <button className="active-btn" onClick={startAnimation}></button>
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
