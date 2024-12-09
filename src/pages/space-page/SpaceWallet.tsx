import NovaroImage from "@/components/NovaroImage";
import { TNft } from "@/types/token-types";
import { BLANK_ADDRESS, getContractAddress } from "@/utils/contract";
import { readContract } from "@wagmi/core";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import clientContract from "../../abi/client/NovaroClient.json";
import { config } from "../../wagmi";

export default function SpaceWallet() {
  const [followerPassTokens, setFollowerPassTokens] = useState<TNft[]>([]);
  const [boundTokenAccount, setBoundTokenAccount] = useState("");
  const { address, isConnected, chain } = useAccount();

  const CLIENT_CONTRACT_ADDRESS = getContractAddress(chain?.name || "")
    .NovaroClient as `0x${string}`;

  /**
   * 获取 bound token account
   */
  const getBoundTokenAccount = async () => {
    const boundTokenAccount =
      ((await readContract(config as any, {
        abi: clientContract.abi,
        address: CLIENT_CONTRACT_ADDRESS as any,
        chainId: chain?.id,
        functionName: "getBoundAccount",
        args: [address],
      })) as string) || "";

    console.log("boundTokenAccount", address, boundTokenAccount);
    let account = boundTokenAccount === BLANK_ADDRESS ? "" : boundTokenAccount;
    setBoundTokenAccount(account);
    return account;
  };

  /** 获取当前用户所有创建的token */
  const getTokens = async () => {
    const tokens = (await readContract(config as any, {
      address: CLIENT_CONTRACT_ADDRESS,
      abi: clientContract.abi,
      functionName: "getAllFollowerPassToken",
    })) as any;
    setFollowerPassTokens(tokens);
  };

  useEffect(() => {
    if (isConnected && address) {
      getBoundTokenAccount();
    }
  }, [isConnected]);

  useEffect(() => {
    if (boundTokenAccount) {
      getTokens();
    }
  }, [boundTokenAccount]);
  return (
    <div className="mt-10">
      <div className=" py-6 space-y-2">
        <div className="dst-account-title text-xl font-semibold">
          DST Account
        </div>
        <div className="dst-account-address">{boundTokenAccount}</div>
      </div>
      <div className="wallet mt-8">
        <div className="wallet-title text-xl font-semibold">Wallet</div>
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-3xl font-bold">
                $100<span className="text-gray-400">.50</span>
              </div>
              <div className="text-gray-400 text-sm">Beat 60% Of Users</div>
            </div>
            <div className="bg-gray-50 px-4 py-2 rounded-lg">
              <div className="text-gray-400 text-sm">Activity (—)</div>
              <div className="text-center">14 Txns</div>
            </div>
          </div>
        </div>
      </div>
      <div className="tokens bg-[#F9F9FC] rounded-lg p-3">
        <div className="tokens-title">
          <div className="token-icon"></div>
          <div className="token-text text-xl font-bold">Tokens</div>
          <div className="token-count grid grid-cols-2 gap-4 gap-y-4 py-10">
            {followerPassTokens.map((token) => (
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <NovaroImage
                      sourceId={token.sourceId}
                      className="size-6 rounded-full"
                    />
                    <span className="text-gray-600 font-medium">Inch</span>
                  </div>
                  <span className="text-gray-800 font-semibold">60%</span>
                </div>
                <div className="space-y-1">
                  <div className="text-xl font-bold">${16.2}</div>
                  <div className="text-gray-500 text-sm">{12} INCH</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
