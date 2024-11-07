import dstAccountIcon from "@/assets/img/dst-account-icon.png";
import logo from "@/assets/img/logo.svg";
import tokenWalletBg from "@/assets/img/token-wallet-bg.png";
import "./index.less";
//@ts-ignore
import { Input } from "@web3uikit/core";
//@ts-ignore
import { readContract } from "@wagmi/core";
import { Search } from "@web3uikit/icons";
import { useAccount, useWriteContract } from "wagmi";
import TokenCard from "./TokenCard";

import clientContract from "../../abi/client/NovaroClient.json";
import dstContract from "../../abi/tokens/DynamicSocialToken.json";

import {
  ACCOUNT_FACTORY_CONTRACT_ADDRESS_LOCAL,
  CLIENT_CONTRACT_ADDRESS_LOCAL,
} from "../../constants";

import { getImages } from "@/api/asset-apis.ts";
import CreateTokenModal from "@/components/createTokenModal";
import { confirmPromise } from "@/utils/helpers";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { message } from "antd";
import { useEffect, useState } from "react";
import { localhost } from "viem/chains";
import mockNfts from "../../mock-data/nfts";
import { TNft } from "../../types/token-types";
import { cn } from "../../utils/utils";
import { config } from "../../wagmi";
import "./index.less";

const clientCommonParams: any = {
  address: CLIENT_CONTRACT_ADDRESS_LOCAL,
  chainId: 1337,
  abi: clientContract.abi,
};

const baseUrl = import.meta.env.VITE_BASE_URL;
const TokenPage = () => {
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { openConnectModal } = useConnectModal();

  const [followerPassTokens, setFollowerPassTokens] =
    useState<TNft[]>(mockNfts);
  const [createTokenLoading, setCreateTokenLoading] = useState(false);
  const [boundTokenAccount, setBoundTokenAccount] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const getBoundTokenAccount = async () => {
    const boundTokenAccount =
      ((await readContract(config as any, {
        ...clientCommonParams,
        functionName: "getBoundAccount",
        args: [address],
      })) as string) || "";

    console.log("boundTokenAccount", boundTokenAccount);
    let account =
      boundTokenAccount === "0x0000000000000000000000000000000000000000"
        ? ""
        : boundTokenAccount;
    setBoundTokenAccount(account);
    return account;
  };

  const createBoundTokenAccount = async () => {
    try {
      const dynamicSocialTokenAddress = (await readContract(config as any, {
        ...clientCommonParams,
        functionName: "getDynamicSocialToken",
      })) as `0x${string}`;

      let tokenId = (await readContract(config as any, {
        address: dynamicSocialTokenAddress,
        chainId: 1337,
        abi: dstContract.abi,
        functionName: "getDstTokenId",
        args: [address],
      })) as string;
      console.log({ originTokenId: tokenId, address });

      if (!tokenId) {
        await writeContractAsync({
          chain: localhost,
          address: dynamicSocialTokenAddress,
          chainId: 1337,
          abi: dstContract.abi,
          functionName: "mint",
          args: [address, 0],
          nonce: 0,
        });
        tokenId = (await readContract(config as any, {
          address: dynamicSocialTokenAddress,
          chainId: 1337,
          abi: dstContract.abi,
          functionName: "getDstTokenId",
          args: [address],
        })) as string;
      }

      let owner = (await readContract(config as any, {
        address: dynamicSocialTokenAddress,
        chainId: 1337,
        abi: dstContract.abi,
        functionName: "ownerOf",
        args: [tokenId],
      })) as string;

      console.log({ owner });

      const boundTokenAccount = (await readContract(config as any, {
        address: CLIENT_CONTRACT_ADDRESS_LOCAL,
        chainId: 1337,
        abi: clientContract.abi,
        functionName: "createOrFetchAccount",
        args: [
          ACCOUNT_FACTORY_CONTRACT_ADDRESS_LOCAL,
          1337,
          dynamicSocialTokenAddress,
          tokenId,
          1,
          "0x",
        ],
      })) as string;
      if (boundTokenAccount) {
        setVisible(true);
        setBoundTokenAccount(boundTokenAccount);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const invokeCreateToken = async () => {
    try {
      setCreateTokenLoading(true);
      if (!boundTokenAccount) {
        const confirmCreateAccount = await confirmPromise({
          icon: null,
          width: 360,
          closable: true,
          content: (
            <div className="font-medium text-2xl text-center mb-6 px-14">
              Connect and Claim your Token Account
            </div>
          ),
          cancelText: "Cancel",
          okText: "Confirm",
          centered: true,
        });
        if (!confirmCreateAccount) {
          setCreateTokenLoading(false);
          return;
        }
      }
      await createBoundTokenAccount();
      setCreateTokenLoading(false);
    } catch (err) {
      message.error("Error creating token");
      setCreateTokenLoading(false);
    }
  };

  const handleCreateToken = async ({
    tokenName,
    tokenSymbol,
    tokenDescription,
    sourceId,
  }: {
    tokenName: string;
    tokenSymbol: string;
    tokenDescription: string;
    sourceId: string;
  }) => {
    await writeContractAsync({
      chain: localhost,
      address: CLIENT_CONTRACT_ADDRESS_LOCAL,
      chainId: 1337,
      abi: clientContract.abi,
      functionName: "createFollowerPassToken",
      args: [tokenName, tokenSymbol, sourceId, tokenDescription],
      nonce: 0,
    });
    getTokens()
  };

  const getTokens = async () => {
    const tokens = (await readContract(config as any, {
      address: CLIENT_CONTRACT_ADDRESS_LOCAL,
      abi: clientContract.abi,
      functionName: "getAllFollowerPassToken",
    })) as any;
    console.log(tokens)
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

  useEffect(() => {
    getImages({ sourceId: "123456" }).then((res) => {
      console.log("res", res);
    });
  }, []);

  const filterTokens =
    searchValue === ""
      ? followerPassTokens
      : followerPassTokens.filter((x) => x.name.includes(searchValue));

  const handleVisible = (v: boolean | ((prevState: boolean) => boolean)) => {
    setVisible(v);
  };

  return (
    <div className="pl-8 py-8">
      <div className="flex gap-20">
        <div className="space-y-8">
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
                "btn rounded-xl px-8 h-12 flex justify-center items-center text-white bg-blue-500",
                createTokenLoading && "loading"
              )}
              onClick={invokeCreateToken}
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
              <div className="flex space-x-4">
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
        onLaunch={handleCreateToken}
      />
    </div>
  );
};
export default TokenPage;
