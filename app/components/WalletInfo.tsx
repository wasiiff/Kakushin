"use client";

import { useAccount, useBalance, useChainId } from "wagmi";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { mainnet, sepolia, polygon, arbitrum, optimism, base } from "wagmi/chains";

export default function WalletInfo() {
  const { address, isConnected, chain } = useAccount();
  const chainId = useChainId();

  const { data: balanceData, isLoading } = useBalance({
    address,
  });

  const [networkName, setNetworkName] = useState<string>("");
  const [networkColor, setNetworkColor] = useState<string>("gray");

  useEffect(() => {
    if (!chainId) return;
    switch (chainId) {
      case mainnet.id:
        setNetworkName("Ethereum Mainnet");
        setNetworkColor("blue");
        break;
      case sepolia.id:
        setNetworkName("Sepolia Testnet");
        setNetworkColor("yellow");
        break;
      case polygon.id:
        setNetworkName("Polygon");
        setNetworkColor("purple");
        break;
      case arbitrum.id:
        setNetworkName("Arbitrum One");
        setNetworkColor("blue");
        break;
      case optimism.id:
        setNetworkName("Optimism");
        setNetworkColor("red");
        break;
      case base.id:
        setNetworkName("Base");
        setNetworkColor("blue");
        break;
      default:
        setNetworkName(`Chain ID: ${chainId}`);
        setNetworkColor("gray");
        break;
    }
  }, [chainId]);

  if (!isConnected) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <p className="text-sm text-gray-500">Connect your wallet to get started</p>
      </div>
    );
  }

  const badgeColors = {
    blue: "bg-blue-100 text-blue-700 border-blue-200",
    yellow: "bg-yellow-100 text-yellow-700 border-yellow-200",
    purple: "bg-purple-100 text-purple-700 border-purple-200",
    red: "bg-red-100 text-red-700 border-red-200",
    gray: "bg-gray-100 text-gray-700 border-gray-200",
  };

  return (
    <div className="space-y-4 fade-in">
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
        <div className="flex items-start justify-between mb-2">
          <span className="text-xs font-medium text-gray-600">Wallet Address</span>
          <button
            onClick={() => navigator.clipboard.writeText(address || "")}
            className="text-indigo-600 hover:text-indigo-700 cursor-pointer transition-colors"
            title="Copy address"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
        <div className="font-mono text-sm break-all text-gray-800 font-semibold">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </div>
        <div className="text-xs text-gray-500 mt-1 font-mono truncate">{address}</div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-gray-500">Network</div>
                <div className="font-semibold text-sm text-gray-800">{networkName}</div>
              </div>
            </div>
            <span className={clsx("px-3 py-1 rounded-full text-xs font-semibold border", badgeColors[networkColor as keyof typeof badgeColors])}>
              {chain?.name || "Unknown"}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-500">Balance</div>
              <div className={clsx("text-lg font-bold text-gray-800", isLoading && "shimmer rounded h-6 w-24")}>
                {isLoading ? "" : `${parseFloat(balanceData?.formatted || "0").toFixed(4)} ${balanceData?.symbol || "ETH"}`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
