import React, { forwardRef } from "react";
import Image from "next/image";
import HeroCTASection from "./HeroCTASection";
import HeroFoods from "./HeroFoods";

type Props = {
  pizzaRef: React.RefObject<HTMLDivElement | null>;
};

const HeroSection = forwardRef<HTMLDivElement, Props>(
  ({ pizzaRef }, heroSectionRef) => {
    return (
      <div className="h-screen  relative w-screen " ref={heroSectionRef}>
        <HeroCTASection />
        <HeroFoods />
        <div
          ref={pizzaRef}
          className="h-360 w-screen hidden lg:grid place-items-center absolute top-[60%]"
        >
          <div className="aspect-square h-full max-w-full rounded-full">
            <Image
              src="/Pizza.png"
              alt="pizza"
              width={500}
              height={500}
              className="w-full"
              priority
            />
          </div>
        </div>
        <div className="block lg:hidden aspect-square w-full  absolute bottom-0 left-0 h-[30vh] md:h-[40vh] overflow-hidden">
          <Image
            src="/Pizza.png"
            alt="pizza"
            width={500}
            height={500}
            className="w-full"
            priority
          />
        </div>
        <div className="z-50 w-full absolute bottom-0 left-0 h-45 bg-linear-to-b from-white/0 to-[#FDFDFD] block lg:hidden"></div>
      </div>
    );
  },
);

HeroSection.displayName = "HeroSection";
export default HeroSection;
