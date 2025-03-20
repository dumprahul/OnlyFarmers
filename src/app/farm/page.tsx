'use client';
import { useState, useEffect } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../../utils/config'; // Adjust the path as needed

export default function FarmDetails() {
  const { address: walletAddress, isConnected } = useAccount();
  const [farmId, setFarmId] = useState<string>('1');
  
  // Read farm info from contract using connected wallet address
  const { data: farmInfo, refetch, isLoading, isError, error } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'getFarmInfo',
    args: [BigInt(farmId)],
    account: walletAddress, // This ensures the call is made from the connected wallet
    enabled: isConnected && !!walletAddress,
  });

  // Parse returned data
  const parsedFarmInfo = farmInfo ? {
    farmHealth: farmInfo[0].toString(),
    yieldScore: farmInfo[1].toString(),
    farmAPY: farmInfo[2].toString(),
    farmerAddress: farmInfo[3] as string,
    farmTotalStaked: farmInfo[4].toString()
  } : null;

  // Refetch data when farmId or wallet address changes
  useEffect(() => {
    if (isConnected && walletAddress) {
      refetch();
    }
  }, [farmId, walletAddress, isConnected, refetch]);

  // Optional: Add a function to handle farm ID change
  const handleFarmIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFarmId(e.target.value);
  };

  if (!isConnected) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-300">Please connect your wallet to view farm details</p>
      </div>
    );
  }

  return (
    <div>
      {/* Farm ID selector */}
      <div className="mb-6">
        <label className="block text-gray-300 mb-2">Select Farm ID</label>
        <input
          type="number"
          min="1"
          value={farmId}
          onChange={handleFarmIdChange}
          className="bg-gray-800 text-white border border-gray-600 rounded px-4 py-2 w-full"
        />
      </div>

      {/* Connected wallet info */}
      <div className="mb-6 p-4 bg-gray-900 border border-gray-700 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Connected Wallet</span>
          <span className="font-mono text-blue-400">
            {walletAddress?.substring(0, 6) + 
              '...' + 
              walletAddress?.substring(walletAddress.length - 4)}
          </span>
        </div>
      </div>

      {isLoading && (
        <div className="text-blue-400 mb-4">Loading farm data...</div>
      )}
      
      {isError && (
        <div className="text-red-500 mb-4">Error loading farm data: {error?.message}</div>
      )}
      
      <div className="space-y-4 text-lg text-neutral-100 font-medium">
        <div className="p-4 bg-black border border-gray-600 rounded-lg flex justify-between items-center">
          <span className="text-gray-400">Farm Health</span>
          <span className="font-semibold text-white">
            {isLoading ? '...' : parsedFarmInfo?.farmHealth || '0'}
          </span>
        </div>
        
        <div className="p-4 bg-black border border-gray-600 rounded-lg flex justify-between items-center">
          <span className="text-gray-400">Yield Score</span>
          <span className="font-semibold text-white">
            {isLoading ? '...' : parsedFarmInfo?.yieldScore || '0'}
          </span>
        </div>
        
        <div className="p-4 bg-black border border-gray-600 rounded-lg flex justify-between items-center">
          <span className="text-gray-400">Farm APY</span>
          <span className="font-semibold text-white">
            {isLoading ? '...' : `${parsedFarmInfo?.farmAPY || '0'}%`}
          </span>
        </div>
        
        <div className="p-4 bg-black border border-gray-600 rounded-lg flex justify-between items-center">
          <span className="text-gray-400">Farmer Address</span>
          <span className="font-mono text-blue-400">
            {isLoading ? '...' : parsedFarmInfo?.farmerAddress?.substring(0, 6) + 
              '...' + 
              parsedFarmInfo?.farmerAddress?.substring(parsedFarmInfo.farmerAddress.length - 4) || 
              '0x0'}
          </span>
        </div>
        
        <div className="p-4 bg-black border border-gray-600 rounded-lg flex justify-between items-center">
          <span className="text-gray-400">Farm Total Staked</span>
          <span className="font-mono text-blue-400">
            {isLoading ? '...' : parsedFarmInfo?.farmTotalStaked || '0'}
          </span>
        </div>
      </div>
    </div>
  );
}