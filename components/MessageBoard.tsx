"use client";

import { useEffect, useState } from "react";
import { MESSAGE_BOARD_ABI } from "../lib/contract";
import { useAccount, useWalletClient, usePublicClient } from "wagmi";
import { ethers } from "ethers";

export default function MessageBoard() {
  const contractAddress = process.env.NEXT_PUBLIC_MESSAGE_CONTRACT_ADDRESS;
  const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  const [message, setMessage] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [loadingRead, setLoadingRead] = useState(false);
  const [txLoading, setTxLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const readMessage = async () => {
    setError(null);
    setSuccessMessage(null);
    if (!contractAddress) {
      setError("Contract address not set in environment variables. Please add NEXT_PUBLIC_MESSAGE_CONTRACT_ADDRESS to your .env file.");
      return;
    }
    try {
      setLoadingRead(true);
      
      if (!rpcUrl && publicClient) {
        const data = await publicClient.readContract({
          address: contractAddress as `0x${string}`,
          abi: MESSAGE_BOARD_ABI,
          functionName: 'message',
        });
        setMessage(data as string);
      } else if (rpcUrl) {
        const provider = new ethers.JsonRpcProvider(rpcUrl);
        const contract = new ethers.Contract(contractAddress, MESSAGE_BOARD_ABI, provider);
        const m: string = await contract.message();
        setMessage(m);
      } else {
        setError("No RPC provider available. Please connect your wallet or set NEXT_PUBLIC_RPC_URL in .env file.");
      }
    } catch (err: any) {
      console.error(err);
      const errorMsg = err?.message ?? String(err);
      if (errorMsg.includes("invalid project id") || errorMsg.includes("401")) {
        setError("Invalid RPC URL. Please update NEXT_PUBLIC_RPC_URL in your .env file with a valid endpoint.");
      } else if (errorMsg.includes("could not decode result") || errorMsg.includes("BAD_DATA") || errorMsg.includes("0x")) {
        setError("Contract not found or not deployed at this address. Please deploy the MessageBoard contract on Sepolia testnet and update NEXT_PUBLIC_MESSAGE_CONTRACT_ADDRESS in your .env file. See SETUP_GUIDE.md for deployment instructions.");
      } else if (errorMsg.includes("network")) {
        setError("Network error. Please check your internet connection and RPC URL.");
      } else {
        setError(errorMsg);
      }
    } finally {
      setLoadingRead(false);
    }
  };

  useEffect(() => {
    if (contractAddress) {
      readMessage();
    }
  }, [contractAddress, publicClient]);

  const writeMessage = async () => {
    setError(null);
    setSuccessMessage(null);
    if (!walletClient) {
      setError("Wallet not connected (no wallet client).");
      return;
    }
    if (!contractAddress) {
      setError("Contract address not set in environment variables.");
      return;
    }
    try {
      setTxLoading(true);

      const provider = new ethers.BrowserProvider(walletClient.transport);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(contractAddress, MESSAGE_BOARD_ABI, signer);
      const tx = await contract.setMessage(newMessage);
      await tx.wait();

      setSuccessMessage("Message updated successfully!");
      setNewMessage("");
      await readMessage();
    } catch (err: any) {
      console.error(err);
      setError(err?.message ?? "Transaction failed");
    } finally {
      setTxLoading(false);
    }
  };

  return (
    <div className="space-y-6 fade-in">
      {!contractAddress && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 fade-in">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="font-semibold text-blue-800 mb-1">Setup Required</h4>
              <p className="text-sm text-blue-700 mb-2">
                To use the MessageBoard contract, please:
              </p>
              <ol className="text-sm text-blue-700 list-decimal list-inside space-y-1 ml-2">
                <li>Deploy the MessageBoard contract on Sepolia (see SETUP_GUIDE.md)</li>
                <li>Add contract address to <code className="bg-blue-100 px-1 rounded">.env</code> file</li>
                <li>Restart the dev server</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-xs font-medium text-gray-600">Contract Address</span>
        </div>
        <div className="font-mono text-sm text-gray-800 break-all bg-white rounded-lg px-3 py-2 border border-blue-200">
          {contractAddress ?? "NOT SET"}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Current Message</h3>
          </div>
          <button
            onClick={readMessage}
            disabled={loadingRead}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className={`w-4 h-4 ${loadingRead ? "animate-spin" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 border-2 border-gray-200 min-h-[120px] flex items-center justify-center">
          {loadingRead ? (
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600">Loading message...</span>
            </div>
          ) : (
            <p className="text-lg text-gray-800 text-center font-medium italic">
              "{message ?? "No message available"}"
            </p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Update Message</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Message</label>
            <textarea
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none resize-none"
              rows={3}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Write your message here..."
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">{newMessage.length} characters</span>
            </div>
          </div>

          <button
            onClick={writeMessage}
            disabled={txLoading || !newMessage || !isConnected}
            className="w-full px-6 py-4 rounded-xl font-semibold transition-all cursor-pointer focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
          >
            {txLoading ? (
              <>
                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Sending Transaction...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <span>Set Message</span>
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3 fade-in">
          <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-semibold text-red-800">Error</h4>
            <p className="text-sm text-red-600 mt-1">{error}</p>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-start gap-3 fade-in">
          <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-semibold text-green-800">Success</h4>
            <p className="text-sm text-green-600 mt-1">{successMessage}</p>
          </div>
        </div>
      )}

      {!isConnected && (
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 flex items-start gap-3 fade-in">
          <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <h4 className="font-semibold text-yellow-800">Wallet Not Connected</h4>
            <p className="text-sm text-yellow-600 mt-1">Connect your wallet to send transactions to the smart contract.</p>
          </div>
        </div>
      )}
    </div>
  );
}
