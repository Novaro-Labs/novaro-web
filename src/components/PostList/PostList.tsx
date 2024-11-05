import { TPost } from "../../types/post-types";
import PostItem from "./PostItem";

function PostList({posts}: {posts: TPost[]}) {
  return (
    <div className="bg-white pt-8 space-y-10 w-full">
      {posts.map((post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </div>
  );
}

export default PostList;
