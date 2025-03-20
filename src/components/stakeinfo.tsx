"use client"
import { useState, useEffect } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { formatEther } from 'viem';

// Contract ABI for the getStakeInfo function
const contractAbi = [
  {
    inputs: [{ name: "_address", type: "address" }],
    name: "getStakeInfo",
    outputs: [
      { name: "stakedAmount", type: "uint256" },
      { name: "farmId", type: "uint256" },
      { name: "potentialReward", type: "uint256" },
      { name: "timeStaked", type: "uint256" },
      { name: "farmAPY", type: "uint256" },
      { name: "farmerAddress", type: "address" }
    ],
    stateMutability: "view",
    type: "function"
  }
] as const;

// Interface for formatted stake info
interface FormattedStakeInfo {
  stakedAmount: string;
  farmId: number;
  potentialReward: string;
  timeStakedDays: number;
  farmAPY: number;
  farmerAddress: `0x${string}`;
}

export default function StakeInfoComponent() {
  const { address, isConnected } = useAccount();
  const [formattedStakeInfo, setFormattedStakeInfo] = useState<FormattedStakeInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Replace with your actual contract address
  const contractAddress = '0xBb18d4C99aB77b6986a19155690E76eECee1f186' as `0x${string}`;

  // Read contract data using wagmi hook
  const { 
    data: stakeInfo, 
    isError, 
    isLoading, 
    error: contractError 
  } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getStakeInfo',
    args: address ? [address] : undefined,
    enabled: isConnected && !!address,
  });

  // Format the stake info when data is available
  useEffect(() => {
    if (stakeInfo && Array.isArray(stakeInfo)) {
      try {
        const [stakedAmount, farmId, potentialReward, timeStaked, farmAPY, farmerAddress] = stakeInfo;
        
        setFormattedStakeInfo({
          stakedAmount: formatEther(stakedAmount),
          farmId: Number(farmId),
          potentialReward: formatEther(potentialReward),
          timeStakedDays: Number(timeStaked) / 86400, // Convert seconds to days
          farmAPY: Number(farmAPY) / 100, // Assuming APY is stored as percentage * 100
          farmerAddress: farmerAddress
        });
        setError(null);
      } catch (err) {
        console.error("Error formatting stake info:", err);
        setError("Failed to format stake information.");
      }
    }
  }, [stakeInfo]);

  // Handle errors
  useEffect(() => {
    if (isError) {
      console.error("Contract error:", contractError);
      
      // Check if it's the "No active stake found" error from the contract
      if (contractError?.message?.includes("No active stake found")) {
        setError("You don't have an active stake in this farm.");
      } else {
        setError("Error fetching stake info: " + (contractError?.message || "Unknown error"));
      }
      
      setFormattedStakeInfo(null);
    }
  }, [isError, contractError]);

  return (
    <div className="p-6 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Your Staking Information</h2>
      
      {!isConnected && (
        <div className="p-4 bg-yellow-100 rounded-md">
          Please connect your wallet to view your stake information.
        </div>
      )}
      
      {isConnected && isLoading && (
        <div className="p-4">Loading stake information...</div>
      )}
      
      {isConnected && error && (
        <div className="p-4 bg-red-100 rounded-md">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
        </div>
      )}
      
      {isConnected && !isLoading && !error && !formattedStakeInfo && (
        <div className="p-4 bg-yellow-100 rounded-md">
          No stake information found. You might not have an active stake.
        </div>
      )}
      
      {formattedStakeInfo && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-gray-100 rounded-md">
            <p className="text-sm text-gray-500">Staked Amount</p>
            <p className="text-lg font-medium">{formattedStakeInfo.stakedAmount} ETH</p>
          </div>
          
          <div className="p-3 bg-gray-100 rounded-md">
            <p className="text-sm text-gray-500">Farm ID</p>
            <p className="text-lg font-medium">{formattedStakeInfo.farmId}</p>
          </div>
          
          <div className="p-3 bg-gray-100 rounded-md">
            <p className="text-sm text-gray-500">Potential Reward</p>
            <p className="text-lg font-medium">{formattedStakeInfo.potentialReward} ETH</p>
          </div>
          
          <div className="p-3 bg-gray-100 rounded-md">
            <p className="text-sm text-gray-500">Time Staked</p>
            <p className="text-lg font-medium">{formattedStakeInfo.timeStakedDays.toFixed(2)} days</p>
          </div>
          
          <div className="p-3 bg-gray-100 rounded-md">
            <p className="text-sm text-gray-500">Farm APY</p>
            <p className="text-lg font-medium">{formattedStakeInfo.farmAPY.toFixed(2)}%</p>
          </div>
          
          <div className="p-3 bg-gray-100 rounded-md">
            <p className="text-sm text-gray-500">Farmer Address</p>
            <p className="text-lg font-medium truncate">{formattedStakeInfo.farmerAddress}</p>
          </div>
        </div>
      )}
      
      <div className="mt-4 p-3 border-t pt-4">
        <p className="text-sm">Connected Address: {address || "Not connected"}</p>
        <p className="text-sm">Contract: {contractAddress}</p>
      </div>
    </div>
  );
}