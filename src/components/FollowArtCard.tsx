// components/NexusCardTitle.tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

// -------------------------------------------------------------------
// Données extraites du SVG desktop (7 lettres)
// targetScaleY = data-scale-y original
// -------------------------------------------------------------------
const desktopLetters = [
  {
    d: "M378 465V5H520V58.2286H448.174V202.143H511.744V255.371H448.174V411.771H520V465H378Z",
    targetScaleY: 0.819856,
  },
  {
    d: "M278.164 5H348V525H278.164V276.886H242.836V525H173V5H242.836V216.714H278.164V5Z",
    targetScaleY: 0.87993,
  },
  {
    d: "M154 5V53.6H112.824V425H42V53.6H0V5H154Z",
    targetScaleY: 0.880074,
  },
  {
    d: "M1248 425V5H1333.59C1389.55 5 1420 27.2 1420 67.4V362.6C1420 402.8 1389.55 425 1333.59 425H1248ZM1317.95 376.4H1333.59C1344.29 376.4 1350.05 370.4 1350.05 359.6V71C1350.05 59.6 1344.29 53.6 1333.59 53.6H1317.95V376.4Z",
    targetScaleY: 0.910144,
  },
  {
    d: "M1050 525V5H1135.87C1192.02 5 1222.57 32.4857 1222.57 82.2572V172.886C1222.57 221.914 1199.45 248.657 1156.51 248.657H1151.56V257.571H1200.28L1230 525H1159.82L1136.7 293.971H1121.01V525H1050ZM1121.01 238.257H1135.87C1146.61 238.257 1152.39 230.086 1152.39 216.714V86.7143C1152.39 72.6 1146.61 65.1714 1135.87 65.1714H1121.01V238.257Z",
    targetScaleY: 0.875907,
  },
  {
    d: "M959.435 475L950.348 320.571H915.652L906.565 475H838L864.435 5H1002.39L1028 475H959.435ZM918.13 265.514H947.869L941.261 154.057L939.609 58.0429H926.391L924.739 154.057L918.13 265.514Z",
    targetScaleY: 0.819926,
  },
  {
    d: "M737.162 550C680.424 550 650 521.736 650 469.792V80.9722C650 28.2639 680.424 0 737.162 0C794.722 0 824.324 28.2639 821.857 80.9722L815.279 226.111H745.385L751.963 84.7917C752.785 70.2778 747.852 61.875 737.162 61.875C726.472 61.875 720.716 70.2778 720.716 84.7917V465.208C720.716 479.722 726.472 488.125 737.162 488.125C747.029 488.125 751.963 479.722 751.963 465.208V312.431H821.857V469.792C821.857 521.736 792.255 550 737.162 550Z",
    targetScaleY: 0.92102,
  },
];

// -------------------------------------------------------------------
// SVG mobile complet (copie conforme de l'original)
// -------------------------------------------------------------------
const MobileSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="350"
    height="420"
    fill="none"
    viewBox="0 0 350 420"
    preserveAspectRatio="xMidYMid meet"
    className="w-full h-auto">
    <path
      d="M271.35 252V2H311.003C336.93 2 351.037 15.2143 351.037 39.1429V214.857C351.037 238.786 336.93 252 311.003 252H271.35ZM303.758 223.071H311.003C315.959 223.071 318.628 219.5 318.628 213.071V41.2857C318.628 34.5 315.959 30.9286 311.003 30.9286H303.758V223.071Z"
      fill="black"
    />
    <path
      d="M181.746 352V2H220.788C246.316 2 260.206 20.5 260.206 54V115C260.206 148 249.694 166 230.173 166H227.921V172H250.07L263.584 352H231.675L221.164 196.5H214.031V352H181.746ZM214.031 159H220.788C225.668 159 228.296 153.5 228.296 144.5V57C228.296 47.5 225.668 42.5 220.788 42.5H214.031V159Z"
      fill="black"
    />
    <path
      d="M141.52 302L137.389 203.429H121.615L117.484 302H86.3125L98.3305 2H161.049L172.692 302H141.52ZM122.742 168.286H136.262L133.258 97.1429L132.507 35.8571H126.498L125.747 97.1429L122.742 168.286Z"
      fill="black"
    />
    <path
      d="M40.4838 224C14.1311 224 0 212.489 0 191.333V32.9778C0 11.5111 14.1311 0 40.4838 0C67.2184 0 80.9677 11.5111 79.8219 32.9778L76.7665 92.0889H44.3031L47.3585 34.5333C47.7404 28.6222 45.4488 25.2 40.4838 25.2C35.5188 25.2 32.8454 28.6222 32.8454 34.5333V189.467C32.8454 195.378 35.5188 198.8 40.4838 198.8C45.0669 198.8 47.3585 195.378 47.3585 189.467V127.244H79.8219V191.333C79.8219 212.489 66.0727 224 40.4838 224Z"
      fill="black"
    />
  </svg>
);

// -------------------------------------------------------------------
// Composant principal
// -------------------------------------------------------------------
export default function NexusCardTitle() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Progression du scroll (de 0 à 1) pendant la traversée du viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Échelle globale du SVG (1 → 0.759978)
  const globalScaleY = useTransform(scrollYProgress, [0, 1], [1, 0.759978]);

  return (
    <div className="w-full flex flex-col items-center" ref={containerRef}>
      {/* Titre accessible (masqué visuellement) */}
      <h2 className="sr-only">Nexus card</h2>

      {/* ================== DESKTOP ================== */}
      <div className="hidden md:block w-full max-w-355 mx-auto">
        <motion.svg
          className="w-full h-auto"
          width="1420"
          height="505"
          viewBox="0 0 1420 505"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          style={{
            scaleY: globalScaleY,
            transformOrigin: "center top", // écrasement depuis le haut
          }}>
          {desktopLetters.map((letter, i) => {
            // Échelle individuelle par lettre (1 → targetScaleY)
            const letterScaleY = useTransform(
              scrollYProgress,
              [0, 1],
              [1, letter.targetScaleY]
            );

            return (
              <motion.g
                key={i}
                // fill-box obligatoire pour que transform-origin fonctionne
                className="transfor-fill"
                style={{
                  scaleY: letterScaleY,
                  transformOrigin: "center",
                }}>
                <path d={letter.d} fill="black" />
              </motion.g>
            );
          })}
        </motion.svg>
      </div>

      {/* ================== MOBILE ================== */}
      <div className="block md:hidden w-full max-w-87.5 mx-auto">
        <motion.div
          style={{
            scaleY: globalScaleY,
            transformOrigin: "center top",
          }}>
          <MobileSvg />
        </motion.div>

        {/* Image "THE" (exactement comme l'original) */}
        <div className="section-5__title-decoration   w-full mt-3">
          <Image
            src="/the.svg" // ← Téléchargez le SVG original et placez-le dans public/images/
            alt="Nexus Card for artists — share your portfolio, bio, exhibitions, and awards with one professional tool."
            width={40} // Dimensions approximatives, à ajuster si nécessaire
            height={12}
            className="w-full h-auto mx-auto"
            priority
          />
        </div>
      </div>
    </div>
  );
}
