"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm sticky top-0 z-50 fade-in">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Web3 Dashboard
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">Multi-chain wallet & contract interface</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ConnectButton showBalance={{ smallScreen: false, largeScreen: true }} />
          </div>
        </div>
      </div>
    </header>
  );
}
