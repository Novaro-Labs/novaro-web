import { Icon } from "@iconify/react";
import { useState } from "react";
import { cn, humanizeNumber } from "../../utils/utils";

export default function PostVoteButton({
  vote_count = 0,
}: {
  vote_count?: number;
}) {
  const [voteCount, setVoteCount] = useState(vote_count);
  return (
    <div className="space-y-3 flex flex-col items-center">
      <button
        className="group rounded-full flex items-center justify-center border border-[#111] size-10 group-hover:border-blue-400 hover:bg-blue-400"
        onClick={() => setVoteCount(voteCount + 1)}
      >
        <Icon
          icon="icon-park-solid:up-one"
          className="text-[#333] group-hover:text-white"
        />
      </button>
      <div className="text-lg">{humanizeNumber(voteCount)}</div>
      <button
        className={cn(
          "group rounded-full flex items-center justify-center border size-10 ",
          voteCount <= 0
            ? "text-[#999] border-[#999]"
            : "group-hover:border-blue-400 hover:bg-blue-400"
        )}
        onClick={() => setVoteCount(voteCount - 1)}
        disabled={voteCount <= 0}
      >
        <Icon
          icon="icon-park-solid:down-one"
          className={cn(
            voteCount <= 0
              ? "text-[#999]"
              : "text-[#333]  group-hover:text-white"
          )}
        />
      </button>
    </div>
  );
}
