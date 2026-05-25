"use client"
import { SplitText } from "@/components/splitText"
import { ReactLenis } from "@studio-freight/react-lenis"
export default function ServicePage() {
   return (
      <ReactLenis root>
         <section className="h-screen w-full bg-amber-600">
            <div className="flex flex-col items-center justify-center h-full">
               <SplitText as="h1"
                  className="text-[15vw] font-bold text-white font-mono uppercase tracking-[-0.2rem]"
                  duration={1}
                  stagger={0.075}
                  delay={1}>Nos Services </SplitText>
            </div>
         </section>
      </ReactLenis>
   )
}