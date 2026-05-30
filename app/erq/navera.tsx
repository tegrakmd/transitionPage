
// Navbar.tsx
import React from 'react';

// ───────────────────── Icône Logo réutilisable ─────────────────────
const LogoIcon: React.FC = () => (
  <svg
    className="h-[22px] w-[51px] text-[#fafafa]"
    viewBox="0 0 599 256"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M76.6229 0H114.654L191.85 205.752H152.399L136.217 160.06H52.7924L36.8974 205.752H0L76.6229 0ZM63.2816 129.976H125.43L94.2124 41.7184L63.2816 129.976Z"
      fill="currentColor"
    />
    <path
      d="M288.616 53.3532V87.4105C282.947 86.8496 277.554 86.5632 272.446 86.5632C251.158 86.5632 238.95 95.0716 238.95 125.728V205.764H205.179V53.0788H238.389V80.3222C246.611 63.2935 261.372 53.0788 279.821 52.7924C282.375 52.7924 286.062 53.0788 288.616 53.3532Z"
      fill="currentColor"
    />
    <path
      d="M401.277 53.0668H435.048V255.418H401.277V185.609C392.196 200.644 376.301 209.451 355.871 209.451C318.413 209.451 290.31 178.52 290.31 129.415C290.31 80.3103 318.401 49.6659 355.871 49.6659C376.301 49.6659 392.196 58.4606 401.277 73.5084V53.0668ZM363.258 77.1957C339.415 77.1957 325.513 96.778 325.513 129.415C325.513 162.052 339.415 181.921 363.258 181.921C385.107 181.921 402.709 164.606 402.709 129.415C402.709 94.2243 385.107 77.1957 363.258 77.1957Z"
      fill="currentColor"
    />
    <path
      d="M484.368 139.057C486.635 167.434 506.504 181.348 525.799 181.348C543.675 181.348 557.303 174.535 563.258 160.06H596.468C589.654 184.463 566.384 209.439 527.22 209.439C478.126 209.439 450.024 172.255 450.024 128.27C450.024 84.284 481.814 49.6539 524.952 49.6539C571.778 49.6539 601.301 87.9713 598.174 139.045H484.368V139.057ZM484.368 114.368H563.831C562.983 90.5251 544.821 76.0501 524.952 76.0501C509.057 76.0501 487.494 85.7041 484.368 114.368ZM533.174 32.9236H507.351L533.747 0H573.473L533.174 32.9236Z"
      fill="currentColor"
    />
  </svg>
);

// ───────────────────── Icône Hamburger ─────────────────────
const HamburgerIcon: React.FC = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      x1="4"
      y1="8"
      x2="20"
      y2="8"
      stroke="#ffffff"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="4"
      y1="16"
      x2="20"
      y2="16"
      stroke="#ffffff"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// ───────────────────── Composant Navbar unifié ─────────────────────
const Navbar: React.FC = () => {
  return (
    <>
      {/* ========== Mobile ========== */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 px-[20px] pt-[45px]">
        <div
          className="backdrop-blur-[15px] rounded-[10px] overflow-clip p-[10px]"
          style={{ backgroundColor: 'rgba(23, 23, 23, 0.8)' }}
        >
          <div className="flex items-center justify-center w-full">
            <div className="flex flex-1 items-center pl-[15px]">
              <a
                className="flex items-center justify-center h-[22px] w-[51px]"
                href="/"
              >
                <LogoIcon />
              </a>
            </div>
            <div className="flex flex-1 items-center justify-end gap-[10px] pr-[15px]">
              <div className="h-[40px] w-[121px]" />
              <button
                type="button"
                aria-label="Open menu"
                className="flex items-center justify-center w-[44px] h-[44px] -mr-[10px]"
              >
                <HamburgerIcon />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========== Desktop ========== */}
      <nav
        className="hidden lg:block fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-0 lg:flex lg:justify-center transition-opacity duration-200"
        style={{ paddingTop: 40, opacity: 1, pointerEvents: 'auto' }}
      >
        <div
          className="lg:flex w-full max-w-[800px] items-center rounded-[10px] backdrop-blur-[15px] overflow-hidden p-[10px]"
          style={{ backgroundColor: 'rgba(23, 23, 23, 0.8)' }}
        >
          <div className="flex items-center justify-between w-full">
            {/* Liens de gauche */}
            <div className="flex items-center gap-[15px] pl-[10px]">
              <a
                href="#curated_collections"
                className="font-medium text-[#fafafa] hover:opacity-70 transition-opacity duration-200"
              
              >
                Features
              </a>
              <a
                href="/pricing"
                className="font-medium text-[#fafafa] hover:opacity-70 transition-opacity duration-200"
           
              >
                Pricing
              </a>
              <a
                href="#faq"
                className="font-medium text-[#fafafa] hover:opacity-70 transition-opacity duration-200"
            
              >
                FAQs
              </a>
            </div>

            {/* Logo centré */}
            <a className="absolute left-1/2 -translate-x-1/2" href="/">
              <LogoIcon />
            </a>

            {/* Boutons de droite */}
            <div className="flex items-center gap-[8px]">
              <a
                className="flex items-center justify-center px-[24px] py-[14px] rounded-[8px] font-medium text-[#fafafa] hover:opacity-70 transition-opacity duration-200"
                href="/login"
               
              >
                Log in
              </a>
              <a
                className="flex items-center justify-center px-[24px] py-[14px] rounded-[8px] bg-[#fafafa] font-medium text-[#0a0a0a] hover:opacity-80 transition-opacity duration-200"
                href="/signup"
             
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
// export default DesktopNavbar;