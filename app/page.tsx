"use client"
import { ReactLenis } from "@studio-freight/react-lenis"


export default function Home() {
  return (
     <ReactLenis root>
<section className="h-screen w-full bg-black">
 <div className="flex flex-col items-center justify-center h-full">
 <h1 className="text-4xl font-bold text-white">Home</h1>
  <p className="text-white">Welcome to the home page</p>
 
 </div>
</section>
     </ReactLenis>

  );
}
