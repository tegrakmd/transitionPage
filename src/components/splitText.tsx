"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef, type ElementType } from "react"
import SplitType from "split-type"

gsap.registerPlugin(useGSAP)

type SplitTextProps = {
   children: string
   /** HTML tag to render — defaults to "h1" */
   as?: ElementType
   className?: string
   /** SplitType split types — defaults to "chars" */
   splitType?: "chars" | "words" | "lines" | "chars,words" | "chars,lines" | "words,lines" | "chars,words,lines"
   /** Which split result to animate: "chars" | "words" | "lines" — defaults to "chars" */
   animateTarget?: "chars" | "words" | "lines"
   /** Starting Y offset in px — defaults to 400 */
   yFrom?: number
   /** Animation duration in seconds — defaults to 1 */
   duration?: number
   /** Stagger between each element in seconds — defaults to 0.075 */
   stagger?: number
   /** GSAP ease — defaults to "power4.out" */
   ease?: string
   /** Delay before animation starts in seconds — defaults to 0 */
   delay?: number
}

export function SplitText({
   children,
   as: Tag = "h1",
   className,
   splitType = "chars",
   animateTarget = "chars",
   yFrom = 400,
   duration = 1,
   stagger = 0.075,
   ease = "power4.out",
   delay = 0,
}: SplitTextProps) {
   const container = useRef<HTMLDivElement>(null)

   useGSAP(() => {
      if (!container.current) return

      const el = container.current.querySelector("[data-split-target]") as HTMLElement
      if (!el) return

      const split = new SplitType(el, { types: splitType })

      const targets = split[animateTarget]
      if (!targets || targets.length === 0) return

      gsap.set(targets, { y: yFrom })
      gsap.to(targets, {
         y: 0,
         duration,
         stagger,
         ease,
         delay,
      })

      return () => {
         split.revert()
      }
   }, { scope: container })

   return (
      <div ref={container}>
         <Tag className={className} data-split-target>
            {children}
         </Tag>
      </div>
   )
}
