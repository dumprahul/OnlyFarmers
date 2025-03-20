import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "./Spotlight";
import { Dialog } from "@headlessui/react";

export function SpotlightPreview2() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWarningOpen, setIsWarningOpen] = useState(false);

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
        <div className="flex justify-between border-b border-gray-300 dark:border-gray-700 pb-3">
          <span className="text-gray-600 dark:text-gray-300">Staked Amount:</span>
          <span className="font-medium text-black dark:text-white">600 tokens</span>
        </div>
        <div className="flex justify-between border-b border-gray-300 dark:border-gray-700 pb-3">
          <span className="text-gray-600 dark:text-gray-300">Farm ID:</span>
          <span className="font-medium text-black dark:text-white">bvrx263k</span>
        </div>
        <div className="flex justify-between border-b border-gray-300 dark:border-gray-700 pb-3">
          <span className="text-gray-600 dark:text-gray-300">Time Staked:</span>
          <span className="font-medium text-black dark:text-white">March 19, 2025, 14:45 PM</span>
        </div>
        <div className="flex justify-between border-b border-gray-300 dark:border-gray-700 pb-3">
          <span className="text-gray-600 dark:text-gray-300">Farm APY:</span>
          <span className="font-medium text-black dark:text-white">64%</span>
        </div>
        <div className="flex justify-between pt-1">
          <span className="text-gray-600 dark:text-gray-300">Farmer Address:</span>
          <span className="font-medium text-black dark:text-white">bdfims638</span>
        </div>
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

