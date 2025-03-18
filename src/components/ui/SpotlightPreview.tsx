import React from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "./Spotlight";

export function SpotlightPreview() {
  return (
    <div className="relative flex h-[40rem] w-full overflow-hidden rounded-md bg-black/[0.96] antialiased md:items-center md:justify-center">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]",
        )}
      />

      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
        <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
          PiCORE 
        </h1>
        <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 mt-2 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-4xl">
          Harvest the Future with BTCFi and AI
        </h1>
        {/* <p className="mx-auto mt-4 max-w-2xl text-center text-base font-normal text-neutral-300">
          Harvest the Future with BTCFi and AI
        </p> */}
        <button className="bg-black dark:bg-white ml-142 mt-6 rounded-full w-fit text-white dark:text-black px-4 py-2">
          Get Started
        </button>
      </div>
    </div>
  );
}
