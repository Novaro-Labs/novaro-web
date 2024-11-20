import LineaSepoliaAddresses from "@/contracts/linea_sepolia_addresses.json";
import SepoliaAddresses from "@/contracts/sepolia_addresses.json";
import {
  lineaSepolia,
  sepolia
} from "wagmi/chains";

export const BLANK_ADDRESS = "0x0000000000000000000000000000000000000000";

export const getContractAddress = (
  chainName: string
): {
  LiquidityPool: string;
  DynamicSocialToken: string;
  NovaroClient: string;
  AccountFactory: string;
  AccountRegistry: string;
} => {
  if (chainName === sepolia.name) {
    return SepoliaAddresses.contracts;
  } else if (chainName === lineaSepolia.name) {
    return LineaSepoliaAddresses.contracts;
  } else {
    return {
      LiquidityPool: BLANK_ADDRESS,
      DynamicSocialToken: BLANK_ADDRESS,
      NovaroClient: BLANK_ADDRESS,
      AccountFactory: BLANK_ADDRESS,
      AccountRegistry: BLANK_ADDRESS,
    };
  }
};
