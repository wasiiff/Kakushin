import WalletInfo from "./components/WalletInfo";
import MessageBoard from "./components/MessageBoard";
import TokenList from "./components/TokenList";
import Header from "./components/Header";

export default function Page() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 fade-in">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Welcome to Your Dashboard
            </h2>
            <p className="text-gray-600">
              Connect your wallet and interact with smart contracts across multiple chains
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 p-6 fade-in hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Wallet</h2>
                </div>
                <WalletInfo />
              </div>

              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 p-6 fade-in hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Your Tokens</h2>
                </div>
                <TokenList />
              </div>
            </div>

            <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 p-6 fade-in hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-800">Smart Contract Interaction</h2>
              </div>
              <MessageBoard />
            </div>
          </div>

          <footer className="mt-12 text-center text-sm text-gray-500 pb-8 fade-in">
            <p>Built with Next.js, RainbowKit, and wagmi</p>
            <p className="mt-1">Supporting Ethereum, Polygon, Arbitrum, Optimism, Base & Sepolia</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
