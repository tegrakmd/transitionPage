
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { VoicemailIcon } from "@phosphor-icons/react";
import { VideoCameraIcon } from "@phosphor-icons/react/dist/ssr/VideoCamera";
// import { Volume2, VolumeX } from "lucide-react";

// Audio sound generator using high-quality Web Audio API
const playClickSound = (isMuted: boolean) => {
  if (isMuted) return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const audioCtx = new AudioContextClass();
    
    // Create oscillator and gain node for organic modern high-end tap synth
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = "sine";
    // Fast high-pitch click sweep
    osc.frequency.setValueAtTime(650, audioCtx.currentTime); 
    osc.frequency.exponentialRampToValueAtTime(140, audioCtx.currentTime + 0.1);
    
    // Micro gain envelope for snappy attack and smooth exponential decay
    gain.gain.setValueAtTime(0.04, audioCtx.currentTime); 
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.11);
  } catch (err) {
    console.warn("Audio Context blocked or not available:", err);
  }
};

// Image assets generated for the project
const PERSONAL_IMAGE_1 = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800&h=1000";
const PERSONAL_IMAGE_2 = "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=400&h=400";
const BUSINESS_IMAGE_1 = "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=800&h=1000";
const BUSINESS_IMAGE_2 = "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=400&h=400";

type TabType = "business" | "personal";

