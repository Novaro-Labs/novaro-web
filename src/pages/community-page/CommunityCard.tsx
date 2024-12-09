import NovaroImage from "@/components/NovaroImage";
import { useNavigate } from "react-router-dom";
import { TCommunity } from "../../types/community-types";
import CommunityTokenEcharts from './CommunityCharts';

export default function CommunityCard({ community }: { community: TCommunity }) {
  let navigate = useNavigate();
  const routeToDetail = (communityName: string) => {
    navigate(`/community-detail/${communityName}`);
  };

  return (
    <div className="rounded-xl overflow-hidden border-[2px] border-[#eee] ">
      <div className="h-[240px] w-full flex items-center justify-center">
        <NovaroImage
          sourceId={community.communityBackgroundImageID}
          className="object-cover h-[240px] w-full object-center"
        />
      </div>
      {/* 取消了space-y-4 */}
      <div className="p-4"> 
        {/* 加margin 
        style={{ paddingTop: '10px', paddingLeft: '17px', paddingRight: '17px' }}
        */}
        <div className="font-bold text-xl">
          {community.communityName}
        </div>

        {/* 趋势图*/}
        <div className="h-[240px] w-full flex items-center justify-center">
          <CommunityTokenEcharts />
        </div>

        {/* Join按钮 */}
        <button
          onClick={() => routeToDetail(community.communityName)}
          className="bg-blue-500 rounded w-full h-10 flex items-center justify-center text-white"
        >
          Join
        </button>
          

      </div>
    
    </div>
  );
}
