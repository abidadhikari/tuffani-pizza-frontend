"use client";
import Button from "@/components/atom/Button";
import WavyText from "@/components/atom/WavyText";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useGetStaticContent } from "@/hooks/services/static-content/useGetStaticContent";
import { STATIC_CONTENT_KEYS } from "@/lib/constants";
import { fetchStaticContent } from "@/lib/fetch-static-content";
import { IStaticContent } from "@/types/staticContent.type";
import { UseEmblaCarouselType } from "embla-carousel-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function HeroCTASection(props: {
  staticContent: IStaticContent;
}) {
  const { staticContent } = props;
  const [api, setApi] = useState<UseEmblaCarouselType[1]>();

  useEffect(() => {
    if (!api || api?.scrollNext === undefined) return;
    const interval = setInterval(() => api?.scrollNext(), 8000);
    return () => clearInterval(interval);
  }, [api]);

  const rawData = fetchStaticContent(
    STATIC_CONTENT_KEYS.HERO_SECTION,
    staticContent,
  );

  const heroSectionList = rawData?.value?.map((item: any) => ({
    title: item?.title?.prefix,
    wavyText: item?.title?.highlight,
    description: item.description,
  }));

  // const heroSectionList = [
  //   {
  //     title: <>Best Spicy Pizza,</>,
  //     wavyText: <>in Baneshwor & Kathmandu</>,
  //     description:
  //       "Looking for pizza near me in Kathmandu or Baneshwor? Try Tuffani’s signature spicy pizzas, freshly baked with bold flavors and gooey cheese  loved by students, office teams, and pizza enthusiasts.",
  //   },
  //   {
  //     title: <>Juicy Burgers in Baneshwor,</>,
  //     wavyText: <>A Flavor You Can&apos;t Resist </>,
  //     description:
  //       "Craving burgers near me? Tuffani serves fresh, loaded burgers in Baneshwor and Kathmandu with juicy chicken, cheese, and bold spices  perfect for quick lunches or hangouts.",
  //   },
  //   {
  //     title: <>Opening Offer</>,
  //     wavyText: <>(Valid Feb 11, 12 & 13 only)</>,
  //     description:
  //       "Free Coke or Ice Cream on every purchase First 50 customers get to play our Spin & Win game and grab exciting gifts and special discounts.",
  //   },
  //   {
  //     title: <>Best Crunchy Chicken in Baneshwor</>,
  //     wavyText: <>Crispy Outside, Juicy Inside | Tuffani</>,
  //     description: (
  //       <>
  //         Craving crispy fried chicken in Baneshwor? Tuffani&apos;s hot, golden
  //         Crunchy Chicken is freshly fried, juicy inside, and packed with bold
  //         flavor.
  //       </>
  //     ),
  //   },
  // ];

  return (
    <div className=" pt-40">
      <div className="flex flex-col items-center justify-center">
        <Carousel
          opts={{
            loop: true,
            active: true,
          }}
          setApi={(emblaApi: UseEmblaCarouselType[1]) => setApi(emblaApi)}
        >
          <CarouselContent>
            {heroSectionList?.map((item, index) => {
              return (
                <CarouselItem key={index}>
                  <div className="flex flex-col items-center justify-center">
                    <div className="font-extrabold max-w-[95vw] text-2xl md:text-[48px] text-center mb-4">
                      <h1 className="italic">{item.title}</h1>
                      <WavyText>{item.wavyText}</WavyText>
                    </div>
                    <p className="w-[95vw] md:w-195 text-center font-light text-xl mb-8">
                      {item.description}
                    </p>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>

        <Link href="/menu" className="z-100">
          <Button>Grab Now</Button>
        </Link>
      </div>
    </div>
  );
}
