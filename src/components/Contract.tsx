'use client';
import { useState, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect, useReadContract, useSwitchChain, useWriteContract, useBalance } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { coreTestnet } from '../utils/wagmiClient';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../utils/config';
import { parseEther, formatEther } from 'viem';

export default function YourComponent() {
  const { address, isConnected, chainId } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const [farmId, setFarmId] = useState<string>('1');
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [isStaking, setIsStaking] = useState(false);
  const [stakeError, setStakeError] = useState<string | null>(null);
  const [stakeSuccess, setStakeSuccess] = useState(false);
  
  const isCorrectNetwork = chainId === coreTestnet.id;
  
  // Get Core token balance
  const { data: coreBalance } = useBalance({
    address,
    enabled: isConnected && isCorrectNetwork,
  });
  
  // Read available farms
  const { data: farmCount } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'farmCount',
    enabled: isConnected && isCorrectNetwork,
  });
  
  // Use the new write contract hook
  const { writeContract, isPending: isWritePending, isSuccess, isError, error } = useWriteContract();
  
  const connectWallet = async () => {
    try {
      await connect({ connector: injected() });
    } catch (err) {
      console.error('Failed to connect:', err);
    }
  };
  
  const switchToCorrectNetwork = async () => {
    try {
      await switchChain({ chainId: coreTestnet.id });
    } catch (err) {
      console.error('Failed to switch network:', err);
    }
  };
  
  // Handle staking function
  const handleStake = async (e: React.FormEvent) => {
    e.preventDefault();
    setStakeError(null);
    setStakeSuccess(false);
    
    if (!isCorrectNetwork) {
      setStakeError('Please switch to Core Testnet');
      return;
    }
    
    if (!farmId || parseInt(farmId) <= 0) {
      setStakeError('Please select a valid farm');
      return;
    }
    
    if (!amount || parseFloat(amount) <= 0) {
      setStakeError('Amount must be greater than 0');
      return;
    }
    
    // Check if user has enough CORE tokens
    if (coreBalance && parseFloat(amount) > parseFloat(formatEther(coreBalance.value))) {
      setStakeError('Insufficient CORE balance');
      return;
    }
    
    try {
      setIsStaking(true);
      
      // Use the new contract write format
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'stake',
        args: [BigInt(farmId)],
        value: parseEther(amount),
      });
      
    } catch (err: any) {
      console.error('Staking error:', err);
      setStakeError(err?.message || 'Failed to stake tokens');
      setIsStaking(false);
    }
  };
  
  // Handle write contract results
  useEffect(() => {
    if (isSuccess) {
      setStakeSuccess(true);
      setAmount('');
      setIsStaking(false);
    }
    
    if (isError && error) {
      setStakeError(error.message || 'Transaction failed');
      setIsStaking(false);
    }
  }, [isSuccess, isError, error]);
  
  // Generate farm options
  const farmOptions = [];
  if (farmCount) {
    for (let i = 1; i <= Number(farmCount); i++) {
      farmOptions.push(
        <option key={i} value={i}>
          Farm #{i}
        </option>
      );
    }
  }
  
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      {!isConnected ? (
        <button 
          onClick={connectWallet}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Connect Wallet
        </button>
      ) : !isCorrectNetwork ? (
        <div>
          <p className="text-yellow-500 mb-2">Please switch to Core Testnet</p>
          <button 
            onClick={switchToCorrectNetwork}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Switch to Core Testnet
          </button>
        </div>
      ) : (
        <div>
          <p className="mb-2">Connected to Core Testnet: {address?.substring(0, 6)}...{address?.substring(address.length - 4)}</p>
          
          {/* Display Core balance */}
          <p className="mb-4 text-gray-700">
            Your CORE Balance: {coreBalance ? parseFloat(formatEther(coreBalance.value)).toFixed(4) : '0'} CORE
          </p>
          
          {stakeError && (
            <div className="bg-red-100 p-4 rounded-md mb-4">
              <p className="text-red-800">{stakeError}</p>
            </div>
          )}
          
          {stakeSuccess && (
            <div className="bg-green-100 p-4 rounded-md mb-4">
              <p className="text-green-800">Successfully staked CORE tokens!</p>
            </div>
          )}
          
          <form onSubmit={handleStake} className="mt-4">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="farmId">
                Select Farm
              </label>
              <select
                id="farmId"
                value={farmId}
                onChange={(e) => setFarmId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isStaking || isWritePending}
              >
                {farmOptions.length > 0 ? (
                  farmOptions
                ) : (
                  <option value="1">Farm #1</option>
                )}
              </select>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="amount">
                CORE Amount to Stake
              </label>
              <div className="relative">
                <input
                  id="amount"
                  type="number"
                  step="0.0001"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.0"
                  disabled={isStaking || isWritePending}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500">CORE</span>
                </div>
              </div>
              {amount && coreBalance && parseFloat(amount) > parseFloat(formatEther(coreBalance.value)) && (
                <p className="text-red-500 text-sm mt-1">Insufficient balance</p>
              )}
            </div>
            
            <button
              type="submit"
              className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isStaking || isWritePending ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isStaking || isWritePending || (amount && coreBalance && parseFloat(amount) > parseFloat(formatEther(coreBalance.value)))}
            >
              {isStaking || isWritePending ? 'Staking...' : 'Stake CORE Tokens'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}