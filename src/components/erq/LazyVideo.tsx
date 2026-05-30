"use client";

import { useEffect, useRef, useState } from "react";

type LazyVideoProps = Omit<
  React.VideoHTMLAttributes<HTMLVideoElement>,
  "children"
> & {
  src: string;
  /** Load immediately (hero / above-the-fold). */
  priority?: boolean;
  /** Load as soon as the component mounts (e.g. carousel duplicates). */
  eager?: boolean;
  /** When false, video is paused even if loaded. */
  active?: boolean;
};

export function LazyVideo({
  src,
  priority = false,
  eager = false,
  active = true,
  className,
  autoPlay,
  ...props
}: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(priority || eager);

  useEffect(() => {
    if (priority || eager) return;

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
  }, [priority, eager]);

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
      preload={priority || eager ? "auto" : "none"}
      aria-hidden
      className={className}
      {...props}
    >
      {shouldLoad && <source src={src} type="video/mp4" />}
    </video>
  );
}
