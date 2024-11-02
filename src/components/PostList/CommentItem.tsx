import { mockCurrentUser } from "../../mock-data/users";
import { TComment } from "../../types/post-types";
//@ts-ignore
import { Avatar } from "@web3uikit/core";
import FollowButton from "../FollowButton";

export default function CommentItem({ comment }: { comment: TComment }) {
  return (
    <div key={comment.id} className="space-y-6 w-full">
      <div className="flex items-center justify-between">
        <div className="flex-none flex  items-center space-x-3">
          <Avatar
            isRounded
            size={48}
            theme="image"
            image={comment.author.avatar ?? ""}
          />
          <div>
            <div className="text-gray-500 text-sm ml-2">
              {comment.author.username}
            </div>
            <div className="text-gray-500 text-sm ml-2">
              {comment.timestamp}
            </div>
          </div>
        </div>

        {comment.author.username !== mockCurrentUser.username ? (
          <FollowButton following={comment.author.followed} />
        ) : null}
      </div>
      <p className="mt-2 text-gray-900">{comment.content}</p>
    </div>
  );
}
