// @ts-ignore
import { Avatar } from "@web3uikit/core";
import { TUser } from "../../types/user-types.ts";
import FollowButton from "../FollowButton/FollowButton.tsx";

export default function SuggestFollowUserCard({ user }: { user: TUser }) {
  return (
    <div className="flex justify-between items-center w-[360px] h-[108px] px-3 bg-white  rounded-lg">
      <div className="flex items-center gap-2">
        <Avatar isRounded size={48} theme="image" image={user.avatar ?? ''} />
        <div className="space-y-2">
          <div className="font-bold">{user.nickname}</div>
          <div className="text-[#BFBFCA] text-sm">@{user.username}</div>
        </div>
      </div>
      <FollowButton following={user.followed} />
    </div>
  );
}
