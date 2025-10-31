"use client";

import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  getDefaultConfig,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { sepolia, mainnet, polygon, arbitrum, optimism, base } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "a01e2cedd4c97c5d82b82f6aa4c8c222";

const config = getDefaultConfig({
  appName: "Web3 Dashboard",
  projectId: projectId,
  chains: [mainnet, polygon, arbitrum, optimism, base, sepolia],
  ssr: true,
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#6366F1",
            accentColorForeground: "#ffffff",
            borderRadius: "large",
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
