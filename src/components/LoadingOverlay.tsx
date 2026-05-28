'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import logo from '../../public/pebble-flow-logo.svg';

export default function LoadingOverlay() {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      // Délai de 200ms après le chargement complet
      setTimeout(() => {
        setIsAnimating(true); // Déclenche l'animation
        // Cache complètement après la transition (500ms)
        setTimeout(() => setIsVisible(false), 500);
      }, 200);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-white transition-all duration-500 ease-in-out ${
        isAnimating ? 'opacity-0' : 'opacity-100'
      }`}
      aria-hidden={!isVisible}
    >
      <div className="flex items-center justify-center h-screen">
        <Image
          src={logo}
          alt="Pebble"
          width={80}
          height={80}
          priority
          className={`transition-transform duration-500 ease-in-out ${
            isAnimating ? 'scale-90' : 'scale-100'
          }`}
        />
      </div>
    </div>
  );
}