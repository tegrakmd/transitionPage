import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

// Top Border Component
export function MorphingBorderTop({
  targetRef,
}: {
  targetRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef || containerRef,
    offset: ["start end", "end start"],
  });

  const animatedDepthRaw = useTransform(scrollYProgress, [0.1, 0.5], [10, 32]);

  const animatedDepth = useSpring(animatedDepthRaw, {
    stiffness: 90,
    damping: 18,
    mass: 0.8,
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-transparent">
      <svg
        className="top-0 left-0 z-10 w-full pointer-events-none"
        preserveAspectRatio="none"
        height="140"
        style={{ filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.15))" }}>
        <motion.path
          d={useTransform(animatedDepth, (currentDepth: number) => {
            const w = 1920;
            const h = 140;
            const notchWidth = 631;
            const smoothness = 91;
            const topY = 0;
            const alpha = 0.34;

            const cx = w / 2;
            const x1 = cx - notchWidth / 2;
            const x2 = cx + notchWidth / 2;
            const y1 = topY;
            const y2 = topY + currentDepth;
            const leftEnd = x1 + smoothness;
            const rightStart = x2 - smoothness;

            return `M 0 ${h} L 0 ${y1} L ${x1} ${y1} C ${x1 + smoothness * alpha} ${y1}, ${x1 + smoothness * (1 - alpha)} ${y2}, ${leftEnd} ${y2} L ${rightStart} ${y2} C ${x2 - smoothness * (1 - alpha)} ${y2}, ${x2 - smoothness * alpha} ${y1}, ${x2} ${y1} L ${w} ${y1} L ${w} ${h} Z`;
          })}
          fill="transparent"
        />
      </svg>
    </div>
  );
}

// Bottom Border Component
export function MorphingBorderBottom({
  targetRef,
}: {
  targetRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef || containerRef,
    offset: ["start end", "end start"],
  });

  const animatedDepthRaw = useTransform(scrollYProgress, [0.1, 0.5], [10, 32]);

  const animatedDepth = useSpring(animatedDepthRaw, {
    stiffness: 90,
    damping: 18,
    mass: 0.8,
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-transparent">
      <svg
        className="bottom-0 left-0 z-10 w-full pointer-events-none"
        preserveAspectRatio="none"
        height="140"
        style={{ filter: "drop-shadow(0px -4px 10px rgba(0,0,0,0.15))" }}>
        <motion.path
          d={useTransform(animatedDepth, (currentDepth: number) => {
            const w = 1920;
            const h = 80;
            const notchWidth = 631;
            const smoothness = 91;
            const bottomY = h;
            const alpha = 0.34;

            const cx = w / 2;
            const x1 = cx - notchWidth / 2;
            const x2 = cx + notchWidth / 2;
            const y1 = bottomY;
            const y2 = bottomY - currentDepth;
            const leftEnd = x1 + smoothness;
            const rightStart = x2 - smoothness;

            return `M 0 0 L 0 ${y1} L ${x1} ${y1} C ${x1 + smoothness * alpha} ${y1}, ${x1 + smoothness * (1 - alpha)} ${y2}, ${leftEnd} ${y2} L ${rightStart} ${y2} C ${x2 - smoothness * (1 - alpha)} ${y2}, ${x2 - smoothness * alpha} ${y1}, ${x2} ${y1} L ${w} ${y1} L ${w} 0 Z`;
          })}
          fill="#ccc"
        />
      </svg>
    </div>
  );
}
