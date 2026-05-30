"use client";

import { useEffect, useRef, useState } from "react";

type LazyVideoProps = Omit<
  React.VideoHTMLAttributes<HTMLVideoElement>,
  "children"
> & {
  src: string;
  /** Load immediately (hero / above-the-fold). */
  priority?: boolean;
  /** When false, video is paused even if loaded. */
  active?: boolean;
};

export function LazyVideo({
  src,
  priority = false,
  active = true,
  className,
  autoPlay,
  ...props
}: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(priority);

  useEffect(() => {
    if (priority) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [priority]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !shouldLoad) return;

    if (active && autoPlay !== false) {
      void el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [active, autoPlay, shouldLoad]);

  return (
    <video
      ref={ref}
      muted
      playsInline
      preload={priority ? "metadata" : "none"}
      aria-hidden
      className={className}
      {...props}
    >
      {shouldLoad && <source src={src} type="video/mp4" />}
    </video>
  );
}
