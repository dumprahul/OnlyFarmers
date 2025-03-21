"use client";

import { useState } from "react";

export default function DualStakeElements() {
  const [btcAmount, setBtcAmount] = useState(0);
  const [coreAmount, setCoreAmount] = useState(0);

  // Dummy calculations for projected rewards
  const projectedAPY = ((btcAmount * 0.05 + coreAmount * 0.03) / 10).toFixed(2);
  const projectedRewards = (btcAmount * 0.5 + coreAmount * 0.8).toFixed(2);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-5">
      {/* Staking Calculator Card */}
      <div className="w-full md:w-1/2 bg-[#121212] p-6 rounded-2xl shadow-lg border border-gray-800">
        <h2 className="text-2xl font-semibold text-center text-white mb-4">Staking Calculator</h2>
        <hr className="border-gray-300 dark:border-neutral-700 mb-4" />

        {/* BTC Staking */}
        <label className="block text-gray-400 mb-2">BTC Staking Amount:</label>
        <input
          type="number"
          value={btcAmount}
          onChange={(e) => setBtcAmount(parseFloat(e.target.value) || 0)}
          className="w-full p-3 rounded-xl border border-gray-700 bg-black text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          placeholder="Enter BTC amount"
        />

        {/* BTC Delegate to Validator */}
        <label className="block text-gray-400 mt-4 mb-2">Delegate to Validator:</label>
        <select className="w-full p-3 rounded-xl border border-gray-700 bg-black text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500">
          <option>Validator A</option>
          <option>Validator B</option>
          <option>Validator C</option>
        </select>

        {/* CORE Staking */}
        <label className="block text-gray-400 mt-6 mb-2">CORE Staking Amount:</label>
        <input
          type="number"
          value={coreAmount}
          onChange={(e) => setCoreAmount(parseFloat(e.target.value) || 0)}
          className="w-full p-3 rounded-xl border border-gray-700 bg-black text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          placeholder="Enter CORE amount"
        />

        {/* CORE Delegate to Validator */}
        <label className="block text-gray-400 mt-4 mb-2">Delegate to Validator:</label>
        <select className="w-full p-3 rounded-xl border border-gray-700 bg-black text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500">
          <option>Validator X</option>
          <option>Validator Y</option>
          <option>Validator Z</option>
        </select>

        {/* Proceed to Stake Button */}
        <button className="mt-6 w-60 bg-[#e4e4e7] mx-45 mt-10 text-black font-semibold py-3 rounded-xl shadow-lg hover:bg-[#292929] transition">
          Proceed to Stake
        </button>
      </div>

      {/* Summary Card */}
      <div className="w-full md:w-1/2 bg-[#121212] p-6 rounded-2xl shadow-lg border border-gray-800">
  <h2 className="text-2xl font-semibold text-white text-center mb-4">Summary</h2>
  <hr className="border-gray-300 dark:border-neutral-700 mb-4" />

  {/* Projected Annual Reward Rate */}
  <div className="bg-black p-4 rounded-xl shadow-md border border-gray-700">
    <p className="text-gray-400 text-center">Projected Annual Reward Rate:</p>
    <p className="text-4xl font-bold text-center py-4 text-blue-500">
      {btcAmount || coreAmount ? `${projectedAPY}%` : "0%"}
    </p>
  </div>

  {/* Projected Annual Rewards */}
  <div className="bg-black p-4 rounded-xl shadow-md border border-gray-700 mt-4">
    <p className="text-gray-400 text-center">Projected Annual Rewards:</p>
    <p className="text-4xl font-bold text-center py-4 text-blue-500">
      {btcAmount || coreAmount ? `${projectedRewards} CORE` : "0 CORE"}
    </p>
  </div>

  {/* Two Additional Boxes Inside the Summary Card */}
  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
    
    {/* New Staked BTC */}
    <div className="bg-black p-6 rounded-xl shadow-md border border-gray-700">
      <div className="flex justify-between items-center">
        <h3 className="text-gray-300 text-lg">New Staked BTC</h3>
        
      </div>
      <p className="text-4xl font-bold text-white mt-3">{btcAmount ? (btcAmount * 0.19 / 100).toFixed(6) : "0.00"} BTC</p>
      <p className="text-xl font-bold text-blue-500 mt-2">0.19%</p>
      <p className="text-gray-400 text-sm">Reward Rate for Selected Validators</p>
    </div>

    {/* New Staked CORE */}
    <div className="bg-black p-6 rounded-xl shadow-md border border-gray-700">
      <div className="flex justify-between items-center">
        <h3 className="text-gray-300 text-lg">New Staked CORE</h3>
        
      </div>
      <p className="text-4xl font-bold text-white mt-3">{coreAmount ? (coreAmount * 8.98 / 100).toFixed(6) : "0"} CORE</p>
      <p className="text-xl font-bold text-blue-500 mt-2">8.98%</p>
      <p className="text-gray-400 text-sm">Reward Rate for Selected Validators</p>
    </div>

  </div>
</div>

    </div>
  );
}