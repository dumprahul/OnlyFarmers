"use client"
import React from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "./Spotlight";
import { Dialog } from "@headlessui/react";
import { useState, useEffect } from 'react';
import { useAccount, useReadContract } from 'wagmi';
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

interface FormattedStakeInfo {
  stakedAmount: string;
  farmId: number;
  potentialReward: string;
  timeStakedDays: number;
  farmAPY: number;
  farmerAddress: `0x${string}`;
}



export function SpotlightPreview2() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWarningOpen, setIsWarningOpen] = useState(false);


  const { address, isConnected } = useAccount();
  const [formattedStakeInfo, setFormattedStakeInfo] = useState<FormattedStakeInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

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
        
        // Convert from wei to Core tokens
        const toCore = (value: bigint) => (Number(value) / 1e18).toFixed(4);

        setFormattedStakeInfo({
          stakedAmount: toCore(stakedAmount),
          farmId: Number(farmId),
          potentialReward: toCore(potentialReward),
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
    
    <div className="relative flex h-full w-full overflow-hidden rounded-md bg-black/[0.96] antialiased md:items-center md:justify-center">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]",
        )}
      />

      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
      <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
        <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
          Dashboard 
        </h1>
        <h2 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 mt-4 to-neutral-400 bg-clip-text text-center text-4xl font-normal text-transparent md:text-2xl">
          Connect you wallet to see your stakes
        </h2>

        {/* Input Field */}
        {/* <div className="flex flex-col gap-2 w-80 mx-auto mt-4">
          <input
            type="text"
            id="address"
            placeholder="Enter your address"
            className="w-full p-3 rounded-xl border border-gray-400 bg-transparent text-black placeholder-gray-600 shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-white"
          />
        </div> */}

        {/* View Stakes Button */}
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-black dark:bg-white mt-6 rounded-full w-fit text-white dark:text-black px-4 py-2 mx-auto block"
        >
          Connect Wallet
        </button>
      </div>

      {/* Stake Information Modal */}
<Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
  <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white dark:bg-black p-8 shadow-xl border border-gray-300 dark:border-gray-700">

      {/* Modal Title */}
      <Dialog.Title className="text-2xl font-semibold text-center text-black dark:text-white">
        Stake Information
      </Dialog.Title>

      {/* Information Section */}
      <div className="mt-6 space-y-4">
      {formattedStakeInfo ? (
  <>
    <div className="flex justify-between border-b border-gray-300 dark:border-gray-700 pb-3">
      <span className="text-gray-600 dark:text-gray-300">Staked Amount:</span>
      <span className="font-medium text-black dark:text-white">
        {formattedStakeInfo.stakedAmount} CORE
      </span>
    </div>
    <div className="flex justify-between border-b border-gray-300 dark:border-gray-700 pb-3">
      <span className="text-gray-600 dark:text-gray-300">Farm ID:</span>
      <span className="font-medium text-black dark:text-white">
        {formattedStakeInfo.farmId}
      </span>
    </div>
    <div className="flex justify-between border-b border-gray-300 dark:border-gray-700 pb-3">
      <span className="text-gray-600 dark:text-gray-300">Time Staked:</span>
      <span className="font-medium text-black dark:text-white">
        {formattedStakeInfo.timeStakedDays.toFixed(2)} days
      </span>
    </div>
    <div className="flex justify-between border-b border-gray-300 dark:border-gray-700 pb-3">
      <span className="text-gray-600 dark:text-gray-300">Farm APY:</span>
      <span className="font-medium text-black dark:text-white">
        {formattedStakeInfo.farmAPY.toFixed(2)}%
      </span>
    </div>
    <div className="flex justify-between pt-1">
      <span className="text-gray-600 dark:text-gray-300">Farmer Address:</span>
      <span className="font-medium text-black dark:text-white">
        {formattedStakeInfo.farmerAddress}
      </span>
    </div>
  </>
) : (
  <div className="text-center text-gray-500">
    No stake information available.
  </div>
)}

      </div>

      
      <div className="mt-6 flex justify-center">
        <button 
          onClick={() => setIsWarningOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg shadow-lg transition-all">
          Withdraw
        </button>
      </div>
    </Dialog.Panel>
  </div>
</Dialog>

            {/* Withdraw Button
            <button
              onClick={() => setIsWarningOpen(true)}
              className="mt-6 w-full bg-red-600 text-white font-bold py-2 rounded-lg shadow-lg hover:bg-red-700"
            >
              Withdraw
            </button>
          </Dialog.Panel>
        </div>
      </Dialog> */}

      {/* Withdraw Warning Dialog */}
      <Dialog open={isWarningOpen} onClose={() => setIsWarningOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <Dialog.Panel className="relative w-full max-w-md rounded-2xl bg-white dark:bg-black p-6 shadow-xl border border-gray-300 dark:border-gray-700">


            
            {/* Close Button */}
            <button 
  onClick={() => setIsWarningOpen(false)} 
  className="absolute top-4 right-4 text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white"
>
  ✕
</button>


            <Dialog.Title className="text-xl font-bold text-center text-black dark:text-white">
              Warning!
            </Dialog.Title>
            <p className="text-center text-gray-700 dark:text-gray-300 mt-4">
              You will get <span className="font-semibold text-red-600">penalised by 10%</span>.
            </p>

            {/* Proceed Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setIsWarningOpen(false)}
                className="bg-black dark:bg-white text-white dark:text-black font-semibold px-4 py-2 rounded-lg hover:shadow-md transition"
              >
                Proceed
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
