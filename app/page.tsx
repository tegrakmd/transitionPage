"use client"
import { Button } from "@/components/ui/button";
import { ReactLenis } from "@studio-freight/react-lenis"
import { Link } from "next-view-transitions";

import Image from "next/image";
// import { Prosse } from "@/components/section";


export default function Home() {
   return (
      <ReactLenis root>
         <section className="h-screen w-full bg-black/45 relative">
            <Image alt="cover" src="/1.jpg" width={1200} height={1200} className="absolute z-0 inset-0 object-cover size-full" />
            <div className="absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20">
               <h1 className="text-[250px] text-white">Tegra</h1>
               <Button asChild>
                  <Link href="./section" className="text-base">pages</Link>
               </Button>
            </div>
         </section>

      </ReactLenis>

   );
}
