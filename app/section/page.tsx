"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ReactLenis, LenisRef } from "lenis/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
    // 1. On type correctement la ref Lenis et la ref du container
    const lenisRef = useRef<LenisRef | null>(null);
    const containerRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        // 2. On type le paramètre 'time' en number
        function update(time: number) {
            lenisRef.current?.lenis?.raf(time * 1000);
        }

        lenisRef.current?.lenis?.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);

        return () => gsap.ticker.remove(update);
    }, []);

    // 3. Le return est bien à l'intérieur de la fonction Page
    useGSAP(() => {
        const sections = document.querySelectorAll(".Section");
        sections.forEach((section, index) => {
            const container = section.querySelector(".section-inner");
            gsap.to(container, {
                rotation: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "top 20%",
                    scrub: true,
                },
            });
            if (index === sections.length - 1) return;
            ScrollTrigger.create({
                trigger: section,
                start: "bottom bottom",
                end: "bottom top",
                pin: true,
                pinSpacing: false
            })
        });
    }, { scope: containerRef });
    return (
        <>
            <ReactLenis root options={{
                autoRaf: false,
            }} ref={lenisRef}>

                <main ref={containerRef}>
                    <section className="Section one">
                        <div className="section-inner">
                            <div className="col">
                                <div className="my-auto ">
                                    <h1>Transition Section 1</h1>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="Section two">
                        <div className="section-inner">
                            <div className="m-auto ">
                                <h1>Transition Section 2</h1>
                            </div>
                        </div>
                    </section>
                    <section className="Section three">
                        <div className="section-inner">
                            <div className="m-auto ">
                                <h1>Transition Section 3</h1>
                            </div>
                        </div>
                    </section>
                    <section className="Section four md:h-[130svh]">
                        <div className="section-inner">
                            <div className="flex  flex-col">
                                <div className="m-auto ">
                                    <h1>Transition Section 4</h1>
                                </div>
                                <div className="max-w-[30%] w-full">
                                    <Image alt="image" src="/1.jpg" width={400} height={400} className="rounded-md object-cover size-full"></Image>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="Section five">
                        <div className="section-inner">
                            <div className="m-auto ">
                                <h1>Transition Section 5</h1>
                            </div>
                        </div>
                    </section>
                    <section className="Section six">
                        <div className="section-inner">
                            <div className="m-auto ">
                                <h1>Transition Section 6</h1>
                            </div>
                        </div>
                    </section>

                </main>
                <footer className="bg-black w-full h-[50svh] w-full">
                    <div className="">

                        <h1 className="flex items-center justify-center my-auto">Footer</h1>

                    </div>
                </footer>
            </ReactLenis>
        </>
    );
}