export default function liquideComponent() {
  const [activeTab, setActiveTab] = useState<TabType>("personal");
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);

  const handleTabChange = (tab: TabType) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    playClickSound(isAudioMuted);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#ebebeb] flex flex-col items-center justify-center overflow-hidden font-sans select-none px-4">
      
      {/* Muted-by-default Premium Audio Feedback Switch in Top-Right */}
      <div className="absolute top-6 right-6 md:top-12 md:right-12 z-50 flex items-center gap-2" id="audio-control-container">
        <button
          onClick={() => {
            const nextMuted = !isAudioMuted;
            setIsAudioMuted(nextMuted);
            // Give subtle direct audio feedback when unmuting
            if (!nextMuted) {
              playClickSound(false);
            }
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 hover:bg-black/10 border border-black/5 text-black/60 hover:text-black transition-all text-[10px] font-mono tracking-wider cursor-pointer outline-none select-none"
          title={isAudioMuted ? "Play subtle feedback clicks" : "Mute click sound"}
          id="audio-toggle-btn"
        >
          {isAudioMuted ? (
            <>
              <VoicemailIcon size={11} strokeWidth={2.5} />
              <span className="opacity-80">MUTED</span>
            </>
          ) : (
            <>
              <VideoCameraIcon size={11} strokeWidth={2.5} className="animate-pulse text-black" />
              <span className="font-semibold text-black">SOUND ON</span>
            </>
          )}
        </button>
      </div>
      
      {/* 1. Technical Dotted Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          backgroundImage: "radial-gradient(rgba(0,0,0,0.1) 1.2px, transparent 1.2px)",
          backgroundSize: "16px 16px"
        }}
        id="dotted-grid"
      />

   

      {/* 3. Main Central Composition Wrapper with scale support */}
      <div className="relative w-full max-w-[500px] aspect-square flex flex-col items-center justify-center scale-[0.8] sm:scale-[0.9] md:scale-100 origin-center transition-all duration-500">
        
        {/* SVG Gooey Filter Definitions */}
        <svg className="absolute w-0 h-0" width="0" height="0">
          <defs>
            {/* Main gooey filter for the merged black frame */}
            <filter id="metaball-goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix 
                in="blur" 
                mode="matrix" 
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" 
                result="goo" 
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>

            {/* Micro gooey filter for the bottom-left white organic logo */}
            <filter id="logo-goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feColorMatrix 
                in="blur" 
                mode="matrix" 
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 16 -6" 
                result="goo" 
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>

        {/* --- METABALL CONTAINER WITH FLOATING MOTION --- */}
        <motion.div 
          className="relative w-[480px] h-[400px]" 
          id="metaball-stage"
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 6,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror"
          }}
        >
          
          {/* A. GOOEY BLACK BACKGROUND LAYER */}
          {/* This container merges the circles with a fluid connecting neck, inside an SVG filter */}
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={{ filter: "url(#metaball-goo)" }}
            id="gooey-background-layer"
          >
            {/* Top Circle Background */}
            <div 
              className="absolute bg-black rounded-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{
                width: "190px",
                height: "190px",
                top: "30px",
                left: "145px",
              }}
            />

            {/* Bottom-Right Circle Background */}
            <div 
              className="absolute bg-black rounded-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{
                width: "135px",
                height: "135px",
                top: "205px",
                left: "235px",
              }}
            />

            {/* Invisible Connector Circle - Bridges the gap to form the perfect organic bottleneck shape */}
            <div 
              className="absolute bg-black rounded-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{
                width: "100px",
                height: "100px",
                top: "140px",
                left: "215px",
              }}
            />
          </div>

          {/* B. IMAGE CONTENT LAYER (Clipped, perfectly concentric rounds) */}
          
          {/* 1. TOP CIRCLE PORTRAIT WRAPPER */}
          <div 
            className="absolute flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{
              width: "190px",
              height: "190px",
              top: "30px",
              left: "145px",
            }}
          >
            {/* Slightly smaller than parent to frame a perfect 6px black edge */}
            <div 
              className="w-[178px] h-[178px] rounded-full overflow-hidden bg-zinc-900 border border-black/5 relative group cursor-pointer"
              id="top-portrait-clip"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  className="w-full h-full relative"
                  initial={{ opacity: 0, scale: 1.15, filter: "blur(14px)" }}
                  animate={{ opacity: 1, scale: 1.05, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(14px)" }}
                  transition={{ 
                    duration: 0.6, 
                    ease: [0.25, 1, 0.5, 1],
                    filter: { duration: 0.35, ease: "easeOut" }
                  }}
           
              
                 
                >
                  <img
                    src={activeTab === "personal" ? PERSONAL_IMAGE_1 : BUSINESS_IMAGE_1}
                    alt={activeTab === "personal" ? "Creative portrait of a designer looking downward" : "Sophisticated corporate business portrait"}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle luxury high-fashion dark overlay grad */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-75 pointer-events-none" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* 2. BOTTOM-RIGHT PORTRAIT WRAPPER */}
          <div 
            className="absolute flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{
              width: "135px",
              height: "135px",
              top: "205px",
              left: "235px",
            }}
          >
            {/* Slightly smaller to provide exact 6px borders */}
            <div 
              className="w-[123px] h-[123px] rounded-full overflow-hidden bg-zinc-900 border border-black/5 relative group cursor-pointer"
              id="right-portrait-clip"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  className="w-full h-full relative"
                  initial={{ opacity: 0, scale: 1.2, filter: "grayscale(1) brightness(0.95) blur(14px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "grayscale(1) brightness(0.95) blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.9, filter: "grayscale(1) brightness(0.95) blur(14px)" }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.08, 
                    ease: [0.25, 1, 0.5, 1],
                    filter: { duration: 0.35, delay: 0.08, ease: "easeOut" }
                  }}
                >
                  <img
                    src={activeTab === "personal" ? PERSONAL_IMAGE_2 : BUSINESS_IMAGE_2}
                    alt={activeTab === "personal" ? "Warm side profile of a woman dreaming with closed eyes" : "Sleek professional business profile portrait"}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Soft dramatic contrast overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/15 to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* 3. SOLID BLACK BOTTOM-LEFT CIRCLE (Logo Node) */}
          {/* Note: Kept outside the gooey filter so its borders stay razor-sharp and 100% spherical, exactly as in the photo */}
          <motion.div 
            className="absolute rounded-full bg-black flex items-center justify-center shadow-lg cursor-pointer select-none"
            style={{
              width: "135px",
              height: "135px",
              top: "210px",
              left: "70px",
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            id="left-logo-node"
          >
            <AnimatePresence mode="wait">
              {activeTab === "personal" ? (
                /* PERSONAL LOGO: Organic fluid 3-blob molecule */
                <motion.div
                  key="personal-logo"
                initial={{ opacity: 0, rotate: -45, scale: 0.8  }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.8 , }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                  className="size-full flex items-center justify-center relative p-3"
                >
                  {/* Internal SVG using the micro gooey filter */}
                  <svg 
                    viewBox="0 0 100 100" 
                    className="w-14 h-14 text-white fill-current transition-transform duration-500 hover:rotate-12"
                  >
                    <g filter="url(#logo-goo)">
                      {/* Top Node */}
                      <circle cx="50" cy="40" r="10" />
                      {/* Bottom Left Node */}
                      <circle cx="38" cy="62" r="10" />
                      {/* Bottom Right Node */}
                      <circle cx="62" cy="62" r="10" />
                      {/* Center Core Node to fuse them nicely */}
                      <circle cx="50" cy="54" r="11" />
                    </g>
                  </svg>
                </motion.div>
              ) : (
                /* BUSINESS LOGO: Clean, premium geometric interlocking rings representing harmony & professionalism */
                <motion.div
                  key="business-logo"
                  initial={{ opacity: 0, scale: 0.8, rotate: 45 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: -45 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="size-full flex items-center justify-center relative"
                >
                  <svg 
                    viewBox="0 0 100 100" 
                    className="w-14 h-14 text-white fill-none stroke-current stroke-[5] stroke-linecap-round transition-transform duration-500 hover:rotate-9deg"
                  >
                    {/* Intersecting infinity professional geometric node */}
                    <path 
                      d="M 32 50 C 32 38, 48 38, 50 50 C 52 62, 68 62, 68 50 C 68 38, 52 38, 50 50 C 48 62, 32 62, 32 50 Z" 
                      strokeWidth="5.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="50" cy="50" r="3" className="fill-white" />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </motion.div>

        {/* 4. Interactive Capsule Toggle Switch at the bottom */}
        <div 
          className="mt-6 flex justify-center bg-black p-1.5 rounded-full w-[245px] h-[48px] items-center relative shadow-xl border border-white/5"
          id="toggle-capsule"
        >
          {/* Active white sliding pill identifier */}
          <div className="absolute inset-y-1.5 left-1.5 right-1.5 pointer-events-none flex">
            {activeTab === "business" ? (
              <motion.div 
                layoutId="active-pill-bg"
                className="w-1/2 h-full bg-white rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            ) : (
              <div className="w-1/2 h-full" />
            )}
            {activeTab === "personal" ? (
              <motion.div 
                layoutId="active-pill-bg"
                className="w-1/2 h-full bg-white rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            ) : (
              <div className="w-1/2 h-full" />
            )}
          </div>

          {/* Toggle buttons */}
          <button
            onClick={() => handleTabChange("business")}
            className={`w-1/2 h-full rounded-full text-xs font-semibold tracking-wide transition-colors duration-300 relative z-10 flex items-center justify-center gap-0.5 outline-none cursor-pointer ${
              activeTab === "business" ? "text-black" : "text-white/65 hover:text-white"
            }`}
            id="tab-btn-business"
          >
            <span>Business</span>
            <sup className="text-[8px] font-mono tracking-tighter opacity-70 -translate-y-1">01</sup>
          </button>

          <button
            onClick={() => handleTabChange("personal")}
            className={`w-1/2 h-full rounded-full text-xs font-semibold tracking-wide transition-colors duration-300 relative z-10 flex items-center justify-center gap-0.5 outline-none cursor-pointer ${
              activeTab === "personal" ? "text-black" : "text-white/65 hover:text-white"
            }`}
            id="tab-btn-personal"
          >
            <span>Personal</span>
            <sup className="text-[8px] font-mono tracking-tighter opacity-70 -translate-y-1">02</sup>
          </button>
        </div>

      </div>

    </div>
  );
}
