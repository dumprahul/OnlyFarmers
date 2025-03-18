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
    {/* <div className="w-full bg-black">
      <section> <SpotlightPreview/> </section>

      <section className="py-8"> <WobbleCardDemo/> </section>

   
   </div> */}
   </div>
  );
}
