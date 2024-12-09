
// 合约端对社区类型的定义：
// "admin": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
// "chainId": "1337",
// "underlying_token_address": "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
// "community_name": "test2",
// "community_description": "aadss",
// "community_logo_source_id": "421c7addd37e2343aa2cd35256072f5a053c598813bad8906b67eecd96379047",
// "community_share_token_name": "tset",
// "community_share_token_symbol": "ttt",
// "community_token": "0xDa1A2E33BD9E8ae3641A61ab72f137e61A7edf6e"

export type TCommunity = {
    admin: string;
    communityChainId: string;
    communityStakeTokenAddress: string;
	communityName: string;
	communityDescription: string;
	communityBackgroundImageID: string;
	communityShareTokenName: string;
	communityShareTokenSymbol: string;
    communityShareTokenAddress: string;
};