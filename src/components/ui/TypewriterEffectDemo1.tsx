"use client";
import { TypewriterEffect } from "../ui/typewriter-effect";

export function TypewriterEffectDemo1() {
  const words = [
    {
      text: "Start",
    },
    {
      text: "yielding",
    },
    {
      text: "with",
    },
    {
      text: "our",
    },
    {
      text: "PiCompute.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="pt-15 pb-2"> 
      <TypewriterEffect words={words} />
      <p className="mx-auto mt-4 max-w-lg text-center text-base font-normal text-neutral-300">
        Find the best farmers and fields to stake on using PiCompute for a profitable exchange!
        </p>
        

    </div>
  );
}
