"use client"
import { ReactLenis } from "@studio-freight/react-lenis"


export default function Home() {
  return (
     <ReactLenis root>
<section className="h-screen w-full bg-black">
 <div className="flex flex-col items-center justify-center h-full">
 <h1 className="text-4xl font-bold text-white">Home</h1>
  <div className="max-w-2xl mx-auto px-4 mt-6">
    <p className="text-white text-balance text-center">Tegra kmd is a software engineer frontend developer with a passion for creating beautiful and functional web applications. He is a self-taught developer and he is always learning new things.</p>
  </div>
 
 </div>
</section>
     </ReactLenis>

  );
}
