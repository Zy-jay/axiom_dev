import "@rainbow-me/rainbowkit/styles.css";

import {
  darkTheme,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { http } from '@wagmi/core'

import { arbitrum, mainnet } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const projectId = "c4e935871ace4e533bf1de50c5f95bcd";

const config = getDefaultConfig({
  appName: "App",
  projectId: projectId,
  chains: [arbitrum, mainnet],
  transports: { 
		[arbitrum.id]: http("https://arb-mainnet.g.alchemy.com/v2/yYTw1_F8WgexT7cSRC6NDltqftxhFaws"), 
		[mainnet.id]: http("https://eth-mainnet.g.alchemy.com/v2/yYTw1_F8WgexT7cSRC6NDltqftxhFaws"), 
		
	  }, 
});

export const Providers = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider locale="ru" theme={darkTheme()}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
