import NovaroImage from "@/components/NovaroImage";
import { useNavigate } from "react-router-dom";
import { TCommunity } from "../../types/community-types";
import React from "react";

export default function CommunityCard({ community }: { community: TCommunity }) {
  let navigate = useNavigate();
  const routeToDetail = (communityId: string) => {
    navigate(`/token-detail/${communityId}`);
  };
  return (
    <div className="rounded-xl overflow-hidden border-[2px] border-[#eee] ">
      <div className="h-[240px] w-full flex items-center justify-center">
        <NovaroImage
          sourceId={community.communityBackgroundImageID}
          className="object-cover h-[240px] w-full object-center"
        />
      </div>
			{/* 加margin */}
			<div className="font-bold text-xl" style={{ paddingTop: '10px', paddingLeft: '17px', paddingRight: '17px' }}>
				{community.communityName}
			</div>

			{/* 趋势图 加margin*/}
			<div className="h-[240px] w-full flex items-center justify-center">
        <NovaroImage
          sourceId={}
          className="object-cover h-[240px] w-full object-center"
        />
      </div>

			{/* Join按钮 */}
			<div>
				<button
          onClick={() => routeToDetail(community.communityId)}
          className="bg-blue-500 rounded w-full h-10 flex items-center justify-center text-white"
        >
          Join
        </button>
			</div>

    
    </div>
  );
}
