"use client"
import { ReactLenis } from "@studio-freight/react-lenis"
export default function AboutPage() {
    return (
       <ReactLenis root>
        <section className="h-screen w-full bg-indigo-400">
         <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-5xl font-bold text-white">About Kmd</h1>
         </div>
        </section>
       </ReactLenis>
    )
}