"use client"

import { ReactLenis } from "@studio-freight/react-lenis"
import { SplitText } from "@/components/splitText"

export default function AboutPage() {
   return (
      <ReactLenis root>
         <section className="h-dvh w-full bg-indigo-400">
            <div className="flex flex-col items-center justify-center h-full">
               <SplitText
                  as="h1"
                  className="text-[15vw] font-bold text-white font-mono uppercase tracking-[-0.2rem]"
                  duration={1}
                  stagger={0.075}
                  delay={1}
               >
                  About Kmd
               </SplitText>
            </div>
         </section>
      </ReactLenis>
   )
}
