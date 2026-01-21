"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const pizzaRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const target1Ref = useRef<HTMLDivElement>(null);
  const target2Ref = useRef<HTMLDivElement>(null);
  const target3Ref = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const listSectionRef = useRef<HTMLDivElement>(null);
  const wholePizzaSectionRef = useRef<HTMLDivElement>(null);
  const chefSectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!pizzaRef.current || !containerRef.current) return;

    const pizza = pizzaRef.current;
    const target1 = target1Ref.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroSectionRef.current,
        start: "80% 78%",
        end: "bottom 10%",
        scrub: 1,
        markers: false,
      },
    });
    tl.fromTo(
      pizza,
      {
        scale: 1,
        rotate: 0,
        transformOrigin: "center center",
        // transform: "translate(-50%, 0%)",
      },
      {
        scale: 1,
        duration: 1,
        rotate: 180,
        transformOrigin: "center center",
        transform: "translate(0%, 0%)",
        x: target1
          ? target1.getBoundingClientRect().left -
            pizza.getBoundingClientRect().left
          : 0,
        y: target1
          ? target1.getBoundingClientRect().top -
            pizza.getBoundingClientRect().top
          : 0,
        translate: "0 0",
        height: target1
          ? target1.getBoundingClientRect().height
          : pizza.getBoundingClientRect().height,
        width: target1
          ? target1.getBoundingClientRect().width
          : pizza.getBoundingClientRect().width,
        ease: "sine.inOut",
      },
    );

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: listSectionRef.current,
        start: "90% 78%",
        end: "bottom 10%",
        scrub: 1,
        markers: true,
      },
    });

    tl2.to(pizza, {
      scale: 1,
      duration: 1,
      rotate: 360,
      transformOrigin: "center center",
      ease: "sine.inOut",
      x: target2Ref.current
        ? target2Ref.current.getBoundingClientRect().left -
          pizza.getBoundingClientRect().left
        : 0,
      y: target2Ref.current
        ? target2Ref.current.getBoundingClientRect().top -
          pizza.getBoundingClientRect().top
        : 0,
      translate: "0 0",
      height: target2Ref.current
        ? target2Ref.current.getBoundingClientRect().height
        : pizza.getBoundingClientRect().height,
      width: target2Ref.current
        ? target2Ref.current.getBoundingClientRect().width
        : pizza.getBoundingClientRect().width,
    });

    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: wholePizzaSectionRef.current,
        start: "100% 78%",
        end: "bottom 10%",
        scrub: 1,
        markers: true,
      },
    });

    tl3.to(pizza, {
      scale: 1,
      duration: 1,
      rotate: 540,
      transformOrigin: "center center",
      ease: "sine.inOut",
      x: target3Ref.current
        ? target3Ref.current.getBoundingClientRect().left -
          pizza.getBoundingClientRect().left
        : 0,
      y: target3Ref.current
        ? target3Ref.current.getBoundingClientRect().top -
          pizza.getBoundingClientRect().top
        : 0,
      translate: "0 0",
      height: target3Ref.current
        ? target3Ref.current.getBoundingClientRect().height
        : pizza.getBoundingClientRect().height,
      width: target3Ref.current
        ? target3Ref.current.getBoundingClientRect().width
        : pizza.getBoundingClientRect().width,
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col bg-zinc-50 dark:bg-black">
      {/* Hero Section */}
      <div
        className="h-screen bg-amber-300 relative w-full "
        ref={heroSectionRef}
      >
        <div
          ref={pizzaRef}
          className="h-260 w-screen  grid place-items-center absolute top-1/2 "
        >
          <div className="aspect-square h-full max-w-full rounded-full ">
            <Image
              src="/Pizza.png"
              alt="pizza"
              width={500}
              height={500}
              className="w-full "
            />
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-[50vh] pb-96">
        {/* Section 1 */}
        <div
          className="grid grid-cols-3 px-20 py-80 bg-violet-500"
          ref={listSectionRef}
        >
          <div className="size-64 rounded-full bg-red-400"></div>
          <div
            className="target-circle size-64 rounded-full bg-yellow-400"
            ref={target1Ref}
          ></div>
          <div className="size-64 rounded-full bg-red-400"></div>
        </div>

        {/* Section 2 */}
        <div className="grid grid-cols-3 px-20" ref={wholePizzaSectionRef}>
          <div className="size-64 rounded-full bg-red-400"></div>
          <div className="size-64 rounded-full bg-red-400"></div>
          <div
            className="target-circle size-64 rounded-full bg-yellow-400 "
            ref={target2Ref}
          ></div>
        </div>

        {/* Section 3 */}
        <div className="grid grid-cols-3 px-20" ref={chefSectionRef}>
          <div
            className="target-circle size-64 rounded-full bg-yellow-400 opacity-20"
            ref={target3Ref}
          ></div>
          <div className="size-64 rounded-full bg-red-400"></div>
          <div className="size-64 rounded-full bg-red-400"></div>
        </div>
      </div>
    </div>
  );
}
