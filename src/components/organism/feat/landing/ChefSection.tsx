import Button from "@/components/atom/Button";
import WavyText from "@/components/atom/WavyText";
import PizzaShowcaseCard from "@/components/molecule/PizzaShowcaseCard";
import Image from "next/image";
import Link from "next/link";
import React, { forwardRef } from "react";

type Props = {
  targetRef: React.RefObject<HTMLDivElement | null>;
};

const ChefSection = forwardRef<HTMLDivElement, Props>(({ targetRef }, ref) => {
  return (
    <div className="bg-[#FFFFED] pt-25 pb-30" ref={ref}>
      <div className="w-300 max-w-full mx-auto grid grid-cols-2 gap-10 ">
        <div className="flex justify-end items-center flex-col  w-full  relative ">
          <Image src="/chef.png" alt="pizza" width={564} height={500} />
          <div
            className="size-39  rounded-full absolute top-[22%] right-[18%]"
            ref={targetRef}
          ></div>
        </div>
        <div className="flex flex-col justify-center w-194.25 text-left pb-10 ">
          <div className="text-4xl font-extrabold space-y-1 mb-6">
            <h2 className="">
              Meet the <WavyText className="inline">Maestro</WavyText>
            </h2>
            <WavyText className="">Behind the Magic!</WavyText>
          </div>
          <div className="flex flex-col gap-2 font-light text-base  w-150 max-w-full  mb-10">
            <p className="">
              Subheading that sets up context, shares more info about the
              website, or generally gets people psyched to keep scrolling.
            </p>
            <p className="">
              Subheading that sets up context, shares more info about the
              website, or generally gets people psyched to keep scrolling.
            </p>
          </div>
          <Link href="#">
            <Button className="w-fit">Learn More</Button>
          </Link>
        </div>
      </div>
    </div>
  );
});

ChefSection.displayName = "ChefSection";

export default ChefSection;
