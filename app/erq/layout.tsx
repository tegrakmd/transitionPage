import localFont from "next/font/local";
import { cn } from "@/lib/utils";

const suisseIntl = localFont({
  src: "../fonts/suisse-intl.ttf",
  variable: "--font-suisse-intl",
  weight: "10  1000",
  display: "swap",

});

export default function ErqLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={cn(suisseIntl.className, suisseIntl.variable, "min-h-full px-px md:px-2")}>
      {children}
    </div>
  );
}
