import "./globals.css";
import type { ReactNode } from "react";
import Providers from "../components/Providers";

export const metadata = {
  title: "Web3 Dashboard - Multi-chain Wallet & Contract Interface",
  description: "Professional Web3 dashboard with RainbowKit, wagmi. Support for Ethereum, Polygon, Arbitrum, Optimism, Base & Sepolia testnet."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
