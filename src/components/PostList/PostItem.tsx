import { TPost } from "../../types/post-types";
import { Icon } from "@iconify/react";
import { humanizeNumber } from "../../utils/utils";
// @ts-ignore
import { Avatar } from "@web3uikit/core";
import FollowButton from "../FollowButton";
import { useState } from "react";
import PostLikeButton from "./PostLikeButton";
import { mockCurrentUser } from "../../mock-data/users";
import PostVoteButton from "./PostVoteButton";
import CommentItem from "./CommentItem";

export default function PostItem({ post }: { post: TPost }) {
  const [likeCount, setLikeCount] = useState(post.like_count || 0);
  const [favored, setFavored] = useState(post.favored || false);

  return (
    <div className="flex space-x-5">
      <div className="flex-none">
        <PostVoteButton vote_count={post.vote_count} />
      </div>
      <div key={post.id} className="space-y-4 w-full">
        <div className="flex items-center justify-between">
          <div className="flex-none flex  items-center space-x-3">
            <Avatar
              isRounded
              size={48}
              theme="image"
              image={post.author.avatar || ""}
            />
            <div className="space-y-1.5">
              <div className="text-gray-500 ml-2 font-bold">
                {post.author.nickname||post.author.username}
              </div>
              <div className="text-gray-500 text-sm ml-2">{post.timestamp}</div>
            </div>
          </div>

          {post.author.username !== mockCurrentUser.username ? (
            <FollowButton following={post.author.followed} />
          ) : null}
        </div>
        <p className="mt-2 text-gray-900">{post.content}</p>
        <div className="flex items-center space-x-4 mt-4 text-gray-500 text-xs">
          <button className="flex items-center space-x-1">
            <Icon icon="mdi:comment-outline" className="size-4" />
            <span>{humanizeNumber(post.reply_count || 0)}</span>
          </button>
          <button className="flex items-center space-x-1">
            <Icon
              icon="material-symbols-light:share-outline"
              className="size-4"
            />
            <span>{humanizeNumber(post.share_count || 0)}</span>
          </button>
          <PostLikeButton
            favor_total={likeCount}
            favored={favored}
            onLike={() => {
              setFavored(true);
              setLikeCount(likeCount + 1);
            }}
            onCancelLike={() => {
              setFavored(false);
              setLikeCount(likeCount - 1);
            }}
          />
        </div>
        {post.comments && post.comments.length > 0 ? (
          <div className="pt-2 space-y-4 pl-6">
            {post.comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
