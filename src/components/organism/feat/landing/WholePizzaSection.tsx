import Button from "@/components/atom/Button";
import WavyText from "@/components/atom/WavyText";
import { STATIC_CONTENT_KEYS } from "@/lib/constants";
import { fetchStaticContent } from "@/lib/fetch-static-content";
import { sanitizeHtml } from "@/lib/sanitize-html";
import { IStaticContent } from "@/types/staticContent.type";
import Image from "next/image";
import Link from "next/link";
import React, { forwardRef } from "react";

type Props = {
  targetRef: React.RefObject<HTMLDivElement | null>;
  staticContent: IStaticContent;
};

const WholePizzaSection = forwardRef<HTMLDivElement, Props>(
  ({ targetRef, staticContent }, ref) => {
    const rawData = fetchStaticContent(
      STATIC_CONTENT_KEYS.FULL_PIZZA_SECTION,
      staticContent,
    );
    const content = rawData?.value || {};
    return (
      <div className="bg-[#FFFFED] pt-25" ref={ref}>
        <div className="w-300 max-w-[90%] mx-auto flex flex-col lg:grid md:grid-cols-2 gap-10">
          <div className="flex flex-col justify-center w-full lg:w-194.25 text-center lg:text-left pb-10 ">
            <div className="text-2xl md:text-4xl font-extrabold space-y-1 mb-6">
              <h2 className="">{content.title?.prefix}</h2>
              <WavyText className="">{content.title?.highlight}</WavyText>
            </div>
            <div
              className="flex flex-col gap-2 font-light text-base  w-150 mx-auto lg:mx-0 max-w-full md:max-w-[70%]  mb-10"
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(content.description),
              }}
            />
            <Link href="/menu">
              <Button className="w-fit">Order Now</Button>
            </Link>
          </div>
          <div className="flex justify-end items-center flex-col  w-full  relative">
            <Image src="/flourFloor.png" alt="pizza" width={580} height={500} />
            <div
              className="size-80  rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              ref={targetRef}
            ></div>
            <Image
              src="/Pizza.png"
              alt="Pizza"
              className="block max-w-[50%] mdlg:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              width={280}
              height={280}
            />
          </div>
        </div>
      </div>
    );
  },
);

WholePizzaSection.displayName = "WholePizzaSection";

export default WholePizzaSection;
