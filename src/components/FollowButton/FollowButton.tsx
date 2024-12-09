import { useState } from "react";
import { cn } from "../../utils/utils";

export default function FollowButton({
  size = "md",
  following,
}: {
  size?: "md" | "sm";
  following: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [realtimeFollowing, setRealtimeFollowing] = useState(following);

  const toggleFollow = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setRealtimeFollowing(!realtimeFollowing);
    }, 1000);
  };
  return (
    <div
      className={cn(
        "flex-none btn flex items-center justify-center bg-[#eee] text-[#111] rounded",
        size === "md" ? "h-10 text-sm w-[92px]" : "text-x h-8 w-[64px]",
        realtimeFollowing
          ? "bg-[#999] text-white/60"
          : "bg-[#1E86FF] text-white",
        loading ? " pointer-events-none loading" : "cursor-pointer"
      )}
      onClick={toggleFollow}
    >
      {realtimeFollowing ? "Following" : "Follow"}
    </div>
  );
}
