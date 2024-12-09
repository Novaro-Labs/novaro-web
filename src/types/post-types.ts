import { TUser } from "./user-types";

export type TPost = {
  id: number;
  author: TUser;
  content: string;
  timestamp: string;
  like_count?: number;
  reply_count?: number;
  share_count?: number;
  favored?: boolean;
  vote_count?: number;
  comments?: TComment[];
};

export type TComment = TPost & {
  reply_to_post_id: number;
};
