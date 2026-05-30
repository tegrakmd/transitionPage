import dynamic from "next/dynamic";
import Image from "next/image";
import { LazyVideo } from "@/components/erq/LazyVideo";
import Navbar from "./navera";

const CreativeWork = dynamic(() => import("@/components/erq/projet"));
const FaqSection = dynamic(() =>
  import("@/components/erq/FaqSection").then((m) => ({ default: m.FaqSection })),
);
const Cta = dynamic(() =>
  import("@/components/erq/ctaVideo").then((m) => ({ default: m.Cta })),
);

const HERO_VIDEO =
  "https://arqe-storage-images.nyc3.cdn.digitaloceanspaces.com/landing-page/hero/video_url/1776517135434_Arqe_reel_8_smaller.mp4";
const COLLECTIONS_VIDEO =
  "https://arqe-storage-images.nyc3.cdn.digitaloceanspaces.com/landing-page/migrated/collections_landing_compressed.mp4";
const SEARCH_VIDEO =
  "https://arqe-storage-images.nyc3.cdn.digitaloceanspaces.com/landing-page/migrated/search_compressed.mp4";

export default function erqePage() {
  return (
    <main className=" bg-black font-suisse-intl">
      <Navbar />

      <section
        id="hero"
        className="pt-[118px] sm:pt-[188px] pb-[90px] sm:pb-[100px] px-6"
      >
        <div className="flex flex-col-reverse sm:flex-col items-center gap-[49px] sm:gap-[60px]">
          <div className="max-w-[360px] mx-auto flex flex-col items-center gap-[15px]">
            <h2
              className="text-foreground text-center text-[40px] sm:text-[60px] leading-[34px] sm:leading-[0.85] tracking-[-0.1rem] max-w-[260px] sm:max-w-none "
              style={{ fontWeight: 600 }}
            >
              <span>Art directed stock library</span>
            </h2>
            <p
              className="text-muted-foreground text-center text-[16px] leading-[1.2] max-w-[294px]"
              style={{ fontWeight: 400 }}
            >
              Browse &amp; download curated AI visuals — royalty free, 4K,
              created with intent.
            </p>
            <div className="mt-[15px]">
              <a
                href="/signup"
                className="bg-[#fafafa] font-[500] text-[#0a0a0a] px-[24px] py-[14px] rounded-[8px] text-[14px] leading-[14px] tracking-[-0.28px]  hover:opacity-80 transition-opacity duration-200 inline-block"
              >
                Get started
              </a>
            </div>
          </div>

          <div className="max-w-[922px] w-full mx-auto">
            <div className="rounded-lg overflow-hidden border-2 border-[#0000] ring-1 ring-muted-foreground/20">
              <LazyVideo
                src={HERO_VIDEO}
                priority
                autoPlay
                loop
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      <section
        id="curated_collections"
        className="px-5 sm:px-10 lg:px-[88px] pb-[90px] sm:pb-[138px]"
      >
        <div className="max-w-[1264px] mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-5 sm:gap-10 lg:gap-[116px]">
          <div className="w-full max-w-[618px] flex-shrink-0">
            <div className="rounded-[20px] overflow-hidden aspect-[4/3] sm:aspect-square">
              <LazyVideo
                src={COLLECTIONS_VIDEO}
                autoPlay
                loop
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col gap-5 items-start max-w-[360px]">
            <div className="flex flex-col gap-[5px]">
              <h2
                className="text-[#fafafa] text-[30px] leading-[34px] tracking-[-0.4px]"
                style={{ fontWeight: 600 }}
              >
                Curated collections
              </h2>
              <p
                className="text-[#a1a1a1] text-[16px] leading-[1.2] max-w-[280px] sm:max-w-none"
                style={{ fontWeight: 400 }}
              >
                <span>Themed sets handpicked by the Arqé</span>
                <span>
                  <br />
                  team. Made to inspire and streamline
                </span>
                <span>
                  <br />
                  your process.
                </span>
              </p>
            </div>
            <a
              href="/signup"
              className="bg-[#fafafa] text-[#0a0a0a] px-[24px] py-[14px] rounded-[8px] text-[14px] leading-[14px] tracking-[-0.28px] font-medium hover:opacity-80 transition-opacity duration-200 inline-block"
            >
              Explore now
            </a>
          </div>
        </div>
      </section>
      <section
        id="personal_boards"
        className="sm:px-10 lg:px-[88px] pb-[110px] sm:pb-[184px] overflow-hidden"
      >
        <div className="max-w-[1264px] mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-[139px]">
          <div className="flex flex-col gap-[20px] items-start order-2 lg:order-1 lg:w-[360px] lg:shrink-0 w-full px-5 sm:px-0 mt-[-75px] sm:mt-0">
            <div className="flex flex-col gap-[5px] w-full">
              <h2
                className="text-[#fafafa] text-[30px] leading-[34px] tracking-[-0.4px]"
                style={{ fontWeight: 600 }}
              >
                Personal boards
              </h2>
              <p
                className="text-[#a1a1a1] text-[16px] leading-[1.2] max-w-[270px] sm:max-w-none"
                style={{ fontWeight: 400 }}
              >
                <span>Curate your own image sets.</span>
                <span>
                  <br />
                  Organize ideas, campaigns, or
                </span>
                <span>
                  <br />
                  creative concepts with ease.
                </span>
              </p>
            </div>
            <a
              href="/signup"
              className="bg-[#fafafa] text-[#0a0a0a] px-[24px] py-[14px] rounded-[8px] text-[14px] leading-[14px] tracking-[-0.28px] font-medium hover:opacity-80 transition-opacity duration-200 inline-block"
            >
              Create a board
            </a>
          </div>

          <div
            className="relative order-1 lg:order-2 shrink-0"
            style={{ width: "100%", maxWidth: 711, aspectRatio: "711 / 819" }}
          >
            <div
              className="absolute overflow-hidden will-change-transform"
              style={{
                left: "29.7%",
                top: "0%",
                width: "25.3%",
                height: "29.2%",
                opacity: 0.1,
                zIndex: 1,
                transform: "translateY(9.645px)",
              }}
            >
              <Image
                src="https://arqe-storage-images.nyc3.cdn.digitaloceanspaces.com/landing-page/personal_boards/boards-bg-top.webp"
                alt=""
                fill
                sizes="(max-width: 711px) 25vw, 180px"
                className="object-cover"
                aria-hidden
              />
            </div>
            <div
              className="absolute overflow-hidden will-change-transform"
              style={{
                left: "0%",
                top: "24.4%",
                width: "44.2%",
                height: "50.7%",
                opacity: 1,
                zIndex: 2,
                transform: "translateY(16.8788px)",
              }}
            >
              <Image
                src="https://arqe-storage-images.nyc3.cdn.digitaloceanspaces.com/landing-page/personal_boards/boards-main.webp"
                alt="Personal boards preview"
                fill
                sizes="(max-width: 711px) 44vw, 314px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-neutral-900/20" />
              <div className="absolute flex flex-col bottom-4 right-4 gap-2">
                <div className="w-9 h-9 rounded-[6px] bg-[#fafafa] flex items-center justify-center shadow-lg">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="black"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div className="w-9 h-9 rounded-[6px] bg-[#fafafa] flex items-center justify-center shadow-lg">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                </div>
              </div>
            </div>
            <div
              className="absolute overflow-hidden will-change-transform"
              style={{
                left: "67.4%",
                top: "21%",
                width: "32.6%",
                height: "37.6%",
                opacity: 0.3,
                zIndex: 1,
                transform: "translateY(7.23375px)",
              }}
            >
              <Image
                src="https://arqe-storage-images.nyc3.cdn.digitaloceanspaces.com/landing-page/personal_boards/boards-bg-right.webp"
                alt=""
                fill
                sizes="(max-width: 711px) 33vw, 232px"
                className="object-cover"
                aria-hidden
              />
            </div>
            <div
              className="absolute overflow-hidden will-change-transform"
              style={{
                left: "43.2%",
                top: "67.6%",
                width: "28.1%",
                height: "32.4%",
                opacity: 0.2,
                zIndex: 1,
                transform: "translateY(12.0563px)",
              }}
            >
              <Image
                src="https://arqe-storage-images.nyc3.cdn.digitaloceanspaces.com/landing-page/personal_boards/boards-bg-bottom.webp"
                alt=""
                fill
                sizes="(max-width: 711px) 28vw, 200px"
                className="object-cover"
                aria-hidden
              />
            </div>
            <div
              className="absolute will-change-transform z-10"
              style={{
                left: "27.7%",
                top: "35%",
                width: "30.9%",
                transform: "translateY(24.1125px)",
              }}
            >
              <Image
                src="https://arqe-storage-images.nyc3.cdn.digitaloceanspaces.com/landing-page/personal_boards/Popup.png"
                alt="Boards panel"
                width={220}
                height={160}
                sizes="(max-width: 711px) 31vw, 220px"
                className="w-full"
                style={{ height: "auto" }}
              />
            </div>
          </div>
        </div>
      </section>
      <section
        id="advanced_search"
        className="px-6 sm:px-10 lg:px-[88px] pb-[120px] sm:pb-[184px]"
      >
        <div className="max-w-[1264px] mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-[116px]">
          <div className="w-full max-w-[618px] shrink-0">
            <div className="rounded-[20px] overflow-hidden aspect-square">
              <LazyVideo
                src={SEARCH_VIDEO}
                autoPlay
                loop
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col gap-[20px] items-start">
            <div className="flex flex-col gap-[5px] max-w-[360px]">
              <h2
                className="text-[#fafafa] text-[30px] leading-[34px] tracking-[-0.4px]"
                style={{ fontWeight: 600 }}
              >
                Advanced search
              </h2>
              <p
                className="text-[#a1a1a1] text-[16px] leading-[1.2] max-w-[280px] sm:max-w-none"
                style={{ fontWeight: 400 }}
              >
                <span>Search by keyword, tag, or even color.</span>
                <span>
                  <br />
                  Designed for fast, visual discovery.
                </span>
              </p>
            </div>
            <a
              href="/signup"
              className="bg-[#fafafa] text-[#0a0a0a] px-[24px] py-[14px] rounded-[8px] text-[14px] leading-[14px] tracking-[-0.28px] font-medium hover:opacity-80 transition-opacity duration-200 inline-block"
            >
              Try now
            </a>
          </div>
        </div>
      </section>
      <CreativeWork />
      <FaqSection />
      <Cta />
    </main>
  );
}
