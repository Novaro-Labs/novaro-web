import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  arbitrum,
  base,
  linea,
  lineaSepolia,
  localhost,
  mainnet,
  optimism,
  polygon,
  sepolia,
  bsc,
  bscTestnet
} from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "navaro-web",
  projectId: "navaro-web",
  chains: [
    mainnet,
    bsc,
    bscTestnet,
    linea,
    lineaSepolia,
    sepolia,
    polygon,
    optimism,
    arbitrum,
    base,
    localhost,
  ],
});
