'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState,useEffect } from 'react';


gsap.registerPlugin(useGSAP);

const DELAY_MS = 3000;
const OVERLAY_DURATION = 1.5;
const PEBBLE_DURATION = 1;
const CIRCLE_DURATION = 0.8;

// 
//   <div className="absolute top-0 left-0 w-full h-full svg-wrapper rotate-180">
//     <svg
//       width="286"
//       height="286"
//       viewBox="0 0 286 286"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <g clipPath={`url(#clip0_${idSuffix})`}>
//         <mask
//           id={`mask0_${idSuffix}`}
//           style={{ maskType: 'alpha' }}
//           maskUnits="userSpaceOnUse"
//           x="18"
//           y="-49"
//           width="271"
//           height="203"
//         >
//           <rect
//             x="224"
//             y="14.5488"
//             width="194.476"
//             height="73.7032"
//             transform="rotate(149.564 224 14.5488)"
//             fill={`url(#paint0_linear_${idSuffix})`}
//           />
//           <rect x="167" y="-19" width="122" height="173" fill="#D9D9D9" />
//         </mask>
//         <g mask={`url(#mask0_${idSuffix})`}>
//           <path
//             opacity="0.15"
//             d="M20.6185 72.2329C36.1479 45.2009 60.1697 24.0541 88.9524 12.0774C117.735 0.100734 149.667 -2.0354 179.789 6.00087C209.91 14.0371 236.535 31.7959 255.526 56.5185C274.518 81.2412 284.813 111.544 284.813 142.719"
//             stroke="#575349"
//           />
//         </g>
//       </g>
//       <defs>
//         <linearGradient
//           id={`paint0_linear_${idSuffix}`}
//           x1="418.476"
//           y1="88.252"
//           x2="224"
//           y2="88.252"
//           gradientUnits="userSpaceOnUse"
//         >
//           <stop stopColor="#F2EFE9" stopOpacity="0" />
//           <stop offset="1" stopColor="#F2EFE9" />
//         </linearGradient>
//         <clipPath id={`clip0_${idSuffix}`}>
//           <rect width="286" height="286" fill="white" />
//         </clipPath>
//       </defs>
//     </svg>
//   </div>
// );

const CrossDecoration = () => (
  <div className="absolute left-0 top-1/2 w-[0.7rem] translate-x-[-0.2rem] -translate-y-1/2 rotate-45">
    <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" width="1" height="7" fill="#A39B8B" />
      <rect x="7" y="3" width="1" height="7" transform="rotate(90 7 3)" fill="#A39B8B" />
    </svg>
  </div>
);


