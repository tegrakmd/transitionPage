"use client"
import  { useState, useEffect, useRef, useCallback } from 'react';

// ───────────────────────────── Types ─────────────────────────────
interface CreativeWorkItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt: string;
  title: string;
}

// ──────────────────────────── Données ────────────────────────────
const GAP = 20;
const ITEM_ASPECT = 275.556 / 206.667;
const DESKTOP_BREAKPOINT = 1024;
const VISIBLE_MOBILE = 2;
const VISIBLE_DESKTOP = 4;

const creativeWorksData: CreativeWorkItem[] = [
      {
    id: 'developper',
    type: 'image',
    src:'/me.webp',
    alt: 'CEO',
    title: 'Web Developper Tegra Kmd',
  },
  {
    id: 'campaigns',
    type: 'image',
    src: 'https://arqe-storage-images.nyc3.cdn.digitaloceanspaces.com/landing-page/creative_work/media_library/1776514578239_Campaigns___Advertising.webp',
    alt: 'Campaigns & Advertising',
    title: 'Campaigns & Advertising',
  },
  {
    id: 'web',
    type: 'video',
    src: 'https://arqe-storage-images.nyc3.cdn.digitaloceanspaces.com/landing-page/creative_work/media_library/1776514619977_web_mobile_2_smaller.mp4',
    alt: 'Web, E-Commerce Design, UI/UX',
    title: 'Web, E-Commerce Design, UI/UX',
  },
  {
    id: 'branding',
    type: 'video',
    src: 'https://arqe-storage-images.nyc3.cdn.digitaloceanspaces.com/landing-page/creative_work/media_library/1776514808782_branding_mobile_3_smaller.mp4',
    alt: 'Branding, Identity & Art Direction',
    title: 'Branding, Identity & Art Direction',
  },
  {
    id: 'social',
    type: 'image',
    src: 'https://arqe-storage-images.nyc3.cdn.digitaloceanspaces.com/landing-page/creative_work/media_library/1776514616001_Social_Content.webp',
    alt: 'Social Content',
    title: 'Social Content',
  },
  {
    id: 'presentations',
    type: 'video',
    src: 'https://arqe-storage-images.nyc3.cdn.digitaloceanspaces.com/landing-page/creative_work/media_library/1776514610940_presentation_mobile_smaller.mp4',
    alt: 'Presentations',
    title: 'Presentations',
  },
  {
    id: 'moodboard',
    type: 'image',
    src: 'https://arqe-storage-images.nyc3.cdn.digitaloceanspaces.com/landing-page/creative_work/media_library/1776514606019_Moodboard.webp',
    alt: 'Moodboard & Pitches',
    title: 'Moodboard & Pitches',
  },
];

// Trois jeux pour l'effet de boucle infinie
const tripleData: CreativeWorkItem[] = [
  ...creativeWorksData,
  ...creativeWorksData,
  ...creativeWorksData,
];

const TOTAL_ORIGINAL = creativeWorksData.length; // 6
const START_INDEX = TOTAL_ORIGINAL; // on commence au 1er élément du set du milieu

