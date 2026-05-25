"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ReactLenis, LenisRef } from "lenis/react";
import { SplitText } from "@/components/splitText";



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
            const sectionInner = section.querySelector(".section-inner");
            gsap.fromTo(sectionInner, {
                xPercent: 6.0851,
                rotation: 10.5998,
                transformOrigin: "0% 0%",
            }, {
                xPercent: 0,
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
                            <div className="m-auto ">
                                <SplitText as="h1"
                                    className="text-[15vw] font-bold text-white font-mono uppercase tracking-[-0.2rem]"
                                    duration={1}
                                    stagger={0.075}
                                    delay={1}>
                                    Transition Section 1
                                </SplitText>
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
                    <section className="Section four ">
                        <div className="section-inner">

                            <div className="m-auto ">
                                <h1>Transition Section 4</h1>
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
                    <div className="flex items-center justify-center size-full">

                        <h1 className="">FooteR</h1>

                    </div>
                </footer>
            </ReactLenis>
        </>
    );
}