const ProgressCounter = ({ progress }: { progress: number }) => {
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!counterRef.current) return;
    // Animation: fade in when mounted, fade out on unmount
    gsap.fromTo(
      counterRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" }
    );
    return () => {
      if (counterRef.current) {
        gsap.to(counterRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
        });
      }
    };
  }, []);

  return (
    <div
      ref={counterRef}
      className="absolute left-1/2 bottom-14 -translate-x-1/2 text-10 leading-[1.8rem] tracking-[0.05rem] font-body-mono text-dark_grey"
    >
      <span>{String(progress).padStart(3, "0")}</span>
      <span>/</span>
      <span>100</span>
    </div>
  );
};
const LargeCover = () => {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const pebbleRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!overlayRef.current || !pebbleRef.current || !circleRef.current) return;

      gsap.set(pebbleRef.current, { opacity: 0, scale: 1 });
      gsap.set(circleRef.current, { opacity: 0, rotation: -180 });
      gsap.set(overlayRef.current, { opacity: 1 });

      gsap
        .timeline()
        .to(
          pebbleRef.current,
          { opacity: 1, scale: 2, duration: PEBBLE_DURATION, ease: 'power2.out' },
          0
        )
        .to(
          circleRef.current,
          { opacity: 1, rotation: 0, duration: CIRCLE_DURATION, ease: 'power2.out' },
          0
        );

      let timeoutId: ReturnType<typeof setTimeout>;

      const runExit = () => {
        gsap
          .timeline({
            onComplete: () => setIsVisible(false),
          })
          .to(
            overlayRef.current,
            { opacity: 0, duration: OVERLAY_DURATION, ease: 'power2.inOut' },
            0
          )
          .to(
            pebbleRef.current,
            { opacity: 0, scale: 20, duration: PEBBLE_DURATION, ease: 'power2.out' },
            0
          )
          .to(
            circleRef.current,
            { opacity: 0, rotation: 90, duration: CIRCLE_DURATION, ease: 'power2.out' },
            0
          );
      };

      const handleLoad = () => {
        timeoutId = setTimeout(runExit, DELAY_MS);
      };

      if (document.readyState === 'complete') {
        handleLoad();
      } else {
        window.addEventListener('load', handleLoad);
      }

      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('load', handleLoad);
      };
    },
    { scope: containerRef }
  );

  if (!isVisible) return null;

  return (
    <div ref={containerRef}>
      <div
        ref={overlayRef}
        
        data-dynamic-zone-component="content .large-cover"
        className="fixed inset-0 z-500 flex items-center justify-center bg-[#F2EFE9] pointer-events-none"
      >
        <div className="relative inset-0" ref={circleRef}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 pointer-events-none">
            <div ref={pebbleRef}>
              <div className="svg-wrapper  w-10">
                <svg
                  width="56"
                  height="50"
                  viewBox="0 0 56 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M40.565 15.0573C36.9268 17.6142 32.6423 19.102 28.1985 19.3514H27.9062C23.4275 19.0849 19.1111 17.5827 15.4385 15.0125C12.5943 13.1513 8.90682 10.3484 9.23285 6.43554C9.45769 3.74473 12.3919 2.42176 14.5842 1.74906C15.506 1.46877 16.4391 1.23332 17.3722 1.04272C24.0175 -0.257846 30.8455 -0.333841 37.5183 0.818491H37.6082C38.6313 1.00909 39.6543 1.23332 40.6886 1.5024L41.543 1.74906C43.7353 2.42176 46.6695 3.74473 46.8943 6.43554C47.2316 10.3484 43.3305 13.1626 40.4862 15.0573H40.565Z"
                    fill="#D7D1C6"
                  />
                  <path
                    d="M12.5493 17.6362C16.7717 19.4085 20.4376 22.2821 23.162 25.9552L23.2407 26.0674L23.3306 26.2019C25.6353 29.8457 26.2311 34.4761 26.2536 38.8263C26.2536 42.2458 25.6353 47.1453 22.5661 48.7822C20.194 50.0267 17.5071 48.3113 15.7533 46.8202C15.0226 46.2035 14.3143 45.5421 13.6398 44.8581C8.91013 39.9371 5.10259 34.2109 2.39755 27.9509V27.8724C1.99283 26.9082 1.61059 25.9216 1.27333 24.9013C1.18339 24.621 1.09347 24.3296 1.01478 24.0381C0.362728 21.7957 -0.109461 18.6228 1.94787 16.9523C5.00576 14.5193 9.50266 16.2571 12.6055 17.6362H12.5493Z"
                    fill="#D7D1C6"
                  />
                  <path
                    d="M43.6228 17.6362C39.3954 19.4053 35.725 22.2794 32.9988 25.9552L32.9202 26.0674L32.8302 26.2019C30.5256 29.8457 29.9297 34.4761 29.9072 38.8263C29.9072 42.2458 30.5255 47.1453 33.5947 48.7822C35.9668 50.0267 38.6537 48.3113 40.4075 46.8202C41.1382 46.2035 41.8465 45.5421 42.521 44.8581C47.2549 39.9404 51.0629 34.2135 53.7633 27.9509V27.8724C54.168 26.9082 54.5502 25.9216 54.8875 24.9013L55.1573 24.0381C55.8094 21.7957 56.2815 18.6228 54.213 16.9523C51.1551 14.5193 46.6582 16.2571 43.5666 17.6362H43.6228Z"
                    fill="#D7D1C6"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* <div className="absolute top-1/2 left-1/2 size-[28.4rem]  -translate-x-1/2  pointer-events-none overflow-hidden">
            <div ref={circleRef} className="absolute inset-0">
              <div className="absolute w-full h-full">
                <CrossDecoration />
                <DecorativeArc idSuffix="4489_62323" />
              </div>

              <div className="absolute w-full h-full rounded-full">
                   <ProgressCounter progress={3} />
                <CrossDecoration />
                
              
                <DecorativeArc idSuffix="4489_62323_2" />

              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LargeCover;
