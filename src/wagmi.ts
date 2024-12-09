import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  arbitrum,
  base,
  hardhat,
  linea,
  lineaSepolia,
  localhost,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "navaro-web",
  projectId: "navaro-web",
  chains: [
    mainnet,
    linea,
    lineaSepolia,
    sepolia,
    polygon,
    optimism,
    arbitrum,
    base,
    localhost,
    hardhat,
  ],
});
