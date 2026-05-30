import React, { useState } from 'react';

import { DeviceTabletIcon, MonitorArrowUpIcon, PhoneCallIcon, SunDimIcon } from '@phosphor-icons/react';

const LogoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="12" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="12" cy="17.5" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="7.5" cy="9.5" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="16.5" cy="9.5" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="7.5" cy="14.5" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="16.5" cy="14.5" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

export default function previenOne() {
  const [view, setView] = useState('mobile');

  // Define dimensions for different device views
  const frameStyles = {
    desktop: { width: '100%', height: '100dvh' },
    tablet: { width: '600px', height: '700px' },
    mobile: { width: '375px', height: '750px' }
  };

  return (
    <div className="min-h-svh bg-[#0a0a0a] flex flex-col items-center justify-center  font-sans selection:bg-blue-500/30 relative overflow-hidden">
      
      {/* Dynamic Device Frame */}
      <div 
        className="relative overflow-hidden bg-black text-white ring-1 ring-[#2a2a2a]  border-3 border-background rounded-4xl shadow-2xl transition-all duration-500 ease-in-out shrink-0"
        style={frameStyles[view as keyof typeof frameStyles]}
   
      >
        {/* Background Image & Color Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop" 
            alt="Background portrait" 
            className="w-full h-full object-cover object-center opacity-80"
          />
          {/* Complex gradient to simulate the studio lighting effect in the design */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#020611] via-[#0a1e3f]/80 to-[#124b91]/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          {/* subtle blue light from left */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/10 to-transparent mix-blend-overlay" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full h-full p-8 md:p-12 flex flex-col">
          
          {/* Header */}
          <header className="flex justify-between items-start w-full">
            <span className="tracking-[0.15em] text-sm font-semibold uppercase text-white/90">Unnamed</span>
            <button className="text-sm border-b border-white/40 pb-0.5 hover:border-white transition-colors">
              Get in touch
            </button>
          </header>

          {/* Main Body */}
          <main className="mt-auto mb-16 md:mb-24 flex flex-col justify-end h-full">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-[2rem] uppercase font-black text-balance leading-[1.05] tracking-tight mb-6">
                Creative<br className="md:hidden" /> {view === 'mobile' ? 'text-md' : ' '}Duo
              </h2>
              
              <p className={`text-[10px] text-balance md:text-base leading-relaxed text-gray-200 mb-8 ${view === 'mobile' ? 'max-w-[380px]' : 'max-w-[420px]'}`}>
                On an endless journey to create experiences that inspire others. Always motivated by design that's honest, aesthetic and natural. Probably the only designer you'll ever need.
              </p>
              
              <div>
                <button className="inline-block text-sm font-medium border-b border-white/40 pb-0.5 hover:border-white transition-colors">
                  See our work
                </button>
              </div>
            </div>
          </main>

          {/* Footer Data (Hidden on mobile view) */}
          <div className={`absolute bottom-12 right-12 text-right flex flex-col gap-3 text-sm transition-opacity duration-300 ${view === 'mobile' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <span className="text-[10px] tracking-[0.2em] font-semibold text-white/60 mb-1 uppercase">Follow us</span>
            
            <a href="#" className="flex gap-3 justify-end items-center group hover:text-white/80 transition-colors">
              <span className="text-white/40 font-mono text-xs">001 —</span> 
              <span className="font-medium">Instagram</span>
            </a>
            <a href="#" className="flex gap-3 justify-end items-center group hover:text-white/80 transition-colors">
              <span className="text-white/40 font-mono text-xs">002 —</span> 
              <span className="font-medium">Behance</span>
            </a>
            <a href="#" className="flex gap-3 justify-end items-center group hover:text-white/80 transition-colors">
              <span className="text-white/40 font-mono text-xs">003 —</span> 
              <span className="font-medium">Twitter</span>
            </a>
          </div>

        </div>
      </div>

      {/* Control Bar */}
      <div className="sticky top-0 bottom-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-2  flex items-center gap-6 shadow-2xl z-50">
        
        {/* Left Logo */}
        <div className="text-gray-400 p-2 cursor-pointer hover:text-white transition-colors">
          <LogoIcon />
        </div>

        {/* View Toggles */}
        <div className="flex items-center gap-2">
          {[
            { id: 'desktop', icon: MonitorArrowUpIcon },
            { id: 'tablet', icon: DeviceTabletIcon },
            { id: 'mobile', icon: PhoneCallIcon }
          ].map((device) => {
            const Icon = device.icon;
            const isActive = view === device.id;
            return (
              <button
                key={device.id}
                onClick={() => setView(device.id)}
                className={`relative p-2.5 rounded-lg transition-all duration-200 group flex flex-col items-center justify-center
                  ${isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'}
                `}
              >
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                {/* Active Indicator Line */}
                <div className={`absolute -bottom-1 h-[2px] w-4 bg-white rounded-full transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-[#333]" />

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-white p-2 transition-colors">
            <SunDimIcon size={18} />
          </button>
          
          <button className="bg-white text-black px-5 py-2 rounded-md text-sm font-semibold hover:bg-gray-100 transition-colors active:scale-95">
            Buy
          </button>
        </div>

      </div>

    </div>
  );
}