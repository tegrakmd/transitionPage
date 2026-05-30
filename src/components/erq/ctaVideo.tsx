export function Cta(){
    return <section id="video" className="px-5 sm:px-6 lg:px-10 pb-0">
  <div
    className="relative rounded-[14px] w-full aspect-[2.3/1] min-h-[400] overflow-hidden" 
  >
    <div className="absolute inset-0">
      <video
        autoPlay
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://arqe-storage-images.nyc3.cdn.digitaloceanspaces.com/landing-page/migrated/Gd5sfX1JYNTJcsZSce7DsciNWI_optimized.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(0, 0, 0, 0.15)" }} />
    </div>

    <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
      <div
        className="flex flex-col items-center gap-[25px]"
        style={{ maxWidth: 262 }}
      >
        <div className="flex flex-col items-center gap-[10px]">
          <p
            className="text-white text-[15px] leading-[18px] tracking-[-0.15px] text-center whitespace-nowrap"
            style={{
              fontWeight: 500,
              opacity: 0.4,
            }}
          >
            Welcome to Arqé
          </p>
          <h2
            className="text-white text-[35px] leading-[1] tracking-[-0.35px] text-center"
            style={{ fontWeight: 500 }}
          >
            <span>The library for what's next.</span>
          </h2>
        </div>
        <a
          href="/signup"
          className="text-white hover:text-[#0a0a0a] text-[14px] leading-[14px] tracking-[-0.28px] rounded-[8px] bg-white/10 hover:bg-white backdrop-blur-[20px] transition-all duration-200 inline-block text-center"
          style={{
            fontWeight: 500,
            padding: "14px 24px",
          }}
        >
          Get started from $29/mo
        </a>
      </div>
    </div>
  </div>
</section>
}