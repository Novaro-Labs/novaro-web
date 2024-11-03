import "./index.less";
import logo from "@/assets/img/logo.svg";
import dstAccountIcon from "@/assets/img/dst-account-icon.png";
import tokenWalletBg from "@/assets/img/token-wallet-bg.png";
//@ts-ignore
import { Input } from "@web3uikit/core";
//@ts-ignore
import { Search } from "@web3uikit/icons";
import TokenCard from "./TokenCard";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { readContract } from "@wagmi/core";

import dstContract from "../../abi/tokens/DynamicSocialToken.json";
import clientContract from "../../abi/client/NovaroClient.json";
import accountRegistryContract from "../../abi/account/ERC6551Registry.json";

import {
  ACCOUNT_REGISTRY_CONTRACT_ADDRESS_LOCAL,
  CLIENT_CONTRACT_ADDRESS_LOCAL,
  DST_CONTRACT_ADDRESS_LOCAL,
} from "../../constants";

import "./index.less";
import { useEffect, useState } from "react";
import { cn } from "../../utils/utils";
import { TNft } from "../../types/token-types";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { config } from "../../wagmi";
import mockNfts from "../../mock-data/nfts";
import CreateTokenModal from "@/components/createTokenModal";
import { getImages } from "@/api/asset-apis.ts";

const TokenPage = () => {
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { openConnectModal } = useConnectModal();

  const [followerPassTokens, setFollowerPassTokens] =
    useState<TNft[]>(mockNfts);
  const [createTokenLoading, setCreateTokenLoading] = useState(false);
  const [boundTokenAccount, setBoundTokenAccount] = useState(
    "0xEEd3A32BA722A2E76e603B730874c5112092278b"
  );
  const [searchValue, setSearchValue] = useState("");
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const init = async () => {
    try {
      const boundTokenAccount = (await readContract(config as any, {
        address: ACCOUNT_REGISTRY_CONTRACT_ADDRESS_LOCAL,
        chainId: 1337,
        abi: accountRegistryContract.abi,
        functionName: "account",
        args: [
          "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
          1337,
          "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          1,
          12345,
        ],
      })) as string;
      setBoundTokenAccount(boundTokenAccount);
    } catch (error) {
      console.error(error);
    }
  };

  const { data: tokenId } = useReadContract({
    address: DST_CONTRACT_ADDRESS_LOCAL,
    chainId: 1337,
    abi: dstContract.abi,
    functionName: "getDstTokenId",
    args: [address],
  });

  const createToken = async () => {
    setVisible(true)
    // setCreateTokenLoading(true);
    // await writeContractAsync({
    //   address: CLIENT_CONTRACT_ADDRESS_LOCAL,
    //   chainId: 1337,
    //   abi: clientContract.abi,
    //   functionName: "createFollowerPassToken",
    //   args: [
    //     "test",
    //     "_test",
    //     "https://www.baidu.com/img/flexible/logo/pc/result.png",
    //     "it's a test",
    //     boundTokenAccount,
    //   ],
    // });
    // await NiceModal.show(ModalCreateNFT);
    // setTimeout(() => {
    //   setCreateTokenLoading(false);
    //   NiceModal.show(ModalCreateNFT);
    // }, 2000);
    // getTokens();
  };

  const getTokens = async () => {
    const token = (await readContract(config as any, {
      address: CLIENT_CONTRACT_ADDRESS_LOCAL,
      abi: clientContract.abi,
      functionName: "getFollowerPassTokenData",
      args: [address, boundTokenAccount, "_test"],
    })) as any;
    setFollowerPassTokens([token]);
  };

  // useEffect(() => {
  //   if (isConnected && address) {
  //     init();
  //   }
  // }, [isConnected]);

  // useEffect(() => {
  //   if (boundTokenAccount) {
  //     getTokens();
  //   }
  // }, [boundTokenAccount]);

  useEffect(() => {
    getImages({ sourceId: "123456"}).then(res => {
      console.log('res', res)
    })
  }, [])

  const filterTokens =
    searchValue === ""
      ? followerPassTokens
      : followerPassTokens.filter((x) => x.name.includes(searchValue));

  const handleVisible = (v: boolean | ((prevState: boolean) => boolean)) => {
    setVisible(v)
  }

  return (
    <div className="pl-8 py-8">
      <div className="flex gap-20">
        <div className="space-y-6">
          <img src={logo} className="h-6 w-auto" />
          <div className="text-2xl font-extrabold">
            Create Your Own Token, Attract More Followers
          </div>

          {!isConnected ? (
            openConnectModal && (
              <button
                className="btn rounded px-6 h-10 flex justify-center items-center text-white bg-blue-500"
                onClick={() => openConnectModal()}
              >
                Connect wallet
              </button>
            )
          ) : (
            <button
              className={cn(
                "btn rounded px-6 h-10 flex justify-center items-center text-white bg-blue-500",
                createTokenLoading && "loading"
              )}
              onClick={createToken}
            >
              Create Token
            </button>
          )}
        </div>
        {boundTokenAccount ? (
          <div className="space-y-3 relative">
            <img
              src={tokenWalletBg}
              className="w-full h-auto absolute top-0 left-0"
            />
            <div className="relative z-10 w-full space-y-4 p-6 font-bold">
              <div className="flex space-x-2">
                <img src={dstAccountIcon} className="h-6 w-auto" />
                <span>DST Account</span>
              </div>
              <div className="text-sm">{boundTokenAccount}</div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="mt-16">
        <Input
          style={{
            height: "40px",
            background: "#f7f7f7", // A2A5B1
            outline: "none",
          }}
          placeholder="Search for tokens"
          width="323px"
          prefixIcon={
            <Search style={{ color: "#A2A5B1" }} className="size-3" />
          }
          name="Test text Input"
          value={searchValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchValue(e.target.value)
          }
        />
      </div>
      <div className="bg-[#eee] w-full h-[1px] my-8"></div>
      <div className="flex flex-wrap gap-8">
        {filterTokens.map((nft) => (
          <TokenCard nft={nft} key={nft.id} />
        ))}
      </div>
      <CreateTokenModal
        visible={visible}
        handleVisible={handleVisible}
        confirmLoading={confirmLoading}
      />
    </div>
  );
};
export default TokenPage;
