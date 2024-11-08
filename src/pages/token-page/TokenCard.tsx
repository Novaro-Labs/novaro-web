import NovaroImage from "@/components/NovaroImage";
import { useNavigate } from "react-router-dom";
import { TNft } from "../../types/token-types";

export default function NFTCard({ nft }: { nft: TNft }) {
  let navigate = useNavigate();
  const routeToDetail = () => {
    navigate(`/token-detail`);
  };
  return (
    <div className="rounded-xl overflow-hidden border-[2px] border-[#eee] ">
      <div className="h-[240px] w-full flex items-center justify-center">
        <NovaroImage
          sourceId={nft.sourceId}
          className="object-cover h-[240px] w-full object-center"
        />
      </div>
      <div className="space-y-6 p-4">
        <div className="font-bold">{nft.name}</div>
        <div className="flex items-center gap-1">
          <span className="text-[#BFBFCA]">Created by : </span>
          <a
            href="https://eips.ethereum.org/EIPS/eip-6551"
            target="_blank"
            className="text-blue-400"
          >
            {nft.deployer}
          </a>
        </div>
        <div className="text-black/70">{nft.des}</div>
        <input
          placeholder="Enter the Amount"
          className="w-full border border-[#eee] h-10 px-2 bg-black/5 rounded"
        />
        <button
          onClick={routeToDetail}
          className="bg-blue-500 rounded w-full h-10 flex items-center justify-center text-white"
        >
          Buy
        </button>
      </div>
    </div>
  );
}
