"use client";

import { useEffect, useState } from "react";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { MESSAGE_BOARD_ABI } from "../../lib/contract";

export default function MessageBoard() {
  const contractAddress = process.env
    .NEXT_PUBLIC_MESSAGE_CONTRACT_ADDRESS as `0x${string}`;
  const { address, isConnected } = useAccount();

  const [newMessage, setNewMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    data: message,
    isFetching: loadingRead,
    refetch: refetchMessage,
  } = useReadContract({
    address: contractAddress,
    abi: MESSAGE_BOARD_ABI,
    functionName: "message",
  });

  const {
    data: hash,
    writeContract,
    isPending: txLoading,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isSuccess) {
      setSuccessMessage("Message updated successfully!");
      setNewMessage("");
      refetchMessage();
    }
  }, [isSuccess, refetchMessage]);

  const handleWriteMessage = async () => {
    setError(null);
    setSuccessMessage(null);

    if (!isConnected) {
      setError("Please connect your wallet first.");
      return;
    }

    if (!contractAddress) {
      setError(
        "Contract address not found. Add NEXT_PUBLIC_MESSAGE_CONTRACT_ADDRESS in your .env file."
      );
      return;
    }

    try {
      await writeContract({
        address: contractAddress,
        abi: MESSAGE_BOARD_ABI,
        functionName: "setMessage",
        args: [newMessage],
      });
    } catch (err: any) {
      console.error(err);
      setError(err?.shortMessage || err?.message || "Transaction failed");
    }
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Contract address info */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
        <div className="text-sm text-gray-600 mb-1 font-medium">
          Contract Address
        </div>
        <div className="font-mono text-sm bg-white rounded-lg px-3 py-2 border border-blue-200">
          {contractAddress ?? "NOT SET"}
        </div>
      </div>

      {/* Current Message */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Current Message
          </h3>
          <button
            onClick={() => refetchMessage()}
            disabled={loadingRead}
            className="px-4 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
          >
            Refresh
          </button>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 border-2 border-gray-200 min-h-[100px] flex items-center justify-center">
          {loadingRead ? (
            <span className="text-gray-500">Loading message...</span>
          ) : (
            <p className="text-lg text-gray-800 font-medium italic">
              {message ?? "No message available"}
            </p>
          )}
        </div>
      </div>

      {/* Update Message */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Update Message
        </h3>

        <textarea
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none resize-none"
          rows={3}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Write your new message here..."
        />

        <button
          onClick={handleWriteMessage}
          disabled={!isConnected || txLoading || !newMessage}
          className="w-full mt-4 px-6 py-4 rounded-xl font-semibold transition-all focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:opacity-50 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg flex items-center justify-center gap-3"
        >
          {txLoading || isConfirming ? (
            <>
              <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Sending...</span>
            </>
          ) : (
            <span>Set Message</span>
          )}
        </button>
      </div>

      {/* Success or Error Alerts */}
      {error && (
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-red-700">
          <strong>Error:</strong> {error}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 text-green-700">
          ✅ {successMessage}
        </div>
      )}

      {!isConnected && (
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 text-yellow-700">
          ⚠️ Connect your wallet to interact with the contract.
        </div>
      )}
    </div>
  );
}
