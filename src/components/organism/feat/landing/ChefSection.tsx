import Button from "@/components/atom/Button";
import WavyText from "@/components/atom/WavyText";
import PizzaShowcaseCard from "@/components/molecule/PizzaShowcaseCard";
import Image from "next/image";
import Link from "next/link";
import React, { forwardRef } from "react";

type Props = {
  targetRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
};

const ChefSection = forwardRef<HTMLDivElement, Props>(
  ({ targetRef, className }, ref) => {
    return (
      <div className={`bg-[#FFFFED] pt-25 pb-30 ${className}`} ref={ref}>
        <div className="my-width max-w-full mx-auto grid lg:grid-cols-2 gap-10  ">
          <div className="flex justify-end items-center flex-col  w-full  relative order-2 lg:order-1  ">
            <Image
              src="/chef.png"
              alt="pizza"
              width={564}
              height={500}
              className="max-w-full"
            />
            <div
              className="size-[25%]  lg:size-39  rounded-full absolute top-[22%] right-[18%]"
              ref={targetRef}
            >
              {targetRef && (
                <Image
                  src="/Pizza.png"
                  alt="pizza"
                  width={156}
                  height={156}
                  className="lg:hidden"
                />
              )}
            </div>
          </div>
          <div className="flex flex-col justify-center w-full md:w-194.25 max-w-full text-center lg:text-left pb-5 lg:pb-10 order-1 lg:order-2 ">
            <div className="text-2xl md:text-4xl font-extrabold space-y-1 mb-6">
              <h2 className="">
                Meet the <WavyText className="inline">Maestro</WavyText>
              </h2>
              <WavyText className="">Behind the Magic!</WavyText>
            </div>
            <div className="flex flex-col gap-2 font-light text-base w-full  md:w-150 mx-auto lg:mx-0 max-w-full md:max-w-[70%]  mb-10">
              <p className="">
                Subheading that sets up context, shares more info about the
                website, or generally gets people psyched to keep scrolling.
              </p>
              <p className="">
                Subheading that sets up context, shares more info about the
                website, or generally gets people psyched to keep scrolling.
              </p>
            </div>
            {targetRef && (
              <Link href="/about-us">
                <Button className="w-fit">Learn More</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  },
);

ChefSection.displayName = "ChefSection";

export default ChefSection;
