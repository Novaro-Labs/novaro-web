import SuggestFollowUserCard from "./SuggestFollowUserCard.tsx";
import { TUser } from "../../types/user-types.ts";
import { useState } from "react";

const SHOW_COUNT = 5;

export default function SuggestFollowUsers({ users }: { users: TUser[] }) {
  const [showMore, setShowMore] = useState(false);
  const showUsers = showMore ? users : users.slice(0, SHOW_COUNT);
  return (
    <div className="space-y-4 pl-4">
      <div className="text-xl mb-6 text-[#202226]">Suggested Follows</div>
      <div className="flex flex-col items-center space-y-4 p-4 rounded bg-[#F9F9FC]">
        {showUsers.map((user, index) => (
          <SuggestFollowUserCard key={index} user={user} />
        ))}
        <button
          onClick={() => setShowMore(!showMore)}
          className="flex items-center font-bold justify-center py-2 text-blue-500 rounded hover:text-blue-700"
        >
          {!showMore ? "Show More" : "Show Less"}
        </button>
      </div>
    </div>
  );
}
