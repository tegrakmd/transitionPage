
"use client";
import { ReactLenis } from "@studio-freight/react-lenis";
import Image from "next/image";
import { TextInfo } from "@/components/textInfo";
import {NavColorComp} from "@/components/navColor"
// import {
//   MorphingBorderTop,
//   MorphingBorderBottom,
// } from "@/components/terminal_border_animation";
import { useRef } from "react";
import PrevienOne from "@/components/previewOne";
import LiquideComponent from "@/components/previewTwo";
import RootLayout from "./layout";
import ReootLayout from "@/components/customizer/layout.example";
// import ThemeCustomizer from "@/components/customizer/ThemeCustomizer";


import ThemeCustomizer from '@/components/customizer/ThemeCustomizer'
import type { ThemeConfig } from '@/components/customizer/theme-customizer.types'

export default function Home() {
  const sectionRef = useRef<HTMLDivElement>(null);
    const handleThemeChange = (config: ThemeConfig) => {
        console.log('🎨 Theme updated:', config)

        // Exemples d'utilisation:
        // 1. Envoyer à une API
        // fetch('/api/user/theme', {
        //   method: 'PUT',
        //   body: JSON.stringify(config)
        // })

        // 2. Enregistrer dans Zustand/Redux
        // store.setTheme(config)

        // 3. Envoyer à un service d'analytics
        // analytics.track('theme_changed', config)
    }
  return (
    <ReactLenis root>
      <section className="h-screen w-full overflow-hidden bg-black/45 relative">
        <Image
          alt="cover"
          src="/1.jpg"
          width={2800}
          height={1280}
          loading="lazy"
          className="absolute z-0 inset-0 object-cover size-full"
        />
        <div className="absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20">
          <h1 className="text-[250px] text-white">Tegra</h1>

          <div className="mx-auto min-w-xl w-full px-6 mix-blend-difference relative">
            <TextInfo />
          </div>
        </div>
        <NavColorComp />
      </section>
      <LiquideComponent/>
      <PrevienOne/>
       <ThemeCustomizer onThemeChange={handleThemeChange} storageKey="app-theme" targetSelector="html" />
      {/* <section
        ref={sectionRef}
        className="relative overflow-hidden w-full min-h-svh bg-green-900">
        <div>
          <MorphingBorderTop targetRef={sectionRef} />
          <MorphingBorderBottom targetRef={sectionRef} />
        </div>
      </section> */}
    </ReactLenis>
  );
}
