"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm sticky top-0 z-50 fade-in">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2">
          {/* Logo and Title */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg flex-shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent truncate">
                Web3 Dashboard
              </h1>
              <p className="text-xs text-gray-500 hidden md:block">Multi-chain wallet & contract interface</p>
            </div>
          </div>
          
          {/* Connect Button */}
          <div className="flex items-center flex-shrink-0">
            <ConnectButton 
              showBalance={{ 
                smallScreen: false, 
                largeScreen: true 
              }}
              chainStatus={{ 
                smallScreen: "icon", 
                largeScreen: "full" 
              }}
              accountStatus={{
                smallScreen: "avatar",
                largeScreen: "full"
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}