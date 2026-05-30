"use client"
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { ReactLenis } from "lenis/react";
// import { ReactLenis } from "@studio-freight/react-lenis/types";


const suisseIntl = localFont({
  src: "../fonts/suisse-intl.ttf",
  variable: "--font-suisse-intl",
  display: "swap",

});

export default function ErqLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={cn(suisseIntl.className, suisseIntl.variable, "min-h-full px-px md:px-2")}>
          <ReactLenis root>

      {children}
          </ReactLenis>
    </div>
  );
}
