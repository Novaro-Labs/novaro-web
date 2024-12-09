import { postUploadImages } from "@/api/asset-apis.ts";
import Star from "@/assets/svg/star.svg";
import UploadImage from "@/assets/svg/upload.svg";
import type { GetProp, UploadProps } from "antd";
import { Button, Input, Modal, Upload, message, Select, Flex } from "antd";
import React from "react";
import { useState, useEffect } from 'react';
import "./index.less";
import { useAccount, useChainId } from 'wagmi';

// import { config } from "../../wagmi";
// import { readContract } from "@wagmi/core";
// import { BLANK_ADDRESS, getContractAddress } from "@/utils/contract";
// import clientContract from "../../abi/client/NovaroClient.json";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

// 修改.env中的VITE_BASE_URL为后端服务器的地址
const baseUrl = import.meta.env.VITE_BASE_URL;

const CreateCommunityModal = ({
	confirmLoading = false,
	visible = false,
	handleVisible,
	onLaunch = async () => false,
}: {
	confirmLoading?: boolean;
	visible?: boolean;
	handleVisible: (visible: boolean) => void;
	onLaunch?: (data: {
		communityChainId: number;
		communityBackgroundImageID: string;
		communityNetwork: string;
		communityStakeTokenName: string;
		communityShareTokenName: string;
		communityShareTokenSymbol: string;
		communityName: string;
		communityDescription: string;
	}) => Promise<boolean>;
}
) => {

	const Networks = [
		{ name: "Ethereum", icon: "https://cryptologos.cc/logos/ethereum-eth-logo.svg" },
		{ name: "hardhat", icon: "https://cryptologos.cc/logos/ethereum-eth-logo.svg" },
		{ name: "localhost", icon: "https://cryptologos.cc/logos/ethereum-eth-logo.svg" },
	]

	const Tokens = [
		{ name: "USDT", icon: "https://cryptologos.cc/logos/tether-usdt-logo.svg" },
	]
	
	const { chain } = useAccount();  // 获取链的信息

	const [communityChainId, setCommunityChainId] = useState(useChainId());
	const [communityBackgroundImageID, setCommunityBackgroundImageID] = useState<string>();
	const [communityNetwork, setCommunityNetwork] = useState(Networks[2].name);
	const [communityStakeTokenName, setCommunityStakeTokenName] = useState(Tokens[0].name);
	const [communityShareTokenName, setCommunityShareTokenName] = useState("");
	const [communityShareTokenSymbol, setCommunityShareTokenSymbol] = useState("");
	const [communityName, setCommunityName] = useState("");
	const [communityDescription, setCommunityDescription] = useState("");
	
	const [communityBackgroundImageUrl, setCommunityBackgroundImageUrl] = useState("");

	// 存储图片文件的列表，用于展示上传的图片
	const [imageFileList, setImageFileList] = useState<any>([]);
	// 表示提交请求时的加载状态。
	const [loading, setLoading] = useState(false);

	
	// 当 chain 发生变化时，更新 communityChainId
	useEffect(() => {
		if (chain?.id) {
			setCommunityChainId(chain.id);
		}
	}, [chain]); 
	

	// 使用antd的下拉框组件
	const { Option } = Select;

	// limit file type and size less than 4MB
	const beforeUpload = (file: FileType) => {
		const isJpgOrPng = [
			"image/png",
			"image/jpeg",
			"image/webp",
			"image/gif",
		].includes(file.type);
		if (!isJpgOrPng) {
			message.error("You can only upload jpeg/png/webp/gif file!");
			return;
		}
		const isLt4M = file.size / 1024 / 1024 < 4;
		if (!isLt4M) {
			message.error("Image must smaller than 4MB!");
			return;
		}
		return isJpgOrPng && isLt4M;
	};

	// custom upload image
	const customRequest = (options: any) => {
		postUploadImages({
			image: options.file,
		}).then((res) => {
			if (res.msg === "success") {
				setCommunityBackgroundImageUrl(baseUrl + "/" + res.data[0].path);
				setImageFileList([res.data[0]]);
				setCommunityBackgroundImageID(res.data[0].sourceId);
			}
		});
	};

	const uploadButton = (
		<button className="defaultUploadBtn" type="button">
			<img
				src={UploadImage}
				style={{ width: "5vh", height: "5vh", marginBottom: "10px" }}
				alt="Upload"
			/>
			<div className="format">jpeg/png/webp/gif</div>
			<div className="format">less than 4M</div>
		</button>
	);

	const saveCommunity = async () => {
		console.log("img", imageFileList);
		if (!communityBackgroundImageID) {
			message.error("Please upload an image");
			return;
		}
		if (!communityName) {
			message.error("Please enter the name of your community");
			return;
		}
		if (!communityDescription) {
			message.error("Please enter a description of your community");
			return;
		}
		setLoading(true);
		try {
			const result = await onLaunch({
				communityChainId,
				communityBackgroundImageID,
				communityNetwork,
				communityStakeTokenName,
				communityShareTokenName,
				communityShareTokenSymbol,
				communityName,
				communityDescription,
			}); // 可以在page页面写读合约的逻辑，在这里将参数传出去。
			
			console.log(`createCommunityModalPage: 
						communityChainId=${communityChainId},
						communityBackgroundImageID=${communityBackgroundImageID},
						communityStakeTokenName=${communityStakeTokenName},
						communityShareTokenName=${communityShareTokenName},
						communityShareTokenSymbol=${communityShareTokenSymbol},
						communityName=${communityName},
						communityDescription=${communityDescription}`
			);
			
			if (result) {
				// 成功创建后清除输入的内容
				setImageFileList([]);
				setCommunityBackgroundImageUrl("");
				
				setCommunityBackgroundImageID("")
				setCommunityNetwork(Networks[0].name);
				setCommunityStakeTokenName(Tokens[0].name);
				setCommunityShareTokenName("");
				setCommunityShareTokenSymbol("");
				setCommunityName("");
				setCommunityDescription("");
				message.success("Successfully created community!")
			}
			setLoading(false);
		} catch (err) {
			setLoading(false);
			// 如何显示导致创建失败的具体信息？
			message.error("Error creating community!");
		}
	};

	const handleCancel = () => {
		handleVisible(false);
		
		// 默认取消创建时不清空用户输入的数据
		// setcommunityBackgroundImageUrl("");
		// setImageFileList([]);
	};

	return (
		<div>
			<Modal
				style={{ top: 60 }}
				width={800}
				open={visible}
				footer={null} // 禁用默认的底部按钮
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
			>
				<div className="p-6">

					{/* Upload community images */}
					<div className="justify-center items-center">
						<div className="flex mb-2 text">
							Community Image <img className="ml-2" src={Star} alt="star" />
						</div>
						<Upload
							name="avatar"
							style={{ width: "261px", height: "211px" }}
							listType="picture-card"
							className="avatar-uploader"
							showUploadList={false}
							beforeUpload={beforeUpload}
							customRequest={customRequest}
						>
							{communityBackgroundImageUrl ? (
								<img
									src={communityBackgroundImageUrl}
									alt="avatar"
									style={{ width: "100%", height: "100%" }}
								/>
							) : (
								uploadButton
							)}
						</Upload>
					</div>

					{/* Select Network */}
					<div className="mt-5">
						<div className="flex mb-2 text">
							Network <img className="ml-2" src={Star} alt="star" />
						</div>
						{/* Network下拉框 */}
						<Select placeholder="Select Your Community Network"
							onChange={(e) => {setCommunityNetwork(e);console.log(e)}}
							style={{ width: '100%', backgroundColor: "#F9F9FC" }}
						>
							{Networks.map((communityNetwork) => (
								<Option key={communityNetwork.name} value={communityNetwork.name} style={{ display: 'flex' }}>
									<Flex gap="middle" >
										<div className="flex items-center">
											<img src={communityNetwork.icon} style={{ width: "24px", height: "24px" }} />
										</div>
										{communityNetwork.name}
									</Flex>
								</Option>
							))}
						</Select>
					</div>

					{/* Select Stake Token */}
					<div className="mt-5">
						<div className="flex mb-2 text">
							Stake Token <img className="ml-2" src={Star} alt="star" />
						</div>
						{/* Community Token下拉框 */}
						<Select placeholder="Select Your Community Token"
							onChange={(e) => {setCommunityStakeTokenName(e);console.log(e)}}
							style={{ width: '100%', backgroundColor: "#F9F9FC" }}
						>
							{Tokens.map((communityTokenName) => (
								<Option key={communityTokenName.name} value={communityTokenName.name} style={{ display: 'flex' }}>
									<Flex gap="middle" >
										<div className="flex items-center">
											<img src={communityTokenName.icon} style={{ width: "24px", height: "24px" }} />
										</div>
										{communityTokenName.name}
									</Flex>
								</Option>
								
							))}
						</Select>
					</div>

					{/* Input share token name and symbol */}
					<div className="mt-5 flex">
						<div className="w-1/2 token">
							<div className="flex mb-2 text">
								Share Token Name <img className="ml-2" src={Star} alt="star" />
              </div>

							<Input.TextArea
							className="community-name-input-area"
							showCount
							maxLength={16}
							placeholder="Enter the name of your community token"
							value={communityShareTokenName}
							onChange={(e) => setCommunityShareTokenName(e.target.value)}
							/>
						</div>

						<div className="w-1/2 token  pl-8">
							<div className="flex mb-2 text">
								Share Token Symbol <img className="ml-2" src={Star} alt="star" />
							</div>

							<Input.TextArea
							className="community-name-input-area"
							showCount
							maxLength={4}
							placeholder="Enter the symbol of your community token"
							value={communityShareTokenSymbol}
							onChange={(e) => setCommunityShareTokenSymbol(e.target.value)}
							/>
            </div>


					</div>

					{/* Set community name */}
					<div className="mt-5">
						<div className="flex mb-2 text">
							Community Name <img className="ml-2" src={Star} alt="star" />
						</div>
						<Input.TextArea
							className="community-name-input-area"
							showCount
							maxLength={32}
							placeholder="Enter Community Name"
							value={communityName}
							onChange={(e) => setCommunityName(e.target.value)}
						/>
					</div>

					{/* Set community description */}
					<div className="mt-5">
						<div className="flex mb-2 text">
							Community Description <img className="ml-2" src={Star} alt="star" />
						</div>
						<Input.TextArea
							className="token-input-area"
							showCount
							maxLength={256}
							placeholder="Enter Community Description"
							value={communityDescription}
							onChange={(e) => setCommunityDescription(e.target.value)}
						/>
					</div>

					{/* save button */}
					<div className="flex justify-center items-center">
						<Button
							onClick={saveCommunity}
							type="primary"
							size="large"
							loading={loading}
							className="w-[180px]  mt-10"
						>
							Save
						</Button>
					</div>

				</div>
			</Modal>
		</div>
	);

};

export default CreateCommunityModal;