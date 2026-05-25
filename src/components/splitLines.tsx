"use client"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import SplitType from "split-type"
import { useRef, type ElementType } from "react"


gsap.registerPlugin(useGSAP)

type SplitLinesProps = {
   children: string
   /** HTML tag to render — defaults to "p" */
   as?: ElementType
   className?: string
   /** Starting Y offset in px — defaults to 400 */
   yFrom?: number
   /** Animation duration in seconds — defaults to 2 */
   duration?: number
   /** Stagger between each line in seconds — defaults to 0.075 */
   stagger?: number
   /** GSAP ease — defaults to "power4.out" */
   ease?: string
   /** Delay before animation starts in seconds — defaults to 0 */
   delay?: number
}

export function SplitLines({
   children,
   as: Tag = "p",
   className,
   yFrom = 400,
   duration = 2,
   stagger = 0.075,
   ease = "power4.out",
   delay = 0,
}: SplitLinesProps) {
   const container = useRef<HTMLDivElement>(null)

   useGSAP(() => {
      if (!container.current) return

      const el = container.current.querySelector("[data-split-target]") as HTMLElement
      if (!el) return

      const split = new SplitType(el, {
         types: "lines",
         tagName: "div",
         lineClass: "split-line",
      })

      // Wrap each line's content in a span for the reveal animation
      split.lines?.forEach((line) => {
         const content = line.innerHTML
         line.innerHTML = `<span>${content}</span>`
      })

      const spans = container.current.querySelectorAll(".split-line span")

      gsap.set(spans, {
         y: yFrom,
         display: "block",
      })

      gsap.to(spans, {
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
