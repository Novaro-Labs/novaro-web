
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { arbitrum, base, localhost, mainnet, optimism, polygon } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'navaro-web',
  projectId: 'navaro-web',
  chains: [mainnet, polygon, optimism, arbitrum, base, localhost],
});
