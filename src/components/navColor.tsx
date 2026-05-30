import  { useState } from 'react';

export  function NavColorComp() {
  // Gestion de la couleur active et des couleurs de la palette
  const [activeColor, setActiveColor] = useState('rgb(50, 47, 36)');
  const [palette, setPalette] = useState([
    'rgb(48, 44, 33)',
    'rgb(200, 181, 167)',
    'rgb(131, 116, 99)',
    'rgb(102, 102, 77)',
    'rgb(155, 157, 123)',
    'rgb(149, 147, 148)',
  ]);

  // Fonction pour échanger la couleur cliquée avec la couleur active
  const handleColorClick = (clickedColor: string, index: number) => {
    const newPalette = [...palette];
    newPalette[index] = activeColor;
    setActiveColor(clickedColor);
    setPalette(newPalette);
  };

  return (
    <div className="fixed bottom-4 z-300 left-1/2 -translate-x-1/2">
      {/* Main Floating Container */}
      <div className="flex items-center gap-3 p-2 w-fit mx-auto border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-lg rounded-full shadow-2xl">
        
        {/* Upload Image Section */}
        <div className="w-9 h-9 relative rounded-full group cursor-pointer overflow-visible">
          {/* Hidden File Input */}
          <input 
            type="file" 
            accept="image/*" 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30" 
            title="Upload image"
          />
          
          <div className="absolute inset-0 rounded-full border border-white/20 shadow-inner overflow-hidden">
            <img 
              alt="Uploaded workspace" 
              className="w-full h-full object-cover" 
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100&h=100&fit=crop" 
            />
          </div>

          {/* Hover Pencil Icon Overlay */}
          <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-3.5 h-3.5 text-white scale-50 group-hover:scale-100 transition-transform duration-300"
            >
              <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
              <path d="m15 5 4 4"></path>
            </svg>
          </div>
        </div>

        {/* Separator Dot */}
        <div className="w-1 h-1 rounded-full bg-white/10"></div>

        {/* Color Palette Section */}
        <div className="flex items-center">
          
          {/* Active Color */}
          <div className="w-5 h-5 relative flex items-center justify-center">
            <button 
              type="button" 
              className="absolute inset-0 rounded-full border border-white/5" 
              style={{ background: activeColor }}
            >
              <span className="absolute inset-[-3px] ring-[1.5px] m-auto rounded-full ring-white transition-all duration-300"></span>
            </button>
          </div>

          {/* Vertical Divider */}
          <div className="h-4 w-px bg-white/10 mx-3"></div>

          {/* Palette Colors */}
          <div className="h-5 flex gap-2">
            {palette.map((color, idx) => (
              <div key={idx} className="w-5 h-5 relative">
                <button 
                  type="button" 
                  onClick={() => handleColorClick(color, idx)}
                  className="absolute inset-0 border border-white/5 rounded-full w-5 h-5 hover:scale-110 transition-transform duration-200" 
                  style={{ background: color }}
                ></button>
              </div>
            ))}
          </div>

        </div>

        {/* Separator Dot */}
        <div className="w-1 h-1 rounded-full bg-white/10"></div>

        {/* Action/Copy Button */}
        <button 
          type="button" 
          className="relative flex items-center justify-center w-9 h-9 mr-0.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/5 text-white/70 hover:text-white transition-all duration-200"
          title="Duplicate"
        >
          <svg 
            className="w-3.5 h-3.5 absolute inset-0 m-auto" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 16 16" 
            fill="currentColor"
          >
            <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .439 1.061V9.5A1.5 1.5 0 0 1 12 11V8.621a3 3 0 0 0-.879-2.121L9 4.379A3 3 0 0 0 6.879 3.5H5.5Z"></path>
            <path d="M4 5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 14h5a1.5 1.5 0 0 0 1.5-1.5V8.621a1.5 1.5 0 0 0-.44-1.06L7.94 5.439A1.5 1.5 0 0 0 6.878 5H4Z"></path>
          </svg>
        </button>

      </div>
    </div>
  );
}