import logo from "@/assets/img/logo.svg";
import { Search } from "@web3uikit/icons";
import CreateCommunityModal from "@/components/createCommunityModal";
import { Input } from "@web3uikit/core";
import React, { useEffect, useState } from 'react';
import { message, Button } from "antd";
import clientContract from "../../abi/client/NovaroClient.json";
import { getContractAddress } from "@/utils/contract";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
// import { readContract } from "@wagmi/core";
import { TCommunity } from "../../types/community-types";
import CommunityCard from "./CommunityCard";



const CommunityPage = () => {

	// 搜索框的值
	const [searchValue, setSearchValue] = useState("");
	// 存储所有已经创建的社区，从合约获取，返回值是一个数组
	const [allCommunity, setAllCommunity] = useState<TCommunity[]>([]);

	// 设置用户的等级，高于某一级才可以创建社区
	const [userLevel, setuserLevel] = useState(11)

	// 控制模态框的显示
	const [launchModalVisible, setLaunchModalVisible] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);

	const handleVisible = (v: boolean | ((prevState: boolean) => boolean)) => {
    setLaunchModalVisible(v);
  };

	// 点击创建社区按钮触发的函数，若用户等级小于10级，则无法创建社区。
	const createCommunity = () => {
		if (userLevel < 10) {
      message.warning("Your user level is not sufficient");
      setLaunchModalVisible(false);
    }
		setLaunchModalVisible(true);
	}

	// 部署合约的地址
	const { chain } = useAccount();
	const NovaroClient_CONTRACT_ADDRESS = getContractAddress(chain?.name || "")
    .NovaroClient as `0x${string}`;
	// console.log(`合约地址：${NovaroClient_CONTRACT_ADDRESS}; chainID：${chain?.id}; chainName：${chain?.name}`);
	const { writeContractAsync } = useWriteContract();

	/** 创建 handleCreateCommunity 方法*/
	const handleCreateCommunity = async ({
		communityChainId,
		communityBackgroundImageID,
		communityNetwork,
		communityStakeTokenName,
		communityShareTokenName,
		communityShareTokenSymbol,
		communityName,
		communityDescription,
	}: {
		communityChainId: number;
		communityBackgroundImageID: string;
		communityNetwork: string;
		communityStakeTokenName: string;
		communityShareTokenName: string;
		communityShareTokenSymbol: string;
		communityName: string;
		communityDescription: string;
	}) => {
		setConfirmLoading(true);
		try{
			
			// 调用合约创建社区实例，合约返回值是一个社区代币的地址
			const communityShareTokenAddress = (await writeContractAsync({
				abi: clientContract.abi,
				address: NovaroClient_CONTRACT_ADDRESS,
				functionName: 'deployCommunityToken',
				args: [
					communityChainId,
					communityStakeTokenName,
					communityShareTokenName,
					communityShareTokenSymbol,
					communityName,
					communityDescription,
					communityBackgroundImageID,
				]
			})) as `0x${string}`;

			console.log("创建合约成功，社区份额代币地址：" + communityShareTokenAddress)

			setTimeout(() => {getAllCommunities();}, 2000);

			setLaunchModalVisible(false);
			setConfirmLoading(false);

			return true;
		} catch (err) {
			message.error("Error creating community");
			setConfirmLoading(false);
		}
		return false;
	};

	const [loading, setLoading] = useState(false);

	// 从合约中获取所有的社区
	const getAllCommunities = async () => {
		const allCommunities = await useReadContract({
			abi: clientContract.abi,
			address: NovaroClient_CONTRACT_ADDRESS,
			functionName: 'getCommunities',
			args: []
		});

		// 将对象类型的值转为数组后通过映射的方法转换成TCommunity类型
		const transformedData: TCommunity[] = Object.values(allCommunities.data).map((item) => ({
			admin: item.admin,
			communityChainId: item.chainId,
			communityStakeTokenAddress: item.underlying_token_address,
			communityName: item.community_name,
			communityDescription: item.community_description,
			communityBackgroundImageID: item.community_logo_source_id,
			communityShareTokenName: item.community_share_token_name,
			communityShareTokenSymbol: item.community_share_token_symbol,
			communityShareTokenAddress: item.community_token,
		}));
		// 存到状态变量allCommunity中
		setAllCommunity(transformedData);

		// console.log(allCommunity);
		// console.log(allCommunity[0].communityBackgroundImageID);
	};

	var t = true;
	// 控制获取所有社区的函数只执行一次
	// if(t){
	// 	getAllCommunities();
	// 	t = false;
	// }
	// useEffect(() => {
	// 	getAllCommunities();
	//   }, [chain?.id]);

	// useEffect(() => {
	// 	getAllCommunities();
	// });

	// useEffect(() => {
	// 	getAllCommunities();
	// }, [confirmLoading, allCommunity]);

	// getAllCommunities(); 
	

	// 获取搜索框中的内容，若为空则展示所有已创建的社区，否则展示对应名字的社区
	const showSearchCommunities =
		searchValue === ""
			? allCommunity
			: allCommunity.filter((x) => x.communityName.includes(searchValue));


	return (
		<div className="pl-8 py-8">
			<div className="flex gap-20">
				<div className="space-y-8">
					<img src={logo} className="h-6 w-auto" />
					<div className="flex items-center space-x-4"> {/* 新增的 div 容器，用于水平排列 button 和 span */}
						<button className="btn rounded-xl px-8 h-12 flex justify-center items-center text-white bg-blue-500" onClick={createCommunity}>
							Create Community
						</button>
						<span className="text-2xl font-extrabold">
							Create Your Own Community, Attract More Followers
						</span>
					</div>
				</div>
			</div>

			<div className="mt-8">
				<Input
					style={{
						height: "40px",
						background: "#f7f7f7", // A2A5B1
						outline: "none",
					}}
					placeholder="Search for Community by Name"
					width="323px"
					prefixIcon={
						<Search style={{ color: "#A2A5B1" }} className="size-3" />
					}
					name="Test text Input"
					value={searchValue}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setSearchValue(e.target.value);
						// 根据搜索框中输入的名字来查找相应的社区
						setAllCommunity(allCommunity.filter((x) => x.communityName.includes(searchValue)));
					}}
				/>
			</div>

			<div className="bg-[#eee] w-full h-[1px] my-8"></div>

			{/* 利用map()展示community card */}
			<div className="grid grid-cols-3 gap-12 pr-8">
				{showSearchCommunities.map((community) => (<CommunityCard community={community} key={community.communityName}/>))}
			</div>

			{/* 创建社区的模态框 */}
			<CreateCommunityModal
				visible={launchModalVisible}
				handleVisible={handleVisible}
				confirmLoading={confirmLoading}
				onLaunch={handleCreateCommunity}
			/>
		</div>
	)
	
}
export default CommunityPage;