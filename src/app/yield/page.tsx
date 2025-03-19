import { GlareCardDemo } from "@/components/ui/GlareCardDemo";
import { TypewriterEffectDemo1 } from "@/components/ui/TypewriterEffectDemo1";

export default function Yield() {
  return (
    <div className="w-full pt-5 bg-black">
        <TypewriterEffectDemo1/>
        <div className="relative w-full max-w-md py-3 mx-auto">
  <input
    type="text"
    placeholder="Find the best yield"
    className="w-full py-3 pl-12 pr-4 text-lg font-medium bg-black text-white border border-slate-800 rounded-full focus:ring-2 focus:ring-gray-500 focus:outline-none transition-all duration-300"
  />
  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
    🔍
  </div>
</div>
    <GlareCardDemo/>
    
    </div>
  );
}