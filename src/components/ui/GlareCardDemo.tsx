"use client";
import React from "react";
import { useState,useEffect } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "./animated-modal";
import { GlareCard } from "../ui/glare-card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../../utils/config'; // Adjust the path as needed
import { useAccount, useConnect, useDisconnect, useReadContract, useSwitchChain, useWriteContract, useBalance } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { coreTestnet } from '../../utils/wagmiClient';
import { parseEther,formatEther } from "viem";




// Sample data for the graph
const data = [
  { name: "Jan", yield: 50 },
  { name: "Feb", yield: 55 },
  { name: "Mar", yield: 65 },
  { name: "Apr", yield: 70 },
  { name: "May", yield: 72 },
];


  

export function GlareCardDemo() {
  const { address, isConnected, chainId } = useAccount();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const { connect } = useConnect();
  const [farmId, setFarmId] = useState<string>('1');
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");

  const [isStaking, setIsStaking] = useState(false);
  const [stakeError, setStakeError] = useState<string | null>(null);
  const [stakeSuccess, setStakeSuccess] = useState(false);

  const isCorrectNetwork = chainId === coreTestnet.id;


  const { data: coreBalance } = useBalance({
    address,
    enabled: isConnected && isCorrectNetwork,
  });

  const { data: farmCount } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'farmCount',
    enabled: isConnected && isCorrectNetwork,
  });

  const { writeContract, isPending: isWritePending, isSuccess, isError, error } = useWriteContract();

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
    
    if (!duration) {
      setStakeError('Please select a staking duration');
      return;
    }
    
    // Check if user has enough CORE tokens
    if (coreBalance && parseFloat(amount) > parseFloat(formatEther(coreBalance.value))) {
      setStakeError('Insufficient CORE balance');
      return;
    }
    
    try {
      setIsStaking(true);
      
      // Get duration in seconds based on selection
      let durationInSeconds;
      switch (duration) {
        case '3 months':
          durationInSeconds = 7776000; // 90 days
          break;
        case '6 months':
          durationInSeconds = 15552000; // 180 days
          break;
        case '1 year':
          durationInSeconds = 31104000; // 360 days
          break;
        default:
          durationInSeconds = 7776000; // Default to 3 months
      }
      
      // Use the contract write format
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'stake',
        args: [BigInt(farmId)],
        value: parseEther(amount),
      });

      // args: [BigInt(farmId), BigInt(durationInSeconds)],
      
    } catch (err: any) {
      console.error('Staking error:', err);
      setStakeError(err?.message || 'Failed to stake tokens');
      setIsStaking(false);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setStakeSuccess(true);
      setAmount('');
      setDuration('');
      setIsStaking(false);
    }
    
    if (isError && error) {
      setStakeError(error.message || 'Transaction failed');
      setIsStaking(false);
    }
  }, [isSuccess, isError, error]);
  
  

  const connectAndSwitchNetwork = async () => {
    try {
      await connect({ connector: injected() }); // Connect to wallet
      await switchChain({ chainId: coreTestnet.id }); // Switch to the correct network
    } catch (err) {
      console.error('Error during connection or network switch:', err);
    }
  };
  

  const { data: farmInfo, refetch, isLoading } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'getFarmInfo',
    args: [BigInt(farmId)],
  });

  const parsedFarmInfo = farmInfo ? {
    farmHealth: farmInfo[0].toString(),
    yieldScore: farmInfo[1].toString(),
    farmAPY: farmInfo[2].toString(),
    farmerAddress: farmInfo[3] as string,
    farmTotalStaked: farmInfo[4].toString()
  } : null;

  useEffect(() => {
    refetch();
  }, [farmId, refetch]);




  return (
    <div className="w-full bg-black">
      
    <div className="ml-5 grid grid-cols-1 md:grid-cols-4 px-20 py-2 gap-10">
      <Modal>
        <ModalTrigger>
          <GlareCard className="flex flex-col items-start justify-end py-8 px-6">
            <p className="font-bold text-white text-lg">Max Yield : 72%</p>
            <p className="font-normal text-base text-neutral-200 mt-4">
              Farm ID : 1 <br />
            </p>
            <p className="font-normal text-base text-neutral-200">
              PiCore ID : PiC25
            </p>
          </GlareCard>
        </ModalTrigger>
        <ModalBody>
        <ModalContent>
  <h4 className="text-xl md:text-2xl text-neutral-800 dark:text-neutral-100 font-bold text-center mb-4">
    Does this look like an{" "}
    <span className="px-2 py-1 rounded-lg bg-gray-200 dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 ml-1">
      Opportunity
    </span>
    {" "}?
  </h4>

  <hr className="border-gray-300 dark:border-neutral-700 py-2 mb-4" />

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
        
        {/* <div className="p-4 bg-black border border-gray-600 rounded-lg flex justify-between items-center">
          <span className="text-gray-400">Farm Total Staked</span>
          <span className="font-mono text-blue-400">
            {isLoading ? '...' : parsedFarmInfo?.farmTotalStaked || '0'}
          </span>
        </div> */}
        <div className="p-4 bg-black border border-gray-600 rounded-lg flex justify-between items-center overflow-hidden">
  <span className="text-gray-400">Tx-</span>
  <a
    href="https://scan.test2.btcs.network/tx/0xbaf6823b7930011159ee034c81b43a47bc1a0a22e32237911deb8f18166300d6"
    target="_blank"
    rel="noopener noreferrer"
    className="font-mono text-blue-400 truncate"
  >
    https://scan.test2.btcs.network/tx/0xbaf6823b7930011159ee034c81b43a47bc1a0a22e32237911deb8f18166300d6
  </a>
</div>

      </div>
</ModalContent>


<ModalFooter className="flex justify-center gap-75 mt-6">
  <Modal>
  <ModalTrigger>
    <div 
      className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-2 rounded-md border border-black w-28 cursor-pointer"
      onClick={connectAndSwitchNetwork}
    >
      Connect Wallet
    </div>
  </ModalTrigger>
    <ModalBody>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
              Take a look at the{" "}
              <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                Progress
              </span>{" "}
              over months!
            </h4>

            <h2 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
              Max Yield : 72%
            </h2>

            {/* Line Graph */}
            <div className="w-full pr-10 h-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="yield" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

          </ModalContent>
          
        </ModalBody>
      
      </Modal>

      <Modal>
        <ModalTrigger>
            <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-2 rounded-md border border-black w-28" onClick={connectAndSwitchNetwork}>
              Connect Wallet
            </button>
            </ModalTrigger>
            
        <ModalBody>
        <ModalContent>
  <h4 className="text-xl md:text-2xl text-neutral-800 dark:text-neutral-100 font-bold text-center mb-6">
    Are you ready to{" "}
    <span className="px-2 py-1 rounded-lg bg-gray-200 dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 mx-1">
      Stake
    </span>
    {" "}on this field?
  </h4>

  <hr className="border-gray-300 dark:border-neutral-700 mb-4" />
  

  <div className="max-w-md mx-auto p-6 bg-gray-900 rounded-lg shadow-lg">
      {!isConnected ? (
        <div className="flex justify-center">
          <button 
            onClick={connectAndSwitchNetwork}
            className="w-36 py-3 text-lg font-semibold tracking-wide rounded-full border border-gray-500 bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Connect Wallet
          </button>
        </div>
      ) : !isCorrectNetwork ? (
        <div className="flex flex-col items-center">
          <p className="text-yellow-500 mb-4">Please switch to Core Testnet</p>
          <button 
            onClick={connectAndSwitchNetwork}
            className="w-48 py-3 text-lg font-semibold tracking-wide rounded-full border border-yellow-500 bg-gradient-to-b from-gray-900 to-gray-800 text-yellow-400 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Switch to Core Testnet
          </button>
        </div>
      ) : (
        <form onSubmit={handleStake}>
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <p className="text-gray-400">Connected: {address?.substring(0, 6)}...{address?.substring(address.length - 4)}</p>
              <p className="text-gray-400">
                Balance: {coreBalance ? parseFloat(formatEther(coreBalance.value)).toFixed(4) : '0'} CORE
              </p>
            </div>
          </div>
          
          {stakeError && (
            <div className="p-4 mb-4 bg-red-900/30 border border-red-700 rounded-lg">
              <p className="text-red-400">{stakeError}</p>
            </div>
          )}
          
          {stakeSuccess && (
            <div className="p-4 mb-4 bg-green-900/30 border border-green-700 rounded-lg">
              <p className="text-green-400">Successfully staked CORE tokens!</p>
            </div>
          )}
          
          {/* Farm Selection */}
          <div className="p-4 bg-black border border-gray-600 rounded-lg mb-4">
            <div className="mb-2 text-gray-400">Select Farm</div>
            <select
              id="farmId"
              value={farmId}
              onChange={(e) => setFarmId(e.target.value)}
              className="w-full p-4 bg-gray-900 text-white border border-gray-700 rounded-lg focus:ring focus:ring-indigo-400"
              disabled={isStaking || isWritePending}
            >
              {farmCount ? (
                Array.from({ length: Number(farmCount) }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Farm #{i + 1}
                  </option>
                ))
              ) : (
                <option value="1">Farm #1</option>
              )}
            </select>
          </div>
          
          {/* CORE Staking Amount */}
          <div className="p-4 mt-5 bg-black border border-gray-600 rounded-lg">
            <div className="flex justify-between items-center mb-2 text-gray-400">
              <span>CORE Staking Amount</span>
            </div>
            <div className="flex items-center bg-gray-900 border border-gray-700 rounded-lg p-2">
              <input
                id="amount"
                type="text"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none p-2"
                disabled={isStaking || isWritePending}
              /> 
              <span className="text-gray-400 pr-2">CORE</span>
            </div>
            {amount && coreBalance && parseFloat(amount) > parseFloat(formatEther(coreBalance.value)) && (
              <p className="text-red-500 text-sm mt-1">Insufficient balance</p>
            )}
          </div>
          
          {/* Duration Selection */}
          <div className="p-4 bg-black border border-gray-600 rounded-lg mt-4">
            <div className="mb-2 text-gray-400">Duration of the Stake</div>
            <select
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-4 bg-gray-900 text-white border border-gray-700 rounded-lg focus:ring focus:ring-indigo-400"
              disabled={isStaking || isWritePending}
            >
              <option value="" disabled>Select duration</option>
              <option value="3 months">3 Months</option>
              <option value="6 months">6 Months</option>
              <option value="1 year">1 Year</option>
            </select>
          </div>
          
          {/* Confirm Button */}
          <div className="pt-6 flex justify-center">
            <button 
              type="submit"
              disabled={isStaking || isWritePending || !amount || !duration || (amount && coreBalance && parseFloat(amount) > parseFloat(formatEther(coreBalance.value)))}
              className={`w-36 py-3 text-lg font-semibold tracking-wide rounded-full border border-gray-500 bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out ${
                isStaking || isWritePending || !amount || !duration || (amount && coreBalance && parseFloat(amount) > parseFloat(formatEther(coreBalance.value))) 
                  ? 'opacity-50 cursor-not-allowed' 
                  : ''
              }`}
            >
              {isStaking || isWritePending ? 'Staking...' : 'Confirm'}
            </button>
          </div>
        </form>
      )}
    </div>

