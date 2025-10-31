"use client";
import { useQuery } from "@tanstack/react-query";

type Token = { name: string; symbol: string; balance: number };

export default function TokenList() {
  const { data, isLoading, error } = useQuery<Token[]>({
    queryKey: ["mockTokens"],
    queryFn: async () => {
      const res = await fetch("/api/tokens");
      if (!res.ok) throw new Error("Failed to fetch tokens");
      return res.json();
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-3 fade-in">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full shimmer"></div>
                <div className="space-y-2">
                  <div className="h-4 w-24 shimmer rounded"></div>
                  <div className="h-3 w-16 shimmer rounded"></div>
                </div>
              </div>
              <div className="h-5 w-20 shimmer rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-center fade-in">
        <svg className="w-8 h-8 text-red-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-sm text-red-600 font-medium">Failed to load tokens</p>
      </div>
    );
  }

  const tokenIcons = [
    { symbol: "ETH", gradient: "from-blue-500 to-purple-500" },
    { symbol: "USDC", gradient: "from-blue-400 to-blue-600" },
    { symbol: "DAI", gradient: "from-yellow-400 to-orange-500" },
    { symbol: "USDT", gradient: "from-green-400 to-teal-500" },
  ];

  const getTokenGradient = (symbol: string) => {
    const found = tokenIcons.find(t => t.symbol === symbol);
    return found?.gradient || "from-gray-400 to-gray-600";
  };

  return (
    <div className="space-y-3 fade-in">
      {data?.map((token) => (
        <div 
          key={token.symbol} 
          className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getTokenGradient(token.symbol)} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                <span className="text-white font-bold text-sm">{token.symbol.slice(0, 2)}</span>
              </div>
              <div>
                <div className="font-semibold text-gray-800">{token.name}</div>
                <div className="text-xs text-gray-500 font-mono">{token.symbol}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono font-bold text-gray-800">{token.balance.toLocaleString()}</div>
              <div className="text-xs text-gray-500">tokens</div>
            </div>
          </div>
        </div>
      ))}
      
      {data && data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="text-sm">No tokens available</p>
        </div>
      )}
    </div>
  );
}
