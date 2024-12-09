import { Icon } from "@iconify/react";
import likeLottie from "../../assets/lottie/like-data.json";
import Lottie from "lottie-react";
import { useState } from "react";
import { humanizeNumber } from "../../utils/utils";

export default function PostLikeButton({
  favor_total,
  favored,
  onLike,
  onCancelLike,
}: {
  favor_total: number;
  favored: boolean;
  onLike: () => void;
  onCancelLike: () => void;
}) {
  const [isLottie, setIsLottie] = useState(false);

  const toggleLike = (type: "cancel" | "like") => {
    if (type === "cancel") {
      setIsLottie(false);
      onCancelLike();
    } else if (type === "like") {
      setIsLottie(true);
      onLike();
    }
  };

  return (
    <div className="flex  items-center justify-center ">
      {favored ? (
        isLottie ? (
          <Lottie
            animationData={likeLottie}
            loop={false}
            aria-labelledby="use lottie animation"
            className=" h-[28px] w-[28px] cursor-pointer"
            onClick={() => toggleLike("cancel")}
          />
        ) : (
          <div className="flex h-[28px] w-[28px] items-center justify-center">
            <Icon
              icon="ph:heart-fill"
              className="cursor-pointer"
              fontSize={14}
              color="red"
              onClick={() => toggleLike("cancel")}
            />
          </div>
        )
      ) : (
        <div className="flex h-[28px] w-[28px] items-center justify-center">
          <Icon
            icon="mdi-light:heart"
            className="cursor-pointer"
            fontSize={14}
            color="#333"
            onClick={() => toggleLike("like")}
          />
        </div>
      )}
      <div>
        <span className="mr-1 inline-block min-w-[10px]">{humanizeNumber(favor_total)}</span>
        Likes
      </div>
    </div>
  );
}
