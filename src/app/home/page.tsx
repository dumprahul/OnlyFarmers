"use client";

import React from "react";
import { SpotlightPreview } from "@/components/ui/SpotlightPreview";
import { WobbleCardDemo } from "@/components/ui/WobbleCardDemo";
import { TimelineDemo } from "@/components/ui/TimelineDemo";


export default function Home() {
  return (

    <div className="w-full bg-black">
   
    <section className="h-screen flex flex-col overflow-hidden items-center justify-center relative">
    <SpotlightPreview/>
          </section>
    
          <section className="min-h-screen flex items-center justify-center">
          <WobbleCardDemo/>
          </section>

          <section className="min-h-screen flex items-center justify-center">
          <TimelineDemo/>
          </section>
          <hr className="border-gray-300 dark:border-neutral-700 mb-4" />
    <footer className="w-full bg-black text-white py-10">
  <div className="max-w-7xl mx-auto px-6 text-center">
    <h3 className="text-xl md:text-2xl font-semibold">PiCore</h3>
    <p className="text-sm md:text-base text-neutral-400 mt-2">
    BTCFi - AI - ZKP - Compute
    </p>
    <div className="flex justify-center gap-4 mt-4">
      <a href="#" className="text-neutral-400 hover:text-white transition">
        Privacy Policy
      </a>
      <a href="#" className="text-neutral-400 hover:text-white transition">
        Terms of Service
      </a>
      <a href="#" className="text-neutral-400 hover:text-white transition">
        Contact
      </a>
    </div>
    <p className="text-xs text-neutral-500 mt-2">
      © {new Date().getFullYear()} SheFunded. All rights reserved.
    </p>
  </div>
</footer>
   </div>
  );
}
