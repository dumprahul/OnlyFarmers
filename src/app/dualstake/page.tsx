"use client";
import React from "react";
import DualStakeElements from "../../components/ui/DualStakeElements";

export default function DualStakePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a1a] to-black text-white py-15 px-10">
      <h1 className="bg-opacity-50 bg-gradient-to-b from-blue-300 to-neutral-500 bg-clip-text pt-3 text-center text-4xl font-bold text-transparent md:text-7xl">
        Dual Staking
      </h1>
      <p className="mx-auto mt-4 max-w-lg text-center text-base font-normal mb-4 text-neutral-300">
        Twice the Opportunity, Twice the Rewards!
      </p>
      <DualStakeElements />
    </main>
  );
}
