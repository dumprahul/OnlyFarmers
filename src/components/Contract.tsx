// src/components/Contract.tsx
'use client';

import { useState } from 'react';
import { useAccount, useConnect, useDisconnect, useWriteContract, useReadContract } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../utils/config';

export default function Contract() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [number, setNumber] = useState<string>('');
  
  // For reading the stored number
  const { data: storedNumber, refetch } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'getNumber',
  });

  // For setting a new number
  const { writeContract, isPending, isSuccess, isError, error } = useWriteContract();

  // Connect wallet
  const connectWallet = async () => {
    try {
      await connect({ connector: injected() });
    } catch (err) {
      console.error('Failed to connect:', err);
    }
  };

  // Set a new number
  const storeNumber = async () => {
    if (!isConnected || !number) return;
    
    try {
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'setNumber',
        args: [BigInt(number)], // Convert string to BigInt for uint256
      });
    } catch (err) {
      console.error('Transaction failed:', err);
    }
  };

  return (
    <div className="p-6 border rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Simple Storage</h2>
      
      {!isConnected ? (
        <div className="text-center">
          <p className="mb-4">Connect your wallet to interact with the contract</p>
          <button 
            onClick={connectWallet}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
          >
            Connect Wallet
          </button>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm truncate">Connected: {address}</p>
            <button 
              onClick={() => disconnect()}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm rounded"
            >
              Disconnect
            </button>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-2">Current Stored Number</h3>
            <div className="flex items-center justify-between">
              <p className="text-xl font-bold">{storedNumber ? storedNumber.toString() : 'Loading...'}</p>
              <button 
                onClick={() => refetch()} 
                className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm"
              >
                Refresh
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Store New Number</h3>
            <input
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="border rounded px-3 py-2 w-full mb-3"
              placeholder="Enter a number"
            />
            <button
              onClick={storeNumber}
              disabled={isPending || !number}
              className={`w-full bg-green-500 text-white px-4 py-2 rounded ${
                isPending || !number ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
              }`}
            >
              {isPending ? 'Processing...' : 'Store Number'}
            </button>
            
            {isSuccess && (
              <p className="text-green-500 mt-2 text-center">Number stored successfully!</p>
            )}
            
            {isError && (
              <p className="text-red-500 mt-2 text-center">Error: {error?.message}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}