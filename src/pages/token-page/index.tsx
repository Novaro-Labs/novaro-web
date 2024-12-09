import dstAccountIcon from "@/assets/img/dst-account-icon.png";
import logo from "@/assets/img/logo.svg";
import tokenWalletBg from "@/assets/img/token-wallet-bg.png";
//@ts-ignore
import { Input } from "@web3uikit/core";
//@ts-ignore
import { readContract } from "@wagmi/core";
import { Search } from "@web3uikit/icons";
import { useAccount, useWriteContract } from "wagmi";
import TokenCard from "./TokenCard";

import clientContract from "../../abi/client/NovaroClient.json";
import dstContract from "../../abi/tokens/DynamicSocialToken.json";

import CreateTokenModal from "@/components/createTokenModal";
import { BLANK_ADDRESS, getContractAddress } from "@/utils/contract";
import { confirmPromise } from "@/utils/helpers";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { message } from "antd";
import { useEffect, useState } from "react";
import { TNft } from "../../types/token-types";
import { cn } from "../../utils/utils";
import { config } from "../../wagmi";

const TokenPage = () => {
  const { address, isConnected, chain } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { openConnectModal } = useConnectModal();

  const [followerPassTokens, setFollowerPassTokens] = useState<TNft[]>([]);
  const [createTokenLoading, setCreateTokenLoading] = useState(false);
  const [boundTokenAccount, setBoundTokenAccount] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [launchTokenVisible, setLaunchTokenVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const CLIENT_CONTRACT_ADDRESS = getContractAddress(chain?.name || "")
    .NovaroClient as `0x${string}`;

  const ACCOUNT_FACTORY_CONTRACT_ADDRESS = getContractAddress(
    chain?.name || ""
  ).AccountFactory;

  /**
   * 获取 bound token account
   */
  const getBoundTokenAccount = async () => {
    const boundTokenAccount =
      ((await readContract(config as any, {
        address: CLIENT_CONTRACT_ADDRESS,
        abi: clientContract.abi,
        functionName: "getBoundAccount",
        args: [address],
      })) as string) || "";

    let account = boundTokenAccount === BLANK_ADDRESS ? "" : boundTokenAccount;
    setBoundTokenAccount(account);
    return account;
  };

  /**
   * 创建 bound token account
   */
  const createBoundTokenAccount = async () => {
    try {
      if (!chain) {
        message.warning("Please connect wallet first");
        return;
      }
      const dynamicSocialTokenAddress = (await readContract(config as any, {
        address: CLIENT_CONTRACT_ADDRESS,
        abi: clientContract.abi,
        chainId: chain.id,
        functionName: "getDynamicSocialToken",
      })) as `0x${string}`;

      let tokenId = (await readContract(config as any, {
        address: dynamicSocialTokenAddress,
        chainId: chain.id,
        abi: dstContract.abi,
        functionName: "getDstTokenId",
        args: [address],
      })) as string;
      console.log({ originTokenId: tokenId, address });

      if (!tokenId) {
        await writeContractAsync({
          address: dynamicSocialTokenAddress,
          chainId: chain.id,
          abi: dstContract.abi,
          functionName: "mint",
          args: [address, 0],
        });
        tokenId = (await readContract(config as any, {
          address: dynamicSocialTokenAddress,
          chainId: chain.id,
          abi: dstContract.abi,
          functionName: "getDstTokenId",
          args: [address],
        })) as string;
      }

      const boundTokenAccount = (await writeContractAsync({
        address: CLIENT_CONTRACT_ADDRESS,
        chainId: chain.id,
        abi: clientContract.abi,
        functionName: "createOrFetchAccount",
        args: [
          ACCOUNT_FACTORY_CONTRACT_ADDRESS,
          chain.id,
          dynamicSocialTokenAddress,
          tokenId,
          1,
          "0x",
        ],
      })) as string;
      if (boundTokenAccount) {
        setLaunchTokenVisible(true);
        setBoundTokenAccount(boundTokenAccount);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /** 唤起创建token弹窗
   * 首先判断有无 bound token account
   * 没有，先去创建
   * 有，则打开弹窗
   */
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
        await createBoundTokenAccount();
        setCreateTokenLoading(false);
      } else {
        setLaunchTokenVisible(true);
      }
    } catch (err) {
      message.error("Error creating token");
      setCreateTokenLoading(false);
    }
  };

  /** 创建 token 方法*/
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
    if (!chain) {
      message.warning("Please connect wallet first");
      return false;
    }
    setConfirmLoading(true);

    try {
      await writeContractAsync({
        address: CLIENT_CONTRACT_ADDRESS,
        chainId: chain.id,
        abi: clientContract.abi,
        functionName: "createFollowerPassToken",
        args: [tokenName, tokenSymbol, sourceId, tokenDescription],
      });
      setTimeout(() => {
        getTokens();
      }, 2000);
      setLaunchTokenVisible(false);
      setConfirmLoading(false);
      return true;
    } catch (err) {
      message.error("Error creating token");
      setCreateTokenLoading(false);
      setConfirmLoading(false);
    }
    return false;
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
  }, [isConnected, chain?.id]);

  useEffect(() => {
    getTokens();
  }, [chain?.id]);

  const filterTokens =
    searchValue === ""
      ? followerPassTokens
      : followerPassTokens.filter((x) => x.name.includes(searchValue));

  const handleVisible = (v: boolean | ((prevState: boolean) => boolean)) => {
    setLaunchTokenVisible(v);
  };

  return (
    <div className="pl-8 py-8">
      <div className="flex gap-20">
        <div className="space-y-8">
          <img src={logo} className="h-6 w-auto" />
          {/* <div className="text-2xl font-extrabold">
            Create Your Own Token, Attract More Followers
          </div> */}

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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchValue(e.target.value);
            setFollowerPassTokens(
              followerPassTokens.filter(
                (token) =>
                  token.name.includes(e.target.value) ||
                  token.des.includes(e.target.value)
              )
            );
          }}
        />
      </div>
      <div className="bg-[#eee] w-full h-[1px] my-8"></div>
      <div className="grid grid-cols-3 gap-12 pr-8">
        {filterTokens.map((nft) => (
          <TokenCard nft={nft} key={nft.id} />
        ))}
      </div>
      <CreateTokenModal
        visible={launchTokenVisible}
        handleVisible={handleVisible}
        confirmLoading={confirmLoading}
        onLaunch={handleCreateToken}
      />
    </div>
  );
};
export default TokenPage;
