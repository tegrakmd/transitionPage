import React from 'react';

const VotraGallery = () => {
  const galleryItems = [
    {
      id: 'VTR_01',
      type: 'image',
      src: '/me.webp',
      caption: 'VTR 01.JPG',
      aspectRatio: 'aspect-square',
      colSpan: 'col-span-3' // Takes 3 out of 12 columns
    },
    {
      id: 'VTR_02',
      type: 'video', // Text overlay requires special handling
  
       src: 'https://arqe-storage-images.nyc3.cdn.digitaloceanspaces.com/landing-page/personal_boards/boards-bg-right.webp',
      caption: 'VTR 02.MP4',
      aspectRatio: 'aspect-[2/3]', // Taller portrait
      colSpan: 'col-span-3'
    },
    {
      id: 'VTR_03',
      type: 'image',
        src: '/lotion.jpg',
      caption: 'VTR 03.JPG',
      aspectRatio: 'aspect-[3/2]', // Wider landscape
      colSpan: 'col-span-3'
    },
    {
      id: 'VTR_04',
      type: 'video',
      src: 'https://arqe-storage-images.nyc3.cdn.digitaloceanspaces.com/landing-page/creative_work/media_library/1776514606019_Moodboard.webp',
      caption: 'VTR 04.MP4',
      aspectRatio: 'aspect-[2/3]',
      colSpan: 'col-span-3'
    },
    {
      id: 'VTR_07',
      type: 'image',
      src: '/soup.jpg',
      caption: 'VTR 07.JPG',
      aspectRatio: 'aspect-square',
      colSpan: 'col-span-3'
    }
    ,
    {
      id: 'VTR_05',
      type: 'image',
      src: 'https://arqe-storage-images.nyc3.cdn.digitaloceanspaces.com/landing-page/creative_work/media_library/1776514616001_Social_Content.webp',
      caption: 'VTR 05.JPG',
      aspectRatio: 'aspect-[1.5]',
      colSpan: 'col-span-3'
    },
      {
      id: 'VTR_09',
      type: 'image',
      src: 'https://arqe-storage-images.nyc3.cdn.digitaloceanspaces.com/landing-page/personal_boards/boards-bg-top.webp',
      caption: 'VTR 09.JPG',
      aspectRatio: 'aspect-square',
      colSpan: 'col-span-3'
    },
    {
      id: 'VTR_10',
      type: 'image',
      src: 'https://arqe-storage-images.nyc3.cdn.digitaloceanspaces.com/landing-page/personal_boards/boards-main.webp',
      caption: 'VTR 10.JPG',
      aspectRatio: 'aspect-[3/2]',
      colSpan: 'col-span-3'
    }
    ,
     {
      id: 'VTR_11',
      type: 'image',
      src: 'https://arqe-storage-images.nyc3.cdn.digitaloceanspaces.com/landing-page/personal_boards/boards-bg-top.webp',
      caption: 'VTR 11.JPG',
      aspectRatio: 'aspect-square',
      colSpan: 'col-span-3'
    },
    {
      id: 'VTR_12',
      type: 'image',
      src: 'https://arqe-storage-images.nyc3.cdn.digitaloceanspaces.com/landing-page/personal_boards/boards-main.webp',
      caption: 'VTR 12.JPG',
      aspectRatio: 'aspect-[3/2]',
      colSpan: 'col-span-3'
    },
    {
      id: 'VTR_06',
      type: 'image',
      src: '/lotion.jpg',
      caption: 'VTR 06.JPG',
      aspectRatio: 'aspect-[3/2]',
      colSpan: 'col-span-3'
    },
    {
      id: 'VTR_08',
      type: 'image',
      src: 'https://arqe-storage-images.nyc3.cdn.digitaloceanspaces.com/landing-page/personal_boards/boards-main.webp',
      caption: 'VTR 08.JPG',
      aspectRatio: 'aspect-square',
      colSpan: 'col-span-3'
    }
    
   
  ];
  return (
    <div className="min-h-screen bg-white text-black font-mono text-[10px] uppercase tracking-wide overflow-x-hidden selection:bg-black selection:text-white p-2 ">
      {/* Header Section */}
      <header className="flex justify-between items-center px-2 pt-12 mt-8 py-3 border-b border-transparent">
        <div className="flex items-center font-mono text-md">
          <span className="font-bold md:text-[14px] leading-tight  tracking-[0.10rem]">Votra,</span>
          <span className="text-gray-500 md:text-[14px] leading-tight  tracking-[0.10rem]">Identity, 2025</span>
          <button className="ml-1 hover:opacity-50 transition-opacity">
            <svg width="12" height="12  " viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
        
        {/* View Toggles (Decorative based on image) */}
        <div className="flex space-x-2 text-gray-400">
          <button className="hover:text-black transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <rect x="4" y="4" width="6" height="16"></rect>
              <rect x="14" y="4" width="6" height="16"></rect>
            </svg>
          </button>
          <button className="hover:text-black transition-colors">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
            </svg>
          </button>
           <button className="text-black hover:opacity-50 transition-opacity">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <rect x="2" y="2" width="5" height="5"></rect>
              <rect x="9" y="2" width="5" height="5"></rect>
              <rect x="16" y="2" width="5" height="5"></rect>
              <rect x="2" y="9" width="5" height="5"></rect>
              <rect x="9" y="9" width="5" height="5"></rect>
              <rect x="16" y="9" width="5" height="5"></rect>
              <rect x="2" y="16" width="5" height="5"></rect>
              <rect x="9" y="16" width="5" height="5"></rect>
              <rect x="16" y="16" width="5" height="5"></rect>
            </svg>
          </button>
        </div>
      </header>

      {/* Main Grid Container */}
      <main className="p-2">

        <div className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 items-start">
          
          {}
          {galleryItems.map((item, index) => (
            <div key={item.id} className="flex flex-col w-full group ">
              {/* Image Container with specific aspect ratio */}
              <div className={`w-full relative overflow-hidden bg-gray-100 ${item.aspectRatio}`}>
                <img 
                  src={item.src} 
                  alt={item.caption}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  loading="lazy"
                />
                
                {/* Special overlay for VTR_02 to mimic the design */}
                {item.id === 'VTR_03' && (
                  <div className="absolute inset-0 flex items-center justify-between px-4 text-white text-[12px] pointer-events-none mix-blend-difference *:font-mono">
                    <span>VOTRA</span>
                    <span>SOFT HUMAN ELEMENTS</span>
                    <span>2025</span>
                  </div>
                )}
              </div>
              
              {/* Caption positioned directly below, tight spacing */}
              <div className="mt-2 flex justify-start">
                <span className=" text-[14px] leading-tight  tracking-[0.12rem]">{item.caption}</span>
              </div>
            </div>
          ))}
          
        </div>
      </main>
    </div>
  );
};

export default VotraGallery;