import { getContractAddress } from "@/utils/contract";
import { memo } from "react";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import dst from "../../abi/tokens/DynamicSocialToken.json";
import "./index.less";

const MintButton = () => {
  const { address, chain } = useAccount();
  const { data: hash, isPending, error, writeContract } = useWriteContract();

  const handleMint = () =>{
    if(!chain){
      return
    }
    const DST_CONTRACT_ADDRESS = getContractAddress(chain?.name).DynamicSocialToken

    if(!isPending){
      writeContract({
        address: DST_CONTRACT_ADDRESS as `0x${string}`,
        abi: dst.abi,
        functionName: "mint",
        args: [address, 157884],
      });
    }
  }

  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });


  return (
    <div>
      <div className="mint_button" onClick={handleMint}>
        mint
      </div>
      <div>isPending: {isPending ? "true" : "false"}</div>
      <div>hash: {hash}</div>
      <div>isLoading: {isLoading ? "true" : "false"}</div>
      <div>isSuccess: {isSuccess ? "true" : "false"}</div>
    </div>
  );
};

export default memo(MintButton);