// ─────────────────────────── Composant ───────────────────────────
const CreativeWork = () => {
  const [currentIndex, setCurrentIndex] = useState(START_INDEX);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [containerWidth, setContainerWidth] = useState(0);
  const [visibleCount, setVisibleCount] = useState(VISIBLE_MOBILE);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const itemWidth =
    containerWidth > 0
      ? (containerWidth - (visibleCount - 1) * GAP) / visibleCount
      : 206.667;
  const itemHeight = itemWidth * ITEM_ASPECT;
  const itemTotalWidth = itemWidth + GAP;

  // ---- Mesure conteneur + nombre d'éléments visibles ----
  useEffect(() => {
    const updateLayout = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
      setVisibleCount(
        window.innerWidth >= DESKTOP_BREAKPOINT ? VISIBLE_DESKTOP : VISIBLE_MOBILE,
      );
    };
    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  // ---- Auto-play ----
  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 2600);
  }, []);

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startInterval]);

  // ---- Gestion du retour à la boucle centrale (wrapping) ----
  useEffect(() => {
    if (currentIndex >= TOTAL_ORIGINAL * 2) {
      // Trop à droite → on revient au set du milieu sans animation
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(currentIndex - TOTAL_ORIGINAL);
        requestAnimationFrame(() => setIsTransitioning(true));
      }, 400);
      return () => clearTimeout(timeout);
    } else if (currentIndex < TOTAL_ORIGINAL) {
      // Trop à gauche → on revient au set du milieu sans animation
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(currentIndex + TOTAL_ORIGINAL);
        requestAnimationFrame(() => setIsTransitioning(true));
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  // ---- Navigation ----
  const handlePrev = () => {
    setCurrentIndex((prev) => prev - 1);
    startInterval();
  };

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
    startInterval();
  };

  // ---- Décalage : afficher visibleCount éléments (2 mobile, 4 desktop) ----
  const visibleWidth = visibleCount * itemWidth + (visibleCount - 1) * GAP;
  const translateX =
    containerWidth > 0
      ? -(currentIndex * itemTotalWidth) + (containerWidth - visibleWidth) / 2
      : 0;

  const isItemActive = (index: number) =>
    index >= currentIndex && index < currentIndex + visibleCount;

  // ───────────────────────── Rendu ─────────────────────────
  return (
    <section id="creative_work" className="pb-[100px] sm:pb-[230px]">
      {/* En-tête */}
      <div className="flex flex-col items-center gap-[5px] mb-10 sm:mb-14 px-6">
        <h2
          className="text-[#fafafa] text-[30px] leading-[34px] tracking-[-0.4px] text-center"
        
        >
          Production-ready
        </h2>
        <p
          className="text-[#a1a1a1] text-[16px] leading-[1.2] text-center max-w-[270px] sm:max-w-[360px]"

        >
          <span>Visuals designed for campaigns,</span>
          <span>
            <br />
            products, and stories.
          </span>
        </p>
      </div>

      {/* Carrousel */}
      <div style={{ maxWidth: 1160, margin: '0px auto', overflow: 'hidden' }}>
        <div
          ref={containerRef}
          style={{
            overflow: 'hidden',
            paddingLeft: 20,
            paddingRight: 20,
            touchAction: 'pan-y',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: GAP,
              paddingBottom: 16,
              willChange: 'transform',
              transform: `translateX(${translateX}px)`,
              transition: isTransitioning ? 'transform 0.4s ease-out' : 'none',
            }}
          >
            {tripleData.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                style={{
                  flexShrink: 0,
                  width: itemWidth,
                  cursor: 'pointer',
                  opacity: isItemActive(index) ? 1 : 0.4,
                  transition: 'opacity 0.4s ease-out',
                }}
              >
                {/* Média */}
                <div
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundColor: '#1a1a1a',
                    width: itemWidth,
                    height: itemHeight,
                    borderRadius: 10,
                  }}
                >
                  {item.type === 'image' ? (
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <video
                      src={item.src}
                      autoPlay
                      loop
                      playsInline
                      muted
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )}
                </div>

                {/* Titre */}
                <h3
                  className="text-foreground text-sm sm:text-base mt-3 sm:mt-[15px]"
                  style={{
                    
                    lineHeight: 1.4,
                    color: '#fafafa',
                  }}
                >
                  <span>{item.title}</span>
                    {/* fontFamily: '"Suisse Intl", system-ui, sans-serif', */}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Boutons de navigation */}
        <div className="flex justify-end mt-[20px] px-5 sm:px-8 lg:px-0 gap-2 sm:gap-[10px]">
          <button
            onClick={handlePrev}
            className="w-[34px] h-[34px] flex items-center justify-center bg-[#1C1C1C] text-white rounded-[4px]"
            aria-label="Previous"
            tabIndex={0}
            style={{
              borderWidth: 'medium',
              borderStyle: 'none',
              borderColor: 'currentcolor',
              borderImage: 'initial',
              cursor: 'pointer',
            }}
          >
            <svg
              className="w-[18px] h-[18px]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="w-[34px] h-[34px] flex items-center justify-center bg-[#1C1C1C] text-white rounded-[4px]"
            aria-label="Next"
            tabIndex={0}
            style={{
              borderWidth: 'medium',
              borderStyle: 'none',
              borderColor: 'currentcolor',
              borderImage: 'initial',
              cursor: 'pointer',
            }}
          >
            <svg
              className="w-[18px] h-[18px]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CreativeWork;