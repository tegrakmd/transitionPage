"use client";

import { SplitLines } from "@/components/splitLines";

export function TextInfo() {
  return (
    <div className="flex justify-around w-full">
      <div className="mix-blend-screen text-white text-balance">
        <SplitLines
          as="p"
          duration={2}
          stagger={0.075}
          delay={0.25}
          className="text-white  font-mono text-lg  text-balance tracking-[-0.015rem] ">
          Herida __ Lady Gaga
        </SplitLines>
      </div>
    </div>
  );
}
