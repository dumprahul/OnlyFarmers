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
      className: "text-orange-500 dark:text-orange-500",
    },
  ];
  return (
    <div className="pt-15 pb-5 "> 
      <TypewriterEffect words={words} />
    </div>
  );
}