</ModalContent>
        </ModalBody>
      </Modal>
          </ModalFooter>
        </ModalBody>
      
      </Modal>
      <GlareCard className="flex flex-col items-start justify-end py-8 px-6">
        <p className="font-bold text-white text-lg">Max Yield : 24%</p>
        <p className="font-normal text-base text-neutral-200 mt-4">
          Farmer ID : 945xrkc73a <br/>
          PiCore ID : PiC67
        </p>
      </GlareCard>
      <GlareCard className="flex flex-col items-start justify-end py-8 px-6">
        <p className="font-bold text-white text-lg">Max Yield : 66%</p>
        <p className="font-normal text-base text-neutral-200 mt-4">
          Farmer ID : 407mkwl14q <br/>
          PiCore ID : PiC94
        </p>
      </GlareCard>
      <GlareCard className="flex flex-col items-start justify-end py-8 px-6">
        <p className="font-bold text-white text-lg">Max Yield : 50%</p>
        <p className="font-normal text-base text-neutral-200 mt-4">
          Farmer ID : 138eoins30u <br/>
          PiCore ID : PiC22
        </p>
      </GlareCard>
      <GlareCard className="flex flex-col items-start justify-end py-8 px-6">
        <p className="font-bold text-white text-lg">Max Yield : 38%</p>
        <p className="font-normal text-base text-neutral-200 mt-4">
          Farmer ID : 6923akex56h<br/>
          PiCore ID : PiC71
        </p>
      </GlareCard>
      <GlareCard className="flex flex-col items-start justify-end py-8 px-6">
        <p className="font-bold text-white text-lg">Max Yield : 71%</p>
        <p className="font-normal text-base text-neutral-200 mt-4">
          Farmer ID : 2956iejd94g<br/>
          PiCore ID : PiC103
        </p>
      </GlareCard>
      <GlareCard className="flex flex-col items-start justify-end py-8 px-6">
        <p className="font-bold text-white text-lg">Max Yield : 65%</p>
        <p className="font-normal text-base text-neutral-200 mt-4">
          Farmer ID : 9537nfvx85s<br/>
          PiCore ID : PiC113
        </p>
      </GlareCard>
      <GlareCard className="flex flex-col items-start justify-end py-8 px-6">
        <p className="font-bold text-white text-lg">Max Yield : 48%</p>
        <p className="font-normal text-base text-neutral-200 mt-4">
          Farmer ID : 9473nflk47z<br/>
          PiCore ID : PiC89
        </p>
      </GlareCard>
    </div>
    </div>
  );
}
