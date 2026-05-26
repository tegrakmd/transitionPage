'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Données extraites directement du site original (desktop SVG)
const desktopLetters = [
  {
    d: 'M1420 6V63.1629H1388.18V500H1333.45V63.1629H1301V6H1420Z',
    targetScaleY: 0.719856,
  },
  {
    d: 'M1157 500V6H1223.31C1266.67 6 1290.26 32.1114 1290.26 79.3943V165.491C1290.26 212.069 1272.41 237.474 1239.25 237.474H1235.43V245.943H1273.05L1296 500H1241.8L1223.95 280.523H1211.83V500H1157ZM1211.83 227.594H1223.31C1231.6 227.594 1236.06 219.831 1236.06 207.129V83.6286C1236.06 70.22 1231.6 63.1629 1223.31 63.1629H1211.83V227.594Z',
    targetScaleY: 0.877945,
  },
  {
    d: 'M1089.31 500L1082.33 337.686H1055.67L1048.69 500H996L1016.31 6H1122.32L1142 500H1089.31ZM1057.57 279.817H1080.43L1075.35 162.669L1074.08 61.7514H1063.92L1062.65 162.669L1057.57 279.817Z',
    targetScaleY: 0.78162,
  },
  {
    d: 'M929 81V6H984V81H929Z', // le point « . »
    targetScaleY: 0.800007,
  },
  {
    d: 'M676.188 500L659 6H714.384L720.113 334.863L721.387 442.837H730.299L732.209 334.863L743.668 6H821.332L833.428 334.863L834.701 442.837H843.613L844.887 334.863L850.616 6H906L889.448 500H798.415L788.866 171.137L787.593 63.1629H778.044L776.771 171.137L767.222 500H676.188Z',
    targetScaleY: 0.679877,
  },
  {
    d: 'M578 500C534.61 500 511 474.306 511 427.083V73.6111C511 25.6944 534.61 0 578 0C621.391 0 645 25.6944 645 73.6111V427.083C645 474.306 621.391 500 578 500ZM578 443.75C586.295 443.75 590.124 436.111 590.124 422.917V77.0833C590.124 63.8889 586.295 56.25 578 56.25C569.705 56.25 565.238 63.8889 565.238 77.0833V422.917C565.238 436.111 569.705 443.75 578 443.75Z',
    targetScaleY: 0.870604,
  },
  {
    d: 'M450.043 442.837H499V500H396V6H450.043V442.837Z',
    targetScaleY: 0.799787,
  },
  {
    d: 'M335.043 442.837H384V500H281V6H335.043V442.837Z',
    targetScaleY: 0.881787,
  },
  {
    d: 'M191.5 500C148.433 500 125 474.306 125 427.083V73.6111C125 25.6944 148.433 0 191.5 0C234.567 0 258 25.6944 258 73.6111V427.083C258 474.306 234.567 500 191.5 500ZM191.5 443.75C199.733 443.75 203.533 436.111 203.533 422.917V77.0833C203.533 63.8889 199.733 56.25 191.5 56.25C183.267 56.25 178.833 63.8889 178.833 77.0833V422.917C178.833 436.111 183.267 443.75 191.5 443.75Z',
    targetScaleY: 0.989695,
  },
  {
    d: 'M109 63.1629H54.1813V219.126H102.626V276.289H54.1813V500H0V6H109V63.1629Z',
    targetScaleY: 0.800845,
  },
];

// Le SVG mobile est copié tel quel (pas d’animation par lettre)
const mobileSvgPath =
  'M253.237 132 246 2h23.32l2.412 96.937.536 20.329h3.753l.804-20.329L281.649 2h32.702l5.092 96.937.536 20.329h3.753l.536-20.329L326.68 2H350l-6.969 130h-38.33l-4.021-93.212-.536-24.054h-4.02l-.536 24.054L291.567 132zM216 133c-16.19 0-25-6.454-25-18.315V18.49C191 6.454 199.81 0 216 0s25 6.454 25 18.49v96.195c0 11.861-8.81 18.315-25 18.315m0-14.129c3.095 0 4.524-1.919 4.524-5.233V19.362c0-3.314-1.429-5.233-4.524-5.233s-4.762 1.919-4.762 5.233v94.276c0 3.314 1.667 5.233 4.762 5.233M167.938 118.785H186V132h-38V2h19.938zM124.938 116.529H143V131h-38V2h19.938zM71.5 133c-15.867 0-24.5-7.384-24.5-20.955v-90.89C47 7.383 55.633 0 71.5 0S96 7.384 96 21.154v90.891C96 125.616 87.367 133 71.5 133m0-16.165c3.033 0 4.433-2.195 4.433-5.987V22.152c0-3.792-1.4-5.987-4.433-5.987s-4.667 2.195-4.667 5.987v88.696c0 3.792 1.634 5.987 4.667 5.987M41 15.215H20.38v36.054h18.222v13.214H20.38V132H0V2h41zM351 152v13.227h-12.3V290h-21.155V165.227H305V152zM224.513 267l-2.583-48.522h-9.861L209.486 267H190l7.513-115h39.208L244 267zm-11.74-61.454h8.453l-1.879-26.179-.469-14.908h-3.757l-.469 14.908zM160 170v-18h20v18zM253 312V152h23.853c15.596 0 24.082 7.162 24.082 20.13v23.614c0 12.775-6.422 19.743-18.348 19.743h-1.377v2.323h13.533L303 312h-19.496l-6.422-84.706h-4.358V312zm19.724-99.223h4.129c2.981 0 4.587-2.129 4.587-5.613v-33.873c0-3.677-1.606-5.613-4.587-5.613h-4.129z';

export default function FollowArtTitle() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Suivi du scroll dans la zone du composant
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'], // l'effet se déroule pendant que l'élément traverse le viewport
  });

  return (
    <div className="px-1 pt-promo-header" ref={containerRef}>
      {/* Titre masqué pour SEO */}
      <h1 className="sr-only">FOLLOW.ART One Practice. One Card</h1>

      {/* SVG Desktop (animé) */}
      <div className="hidden md:block">
        <svg
          className="intro__title svg-fix w-full h-auto"
          width="1420"
          height="500"
          viewBox="0 0 1420 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          {desktopLetters.map((letter, i) => {
            // Transformation progressive de 1 vers targetScaleY
            const scaleY = useTransform(
              scrollYProgress,
              [0, 1],
              [1, letter.targetScaleY]
            );

            return (
              <motion.g
                key={i}
                className="transform-box-fill"
                style={{
                  scaleY,
                  transformOrigin: 'center',
                }}
              >
                <path d={letter.d} fill="white" />
              </motion.g>
            );
          })}
        </svg>
      </div>

      {/* SVG Mobile (statique) */}
      <div className="block md:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="351"
          height="402"
          fill="none"
          viewBox="0 0 351 312"
          className="intro__title svg-fix w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
        >
          <path fill="#fff" d={mobileSvgPath} />
        </svg>
      </div>

      {/* Ligne décorative sous le titre */}
      <div className="intro__title-decoration mt-4 md:mt-6">
        {/* Reproduction en SVG inline pour éviter une dépendance image */}
        <svg
          width="100%"
          height="2"
          viewBox="0 0 100 2"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <line
            x1="0"
            y1="1"
            x2="100"
            y2="1"
            stroke="white"
            strokeOpacity="0.2"
            strokeWidth="1"
          />
        </svg>
      </div>
    </div>
  );
}